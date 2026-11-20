# Product specification and conversation handoff — 2026-11-20

This document captures the latest planning conversation. It supersedes earlier Projects-first/SPFx-first product priorities. No new web implementation was authorized in that conversation. The owner asked to discuss the design, then save the project so another AI can continue.

## Purpose and owner preferences

My Hoval Focus is a personal work dashboard with English UI and Polish collaboration with the owner. Xurrent is the primary source of tasks. Excel projects, Outlook, Teams and Toggl support the daily workflow. The owner wants a polished, responsive application worth showing to colleagues and management, with minimal manual setup and clicking. He prefers to avoid requesting IT assistance and cannot freely install software on the corporate laptop. He declined registering his private phone with the company. Access from such a phone remains unverified.

The current direction is a portable local web app opened on the corporate laptop, initially using an import produced by the owner's existing Xurrent PowerShell workflow. This is a proposed implementation route. Actual packaging, permitted execution, persistence and data access must be tested. Local files do not automatically inherit Microsoft 365 authentication. Do not revive Power Pages or require SPFx/Entra administration as a prerequisite for a local import pilot.

The owner previously requested notice before implementation so he can switch to his preferred model. Latest authorization is repository documentation and continuity. Continue design discussion or await an explicit build instruction.

## Daily navigation and visual direction

Proposed navigation is Today, Tickets, Projects and Sources. Today combines My top 3 and Needs your action. Waiting for needs a clear view or section. Review tickets and Wrap up my day are primary workflows. Dark graphite sidebar, light reading surfaces, restrained Hoval-red actions and clear readable typography are the discussed direction. Detailed layouts remain proposals. Avoid excessive cards, decorative counters, tiny text and fixed-coordinate scaling. Show loading, empty, error and stale-data states.

Laptop is the first practical target. Responsive narrower layouts are desirable, but private-phone deployment is not established. UI quality must be evaluated with realistic synthetic long titles and notes, keyboard interaction and practical laptop widths.

## Morning plan and suggested top 3

At approximately 08:00, Today should help the owner choose three next actions across tickets and projects. The owner accepted top 3 and explicitly wants the application to help select them. Proposals need short reasons grounded in available data. The owner can accept, replace or discuss them.

Assess consequences of waiting, deadlines/promises, whether the action unblocks others, whether a concrete step is possible today, follow-up dates and requester/stakeholder importance. The owner prefers an actionable SAP task blocking two people over a routine ticket due today when a one-day delay has little impact. Due today items must remain discoverable outside top 3.

Stakeholder importance is an editable personal preference, provisionally ordered as direct manager, a named second-priority colleague, country heads, other Liechtenstein colleagues, then other users. Exact named mappings must be confirmed privately and configured outside public Git. The manager's surname has conflicting spellings in the chat and a prior Teams result. Match stable identities rather than guessing from display names or country. Role membership and country may be unknown. The hierarchy is a factor alongside actual business impact, not an unconditional override. Mere presence in a CC list is insufficient evidence of dependency.

Suggested interactions are Accept plan and Review with AI. Keep the accepted plan stable during ordinary refreshes; propose changes when important new work arrives. An owner can promote an inbox item using Add to today's focus and choose which existing priority to move.

Do not fabricate commitments, affected users, urgency, dependencies or promises. Display the evidence or original source when explaining a choice. Rule-based suggestions can provide a usable fallback while AI integration remains pending. Exact scoring and weights are not decided.

## Ticket review and personal decisions

The requested experience draws on the owner's Ticket Asystent. Its exact current code/export is not present here and must be inspected before claiming functional parity. Do not modify the separate tickety-ai repository implicitly.

Review one ticket at a time with source status, next target, useful recent notes and the previous personal decision. Allow a Polish AI discussion and English draft notes by default, preserving the owner's choice of Polish where appropriate. Save & next, skip, resume and a final summary should support an interrupted review.

Keep Focus reminders, next actions, waiting-for person and planned work separate from changes proposed for Xurrent. Drafts and personal decisions must survive sessions and refreshed source imports. An explicit final confirmation precedes external updates. Re-read current Xurrent state before applying a draft; surface conflicts and partial failures. Retry must not duplicate notes. Repository access and prior examples do not authorize autonomous ticket closure, email or chat sending.

The owner wants Refresh tickets on demand. In the initial file-import version label the actual action Import tickets and display source export time separately from local import time. Refresh tickets should mean genuine retrieval once that path works. Reimport updates source fields by stable source identity while retaining personal metadata and unsent drafts.

## Incoming Outlook and Teams requests

Owner welcomed the proposed Needs your action workflow. Example intended behavior is a card explaining that a colleague asked for help on Teams and offering to draft a ticket. Names and messages in design examples are synthetic.

Suggested actions are Draft ticket, Link to ticket, Remind me later, Dismiss, Open conversation and Review reply. A reply from someone in Waiting for should surface alongside the last saved decision. Draft ticket prepares the source-supported title/description and offers questions for missing details, followed by owner review before creation.

Analyze a conversation together rather than issuing one card per message. Group related messages, record source IDs and handled state, deduplicate across refreshes and account for a later reply such as 'already solved'. Linking to an existing ticket needs an explainable proposed match and confirmation when uncertain.

Most items should be cards with a quiet count. Interruptive popups were proposed for actionable high-impact/time-sensitive situations. Important sender alone should not turn a thank-you into an alert. Avoid an alert for every incoming message.

Proposed first scope is direct emails and Teams 1:1 conversations, checked on demand through Check for new requests. This scope and background polling are not implemented. Continuous ingestion, AI classification and delivery into a local app need a verified permitted route. Existing connector tests are insufficient proof of this end-to-end flow.

## End of day

Wrap up my day should show completed work, remaining promises, unsent drafts/updates, tomorrow's likely first steps and a proposed Toggl allocation. The owner has previously had review notes that were discussed but not sent, so prominently surface unsent work. This workflow is a design proposal, with the Toggl need explicitly requested.

## Toggl time reporting — owner-confirmed requirement

The owner uses Toggl Track and currently records broad entries with substantial delay. Focus should prepare a daily timesheet from what he worked on, and later write approved entries to Toggl if integration works.

Description format is ticket reference, ' - ', exact ticket title. For ordinary support use the numeric reference and Support hours. For a change preserve the C prefix and use Change hours. Do not prefix an ordinary numeric ticket with the word Support. Example synthetic descriptions are '12345678 - Investigate invoice layout' and 'C23456789 - Prepare test system'.

The owner says minute precision is unnecessary. For a full workday approximately eight hours is the target. If he worked on three topics, coarse blocks such as 08:00–10:00, 10:00–13:00 and 13:00–16:00 are acceptable. These are estimates reviewed by the owner. Do not infer measured elapsed duration from gaps between messages or silently invent work to fill eight hours.

The prior screenshot confirmed visible Toggl projects Support hours, Change hours, Coordination and Absences HoAT,HoPL. Numeric labels shown next to them have not been verified as API project IDs. Resolve actual workspace/project IDs through authorized configuration later. Meetings and absences have descriptions that can differ from ticket format.

Proposed UX is a compact editable daily allocation with topic, project, duration and optional time range, plus total and overlaps. The owner can say 'two hours on topic A, most of the rest on B'. Include meetings within actual workday totals and allow shorter days/absence. Do not require a timer for this workflow. An optional Start working timer was suggested earlier, but is not necessary for the owner's coarse reporting preference.

First version should generate copy-ready entries. Later Send approved entries can use the Toggl API after permitted connectivity/authentication is verified. Compare existing Toggl entries and prevent duplicate reporting on repeated sends. Represent unsent/sent/failed state per entry and preserve corrections. Do not place an API token in frontend source, prompts or Git.

Official documentation checked during this conversation confirms the Track API provides creation of time entries. It does not prove access from the eventual local browser package.
- https://engineering.toggl.com/docs/track/api/time_entries/
- https://engineering.toggl.com/docs/tracking/

## Conceptual local data responsibilities

This is guidance for implementation, not an implemented schema.
- Source snapshot retains stable external IDs, type, title, status, next target, notes and export/import timestamps when provided.
- Personal work state retains next action, waiting-for, reminder, accepted daily plan and user overrides independently of source snapshots.
- Draft operations retain intended external change, source version, approval and per-operation result.
- Inbox candidates retain conversation/message references, grouping, rationale and handled state.
- Daily time allocations retain date, source reference, project mapping, estimated/observed provenance, duration, approval and Toggl sync result.

Choose a persistence and backup method appropriate to the verified portable packaging. Test reopening, updating the app and recovering a backup. Do not assume browser storage under file:// is reliably portable across paths/devices. Keep corporate data on permitted storage.

## Acceptance checks for later implementation

1. Import a synthetic ticket export twice and preserve reminders, draft notes and the accepted plan without duplicate tickets.
2. Show the distinction between stale source data, a new local import and genuine live refresh.
3. Explain each proposed top 3 using available evidence and permit an override.
4. Group five related chat messages into one candidate, and reconsider it after a resolution message.
5. Resume an interrupted review with unsent drafts intact.
6. Build an editable eight-hour estimate from three selected topics and handle a shorter day and meetings without overlap.
7. Produce the correct support/change description and project mapping without fabricating API IDs.
8. If later writes are implemented, surface conflicts and partial failures and safely retry without duplicate notes or time entries.
9. Reopen the portable app and recover its saved state using the documented backup procedure.
10. Verify actual integrations separately from UI-only or synthetic-data demonstrations.

## Open decisions to resolve when relevant

- Exact permitted portable packaging and local data/backup location.
- Actual existing Xurrent script/export shape and stable IDs; credentials stay outside Git.
- Direct refresh route versus file import, and local automation availability.
- Copilot or other approved AI integration, licensing, company-data handling and actual API availability. A Microsoft 365 Copilot subscription alone is not proof of an embeddable API.
- Live Outlook/Teams ingestion and whether cloud output can be retrieved by the local app.
- Actual Toggl workspace/project mapping and allowed API access.
- Precise stakeholder identity mappings and eventual scoring weights.
- Repository visibility must be reconciled with the owner's original private-repository requirement.
