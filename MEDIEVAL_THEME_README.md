# 📜 Medieval Manuscript Theme - Gruvbox Edition

## 🎨 Nowy Design

Zaktualizowany frontend inspirowany średniowiecznymi manuskryptami z paletą kolorów **Gruvbox** - ciepłą, nostalgiczną kolorystyką idealnie pasującą do historycznej estetyki.

## ✨ Kluczowe Elementy Designu

### Typografia
- **Nagłówki**: `UnifrakturMaguntia` - gotycka czcionka przypominająca średniowieczne manuskrypty
- **Tekst**: `Crimson Text` - elegancka czcionka serif do treści
- **Illuminated Letters**: Pierwsze litery w stylu iluminowanych manuskryptów z cieniami i złoceniami

### Kolorystyka Gruvbox
```css
Tła:
- Pergamin: #f4e8d0 (główne tło jak pergamin)
- Jasny: #fbf1c7
- Drugorzędny: #f9f5d7

Akcenty:
- Czerwień: #cc241d / #fb4934
- Żółty/Złoty: #d79921 / #fabd2f
- Pomarańcz: #d65d0e / #fe8019
- Zielony (Spotify): #98971a / #b8bb26

Tekst:
- Główny: #1d2021 (ciemny)
- Drugorzędny: #3c3836
- Szary: #928374
```

### Dekoracje i Ornamenty
- ✤ Krzyże maltańskie
- ❦ Fleurony (stylizowane kwiaty)
- ✦ Gwiazdy
- § Symbole paragrafu
- Ornamentalne obramowania w stylu illuminacji

### Efekty Wizualne
1. **Tekstury**:
   - Tło pergaminu z subtelnymi plamami
   - Linie poziome jak w starych księgach

2. **Cienie i Ramki**:
   - Grube obramowania (3-4px) w kolorach Gruvbox
   - Box-shadow z offsetem (8px 8px) - efekt "płaskiego 3D"
   - Wielokolorowe obramowania z `repeating-linear-gradient`

3. **Animacje**:
   - Pulsujące ozdobniki (✦)
   - Rotujące elementy dekoracyjne
   - Hover effects z przesunięciem shadow
   - Płynne fade-in dla treści

## 📂 Zaktualizowane Pliki

### `styles.css`
Kompletny redesign ze średniowiecznymi elementami:
- CSS Variables z paletą Gruvbox
- Typografia z gotycką czcionką
- Dekoracyjne elementy (::before, ::after)
- Animacje i efekty hover
- Responsywność

### HTML Files (`index.html`, `notatki.html`, `kontakt.html`)
- Zaktualizowane linki do czcionek (UnifrakturMaguntia + Crimson Text)
- Struktura pozostaje bez zmian - kompatybilna z istniejącym JavaScript

## 🎯 Wyróżniające Cechy

### Strona Główna
- Hero section w ramce z ornamentami
- Illuminated first letter w tytule (150% większa, z cieniami)
- Przyciski z box-shadow offset
- Ozdobniki w nawigacji (✦ po bokach)

### Karty Przedmiotów
- Grube ramki żółte z cieniami pomarańczowymi
- Wielokolorowe obramowania górne (repeating gradient)
- Rotating ornament (✤) na hover
- Box-shadow z przesunięciem na hover

### Strona Notatek
- Sidebar z żółtą ramką
- Illuminated first letter w każdym akapicie
- Ozdobniki przed nagłówkami (§)
- Quote blocks ze stylizowanym cudzysłowem
- Code blocks z Gruvbox dark theme

### Footer
- Ciemne tło (Gruvbox bg)
- Ornamentalne obramowanie górne
- Ozdobniki na środku (✦ ❦ ✤ ❦ ✦)

## 🚀 Instalacja

Wystarczy wrzucić zaktualizowane pliki do repozytorium:
- `styles.css` (całkowicie przerobiony)
- `index.html`, `notatki.html`, `kontakt.html` (tylko czcionki)

GitHub Pages automatycznie zaktualizuje stronę w ciągu 2-3 minut.

## 🎨 Customizacja

### Zmiana kolorów
Edytuj zmienne CSS na początku `styles.css`:
```css
:root {
    --gruvbox-red: #cc241d;      /* Zmień na swój kolor */
    --gruvbox-yellow: #d79921;   /* Złoty akcent */
    /* ... */
}
```

### Zmiana czcionek
W HTML `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=TWOJA-CZCIONKA&display=swap" rel="stylesheet">
```

W CSS:
```css
h1, h2, h3 {
    font-family: 'TWOJA-CZCIONKA', serif;
}
```

### Usunięcie ozdobników
Możesz usunąć `::before` i `::after` pseudoelementy w CSS, jeśli wolisz czystszy wygląd.

## 💡 Inspiracje Designu

- **Średniowieczne księgi**: Bibliae Pauperum, Book of Kells
- **Illuminacje**: Inicjały z XV-wiecznych manuskryptów
- **Gruvbox**: Popularna paleta retro/vintage dla terminali i edytorów
- **Muzyka historyczna**: Estetyka pasująca do notatek z muzykologii

## 🔧 Kompatybilność

- ✅ Chrome, Firefox, Safari, Edge (nowoczesne przeglądarki)
- ✅ Responsywny design (mobile, tablet, desktop)
- ✅ Wszystkie funkcje JavaScript działają bez zmian
- ✅ GitHub Pages + markdown rendering

## 📜 Historia Wersji

**v2.0 - Medieval Manuscript Edition (2026-02-01)**
- Kompletny redesign w stylu średniowiecznych manuskryptów
- Paleta kolorów Gruvbox
- Gotycka typografia (UnifrakturMaguntia)
- Illuminated letters i ornamenty
- Dekoracyjne ramki i cienie

**v1.0 - Classic Academic (2026-02-01)**
- Pierwotny design w ciepłych brązach
- Akademicka estetyka
- Crimson Pro i EB Garamond

---

**Stworzono z ❤️ dla miłośników historii, muzyki i pięknego designu**
