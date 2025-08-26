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

    let html = '';
    itemsToRender.forEach(item => {
        let tagsHtml = '';
        if (item.tags && item.tags.length > 0) {
            const firstTag = item.tags[0];
            const otherTags = item.tags.slice(1);

            const otherTagsHtml = otherTags.map(tag =>
                `<span class="bg-gray-700 text-gray-300 text-xs font-semibold px-2.5 py-1 rounded-full">${tag}</span>`
            ).join('');

            tagsHtml = `
                <div class="relative flex items-center gap-2 group">
                    <span class="bg-gray-700 text-gray-300 text-xs font-semibold px-2.5 py-1 rounded-full">${firstTag}</span>
                    
                    ${otherTags.length > 0 ? `<span class="text-xs text-gray-400 font-bold cursor-pointer">+${otherTags.length}</span>` : ''}
                    
                    ${otherTags.length > 0 ? `
                        <div class="absolute top-full left-0 mt-2 w-max p-2 bg-gray-600 rounded-lg shadow-lg 
                                    flex flex-wrap gap-2 z-10
                                    opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                    transition-all duration-300 transform scale-95 group-hover:scale-100">
                            ${otherTagsHtml}
                        </div>
                    ` : ''}
                </div>
            `;
        }

        const linksHtml = item.links.map(link =>
            `<a href="${link.url}" target="_blank" class="text-sm text-blue-400 hover:underline mr-4">${link.label}</a>`
        ).join('');

        html += `
            <div class="bg-gray-800 p-6 rounded-lg shadow-lg text-left h-full flex flex-col">
                <div class="flex items-start justify-between gap-4">
                    <h3 class="text-xl font-semibold text-white">${item.title}</h3>
                    ${tagsHtml}
                </div>

                <p class="mt-3 text-gray-400 text-sm leading-relaxed flex-grow">${item.description}</p>
                
                <div class="mt-auto pt-4">
                    <div class="mt-4 border-t border-gray-700 pt-4">
                        ${linksHtml}
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
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

document.addEventListener('DOMContentLoaded', () => {
    renderItems('recent-experience', experience, 2);
    renderItems('recent-education', education, 2);
    renderGroupedItems('all-experience', experience, 'year');
    renderGroupedItems('all-education', education, 'year');
    renderAcademicActivities('academic-activities-container', academicActivities);
    renderGroupedItems('all-teaching', teaching, 'year');
    renderGroupedResearch('all-research', research, 'year');
    renderGroupedResearch('all-community_service', community_service, 'year');
    renderGroupedResearch('all-publication', publication, 'year');
    renderGroupedResearch('all-book', book, 'year');
    renderGroupedResearch('all-speaker', speaker, 'year');
    const featuredProjects = [...projects].sort((a, b) => (a.id || 999) - (b.id || 999));
    const sortedProjects = [...projects].sort((a, b) => {
        const aHasId = a.id !== undefined && a.id !== null;
        const bHasId = b.id !== undefined && b.id !== null;

        if (aHasId && !bHasId) return -1;
        if (!aHasId && bHasId) return 1;

        if (aHasId && bHasId) {
            return a.id - b.id;
        }

        return a.title.localeCompare(b.title);
    });
    renderProjects('recent-projects', featuredProjects, 3);
    renderProjects('all-projects', sortedProjects);
    renderSocialMedia('social-media', socialMedia);
    document.getElementById('year').textContent = new Date().getFullYear();
});