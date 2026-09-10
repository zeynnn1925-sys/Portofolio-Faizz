import { useState, useEffect } from 'react';
import { Menu, X, Github, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#about');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sections = ['about', 'about-gallery', 'education', 'experience', 'projects', 'skills', 'contact'];
    const observers = sections.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`#${id}`);
            }
          });
        },
        { threshold: 0.2, rootMargin: '-10% 0px -70% 0px' }
      );
      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.element);
      });
    };
  }, []);

  const navLinks = [
    { name: 'Tentang', href: '#about' },
    { name: 'Galeri & 3D', href: '#about-gallery' },
    { name: 'Pendidikan', href: '#education' },
    { name: 'Pengalaman', href: '#experience' },
    { name: 'Proyek', href: '#projects' },
    { name: 'Keahlian', href: '#skills' },
    { name: 'Kontak', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[40] w-[94%] max-w-6xl transition-all duration-500 ease-out rounded-2xl ${
          isScrolled 
            ? 'py-2 px-5 bg-cream/95 backdrop-blur-md border border-white/60 shadow-clay-raised' 
            : 'py-4 px-6 bg-transparent border border-transparent shadow-none'
        }`}
      >
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/80 bg-bone-dark/50 flex items-center justify-center shadow-clay-subtle group-hover:scale-105 transition-transform duration-300">
              <img 
                src="/FAVICON.png" 
                alt="FAEEZZ Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer" 
              />
            </div>
            <span className="text-lg font-display font-bold uppercase tracking-widest text-ink-navy group-hover:text-amber-clay transition-colors duration-300">
              FAEEZZ<span className="text-amber-clay font-sans">.</span>
            </span>
          </a>

          {/* Desktop Nav as Tab Binder */}
          <nav className="hidden lg:flex items-center gap-4">
            <div className="flex items-center p-1 bg-bone-dark/30 rounded-[18px] border border-black/5 shadow-clay-inset">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a 
                    key={link.name}
                    href={link.href} 
                    className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold tracking-wide transition-all duration-300 relative ${
                      isActive 
                        ? 'text-ink-navy bg-cream shadow-clay-raised font-bold border border-white/50' 
                        : 'text-ink-soft hover:text-ink-navy'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
            
            <div className="h-5 w-px bg-ink-navy/10 mx-2"></div>
            
            <div className="flex items-center gap-2">
              <a 
                href="https://github.com/zeynnn1925-sys" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-xl border border-white/80 bg-cream flex items-center justify-center shadow-clay-subtle hover:shadow-clay-inset text-ink-navy hover:text-amber-clay active:scale-95 transition-all duration-300"
                title="Github"
              >
                <Github size={14} />
              </a>
              <a 
                href="https://www.instagram.com/mhmmdfaizdzhn._/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-xl border border-white/80 bg-cream flex items-center justify-center shadow-clay-subtle hover:shadow-clay-inset text-ink-navy hover:text-amber-clay active:scale-95 transition-all duration-300"
                title="Instagram"
              >
                <Instagram size={14} />
              </a>
            </div>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-xl bg-cream/80 border border-white/60 shadow-clay-subtle text-ink-navy hover:text-amber-clay active:scale-95 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
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
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-[94%] z-[39] bg-cream border border-white/80 rounded-2xl shadow-clay-raised lg:hidden overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2 p-1.5 bg-bone-dark/20 rounded-xl shadow-clay-inset">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`block text-center py-2.5 rounded-lg text-xs font-sans font-semibold tracking-wider uppercase transition-all ${
                        isActive 
                          ? 'bg-cream text-ink-navy shadow-clay-subtle font-bold border border-white/40' 
                          : 'text-ink-soft hover:text-ink-navy'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </div>
              
              <div className="flex justify-center gap-4 pt-4 border-t border-black/5">
                <a 
                  href="https://github.com/zeynnn1925-sys" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-xl border border-white/80 bg-cream flex items-center justify-center shadow-clay-subtle text-ink-navy hover:text-amber-clay transition-all"
                >
                  <Github size={16} />
                </a>
                <a 
                  href="https://www.instagram.com/mhmmdfaizdzhn._/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-xl border border-white/80 bg-cream flex items-center justify-center shadow-clay-subtle text-ink-navy hover:text-amber-clay transition-all"
                >
                  <Instagram size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

