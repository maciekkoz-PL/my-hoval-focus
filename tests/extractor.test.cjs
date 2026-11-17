const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require(process.env.TYPESCRIPT_PATH || 'typescript');
const source = fs.readFileSync('office-scripts/read-project.ts', 'utf8');
const js = ts.transpileModule(source, {compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;
const header = ['Step','Description','Systems affected','Owner','Status','Due Date','Dependencies','Comments'];
function run(rows, offset=0, missing=false) {
 const logs=[]; const ctx={console:{log:x=>logs.push(x)}}; vm.createContext(ctx); vm.runInContext(js,ctx);
 const range=rows===null?undefined:{getTexts:()=>rows,getRowIndex:()=>offset,getAddress:()=>`Tabelle1!A${offset+1}:H${offset+rows.length}`};
 const sheet={getUsedRange:()=>range,getName:()=> 'Tabelle1'};
 const result=JSON.parse(ctx.main({getWorksheet:n=>missing?undefined:sheet}));
 return {result,logs};
}
test('41 tasks and six sections survive extraction with original dates/statuses',()=>{
 const fixture=JSON.parse(fs.readFileSync('tests/fixtures/project-result.synthetic.json'));
 const rows=Array.from({length:49},()=>Array(8).fill('')); rows[0][0]='Synthetic project'; rows[1]=header;
 fixture.sections.forEach(s=>rows[s.sourceRow-1]=s.cells);
 fixture.tasks.forEach(t=>rows[t.sourceRow-1]=[t.step,t.description,t.systemsAffected,t.owner,t.statusText,t.dueDateText,t.dependencies,t.comments]);
 const {result,logs}=run(rows);
 assert.equal(result.tasks.length,41); assert.equal(result.sections.length,6); assert.equal(result.reviewRows.length,0);
 assert.deepEqual(result.tasks,fixture.tasks); assert.equal(result.summary.blankRowCount,0);
 assert.equal(logs.length,1); assert.equal(JSON.parse(logs[0]).taskCount,41); assert.ok(!logs[0].includes('Synthetic task'));
});
test('missing worksheet, empty worksheet and missing headers fail clearly',()=>{
 assert.throws(()=>run([],0,true),/not found/); assert.throws(()=>run(null),/empty/); assert.throws(()=>run([['bad header']]),/eight project columns/);
});
test('reordered columns and shifted range preserve absolute source row',()=>{
 const {result}=run([header.slice().reverse(),['note','dep','01.02.2030','','owner','sys','Task','1']],6);
 assert.equal(result.summary.headerRow,7); assert.equal(result.tasks[0].sourceRow,8); assert.equal(result.tasks[0].description,'Task'); assert.equal(result.tasks[0].dueDateText,'01.02.2030'); assert.equal(result.tasks[0].statusText,'');
});
test('blank and repeated headers are counted; ambiguous rows retained for review',()=>{
 const {result}=run([header,Array(8).fill(''),header,['2','','','','','','',''],['','continuation','','','','','','']]);
 assert.equal(result.summary.blankRowCount,1); assert.equal(result.summary.repeatedHeaderCount,1); assert.equal(result.reviewRows.length,2); assert.equal(result.tasks.length,0);
});
test('extra unmapped data is flagged without dropping the task',()=>{
 const {result}=run([[...header,'Extra'],['1','Task','','','','','','','retain me']]);
 assert.equal(result.tasks.length,1); assert.equal(result.reviewRows.length,1); assert.equal(result.reviewRows[0].cells[8],'retain me');
});
