# Known issues and limits

1. **Current UI quality:** owner is dissatisfied with visual quality and scaling. Projects layout uses fixed positions plus width formulas, not a complete responsive container design. Desktop minimum target 1366x768; mobile not implemented.
2. **Data cap:** OnVisible uses ClearCollect with a filtered SharePoint source. The app data row limit applies (default 500). Current 41 fit; larger sources require a different loading design. Counts are local collection counts, not server totals.
3. **Source selection:** Projects is hardcoded to SourceId 1. Source lookup title is `Titel` in this tenant; do not blindly rename it to `Title` in Power Fx.
4. **Statuses:** only exact trimmed case-insensitive Done counts completed. Blank status is Unknown/not recorded, not Not started. Other status strings are preserved. Completion is task-count percentage, not effort progress.
5. **Dates:** DueDateText remains displayed text. No overdue logic/timezone-normalized dates implemented.
6. **Sync:** manual trigger only. Refresh data in the app reads SharePoint, it does not run the Excel script. Enabled has no execution effect.
7. **Upsert identity:** key is SourceId|Step. Renumbered/reused Step values can change associations. Unique SourceKey prevents identical key duplicates, not semantic duplicates or concurrency conflicts.
8. **Removed tasks:** not deleted/archived when removed from Excel. SyncRunId alone does not define an atomically published complete snapshot. Partial runs can leave mixed data.
9. **Validation:** source count, returned reviewRows, duplicate Steps and transactional failure recovery are not guarded by the current manually built flow.
10. **Power Apps validation:** local YAML parsing/reference/delimiter checks are not Studio compilation. Owner reports Projects displays; detailed QA, HTML scrolling/accessibility, navigation and current error count not established.
11. **My Sources:** original generator used invalid `mhffrmSource.Item` references in three button formulas. These were fixed manually and the owner verified success. Repo file has those fixes reconstructed. Source deletion remains deferred; new-source reset may discard unsaved work without a guard.
12. **Old warning:** MainScreen1 Search delegation warning was knowingly deferred.
13. **Xurrent:** generic HTTP flow blocked by missing Premium. No successful API connection claim. Do not abuse SharePoint HTTP to call unrelated external APIs.
14. **Recovery:** no tenant `.msapp` or exported flow/solution package available. Files here are partial source recovery + comprehensive handoff.
15. **Sharing:** prototype lists and connections are personal; no multi-user data isolation/ownership model implemented.
16. **Hosting:** no verified SPFx catalog rights, independent corporate hosting or Entra registration. No new WWW app exists.
