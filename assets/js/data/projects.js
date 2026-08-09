const projects = [
    {
        id: 1,
        title: "Extra",
        description: {
            short: { id: "Aplikasi pencatatan keuangan pribadi untuk memantau pengeluaran dan investasi.", en: "A personal finance app for tracking expenses and monitoring investments." },
            long: { id: "Extra membantu mencatat pengeluaran harian, memantau perkembangan portofolio investasi, dan menyusun rencana keuangan pribadi menuju kebebasan finansial jangka panjang.", en: "Extra helps you log daily expenses, track the growth of your investment portfolio, and build a personal financial plan toward long-term financial freedom." }
        },
        links: [{ url: "https://extra.fandipres.my.id", label: "Website" }, { url: "", label: "Android" }],
        tags: ["Android"]
    },
    {
        title: "Fandi's Blog",
        description: {
            short: { id: "Blog pribadi berisi tulisan, review, dan cerita ringan seputar keseharian.", en: "A personal blog featuring writing, reviews, and light everyday stories." },
            long: { id: "Fandi's Blog memuat tulisan pribadi, review buku dan produk sehari-hari, serta cerita ringan seputar keseharian yang ditulis dengan gaya santai untuk para pembaca setia.", en: "Fandi's Blog features personal writing, everyday book and product reviews, and light casual stories written for its loyal readers over the years." }
        },
        links: [{ url: "https://blog.fandipres.my.id", label: "Website" }, { url: "https://lynk.id/fanblog", label: "Store" }],
        image: "/assets/img/projects/fandis-blog.webp",
        tags: ["Blog"]
    },
    {
        title: "Gudank Review",
        description: {
            short: { id: "Kanal media sosial berisi review produk-produk gudang secara santai dan apa adanya.", en: "A social channel reviewing warehouse products in a casual, no-frills style." },
            long: { id: "Gudank Review menghadirkan ulasan jujur berbagai produk gudang lewat konten video dan thread singkat di Facebook, Instagram, Threads, TikTok, dan YouTube.", en: "Gudank Review shares honest reviews of various warehouse products through short-form videos and threads on Facebook, Instagram, Threads, TikTok, and YouTube." }
        },
        links: [{ url: "https://www.facebook.com/gudankreview", label: "Facebook" }, { url: "https://www.instagram.com/gudankreview", label: "Instagram" }, { url: "https://www.threads.net/@gudankreview", label: "Threads" }, { url: "https://www.tiktok.com/@gudankreview", label: "Tiktok" }, { url: "https://www.youtube.com/@gudankreviewin", label: "YouTube" }],
        image: "/assets/img/projects/gudank-review.webp",
        tags: ["Content"]
    },
    {
        id: 2,
        title: "Hobi Ngoding",
        description: {
            short: { id: "Konten edukasi pemrograman untuk pemula lewat tulisan blog dan video ringan.", en: "Beginner-friendly coding content through blog posts and light videos." },
            long: { id: "Hobi Ngoding menyajikan materi belajar pemrograman untuk pemula lewat tulisan blog dan video tutorial ringan di Facebook, Instagram, TikTok, dan YouTube.", en: "Hobi Ngoding shares beginner-friendly programming lessons through blog posts and light tutorial videos across Facebook, Instagram, TikTok, and YouTube." }
        },
        links: [{ url: "https://www.hobingoding.com", label: "Website" }, { url: "https://www.facebook.com/hobingodingcom", label: "Facebook" }, { url: "https://www.instagram.com/hobingodingcom", label: "Instagram" }, { url: "https://www.tiktok.com/@hobingodingcom", label: "Tiktok" }, { url: "https://www.youtube.com/@hobingodingcom", label: "YouTube" }],
        image: "/assets/img/projects/hobi-ngoding.webp",
        tags: ["Blog", "Content"]
    },
    {
        id: 3,
        title: "Jurnalpedia",
        description: {
            short: { id: "Platform edukasi seputar publikasi ilmiah untuk mahasiswa dan peneliti.", en: "An education platform on academic publishing for students and researchers." },
            long: { id: "Jurnalpedia menghadirkan panduan publikasi ilmiah, tips menembus jurnal, dan info seputar dunia akademik lewat aplikasi Android, website, dan media sosial.", en: "Jurnalpedia offers guidance on academic publishing, tips for getting published in journals, and academic insights through its Android app, website, and social media." }
        },
        links: [{ url: "https://www.jurnalpedia.my.id", label: "Website" }, { url: "https://play.google.com/store/apps/details?id=com.jurnalpedia.app", label: "Android" }, { url: "https://www.facebook.com/jurnalpediaofc", label: "Facebook" }, { url: "https://www.instagram.com/jurnalpediaofc", label: "Instagram" }, { url: "https://www.tiktok.com/@jurnalpediaofc", label: "Tiktok" }, { url: "https://www.youtube.com/@jurnalpediaofc", label: "YouTube" }],
        image: "/assets/img/projects/jurnalpedia.webp",
        tags: ["Android", "Blog", "Content"]
    },
    {
        title: "Kapitalin",
        description: {
            short: { id: "Alat web untuk cek dan koreksi otomatis huruf kapital sesuai EYD.", en: "A web tool that checks and auto-corrects Indonesian capitalization." },
            long: { id: "Kapitalin memeriksa dan mengoreksi otomatis penggunaan huruf kapital pada teks Bahasa Indonesia sesuai aturan Ejaan Bahasa Indonesia (EYD) Edisi Kelima.", en: "Kapitalin automatically checks and corrects capitalization in Indonesian text based on the latest Indonesian Spelling System (EYD), 5th Edition." }
        },
        links: [{ url: "http://kapitalin.fandipres.my.id", label: "Website" }, { url: "https://github.com/fandipres/kapitalin", label: "GitHub" }],
        image: "/assets/img/projects/kapitalin.webp",
        tags: ["Web"]
    },
    {
        title: "Lyric Formatter",
        description: {
            short: { id: "Alat web untuk memformat lirik lagu secara otomatis sesuai kaidah EYD.", en: "A web tool for automatically formatting song lyrics to Indonesian EYD spelling rules." },
            long: { id: "Lyric Formatter memformat lirik lagu secara otomatis lewat kapitalisasi sesuai EYD, penghapusan tanda baca, dan konversi ke HTML, dibangun dengan Vanilla JS dan Tailwind CSS tanpa perlu server.", en: "Lyric Formatter automatically formats song lyrics with EYD-based capitalization, punctuation removal, and HTML conversion, built with Vanilla JS and Tailwind CSS entirely client-side." }
        },
        links: [{ url: "https://fandipres.github.io/lyric-formatter", label: "Website" }, { url: "https://github.com/fandipres/lyric-formatter", label: "GitHub" }],
        image: "/assets/img/projects/lyric-formatter.webp",
        tags: ["Web"]
    },
    {
        title: "Lyricspedia",
        description: {
            short: { id: "Website pencarian ribuan lirik lagu Indonesia, Barat, dan lagu daerah lokal.", en: "A website for searching thousands of Indonesian, Western, and local song lyrics." },
            long: { id: "Lyricspedia menghadirkan koleksi ribuan lirik lagu, mulai dari hits Indonesia dan Barat hingga lagu daerah lokal, lengkap dengan fitur pencarian yang mudah digunakan.", en: "Lyricspedia offers a growing collection of song lyrics, from Indonesian and Western hits to local regional songs, complete with an easy-to-use search feature." }
        },
        links: [{ url: "https://www.lyricspedia.my.id", label: "Website" }],
        image: "/assets/img/projects/lyricspedia.webp",
        tags: ["Blog"]
    },
    {
        title: "Mockup Generator",
        description: {
            short: { id: "Alat otomatis untuk membuat mockup thumbnail proyek dengan frame browser, phone, dan tablet.", en: "An automatic tool for generating on-brand thumbnail mockups with browser, phone, and tablet frames." },
            long: { id: "Mockup Generator adalah alat Node.js yang membuat mockup thumbnail proyek secara otomatis dan konsisten lewat frame browser, phone, dan tablet, dilengkapi web UI serta CLI tanpa perlu desain manual.", en: "Mockup Generator is a Node.js tool that automatically creates consistent, on-brand thumbnail mockups using browser, phone, and tablet frames, complete with both a web UI and a CLI so no manual design work is needed." }
        },
        links: [{ url: "https://github.com/fandipres/mockup-generator", label: "GitHub" }],
        image: "/assets/img/projects/mockup-generator.webp",
        tags: ["Web"]
    },
    {
        title: "Monitoring",
        description: {
            short: { id: "Aplikasi web untuk memantau aktivitas di dalam ruangan lewat video real-time.", en: "A web app that monitors indoor activity through real-time camera video." },
            long: { id: "Monitoring memantau aktivitas di dalam ruangan secara real-time lewat video kamera, memanfaatkan model deteksi objek Detectron2 untuk mengenali pergerakan secara otomatis.", en: "Monitoring tracks indoor activity in real time through camera video, using the Detectron2 object detection model to automatically recognize movement." }
        },
        links: [{ url: "https://github.com/fandipres/monitoring", label: "GitHub" }],
        image: "/assets/img/projects/monitoring.webp",
        tags: ["Web"]
    },
    {
        id: 4,
        title: "SIMPRODI",
        description: {
            short: { id: "Portal akademik berbasis Google Apps Script untuk capaian dan showcase mahasiswa.", en: "An academic portal built on Google Apps Script for student achievements and showcases." },
            long: { id: "SIMPRODI merangkum capaian dan showcase mahasiswa, tes peminatan, serta rekap BA program studi dalam satu portal akademik berbasis Google Apps Script.", en: "SIMPRODI brings together student achievements, project showcases, interest tests, and BA recap data into a single academic portal built on Google Apps Script." }
        },
        links: [{ url: "https://simprodi.fandipres.my.id/", label: "Website" }, { url: "https://github.com/fandipres/simprodi-public", label: "GitHub" }],
        image: "/assets/img/projects/simprodi.webp",
        tags: ["Web"]
    },
    {
        title: "Special Day",
        description: {
            short: { id: "Aplikasi web hitung mundur sederhana untuk menantikan momen-momen spesialmu.", en: "A simple web app that counts down to your special upcoming moments." },
            long: { id: "Special Day membantu menghitung mundur hari menuju momen-momen spesial seperti ulang tahun, pernikahan, atau perayaan penting lainnya secara sederhana dan praktis.", en: "Special Day helps you count down the days to special moments like birthdays, weddings, or other important celebrations in a simple, practical way." }
        },
        links: [{ url: "https://fandipres.github.io/special-day", label: "Website" }, { url: "https://github.com/fandipres/special-day", label: "GitHub" }],
        image: "/assets/img/projects/special-day.webp",
        tags: ["Web"]
    },
    {
        title: "To-Do List",
        description: {
            short: { id: "Aplikasi web sederhana untuk mengelola dan melacak daftar tugas personal.", en: "A simple web app for organizing and tracking personal to-do lists." },
            long: { id: "To-Do List membantu mengelola daftar tugas personal secara sederhana, dilengkapi otentikasi pengguna agar setiap daftar tugas tetap pribadi dan aman.", en: "To-Do List helps you manage personal task lists with a simple interface, featuring user authentication to keep every list private and secure." }
        },
        links: [{ url: "https://github.com/fandipres/to-do-list", label: "GitHub" }],
        image: "/assets/img/projects/to-do-list.webp",
        tags: ["Web"]
    },
    {
        title: "Worshipedia",
        description: {
            short: { id: "Kumpulan lirik lagu rohani dan pujian Kristen untuk mengiringi ibadahmu.", en: "A collection of Christian worship and praise song lyrics for your devotion." },
            long: { id: "Worshipedia menghimpun kumpulan lirik lagu rohani dan pujian Kristen dari berbagai gereja dan penyanyi, membantu mengiringi ibadah dan saat teduh sehari-hari.", en: "Worshipedia gathers Christian worship and praise song lyrics from various churches and artists, helping accompany your daily devotion and worship time." }
        },
        links: [{ url: "https://www.worshipedia.my.id", label: "Website" }],
        image: "/assets/img/projects/worshipedia.webp",
        tags: ["Blog"]
    },
];
