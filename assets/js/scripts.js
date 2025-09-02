function renderItems(containerId, data, limit) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const itemsToRender = limit ? data.slice(0, limit) : data;

    let html = '';
    itemsToRender.forEach(item => {
        html += `
            <div class="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div class="flex-shrink-0 sm:w-48 text-gray-400 font-medium">${item.year}</div>
                <div class="border-l-4 border-gray-700 pl-4 sm:pl-6 flex-grow">
                    <h3 class="text-xl font-semibold text-white">${item.title}</h3>
                    <p class="mt-1 text-base text-gray-300">${item.subtitle || ''}</p>
                    <p class="mt-2 text-gray-400 text-sm leading-relaxed">${item.description}</p>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function renderAcademicActivities(containerId, activities) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '';
    for (const key in activities) {
        const activity = activities[key];

        html += `
             <a href="${activity.link}" class="block bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                <h3 class="text-xl font-semibold text-white">${activity.title}</h3>
                <p class="mt-2 text-gray-400 text-sm">${activity.description}</p>
            </a>
        `;
    }
    container.innerHTML = html;
}

function renderGroupedItems(containerId, data, groupByProperty) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const groupedData = data.reduce((acc, item) => {
        const key = item[groupByProperty];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {});

    let html = '';
    for (const key in groupedData) {
        const itemsInGroup = groupedData[key];

        itemsInGroup.sort((a, b) => a.title.localeCompare(b.title));

        const itemsHtml = itemsInGroup.map(item => `
            <div>
                <h3 class="text-xl font-semibold text-white">${item.title}</h3>
                <p class="mt-1 text-base text-gray-300">${item.subtitle || ''}</p>
                <p class="mt-2 text-gray-400 text-sm leading-relaxed">${item.description}</p>
            </div>
        `).join('');

        html += `
            <div class="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div class="flex-shrink-0 sm:w-48 text-gray-400 font-medium">${key}</div>
                <div class="border-l-4 border-gray-700 pl-4 sm:pl-6 flex-grow space-y-6">
                    ${itemsHtml}
                </div>
            </div>
        `;
    }
    container.innerHTML = html;
}

function renderGroupedResearch(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const groupedData = data.reduce((acc, item) => {
        const key = item.year;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {});

    const sortedYears = Object.keys(groupedData).sort((a, b) => b - a);

    let html = '';
    sortedYears.forEach(year => {
        const itemsInGroup = groupedData[year];

        itemsInGroup.sort((a, b) => a.title.localeCompare(b.title));

        const itemsHtml = itemsInGroup.map(item => {
            const tagsHtml = `
                <div class="mt-3 flex items-center flex-wrap gap-2">
                    ${item.category ? `<span class="inline-block bg-blue-700/80 text-blue-200 text-xs font-semibold px-3 py-1 rounded-md">${item.category}</span>` : ''}
                    ${item.role ? `<span class="inline-block bg-purple-700/80 text-purple-200 text-xs font-semibold px-3 py-1 rounded-md">${item.role}</span>` : ''}
                    ${item.rank ? `<span class="inline-block bg-green-700/80 text-green-200 text-xs font-semibold px-3 py-1 rounded-md">${item.rank}</span>` : ''}
                </div>
            `;
            return `
                <div>
                    <a href="${item.link || '#'}" target="_blank" class="text-xl font-semibold text-white hover:text-blue-400 transition-colors duration-300">
                        ${item.title}
                    </a>
                    <p class="mt-1 text-base text-gray-300">${item.subtitle || ''}</p>
                    ${tagsHtml}
                    <p class="mt-3 text-gray-400 text-sm leading-relaxed">${item.description}</p>
                </div>
            `;
        }).join('');

        html += `
            <div class="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div class="flex-shrink-0 sm:w-48 text-gray-400 font-medium">${year}</div>
                <div class="border-l-4 border-gray-700 pl-4 sm:pl-6 flex-grow space-y-6">
                    ${itemsHtml}
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function renderProjects(containerId, data, limit) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const itemsToRender = limit ? data.slice(0, limit) : data;
    if (itemsToRender.length === 0) {
        container.innerHTML = `<p class="md:col-span-2 lg:col-span-3 text-gray-400">Tidak ada proyek yang cocok dengan filter ini.</p>`;
        return;
    }
    let html = '';
    itemsToRender.forEach(item => {
        const tagsHtml = item.tags && item.tags.length > 0 ? `<div class="mt-3 mb-3 flex flex-wrap gap-2">${item.tags.map(tag => `<span class="bg-gray-700 text-gray-300 text-xs font-semibold px-2.5 py-1 rounded-full">${tag}</span>`).join('')}</div>` : '';
        const linksHtml = item.links.map(link => `<a href="${link.url}" target="_blank" class="text-sm text-blue-400 hover:underline">${link.label}</a>`).join('');
        html += `<div class="bg-gray-800 p-6 rounded-lg shadow-lg text-left h-full flex flex-col"><div class="flex items-start justify-between gap-4"><h3 class="text-xl font-semibold text-white">${item.title}</h3>${tagsHtml}</div><p class="mt-3 text-gray-400 text-sm leading-relaxed flex-grow">${item.description}</p><div class="mt-auto pt-4"><div class="mt-4 border-t border-gray-700 pt-4 flex flex-wrap gap-x-4 gap-y-2">${linksHtml}</div></div></div>`;
    });
    container.innerHTML = html;
}

function setupProjectFilters(filtersContainerId, projectsContainerId, data) {
    const filtersContainer = document.getElementById(filtersContainerId);
    if (!filtersContainer) return;
    const allTags = new Set();
    data.forEach(project => { if (project.tags) { project.tags.forEach(tag => allTags.add(tag)); } });
    let filtersHtml = '<button class="filter-btn active bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">Semua</button>';
    allTags.forEach(tag => {
        filtersHtml += `<button class="filter-btn bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-md text-sm font-medium transition-colors">${tag}</button>`;
    });
    filtersContainer.innerHTML = filtersHtml;
    const filterButtons = filtersContainer.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentActive = filtersContainer.querySelector('.active');
            if (currentActive) {
                currentActive.classList.remove('active', 'bg-blue-600', 'text-white');
                currentActive.classList.add('bg-gray-700', 'text-gray-300');
            }
            button.classList.add('active', 'bg-blue-600', 'text-white');
            button.classList.remove('bg-gray-700', 'text-gray-300');
            const filterValue = button.textContent;
            const filteredProjects = (filterValue === 'Semua') ? data : data.filter(project => project.tags && project.tags.includes(filterValue));
            renderProjects(projectsContainerId, sortedProjects(filteredProjects));
        });
    });
}

function sortedProjects(projectList) {
    return [...projectList].sort((a, b) => {
        const aHasId = a.id !== undefined;
        const bHasId = b.id !== undefined;
        if (aHasId && !bHasId) return -1;
        if (!aHasId && bHasId) return 1;
        if (aHasId && bHasId) return a.id - b.id;
        return a.title.localeCompare(b.title);
    });
}

function renderSocialMedia(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '';
    data.forEach(link => {
        html += `
            <a href="${link.url}" target="_blank" title="${link.name}" class="text-gray-400 hover:text-white transition-transform duration-300 transform hover:scale-110">
                ${link.icon}
            </a>
        `;
    });
    container.innerHTML = html;
}