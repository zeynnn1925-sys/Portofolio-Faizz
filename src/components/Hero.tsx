import { useEffect, useRef, useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0, scale: 1, glowX: 50, glowY: 50 });
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  
  // Interactive Key Value Propositions for Muhammad Faiz Dzahin
  const valueProps = [
    { text: "Akurasi Administrasi Mutlak", desc: "Menjamin keabsahan dan keandalan data sistem organisasi." },
    { text: "Pengolahan Data Terstruktur", desc: "Efisiensi penginputan data dengan standardisasi tata kelola tingkat tinggi." },
    { text: "Rancang Bangun Full-Stack", desc: "Digitalisasi sistem administrasi yang adaptif, aman, dan berdaya guna." },
    { text: "Integritas & Tata Kelola Prima", desc: "Dedikasi berorganisasi dengan prinsip akuntabilitas dan presisi." }
  ];
  const [propIndex, setPropIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [heroVisible, setHeroVisible] = useState(true);

  // Scroll Parallax Tracking with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [heroVisible]);

  // Cycle value propositions
  useEffect(() => {
    const interval = setInterval(() => {
      setPropIndex((prev) => (prev + 1) % valueProps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Particle Canvas Background Animation using Deep Teal tones
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 35;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const w = canvas.width;
      const h = canvas.height;
      for (let i = 0; i < maxParticles; i++) {
        const baseAlpha = 0.12 + Math.random() * 0.25;
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: 1.5 + Math.random() * 2,
          alpha: baseAlpha,
          baseAlpha: baseAlpha
        });
      };
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw elegant background nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        if (mousePos.x !== -1000 && mousePos.y !== -1000) {
          const dx = mousePos.x - p.x;
          const dy = mousePos.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            p.x += (dx / dist) * 0.12;
            p.y += (dy / dist) * 0.12;
            p.alpha = Math.min(0.6, p.baseAlpha * (1 + (150 - dist) / 100));
          } else {
            p.alpha = p.baseAlpha;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(47, 93, 90, ${p.alpha})`; // Deep teal particles
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distNodes = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (distNodes < 110) {
            const lineAlpha = (110 - distNodes) / 110 * 0.08;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(47, 93, 90, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const run = () => {
      draw();
    };
    run();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  // Mouse tilt handlers for portrait card
  const handleHeroMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    if (!cardRef.current) return;
    const card = cardRef.current;
    const cardRect = card.getBoundingClientRect();
    const cardW = cardRect.width;
    const cardH = cardRect.height;
    
    const mouseXOnCard = e.clientX - cardRect.left - cardW / 2;
    const mouseYOnCard = e.clientY - cardRect.top - cardH / 2;

    const rotateX = -(mouseYOnCard / (cardH / 2)) * 8;
    const rotateY = (mouseXOnCard / (cardW / 2)) * 8;

    const glowX = ((e.clientX - cardRect.left) / cardW) * 100;
    const glowY = ((e.clientY - cardRect.top) / cardH) * 100;

    setCoords({ rotateX, rotateY, scale: 1.015, glowX, glowY });
  };

  const handleHeroMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
    setCoords({ rotateX: 0, rotateY: 0, scale: 1, glowX: 50, glowY: 50 });
  };

  return (
    <section 
      id="hero"
      ref={containerRef}
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden bg-paper-grid bg-bone-light"
    >
      {/* High-Performance Interactive Canvas Element */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
      />

      {/* Soft claymorphic visual background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-amber-clay/10 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-deep-teal/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Side Content - Staggered reveals */}
        <div className="md:col-span-7 flex flex-col items-start text-left lg:pr-4">
 
          {/* Name Display heading with Fraunces italic accent */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium leading-[1.1] tracking-tight mb-4 text-ink-navy max-w-2xl">
              Muhammad <br />
              <span className="text-amber-clay-dark italic font-semibold tracking-wide">Faiz Dzahin</span>
            </h1>
          </motion.div>

          {/* Admin Tagline Tag-group */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-1.5 py-1 px-3 mb-6 rounded-xl bg-bone-dark/50 border border-black/5 shadow-clay-inset text-[10px] font-mono text-ink-navy uppercase tracking-wider"
          >
            <span className="font-bold text-deep-teal">Sistem Informasi</span>
            <span className="text-amber-clay font-bold">•</span>
            <span className="font-bold text-deep-teal">Akurasi Log Administrasi</span>
            <span className="text-amber-clay font-bold">•</span>
            <span className="font-bold text-deep-teal">Rancang Bangun Web</span>
          </motion.div>

          {/* Value Proposition Slideshow (Interactive Narrative Container) */}
          <div className="min-h-[110px] sm:min-h-[90px] w-full mb-8 relative bg-cream/70 rounded-2xl p-4 border border-white/60 shadow-clay-subtle">
            <AnimatePresence mode="wait">
              <motion.div
                key={propIndex}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="space-y-1.5"
              >
                <div className="flex items-center gap-2 text-deep-teal font-display font-semibold text-base sm:text-lg">
                  <h2>{valueProps[propIndex].text}</h2>
                </div>
                <p className="text-ink-soft font-sans font-medium text-xs sm:text-sm leading-relaxed max-w-lg">
                  {valueProps[propIndex].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-ink-soft font-sans font-medium text-sm max-w-xl mb-10 leading-relaxed"
          >
            Pengolah pangkalan data dengan integritas administratif teruji. Menggabungkan ketelitian tata buku konvensional dengan sistem informasi web terpadu.
          </motion.p>
 
          {/* Actions CTA: One clay primary button, one underlined link (no double buttons!) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 w-full relative z-10"
          >
            <a 
              href="#about" 
              className="clay-button-primary uppercase tracking-wider text-[10px]"
            >
              Kenali Lebih Jauh
              <ArrowRight size={13} />
            </a>

            <a 
              href="#contact" 
              className="group text-deep-teal hover:text-amber-clay-dark font-sans font-bold uppercase tracking-widest text-[10px] relative py-2 transition-colors duration-300"
            >
              Hubungi Saya
              <span className="absolute bottom-1 left-0 w-full h-[1.5px] bg-deep-teal group-hover:bg-amber-clay-dark transition-all duration-300"></span>
            </a>
          </motion.div>
        </div>
 
        {/* Right Side - Interactive 3D Card with Soft Claymorphism & Verified Stamp */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          style={{ y: heroVisible ? Math.min(scrollY * 0.08, 40) : 0 }}
          className="md:col-span-5 flex items-center justify-center relative select-none mt-10 md:mt-0"
        >
          {/* Perspective Interactive Frame Container */}
          <div
            ref={cardRef}
            className="relative w-[290px] h-[370px] sm:w-[315px] sm:h-[410px] rounded-[30px] bg-cream border border-white/80 p-4 shadow-clay-raised overflow-visible transition-all duration-300 ease-out z-10"
            style={{
              transform: `perspective(1000px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) scale(${coords.scale})`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Soft inner shimmer */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-20 transition-opacity duration-300 rounded-[30px] overflow-hidden"
              style={{
                background: `radial-gradient(circle 200px at ${coords.glowX}% ${coords.glowY}%, rgba(232, 168, 85, 0.25), transparent 85%)`
              }}
            />

            {/* Card Frame */}
            <div className="w-full h-full rounded-[20px] overflow-hidden relative border border-black/5 bg-bone-dark/20 shadow-clay-inset" style={{ transform: 'translateZ(10px)' }}>
              <img 
                src="/Foto.jpg" 
                alt="Muhammad Faiz Dzahin Portrait" 
                className="w-full h-full object-cover select-none filter brightness-[1.02] contrast-[0.98]"
                referrerPolicy="no-referrer"
              />
              
              {/* Soft bottom shading */}
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer pointer-events-auto select-none"
        onClick={() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-ink-soft">Selami Arsip</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-amber-clay-dark"
        >
          <ChevronDown size={14} className="stroke-[2.5]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
