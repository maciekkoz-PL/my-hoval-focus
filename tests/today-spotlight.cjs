const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const input = process.argv[2] || require('node:path').join(__dirname, '../prototype/My-Hoval-Focus.html');
const html = fs.readFileSync(input, 'utf8');
const nodes = new Map();
const document = {
  querySelector(selector) {
    if (!nodes.has(selector)) nodes.set(selector, {addEventListener() {}});
    return nodes.get(selector);
  },
  addEventListener() {}
};
const context = vm.createContext({document, localStorage:{getItem(){}, setItem(){}, removeItem(){}}});
const run = code => vm.runInContext(code,context);
run(html.split('<script>')[1].split('</script>')[0]);
const view = () => run('today()');
const occurrences = (text,token) => text.split(token).length - 1;
for (const id of run('plan().ids')) {
  const title=run('find('+JSON.stringify(id)+').title');
  assert.equal(occurrences(view(),title),1);
  assert.match(view(),new RegExp('data-act="detail:'+id+'"'));
}
assert.equal(occurrences(view(), 'class="priority-tile'),3);
assert(!view().includes('focus-step'));
run("plan().ids[0]='8200105';work().notes['8200105']='Confirm & reply';");
assert.equal(occurrences(view(),'Review the delivery layout'),1);
assert(view().includes('Confirm &amp; reply'));
run("plan().ids=[];");
assert(view().includes('Your plan is open.'));
assert.equal(occurrences(view(),'class="priority-tile'),0);
run("work().tickets=[];");
assert.match(view(),/data-act="import"/);
assert(html.includes('data:image/jpeg;base64,/9j/'));
assert(!html.includes('spotlightIndex'));
console.log('PASS: every selected ticket has one title and a working detail target; waiting overlap, saved step, empty plan and offline art covered.');

const week = run('weekStrip(new Date(2026,0,1,9))');
assert.equal(occurrences(week, '<time '), 7);
assert.equal(occurrences(week, 'aria-current="date"'), 1);
assert(week.includes('datetime="2025-12-29"') && week.includes('datetime="2026-01-04"'));
assert.match(week, /datetime="2026-01-01"[^>]+aria-current="date"/);
assert.match(view(), /<dt>Support<\/dt><dd>0<\/dd>/);
assert.match(view(), /<dt>Change<\/dt><dd>0<\/dd>/);
run("state=fresh();work().tickets[0].absent=true;");
assert.match(view(), /<dt>Support<\/dt><dd>3<\/dd>/);
assert.match(view(), /<dt>Change<\/dt><dd>1<\/dd>/);
assert(html.includes('data:image/svg+xml;base64,'));
console.log('PASS: local week across year boundary, current date, offline logo, empty queue and current snapshot ticket mix.');
