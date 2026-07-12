import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, MapPin, ChevronRight, Check,
  Upload, X, ChevronLeft, ChevronRight as ChevronRightIcon, 
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

  // Dynamic Image Slots loaded from LocalStorage (only accept user uploads with base64 data URLs)
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
      
      {/* Background decoration elements (gentle and light) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-clay/5 blur-[130px]" />
        <div className="absolute bottom-[30%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-deep-teal/5 blur-[120px]" />
        <div className="absolute inset-0 bg-paper-grid opacity-70" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title with custom display typography */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="mb-16 md:mb-20"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-deep-teal font-mono block mb-2">PROFIL SINGKAT & DOKUMENTASI</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-ink-navy tracking-tight">
            Tentang <span className="text-amber-clay-dark italic font-semibold">Saya</span>
          </h2>
          <div className="h-[3px] w-16 bg-amber-clay rounded-full mt-3"></div>
        </motion.div>

        {/* 2-Column Grid: Left Story, Right Profile Card */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Narrative Details styled as an Index Card */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <div className="clay-card-raised p-6 sm:p-8 space-y-6 relative border border-white bg-cream">
              
              {/* Index card top ruling accent */}
              <div className="absolute top-0 inset-x-0 h-1 bg-deep-teal rounded-t-[24px]"></div>
              
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
                  href="#contact" 
                  className="group text-[10px] uppercase tracking-widest text-deep-teal hover:text-amber-clay-dark font-extrabold transition-all flex items-center gap-1"
                >
                  Hubungi Saya
                  <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Profile Picture Card */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-72 h-[340px] group flex items-center justify-center"
            >
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
            </motion.div>
          </motion.div>

        </div>

        {/* ==================== INTEGRATED REAL PHOTO GALLERY SUB-SECTION ==================== */}
        
        {/* Continuous Divider */}
        <div id="about-gallery" className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent my-24 scroll-mt-24" />

        {/* 2-Column Grid Layout for Stacking Cards */}
        <div className="grid lg:grid-cols-12 gap-12 items-start relative">
          
          {/* Left Column: Sticky controls & info panel */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-28 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-deep-teal font-mono block"># GALERI ARSIP & POTRET</span>
              <h3 className="text-3xl md:text-4xl font-display font-medium text-ink-navy tracking-tight leading-tight">
                Koleksi Foto <span className="text-amber-clay-dark italic font-semibold">Aktivitas Saya</span>
              </h3>
              <p className="text-ink-soft font-sans font-medium text-sm leading-relaxed">
                Lihat foto-foto nyata kegiatan organisasi, amalan mimbar Ma'had Al-Zaytun, perjalanan commuter, dan suku potret saya.
              </p>
              <div className="bg-bone-dark/30 rounded-xl p-4 border border-black/5 shadow-clay-inset space-y-2">
                <span className="text-[10px] font-bold text-amber-clay-dark block uppercase">Petunjuk Galeri:</span>
                <p className="text-[11px] text-ink-navy font-semibold leading-relaxed">
                  Klik slot foto untuk mengganti dengan file foto asli Anda langsung ke browser. Gulir halaman ke bawah untuk melihat tumpukan foto (stacking cards) berikutnya secara mengalir.
                </p>
              </div>
            </div>

            {/* Custom Category Filter Tabs as a Binder */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-ink-soft uppercase tracking-wider block">PILIH KATEGORI FOTO:</span>
              <div className="inline-flex flex-col p-1.5 bg-bone-dark/30 rounded-[18px] border border-black/5 shadow-clay-inset w-full sm:w-auto min-w-[200px]">
                {(['semua', 'aktivitas', 'selfie'] as const).map((filter) => {
                  const isActive = selectedFilter === filter;
                  return (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-4 py-2 rounded-xl text-xs font-sans font-bold tracking-wide transition-all text-center cursor-pointer ${
                        isActive 
                          ? 'text-ink-navy bg-cream shadow-clay-subtle border border-white/50' 
                          : 'text-ink-soft hover:text-ink-navy'
                      }`}
                    >
                      {filter === 'semua' ? 'Semua Berkas' : filter === 'aktivitas' ? 'Aktivitas Organisasi' : 'Suka Foto / Potret'}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2.5 text-[10px] text-ink-soft font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-clay animate-pulse"></span>
              <span>Gulir ke bawah untuk melihat tumpukan arsip foto 👇</span>
            </div>
          </motion.div>

          {/* Right Column: Sticky Vertical Stacking Stack */}
          <div className="lg:col-span-7 space-y-4 relative pb-24">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                const imageSrc = getItemImgSrc(item);
                const isCustomPhoto = !!images[item.localStorageKey];
                const hasActivePhoto = !!imageSrc;

                // Rotations styling to give that "messy archival desk" feel
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
                      initial={{ opacity: 0, y: 24, scale: 0.96 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: index * 0.1 }}
                      onClick={() => {
                        if (hasActivePhoto) {
                          const idx = itemsWithPhotos.findIndex(activeItem => activeItem.id === item.id);
                          if (idx !== -1) {
                            setActivePhotoIndex(idx);
                          }
                        }
                      }}
                      className={`group relative aspect-[3/4] w-full max-w-[330px] rounded-[24px] border bg-cream p-3 shadow-clay-raised hover:shadow-clay-raised-hover transition-all duration-400 ${rotationClass} ${
                        hasActivePhoto 
                          ? 'border-white hover:border-amber-clay/40' 
                          : 'border-dashed border-black/10 hover:border-amber-clay/30 bg-cream/50'
                      }`}
                    >
                      
                      {/* Hidden Input File Element */}
                      <input 
                        type="file"
                        ref={el => fileInputRefs.current[item.localStorageKey] = el}
                        onChange={(e) => handleImageFileChange(item.localStorageKey, e)}
                        accept="image/*"
                        className="hidden"
                      />

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
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                          </div>

                          {/* Hover action bar */}
                          <div className="absolute top-3 right-3 flex gap-2 z-20">
                            {isCustomPhoto && (
                              <button
                                onClick={(e) => handleRemoveImage(item.localStorageKey, e)}
                                className="w-8 h-8 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-105"
                                title="Hapus Foto Kustom"
                              >
                                <Trash2 size={13} />
                              </button>
                            )}
                            <button
                              onClick={(e) => triggerFileInput(item.localStorageKey, e)}
                              className="w-8 h-8 rounded-lg bg-cream/95 text-ink-navy hover:text-amber-clay-dark flex items-center justify-center shadow-lg border border-white cursor-pointer transition-transform hover:scale-105"
                              title="Unggah Ulang Foto"
                            >
                              <Upload size={13} />
                            </button>
                          </div>

                          {/* Info Overlay Box */}
                          <div className="absolute inset-0 p-5 flex flex-col justify-end z-10 pointer-events-none text-white">
                            
                            {/* Category Badge */}
                            <span className="text-[8px] tracking-widest text-amber-clay font-bold uppercase mb-1 w-fit bg-black/60 px-2 py-0.5 rounded border border-white/10">
                              {item.category === 'aktivitas' ? 'AKTIVITAS ORGANISASI' : 'SUKA FOTO / POTRET'}
                            </span>

                            {/* Title text */}
                            <h4 className="text-sm font-sans font-bold leading-tight group-hover:text-amber-clay transition-colors">
                              {item.title}
                            </h4>

                            {/* Expandable description on hover */}
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
                          onClick={(e) => triggerFileInput(item.localStorageKey, e)}
                          className="w-full h-full rounded-[16px] border border-dashed border-black/10 bg-bone-dark/20 flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:bg-bone-dark/40 transition-colors relative"
                        >
                          <div className="w-11 h-11 rounded-2xl bg-cream flex items-center justify-center text-deep-teal border border-white shadow-clay-subtle group-hover:text-amber-clay-dark group-hover:scale-105 transition-all duration-300 mb-3">
                            <Upload size={16} />
                          </div>
                          
                          <h4 className="text-xs font-sans font-bold text-ink-navy mb-1.5">
                            {item.title}
                          </h4>

                          <p className="text-[10px] text-ink-soft max-w-xs px-2 font-semibold leading-normal">
                            {item.placeholderLabel}. Foto asli Anda aman tersimpan di browser.
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
                <p className="font-sans font-bold text-xs">Tidak ada arsip foto dalam kategori filter ini.</p>
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

                {/* Photo Card container detail - Premium Cream Archival Dossier */}
                <motion.div
                  initial={{ scale: 0.96 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.96 }}
                  transition={{ type: "spring", damping: 24 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-4xl bg-cream border border-white rounded-[24px] overflow-hidden shadow-clay-raised grid md:grid-cols-12 max-h-[92vh] md:max-h-[80vh] relative p-4 gap-4"
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
                      <span>PRATINJAU FOTO</span>
                    </div>
                  </div>

                  {/* Text Meta Side */}
                  <div className="md:col-span-5 p-4 flex flex-col justify-between relative h-full">
                    
                    <div className="space-y-4">
                      <div>
                        <span className="text-[8px] font-mono uppercase tracking-widest text-amber-clay-dark font-extrabold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {activeItem.category === 'aktivitas' ? 'Aktivitas Organisasi' : 'Suka Foto / Potret'}
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
                      <span>Foto {activePhotoIndex + 1} dari {itemsWithPhotos.length}</span>
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
