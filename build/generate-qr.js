// One-off helper: generates a static QR code PNG pointing to the homepage,
// used on the "Mari Terhubung" contact card. Rerun if the target URL changes.
//
// Run: node build/generate-qr.js

const path = require('path');
const QRCode = require('qrcode');

const TARGET_URL = 'https://fandipres.my.id';
const OUT_PATH = path.join(__dirname, '..', 'assets', 'img', 'qr.png');

QRCode.toFile(OUT_PATH, TARGET_URL, {
    type: 'png',
    width: 600,
    margin: 1,
    color: { dark: '#04060a', light: '#ffffff' }
}, (err) => {
    if (err) { console.error(err); process.exit(1); }
    console.log(`QR code written to ${OUT_PATH}`);
});
