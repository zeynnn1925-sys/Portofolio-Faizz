import { motion } from 'motion/react';
import { Download, MapPin, Calendar, Award, GraduationCap, Briefcase, ChevronRight, Check } from 'lucide-react';

export default function About() {
  const bulletDetails = [
    { label: "Domisili", value: "Jatinegara, Jakarta Timur", icon: MapPin, accent: "text-[#c5a880]" },
    { label: "Kredensial", value: "MAS Ma'had Al-Zaytun, 2025", icon: GraduationCap, accent: "text-[#ffd700]" },
    { label: "Peran Utama", value: "Sekretaris & Data Administrator", icon: Briefcase, accent: "text-neutral-300" },
  ];

  const highlights = [
    "Penguasaan formula tingkat lanjut Microsoft Excel untuk efisiensi",
    "Sistematisasi & pengarsipan digital 200+ surat & izin per tahun",
    "Kolaborasi kepemimpinan dalam organisasi skala ratusan santri/santriwati"
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative bg-cyber-grid bg-[#09090b] overflow-hidden">
      
      {/* Subtle organic elegant overlays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-amber-500/[0.02] blur-[150px]"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-neutral-400/[0.02] blur-[120px]"></div>
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
          <span className="text-xs font-semibold uppercase tracking-widest text-[#c5a880] font-mono block mb-3"># Profil Singkat</span>
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

          {/* Right Column: Golden Gilded Framing (Double layered vector borders) */}
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
                  <clipPath id="squircle-clip">
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
                  href="/Gambar WhatsApp 2024-08-19 pukul 21.43.27_df60a54b.png"
                  x="56"
                  y="56"
                  width="288"
                  height="288"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#squircle-clip)"
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

        {/* Info Grid Cards: BulletDetails underneath */}
        <div className="grid md:grid-cols-3 gap-6 mt-20 md:mt-28">
          {bulletDetails.map((b, idx) => {
            const Icon = b.icon;
            return (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-6 rounded-2xl bg-zinc-950/60 border border-white/5 flex items-center gap-5 transition-all duration-300 hover:border-white/10 hover:bg-zinc-900/40 relative overflow-hidden group"
              >
                <div className={`w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center ${b.accent} group-hover:scale-105 transition-all duration-300`}>
                  <Icon size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">{b.label}</span>
                  <span className="text-sm font-medium text-white mt-1 group-hover:text-amber-200 transition-colors">{b.value}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
