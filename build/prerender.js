const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cheerio = require('cheerio');
const { loadSandbox, ROOT } = require('./lib/load-data');
const { PAGE_META } = require('./page-meta');

const SITE_URL = 'https://fandipres.my.id';
const BUILD_DATE = new Date().toISOString().slice(0, 10);
const LASTMOD_FILE = path.join(__dirname, 'lastmod.json');
const LANGS = ['id', 'en'];
const OG_LOCALE = { id: 'id_ID', en: 'en_US' };
const OG_IMAGE_SIZE = { width: 1200, height: 630 };

// All data files + render-core live in one vm context (see build/lib/load-data.js).
const { sandbox: S, setLang } = loadSandbox();

// --- 1. Page manifest. `key` is the i18n/meta key; `fills` are evaluated per language.
const footerFill = () => ({ selector: '#social-links-footer', html: S.buildSocialLinksHtml(S.socialMedia) });

function detailPage(slug, key, containerId, dataName, extraFills = () => []) {
    return {
        file: `${slug}/index.html`,
        slug,
        key,
        fills: () => [
            { selector: `#${containerId}`, html: S.buildDetailItemsHtml(containerId, S[dataName]) },
            ...extraFills(),
            footerFill()
        ]
    };
}

function listPage(slug, key, containerId, dataName) {
    return {
        file: `${slug}/index.html`,
        slug,
        key,
        fills: () => [
            { selector: `#${containerId}`, html: S.buildItemsHtml(containerId, S[dataName]) },
            footerFill()
        ]
    };
}

const PAGES = [
    {
        file: 'index.html',
        slug: '',
        key: 'home',
        fills: () => {
            const featuredProjects = [...S.projects].sort((a, b) => (a.id || 999) - (b.id || 999));
            return [
                { selector: '#pekerjaan-terbaru', html: S.buildItemsHtml('pekerjaan-terbaru', S.experience, 2) },
                { selector: '#pendidikan-terbaru', html: S.buildItemsHtml('pendidikan-terbaru', S.education, 2) },
                { selector: '#aktivitas-akademik-container', html: S.buildAcademicHtml(S.academic) },
                { selector: '#proyek-terbaru', html: S.buildProjectsHtml(featuredProjects, 4) },
                footerFill()
            ];
        }
    },
    listPage('experience', 'experience', 'experience-list', 'experience'),
    listPage('education', 'education', 'education-list', 'education'),
    detailPage('teaching', 'teaching', 'pengajaran-lengkap', 'teaching'),
    detailPage('research', 'research', 'research-list', 'research'),
    detailPage('community-service', 'communityService', 'community-list', 'communityService'),
    detailPage('publications', 'publications', 'publication-list', 'publications'),
    detailPage('books', 'books', 'book-list', 'books'),
    {
        file: 'intellectual-property/index.html',
        slug: 'intellectual-property',
        key: 'ipr',
        fills: () => [
            { selector: '#haki-filters', html: S.buildHakiFiltersHtml(S.ipr, 'all') },
            {
                selector: '#haki-table-body',
                html: S.buildHakiTableHtml(S.sortIprData(S.ipr, { column: 'year', direction: 'desc' }))
            },
            footerFill()
        ]
    },
    detailPage('talks', 'talks', 'talk-list', 'talks'),
    {
        file: 'projects/index.html',
        slug: 'projects',
        key: 'projects',
        fills: () => [
            { selector: '#project-filters', html: S.buildProjectFiltersHtml('projects-list', S.projects, 'All') },
            { selector: '#projects-list', html: S.buildProjectsHtml(S.projects) },
            footerFill()
        ]
    },
    detailPage('thesis', 'thesis', 'thesis-list', 'thesis'),
    detailPage('competition', 'competition', 'competition-list', 'competition'),
    {
        file: 'cv/index.html',
        slug: 'cv',
        key: 'cv',
        fills: () => [{ selector: '#cv-content', html: S.buildCvHtml() }]
    }
];

// Not indexed, Indonesian only. Still gets the shared head/asset normalisation.
const NOINDEX_PAGES = [
    { file: '404.html', slug: '', key: null, noindex: true, fills: () => [footerFill()] }
];

// --- 2. URL helpers.
const pageUrl = (page, lang) => {
    const prefix = lang === 'en' ? '/en' : '';
    const tail = page.slug ? `/${page.slug}/` : '/';
    return `${SITE_URL}${prefix}${tail}`;
};
const ogImageUrl = (page, lang) => `${SITE_URL}/assets/img/og/${page.slug || 'home'}-${lang}.jpg`;
const outputFile = (page, lang) => (lang === 'id' ? page.file : path.posix.join('en', page.file));

// --- 3. Shared head normalisation: local assets, compiled Tailwind, self-hosted fonts and icons.
const ACADEMIC_PROFILE_LINKS = [
    'https://orcid.org/0009-0005-5437-6622',
    'https://www.researchgate.net/profile/Fandi-Simamora',
    'https://scholar.google.com/citations?user=TwIuVJYAAAAJ',
    'https://sinta.kemdiktisaintek.go.id/authors/profile/6857557'
];

const LOCAL_ICONS = [
    ['orcid.org/assets/vectors/orcid.logo.icon.svg', '/assets/img/icons/orcid.svg'],
    ['ResearchGate_icon_SVG', '/assets/img/icons/researchgate.svg'],
    ['Google_Scholar_logo', '/assets/img/icons/google-scholar.svg'],
    ['brand_sinta.png', '/assets/img/icons/sinta.png']
];

const toAbsoluteAsset = (url) => url.replace(/^(\.\.\/)+assets\//, '/assets/').replace(/^assets\//, '/assets/');

function normalizeHead($) {
    const localStyles = [];
    $('link[rel="stylesheet"]').each((_, el) => {
        const href = $(el).attr('href') || '';
        if (!/^https?:\/\//.test(href)) localStyles.push(toAbsoluteAsset(href));
    });

    $([
        'link[rel="stylesheet"]',
        'link[rel="preload"]',
        'link[rel="preconnect"]',
        'link[href*="fonts.googleapis.com"]',
        'script[src*="cdn.tailwindcss.com"]'
    ].join(',')).remove();

    const styles = ['/assets/css/tailwind.css', '/assets/css/fonts.css', ...localStyles.filter(
        href => href !== '/assets/css/tailwind.css' && href !== '/assets/css/fonts.css'
    )];

    const head = [
        '<link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>',
        '<link rel="preload" href="/assets/fonts/plus-jakarta-sans-latin.woff2" as="font" type="font/woff2" crossorigin>',
        ...styles.map(href => `<link rel="stylesheet" href="${href}">`)
    ];
    $('head').append(head.join('\n'));

    $('script[src]').each((_, el) => {
        $(el).attr('src', toAbsoluteAsset($(el).attr('src')));
    });

    $('img[src]').each((_, el) => {
        const src = $(el).attr('src');
        const match = LOCAL_ICONS.find(([needle]) => src.includes(needle));
        if (match) {
            $(el).attr('src', match[1]);
            $(el).attr('width', '14');
            $(el).attr('height', '14');
        }
    });

    // The profile photo is the first thing on every page: never lazy-load it, reserve its space, load it first.
    $('img[src="/assets/img/profile.jpg"]').each((_, el) => {
        const cls = $(el).attr('class') || '';
        const size = cls.includes('w-36') ? 144 : (cls.includes('w-24') ? 96 : null);
        $(el).removeAttr('loading');
        if (size) {
            $(el).attr('width', String(size));
            $(el).attr('height', String(size));
        }
        if (cls.includes('w-36')) $(el).attr('fetchpriority', 'high');
    });
}

const SEO_SELECTORS = [
    'meta[name="description"]',
    'meta[name="keywords"]',
    'meta[name="theme-color"]',
    'meta[property^="og:"]',
    'meta[name^="twitter:"]',
    'link[rel="canonical"]',
    'link[rel="alternate"]',
    'link[rel="icon"]',
    'link[rel="shortcut icon"]',
    'link[rel="apple-touch-icon"]',
    'script[type="application/ld+json"]'
].join(',');

const escapeAttr = (text) => String(text).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const jsonLd = (id, data) => `<script type="application/ld+json" id="${id}">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

function buildSchemas(page, lang) {
    const url = pageUrl(page, lang);
    const schemas = [];
    const organization = { '@type': 'CollegeOrUniversity', name: 'Universitas Mikroskil', url: 'https://www.mikroskil.ac.id' };

    if (page.key === 'home') {
        schemas.push(jsonLd('person-schema', {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Fandi Presly Simamora',
            url,
            image: `${SITE_URL}/assets/img/profile.jpg`,
            jobTitle: S.t('sections.position'),
            worksFor: organization,
            sameAs: [...ACADEMIC_PROFILE_LINKS, ...S.socialMedia.map(s => s.url)]
        }));
        schemas.push(jsonLd('website-schema', {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Fandi Presly Simamora',
            url,
            inLanguage: lang
        }));
        return schemas;
    }

    schemas.push(jsonLd('breadcrumb-schema', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: lang === 'en' ? 'Home' : 'Beranda', item: pageUrl({ slug: '' }, lang) },
            { '@type': 'ListItem', position: 2, name: S.t(`navbar.${page.key}`), item: url }
        ]
    }));

    if (page.key === 'publications') {
        schemas.push(jsonLd('publications-schema', {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: S.publications.map((pub, index) => {
                const assets = pub.assets || {};
                const article = {
                    '@type': 'ScholarlyArticle',
                    name: pub.title.id,
                    datePublished: pub.year,
                    author: (pub.team || []).map(name => ({ '@type': 'Person', name })),
                    isPartOf: { '@type': 'Periodical', name: pub.subtitle.id },
                    url: assets.article || `${url}#${pub.id}`
                };
                if (assets.doi) {
                    article.sameAs = assets.doi;
                    article.identifier = assets.doi.replace(/^https?:\/\/doi\.org\//, '');
                }
                return { '@type': 'ListItem', position: index + 1, item: article };
            })
        }));
    }

    if (page.key === 'teaching') {
        const seen = new Set();
        const courses = [];
        S.teaching.forEach(item => {
            if (seen.has(item.title.id)) return;
            seen.add(item.title.id);
            courses.push({
                '@type': 'ListItem',
                position: courses.length + 1,
                item: {
                    '@type': 'Course',
                    name: S.getVal(item.title),
                    description: lang === 'en'
                        ? `${S.getVal(item.title)}, a course taught by Fandi Presly Simamora at Mikroskil University.`
                        : `Mata kuliah ${S.getVal(item.title)} yang diampu oleh Fandi Presly Simamora di Universitas Mikroskil.`,
                    provider: organization
                }
            });
        });
        schemas.push(jsonLd('courses-schema', {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: courses
        }));
    }

    return schemas;
}

function applySeoHead($, page, lang) {
    $(SEO_SELECTORS).remove();

    const meta = PAGE_META[page.key];
    const title = S.t(`pageTitles.${page.key}`);
    const description = meta.description[lang];
    const keywords = meta.keywords[lang];
    const url = pageUrl(page, lang);
    const image = ogImageUrl(page, lang);

    $('title').text(title);

    const tags = [
        `<meta name="description" content="${escapeAttr(description)}">`,
        `<meta name="keywords" content="${escapeAttr(keywords)}">`,
        '<meta property="og:type" content="website">',
        `<meta property="og:title" content="${escapeAttr(title)}">`,
        `<meta property="og:description" content="${escapeAttr(description)}">`,
        `<meta property="og:image" content="${image}">`,
        `<meta property="og:image:width" content="${OG_IMAGE_SIZE.width}">`,
        `<meta property="og:image:height" content="${OG_IMAGE_SIZE.height}">`,
        `<meta property="og:image:alt" content="${escapeAttr(title)}">`,
        `<meta property="og:url" content="${url}">`,
        '<meta property="og:site_name" content="Fandi Presly Simamora">',
        `<meta property="og:locale" content="${OG_LOCALE[lang]}">`,
        `<meta property="og:locale:alternate" content="${OG_LOCALE[lang === 'id' ? 'en' : 'id']}">`,
        '<meta name="twitter:card" content="summary_large_image">',
        `<meta name="twitter:title" content="${escapeAttr(title)}">`,
        `<meta name="twitter:description" content="${escapeAttr(description)}">`,
        `<meta name="twitter:image" content="${image}">`,
        `<meta name="twitter:image:alt" content="${escapeAttr(title)}">`,
        '<meta name="theme-color" content="#000000">',
        `<link rel="canonical" href="${url}">`,
        `<link rel="alternate" hreflang="id" href="${pageUrl(page, 'id')}">`,
        `<link rel="alternate" hreflang="en" href="${pageUrl(page, 'en')}">`,
        `<link rel="alternate" hreflang="x-default" href="${pageUrl(page, 'id')}">`
    ];
    $('head').append(tags.join('\n'));
    $('head').append(buildSchemas(page, lang).join('\n'));
}

function applyIcons($) {
    $('head').append([
        '<link rel="icon" href="/favicon.ico" sizes="48x48">',
        '<link rel="icon" href="/assets/img/favicon-32.png" type="image/png" sizes="32x32">',
        '<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">'
    ].join('\n'));
}

// --- 4. Render one page in one language.
function renderPage($, page, lang) {
    for (const fill of page.fills()) {
        $(fill.selector).html(fill.html);
    }

    $('html').attr('lang', lang);

    // Same result as the browser's updateStaticPageElements(), so there is no flash of Indonesian on /en/.
    $('[data-i18n]').each((_, el) => {
        $(el).text(S.t($(el).attr('data-i18n')));
    });
    $('#lang-text').text(lang === 'id' ? 'EN' : 'ID');
    $('#lang-toggle-mobile').text(lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia');

    $('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]').remove();
    normalizeHead($);
    if (!page.noindex) applySeoHead($, page, lang);
    applyIcons($);

    if (lang === 'en') {
        $('a[href]').each((_, el) => {
            const href = $(el).attr('href');
            const localized = S.localizeHref(href, 'en');
            if (localized !== href) $(el).attr('href', localized);
        });
        $('a[href="https://fandipres.my.id/"]').attr('href', '/en/');
    }
}

// --- 5. Run: write pages, track per-page lastmod, regenerate sitemap.
const lastmodManifest = fs.existsSync(LASTMOD_FILE) ? JSON.parse(fs.readFileSync(LASTMOD_FILE, 'utf8')) : {};
const nextManifest = {};
const sitemapEntries = [];

function writeIfChanged(relPath, content) {
    const full = path.join(ROOT, relPath);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    if (fs.existsSync(full) && fs.readFileSync(full, 'utf8') === content) return;
    fs.writeFileSync(full, content);
}

function processPage(page) {
    const source = fs.readFileSync(path.join(ROOT, page.file), 'utf8');
    const langs = page.noindex ? ['id'] : LANGS;

    for (const lang of langs) {
        setLang(lang);
        const $ = cheerio.load(source);
        renderPage($, page, lang);
        // Removing/re-adding head tags leaves runs of blank lines behind; collapse them.
        const html = $.html().replace(/(\n[ \t]*){3,}/g, '\n\n');
        const file = outputFile(page, lang);
        writeIfChanged(file, html);

        if (page.noindex) continue;
        // lastmod only moves when the generated page actually changed.
        const hash = crypto.createHash('sha256').update(html).digest('hex');
        const previous = lastmodManifest[file];
        nextManifest[file] = {
            hash,
            lastmod: previous && previous.hash === hash ? previous.lastmod : BUILD_DATE
        };
        sitemapEntries.push({ page, lang, lastmod: nextManifest[file].lastmod });
    }
    setLang('id');
}

for (const page of PAGES) processPage(page);
for (const page of NOINDEX_PAGES) processPage(page);

function buildSitemap() {
    const urls = sitemapEntries.map(({ page, lang, lastmod }) => `
    <url>
        <loc>${pageUrl(page, lang)}</loc>
        <lastmod>${lastmod}</lastmod>
        <xhtml:link rel="alternate" hreflang="id" href="${pageUrl(page, 'id')}"/>
        <xhtml:link rel="alternate" hreflang="en" href="${pageUrl(page, 'en')}"/>
        <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(page, 'id')}"/>
    </url>`).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}
</urlset>
`;
    writeIfChanged('sitemap.xml', xml);
}

buildSitemap();
fs.writeFileSync(LASTMOD_FILE, JSON.stringify(nextManifest, null, 2) + '\n');

console.log(`Prerender complete: ${PAGES.length} pages x ${LANGS.length} languages + ${NOINDEX_PAGES.length} noindex page(s), sitemap.xml regenerated.`);
