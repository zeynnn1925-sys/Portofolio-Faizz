export interface CopyContent {
  title: string;
  subtitle: string;
  paragraphs: string[];
  meta?: { label: string; value: string }[];
  actionLabel?: string;
  actionHref?: string;
  externalLink?: boolean;
}

export const ROOM_COPY: Record<string, CopyContent> = {
  overview: {
    title: "Kamar Kerja Zeynn",
    subtitle: "Dua Dunia: Dari Arsip Analog ke Sistem Digital",
    paragraphs: [
      "Selamat datang di kamar kerja interaktif Muhammad Faiz Dzahin (Zeynn). Di sinilah ketelitian administrasi konvensional bertemu dengan kecintaan pada rekayasa perangkat lunak modern.",
      "Ruang ini dibuat sepenuhnya dengan Three.js procedural tanpa model eksternal. Klik objek apa saja di dalam kamar untuk mengarahkan kamera, atau pilih navigasi di panel samping.",
    ],
    meta: [
      { label: "Lokasi", value: "Indramayu & Digital Space" },
      { label: "Peran", value: "Web Developer & Pembangun Sistem" },
      { label: "Navigasi", value: "Klik objek / Tombol navigasi / Esc" },
    ],
  },
  poster: {
    title: "Muhammad Faiz Dzahin (Zeynn)",
    subtitle: "Web Developer Otodidak & Pengembang Sistem",
    paragraphs: [
      "Saya adalah pengembang web otodidak yang mengawali perjalanan dari disiplin administrasi tata usaha dan pembukuan di Ma'had Al-Zaytun.",
      "Bagi saya, kerapian baris kode sama pentingnya dengan keakuratan angka di buku besar. Saya terbiasa menyusun struktur data yang bersih, arsitektur frontend yang intuitif, serta sistem otomasi yang nyata mengurangi beban kerja manual.",
    ],
    meta: [
      { label: "Prinsip", value: "Rapi, Terstruktur, Teruji" },
      { label: "Pendidikan", value: "MAS Ma'had Al-Zaytun" },
      { label: "Fokus", value: "Full-Stack Web & EdTech" },
    ],
    actionLabel: "Buka Profil Lengkap",
    actionHref: "#about",
  },
  buku_laptop: {
    title: "Momen Morph: Analog → Digital",
    subtitle: "Dua Sisi Satu Disiplin",
    paragraphs: [
      "Buku kasir dan berkas formulir kertas tidak pernah hilang—mereka bermutasi menjadi baris kode, basis data relasional, dan antarmuka web modern.",
      "Satu sentuhan mengubah buku besar yang terbentang di atas meja menjadi laptop kerja dengan kode yang mengalir aktif, dan lemari arsip menjadi server terstruktur.",
    ],
    meta: [
      { label: "Analog", value: "Buku Besar & Nota Kasir" },
      { label: "Digital", value: "Laptop Dev & Script Web" },
    ],
  },
  monitor: {
    title: "Monitor Kerja & Demo Proyek",
    subtitle: "Karya Nyata yang Berjalan",
    paragraphs: [
      "Monitor menampilkan proyek-proyek yang telah saya bangun:",
      "1. LifeFlow System — platform produktivitas dan manajemen finansial pribadi all-in-one dengan AI Daily Planner.",
      "2. OPMAZ Admin Hub — sistem dasbor administrasi terpusat untuk mendata 200+ arsip santri dan perizinan resmi.",
      "3. Dynamic Notula & Mail Sync — otomatisasi persuratan massal dan sinkronisasi notulen rapat.",
    ],
    meta: [
      { label: "Unggulan", value: "LifeFlow System" },
      { label: "Teknologi", value: "React 19, TypeScript, Tailwind" },
    ],
    actionLabel: "Lihat Semua Proyek",
    actionHref: "#projects",
  },
  posters_project: {
    title: "Galeri Poster Proyek",
    subtitle: "Arsitektur & Dokumentasi Solusi",
    paragraphs: [
      "Di dinding kanan terpajang cetak biru tiga aplikasi utama: sistem manajemen keuangan LifeFlow, purwarupa portal santri Al-Zaytun, serta katalog interaktif Kamen Rider.",
      "Masing-masing proyek mencerminkan ketelitian dalam menyusun logika alur kerja serta responsivitas tampilan.",
    ],
    actionLabel: "Jelajahi Proyek",
    actionHref: "#projects",
  },
  papan_gabus: {
    title: "Papan Gabus & Roadmap",
    subtitle: "Catatan Riset, Ide & Backlog",
    paragraphs: [
      "Papan gabus berisi sticky notes rencana fitur, catatan rumus Excel tingkat lanjut, serta diagram relasi entitas untuk aplikasi kasir dan e-learning.",
      "Semua ide besar selalu dimulai dari catatan kecil yang dipetakan secara teratur.",
    ],
    meta: [
      { label: "Status", value: "Aktif dikembangkan" },
      { label: "Metode", value: "Iteratif & Terstruktur" },
    ],
  },
  lemari_server: {
    title: "Lemari Arsip & Server Kearsipan",
    subtitle: "Pengalaman Nyata Mengelola Dokumen Skala Ratusan",
    paragraphs: [
      "Sebagai Sekretaris Utama Organisasi Pelajar Ma'had Al-Zaytun (OPMAZ), saya bertanggung jawab mengelola lebih dari 200 berkas resmi, mengoordinasikan 30+ agenda rapat tahunan, dan memastikan 100% perizinan selesai tepat waktu.",
      "Pengalaman nyata di lapangan inilah yang membentuk kepekaan saya dalam membangun sistem yang kokoh dan tahan uji.",
    ],
    meta: [
      { label: "Organisasi", value: "OPMAZ (2024 - 2025)" },
      { label: "Arsip", value: "200+ Berkas Surat" },
      { label: "Perizinan", value: "100% Tepat Waktu" },
    ],
    actionLabel: "Baca Detail Pengalaman",
    actionHref: "#experience",
  },
  sertifikat: {
    title: "Kertas Ketikan Pengalaman",
    subtitle: "Naskah Mesin Tik Rekam Jejak",
    paragraphs: [
      "Di dinding kiri tertempel tiga naskah ketikan bergaya typewriter:",
      "• Lembar 1: Profil & Riwayat Pendidikan di Ma'had Al-Zaytun.",
      "• Lembar 2: Tanggung Jawab Kearsipan & Surat-Menyurat OPMAZ.",
      "• Lembar 3: Portofolio Proyek Web, Otomasi Mail Merge, dan Lomba.",
    ],
    actionLabel: "Buka Halaman Pengalaman",
    actionHref: "#experience",
  },
  rak_buku: {
    title: "Rak Buku Keahlian & Teknologi",
    subtitle: "Pustaka Pengetahuan yang Dipelajari",
    paragraphs: [
      "Setiap buku di rak mewakili alat dan teknologi yang saya gunakan sehari-hari:",
      "Mulai dari bahasa pemrograman (TypeScript, JavaScript, Python), framework modern (React, Tailwind), basis data relasional, hingga ketrampilan perkantoran lanjutan (Word Mail Merge, Excel VLOOKUP/Data Validation).",
    ],
    meta: [
      { label: "Frontend", value: "React, Tailwind, Three.js" },
      { label: "Backend", value: "TypeScript, Python, SQL" },
      { label: "Administrasi", value: "Excel Formula, Mail Merge" },
    ],
    actionLabel: "Lihat Matriks Keahlian",
    actionHref: "#skills",
  },
  telepon: {
    title: "Telepon & Kanal Komunikasi",
    subtitle: "Mari Membangun Sesuatu yang Bermanfaat",
    paragraphs: [
      "Tertarik berkolaborasi membangun sistem informasi yang rapi, aplikasi web responsif, atau platform pembelajaran digital?",
      "Saya terbuka untuk peluang kerja sama proyek, magang, maupun diskusi teknis.",
    ],
    meta: [
      { label: "GitHub", value: "github.com/zeynnn1925-sys" },
      { label: "LinkedIn", value: "Muhammad Faiz Dzahin" },
      { label: "Instagram", value: "@opmaz_official" },
    ],
    actionLabel: "Kirim Pesan / Kontak",
    actionHref: "#contact",
  },
  saklar: {
    title: "Saklar Lampu Kamar",
    subtitle: "Atur Suasana Ruang Kerja",
    paragraphs: [
      "Klik saklar ini atau tekan huruf 'L' di keyboard untuk mengganti suasana kamar.",
      "Saat lampu dimatikan, neon ambient 'zeynn.dev' akan menyala pendar di dinding, lampu meja menyorot keyboard, dan lampu hias kelap-kelip menerangi langit-langit kamar.",
    ],
    meta: [
      { label: "Pintasan", value: "Tekan tombol [L]" },
      { label: "Efek", value: "Neon zeynn.dev, Fairy Lights, Skylight" },
    ],
  },
  kucing: {
    title: "Kucing Kamar",
    subtitle: "Teman Setia Coding Malam Hari",
    paragraphs: [
      "Kucing santai yang selalu tertidur di atas karpet hangat saat sesi penulisan kode berlangsung hingga larut.",
      "Ia bernapas teratur dan terkadang melompat kaget jika dibangunkan tiba-tiba!",
    ],
    meta: [
      { label: "Status", value: "Tidur nyenyak di karpet" },
      { label: "Interaksi", value: "Klik untuk menyapa" },
    ],
  },
};
