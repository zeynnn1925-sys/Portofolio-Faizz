import { useState, useEffect } from 'react';
import { Menu, X, Github, Instagram, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Tentang', href: '#about' },
    { name: 'Pendidikan', href: '#education' },
    { name: 'Pengalaman', href: '#experience' },
    { name: 'Proyek', href: '#projects' },
    { name: 'Keahlian', href: '#skills' },
    { name: 'Kontak', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[40] w-[92%] transition-all duration-500 ease-out rounded-2xl ${
          isScrolled 
            ? 'py-3 px-6 bg-zinc-950/85 backdrop-blur-xl border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.6)]' 
            : 'py-5 px-8 bg-transparent border border-white/5 shadow-none'
        }`}
      >
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/10 bg-[#09090b] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <img 
                src="/FAVICON.png" 
                alt="FAEEZZ Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer" 
              />
            </div>
            <span className="text-xl font-display font-bold uppercase tracking-widest text-white group-hover:text-amber-200 transition-colors duration-300">
              FAEEZZ<span className="text-amber-200 font-sans">.</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8 text-[11px] font-sans font-medium uppercase tracking-widest text-[#f4f4f5]/80">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="hover:text-amber-250 transition-all duration-300 relative py-2 group/link"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-250 scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="h-5 w-px bg-white/10"></div>
            
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com/zeynnn1925-sys" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 text-white transition-all hover:scale-105 duration-300"
                title="Github"
              >
                <Github size={15} />
              </a>
              <a 
                href="https://www.instagram.com/mhmmdfaizdzhn._/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 text-white transition-all hover:scale-105 duration-300"
                title="Instagram"
              >
                <Instagram size={15} />
              </a>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-white hover:text-amber-250 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-[92%] z-[39] bg-zinc-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl lg:hidden overflow-hidden"
          >
            <div className="p-8 flex flex-col gap-8">
              <ul className="flex flex-col gap-5 text-sm font-sans font-medium tracking-widest text-center uppercase">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="block text-white hover:text-amber-250 transition-colors py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              
              <div className="flex justify-center gap-6 pt-6 border-t border-white/5">
                <a 
                  href="https://github.com/zeynnn1925-sys" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/5 text-white transition-all hover:scale-105 duration-300"
                >
                  <Github size={18} />
                </a>
                <a 
                  href="https://www.instagram.com/mhmmdfaizdzhn._/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/5 text-white transition-all hover:scale-105 duration-300"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
