# references.md — Referensi untuk portofolio kamar 3D

Pakai sebagai inspirasi dan sumber komponen. Cek lisensi tiap komponen sebelum dipakai di produk komersial.

## Perpustakaan komponen (sudah ada di daftar referensi lu)

| Sumber | Link | Dipakai untuk |
|---|---|---|
| Aceternity UI | https://ui.aceternity.com | 3D Card Effect (kartu project miring), Animated Modal (detail project), Lens (zoom foto), Spotlight, Container Scroll Animation, Apple Cards Carousel, Glare Card, Link Preview |
| Aceternity di 21st.dev | https://21st.dev/@manuarora700/library/aceternity-ui | Pratinjau langsung tiap komponen sebelum copy |
| Magic UI | https://magicui.design/docs | Marquee (logo stack), Number Ticker (200+ dokumen, 30+ rapat), Blur Fade (teks masuk), Dock, Animated Beam (garis penghubung analog → digital), Text Animate |
| Magic UI di 21st.dev | https://21st.dev/magicui | Pratinjau dan install lewat shadcn CLI |
| shadcn/ui | https://ui.shadcn.com | Dasar komponen (dialog, tabs, sheet untuk bottom sheet mobile) |

Cara pasang: kedua pustaka memakai registry shadcn (`npx shadcn@latest add ...`), jadi kode masuk ke proyek dan bisa diubah. Tailwind dan Motion sudah ada di proyek lu.

**Catatan restraint:** jangan menumpuk banyak efek bergerak dalam satu layar. Kamar 3D adalah satu-satunya hal yang mencolok. Komponen di atas hanya dipakai di bagian detail di bawah kamar, dan hanya sebagian kecil (modal, kartu miring, marquee, ticker).

## Referensi portofolio 3D (untuk rasa dan teknik)

| Referensi | Link | Yang bisa dicontek idenya |
|---|---|---|
| Codrops: portofolio 3D tanpa satu pun model | https://tympanus.net/codrops/2026/06/11/sketching-the-impossible-a-3d-portfolio-built-without-a-single-3d-model/ | Membangun ruang dari primitif tanpa Blender, React Three Fiber, hanya merender segmen yang dekat kamera |
| Codrops: portofolio yang bisa dijelajahi | https://tympanus.net/codrops/?p=115219 | GSAP untuk terbang kamera dan transisi, tantangan terbesarnya sistem kamera masuk/keluar ruangan |
| Forum three.js: ruang portofolio interaktif | https://discourse.threejs.org/t/an-interactive-3d-portfolio-room/93515 | Kucing tidur, lampu dan monitor interaktif, skala kualitas otomatis untuk perangkat lemah |
| Forum three.js: portofolio R3F + kamera halus | https://discourse.threejs.org/t/showcase-3d-portfolio-website-built-with-three-js-and-react-three-fiber/87470 | Ruang dengan transisi kamera halus dan kontrol responsif desktop dan mobile |
| Forum three.js: desktop room | https://discourse.threejs.org/t/portfolio-3d-desktop-room/20736 | Gaya "meja kerja" interaktif |
| Portofolio 3D Bruno Simon | (cari "Bruno Simon portfolio") | Standar emas portofolio 3D yang dimainkan, bukan di-scroll |

## Pelajaran yang dipakai di desain ini

1. **Sistem kamera adalah bagian tersulit.** Karena itu dibuat paling awal (Bagian 3 di `prompt-gc.md`) dan harus mendukung pindah antar objek tanpa kembali ke overview.
2. **Tanpa model eksternal.** Primitif bevel + cahaya yang bagus sudah terasa nyata dan menghindari masalah lisensi aset.
3. **Siapkan fallback.** Skala kualitas otomatis dan poster statis untuk perangkat lemah.
4. **Detail kecil yang hidup** (kucing, neon, jam) membuat ruang terasa nyata tanpa membuat layar ramai.

## Pencarian lanjutan (kalau butuh ide tambahan)

- Awwwards dan The FWA, kategori 3D / WebGL, untuk melihat gaya portofolio yang menang.
- Codrops (tympanus.net/codrops) untuk tutorial efek WebGL dan transisi.
- Three.js Journey dan dokumentasi drei untuk helper (RoundedBox, Environment, ContactShadows).
