import json, yaml, html, re
from pathlib import Path

OUT=Path('deliverables'); OUT.mkdir(exist_ok=True)
nodes=[]
INK='RGBA(25, 35, 49, 1)'; MUTED='RGBA(103, 117, 135, 1)'; RED='RGBA(214, 0, 28, 1)'; WHITE='RGBA(255, 255, 255, 1)'; LINE='RGBA(227, 232, 238, 1)'; BG='RGBA(245, 247, 250, 1)'; GREEN='RGBA(30, 118, 91, 1)'; AMBER='RGBA(145, 98, 24, 1)'
def add(name,control,props,children=None,variant=None):
 c={'Control':control}
 if variant:c['Variant']=variant
 c['Properties']={k:'='+str(v) for k,v in props.items()}
 if children is not None:c['Children']=children
 node={name:c}; nodes.append(node);return c
def label(n,text,x,y,w,h=28,size=12,color=INK,bold=False,**kw):
 return add(n,'Label@2.5.1',dict(Text=text,X=x,Y=y,Width=w,Height=h,Size=size,Color=color,Font="Font.'Segoe UI'",FontWeight='FontWeight.Semibold' if bold else 'FontWeight.Normal',PaddingLeft=0,PaddingRight=0,PaddingTop=0,PaddingBottom=0,**kw))
def rect(n,x,y,w,h,fill):return add(n,'Rectangle@2.3.0',dict(X=x,Y=y,Width=w,Height=h,Fill=fill,BorderThickness=0))
def btn(n,text,x,y,w,action,fill=WHITE,color=INK,h=36,**kw):
 return add(n,'Classic/Button@2.2.0',dict(Text=text,X=x,Y=y,Width=w,Height=h,OnSelect=action,Fill=fill,Color=color,BorderThickness=0,HoverFill='RGBA(233, 237, 242, 1)',HoverColor=INK,PressedFill=RED,PressedColor=WHITE,Font="Font.'Segoe UI'",Size=11,FontWeight='FontWeight.Semibold',RadiusTopLeft=7,RadiusTopRight=7,RadiusBottomLeft=7,RadiusBottomRight=7,**kw))
def card(n,x,y,w,h,fill='#FFFFFF',stroke='#E3E8EE'):
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="300" viewBox="0 0 1000 300" preserveAspectRatio="none"><rect x="1" y="1" width="998" height="298" rx="14" fill="{fill}" stroke="{stroke}" stroke-width="1"/></svg>'
 add(n,'Image@2.2.3',dict(X=x,Y=y,Width=w,Height=h,Image='"data:image/svg+xml;utf8," & EncodeUrl("'+svg.replace('"','""')+'")',ImagePosition='ImagePosition.Stretch',AccessibleLabel='""',TabIndex=-1))
done='CountIf(mhpTasks, Lower(Trim(StatusText)) = "done")'
missing='CountIf(mhpTasks, IsBlank(Trim(StatusText)))'
total='CountRows(mhpTasks)'
refresh="IfError(Refresh('MyHovalFocus-ProjectTasks'); ClearCollect(mhpTasks, Filter('MyHovalFocus-ProjectTasks', SourceId = 1)); Refresh('MyHovalFocus-Sources'); Set(mhpSource, LookUp('MyHovalFocus-Sources', ID = 1)); Set(mhpLoadError, false), Set(mhpLoadError, true); Notify(\"Could not refresh project data. Please try again.\", NotificationType.Error))"
onvisible='Set(mhpFilter, "All"); '+refresh
rect('mhpBackground',0,0,'Parent.Width','Parent.Height',BG)
rect('mhpSidebar',0,0,184,'Parent.Height',INK)
rect('mhpBrandMark',24,31,4,42,RED)
label('mhpBrand','"MY HOVAL"',40,30,132,24,16,WHITE,True)
label('mhpFocus','"FOCUS"',40,54,132,24,16,WHITE,True)
label('mhpWorkspace','"PERSONAL WORKSPACE"',24,119,150,20,8,'RGBA(148, 163, 184, 1)')
btn('mhpNavProjects','"Projects"',12,156,160,'false','RGBA(46, 59, 76, 1)',WHITE,42,Align='Align.Left',PaddingLeft=22)
rect('mhpNavAccent',12,164,3,26,RED)
btn('mhpNavSources','"My Sources"',12,207,160,'Navigate(scrMySourcesV2, ScreenTransition.None)',INK,'RGBA(179, 191, 207, 1)',42,Align='Align.Left',PaddingLeft=22)
rect('mhpSideRule',24,'Parent.Height - 116',136,1,'RGBA(55, 67, 84, 1)')
label('mhpSideFooter','"Your priorities.\nYour next steps.\nOne place."',24,'Parent.Height - 97',140,65,11,'RGBA(151, 166, 186, 1)')
label('mhpEyebrow','"WORKSPACE  /  PROJECTS"',216,24,400,20,9,MUTED,True)
label('mhpHeading','"Projects"',216,48,450,42,28,INK,True)
label('mhpSubtitle','"See the plan. Know what needs your attention."',216,91,600,22,11,MUTED)
btn('mhpRefresh','"Refresh data"','Parent.Width - 300',46,122,refresh)
btn('mhpOpen','"Open workbook"','Parent.Width - 166',46,134,'Launch(mhpSource.SourceLocation)',RED,WHITE,DisplayMode='If(IsBlank(mhpSource.SourceLocation) || !StartsWith(Lower(mhpSource.SourceLocation), "https://"), DisplayMode.Disabled, DisplayMode.Edit)',Tooltip='"Open the original Excel workbook. Changes are made there."')
card('mhpHero',216,132,'Parent.Width - 248',142,'#192331','#192331')
label('mhpProjectEyebrow','"EXCEL PROJECT  •  CUTOVER & MIGRATION"',240,150,560,20,9,'RGBA(166, 182, 202, 1)',True)
label('mhpProjectName','Coalesce(mhpSource.Titel, "SAP B1 Upgrade Plan")',240,177,'Parent.Width - 624',38,22,WHITE,True)
label('mhpProjectNote','"One view of the plan, owners and next steps."',240,224,'Parent.Width - 624',24,11,'RGBA(183, 197, 215, 1)')
label('mhpProgressCaption','"RECORDED COMPLETION"','Parent.Width - 340',151,280,22,9,'RGBA(166, 182, 202, 1)',True)
label('mhpProgressNumber',f'If({total} = 0, "—", Text(Round(100 * ({done}) / Max(1, {total}), 0), "0") & "%")','Parent.Width - 340',176,100,44,30,WHITE,True)
label('mhpProgressDetail',f'Text({done}) & " of " & Text({total}) & " marked Done"','Parent.Width - 235',188,190,26,10,'RGBA(183, 197, 215, 1)')
rect('mhpProgressTrack','Parent.Width - 340',232,280,5,'RGBA(59, 73, 92, 1)')
rect('mhpProgressFill','Parent.Width - 340',232,f'280 * ({done}) / Max(1, {total})',5,'RGBA(238, 71, 88, 1)')
cw='(Parent.Width - 280) / 3'
for idx,(key,caption,num,foot,col) in enumerate([
 ('Total','LOADED TASKS',total,'"From the latest imported project data"',INK),
 ('Done','COMPLETED',done,'"Tasks explicitly marked Done in Excel"',GREEN),
 ('Missing','STATUS NOT RECORDED',missing,'"Blank in the source — review in Excel"',AMBER)]):
 x=f'216 + {idx} * ((Parent.Width - 280) / 3 + 16)'
 card('mhpMetric'+key,x,290,cw,96)
 label('mhpMetricCaption'+key,'"'+caption+'"',x+' + 18',303,cw+' - 36',18,9,MUTED,True)
 label('mhpMetricValue'+key,'Text('+num+')',x+' + 18',324,70,34,25,col,True)
 label('mhpMetricFoot'+key,foot,x+' + 94',326,cw+' - 112',42,10,MUTED)
label('mhpPlanTitle','"Project plan"',216,405,240,30,17,INK,True)
label('mhpPlanHint','"Select a task to see the full context."',216,437,420,22,10,MUTED)
card('mhpListCard',216,472,'Parent.Width - 664','Max(200, Parent.Height - 504)')
add('mhpSearch','Classic/TextInput@2.3.2',dict(X=232,Y=486,Width='Parent.Width - 696',Height=36,Default='""',HintText='"Search tasks, owners or sections…"',AccessibleLabel='"Search project tasks"',DelayOutput='true',Font="Font.'Segoe UI'",Size=11,Color=INK,Fill=BG,BorderThickness=0,PaddingLeft=12,RadiusTopLeft=6,RadiusTopRight=6,RadiusBottomLeft=6,RadiusBottomRight=6))
for i,(caption,key) in enumerate([('All tasks','All'),('Done','Done'),('Other status','Recorded'),('No status','Missing')]):
 btn('mhpFilter'+key,'"'+caption+'"',f'232 + {i} * 105',534,99,'Set(mhpFilter, "'+key+'")',f'If(Coalesce(mhpFilter, "All") = "{key}", {INK}, {BG})',f'If(Coalesce(mhpFilter, "All") = "{key}", {WHITE}, {MUTED})',30)
items='SortByColumns(Filter(mhpTasks, (IsBlank(mhpSearch.Text) || mhpSearch.Text in TaskDescription || mhpSearch.Text in TaskOwner || mhpSearch.Text in Section || mhpSearch.Text = Step) && Switch(Coalesce(mhpFilter, "All"), "Done", Lower(Trim(StatusText)) = "done", "Missing", IsBlank(Trim(StatusText)), "Recorded", !IsBlank(Trim(StatusText)) && Lower(Trim(StatusText)) <> "done", true)), "SourceRow", SortOrder.Ascending)'
g=add('mhpTaskList','Gallery@2.15.0',dict(X=224,Y=580,Width='Parent.Width - 680',Height='Max(90, Parent.Height - 622)',Items=items,TemplateSize=92,TemplatePadding=4,TemplateFill='If(ThisItem.IsSelected, RGBA(255, 243, 245, 1), RGBA(255, 255, 255, 1))',OnSelect='false',AccessibleLabel='"Project task list"',ShowScrollbar='true'),[], 'BrowseLayout_Vertical_TwoTextOneImageVariant_ver5.0')
start=len(nodes)
rect('mhpRowAccent',0,8,3,76,'If(ThisItem.IsSelected, '+RED+', RGBA(0, 0, 0, 0))')
label('mhpRowStep','ThisItem.Step',14,12,36,25,12,MUTED,True,OnSelect='Select(Parent)')
label('mhpRowTitle','Left(Substitute(Substitute(ThisItem.TaskDescription, Char(13), " "), Char(10), " "), 110) & If(Len(ThisItem.TaskDescription) > 110, "…", "")',58,8,'Parent.TemplateWidth - 76',42,12,INK,True,OnSelect='Select(Parent)',VerticalAlign='VerticalAlign.Top')
label('mhpRowOwner','Coalesce(ThisItem.TaskOwner, "Owner not recorded") & "  ·  " & ThisItem.Section',58,52,'Parent.TemplateWidth - 76',21,9,MUTED,OnSelect='Select(Parent)')
label('mhpRowStatus','Coalesce(ThisItem.StatusText, "Status not recorded")',58,72,'Parent.TemplateWidth - 76',18,9,'If(Lower(Trim(ThisItem.StatusText)) = "done", '+GREEN+', If(IsBlank(Trim(ThisItem.StatusText)), '+AMBER+', '+MUTED+'))',OnSelect='Select(Parent)')
g['Children']=nodes[start:];del nodes[start:]
label('mhpNoResults','If(mhpLoadError, "Unable to load data. Select Refresh data to retry.", "No tasks match this view.\nTry another search or filter.")',248,610,'Parent.Width - 728',76,12,MUTED,Visible='IsEmpty(mhpTaskList.AllItems)')
label('mhpCount','Text(CountRows(mhpTaskList.AllItems)) & " tasks in this view"',232,'Parent.Height - 35',350,20,9,MUTED)
card('mhpDetailsCard','Parent.Width - 432',405,400,'Max(267, Parent.Height - 437)')
label('mhpDetailsEyebrow','If(IsBlank(mhpTaskList.Selected.ID), "TASK DETAILS", "TASK " & mhpTaskList.Selected.Step & "  /  DETAILS")','Parent.Width - 408',425,352,22,9,MUTED,True)
label('mhpDetailsStatus','Coalesce(mhpTaskList.Selected.StatusText, "Status not recorded")','Parent.Width - 408',456,352,44,16,'If(Lower(Trim(mhpTaskList.Selected.StatusText)) = "done", '+GREEN+', '+INK+')',True)
rect('mhpDetailsRule','Parent.Width - 408',510,352,1,LINE)
# HTML is text-only, escaped before rendering. The detail body scrolls independently.
def escape(expr):return 'Substitute(Substitute(Substitute(Coalesce('+expr+', "—"), "&", "&amp;"), "<", "&lt;"), ">", "&gt;")'
parts=[]
for caption,field in [('TASK','TaskDescription'),('OWNER','TaskOwner'),('SECTION','Section'),('DUE DATE · AS RECORDED','DueDateText'),('SYSTEMS AFFECTED','SystemsAffected'),('DEPENDENCIES','Dependencies'),('COMMENTS','Comments')]:
 parts.append('"<div style=\'margin-bottom:22px\'><div style=\'font-size:10px;font-weight:600;letter-spacing:1px;color:#677587;margin-bottom:7px\'>'+caption+'</div><div style=\'white-space:pre-wrap;font-size:13px;line-height:1.65;color:#192331;overflow-wrap:anywhere\'>" & '+escape('mhpTaskList.Selected.'+field)+' & "</div></div>"')
htmlfx='"<div style=\'font-family:Segoe UI,sans-serif;height:" & Text(Max(90, Self.Height - 12), "0", "en-US") & "px;overflow-y:auto;padding-right:14px\'>" & '+ ' & '.join(parts)+' & "</div>"'
add('mhpDetailsBody','HtmlViewer@2.1.0',dict(X='Parent.Width - 408',Y=529,Width=352,Height='Max(110, Parent.Height - 614)',HtmlText=htmlfx,AutoHeight='false',PaddingLeft=0,PaddingRight=0,PaddingTop=0,PaddingBottom=0,Visible='!IsBlank(mhpTaskList.Selected.ID)'))
label('mhpDetailsEmpty','"Select a task from the project plan."','Parent.Width - 408',540,352,80,12,MUTED,Visible='IsBlank(mhpTaskList.Selected.ID)')
rect('mhpDetailsFootRule','Parent.Width - 408','Parent.Height - 80',352,1,LINE)
label('mhpDetailsFoot','"Read-only view · Make changes in the workbook"','Parent.Width - 408','Parent.Height - 68',352,24,9,MUTED)
label('mhpSync','If(IsEmpty(mhpTasks), "No imported data loaded", "Last imported " & Text(Max(mhpTasks, SyncedAt), "[$-en-US]dd mmm yyyy, hh:mm"))','Parent.Width - 432','Parent.Height - 26',400,18,8,MUTED)
# Compact the composition to keep three full task rows visible at 1366x768.
byname={next(iter(n)):next(iter(n.values()))['Properties'] for n in nodes}
def setp(n,**props):byname[n].update({k:'='+str(v) for k,v in props.items()})
setp('mhpEyebrow',Y=15)
setp('mhpHeading',Y=37,Height=39)
setp('mhpSubtitle',Visible='false')
setp('mhpHero',Y=96,Height=104)
setp('mhpProjectEyebrow',Y=109)
setp('mhpProjectName',Y=132,Height=32,Size=21)
setp('mhpProjectNote',Y=168)
setp('mhpProgressCaption',Y=107)
setp('mhpProgressNumber',Y=130,Height=40)
setp('mhpProgressDetail',Y=143)
setp('mhpProgressTrack',Y=178)
setp('mhpProgressFill',Y=178)
for key in ['Total','Done','Missing']:
 setp('mhpMetric'+key,Y=212,Height=64)
 setp('mhpMetricCaption'+key,Y=220,Size=8)
 setp('mhpMetricValue'+key,Y=239,Height=29,Size=22)
 setp('mhpMetricFoot'+key,Y=235,Height=33,Size=9)
setp('mhpPlanTitle',Y=290)
setp('mhpPlanHint',Visible='false')
setp('mhpListCard',Y=328,Height='Max(200, Parent.Height - 360)')
setp('mhpSearch',Y=340)
for key in ['All','Done','Recorded','Missing']:setp('mhpFilter'+key,Y=385,Height=28)
setp('mhpTaskList',Y=423,Height='Max(90, Parent.Height - 465)')
setp('mhpNoResults',Y=456)
setp('mhpDetailsCard',Y=290,Height='Max(267, Parent.Height - 322)')
setp('mhpDetailsEyebrow',Y=310)
setp('mhpDetailsStatus',Y=340)
setp('mhpDetailsRule',Y=393)
setp('mhpDetailsBody',Y=411,Height='Max(110, Parent.Height - 496)')
setp('mhpDetailsEmpty',Y=430)
setp('mhpCount',Text='Text(CountRows('+items+')) & " tasks in this view"')
setp('mhpSearch',OnChange='Reset(mhpTaskList)')
for key in ['All','Done','Recorded','Missing']:
 setp('mhpFilter'+key,OnSelect='Set(mhpFilter, "'+key+'"); Reset(mhpTaskList)')
setp('mhpSync',Text='If(IsEmpty(mhpTasks), "No imported data loaded", "Last imported " & Text(First(SortByColumns(mhpTasks, "SyncedAt", SortOrder.Descending)).SyncedAt, "[$-en-US]dd mmm yyyy, hh:mm"))')
code=OUT/'MyHovalFocus-Projects-Paste.txt'
code.write_text(yaml.safe_dump(nodes,sort_keys=False,allow_unicode=True,width=2000))
names=[]
def validate(ns):
 for n in ns:
  name,c=next(iter(n.items())); assert name not in names;names.append(name)
  assert all(isinstance(v,str) and v.startswith('=') for v in c['Properties'].values())
  validate(c.get('Children',[]))
validate(yaml.safe_load(code.read_text()))
# Separators outside strings only, for the Polish formula editor.
def pl(s):
 out='';quoted=False;i=0
 while i<len(s):
  ch=s[i]
  if ch=='"':
   if quoted and i+1<len(s) and s[i+1]=='"':out+='""';i+=2;continue
   quoted=not quoted
  out+=(';' if ch==',' else ';;' if ch==';' else ch) if not quoted else ch;i+=1
 return out
(OUT/'MyHovalFocus-Projects-OnVisible.txt').write_text(pl(onvisible))
(OUT/'MyHovalFocus-Projects-Setup.txt').write_text('MY HOVAL FOCUS — PROJECTS\n\n1. Select the blank scrProjects screen in Tree view.\n2. Open MyHovalFocus-Projects-Paste.txt, copy ALL text, and paste onto the screen (not into the formula bar).\n3. Select scrProjects, choose OnVisible and paste the contents of MyHovalFocus-Projects-OnVisible.txt into the formula bar. This file uses Polish formula separators.\n4. Navigate to another screen and back, then Preview (F5).\n5. Check: 41 tasks, 2 Done, 37 without a status; 5% recorded completion for the supplied sample. Verify against the current workbook.\n6. Refresh data reloads SharePoint; it does NOT execute the Excel import flow. Open workbook opens the configured source.\n7. To link My Sources to this screen, add a navigation button with OnSelect: Navigate(scrProjects; ScreenTransition.None).\n\nSCOPE / LIMITS\n- SourceId = 1, the confirmed SAP B1 Upgrade Plan source.\n- Layout targets desktop canvas 1366 x 768 or larger; mobile is not validated.\n- Task data is a local collection. ClearCollect is limited by the app data row limit (default 500). The current 41 tasks fit. Do not use this screen for larger datasets without adapting the data loading.\n- Dates remain original text; no unsupported overdue classification. Blank status is not labelled Not started.\n- Import currently does not reconcile deleted Excel rows. Completion measures task count, not effort or schedule.\n- Only read operations. No writes to the workbook or task list. No flow trigger, automatic sync or licensing workaround.\n- YAML and bindings were checked locally. Power Apps import/formulas must still be validated in your tenant.\n- The preview is an illustrative rendering of the same layout with the supplied sample, not a screenshot of the live application.\n')
print('Validated',len(names),'unique controls;',code.stat().st_size,'bytes')
