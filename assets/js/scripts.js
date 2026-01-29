let currentLang = localStorage.getItem('site_lang') || 'id';

function getVal(data) {
    if (!data) return "";
    if (typeof data === 'string') return data;
    const text = data[currentLang];
    return (text && text.trim() !== "") ? text : data.id;
}

function t(keyPath) {
    const keys = keyPath.split('.');
    let obj = siteTranslations;
    for (const k of keys) {
        if (!obj) return "";
        obj = obj[k];
    }
    return getVal(obj);
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('site_lang', lang);
    updateToggleButtons();
    updateStaticPageElements();
    initDynamicContent();
}

function updateToggleButtons() {
    const textNext = currentLang === 'id' ? 'EN' : 'ID';
    const btnText = document.getElementById('lang-text');
    if (btnText) btnText.textContent = textNext;

    const btnMobile = document.getElementById('lang-toggle-mobile');
    if (btnMobile) {
        btnMobile.textContent = currentLang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia';
    }
}

function updateStaticPageElements() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
}

function renderItems(containerId, data, limit) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const itemsToRender = limit ? data.slice(0, limit) : data;
    let html = '';

    itemsToRender.forEach(item => {
        const subtitle = getVal(item.subtitle);
        const subtitleHtml = subtitle
            ? `<p class="mt-1 text-base text-blue-300 font-medium tracking-wide">${subtitle}</p>`
            : '';

        const isEducation = containerId.includes('education') || containerId.includes('pendidikan');
        const descClass = isEducation ? "text-gray-400 italic" : "text-gray-400";

        html += `
            <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 group">
                <div class="flex-shrink-0 sm:w-48 text-gray-500 font-medium text-sm pt-1 uppercase tracking-wider sticky top-24 self-start">
                    ${getVal(item.year)}
                </div>
                <div class="border-l-4 border-gray-800 pl-4 sm:pl-8 flex-grow transition-colors duration-300 hover:border-gray-700">
                    <h3 class="text-xl font-bold text-white">${getVal(item.title)}</h3>
                    ${subtitleHtml}
                    <p class="mt-2 ${descClass} text-sm leading-relaxed border-t border-gray-800/50 pt-2">${getVal(item.description)}</p>
                </div>
            </div>`;
    });

    container.innerHTML = `<div class="space-y-8">${html}</div>`;
}

function renderDetailItems(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const groupedMap = new Map();
    data.forEach(item => {
        const key = getVal(item.year);
        if (!groupedMap.has(key)) {
            groupedMap.set(key, []);
        }
        groupedMap.get(key).push(item);
    });

    let html = '';

    groupedMap.forEach((itemsInGroup, year) => {
        const itemsHtml = itemsInGroup.map(item => {
            const titleHtml = `<h3 class="text-xl font-semibold text-white">${getVal(item.title)}</h3>`;

            const rankText = item.rank ? getVal(item.rank) : '';
            const subtitleHtml = rankText
                ? `<p class="mt-1 text-base text-blue-300 font-medium tracking-wide">${getVal(item.subtitle) || ''} • <span class="text-green-400">${rankText}</span></p>`
                : `<p class="mt-1 text-base text-blue-300 font-medium tracking-wide">${getVal(item.subtitle) || ''}</p>`;

            const tags = [];
            if (item.category) tags.push(getVal(item.category));
            if (item.role) tags.push(getVal(item.role));
            const tagsHtml = tags.length > 0 ? `<p class="mt-1 text-sm text-gray-500">${tags.join(' • ')}</p>` : '';

            let studentsHtml = '';
            if (item.students && Array.isArray(item.students) && item.students.length > 0) {
                let studentList = [];
                item.students.forEach(name => {
                    const txt = getVal(name);
                    const parts = txt.split(',').map(s => s.trim()).filter(s => s);
                    studentList.push(...parts);
                });

                const chips = studentList.map(name => `
                    <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700/50 hover:bg-gray-700 transition-colors duration-200 cursor-default">
                        <svg class="w-3 h-3 mr-1.5 opacity-60" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                        </svg>
                        ${name}
                    </span>
                `).join('');
                studentsHtml = `<div class="mt-3 flex flex-wrap gap-2 items-center border-t border-gray-800/50 pt-2">${chips}</div>`;
            }

            const rawDesc = getVal(item.description);
            let descriptionHtml = '';
            let detailsListHtml = '';

            if (item.classes && Array.isArray(item.classes) && item.classes.length > 0) {
                let classList = [];
                item.classes.forEach(clsObj => {
                    const txt = getVal(clsObj);
                    const parts = txt.split(',').map(s => s.trim()).filter(s => s);
                    classList.push(...parts);
                });

                const chips = classList.map(clsName => `
                    <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700/50 hover:bg-gray-700 transition-colors duration-200 cursor-default">
                        <svg class="w-3 h-3 mr-1.5 opacity-60" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                        </svg>
                        ${clsName}
                    </span>
                `).join('');

                detailsListHtml = `<div class="mt-3 flex flex-wrap gap-2 items-center border-t border-gray-800/50 pt-2">${chips}</div>`;
            }
            else if (containerId === 'pengajaran-lengkap' && rawDesc && !item.classes) {
                const classes = rawDesc.split(',').map(s => s.trim().replace(/\.$/, '')).filter(s => s);
                const chips = classes.map(cls => `
                    <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700/50 hover:bg-gray-700 transition-colors duration-200 cursor-default">
                        <svg class="w-3 h-3 mr-1.5 opacity-60" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                        </svg>
                        ${cls}
                    </span>
                `).join('');
                detailsListHtml = `<div class="mt-3 flex flex-wrap gap-2 items-center border-t border-gray-800/50 pt-2">${chips}</div>`;
            }
            else if (rawDesc) {
                descriptionHtml = `<p class="mt-3 text-gray-400 text-sm leading-relaxed">${rawDesc}</p>`;
            }

            if ((item.classes || (containerId !== 'pengajaran-lengkap')) && rawDesc) {
                descriptionHtml = `<p class="mt-3 text-gray-400 text-sm leading-relaxed">${rawDesc}</p>`;
            }

            let assetsHtml = '';
            if (item.assets) {
                const assetLinks = [];
                for (const [key, labelObj] of Object.entries(siteTranslations.asset)) {
                    const link = item.assets[key];
                    const label = t(`asset.${key}`);
                    if (link === "") {
                        assetLinks.push({ label: label, html: `<span class="text-gray-600 cursor-default text-xs uppercase tracking-wide font-semibold">${label}</span>` });
                    } else if (link) {
                        assetLinks.push({ label: label, html: `<a href="${link}" target="_blank" class="text-blue-400 hover:text-blue-300 text-xs uppercase tracking-wide font-semibold hover:underline flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>${label}</a>` });
                    }
                }
                assetLinks.sort((a, b) => a.label.localeCompare(b.label));
                if (assetLinks.length > 0) {
                    assetsHtml = `<div class="mt-4 flex items-center gap-4 border-t border-gray-800 pt-3">${assetLinks.map(l => l.html).join('')}</div>`;
                }
            }

            return `<div class="mb-10 last:mb-0 group/item">${titleHtml}${subtitleHtml}${tagsHtml}${descriptionHtml}${studentsHtml}${detailsListHtml}${assetsHtml}</div>`;
        }).join('');

        html += `
        <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 group">
            <div class="flex-shrink-0 sm:w-48 text-gray-500 font-medium text-sm pt-1 sticky top-24 self-start uppercase tracking-wider">${year}</div>
            <div class="border-l-4 border-gray-800 pl-4 sm:pl-8 flex-grow transition-colors duration-300 group-hover:border-gray-700">
                ${itemsHtml}
            </div>
        </div>`;
    });
    container.innerHTML = html;
}

function renderProjects(containerId, data, limit) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const itemsToRender = limit ? data.slice(0, limit) : data;

    if (itemsToRender.length === 0) {
        container.innerHTML = `<p class="col-span-full text-center text-gray-500 italic py-10">${currentLang === 'id' ? 'Tidak ada proyek untuk kategori ini.' : 'No projects found for this category.'}</p>`;
        return;
    }

    let html = '';
    itemsToRender.forEach(item => {
        const tagsHtml = item.tags && item.tags.length > 0 ? `<div class="mt-3 mb-3 flex flex-wrap gap-2">${item.tags.map(tag => `<span class="bg-gray-700 text-gray-300 text-xs font-semibold px-2.5 py-1 rounded-full">${tag}</span>`).join('')}</div>` : '';
        const linksHtml = item.links.map(link => `<a href="${link.url}" target="_blank" class="text-sm text-blue-400 hover:underline mr-4">${link.label}</a>`).join('');

        html += `
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg text-left h-full flex flex-col hover:bg-gray-750 transition-colors duration-300">
            <div class="flex items-start justify-between gap-4">
                <h3 class="text-xl font-semibold text-white">${getVal(item.title)}</h3>
                ${tagsHtml}
            </div>
            <p class="mt-3 text-gray-400 text-sm leading-relaxed flex-grow">${getVal(item.description)}</p>
            <div class="mt-auto pt-4">
                <div class="mt-4 border-t border-gray-700 pt-4 flex flex-wrap gap-x-4 gap-y-2">
                    ${linksHtml}
                </div>
            </div>
        </div>`;
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
            <h3 class="text-xl font-semibold text-white">${getVal(activity.title)}</h3>
            <p class="mt-2 text-gray-400 text-sm">${getVal(activity.description)}</p>
        </a>`;
    }
    container.innerHTML = html;
}

function renderSocialLinks(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    let html = '';
    data.forEach(link => {
        html += `<a href="${link.url}" target="_blank" title="${link.name}" class="text-gray-400 hover:text-white transition-transform duration-300 transform hover:scale-110">${link.icon}</a>`;
    });
    container.innerHTML = html;
}

let activeProjectFilter = 'All';

function setupProjectFilters(filterContainerId, listContainerId, allProjects) {
    const container = document.getElementById(filterContainerId);
    if (!container) return;

    const tags = new Set();
    allProjects.forEach(p => {
        if (p.tags) p.tags.forEach(t => tags.add(t));
    });
    const uniqueTags = ['All', ...Array.from(tags).sort()];

    container.innerHTML = uniqueTags.map(tag => {
        const label = tag === 'All' ? t('buttons.filterAll') : tag;
        const activeClass = (tag === activeProjectFilter)
            ? "bg-white text-black border-white"
            : "bg-transparent text-gray-300 border-gray-600 hover:border-white hover:text-white";

        return `<button 
                    onclick="handleFilterClick('${tag}', '${listContainerId}')" 
                    class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeClass}"
                    data-tag="${tag}">
                    ${label}
                </button>`;
    }).join('');
}

window.handleFilterClick = function (tag, listContainerId) {
    activeProjectFilter = tag;

    const buttons = document.querySelectorAll('#project-filters button');
    buttons.forEach(btn => {
        const btnTag = btn.getAttribute('data-tag');
        if (btnTag === tag) {
            btn.className = "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border bg-white text-black border-white";
        } else {
            btn.className = "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border bg-transparent text-gray-300 border-gray-600 hover:border-white hover:text-white";
        }
    });

    const filteredData = (tag === 'All')
        ? projects
        : projects.filter(item => item.tags && item.tags.includes(tag));

    renderProjects(listContainerId, filteredData);
};

function initDynamicContent() {
    if (document.getElementById('pekerjaan-terbaru')) {
        renderItems('pekerjaan-terbaru', experience, 2);
        renderItems('pendidikan-terbaru', education, 2);
        renderAcademicActivities('aktivitas-akademik-container', academicActivities);
        const featuredProjects = [...projects].sort((a, b) => (a.id || 999) - (b.id || 999));
        renderProjects('proyek-terbaru', featuredProjects, 3);
    }

    if (document.getElementById('education-list')) renderItems('education-list', education);
    if (document.getElementById('experience-list')) renderItems('experience-list', experience);

    if (document.getElementById('pengajaran-lengkap')) renderDetailItems('pengajaran-lengkap', teaching);

    if (document.getElementById('thesis-list')) renderDetailItems('thesis-list', thesisSupervision);
    if (document.getElementById('tutoring-list')) renderDetailItems('tutoring-list', privateTeaching);

    if (document.getElementById('research-list')) renderDetailItems('research-list', research);
    if (document.getElementById('community-list')) renderDetailItems('community-list', community_service);
    if (document.getElementById('publication-list')) renderDetailItems('publication-list', publications);
    if (document.getElementById('book-list')) renderDetailItems('book-list', books);
    if (document.getElementById('talk-list')) renderDetailItems('talk-list', talks);

    if (document.getElementById('projects-list')) {
        setupProjectFilters('project-filters', 'projects-list', projects);
        const filteredData = (activeProjectFilter === 'All')
            ? projects
            : projects.filter(item => item.tags && item.tags.includes(activeProjectFilter));
        renderProjects('projects-list', filteredData);
    }

    renderSocialLinks('social-links-footer', socialMedia);
    if (document.getElementById('social-media')) renderSocialLinks('social-media', socialMedia);

    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setLanguage(currentLang);

    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const newLang = currentLang === 'id' ? 'en' : 'id';
            setLanguage(newLang);
        });
    }

    const langBtnMobile = document.getElementById('lang-toggle-mobile');
    if (langBtnMobile) {
        langBtnMobile.addEventListener('click', (e) => {
            e.preventDefault();
            const newLang = currentLang === 'id' ? 'en' : 'id';
            setLanguage(newLang);
        });
    }
});