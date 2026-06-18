import { motion } from 'motion/react';
import { BookOpen, GraduationCap } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="py-24 md:py-32 relative bg-cyber-grid bg-[#09090b] overflow-hidden">
      
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[30%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-amber-500/[0.02] blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-neutral-400/[0.02] blur-[100px]"></div>
        <div className="absolute inset-0 bg-dot-grid opacity-15"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#c5a880] font-mono block mb-3"># Academic Foundation</span>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-white tracking-tight">
            Sertifikasi <span className="text-gradient-gold italic font-normal">& Pendidikan</span>
          </h2>
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#c5a880] to-transparent mt-4 mx-auto"></div>
        </motion.div>

        {/* Wide Single Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="p-8 md:p-12 relative flex flex-col md:flex-row gap-10 items-center justify-between overflow-hidden bg-zinc-950/70 border border-white/5 rounded-3xl shadow-2xl group"
        >
          {/* Subtle moving sweeping light in border card top */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#c5a880]/5 to-transparent pointer-events-none opacity-30"></div>
          
          <div className="flex-1 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
            {/* Round Golden Academic Icon Container */}
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#c5a880]/10 border border-[#c5a880]/20 flex items-center justify-center text-[#c5a880] group-hover:scale-105 transition-all duration-300">
              <GraduationCap size={30} />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                <span className="px-3 py-1 rounded bg-white/5 border border-white/5 font-mono text-[9px] text-[#eedec9] uppercase tracking-widest font-semibold">
                  2022 - 2025
                </span>
                <span className="text-neutral-400 text-xs font-mono font-medium flex items-center gap-1.5 uppercase">
                  <BookOpen size={11} />
                  Ilmu Pengetahuan Sosial (IPS)
                </span>
              </div>

              <h3 className="text-2xl font-display font-medium text-white mb-4 tracking-tight">
                MAS Ma'had Al-Zaytun
              </h3>

              <p className="text-neutral-400 font-sans font-light text-sm leading-relaxed max-w-xl">
                Lembaga pendidikan berasrama (boarding school) terkemuka dengan kurikulum komprehensif yang mengintegrasikan disiplin tinggi, keteraturan, tata tertib, organisasi kepeloporan, serta pengayaan wawasan sosiologis global. Pembelajaran intensif ini telah membentuk etos kerja berintegritas tinggi yang dibawanya dalam dunia profesional.
              </p>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
