# Session handoff procedure

## Starting a session
1. Inspect current branch, HEAD and dirty files. Pull/read current remote state before making changes.
2. Read AGENTS.md, PRODUCT-SPEC.md and current state/next steps. Do not repeat already successful Excel/Outlook/Teams connection tests unless needed for a new failure.
3. Identify the current user instruction; latest direction can supersede the snapshot.
4. Resolve config locally from existing flow actions/source list; do not ask the owner to recreate known resources.

## Ending a session
1. Record what changed, actual checks, unresolved risks and next specific action.
2. Update STATE, NEXT_STEPS and SESSION_LOG. Keep verified observations separate from assumptions.
3. Add necessary source and tests; review `git diff`, ignored files and sensitive data before commit.
4. Commit in a focused branch and push where authorized; do not force-push. Report repository/branch/commit, validation and anything not saved remotely.
5. If work cannot be pushed, retain an approved recoverable artifact and describe the access blocker accurately.

## What another AI needs
Authorized write access to this GitHub repo, plus appropriate access for live corporate tests. Repository metadata last reported public; the original intent was private. Neither a repository link nor a previous assistant's connector automatically grants a new AI access. Do not share tokens in prompts. The repo holds continuity; it is not a substitute for permissions.

## Outstanding owner input
Detailed Projects UI feedback has not yet been supplied. Owner has since discussed the local-app direction and daily workflows in PRODUCT-SPEC.md. Build is awaiting his start signal. Do not invent the feedback or claim it was incorporated.
