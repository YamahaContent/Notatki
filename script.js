// ============================================================
// Notatki — Muzykologia UAM
// script.js — Harbor Theme + README.md homepage
// ============================================================

const GITHUB_USER = 'YamahaContent';
const GITHUB_REPO = 'Notatki';
const NOTES_PATH  = 'Notatki';
const BRANCH      = 'main';

const RAW_BASE  = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${BRANCH}`;
const API_BASE  = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents`;

// ── DOM refs ──────────────────────────────────────────────
const navList       = document.getElementById('nav-list');
const notesContent  = document.getElementById('notes-content');
const topBarTitle   = document.getElementById('top-bar-title');
const topBarMeta    = document.getElementById('top-bar-meta');
const sidebar       = document.getElementById('sidebar');
const menuToggle    = document.getElementById('menu-toggle');

// ── Marked.js config ─────────────────────────────────────
if (typeof marked !== 'undefined') {
  marked.setOptions({
    breaks: true,
    gfm: true,
  });
}

// ── Sidebar toggle (mobile) ───────────────────────────────
if (menuToggle && sidebar) {
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
}

// ── Render markdown → HTML ───────────────────────────────
function renderMarkdown(text) {
  if (typeof marked !== 'undefined') {
    return marked.parse(text);
  }
  // Fallback: plain text with <br>
  return '<pre style="white-space:pre-wrap">' + escapeHtml(text) + '</pre>';
}

function escapeHtml(text) {
  return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ── Show loading indicator ────────────────────────────────
function showLoading(msg = 'Ładowanie…') {
  notesContent.innerHTML = `
    <div class="loading-indicator">
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
      <span>${msg}</span>
    </div>`;
}

// ── Load README.md as homepage ────────────────────────────
async function loadReadme() {
  topBarTitle.textContent = 'Notatki — Muzykologia UAM';
  topBarMeta.textContent  = 'README.md';
  showLoading('Ładowanie strony głównej…');

  // Remove active from all nav items
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  const homeItem = document.getElementById('nav-home');
  if (homeItem) homeItem.classList.add('active');

  try {
    const url = `${RAW_BASE}/README.md`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    notesContent.innerHTML = renderMarkdown(text);
    // Fix relative links to point to GitHub
    fixLinks(notesContent);
  } catch (err) {
    notesContent.innerHTML = `
      <div class="welcome-screen">
        <h2>Notatki</h2>
        <p>Wybierz plik z menu po lewej stronie.<br>
        <small style="opacity:.6">Błąd ładowania README: ${err.message}</small></p>
      </div>`;
  }
}

// ── Extract repo file path from any GitHub link to this repo ─
// Handles formats:
//   https://github.com/USER/REPO/blob/BRANCH/path/to/File.md
//   https://raw.githubusercontent.com/USER/REPO/BRANCH/path/to/File.md
//   Notatki/Aktualne/File.md   (relative)
//   ./File.md                  (relative)
function extractRepoPath(href) {
  const decoded = decodeURIComponent(href);

  // github.com blob URL
  const blobPattern = new RegExp(
    `https?://github\\.com/${GITHUB_USER}/${GITHUB_REPO}/blob/${BRANCH}/(.+\\.md)(?:#.*)?$`
  );
  const blobMatch = decoded.match(blobPattern);
  if (blobMatch) return blobMatch[1];

  // raw.githubusercontent.com URL
  const rawPattern = new RegExp(
    `https?://raw\\.githubusercontent\\.com/${GITHUB_USER}/${GITHUB_REPO}/${BRANCH}/(.+\\.md)(?:#.*)?$`
  );
  const rawMatch = decoded.match(rawPattern);
  if (rawMatch) return rawMatch[1];

  // Relative path ending in .md (no protocol)
  if (!href.startsWith('http') && decoded.endsWith('.md')) {
    // Strip leading ./
    return decoded.replace(/^\.\//, '');
  }

  return null;
}

// ── Fix links in rendered markdown ───────────────────────
function fixLinks(container) {
  container.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:')) return;

    const repoPath = extractRepoPath(href);

    if (repoPath) {
      // It's a link to a note in this repo — intercept and load inline
      a.setAttribute('href', '#');
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const displayName = repoPath.split('/').pop().replace(/\.md$/i, '');
        // Highlight matching nav item
        document.querySelectorAll('.nav-item').forEach(el => {
          el.classList.toggle('active', el.dataset.path === repoPath);
        });
        loadFile(repoPath, displayName);
      });
    } else {
      // External link — open in new tab
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

// ── Load a specific note file ─────────────────────────────
async function loadFile(filePath, displayName) {
  topBarTitle.textContent = displayName;
  topBarMeta.textContent  = filePath;
  showLoading(`Ładowanie: ${displayName}`);

  // Close mobile sidebar
  if (sidebar) sidebar.classList.remove('open');

  try {
    const url = `${RAW_BASE}/${encodeURI(filePath)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    notesContent.innerHTML = renderMarkdown(text);
    notesContent.scrollTop = 0;
    fixLinks(notesContent);
  } catch (err) {
    notesContent.innerHTML = `<p style="color:var(--accent-rust);font-family:var(--font-mono);font-size:.85rem">
      Błąd ładowania pliku: ${escapeHtml(err.message)}</p>`;
  }
}

// ── Render nav item ───────────────────────────────────────
function makeNavItem(name, path) {
  const li = document.createElement('li');
  const displayName = name.replace('.md', '');
  li.className = 'nav-item';
  li.textContent = displayName;
  li.title = displayName;
  li.dataset.path = path;
  li.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    li.classList.add('active');
    loadFile(path, displayName);
  });
  return li;
}

// ── Render folder label ───────────────────────────────────
function makeFolderLabel(name) {
  const li = document.createElement('li');
  li.className = 'nav-folder';
  li.textContent = '📁 ' + name;
  return li;
}

// ── Fetch and populate sidebar ────────────────────────────
async function loadNavTree(path = NOTES_PATH, container = navList, depth = 0) {
  try {
    const res = await fetch(`${API_BASE}/${encodeURI(path)}?ref=${BRANCH}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const items = await res.json();

    // Sort: dirs first, then files
    items.sort((a, b) => {
      if (a.type === b.type) return a.name.localeCompare(b.name, 'pl');
      return a.type === 'dir' ? -1 : 1;
    });

    for (const item of items) {
      if (item.name.startsWith('.')) continue; // skip hidden

      if (item.type === 'dir') {
        if (depth === 0) {
          container.appendChild(makeFolderLabel(item.name));
        }
        await loadNavTree(item.path, container, depth + 1);
      } else if (item.name.endsWith('.md')) {
        container.appendChild(makeNavItem(item.name, item.path));
      }
    }
  } catch (err) {
    const li = document.createElement('li');
    li.className = 'nav-item loading';
    li.textContent = '⚠ Błąd ładowania listy';
    container.appendChild(li);
    console.error('loadNavTree error:', err);
  }
}

// ── Init ──────────────────────────────────────────────────
async function init() {
  // Populate sidebar loading state
  navList.innerHTML = '<li class="nav-item loading">Ładowanie…</li>';

  // Load README on home
  await loadReadme();

  // Then load nav tree
  navList.innerHTML = '';
  await loadNavTree();
}

document.addEventListener('DOMContentLoaded', init);
