# 🎨 Art Nouveau Design Update - v3.0

## ✨ Nowe Funkcje

### 1. 🌓 Tryb Ciemny/Jasny (Gruvbox)
- Przycisk przełączania w prawym dolnym rogu (☀️/🌙)
- **Tryb ciemny** (domyślny): ciepła, nostalgiczna paleta Gruvbox
- **Tryb jasny**: pergaminowe tło z ciemnymi akcentami
- Automatyczne zapisywanie preferencji w localStorage

### 2. 📑 Spis Treści (Table of Contents)
- Automatycznie generowany dla każdej notatki
- Pokazuje wszystkie nagłówki H2 i H3
- Po prawej stronie notatki (desktop)
- Aktywny element podświetlany podczas scrollowania
- Smooth scroll do sekcji po kliknięciu

### 3. 🧹 Czyszczenie Markdown z Obsidian
Parser automatycznie usuwa:
- Atrybuty Obsidian: `{.class}`, `{#id}`, `{key=value}`
- Callouts/Admonitions: `> [!note]`
- Frontmatter YAML (między `---`)
- Komentarze: `%% comment %%`
- Highlight marks: `==text==`
- Wiki-linki konwertowane na normalne linki

### 4. 🎨 Nowy Design (Art Nouveau)
Inspirowany obrazami które wysłałeś:
- **Kolorowe gradienty** zamiast pojedynczych kolorów
- **Floral ornamenty** (✿, ❦)
- **Dekoracyjne ramki** z wielokolorowymi gradientami
- **Czcionka Cinzel Decorative** - elegancka, Art Nouveau

## 🎨 Paleta Kolorów Gruvbox

### Tryb Ciemny (Domyślny)
```
Tła:
- #282828 (bg-primary)
- #1d2021 (bg-secondary)
- #32302f (bg-tertiary)

Akcenty:
- #fb4934 (red-bright)
- #fe8019 (orange-bright)  
- #fabd2f (yellow-bright)
- #8ec07c (aqua-bright)
- #d3869b (purple-bright)

Tekst:
- #ebdbb2 (fg-primary)
- #d5c4a1 (fg-secondary)
```

### Tryb Jasny
```
Tła:
- #fbf1c7 (bg-primary - pergamin)
- #f9f5d7 (bg-secondary)
- #ebdbb2 (bg-parchment)

Akcenty:
- #9d0006 (red-bright)
- #af3a03 (orange-bright)
- #b57614 (yellow-bright)
- #427b58 (aqua-bright)
- #8f3f71 (purple-bright)

Tekst:
- #3c3836 (fg-primary)
- #504945 (fg-secondary)
```

## 📂 Zaktualizowane Pliki

### `styles.css` - Kompletnie przerobiony
- Gruvbox light/dark modes z CSS variables
- Art Nouveau dekoracje
- Spis treści styling
- Przycisk toggle theme
- Kolorowe gradient borders
- Responsywny layout z 3 kolumnami

### `notes.js` - Ulepszone funkcje
- `cleanObsidianMarkdown()` - usuwa atrybuty Obsidian
- `generateTableOfContents()` - tworzy spis treści
- `renderTableOfContents()` - renderuje HTML
- `setupScrollSpy()` - aktywuje elementy podczas scrollu
- Poprawione ładowanie folderów

### `script.js` - Dodane funkcje
- `initThemeToggle()` - tworzy i obsługuje przycisk
- Zapisywanie preferencji w localStorage
- Smooth transitions między trybami

### HTML Files
- Zaktualizowane czcionki (Cinzel Decorative + Crimson Text)
- Struktura pozostaje taka sama

## 🚀 Instalacja

### Szybkie Kroki:
1. **Zamień pliki** w repozytorium GitHub:
   - `styles.css` (całkowicie nowy)
   - `notes.js` (ulepszone funkcje)
   - `script.js` (dodany toggle)
   - `index.html`, `notatki.html`, `kontakt.html` (tylko czcionki)

2. **Commit i push** do GitHub

3. **Poczekaj 2-3 minuty** - GitHub Pages automatycznie zaktualizuje stronę

## 🎯 Jak Używać

### Przełączanie Trybu Ciemny/Jasny
1. Kliknij przycisk ☀️/🌙 w prawym dolnym rogu
2. Preferencja zostanie zapamiętana w przeglądarce
3. Przy następnej wizycie wczyta się zapisany tryb

### Spis Treści
1. Otwórz dowolną notatkę
2. Spis treści pojawi się automatycznie po prawej stronie (desktop)
3. Kliknij w element aby przeskoczyć do sekcji
4. Aktywny element jest podświetlony podczas scrollowania

### Responsive Design
- **Desktop (>1200px)**: 3 kolumny (sidebar + treść + spis treści)
- **Tablet (768-1200px)**: 2 kolumny (sidebar + treść)
- **Mobile (<768px)**: 1 kolumna (tylko treść)

## 🎨 Główne Zmiany Wizualne

### Przed → Po

**Nawigacja:**
- Przed: Pojedyncza ramka, prosty design
- Po: Wielokolorowy gradient border, dekoracyjne gradienty po bokach

**Hero Section:**
- Przed: Żółta ramka, cienie
- Po: Multi-color gradient border, Art Nouveau ornament y (❦)

**Karty Przedmiotów:**
- Przed: Żółta ramka z pomarańczowym cieniem
- Po: Gradient borders (purple → orange → aqua), floral ornament (✿)

**Notatki:**
- Przed: Tylko 2 kolumny
- Po: 3 kolumny ze spisem treści, gradient borders

**Przyciski:**
- Przed: Prostokątne z zaokrąglonymi rogami
- Po: Ostre rogi, box-shadow offset, shine effect na hover

**Czcionka:**
- Przed: IM Fell English / UnifrakturMaguntia
- Po: Cinzel Decorative (Art Nouveau) + Crimson Text

## 🔧 Customizacja

### Zmiana Kolorów
Edytuj zmienne w `:root` (styles.css):
```css
:root[data-theme="dark"] {
    --orange-bright: #fe8019;  /* Zmień ten */
    --purple-bright: #d3869b;  /* I ten */
}
```

### Ukrycie Spisu Treści
W `notes.js` linia ~226:
```javascript
// Zmień warunek
if (headings.length > 0 && false) {  // Wyłączone
```

### Zmiana Czcionki
W HTML `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=TWOJA-CZCIONKA" rel="stylesheet">
```

W `styles.css`:
```css
h1, h2, h3 {
    font-family: 'TWOJA-CZCIONKA', serif;
}
```

## 📱 Kompatybilność

- ✅ Chrome, Firefox, Safari, Edge (nowoczesne przeglądarki)
- ✅ Responsywny (mobile, tablet, desktop)
- ✅ Obsługa touch devices
- ✅ localStorage dla zapisywania preferencji
- ✅ Intersection Observer dla scroll spy
- ✅ Smooth scroll

## 🐛 Rozwiązywanie Problemów

### Spis treści się nie pokazuje
- Sprawdź czy notatka ma nagłówki H2 lub H3
- Na urządzeniach <1200px spis treści jest ukryty
- Otwórz konsolę (F12) i sprawdź błędy

### Atrybuty Obsidian nadal widoczne
- Sprawdź czy `cleanObsidianMarkdown()` działa poprawnie
- Może być nowy typ atrybutu - dodaj go do regex

### Przycisk trybu nie działa
- Sprawdź czy `script.js` jest załadowany
- Otwórz konsolę i sprawdź błędy
- Wyczyść localStorage: `localStorage.clear()`

### Tryb się nie zapisuje
- Sprawdź czy localStorage jest dostępny
- Niektóre przeglądarki blokują w trybie prywatnym
- Sprawdź ustawienia cookies/storage

## 📜 Historia Wersji

**v3.0 - Art Nouveau Edition (2026-02-01)**
- 🌓 Tryb ciemny/jasny (Gruvbox)
- 📑 Automatyczny spis treści
- 🧹 Czyszczenie Obsidian markdown
- 🎨 Art Nouveau design z gradientami
- ✿ Floral ornamenty i dekoracje
- Czcionka Cinzel Decorative

**v2.0 - Medieval Manuscript (2026-02-01)**
- Średniowieczna estetyka
- Gotycka typografia
- Illuminated letters

**v1.0 - Classic Academic (2026-02-01)**
- Pierwotny design
- Ciepłe brązy
- Crimson Pro & EB Garamond

## 💡 Inspiracje

- **Art Nouveau**: Alfons Mucha, Gustav Klimt
- **Kolorowe illuminacje**: The Strobridge Litho Co., kalendarz 1906
- **Floral ornamenty**: Secesja wiedeńska
- **Gruvbox**: Retro/vintage paleta dla edytorów
- **Medieval manuscripts**: Book of Hours, illuminated borders

## 🙏 Podziękowania

Design inspirowany Twoimi zdjęciami:
1. Medieval manuscript z ornamentalnymi ramkami
2. The Strobridge Litho Co. z kolorowymi obramowaniami
3. Art Nouveau kalendarz z floralnymi dekoracjami

---

**Enjoy your beautiful notes! 📚✨**

_Stworzono z pasją do historii, muzyki i pięknego designu_
