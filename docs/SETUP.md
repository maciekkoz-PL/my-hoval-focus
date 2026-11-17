# Setup and recovery

## Prerequisites
Existing authorized corporate Power Apps/Power Automate/SharePoint/Excel Online access. No assumption that you can install tools on the corporate laptop. Local repo tests can run on an approved development environment without corporate access.

## Resolve deployment values
Copy config/deployment.example.json to ignored config/deployment.local.json. Retrieve the exact site URL from an existing flow, workbook URL from source record 1, and list GUIDs using:

```text
GET _api/web/lists/GetByTitle('MyHovalFocus-ProjectTasks')?$select=Id,Title
GET _api/web/lists/GetByTitle('MyHovalFocus-Sources')?$select=Id,Title
```

Use the standard SharePoint connector's **Send an HTTP request to SharePoint** action with the personal site selected. Do not use the Premium generic HTTP action for this.

## Lists
Existing lists should be reused. Fields are described in sharepoint/. Built-in Title remains available; in this tenant Power Apps displays Sources Title as `Titel` but REST/flow payloads use `Title`.

The one-time setup loop initialized an Array variable ProjectColumns from field XML and called createfieldasxml for each. See flows/setup-project-tasks.blueprint.json. This is not idempotent: inspect existing fields first. Do not rerun blindly. SourceKey is indexed and unique, text length max 255; Required was false in the returned metadata. SourceId is indexed numeric with zero decimals.

## Excel extractor
1. In Excel Online, Automate, create/update Office Script named MyHovalFocus_ReadProject using office-scripts/read-project.ts.
2. Worksheet Tabelle1 must contain the eight expected headings. Script searches heading positions rather than assuming fixed column order.
3. Run once and inspect summary/reviewRows. No workbook data is written.
4. In the existing flow ReadProject action, select the same workbook/script. The return type is string; ProjectData uses json(body('ReadProject')?['result']).

## Manual import flow
Reconstruct using flows/sync-project-tasks.blueprint.json and flows/README.md. Exact internal action names matter. The files are a precise reconstruction of the described actions, **not** a Power Platform export or directly importable flow.

Existing sequence: manual trigger → ReadProject → ProjectData → GetSource → ForEachTask → TaskKey → FindTask → TaskExists → UpdateTask/CreateTask. Source ID fixed to 1, not Enabled-filtered. No deletion or schedule. Reuse existing connections; never paste tokens into definitions.

On a clean test target with the synthetic fixture: 41 unique tasks; second run same count and UpdateTask branches. On production do not run the provisioning flow or purge list items as a test. Keep source keys stable.

## Power Apps source recovery
1. Existing app My Hoval Focus must have MyHovalFocus-Sources and MyHovalFocus-ProjectTasks datasources connected.
2. Use an empty scrProjects screen. Set OnVisible from powerapps/projects/OnVisible.pl.fx.
3. Copy the complete controls YAML text from powerapps/projects/controls.pa.yaml and paste on the blank canvas, **not** into the formula bar.
4. Navigate away/back to execute OnVisible, then preview. Verify errors, source data, search, filters, selection, details scrolling and open-workbook behavior.
5. My Sources navigation expects scrMySourcesV2. Return navigation must be added deliberately; App.StartScreen/published status is unverified.
6. My Sources source is under powerapps/my-sources/. It incorporates three confirmed button fixes. Do not overwrite a modified live screen without obtaining its current source/export.

Projects is a desktop prototype with local collection limit and static source ID. See known issues before changing its scope. No code here silently writes to the task list.

## Missing complete backups
Obtain current `.msapp` and actual cloud-flow/solution exports through supported Power Platform UI. Export credentials/bindings are not portable secrets to put in Git. Document export version/time and preserve originals in approved storage. Until then, this repo can reconstruct the described solution but cannot guarantee byte-for-byte disaster recovery.
