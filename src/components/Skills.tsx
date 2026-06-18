import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import FilePreviewModal from './FilePreviewModal';
import { 
  ChevronRight, FileText, FileSpreadsheet, Presentation, Sparkles, 
  Atom, Code2, Braces, Wind, Database, Terminal, Laptop
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
      colorClass: "hover:border-[#c5a880]/40 hover:shadow-[0_15px_40px_rgba(197,168,128,0.05)] hover:bg-white/[0.01]",
      glowColor: "rgba(197, 168, 128, 0.12)",
      icon: FileText,
      iconColor: "text-blue-400 group-hover:text-blue-300"
    },
    {
      id: 2,
      name: "Microsoft Excel",
      sub: "VLOOKUP, COUNTIF, IF & Data Validasi",
      desc: "Komparasi pangkalan data tabular, standardisasi entri, serta olah formula aritmatika logis.",
      proofFile: "/presensi-kehadiran.xlsx",
      colorClass: "hover:border-[#c5a880]/40 hover:shadow-[0_15px_40px_rgba(197,168,128,0.05)] hover:bg-white/[0.01]",
      glowColor: "rgba(197, 168, 128, 0.12)",
      icon: FileSpreadsheet,
      iconColor: "text-emerald-400 group-hover:text-emerald-300"
    },
    {
      id: 3,
      name: "Microsoft Office",
      sub: "Animasi Dinamis, Infografis & Adminis",
      desc: "Standardisasi rancang presentasi korporat serta kolaborasi terpadu antar aplikasi Office.",
      proofFile: "/proposal-gema-alquran.docx",
      colorClass: "hover:border-[#c5a880]/40 hover:shadow-[0_15px_40px_rgba(197,168,128,0.05)] hover:bg-white/[0.01]",
      glowColor: "rgba(197, 168, 128, 0.12)",
      icon: Presentation,
      iconColor: "text-amber-400 group-hover:text-orange-300"
    },
    {
      id: 4,
      name: "Web Programming",
      sub: "HTML, CSS, JS, React & Frameworks",
      desc: "Implementasi desain antarmuka web modern dengan arsitektur kode responsif dan terstandardisasi.",
      proofFile: "/laporan-pekanan-osis.docx",
      colorClass: "hover:border-[#eedec9]/40 hover:shadow-[0_15px_40px_rgba(238,222,201,0.05)] hover:bg-white/[0.01]",
      glowColor: "rgba(238, 222, 201, 0.12)",
      icon: Laptop,
      iconColor: "text-purple-400 group-hover:text-fuchsia-300",
      frameworks: [
        { name: "React", icon: Atom, color: "text-[#61dafb] hover:bg-[#61dafb]/10" },
        { name: "JavaScript", icon: Braces, color: "text-[#f7df1e] hover:bg-[#f7df1e]/10" },
        { name: "HTML5/CSS3", icon: Code2, color: "text-[#e34f26] hover:bg-[#e34f26]/10" },
        { name: "Tailwind", icon: Wind, color: "text-[#38bdf8] hover:bg-[#38bdf8]/10" },
        { name: "Database", icon: Database, color: "text-[#47a248] hover:bg-[#47a248]/10" }
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

        {/* Centered Grid Layout: Hard Skills */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-2.5 mb-10 border-b border-white/5 pb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]"></span>
            <h3 className="text-sm font-mono font-medium text-white uppercase tracking-wider text-center bg-[#0b0b0b]">
              Skills
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    className={`p-6 flex flex-col justify-between min-h-[300px] h-auto rounded-2xl relative select-none cursor-pointer transition-all duration-300 ease-out border border-white/5 bg-zinc-950/40 ${card.colorClass}`}
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
                      <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                    </div>

                    {/* Metadata */}
                    <div className="mt-4 flex-grow flex flex-col justify-center">
                      <span className="text-[9px] text-[#c5a880] font-mono font-semibold tracking-widest uppercase block mb-1">
                        {card.sub}
                      </span>
                      <h4 className="text-md font-display font-medium text-white tracking-wide uppercase mb-2">
                        {card.name}
                      </h4>
                      
                      {card.frameworks ? (
                        <div className="mt-2.5">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {card.frameworks.map((fw, fIdx) => {
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
                                  className={`w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center transition-all duration-300 relative group/fw ${fw.color}`}
                                  onClick={(e) => e.stopPropagation()} // prevent double trigger
                                >
                                  <FwIcon className="w-4.5 h-4.5 transition-transform duration-300 group-hover/fw:scale-110" />
                                  <AnimatePresence>
                                    {hoveredFramework === fw.name && (
                                      <motion.span
                                        initial={{ opacity: 0, y: 4, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                                        className="absolute -top-8 px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-[9px] font-mono text-white whitespace-nowrap z-20 pointer-events-none"
                                      >
                                        {fw.name}
                                      </motion.span>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </div>
                          <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                            {card.desc}
                          </p>
                        </div>
                      ) : (
                        <p className="text-xs text-neutral-400 font-light leading-relaxed">
                          {card.desc}
                        </p>
                      )}
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
