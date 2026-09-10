import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, MapPin, ChevronRight, Check,
  Upload, X, ChevronLeft, ChevronRight as ChevronRightIcon, 
  ZoomIn, Eye, Trash2, Image as ImageIcon, Sliders, RotateCw,
  Layers, Sparkles, Box, LayoutGrid
} from 'lucide-react';
import { Gallery, type GalleryProps, GALLERY_DEFAULTS } from '@designcodeio/threeui';
import '@designcodeio/threeui/style.css';
import { headerVariants, cardVariants, staggerContainer, scrollViewport, smoothEase } from '../lib/animations';

// ThreeUI high-resolution WebP cylindrical panel assets
const THREEUI_ASSET_1 = new URL("../shaders/gallery/assets/gallery-1.webp", import.meta.url).href;
const THREEUI_ASSET_2 = new URL("../shaders/gallery/assets/gallery-2.webp", import.meta.url).href;
const THREEUI_ASSET_3 = new URL("../shaders/gallery/assets/gallery-3.webp", import.meta.url).href;
const THREEUI_ASSET_4 = new URL("../shaders/gallery/assets/gallery-4.webp", import.meta.url).href;
const THREEUI_ASSET_5 = new URL("../shaders/gallery/assets/gallery-5.webp", import.meta.url).href;

const THREEUI_ASSETS = [
  THREEUI_ASSET_1,
  THREEUI_ASSET_2,
  THREEUI_ASSET_3,
  THREEUI_ASSET_4,
  THREEUI_ASSET_5,
];

export interface GalleryItem {
  id: number;
  title: string;
  category: 'aktivitas' | 'selfie' | 'visual3d';
  date: string;
  location: string;
  description: string;
  localStorageKey?: string;
  defaultSrc?: string;
  placeholderLabel?: string;
  detailsLabel: string;
  is3dAsset?: boolean;
}

export default function About() {
  const [selectedFilter, setSelectedFilter] = useState<'semua' | 'aktivitas' | 'selfie' | 'visual3d'>('semua');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [galleryViewMode, setGalleryViewMode] = useState<'combined' | '3d' | 'cards'>('combined');
  const [textureSource, setTextureSource] = useState<'all' | 'personal' | 'threeui'>('all');
  const [showControls, setShowControls] = useState(false);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // 3D Ribbon Gallery Shader live parameters
  const [params, setParams] = useState<Required<Pick<GalleryProps, 'speed' | 'scale' | 'opacity' | 'hue' | 'saturation' | 'brightness'>>>({
    speed: 1.00,
    scale: 1.00,
    opacity: 1.00,
    hue: 0,
    saturation: 1.00,
    brightness: 1.00,
  });

  const handleResetParams = () => {
    setParams({
      speed: 1.00,
      scale: 1.00,
      opacity: 1.00,
      hue: 0,
      saturation: 1.00,
      brightness: 1.00,
    });
  };

  // Dynamic Image Slots loaded from LocalStorage
  const getStoredImage = (key: string): string => {
    const stored = localStorage.getItem(key);
    if (stored && stored.startsWith('data:')) {
      return stored;
    }
    return '';
  };

  const [images, setImages] = useState<{ [key: string]: string }>({
    gallery_admin: getStoredImage('gallery_admin'),
    gallery_studio: getStoredImage('gallery_studio'),
    gallery_khotib: getStoredImage('gallery_khotib'),
    gallery_belajar: getStoredImage('gallery_belajar'),
  });

  const highlights = [
    "Penguasaan formula tingkat lanjut Microsoft Excel untuk efisiensi",
    "Sistematisasi & pengarsipan digital 200+ surat & izin per tahun",
    "Kolaborasi kepemimpinan dalam organisasi skala ratusan santri/santriwati"
  ];

  // Unified Gallery items combining Faiz's personal archives with ThreeUI visual 3D assets
  const GALLERY_SLOTS: GalleryItem[] = [
    {
      id: 1,
      title: "Kader Administrasi Utama (Sekretaris OPMAZ)",
      category: "aktivitas",
      date: "19 Agustus 2024",
      location: "Ruang Tata Usaha OPMAZ, Indramayu",
      description: "Foto profil resmi sebagai Sekretaris Utama Organisasi Pelajar Ma'had Al-Zaytun yang bertanggung jawab atas pengorganisasian arsip, pengeluaran dispensasi, dan penataan administrasi harian santri.",
      localStorageKey: "gallery_admin",
      defaultSrc: "/Gambar WhatsApp 2024-08-19 pukul 21.43.27_df60a54b.png",
      placeholderLabel: "Unggah Foto Administrasi",
      detailsLabel: "Foto Organisasi Utama"
    },
    {
      id: 2,
      title: "Potret Profesional Terpilih",
      category: "selfie",
      date: "Januari 2025",
      location: "Studio Ma'had Al-Zaytun",
      description: "Foto potret representasi kelulusan terbaik santri MAS Ma'had Al-Zaytun, menonjolkan rasa tanggung jawab, kepercayaan diri, dan integritas tinggi.",
      localStorageKey: "gallery_studio",
      defaultSrc: "/Foto.jpg",
      placeholderLabel: "Unggah Potret Studio",
      detailsLabel: "Potret Resmi Studio"
    },
    {
      id: 3,
      title: "Khotib & Pembicara Formal",
      category: "aktivitas",
      date: "22 November 2025",
      location: "Masjid Ma'had Al-Zaytun, Indramayu",
      description: "Menyampaikan khotbah formal organisasi dalam rangkaian evaluasi pekanan dan pembekalan kepemimpinan santri tingkat lanjut.",
      localStorageKey: "gallery_khotib",
      placeholderLabel: "Unggah Foto Khotib (Peci & Mimbar)",
      detailsLabel: "Foto Khotib / Mimbar"
    },
    {
      id: 4,
      title: "Sesi Belajar & Kerja Kreatif",
      category: "selfie",
      date: "12 Juni 2025",
      location: "Ruang Belajar Digital",
      description: "Sesi kerja santai yang didokumentasikan langsung di laptop (program Photo Booth), menggunakan hoodie hitam kasual sambil merancang kode web.",
      localStorageKey: "gallery_belajar",
      placeholderLabel: "Unggah Foto Belajar (Hoodie Hitam / Laptop)",
      detailsLabel: "Sesi Belajar / Hoodie"
    },
    {
      id: 5,
      title: "ThreeUI Ribbon Panel 01 — Kurva Monolitik",
      category: "visual3d",
      date: "Desember 2024",
      location: "WebGL Studio Environment",
      description: "Panel lengkung resolusi tinggi dari pustaka ThreeUI Three.js r149. Mengorbit pada poros silinder dengan tone-mapping sRGB dan antialias penuh.",
      defaultSrc: THREEUI_ASSET_1,
      detailsLabel: "Ribbon Panel 01",
      is3dAsset: true
    },
    {
      id: 6,
      title: "ThreeUI Ribbon Panel 02 — Geometri Fasad",
      category: "visual3d",
      date: "Desember 2024",
      location: "WebGL Studio Environment",
      description: "Komposisi fasad brutalist dengan bayangan sudut tajam, memperkaya kedalaman spasial pada putaran 3D ribbon.",
      defaultSrc: THREEUI_ASSET_2,
      detailsLabel: "Ribbon Panel 02",
      is3dAsset: true
    },
    {
      id: 7,
      title: "ThreeUI Ribbon Panel 03 — Arsitektur Minimalis",
      category: "visual3d",
      date: "Desember 2024",
      location: "WebGL Studio Environment",
      description: "Struktur garis bersih dan pencahayaan studio terkalibrasi untuk mencerminkan estetika desain modern dan presisi kalkulasi.",
      defaultSrc: THREEUI_ASSET_3,
      detailsLabel: "Ribbon Panel 03",
      is3dAsset: true
    },
    {
      id: 8,
      title: "ThreeUI Ribbon Panel 04 — Kontur Skulptural",
      category: "visual3d",
      date: "Desember 2024",
      location: "WebGL Studio Environment",
      description: "Eksplorasi volume spasial dengan tekstur granular halus yang responsif terhadap penyesuaian live hue dan saturasi shader.",
      defaultSrc: THREEUI_ASSET_4,
      detailsLabel: "Ribbon Panel 04",
      is3dAsset: true
    },
    {
      id: 9,
      title: "ThreeUI Ribbon Panel 05 — Perspektif Aksial",
      category: "visual3d",
      date: "Desember 2024",
      location: "WebGL Studio Environment",
      description: "Penutup siklus 16 panel silinder yang memberikan kontinuitas visual berkesinambungan saat galeri berputar secara otomatis.",
      defaultSrc: THREEUI_ASSET_5,
      detailsLabel: "Ribbon Panel 05",
      is3dAsset: true
    }
  ];

  // Helper to determine active image source (uploaded base64 vs default system path)
  const getItemImgSrc = (item: GalleryItem): string | undefined => {
    if (item.localStorageKey) {
      const uploaded = images[item.localStorageKey];
      if (uploaded) return uploaded;
    }
    return item.defaultSrc || undefined;
  };

  // Filtered array based on active category
  const filteredItems = selectedFilter === 'semua' 
    ? GALLERY_SLOTS 
    : GALLERY_SLOTS.filter(item => item.category === selectedFilter);

  // List of items that actually have active photos
  const itemsWithPhotos = filteredItems.filter(item => !!getItemImgSrc(item));

  // Compute 3D cylinder texture list based on selected texture source
  const active3dTextures = useMemo(() => {
    const personal = [
      images.gallery_admin || "/Gambar WhatsApp 2024-08-19 pukul 21.43.27_df60a54b.png",
      images.gallery_studio || "/Foto.jpg",
      images.gallery_khotib || "",
      images.gallery_belajar || "",
    ].filter(Boolean);

    if (textureSource === 'personal') {
      return personal.length > 0 ? personal : THREEUI_ASSETS;
    }
    if (textureSource === 'threeui') {
      return THREEUI_ASSETS;
    }
    // 'all': Combine personal photos and ThreeUI 3D assets
    return [...personal, ...THREEUI_ASSETS];
  }, [images, textureSource]);

  // Client-side utility to resize and compress upload image down to ~60-150KB
  const resizeAndCompressImage = (file: File, maxWidth = 800, maxHeight = 1000, quality = 0.75): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(event.target?.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', quality);
          resolve(compressed);
        };
        img.onerror = () => reject(new Error("Gagal membaca piksel gambar"));
        img.src = event.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Gagal membaca file"));
      reader.readAsDataURL(file);
    });
  };

  const triggerFileInput = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRefs.current[key]?.click();
  };

  const handleImageFileChange = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Ukuran gambar terlalu besar. Silakan pilih gambar di bawah 10MB.");
      return;
    }

    try {
      const compressedBase64 = await resizeAndCompressImage(file);
      try {
        localStorage.setItem(key, compressedBase64);
        setImages(prev => ({ ...prev, [key]: compressedBase64 }));
      } catch (quotaError) {
        console.error("Quota exceeded limit:", quotaError);
        alert("Penyimpanan lokal penuh. Silakan bersihkan foto lain.");
      }
    } catch (err) {
      console.error("Compression error:", err);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        try {
          localStorage.setItem(key, base64String);
          setImages(prev => ({ ...prev, [key]: base64String }));
        } catch (quotaError) {
          alert("Penyimpanan lokal browser penuh. Gambar asli ini terlalu besar.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Apakah Anda yakin ingin menghapus foto kustom ini?")) {
      localStorage.removeItem(key);
      setImages(prev => ({ ...prev, [key]: '' }));
    }
  };

  // Keyboard Navigation inside lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') {
        setActivePhotoIndex(null);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, itemsWithPhotos]);

  const handleNext = () => {
    if (activePhotoIndex === null || itemsWithPhotos.length === 0) return;
    setActivePhotoIndex((activePhotoIndex + 1) % itemsWithPhotos.length);
  };

  const handlePrev = () => {
    if (activePhotoIndex === null || itemsWithPhotos.length === 0) return;
    setActivePhotoIndex((activePhotoIndex - 1 + itemsWithPhotos.length) % itemsWithPhotos.length);
  };

  return (
    <section id="about" className="py-24 md:py-32 relative bg-bone-light overflow-hidden">
      
      {/* Background decoration elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-clay/5 blur-[130px]" />
        <div className="absolute bottom-[25%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-deep-teal/5 blur-[120px]" />
        <div className="absolute inset-0 bg-paper-grid opacity-70" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="mb-16 md:mb-20"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-deep-teal font-mono block mb-2">PROFIL SINGKAT & DOKUMENTASI</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-ink-navy tracking-tight">
            Tentang <span className="text-amber-clay-dark italic font-semibold">Saya</span>
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={scrollViewport}
            transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
            className="h-[3px] w-16 bg-amber-clay rounded-full mt-3 origin-left"
          />
        </motion.div>

        {/* 2-Column Grid: Left Story, Right Profile Card */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Narrative Details styled as an Index Card */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <div className="clay-card-raised p-6 sm:p-8 space-y-6 relative border border-white bg-cream">
              
              {/* Index card top ruling accent */}
              <div className="absolute top-0 inset-x-0 h-1 bg-deep-teal rounded-t-[24px]" />
              
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-ink-navy leading-tight">
                Dedikasi, Presisi, dan <span className="text-amber-clay-dark italic font-semibold">Integritas Administratif</span> Organisasi.
              </h3>
              
              <div className="space-y-4 text-ink-navy font-sans font-medium text-xs sm:text-sm leading-relaxed">
                <p>
                  Lulusan Madrasah Aliyah Swasta (MAS) Ma’had Al-Zaytun jurusan Ilmu Pengetahuan Sosial angkatan 2025 yang berfokus pada efisiensi dan tata kelola administrasi organisasi. Selama mengemban amanah sebagai Sekretaris Organisasi Pelajar Ma’had Al-Zaytun (OPMAZ), saya bertanggung jawab dalam pengelolaan arsip surat-menyurat, koordinasi operasional harian, serta komunikasi antar divisi secara terstruktur.
                </p>
                <p>
                  Saya memiliki kompetensi dalam mengolah data menggunakan Microsoft Excel serta menyusun dokumen presentasi profesional menggunakan Microsoft PowerPoint. Setiap dokumen yang dihasilkan dikerjakan dengan standar kerapian, transparansi, dan akurasi tinggi.
                </p>
              </div>

              {/* Achievements: styled like checklist items */}
              <div className="space-y-3 pt-2">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-[6px] bg-bone-dark/50 border border-black/5 flex items-center justify-center text-deep-teal mt-0.5 shrink-0 shadow-clay-inset">
                      <Check size={11} className="stroke-[3]" />
                    </span>
                    <span className="text-xs text-ink-soft font-semibold leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              {/* Action row with tactile buttons */}
              <div className="flex flex-wrap gap-4 items-center pt-4 border-t border-black/5">
                <a 
                  href="#experience" 
                  className="clay-button-primary text-[10px] uppercase tracking-wider font-bold"
                >
                  <Download size={13} strokeWidth={2.5} />
                  Unduh CV Lengkap
                </a>
                
                <a 
                  href="#about-gallery" 
                  className="group text-[10px] uppercase tracking-widest text-deep-teal hover:text-amber-clay-dark font-extrabold transition-all flex items-center gap-1"
                >
                  Lihat Galeri & 3D
                  <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Profile Picture Card */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2"
          >
            <div className="relative w-72 h-[340px] group flex items-center justify-center">
              {/* Binder folder-style card wrapper */}
              <div className="w-full h-full rounded-[28px] bg-cream border border-white p-3.5 shadow-clay-raised relative flex flex-col justify-between">
                
                {/* Picture Frame */}
                <div className="w-full h-[82%] rounded-[18px] overflow-hidden bg-bone-dark/30 shadow-clay-inset relative border border-black/5">
                  <img 
                    src={images.gallery_admin || "/Gambar WhatsApp 2024-08-19 pukul 21.43.27_df60a54b.png"}
                    alt="M. Faiz Dzahin Portrait" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Footer labels inside folder card */}
                <div className="flex justify-between items-center px-1 pt-1.5 border-t border-black/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-sans font-bold text-ink-navy leading-none">Faiz Dzahin</span>
                    <span className="text-[7px] font-mono text-ink-soft uppercase tracking-widest mt-0.5 leading-none">Administrative</span>
                  </div>
                  <span className="text-[8px] font-mono font-bold text-amber-clay-dark bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">OPMAZ_OFFICIAL</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ==================== UNIFIED 3D RIBBON & ARCHIVAL GALLERY SECTION ==================== */}
        
        {/* Continuous Section Anchor & Divider */}
        <div id="about-gallery" className="scroll-mt-24 pt-24" />
        <div id="gallery-3d" className="scroll-mt-24" />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent mb-16" />

        {/* Section Header with View Modes and Parameter Controls */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="text-xs font-bold uppercase tracking-widest text-deep-teal font-mono">
                THREEUI THREE.JS R149 · ARSIP RESMI & RUANG 3D
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 font-mono text-[9px] font-bold text-amber-clay-dark uppercase">
                16 Cylindrical Panels
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-ink-navy tracking-tight">
              Galeri Terpadu & <span className="text-amber-clay-dark italic font-semibold">Cylindrical Ribbon 3D</span>
            </h2>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={scrollViewport}
              transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
              className="h-[3px] w-20 bg-amber-clay rounded-full mt-3 origin-left"
            />
            <p className="text-xs md:text-sm text-ink-soft font-sans font-medium mt-3 max-w-2xl leading-relaxed">
              Memadukan arsip administratif & foto potret diri dengan simulasi orbit tiga dimensi WebGL ThreeUI. Anda dapat menyesuaikan parameter shader dan memilih tekstur secara interaktif.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Mode Buttons */}
            <div className="inline-flex p-1 bg-bone-dark/30 rounded-2xl border border-black/5 shadow-clay-inset">
              <button
                onClick={() => setGalleryViewMode('combined')}
                className={`px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  galleryViewMode === 'combined'
                    ? 'bg-cream text-ink-navy shadow-clay-subtle border border-white'
                    : 'text-ink-soft hover:text-ink-navy'
                }`}
                title="Tampilkan 3D & Berkas bersamaan"
              >
                <Layers size={12} className="text-deep-teal" />
                Terpadu
              </button>
              <button
                onClick={() => setGalleryViewMode('3d')}
                className={`px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  galleryViewMode === '3d'
                    ? 'bg-cream text-ink-navy shadow-clay-subtle border border-white'
                    : 'text-ink-soft hover:text-ink-navy'
                }`}
                title="Tampilkan hanya ruang 3D Ribbon"
              >
                <Box size={12} className="text-amber-clay-dark" />
                Ruang 3D
              </button>
              <button
                onClick={() => setGalleryViewMode('cards')}
                className={`px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  galleryViewMode === 'cards'
                    ? 'bg-cream text-ink-navy shadow-clay-subtle border border-white'
                    : 'text-ink-soft hover:text-ink-navy'
                }`}
                title="Tampilkan hanya katalog kartu berkas"
              >
                <LayoutGrid size={12} className="text-deep-teal" />
                Katalog Berkas
              </button>
            </div>

            {/* Parameter Drawer Toggle */}
            <button
              onClick={() => setShowControls(!showControls)}
              className="clay-button-secondary text-[11px] uppercase tracking-wider font-mono font-bold inline-flex items-center gap-2"
            >
              <Sliders size={13} className="text-deep-teal" />
              {showControls ? 'Tutup Parameter' : 'Parameter Shader'}
            </button>
          </div>
        </motion.div>

        {/* Live ThreeUI Parameter Controls Drawer */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-6 rounded-[24px] bg-cream border border-white shadow-clay-raised overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-black/5">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-clay-dark" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink-navy">
                    ThreeUI Shader & Texture Controller
                  </span>
                </div>

                {/* Texture Selector for 3D Cylinder */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-ink-soft uppercase">Sumber Tekstur 3D:</span>
                  <select
                    value={textureSource}
                    onChange={(e) => setTextureSource(e.target.value as 'all' | 'personal' | 'threeui')}
                    className="px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg bg-bone-dark/40 border border-black/10 text-ink-navy cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-clay"
                  >
                    <option value="all">Koleksi Terpadu (Pribadi + ThreeUI)</option>
                    <option value="personal">Hanya Foto Pribadi & Organisasi</option>
                    <option value="threeui">Hanya Panel Arsitektur ThreeUI</option>
                  </select>

                  <button
                    onClick={handleResetParams}
                    className="px-2.5 py-1 rounded-lg bg-bone-dark/30 hover:bg-bone-dark/50 text-[10px] font-mono font-bold text-ink-soft hover:text-ink-navy flex items-center gap-1 border border-black/5 cursor-pointer ml-2"
                    title="Reset parameter ke default"
                  >
                    <RotateCw size={11} />
                    Reset
                  </button>
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Speed */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-ink-soft">Speed Orbit</span>
                    <span className="font-bold text-ink-navy">{params.speed.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="0.05"
                    value={params.speed}
                    onChange={(e) => setParams({ ...params, speed: parseFloat(e.target.value) })}
                    className="w-full accent-amber-clay cursor-pointer"
                  />
                </div>

                {/* Scale */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-ink-soft">Scale Skala</span>
                    <span className="font-bold text-ink-navy">{params.scale.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="1.35"
                    step="0.05"
                    value={params.scale}
                    onChange={(e) => setParams({ ...params, scale: parseFloat(e.target.value) })}
                    className="w-full accent-amber-clay cursor-pointer"
                  />
                </div>

                {/* Opacity */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-ink-soft">Opacity Transparansi</span>
                    <span className="font-bold text-ink-navy">{params.opacity.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={params.opacity}
                    onChange={(e) => setParams({ ...params, opacity: parseFloat(e.target.value) })}
                    className="w-full accent-amber-clay cursor-pointer"
                  />
                </div>

                {/* Hue */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-ink-soft">Hue Rotasi Warna</span>
                    <span className="font-bold text-ink-navy">{params.hue}°</span>
                  </div>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    step="5"
                    value={params.hue}
                    onChange={(e) => setParams({ ...params, hue: parseInt(e.target.value, 10) })}
                    className="w-full accent-amber-clay cursor-pointer"
                  />
                </div>

                {/* Saturation */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-ink-soft">Saturation Kejenuhan</span>
                    <span className="font-bold text-ink-navy">{params.saturation.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.05"
                    value={params.saturation}
                    onChange={(e) => setParams({ ...params, saturation: parseFloat(e.target.value) })}
                    className="w-full accent-amber-clay cursor-pointer"
                  />
                </div>

                {/* Brightness */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-ink-soft">Brightness Kecerahan</span>
                    <span className="font-bold text-ink-navy">{params.brightness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.4"
                    max="1.6"
                    step="0.05"
                    value={params.brightness}
                    onChange={(e) => setParams({ ...params, brightness: parseFloat(e.target.value) })}
                    className="w-full accent-amber-clay cursor-pointer"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D CYLINDRICAL RIBBON STAGE (rendered in 'combined' or '3d' mode) */}
        {(galleryViewMode === 'combined' || galleryViewMode === '3d') && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.99 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="mb-16 relative rounded-[32px] overflow-hidden border border-white bg-[#f1f1ef] shadow-clay-raised group"
          >
            {/* Header badges */}
            <div className="absolute top-5 left-6 z-20 flex flex-wrap items-center gap-2 sm:gap-3 pointer-events-none">
              <span className="px-3 py-1.5 rounded-xl bg-white/80 backdrop-blur-md border border-black/5 shadow-clay-subtle font-mono text-[10px] font-extrabold uppercase tracking-wider text-deep-teal flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                16 Cylindrical Panels
              </span>
              <span className="hidden sm:inline-flex px-3 py-1.5 rounded-xl bg-white/70 backdrop-blur-md border border-black/5 font-mono text-[10px] font-bold text-ink-soft items-center gap-1.5">
                <Layers size={12} className="text-amber-clay-dark" />
                Vertical Rail Orbit
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-amber-100/80 border border-amber-200 text-amber-clay-dark font-mono text-[9px] font-bold">
                {active3dTextures.length} Tekstur Aktif
              </span>
            </div>

            {/* ThreeUI WebGL Canvas */}
            <div className="shader-frame h-[480px] md:h-[580px] w-full relative">
              <Gallery
                speed={params.speed}
                scale={params.scale}
                opacity={params.opacity}
                hue={params.hue}
                saturation={params.saturation}
                brightness={params.brightness}
                images={active3dTextures}
              />
            </div>

            {/* Bottom Dossier Footer */}
            <div className="p-4 md:p-6 bg-cream/95 backdrop-blur-md border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left relative z-20">
              <div>
                <p className="text-xs md:text-sm font-display font-bold text-ink-navy">
                  ThreeUI Gallery — Visual Architecture & Archival Orbit
                </p>
                <p className="text-[11px] font-sans text-ink-soft">
                  Enam belas panel melengkung presisi mengorbit poros silinder pada latar paper grid. Mengkombinasikan foto riil Faiz Dzahin dan panel ThreeUI.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2.5 py-1 rounded-lg bg-bone-dark/40 border border-black/5 font-mono text-[9px] font-bold text-ink-soft uppercase tracking-wider">
                  WebGL Alpha Antialiased
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 font-mono text-[9px] font-bold text-amber-clay-dark uppercase tracking-wider">
                  Three.js r149
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ARCHIVAL CATALOG & STACKING CARDS (rendered in 'combined' or 'cards' mode) */}
        {(galleryViewMode === 'combined' || galleryViewMode === 'cards') && (
          <div className="grid lg:grid-cols-12 gap-12 items-start relative pt-4">
            
            {/* Left Column: Sticky controls, categories & petunjuk */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              className="lg:col-span-5 lg:sticky lg:top-28 space-y-8"
            >
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-deep-teal font-mono block">
                  # KATALOG BERKAS & DOKUMENTASI LENGKAP
                </span>
                <h3 className="text-3xl md:text-4xl font-display font-medium text-ink-navy tracking-tight leading-tight">
                  Koleksi Foto & <span className="text-amber-clay-dark italic font-semibold">Panel Visual</span>
                </h3>
                <p className="text-ink-soft font-sans font-medium text-sm leading-relaxed">
                  Jelajahi foto-foto nyata kegiatan organisasi OPMAZ, amalan mimbar Ma'had Al-Zaytun, potret profesional, serta panel arsitektur ThreeUI yang mengorbit di ruang 3D.
                </p>
                
                <div className="bg-bone-dark/30 rounded-xl p-4 border border-black/5 shadow-clay-inset space-y-2">
                  <span className="text-[10px] font-bold text-amber-clay-dark block uppercase">Petunjuk Interaksi:</span>
                  <p className="text-[11px] text-ink-navy font-semibold leading-relaxed">
                    Klik kartu untuk membuka pratinjau resolusi tinggi (Lightbox Modal). Anda juga dapat mengunggah file foto kustom ke slot foto pribadi yang langsung tersimpan di browser Anda.
                  </p>
                </div>
              </div>

              {/* Custom Category Filter Tabs as a Binder */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-ink-soft uppercase tracking-wider block">PILIH KATEGORI BERKAS:</span>
                <div className="inline-flex flex-col p-1.5 bg-bone-dark/30 rounded-[18px] border border-black/5 shadow-clay-inset w-full sm:w-auto min-w-[240px]">
                  {(['semua', 'aktivitas', 'selfie', 'visual3d'] as const).map((filter) => {
                    const isActive = selectedFilter === filter;
                    const labels: Record<string, string> = {
                      semua: `Semua Berkas (${GALLERY_SLOTS.length})`,
                      aktivitas: 'Aktivitas Organisasi',
                      selfie: 'Suka Foto / Potret',
                      visual3d: 'Panel 3D ThreeUI (5)',
                    };
                    return (
                      <button
                        key={filter}
                        onClick={() => setSelectedFilter(filter)}
                        className={`px-4 py-2 rounded-xl text-xs font-sans font-bold tracking-wide transition-all text-left cursor-pointer flex items-center justify-between ${
                          isActive 
                            ? 'text-ink-navy bg-cream shadow-clay-subtle border border-white/50' 
                            : 'text-ink-soft hover:text-ink-navy'
                        }`}
                      >
                        <span>{labels[filter]}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-clay" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="hidden lg:flex items-center gap-2.5 text-[10px] text-ink-soft font-mono font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-clay animate-pulse" />
                <span>Gulir ke bawah untuk melihat tumpukan kartu arsip 👇</span>
              </div>
            </motion.div>

            {/* Right Column: Sticky Vertical Stacking Stack */}
            <div className="lg:col-span-7 space-y-4 relative pb-24">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => {
                  const imageSrc = getItemImgSrc(item);
                  const isCustomPhoto = item.localStorageKey ? !!images[item.localStorageKey] : false;
                  const hasActivePhoto = !!imageSrc;

                  const rotationStyles = [
                    'rotate-1 hover:rotate-0',
                    '-rotate-1 hover:rotate-0',
                    'rotate-2 hover:rotate-0',
                    '-rotate-2 hover:rotate-0',
                  ];
                  const rotationClass = rotationStyles[index % rotationStyles.length];

                  return (
                    <div
                      key={item.id}
                      className="relative lg:sticky lg:top-28 w-full flex justify-center py-4 lg:py-6"
                      style={{
                        zIndex: index + 10,
                      }}
                    >
                      <motion.div
                        layout
                        id={`about-gallery-slot-${item.id}`}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={scrollViewport}
                        onClick={() => {
                          if (hasActivePhoto) {
                            const idx = itemsWithPhotos.findIndex(activeItem => activeItem.id === item.id);
                            if (idx !== -1) {
                              setActivePhotoIndex(idx);
                            }
                          }
                        }}
                        className={`group relative aspect-[3/4] w-full max-w-[340px] rounded-[24px] border bg-cream p-3 shadow-clay-raised hover:shadow-clay-raised-hover transition-all duration-400 ${rotationClass} ${
                          hasActivePhoto 
                            ? 'border-white hover:border-amber-clay/40' 
                            : 'border-dashed border-black/10 hover:border-amber-clay/30 bg-cream/50'
                        }`}
                      >
                        
                        {/* Hidden Input File Element for user uploads */}
                        {item.localStorageKey && (
                          <input 
                            type="file"
                            ref={el => fileInputRefs.current[item.localStorageKey!] = el}
                            onChange={(e) => handleImageFileChange(item.localStorageKey!, e)}
                            accept="image/*"
                            className="hidden"
                          />
                        )}

                        {/* Photo Content */}
                        {hasActivePhoto ? (
                          <div className="w-full h-full rounded-[16px] overflow-hidden relative border border-black/5 bg-bone-dark/10 flex flex-col justify-between">
                            
                            {/* Image Box */}
                            <div className="w-full h-full absolute inset-0 z-0">
                              <img
                                src={imageSrc}
                                alt={item.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                              />
                              {/* Ambient dark mask on bottom for readable text */}
                              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />
                            </div>

                            {/* Top badge & action buttons */}
                            <div className="relative z-20 flex justify-between items-center p-3">
                              {item.is3dAsset ? (
                                <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[8px] font-mono font-bold text-amber-clay uppercase border border-white/10">
                                  3D RIBBON PANEL
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[8px] font-mono font-bold text-white/90 uppercase border border-white/10">
                                  FOTO RESMI
                                </span>
                              )}

                              {item.localStorageKey && (
                                <div className="flex gap-1.5">
                                  {isCustomPhoto && (
                                    <button
                                      onClick={(e) => handleRemoveImage(item.localStorageKey!, e)}
                                      className="w-7 h-7 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-105"
                                      title="Hapus Foto Kustom"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  )}
                                  <button
                                    onClick={(e) => triggerFileInput(item.localStorageKey!, e)}
                                    className="w-7 h-7 rounded-lg bg-cream/95 text-ink-navy hover:text-amber-clay-dark flex items-center justify-center shadow-lg border border-white cursor-pointer transition-transform hover:scale-105"
                                    title="Ganti / Unggah Foto"
                                  >
                                    <Upload size={12} />
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Info Overlay Box */}
                            <div className="absolute inset-0 p-5 flex flex-col justify-end z-10 pointer-events-none text-white">
                              <span className="text-[8px] tracking-widest text-amber-clay font-bold uppercase mb-1 w-fit bg-black/60 px-2 py-0.5 rounded border border-white/10">
                                {item.category === 'aktivitas' 
                                  ? 'AKTIVITAS ORGANISASI' 
                                  : item.category === 'selfie' 
                                  ? 'SUKA FOTO / POTRET' 
                                  : 'THREEUI 3D ASSET'}
                              </span>

                              <h4 className="text-sm font-sans font-bold leading-tight group-hover:text-amber-clay transition-colors">
                                {item.title}
                              </h4>

                              <p className="text-[10px] text-white/80 font-sans font-semibold leading-relaxed mt-1 line-clamp-2">
                                {item.description}
                              </p>

                              {/* View details indicator */}
                              <div className="absolute bottom-5 right-5 w-8 h-8 rounded-xl border border-white/20 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
                                <Eye size={12} className="stroke-[2.5]" />
                              </div>
                            </div>

                          </div>
                        ) : (
                          
                          // EMPTY SLOT REQUIRING USER FILE UPLOAD
                          <div 
                            onClick={(e) => item.localStorageKey && triggerFileInput(item.localStorageKey, e)}
                            className="w-full h-full rounded-[16px] border border-dashed border-black/10 bg-bone-dark/20 flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:bg-bone-dark/40 transition-colors relative"
                          >
                            <div className="w-11 h-11 rounded-2xl bg-cream flex items-center justify-center text-deep-teal border border-white shadow-clay-subtle group-hover:text-amber-clay-dark group-hover:scale-105 transition-all duration-300 mb-3">
                              <Upload size={16} />
                            </div>
                            
                            <h4 className="text-xs font-sans font-bold text-ink-navy mb-1.5">
                              {item.title}
                            </h4>

                            <p className="text-[10px] text-ink-soft max-w-xs px-2 font-semibold leading-normal">
                              {item.placeholderLabel || "Unggah berkas foto Anda"}. Foto asli tersimpan aman di browser.
                            </p>

                            <div className="absolute inset-1 border border-dashed border-black/[0.03] rounded-[14px]" />
                          </div>
                        )}
                      </motion.div>
                    </div>
                  );
                })}
              </AnimatePresence>

              {filteredItems.length === 0 && (
                <div className="py-20 text-center text-ink-soft bg-cream/40 border border-dashed border-black/10 rounded-[24px] shadow-clay-inset">
                  <p className="font-sans font-bold text-xs">Tidak ada berkas foto dalam kategori filter ini.</p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>

      {/* ==================== INTERACTIVE LIGHTBOX OVERLAY ==================== */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          (() => {
            const activeItem = itemsWithPhotos[activePhotoIndex];
            if (!activeItem) return null;
            const activeSrc = getItemImgSrc(activeItem);

            return (
              <motion.div
                id="lightbox-portal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
                onClick={() => setActivePhotoIndex(null)}
              >
                
                {/* Close button top right */}
                <button 
                  id="close-lightbox-btn"
                  onClick={() => setActivePhotoIndex(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-cream border border-white text-ink-navy flex items-center justify-center shadow-clay-raised hover:-rotate-90 transition-transform duration-300 z-50 cursor-pointer"
                  aria-label="Tutup Galeri"
                >
                  <X size={16} className="stroke-[2.2]" />
                </button>

                {/* Left Controller Arrow */}
                <button 
                  id="prev-lightbox-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream border border-white text-ink-navy flex items-center justify-center shadow-clay-raised hover:scale-105 transition-transform z-40 cursor-pointer"
                  aria-label="Foto Sebelumnya"
                >
                  <ChevronLeft size={18} className="stroke-[2.5]" />
                </button>

                {/* Right Controller Arrow */}
                <button 
                  id="next-lightbox-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-cream border border-white text-ink-navy flex items-center justify-center shadow-clay-raised hover:scale-105 transition-transform z-40 cursor-pointer"
                  aria-label="Foto Selanjutnya"
                >
                  <ChevronRightIcon size={18} className="stroke-[2.5]" />
                </button>

                {/* Photo Card container detail - Archival Dossier Modal */}
                <motion.div
                  initial={{ scale: 0.96 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.96 }}
                  transition={{ type: "spring", damping: 24 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-4xl bg-cream border border-white rounded-[24px] overflow-hidden shadow-clay-raised grid md:grid-cols-12 max-h-[92vh] md:max-h-[82vh] relative p-4 gap-4"
                >
                  
                  {/* Photo Box side */}
                  <div className="md:col-span-7 bg-bone-dark/30 rounded-[16px] flex items-center justify-center relative min-h-[30vh] md:min-h-0 max-h-[45vh] md:max-h-full overflow-hidden border border-black/5 shadow-clay-inset">
                    {activeSrc ? (
                      <img
                        src={activeSrc}
                        alt={activeItem.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain max-h-[45vh] md:max-h-full"
                      />
                    ) : (
                      <div className="text-ink-soft font-mono text-xs">Tidak ada gambar</div>
                    )}
                    
                    <div className="absolute bottom-3 left-3 bg-cream/90 border border-white backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1 text-[8px] font-bold text-deep-teal shadow-sm">
                      <ZoomIn size={9} />
                      <span>PRATINJAU FOTO RESOLUSI PENUH</span>
                    </div>
                  </div>

                  {/* Text Meta Side */}
                  <div className="md:col-span-5 p-4 flex flex-col justify-between relative h-full">
                    
                    <div className="space-y-4">
                      <div>
                        <span className="text-[8px] font-mono uppercase tracking-widest text-amber-clay-dark font-extrabold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {activeItem.category === 'aktivitas' 
                            ? 'Aktivitas Organisasi' 
                            : activeItem.category === 'selfie' 
                            ? 'Suka Foto / Potret' 
                            : 'ThreeUI 3D Ribbon Panel'}
                        </span>
                        <h3 className="text-xl font-display font-bold text-ink-navy mt-2 leading-tight tracking-tight">
                          {activeItem.title}
                        </h3>
                      </div>

                      {/* Metadata fields */}
                      <div className="space-y-2 border-y border-black/5 py-3">
                        <div className="flex items-center gap-2.5 text-ink-soft text-xs font-semibold">
                          <ImageIcon size={12} className="text-deep-teal" />
                          <span>{activeItem.date}</span>
                        </div>

                        <div className="flex items-center gap-2.5 text-ink-soft text-xs font-semibold">
                          <MapPin size={12} className="text-deep-teal" />
                          <span>{activeItem.location}</span>
                        </div>
                      </div>
                      
                      <p className="text-ink-soft font-sans font-semibold text-xs sm:text-sm leading-relaxed max-h-[22vh] overflow-y-auto pr-1">
                        {activeItem.description}
                      </p>
                    </div>

                    {/* Counter within modal */}
                    <div className="pt-4 border-t border-black/5 flex items-center justify-between text-[9px] font-bold text-ink-soft">
                      <span>Muhammad Faiz Dzahin</span>
                      <span>Berkas {activePhotoIndex + 1} dari {itemsWithPhotos.length}</span>
                    </div>
                  </div>

                </motion.div>
              </motion.div>
            );
          })()
        )}
      </AnimatePresence>
    </section>
  );
}
