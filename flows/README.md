# Flow blueprints, not exported flow packages

The owner built these steps in Power Automate's designer and reported success. We have not downloaded the actual definitions. JSON here is a readable reconstruction for another AI/developer, not something to import into Power Automate as a ZIP or solution.

Use the existing flows before creating replacements. Internal names ReadProject, ProjectData, GetSource, ForEachTask, TaskKey, FindTask, TaskExists, CreateTask and UpdateTask are used literally by expressions. Renaming requires corresponding expression updates.

Designer expressions in the blueprint omit the leading @ and are pasted with **fx**. Filter `ID eq 1` is literal text. Field Title is restricted to 255 characters; TaskDescription holds the full description. For UpdateTask the ID comes from FindTask, not GetSource.

Polish UI: Control category **Kontrola**, Apply to each **Zastosuj do wszystkich**, Compose **Redaguj**, Get items **Pobierz elementy**, Create item **Utwórz element**, Update item **Aktualizuj element**. SharePoint HTTP is **Wyślij żądanie HTTP do programu SharePoint**.

Current SourceKey concatenates source ID and Step. Initial Steps 1..41 were unique. Do not assume that remains true; current flow lacks duplicate/missing source validation. Also escape apostrophes in OData if future task IDs permit them. A later production rewrite must address these assumptions before generalizing the importer.

No schedule, no Enabled gate, no deleted-row handling and no atomic complete-snapshot publication. Read docs/KNOWN_ISSUES.md.
