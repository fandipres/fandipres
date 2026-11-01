// One-off asset generator: favicons + 1200x630 Open Graph images per page and language.
// Run with `npm run generate-assets` after changing page titles or the profile photo.
// The outputs under assets/img and favicon.ico are committed; CI does not run this.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { loadSandbox, ROOT } = require('./lib/load-data');

const { sandbox: S, setLang } = loadSandbox();
const PROFILE = path.join(ROOT, 'assets/img/profile.jpg');
const OG_DIR = path.join(ROOT, 'assets/img/og');
const FONT = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

// slug -> pageTitles/navbar key
const PAGES = {
    home: 'home', experience: 'experience', education: 'education', teaching: 'teaching',
    research: 'research', 'community-service': 'communityService', publications: 'publications',
    books: 'books', 'intellectual-property': 'ipr', talks: 'talks', projects: 'projects',
    thesis: 'thesis', competition: 'competition', cv: 'cv'
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

async function circlePhoto(size) {
    const mask = Buffer.from(`<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`);
    return sharp(PROFILE).resize(size, size, { fit: 'cover' }).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
}

async function ogImage(slug, lang) {
    setLang(lang);
    const isHome = slug === 'home';
    const label = isHome ? '' : S.t(`navbar.${PAGES[slug]}`);
    const position = S.t('sections.position');
    const size = 300;
    const ring = Buffer.from(`<svg width="${size + 16}" height="${size + 16}"><circle cx="${(size + 16) / 2}" cy="${(size + 16) / 2}" r="${(size + 16) / 2 - 2}" fill="none" stroke="#ffffff" stroke-width="4"/></svg>`);

    const nameSize = isHome ? 56 : 40;
    const text = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1f2937"/><stop offset="1" stop-color="#000000"/></linearGradient></defs>
        <rect width="1200" height="630" fill="url(#bg)"/>
        ${isHome ? '' : `<text x="470" y="270" font-family="${FONT}" font-size="76" font-weight="700" fill="#ffffff">${esc(label)}</text>`}
        <text x="470" y="${isHome ? 300 : 340}" font-family="${FONT}" font-size="${nameSize}" font-weight="700" fill="${isHome ? '#ffffff' : '#93c5fd'}">Fandi Presly Simamora</text>
        <text x="470" y="${isHome ? 360 : 392}" font-family="${FONT}" font-size="30" fill="#d1d5db">${esc(position)}</text>
        <text x="470" y="540" font-family="${FONT}" font-size="26" fill="#9ca3af">fandipres.my.id</text>
    </svg>`;

    const photo = await circlePhoto(size);
    await sharp(Buffer.from(text))
        .composite([
            { input: photo, left: 98, top: 165 },
            { input: ring, left: 90, top: 157 }
        ])
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(path.join(OG_DIR, `${slug}-${lang}.jpg`));
}

async function favicons() {
    const img = (size) => sharp(PROFILE).resize(size, size, { fit: 'cover' }).png({ compressionLevel: 9 });
    await img(32).toFile(path.join(ROOT, 'assets/img/favicon-32.png'));
    await img(180).toFile(path.join(ROOT, 'assets/img/apple-touch-icon.png'));

    // favicon.ico with a single embedded 48x48 PNG (supported since Windows Vista and all browsers).
    const png = await img(48).toBuffer();
    const header = Buffer.alloc(22);
    header.writeUInt16LE(0, 0);
    header.writeUInt16LE(1, 2);
    header.writeUInt16LE(1, 4);
    header.writeUInt8(48, 6);
    header.writeUInt8(48, 7);
    header.writeUInt16LE(1, 10);
    header.writeUInt16LE(32, 12);
    header.writeUInt32LE(png.length, 14);
    header.writeUInt32LE(22, 18);
    fs.writeFileSync(path.join(ROOT, 'favicon.ico'), Buffer.concat([header, png]));
}

(async () => {
    fs.mkdirSync(OG_DIR, { recursive: true });
    await favicons();
    for (const slug of Object.keys(PAGES)) {
        for (const lang of ['id', 'en']) await ogImage(slug, lang);
    }
    console.log('Generated favicons and', Object.keys(PAGES).length * 2, 'Open Graph images.');
})().catch(err => { console.error(err); process.exit(1); });
