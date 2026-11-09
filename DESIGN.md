# design.md — Portofolio "Kamar Dua Dunia"

Sumber kebenaran desain. Kalau prompt dan file ini bentrok, file ini yang menang.

## 1. Identitas (satu peran, tidak dipisah)

- **Nama:** Muhammad Faiz Dzahin (Zeynn)
- **Peran:** Web developer & pembangun sistem. Satu orang yang menyatukan kode full-stack, ketelitian administrasi, dan materi belajar (EdTech). Juga ikut lomba dan bikin produk sendiri.
- **Tagline:** "Web developer otodidak yang bikin sistem rapi, dari kasir sampai platform belajar."
- **Cerita visual:** kamar yang sama punya dua dunia, analog (buku besar, arsip) dan digital (laptop, server). Satu momen morph menghubungkan keduanya.
- **Bahasa UI:** Indonesia santai tapi rapi. Kalimat aktif, kata kerja jelas, tanpa jargon.
- **Hapus** semua teks "Administrative & Systems Specialist" (hero, `<title>`, meta, og). Perbaiki `og:url` ke domain Vercel asli, bukan URL `run.app`.

## 2. Token

| Token | Nilai | Pakai untuk |
|---|---|---|
| bone-light | `#F3EFE7` | latar halaman |
| bone-dark | `#EAE3D4` | permukaan sekunder |
| cream | `#FFFDF8` | kartu, bingkai foto |
| amber-clay | `#E8A855` (dark `#C7862F`) | aksen utama, aktif, hotspot |
| deep-teal | `#2F5D5A` (light `#4C8783`) | aksen digital, tombol utama |
| ink-navy | `#242B38` | teks |
| ink-soft | `#62697A` | teks sekunder |
| night | `#15121A` | latar luar kamar |
| lamp | `#FFD27A` | cahaya lampu, fairy lights |

Tidak boleh menambah warna baru di luar tabel ini.

**Font:** Fraunces (judul, bobot 500–700), Quicksand (UI dan isi), JetBrains Mono (kode, label teknis). Dilarang: Inter, Roboto, Poppins, Montserrat.

**Bentuk:** gaya clay. Radius besar dan konsisten (kartu 20–24px, tombol 14–18px). Shadow clay dua arah yang sudah ada di `index.css` dipertahankan untuk panel 2D.

## 3. Kamar (3D asli, bukan CSS 3D)

Ukuran dunia: lebar 9, tinggi 3,2, kedalaman 6 (satuan meter). Dinding depan terbuka (diorama). Semua bentuk dari primitif Three.js dengan tepi bevel (rounded box), tanpa file `.glb` wajib.

### Peta objek → konten

| Objek | Posisi (x, y, z) | Konten | Shot kamera (pos → target) |
|---|---|---|---|
| Poster foto hoodie (besar) | 0, 2.0, -2.96 | Tentang | (0,1.95,-0.6) → (0,1.95,-3) |
| Monitor | 1.6, 1.1, -2.6 | Projects | (1.5,1.3,-1.1) → (1.6,1.1,-2.6) |
| Poster project di dinding kanan (3) | 4.45, 1.7, z | Projects | (2.4,1.7,-0.5) → (4.5,1.7,-0.5) |
| Papan gabus + sticky notes | 2.75, 2.65, -2.97 | Projects | (2.5,2.3,-0.9) → (2.75,2.5,-2.97) |
| Lemari arsip → server rack | -3.8, 0.65, -2.55 | Pengalaman | (-3,1.2,-1) → (-3.8,0.8,-2.5) |
| Sertifikat di dinding kiri (3) | -4.45, 1.8, z | Pengalaman | (-2.2,1.7,0.1) → (-4.5,1.7,0.1) |
| Rak buku tinggi + rak dinding | 3.9 / 2.75 | Skills | (2.8,1.6,-0.9) → (3.9,1.4,-2.55) |
| Telepon di meja | 2.3, 0.78, -2.3 | Kontak | (2.1,1.3,-1.3) → (2.3,0.8,-2.35) |
| Buku besar → laptop | -1.8, 0.78, -2.45 | Momen morph | (-1.5,1.35,-1.3) → (-1.8,0.85,-2.5) |

### Hiasan (wajib ada, jangan dibuang)

Jendela malam (bulan, bintang, siluet kota) dengan gorden teal · lampu hias di sepanjang dinding · neon "zeynn.dev" · jam dinding yang jalan sesuai waktu nyata · galeri foto (formal, malam, khotib, sweater, profil samping) · lampu meja, headphone, mug, kamera, tanaman kecil · karpet bulat bermotif · dua pouf · kucing clay di karpet · tanaman besar · lampu lantai · tumpukan buku di lantai · papan tulis kapur di dinding kiri.

### Foto (aset pribadi)

| File | Dipakai di | Perlakuan |
|---|---|---|
| hoodie (kaciwww.png) | poster besar tengah | warna asli, bingkai putih |
| formal (Foto.jpg) | bingkai kiri atas | **duotone teal→amber** supaya latar merah tidak bentrok palet |
| khotib (FOTO_4.jpg) | bingkai kanan atas | potong bar hitam, warna asli |
| night, sweater, profil | bingkai kecil | night dicerahkan (×2.4) |

## 4. Kamera dan transisi (inti pengalaman)

- **Overview:** pos (0, 2.1, 5.8), target (0, 1.5, -1.2), FOV 46. Di layar sempit, jarak mundur otomatis menurut aspect.
- **Klik objek:** kamera terbang ke shot objek tersebut. Durasi 1,3 detik, easing cubic in-out, ada lengkungan kecil naik (+0,18) di tengah perjalanan. FOV menyempit ke 34 saat zoom.
- **Klik objek lain saat sedang zoom:** langsung terbang dari posisi sekarang ke objek baru, tanpa kembali ke overview dulu. Ini wajib.
- **Keluar:** klik ruang kosong, tombol "Lihat seluruh kamar", atau tombol Esc.
- **Hover:** objek hotspot membesar 5% dengan lerp halus, kursor jadi pointer.
- **Parallax:** di overview, kamera ikut gerak pointer sedikit (±0,9 x, ±0,4 y). Saat zoom, parallax mati.
- **Panel info:** saat tujuan berganti, teks panel masuk dengan fade + naik 10px (0,5 detik).
- **Reduced motion:** durasi terbang jadi instan, parallax dan ambient mati.

## 5. Morph analog → digital

| Analog | Digital | Cara |
|---|---|---|
| Buku besar terbuka (halaman datar) | Laptop (layar berdiri, kode jalan) | engsel di tepi belakang: rotasi π/2 → −0,22 rad |
| 3 lembar kertas | 3 kartu UI melayang (header teal) | terbang naik, berdiri tegak, header muncul |
| Lemari arsip krem | Server rack teal, LED hijau menyala | warna lerp + emissive LED |

Pemicu: otomatis sekali setelah ±2,2 detik, klik buku besar, atau tombol "Digitalkan buku besar". Pergerakan memakai smoothing eksponensial (rasa "mengendap").

## 6. Kehidupan ambien (kecil, jangan ramai)

Jam dinding real-time · kucing bernapas pelan · neon berkedip tipis · kode di monitor bergulir tiap ±0,35 detik · lampu hias menyala. Gerakan besar hanya morph dan terbang kamera.

## 7. Cahaya dan material

- Renderer: ACES Filmic, sRGB, shadow PCFSoft 2048.
- 1 DirectionalLight (bayangan), HemisphereLight hangat, 4–5 PointLight tanpa bayangan (lampu meja, neon, lampu lantai, monitor, bulan).
- Material clay: roughness 0,7–0,9, metalness 0. Kayu dan karpet pakai tekstur canvas prosedural.

## 8. Layout halaman

- **Desktop:** kamar di kiri (±75% lebar, tinggi 78vh), panel di kanan (330px): nama, judul, daftar navigasi (border kiri amber, bukan pill), tombol morph, kartu info.
- **Mobile:** kamar di atas, panel jadi bottom sheet. Navigasi horizontal bisa digeser.
- **Di bawah kamar:** bagian detail (Projects, Pengalaman, Skills, Kontak) sebagai halaman biasa yang bisa di-scroll untuk SEO dan keterbacaan. Isi diambil dari `portfolioData.ts` dan komponen lama (Education, Experience, FilePreviewModal tetap dipakai).
- **Restraint:** kamar adalah satu-satunya hal yang mencolok. Bagian di bawahnya tenang, tipografi kuat, animasi hanya sebagai respons aksi.

## 9. Performa dan aksesibilitas

- DPR maksimum 2. Render berhenti saat tab tersembunyi dan saat kamar di luar layar.
- Perangkat lemah (cek `navigator.hardwareConcurrency`, memori, dan FPS awal): turunkan shadow map ke 1024, matikan point light tambahan. Di bawah itu: poster statis (render kamar sebagai gambar) + navigasi biasa.
- Semua hotspot juga bisa diakses lewat daftar navigasi (keyboard, pembaca layar). Fokus terlihat jelas. Kontras teks minimal AA.
- Beri `alt` pada semua foto dan label ARIA pada kanvas ("Kamar interaktif Zeynn").

## 10. Dilarang (terasa seperti template AI)

Badge pill dengan titik, dua CTA simetris, penomoran dekoratif 01/02/03, navbar di tengah, latar titik-titik ambient, gradient ungu di atas putih, ikon clipart, foto stok, fade-and-slide-up di setiap section, hover animasi di setiap kartu.

## 12. Update final (dari preview terakhir)

- **Saklar lampu:** plat besar berlabel "LAMPU" di dinding antara jendela dan galeri, plus tombol HTML dan tombol keyboard `L`. Satu variabel terang/gelap mengatur: lampu kamar, langit jendela, lampu meja (SpotLight yang menyorot meja), neon "zeynn.dev" (hanya menyala saat gelap, ada glow aditif), dan lampu hias.
- **Rak buku = Skills.** Satu buku per skill, punggung buku berisi nama. Klik buku: buku tergeser keluar, kamera zoom frontal, panel menampilkan logo + kategori + penjelasan. Klik buku lain: kamera pindah langsung. Daftar skill: Bahasa Pemrograman Utama, Frontend Framework & Tools, Backend & Basis Data, Administrasi & Office, Administrasi & Data. Logo: simple-icons untuk teknologi, file upload untuk Python/Java/Figma/Word/Excel, ikon garis buatan sendiri untuk skill administrasi.
- **Pengalaman = kertas ketikan di dinding kiri.** Tiga lembar (Profil, Administrasi, Proyek & Lomba), font mesin ketik, isi harus selalu sesuai CV dan cerita Zeynn. Klik lembar: kamera zoom agar terbaca. Jangan mengarang isi baru.
- **Monitor** menampilkan demo bergantian: LifeFlow, Photobooth, CampusBildung.id.
- **Telepon** menampilkan tombol GitHub, Instagram, LinkedIn (link asli). WhatsApp dan email menunggu data.
- **Intro:** kamar gelap, teks "Dulu buku besar dan arsip. Sekarang kode dan sistem.", lampu menyala bertahap, kamera masuk, lalu morph analog ke digital.
- **Easter egg:** kucing melompat saat diklik, suara opsional (default mati).
