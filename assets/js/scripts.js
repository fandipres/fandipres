function renderItems(containerId, data, limit) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = buildItemsHtml(containerId, data, limit);
}

function renderDetailItems(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = buildDetailItemsHtml(containerId, data);
}

function renderAcademic(containerId, activities) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = buildAcademicHtml(activities);
}

function renderSocialLinks(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = buildSocialLinksHtml(data);
}

function renderTutoring(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = buildTutoringHtml(data);
}

function renderCv(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = buildCvHtml();
}

function initDynamicContent() {
    if (document.getElementById('pekerjaan-terbaru') && typeof experience !== 'undefined') {
        renderItems('pekerjaan-terbaru', experience, 2);
    }
    if (document.getElementById('pendidikan-terbaru') && typeof education !== 'undefined') {
        renderItems('pendidikan-terbaru', education, 2);
    }
    if (document.getElementById('aktivitas-akademik-container') && typeof academic !== 'undefined') {
        renderAcademic('aktivitas-akademik-container', academic);
    }
    if (document.getElementById('education-list') && typeof education !== 'undefined') {
        renderItems('education-list', education);
    }
    if (document.getElementById('experience-list') && typeof experience !== 'undefined') {
        renderItems('experience-list', experience);
    }
    if (document.getElementById('pengajaran-lengkap') && typeof teaching !== 'undefined') {
        renderDetailItems('pengajaran-lengkap', teaching);
    }
    if (document.getElementById('thesis-list') && typeof thesis !== 'undefined') {
        renderDetailItems('thesis-list', thesis);
    }
    if (document.getElementById('competition-list') && typeof competition !== 'undefined') {
        renderDetailItems('competition-list', competition);
    }
    if (document.getElementById('tutoring-list') && typeof tutoring !== 'undefined') {
        renderTutoring('tutoring-list', tutoring);
    }
    if (document.getElementById('research-list') && typeof research !== 'undefined') {
        renderDetailItems('research-list', research);
    }
    if (document.getElementById('community-list') && typeof communityService !== 'undefined') {
        renderDetailItems('community-list', communityService);
    }
    if (document.getElementById('publication-list') && typeof publications !== 'undefined') {
        renderDetailItems('publication-list', publications);
    }
    if (document.getElementById('book-list') && typeof books !== 'undefined') {
        renderDetailItems('book-list', books);
    }
    if (document.getElementById('talk-list') && typeof talks !== 'undefined') {
        renderDetailItems('talk-list', talks);
    }
    if (typeof socialMedia !== 'undefined') {
        renderSocialLinks('social-links-footer', socialMedia);
        if (document.getElementById('social-media')) {
            renderSocialLinks('social-media', socialMedia);
        }
    }
    if (document.getElementById('cv-content') && typeof buildCvHtml === 'function') {
        renderCv('cv-content');
    }
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (typeof window.updateHakiLanguage === 'function') {
        window.updateHakiLanguage();
    }
    if (typeof window.updateProjectLanguage === 'function') {
        window.updateProjectLanguage();
    }
}

function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
            });
        });
    }
}

function setActiveNavLink() {
    const path = window.location.pathname;
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.length > 1 && href.startsWith('/') && !href.startsWith('/#') && path.startsWith(href)) {
            link.classList.remove('text-gray-300');
            link.classList.add('text-white', 'font-semibold');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setActiveNavLink();
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
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('translate-y-20', 'opacity-0');
        } else {
            backToTopBtn.classList.add('translate-y-20', 'opacity-0');
        }
    });
}