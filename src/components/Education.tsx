import { motion } from 'motion/react';
import { BookOpen, GraduationCap } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="py-24 md:py-32 relative bg-bone-light overflow-hidden">
      
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[45vw] h-[45vw] rounded-full bg-amber-clay/5 blur-[120px]"></div>
        <div className="absolute inset-0 bg-paper-grid opacity-75"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-deep-teal font-mono block mb-2">ACADEMIC FOUNDATION</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-ink-navy tracking-tight">
            Sertifikasi <span className="text-amber-clay-dark italic font-semibold">& Pendidikan</span>
          </h2>
          <div className="h-[3px] w-16 bg-amber-clay rounded-full mt-3 mx-auto"></div>
        </motion.div>

        {/* Index Card Design */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
          className="p-8 md:p-10 relative flex flex-col md:flex-row gap-8 items-center justify-between border border-white bg-cream rounded-[24px] shadow-clay-raised hover:shadow-clay-raised-hover hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="flex-1 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left pt-3">
            {/* Round Teal Academic Icon Container */}
            <div className="w-14 h-14 shrink-0 rounded-[18px] bg-deep-teal text-cream flex items-center justify-center border border-white shadow-clay-btn group-hover:scale-105 transition-transform duration-300">
              <GraduationCap size={26} />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-3">
                <span className="px-2.5 py-0.5 rounded-lg bg-bone-dark/40 border border-black/5 font-mono text-[9px] text-deep-teal font-extrabold uppercase tracking-widest">
                  2022 - 2025
                </span>
                <span className="text-ink-soft text-xs font-mono font-bold flex items-center gap-1 uppercase">
                  <BookOpen size={11} className="text-amber-clay-dark" />
                  Ilmu Pengetahuan Sosial (IPS)
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-ink-navy mb-3 tracking-tight">
                MAS Ma'had Al-Zaytun
              </h3>

              <p className="text-ink-soft font-sans font-medium text-xs sm:text-sm leading-relaxed max-w-xl">
                Lembaga pendidikan berasrama (boarding school) terkemuka dengan kurikulum komprehensif yang mengintegrasikan disiplin tinggi, keteraturan, tata tertib, organisasi kepeloporan, serta pengayaan wawasan sosiologis global. Pembelajaran intensif ini telah membentuk etos kerja berintegritas tinggi yang dibawanya dalam dunia profesional.
              </p>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
