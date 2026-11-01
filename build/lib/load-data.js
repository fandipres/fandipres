// Loads i18n + all data files + render-core into one shared vm context,
// reproducing the same shared-global-scope semantics as sequential
// <script> tags in the browser. Files are loaded verbatim, unmodified.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..', '..');

const SCRIPT_FILES = [
    'assets/js/i18n.js',
    'assets/js/data/academic/academic.js',
    'assets/js/data/academic/books.js',
    'assets/js/data/academic/community-service.js',
    'assets/js/data/education.js',
    'assets/js/data/experience.js',
    'assets/js/data/academic/intellectual-property.js',
    'assets/js/data/social.js',
    'assets/js/data/projects.js',
    'assets/js/data/academic/publications.js',
    'assets/js/data/academic/research.js',
    'assets/js/data/academic/talks.js',
    'assets/js/data/academic/teaching.js',
    'assets/js/data/academic/thesis.js',
    'assets/js/data/academic/competition.js',
    'assets/js/render-core.js'
];

// Top-level `const`/`let` bindings in a vm context live in that context's
// lexical environment and are NOT exposed as own-properties of the sandbox
// object (unlike `var`/`function`, which are). Data files all use `const`,
// so copy their bindings onto the sandbox explicitly via a follow-up script
// run in the same context (where they're still lexically reachable).
const EXPOSED_BINDINGS = [
    'siteTranslations', 'academic', 'books', 'communityService', 'education',
    'experience', 'ipr', 'socialMedia', 'projects', 'publications', 'research',
    'talks', 'teaching', 'thesis', 'competition'
];

function loadSandbox() {
    const sandbox = {};
    vm.createContext(sandbox);

    for (const rel of SCRIPT_FILES) {
        const code = fs.readFileSync(path.join(ROOT, rel), 'utf8');
        new vm.Script(code, { filename: rel }).runInContext(sandbox);
    }

    new vm.Script(EXPOSED_BINDINGS.map(name => `this.${name} = ${name};`).join('\n')).runInContext(sandbox);

    // `currentLang` is a lexical `let`, so it can only be changed from inside the context.
    const setLang = (lang) => new vm.Script(`currentLang = ${JSON.stringify(lang)};`).runInContext(sandbox);
    setLang('id');

    return { sandbox, setLang };
}

module.exports = { loadSandbox, ROOT, SCRIPT_FILES };
