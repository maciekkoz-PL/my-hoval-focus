const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = process.argv[2] || require('node:path').join(__dirname, '../prototype/My-Hoval-Focus.html');
const html = fs.readFileSync(path, 'utf8');
const code = html.split('<script>')[1].split('</script>')[0];
const nodes = new Map();
const listeners = {};
const document = {
  querySelector(selector) {
    if (!nodes.has(selector)) nodes.set(selector, {addEventListener() {}, focus() {}});
    return nodes.get(selector);
  },
  addEventListener(type, handler) {listeners[type] = handler;}
};
const ctx = vm.createContext({document, localStorage:{getItem() {},setItem() {},removeItem() {}}, clearTimeout() {},setTimeout() {}});
vm.runInContext(code, ctx);
const view = () => document.querySelector('#view').innerHTML;
const press = action => listeners.click({target:{closest:()=>({dataset:{act:action}})}});
(async () => {
  assert.match(html, /data:image\/jpeg;base64,\/9j\//);
  assert.match(view(), /<h2>Release blocked invoice batch<\/h2>/);
  await press('spot:1');
  assert.match(view(), /<h2>Validate the SAP test cutover<\/h2>/);
  assert.match(view(), /class="hero-btn" data-act="detail:C8200102"/);
  assert.match(view(), /Priority 2 of 3/);
  assert.equal(vm.runInContext('plan().ids[0]',ctx), '8200101');
  vm.runInContext("work().tickets=[];work().days={};render()",ctx);
  assert.match(view(), /Your plan is open/);
  console.log('PASS: embedded image, selectable featured priority, correct detail action, unchanged ranking, empty state.');
})().catch(e=>{console.error(e);process.exitCode=1});
