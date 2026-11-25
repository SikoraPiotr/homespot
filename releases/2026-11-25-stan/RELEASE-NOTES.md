# 2026-11-25 stan

Pełny zapis tego, co jest teraz na https://pscoders.pl/homespot/ i w repozytorium.

## Strona

- Adres w podkatalogu `/homespot`. Menu mobilne jest w kolumnie.
- Menu ma większy font i ikony social obok wiadomości. Turkusowe śródtytuły są większe.
- Strona główna: zdjęcia z paczki „FOTY NA WWW”, proces „Jesteśmy z Tobą na każdym etapie” w jednej linii, kroki 4 i 5 bliżej środka.
- Stopka: zielony domek i białe logo. Adres prowadzi do Google Maps.
- O nas: zdjęcia z paczki i wyśrodkowane zakończenie „Homespot Nieruchomości” oraz „Wspólnie znajdźmy - „Twoje miejsce zwane domem!”.”
- Oferty: nagłówek „Zapoznaj się z naszym portfolio” i pisany dopisek. Kafelki prowadzą do nieruchomosci-online.pl.
- Opinie: nagłówek „Zobacz co mówią o nas inni” i pisany dopisek. Slider pokazuje cztery opinie na szerokim ekranie. Strzałki przewijają kolejne, gdy opinii jest więcej.
- Zespół: twarze z dostarczonego zdjęcia. Imion nie było w materiałach, więc zostaje „Członek zespołu”. Pod zdjęciami jest „Napisz!” na biuro@homespot.com.pl.
- Kontakt: „Homespot Nieruchomości”, adres do mapy i mapa.
- Usługi: biały kafelek, turkusowy napis na środku. Pod napisem grafika, nie fotografia. Uwagi mówiły o kafelku bez zdjęcia. Grafika doszła później, na prośbę.

## Panel

W adminie da się podmienić każde zdjęcie na stronie oraz imię, rolę, e-mail i telefon osób w zespole. Na hostingu ze statycznym HTML zmiana jest widoczna po kolejnym wydaniu.

## Jak powstaje wydanie

`scripts/release.ps1` wymaga notatki w `releases/<wersja>/RELEASE-NOTES.md`, buduje paczkę do `releases/<wersja>/site` i wgrywa tylko tę paczkę. Nie kasuje na serwerze plików, których nie ma w paczce.
