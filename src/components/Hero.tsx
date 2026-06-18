import { useEffect, useRef, useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Send, ChevronDown } from 'lucide-react';

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

  // Cycle value propositions
  useEffect(() => {
    const interval = setInterval(() => {
      setPropIndex((prev) => (prev + 1) % valueProps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Floating background sparkles
  const starsArray = [
    { top: '15%', left: '12%', color: 'from-amber-200 to-transparent', size: 'w-1 h-1' },
    { top: '35%', left: '80%', color: 'from-neutral-400 to-transparent', size: 'w-1.5 h-1.5' },
    { top: '68%', left: '18%', color: 'from-amber-100 to-transparent', size: 'w-2 h-2' },
    { top: '55%', left: '88%', color: 'from-amber-300 to-transparent', size: 'w-1.5 h-1.5' },
    { top: '82%', left: '46%', color: 'from-neutral-300 to-transparent', size: 'w-1 h-1' },
    { top: '22%', left: '48%', color: 'from-amber-200 to-transparent', size: 'w-1.5 h-1.5' }
  ];

  // Particle Canvas Background Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 45;

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
        const baseAlpha = 0.15 + Math.random() * 0.35;
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: 1 + Math.random() * 2,
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
        
        // Let them float slightly
        p.x += p.vx;
        p.y += p.vy;

        // Loop screen edge boundaries
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Interactive mouse gravity factor
        if (mousePos.x !== -1000 && mousePos.y !== -1000) {
          const dx = mousePos.x - p.x;
          const dy = mousePos.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            // Gentle gravitational pull
            p.x += (dx / dist) * 0.18;
            p.y += (dy / dist) * 0.18;
            p.alpha = Math.min(0.8, p.baseAlpha * (1 + (180 - dist) / 100));
          } else {
            p.alpha = p.baseAlpha;
          }
        }

        // Render point
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197, 168, 128, ${p.alpha})`; // Elegant bronze-gold
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distNodes = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (distNodes < 110) {
            const lineAlpha = (110 - distNodes) / 110 * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(197, 168, 128, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  // Combined mouse movement tracking
  const handleHeroMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Set position relative to the workspace container
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    // Sub-handler for 3D portrait module tilt
    if (!cardRef.current) return;
    const card = cardRef.current;
    const cardRect = card.getBoundingClientRect();
    const cardW = cardRect.width;
    const cardH = cardRect.height;
    
    const mouseXOnCard = e.clientX - cardRect.left - cardW / 2;
    const mouseYOnCard = e.clientY - cardRect.top - cardH / 2;

    const rotateX = -(mouseYOnCard / (cardH / 2)) * 10;
    const rotateY = (mouseXOnCard / (cardW / 2)) * 10;

    const glowX = ((e.clientX - cardRect.left) / cardW) * 100;
    const glowY = ((e.clientY - cardRect.top) / cardH) * 100;

    setCoords({ rotateX, rotateY, scale: 1.025, glowX, glowY });
  };

  const handleHeroMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
    setCoords({ rotateX: 0, rotateY: 0, scale: 1, glowX: 50, glowY: 50 });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
      className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden bg-cyber-grid bg-[#0a0a0d] border-b border-white/[0.03]"
    >
      {/* High-Performance Interactive Canvas Element */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-70"
      />

      {/* Absolute background visualizers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft, warm, luxurious bronze/gold spotlights */}
        <div className="absolute top-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-amber-500/[0.04] blur-[150px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[35%] left-[-15%] w-[50vw] h-[50vw] rounded-full bg-zinc-400/[0.03] blur-[130px] animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-[-10%] right-[20%] w-[45vw] h-[45vw] rounded-full bg-amber-600/[0.03] blur-[140px] animate-pulse" style={{ animationDuration: '7s' }}></div>
        
        {/* Floating background orbs */}
        <div className="absolute top-[25%] left-[65%] w-72 h-72 rounded-full bg-amber-500/[0.015] blur-[80px] animate-bounce" style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-[60%] left-[30%] w-80 h-80 rounded-full bg-neutral-500/[0.015] blur-[90px] animate-bounce" style={{ animationDuration: '16s' }}></div>

        {/* Delicate golden sparkles */}
        {starsArray.map((star, i) => (
          <div 
            key={i} 
            className={`absolute rounded-full bg-gradient-to-r ${star.color} ${star.size} opacity-30`} 
            style={{ top: star.top, left: star.left, animationDelay: `${i * 0.4}s` }}
          />
        ))}

        <div className="absolute inset-0 bg-dot-grid opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Side Content - Staggered reveals */}
        <div className="md:col-span-7 flex flex-col items-start text-left lg:pr-4">
          
          {/* Curated status badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-zinc-950/75 backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#c5a880]"></span>
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#c5a880]">
              Administrative & Systems Specialist
            </span>
          </motion.div>
 
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-semibold leading-[1.1] tracking-tight mb-2 text-white max-w-2xl">
              Muhammad <br />
              <span className="text-gradient-gold italic font-normal tracking-wide">Faiz Dzahin</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-2 py-0.5 px-3 mb-6 rounded bg-amber-500/[0.06] border border-amber-500/10 text-[10px] font-mono text-[#c5a880] uppercase tracking-wider"
          >
            <span>Sistem Informasi</span>
            <span>•</span>
            <span>Akurasi Log Administrasi</span>
            <span>•</span>
            <span>Rancang Bangun Web</span>
          </motion.div>

          {/* Value Proposition Slideshow (Interactive Narrative Container) */}
          <div className="min-h-[110px] sm:min-h-[90px] w-full mb-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={propIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="space-y-1.5"
              >
                <div className="flex items-center gap-2 text-amber-100 font-display font-medium text-lg sm:text-xl md:text-2xl">
                  <span className="text-[#c5a880] font-mono text-sm">[0{propIndex + 1}]</span>
                  <h2>{valueProps[propIndex].text}</h2>
                </div>
                <p className="text-neutral-400 font-sans font-light text-xs sm:text-sm leading-relaxed max-w-lg">
                  {valueProps[propIndex].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-neutral-400 font-sans font-light text-sm max-w-xl mb-10 leading-relaxed"
          >
            Pengolah pangkalan data dengan integritas administratif teruji. Menggabungkan ketelitian kerja tata buku konvensional dengan fungsionalitas teknologi modern serta sistem informasi web terpadu.
          </motion.p>
 
          {/* Actions CTA with custom glowing animation states */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 w-full relative z-10"
          >
            <a 
              href="#about" 
              className="group flex items-center justify-center gap-2.5 bg-neutral-100 hover:bg-[#c5a880] text-zinc-950 px-7 py-3.5 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto cursor-pointer"
            >
              Kenali Lebih Jauh
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            <a 
              href="#contact" 
              className="flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white px-7 py-3.5 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto cursor-pointer"
            >
              <Send size={11} />
              Hubungi Saya
            </a>
          </motion.div>
        </div>
 
        {/* Right Side - Interactive 3D Card with Tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="md:col-span-5 flex items-center justify-center relative select-none cursor-pointer mt-10 md:mt-0"
        >
          {/* Subtle gold halo behind portrait */}
          <div className="absolute -inset-10 rounded-full bg-amber-500/[0.02] blur-3xl pointer-events-none" />

          {/* Perspective Interactive Frame Container */}
          <div
            ref={cardRef}
            className="relative w-[300px] h-[390px] sm:w-[330px] sm:h-[430px] rounded-3xl bg-gradient-to-b from-zinc-900 via-neutral-950 to-neutral-950 border border-white/15 p-4 shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-visible transition-all duration-300 ease-out z-10 hover:border-amber-400/[0.3]"
            style={{
              transform: `perspective(1000px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) scale(${coords.scale})`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Interactive gold card reflection shimmer */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-45 mix-blend-color-dodge transition-opacity duration-300 rounded-3xl overflow-hidden"
              style={{
                background: `radial-gradient(circle 220px at ${coords.glowX}% ${coords.glowY}%, rgba(197, 168, 128, 0.16), transparent 85%)`
              }}
            />





            {/* Inner Gold-Satin Card border frame */}
            <div className="w-full h-full rounded-2xl overflow-hidden relative border border-white/5" style={{ transform: 'translateZ(10px)' }}>
              {/* Photo component */}
              <img 
                src="/Foto.jpg" 
                alt="Muhammad Faiz Dzahin Portrait" 
                className="w-full h-full object-cover select-none filter brightness-[0.93] contrast-[1.03]"
                referrerPolicy="no-referrer"
              />
              
              {/* Bottom gradient mask for photographic contrast */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent opacity-85" />
            </div>
          </div>
        </motion.div>

      </div>

      {/* Smooth Animated Indicator to Scroll Down */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 cursor-pointer pointer-events-auto select-none"
        onClick={() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">Selami Portofolio</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-[#c5a880]"
        >
          <ChevronDown size={14} className="stroke-[2.5]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
