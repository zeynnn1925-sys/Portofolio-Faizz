import { useEffect, useRef, useState, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Send } from 'lucide-react';

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0, scale: 1, glowX: 50, glowY: 50 });

  // Floating gold/slate background sparkles
  const starsArray = [
    { top: '15%', left: '12%', color: 'from-amber-200 to-transparent', size: 'w-1 h-1' },
    { top: '35%', left: '80%', color: 'from-neutral-400 to-transparent', size: 'w-1.5 h-1.5' },
    { top: '68%', left: '18%', color: 'from-amber-100 to-transparent', size: 'w-2 h-2' },
    { top: '55%', left: '88%', color: 'from-amber-300 to-transparent', size: 'w-1.5 h-1.5' },
    { top: '82%', left: '46%', color: 'from-neutral-300 to-transparent', size: 'w-1 h-1' },
    { top: '22%', left: '48%', color: 'from-amber-200 to-transparent', size: 'w-1.5 h-1.5' }
  ];

  // Mouse hover tilt effect handler with perspective calculations
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Position of the cursor relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Calculate rotation angles (max tilt 10 degrees for modern restraint)
    const rotateX = -(mouseY / (height / 2)) * 10;
    const rotateY = (mouseX / (width / 2)) * 10;

    // Calculate interactive inner glow coordinates (percentage-based)
    const glowX = ((e.clientX - rect.left) / width) * 100;
    const glowY = ((e.clientY - rect.top) / height) * 100;

    setCoords({ rotateX, rotateY, scale: 1.02, glowX, glowY });
  };

  const handleMouseLeave = () => {
    setCoords({ rotateX: 0, rotateY: 0, scale: 1, glowX: 50, glowY: 50 });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-cyber-grid bg-[#09090b]">
      {/* Absolute background visualizers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft, warm, luxurious bronze/gold spotlights */}
        <div className="absolute top-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-amber-500/5 blur-[150px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-[35%] left-[-15%] w-[50vw] h-[50vw] rounded-full bg-zinc-400/5 blur-[130px] animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute bottom-[-10%] right-[20%] w-[45vw] h-[45vw] rounded-full bg-amber-600/5 blur-[140px] animate-pulse" style={{ animationDuration: '7s' }}></div>
        
        {/* Floating background orbs */}
        <div className="absolute top-[25%] left-[65%] w-72 h-72 rounded-full bg-amber-500/[0.02] blur-[80px] animate-bounce" style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-[60%] left-[30%] w-80 h-80 rounded-full bg-neutral-500/[0.02] blur-[90px] animate-bounce" style={{ animationDuration: '16s' }}></div>

        {/* Delicate golden sparkles */}
        {starsArray.map((star, i) => (
          <div 
            key={i} 
            className={`absolute rounded-full bg-gradient-to-r ${star.color} ${star.size} opacity-40`} 
            style={{ top: star.top, left: star.left, animationDelay: `${i * 0.4}s` }}
          />
        ))}

        <div className="absolute inset-0 bg-dot-grid opacity-15"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Side Content - Staggered reveals */}
        <div className="md:col-span-7 flex flex-col items-start text-left">
          
          {/* Curated status badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-zinc-950/60 backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-200 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-200"></span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#c5a880] font-sans">
              Dedicated Administrative Specialist
            </span>
          </motion.div>

          {/* Glitching Title Heading replaced with elegant human headline styling */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-semibold leading-[1.1] tracking-tight mb-6 text-white max-w-2xl">
              Muhammad <br />
              <span className="text-gradient-gold italic font-normal tracking-wide">Faiz Dzahin</span>
            </h1>
          </motion.div>

          {/* Role subtitle & Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-sans font-medium text-[#c5a880] uppercase tracking-wider mb-6">
              <span>Data Entry Specialist</span>
              <span className="text-white/15">•</span>
              <span>Systems Administration</span>
              <span className="text-white/15">•</span>
              <span className="text-[#f4f4f5]">Full-Stack Developer</span>
            </div>

            <p className="text-neutral-400 font-sans font-light text-sm sm:text-base md:text-md max-w-xl mb-10 leading-relaxed">
              Spesialis pengolahan data serta administrator sistem organisasi yang mengutamakan akurasi data, integritas informasi, dan efisiensi manajemen administratif tingkat tinggi.
            </p>
          </motion.div>

          {/* Actions CTA with custom glowing animation states */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 w-full"
          >
            <a 
              href="#experience" 
              className="group flex items-center justify-center gap-2.5 bg-neutral-100 hover:bg-[#c5a880] text-zinc-950 px-7 py-3.5 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto cursor-pointer"
            >
              Lihat Pengalaman
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            <a 
              href="#contact" 
              className="flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white px-7 py-3.5 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto"
            >
              <Send size={12} />
              Hubungi Saya
            </a>
          </motion.div>
        </div>

        {/* Right Side - Interactive 3D Card with Tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="md:col-span-5 flex items-center justify-center relative select-none cursor-pointer"
        >
          {/* Subtle golden halo behind portrait */}
          <div 
            className="absolute -inset-10 rounded-full bg-amber-500/[0.03] blur-3xl"
          ></div>

          {/* Perspective Interactive Frame Container */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[340px] h-[450px] rounded-3xl bg-gradient-to-b from-zinc-900 via-neutral-950 to-neutral-950 border border-white/15 p-4 shadow-[0_30px_70px_rgba(0,0,0,0.85)] overflow-hidden transition-all duration-300 ease-out"
            style={{
              transform: `perspective(1000px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) scale(${coords.scale})`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Soft gold light flare */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-40 mix-blend-color-dodge transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle 200px at ${coords.glowX}% ${coords.glowY}%, rgba(197, 168, 128, 0.12), transparent 80%)`
              }}
            />

            {/* Inner Gold-Satin Card border frame */}
            <div className="w-full h-full rounded-2xl overflow-hidden relative border border-white/5" style={{ transform: 'translateZ(10px)' }}>
              
              {/* Photo component */}
              <img 
                src="/Foto.jpg" 
                alt="Muhammad Faiz Dzahin Portrait" 
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              
              {/* Bottom gradient mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
