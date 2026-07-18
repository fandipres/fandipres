function buildItemsHtml(containerId, data, limit) {
    const itemsToRender = limit ? data.slice(0, limit) : data;
    let html = '';

    itemsToRender.forEach(item => {
        const subtitle = getVal(item.subtitle);
        const subtitleHtml = subtitle
            ? `<p class="mt-1 text-base text-blue-300 font-medium tracking-wide">${subtitle}</p>`
            : '';

        const educationContainers = new Set(['education-list', 'pendidikan-terbaru']);
        const isEducation = educationContainers.has(containerId);
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

    return `<div class="space-y-8">${html}</div>`;
}

function buildDetailItemsHtml(containerId, data) {
    const groupedMap = new Map();
    data.forEach(item => {
        const key = getVal(item.year);
        if (!groupedMap.has(key)) {
            groupedMap.set(key, []);
        }
        groupedMap.get(key).push(item);
    });

    // Order "genap" (even semester) before "ganjil" (odd semester) within a
    // group when items carry a `semester` field (teaching.js only). Stable
    // sort keeps everyone else's original insertion order untouched.
    const semesterOrder = { genap: 0, ganjil: 1 };
    groupedMap.forEach(itemsInGroup => {
        itemsInGroup.sort((a, b) => {
            const orderA = a.semester ? (semesterOrder[a.semester] ?? 2) : 2;
            const orderB = b.semester ? (semesterOrder[b.semester] ?? 2) : 2;
            return orderA - orderB;
        });
    });

    let html = '';

    groupedMap.forEach((itemsInGroup, year) => {
        const itemsHtml = itemsInGroup.map(item => {
            const titleHtml = `<h3 class="text-xl font-semibold text-white">${getVal(item.title)}</h3>`;

            const badgeText = item.rank ? getVal(item.rank) : (item.achievement ? getVal(item.achievement) : '');
            const subtitleHtml = badgeText
                ? `<p class="mt-1 text-base text-blue-300 font-medium tracking-wide">${getVal(item.subtitle) || ''} • <span class="text-green-400">${badgeText}</span></p>`
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
    return html;
}

function buildAcademicHtml(activities) {
    let html = '';

    const icons = {
        teaching: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path></svg>`,
        research: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>`,
        communityService: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`,
        publications: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`,
        books: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`,
        talks: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>`,
        thesis: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`,
        competition: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a5 5 0 006 0m-9-4H4a2 2 0 01-2-2V8a2 2 0 012-2h2m12 7h2a2 2 0 002-2V8a2 2 0 00-2-2h-2m-10 0V4a1 1 0 011-1h6a1 1 0 011 1v2m-8 0h8m-8 0v5a4 4 0 004 4 4 4 0 004-4V5"></path></svg>`,
        tutoring: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
        ipr: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>`,
    };

    for (const key in activities) {
        const activity = activities[key];

        let titleText = key;
        if (typeof t === 'function') {
            titleText = t(`navbar.${key}`);
        } else if (activity.title) {
            titleText = getVal(activity.title);
        }

        const icon = icons[key] || icons.teaching;

        html += `
        <a href="${activity.link}" class="group block p-6 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 hover:border-blue-500 transition-all duration-300">
            <div class="flex items-center gap-4 mb-3">
                <div class="flex-shrink-0 p-2 bg-blue-900/30 rounded-lg text-blue-400 group-hover:text-white group-hover:bg-blue-600 transition-colors">
                    ${icon}
                </div>
                <h3 class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                    ${titleText}</h3>
            </div>

            <p class="text-gray-400 text-sm leading-relaxed">${getVal(activity.description)}</p>
        </a>`;
    }
    return html;
}

function buildTutoringHtml(data) {
    const groupedMap = new Map();
    data.forEach(item => {
        const key = item.year;
        if (!groupedMap.has(key)) {
            groupedMap.set(key, []);
        }
        groupedMap.get(key).push(item);
    });

    let html = '';

    groupedMap.forEach((itemsInGroup, year) => {
        const itemsHtml = itemsInGroup.map(item => {
            let topicsHtml = '';
            if (item.topics && Array.isArray(item.topics) && item.topics.length > 0) {
                const rows = item.topics.map(topic => `
                    <li class="flex items-start gap-2.5 py-1.5">
                        <svg class="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span class="text-sm text-gray-300">${getVal(topic)}</span>
                    </li>
                `).join('');
                topicsHtml = `
                    <p class="mt-3 text-xs font-semibold uppercase tracking-wider text-gray-500">${t('tutoring.topicsLabel')}</p>
                    <ul class="mt-1">${rows}</ul>`;
            }

            return `<div class="mb-10 last:mb-0"><h3 class="text-xl font-semibold text-white">${item.student}</h3>${topicsHtml}</div>`;
        }).join('');

        html += `
        <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 group">
            <div class="flex-shrink-0 sm:w-48 text-gray-500 font-medium text-sm pt-1 sticky top-24 self-start uppercase tracking-wider">${year}</div>
            <div class="border-l-4 border-gray-800 pl-4 sm:pl-8 flex-grow transition-colors duration-300 group-hover:border-gray-700">
                ${itemsHtml}
            </div>
        </div>`;
    });
    return html;
}

function buildSocialLinksHtml(data) {
    let html = '';
    data.forEach(link => {
        html += `<a href="${link.url}" target="_blank" title="${link.name}" class="text-gray-400 hover:text-white transition-transform duration-300 transform hover:scale-110">${link.icon}</a>`;
    });
    return html;
}

function buildProjectsHtml(data, limit) {
    const itemsToRender = limit ? data.slice(0, limit) : data;

    if (itemsToRender.length === 0) {
        const emptyMsg = (typeof currentLang !== 'undefined' && currentLang === 'id')
            ? 'Tidak ada proyek untuk kategori ini.'
            : 'No projects found for this category.';
        return `<p class="col-span-full text-center text-gray-500 italic py-10">${emptyMsg}</p>`;
    }

    const TYPE_META = {
        web: {
            badge: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
            grad: 'from-blue-950 to-black',
            icon: `<svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke-width="1.8"/><path stroke-width="1.6" d="M3 12h18M12 3c2.4 2.6 3.6 5.7 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-5.7-3.6-9s1.2-6.4 3.6-9z"/></svg>`,
            thumb: `
                <svg class="absolute inset-0 w-full h-full" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="46" y="34" width="228" height="132" rx="8" fill="#0b1b32" stroke="#2c4d80" stroke-width="1.5"/>
                    <rect x="46" y="34" width="228" height="24" rx="8" fill="#12294a"/>
                    <circle cx="60" cy="46" r="3" fill="#4f8dff" opacity="0.55"/>
                    <circle cx="71" cy="46" r="3" fill="#4f8dff" opacity="0.4"/>
                    <circle cx="82" cy="46" r="3" fill="#4f8dff" opacity="0.25"/>
                    <rect x="62" y="76" width="140" height="10" rx="3" fill="#3b6cb8" opacity="0.75"/>
                    <rect x="62" y="94" width="188" height="7" rx="3" fill="#1f3a63"/>
                    <rect x="62" y="108" width="168" height="7" rx="3" fill="#1f3a63"/>
                    <rect x="62" y="130" width="66" height="22" rx="6" fill="#4f8dff" opacity="0.85"/>
                </svg>`
        },
        android: {
            badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
            grad: 'from-emerald-950 to-black',
            icon: `<svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2" stroke-width="1.8"/><path stroke-width="1.6" stroke-linecap="round" d="M10 19h4"/></svg>`,
            thumb: `
                <svg class="absolute inset-0 w-full h-full" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="128" y="26" width="64" height="148" rx="12" fill="#0b2419" stroke="#2f8f63" stroke-width="1.5"/>
                    <rect x="136" y="42" width="48" height="84" rx="4" fill="#123527"/>
                    <circle cx="160" cy="138" r="7" fill="#2fbf85" opacity="0.55"/>
                    <rect x="144" y="55" width="20" height="20" rx="5" fill="#2fbf85" opacity="0.8"/>
                    <rect x="168" y="55" width="10" height="10" rx="3" fill="#2fbf85" opacity="0.4"/>
                    <rect x="144" y="80" width="10" height="10" rx="3" fill="#2fbf85" opacity="0.4"/>
                    <rect x="158" y="80" width="20" height="10" rx="3" fill="#2fbf85" opacity="0.55"/>
                </svg>`
        },
        video: {
            badge: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
            grad: 'from-rose-950 to-black',
            icon: `<svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 7.4v9.2a.7.7 0 001.07.6l7.2-4.6a.7.7 0 000-1.2l-7.2-4.6A.7.7 0 009 7.4z"/></svg>`,
            thumb: `
                <svg class="absolute inset-0 w-full h-full" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="160" cy="100" r="36" fill="#ef5da8" opacity="0.12"/>
                    <circle cx="160" cy="100" r="25" fill="#ef5da8" opacity="0.85"/>
                    <path d="M152 87l22 13-22 13z" fill="#170a11"/>
                    <rect x="40" y="168" width="28" height="4" rx="2" fill="#ef5da8" opacity="0.4"/>
                    <rect x="74" y="168" width="48" height="4" rx="2" fill="#ef5da8" opacity="0.22"/>
                </svg>`
        },
        blog: {
            badge: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
            grad: 'from-amber-950 to-black',
            icon: `<svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-width="1.6" d="M5 3.5h10l4 4v13a.5.5 0 01-.5.5h-13a.5.5 0 01-.5-.5v-17z"/><path stroke-width="1.3" stroke-linecap="round" d="M8 10h8M8 14h8"/></svg>`,
            thumb: `
                <svg class="absolute inset-0 w-full h-full" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="94" y="32" width="132" height="136" rx="6" fill="#241a0a" stroke="#8a6224" stroke-width="1.5"/>
                    <rect x="110" y="52" width="76" height="10" rx="3" fill="#e8a13d" opacity="0.8"/>
                    <rect x="110" y="72" width="100" height="6" rx="2" fill="#8a6224"/>
                    <rect x="110" y="86" width="100" height="6" rx="2" fill="#8a6224"/>
                    <rect x="110" y="100" width="64" height="6" rx="2" fill="#8a6224"/>
                    <rect x="110" y="124" width="30" height="18" rx="4" fill="#e8a13d" opacity="0.3"/>
                </svg>`
        }
    };

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

        const tags = Array.isArray(item.tags) ? item.tags : [];
        const primaryKey = tags.length > 0 ? tags[0].toLowerCase() : '';
        const primary = TYPE_META[primaryKey] ? primaryKey : null;
        const secondaryTags = primary ? tags.slice(1) : [];

        const thumbHtml = primary ? `
            <div class="relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${TYPE_META[primary].grad}">
                ${TYPE_META[primary].thumb}
                <span class="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border ${TYPE_META[primary].badge}">
                    ${TYPE_META[primary].icon}${tags[0]}
                </span>
            </div>` : '';

        const secondaryHtml = secondaryTags.length > 0
            ? `<div class="flex flex-wrap gap-1.5 mt-2">${secondaryTags.map(t => `<span class="text-[9px] uppercase tracking-wide font-semibold text-gray-500 border border-gray-700 rounded px-1.5 py-0.5">${t}</span>`).join('')}</div>`
            : '';

        html += `
        <div class="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg text-left h-full flex flex-col overflow-hidden hover:border-gray-500 hover:shadow-2xl hover:shadow-black/40 transition-all duration-300 group">
            ${thumbHtml}
            <div class="p-6 flex flex-col flex-grow">
                <h3 class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                    ${getVal(item.title)}
                </h3>

                <p class="text-gray-400 text-sm leading-relaxed flex-grow mt-3${primary ? '' : ' border-t border-gray-700/50 pt-4'}">
                    ${getVal(item.description)}
                </p>

                ${secondaryHtml}

                <div class="mt-6">
                    ${linksHtml}
                </div>
            </div>
        </div>`;
    });
    return html;
}

function buildProjectFiltersHtml(listContainerId, allProjects, activeFilter) {
    const tags = new Set();
    allProjects.forEach(p => {
        if (p.tags) p.tags.forEach(tag => tags.add(tag));
    });

    const uniqueTags = ['All', ...Array.from(tags).sort()];

    return uniqueTags.map(tag => {
        let label = tag;
        if (tag === 'All') {
            label = (typeof t === 'function') ? t('buttons.filterAll') : 'Semua';
        }

        const activeClass = (tag === activeFilter)
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

function filterIprData(data, activeFilter, searchTerm) {
    let results = [...data];

    if (activeFilter !== 'all') {
        results = results.filter(item => item.category === activeFilter);
    }

    if (searchTerm && searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        results = results.filter(item => {
            const title = getVal(item.title).toLowerCase();
            const desc = getVal(item.description).toLowerCase();
            const number = item.number.toLowerCase();
            const typeVal = getVal(item.type).toLowerCase();
            return title.includes(term) || desc.includes(term) || number.includes(term) || typeVal.includes(term);
        });
    }

    return results;
}

function sortIprData(data, sortState) {
    const results = [...data];
    results.sort((a, b) => {
        let valA, valB;
        if (sortState.column === 'year') {
            valA = parseInt(a.year);
            valB = parseInt(b.year);
        } else if (sortState.column === 'title') {
            valA = getVal(a.title).toLowerCase();
            valB = getVal(b.title).toLowerCase();
        }
        if (valA < valB) return sortState.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortState.direction === 'asc' ? 1 : -1;
        return 0;
    });
    return results;
}

function buildHakiFiltersHtml(data, activeFilter) {
    const categories = new Set(['all']);
    data.forEach(item => { if (item.category) categories.add(item.category); });

    return Array.from(categories).map(cat => {
        let label = cat;
        if (typeof t === 'function') {
            const transKey = `ipr.filters.${cat}`;
            const translated = t(transKey);
            label = (translated && translated !== transKey) ? translated : cat;
        }

        const activeClass = (cat === activeFilter)
            ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-900/50"
            : "bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-500 hover:text-white";

        return `<button onclick="handleHakiFilter('${cat}')" class="px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${activeClass} uppercase tracking-wider">${label}</button>`;
    }).join('');
}

function buildHakiTableHtml(data) {
    if (data.length === 0) {
        const emptyMsg = (typeof currentLang !== 'undefined' && currentLang === 'id')
            ? 'Tidak ada data ditemukan.'
            : 'No records found.';

        return `
            <tr class="block md:table-row bg-gray-800/50 rounded-xl p-4 md:p-0 border border-gray-700 md:border-0">
                <td colspan="5" class="p-8 text-center text-gray-500 italic block md:table-cell">
                    ${emptyMsg}
                </td>
            </tr>`;
    }

    const labels = {
        year: (typeof t === 'function') ? t('ipr.table.year') : 'Tahun',
        title: (typeof t === 'function') ? t('ipr.table.title') : 'Ciptaan',
        type: (typeof t === 'function') ? t('ipr.table.category') : 'Jenis',
        num: (typeof t === 'function') ? t('ipr.table.regNumber') : 'Nomor',
        iss: (typeof t === 'function') ? t('ipr.table.issuer') : 'Penerbit'
    };

    return data.map(item => {
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
}
