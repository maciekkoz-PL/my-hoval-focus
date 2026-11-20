# My Hoval Focus — brief wersji WWW

**Aktualizacja priorytetu, 20 listopada.** Maciej potwierdził, że głównym źródłem zadań jest Xurrent. Ekran Projects i 41 zadań z Excela to próba odczytu danych. O wyborze narzędzia decyduje obsługa rzeczywistej kolejki Xurrent. Najpierw porównaj My Inbox oraz Planner / My Day z potrzebami Macieja. Sprawdź istniejący odczyt Xurrent i możliwość odświeżania. Projekt widoków poniżej jest wcześniejszą propozycją. Budowa czeka na sygnał właściciela.

20 listopada 2026. Zaakceptowana prośba dotyczy przygotowania do budowy. **Rozpoczęcie implementacji czeka na sygnał Macieja po przełączeniu modelu.** Po sygnale zacznij od próby dostępu i wdrożenia opisanej poniżej. Układ i zakres ekranów są propozycją do dopracowania przez kolejny model.

## Co użytkownik ma móc zrobić

Po otwarciu My Hoval Focus Maciej ma szybko znaleźć zadanie, zobaczyć jego właściciela, zapisany status i kontekst, a w razie potrzeby przejść do źródła. Pierwsze działające wydanie bazuje na planie SAP B1 Upgrade. Import z Excela przez Office Script i Power Automate do SharePoint jest już sprawdzony w trybie ręcznym. Ostatni potwierdzony przebieg dał 41 zadań. Liczba zadań w WWW ma wynikać z bieżącego odczytu.

| Widok | Propozycja pierwszego wydania |
| --- | --- |
| Overview | Krótki punkt startowy z działającą nawigacją do projektu i najważniejszymi liczbami z danych. Jeśli powiela Projects, odłóż go i otwieraj aplikację bezpośrednio w Projects. |
| Projects | Wyszukiwanie po numerze, opisie i właścicielu, filtry zapisanych statusów, grupowanie po sekcji, wejście w szczegóły i otwarcie źródła. Pokaż terminy tak, jak zapisano je w Excelu. |
| My Sources | Karta Excela z dostępem do źródła oraz jasną informacją, że import uruchamiany jest ręcznie. Edycja źródeł pozostaje dostępna w działającym Power Apps na czas pilota. |
| Inbox | Kolejny etap po potwierdzeniu integracji Outlook, Teams i Xurrent. Testy pojedynczych operacji nie oznaczają gotowej skrzynki. |

## Kierunek projektu interfejsu

Język interfejsu: angielski. Zaprojektuj ekran Projects wokół jednej czynności: przeglądam listę i otwieram kolejne zadania bez tracenia miejsca, wyszukiwania ani filtrów. Na szerokim ekranie lista i szczegóły mogą być widoczne razem. Na telefonie szczegóły zajmują osobny widok, a powrót przywraca poprzedni stan listy.

Wypróbuj jasne tło, ciemny granat, czerwień Hoval jako akcent głównych działań i wyraźną hierarchię typografii. Statusy mają etykiety tekstowe. Długie opisy i komentarze powinny pozostać czytelne. Wartość wizualną oceniaj podczas pracy na zadaniach, z klawiaturą i przy zmianie szerokości, także w realnej przestrzeni udostępnionej przez stronę SharePoint.

Podstawy danych: puste statusy oznacz jako “Status not recorded”. Zachowaj pozostałe statusy ze źródła. Odsetek ukończonych zadań, jeśli zostanie pokazany, opisuje liczbę pozycji oznaczonych jako “Done”. Oznacz czas odczytu listy jako “Last checked”. Czas ostatniej kompletnej synchronizacji można podać dopiero po wdrożeniu wiarygodnego znacznika zakończenia importu. Obsłuż ładowanie, brak rekordów, brak wyników filtrów oraz błąd dostępu i ponowienie odczytu.

## Pierwszy sprawdzian techniczny po zmianie modelu

1. Ustal, czy docelowy dostęp oznacza firmowe konto i zgodne urządzenie, czy dodatkowo sieć/VPN Hoval. Dostęp przez prywatny telefon pozostaje poza założeniami pilota.
2. Potwierdź witrynę testową, dostępność katalogu SPFx oraz osobę z prawem wdrożenia pakietu i dodania komponentu do strony. Pierwszy kandydat to SharePoint Framework, według zasad wdrażania [Microsoft Learn](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/enterprise-guidance).
3. W minimalnym teście użyj [SPHttpClient](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/connect-to-sharepoint) do odczytu zadań SourceId = 1 z istniejącej listy w kontekście zalogowanego użytkownika. Sprawdź uprawnienia i rzeczywisty odczyt ze strony, na której komponent będzie uruchamiany. Witryna pilota i osobista lista mogą być pod różnymi domenami SharePoint. Wtedy sam dostęp do obu witryn nie potwierdza, że żądanie z komponentu przejdzie. Sprawdź zakres dostępu i konfigurację dla wybranych adresów. Danych firmowych używaj wyłącznie w zatwierdzonym środowisku.
4. Warunek wyboru SPFx to działające wdrożenie i odczyt rzeczywistej listy, w tym obsługa odmowy dostępu i stronicowania. Jeśli próba jest zablokowana, zapisz konkretne brakujące uprawnienie albo błąd dostępu i wskaż zatwierdzony wariant. Osobna aplikacja WWW wymaga własnej ścieżki hostingu i dostępu przez Microsoft Entra. Zostaje też responsywny Power Apps. Do pierwszych prób wyglądu wystarczą dane syntetyczne z repozytorium.

## Jak poznać, że pierwsze wydanie jest gotowe

- Z firmowego urządzenia użytkownik otwiera uzgodnioną witrynę i w chwili testu widzi tę samą liczbę zadań co na liście SharePoint.
- Wyszukiwanie, filtr, szczegóły oraz przejście do źródła tworzą spójną ścieżkę. Powrót ze szczegółów zachowuje kontekst.
- Przetestowano szeroki ekran, mniejszy laptop i wąskie okno w przeglądarce. Interfejs działa z klawiaturą, a źródłowe opisy mogą zajmować wiele wierszy.
- Ekran odróżnia ręczny import od odświeżenia danych na ekranie i pokazuje stan dostępu. Brak aktywnej integracji jest widoczny tam, gdzie użytkownik spodziewa się danych.

## Polecenie po przełączeniu modelu

> Możesz zaczynać My Hoval Focus WWW. Przeczytaj AGENTS.md, docs/STATE.md, docs/NEXT_STEPS.md oraz docs/WEB-BRIEF.md. Zacznij od potwierdzenia wdrożenia i odczytu z SharePoint. Potem zaprojektuj i zbuduj sprawdzalny ekran Projects, z angielskim UI i działającą ścieżką od wyszukania zadania do źródła. Zachowaj obecny import; jeśli konkretna decyzja zależy ode mnie albo od IT, podaj dokładnie którą. Zapisuj postępy w prywatnym repozytorium.
