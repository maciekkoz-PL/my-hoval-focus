# Decision log

## 2026-11-15 — Name and product language
Use My Hoval Focus; application text English. Explain steps to owner in Polish. Grow beyond tickets into a personal dashboard. Delete-source feature deferred in favor of real ingestion and full app design.

## 2026-11-15 — Microsoft 365 prototype
Use existing permitted Power Apps, Power Automate and SharePoint access. Personal lists avoid placing personal-source data on a shared team site. Private phone enrollment was declined; do not promise unregistered phone access.

## 2026-11-15 — Read Excel via Office Script
Workbook had no structured tables; Get tables returned an empty array. Script reads used cells without modifying the workbook and detects mapped headings and section candidates. Dates/statuses preserved verbatim. It returns a JSON string, parsed by json(body('ReadProject')?['result']).

## 2026-11-15 — Task import
SourceKey=SourceId|Step selected after verifying the initial 41 Step values were unique. This is a provisional assumption requiring stable steps, not a universal key design. Fifteen columns provisioned. Manual create/update flow verified by the owner on two runs.

## 2026-11-17 — Reconsider frontend
Owner reports Projects displays but UI/scaling is unsatisfactory. Acknowledge coordinate-based implementation shortcomings. Evaluate internal WWW/SPFx; retain Power Automate and SharePoint. First prove hosting and authenticated list read. No migration executed yet.

## 2026-11-17 — Separate private GitHub continuity repository
Owner requested all recoverable project work in a separate repository so other AI tools can continue when credits run out. Create my-hoval-focus separately from tickety-ai. Store code, schema, sanitized fixtures, reconstructed flow blueprints, status and clear next steps. Exclude raw company data and credentials. Do not claim complete tenant backup.

## 2026-11-20 — Xurrent-first portable direction
The owner's main source is Xurrent. Power Pages shows environment blockers; the owner prefers avoiding IT dependencies. Prepare a portable local web route with initial file import from the existing Xurrent PowerShell process, preserving the Microsoft 365 pilot. Exact packaging and live integration are unverified. Building awaits the owner's requested start/model-switch signal.

## 2026-11-20 — Daily workflow
Owner accepted app-assisted top 3 and favors actionable work that unblocks colleagues over a low-consequence date-only priority. Stakeholder importance should be configurable. Owner welcomed Teams/Outlook Needs your action proposals. Preserve review drafts and personal reminders independently of Xurrent writes. Full requirement details and confidence levels are in PRODUCT-SPEC.md.

## 2026-11-20 — Toggl
Owner requested time-report preparation and eventual Toggl sending. Descriptions use ticket reference - title, with C prefix and Change hours for changes, numeric reference and Support hours for ordinary tickets. Coarse blocks totaling approximately eight hours for a full day are acceptable. Prepare editable copy-ready estimates early; verified API writing can follow. Required minute-level tracking was not requested.

## 2026-11-20 — Public repository observation
GitHub metadata returned public, despite prior private intent. This documentation update includes role-based stakeholder hierarchy and sanitized conventions. Exact names, corporate contents, screenshot and endpoints were omitted. Visibility was not changed.
