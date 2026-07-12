import { motion } from 'motion/react';
import { ExternalLink, Mail, Phone, Github, Linkedin } from 'lucide-react';

export default function Contact() {
  const contactCards = [
    {
      label: "SURAT ELEKTRONIK / GOOGLE",
      value: "muhammadfaizdzahin11@gmail.com",
      href: "mailto:muhammadfaizdzahin11@gmail.com",
      brand: "Google Workspace Mail",
      imageUrl: "/Google.png",
      icon: <Mail size={16} className="text-blue-600" />
    },
    {
      label: "WHATSAPP MESSENGER",
      value: "087792811601",
      href: "https://wa.me/6287792811601",
      brand: "WhatsApp Fast Chat",
      imageUrl: "/WhatsApp.png",
      icon: <Phone size={16} className="text-emerald-600" />
    },
    {
      label: "KODE SUMBER / GITHUB",
      value: "zeynnn1925-sys",
      href: "https://github.com/zeynnn1925-sys",
      brand: "GitHub Profile & Projects",
      imageUrl: "/Github.png",
      icon: <Github size={16} className="text-ink-navy" />
    },
    {
      label: "KONEKSI / LINKEDIN",
      value: "Muhammad Faiz Dzahin",
      href: "https://www.linkedin.com/in/kamenrider-eezz-993360405/",
      brand: "LinkedIn Professional",
      imageUrl: "/Linkedin.png",
      icon: <Linkedin size={16} className="text-blue-800" />
    }
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative bg-bone-light overflow-hidden">
      
      {/* Background radial soft gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-amber-clay/5 blur-[150px]" />
        <div className="absolute inset-0 bg-paper-grid opacity-75" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* 2-Column Responsive Contact Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline and description */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="space-y-6"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-deep-teal font-mono block">GET IN TOUCH</span>
            <h2 className="text-3xl sm:text-5xl font-display font-medium text-ink-navy tracking-tight">
              Mari <span className="text-amber-clay-dark italic font-semibold">Terhubung</span>
            </h2>
            <div className="h-[3px] w-16 bg-amber-clay rounded-full"></div>
            
            <p className="text-ink-soft font-sans font-medium text-sm sm:text-base leading-relaxed max-w-lg">
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
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover="hover"
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.1 + idx * 0.08 }}
                  className="p-4 sm:p-5 rounded-[22px] bg-cream border border-white block relative overflow-hidden shadow-clay-raised hover:shadow-clay-raised-hover hover:-translate-y-0.5 active:scale-99 transition-all duration-300 group"
                >
                  {/* Inside items */}
                  <div className="flex items-center justify-between gap-4 relative z-10 w-full">
                    <div className="flex items-center gap-3.5 min-w-0">
                      
                      {/* Brand icon wrapper with continuous float */}
                      <motion.div 
                        animate={{
                          y: [0, -2, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: idx * 0.35
                        }}
                        className="w-14 h-14 rounded-[16px] bg-[#F3EFE7] border border-white flex items-center justify-center text-ink-navy shadow-clay-subtle shrink-0"
                      >
                        {card.imageUrl ? (
                          <img 
                            src={card.imageUrl} 
                            alt={card.label} 
                            className="w-9 h-9 object-contain"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          card.icon
                        )}
                      </motion.div>

                      <div className="flex flex-col min-w-0">
                        <span className="text-[8px] text-ink-soft font-mono font-bold uppercase tracking-widest block mb-0.5">
                          {card.label}
                        </span>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-2">
                          <span className="text-xs sm:text-sm font-sans font-bold text-ink-navy truncate block">
                            {card.value}
                          </span>
                          <span className="text-[8.5px] font-mono text-ink-soft font-semibold whitespace-nowrap hidden sm:inline">
                            • {card.brand}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-ink-soft group-hover:text-amber-clay-dark transition-colors">
                      <ExternalLink size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300 stroke-[2.5]" />
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
