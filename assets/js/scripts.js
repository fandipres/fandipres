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

    const icons = {
        teaching: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>`,
        research: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>`,
        community_service: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`,
        publications: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`,
        books: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`,
        talks: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>`,
        thesis: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`,
        tutoring: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
        ipr: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>`,
    };

    for (const key in activities) {
        const activity = activities[key];
        const icon = icons[key] || icons.teaching;

        html += `
        <a href="${activity.link}" class="group block p-6 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:border-blue-500 transition-all duration-300">
            <div class="flex items-center gap-4 mb-3">
                <div class="flex-shrink-0 p-2 bg-blue-900/30 rounded-lg text-blue-400 group-hover:text-white group-hover:bg-blue-600 transition-colors">
                    ${icon}
                </div>
                <h3 class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                    ${getVal(activity.title)}
                </h3>
            </div>
            
            <p class="text-gray-400 text-sm leading-relaxed">${getVal(activity.description)}</p>
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

function copyNidn(btn, text) {
    navigator.clipboard.writeText(text).then(() => {

        const iconCopy = btn.querySelector('#nidn-icon');
        const iconCheck = btn.querySelector('#nidn-check');

        if (iconCopy && iconCheck) {
            iconCopy.classList.add('hidden');
            iconCheck.classList.remove('hidden');

            btn.classList.add('border-green-500/50');

            setTimeout(() => {
                iconCopy.classList.remove('hidden');
                iconCheck.classList.add('hidden');
                btn.classList.remove('border-green-500/50');
            }, 2000);
        }
    }).catch(err => {
        console.error('Gagal menyalin:', err);
    });
}

const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.remove('translate-y-20', 'opacity-0');
    } else {
        backToTopBtn.classList.add('translate-y-20', 'opacity-0');
    }
});