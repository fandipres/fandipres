// Data lint: catches typos and inconsistencies in assets/js/data/** before they reach the site.
// Errors fail the build (exit 1). Warnings are informational.
const { loadSandbox } = require('./lib/load-data');
const { PAGE_META } = require('./page-meta');

const { sandbox: S } = loadSandbox();

const DATASETS = {
    publications: S.publications,
    research: S.research,
    communityService: S.communityService,
    teaching: S.teaching,
    thesis: S.thesis,
    competition: S.competition,
    talks: S.talks,
    books: S.books,
    education: S.education,
    experience: S.experience,
    projects: S.projects
};

const errors = [];
const warnings = [];
const EM_DASH = '\u2014';

const isBilingual = (v) => v && typeof v === 'object' && !Array.isArray(v)
    && typeof v.id === 'string' && typeof v.en === 'string'
    && Object.keys(v).every(k => k === 'id' || k === 'en');

function checkText(where, value, lang) {
    if (value !== value.trim()) errors.push(`${where} [${lang}]: leading/trailing whitespace "${value}"`);
    if (/\s{2,}/.test(value)) errors.push(`${where} [${lang}]: repeated spaces "${value}"`);
    if (value.includes(EM_DASH)) errors.push(`${where} [${lang}]: em dash is not allowed "${value}"`);
    if (lang === 'en' && /\b1 Classes\b/.test(value)) errors.push(`${where} [en]: use "1 Class" not "1 Classes" "${value}"`);
}

function walk(where, node, onBilingual) {
    if (isBilingual(node)) return onBilingual(where, node);
    if (Array.isArray(node)) return node.forEach((child, i) => walk(`${where}[${i}]`, child, onBilingual));
    if (node && typeof node === 'object') {
        for (const [key, child] of Object.entries(node)) walk(`${where}.${key}`, child, onBilingual);
    }
}

// 1. Bilingual strings: whitespace, em dash, grammar; missing translations are warnings.
const missingEn = {};
for (const [name, data] of Object.entries(DATASETS)) {
    walk(name, data, (where, value) => {
        checkText(where, value.id, 'id');
        if (value.en) checkText(where, value.en, 'en');
        const isTitle = /\.title$/.test(where) || /\.category$/.test(where) || /\.description(\.short|\.long)?$/.test(where);
        // Titles of English-language papers legitimately have no separate English text.
        const looksIndonesian = /\b(dan|yang|untuk|dengan|pada|dalam|dari|terhadap|melalui|berbasis|menggunakan)\b/i.test(value.id);
        if (isTitle && value.id && !value.en && (!/\.title$/.test(where) || looksIndonesian)) (missingEn[name] = missingEn[name] || []).push(where);
    });
}

// 2. Publication ids (used for citations and deep links) must exist and be unique.
const publicationIds = new Set();
S.publications.forEach((item, i) => {
    if (!item.id) return warnings.push(`publications[${i}]: no id (cannot be cited)`);
    if (publicationIds.has(item.id)) errors.push(`publications[${i}]: duplicate id "${item.id}"`);
    publicationIds.add(item.id);
});

// 3. Field formats.
const SEMESTERS = new Set(['ganjil', 'genap']);
S.teaching.forEach((item, i) => {
    if (!SEMESTERS.has(item.semester)) errors.push(`teaching[${i}]: semester must be ganjil or genap`);
    if (!/^\d{4} - \d{4}$/.test(item.year)) errors.push(`teaching[${i}]: year must look like "2025 - 2026"`);
    // The home page sums these "(N Kelas)" notes into the class count, so every entry needs at least one.
    if (!/\(\d+ Kelas\)/.test((item.classes || []).map(c => c.id).join(', '))) {
        errors.push(`teaching[${i}]: classes must contain "(N Kelas)", e.g. "Teknik Informatika (2 Kelas)"`);
    }
});
for (const name of ['publications', 'research', 'communityService', 'thesis', 'competition', 'talks', 'books']) {
    DATASETS[name].forEach((item, i) => {
        if (!/^\d{4}$/.test(String(item.year))) warnings.push(`${name}[${i}]: unusual year "${item.year}"`);
        for (const [key, url] of Object.entries(item.assets || {})) {
            if (url && !/^https:\/\//.test(url)) errors.push(`${name}[${i}].assets.${key}: URL must start with https://`);
        }
    });
}
S.publications.forEach((item, i) => {
    if (!item.rank || !item.rank.id) warnings.push(`publications[${i}]: no rank`);
    if (!item.assets || item.assets.article === undefined) warnings.push(`publications[${i}]: no assets.article`);
    if (item.assets && item.assets.doi && !/^https:\/\/doi\.org\/10\./.test(item.assets.doi)) {
        errors.push(`publications[${i}].assets.doi must be a https://doi.org/10.* URL`);
    }
});

// 4. Page meta copy.
for (const [key, meta] of Object.entries(PAGE_META)) {
    for (const lang of ['id', 'en']) {
        const d = meta.description[lang];
        if (d.includes(EM_DASH)) errors.push(`page-meta ${key}.${lang}: em dash in description`);
        if (d.length > 165) warnings.push(`page-meta ${key}.${lang}: description is ${d.length} chars (aim for 150-160)`);
    }
}

for (const [name, list] of Object.entries(missingEn)) {
    warnings.push(`${name}: ${list.length} field(s) have no English text yet (falls back to Indonesian)`);
}

warnings.forEach(w => console.log(`warn  ${w}`));
errors.forEach(e => console.error(`error ${e}`));
console.log(`\nLint finished: ${errors.length} error(s), ${warnings.length} warning(s).`);
process.exit(errors.length ? 1 : 0);
