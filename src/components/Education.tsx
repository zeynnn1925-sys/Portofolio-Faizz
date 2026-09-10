import { motion } from 'motion/react';
import { BookOpen, GraduationCap, Award, MapPin } from 'lucide-react';
import { headerVariants, cardVariants, scrollViewport, smoothEase } from '../lib/animations';

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
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="mb-16 text-center"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={scrollViewport}
            transition={{ duration: 0.5, ease: smoothEase }}
            className="text-xs font-bold uppercase tracking-widest text-deep-teal font-mono block mb-2"
          >
            ACADEMIC FOUNDATION
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-ink-navy tracking-tight">
            Sertifikasi <span className="text-amber-clay-dark italic font-semibold">& Pendidikan</span>
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={scrollViewport}
            transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
            className="h-[3px] w-16 bg-amber-clay rounded-full mt-3 mx-auto origin-center"
          />
        </motion.div>

        {/* Index Card Design with Smooth Scroll Trigger */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="p-8 md:p-10 relative flex flex-col md:flex-row gap-8 items-center justify-between border border-white bg-cream rounded-[24px] shadow-clay-raised hover:shadow-clay-raised-hover hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="flex-1 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left pt-3">
            {/* Round Teal Academic Icon Container */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotate: -6 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
              viewport={scrollViewport}
              transition={{ duration: 0.6, delay: 0.15, ease: smoothEase }}
              className="w-14 h-14 shrink-0 rounded-[18px] bg-deep-teal text-cream flex items-center justify-center border border-white shadow-clay-btn group-hover:scale-105 transition-transform duration-300"
            >
              <GraduationCap size={26} />
            </motion.div>

            <div className="flex-1">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={scrollViewport}
                transition={{ duration: 0.5, delay: 0.2, ease: smoothEase }}
                className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-3"
              >
                <span className="px-2.5 py-0.5 rounded-lg bg-bone-dark/40 border border-black/5 font-mono text-[9px] text-deep-teal font-extrabold uppercase tracking-widest flex items-center gap-1">
                  <Award size={10} className="text-amber-clay-dark" />
                  2022 - 2025
                </span>
                <span className="text-ink-soft text-xs font-mono font-bold flex items-center gap-1 uppercase">
                  <BookOpen size={11} className="text-amber-clay-dark" />
                  Ilmu Pengetahuan Sosial (IPS)
                </span>
                <span className="text-ink-soft text-xs font-mono font-bold flex items-center gap-1 uppercase">
                  <MapPin size={11} className="text-deep-teal" />
                  Indramayu, Jawa Barat
                </span>
              </motion.div>

              <motion.h3 
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={scrollViewport}
                transition={{ duration: 0.5, delay: 0.25, ease: smoothEase }}
                className="text-xl sm:text-2xl font-display font-bold text-ink-navy mb-3 tracking-tight"
              >
                MAS Ma'had Al-Zaytun
              </motion.h3>

              <motion.p 
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={scrollViewport}
                transition={{ duration: 0.5, delay: 0.3, ease: smoothEase }}
                className="text-ink-soft font-sans font-medium text-xs sm:text-sm leading-relaxed max-w-xl"
              >
                Lembaga pendidikan berasrama (boarding school) terkemuka dengan kurikulum komprehensif yang mengintegrasikan disiplin tinggi, keteraturan, tata tertib, organisasi kepeloporan, serta pengayaan wawasan sosiologis global. Pembelajaran intensif ini telah membentuk etos kerja berintegritas tinggi yang dibawanya dalam dunia profesional.
              </motion.p>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
