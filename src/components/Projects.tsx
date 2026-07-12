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
  icon: ComponentType<any>;
  metric: { value: string; label: string };
  tags: string[];
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
      icon: Database,
      metric: { value: "200+", label: "Arsip Surat Digital" },
      tags: ["React Hub", "Excel API", "DocuVault"]
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
      icon: Shield,
      metric: { value: "100%", label: "Perizinan Tepat Waktu" },
      tags: ["Web Portal", "Data Entry", "Secure Log"]
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
      icon: Mail,
      metric: { value: "30+", label: "Rapat Terotomasi" },
      tags: ["Mail Merge", "Automation", "PDF Builder"]
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
      icon: Zap,
      metric: { value: "100+", label: "Aset & Efek Suara" },
      tags: ["ThreeJS 3D", "Audio FX", "Index Catalog"]
    }
  ];

  const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement>, cardId: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rx = -((mouseY - height / 2) / (height / 2)) * 5;
    const ry = ((mouseX - width / 2) / (width / 2)) * 5;

    setTiltCoords(prev => ({
      ...prev,
      [cardId]: {
        rx,
        ry,
        active: true,
        mx: (mouseX / width) * 100,
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
    <section id="projects" className="py-24 md:py-32 relative bg-bone-light overflow-hidden">
      
      {/* Background elegant elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-amber-clay/5 blur-[120px]" />
        <div className="absolute inset-0 bg-paper-grid opacity-75" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-deep-teal font-mono block mb-2">PORTOFOLIO PROYEK</span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-ink-navy tracking-tight leading-none">
              Katalog <span className="text-amber-clay-dark italic font-semibold">Proyek</span>
            </h2>
            <div className="h-[3px] w-16 bg-amber-clay rounded-full mt-3"></div>
          </div>
          <p className="text-ink-soft font-sans font-medium text-xs sm:text-sm max-w-sm leading-relaxed">
            Ekosistem solusi kearsipan pintar OPMAZ, sistem manajemen portal pendidikan terpadu, serta aplikasi produktivitas personal.
          </p>
        </motion.div>

        {/* LIFEFLOW - FEATURED WORK IN CLAYMORPHISM */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
          className="mb-14 relative rounded-[30px] bg-cream border border-white shadow-clay-raised p-6 sm:p-8 md:p-10 overflow-hidden group transition-all duration-300 hover:shadow-clay-raised-hover"
        >
          {/* Card Header row */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4 relative z-10 pt-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-bone-dark/40 border border-black/5 text-deep-teal font-mono text-[9px] uppercase font-bold shadow-clay-inset">
              <Sparkles size={11} className="text-amber-clay-dark" />
              Proyek Unggulan Teratas (Featured App)
            </div>
            
            <div className="flex items-center gap-2">
              <a 
                href="https://github.com/zeynnn1925-sys/life-flow" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 p-2 px-3.5 rounded-xl bg-cream border border-white shadow-clay-btn text-ink-navy hover:text-amber-clay-dark font-mono text-[10px] font-bold active:scale-95 transition-all"
                title="Github Repository"
              >
                <Github size={12} />
                <span>Source</span>
              </a>
              <a 
                href="https://life-flow-ashy.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 p-2 px-4 rounded-xl bg-amber-clay border border-white shadow-clay-btn text-ink-navy hover:bg-amber-clay/90 font-mono text-[10px] font-bold active:scale-95 transition-all"
                title="Kunjungi Website"
              >
                <ExternalLink size={12} />
                <span>Live Demo</span>
              </a>
            </div>
          </div>

          {/* Grid Layout Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            
            {/* Left Side: Copywriting & Bullet Solutions */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-1">
                <span className="text-[9px] text-amber-clay-dark font-mono uppercase font-black tracking-wider block">
                  PERSONAL PRODUCTIVITY & WEALTH MANAGEMENT SYSTEM
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-ink-navy tracking-tight leading-none">
                  LifeFlow System
                </h3>
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-lg bg-bone-dark/20 border border-black/5 text-deep-teal shadow-clay-inset">Vite React</span>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-lg bg-bone-dark/20 border border-black/5 text-deep-teal shadow-clay-inset">Tailwind CSS</span>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-lg bg-bone-dark/20 border border-black/5 text-deep-teal shadow-clay-inset">AI Centric Engine</span>
                </div>
              </div>

              <p className="text-ink-soft font-sans font-medium text-xs sm:text-sm leading-relaxed">
                LifeFlow adalah platform produktivitas dan manajemen keuangan pribadi all-in-one yang menghubungkan semua aspek penting kehidupan dalam satu ekosistem terintegrasi. Ketika catatan pengeluaran, rutinitas kebiasaan harian, agenda harian, dan pencapaian target personal Anda disatukan, Anda mendapatkan kejelasan absolut untuk melangkah maju.
              </p>

              {/* Core Features Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                
                <div className="p-4 rounded-[16px] bg-bone-dark/20 border border-black/5 shadow-clay-inset hover:bg-bone-dark/30 transition-colors">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xs">💰</span>
                    <h5 className="text-[10px] font-bold font-sans text-ink-navy uppercase tracking-wider">AI Financial Advisor</h5>
                  </div>
                  <p className="text-[10px] text-ink-soft font-semibold leading-relaxed">
                    Pencatatan pemasukan dan pengeluaran cerdas, dianalisis langsung oleh AI berbasis aturan budgeting 50/30/20.
                  </p>
                </div>

                <div className="p-4 rounded-[16px] bg-bone-dark/20 border border-black/5 shadow-clay-inset hover:bg-bone-dark/30 transition-colors">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xs">🔥</span>
                    <h5 className="text-[10px] font-bold font-sans text-ink-navy uppercase tracking-wider">Habit & Streak System</h5>
                  </div>
                  <p className="text-[10px] text-ink-soft font-semibold leading-relaxed">
                    Sistem gamifikasi konsisten dengan pelacak streak harian, perayaan milestone, serta target pencapaian adaptif.
                  </p>
                </div>

                <div className="p-4 rounded-[16px] bg-bone-dark/20 border border-black/5 shadow-clay-inset hover:bg-bone-dark/30 transition-colors">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xs">✨</span>
                    <h5 className="text-[10px] font-bold font-sans text-ink-navy uppercase tracking-wider">AI Daily Planner</h5>
                  </div>
                  <p className="text-[10px] text-ink-soft font-semibold leading-relaxed">
                    Satu tap instan untuk menyusun agenda harian optimal berbasis target harian personal Anda.
                  </p>
                </div>

                <div className="p-4 rounded-[16px] bg-bone-dark/20 border border-black/5 shadow-clay-inset hover:bg-bone-dark/30 transition-colors">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-xs">🎯</span>
                    <h5 className="text-[10px] font-bold font-sans text-ink-navy uppercase tracking-wider">Targets & Alerts</h5>
                  </div>
                  <p className="text-[10px] text-ink-soft font-semibold leading-relaxed">
                    Ukur kemajuan di berbagai kategori (kesehatan, finansial, karir) didukung visualisasi persentase transparan.
                  </p>
                </div>

              </div>

            </div>

            {/* Right Side: EXTREMELY STUNNING LIGHT WEB APP PREVIEW MOCKUP */}
            <div className="lg:col-span-6 flex items-center justify-center relative w-full h-full min-h-[340px]">
              
              {/* Desktop/Browser Mockup Wrapper */}
              <div className="w-full bg-cream rounded-2xl border border-white overflow-hidden shadow-clay-raised flex flex-col transform group-hover:scale-[1.002] transition-all duration-500 p-1">
                
                {/* Browser address bar */}
                <div className="bg-bone-dark/40 border-b border-black/5 py-2 px-4 flex items-center justify-between rounded-t-xl">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="bg-cream border border-black/5 rounded-lg px-3 py-0.5 text-[8px] text-ink-soft font-mono font-bold w-44 text-center truncate shadow-clay-inset">
                    life-flow-ashy.vercel.app
                  </div>
                  <div className="w-6" />
                </div>

                {/* Internal App frame content in Light Claymorphism style */}
                <div className="relative flex-1 bg-bone-light p-4 flex flex-col md:flex-row items-center gap-4 justify-between overflow-hidden min-h-[250px] rounded-b-xl border-t border-black/5">
                  
                  {/* Mock Portal Left Side: Headline */}
                  <div className="md:w-[55%] text-left space-y-1.5 relative z-10 pointer-events-none select-none">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-[6px] bg-cream border border-white flex items-center justify-center shadow-clay-subtle">
                        <span className="text-[8px] text-deep-teal font-extrabold font-mono">LF</span>
                      </div>
                      <span className="text-[8px] font-mono font-bold tracking-wider text-ink-navy">LIFE FLOW</span>
                    </div>
                    
                    <span className="text-[5px] tracking-widest font-sans font-black text-amber-clay-dark block uppercase">
                      MASTER YOUR LIFE, FIND YOUR FLOW
                    </span>

                    <h4 className="text-xs sm:text-[11px] font-sans font-extrabold text-ink-navy tracking-tight leading-snug max-w-[145px]">
                      MANAGE YOUR <span className="text-amber-clay-dark">LIFE & FINANCES</span> IN ONE PLACE.
                    </h4>

                    <p className="text-[6px] text-ink-soft font-bold leading-normal max-w-[155px]">
                      Join thousands of users who are taking control of their daily habits, tasks, and financial goals with Life Flow.
                    </p>

                    <div className="flex items-center gap-1 pt-1">
                      <div className="flex -space-x-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-bone-dark ring-1 ring-white" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-clay ring-1 ring-white" />
                        <span className="w-2.5 h-2.5 rounded-full bg-deep-teal ring-1 ring-white" />
                      </div>
                      <span className="text-[5.5px] text-ink-soft font-bold">4.9/5 RATING FROM USERS</span>
                    </div>
                  </div>

                  {/* Mock Portal Right Side: User Login box */}
                  <div className="md:w-[45%] bg-cream border border-white rounded-xl p-3 shadow-clay-raised flex flex-col items-center justify-center relative z-10 pointer-events-none select-none">
                    
                    <div className="w-6 h-6 rounded-lg bg-bone-dark/30 border border-black/5 flex items-center justify-center mb-1 shadow-clay-inset">
                      <span className="text-[6px] text-deep-teal font-extrabold font-mono">LF</span>
                    </div>

                    <span className="text-[7px] font-sans font-bold text-ink-navy uppercase tracking-wider text-center block leading-none">
                      WELCOME BACK
                    </span>
                    <span className="text-[5px] text-ink-soft tracking-tight text-center block mb-1.5 mt-0.5 font-bold">
                      sign in to continue
                    </span>

                    {/* Mini inputs */}
                    <div className="w-full space-y-1 mb-2">
                      <div className="w-full rounded-md bg-bone-dark/20 border border-black/5 py-0.5 px-1 flex items-center gap-1 shadow-clay-inset">
                         <Mail size={5} className="text-ink-soft" />
                         <span className="text-[5px] text-ink-soft font-bold font-sans">email</span>
                      </div>
                      <div className="w-full rounded-md bg-bone-dark/20 border border-black/5 py-0.5 px-1 flex items-center gap-1 shadow-clay-inset">
                         <Shield size={5} className="text-ink-soft" />
                         <span className="text-[5px] text-ink-soft font-bold font-sans">password</span>
                      </div>
                    </div>

                    {/* Action button */}
                    <div className="w-full py-0.5 rounded-md bg-amber-clay text-ink-navy border border-white font-sans font-bold text-[6px] text-center shadow-clay-btn">
                      SIGN IN
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
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.15 + idx * 0.1 }}
                className="perspective-[1000px] h-full"
              >
                <div
                  onMouseMove={(e) => handleMouseMoveCard(e, project.id)}
                  onMouseLeave={() => handleMouseLeaveCard(project.id)}
                  style={{
                    transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                    transition: tilt.active ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="relative flex flex-col justify-between h-full rounded-[28px] bg-cream border border-white p-6 sm:p-8 cursor-pointer group shadow-clay-raised hover:shadow-clay-raised-hover hover:-translate-y-1 transition-all duration-300"
                  onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
                >
                  
                  {/* Top classification row */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-1.5">
                        <Folder size={12} className="text-deep-teal" />
                        <span className="text-[9px] font-mono tracking-wider text-amber-clay-dark uppercase font-extrabold">
                          {project.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-7 h-7 rounded-lg bg-cream border border-white text-ink-navy hover:text-amber-clay-dark flex items-center justify-center shadow-clay-subtle hover:shadow-clay-inset active:scale-95 transition-all duration-200"
                          title="Github Repository"
                        >
                          <Github size={13} />
                        </a>
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-7 h-7 rounded-lg bg-cream border border-white text-ink-navy hover:text-amber-clay-dark flex items-center justify-center shadow-clay-subtle hover:shadow-clay-inset active:scale-95 transition-all duration-200"
                          title="Open Project"
                        >
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-bone-dark/30 border border-black/5 flex items-center justify-center text-deep-teal shadow-clay-inset shrink-0">
                        <ProjectIcon size={16} className="group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div>
                        <h3 className="text-lg font-display font-bold text-ink-navy leading-tight">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs font-sans font-semibold text-ink-soft leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Archival list highlights */}
                    <ul className="space-y-2 mb-6">
                      {project.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-center gap-2 text-xs font-semibold text-ink-navy">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-clay shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Bottom Sector (Metrics Display & Action) */}
                  <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                    <div>
                      <span className="text-[8px] text-ink-soft uppercase font-extrabold tracking-widest block mb-0.5">PENCAPAIAN PROYEK</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-base font-black font-mono text-deep-teal group-hover:text-amber-clay-dark transition-colors">
                          {project.metric.value}
                        </span>
                        <span className="text-[10px] text-ink-soft font-bold">
                          {project.metric.label}
                        </span>
                      </div>
                    </div>

                    {/* Technology sub-labels */}
                    <div className="flex gap-1">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[7.5px] font-mono font-bold bg-bone-dark/40 shadow-clay-inset px-1.5 py-0.5 rounded border border-black/5 text-ink-soft">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>



      </div>
    </section>
  );
}
