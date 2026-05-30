import { motion } from 'motion/react';
import { Briefcase, Calendar, Clock, ShieldCheck, Database } from 'lucide-react';

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

  const stats = [
    { value: "200+", label: "Arsip Surat & Dokumen", sub: "Digital & Fisik Rapi" },
    { value: "30+", label: "Rapat Terkoordinasi", sub: "Transparan & Efisien" },
    { value: "100%", label: "Perizinan Selesai", sub: "Tepat Waktu & Akurat" }
  ];

  return (
    <section id="experience" className="py-24 md:py-32 relative bg-cyber-grid bg-[#09090b] overflow-hidden">
      
      {/* Background spotlights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-amber-500/[0.02] blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-15%] w-[50vw] h-[50vw] rounded-full bg-neutral-400/[0.02] blur-[100px]"></div>
        <div className="absolute inset-0 bg-dot-grid opacity-15"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#c5a880] font-mono block mb-3"># Corporate Stewardship</span>
          <h2 className="text-4xl md:text-6xl font-display font-semibold text-white tracking-tight">
            Pengalaman <span className="text-gradient-gold italic font-normal">Kepemimpinan</span>
          </h2>
          <div className="h-[1px] w-20 bg-gradient-to-r from-[#c5a880] via-[#eedec9] to-transparent mt-4"></div>
        </motion.div>

        {/* Experience Single Massive Cinematic Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-3xl bg-zinc-950/75 border border-white/5 shadow-2xl p-8 md:p-12 overflow-hidden transition-all duration-500 ease-out hover:border-white/10 group"
        >
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-white/5 mb-10">
            <div>
              <span className="text-[10px] text-[#c5a880] font-mono font-bold tracking-widest uppercase block mb-1">STRUKTUR UTAMA</span>
              <h3 className="text-2xl sm:text-3xl font-display font-medium text-white tracking-tight">
                Sekretaris Organisasi
              </h3>
              <p className="text-sm font-sans text-neutral-400 font-light mt-1 flex items-center gap-2">
                <span className="font-semibold text-neutral-300">Organisasi Pelajar Ma'had Al-Zaytun (OPMAZ)</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#c5a880]">
                <Calendar size={16} />
              </span>
              <div className="flex flex-col">
                <span className="text-[9px] text-neutral-500 font-mono uppercase font-bold tracking-wider">Masa Pengabdian</span>
                <span className="text-sm font-bold text-white font-mono">2024 - 2025</span>
              </div>
            </div>
          </div>

          {/* 3-Column Duties Row */}
          <div className="grid md:grid-cols-3 gap-10 lg:gap-14 pb-12 border-b border-white/5 mb-10">
            {duties.map((duty, idx) => {
              const Icon = duty.icon;
              return (
                <div key={idx} className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[#c5a880] group-hover:bg-[#c5a880]/10 transition-colors">
                      <Icon size={15} />
                    </div>
                    <h4 className="text-md font-display font-medium text-white tracking-wide">
                      {duty.title}
                    </h4>
                  </div>

                  <ul className="space-y-3.5">
                    {duty.items.map((item, key) => (
                      <li key={key} className="flex gap-2.5 items-start text-xs text-neutral-400 font-light leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-[#c5a880] mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* 3-Column Stats Numbers Row */}
          <div className="grid sm:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center md:items-start text-center md:text-left p-5 rounded-2xl bg-white/[0.01] border border-transparent hover:border-white/5 hover:bg-white/[0.02] transition-all duration-300"
              >
                <span className="text-4xl sm:text-5xl font-display font-semibold text-white group-hover:text-amber-200 transition-colors duration-300">
                  {stat.value}
                </span>
                <span className="text-[10px] text-[#c5a880] font-mono font-bold uppercase tracking-widest mt-1 block">
                  {stat.label}
                </span>
                <span className="text-[10px] text-neutral-500 font-light mt-0.5">
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
