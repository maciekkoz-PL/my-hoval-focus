/* Exercise two independent app instances using Web Crypto and a structured-clone IndexedDB test double. */
const assert = require('node:assert/strict');
const {readFileSync} = require('node:fs');
const {runInNewContext} = require('node:vm');
const {webcrypto} = require('node:crypto');
const file = process.argv[2] || require('node:path').join(__dirname, '../prototype/My-Hoval-Focus.html');
const script = readFileSync(file, 'utf8').split('<script>')[1].split('</script>')[0];
const records = new Map(), workspace = new Map();
const dummy = 'synthetic-test-credential';
let denied = false, pageTwo = false, wrongOwner = false;
function database(){
  const db = {close(){}, transaction(){
    const tx = {objectStore(){return {
      get(key){return {result:structuredClone(records.get(key))};},
      put(value,key){records.set(key,structuredClone(value));return {result:key};},
      delete(key){records.delete(key);return {result:undefined};}
    };}};
    queueMicrotask(()=>tx.oncomplete());
    return tx;
  }};
  const request = {result:db};
  queueMicrotask(()=>request.onsuccess());
  return request;
}
function session(){
  const nodes = new Map();
  function el(id){
    if(!nodes.has(id))nodes.set(id,{value:'',addEventListener(){},querySelector:()=>({setAttribute(){}}),showModal(){this.open=true;},close(){this.open=false;}});
    return nodes.get(id);
  }
  const indexedDB = {open:database};
  const context = {indexedDB,crypto:webcrypto,window:{indexedDB,crypto:webcrypto},location:{pathname:'/Focus.html',protocol:'file:'},
    TextEncoder,TextDecoder,URL,URLSearchParams,AbortSignal,
    setTimeout:()=>0,clearTimeout(){},document:{querySelector:el,querySelectorAll:()=>[],addEventListener(){}},
    localStorage:{removeItem:k=>workspace.delete(k),getItem:k=>workspace.get(k),setItem:(k,v)=>workspace.set(k,v)},
    async fetch(url,options){
      const u = new URL(url);
      assert.equal(u.origin,'https://api.xurrent.com');assert.equal(options.method,'GET');
      assert.equal(options.headers.Authorization,'Bearer '+dummy);assert.equal(options.headers['X-Xurrent-Account'],'demo-account');
      assert.equal(options.credentials,'omit');assert.equal(options.redirect,'error');
      if(denied)return new Response(null,{status:401});
      if(u.pathname==='/v1/me')return Response.json({id:42});
      assert.equal(u.pathname,'/v1/requests/open');assert.equal(u.searchParams.get('member'),'42');
      const cursor=u.searchParams.get('search_after');
      const item={id:cursor?456:123,subject:'Synthetic request',status:'assigned',member:{id:wrongOwner?10:42},desired_completion_at:null};
      return Response.json([item],{headers:pageTwo&&!cursor?{Link:'<https://api.xurrent.com/v1/requests/open?search_after=cursor>; rel="next"'}:{}});
    }};
  const run=s=>runInNewContext(s,context);
  run(script);
  return {el,run};
}
(async()=>{
  let app=session();await new Promise(setImmediate);
  assert.equal(app.run('vaultReady'),true);
  app.el('#liveAccount').value='demo-account';app.el('#liveSecret').value=dummy;
  await app.run('refreshLive(true)');
  assert.equal(app.run('current().length'),1);
  const saved=records.get('/Focus.html');
  assert.equal(saved.key.extractable,false);
  assert.deepEqual(Object.keys(saved).sort(),['account','cipher','iv','key','owner']);
  assert(!Buffer.from(saved.cipher).includes(Buffer.from(dummy)));
  assert(!app.run('JSON.stringify(state)').includes(dummy));assert.equal(app.el('#liveSecret').value,'');
  assert(![...workspace.values()].join('').includes(dummy));
  app=session();await new Promise(setImmediate);
  assert.equal(app.run('rememberedAccount'),'demo-account');
  pageTwo=true;await app.run('refreshLive(false)');
  assert.equal(app.run('current().length'),2);
  wrongOwner=true;await app.run('refreshLive(false)');
  assert.match(app.run('connectionMessage'),/different owner/);
  assert.equal(app.run('current().length'),2);
  denied=true;await app.run('refreshLive(false)');
  assert.match(app.run('connectionMessage'),/did not accept/);assert.equal(app.run('current().length'),2);
  await app.run('forgetConnection()');
  assert.equal(records.size,0);
  app=session();await new Promise(setImmediate);
  assert.equal(app.run('rememberedAccount'),'');assert.equal(app.run('current().length'),2);
  console.log('PASS: enrollment, encrypted nonextractable key, app restart, pagination, owner and credential rejection, backup separation, forget and reopen.');
})().catch(err=>{console.error(err);process.exitCode=1;});
