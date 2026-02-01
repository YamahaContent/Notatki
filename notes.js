// Configuration
const GITHUB_REPO = 'yamahacontent/Notatki';
const GITHUB_BRANCH = 'main';
const NOTES_FOLDER = 'Notatki';

// GitHub API URLs
const API_BASE = `https://api.github.com/repos/${GITHUB_REPO}`;
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}`;

// Initialize marked.js for markdown parsing
if (typeof marked !== 'undefined') {
    marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: true,
        mangle: false
    });
}

// Clean Obsidian-specific syntax from markdown
function cleanObsidianMarkdown(markdown) {
    // Remove Obsidian attributes like {.class} or {#id} or {key=value}
    markdown = markdown.replace(/\{[.#]?[\w-]+(=[\w-]+)?\}/g, '');
    
    // Remove callouts/admonitions
    markdown = markdown.replace(/>\s*\[![\w-]+\]/g, '>');
    
    // Convert wiki-links [[link]] to markdown links
    markdown = markdown.replace(/\[\[([^\]|]+)(\|([^\]]+))?\]\]/g, (match, link, pipe, text) => {
        return `[${text || link}](#)`;
    });
    
    // Remove frontmatter (YAML between ---)
    markdown = markdown.replace(/^---[\s\S]*?---\n/m, '');
    
    // Remove comments
    markdown = markdown.replace(/%%.*?%%/g, '');
    
    // Remove highlight marks
    markdown = markdown.replace(/==(.*?)==/g, '$1');
    
    return markdown;
}

// Generate Table of Contents from markdown headings
function generateTableOfContents(markdown) {
    const headings = [];
    const lines = markdown.split('\n');
    
    lines.forEach(line => {
        const h2Match = line.match(/^##\s+(.+)$/);
        const h3Match = line.match(/^###\s+(.+)$/);
        
        if (h2Match) {
            const text = h2Match[1].replace(/\{[^}]+\}/g, '').trim(); // Remove attributes
            const id = text.toLowerCase().replace(/[^\w]+/g, '-');
            headings.push({ level: 2, text, id });
        } else if (h3Match) {
            const text = h3Match[1].replace(/\{[^}]+\}/g, '').trim();
            const id = text.toLowerCase().replace(/[^\w]+/g, '-');
            headings.push({ level: 3, text, id });
        }
    });
    
    return headings;
}

// Render Table of Contents
function renderTableOfContents(headings) {
    if (headings.length === 0) return '';
    
    let html = `
        <div class="table-of-contents">
            <h3>📑 Spis treści</h3>
            <ul class="toc-list">
    `;
    
    headings.forEach(heading => {
        const className = heading.level === 3 ? 'toc-h3' : '';
        html += `<li class="${className}"><a href="#${heading.id}">${heading.text}</a></li>`;
    });
    
    html += `
            </ul>
        </div>
    `;
    
    return html;
}

// Load folder structure
async function loadFolderStructure() {
    const folderTree = document.getElementById('folderTree');
    
    try {
        const response = await fetch(`${API_BASE}/contents/${NOTES_FOLDER}`);
        
        if (!response.ok) {
            throw new Error('Nie można załadować struktury katalogów');
        }
        
        const contents = await response.json();
        
        folderTree.innerHTML = '';
        
        await buildFolderTree(contents, folderTree, '');
        
    } catch (error) {
        console.error('Error loading folder structure:', error);
        folderTree.innerHTML = '<li class="error">Błąd ładowania struktury katalogów</li>';
    }
}

// Recursively build folder tree
async function buildFolderTree(items, parentElement, currentPath) {
    const folders = items.filter(item => item.type === 'dir').sort((a, b) => a.name.localeCompare(b.name));
    const files = items.filter(item => item.type === 'file' && item.name.endsWith('.md')).sort((a, b) => a.name.localeCompare(b.name));
    
    for (const folder of folders) {
        const li = document.createElement('li');
        const folderName = document.createElement('strong');
        folderName.textContent = folder.name;
        folderName.style.cursor = 'pointer';
        folderName.style.display = 'block';
        folderName.style.marginBottom = '0.5rem';
        
        const subList = document.createElement('ul');
        subList.style.marginLeft = '1rem';
        subList.style.display = 'none';
        
        folderName.addEventListener('click', async () => {
            if (subList.children.length === 0) {
                try {
                    const response = await fetch(folder.url);
                    const subContents = await response.json();
                    await buildFolderTree(subContents, subList, folder.path);
                } catch (error) {
                    console.error('Error loading subfolder:', error);
                }
            }
            subList.style.display = subList.style.display === 'none' ? 'block' : 'none';
        });
        
        li.appendChild(folderName);
        li.appendChild(subList);
        parentElement.appendChild(li);
    }
    
    for (const file of files) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = file.name.replace('.md', '');
        link.dataset.path = file.path;
        
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            await loadNote(file.path, file.name);
            
            document.querySelectorAll('.folder-tree a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
        });
        
        li.appendChild(link);
        parentElement.appendChild(li);
    }
}

// Load and display a specific note
async function loadNote(filePath, fileName) {
    const noteContent = document.getElementById('noteContent');
    
    noteContent.innerHTML = '<div class="loading">Ładowanie notatki...</div>';
    
    try {
        const response = await fetch(`${RAW_BASE}/${filePath}`);
        
        if (!response.ok) {
            throw new Error('Nie można załadować notatki');
        }
        
        let markdown = await response.text();
        
        // Clean Obsidian-specific syntax
        markdown = cleanObsidianMarkdown(markdown);
        
        // Generate table of contents
        const headings = generateTableOfContents(markdown);
        const tocHtml = renderTableOfContents(headings);
        
        // Convert markdown to HTML
        const html = marked.parse(markdown);
        
        // Display the note
        noteContent.innerHTML = `
            <div class="note-header">
                <h1>${fileName.replace('.md', '')}</h1>
                <p class="note-meta">
                    <span>📁 ${filePath}</span> • 
                    <a href="https://github.com/${GITHUB_REPO}/blob/${GITHUB_BRANCH}/${filePath}" target="_blank">
                        Zobacz na GitHub
                    </a>
                </p>
            </div>
            <div class="markdown-content">
                ${html}
            </div>
        `;
        
        // Add ToC to the right sidebar
        const container = document.querySelector('.notes-container');
        
        // Remove existing ToC if present
        const existingToC = container.querySelector('.table-of-contents');
        if (existingToC) {
            existingToC.remove();
        }
        
        // Add new ToC if there are headings
        if (headings.length > 0 && window.innerWidth > 1200) {
            container.insertAdjacentHTML('beforeend', tocHtml);
            
            // Add scroll spy for ToC
            setupScrollSpy();
        }
        
        // Smooth scroll for ToC links
        document.querySelectorAll('.toc-list a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    
                    // Update active state
                    document.querySelectorAll('.toc-list a').forEach(a => a.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });
        
    } catch (error) {
        console.error('Error loading note:', error);
        noteContent.innerHTML = `
            <div class="error">
                <h3>Błąd ładowania notatki</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

// Scroll spy for Table of Contents
function setupScrollSpy() {
    const headings = document.querySelectorAll('.markdown-content h2, .markdown-content h3');
    const tocLinks = document.querySelectorAll('.toc-list a');
    
    if (headings.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                
                tocLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-100px 0px -66%',
        threshold: 0
    });
    
    headings.forEach(heading => {
        if (!heading.id) {
            heading.id = heading.textContent.toLowerCase().replace(/[^\w]+/g, '-');
        }
        observer.observe(heading);
    });
}

// Check for URL parameters
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const note = urlParams.get('note');
    
    if (note) {
        loadNote(note, note.split('/').pop());
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadFolderStructure();
    checkUrlParams();
});
