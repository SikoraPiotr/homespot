# Wydania Homespot

Aktualne na serwerze: `2026-11-25-kafelki-opinie` (`releases/LATEST`).

Każde wgranie na `https://pscoders.pl/homespot/` idzie tylko przez `scripts/release.ps1`. Skrypt wymaga `releases/<wersja>/RELEASE-NOTES.md`, buduje statyczną paczkę do `releases/<wersja>/site` i wgrywa tę paczkę po FTP. Nie używa starego folderu `homespot-do-wgrania` i nie kasuje na serwerze plików, których nie ma w paczce.

Panel admina podmienia zdjęcia i teksty w plikach projektu. Na hostingu ze statycznym HTML widać je po kolejnym wydaniu.

## 2026-11-25-kafelki-opinie

To jest wersja na serwerze.

- Kafelki usług są białe, z wyśrodkowanym turkusowym napisem i zdjęciem pod tekstem. Nie odwracają się.
- Zdjęcia usług są dopasowane do tematu: sprzedaż, wynajem, zarządzanie najmem, finansowanie, inwestycje, analiza rynku.
- Opinie są sliderem. Na szerokim ekranie widać cztery naraz. Strzałki w lewo i w prawo przewijają kolejne, gdy opinii jest więcej.

Szczegóły: [RELEASE-NOTES.md](2026-11-25-kafelki-opinie/RELEASE-NOTES.md).

## 2026-11-25-zespol-uslugi

- Baner zespołu pokazuje twarze. Karty biorą portrety z tego samego zdjęcia.
- W panelu admina każde zdjęcie strony ma podgląd i podmianę. Imię, rola, e-mail i telefon osób w zespole też.
- Imion nie było w materiałach, więc na kartach zostaje „Członek zespołu”.

Szczegóły: [RELEASE-NOTES.md](2026-11-25-zespol-uslugi/RELEASE-NOTES.md).

## 2026-11-25-uwagi-2

Wydanie z uwag nr 2 i zdjęć z paczki „FOTY NA WWW”.

- Zdjęcia strony głównej, O nas, ofert i opinii są w `public/media`.
- Menu ma większy font i ikony social obok wiadomości.
- Turkusowe śródtytuły są większe o 2 punkty.
- Proces: tytuł w jednej linii, kroki 4 i 5 bliżej środka.
- Stopka: zielony domek i białe logo, adres prowadzi do Google Maps.
- O nas: wyśrodkowane zakończenie.
- Oferty i opinie: nowe nagłówki i tytuł pisany.
- Zespół: nowe nagłówki i link „Napisz!” pod zdjęciami.
- Kontakt: nazwa Homespot Nieruchomości, adres do mapy i mapa.

Kafelki usług i slider opinii z tego wydania zostały zastąpione przez `2026-11-25-kafelki-opinie`.

Szczegóły: [RELEASE-NOTES.md](2026-11-25-uwagi-2/RELEASE-NOTES.md).
