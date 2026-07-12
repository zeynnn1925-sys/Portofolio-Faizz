import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import FilePreviewModal from './FilePreviewModal';
import { 
  ChevronRight, FileText, FileSpreadsheet, Presentation, Sparkles, 
  Atom, Code2, Braces, Wind, Database, Laptop
} from 'lucide-react';

export default function Skills() {
  const [previewFile, setPreviewFile] = useState<{ url: string; title: string } | null>(null);

  // States to track 3D tilt coordinates relative to card size per card
  const [tiltCoords, setTiltCoords] = useState<Record<number, { rx: number; ry: number; active: boolean }>>({});
  const [hoveredFramework, setHoveredFramework] = useState<string | null>(null);

  const hardSkills = [
    {
      id: 1,
      name: "Microsoft Word",
      sub: "Mail Merge, Auto TOC, Form Dokumen",
      desc: "Menyusun persuratan massal otomatis & struktur indeks tata naskah perkantoran akademis.",
      proofFile: "/laporan-pekanan-osis.docx",
      imageUrl: "/Ms.Word.png",
      icon: FileText,
      iconColor: "text-blue-600",
      proficiency: "95%",
      level: "Sangat Mahir (Advanced)",
      proficiencyDetail: "Sangat terampil dalam automasi administrasi surat-menyurat massal (Mail Merge), pembuatan daftar isi otomatis (TOC), penataan layout laporan akademik yang konsisten, dan pembuatan formulir digital terstandardisasi."
    },
    {
      id: 2,
      name: "Microsoft Excel",
      sub: "VLOOKUP, COUNTIF, IF & Data Validasi",
      desc: "Komparasi pangkalan data tabular, standardisasi entri, serta olah formula aritmatika logis.",
      proofFile: "/presensi-kehadiran.xlsx",
      imageUrl: "/Ms.Excel.png",
      icon: FileSpreadsheet,
      iconColor: "text-emerald-600",
      proficiency: "90%",
      level: "Sangat Mahir (Advanced)",
      proficiencyDetail: "Mahir dalam menggunakan fungsi logika kompleks (IF, AND, OR), penelusuran data (VLOOKUP, HLOOKUP), kalkulasi bersyarat (COUNTIF, SUMIF), validasi input data, serta analisis data tabular perkantoran."
    },
    {
      id: 3,
      name: "Microsoft PowerPoint",
      sub: "Animasi Dinamis, Infografis & Adminis",
      desc: "Standardisasi rancang presentasi korporat serta kolaborasi terpadu antar aplikasi Office.",
      proofFile: "/proposal-gema-alquran.docx",
      icon: Presentation,
      iconColor: "text-amber-600",
      proficiency: "85%",
      level: "Mahir (Upper-Intermediate)",
      proficiencyDetail: "Berpengalaman merancang presentasi interaktif dengan struktur visual yang rapi, animasi transisi fungsional, integrasi diagram/bagan dinamis, serta desain infografis administratif yang informatif."
    },
    {
      id: 4,
      name: "Web Programming",
      sub: "HTML, CSS, JS, React & Frameworks",
      desc: "Implementasi desain antarmuka web modern dengan arsitektur kode responsif dan terstandardisasi.",
      proofFile: "/laporan-pekanan-osis.docx",
      icon: Laptop,
      iconColor: "text-deep-teal",
      proficiency: "80%",
      level: "Menguasai (Intermediate)",
      proficiencyDetail: "Kombinasi pengembangan frontend modern (React, Tailwind CSS) dan pemahaman logika pemrograman dasar (JavaScript/Python) untuk membangun aplikasi web interaktif yang responsif.",
      frameworks: [
        { name: "React", icon: Atom, color: "text-[#1e88e5] bg-blue-50", proficiency: "85%", level: "Sangat Mahir", desc: "Membangun UI interaktif berbasis komponen fungsional modular, Hooks, dan state management." },
        { name: "JavaScript", icon: Braces, color: "text-[#fbc02d] bg-yellow-50", proficiency: "80%", level: "Mahir", desc: "Menguasai sintaks ES6+, manipulasi DOM, array methods, dan penanganan asinkronus (Promises/Fetch)." },
        { name: "Java", imageUrl: "/JAVA.png", color: "text-[#e64a19] bg-red-50", proficiency: "75%", level: "Menguasai", desc: "Penerapan konsep pemrograman berorientasi objek dasar (OOP), struktur data, dan pemecahan algoritma." },
        { name: "Python", imageUrl: "/PYTHON.png", color: "text-[#0288d1] bg-blue-50", proficiency: "80%", level: "Mahir", desc: "Otomasi tugas, pemrosesan skrip data, pengolahan file berkas, dan pemrograman fungsional." },
        { name: "HTML5/CSS3", icon: Code2, color: "text-[#e64a19] bg-orange-50", proficiency: "90%", level: "Sangat Mahir", desc: "Struktur semantik HTML5, layout modern (Flexbox/Grid), animasi murni, dan adaptabilitas layar." },
        { name: "Tailwind", icon: Wind, color: "text-[#0288d1] bg-sky-50", proficiency: "90%", level: "Sangat Mahir", desc: "Desain UI responsif instan dengan utilitas kelas CSS terstandardisasi tanpa overhead kode." },
        { name: "Database", icon: Database, color: "text-[#388e3c] bg-green-50", proficiency: "75%", level: "Menguasai", desc: "Desain skema tabel basis data relasional (SQL), kueri relasional dasar (CRUD, JOIN), dan normalisasi." }
      ]
    }
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
    <section id="skills" className="py-24 md:py-32 relative bg-bone-light overflow-hidden">
      
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-amber-clay/5 blur-[120px]" />
        <div className="absolute top-[10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-deep-teal/5 blur-[100px]" />
        <div className="absolute inset-0 bg-paper-grid opacity-75" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-deep-teal font-mono block mb-2">KEAHLIAN UTAMA</span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-ink-navy tracking-tight leading-none">
              Keahlian <span className="text-amber-clay-dark italic font-semibold">& Kompetensi</span>
            </h2>
            <div className="h-[3px] w-16 bg-amber-clay rounded-full mt-3"></div>
          </div>
          <p className="text-ink-soft font-sans font-medium text-xs sm:text-sm max-w-sm leading-relaxed">
            Terdiri atas kompetensi teknis di bidang administrasi perkantoran serta kecakapan komunikasi organisasi yang mendukung efisiensi kerja.
          </p>
        </motion.div>

        {/* Centered Grid Layout: Hard Skills */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-10 border-b border-black/5 pb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-clay" />
            <h3 className="text-xs font-bold text-ink-soft uppercase tracking-widest">
              DAFTAR SKILL & KOMPETENSI UTAMA
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hardSkills.map((card, idx) => {
              const tilt = tiltCoords[card.id] || { rx: 0, ry: 0, active: false };
              const CardIcon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: idx * 0.1 }}
                  onMouseMove={(e) => handleMouseMoveCard(e, card.id)}
                  onMouseLeave={() => handleMouseLeaveCard(card.id)}
                  onClick={() => setPreviewFile({ url: card.proofFile, title: card.name })}
                  className="p-5 flex flex-col justify-between min-h-[340px] h-auto rounded-[24px] relative select-none cursor-pointer border border-white bg-cream shadow-clay-raised hover:shadow-clay-raised-hover transition-all duration-300 group"
                  style={{
                    transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(${tilt.active ? '-4px' : '0px'})`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Upper corner design */}
                  <div className="absolute top-4 right-4 text-ink-soft opacity-50 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={12} className="stroke-[3]" />
                  </div>

                  {/* Skill Icon */}
                  <div className="w-14 h-14 rounded-[16px] bg-[#F3EFE7] border border-white flex items-center justify-center shadow-clay-subtle mt-3 shrink-0">
                    {(card as any).imageUrl ? (
                      <img 
                        src={(card as any).imageUrl} 
                        alt={card.name} 
                        className="w-9 h-9 object-contain"
                        referrerPolicy="no-referrer"
                      />
                    ) : CardIcon ? (
                      <CardIcon className={`w-6 h-6 ${card.iconColor}`} />
                    ) : null}
                  </div>

                  {/* Metadata */}
                  <div className="mt-4 flex-grow flex flex-col justify-start">
                    <div className="flex items-center justify-between gap-1 mb-1 relative">
                      <span className="text-[8px] text-amber-clay-dark font-mono font-bold tracking-wider uppercase block">
                        {card.sub}
                      </span>
                      
                      {/* Interactive Proficiency Badge with Hover Popover */}
                      <div className="relative group/popover" onClick={(e) => e.stopPropagation()}>
                        <span className="text-[9px] font-mono font-black px-2 py-0.5 rounded-full bg-amber-clay/10 text-amber-clay-dark border border-amber-clay/20 cursor-help transition-all duration-300 hover:bg-amber-clay/25">
                          {card.proficiency}
                        </span>
                        
                        {/* Popover */}
                        <div className="absolute bottom-full right-0 mb-2 w-60 opacity-0 translate-y-1 scale-95 pointer-events-none group-hover/popover:opacity-100 group-hover/popover:translate-y-0 group-hover/popover:scale-100 transition-all duration-200 ease-out z-30 bg-cream border border-black/10 p-3.5 rounded-2xl shadow-xl">
                          {/* Small pointing arrow */}
                          <div className="absolute top-full right-3 border-[5px] border-transparent border-t-cream z-30" />
                          <div className="absolute top-full right-3 border-[5px] border-transparent border-t-black/10 -z-10" />

                          <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-black/5">
                            <span className="text-[10px] font-sans font-extrabold text-ink-navy uppercase">{card.name}</span>
                            <span className="text-[9px] font-mono font-black text-amber-clay-dark">{card.proficiency}</span>
                          </div>
                          <span className="text-[9px] font-mono font-bold text-deep-teal uppercase block mb-1 text-left">{card.level}</span>
                          <p className="text-[10px] text-ink-soft leading-relaxed font-semibold normal-case text-left">
                            {card.proficiencyDetail}
                          </p>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-sm font-sans font-extrabold text-ink-navy tracking-wide uppercase mb-3 leading-tight text-left">
                      {card.name}
                    </h4>

                    {/* Claymorphic Visual Progress Bar */}
                    <div className="mb-4">
                      <div className="h-1.5 w-full bg-bone-dark/20 rounded-full overflow-hidden border border-white/50 p-[1px] shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: card.proficiency }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.1 }}
                          className="h-full rounded-full bg-gradient-to-r from-deep-teal to-amber-clay-dark"
                        />
                      </div>
                    </div>
                    
                    {card.frameworks ? (
                      <div className="mt-1" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {card.frameworks.map((fw: any, fIdx) => {
                            const FwIcon = fw.icon;
                            return (
                              <div
                                key={fIdx}
                                onMouseEnter={(e) => {
                                  e.stopPropagation();
                                  setHoveredFramework(fw.name);
                                }}
                                onMouseLeave={(e) => {
                                  e.stopPropagation();
                                  setHoveredFramework(null);
                                }}
                                className={`w-8 h-8 rounded-lg border border-black/5 flex items-center justify-center shadow-clay-subtle relative group/fw ${fw.color || ''}`}
                              >
                                {fw.imageUrl ? (
                                  <img 
                                    src={fw.imageUrl} 
                                    alt={fw.name} 
                                    className="w-5.5 h-5.5 object-contain transition-transform duration-300 group-hover/fw:scale-110"
                                    referrerPolicy="no-referrer"
                                  />
                                ) : FwIcon ? (
                                  <FwIcon className="w-4 h-4 transition-transform duration-300 group-hover/fw:scale-110" />
                                ) : null}
                                <AnimatePresence>
                                  {hoveredFramework === fw.name && (
                                    <motion.div
                                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                                      animate={{ opacity: 1, y: 0, scale: 1 }}
                                      exit={{ opacity: 0, y: 6, scale: 0.95 }}
                                      transition={{ duration: 0.15, ease: "easeOut" }}
                                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-52 p-3 rounded-xl bg-cream border border-black/5 shadow-lg text-left z-30 pointer-events-none"
                                    >
                                      {/* Arrow */}
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-[5px] border-transparent border-t-cream z-30" />
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-black/5 -z-10" />

                                      <div className="flex items-center justify-between gap-2 mb-1 border-b border-black/5 pb-0.5">
                                        <span className="text-[9px] font-sans font-extrabold text-ink-navy uppercase">{fw.name}</span>
                                        <span className="text-[8px] font-mono font-black text-amber-clay-dark">{fw.proficiency}</span>
                                      </div>
                                      <span className="text-[8px] font-mono font-bold text-deep-teal uppercase block mb-1">{fw.level}</span>
                                      <p className="text-[9px] text-ink-soft leading-relaxed font-semibold normal-case">
                                        {fw.desc}
                                      </p>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                        <p className="text-[10px] text-ink-soft font-semibold leading-relaxed text-left">
                          {card.desc}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-ink-soft font-semibold leading-relaxed text-left">
                        {card.desc}
                      </p>
                    )}
                  </div>

                  {/* Proof badge */}
                  <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between text-[8px] font-bold text-amber-clay-dark tracking-wider uppercase shrink-0">
                    <span className="flex items-center gap-1">
                      <Sparkles size={10} className="text-amber-clay" />
                      SERTIFIKASI / BUKTI
                    </span>
                    <span className="flex items-center gap-0.5 text-ink-soft hover:text-deep-teal transition-colors font-sans">
                      PRATINJAU <ChevronRight size={10} className="stroke-[2.5]" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
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
