const siteTranslations = {
    pageTitles: {
        books: { id: "Penulisan - Fandi Presly Simamora", en: "Books - Fandi Presly Simamora" },
        community: { id: "Pengabdian Masyarakat - Fandi Presly Simamora", en: "Community Service - Fandi Presly Simamora" },
        education: { id: "Pendidikan - Fandi Presly Simamora", en: "Education - Fandi Presly Simamora" },
        experience: { id: "Pengalaman - Fandi Presly Simamora", en: "Experience - Fandi Presly Simamora" },
        home: { id: "Fandi Presly Simamora", en: "Fandi Presly Simamora" },
        research: { id: "Penelitian - Fandi Presly Simamora", en: "Research - Fandi Presly Simamora" },
        projects: { id: "Proyek - Fandi Presly Simamora", en: "Projects - Fandi Presly Simamora" },
        publications: { id: "Publikasi - Fandi Presly Simamora", en: "Publications - Fandi Presly Simamora" },
        talks: { id: "Pembicara - Fandi Presly Simamora", en: "Talks - Fandi Presly Simamora" },
        teaching: { id: "Pengajaran - Fandi Presly Simamora", en: "Teaching - Fandi Presly Simamora" },
        thesis: { id: "Bimbingan Tugas Akhir - Fandi Presly Simamora", en: "Thesis Supervision - Fandi Presly Simamora" },
        tutoring: { id: "Tutor Privat - Fandi Presly Simamora", en: "Private Tutoring - Fandi Presly Simamora" }
    },
    navbar: {
        academic: { id: "Aktivitas Akademik", en: "Academic Activities" },
        contact: { id: "Kontak", en: "Contact" },
        education: { id: "Pendidikan", en: "Education" },
        experience: { id: "Pengalaman", en: "Experience" },
        projects: { id: "Proyek", en: "Projects" }
    },
    sections: {
        academic: { id: "Aktivitas Akademik", en: "Academic Activities" },
        connect: { id: "Mari Terhubung", en: "Let's Connect" },
        featuredProjects: { id: "Proyek Unggulan", en: "Featured Projects" },
        latestEdu: { id: "Pendidikan Terbaru", en: "Latest Education" },
        latestWork: { id: "Pekerjaan Terbaru", en: "Latest Experience" }
    },
    descriptions: {
        academic: {
            id: "Di bagian ini, Anda bisa melihat lebih dalam kegiatan saya sebagai seorang akademisi.",
            en: "In this section, you can take a deeper look at my activities as an academic."
        },
        contact: {
            id: "Jika Anda memiliki pertanyaan atau ingin berkolaborasi, jangan ragu untuk menghubungi saya.",
            en: "If you have any questions or would like to collaborate, please do not hesitate to contact me."
        },
        email: {
            id: "Untuk diskusi atau pertanyaan lebih lanjut, silakan kirim pesan ke alamat di bawah ini.",
            en: "For further discussion or inquiries, please send a message to the address below."
        },
        social: {
            id: "Anda bisa terhubung dengan saya melalui platform berikut.",
            en: "You can connect with me through the following platforms."
        }
    },
    page: {
        books: { id: "Penulisan", en: "Book" },
        community: { id: "Pengabdian Masyarakat", en: "Community Service" },
        education: { id: "Pendidikan", en: "Education" },
        experience: { id: "Pengalaman", en: "Experience" },
        research: { id: "Penelitian", en: "Research" },
        projects: { id: "Proyek", en: "Projects" },
        publications: { id: "Publikasi", en: "Publications" },
        talks: { id: "Pembicara", en: "Talks" },
        teaching: { id: "Pengajaran", en: "Teaching" },
        thesis: { id: "Bimbingan Tugas Akhir", en: "Thesis Supervision" },
        tutoring: { id: "Tutor Privat", en: "Private Tutoring" }
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
}

const experience = [
    {
        year: { id: "Oktober 2024 - Sekarang", en: "October 2024 - Present" },
        title: { id: "Sekretaris Program Studi Sarjana Teknik Informatika", en: "Secretary of Undergraduate Program in Informatics Engineering" },
        subtitle: { id: "Universitas Mikroskil, Medan", en: "Mikroskil University, Medan" },
        description: { id: "", en: "" }
    },
    {
        year: { id: "September 2022 - Sekarang", en: "September 2022 - Present" },
        title: { id: "Dosen Program Studi Sarjana Teknik Informatika", en: "Lecturer of Undergraduate Program in Informatics Engineering" },
        subtitle: { id: "Universitas Mikroskil, Medan", en: "Mikroskil University, Medan" },
        description: { id: "", en: "" }
    },
    {
        year: { id: "September 2019 - September 2022", en: "September 2019 - September 2022" },
        title: { id: "Asisten Lab Komputer", en: "Computer Lab Assistant" },
        subtitle: { id: "Universitas Mikroskil, Medan", en: "Mikroskil University, Medan" },
        description: { id: "", en: "" }
    }
];

const education = [
    {
        year: { id: "September 2022 - Oktober 2024", en: "September 2022 - October 2024" },
        title: { id: "Magister Teknologi Informasi (M.Kom.)", en: "Master of Information Technology (M.Kom.)" },
        subtitle: { id: "Universitas Mikroskil, Medan", en: "Mikroskil University, Medan" },
        description: { id: "Tesis: Penentuan Konfigurasi Hyperparameter BiLSTM Menggunakan Bayesian Optimization untuk Prediksi Harga Saham", en: "Thesis: Hyperparameter Tuning of BiLSTM Using Bayesian Optimization for Stock Price Prediction" }
    },
    {
        year: { id: "September 2018 - Oktober 2022", en: "September 2018 - October 2022" },
        title: { id: "Sarjana Teknik Informatika (S.Kom.)", en: "Bachelor of Informatics Engineering (S.Kom.)" },
        subtitle: { id: "Universitas Mikroskil, Medan", en: "Mikroskil University, Medan" },
        description: { id: "Skripsi: Pengembangan Aplikasi Pemantauan Aktivitas pada Ruangan Menggunakan Algoritma Improved Mask R CNN Berbasis Web", en: "Undergraduate Thesis: Web Based Activity Monitoring Applications Development Using Improved Mask R CNN Algorithm" }
    }
];

const teaching = [
    {
        year: { id: "Semester Ganjil 2025 - 2026", en: "Odd Semester 2025 - 2026" },
        title: { id: "Pengembangan Karakter: Kepemimpinan", en: " Character Development: Leadership" },
        subtitle: { id: "Universitas Mikroskil, Medan", en: "Mikroskil University, Medan" },
        description: { id: "", en: "" },
        classes: [{ id: "Sistem Informasi (2 Kelas), Teknik Informatika (2 Kelas)", en: "Information Systems (2 Classes), Informatics Engineering (2 Classes)" }],
    },
    {
        year: { id: "Semester Genap 2024 - 2025", en: "Even Semester 2024 - 2025" },
        title: { id: "Pengembangan Aplikasi Gim", en: "Game Application Development" },
        subtitle: { id: "Universitas Mikroskil, Medan", en: "Mikroskil University, Medan" },
        description: { id: "", en: "" },
        classes: [{ id: "Teknik Informatika (2 Kelas)", en: "Informatics Engineering (2 Classes)" }],
    },
    {
        year: { id: "Semester Ganjil 2024 - 2025", en: "Odd Semester 2024 - 2025" },
        title: { id: "Pengembangan Web Back-End", en: "Back End Web Development" },
        subtitle: { id: "Universitas Mikroskil, Medan", en: "Mikroskil University, Medan" },
        description: { id: "", en: "" },
        classes: [{ id: "Teknik Informatika (1 Kelas)", en: "Informatics Engineering (1 Classes)" }],
    },
    {
        year: { id: "Semester Ganjil 2024 - 2025", en: "Odd Semester 2024 - 2025" },
        title: { id: "Perancangan dan Pemrograman Berorientasi Objek", en: "Object Oriented Design and Programming" },
        subtitle: { id: "Universitas Mikroskil, Medan", en: "Mikroskil University, Medan" },
        description: { id: "", en: "" },
        classes: [{ id: "Teknik Informatika (1 Kelas)", en: "Informatics Engineering (1 Classes)" }],
    },
    {
        year: { id: "Semester Genap 2023 - 2024", en: "Even Semester 2023 - 2024" },
        title: { id: "Pengembangan Aplikasi Gim", en: "Game Application Development" },
        subtitle: { id: "Universitas Mikroskil, Medan", en: "Mikroskil University, Medan" },
        description: { id: "", en: "" },
        classes: [{ id: "Teknik Informatika (2 Kelas)", en: "Informatics Engineering (2 Classes)" }],
    },
    {
        year: { id: "Semester Genap 2023 - 2024", en: "Even Semester 2023 - 2024" },
        title: { id: "Pengembangan Aplikasi Mobile Front-End", en: "Front End Mobile Applications Development" },
        subtitle: { id: "Universitas Mikroskil, Medan", en: "Mikroskil University, Medan" },
        description: { id: "", en: "" },
        classes: [{ id: "Teknik Informatika (1 Kelas)", en: "Informatics Engineering (1 Classes)" }],
    },
    {
        year: { id: "Semester Ganjil 2023 - 2024", en: "Odd Semester 2023 - 2024" },
        title: { id: "Pengembangan Web Back-End", en: "Back End Web Development" },
        subtitle: { id: "Universitas Mikroskil, Medan", en: "Mikroskil University, Medan" },
        description: { id: "", en: "" },
        classes: [{ id: "Teknik Informatika (2 Kelas)", en: "Informatics Engineering (2 Classes)" }],
    },
    {
        year: { id: "Semester Genap 2022 - 2023", en: "Even Semester 2022 - 2023" },
        title: { id: "Pengembangan Aplikasi Gim", en: "Game Application Development" },
        subtitle: { id: "Universitas Mikroskil, Medan", en: "Mikroskil University, Medan" },
        description: { id: "", en: "" },
        classes: [{ id: "Teknik Informatika (3 Kelas)", en: "Informatics Engineering (3 Classes)" }],
    },
    {
        year: { id: "Semester Ganjil 2022 - 2023", en: "Odd Semester 2022 - 2023" },
        title: { id: "Pengembangan Aplikasi Mobile Back-End", en: "Back End Mobile Applications Development" },
        subtitle: { id: "Universitas Mikroskil, Medan", en: "Mikroskil University, Medan" },
        description: { id: "", en: "" },
        classes: [{ id: "Teknik Informatika (1 Kelas)", en: "Informatics Engineering (1 Classes)" }],
    },
    {
        year: { id: "Semester Ganjil 2022 - 2023", en: "Odd Semester 2022 - 2023" },
        title: { id: "Wawasan Informatika", en: "Informatics Insight" },
        subtitle: { id: "Universitas Mikroskil, Medan", en: "Mikroskil University, Medan" },
        description: { id: "", en: "" },
        classes: [{ id: "Teknik Informatika (1 Kelas)", en: "Informatics Engineering (1 Classes)" }],
    }
];

const research = [
    {
        year: "2025",
        title: { id: "Analisis Sentimen Publik Terhadap Kinerja Dewan Perwakilan Rakyat Republik Indonesia Menggunakan Metode Topic Modeling dan Aspect-Based Sentiment Analysis", en: "Public Sentiment Analysis on the Performance of the Indonesian House of Representatives Using Topic Modeling and Aspect-Based Sentiment Analysis" },
        subtitle: { id: "Universitas Mikroskil", en: "Mikroskil University" },
        category: { id: "Penelitian Mandiri", en: "Independent Research" },
        role: { id: "Ketua Peneliti", en: "Lead Researcher" },
        description: { id: "", en: "" },
        assets: {
            dataset: "",
            documentation: "",
            file: "",
        }
    },
    {
        year: "2025",
        title: { id: "Transformasi Digital Pertanian dengan Model Prediksi Cuaca Berbasis BiLSTM untuk Optimalisasi Masa Tanam Padi di Era Industri 4.0", en: "Agricultural Digital Transformation via BiLSTM-Based Weather Prediction Models for Optimizing Rice Planting Seasons in the Industry 4.0 Era" },
        subtitle: { id: "Kementerian Pendidikan Tinggi, Sains, dan Teknologi Republik Indonesia", en: "Ministry of Higher Education, Science, and Technology" },
        category: { id: "Penelitian Dosen Pemula", en: "Novice Lecturer Research Grant" },
        role: { id: "Ketua Peneliti", en: "Lead Researcher" },
        description: { id: "", en: "" },
        assets: {
            dataset: "",
            documentation: "",
            file: "",
        }
    },
    {
        year: "2024",
        title: { id: "Optimasi Random Forest Menggunakan RFE untuk Klasifikasi Stunting pada RSU Mitra Medika", en: "Random Forest Optimization Using RFE for Stunting Classification at RSU Mitra Medika" },
        subtitle: { id: "Universitas Mikroskil", en: "Mikroskil University" },
        category: { id: "Penelitian Mandiri", en: "Independent Research" },
        role: { id: "Anggota Peneliti", en: "Co-Researcher" },
        description: { id: "", en: "" },
        assets: {
            dataset: "",
            documentation: "",
            file: "",
        }
    },
    {
        year: "2024",
        title: { id: "Penentuan Konfigurasi Hyperparameter BiLSTM Menggunakan Bayesian Optimization untuk Prediksi Harga Saham", en: "Hyperparameter Tuning of BiLSTM Using Bayesian Optimization for Stock Price Prediction" },
        subtitle: { id: "Universitas Mikroskil", en: "Mikroskil University" },
        category: { id: "Penelitian Mandiri", en: "Independent Research" },
        role: { id: "Ketua Peneliti", en: "Lead Researcher" },
        description: { id: "", en: "" },
        assets: {
            dataset: "",
            documentation: "",
            file: "",
        }
    },
    {
        year: "2022",
        title: { id: "Pengembangan Aplikasi Pemantauan Aktivitas pada Ruangan Menggunakan Algoritma Improved Mask R CNN Berbasis Web", en: "Web Based Activity Monitoring Applications Development Using Improved Mask R CNN Algorithm" },
        subtitle: { id: "Universitas Mikroskil", en: "Mikroskil University" },
        category: { id: "Penelitian Mandiri", en: "Independent Research" },
        role: { id: "Ketua Peneliti", en: "Lead Researcher" },
        description: { id: "", en: "" },
        assets: {
            dataset: "",
            documentation: "",
            file: "",
        }
    }
];

const community_service = [
    {
        year: "2025",
        title: { id: "Pembekalan Guru SMK dalam Menghadapi Tantangan Industri Masa Depan Melalui Pelatihan Berpikir Komputasional, Analisis Data, dan Literasi Kecerdasan Artifisial", en: "Empowering Vocational Teachers for Future Industrial Challenges through Computational Thinking, Data Analysis, and AI Literacy Training" },
        subtitle: { id: "SMK 6 Medan dan SMK 13 Medan", en: "SMK 6 Medan and SMK 13 Medan" },
        category: { id: "Pengabdian Internal", en: "Internal Community Service" },
        role: { id: "Ketua Pengabdian", en: "Project Leader" },
        description: { id: "", en: "" },
        assets: {
            documentation: "https://mikroskilacid-my.sharepoint.com/:f:/g/personal/fandi_simamora_mikroskil_ac_id/EkvJm8pJk85GlM4yAJZMlMABUbKtwWbnZZgu6wkRXnD8gQ?e=vmPfod",
            file: "",
            slides: "https://mikroskilacid-my.sharepoint.com/:f:/g/personal/fandi_simamora_mikroskil_ac_id/EuW0NgaL98ZIspL_cP0463oBIiZ81EdVFLtyjsSQKbU_bw?e=S2ze05"
        }
    },
    {
        year: "2025",
        title: { id: "Transformasi Peran Guru dalam Mendorong Partisipasi Siswa melalui Integrasi Mentimeter untuk Mendukung Active Learning", en: "Transforming Teacher Roles to Boost Student Participation via Mentimeter Integration for Supporting Active Learning" },
        subtitle: { id: "SMK Methodist Tanjung Morawa", en: "SMK Methodist Tanjung Morawa" },
        category: { id: "Pengabdian Internal", en: "Internal Community Service" },
        role: { id: "Anggota Pengabdian", en: "Team Member" },
        description: { id: "", en: "" },
        assets: {
            documentation: "https://mikroskilacid-my.sharepoint.com/:f:/g/personal/fandi_simamora_mikroskil_ac_id/EqcFVDqGZT5Gvs8IIvjvwzQBVlUC2KprcEhushRw_7iRBA?e=MP4aFY",
            file: "",
            slides: "https://mikroskilacid-my.sharepoint.com/:f:/g/personal/fandi_simamora_mikroskil_ac_id/EroVv-bA5ElAg519jeXCId0B3WygFz_A9bxVQcf6hcOzmg?e=f1zJQL"
        }
    },
    {
        year: "2025",
        title: { id: "Pengenalan Kecerdasan Artifisial pada Guru SMA Tri Ratna Sibolga Sebagai Bekal Generasi Emas 2045", en: "Introduction to AI for Teachers at SMA Tri Ratna Sibolga: Preparing for the Golden Generation 2045" },
        subtitle: { id: "SMA Tri Ratna Sibolga", en: "SMA Tri Ratna Sibolga" },
        category: { id: "Pengabdian Internal", en: "Internal Community Service" },
        role: { id: "Anggota Pengabdian", en: "Team Member" },
        description: { id: "", en: "" },
        assets: {
            documentation: "https://mikroskilacid-my.sharepoint.com/:f:/g/personal/fandi_simamora_mikroskil_ac_id/Eni0jfKAHNNFgsm9GtXcaOwBJQrhrHVlNEsWaPtH2sFjGw?e=ynFTmA",
            file: "",
            slides: "https://mikroskilacid-my.sharepoint.com/:f:/g/personal/fandi_simamora_mikroskil_ac_id/El09Gt7n9mhGhhZwFgHE2gEBPcM3p7apFBnUa_FmPPLcEw?e=PjJMdx"
        }
    },
    {
        year: "2025",
        title: { id: "Pembekalan Guru SMA Panglima Polem Rantauprapat dengan Teknologi Masa Depan: Kecerdasan Artifisial", en: "Equipping Teachers at SMA Panglima Polem Rantauprapat with Future Technologies: Artificial Intelligence" },
        subtitle: { id: "SMA Panglima Polem Rantauprapat", en: "SMA Panglima Polem Rantauprapat" },
        category: { id: "Pengabdian Internal", en: "Internal Community Service" },
        role: { id: "Anggota Pengabdian", en: "Team Member" },
        description: { id: "", en: "" },
        assets: {
            documentation: "https://mikroskilacid-my.sharepoint.com/:f:/g/personal/fandi_simamora_mikroskil_ac_id/EuK7MwB8rthFozdvzsErlSgB6HgE5Ykl62soWWj9f3Lp6A",
            file: "",
            slides: "https://mikroskilacid-my.sharepoint.com/:f:/g/personal/fandi_simamora_mikroskil_ac_id/Em1jS-SkN5xAgQ0XS6CDBPsBQFHgLBhMzQKw8FKdrNfmwg?e=7LZklA"
        }
    }
];

const publications = [
    {
        year: "2025",
        title: { id: "Random Forest Optimization Using Recursive Feature Elimination for Stunting Classification", en: "" },
        subtitle: { id: "Indonesian Journal of Artificial Intelligence and Data Mining", en: "" },
        rank: { id: "Sinta 3", en: "" },
        category: { id: "Penelitian Mandiri", en: "Independent Research" },
        role: { id: "Penulis Keempat", en: "4th Author" },
        description: { id: `Luaran dari Penelitian "Optimasi Random Forest Menggunakan RFE untuk Klasifikasi Stunting pada RSU Mitra Medika".`, en: `Research Output "Random Forest Optimization Using RFE for Stunting Classification at RSU Mitra Medika"` },
        assets: {
            article: "https://ejournal.uin-suska.ac.id/index.php/IJAIDM/article/view/35295"
        }
    },
    {
        year: "2025",
        title: { id: "Optimisasi Hyperparameter BiLSTM Menggunakan Bayesian Optimization untuk Prediksi Harga Saham", en: "" },
        subtitle: { id: "Jambura Journal of Mathematics", en: "" },
        rank: { id: "Sinta 3", en: "" },
        category: { id: "Penelitian Mandiri", en: "Independent Research" },
        role: { id: "Penulis Pertama", en: "First Author" },
        description: { id: `Luaran dari Penelitian "Penentuan Konfigurasi Hyperparameter BiLSTM Menggunakan Bayesian Optimization untuk Prediksi Harga Saham".`, en: `Research Output "Hyperparameter Tuning of BiLSTM Using Bayesian Optimization for Stock Price Prediction""` },
        assets: {
            article: "https://ejurnal.ung.ac.id/index.php/jjom/article/view/27166/0"
        }
    }
];

const books = [
    {
        year: "2025",
        title: { id: "Chapter 6: Bahasa Pemrograman", en: "Chapter 6: Programming Languages" },
        subtitle: { id: "MMFast Publishing", en: "" },
        category: { id: "Bab Buku", en: "Book Chapter" },
        role: { id: "Kontributor", en: "Contributor" },
        description: { id: `Bab buku dalam Buku "Pengenalan Dasar Informatika dan Peranannya di Era Digital".`, en: `Book chapter in "Introduction to Basic Informatics and Its Role in the Digital Era"` },
        assets: {
            book: "https://mmfast.id/pengenalan-dasar-informatika-danperanannya-di-era-digital"
        }
    },
    {
        year: "2025",
        title: { id: "Chapter 14: Proyek Mini: Merancang Solusi Nyata Berbasis Komputasi", en: "Chapter 14: Mini Project: Designing Real-World Computational Solutions" },
        subtitle: { id: "Bukuloka Literasi Bangsa", en: "" },
        category: { id: "Bab Buku", en: "Book Chapter" },
        role: { id: "Kontributor", en: "Contributor" },
        description: { id: `Bab buku dalam Buku "Logika Digital & Algoritma Dunia Nyata: Menyelami Inti Ilmu Komputer".`, en: `Book chapter in "Digital Logic & Real-World Algorithms: Diving into the Core of Computer Science"` },
        assets: {
            book: "https://www.bukuloka.com/books/logika-digital-algoritma-dunia-nyata-menyelami-inti-ilmu-komputer"
        }
    }
];

const talks = [
    {
        year: "2025",
        title: { id: "Workshop Mikroskil e-Xploration: Python", en: "" },
        subtitle: { id: "Universitas Mikroskil", en: "Mikroskil University" },
        category: { id: "Event Internal", en: "Internal Event" },
        role: { id: "Narasumber", en: "Speaker" },
        description: { id: "", en: "" },
        assets: {
            documentation: "",
            slides: "https://mikroskilacid-my.sharepoint.com/:f:/g/personal/fandi_simamora_mikroskil_ac_id/ElyWskrCsINKj9shki07PhoBwxjkqr1Jfcx7l-JSZMSapQ?e=fMSr3F"
        }
    },
    {
        year: "2025",
        title: { id: "Coaching Clinic PKM", en: "" },
        subtitle: { id: "Mikroskil Student Union", en: "" },
        category: { id: "Event Internal", en: "Internal Event" },
        role: { id: "Narasumber", en: "Speaker" },
        description: { id: "", en: "" },
        assets: {
            documentation: "",
            slides: "https://mikroskilacid-my.sharepoint.com/:f:/g/personal/fandi_simamora_mikroskil_ac_id/EodB2SJmdVJHsBNfpKeglpgBA3q06eAxoweGkz9zQq7vzQ?e=ujJ1Un"
        }
    },
    {
        year: "2023",
        title: { id: "Workshop Introduction to Game Development", en: "" },
        subtitle: { id: "Universitas Mikroskil", en: "Mikroskil University" },
        category: { id: "Event Internal", en: "Internal Event" },
        role: { id: "Narasumber", en: "Speaker" },
        description: { id: "", en: "" },
        assets: {
            documentation: "",
            slides: "https://mikroskilacid-my.sharepoint.com/:f:/g/personal/fandi_simamora_mikroskil_ac_id/EvxQoi94nppPonYFczritrcBC3EikMuPv_-RIagb9__hrA?e=7a6UQa"
        }
    }
];

const thesisSupervision = [
    {
        year: "2023",
        title: { id: "Analisis dan Perancangan Sistem Akademik Universitas berbasis Mobile", en: "" },
        subtitle: { id: "Pendamping Pembimbing", en: "Co-Supervisor" },
        category: { id: "Skripsi", en: "Undergraduate Thesis" },
        description: { id: "", en: "" },
        students: ["Angel Kornella Simamora", "Anthony Chandra", "Muhammad Fariz Dzuhreza"],
        assets: { file: "", documentation: "" }
    },
    {
        year: "2023",
        title: { id: "Analisis dan Perancangan Sistem Informasi Pemasaran Universitas dan Pendaftaran Calon Mahasiswa Baru berbasis Mobile", en: "" },
        subtitle: { id: "Pendamping Pembimbing", en: "Co-Supervisor" },
        category: { id: "Skripsi", en: "Undergraduate Thesis" },
        description: { id: "", en: "" },
        students: ["Anggiat Maju Siregar", "Dina Elishabet Manalu", "Yosua Hutabarat"],
        assets: { file: "", documentation: "" }
    },
    {
        year: "2023",
        title: { id: "Evaluasi Usability dan Rekomendasi Perbaikan Portal Resmi Merdeka Belajar Kampus Merdeka (MBKM) dengan menggunakan WEBUSE (Web Usability Evaluation) dan IPA (Importance Performance Analysis)", en: "" },
        subtitle: { id: "Pendamping Pembimbing", en: "Co-Supervisor" },
        category: { id: "Skripsi", en: "Undergraduate Thesis" },
        description: { id: "", en: "" },
        students: ["Dessy Karmila Shandy", "Jestiven"],
        assets: { file: "", documentation: "" }
    }
];

const privateTeaching = [
    {
        year: "2025",
        title: { id: "Pengembangan Aplikasi IoT - Arduino", en: "IoT Application Development - Arduino" },
        subtitle: { id: "", en: "" },
        category: { id: "", en: "" },
        description: { id: "", en: "" },
        students: ["K****"],
        assets: { file: "", documentation: "" }
    },
    {
        year: "2025",
        title: { id: "Pengembangan Aplikasi Mobile - Flutter", en: "Mobile Application Development - Flutter" },
        subtitle: { id: "", en: "" },
        category: { id: "", en: "" },
        description: { id: "", en: "" },
        students: ["K****"],
        assets: { file: "", documentation: "" }
    }
];

const academicActivities = {
    teaching: {
        title: siteTranslations.page.teaching,
        description: { id: "Daftar mata kuliah dan kelas yang saya ampu di universitas.", en: "List of courses and classes I teach at the university." },
        link: "/teaching",
        data: teaching
    },
    research: {
        title: siteTranslations.page.research,
        description: { id: "Proyek penelitian yang saya kerjakan sebagai ketua maupun anggota tim.", en: "Research projects conducted as a lead or co-researcher." },
        link: "/research",
        data: research
    },
    community_service: {
        title: siteTranslations.page.community,
        description: { id: "Berbagi ilmu dan keahlian kepada masyarakat untuk dampak yang lebih luas.", en: "Sharing knowledge and expertise with the community to create a broader impact." },
        link: "/community_service",
        data: community_service
    },
    publications: {
        title: siteTranslations.page.publications,
        description: { id: "Publikasi artikel ilmiah dalam jurnal maupun konferensi.", en: "Scientific articles published in journals and conferences." },
        link: "/publications",
        data: publications
    },
    books: {
        title: siteTranslations.page.books,
        description: { id: "Kontribusi buku dan bab buku sesuai bidang keahlian saya.", en: "Books and book chapters written within my field of expertise." },
        link: "/books",
        data: books
    },
    talks: {
        title: siteTranslations.page.talks,
        description: { id: "Berbagi wawasan dan pengalaman sebagai pembicara di berbagai forum.", en: "Sharing insights and experiences as a speaker at seminars and workshops." },
        link: "/talks",
        data: talks
    },
    thesis: {
        title: siteTranslations.page.thesis,
        description: { id: "Bimbingan tugas akhir mahasiswa dimana saya berperan sebagai pembimbing.", en: "Final year projects where I serve as a supervisor." },
        link: "/thesis/"
    },
    tutoring: {
        title: siteTranslations.page.tutoring,
        description: { id: "Layanan mentoring dan pengajaran teknis secara privat/personal.", en: "Personalized technical mentoring and private teaching services." },
        link: "/tutoring/"
    }
};

const projects = [
    {
        title: { id: "Fandi's Blog", en: "" },
        description: { id: "Tempatku berbagi cerita. Fokus utama pada kehidupan kampus, riset, dan pengabdian. Ditambah obrolan santai seputar finansial, travelling, dan pengembangan diri.", en: "My storytelling space. Focusing on campus life, research, and service, mixed with casual chats on finance, travel, and self-development." },
        links: [{ url: "https://lynk.id/fanblog", label: "Store" }, { url: "https://blog.fandipres.my.id", label: "Website" }],
        tags: ["Blog"]
    },
    {
        id: 3,
        title: { id: "Gudank Review", en: "" },
        description: { id: "Kanal visual untuk mengekspresikan kecintaan saya pada dunia teknologi.", en: "A visual outlet to express my passion for the tech world." },
        links: [{ url: "https://www.facebook.com/gudankreview", label: "Facebook" }, { url: "https://www.instagram.com/gudankreview", label: "Instagram" }, { url: "https://www.tiktok.com/@gudankreview", label: "Tiktok" }, { url: "https://www.youtube.com/@gudankreviewin", label: "YouTube" }],
        tags: ["Video"]
    },
    {
        id: 1,
        title: { id: "Hobi Ngoding", en: "" },
        description: { id: "Catatan hobi ngoding dari nol, oprek Unity dan Blogger. Berbagi trik jitu Adsense, tips Office, dan info tekno terbaru.", en: "Coding notes from scratch, tinkering with Unity and Blogger. Sharing AdSense tricks, Office tips, and the latest tech info." },
        links: [{ url: "https://www.facebook.com/hobingodingcom", label: "Facebook" }, { url: "https://www.instagram.com/hobingodingcom", label: "Instagram" }, { url: "https://www.tiktok.com/@hobingodingcom", label: "Tiktok" }, { url: "https://www.hobingoding.com", label: "Website" }, { url: "https://www.youtube.com/@hobingodingcom", label: "YouTube" }],
        tags: ["Blog", "Video"]
    },
    {
        id: 2,
        title: { id: "Jurnalpedia", en: "" },
        description: { id: "Pusat referensi jurnal ilmiah terakreditasi SINTA dan Scopus. Hub utama bagi mahasiswa, dosen, dan peneliti untuk publikasi ilmiah terpercaya.", en: "Reference center for SINTA and Scopus accredited journals. The main hub for students, lecturers, and researchers for trusted scientific publishing." },
        links: [{ url: "https://www.facebook.com/jurnalpediaofc", label: "Facebook" }, { url: "https://www.instagram.com/jurnalpediaofc", label: "Instagram" }, { url: "https://www.tiktok.com/@jurnalpediaofc", label: "Tiktok" }, { url: "https://jurnal.fandipres.my.id", label: "Website" }, { url: "https://www.youtube.com/@jurnalpediaofc", label: "YouTube" }],
        tags: ["Blog", "Video"]
    },
    {
        title: { id: "Kapitalin", en: "" },
        description: { id: "Alat web gratis untuk cek dan koreksi otomatis huruf kapital pada teks Bahasa Indonesia sesuai aturan EYD Edisi Kelima.", en: "Free web tool to automatically check and correct capitalization in Indonesian text based on the latest EYD rules." },
        links: [{ url: "https://fandipres.github.io/kapitalin", label: "Demo" }, { url: "https://github.com/fandipres/kapitalin", label: "GitHub" }],
        tags: ["Web"]
    },
    {
        title: { id: "Lyricspedia", en: "" },
        description: { id: "Jelajahi ribuan lirik lagu, mulai dari hits Indonesia dan Barat, hingga alunan merdu lagu-lagu daerah.", en: "Explore thousands of song lyrics, from Indonesian and Western hits to traditional local songs." },
        links: [{ url: "https://www.lyricspedia.my.id", label: "Website" }],
        tags: ["Blog"]
    },
    {
        title: { id: "Monitoring", en: "" },
        description: { id: "Monitoring adalah aplikasi web yang dibuat untuk memantau aktivitas di dalam ruangan lewat video real-time dari kamera menggunakan Detectron2.", en: "A web application designed to monitor indoor activities via real-time video feed using Detectron2." },
        links: [{ url: "https://github.com/fandipres/monitoring", label: "GitHub" }],
        tags: ["Web"]
    },
    {
        title: { id: "To-Do List", en: "" },
        description: { id: "Aplikasi web sederhana untuk mengelola daftar tugas personal. Dilengkapi otentikasi pengguna yang menjaga setiap daftar tugas tetap pribadi dan aman.", en: "A simple web app for managing personal tasks. Features user authentication to keep every task list private and secure." },
        links: [{ url: "https://github.com/fandipres/to-do-list", label: "GitHub" }],
        tags: ["Web"]
    },
    {
        title: { id: "Worshipedia", en: "" },
        description: { id: "Semua lirik pujian dan penyembahan Kristen ada di sini. Dari lagu sekolah minggu hingga hits terbaru, untuk mendukung ibadah dan imanmu.", en: "A collection of Christian praise and worship lyrics. From Sunday school songs to the latest hits, supporting your worship and faith." },
        links: [{ url: "https://www.worshipedia.my.id", label: "Website" }],
        tags: ["Blog"]
    },

];

const socialMedia = [
    { name: "Facebook", url: "https://facebook.com/fandipres", icon: '<svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"> <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /> </svg>' },
    { name: "Github", url: "https://github.com/fandipres", icon: '<svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"> <path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.1 7 9.4.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.9.1-.7.4-1.1.7-1.3-2.2-.2-4.5-1.1-4.5-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.5-1.3.1-2.8 0 0 .8-.2 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.2 2.7-1 2.7-1 .6 1.5.2 2.5.1 2.8a3.9 3.9 0 0 1 1 2.7c0 3.9-2.3 4.8-4.5 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4.1-1.3 7-5 7-9.4 0-5.5-4.5-10-10-10z" /> </svg>' },
    { name: "Instagram", url: "https://instagram.com/fandipres", icon: '<svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"> <path d="M12 2c2.7 0 3 0 4 .1 1 .1 1.5.2 2.1.4.6.2 1.1.5 1.6.9.4.4.7.9.9 1.6.2.6.3 1.1.4 2.1.1 1 .1 1.3.1 4s0 3-.1 4c-.1 1-.2 1.5-.4 2.1-.2.6-.5 1.1-.9 1.6-.4.4-.9.7-1.6.9-.6.2-1.1.3-2.1.4-1 .1-1.3.1-4 .1s-3 0-4-.1c-1-.1-1.5-.2-2.1-.4-.6-.2-1.1-.5-1.6-.9-.4-.4-.7-.9-.9-1.6-.2-.6-.3-1.1-.4-2.1-.1-1-.1-1.3-.1-4s0-3 .1-4c.1-1 .2-1.5 .4-2.1.2-.6 .5-1.1 .9-1.6.4-.4 .9-.7 1.6-.9 .6-.2 1.1-.3 2.1-.4 1-.1 1.3-.1 4-.1zm0-2c-2.8 0-3.1 0-4.1.1-1.1.1-1.9.2-2.8.5-.9.3-1.7.7-2.5 1.5-.8.8-1.2 1.6-1.5 2.5-.3.9-.4 1.7-.5 2.8-.1 1-.1 1.3-.1 4.1s0 3.1 .1 4.1c.1 1.1 .2 1.9 .5 2.8 .3 .9 .7 1.7 1.5 2.5 .8 .8 1.6 1.2 2.5 1.5 .9 .3 1.7 .4 2.8 .5 1 .1 1.3 .1 4.1 .1s3.1 0 4.1-.1c1.1-.1 1.9-.2 2.8-.5 .9-.3 1.7-.7 2.5-1.5 .8-.8 1.2-1.6 1.5-2.5 .3-.9 .4-1.7 .5-2.8 .1-1 .1-1.3 .1-4.1s0-3.1-.1-4.1c-.1-1.1-.2-1.9-.5-2.8-.3-.9-.7-1.7-1.5-2.5-.8-.8-1.6-1.2-2.5-1.5-.9-.3-1.7-.4-2.8-.5-1-.1-1.3-.1-4.1-.1zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-10a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" /> </svg>' },
    { name: "LinkedIn", url: "https://linkedin.com/in/fandipres", icon: '<svg class="w-10 h-10" fill="currentColor"viewBox="0 0 16 16"> <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/> </svg>' },
    { name: "Tiktok", url: "https://www.tiktok.com/@fandipres", icon: '<svg class="w-10 h-10" fill="currentColor" viewBox="0 0 32 32"> <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"> </path> </svg>' },
    { name: "Twitter", url: "https://twitter.com/fandipres", icon: '<svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"> <path d="M22 5.8a8.5 8.5 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.4 8.4 0 0 1-2.6 1 4.2 4.2 0 0 0-7.2 3.8 12 12 0 0 1-8.6-4.4 4.2 4.2 0 0 0 1.3 5.6 4.2 4.2 0 0 1-1.9-.5v.1a4.2 4.2 0 0 0 3.4 4.1 4.2 4.2 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9 8.4 8.4 0 0 1-5.2 1.8 12 12 0 0 0 6.5 1.9c7.8 0 12-6.5 12-12.1v-.6a8.5 8.5 0 0 0 2-2.2z" /> </svg>' },
    { name: "YouTube", url: "https://youtube.com/@fandipres", icon: '<svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"> <path d="M21.6 7.6c-.2-.8-.8-1.4-1.6-1.6-1.4-.4-7-.4-7-.4s-5.6 0-7 .4c-.8.2-1.4.8-1.6 1.6C4 9 4 12 4 12s0 3 .4 4.4c.2.8.8 1.4 1.6 1.6 1.4.4 7 .4 7 .4s5.6 0 7-.4c.8-.2 1.4-.8 1.6-1.6.4-1.4.4-4.4.4-4.4s0-3-.4-4.4zM10 15V9l6 3-6 3z" /> </svg>' }
];