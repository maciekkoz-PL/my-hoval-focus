# Architecture

## Existing working project path
Excel Online workbook → Office Script (read-only, JSON string result) → manually triggered Power Automate → SharePoint ProjectTasks list → Power Apps Projects screen.

The Sources list stores source metadata. The importer is currently fixed to one workbook and source ID 1. It is not a generic source dispatcher.

## Earlier hosted web alternative
Keep the importer and lists. Replace the reader/UI with a corporate-hosted web application. SPFx is the first candidate because it is an established SharePoint extension model with access to SharePoint data in the user's context. App catalog deployment and suitable site permissions still need verification.

An independent React app is also possible, but requires an approved hosting path and separately configured authentication/API permissions, typically Microsoft Entra. Existing Power Apps connector bindings do not automatically transfer to the web frontend.

**Corporate-account access** and **corporate-network/VPN-only access** are different requirements. Clarify the desired access model before designing deployment. A private GitHub repo is source storage, not an approved host for company data.

## Current local web proposal — 2026-11-20
The latest direction is a portable local browser app using an import from the owner's existing Xurrent PowerShell workflow. Packaging, execution permissions, export schema, data persistence and recovery are still unverified. The existing SharePoint connector bindings do not automatically transfer to that app. See PRODUCT-SPEC.md for source snapshots, personal state, draft operations, incoming-request candidates and daily time allocations.

Start with copy-ready Toggl estimates. Direct refresh, AI conversations/classification and external writes are later integration proofs. Local processing requires the laptop to be running. Existing cloud flows can operate independently only once configured; bringing their output into the local UI is unresolved.

## Background collection
Scheduled cloud flows can run without the dashboard or laptop being open, provided their connections and policies remain valid and no local dependency is introduced. No such schedule has been configured here. Keep ingestion independent of whichever frontend is chosen.

## Multi-user future
Current lists live in the owner's personal site and flows use his connections. This is a personal prototype, not a shared production backend. Before colleagues use it, define ownership, separation of personal mail/chat data, permissions, retention, connection identity, operational responsibility and licensing. Do not simply expose the owner's Sources or Inbox to everyone.

## Existing separate web prototype
The tickety-ai repo is an earlier Sites/Next.js/Vinext experiment with demo data and platform-specific auth/storage assumptions. No migration or production deploy is authorized by the current repository-backup task. It must not silently become the new backend.
