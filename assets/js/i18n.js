let currentLang = (typeof localStorage !== 'undefined') ? (localStorage.getItem('site_lang') || 'id') : 'id';

const siteTranslations = {
    pageTitles: {
        books: { id: "Buku - Fandi Presly Simamora", en: "Books - Fandi Presly Simamora" },
        communityService: { id: "Pengabdian Masyarakat - Fandi Presly Simamora", en: "Community Service - Fandi Presly Simamora" },
        education: { id: "Pendidikan - Fandi Presly Simamora", en: "Education - Fandi Presly Simamora" },
        experience: { id: "Pengalaman - Fandi Presly Simamora", en: "Experience - Fandi Presly Simamora" },
        home: { id: "Fandi Presly Simamora", en: "Fandi Presly Simamora" },
        ipr: { id: "HaKI - Fandi Presly Simamora", en: "Intellectual Property Rights - Fandi Presly Simamora" },
        projects: { id: "Proyek - Fandi Presly Simamora", en: "Projects - Fandi Presly Simamora" },
        publications: { id: "Publikasi - Fandi Presly Simamora", en: "Publications - Fandi Presly Simamora" },
        research: { id: "Penelitian - Fandi Presly Simamora", en: "Research - Fandi Presly Simamora" },
        talks: { id: "Pembicara - Fandi Presly Simamora", en: "Talks - Fandi Presly Simamora" },
        teaching: { id: "Pengajaran - Fandi Presly Simamora", en: "Teaching - Fandi Presly Simamora" },
        thesis: { id: "Bimbingan Tugas Akhir - Fandi Presly Simamora", en: "Thesis Supervision - Fandi Presly Simamora" },
        competition: { id: "Bimbingan Lomba - Fandi Presly Simamora", en: "Competition Mentoring - Fandi Presly Simamora" },
        cv: { id: "Curriculum Vitae - Fandi Presly Simamora", en: "Curriculum Vitae - Fandi Presly Simamora" }
    },
    navbar: {
        academic: { id: "Aktivitas Akademik", en: "Academic Activities" },
        books: { id: "Buku", en: "Books" },
        communityService: { id: "Pengabdian Masyarakat", en: "Community Service" },
        contact: { id: "Kontak", en: "Contact" },
        cv: { id: "CV", en: "CV" },
        education: { id: "Pendidikan", en: "Education" },
        experience: { id: "Pengalaman", en: "Experience" },
        ipr: { id: "HaKI", en: "Intellectual Property Rights" },
        projects: { id: "Proyek", en: "Projects" },
        publications: { id: "Publikasi", en: "Publications" },
        research: { id: "Penelitian", en: "Research" },
        talks: { id: "Pembicara", en: "Talks" },
        teaching: { id: "Pengajaran", en: "Teaching" },
        thesis: { id: "Bimbingan Tugas Akhir", en: "Thesis Supervision" },
        competition: { id: "Bimbingan Lomba", en: "Competition Mentoring" }
    },
    sections: {
        academic: {
            title: { id: "Aktivitas Akademik", en: "Academic Activities" },
            description: {
                id: "Di bagian ini, Anda bisa melihat lebih dalam kegiatan saya sebagai seorang akademisi.",
                en: "In this section, you can take a deeper look at my activities as an academic."
            }
        },
        contact: {
            title: { id: "Mari Terhubung", en: "Let's Connect" },
            description: {
                id: "Jika Anda memiliki pertanyaan atau ingin berkolaborasi, jangan ragu untuk menghubungi saya.",
                en: "If you have any questions or would like to collaborate, please do not hesitate to contact me."
            },
            email: {
                id: "Untuk diskusi atau pertanyaan lebih lanjut, silakan kirim pesan ke alamat di bawah ini.",
                en: "For further discussion or inquiries, please send a message to the address below."
            },
            socialMedia: {
                id: "Anda bisa terhubung dengan saya melalui platform berikut.",
                en: "You can connect with me through the following platforms."
            }
        },
        featuredProjects: { id: "Proyek Unggulan", en: "Featured Projects" },
        latestEdu: { id: "Pendidikan Terbaru", en: "Latest Education" },
        latestWork: { id: "Pekerjaan Terbaru", en: "Latest Experience" },
        position: { id: "Dosen di Universitas Mikroskil", en: "Lecturer at Mikroskil University" }
    },
    page: {
        cv: { id: "Curriculum Vitae", en: "Curriculum Vitae" },
        books: { id: "Buku", en: "Book" },
        communityService: { id: "Pengabdian Masyarakat", en: "Community Service" },
        education: { id: "Pendidikan", en: "Education" },
        experience: { id: "Pengalaman", en: "Experience" },
        ipr: { id: "HaKI", en: "Intellectual Property Rights" },
        projects: { id: "Proyek", en: "Projects" },
        publications: { id: "Publikasi", en: "Publications" },
        research: { id: "Penelitian", en: "Research" },
        talks: { id: "Pembicara", en: "Talks" },
        teaching: { id: "Pengajaran", en: "Teaching" },
        thesis: { id: "Bimbingan Tugas Akhir", en: "Thesis Supervision" },
        competition: { id: "Bimbingan Lomba", en: "Competition Mentoring" }
    },
    asset: {
        article: { id: "Artikel", en: "Article" },
        book: { id: "Buku", en: "Book" },
        dataset: { id: "Dataset", en: "Dataset" },
        documentation: { id: "Dokumentasi", en: "Documentation" },
        file: { id: "File", en: "File" },
        slides: { id: "Slide", en: "Slides" }
    },
    buttons: {
        back: { id: "Kembali", en: "Back" },
        filterAll: { id: "Semua", en: "All" },
        viewAll: { id: "Lihat Semua", en: "View All" }
    },
    notFound: {
        title: { id: "Halaman Tidak Ditemukan", en: "Page Not Found" },
        description: {
            id: "Halaman yang Anda cari mungkin sudah dipindahkan atau tidak pernah ada.",
            en: "The page you are looking for may have been moved or never existed."
        },
        backHome: { id: "Kembali ke Beranda", en: "Back to Home" }
    },
    cv: {
        downloadPdf: { id: "Unduh PDF", en: "Download PDF" },
        backToSite: { id: "Kembali ke Situs", en: "Back to Site" },
        coursesLabel: { id: "Mata Kuliah", en: "Courses" }
    },
    labels: {
        team: { id: "Tim", en: "Team" },
        classes: { id: "Kelas", en: "Classes" }
    },
    ipr: {
        filters: {
            all: { id: "Semua", en: "All" },
            copyright: { id: "Hak Cipta", en: "Copyright" },
            patent: { id: "Paten", en: "Patent" },
            book: { id: "Buku", en: "Book" },
            brand: { id: "Merek", en: "Brand" },
            design: { id: "Desain", en: "Design" }
        },
        loading: { id: "Memuat data...", en: "Loading..." },
        searchPlaceholder: {
            id: "Cari Judul, Nomor, atau Deskripsi...",
            en: "Search Title, Number, or Description..."
        },
        table: {
            year: { id: "Tahun", en: "Year" },
            title: { id: "Ciptaan", en: "Title" },
            category: { id: "Jenis", en: "Category" },
            regNumber: { id: "Nomor", en: "Number" },
            issuer: { id: "Penerbit", en: "Issuer" }
        }
    }
}

function getVal(data) {
    if (!data) return "";
    if (typeof data === 'string') return data;
    const text = data[currentLang];
    return (text && text.trim() !== "") ? text : data.id;
}

function t(keyPath) {
    const keys = keyPath.split('.');
    let obj = siteTranslations;
    for (const k of keys) {
        if (!obj) return "";
        obj = obj[k];
    }
    return getVal(obj);
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('site_lang', lang);
    if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.lang = lang;
    }
    updateToggleButtons();
    updateStaticPageElements();
    initDynamicContent();

    if (typeof window.updateIPRLanguage === 'function') {
        window.updateIPRLanguage();
    }
}

function updateToggleButtons() {
    const textNext = currentLang === 'id' ? 'EN' : 'ID';
    const btnText = document.getElementById('lang-text');
    if (btnText) btnText.textContent = textNext;

    const btnMobile = document.getElementById('lang-toggle-mobile');
    if (btnMobile) {
        btnMobile.textContent = currentLang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia';
    }
}

function updateStaticPageElements() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
}