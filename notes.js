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

// Load folder structure
async function loadFolderStructure() {
    const folderTree = document.getElementById('folderTree');
    
    try {
        // Fetch the contents of the Notatki folder
        const response = await fetch(`${API_BASE}/contents/${NOTES_FOLDER}`);
        
        if (!response.ok) {
            throw new Error('Nie można załadować struktury katalogów');
        }
        
        const contents = await response.json();
        
        // Clear loading message
        folderTree.innerHTML = '';
        
        // Recursively build folder tree
        await buildFolderTree(contents, folderTree, '');
        
    } catch (error) {
        console.error('Error loading folder structure:', error);
        folderTree.innerHTML = '<li class="error">Błąd ładowania struktury katalogów</li>';
    }
}

// Recursively build folder tree
async function buildFolderTree(items, parentElement, currentPath) {
    // Sort: folders first, then files
    const folders = items.filter(item => item.type === 'dir').sort((a, b) => a.name.localeCompare(b.name));
    const files = items.filter(item => item.type === 'file' && item.name.endsWith('.md')).sort((a, b) => a.name.localeCompare(b.name));
    
    // Add folders
    for (const folder of folders) {
        const li = document.createElement('li');
        const folderName = document.createElement('strong');
        folderName.textContent = `📁 ${folder.name}`;
        folderName.style.cursor = 'pointer';
        folderName.style.display = 'block';
        folderName.style.marginBottom = '0.5rem';
        
        const subList = document.createElement('ul');
        subList.style.marginLeft = '1rem';
        subList.style.display = 'none';
        
        folderName.addEventListener('click', async () => {
            if (subList.children.length === 0) {
                // Load subfolder contents
                try {
                    const response = await fetch(folder.url);
                    const subContents = await response.json();
                    await buildFolderTree(subContents, subList, folder.path);
                } catch (error) {
                    console.error('Error loading subfolder:', error);
                }
            }
            // Toggle visibility
            subList.style.display = subList.style.display === 'none' ? 'block' : 'none';
        });
        
        li.appendChild(folderName);
        li.appendChild(subList);
        parentElement.appendChild(li);
    }
    
    // Add files
    for (const file of files) {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = `📄 ${file.name.replace('.md', '')}`;
        link.dataset.path = file.path;
        
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            await loadNote(file.path, file.name);
            
            // Update active state
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
    
    // Show loading state
    noteContent.innerHTML = '<div class="loading">Ładowanie notatki...</div>';
    
    try {
        // Fetch the raw markdown file
        const response = await fetch(`${RAW_BASE}/${filePath}`);
        
        if (!response.ok) {
            throw new Error('Nie można załadować notatki');
        }
        
        const markdown = await response.text();
        
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
        
        // Process links in the content to handle internal wiki-links
        processInternalLinks();
        
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

// Process internal wiki-links [[note]] style
function processInternalLinks() {
    const content = document.querySelector('.markdown-content');
    if (!content) return;
    
    const wikiLinkRegex = /\[\[([^\]]+)\]\]/g;
    
    content.innerHTML = content.innerHTML.replace(wikiLinkRegex, (match, linkText) => {
        // Try to find the corresponding note
        return `<a href="#" class="wiki-link" data-note="${linkText}">${linkText}</a>`;
    });
    
    // Add click handlers to wiki-links
    content.querySelectorAll('.wiki-link').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const noteName = link.dataset.note;
            // Try to find and load the note
            // This is a simplified version - you might want to implement better search
            const fullPath = `${NOTES_FOLDER}/${noteName}.md`;
            await loadNote(fullPath, noteName);
        });
    });
}

// Check for URL parameters (for deep linking)
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const note = urlParams.get('note');
    
    if (note) {
        // Load the specified note
        loadNote(note, note.split('/').pop());
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadFolderStructure();
    checkUrlParams();
});
