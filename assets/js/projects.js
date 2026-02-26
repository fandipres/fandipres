let activeProjectFilter = 'All';

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

        const getIcon = (labelName) => {
            const name = labelName.toLowerCase();
            if (name.includes('facebook')) return `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>`;
            if (name.includes('instagram')) return `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;
            if (name.includes('youtube')) return `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`;
            if (name.includes('tiktok')) return `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`;
            if (name.includes('github')) return `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`;
            if (name.includes('android') || name.includes('playstore') || name.includes('play store')) return `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0004.5511-.4482.9997-.9993.9997zm-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997zm11.4045-6.02l1.9973-3.4592c.0416-.073.0135-.1647-.0584-.2071-.0723-.0416-.1655-.0135-.2071.0588l-2.0289 3.513c-1.5833-.7221-3.4116-1.125-5.3853-1.125s-3.8016.4029-5.3853 1.125l-2.0289-3.513c-.0416-.0723-.1352-.1004-.2071-.0588-.0723.042-.1004.1341-.0584.2071l1.9973 3.4592C2.6889 11.1627.3429 14.8692 0 19.3146h24c-.3429-4.4454-2.6889-8.1519-6.523-9.9932z"/></svg>`;
            if (name.includes('ios') || name.includes('apple') || name.includes('app store') || name.includes('mac')) return `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.152 6.896c-.029-2.224 1.83-3.328 1.916-3.38-1.03-1.503-2.636-1.706-3.197-1.733-1.353-.136-2.645.795-3.342.795-.698 0-1.776-.777-2.909-.754-1.488.02-2.859.865-3.626 2.198-1.562 2.705-.399 6.702 1.121 8.895.742 1.07 1.625 2.261 2.775 2.222 1.107-.039 1.531-.711 2.872-.711 1.338 0 1.728.711 2.894.69 1.185-.02 1.948-1.087 2.684-2.161.85-1.24 1.201-2.441 1.218-2.505-.025-.01-2.352-.902-2.392-3.576zM10.938 2.607c.613-.742 1.025-1.772.912-2.8-.887.036-1.956.59-2.585 1.328-.56.654-1.05 1.705-.916 2.715.986.076 1.972-.505 2.589-1.243z"/></svg>`;
            if (name.includes('windows') || name.includes('pc')) return `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3.449L9.75 2.1v9.451H0V3.449zM10.949 1.947L24 0v11.4H10.949V1.947zM0 12.6h9.75v9.451L0 20.701V12.6zm10.949 0H24V24l-13.051-1.801V12.6z"/></svg>`;
            if (name.includes('store')) return `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>`;
            if (name.includes('demo') || name.includes('preview')) return `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`;
            if (name.includes('web') || name.includes('site')) return `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>`;
            return `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>`;
        };

        let linksHtml = '';
        if (item.links && item.links.length > 0) {
            const linksInnerHtml = item.links.map(link => {
                const labelText = typeof getVal === 'function' ? getVal(link.label) : link.label;
                const iconSvg = getIcon(labelText);

                return `
                <div class="relative group/link">
                    <a href="${link.url}" target="_blank" 
                        class="flex items-center justify-center w-9 h-9 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300">
                        ${iconSvg}
                    </a>
                    
                    <span class="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-gray-900 border border-gray-700 text-[10px] font-bold text-white rounded opacity-0 group-hover/link:opacity-100 group-hover/link:-translate-y-1 transition-all pointer-events-none whitespace-nowrap z-20 shadow-xl shadow-black/50">
                        ${labelText}
                    </span>
                </div>`;
            }).join('');

            linksHtml = `
            <div class="inline-flex items-center p-1 bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-inner">
                ${linksInnerHtml}
            </div>`;
        }

        html += `
        <div class="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-lg text-left h-full flex flex-col hover:border-gray-500 hover:shadow-2xl hover:shadow-black/40 transition-all duration-300 group">
            
            <div>
                <h3 class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                    ${getVal(item.title)}
                </h3>
            </div>

            <p class="text-gray-400 text-sm leading-relaxed flex-grow border-t border-gray-700/50 pt-4 mt-4">
                ${getVal(item.description)}
            </p>

            <div class="mt-6">
                ${linksHtml}
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

window.updateProjectLanguage = function () {
    if (typeof projects === 'undefined') return;

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
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof projects === 'undefined') {
        console.warn('Data projects tidak ditemukan. Pastikan file data projects dimuat sebelum projects.js');
        return;
    }

    if (typeof window.updateProjectLanguage === 'function') {
        window.updateProjectLanguage();
    }
});