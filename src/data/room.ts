export interface CameraShot {
  pos: [number, number, number];
  target: [number, number, number];
  fov?: number;
}

export type RoomSection = 'overview' | 'about' | 'projects' | 'experience' | 'skills' | 'contact' | 'morph' | 'lighting' | 'easter_egg';

export interface Hotspot {
  id: string;
  label: string;
  shortLabel: string;
  section: RoomSection;
  shot: CameraShot;
  objectPos: [number, number, number];
  description?: string;
  hint?: string;
}

export const OVERVIEW_SHOT: CameraShot = {
  pos: [0, 2.1, 5.8],
  target: [0, 1.5, -1.2],
  fov: 46,
};

export const ZOOMED_FOV = 34;

export const HOTSPOTS: Hotspot[] = [
  {
    id: 'poster',
    label: 'Poster Foto Hoodie',
    shortLabel: 'Tentang Saya',
    section: 'about',
    shot: {
      pos: [0, 1.95, -0.6],
      target: [0, 1.95, -3],
      fov: ZOOMED_FOV,
    },
    objectPos: [0, 2.0, -2.96],
    description: 'Profil otodidak Muhammad Faiz Dzahin (Zeynn), menyatukan ketelitian administrasi dan kode.',
    hint: 'Klik untuk membaca cerita profil & perjalanan belajar',
  },
  {
    id: 'buku_laptop',
    label: 'Buku Besar → Laptop',
    shortLabel: 'Dua Dunia (Morph)',
    section: 'morph',
    shot: {
      pos: [-1.5, 1.35, -1.3],
      target: [-1.8, 0.85, -2.5],
      fov: ZOOMED_FOV,
    },
    objectPos: [-1.8, 0.78, -2.45],
    description: 'Titik temu dunia analog dan digital: buku besar kasir bertransformasi menjadi laptop pengembang.',
    hint: 'Klik untuk memicu morph digitalisasi',
  },
  {
    id: 'monitor',
    label: 'Monitor Kerja',
    shortLabel: 'Proyek Utama',
    section: 'projects',
    shot: {
      pos: [1.5, 1.3, -1.1],
      target: [1.6, 1.1, -2.6],
      fov: ZOOMED_FOV,
    },
    objectPos: [1.6, 1.1, -2.6],
    description: 'Menampilkan showcase proyek: LifeFlow, Photo Booth, dan sistem informasi kampus.',
    hint: 'Klik untuk melihat demo interaktif proyek',
  },
  {
    id: 'posters_project',
    label: 'Poster Proyek & Arsitektur',
    shortLabel: 'Koleksi Karya',
    section: 'projects',
    shot: {
      pos: [2.4, 1.7, -0.5],
      target: [4.5, 1.7, -0.5],
      fov: ZOOMED_FOV,
    },
    objectPos: [4.45, 1.7, -0.5],
    description: 'Tiga poster proyek terpasang di dinding kanan memperlihatkan ragam aplikasi nyata.',
    hint: 'Klik untuk menelaah arsitektur karya',
  },
  {
    id: 'papan_gabus',
    label: 'Papan Gabus & Sticky Notes',
    shortLabel: 'Roadmap & Ide',
    section: 'projects',
    shot: {
      pos: [2.5, 2.3, -0.9],
      target: [2.75, 2.5, -2.97],
      fov: ZOOMED_FOV,
    },
    objectPos: [2.75, 2.65, -2.97],
    description: 'Catatan kerja harian, backlog fitur, dan ide pengembangan sistem yang sedang dikerjakan.',
    hint: 'Klik untuk membaca catatan kerja',
  },
  {
    id: 'lemari_server',
    label: 'Lemari Arsip → Server Rack',
    shortLabel: 'Arsip & Sistem',
    section: 'experience',
    shot: {
      pos: [-3, 1.2, -1],
      target: [-3.8, 0.8, -2.5],
      fov: ZOOMED_FOV,
    },
    objectPos: [-3.8, 0.65, -2.55],
    description: 'Transformasi dari ratusan dokumen fisik OSIS/OPMAZ menjadi klaster server terpusat.',
    hint: 'Klik untuk membuka rincian pengalaman administratif',
  },
  {
    id: 'sertifikat',
    label: 'Kertas Ketikan Pengalaman',
    shortLabel: 'Lembar CV & Rekam Jejak',
    section: 'experience',
    shot: {
      pos: [-2.2, 1.7, 0.1],
      target: [-4.5, 1.7, 0.1],
      fov: ZOOMED_FOV,
    },
    objectPos: [-4.45, 1.8, 0.1],
    description: 'Tiga lembar ketikan typewriter di dinding: Profil Diri, Administrasi & OPMAZ, serta Proyek & Lomba.',
    hint: 'Klik untuk membaca naskah pengalaman',
  },
  {
    id: 'rak_buku',
    label: 'Rak Buku Keahlian',
    shortLabel: 'Pustaka Skill',
    section: 'skills',
    shot: {
      pos: [2.5, 1.85, -0.6],
      target: [3.85, 1.7, -2.5],
      fov: 36,
    },
    objectPos: [3.85, 1.6, -2.5],
    description: 'Punggung buku memuat tiap keahlian: TypeScript, React, Python, SQL, Excel, hingga tata naskah.',
    hint: 'Klik buku di rak untuk menarik detail keahlian',
  },
  {
    id: 'telepon',
    label: 'Telepon Meja',
    shortLabel: 'Hubungi Saya',
    section: 'contact',
    shot: {
      pos: [2.1, 1.3, -1.3],
      target: [2.3, 0.8, -2.35],
      fov: ZOOMED_FOV,
    },
    objectPos: [2.3, 0.78, -2.3],
    description: 'Jalur komunikasi langsung ke GitHub, LinkedIn, dan Instagram resmi.',
    hint: 'Klik telepon untuk melihat kanal kontak',
  },
  {
    id: 'saklar',
    label: 'Saklar Lampu Kamar',
    shortLabel: 'Lampu (L)',
    section: 'lighting',
    shot: {
      pos: [0.7, 1.65, -1.6],
      target: [0.7, 1.65, -2.97],
      fov: ZOOMED_FOV,
    },
    objectPos: [0.7, 1.65, -2.97],
    description: 'Saklar dinding untuk beralih antara suasana kerja siang terang dan mode malam dengan neon zeynn.dev.',
    hint: 'Klik saklar atau tekan tombol L di keyboard',
  },
  {
    id: 'kucing',
    label: 'Kucing Tidur',
    shortLabel: 'Teman Belajar',
    section: 'easter_egg',
    shot: {
      pos: [0.1, 0.65, 0.3],
      target: [0.1, 0.12, -0.6],
      fov: ZOOMED_FOV,
    },
    objectPos: [0.1, 0.12, -0.6],
    description: 'Kucing santai yang setia menemani sesi coding hingga larut malam. Bernapas pelan di atas karpet.',
    hint: 'Klik kucing untuk menyapanya',
  },
  {
    id: 'jendela',
    label: 'Jendela Kamar (Perumahan Asri)',
    shortLabel: 'Pemandangan Jendela',
    section: 'overview',
    shot: {
      pos: [-2.8, 2.0, -1.05],
      target: [-2.8, 2.0, -2.96],
      fov: 38,
    },
    objectPos: [-2.8, 2.0, -2.96],
    description: 'Pemandangan kompleks perumahan yang asri dan tenang di luar jendela. Awan berarak lembut di siang hari dan lampu-lampu taman berpendar di malam hari.',
    hint: 'Klik untuk zoom in / zoom out melihat suasana luar jendela atau buka-tutup gorden',
  },
];
