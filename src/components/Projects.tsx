import React, { useState, ComponentType } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Folder, Shield, Zap, Sparkles, Database, Mail } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  link: string;
  github: string;
  colorClass: string;
  glowColor: string;
  icon: ComponentType<any>;
  metric: { value: string; label: string };
}

export default function Projects() {
  const [tiltCoords, setTiltCoords] = useState<Record<number, { rx: number; ry: number; active: boolean; mx: number; my: number }>>({});

  const projects: Project[] = [
    {
      id: 1,
      title: "OPMAZ Admin Panel Hub",
      category: "SISTEM ORGANISASI",
      description: "Sistem dasbor kearsipan dan administrasi terpusat untuk OPMAZ. Memudahkan sekretaris dalam mendata anggota, mengatur perizinan, dan mengarsipkan surat secara aman untuk efisiensi tata kelola.",
      highlights: [
        "Dasbor analisis keaktifan pengurus organisasi",
        "Pengarsipan digital berkas surat dan dokumen resmi",
        "Pusat koordinasi program kerja antar divisi kerja"
      ],
      link: "https://github.com/zeynnn1925-sys/opmaz-admin-hub",
      github: "https://github.com/zeynnn1925-sys/opmaz-admin-hub",
      colorClass: "border-white/5 hover:border-[#c5a880]/30 hover:shadow-[0_15px_40px_rgba(197,168,128,0.06)] hover:bg-white/[0.01]",
      glowColor: "rgba(197, 168, 128, 0.15)",
      icon: Database,
      metric: { value: "200+", label: "Arsip Surat Digital" }
    },
    {
      id: 2,
      title: "Al-Zaytun Student Portal",
      category: "PORTAL PENDIDIKAN",
      description: "Purwarupa sistem informasi santri Ma'had Al-Zaytun secara terintegrasi. Menampilkan modul kehadiran siswa, pemantauan tata tertib, serta arsip digital pengurus OPMAZ.",
      highlights: [
        "Sistem pencatatan kehadiran santri tingkat asrama",
        "Pengolahan penerbitan surat izin santri secara daring",
        "Pemantauan rekapitulasi kedisiplinan dan tata tertib"
      ],
      link: "https://github.com/zeynnn1925-sys/al-zaytun-portal",
      github: "https://github.com/zeynnn1925-sys/al-zaytun-portal",
      colorClass: "border-white/5 hover:border-[#c5a880]/30 hover:shadow-[0_15px_40px_rgba(197,168,128,0.06)] hover:bg-white/[0.01]",
      glowColor: "rgba(197, 168, 128, 0.15)",
      icon: Shield,
      metric: { value: "100%", label: "Perizinan Tepat Waktu" }
    },
    {
      id: 3,
      title: "Dynamic Notula & Mail Sync",
      category: "UTILITAS ADMINISTRASI",
      description: "Aplikasi utilitas otomatisasi Mail Merge berbasis web untuk penataan surat massal dan pencatatan hasil notula rapat pengurus OPMAZ secara langsung dan terstruktur.",
      highlights: [
        "Integrasi data kehadiran ke draf surat resmi",
        "Sistem sinkronisasi catatan rapat per divisi organisasi",
        "Penyusunan laporan format PDF atau Docx secara berkala"
      ],
      link: "https://github.com/zeynnn1925-sys/mail-merge-helper",
      github: "https://github.com/zeynnn1925-sys/mail-merge-helper",
      colorClass: "border-white/5 hover:border-[#c5a880]/30 hover:shadow-[0_15px_40px_rgba(197,168,128,0.06)] hover:bg-white/[0.01]",
      glowColor: "rgba(197, 168, 128, 0.15)",
      icon: Mail,
      metric: { value: "30+", label: "Rapat Terotomasi" }
    },
    {
      id: 4,
      title: "Kamen Rider Interactive Catalog",
      category: "PROYEK KREATIF",
      description: "Visualisasi katalog interaktif berbasis 3D web untuk koleksi seri Kamen Rider. Menampilkan model alat transformasi (Belt), bentuk karakter, serta daftar lagu tema.",
      highlights: [
        "Visualisasi 3D model alat transformasi interaktif",
        "Fitur pemutaran efek suara secara interaktif",
        "Referensi database variasi karakter fiksi"
      ],
      link: "https://github.com/zeynnn1925-sys/kamenrider-eezz-catalog",
      github: "https://github.com/zeynnn1925-sys/kamenrider-eezz-catalog",
      colorClass: "border-white/5 hover:border-[#c5a880]/30 hover:shadow-[0_15px_40px_rgba(197,168,128,0.06)] hover:bg-white/[0.01]",
      glowColor: "rgba(197, 168, 128, 0.15)",
      icon: Zap,
      metric: { value: "100+", label: "Aset & Efek Suara" }
    }
  ];

  const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement>, cardId: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left; // 0 to width
    const mouseY = e.clientY - rect.top; // 0 to height

    const rx = -((mouseY - height / 2) / (height / 2)) * 6; // tilt angle Y axis (max 6 deg)
    const ry = ((mouseX - width / 2) / (width / 2)) * 6; // tilt angle X axis (max 6 deg)

    setTiltCoords(prev => ({
      ...prev,
      [cardId]: {
        rx,
        ry,
        active: true,
        mx: (mouseX / width) * 100, // percentage for dynamic sleek reflection light
        my: (mouseY / height) * 100
      }
    }));
  };

  const handleMouseLeaveCard = (cardId: number) => {
    setTiltCoords(prev => ({
      ...prev,
      [cardId]: { rx: 0, ry: 0, active: false, mx: 50, my: 50 }
    }));
  };

  return (
    <section id="projects" className="py-24 md:py-32 relative bg-cyber-grid bg-[#09090b] overflow-hidden">
      
      {/* Background elegant elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-amber-500/[0.02] blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-neutral-400/[0.02] blur-[120px]"></div>
        <div className="absolute inset-0 bg-dot-grid opacity-15"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#c5a880] font-mono block mb-3"># Portofolio Proyek</span>
            <h2 className="text-4xl md:text-6xl font-display font-semibold text-white tracking-tight leading-none">
              Katalog <span className="text-gradient-gold italic font-normal">Proyek</span>
            </h2>
            <div className="h-[1px] w-20 bg-gradient-to-r from-[#c5a880] via-[#eedec9] to-transparent mt-4"></div>
          </div>
          <p className="text-neutral-400 font-sans font-light text-xs sm:text-sm max-w-sm leading-relaxed">
            Ekosistem solusi kearsipan pintar OPMAZ, sistem manajemen portal pendidikan terpadu, serta aplikasi produktivitas all-in-one tercanggih.
          </p>
        </motion.div>

        {/* LIFEFLOW - PLATINUM FEATURED WORK */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-14 relative rounded-3xl bg-zinc-950/50 border border-white/5 hover:border-[#c5a880]/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-6 sm:p-8 md:p-12 overflow-hidden group transition-all duration-500"
        >
          {/* Glowing gradient backdrops */}
          <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-[#c5a880]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-neutral-400/5 rounded-full blur-[90px] pointer-events-none" />
          
          {/* Card Header row */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4 relative z-10">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c5a880]/5 border border-[#c5a880]/10 text-[#c5a880] font-sans text-[10px] uppercase font-bold tracking-wider">
              <Sparkles size={11} className="text-[#c5a880]" />
              Proyek Unggulan Teratas (Featured App)
            </div>
            
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com/zeynnn1925-sys/life-flow" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 p-2 px-3.5 rounded-lg bg-neutral-900/60 border border-white/5 hover:border-white/10 text-neutral-400 hover:text-white transition-all text-[11px] font-sans font-medium"
                title="Github Repository"
              >
                <Github size={13} />
                <span>Source Code</span>
              </a>
              <a 
                href="https://life-flow-ashy.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 p-2 px-4 rounded-lg bg-white hover:bg-[#c5a880] text-zinc-950 hover:scale-[1.01] transition-all text-[11px] font-sans font-bold"
                title="Kunjungi Website"
              >
                <ExternalLink size={13} />
                <span>Kunjungi Website</span>
              </a>
            </div>
          </div>

          {/* Grid Layout Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Side: Copywriting & Bullet Solutions */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-1.5">
                <span className="text-[10px] text-[#c5a880] font-mono uppercase font-black tracking-widest block">
                  ALL-IN-ONE PERSONAL PRODUCTIVITY & WEALTH MANAGEMENT SYSTEM
                </span>
                <h3 className="text-3xl sm:text-4.5xl font-display font-medium text-white tracking-tight leading-none">
                  LifeFlow System
                </h3>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-neutral-400">Vite React</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-neutral-400">Tailwind CSS</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5 text-neutral-400">AI Centric Engine</span>
                </div>
              </div>

              <p className="text-neutral-400 font-sans font-light text-sm leading-relaxed">
                LifeFlow adalah platform produktivitas dan manajemen keuangan pribadi all-in-one yang menghubungkan semua aspek penting kehidupan dalam satu ekosistem terintegrasi. Ketika catatan pengeluaran, rutinitas kebiasaan harian, agenda harian, dan pencapaian target personal Anda disatukan, Anda mendapatkan kejelasan absolut untuk melangkah maju.
              </p>

              {/* Core Features Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                
                <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-colors duration-300">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm">💰</span>
                    <h5 className="text-[11px] font-bold font-sans text-white uppercase tracking-wider">AI Financial Advisor</h5>
                  </div>
                  <p className="text-[10px] text-neutral-400 font-light leading-relaxed">
                    Pencatatan pemasukan dan pengeluaran cerdas, dianalisis langsung oleh AI berbasis aturan budgeting 50/30/20.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-colors duration-300">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm">🔥</span>
                    <h5 className="text-[11px] font-bold font-sans text-white uppercase tracking-wider">Habit & Streak System</h5>
                  </div>
                  <p className="text-[10px] text-neutral-400 font-light leading-relaxed">
                    Sistem gamifikasi konsisten dengan pelacak streak harian, perayaan milestone, serta target pencapaian adaptif.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-colors duration-300">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm">✨</span>
                    <h5 className="text-[11px] font-bold font-sans text-white uppercase tracking-wider">AI Daily Planner</h5>
                  </div>
                  <p className="text-[10px] text-neutral-400 font-light leading-relaxed">
                    Satu tap instan untuk menyusun agenda harian optimal berbasis target harian personal Anda.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-colors duration-300">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm">🎯</span>
                    <h5 className="text-[11px] font-bold font-sans text-white uppercase tracking-wider">Targets & Smart Alerts</h5>
                  </div>
                  <p className="text-[10px] text-neutral-400 font-light leading-relaxed">
                    Ukur kemajuan di berbagai kategori (kesehatan, finansial, karir) didukung visualisasi persentase transparan.
                  </p>
                </div>

              </div>


            </div>

            {/* Right Side: EXTREMELY STUNNING MINI WEB APP PREVIEW */}
            <div className="lg:col-span-6 flex items-center justify-center relative w-full h-full min-h-[350px]">
              
              {/* Desktop/Browser Mockup Wrapper */}
              <div className="w-full bg-[#0d0d11] rounded-2xl border border-white/10 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col transform group-hover:scale-[1.002] transition-all duration-500">
                
                {/* Browser address bar */}
                <div className="bg-neutral-950/80 border-b border-white/5 py-2.5 px-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-800" />
                    <span className="w-2 h-2 rounded-full bg-zinc-700" />
                    <span className="w-2 h-2 rounded-full bg-zinc-650" />
                  </div>
                  <div className="bg-white/[0.04] border border-white/5 rounded px-3 py-0.5 text-[8px] text-neutral-400 font-mono w-44 text-center truncate">
                    life-flow-ashy.vercel.app
                  </div>
                  <div className="w-6" /> {/* balance spacer */}
                </div>

                {/* Internal App frame content matching uploaded PNG layout */}
                <div className="relative flex-1 bg-gradient-to-br from-[#0c0d12] via-[#09090b] to-[#040405] p-4 flex flex-col md:flex-row items-center gap-4 justify-between overflow-hidden min-h-[260px]">
                  
                  {/* Decorative glowing backdrops inside mockup */}
                  <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-[#c5a880]/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-neutral-400/5 rounded-full blur-2xl pointer-events-none" />

                  {/* Mock Portal Left Side: Headline */}
                  <div className="md:w-[52%] text-left space-y-1.5 relative z-10 pointer-events-none select-none">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded bg-white/5 border border-white/10 flex items-center justify-center">
                        <span className="text-[7px] text-white font-black font-mono">LF</span>
                      </div>
                      <span className="text-[8px] font-mono font-bold tracking-wider text-white">LIFE FLOW</span>
                    </div>
                    
                    <span className="text-[5px] tracking-widest font-sans font-extrabold text-[#c5a880] block uppercase">
                      MASTER YOUR LIFE, FIND YOUR FLOW
                    </span>

                    <h4 className="text-xs sm:text-sm font-sans font-bold text-white tracking-wide leading-tight max-w-[145px]">
                      MANAGE YOUR <span className="text-[#c5a880]">LIFE & FINANCES</span> IN ONE PLACE.
                    </h4>

                    <p className="text-[6px] text-neutral-400 font-light leading-relaxed max-w-[155px]">
                      join thousands of users who are taking control of their daily habits, tasks, and financial goals with life flow.
                    </p>

                    <div className="flex items-center gap-1.5 pt-1">
                      <div className="flex -space-x-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 ring-1 ring-white/10" />
                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 ring-1 ring-white/10" />
                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-650 ring-1 ring-white/10" />
                      </div>
                      <span className="text-[6px] text-neutral-400 font-semibold">4.9/5 RATING FROM USERS</span>
                    </div>
                  </div>

                  {/* Mock Portal Right Side: User Login box */}
                  <div className="md:w-[48%] bg-[#0e0e12]/95 border border-white/5 rounded-xl p-3 shadow-lg flex flex-col items-center justify-center relative z-10 pointer-events-none select-none">
                    
                    {/* Rounded login icon banner */}
                    <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-1.5">
                      <div className="w-3.5 h-3.5 rounded bg-neutral-900 border border-white/5 flex items-center justify-center">
                        <span className="text-[6px] text-neutral-300 font-black font-mono">LF</span>
                      </div>
                    </div>

                    <span className="text-[8px] font-sans font-bold text-white uppercase tracking-wider text-center block leading-none">
                      WELCOME BACK
                    </span>
                    <span className="text-[5px] text-neutral-500 tracking-tight text-center block mb-2 mt-0.5">
                      sign in to continue to life flow
                    </span>

                    {/* Mini inputs */}
                    <div className="w-full space-y-1 mb-2">
                      <div className="w-full rounded bg-neutral-950 border border-white/5 py-1 px-1.5 flex items-center gap-1">
                         <Mail size={5} className="text-neutral-600" />
                         <span className="text-[6px] text-neutral-600 font-light font-sans">email</span>
                      </div>
                      <div className="w-full rounded bg-neutral-950 border border-white/5 py-1 px-1.5 flex items-center gap-1">
                         <Shield size={5} className="text-neutral-600" />
                         <span className="text-[6px] text-neutral-600 font-light font-sans">password</span>
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="w-full py-1 rounded bg-[#c5a880] flex items-center justify-center text-zinc-950 font-sans font-bold text-[6.5px]">
                      SIGN IN
                    </div>

                    <div className="w-full flex items-center justify-center text-[5px] text-neutral-600 font-mono my-1 pl-1">
                      <span className="bg-[#0e0e12] px-1">OR CONTINUE WITH</span>
                    </div>

                    {/* Google & Github mini option buttons */}
                    <div className="flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 rounded bg-neutral-950 border border-white/5 flex items-center justify-center text-[5px] text-neutral-400">G</div>
                      <div className="w-3.5 h-3.5 rounded bg-neutral-950 border border-white/5 flex items-center justify-center text-[5px] text-neutral-400">Git</div>
                    </div>

                  </div>

                </div>
              </div>

            </div>

          </div>
        </motion.div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, idx) => {
            const tilt = tiltCoords[project.id] || { rx: 0, ry: 0, active: false, mx: 50, my: 50 };
            const ProjectIcon = project.icon;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.12 }}
                className="perspective-[1000px] h-full"
              >
                <div
                  onMouseMove={(e) => handleMouseMoveCard(e, project.id)}
                  onMouseLeave={() => handleMouseLeaveCard(project.id)}
                  style={{
                    transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                    transition: tilt.active ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className={`relative flex flex-col justify-between h-full rounded-3xl bg-zinc-950/60 border ${project.colorClass} p-8 md:p-10 cursor-pointer group transition-all duration-300`}
                  onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
                >
                  
                  {/* Dynamic glossy overlay reflecting light according to cursor position */}
                  {tilt.active && (
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at ${tilt.mx}% ${tilt.my}%, ${project.glowColor} 0%, transparent 65%)`,
                        mixBlendMode: 'screen',
                        opacity: 0.6,
                      }}
                    />
                  )}

                  {/* Card Content Top Sector */}
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2">
                        <Folder size={13} className="text-neutral-500" />
                        <span className="text-[10px] font-mono tracking-wider text-[#c5a880] uppercase font-bold">
                          {project.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg bg-neutral-900/80 border border-white/5 hover:border-white/10 text-neutral-400 hover:text-white transition-all transform hover:scale-105 duration-200"
                          title="Github Repository"
                        >
                          <Github size={14} />
                        </a>
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg bg-neutral-900/80 border border-white/5 hover:border-white/10 text-neutral-400 hover:text-white transition-all transform hover:scale-105 duration-200"
                          title="Open Project"
                        >
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-11 h-11 rounded-xl bg-neutral-900/70 border border-white/5 flex items-center justify-center text-white">
                        <ProjectIcon size={18} className="text-neutral-300 group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-medium text-white">
                          {project.title}
                        </h3>
                        <span className="text-[10px] text-neutral-550 font-mono tracking-tight font-medium">Pengembangan Sistem</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm font-sans font-light text-neutral-400 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <ul className="space-y-2 mb-8">
                      {project.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-center gap-2.5 text-xs font-light text-neutral-300">
                          <span className="w-1 h-1 rounded-full bg-[#c5a880]/60 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Bottom Sector (Metrics Display & Action) */}
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[8px] text-neutral-500 font-mono uppercase tracking-widest block mb-0.5">METRIK TERVALIDASI</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-bold font-mono text-white group-hover:text-amber-200 transition-colors">
                          {project.metric.value}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-light">
                          {project.metric.label}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-semibold text-neutral-300 font-mono flex items-center gap-1.5 group-hover:text-[#c5a880] transition-colors self-end pb-1">
                      Detail Proyek
                      <ExternalLink size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </span>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic bottom accent banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 rounded-3xl bg-zinc-950/40 border border-white/5 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute top-[-50%] left-[-10%] w-[30%] h-[100%] bg-amber-500/[0.01] blur-[80px] rounded-full" />
          <div className="relative z-10">
            <h4 className="text-md font-bold text-white flex items-center gap-2">
              <Sparkles size={14} className="text-[#c5a880]" />
              Memerlukan Solusi Administrasi atau Kearsipan?
            </h4>
            <p className="text-xs sm:text-sm font-light text-neutral-400 mt-1 max-w-xl">
              Hubungi saya untuk berdiskusi mengenai pengembangan sistem administrasi serta pengelolaan data yang terstruktur.
            </p>
          </div>
          <a
            href="#contact"
            className="relative z-10 px-5 py-3 rounded-xl bg-neutral-100 hover:bg-[#c5a880] text-zinc-950 font-bold text-[10px] uppercase tracking-widest transition-all duration-300 shrink-0"
          >
            Hubungi Kontak
          </a>
        </motion.div>

      </div>
    </section>
  );
}
