import { motion } from 'motion/react';
import { Sparkles, ExternalLink } from 'lucide-react';

export default function Contact() {
  const contactCards = [
    {
      label: "SURAT ELEKTRONIK / GOOGLE",
      value: "muhammadfaizdzahin11@gmail.com",
      href: "mailto:muhammadfaizdzahin11@gmail.com",
      brand: "Google Workspace Mail",
      colorClass: "text-[#ea4335]",
      accentColor: "bg-[#ea4335]",
      accentBg: "group-hover:bg-white/[0.01] group-hover:border-white/20",
      glowColor: "rgba(255, 255, 255, 0.04)",
      icon: (
        <motion.svg
          variants={{
            hover: { scale: 1.15, rotate: [0, -4, 4, 0], transition: { duration: 0.5 } }
          }}
          className="w-5 h-5 text-neutral-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <motion.path 
            variants={{
              hover: { 
                d: [
                  "M22 4l-10 7.5L2 4",
                  "M22 4l-10 9.5L2 4",
                  "M22 4l-10 7.5L2 4"
                ],
                stroke: "#c5a880",
                transition: { duration: 1.0, repeat: Infinity, ease: "easeInOut" }
              }
            }}
            d="M22 4l-10 7.5L2 4" 
          />
        </motion.svg>
      )
    },
    {
      label: "WHATSAPP MESSENGER",
      value: "087792811601",
      href: "https://wa.me/6287792811601",
      brand: "WhatsApp Fast Chat",
      colorClass: "text-[#25d366]",
      accentColor: "bg-[#25d366]",
      accentBg: "group-hover:bg-white/[0.01] group-hover:border-white/20",
      glowColor: "rgba(255, 255, 255, 0.04)",
      icon: (
        <motion.svg
          variants={{
            hover: { 
              scale: 1.15, 
              rotate: [0, -8, 8, -8, 8, 0],
              transition: { duration: 0.6 }
            }
          }}
          style={{ transformOrigin: "center" }}
          className="w-5 h-5 fill-current text-neutral-300"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.707 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </motion.svg>
      )
    },
    {
      label: "KODE SUMBER / GITHUB",
      value: "zeynnn1925-sys",
      href: "https://github.com/zeynnn1925-sys",
      brand: "GitHub Profile & Projects",
      colorClass: "text-[#f0f6fc]",
      accentColor: "bg-white",
      accentBg: "group-hover:bg-white/[0.01] group-hover:border-white/20",
      glowColor: "rgba(255, 255, 255, 0.04)",
      icon: (
        <motion.svg
          variants={{
            hover: { 
              scale: 1.15, 
              rotate: [0, -6, 6, 0],
              transition: { duration: 0.5 }
            }
          }}
          style={{ transformOrigin: "center" }}
          className="w-5 h-5 fill-current text-neutral-300"
          viewBox="0 0 24 24"
        >
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </motion.svg>
      )
    },
    {
      label: "KONEKSI / LINKEDIN",
      value: "Muhammad Faiz Dzahin",
      href: "https://www.linkedin.com/in/kamenrider-eezz-993360405/",
      brand: "LinkedIn Professional",
      colorClass: "text-[#0a66c2]",
      accentColor: "bg-[#0a66c2]",
      accentBg: "group-hover:bg-white/[0.01] group-hover:border-white/20",
      glowColor: "rgba(255, 255, 255, 0.04)",
      icon: (
        <motion.svg
          variants={{
            hover: { 
              scale: 1.15, 
              rotate: [0, 4, -4, 0],
              transition: { duration: 0.5 }
            }
          }}
          style={{ transformOrigin: "center" }}
          className="w-5 h-5 fill-current text-neutral-300"
          viewBox="0 0 24 24"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </motion.svg>
      )
    }
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative bg-cyber-grid bg-[#09090b] overflow-hidden">
      
      {/* Background radial soft gradient glowing behind this section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-amber-500/[0.015] blur-[150px]"></div>
        <div className="absolute inset-0 bg-dot-grid opacity-15"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* 2-Column Responsive Contact Layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Headline and description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-[#c5a880] font-mono block mb-3"># Get In Touch</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold text-white tracking-tight mb-6">
              Mari <span className="text-gradient-gold italic font-normal">Terhubung</span>
            </h2>
            <div className="h-[1px] w-20 bg-gradient-to-r from-[#c5a880] via-[#eedec9] to-transparent mb-8"></div>
            
            <p className="text-neutral-400 font-sans font-light text-base leading-relaxed mb-10 max-w-lg">
              Faiz selalu antusias membahas ide baru, operasional administrasi cerdas, entri data yang presisi, atau peluang kolaborasi profesional. Gunakan detail di samping untuk berkoordinasi langsung.
            </p>
          </motion.div>

          {/* Right Column: 4 Branded Contact Cards */}
          <div className="space-y-4">
            {contactCards.map((card, idx) => {
              return (
                <motion.a
                  key={idx}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover="hover"
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`p-5 rounded-2xl bg-zinc-950/60 border border-white/5 hover:border-white/10 block relative overflow-hidden transition-all duration-500 ease-out hover:pl-7 group ${card.accentBg}`}
                >
                  {/* Inside items */}
                  <div className="flex items-center justify-between gap-5 relative z-10 w-full">
                    <div className="flex items-center gap-4 min-w-0">
                      
                      {/* Brand icon wrapper with continuous float */}
                      <motion.div 
                        animate={{
                          y: [0, -3, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: idx * 0.35
                        }}
                        className="w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white shrink-0 duration-300"
                      >
                        {card.icon}
                      </motion.div>

                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] text-neutral-500 font-mono font-bold uppercase tracking-widest block mb-1">
                          {card.label}
                        </span>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-2">
                          <span className="text-sm font-sans font-medium text-white tracking-wide truncate block">
                            {card.value}
                          </span>
                          <span className="text-[9px] font-mono text-neutral-500 font-medium whitespace-nowrap">
                            • {card.brand}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-neutral-500 group-hover:text-white transition-colors">
                      <ExternalLink size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" />
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
