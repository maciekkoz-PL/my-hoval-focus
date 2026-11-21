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
// Calendar entries repeat their titles on their scheduled dates, independently of the daily plan.
const dailyOnly = () => view().replace(/<section class="planner"[\s\S]+?(?=<section class="watchlist">)/, '');
const occurrences = (text,token) => text.split(token).length - 1;
for (const id of run('plan().ids')) {
  const title=run('find('+JSON.stringify(id)+').title');
  assert.equal(occurrences(dailyOnly(),title),1);
  assert.match(view(),new RegExp('data-act="detail:'+id+'"'));
}
assert.equal(occurrences(view(), 'class="priority-tile'),3);
assert(!view().includes('focus-step'));
run("plan().ids[0]='8200105';work().notes['8200105']='Confirm & reply';");
assert.equal(occurrences(dailyOnly(),'Review the delivery layout'),1);
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

run("state=fresh();anchor='2026-12-31';horizon='week'");
assert.match(run('calendar()'), /data-drop="2027-01-03"/);
run("horizon='month';anchor='2028-02-01'");
assert.match(run('calendar()'), /data-drop="2028-02-29"/);
run("state.mode='local';work().tickets=demo().tickets;var testTicket=find('8200101');testTicket.desired='2026-11-20T15:00:00Z';");
assert(run("changeDue('8200101','2026-12-02')"));
assert.equal(run("dateKey(new Date(work().dates['8200101'].to))"),'2026-12-02');
assert.equal(run("work().dates['8200101'].from"),'2026-11-20T15:00:00Z');
assert(run("changeDue('8200101','2026-12-03')"));
assert.equal(run("Object.keys(work().dates).length"),1);
assert(run('valid(JSON.parse(JSON.stringify(state)))'));
assert(run("changeDue('8200101',dateKey(new Date(testTicket.desired)))"));
assert.equal(run("Object.keys(work().dates).length"),0);
assert(!run("changeDue('8200101','2026-02-31')"));
run("changeDue('8200101','2026-12-02');testTicket.desired='2026-11-24T15:00:00Z'");
assert.match(run("syncIssue('8200101',work().dates['8200101'])"),/changed/);
assert(run("plannerData().milestones.length===0"));
console.log('PASS: calendar boundaries, leap year, date moves, draft coalescing, persistence validation, undo and conflicting source dates.');

run("state=fresh();state.mode='local';work().account='synthetic';work().tickets=demo().tickets;changeDue('8200101','2027-02-01')");
const pkg=JSON.parse(run('JSON.stringify(packageForAssistant(Object.entries(plannerData().dates)))'));
assert.equal(pkg.version,1);
assert.equal(pkg.account,'synthetic');
const change=pkg.changes[0];
assert.deepEqual(Object.keys(change).sort(),['id','subject','complete','desired_completion_at','internal_note'].sort());
assert.equal(change.complete,false);
assert.equal(change.id,8200101);
assert.match(change.desired_completion_at,/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ$/);
assert(change.internal_note.includes(change.desired_completion_at));
assert.throws(()=>run('packageForAssistant([])'));
assert.throws(()=>run("state.mode='sample';packageForAssistant([['8200101',{to:'2027-02-01T12:00:00Z'}]])"));
console.log('PASS: Ticket Asystent v1.5 package has expected fields, UTC seconds, one internal note, numeric ID and no status change.');
