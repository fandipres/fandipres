// One-off/rerunnable helper: converts raw project preview screenshots in
// assets/img/projects/ (dropped in as PNG, named after the project title)
// into web-sized WebP files with URL-safe slug filenames.
//
// Run: node build/optimize-project-images.js

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC_DIR = path.join(__dirname, '..', 'assets', 'img', 'projects');
const TARGET_WIDTH = 800;
const TARGET_HEIGHT = 450; // 16:9, matches the aspect-video card thumbnail
const WEBP_QUALITY = 82;

function slugify(name) {
    return name
        .toLowerCase()
        .replace(/'/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

async function main() {
    const files = fs.readdirSync(SRC_DIR).filter(f => /\.png$/i.test(f));
    if (files.length === 0) {
        console.log('Tidak ada file .png baru di assets/img/projects/.');
        return;
    }

    for (const file of files) {
        const srcPath = path.join(SRC_DIR, file);
        const title = path.basename(file, '.png');
        const slug = slugify(title);
        const outPath = path.join(SRC_DIR, `${slug}.webp`);

        const beforeSize = fs.statSync(srcPath).size;
        await sharp(srcPath)
            .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: 'cover' })
            .webp({ quality: WEBP_QUALITY })
            .toFile(outPath);
        const afterSize = fs.statSync(outPath).size;

        fs.unlinkSync(srcPath);

        const reduction = Math.round((1 - afterSize / beforeSize) * 100);
        console.log(
            `${title} -> ${slug}.webp  ` +
            `(${(beforeSize / 1024).toFixed(0)}KB -> ${(afterSize / 1024).toFixed(0)}KB, -${reduction}%)`
        );
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
