# ✅ LISTA KROKÓW - Frontend Notatek

## Co dostałeś:

1. **index.html** - Strona główna z eleganckim designem
2. **notatki.html** - Przeglądarka notatek z dynamicznym ładowaniem
3. **kontakt.html** - Strona kontaktowa
4. **styles.css** - Wszystkie style (akademicka estetyka)
5. **script.js** - JavaScript dla strony głównej
6. **notes.js** - JavaScript do ładowania i renderowania notatek
7. **_config.yml** - Konfiguracja GitHub Pages
8. **INSTRUKCJA.md** - Szczegółowa dokumentacja

## 📋 KROKI DO WYKONANIA (5 minut):

### ✅ Krok 1: Upload plików
Skopiuj wszystkie pliki do głównego katalogu repozytorium:
```
https://github.com/YamahaContent/Notatki
```

**WAŻNE:** Pliki muszą być w **głównym katalogu** (root), nie w podfolderze!

Struktura powinna wyglądać tak:
```
Notatki/
├── index.html          ← TUTAJ
├── notatki.html        ← TUTAJ
├── kontakt.html        ← TUTAJ
├── styles.css          ← TUTAJ
├── script.js           ← TUTAJ
├── notes.js            ← TUTAJ
├── _config.yml         ← TUTAJ
├── README.md           (twój istniejący)
└── Notatki/            (twój istniejący folder)
```

### ✅ Krok 2: Włącz GitHub Pages

1. Idź do: https://github.com/YamahaContent/Notatki/settings/pages
2. W **Source** wybierz:
   - Branch: **main**
   - Folder: **/ (root)**
3. Kliknij **Save**

### ✅ Krok 3: Poczekaj 2-3 minuty

GitHub automatycznie zbuduje stronę. Możesz śledzić postęp w zakładce **Actions**.

### ✅ Krok 4: Otwórz stronę

```
https://yamahacontent.github.io/Notatki/
```

## 🎨 CO DOSTAŁEŚ:

### Strona główna (index.html)
- Elegancki hero section z tytułem
- Sekcja z przedmiotami (Historia Muzyki Klasycyzmu, Staropolska)
- Linki do playlist Spotify
- Responsywny design
- Animacje i efekty hover

### Przeglądarka notatek (notatki.html)
- Automatyczne ładowanie struktury folderów z GitHub
- Kliknij w folder → rozwiń i zobacz pliki
- Kliknij w plik → wyświetl zawartość
- Markdown automatycznie konwertowany do HTML
- Sidebar z nawigacją

### Strona kontaktowa (kontakt.html)
- Informacje o projekcie
- Linki do GitHub
- Formularz zgłaszania problemów

## 🎯 JAK TO DZIAŁA:

1. **Obsidian Git** → automatycznie zapisuje notatki do GitHub
2. **GitHub Pages** → hostuje stronę HTML
3. **JavaScript** → pobiera pliki z GitHub API
4. **Marked.js** → konwertuje .md na HTML
5. **Strona** → wyświetla pięknie sformatowane notatki

## 🔄 AUTOMATYCZNA SYNCHRONIZACJA:

Po włączeniu GitHub Pages:
- Każdy commit do repozytorium automatycznie aktualizuje stronę
- Twoja wtyczka Obsidian Git robi commit → strona się aktualizuje
- Nie musisz nic robić ręcznie!

## 🎨 PERSONALIZACJA (opcjonalnie):

### Zmiana kolorów:
Edytuj początek pliku `styles.css`:
```css
:root {
    --primary-color: #2c1810;      /* zmień ten kolor */
    --secondary-color: #8b4513;    /* i ten */
    --accent-color: #d4af37;       /* i ten */
}
```

### Dodanie przedmiotu:
W `index.html` znajdź `.subjects-grid` i dodaj nową kartę.

## 🐛 PROBLEM?

### Strona nie działa?
1. Sprawdź czy pliki są w głównym katalogu (nie w Notatki/)
2. Sprawdź czy GitHub Pages jest włączone (Settings → Pages)
3. Poczekaj 2-3 minuty na deployment

### Notatki nie ładują się?
1. Otwórz konsolę (F12) i sprawdź błędy
2. Upewnij się że folder nazywa się "Notatki" (wielkie N)
3. Sprawdź czy repozytorium jest publiczne

### GitHub API limit?
- GitHub ma limit 60 zapytań/godzinę dla gości
- Jeśli przekroczysz, poczekaj godzinę

## 📞 DALSZE KROKI:

1. Testuj stronę: https://yamahacontent.github.io/Notatki/
2. Jeśli działa - gotowe! 🎉
3. Jeśli nie działa - sprawdź sekcję "Problem?"
4. Możesz customizować kolory, czcionki, przedmioty

## 💡 BONUS:

- Strona jest w pełni responsywna (działa na telefonie)
- Ma elegancki design inspirowany klasyką muzyczną
- Automatycznie pokazuje datę ostatniej aktualizacji
- Obsługuje linki Spotify do playlist

---

**Powodzenia! Jeśli coś nie działa, przeczytaj INSTRUKCJA.md**
