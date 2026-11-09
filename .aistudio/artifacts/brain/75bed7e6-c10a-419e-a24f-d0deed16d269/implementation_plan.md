# Rencana Perombakan & Peningkatan Kreatif: Portofolio "Kamar Dua Dunia" (Zeynn)

Rencana ini menyatukan fondasi inti `DESIGN.md` dan `prompt-gc.md` dengan **6 ide pengembangan kreatif bernilai tinggi** yang akan membuat portofolio Muhammad Faiz Dzahin (Zeynn) tampil sangat istimewa, hidup, dan tidak terlupakan bagi siapa pun yang mengunjunginya.

---

## 1. 6 Ide Pengembangan Kreatif Tingkat Lanjut (Eksklusif & Orisinal)

### ① Terminal Interaktif di Monitor Kamar 3D (*Live Developer Console*)
- **Konsep:** Saat kamera memperbesar ke monitor meja kerja, pengguna tidak hanya melihat gambar statis, melainkan dapat memilih antara:
  - *Tampilan Web Preview LifeFlow System* (antarmuka dashboard finansial & habit tracker), atau
  - *Terminal CLI Mini Interaktif*: Pengguna dapat mengetik perintah seperti `help`, `skills`, `projects`, `morph`, `lampu`, `cat`, atau `contact` dengan respons teks bergaya terminal retro-modern.
- **Nilai Kreatif:** Langsung membuktikan kapabilitas *technical coding* dan logika sistem web developer secara nyata di dalam scene 3D.

### ② Soundscape Adaptif Analog vs Digital (*Zero-External-File Web Audio*)
- **Konsep:** Memanfaatkan Web Audio API lokal (tanpa perlu mengunduh file MP3 besar dari luar):
  - **Suasana Analog (sebelum morph):** Suara detak jarum jam dinding analog, gemerisik kertas saat lembar dibalik, dan bunyi pegas mesin tik.
  - **Suasana Digital (setelah morph):** Bunyi *boot-up* halus saat laptop menyala, desau pelan server rack, dan nada ambient lo-fi yang menenangkan.
  - Tentu dilengkapi tombol *Mute/Unmute* yang terlihat jelas dan default dalam keadaan sopan (volume lembut).

### ③ Mode Memo Kuning di Meja Kerja (*Interactive Sticky Note Contact*)
- **Konsep:** Di area Telepon & Meja Kerja, saat pengguna ingin meninggalkan pesan melalui formulir kontak, pesan tersebut akan dipratinjau secara visual sebagai **memo kuning (*sticky note*) yang tertempel di papan gabus atau meja kerja Zeynn** sebelum dikirim.
- **Nilai Kreatif:** Menghubungkan dunia form web biasa dengan narasi kamar kerja nyata.

### ④ Mode Sinema / Layar Penuh (*Zen Mode Viewport*)
- **Konsep:** Terdapat tombol *Zen / Fullscreen View* di sudut kamar 3D yang menyembunyikan panel samping secara mulus. Pengguna dapat menikmati diorama kamar 3D secara penuh di layar (100% *unobstructed*) dengan kebebasan *drag* untuk mengintip seluruh sudut ruangan.

### ⑤ Slider Komparasi "Dua Era" (*Analog vs Digital Split Slider*)
- **Konsep:** Di bagian Pengalaman/Tentang di bawah kamar, disediakan slider interaktif berdampingan:
  - *Sisi Kiri (Analog):* Foto buku besar fisik, cap stempel resmi OPMAZ, dan 200+ lembar arsip bertumpuk.
  - *Sisi Kanan (Digital):* Dasbor sistem web OPMAZ Admin Hub, formula Excel terotomasi, dan skrip *Mail Merge*.
  - Pengguna dapat menggeser garis pembatas untuk melihat transformasi langsung dari cara manual ke sistem terotomasi.

### ⑥ Micro-Interactions Tambahan di Kamar 3D
- **Cangkir Kopi Hangat:** Partikel uap tipis (*procedural steam*) mengepul halus di atas meja kerja.
- **Gorden Jendela yang Bergoyang:** Desau angin malam lembut menggerakkan gorden Deep Teal secara halus.
- **Kucing:** Selain melompat saat diklik, kucing sesekali memutar telinganya atau mengubah posisi tidurnya.

---

## 2. Struktur Tata Letak Utama (Sesuai Bab 8 DESIGN.md)

1. **Header Minimalis (Bukan Pill Navbar di Tengah):**
   - Menghapus navbar floating pill lawas.
   - Menggantinya dengan header top-bar bersih: Logo FAEEZZ di kiri, status kehadiran di tengah, tombol pintasan & profil sosial di kanan.

2. **Panggung Utama: Kamar 3D & Panel Samping:**
   - **Desktop:** Kamar 3D di kiri (±74% lebar, tinggi 78vh–82vh) dan Panel Samping Clay di kanan (330px–360px) berisi navigasi bergaris tepi amber aktif (`border-l-4 border-amber-clay`), tombol morph, saklar lampu, dan kartu info dinamis.
   - **Mobile:** Kamar 3D di atas (50–55vh) dengan jarak kamera mundur adaptif, dan panel narasi bottom sheet yang dapat digeser secara horizontal.

3. **Halaman Detail Tenang di Bawah Kamar (Restyle Sempurna):**
   - **Tentang Saya:** Profil naratif bersih berformat kartu indeks arsip, potret duotone teal-ke-amber, dan cerita perjalanan belajar otodidak.
   - **Proyek Pilihan:** Efek 3D card tilt saat hover, kartu unggulan LifeFlow System, Animated Modal untuk arsitektur teknis, dan tombol langsung pratinjau dokumen resmi via `FilePreviewModal`.
   - **Keahlian & Capaian:** Number Ticker metrik (200+ dokumen, 30+ rapat, 100% perizinan) dan Marquee tech-stack strip yang berjalan mulus tanpa warna baru.
   - **Pengalaman Kepemimpinan:** Tata naskah arsip sekretaris OPMAZ yang terverifikasi dan linimasa pendidikan di Ma'had Al-Zaytun.
   - **Kontak & Footer:** Jalur komunikasi langsung (GitHub, LinkedIn, Instagram, Email) dan formulir pesan bersih.

---

## 3. Rencana Eksekusi Bertahap

1. **Modul Kamar 3D & Rig Kamera:**
   - Melengkapi interaksi klik monitor (CLI terminal & web preview toggle).
   - Memastikan transisi GSAP langsung terbang antar objek tanpa kembali ke overview.
   - Mengimplementasikan soundscape Web Audio adaptif (analog vs digital).
2. **Penyempurnaan Panel Samping & Header:**
   - Membersihkan `Navbar.tsx` dan menyatukan layout dengan `RoomExperience.tsx`.
3. **Restyle Tenang Bagian Bawah:**
   - Memperbarui `About.tsx`, `Projects.tsx`, `Skills.tsx`, `Experience.tsx`, dan `Contact.tsx` agar menyatu dalam tema *administrative claymorphism* tanpa ada ornamen terlarang.
4. **Verifikasi Akhir:**
   - Menjalankan `compile_applet` dan `lint_applet` bersamaan untuk memastikan zero error.
