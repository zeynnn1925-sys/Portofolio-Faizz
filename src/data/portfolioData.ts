import { Monitor, Database, Users } from 'lucide-react';

export const skills = [
  {
    category: "Microsoft Office",
    icon: Monitor,
    items: [
      { name: "Ms. Word (Mail Merge, Auto TOC)", link: "/laporan-pekanan-osis.docx" },
      { name: "Ms. Excel (VLOOKUP, COUNTIF, IF)", link: "/presensi-kehadiran.xlsx" },
      { name: "Ms. PowerPoint (Animasi, Transisi)", link: "/proposal-gema-alquran.docx" },
      { name: "Data Validation", link: "/presensi-kehadiran.xlsx" },
      { name: "Grafik & Tabel", link: "/presensi-kehadiran.xlsx" }
    ]
  },
  {
    category: "Administrasi & Data",
    icon: Database,
    items: [
      { name: "Administrasi Dokumen", link: "/laporan-pekanan-osis.docx" },
      { name: "Manajemen Arsip", link: "/laporan-pekanan-osis.docx" },
      { name: "Data Entry", link: "/presensi-kehadiran.xlsx" },
      { name: "Penjadwalan Rapat", link: "/presensi-kehadiran.xlsx" },
      { name: "Pembuatan Laporan", link: "/laporan-pekanan-osis.docx" }
    ]
  },
  {
    category: "Soft Skills",
    icon: Users,
    items: [
      { name: "Komunikasi Baik", link: "/proposal-gema-alquran.docx" },
      { name: "Kerja Sama Tim", link: "/proposal-gema-alquran.docx" },
      { name: "Disiplin & Tanggung Jawab", link: "/laporan-pekanan-osis.docx" },
      { name: "Manajemen Waktu", link: "/presensi-kehadiran.xlsx" },
      { name: "Mudah Beradaptasi", link: "/laporan-pekanan-osis.docx" }
    ]
  }
];

export const projects = [
  {
    id: 1,
    title: "Manajemen Arsip & Dokumen OSIS",
    category: "Administrasi",
    image: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=800",
    description: "Mengelola dan mengarsipkan lebih dari 200 dokumen administrasi termasuk surat-menyurat dan notulen rapat per tahun, memastikan sistem dokumentasi teratur.",
    tech: ["Ms. Word", "Manajemen Arsip", "Mail Merge"],
    link: "/laporan-pekanan-osis.docx",
    github: "#"
  },
  {
    id: 2,
    title: "Sistem Penjadwalan & Pelaporan",
    category: "Data Entry",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    description: "Mencatat agenda, mengatur jadwal untuk lebih dari 30 rapat tahunan, serta mendukung penyusunan laporan kegiatan menggunakan Microsoft Excel.",
    tech: ["Ms. Excel", "VLOOKUP", "COUNTIF"],
    link: "/presensi-kehadiran.xlsx",
    github: "#"
  },
  {
    id: 3,
    title: "Koordinasi Perizinan Administrasi",
    category: "Manajemen",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    description: "Menjamin kelancaran koordinasi antar divisi dan memastikan 100% perizinan administrasi terlaksana tepat waktu melalui komunikasi aktif dengan pihak sekolah.",
    tech: ["Komunikasi", "Kerja Sama Tim", "Ms. PowerPoint"],
    link: "/proposal-gema-alquran.docx",
    github: "#"
  }
];

