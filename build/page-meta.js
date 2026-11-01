// Per-page SEO copy in both languages. Single source for <meta description>, keywords, og:* and twitter:*.
// Style rules: no em dash, descriptions around 150-160 characters.
const NAME_KEYWORDS_ID = 'Fandi Presly Simamora, Fandi Presly, Fandi Simamora, fandipres';
const NAME_KEYWORDS_EN = 'Fandi Presly Simamora, Fandi Presly, Fandi Simamora, fandipres';

const PAGE_META = {
    home: {
        description: {
            id: 'Fandi Presly Simamora, Dosen Teknik Informatika Universitas Mikroskil, peneliti, dan pengembang aplikasi. Jelajahi publikasi, penelitian, dan proyek saya.',
            en: 'Fandi Presly Simamora, Informatics Engineering lecturer at Mikroskil University, researcher, and app developer. Explore my publications, research, and projects.'
        },
        keywords: {
            id: `${NAME_KEYWORDS_ID}, dosen Universitas Mikroskil, dosen Teknik Informatika, peneliti, pengembang aplikasi`,
            en: `${NAME_KEYWORDS_EN}, Mikroskil University lecturer, Informatics Engineering lecturer, researcher, app developer`
        }
    },
    books: {
        description: {
            id: 'Jelajahi karya tulis Fandi Presly Simamora dalam format buku dan book chapter, dengan fokus pada topik teknologi informasi dan pendidikan digital.',
            en: 'Explore the books and book chapters written by Fandi Presly Simamora, focusing on information technology and digital education.'
        },
        keywords: {
            id: `${NAME_KEYWORDS_ID}, buku, book chapter, penulis buku, teknologi informasi`,
            en: `${NAME_KEYWORDS_EN}, books, book chapter, author, information technology`
        }
    },
    communityService: {
        description: {
            id: 'Kumpulan kegiatan pengabdian masyarakat oleh Fandi Presly Simamora, termasuk workshop koding dan pelatihan literasi digital untuk komunitas.',
            en: 'Community service activities by Fandi Presly Simamora, including coding workshops and digital literacy training for teachers and communities.'
        },
        keywords: {
            id: `${NAME_KEYWORDS_ID}, pengabdian masyarakat, workshop, pelatihan guru, literasi digital`,
            en: `${NAME_KEYWORDS_EN}, community service, workshop, teacher training, digital literacy`
        }
    },
    competition: {
        description: {
            id: 'Daftar tim mahasiswa yang dibimbing Fandi Presly Simamora dalam kompetisi seperti Program Kreativitas Mahasiswa (PKM) dan lomba sejenis lainnya.',
            en: 'Student teams mentored by Fandi Presly Simamora in competitions such as the Student Creativity Program (PKM) and similar contests.'
        },
        keywords: {
            id: `${NAME_KEYWORDS_ID}, bimbingan lomba, PKM, Program Kreativitas Mahasiswa, kompetisi mahasiswa`,
            en: `${NAME_KEYWORDS_EN}, competition mentoring, PKM, Student Creativity Program, student competition`
        }
    },
    cv: {
        description: {
            id: 'Curriculum Vitae Fandi Presly Simamora: riwayat pendidikan, pengalaman, dan aktivitas akademik lengkap.',
            en: 'Curriculum Vitae of Fandi Presly Simamora: complete education, experience, and academic activity history.'
        },
        keywords: {
            id: `${NAME_KEYWORDS_ID}, curriculum vitae, CV dosen, unduh CV`,
            en: `${NAME_KEYWORDS_EN}, curriculum vitae, lecturer CV, download CV`
        }
    },
    education: {
        description: {
            id: 'Latar belakang akademis Fandi Presly Simamora, dari Sarjana Teknik Informatika (S.Kom.) hingga Magister Teknologi Informasi (M.Kom.) di Universitas Mikroskil.',
            en: 'Education of Fandi Presly Simamora at Mikroskil University: Bachelor of Informatics Engineering (S.Kom.) and Master of Information Technology (M.Kom.).'
        },
        keywords: {
            id: `${NAME_KEYWORDS_ID}, pendidikan, S2 Teknologi Informasi, S1 Teknik Informatika, Universitas Mikroskil`,
            en: `${NAME_KEYWORDS_EN}, education, Master of Information Technology, Bachelor of Informatics Engineering, Mikroskil University`
        }
    },
    experience: {
        description: {
            id: 'Lihat riwayat pengalaman kerja Fandi Presly Simamora, dari perannya sebagai asisten lab hingga menjadi dosen di Universitas Mikroskil.',
            en: 'Work experience of Fandi Presly Simamora, from lab assistant to lecturer at Mikroskil University.'
        },
        keywords: {
            id: `${NAME_KEYWORDS_ID}, pengalaman kerja, dosen, riwayat karir`,
            en: `${NAME_KEYWORDS_EN}, work experience, lecturer, career history`
        }
    },
    ipr: {
        description: {
            id: 'Daftar Hak Kekayaan Intelektual (HaKI) milik Fandi Presly Simamora, mencakup hak cipta buku dan program komputer yang terdaftar di DJKI Indonesia.',
            en: 'Intellectual property rights of Fandi Presly Simamora, covering book copyrights and computer programs registered with DJKI Indonesia.'
        },
        keywords: {
            id: `${NAME_KEYWORDS_ID}, HaKI, hak cipta, DJKI, kekayaan intelektual`,
            en: `${NAME_KEYWORDS_EN}, intellectual property, copyright, DJKI, IP rights`
        }
    },
    projects: {
        description: {
            id: 'Jelajahi portofolio proyek Fandi Presly Simamora: aplikasi web, Android, blog, dan konten digital seperti Extra, Jurnalpedia, Kapitalin, dan lainnya.',
            en: 'Explore the project portfolio of Fandi Presly Simamora: web apps, Android apps, blogs, and digital content such as Extra, Jurnalpedia, Kapitalin, and more.'
        },
        keywords: {
            id: `${NAME_KEYWORDS_ID}, portofolio proyek, aplikasi web, aplikasi Android, developer`,
            en: `${NAME_KEYWORDS_EN}, project portfolio, web apps, Android apps, developer`
        }
    },
    publications: {
        description: {
            id: 'Temukan kumpulan publikasi ilmiah oleh Fandi Presly Simamora yang telah terbit di berbagai jurnal terakreditasi Sinta dan prosiding konferensi nasional.',
            en: 'Scientific publications by Fandi Presly Simamora in Sinta-accredited journals and national conference proceedings, with DOI and citation formats.'
        },
        keywords: {
            id: `${NAME_KEYWORDS_ID}, publikasi ilmiah, jurnal Sinta, artikel ilmiah`,
            en: `${NAME_KEYWORDS_EN}, scientific publications, Sinta journals, research articles`
        }
    },
    research: {
        description: {
            id: 'Jelajahi daftar proyek penelitian yang dikerjakan oleh Fandi Presly Simamora, termasuk riset internal universitas dan hibah penelitian dosen pemula (PDP).',
            en: 'Research projects led by Fandi Presly Simamora, including university research and novice lecturer research grants (PDP).'
        },
        keywords: {
            id: `${NAME_KEYWORDS_ID}, penelitian, riset, machine learning, topic modeling`,
            en: `${NAME_KEYWORDS_EN}, research, machine learning, topic modeling`
        }
    },
    talks: {
        description: {
            id: 'Daftar pengalaman Fandi Presly Simamora sebagai pembicara dan narasumber di berbagai seminar, webinar, dan acara teknologi.',
            en: 'Speaking experience of Fandi Presly Simamora as a speaker and resource person at seminars, webinars, and technology events.'
        },
        keywords: {
            id: `${NAME_KEYWORDS_ID}, pembicara, narasumber, workshop, seminar teknologi`,
            en: `${NAME_KEYWORDS_EN}, speaker, resource person, workshop, technology seminar`
        }
    },
    teaching: {
        description: {
            id: 'Daftar mata kuliah yang diampu oleh Fandi Presly Simamora di Universitas Mikroskil, beserta deskripsi singkat dan topik yang dibahas.',
            en: 'Courses taught by Fandi Presly Simamora at Mikroskil University, with short descriptions and topics covered.'
        },
        keywords: {
            id: `${NAME_KEYWORDS_ID}, mata kuliah, pengajaran, dosen Teknik Informatika, Universitas Mikroskil`,
            en: `${NAME_KEYWORDS_EN}, courses, teaching, Informatics Engineering lecturer, Mikroskil University`
        }
    },
    thesis: {
        description: {
            id: 'Daftar skripsi mahasiswa Teknik Informatika Universitas Mikroskil yang dibimbing oleh Fandi Presly Simamora, lengkap dengan judul dan tim penyusun.',
            en: 'Undergraduate theses of Informatics Engineering students at Mikroskil University supervised by Fandi Presly Simamora, with titles and author teams.'
        },
        keywords: {
            id: `${NAME_KEYWORDS_ID}, bimbingan skripsi, tugas akhir, dosen pembimbing, Teknik Informatika`,
            en: `${NAME_KEYWORDS_EN}, thesis supervision, final project, supervisor, Informatics Engineering`
        }
    }
};

module.exports = { PAGE_META };
