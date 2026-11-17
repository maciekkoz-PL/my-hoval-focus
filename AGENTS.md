# Instructions for any agent working on this repository

## Read before acting
Read README.md, docs/STATE.md, docs/NEXT_STEPS.md, docs/KNOWN_ISSUES.md and docs/DECISIONS.md. State is a dated snapshot, not live tenant telemetry. Read repository files; do not rely only on the previous chat.

## Scope and preferences
- Project: My Hoval Focus, a personal workplace dashboard. App UI must be English. Speak Polish to the owner, Maciek.
- The owner wants premium visual quality and real responsiveness, minimal manual clicking, and precise short steps when his UI actions are necessary.
- Latest direction: preserve Power Automate + SharePoint; evaluate web/SPFx UI. Do not continue cosmetic Power Apps work without rechecking the objective.
- Corporate laptop cannot freely install software. No corporate policy, browser authentication, license or network bypasses.
- Do not touch the separate tickety-ai repo, Sites app or existing cloud data unless explicitly requested.

## Evidence and integrity
- Label verified tenant behavior, user reports, local test results, proposals and unknowns separately.
- Do not present blueprints as importable flows or YAML as a full application backup.
- Do not claim automatic synchronization: the flow is manually triggered. Enabled is not wired to execution.
- Never interpret blank status as Not started. Do not invent overdue dates, project health or AI summaries.
- Do not assume localhost/file:// inherits Microsoft 365 authentication, or that company network access grants API access.
- Existing source ID is 1. SourceKey uses SourceId|Step; do not renumber steps, delete tasks or reconcile stale rows silently.
- Power Fx pasted YAML uses invariant commas and single semicolon chaining. Direct Polish formula editor uses semicolons and double semicolon chaining. Do not globally replace separators inside quoted strings.
- In this tenant Power Apps exposes the Sources Title as `Titel`. REST uses `Title`. Verify datasource schema when changing environments.

## Safe collaboration
- Keep raw corporate data, credentials and connection exports outside Git. Use synthetic fixtures.
- No force-push, shared-history rewrite or unrelated deletions. Work on a focused branch for substantive changes.
- Read current HEAD and dirty state before edits; preserve others' work. Stop to resolve overlapping work rather than overwriting it.
- Only run checks meaningful for the change. Do not claim tenant validation from local mock tests.
- End each work session with docs/STATE.md and docs/NEXT_STEPS.md updated, dated handoff notes in docs/SESSION_LOG.md, tests and commit information. Push the work when authorized and access is available; otherwise state the blocker.
- Never put an access token into prompts, README, browser JavaScript, app frontend or commits.
