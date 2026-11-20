# My Hoval Focus

Personal work dashboard for projects, tasks and selected information sources.
Application copy is English; collaboration with the owner is in Polish.

**Status as of 2026-11-20 — working Power Apps / SharePoint prototype; portable local web app planned, implementation paused pending the owner's signal.**

The Excel importer created 41 tasks and a second run updated them without confirmed duplicates. The owner reports that the Projects screen renders, but dislikes its visual quality and scaling. Further Power Apps screen work is paused while we assess an internal web front end.

## Start here — for any AI or developer

1. Read [AGENTS.md](AGENTS.md) and the latest [product specification](docs/PRODUCT-SPEC.md).
2. Read [current state](docs/STATE.md), [next steps](docs/NEXT_STEPS.md) and [known issues](docs/KNOWN_ISSUES.md).
3. Read [architecture](docs/ARCHITECTURE.md) and [handoff procedure](docs/HANDOFF.md).
4. Inspect the code before changing anything. Do not restart the project or assume the website already exists.

**Current checkpoint:** documentation handoff before further work. Xurrent is the primary source. The proposed first web release is a portable local app with ticket-file import, Today, AI-assisted priority/review workflows and copy-ready Toggl allocation. Live integrations remain unverified. Read [next steps](docs/NEXT_STEPS.md) before acting.

## Contents

| Directory | Contents |
|---|---|
| `office-scripts/` | Read-only Excel extractor, already tested by the owner in Excel and a cloud flow |
| `powerapps/` | Paste-ready Projects controls, OnVisible formula, reconstructed My Sources controls with known fixes |
| `sharepoint/` | List column definitions and field XML |
| `flows/` | Reconstructed flow blueprints, expressions and source-test notes |
| `schemas/` | Data contracts |
| `tests/` | Synthetic fixtures and extractor regression tests |
| `config/` | Deployment template; real deployment values stay outside Git |
| `docs/` | State, architecture, decisions, limitations, install instructions and continuation prompt |
| `tools/` | Local validation and secret-pattern checks |

## Important: this is not a full tenant backup

We do **not** have an exported `.msapp`, a Power Platform solution ZIP, actual flow export ZIPs, credentials, connection bindings or application permissions. Flow JSON files here are explicitly **blueprints, not directly importable packages**. Screens are control code, not a complete app.

See [recovery and setup](docs/SETUP.md) for what can be reconstructed and what must still be exported from the tenant. No tenant changes happen by cloning or testing this repository.

## Local checks

```sh
npm install
npm test
python -m pip install -r requirements-dev.txt
python tools/validate.py
```

The Node tests transpile the Office Script and execute it against a minimal workbook mock. They do not validate Excel Online, connector permissions or Power Apps formulas in a live tenant. The Python check parses YAML/JSON, checks selected source invariants and scans repository text for selected sensitive patterns. It is not a security certification.

## Existing separate project

The earlier Sites/Next.js prototype is at [maciekkoz-PL/tickety-ai](https://github.com/maciekkoz-PL/tickety-ai). It is **not** the current Microsoft 365 prototype, and must not be deployed, overwritten or migrated as an implicit part of this work. This repository was created separately at the owner's request.

## Privacy and deployment

**GitHub metadata checked on 2026-11-20 reports this repository as public.** The original intent was private; reconcile that setting before adding private deployment details. Documentation in this checkpoint is sanitized. This task did not change repository visibility. Only neutral synthetic task fixtures are committed. No actual email/chat exports, workbook rows, screenshots with company data, tenant/user GUIDs, tokens or connection credentials should be committed. `config/deployment.local.json`, raw exports and private data are ignored.

No license is granted by this repository; corporate reuse/ownership needs to be settled by the owner and employer. Do not grant additional access or publish corporate data without instruction.

**Owner-facing continuation prompt:** [START-HERE-PL.md](START-HERE-PL.md).
