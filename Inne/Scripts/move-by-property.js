module.exports = async (tp) => {
    const file = tp.config.target_file;
    const cache = app.metadataCache.getFileCache(file);
    
    // Sprawdź czy notatka ma właściwość 'przedmiot'
    if (!cache?.frontmatter?.przedmiot) {
        new Notice("Brak właściwości 'przedmiot' w tej notatce!");
        return;
    }
    
    const subject = cache.frontmatter.przedmiot;
    const newPath = `Notatki/${subject}/${file.name}`;
    
    // Sprawdź czy folder Notatki/przedmiot istnieje
    const subjectFolder = `Notatki/${subject}`;
    const folder = app.vault.getAbstractFileByPath(subjectFolder);
    
    if (!folder) {
        // Jeśli nie istnieje - utwórz go
        await app.vault.createFolder(subjectFolder);
        new Notice(`Utworzono folder: ${subjectFolder}`);
    }
    
    // Sprawdź czy notatka już nie jest w docelowym folderze
    if (file.path === newPath) {
        new Notice("Notatka już jest w odpowiednim folderze!");
        return;
    }
    
    // Przenieś plik do odpowiedniego folderu
    try {
        await app.fileManager.renameFile(file, newPath);
        new Notice(`✓ Przeniesiono do: ${subjectFolder}`);
    } catch (error) {
        new Notice(`✗ Błąd: ${error.message}`);
    }
}
