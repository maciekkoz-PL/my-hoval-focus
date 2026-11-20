# Next steps, in order

The [web brief](WEB-BRIEF.md) records the proposed first release and acceptance criteria. The owner will signal when to begin implementation after switching models.

## 1. Confirm a deployable web route — current priority
- Inspect, using authorized corporate access or short user-guided steps, whether a suitable SharePoint site and an existing tenant/site app catalog are available and whether the owner may deploy an SPFx solution.
- Distinguish permission to read a catalog, upload a package, approve/deploy a solution and add a web part. A visible menu alone is not proof of all permissions.
- If blocked, explain the exact missing right and smallest IT dependency; do not keep designing a full UI or promise that a local HTML file bypasses authentication/CORS.
- Clarify employees-only vs network/VPN-only access.
- If feasible, make a minimal authenticated **read-only** test that reads source 1 tasks from the existing list. Handle errors and pagination; confirm real records while preserving permissions. No writes or broad new permissions needed for the proof.
- Only after a successful data access + deployment proof choose the final web stack and build the premium responsive UI.

## 2. Obtain recoverable tenant exports
- Save/export the current Power Apps app and flow packages/solution through supported tenant tooling. Keep originals in approved private storage, not blindly in Git (they may include identifiers or sensitive payloads).
- Compare sanitized source with this repo and record exact dates/versions. Current repository has reconstructed flow blueprints, not full backups.

## 3. Harden ingestion before scheduling
- Guard GetSource count=1; validate returned tasks/schema/reviewRows and uniqueness of Step/SourceKey before writes.
- Prevent concurrent runs from racing; decide on per-source sync state and error reporting.
- Define stable task identity. SourceId|Step currently assumes steps are never renumbered/reused. Row numbers are not stable IDs either.
- Choose explicit handling of removed/renumbered rows. Do not mass-delete or hide old rows on a partial failed import.
- Use a completed-run marker for snapshot publication; SyncRunId is currently stamped on individual rows only.
- Wire Enabled and scheduler deliberately; avoid double/overlapping flow copies.

## 4. Expand the product
Overview from real data; project/source navigation; proper date normalization; source delete behavior; Outlook and Teams ingestion with privacy/deduplication; Xurrent access through an approved licensed route. No automatic sending of emails/chat/ticket notes without the owner's explicit instruction.

## If the owner chooses to stay with Power Apps
Rebuild layout using responsive containers and supported modern controls where appropriate. Do not just stretch the current coordinate-based layout or claim it is fully responsive. First request the owner's concrete feedback or current screen export; preserve working data bindings. Fix source navigation and verify App.StartScreen/published state.
