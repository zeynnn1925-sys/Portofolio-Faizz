import { useState, MouseEvent } from 'react';
import { motion } from 'motion/react';
import FilePreviewModal from './FilePreviewModal';
import { ChevronRight, FileText, Sparkles } from 'lucide-react';

export default function Skills() {
  const [previewFile, setPreviewFile] = useState<{ url: string; title: string } | null>(null);

  // States to track 3D tilt coordinates relative to card size per card
  const [tiltCoords, setTiltCoords] = useState<Record<number, { rx: number; ry: number; active: boolean }>>({});

  const hardSkills = [
    {
      id: 1,
      name: "Microsoft Word",
      sub: "Mail Merge, Auto TOC, Form Dokumen",
      desc: "Menyusun persuratan massal bertenaga & struktur indeks otomatis.",
      proofFile: "/laporan-pekanan-osis.docx",
      colorClass: "hover:border-[#c5a880]/40 hover:shadow-[0_15px_40px_rgba(197,168,128,0.05)] hover:bg-white/[0.01]",
      glowColor: "rgba(197, 168, 128, 0.12)",
      svg: (
        <svg className="w-8 h-8 text-[#c5a880]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 2,
      name: "Microsoft Excel",
      sub: "VLOOKUP, COUNTIF, IF & Data Validasi",
      desc: "Analisis komparatif tabular & integrasi validasi data masukan.",
      proofFile: "/presensi-kehadiran.xlsx",
      colorClass: "hover:border-[#c5a880]/40 hover:shadow-[0_15px_40px_rgba(197,168,128,0.05)] hover:bg-white/[0.01]",
      glowColor: "rgba(197, 168, 128, 0.12)",
      svg: (
        <svg className="w-8 h-8 text-[#c5a880]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 3,
      name: "Microsoft PowerPoint",
      sub: "Animasi Dinamis, Infografis & Transisi",
      desc: "Desain presentasi berkelas dengan korelasi visual tinggi.",
      proofFile: "/proposal-gema-alquran.docx",
      colorClass: "hover:border-[#c5a880]/40 hover:shadow-[0_15px_40px_rgba(197,168,128,0.05)] hover:bg-white/[0.01]",
      glowColor: "rgba(197, 168, 128, 0.12)",
      svg: (
        <svg className="w-8 h-8 text-[#c5a880]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 4,
      name: "Prinsip Dasar Web & Code",
      sub: "HTML, CSS, JS, React & Programming",
      desc: "Pengembangan web modern yang cepat, aman, dan memuaskan.",
      proofFile: "/laporan-pekanan-osis.docx",
      colorClass: "hover:border-[#eedec9]/40 hover:shadow-[0_15px_40px_rgba(238,222,201,0.05)] hover:bg-white/[0.01]",
      glowColor: "rgba(238, 222, 201, 0.12)",
      svg: (
        <svg className="w-8 h-8 text-[#eedec9]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    }
  ];

  const softSkills = [
    { name: "Komunikasi Baik", description: "Penyampaian gagasan transparan & asertif.", link: "/proposal-gema-alquran.docx" },
    { name: "Kerja Sama Tim", description: "Sinergi dalam mencapai target bersama.", link: "/proposal-gema-alquran.docx" },
    { name: "Disiplin & Tanggung Jawab", description: "Integritas penuh pengerjaan tugas surat.", link: "/laporan-pekanan-osis.docx" },
    { name: "Manajemen Waktu", description: "Efisiensi jadwal rapat dan pelaporan data.", link: "/presensi-kehadiran.xlsx" },
    { name: "Sosiologi & Adaptif", description: "Mengenali korelasi sosial untuk adaptasi.", link: "/laporan-pekanan-osis.docx" },
    { name: "Ketelitian Mutlak", description: "Detail orientasi tinggi tanpa kompromi.", link: "/presensi-kehadiran.xlsx" },
    { name: "Pemecahan Masalah", description: "Solutif menghadapi hambatan struktural.", link: "/proposal-gema-alquran.docx" },
    { name: "Inovatif Tekno", description: "Berpikir kreatif memakai software modern.", link: "/presensi-kehadiran.xlsx" }
  ];

  // Mouse tilt handlers for hard skill cards
  const handleMouseMoveCard = (e: MouseEvent<HTMLDivElement>, cardId: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const rx = -(mouseY / (height / 2)) * 4;
    const ry = (mouseX / (width / 2)) * 4;

    setTiltCoords(prev => ({
      ...prev,
      [cardId]: { rx, ry, active: true }
    }));
  };

  const handleMouseLeaveCard = (cardId: number) => {
    setTiltCoords(prev => ({
      ...prev,
      [cardId]: { rx: 0, ry: 0, active: false }
    }));
  };

  return (
    <section id="skills" className="py-24 md:py-32 relative bg-cyber-grid bg-[#09090b] overflow-hidden">
      
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-500/[0.01]/5 blur-[120px]"></div>
        <div className="absolute top-[10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-neutral-400/[0.01]/5 blur-[100px]"></div>
        <div className="absolute inset-0 bg-dot-grid opacity-15"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#c5a880] font-mono block mb-3"># Keahlian Utama</span>
            <h2 className="text-4xl md:text-6xl font-display font-semibold text-white tracking-tight leading-none">
              Keahlian <span className="text-gradient-gold italic font-normal">& Kompetensi</span>
            </h2>
            <div className="h-[1px] w-20 bg-gradient-to-r from-[#c5a880] via-[#eedec9] to-transparent mt-4"></div>
          </div>
          <p className="text-neutral-400 font-sans font-light text-xs sm:text-sm max-w-sm leading-relaxed">
            Terdiri atas kompetensi teknis di bidang administrasi perkantoran serta kecakapan komunikasi organisasi yang mendukung efisiensi kerja.
          </p>
        </motion.div>

        {/* 2-Column Grid Layout: Hard Skills (Left) | Soft Skills (Right) */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: 2x2 Hard Skill Cards */}
          <div>
            <div className="flex items-center gap-2.5 mb-8 border-b border-white/5 pb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]"></span>
              <h3 className="text-sm font-sans font-medium text-white uppercase tracking-wider">
                Hard Kompetensi (Aplikasi Cerdas)
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {hardSkills.map((card, idx) => {
                const tilt = tiltCoords[card.id] || { rx: 0, ry: 0, active: false };
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    onMouseMove={(e) => handleMouseMoveCard(e, card.id)}
                    onMouseLeave={() => handleMouseLeaveCard(card.id)}
                    onClick={() => setPreviewFile({ url: card.proofFile, title: card.name })}
                    className={`p-6 flex flex-col justify-between h-72 rounded-2xl relative select-none cursor-pointer transition-all duration-300 ease-out border border-white/5 bg-zinc-950/40 ${card.colorClass}`}
                    style={{
                      transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(${tilt.active ? '-4px' : '0px'})`,
                      transformStyle: 'preserve-3d',
                      boxShadow: tilt.active ? `inset 0 0 15px ${card.glowColor}` : ''
                    }}
                  >
                    {/* Upper corner design */}
                    <div className="absolute top-4 right-4 text-neutral-600 group-hover:text-white transition-colors">
                      <ChevronRight size={12} className="opacity-40" />
                    </div>

                    {/* Skill Icon */}
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                      {card.svg}
                    </div>

                    {/* Metadata */}
                    <div className="mt-4">
                      <span className="text-[9px] text-[#c5a880] font-mono font-semibold tracking-widest uppercase block mb-1">
                        {card.sub}
                      </span>
                      <h4 className="text-md font-display font-medium text-white tracking-wide uppercase mb-2">
                        {card.name}
                      </h4>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed">
                        {card.desc}
                      </p>
                    </div>

                    {/* Proof badge */}
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[9px] font-mono font-semibold text-[#c5a880] tracking-wider uppercase">
                      <span>DOKUMEN VALID</span>
                      <span className="flex items-center gap-1 text-neutral-500 group-hover:text-white transition-colors">
                        PRATINJAU <ChevronRight size={10} />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: 2x4 Soft Skill Pills in Grid */}
          <div>
            <div className="flex items-center gap-2.5 mb-8 border-b border-white/5 pb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>
              <h3 className="text-sm font-sans font-medium text-white uppercase tracking-wider">
                Soft Kompetensi & Sinergi
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {softSkills.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  onClick={() => setPreviewFile({ url: item.link, title: item.name })}
                  className="p-5 rounded-2xl border border-white/5 hover:border-[#c5a880]/30 hover:bg-white/[0.01] bg-zinc-950/40 flex flex-col justify-between transition-all duration-300 relative group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                    <span className="text-[9px] text-neutral-500 font-mono tracking-wider uppercase font-semibold">
                      VERIFIED
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-white uppercase tracking-wider group-hover:text-amber-250 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-neutral-500 font-light mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-neutral-600 group-hover:text-neutral-400 transition-all">
                    <span>KLIK LIHAT BUKTI</span>
                    <FileText size={10} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* File Preview Modal */}
      <FilePreviewModal 
        isOpen={!!previewFile}
        onClose={() => setPreviewFile(null)}
        fileUrl={previewFile?.url || ''}
        title={previewFile?.title || ''}
      />
    </section>
  );
}
