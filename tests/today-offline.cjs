const {readFileSync}=require('node:fs');
const {runInNewContext}=require('node:vm');
const assert=require('node:assert/strict');
const path=process.argv[2] || require('node:path').join(__dirname, '../prototype/My-Hoval-Focus.html');
const html=readFileSync(path,'utf8'),code=html.split('<script>')[1].split('</script>')[0];
const store=new Map(),handlers={},nodes=new Map();
const el=id=>{if(!nodes.has(id))nodes.set(id,{id,value:'',innerHTML:'',textContent:'',addEventListener(){},querySelector:()=>({setAttribute(){}}),showModal(){this.open=true},close(){this.open=false}});return nodes.get(id)};
const context={document:{querySelector:el,querySelectorAll(){return[]},addEventListener(k,h){handlers[k]=h}},localStorage:{getItem:k=>store.get(k),setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},window:{scrollTo(){}},assert,setTimeout:()=>0,clearTimeout(){},console};
const run=s=>runInNewContext(s,context);
run(code);
assert.match(el('#view').innerHTML,/My top 3/);
assert.equal(run('plan().ids.length'),3);
const click=(action)=>handlers.click({target:{closest:()=>({dataset:{act:action}})}});
(async()=>{
await click('edit');el('#slot0').value='8200104';el('#slot1').value='C8200102';el('#slot2').value='8200103';await click('saveplan');
assert.equal(run('plan().ids[0]'),'8200104');await click('review');el('#note').value='QA note';await click('next');await click('close');await click('review');assert.match(el('#modal').innerHTML,/Ticket 2 of 5/);
assert.equal(JSON.parse(store.get('my-hoval-focus.today.v1')).sample.notes['8200101'],'QA note');
await click('dismiss:warehouse');assert.equal(run('work().dismissed.length'),1);
run('var f=fixture();importFile(f)');assert.equal(run('current().length'),3);await click('accept');
run("work().notes['9100001']='Keep';f.requests[0].details.subject='Revised';importFile(f)");
assert.equal(run("find('9100001').title"),'Revised');assert.equal(run("work().notes['9100001']"),'Keep');assert.equal(run('plan().accepted'),true);
run("f.requests.pop();f.count=2;f.complete=false;importFile(f)");assert.equal(run('current().length'),3);
run("f.complete=true;importFile(f)");assert.equal(run('current().length'),2);assert.equal(run('work().tickets.length'),3);
assert.throws(()=>run("importFile({...f,account:'other'})"));assert.throws(()=>run("importFile({...f,count:4})"));assert.throws(()=>run("importFile({...f,exported_at:'2010-01-01'})"));assert.throws(()=>run("importFile({...f,requests:[f.requests[0],f.requests[0]]})"));
assert(run('valid(JSON.parse(JSON.stringify(state)))'));
const replay={...context};assert(runInNewContext(code+";state.local.notes['9100001']==='Keep' && plan().accepted",replay));
await click('sample');await click('wrap');context.document.querySelectorAll=()=>['8200104','C8200102','8200103'].map((id,i)=>({dataset:{hour:id},value:[2,3,3][i],validity:{valid:true}}));await click('prepare');assert.match(el('#modal').innerHTML,/8 h/);assert.match(el('#copytext').value,/C8200102 - Validate the SAP test cutover\nChange hours · 3 h/);
assert(!html.match(/(?:src|href)\s*=\s*["']https?:/i));assert(html.includes("connect-src https://api.xurrent.com/v1/me;"));
context.AbortController=AbortController;
for (const [status,requestId,expected] of [[401,'mock','API reachable'],[403,'','HTTP 403'],[200,'','HTTP 200']]){
  context.fetch=async (url,options)=>{assert.equal(url,'https://api.xurrent.com/v1/me');assert.equal(options.credentials,'omit');assert.equal(options.headers.Authorization,'');return {status,headers:{get:()=>requestId}};};
  await run('checkXurrentRoute()');assert(run('connectionCheckText').includes(expected));
}
context.fetch=async()=>{throw Error('offline');};await run('checkXurrentRoute()');assert(run('connectionCheckText').includes('Connection unavailable'));
console.log('PASS: demo, plan changes, review/resume, message decisions, persisted reload, import/update, partial and complete snapshots, invalid/older/cross-account rejection, backup schema, Toggl draft. Inline asset + network policy assertions passed.');
})().catch(e=>{console.error(e);process.exitCode=1});
