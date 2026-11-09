import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Download, MapPin, ChevronRight, Check, Award, 
  FileText, Shield, Sparkles, SlidersHorizontal
} from 'lucide-react';
import { headerVariants, cardVariants, scrollViewport, smoothEase } from '../lib/animations';

export default function About() {
  // Split Slider position (0% - 100%)
  const [sliderPos, setSliderPos] = useState<number>(50);

  const highlights = [
    "Kombinasi disiplin tata buku administrasi konvensional dengan rekayasa web modern",
    "Pengalaman nyata mengelola 200+ berkas arsip dan 30+ agenda rapat per tahun di OPMAZ",
    "Pengembang web otodidak berfokus pada arsitektur bersih React 19, TypeScript, dan EdTech",
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative bg-bone-light overflow-hidden border-b border-black/5">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-deep-teal font-mono block mb-2">
            PROFIL SINGKAT & REKAM JEJAK
          </span>
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

        {/* 2-Column Grid: Narrative Story Card & Profile Picture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          {/* Left Column: Index Card Narrative */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 space-y-6 relative border border-white bg-cream rounded-[28px] shadow-clay-raised">
              {/* Card Meta Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 pb-4">
                <span className="text-[9px] font-mono font-bold text-amber-clay-dark uppercase tracking-widest">
                  // REKAM IDENTITAS DOKUMENTASI
                </span>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-bone-dark/30 border border-black/5 text-deep-teal shadow-clay-inset">
                  STATUS: AKTIF BERKARYA
                </span>
              </div>

              {/* Bio Narrative */}
              <div className="space-y-4 text-xs sm:text-sm font-sans font-medium text-ink-soft leading-relaxed">
                <p>
                  Halo! Saya <strong className="text-ink-navy">Muhammad Faiz Dzahin (Zeynn)</strong>, seorang web developer otodidak yang mengawali langkah dari disiplin ketat tata usaha kepengurusan santri di Ma'had Al-Zaytun, Indramayu.
                </p>
                <p>
                  Bagi saya, keindahan sebaris kode setara dengan keakuratan angka di buku besar. Dipercaya mengemban amanah sebagai <strong className="text-ink-navy">Sekretaris Utama OPMAZ</strong> membentuk integritas saya dalam mengorganisasi data, menjaga ketelitian berkas, dan memikirkan otomasi agar pekerjaan rutin manusia dapat berjalan jauh lebih efektif.
                </p>
                <p>
                  Kini saya aktif merancang aplikasi web modern full-stack—dari platform produktivitas dan finansial (LifeFlow), utilitas persuratan otomatis (*Mail Merge helper*), hingga pengalaman web spasial 3D interaktif.
                </p>
              </div>

              {/* Highlights Bullet List */}
              <div className="pt-2">
                <h4 className="text-xs font-mono font-bold text-ink-navy uppercase tracking-wider mb-3">
                  Pilar Utama Integritas Kerja:
                </h4>
                <div className="space-y-2">
                  {highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-lg bg-bone-dark/30 border border-black/5 flex items-center justify-center text-deep-teal shrink-0 mt-0.5 shadow-clay-inset">
                        <Check size={11} className="stroke-[3]" />
                      </div>
                      <span className="text-xs font-sans text-ink-navy font-semibold leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-black/5 flex flex-wrap items-center gap-3">
                <a 
                  href="#projects" 
                  className="px-5 py-2.5 rounded-xl bg-amber-clay text-ink-navy text-xs font-sans font-bold border border-white shadow-clay-btn hover:bg-amber-clay/90 active:scale-95 transition-all inline-flex items-center gap-1.5"
                >
                  <span>Lihat Karya Proyek</span>
                  <ChevronRight size={13} />
                </a>
                <a 
                  href="#contact" 
                  className="px-5 py-2.5 rounded-xl bg-cream text-ink-navy text-xs font-sans font-bold border border-white shadow-clay-btn hover:shadow-clay-inset active:scale-95 transition-all"
                >
                  Hubungi Saya
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Profile Portrait Frame */}
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            <div className="relative w-full max-w-sm rounded-[28px] bg-cream border border-white p-4 shadow-clay-raised">
              {/* Portrait Frame */}
              <div className="w-full h-80 rounded-[20px] overflow-hidden bg-bone-dark/30 shadow-clay-inset relative border border-black/5">
                <img 
                  src="/photos/profile.png"
                  alt="M. Faiz Dzahin Portrait" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Portrait Details */}
              <div className="flex justify-between items-center px-1 pt-3 border-t border-black/5 mt-3">
                <div className="flex flex-col">
                  <span className="text-xs font-display font-bold text-ink-navy leading-tight">
                    Muhammad Faiz Dzahin
                  </span>
                  <span className="text-[9px] font-mono text-ink-soft uppercase tracking-wider mt-0.5">
                    Indramayu, Jawa Barat
                  </span>
                </div>
                <span className="text-[8px] font-mono font-bold text-amber-clay-dark bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  OPMAZ_OFFICIAL
                </span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ========================================================
            INNOVATION: SLIDER KOMPARASI "DUA ERA" (ANALOG VS DIGITAL)
            ======================================================== */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="rounded-[28px] bg-cream border border-white p-6 sm:p-8 shadow-clay-raised mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[9px] font-mono font-bold text-amber-clay-dark uppercase tracking-widest block mb-1">
                // METAMORFOSIS SISTEM KERJA
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-ink-navy">
                Komparasi Dua Era: <span className="text-deep-teal italic">Analog vs Digital</span>
              </h3>
              <p className="text-xs font-sans text-ink-soft mt-1">
                Geser slider di bawah untuk melihat bagaimana arsip fisik bertransformasi menjadi sistem terotomasi.
              </p>
            </div>

            {/* Slider percentage badge */}
            <div className="flex items-center gap-2 bg-bone-dark/20 px-3 py-1.5 rounded-xl border border-black/5 shadow-clay-inset self-start sm:self-auto">
              <SlidersHorizontal size={14} className="text-deep-teal" />
              <span className="text-xs font-mono font-bold text-ink-navy">
                {sliderPos < 50 ? 'Fokus: Era Analog' : 'Fokus: Era Digital'}
              </span>
            </div>
          </div>

          {/* Interactive Split Comparison Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            
            {/* Era Analog Card */}
            <div className={`p-5 rounded-2xl border transition-all duration-300 ${
              sliderPos <= 50 
                ? 'bg-amber-50/50 border-amber-200 shadow-clay-raised' 
                : 'bg-bone-dark/20 border-black/5 opacity-70'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-black text-amber-clay-dark uppercase tracking-wider">
                  ERA 2024: TATA BUKU ANALOG
                </span>
                <span className="text-xs">📜</span>
              </div>
              <h4 className="text-sm font-display font-bold text-ink-navy mb-2">
                200+ Berkas Fisik & Pembukuan Kasir
              </h4>
              <ul className="space-y-1.5 text-xs text-ink-soft font-sans font-medium">
                <li>• Menata map disposisi dan surat izin santri tahunan secara manual.</li>
                <li>• Notula 30+ rapat koordinasi dicatat di lembar folio dinas.</li>
                <li>• Resiko terselip dokumen dan verifikasi fisik memakan waktu.</li>
              </ul>
            </div>

            {/* Era Digital Card */}
            <div className={`p-5 rounded-2xl border transition-all duration-300 ${
              sliderPos > 50 
                ? 'bg-emerald-50/50 border-emerald-200 shadow-clay-raised' 
                : 'bg-bone-dark/20 border-black/5 opacity-70'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-black text-deep-teal uppercase tracking-wider">
                  ERA 2025: OTOMASI & SISTEM WEB
                </span>
                <span className="text-xs">💻</span>
              </div>
              <h4 className="text-sm font-display font-bold text-ink-navy mb-2">
                OPMAZ Admin Hub & Otomasi Mail Merge
              </h4>
              <ul className="space-y-1.5 text-xs text-ink-soft font-sans font-medium">
                <li>• Sinkronisasi draf surat izin instan dengan Mail Merge Excel API.</li>
                <li>• Dasbor terpusat React 19 memantau status santri secara aman.</li>
                <li>• 100% perizinan selesai tepat waktu tanpa dokumen hilang.</li>
              </ul>
            </div>

          </div>

          {/* Interactive Range Slider */}
          <div className="mt-6 pt-4 border-t border-black/5">
            <input 
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="w-full accent-deep-teal cursor-pointer"
            />
            <div className="flex justify-between text-[9px] font-mono font-bold text-ink-soft mt-1">
              <span>0% (Buku Besar & Arsip Folio)</span>
              <span>50% (Transisi)</span>
              <span>100% (Sistem Web & Kode Digital)</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
