# Current state — 2026-11-17

## Product goal
My Hoval Focus is a personal dashboard for project tasks, support tickets and actionable Outlook/Teams information. Planned surfaces: Overview, Projects, Inbox, My Sources. English product UI. The owner wants a professional result worth showing to colleagues and management; do not substitute visual mockups for working integrations.

## Latest direction
The owner reports the imported Projects screen displays. He has not yet supplied the detailed visual feedback or a fresh error-checker screenshot. He considers the UI dated and scaling poor, and asks whether an internal website is preferable. We acknowledged our largely coordinate-based layout contributes to the problem. Decision: evaluate web hosting/authentication first and retain the data pipeline. No SPFx or new web app has been built or deployed.

## Evidence ledger
| Component | Evidence / status |
|---|---|
| Personal SharePoint lists | User-provided successful list/item reads and writes (200/201) |
| Excel Office Script | User ran it in Excel and via Excel Online Business in a cloud flow; 41 tasks, 6 section candidates, zero review rows |
| Project task list provisioning | User confirmed all 15 field operations succeeded; SourceKey response confirmed unique + indexed |
| Excel import flow | User confirmed all actions succeeded, second run updated tasks; final count 41 |
| Brief count of 42 | User subsequently saw 41; cause not established. Do not diagnose a proven SharePoint bug |
| My Sources V2 | User reported zero errors, one old delegation warning and working save/open/cancel interactions after three formula fixes |
| Projects screen | User reports it displays; appearance/scaling unsatisfactory; detailed live formula/interactivity QA outstanding |
| Outlook | Manual Get emails (V3) returned a real notification; production ingestion absent |
| Teams | Manual 1:1 chat discovery/member lookup/message tests succeeded; production ingestion absent |
| Xurrent direct HTTP | Generic Power Automate HTTP execution blocked by Premium requirement; API connectivity not established by that test |
| Background sync | NOT configured: trigger remains manual |
| Sources Enabled toggle | Configuration only; does NOT gate or trigger the current importer |
| New web/SPFx UI | Proposal only; deployment rights, host and auth/read path unverified |

## Existing cloud resources (names, not credentials)
- Power Apps application: `My Hoval Focus`.
- Personal SharePoint site associated with the owner's corporate OneDrive. Retrieve its exact URL from the existing GetSource/FindTask actions; it is deliberately absent from Git.
- Sources list display title `MyHovalFocus-Sources`, URL segment `MyHovalFocusSources`. Source record ID **1**, title `SAP B1 Upgrade Plan`, System `Excel`, Enabled last observed false. A separate test Outlook record may remain.
- ProjectTasks list display title `MyHovalFocus-ProjectTasks`, URL segment `MyHovalFocusProjectTasks`; 15 custom columns plus built-in Title. Its GUID can be retrieved with GetByTitle (see setup docs).
- Workbook configured in `ReadProject`: worksheet `Tabelle1`, used range last observed A1:H49, header row 2. Two other worksheets empty. File URL available from source record 1's SourceLocation; do not guess it.
- Workbook library chosen in the existing flow: `Dokumente`, not `PersonalCacheLiberary`.
- Script name: `MyHovalFocus_ReadProject`. Initial sample script was `Tickety_TestOdczytu`.
- Current importer: `My Hoval Focus — Sync Project Tasks`.
- One-time provisioning: `My Hoval Focus — Setup Projects`. Do not rerun blindly: column creation is not idempotent.
- Historical manual tests included `Tickety — test Excel` and `Tickety-Test` list. Preserve until cleanup is explicitly agreed.

## App screens and code provenance
- Original generated `MainScreen1`: historical test screen with Search delegation warning; deferred deliberately.
- `scrMySources`: earlier functional custom screen.
- `scrMySourcesV2`: later layout. Source form/gallery names `mhffrmSource`, `mhfgalSources`; selected record variable `mhfSelectedSource`.
- `scrProjects`: user created blank and pasted supplied 62 controls. Main collection `mhpTasks`, selected source `mhpSource`, filter `mhpFilter`, gallery `mhpTaskList`. OnVisible loads source ID 1.
- App StartScreen and published version have NOT been confirmed after Projects paste. Do not claim the screen is the app's landing page or published.
- Projects files are delivered code, not a fresh export from the live tenant; the owner may have made additional local changes.
- My Sources code here reconstructs the delivered code with the three fixes the owner applied and verified. No claim of exact live `.msapp` equivalence.

## Unfinished requirements
Real ingestion for Outlook/Teams, Xurrent integration, scheduler/Enabled wiring, import failure handling, stable IDs and deleted-row reconciliation, Overview, Inbox, source deletion, shared-use access model and internal web hosting all remain unfinished.
