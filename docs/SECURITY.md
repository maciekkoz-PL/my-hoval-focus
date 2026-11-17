# Data and access boundaries

Private source repository only. Do not publish it, enable Pages, deploy to public hosting, broaden sharing or invite collaborators implicitly.

No real mailbox/chat contents, workbook rows, corporate screenshots, tenant/user GUIDs, token headers, cookies, signed URLs, keys or auth-bearing flow exports in Git. IDs such as source record 1 are local data keys, not secrets. Schema names and product branding are intentionally retained for continuity.

Use config/deployment.example.json as a template; put real values in ignored config/deployment.local.json. Full tenant exports belong in approved private storage; review/sanitize before committing any source representation. The .gitignore helps avoid accidents but is not a data-loss-prevention boundary.

Run tools/validate.py and review the diff. The scanner checks selected patterns; a passing scan does not prove an absence of all sensitive data. No credentials are needed for local synthetic tests.

Corporate browser/laptop restrictions and licensing remain in force. Do not use local HTML, session extraction, exposed tokens or generic connectors as a way around them. SPFx availability, Entra permissions and hosting rights must be established explicitly.
