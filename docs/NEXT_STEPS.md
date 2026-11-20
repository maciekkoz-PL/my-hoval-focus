# Next steps — 2026-11-20 continuation checkpoint

Read docs/PRODUCT-SPEC.md first. This replaces the old SPFx-first / Projects-first plan.

## Current authorized work
The owner asked to save all project knowledge to GitHub before doing more. Documentation is the current deliverable. Build work remains paused until the owner's explicit signal; he previously asked to switch models first.

## Next session
1. Read README.md, AGENTS.md, docs/STATE.md, docs/PRODUCT-SPEC.md and docs/KNOWN_ISSUES.md.
2. Continue the owner's design discussion if requested. Do not repeat settled questions about Xurrent priority, top 3 assistance, language or coarse Toggl allocation.
3. When building is authorized, inspect the existing permitted Xurrent export/script and package constraints. Use a sanitized fixture to establish a portable local app import and persistence/recovery proof.
4. Build the Today / Tickets core around stable ticket IDs and personal state. Plan premium responsive visuals together with actual import/review interactions. Preserve decisions across refreshes.
5. Include copy-ready coarse Toggl allocation early. Live Xurrent updates, AI, mailbox/chat ingestion and Toggl sending require separate verified integration paths.
6. Retain the working Excel → Office Script → manual Power Automate → SharePoint pipeline. Connecting it to the local app is unresolved.
7. Keep documentation current and report real validation, not mock success as tenant proof.

## Existing technical backlog
Obtain recoverable Power Apps/flow exports when practical. Harden source-count/schema/Step validation, concurrency, stable project-task identity, stale-row handling and completed-run publication before scheduling the Excel importer. Sources.Enabled remains configuration only. Source deletion is deferred.

## Hosting alternatives
Power Pages has observed blockers in the visible environments. SPFx catalog rights and independent corporate hosting/Entra remain unverified. These are alternatives if the owner later chooses managed hosting, not prerequisites for the local import pilot. A local app does not bypass authentication, CORS or corporate controls.

## Visibility
GitHub metadata observed during this checkpoint reports public. Keep content sanitized. Exact stakeholder names/mappings, personal endpoints, raw company data and credentials belong in private deployment configuration. Do not assert privacy based only on an old README.
