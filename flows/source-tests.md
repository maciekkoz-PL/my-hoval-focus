# Other source tests — historical observations, not production ingestion

## Outlook
Office 365 Outlook connection worked. Get emails (V3) returned a real automatic support notification with subject, HTML body, from/to, received date, IDs and attachments array. Raw email and transport headers are excluded. Ingestion must deduplicate message IDs and not treat each notification as a distinct support ticket.

## Teams
The visual chat picker originally showed meetings rather than 1:1 conversations. List chats with type **Dwóch rozmówców** and topic **Wszystkie czaty** exposed 1:1 chats. Tests worked for three recent contacts. A truncated custom chat ID caused 404 LocationLookupFailed; a complete returned chat ID worked. Never synthesize/shorten chat IDs.

List members UI exposed Czat grupowy / Kanał, not a generic Czat option. The groupchat thread type worked with a returned 1:1 thread ID. GetMessagesFromChat succeeded with a complete ID. A meeting message could be `systemEventMessage` (e.g. call ended), not user text. Handle pagination (`@odata.nextLink`) and message types.

Prototype loop: list chats → foreach value → ListMembers with recipient from current item's id (expression, not literal string) → filter out self → append {chatId, rozmowcy} to array variable Rozmowy. Tested output contained the other participant. This is not a persisted multi-user or scheduled sync.

## Excel
Get tables succeeded but returned []. Workbook has ordinary cells. Office Script path implemented; see office-scripts and sync blueprint.

## Xurrent / 4me
No connector found in the user's picker. Generic HTTP flow was blocked by a Power Automate Premium requirement before a successful API test. Do not claim direct Xurrent connectivity is proven. Outlook notifications provide partial information only, not authoritative ticket state.

## SharePoint / Lists
Read/write on personal lists confirmed. A corporate team site's lists could be read, but creating new resources there was not established. Lists standalone sign-in once failed, then access via corporate Microsoft 365 worked. Do not interpret that as a permanent service issue. Unregistered personal-phone access was blocked; owner declined device enrollment.
