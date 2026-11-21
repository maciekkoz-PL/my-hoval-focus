# Current state — 2026-11-20

## Current calendar checkpoint · 2026-11-21
Today includes a direct-manipulation week/month calendar. Imported request deadlines use desired_completion_at; project milestones are personal and stored with the backup. Drag or choose a date, review drafts and send with the companion in prototype/Focus-Sync.ps1. The existing assistant supplies Token.ps1. Tests used synthetic data; first live Windows/Xurrent verification is pending. App commit 75bc5d8.

## Prior visual checkpoint · 2026-11-21
[The portable Today dashboard](../prototype/My-Hoval-Focus.html) now has a dark workspace with embedded official Hoval branding. The first priority occupies the alpine card. The other two appear alongside it. A read-only local week strip, message inbox, support/change queue breakdown, Toggl draft and outstanding waits provide context. Queue counts come from the current snapshot. The offline contract and saved state key remain compatible. App commit `11b5eae`.

The offline regression and layout-structure tests passed on synthetic data. Browser preview at desktop and phone widths verified the Today layout, ticket navigation and detail dialog. Direct acceptance on the managed Hoval laptop remains with the owner.

## Current direction
Xurrent is the main work source. The proposed first app is a portable local web app on the corporate laptop, initially using a ticket file from the existing PowerShell process. The first local prototype has passed logic tests with synthetic tickets. Browser rendering and managed-device policy still need a real-device check. Preserve the working Excel/Power Automate/SharePoint pilot. The owner prefers minimal IT dependency and has declined private-device registration.

Today should help select My top 3, explain priorities and collect Needs your action from messages. Review tickets should support one-at-a-time AI discussion, durable drafts and explicit external-write approval. Coarse Toggl allocation is now a confirmed requirement, using ticket reference/title and Support hours or Change hours, approximately eight hours for a full day. First generate entries for copying; API sending is later.

Power Pages screenshots show a missing database in the personal environment and creation/access restrictions in the default environment. SPFx rights and independent corporate hosting remain unknown. The former SPFx-first plan is superseded for the local import pilot.

## Repository visibility
GitHub get_repo returned visibility=public during this checkpoint, contrary to earlier private-repository wording. No visibility change was made. Named stakeholder preferences are recorded as roles in the public specification; exact identities and the manager-name discrepancy require private configuration. Screenshots, company ticket examples and personal endpoints were not added.

## Existing evidence and resources
The following ledger and resource inventory preserve earlier implementation knowledge.
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
| Xurrent | Power Automate generic HTTP blocked by Premium; owner has an existing local PowerShell workflow, but its export/code and end-to-end Focus connection are unverified here |
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

## 2026-11-20 — Existing Xurrent tools located
Inspected base Xurrent Asystent ZIP and the 1.5 update from the owner's saved ChatGPT project files. The exporter and approved-package updater exist outside GitHub. See [XURRENT-EXISTING-TOOLS.md](XURRENT-EXISTING-TOOLS.md). A new user upload is unnecessary. Current live connectivity and the browser-to-script bridge remain untested.
