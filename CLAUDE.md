# Konteks Proyek: fandipres.my.id

File ini dibaca otomatis oleh Claude Code di awal sesi. Perbarui bagian "Log pekerjaan" setiap selesai mengerjakan sesuatu supaya konteks tidak hilang.

## Gambaran singkat
- Situs portofolio akademik Fandi Presly Simamora (dosen Teknik Informatika, Universitas Mikroskil). Statis, di-host di GitHub Pages (domain pada `CNAME`, `.nojekyll`).
- Bahasa Indonesia adalah bahasa utama (`/...`). Bahasa Inggris ada di `/en/...` sebagai halaman statis terpisah.
- Data konten ada di `assets/js/data/**` sebagai array JS. Halaman HTML di root adalah template yang diisi oleh `build/prerender.js` (prerender untuk SEO). Browser juga merender ulang konten lewat `assets/js/scripts.js`.

## Struktur penting
- `assets/js/data/academic/*.js`: publications, teaching, research, community-service, thesis, competition, talks, books, intellectual-property, academic (kartu beranda).
- `assets/js/data/*.js`: education, experience, projects, social.
- `assets/js/i18n.js`: teks UI dua bahasa, `getVal()`, `t()`, `localizeHref()`. Bahasa ditentukan oleh URL (`/en/` = Inggris).
- `assets/js/render-core.js`: fungsi `build*Html` yang dipakai bersama oleh browser dan prerender. Juga berisi badge angka kartu beranda, filter publikasi, pembuat sitasi APA/BibTeX.
- `assets/js/render-publications.js`: dialog "Kutip" (hanya dimuat di halaman publikasi).
- `build/lib/load-data.js`: memuat semua file data ke satu vm context (dipakai prerender, lint, generator OG).
- `build/prerender.js`: membuat halaman ID dan `en/**`, meta SEO, hreflang, JSON-LD, sitemap, dan `build/lastmod.json`.
- `build/page-meta.js`: deskripsi dan keywords tiap halaman (id/en). Ubah teks meta di sini, bukan di HTML.
- `build/lint-data.js`: pemeriksaan data (spasi, em dash, "1 Classes", id ganda, relasi tidak timbal balik).
- `build/generate-og.js`: membuat favicon dan 28 gambar OG di `assets/img/og/` (jalankan manual dengan `npm run generate-assets`, hasilnya di-commit).
- `tailwind.config.js`, `assets/css/tailwind.src.css` -> `assets/css/tailwind.css` (hasil kompilasi, di-commit).
- `assets/css/fonts.css` + `assets/fonts/*.woff2`: font Inter dan Plus Jakarta Sans disimpan lokal.
- `.github/workflows/prerender.yml`: menjalankan `npm run build` di CI, lalu commit hasil dengan `[skip ci]` (ada rebase dan retry sebelum push).
- `notes/` di-gitignore (draf copywriting lokal).
- `community_service/` dan `ipr/` hanyalah redirect lama, jangan dihapus.

## Perintah
- `npm run build`: lint data, prerender ID + EN, kompilasi Tailwind. Wajib dijalankan setelah mengubah data, template HTML, atau class Tailwind. Hasilnya idempotent.
- `npm run lint`: hanya lint data.
- `npm run generate-assets`: buat ulang gambar OG dan favicon.

## Aturan yang harus diikuti
- Jangan pakai em dash (tanda hubung panjang) pada teks apa pun, baik Indonesia maupun Inggris. Pakai koma, titik dua, atau pecah kalimat. Lint akan gagal bila ada.
- Setiap field teks harus sesuai batas karakter platform aslinya (meta description sekitar 150-160 karakter).
- Entri baru wajib punya terjemahan `en`. Kalau mata kuliah/kategori sudah pernah ada, pakai terjemahan yang sudah ada.
- Gunakan "1 Class" (bukan "1 Classes") untuk bahasa Inggris.
- Jangan commit atau push kecuali diminta pengguna.
- Balasan ke pengguna memakai bahasa Indonesia.
- Jangan hapus atau ubah `[skip ci]` pada commit prerender.

## Format data (ringkas)
- Teks dua bahasa: `{ id: "...", en: "..." }`. `getVal()` jatuh ke `id` bila `en` kosong (judul artikel berbahasa Inggris memang `en: ""`).
- Pengajaran: `year: "2025 - 2026"`, `semester: "ganjil" | "genap"`, `classes: [{id, en}]`. Genap diurutkan sebelum ganjil dalam satu tahun.
- Publikasi: `id` (slug, dipakai untuk anchor `/publications/#id` dan sitasi), `rank` (mis. Sinta 3), `category`, `team[]`, `assets.article`, `assets.doi` (URL penuh `https://doi.org/...`).

## Gotcha untuk Claude
- Jangan menambal file lewat heredoc `node - <<EOF` yang berisi backslash (regex, `\n`): backslash bisa hilang atau berubah. Pakai tool Edit/Write.
- Tool Bash di sini memakai `/tmp` yang berbeda dari `/tmp` milik Node (Windows). Taruh skrip bantu di scratchpad sesi.
- Chromium Playwright di mesin ini rusak (chrome.dll hilang). Untuk uji browser pakai Microsoft Edge: `C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe` lewat `playwright-core` (diinstal di scratchpad, bukan di proyek).
- Tailwind v3 (`tailwindcss@3.4.17`). Class yang dibuat dinamis di JS terdeteksi karena `assets/js/**` ikut di-scan.

## Log pekerjaan

### Sesi 31 Okt 2026
Data:
- Publikasi baru "Pembekalan Guru Dengan Teknologi Masa Depan: Kecerdasan Artifisial" (Jurnal Masyarakat Mandiri, Sinta 3, Pengabdian Penugasan, tim Elly, Erwin, Yuni, Sabrina, Fandi). DOI 10.31764/jmm.v10i4.40565.
- Pengajaran 2026 - 2027 ganjil: Pengembangan Aplikasi Mobile Front-End (Teknik Informatika, 1 kelas) dan Pengembangan Karakter: Kepemimpinan (Teknik Informatika, 2 kelas). Tahun/semester adalah asumsi (tanggal sesi 31 Okt 2026).
- Terjemahan EN ditambahkan untuk 3 judul publikasi berbahasa Indonesia dan 3 judul skripsi. Perbaikan "1 Classes" dan spasi di depan "Character Development: Leadership".

Peningkatan situs (11 butir, semua selesai dan sudah diuji di Edge):
1. Tailwind CDN diganti `assets/css/tailwind.css` (sekitar 28 KB).
2. Ikon ORCID/ResearchGate/Scholar/SINTA disimpan di `assets/img/icons/`.
3. Font disimpan lokal (varian variable, subset latin) dengan preload.
4. Workflow: concurrency, cache npm, `git pull --rebase -X theirs` dengan retry.
5. JSON-LD: Person + WebSite (beranda), BreadcrumbList (semua halaman dalam), ScholarlyArticle (publikasi), Course (pengajaran).
6. Gambar OG 1200x630 per halaman dan bahasa, favicon.ico + PNG + apple-touch-icon.
7. Halaman `/en/**` dengan hreflang, canonical sendiri, tombol bahasa yang berpindah URL (preferensi disimpan di `localStorage.site_lang`; pengunjung yang pernah memilih EN dialihkan ke `/en/`).
8. `lastmod` sitemap per halaman lewat hash di `build/lastmod.json`. `changefreq` dan `priority` dibuang.
9. `build/lint-data.js` dijalankan di awal `npm run build`.
10. Filter/pencarian publikasi: chip lalu toolbar sudah dicoba dan DIHAPUS atas permintaan pengguna (daftar publikasi polos, tanpa filter; jangan dibuat lagi tanpa diminta), tombol Kutip (APA dan BibTeX), dukungan DOI, ringkasan angka (awalnya section tersendiri, lalu DIPINDAH jadi satu baris kecil di bawah judul 9 kartu Aktivitas Akademik, mis. "7 mata kuliah" (`buildCountLineHtml`). Overlay badge dan watermark numeral besar sudah dicoba dan ditolak pengguna, jangan dicoba lagi. Kartu Pengajaran menampilkan TOTAL KELAS (jumlah semua "(N Kelas)" di teaching.js, saat ini 23), pilihan pengguna. Lint mewajibkan tiap entri pengajaran punya "(N Kelas)" karena duplikat; section `#sect-stats` sudah dihapus. Angka dihitung di `computeAcademicCounts()`, satuan di `siteTranslations.counts`).
11. Tautan silang artikel <-> kegiatan: DIBATALKAN atas permintaan pengguna. Kodenya (`related`, id di penelitian/pengabdian, link di renderer, aturan lint) sudah dihapus. Jangan dibuat lagi tanpa diminta.


## Belum selesai / perlu keputusan pengguna
- ABSA LDA-SVM (Building of Informatics, Technology and Science) belum punya link artikel dan DOI. Semua publikasi lain sudah punya DOI (2 artikel BERNAS diisi pengguna: jb.v7i2.17373 dan jb.v7i2.17324).
- Belum ada perubahan yang di-commit. Hasil prerender, `en/`, CSS, gambar OG, dan file baru lain masih berstatus untracked/modified di working tree.
- Google Analytics tetap aktif tanpa banner persetujuan (belum dibahas).
- Hosting GitHub Pages (mode branch) menyajikan SEMUA file repo. Sudah dicek di situs live: `/.claude/settings.local.json`, `/build/prerender.js`, `/package.json`, `/README.md` bisa diakses publik. `.claude/` sudah di-ignore dan di-untrack (staged, belum commit). Saran lanjutan: pindah ke deploy lewat GitHub Actions yang hanya mengunggah file situs (butuh pengguna mengganti Settings > Pages > Source ke "GitHub Actions"; jangan ubah workflow sebelum itu).

### SEO tambahan (1 Nov 2026)
- Judul beranda: hanya nama "Fandi Presly Simamora" (ID dan EN), atas permintaan pengguna karena belum menentukan branding. Deskriptor yang sempat dicoba: "- Dosen Teknik Informatika Mikroskil" (58 karakter). Judul halaman dalam tetap pendek ("Publikasi - Fandi Presly Simamora"); jaga di bawah 60 karakter.
- Foto profil: tidak lazy, punya width/height, `fetchpriority="high"` di header (diatur di `normalizeHead` pada prerender). Gambar proyek punya width/height 800x450.
- JSON-LD Course kini punya `description` dan provider dengan URL. Ditambah `og:image:alt`, `twitter:image:alt`, `theme-color`.
- Setelah live: kirim sitemap ke Google Search Console dan minta pengindeksan `/` dan `/en/`.
