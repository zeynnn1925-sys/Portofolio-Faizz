import { ArrowUp, Github, Instagram, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#09090b] text-[#f3f4f6]/60 py-16 border-t border-white/5 relative z-10 overflow-hidden">
      
      {/* Absolute subtle glowing separating line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-px bg-gradient-to-r from-transparent via-[#c5a880]/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Minimal 3-Column Layout */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 pb-12 border-b border-white/5">
          
          {/* Column 1: Brand details */}
          <div className="flex flex-col items-start text-left">
            <a href="#" className="flex items-center gap-2.5 group mb-4">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 bg-[#09090b] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="/FAVICON.png" 
                  alt="FAEEZZ Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer" 
                />
              </div>
              <span className="text-xl font-display font-bold uppercase tracking-wider text-white">
                FAEEZZ<span className="text-[#c5a880] font-sans">.</span>
              </span>
            </a>
            
            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-xs">
              Membangun dan menstrukturkan dokumen, data, serta arsitektur kode dengan presisi maksimal berlandaskan etika kerja unggul.
            </p>
          </div>

          {/* Column 2: Navigation link lists */}
          <div className="flex flex-col text-left">
            <h4 className="text-[10px] text-white font-mono font-bold uppercase tracking-widest block mb-4">
              Navigasi Cepat
            </h4>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="#about" className="hover:text-[#c5a880] transition-colors py-1 text-neutral-400">Tentang Saya</a>
              <a href="#education" className="hover:text-[#c5a880] transition-colors py-1 text-neutral-400">Pendidikan</a>
              <a href="#experience" className="hover:text-[#c5a880] transition-colors py-1 text-neutral-400">Pengalaman</a>
              <a href="#skills" className="hover:text-[#c5a880] transition-colors py-1 text-neutral-400">Keahlian</a>
              <a href="#contact" className="hover:text-[#c5a880] transition-colors py-1 text-neutral-400">Hubungi Faiz</a>
            </div>
          </div>

          {/* Column 3: Social details & Channels */}
          <div className="flex flex-col text-left">
            <h4 className="text-[10px] text-white font-mono font-bold uppercase tracking-widest block mb-4">
              Saluran Koneksi
            </h4>

            <div className="flex flex-col gap-2.5 text-xs text-neutral-400">
              <a 
                href="https://github.com/zeynnn1925-sys" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-[#c5a880] transition-colors"
              >
                <Github size={13} />
                <span>GitHub @zeynnn1925-sys</span>
              </a>
              <a 
                href="https://www.instagram.com/mhmmdfaizdzhn._/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-[#c5a880] transition-colors"
              >
                <Instagram size={13} />
                <span>Instagram @mhmmdfaizdzhn._</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/kamenrider-eezz-993360405/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-[#c5a880] transition-colors"
              >
                <Linkedin size={13} />
                <span>LinkedIn @kamenrider-eezz</span>
              </a>
              <span className="text-[11px] text-neutral-500 font-mono select-all">
                muhammadfaizdzahin11@gmail.com
              </span>
            </div>
          </div>

        </div>

        {/* Footer Bottom copyright with ScrollToTop arrow */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-500">
          <p>&copy; {currentYear} Muhammad Faiz Dzahin. Seluruh hak cipta dilindungi.</p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              Dibuat dengan 
              <Heart size={10} className="text-[#c5a880] fill-[#c5a880]" /> 
              oleh Faiz
            </span>

            <button 
              type="button"
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white hover:bg-[#c5a880] hover:text-[#09090b] hover:border-transparent hover:scale-105 active:scale-95 transition-all cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
