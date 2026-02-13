let activeHakiFilter = 'all';
let activeHakiSearch = '';
let currentSort = { column: 'year', direction: 'desc' };

function setupHakiFilter(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const categories = new Set(['all']);
    data.forEach(item => { if (item.category) categories.add(item.category); });

    container.innerHTML = Array.from(categories).map(cat => {
        let label = cat;
        if (typeof t === 'function') {
            const transKey = `ipr.filters.${cat}`;
            const translated = t(transKey);
            label = (translated && translated !== transKey) ? translated : cat;
        }

        const activeClass = (cat === activeHakiFilter)
            ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-900/50"
            : "bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white";

        return `<button onclick="handleHakiFilter('${cat}')" class="px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${activeClass} uppercase tracking-wider">${label}</button>`;
    }).join('');
}

window.handleSort = function (column) {
    if (currentSort.column === column) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.column = column;
        currentSort.direction = (column === 'year') ? 'desc' : 'asc';
    }
    updateSortIcons();
    applyHakiFilters();
}

function updateSortIcons() {
    const cols = ['year', 'title'];
    cols.forEach(col => {
        const icon = document.getElementById(`sort-icon-${col}`);
        if (!icon) return;

        if (currentSort.column === col) {
            icon.classList.remove('text-gray-500');
            icon.classList.add('text-blue-400');
            icon.innerHTML = (currentSort.direction === 'asc')
                ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>`
                : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>`;
        } else {
            icon.classList.remove('text-blue-400');
            icon.classList.add('text-gray-500');
            icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>`;
        }
    });
}

function applyHakiFilters() {
    if (typeof ipr === 'undefined') return;

    const searchInput = document.getElementById('haki-search');
    if (searchInput && typeof t === 'function') {
        searchInput.placeholder = t('ipr.searchPlaceholder');
    }

    setupHakiFilter('haki-filters', ipr);

    let results = [...ipr];

    if (activeHakiFilter !== 'all') {
        results = results.filter(item => item.category === activeHakiFilter);
    }

    if (activeHakiSearch.trim() !== '') {
        const term = activeHakiSearch.toLowerCase();
        results = results.filter(item => {
            const title = getVal(item.title).toLowerCase();
            const desc = getVal(item.description).toLowerCase();
            const number = item.number.toLowerCase();
            const typeVal = getVal(item.type).toLowerCase();
            return title.includes(term) || desc.includes(term) || number.includes(term) || typeVal.includes(term);
        });
    }

    results.sort((a, b) => {
        let valA, valB;
        if (currentSort.column === 'year') {
            valA = parseInt(a.year);
            valB = parseInt(b.year);
        } else if (currentSort.column === 'title') {
            valA = getVal(a.title).toLowerCase();
            valB = getVal(b.title).toLowerCase();
        }
        if (valA < valB) return currentSort.direction === 'asc' ? -1 : 1;
        if (valA > valB) return currentSort.direction === 'asc' ? 1 : -1;
        return 0;
    });

    renderHakiTable('haki-table-body', results);
}

window.handleHakiFilter = function (category) {
    activeHakiFilter = category;
    applyHakiFilters();
}

function renderHakiTable(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (data.length === 0) {
        const emptyMsg = (typeof currentLang !== 'undefined' && currentLang === 'id')
            ? 'Tidak ada data ditemukan.'
            : 'No records found.';

        container.innerHTML = `
            <tr class="block md:table-row bg-gray-800/50 rounded-xl p-4 md:p-0 border border-gray-700 md:border-0">
                <td colspan="5" class="p-8 text-center text-gray-500 italic block md:table-cell">
                    ${emptyMsg}
                </td>
            </tr>`;
        return;
    }

    const labels = {
        year: (typeof t === 'function') ? t('ipr.table.year') : 'Tahun',
        title: (typeof t === 'function') ? t('ipr.table.title') : 'Ciptaan',
        type: (typeof t === 'function') ? t('ipr.table.category') : 'Jenis',
        num: (typeof t === 'function') ? t('ipr.table.regNumber') : 'Nomor',
        iss: (typeof t === 'function') ? t('ipr.table.issuer') : 'Penerbit'
    };

    const html = data.map(item => {
        const badgeColor = "bg-blue-500/10 text-blue-400 border-blue-500/20 border";

        const hasLink = item.link && item.link !== '#';
        const titleText = getVal(item.title);
        const descText = getVal(item.description);
        const typeText = item.type ? getVal(item.type) : item.category;

        const titleHtml = hasLink
            ? `<a href="${item.link}" target="_blank" class="text-white font-bold text-lg mb-1 hover:text-blue-400 transition-colors inline-flex items-center gap-2 group-hover:underline decoration-blue-500/50 underline-offset-4">
                 ${titleText}
                 <svg class="w-4 h-4 text-gray-500 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
               </a>`
            : `<h3 class="text-white font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors">${titleText}</h3>`;

        const descHtml = descText ? `<p class="text-gray-500 text-sm leading-relaxed line-clamp-2 mt-2 md:mt-1">${descText}</p>` : '';

        return `
        <tr class="group block md:table-row bg-gray-900 md:bg-transparent rounded-xl md:rounded-none border border-gray-800 md:border-0 md:border-b md:border-gray-800/50 hover:bg-gray-800/50 transition-colors duration-200 shadow-lg md:shadow-none mb-6 md:mb-0 relative overflow-hidden md:overflow-visible">
            
            <td class="block md:table-cell p-4 md:p-6 align-top text-gray-400 font-mono text-sm whitespace-nowrap font-bold border-b border-gray-800 md:border-0">
                <span class="md:hidden text-xs uppercase text-gray-500 font-bold tracking-wider mb-1 block">${labels.year}</span>
                ${item.year}
            </td>

            <td class="block md:table-cell p-4 md:p-6 align-top border-b border-gray-800 md:border-0">
                <span class="md:hidden text-xs uppercase text-gray-500 font-bold tracking-wider mb-2 block">${labels.title}</span>
                ${titleHtml}
                ${descHtml}
            </td>

            <td class="block md:table-cell p-4 md:p-6 align-top whitespace-nowrap border-b border-gray-800 md:border-0">
                <span class="md:hidden text-xs uppercase text-gray-500 font-bold tracking-wider mb-2 block">${labels.type}</span>
                <span class="inline-flex items-center px-2.5 py-1 md:py-0.5 rounded text-xs font-medium ${badgeColor}">
                    ${typeText}
                </span>
            </td>

            <td class="block md:table-cell p-4 md:p-6 align-top whitespace-nowrap border-b border-gray-800 md:border-0">
                <span class="md:hidden text-xs uppercase text-gray-500 font-bold tracking-wider mb-2 block">${labels.num}</span>
                <code class="text-green-400 font-mono text-sm font-bold bg-black/30 px-2 py-1 rounded w-fit border border-gray-700/50 select-all block md:inline-block">
                    ${item.number}
                </code>
            </td>

            <td class="block md:table-cell p-4 md:p-6 align-top whitespace-nowrap">
                <span class="md:hidden text-xs uppercase text-gray-500 font-bold tracking-wider mb-1 block">${labels.iss}</span>
                <span class="text-sm text-gray-300 font-medium">
                    ${item.issuer || 'Indonesia'}
                </span>
            </td>
        </tr>`;
    }).join('');

    container.innerHTML = html;
}

window.updateIPRLanguage = function () {
    applyHakiFilters();
};

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('haki-table-body') && typeof ipr !== 'undefined') {
        updateSortIcons();
        applyHakiFilters();

        const searchInput = document.getElementById('haki-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                activeHakiSearch = e.target.value;
                applyHakiFilters();
            });
        }
    }
});