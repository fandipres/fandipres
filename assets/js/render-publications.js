// Publications page: the "Cite" dialog (APA + BibTeX).
let citeReturnFocus = null;

function closeCiteDialog() {
    const overlay = document.getElementById('cite-dialog');
    if (overlay) overlay.remove();
    document.removeEventListener('keydown', handleCiteKeydown);
    if (citeReturnFocus && typeof citeReturnFocus.focus === 'function') citeReturnFocus.focus();
    citeReturnFocus = null;
}

function handleCiteKeydown(e) {
    if (e.key === 'Escape') closeCiteDialog();
}

function openCiteDialog(publicationId, triggerEl) {
    const item = publications.find(p => p.id === publicationId);
    if (!item) return;
    closeCiteDialog();
    citeReturnFocus = triggerEl || null;

    const block = (labelKey, text) => `
        <div class="mt-5">
            <div class="flex items-center justify-between gap-4">
                <h3 class="text-sm font-semibold text-gray-300">${t(labelKey)}</h3>
                <button type="button" data-copy-target="${labelKey}" class="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">${t('cite.copy')}</button>
            </div>
            <pre id="cite-${labelKey.replace('.', '-')}" class="mt-2 p-3 bg-black border border-gray-700 rounded-md text-sm text-gray-200 whitespace-pre-wrap break-words font-mono">${escapeHtml(text)}</pre>
        </div>`;

    const overlay = document.createElement('div');
    overlay.id = 'cite-dialog';
    overlay.className = 'fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70';
    overlay.innerHTML = `
        <div role="dialog" aria-modal="true" aria-labelledby="cite-dialog-title" class="w-full max-w-2xl max-h-full overflow-y-auto bg-gray-900 border border-gray-700 rounded-xl shadow-2xl p-6">
            <div class="flex items-start justify-between gap-4">
                <h2 id="cite-dialog-title" class="text-xl font-bold text-white">${t('cite.title')}</h2>
                <button type="button" data-cite-close class="text-gray-400 hover:text-white text-sm font-medium transition-colors">${t('cite.close')}</button>
            </div>
            ${block('cite.apa', buildApaCitation(item))}
            ${block('cite.bibtex', buildBibtex(item))}
        </div>`;
    document.body.appendChild(overlay);
    document.addEventListener('keydown', handleCiteKeydown);
    const closeBtn = overlay.querySelector('[data-cite-close]');
    if (closeBtn) closeBtn.focus();
}

function copyCitation(button) {
    const target = document.getElementById(`cite-${button.getAttribute('data-copy-target').replace('.', '-')}`);
    if (!target || !navigator.clipboard) return;
    navigator.clipboard.writeText(target.textContent).then(() => {
        const original = button.textContent;
        button.textContent = t('cite.copied');
        setTimeout(() => { button.textContent = original; }, 2000);
    }).catch(err => console.error('Gagal menyalin:', err));
}

document.addEventListener('click', (e) => {
    if (e.target.closest('#publication-reset')) {
        resetPublicationFilters();
        return;
    }

    const citeBtn = e.target.closest('[data-cite-id]');
    if (citeBtn) {
        openCiteDialog(citeBtn.getAttribute('data-cite-id'), citeBtn);
        return;
    }

    const copyBtn = e.target.closest('[data-copy-target]');
    if (copyBtn) {
        copyCitation(copyBtn);
        return;
    }

    if (e.target.id === 'cite-dialog' || e.target.closest('[data-cite-close]')) closeCiteDialog();
});
