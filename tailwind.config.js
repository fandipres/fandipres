/** Replaces the Tailwind Play CDN. Class names are scanned from every HTML page and from the JS that builds markup at runtime. */
module.exports = {
    content: [
        './**/*.html',
        './assets/js/**/*.js',
        '!./node_modules/**'
    ],
    theme: { extend: {} },
    plugins: []
};
