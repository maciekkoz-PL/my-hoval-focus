# Next steps — 2026-11-20 continuation checkpoint

Read docs/PRODUCT-SPEC.md first. This replaces the old SPFx-first / Projects-first plan.

## Next session
1. Validate the second Today design in the owner's usual Edge profile. Use the same local filename and location to retain browser state, or restore a JSON backup. Review the first ticket, switch priorities using the controls on its card, and check the title, action and inbox at laptop zoom. The first HTML already opened on the managed laptop.
2. Select Edit under My top 3, replace one ticket and save. Close and reopen the same file from the same folder. Confirm the revised plan persists. If local storage is unavailable, try the JSON backup and restore controls.
3. In Sources, download the synthetic example, import it, save a next action, and reimport it. Verify the personal action survives. Test a real export locally only after the sample works. Keep real data outside Git.
4. Collect feedback on the Today layout before extending Projects, AI, ticket ingestion or scheduling. Run `node tests/today-offline.cjs` after changes. The Node test exercises app logic with in-memory browser objects. It does not test layout, file-picker permissions or tenant connectivity.
5. Preserve existing flows and lists. A permitted live refresh path, AI provider and actual Toggl submission remain future work.

## Existing technical backlog
Obtain recoverable Power Apps/flow exports when practical. Harden source-count/schema/Step validation, concurrency, stable project-task identity, stale-row handling and completed-run publication before scheduling the Excel importer. Sources.Enabled remains configuration only. Source deletion is deferred.

## Hosting alternatives
Power Pages has observed blockers in the visible environments. SPFx catalog rights and independent corporate hosting/Entra remain unverified. These are alternatives if the owner later chooses managed hosting, not prerequisites for the local import pilot. A local app does not bypass authentication, CORS or corporate controls.

## Visibility
GitHub metadata observed during this checkpoint reports public. Keep content sanitized. Exact stakeholder names/mappings, personal endpoints, raw company data and credentials belong in private deployment configuration. Do not assert privacy based only on an old README.

## Exporter discovery update
Read [XURRENT-EXISTING-TOOLS.md](XURRENT-EXISTING-TOOLS.md) before requesting scripts. Base archive and 1.5 overlay were located and inspected. Reuse their export contract; verify local UI execution/data exchange after build authorization. Exact raw scripts, real packages and snapshots stay outside public Git.
