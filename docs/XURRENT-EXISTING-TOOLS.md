# Existing Xurrent tools recovered — 2026-11-20

## Discovery
The owner directed us to GitHub and the ChatGPT project TICKETY w Xurrent, conversation Organizacja zgłoszeń 4me. The latter is a ChatGPT project, not a project record inside the Xurrent service.

Both GitHub main trees were inspected. my-hoval-focus holds the Microsoft 365 prototype and handoff. tickety-ai holds the earlier Sites UI, model and R2 state endpoint. Its README and inspected source confirm there is no connected Xurrent API in that web application. Neither current tree contains the PowerShell assistant.

The actual scripts were found among the owner's saved files. Do not ask the owner to upload them again before looking there. Current saved artifacts include:
- Pobierz_tickety_Xurrent.txt, an earlier standalone GET-only exporter.
- TICKETY w Xurrent/Xurrent_Asystent.zip, base assistant archive, saved version 4.
- TICKETY w Xurrent/Xurrent_Asystent_1.5_aktualizacja.zip, update from 13 November.
- A ticket JSON snapshot from 18 November and a separate approved-change JSON artifact. These contain company data and remain outside Git.

## Code inspected
Both ZIPs were downloaded and their source/instructions inspected without executing them. The base archive includes START.cmd, Asystent.ps1, Eksport.ps1, Token.ps1, instructions and an example real change package. The 1.5 ZIP is an overlay containing a replacement Asystent.ps1 and its instructions. It is not a standalone distribution.

Eksport.ps1 uses Windows PowerShell 5.1 and GET requests to the Xurrent v1 API. It reads the authenticated user, personally assigned open requests, each request's details and notes, with pagination. It checks assignment and records read failures. Attachments are not downloaded.

Export shape confirmed in source:
- exported_at, account, user, selection, count, complete, limitations, failures
- requests array, each containing details, notes, details_read, notes_read
- details include id, subject, category, status, impact, urgent, assignment/requester context, timestamps/targets and workflow/project links
- notes include id, created_at, person, text, internal and medium

Account and user checks are hardcoded in the recovered exporter. Move those values to private configuration if adapting it for reuse. The original code and real package were not copied into the public GitHub repository.

Token.ps1 stores the token using Windows DPAPI for the current Windows account. The actual credential file is not in the archives. It is not portable between Windows accounts. Do not retrieve or publish its contents.

Asystent.ps1 reads a versioned change JSON package, previews changes and uses GET/PATCH for request updates. Version 1.5 offers whole-package confirmation, per-ticket confirmation or cancellation. Code/instructions include a local result journal, skipping completed operations, stopping on errors or concurrent ticket changes, and a manual check before retrying an uncertain result. Prior successful writes are not rolled back after a later failure.

Important source semantics: next_target_at is treated as calculated by Xurrent. The existing assistant can propose updates to desired_completion_at. Do not assume the API directly permits setting Next target.

## Evidence limits
Earlier conversation retrieval reports successful exports and an earlier successful batch. This checkpoint inspected stored code and instructions only. No current Windows run, live Xurrent API request, token access or write was performed. Do not infer that the old export snapshot is current, that every Change is included, or that browser-to-script integration already works.

## Next technical step
When implementation is authorized, reuse the recovered exporter contract for a read-only import proof. Inspect complete recovered code before adaptation, then determine the permitted way for a local UI to request a fresh export without exposing credentials to browser code. File import can be used to validate the data path first. Retain per-request partial-read flags and preserve Focus personal state by stable source IDs.

The owner's files contain the source we need; another upload is not currently required. Direct Refresh tickets still needs a proven local execution/data exchange path. Do not rerun old change packages during integration testing.
