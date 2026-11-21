# Session log

**2026-11-20 · Owner clarification.** Xurrent is the primary source of daily work. Before building, compare native Xurrent My Inbox and Microsoft Planner My Day with the owner's daily review. Excel Projects remains a technical pilot. Assess the approved Xurrent read path and freshness before promising a combined Today view. Implementation awaits the owner's signal.

## 2026-11-17 — Repository bootstrap
- Created a separate private repository at the owner's request.
- Preserved delivered Office Script and Projects source; reconstructed My Sources' three confirmed formula fixes.
- Reconstructed SharePoint schemas and manual flow steps from the conversation, explicitly not tenant exports.
- Added synthetic fixtures and local extractor/source checks.
- Recorded the web/SPFx evaluation decision, known limitations and handoff protocol.
- No changes to corporate tenant, original tickety-ai repo, Sites deployment, lists or flow schedules during repository bootstrap.
- Next: check a supported internal web deployment + authenticated read path.

Validation: five Node extractor regression tests passed; 35 text files passed JSON/YAML/XML, fixture consistency and targeted sensitive-data checks. These are local checks, not tenant deployment tests.

## 2026-11-20 — Web preparation
- Wrote the [web brief](WEB-BRIEF.md) with pilot scope, real-data checks, responsive interaction and acceptance criteria.
- Verified the general SharePoint Framework access and deployment model against Microsoft Learn. Hoval-specific deployment and list access are pending.
- Changes in this session are documentation only. The owner will signal when implementation may start.

## 2026-11-20 — Complete conversation continuation checkpoint
- Read current remote main at 42030572a119a81422ea08791aba522b5285f2ae and existing handoff/source documentation.
- Added PRODUCT-SPEC.md covering local direction, Today/top 3, role-based stakeholder weighting, ticket review, Teams/Outlook requests, end-of-day workflow, Toggl coarse allocation, conceptual persistence, acceptance checks and unresolved integrations.
- Updated README, AGENTS, STATE, NEXT_STEPS, START-HERE-PL, architecture, decision/issue logs and marked the older WEB-BRIEF as historical.
- GitHub reports public. Exact named preferences and real screenshot/ticket payloads remain outside this checkpoint.
- Documentation only. No app build, tenant mutation, source pipeline change, integration test, credential upload or separate tickety-ai change.
- Validation completed before publication: reviewed documentation scope, resolved all relative Markdown links in the 12 changed files against known repository paths, and checked changed text for GUIDs, personal endpoints and actual conversation identities/ticket examples. No application/tenant tests apply to this documentation-only change.
- Commit identity is available in Git history for this entry. Next action is the owner's design discussion or explicit build signal.

## 2026-11-20 — GitHub and Ticket Asystent inspection
- Inspected both repository main trees and tickety-ai README/model/state API/UI. The current web app has local state/export features and no connected Xurrent fetch.
- Used the owner's clarification screenshot to identify the ChatGPT project TICKETY w Xurrent; retrieved relevant prior conversation context.
- Located and inspected the saved standalone exporter, base assistant ZIP and 1.5 update. Recorded provenance, JSON export contract, token-storage design, updater behavior and evidence limits in XURRENT-EXISTING-TOOLS.md.
- Raw company snapshots, packages, personal identifiers and token material were not added to Git. No scripts or external writes executed.
- Documentation-only validation checks all four changed paths and relative links. No application test was applicable. Next is the owner's build signal and permitted browser-to-local-export proof.

## 2026-11-20 — Offline Today prototype
The owner gave the explicit visual build signal. Branch `prototype/today-offline-v1`, first HTML commit `883922d`, logic checks `7fdf618`. The artifact is standalone and contains only synthetic examples. It implements a sample morning plan, priority replacement, local ticket review and notes, duplicate and partial import handling, message triage, coarse copy-ready time allocations, and JSON backups. No network connectors are enabled. Local logic regression checks passed. This environment could not run the graphical browser test for a local file. Visual inspection, OS file-picker and persistence checks on managed Edge remain open.

## 2026-11-20 — Second Today design
The owner confirmed the first prototype opens and requested a stronger visual direction. HTML commit `ab6f907` updates the navigation, typography, featured ticket, plan and inbox. The self-contained JPEG was generated for this project and contains no corporate data. Existing workspace schema, persistence key, import and review flow are retained. Run `node tests/today-offline.cjs` and `node tests/today-spotlight.cjs`. Both logic checks passed locally, and the embedded image decoded. The revised layout awaits visual review on the managed laptop.

## 2026-11-21 — One daily plan
The owner identified duplicate ticket titles in the cover and Top 3. The third design puts all three priorities into a single ordered list, moves contextual photography to the day heading, and reserves the lower section for incoming requests, other waiting tickets and the time draft. Planning and triage patterns were reviewed on the official Sunsama product page and the Linear Inbox guide/redesign article. The new layout is an original design. CSS provides laptop, tablet and mobile layouts. Data and hourly totals are local.

App commit `62177c4`. Offline regressions and updated structural checks passed, including promoted waiting tickets, saved next steps and empty states. The desktop composition study is illustrative. Actual Edge rendering of this version has not been verified. Next action is owner feedback on the delivered HTML.

## 2026-11-21 — Hoval visual identity and dark dashboard
App commit `11b5eae`. The original inline logo from https://www.hoval.com/en/ includes the red fill `#E2001A`; the portable file embeds it locally. The desktop layout combines an asymmetric priority board, compact navigation, and a seven-day date strip. The ticket mix derives from the imported or sample snapshot. Waiting tickets already on the plan are excluded from the waiting list. The two Node test suites passed. Desktop and narrow browser previews verified the layout, navigation to Tickets and ticket details. The prototype remains a standalone local HTML, with manual JSON import and an editable time draft. The next acceptance step is opening the HTML in the owner's managed Edge.

## 2026-11-21 — Calendar and explicitly staged deadline changes
The owner confirmed moving a ticket changes its desired completion. Week and Month display titles directly. Dated project milestones persist locally independently of tickets. The browser stages changes per ID and preserves local wall time (new dates default to 16:00). Sync sends only reviewed numeric request deadlines using a file-system-access handshake to the companion started by the user in the existing assistant folder. The helper reads the current assigned request, checks the previous deadline, patches and verifies. Matching values are idempotent on retry. Missing or ambiguous receipts retain drafts. No credentials enter the HTML. The compare and PATCH are separate API operations. C-prefixed workflow IDs and cloud milestone sync are outside this path. Verified calendar interaction, responsive layout, persistence, Node regressions, simulated browser batch/partial receipt, mocked PowerShell update and an actual helper process against a simulated API. Managed Windows 5.1, tenant policy and live writes still require owner acceptance. App 75bc5d8; helper a622c2b.

## 2026-11-21 — Managed-laptop fallback
Unsigned Focus-Sync.ps1 failed before execution on the owner’s laptop. Added pure JSON package download accepted by the existing 1.5 schema. The assistant performs its normal confirmation and writes one internal note with each deadline change. Package download keeps drafts until refreshed source data confirms the requested date. No tenant write or execution-policy change. Offline, planner, package-contract and simulated companion tests passed.

## 2026-11-21 — Single website requirement
The owner rejected starting any additional program or moving JSON files. The daily workflow must run entirely through Focus. Reviewed the documented Xurrent authorization-code flow and its mandatory client secret and registered callback. Deployment host, app registration and a live read remain unverified. The portable prototype has not gained a live connection in this checkpoint.

## Laptop-only checkpoint · 2026-11-21
The owner has no available internal host. The site must start from the corporate laptop. Sources now offers a user-initiated, anonymous browser reachability check restricted to the fixed Xurrent /v1/me URL, with credentials omitted. A neutral external preflight advertised support for Origin null and the API headers. An unauthenticated GET returned 401 with an Xurrent request ID. Browser policy on the actual device and appropriate authorized authentication remain open. Do not assume access to the existing Windows-protected token from the HTML. The check sends no corporate data and performs no writes.

