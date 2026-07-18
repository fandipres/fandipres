let activeHakiFilter = 'all';
let activeHakiSearch = '';
let currentSort = { column: 'year', direction: 'desc' };

function setupHakiFilter(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = buildHakiFiltersHtml(data, activeHakiFilter);
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

    let results = filterIprData(ipr, activeHakiFilter, activeHakiSearch);
    results = sortIprData(results, currentSort);

    renderHakiTable('haki-table-body', results);
}

window.handleHakiFilter = function (category) {
    activeHakiFilter = category;
    applyHakiFilters();
}

function renderHakiTable(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = buildHakiTableHtml(data);
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