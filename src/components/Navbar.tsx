import { useState, useEffect } from 'react';
import { Github, Instagram, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Kamar 3D', href: '#room-3d' },
    { name: 'Tentang', href: '#about' },
    { name: 'Proyek', href: '#projects' },
    { name: 'Keahlian', href: '#skills' },
    { name: 'Pengalaman', href: '#experience' },
    { name: 'Kontak', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream/95 backdrop-blur-md border-b border-black/5 shadow-clay-subtle py-3'
          : 'bg-transparent border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand identity */}
        <a href="#room-3d" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-xl overflow-hidden border border-white bg-cream flex items-center justify-center shadow-clay-subtle">
            <img 
              src="/FAVICON.png" 
              alt="Logo FAEEZZ" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-base font-display font-bold tracking-tight text-ink-navy group-hover:text-amber-clay-dark transition-colors">
              Muhammad Faiz Dzahin
            </span>
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-deep-teal">
              Web Developer & Pembangun Sistem
            </span>
          </div>
        </a>

        {/* Clean desktop links with border hover (BUKAN pill di tengah) */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-sans font-bold text-ink-soft hover:text-ink-navy tracking-wide transition-colors py-1 relative group/link"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-clay group-hover/link:w-full transition-all duration-200" />
            </a>
          ))}

          <div className="h-4 w-px bg-black/10 mx-1" />

          {/* Social icons */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/zeynnn1925-sys"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-xl bg-cream border border-white text-ink-navy hover:text-amber-clay-dark flex items-center justify-center shadow-clay-btn transition-transform active:scale-95"
              title="GitHub"
            >
              <Github size={14} />
            </a>
            <a
              href="https://www.instagram.com/mhmmdfaizdzhn._/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-xl bg-cream border border-white text-ink-navy hover:text-amber-clay-dark flex items-center justify-center shadow-clay-btn transition-transform active:scale-95"
              title="Instagram"
            >
              <Instagram size={14} />
            </a>
          </div>
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-cream border border-white text-ink-navy shadow-clay-btn"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream border-b border-black/5 p-4 space-y-2 shadow-clay-raised">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-xs font-sans font-bold text-ink-navy hover:bg-bone-dark/30 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
