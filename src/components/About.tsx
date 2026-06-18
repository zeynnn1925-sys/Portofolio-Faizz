import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, MapPin, ChevronRight, Check,
  Camera, Upload, X, ChevronLeft, ChevronRight as ChevronRightIcon, 
  ZoomIn, Eye, Trash2, Image as ImageIcon
} from 'lucide-react';

export interface GalleryItem {
  id: number;
  title: string;
  category: 'aktivitas' | 'selfie';
  date: string;
  location: string;
  description: string;
  localStorageKey: string;
  defaultSrc?: string;
  placeholderLabel: string;
  detailsLabel: string;
}

export default function About() {
  const [selectedFilter, setSelectedFilter] = useState<'semua' | 'aktivitas' | 'selfie'>('semua');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const carouselRef = useRef<HTMLDivElement>(null);

  // Dynamic Image Slots loaded from LocalStorage
  const [images, setImages] = useState<{ [key: string]: string }>({
    gallery_admin: localStorage.getItem('gallery_admin') || '',
    gallery_studio: localStorage.getItem('gallery_studio') || '',
    gallery_khotib: localStorage.getItem('gallery_khotib') || '',
    gallery_belajar: localStorage.getItem('gallery_belajar') || '',
  });



  const highlights = [
    "Penguasaan formula tingkat lanjut Microsoft Excel untuk efisiensi",
    "Sistematisasi & pengarsipan digital 200+ surat & izin per tahun",
    "Kolaborasi kepemimpinan dalam organisasi skala ratusan santri/santriwati"
  ];

  const GALLERY_SLOTS: GalleryItem[] = [
    {
      id: 1,
      title: "Kader Administrasi Utama (Sekretaris OPMAZ)",
      category: "aktivitas",
      date: "19 Agustus 2024",
      location: "Ruang Tata Usaha OPMAZ, Indramayu",
      description: "Foto profil resmi sebagai Sekretaris Utama Organisasi Pelajar Ma'had Al-Zaytun yang bertanggung jawab atas pengorganisasian arsip, pengeluaran dispensasi, dan penataan administrasi harian santi.",
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
      description: "Foto potret representasi kelulusan terbaik santri MAS Ma'had Al-Zaytun, menonjolkan kepercayaan diri dan kesiapan mengemban tantangan baru.",
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
      placeholderLabel: "Unggah Foto Khotib (Peci & Jantung Podium)",
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
    }
  ];

  // Filtered array based on active criteria
  const filteredItems = selectedFilter === 'semua' 
    ? GALLERY_SLOTS 
    : GALLERY_SLOTS.filter(item => item.category === selectedFilter);

  // Helper to determine active image source (uploaded base64 vs default system path)
  const getItemImgSrc = (item: GalleryItem): string | undefined => {
    const uploaded = images[item.localStorageKey];
    if (uploaded) return uploaded;
    return item.defaultSrc || undefined;
  };

  // List of items that actually have active photos
  const itemsWithPhotos = filteredItems.filter(item => !!getItemImgSrc(item));

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

          // Scaled preserving Aspect Ratio
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

  // Helper action to upload files to LocalStorage as binary data url
  const triggerFileInput = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRefs.current[key]?.click();
  };

  const handleImageFileChange = async (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Up to 10MB input is supported because we will downscale it
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
    localStorage.removeItem(key);
    setImages(prev => ({ ...prev, [key]: '' }));
  };

  // Keyboard Navigation inside lighbox
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

  // Carousel smooth horizontal scroll operations
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollAmount = container.clientWidth * 0.75; // Scroll 75% of viewport width
    const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  // Scroll to starting origin when active categorization filters are switched
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
  }, [selectedFilter]);



  return (
    <section id="about" className="py-24 md:py-32 relative bg-[#09090b]">
      
      {/* Background grids */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-amber-500/[0.015] blur-[150px]"></div>
        <div className="absolute bottom-[40%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-neutral-400/[0.015] blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[35vw] h-[35vw] rounded-full bg-pink-500/[0.005] blur-[130px]"></div>
        <div className="absolute inset-0 bg-dot-grid opacity-15"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#c5a880] font-mono block mb-3"># Profil Singkat & Dokumentasi</span>
          <h2 className="text-4xl md:text-6xl font-display font-semibold text-white tracking-tight">
            Tentang <span className="text-gradient-gold italic font-normal">Saya</span>
          </h2>
          <div className="h-[1px] w-20 bg-gradient-to-r from-[#c5a880] via-[#eedec9] to-transparent mt-4"></div>
        </motion.div>

        {/* 2-Column Grid: Left: Story & text details, Right: Exquisitely framed image */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative Details */}
          <div className="lg:col-span-7 flex flex-col gap-8 order-2 lg:order-1">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3.5xl font-display font-medium text-white tracking-tight leading-tight">
                Dedikasi, Presisi, dan <span className="text-gradient-gold italic font-normal">Integritas Administratif</span> Organisasi.
              </h3>
              
              <p className="text-neutral-400 font-sans font-light text-sm sm:text-base leading-relaxed">
                Lulusan Madrasah Aliyah Swasta (MAS) Ma’had Al-Zaytun jurusan Ilmu Pengetahuan Sosial angkatan 2025 yang berfokus pada efisiensi dan tata kelola administrasi organisasi. Selama mengemban amanah sebagai Sekretaris Organisasi Pelajar Ma’had Al-Zaytun (OPMAZ), saya bertanggung jawab dalam pengelolaan arsip surat-menyurat, koordinasi operasional harian, serta komunikasi antar divisi secara terstruktur.
              </p>

              <p className="text-neutral-400 font-sans font-light text-sm sm:text-base leading-relaxed">
                Saya memiliki kompetensi dalam mengolah data menggunakan Microsoft Excel serta menyusun dokumen presentasi profesional menggunakan Microsoft PowerPoint. Setiap dokumen yang dihasilkan dikerjakan dengan standar kerapian, transparansi, dan akurasi tinggi.
              </p>

              {/* Achievements with elegant design details */}
              <div className="space-y-3.5 pt-2">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded bg-zinc-900 border border-white/10 flex items-center justify-center text-[#c5a880] mt-0.5 shrink-0">
                      <Check size={11} className="stroke-[3]" />
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-300 font-sans font-light leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-wrap gap-4 items-center pt-2">
              <a 
                href="#experience" 
                className="inline-flex items-center gap-2 bg-neutral-100 hover:bg-[#c5a880] text-zinc-950 px-6 py-3.5 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Download size={13} strokeWidth={2.5} />
                Unduh CV Lengkap
              </a>
              
              <a 
                href="#contact" 
                className="text-[10px] uppercase tracking-widest text-neutral-400 hover:text-white font-bold transition-all flex items-center gap-1.5"
              >
                Hubungi Saya
                <ChevronRight size={13} />
              </a>
            </div>
          </div>

          {/* Right Column: Golden Gilded Framing showing current profile picture */}
          <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-80 h-80 sm:w-96 sm:h-96 group flex items-center justify-center"
            >
              
              {/* Back ambient warm soft spot */}
              <div className="absolute inset-4 rounded-full bg-[#c5a880]/10 blur-2xl group-hover:bg-[#c5a880]/15 transition-all duration-500"></div>
              
              {/* Golden vector SVG layout with luxurious double border frame (curated vector design) */}
              <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative z-10 overflow-visible select-none">
                <defs>
                  {/* Subtle golden background gradient for outer ring */}
                  <linearGradient id="gold-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a4845c" />
                    <stop offset="30%" stopColor="#eedec9" />
                    <stop offset="70%" stopColor="#c5a880" />
                    <stop offset="100%" stopColor="#82643a" />
                  </linearGradient>

                  {/* Inner ring gradient */}
                  <linearGradient id="gold-stroke-inner" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e5d4bc" />
                    <stop offset="50%" stopColor="#a4845c" />
                    <stop offset="100%" stopColor="#c5a880" />
                  </linearGradient>

                  {/* Classic squircle custom shape mask for cropping the photo with extreme elegance */}
                  <clipPath id="squircle-clip-about">
                    <path d="M 200,60 
                             C 285,60 340,115 340,200 
                             C 340,285 285,340 200,340 
                             C 115,340 60,285 60,200 
                             C 60,115 115,60 200,60 Z" />
                  </clipPath>
                </defs>

                {/* Layer 1: Outer delicate golden squircle frame */}
                <path 
                  d="M 200,52 
                     C 292,52 348,108 348,200 
                     C 348,292 292,348 200,348 
                     C 108,348 52,292 52,200 
                     C 52,108 108,52 200,52 Z"
                  fill="none"
                  stroke="url(#gold-stroke)"
                  strokeWidth="1.5"
                  className="transition-all duration-500 group-hover:scale-[1.01]"
                  style={{ transformOrigin: "200px 200px" }}
                />

                {/* Layer 2: Middle floating dashed marker ring */}
                <circle
                  cx="200"
                  cy="200"
                  r="158"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="1.2"
                  strokeDasharray="4,8"
                />

                {/* Layer 3: Inner golden squircle border directly surrounding the image */}
                <path 
                  d="M 200,58 
                     C 287,58 342,113 342,200 
                     C 342,287 287,342 200,342 
                     C 113,342 58,287 58,200 
                     C 58,113 113,58 200,58 Z"
                  fill="none"
                  stroke="url(#gold-stroke-inner)"
                  strokeWidth="2.5"
                  className="transition-all duration-300 group-hover:opacity-90"
                  style={{ transformOrigin: "200px 200px" }}
                />

                {/* Cropped Image inside custom premium shape */}
                <image
                  href={images.gallery_admin || "/Gambar WhatsApp 2024-08-19 pukul 21.43.27_df60a54b.png"}
                  x="56"
                  y="56"
                  width="288"
                  height="288"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#squircle-clip-about)"
                  className="transition-all duration-[1000ms] ease-out group-hover:scale-105"
                  style={{ transformOrigin: "200px 200px" }}
                  referrerPolicy="no-referrer"
                />
              </svg>

              {/* Little vector corner marks that frame the overall layout */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/20"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-white/20"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-white/20"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/20"></div>
            </motion.div>
          </div>

        </div>




        {/* ==================== INTEGRATED REAL PHOTO GALLERY SUB-SECTION ==================== */}
        
        {/* Continuous Divider */}
        <div id="about-gallery" className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-24 scroll-mt-24" />

        {/* 2-Column Grid Layout for Stacking Cards */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
          
          {/* Left Column: Sticky controls & info panel */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#c5a880] font-mono block mb-3"># Galeri Arsip & Potret</span>
              <h3 className="text-3xl md:text-5xl font-display font-semibold text-white tracking-tight leading-tight">
                Koleksi Foto <span className="text-gradient-gold italic font-normal">Aktivitas Saya</span>
              </h3>
              <p className="text-neutral-400 font-sans font-light text-sm mt-4 leading-relaxed">
                Lihat foto-foto nyata kegiatan organisasi, amalan mimbar Ma'had Al-Zaytun, perjalanan commuter, dan suku potret saya.
              </p>
              <p className="text-[#eedec9] font-sans font-light text-xs mt-3 leading-relaxed">
                Klik slot foto untuk mengganti dengan file foto asli Anda langsung ke browser. Gulir halaman ke bawah untuk melihat tumpukan foto (stacking cards) berikutnya secara mengalir.
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-2.5 text-xs text-neutral-500 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              <span>Gulir ke bawah untuk menumpuk foto 👇</span>
            </div>
          </div>

          {/* Right Column: Sticky Vertical Stacking Stack */}
          <div className="lg:col-span-7 space-y-0 relative pb-24">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                const imageSrc = getItemImgSrc(item);
                const isDefaultPhotoUsed = !images[item.localStorageKey] && !!item.defaultSrc;
                const hasActivePhoto = !!imageSrc;

                // Rotations styling mimicking the component card's rotations
                const rotationStyles = [
                  'rotate-2 hover:rotate-0',
                  '-rotate-2 hover:rotate-0',
                  'rotate-1 hover:rotate-0',
                  '-rotate-1 hover:rotate-0',
                  'skew-x-1 hover:skew-x-0',
                  '-skew-x-1 hover:skew-x-0'
                ];
                const rotationClass = rotationStyles[index % rotationStyles.length];

                return (
                  <div
                    key={item.id}
                    className="relative lg:sticky lg:top-28 w-full flex justify-center py-4 lg:py-6"
                    style={{
                      // Staggered index so the higher items appear with correct depth stack z-index
                      zIndex: index + 10,
                    }}
                  >
                    <motion.div
                      layout
                      id={`about-gallery-slot-${item.id}`}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => {
                        if (hasActivePhoto) {
                          const idx = itemsWithPhotos.findIndex(activeItem => activeItem.id === item.id);
                          if (idx !== -1) {
                            setActivePhotoIndex(idx);
                          }
                        }
                      }}
                      className={`group relative aspect-[3/4] w-full max-w-[340px] rounded-2xl border bg-zinc-950/95 overflow-hidden cursor-pointer shadow-2xl transition-all duration-400 ${rotationClass} ${
                        hasActivePhoto 
                          ? 'border-white/10 hover:border-[#c5a880]/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.85)]' 
                          : 'border-dashed border-white/10 hover:border-[#c5a880]/30 bg-zinc-950/40'
                      }`}
                    >
                      
                      {/* Hidden Input File Element for Dynamic Local Uploading */}
                      <input 
                        type="file"
                        ref={el => fileInputRefs.current[item.localStorageKey] = el}
                        onChange={(e) => handleImageFileChange(item.localStorageKey, e)}
                        accept="image/*"
                        className="hidden"
                      />

                      {/* CASE 1: SLOT HAS ACTIVE PHOTO */}
                      {hasActivePhoto ? (
                        <>
                          <div className="absolute inset-0 overflow-hidden w-full h-full">
                            <img
                              src={imageSrc || undefined}
                              alt={item.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                            />
                            {/* Ambient shading masking */}
                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#09090b] via-black/40 to-transparent transition-opacity duration-300 opacity-90 group-hover:opacity-95" />
                            <div className="absolute inset-0 bg-[#c5a880]/5 mix-blend-color opacity-0 group-hover:opacity-40 transition-opacity duration-400" />
                          </div>

                          {/* Info Overlay Box */}
                          <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 pointer-events-none">
                            
                            {/* Category Label */}
                            <span className="text-[9px] font-mono tracking-widest text-[#c5a880] uppercase mb-2.5 bg-black/55 px-2 py-0.5 rounded border border-white/5 w-fit">
                              {item.category === 'aktivitas' ? 'Aktivitas Organisasi' : 'Suka Foto / Potret'}
                            </span>

                            {/* Title text */}
                            <h4 className="text-lg font-display font-medium text-white mb-1.5 group-hover:text-amber-200 transition-colors">
                              {item.title}
                            </h4>

                            {/* Collapsed Description */}
                            <p className="text-[11px] text-neutral-400 font-sans font-light leading-relaxed line-clamp-2 md:opacity-0 md:h-0 group-hover:opacity-100 group-hover:h-auto group-hover:mt-1 transition-all duration-500 overflow-hidden">
                              {item.description}
                            </p>

                            {/* Trigger labels (View details indicator) */}
                            <div className="absolute top-4 right-4 w-9 h-9 rounded-xl border border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center text-white/70 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
                              <Eye size={13} className="stroke-[2.5]" />
                            </div>
                          </div>


                        </>
                      ) : (
                        
                        // CASE 2: EMPTY SLOT REQUIRING USER FILE UPLOAD
                        <div 
                          onClick={(e) => triggerFileInput(item.localStorageKey, e)}
                          className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center z-10 transition-colors group-hover:bg-[#c5a880]/[0.02]"
                        >
                          <div className="w-12 h-12 rounded-2xl border border-dashed border-white/10 bg-zinc-950 flex items-center justify-center text-neutral-500 group-hover:text-[#c5a880] group-hover:border-[#c5a880]/40 group-hover:bg-zinc-900/60 transition-all duration-300 mb-4">
                            <Upload size={18} className="stroke-[1.5]" />
                          </div>

                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#c5a880]/60 mb-1.5 block">
                            Slot: {item.detailsLabel}
                          </span>
                          
                          <h4 className="text-sm font-sans font-medium text-neutral-300 px-4 mb-2 group-hover:text-white transition-colors">
                            {item.title}
                          </h4>

                          <p className="text-[11px] text-neutral-500 max-w-xs px-6 font-light leading-relaxed">
                            {item.placeholderLabel}. Foto asli Anda akan aman tersimpan lokal di browser.
                          </p>

                          {/* Small boundary highlight decoration */}
                          <div className="absolute inset-3 border border-dashed border-white/[0.02] rounded-xl pointer-events-none group-hover:border-[#c5a880]/10 transition-colors" />
                        </div>
                      )}

                      {/* Corner aesthetic details */}
                      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/5 pointer-events-none" />
                      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/5 pointer-events-none" />
                    </motion.div>
                  </div>
                );
              })}
            </AnimatePresence>

            {/* Empty placeholder if filtered layout yields nothing */}
            {filteredItems.length === 0 && (
              <div className="py-20 text-center text-neutral-500 bg-zinc-950/20 border border-dashed border-white/5 rounded-3xl">
                <p className="font-sans font-light text-sm">Tidak ada foto dalam kategori filter ini.</p>
              </div>
            )}
          </div>

        </div>

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
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 backdrop-blur-md p-4 sm:p-6 md:p-8"
                onClick={() => setActivePhotoIndex(null)}
              >
                
                {/* Close button top right */}
                <button 
                  id="close-lightbox-btn"
                  onClick={() => setActivePhotoIndex(null)}
                  className="absolute top-6 right-6 w-11 h-11 rounded-full bg-zinc-900/90 border border-white/10 hover:border-[#c5a880] text-white flex items-center justify-center transition-all duration-300 z-50 hover:-rotate-90"
                  aria-label="Tutup Galeri"
                >
                  <X size={18} className="stroke-[2.2]" />
                </button>

                {/* Left Controller Arrow */}
                <button 
                  id="prev-lightbox-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-900/90 border border-white/10 hover:border-[#c5a880] text-white flex items-center justify-center transition-all duration-300 z-40 hover:-translate-x-0.5"
                  aria-label="Foto Sebelumnya"
                >
                  <ChevronLeft size={20} className="stroke-[2.5]" />
                </button>

                {/* Right Controller Arrow */}
                <button 
                  id="next-lightbox-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-900/90 border border-white/10 hover:border-[#c5a880] text-white flex items-center justify-center transition-all duration-300 z-40 hover:translate-x-0.5"
                  aria-label="Foto Selanjutnya"
                >
                  <ChevronRightIcon size={20} className="stroke-[2.5]" />
                </button>

                {/* Photo Card container detail */}
                <motion.div
                  initial={{ scale: 0.96 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.96 }}
                  transition={{ type: "spring", damping: 24 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-5xl bg-[#09090b] border border-white/10 rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-12 max-h-[92vh] md:max-h-[82vh] relative"
                >
                  
                  {/* Photo Box side */}
                  <div className="md:col-span-7 bg-black flex items-center justify-center relative min-h-[35vh] md:min-h-0 max-h-[48vh] md:max-h-full overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
                    {activeSrc ? (
                      <img
                        src={activeSrc}
                        alt={activeItem.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain max-h-[48vh] md:max-h-full"
                      />
                    ) : (
                      <div className="text-neutral-500 font-mono text-xs">Tidak ada gambar</div>
                    )}
                    
                    {/* Scale Detail logo */}
                    <div className="absolute bottom-4 left-4 bg-zinc-950/80 border border-white/5 backdrop-blur-md rounded-xl px-3 py-1 flex items-center gap-1.5 text-[9px] font-mono text-neutral-400">
                      <ZoomIn size={10} className="text-[#c5a880]" />
                      <span>Kualitas Foto Asli</span>
                    </div>
                  </div>

                  {/* Text Meta Side */}
                  <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-zinc-950/20 relative">
                    
                    <div className="space-y-5">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#c5a880] mb-2.5 inline-block">
                          {activeItem.category === 'aktivitas' ? 'Aktivitas Organisasi' : 'Suka Foto / Potret'}
                        </span>
                        <h3 className="text-2xl font-display font-medium text-white mb-2 leading-tight tracking-tight">
                          {activeItem.title}
                        </h3>
                      </div>

                      {/* Metadata fields */}
                      <div className="space-y-2.5 pt-1">
                        <div className="flex items-center gap-3 text-neutral-300 text-xs">
                          <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[#c5a880]">
                            <ImageIcon size={12} />
                          </div>
                          <span className="font-sans font-light">{activeItem.date}</span>
                        </div>

                        <div className="flex items-center gap-3 text-neutral-300 text-xs">
                          <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[#c5a880]">
                            <MapPin size={12} />
                          </div>
                          <span className="font-sans font-light">{activeItem.location}</span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-[1px] w-full bg-white/5 my-4" />
                      
                      <p className="text-neutral-400 font-sans font-light text-xs sm:text-sm leading-relaxed">
                        {activeItem.description}
                      </p>
                    </div>

                    {/* Footer counter within modal */}
                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                      <span>M. Faiz Dzahin Portfolio</span>
                      <span>{activePhotoIndex + 1} / {itemsWithPhotos.length}</span>
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
