import { motion } from 'motion/react';
import { Calendar, Clock, ShieldCheck, Database } from 'lucide-react';

export default function Experience() {
  const duties = [
    {
      title: "Administrasi & Kearsipan",
      icon: Database,
      items: [
        "Mendokumentasikan, menata, dan mengarsipkan lebih dari 200+ dokumen kearsipan surat-menyurat organisasi.",
        "Mengimplementasikan fitur Mail Merge secara profesional untuk efisiensi pembuatan surat massal yang instan.",
        "Menjamin ketersediaan arsip yang aman, rapi, dan mudah diakses kapan pun dibutuhkan."
      ]
    },
    {
      title: "Manajemen Rapat & Notula",
      icon: Clock,
      items: [
        "Mempersiapkan penjadwalan serta menyinkronkan agenda untuk lebih dari 30+ rapat koordinasi setahun.",
        "Mencatat seluruh detail krusial hasil koordinasi dalam format notula rapat yang ringkas dan informatif.",
        "Menghasilkan keputusan tertulis yang terdistribusi transparan kepada seluruh pimpinan organisasi."
      ]
    },
    {
      title: "Kolaborasi & Koordinasi",
      icon: ShieldCheck,
      items: [
        "Beroperasi sebagai penghubung komunikasi utama antara jajaran pengurus dengan pembina Ma'had Al-Zaytun.",
        "Mengkoordinasikan perizinan administrasi secara berkala secara 100% tepat waktu.",
        "Memitigasi miss-komunikasi antar divisi guna menjamin kepatuhan penuh terhadap tata tertib lembaga."
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 md:py-32 relative bg-bone-light overflow-hidden">
      
      {/* Background spotlights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-deep-teal/5 blur-[120px]" />
        <div className="absolute inset-0 bg-paper-grid opacity-75" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="mb-16 md:mb-20"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-deep-teal font-mono block mb-2">CORPORATE STEWARDSHIP</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-ink-navy tracking-tight">
            Pengalaman <span className="text-amber-clay-dark italic font-semibold">Kepemimpinan</span>
          </h2>
          <div className="h-[3px] w-16 bg-amber-clay rounded-full mt-3"></div>
        </motion.div>

        {/* Experience Single Massive Card (Archival Dossier Style) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
          className="relative rounded-[28px] bg-cream border border-white shadow-clay-raised p-8 md:p-10 overflow-hidden transition-all duration-300 hover:shadow-clay-raised-hover group"
        >
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-black/5 mb-8 pt-3">
            <div>
              <span className="text-[10px] text-amber-clay-dark font-mono font-bold tracking-wider uppercase block mb-1">STRUKTUR UTAMA ORGANISASI</span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-ink-navy tracking-tight">
                Sekretaris Organisasi
              </h3>
              <p className="text-sm font-sans text-ink-soft font-bold mt-1">
                Organisasi Pelajar Ma'had Al-Zaytun (OPMAZ)
              </p>
            </div>

            <div className="flex items-center gap-3 bg-bone-dark/30 border border-black/5 rounded-2xl p-3 shadow-clay-inset shrink-0">
              <span className="w-9 h-9 rounded-xl bg-cream border border-white flex items-center justify-center text-deep-teal shadow-clay-subtle">
                <Calendar size={15} />
              </span>
              <div className="flex flex-col">
                <span className="text-[8px] text-ink-soft font-mono uppercase font-bold tracking-wider">Masa Pengabdian</span>
                <span className="text-xs font-bold text-ink-navy font-mono">2024 - 2025</span>
              </div>
            </div>
          </div>

          {/* 3-Column Duties Row */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {duties.map((duty, idx) => {
              const Icon = duty.icon;
              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.2 + idx * 0.1 }}
                  className="flex flex-col gap-4 p-5 rounded-[20px] bg-bone-dark/20 border border-black/5 shadow-clay-inset hover:bg-bone-dark/30 hover:scale-[1.01] transition-all duration-300"
                >
                  <div className="flex items-center gap-2.5 border-b border-black/5 pb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cream border border-white flex items-center justify-center text-deep-teal shadow-clay-subtle">
                      <Icon size={14} />
                    </div>
                    <h4 className="text-sm font-sans font-bold text-ink-navy tracking-wide">
                      {duty.title}
                    </h4>
                  </div>

                  <ul className="space-y-3 flex-1">
                    {duty.items.map((item, key) => (
                      <li key={key} className="flex gap-2 items-start text-xs text-ink-soft font-semibold leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-clay mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
