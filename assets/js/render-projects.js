let activeProjectFilter = 'All';

function renderProjects(containerId, data, limit) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = buildProjectsHtml(data, limit);
}

function setupProjectFilters(filterContainerId, listContainerId, allProjects) {
    const container = document.getElementById(filterContainerId);
    if (!container) return;
    container.innerHTML = buildProjectFiltersHtml(listContainerId, allProjects, activeProjectFilter);
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
        console.warn('Data projects tidak ditemukan. Pastikan file data projects dimuat sebelum render-projects.js');
        return;
    }

    if (typeof window.updateProjectLanguage === 'function') {
        window.updateProjectLanguage();
    }
});