const fs = require('fs');
const path = require('path');
const vm = require('vm');
const cheerio = require('cheerio');

const ROOT = path.join(__dirname, '..');
const SITE_URL = 'https://fandipres.my.id';
const BUILD_DATE = new Date().toISOString().slice(0, 10);

// --- 1. Load i18n + all data files + render-core into one shared vm context,
//     reproducing the same shared-global-scope semantics as sequential
//     <script> tags in the browser. Files are loaded verbatim, unmodified.
const sandbox = {};
vm.createContext(sandbox);

const SCRIPT_FILES = [
    'assets/js/data/i18n.js',
    'assets/js/data/academic.js',
    'assets/js/data/books.js',
    'assets/js/data/community_service.js',
    'assets/js/data/education.js',
    'assets/js/data/experience.js',
    'assets/js/data/ipr.js',
    'assets/js/data/profile.js',
    'assets/js/data/projects.js',
    'assets/js/data/publications.js',
    'assets/js/data/research.js',
    'assets/js/data/talks.js',
    'assets/js/data/teaching.js',
    'assets/js/data/thesis.js',
    'assets/js/data/tutoring.js',
    'assets/js/render-core.js'
];

for (const rel of SCRIPT_FILES) {
    const code = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    new vm.Script(code, { filename: rel }).runInContext(sandbox);
}

// Top-level `const`/`let` bindings in a vm context live in that context's
// lexical environment and are NOT exposed as own-properties of the sandbox
// object (unlike `var`/`function`, which are). Data files all use `const`,
// so copy their bindings onto the sandbox explicitly via a follow-up script
// run in the same context (where they're still lexically reachable).
new vm.Script(`
    this.currentLang = currentLang;
    this.siteTranslations = siteTranslations;
    this.academic = academic;
    this.books = books;
    this.communityService = communityService;
    this.education = education;
    this.experience = experience;
    this.ipr = ipr;
    this.socialMedia = socialMedia;
    this.projects = projects;
    this.publications = publications;
    this.research = research;
    this.talks = talks;
    this.teaching = teaching;
    this.thesis = thesis;
    this.privateTeaching = privateTeaching;
`).runInContext(sandbox);

sandbox.currentLang = 'id'; // defensive: always prerender the Indonesian default

const {
    experience, education, academic, projects, socialMedia,
    teaching, thesis, privateTeaching, research, communityService,
    publications, books, talks, ipr, siteTranslations,
    buildItemsHtml, buildDetailItemsHtml, buildAcademicHtml, buildSocialLinksHtml,
    buildProjectsHtml, buildProjectFiltersHtml, filterIprData, sortIprData,
    buildHakiFiltersHtml, buildHakiTableHtml
} = sandbox;

const featuredProjects = [...projects].sort((a, b) => (a.id || 999) - (b.id || 999));
const iprDefaultSorted = sortIprData(ipr, { column: 'year', direction: 'desc' });

// --- 2. Page manifest: file path, canonical URL, container fills, sitemap priority.
const PAGES = [
    {
        file: 'index.html',
        url: `${SITE_URL}/`,
        priority: '1.0',
        fills: [
            { selector: '#pekerjaan-terbaru', html: buildItemsHtml('pekerjaan-terbaru', experience, 2) },
            { selector: '#pendidikan-terbaru', html: buildItemsHtml('pendidikan-terbaru', education, 2) },
            { selector: '#aktivitas-akademik-container', html: buildAcademicHtml(academic) },
            { selector: '#proyek-terbaru', html: buildProjectsHtml(featuredProjects, 3) },
            { selector: '#social-links-footer', html: buildSocialLinksHtml(socialMedia) }
        ]
    },
    {
        file: 'experience/index.html',
        url: `${SITE_URL}/experience/`,
        priority: '0.8',
        fills: [
            { selector: '#experience-list', html: buildItemsHtml('experience-list', experience) },
            { selector: '#social-links-footer', html: buildSocialLinksHtml(socialMedia) }
        ]
    },
    {
        file: 'education/index.html',
        url: `${SITE_URL}/education/`,
        priority: '0.8',
        fills: [
            { selector: '#education-list', html: buildItemsHtml('education-list', education) },
            { selector: '#social-links-footer', html: buildSocialLinksHtml(socialMedia) }
        ]
    },
    {
        file: 'teaching/index.html',
        url: `${SITE_URL}/teaching/`,
        priority: '0.8',
        fills: [
            { selector: '#pengajaran-lengkap', html: buildDetailItemsHtml('pengajaran-lengkap', teaching) },
            { selector: '#social-links-footer', html: buildSocialLinksHtml(socialMedia) }
        ]
    },
    {
        file: 'research/index.html',
        url: `${SITE_URL}/research/`,
        priority: '0.8',
        fills: [
            { selector: '#research-list', html: buildDetailItemsHtml('research-list', research) },
            { selector: '#social-links-footer', html: buildSocialLinksHtml(socialMedia) }
        ]
    },
    {
        file: 'community_service/index.html',
        url: `${SITE_URL}/community_service/`,
        priority: '0.8',
        fills: [
            { selector: '#community-list', html: buildDetailItemsHtml('community-list', communityService) },
            { selector: '#social-links-footer', html: buildSocialLinksHtml(socialMedia) }
        ]
    },
    {
        file: 'publications/index.html',
        url: `${SITE_URL}/publications/`,
        priority: '0.8',
        fills: [
            { selector: '#publication-list', html: buildDetailItemsHtml('publication-list', publications) },
            { selector: '#social-links-footer', html: buildSocialLinksHtml(socialMedia) }
        ]
    },
    {
        file: 'books/index.html',
        url: `${SITE_URL}/books/`,
        priority: '0.8',
        fills: [
            { selector: '#book-list', html: buildDetailItemsHtml('book-list', books) },
            { selector: '#social-links-footer', html: buildSocialLinksHtml(socialMedia) }
        ]
    },
    {
        file: 'ipr/index.html',
        url: `${SITE_URL}/ipr/`,
        priority: '0.8',
        fills: [
            { selector: '#haki-filters', html: buildHakiFiltersHtml(ipr, 'all') },
            { selector: '#haki-table-body', html: buildHakiTableHtml(iprDefaultSorted) },
            { selector: '#social-links-footer', html: buildSocialLinksHtml(socialMedia) }
        ]
    },
    {
        file: 'talks/index.html',
        url: `${SITE_URL}/talks/`,
        priority: '0.8',
        fills: [
            { selector: '#talk-list', html: buildDetailItemsHtml('talk-list', talks) },
            { selector: '#social-links-footer', html: buildSocialLinksHtml(socialMedia) }
        ]
    },
    {
        file: 'projects/index.html',
        url: `${SITE_URL}/projects/`,
        priority: '0.8',
        fills: [
            { selector: '#project-filters', html: buildProjectFiltersHtml('projects-list', projects, 'All') },
            { selector: '#projects-list', html: buildProjectsHtml(projects) },
            { selector: '#social-links-footer', html: buildSocialLinksHtml(socialMedia) }
        ]
    },
    {
        file: 'thesis/index.html',
        url: `${SITE_URL}/thesis/`,
        priority: '0.8',
        fills: [
            { selector: '#thesis-list', html: buildDetailItemsHtml('thesis-list', thesis) },
            { selector: '#social-links-footer', html: buildSocialLinksHtml(socialMedia) }
        ]
    },
    {
        file: 'tutoring/index.html',
        url: `${SITE_URL}/tutoring/`,
        priority: '0.8',
        fills: [
            { selector: '#tutoring-list', html: buildDetailItemsHtml('tutoring-list', privateTeaching) },
            { selector: '#social-links-footer', html: buildSocialLinksHtml(socialMedia) }
        ]
    }
];

const NOINDEX_PAGES = [
    {
        file: '404.html',
        fills: [
            { selector: '#social-links-footer', html: buildSocialLinksHtml(socialMedia) }
        ]
    }
];

// Hardcoded academic-profile links from the header markup (not in any data file).
const ACADEMIC_PROFILE_LINKS = [
    'https://orcid.org/0009-0005-5437-6622',
    'https://www.researchgate.net/profile/Fandi-Simamora',
    'https://scholar.google.com/citations?user=TwIuVJYAAAAJ',
    'https://sinta.kemdiktisaintek.go.id/authors/profile/6857557'
];

// --- 3. Apply fills + canonical tag to each page.
function processPage(page) {
    const filePath = path.join(ROOT, page.file);
    const html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html);

    for (const fill of page.fills) {
        $(fill.selector).html(fill.html);
    }

    if (page.url) {
        $('link[rel="canonical"]').remove();
        $('head').append(`<link rel="canonical" href="${page.url}">`);
    }

    fs.writeFileSync(filePath, $.html());
}

for (const page of PAGES) processPage(page);
for (const page of NOINDEX_PAGES) processPage(page);

// --- 4. Homepage-only JSON-LD Person schema.
function injectPersonSchema() {
    const filePath = path.join(ROOT, 'index.html');
    const html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html);

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Fandi Presly Simamora',
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/assets/img/profile.jpg`,
        jobTitle: siteTranslations.sections.position.id,
        sameAs: [
            ...ACADEMIC_PROFILE_LINKS,
            ...socialMedia.map(s => s.url)
        ]
    };

    $('script#person-schema').remove();
    $('head').append(`<script type="application/ld+json" id="person-schema">${JSON.stringify(schema, null, 4)}</script>`);

    fs.writeFileSync(filePath, $.html());
}

injectPersonSchema();

// --- 5. Regenerate sitemap.xml from the same manifest.
function buildSitemap() {
    const urls = PAGES.map(page => `
    <url>
        <loc>${page.url}</loc>
        <lastmod>${BUILD_DATE}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${page.priority}</priority>
    </url>`).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>
`;

    fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml);
}

buildSitemap();

console.log(`Prerender complete: ${PAGES.length} pages + ${NOINDEX_PAGES.length} noindex page(s), sitemap.xml regenerated.`);
