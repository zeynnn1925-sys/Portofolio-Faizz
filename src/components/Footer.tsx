import { motion } from 'motion/react';
import { ArrowUp, Github, Instagram, Linkedin, Heart } from 'lucide-react';
import { cardVariants, scrollViewport } from '../lib/animations';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#EAE3D4] text-[#242B38] py-16 border-t border-black/5 relative z-10 overflow-hidden">
      
      {/* Absolute subtle separating line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[1.5px] bg-black/5" />

      <motion.div 
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        className="max-w-6xl mx-auto px-6 md:px-12 relative z-10"
      >
        
        {/* Minimal 3-Column Layout */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-8 pb-12 border-b border-black/5">
          
          {/* Column 1: Brand details */}
          <div className="flex flex-col items-start text-left space-y-4">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-white bg-cream flex items-center justify-center shadow-clay-subtle group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="/FAVICON.png" 
                  alt="FAEEZZ Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer" 
                />
              </div>
              <span className="text-xl font-display font-black tracking-wider text-ink-navy">
                FAEEZZ<span className="text-amber-clay-dark font-sans font-extrabold">.</span>
              </span>
            </a>
            
            <p className="text-xs text-ink-soft font-semibold leading-relaxed max-w-xs">
              Membangun dan menstrukturkan dokumen, data, serta arsitektur kode dengan presisi maksimal berlandaskan etika kerja unggul.
            </p>
          </div>

          {/* Column 2: Navigation link lists */}
          <div className="flex flex-col text-left space-y-3">
            <h4 className="text-[9px] text-ink-soft font-mono font-bold uppercase tracking-widest block">
              NAVIGASI CEPAT
            </h4>
            
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-ink-navy">
              <a href="#about" className="hover:text-amber-clay-dark transition-colors py-0.5">Tentang Saya</a>
              <a href="#education" className="hover:text-amber-clay-dark transition-colors py-0.5">Pendidikan</a>
              <a href="#experience" className="hover:text-amber-clay-dark transition-colors py-0.5">Pengalaman</a>
              <a href="#skills" className="hover:text-amber-clay-dark transition-colors py-0.5">Keahlian</a>
              <a href="#projects" className="hover:text-amber-clay-dark transition-colors py-0.5">Katalog Proyek</a>
              <a href="#contact" className="hover:text-amber-clay-dark transition-colors py-0.5">Hubungi Faiz</a>
            </div>
          </div>

          {/* Column 3: Social details & Channels */}
          <div className="flex flex-col text-left space-y-3">
            <h4 className="text-[9px] text-ink-soft font-mono font-bold uppercase tracking-widest block">
              SALURAN KONEKSI
            </h4>

            <div className="flex flex-col gap-2 text-xs font-semibold text-ink-navy">
              <a 
                href="https://github.com/zeynnn1925-sys" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-amber-clay-dark transition-colors"
              >
                <Github size={13} className="text-deep-teal" />
                <span>GitHub @zeynnn1925-sys</span>
              </a>
              <a 
                href="https://www.instagram.com/mhmmdfaizdzhn._/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-amber-clay-dark transition-colors"
              >
                <Instagram size={13} className="text-deep-teal" />
                <span>Instagram @mhmmdfaizdzhn._</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/kamenrider-eezz-993360405/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-amber-clay-dark transition-colors"
              >
                <Linkedin size={13} className="text-deep-teal" />
                <span>LinkedIn @kamenrider-eezz</span>
              </a>
              <span className="text-[10px] text-ink-soft font-mono select-all">
                muhammadfaizdzahin11@gmail.com
              </span>
            </div>
          </div>

        </div>

        {/* Footer Bottom copyright with ScrollToTop arrow */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-ink-soft font-semibold">
          <p>&copy; {currentYear} Muhammad Faiz Dzahin. Seluruh hak cipta dilindungi.</p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              Dibuat dengan 
              <Heart size={10} className="text-amber-clay-dark fill-amber-clay-dark" /> 
              oleh Faiz
            </span>

            <button 
              type="button"
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-cream border border-white flex items-center justify-center text-ink-navy hover:text-amber-clay-dark shadow-clay-btn hover:shadow-clay-inset hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp size={15} className="stroke-[2.5]" />
            </button>
          </div>
        </div>

      </motion.div>
    </footer>
  );
}
