# 📚 Frontend do Notatek - Instrukcja Instalacji

Frontend do przeglądania notatek z Obsidian na GitHub Pages.

## 🚀 Szybki Start (Instrukcja krok po kroku)

### Krok 1: Dodaj pliki do repozytorium

Skopiuj te pliki do głównego katalogu swojego repozytorium GitHub:

```
YamahaContent/Notatki/
├── index.html          # Strona główna
├── notatki.html        # Przeglądarka notatek
├── kontakt.html        # Strona kontaktowa
├── styles.css          # Style CSS
├── script.js           # JavaScript dla strony głównej
├── notes.js            # JavaScript dla przeglądarki notatek
└── _config.yml         # Konfiguracja GitHub Pages
```

### Krok 2: Włącz GitHub Pages

1. Przejdź do repozytorium na GitHub: https://github.com/YamahaContent/Notatki
2. Kliknij **Settings** (Ustawienia)
3. W menu po lewej kliknij **Pages**
4. W sekcji **Source** wybierz:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Kliknij **Save**

### Krok 3: Poczekaj na deployment

GitHub Pages automatycznie zbuduje i opublikuje stronę. Proces trwa 1-3 minuty.

Twoja strona będzie dostępna pod adresem:
```
https://yamahacontent.github.io/Notatki/
```

### Krok 4: Sprawdź czy działa

Odwiedź adres i sprawdź czy:
- ✅ Strona główna się ładuje
- ✅ Menu nawigacji działa
- ✅ Strona "Notatki" wyświetla listę plików
- ✅ Kliknięcie w notatkę wyświetla jej zawartość

## 📂 Struktura Projektu

```
Notatki/
├── index.html              # Strona główna z prezentacją
├── notatki.html            # Dynamiczna przeglądarka notatek
├── kontakt.html            # Informacje kontaktowe
├── styles.css              # Wszystkie style (elegancka estetyka akademicka)
├── script.js               # Funkcjonalność strony głównej
├── notes.js                # Logika ładowania i renderowania notatek
├── _config.yml             # Konfiguracja GitHub Pages
└── Notatki/                # Twój istniejący folder z notatkami
    ├── Aktualne/
    └── ...
```

## 🎨 Funkcje

### Automatyczne renderowanie Markdown
- Notatki w formacie `.md` są automatycznie konwertowane na HTML
- Obsługa nagłówków, list, linków, cytowań
- Formatowanie kodu i składni

### Dynamiczne ładowanie
- Struktura folderów ładowana z GitHub API
- Kliknij w folder aby zobaczyć pliki
- Kliknij w plik aby wyświetlić zawartość

### Responsywny design
- Działa na komputerach, tabletach i telefonach
- Elegancka estetyka inspirowana klasyką muzyczną

### Integracja z Obsidian
- Synchronizacja przez wtyczkę Obsidian Git
- Każdy commit automatycznie aktualizuje stronę
- Zachowana struktura katalogów

## 🔧 Jak działa?

1. **Obsidian Git** → zapisuje notatki do GitHub
2. **GitHub Pages** → hostuje pliki HTML/CSS/JS
3. **GitHub API** → JavaScript pobiera listę plików
4. **Marked.js** → konwertuje Markdown → HTML
5. **Przeglądarka** → wyświetla pięknie sformatowane notatki

## 🎯 Customizacja

### Zmiana kolorów

Edytuj zmienne CSS w `styles.css`:

```css
:root {
    --primary-color: #2c1810;      /* Główny kolor (ciemny brąz) */
    --secondary-color: #8b4513;    /* Drugi kolor (jasny brąz) */
    --accent-color: #d4af37;       /* Akcent (złoty) */
    --bg-primary: #faf8f5;         /* Tło strony */
}
```

### Zmiana czcionek

W `index.html` (i innych plikach HTML) zmień linki do Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=TWOJA-CZCIONKA" rel="stylesheet">
```

Następnie w `styles.css`:

```css
body {
    font-family: 'TWOJA-CZCIONKA', serif;
}
```

### Dodanie nowych przedmiotów

Edytuj sekcję `.subjects-grid` w `index.html`:

```html
<div class="subject-card">
    <div class="subject-icon">🎺</div>
    <h3>Nowy Przedmiot</h3>
    <p>Opis przedmiotu</p>
    <a href="notatki.html?przedmiot=nazwa" class="card-link">Zobacz notatki →</a>
</div>
```

## 🐛 Rozwiązywanie problemów

### Strona nie ładuje się
- Sprawdź czy GitHub Pages jest włączone w Settings → Pages
- Upewnij się, że pliki są w głównym katalogu (root) repozytorium
- Sprawdź Actions → czy deployment się powiódł

### Notatki nie wyświetlają się
- Otwórz konsolę developerską (F12)
- Sprawdź czy są błędy JavaScript
- Upewnij się, że folder nazywa się dokładnie `Notatki` (z wielką literą)

### Błędy CORS / API
- GitHub API ma limit 60 requestów/godzinę dla niezalogowanych
- Jeśli przekroczysz limit, poczekaj godzinę lub zaloguj się do GitHub

## 📱 Testowanie lokalne

Aby przetestować stronę lokalnie:

```bash
# Potrzebujesz prostego serwera HTTP
# Opcja 1: Python
python -m http.server 8000

# Opcja 2: Node.js
npx http-server

# Opcja 3: PHP
php -S localhost:8000
```

Następnie otwórz: `http://localhost:8000`

**UWAGA:** Niektóre funkcje (GitHub API) mogą nie działać lokalnie bez serwera.

## 🔄 Aktualizacje

Strona automatycznie aktualizuje się po każdym commicie do repozytorium!

1. Edytujesz notatkę w Obsidian
2. Wtyczka Git zapisuje zmiany do GitHub
3. GitHub Pages automatycznie odświeża stronę (1-2 minuty)

## 📚 Użyte technologie

- **HTML5** - struktura strony
- **CSS3** - styling i animacje
- **Vanilla JavaScript** - logika i interakcje
- **Marked.js** - parsing Markdown
- **GitHub Pages** - darmowy hosting
- **GitHub API** - dynamiczne ładowanie plików

## 🎓 Dodatkowe możliwości

### Włączenie wyszukiwarki

Możesz dodać prostą wyszukiwarkę notatek:

```javascript
// Dodaj do notes.js
function searchNotes(query) {
    const links = document.querySelectorAll('.folder-tree a');
    links.forEach(link => {
        const text = link.textContent.toLowerCase();
        link.parentElement.style.display = 
            text.includes(query.toLowerCase()) ? 'block' : 'none';
    });
}
```

### Google Analytics

Dodaj tracking w `<head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 💡 Wskazówki

- Zachowaj spójność nazewnictwa folderów i plików (bez polskich znaków w nazwach)
- Używaj Markdown dla lepszej czytelności
- Regularnie rób commit (wtyczka Obsidian Git może to robić automatycznie)
- Dodaj README.md do każdego folderu z notatkami

## 📞 Pomoc

Jeśli masz problemy:
1. Sprawdź [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Zobacz [Marked.js docs](https://marked.js.org/)
3. Otwórz Issue w repozytorium

---

**Powodzenia z notatkami! 📚🎵**
