function renderProjects(containerId, data, limit) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const itemsToRender = limit ? data.slice(0, limit) : data;

    if (itemsToRender.length === 0) {
        const emptyMsg = (typeof currentLang !== 'undefined' && currentLang === 'id')
            ? 'Tidak ada proyek untuk kategori ini.'
            : 'No projects found for this category.';
        container.innerHTML = `<p class="col-span-full text-center text-gray-500 italic py-10">${emptyMsg}</p>`;
        return;
    }

    let html = '';
    itemsToRender.forEach(item => {
        const tagsHtml = item.tags && item.tags.length > 0
            ? `<div class="flex flex-wrap gap-2 justify-end flex-shrink-0 max-w-[40%]">
                ${item.tags.map(tag => `<span class="bg-gray-700 text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded border border-gray-600 uppercase tracking-wide">${tag}</span>`).join('')}
               </div>`
            : '';

        const linksHtml = item.links.map(link =>
            `<a href="${link.url}" target="_blank" class="text-sm text-blue-400 hover:text-white hover:underline mr-4 flex items-center gap-1 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                ${link.label}
            </a>`
        ).join('');

        html += `
        <div class="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg text-left h-full flex flex-col hover:border-gray-500 transition-all duration-300 group">
            
            <div class="flex justify-between items-start gap-4 mb-3">
                <h3 class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                    ${getVal(item.title)}
                </h3>
                ${tagsHtml}
            </div>

            <p class="text-gray-400 text-sm leading-relaxed flex-grow border-t border-gray-700/50 pt-4 mt-2">
                ${getVal(item.description)}
            </p>

            <div class="mt-auto pt-6">
                <div class="flex flex-wrap gap-x-4 gap-y-2">
                    ${linksHtml}
                </div>
            </div>
        </div>`;
    });
    container.innerHTML = html;
}

function setupProjectFilters(filterContainerId, listContainerId, allProjects) {
    const container = document.getElementById(filterContainerId);
    if (!container) return;

    const tags = new Set();
    allProjects.forEach(p => {
        if (p.tags) p.tags.forEach(t => tags.add(t));
    });

    const uniqueTags = ['All', ...Array.from(tags).sort()];

    container.innerHTML = uniqueTags.map(tag => {
        let label = tag;
        if (tag === 'All') {
            label = (typeof t === 'function') ? t('buttons.filterAll') : 'Semua';
        }

        const activeClass = (tag === activeProjectFilter)
            ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            : "bg-transparent text-gray-300 border-gray-600 hover:border-white hover:text-white";

        return `<button 
                    onclick="handleProjectFilterClick('${tag}', '${listContainerId}')" 
                    class="px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${activeClass}"
                    data-tag="${tag}">
                    ${label}
                </button>`;
    }).join('');
}

window.handleProjectFilterClick = function (tag, listContainerId) {
    activeProjectFilter = tag;

    const buttons = document.querySelectorAll('#project-filters button');
    buttons.forEach(btn => {
        const btnTag = btn.getAttribute('data-tag');
        if (btnTag === tag) {
            btn.className = "px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]";
        } else {
            btn.className = "px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 border bg-transparent text-gray-300 border-gray-600 hover:border-white hover:text-white";
        }
    });

    if (typeof projects === 'undefined') return;

    const filteredData = (tag === 'All')
        ? projects
        : projects.filter(item => item.tags && item.tags.includes(tag));

    renderProjects(listContainerId, filteredData);
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof projects === 'undefined') {
        console.warn('Data projects tidak ditemukan. Pastikan data.js dimuat sebelum projects.js');
        return;
    }

    const projectListContainer = document.getElementById('projects-list');
    if (projectListContainer) {
        setupProjectFilters('project-filters', 'projects-list', projects);

        const filteredData = (activeProjectFilter === 'All')
            ? projects
            : projects.filter(item => item.tags && item.tags.includes(activeProjectFilter));

        renderProjects('projects-list', filteredData);
    }

    const homeContainer = document.getElementById('proyek-terbaru');
    if (homeContainer) {
        const featuredProjects = [...projects].sort((a, b) => (a.id || 999) - (b.id || 999));

        renderProjects('proyek-terbaru', featuredProjects, 3);
    }
});