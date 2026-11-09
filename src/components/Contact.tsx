import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Mail, Phone, Github, Linkedin, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { headerVariants, cardVariants, staggerContainer, scrollViewport, smoothEase } from '../lib/animations';

export default function Contact() {
  const [memoName, setMemoName] = useState('');
  const [memoSubject, setMemoSubject] = useState('');
  const [memoBody, setMemoBody] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const contactCards = [
    {
      label: "SURAT ELEKTRONIK",
      value: "muhammadfaizdzahin11@gmail.com",
      href: "mailto:muhammadfaizdzahin11@gmail.com",
      brand: "Google Mail",
      imageUrl: "/Google.png",
      icon: <Mail size={16} className="text-blue-600" />
    },
    {
      label: "WHATSAPP MESSENGER",
      value: "0877-9281-1601",
      href: "https://wa.me/6287792811601",
      brand: "Respons Cepat",
      imageUrl: "/WhatsApp.png",
      icon: <Phone size={16} className="text-emerald-600" />
    },
    {
      label: "KODE SUMBER & REPO",
      value: "zeynnn1925-sys",
      href: "https://github.com/zeynnn1925-sys",
      brand: "GitHub Profile",
      imageUrl: "/Github.png",
      icon: <Github size={16} className="text-ink-navy" />
    },
    {
      label: "JEJARING PROFESIONAL",
      value: "Muhammad Faiz Dzahin",
      href: "https://www.linkedin.com/in/kamenrider-eezz-993360405/",
      brand: "LinkedIn Network",
      imageUrl: "/Linkedin.png",
      icon: <Linkedin size={16} className="text-blue-800" />
    }
  ];

  const handleSendViaEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(memoSubject || 'Halo Faiz — Kolaborasi & Proyek');
    const body = encodeURIComponent(
      `Halo Faiz,\n\nSaya ${memoName || 'Rekan'}.\n\n${memoBody}\n\nSalam hormat,\n${memoName}`
    );
    window.location.href = `mailto:muhammadfaizdzahin11@gmail.com?subject=${subject}&body=${body}`;
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 4000);
  };

  const handleSendViaWA = () => {
    const text = encodeURIComponent(
      `Halo Faiz, saya *${memoName || 'Rekan'}*.\nPerihal: *${memoSubject || 'Tanya Sistem / Kolaborasi'}*\n\n"${memoBody}"`
    );
    window.open(`https://wa.me/6287792811601?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative bg-bone-light overflow-hidden">
      
      {/* Background radial soft gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-amber-clay/5 blur-[150px]" />
        <div className="absolute inset-0 bg-paper-grid opacity-75" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-deep-teal font-mono block mb-2">
            KOMUNIKASI LANGSUNG
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-medium text-ink-navy tracking-tight">
            Mari <span className="text-amber-clay-dark italic font-semibold">Terhubung</span> & Berdiskusi
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={scrollViewport}
            transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
            className="h-[3px] w-16 bg-amber-clay rounded-full mt-3 origin-left"
          />
          <p className="text-ink-soft font-sans font-medium text-sm sm:text-base leading-relaxed max-w-xl mt-4">
            Apakah Anda memerlukan aplikasi kasir POS, sistem internal kantor yang terstruktur, digitalisasi arsip, atau kolaborasi pengembangan web modern? Pintu diskusi selalu terbuka.
          </p>
        </motion.div>

        {/* 2-Column Responsive Contact Layout: Cards & Sticky Note Memo */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: 4 Branded Contact Cards (5 cols) */}
          <motion.div 
            variants={staggerContainer(0.08, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            className="lg:col-span-5 space-y-4"
          >
            <div className="text-[10px] font-mono uppercase tracking-wider text-ink-soft font-bold mb-2">
              Saluran Resmi & Media Sosial
            </div>
            {contactCards.map((card, idx) => {
              return (
                <motion.a
                  key={idx}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={cardVariants}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="p-4 sm:p-5 rounded-[22px] bg-cream border border-white block relative overflow-hidden shadow-clay-raised hover:shadow-clay-raised-hover active:scale-99 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between gap-4 relative z-10 w-full">
                    <div className="flex items-center gap-3.5 min-w-0">
                      
                      <div className="w-13 h-13 rounded-[16px] bg-[#F3EFE7] border border-white flex items-center justify-center text-ink-navy shadow-clay-subtle shrink-0">
                        {card.imageUrl ? (
                          <img 
                            src={card.imageUrl} 
                            alt={card.label} 
                            className="w-8 h-8 object-contain"
                            referrerPolicy="no-referrer" 
                          />
                        ) : (
                          card.icon
                        )}
                      </div>

                      <div className="flex flex-col min-w-0">
                        <span className="text-[8px] text-ink-soft font-mono font-bold uppercase tracking-widest block mb-0.5">
                          {card.label}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-xs sm:text-sm font-sans font-bold text-ink-navy truncate block">
                            {card.value}
                          </span>
                          <span className="text-[9px] font-mono text-ink-soft font-semibold">
                            {card.brand}
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

            {/* Quick Status Pill */}
            <div className="p-4 rounded-[20px] bg-bone-dark/30 border border-black/5 shadow-clay-inset flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div className="text-xs text-ink-navy font-sans">
                <span className="font-bold">Status Ketersediaan:</span> Terbuka untuk proyek web freelance, konsultasi sistem, atau kontrak remote.
              </div>
            </div>
          </motion.div>

          {/* Right Column: "Kirim Memo ke Meja Zeynn" (7 cols) */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            className="lg:col-span-7 relative"
          >
            {/* Sticky note tape decoration */}
            <div className="absolute -top-3 left-12 w-28 h-6 bg-amber-clay/30 border border-white/40 shadow-sm rotate-[-2deg] z-20 pointer-events-none rounded-sm backdrop-blur-xs" />

            <div className="rounded-[26px] bg-[#FFFBEA] border-2 border-[#F0E6B8] p-6 sm:p-8 shadow-clay-raised relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DC9E] mb-5">
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-clay-dark block">
                    MEMORANDUM KANTOR DUA DUNIA
                  </span>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-ink-navy tracking-tight">
                    Tinggalkan Catatan di Meja Kerja
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-clay/15 text-amber-clay-dark text-[10px] font-mono font-bold">
                  <Sparkles size={11} />
                  <span>Draf Langsung</span>
                </div>
              </div>

              <form onSubmit={handleSendViaEmail} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider font-bold text-ink-navy mb-1.5">
                      Nama / Instansi Anda
                    </label>
                    <input 
                      type="text" 
                      required
                      value={memoName}
                      onChange={(e) => setMemoName(e.target.value)}
                      placeholder="cth. Bagus — CV Mandiri"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 border border-[#E8DC9E] text-xs font-sans text-ink-navy placeholder:text-ink-soft/60 focus:outline-none focus:border-amber-clay-dark focus:bg-white transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider font-bold text-ink-navy mb-1.5">
                      Subjek / Topik Kebutuhan
                    </label>
                    <input 
                      type="text" 
                      required
                      value={memoSubject}
                      onChange={(e) => setMemoSubject(e.target.value)}
                      placeholder="cth. Pembuatan Aplikasi Kasir POS"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 border border-[#E8DC9E] text-xs font-sans text-ink-navy placeholder:text-ink-soft/60 focus:outline-none focus:border-amber-clay-dark focus:bg-white transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider font-bold text-ink-navy mb-1.5">
                    Isi Pesan / Rincian Singkat
                  </label>
                  <textarea 
                    rows={4}
                    required
                    value={memoBody}
                    onChange={(e) => setMemoBody(e.target.value)}
                    placeholder="Ceritakan gambaran sistem yang ingin dibangun, tenggat waktu, atau pertanyaan apapun..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 border border-[#E8DC9E] text-xs font-sans text-ink-navy placeholder:text-ink-soft/60 focus:outline-none focus:border-amber-clay-dark focus:bg-white transition-all shadow-inner resize-none font-mono"
                  />
                </div>

                {sentSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-sans font-medium flex items-center gap-2"
                  >
                    <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
                    <span>Memo terbuka di aplikasi email Anda! Siap dikirim ke kotak masuk Faiz.</span>
                  </motion.div>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-deep-teal hover:bg-deep-teal-light text-cream font-sans font-bold text-xs flex items-center justify-center gap-2 shadow-clay-btn hover:shadow-clay-inset active:scale-98 transition-all cursor-pointer"
                  >
                    <Send size={13} />
                    <span>Kirim via Email (Resmi)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendViaWA}
                    disabled={!memoBody.trim()}
                    className="w-full sm:w-auto py-3 px-4 rounded-xl bg-cream border border-[#E8DC9E] hover:border-amber-clay-dark text-ink-navy font-sans font-bold text-xs flex items-center justify-center gap-2 shadow-clay-subtle hover:shadow-clay-inset active:scale-98 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Phone size={13} className="text-emerald-600" />
                    <span>Kirim via WhatsApp</span>
                  </button>
                </div>

                <p className="text-[10px] text-ink-soft font-mono text-center pt-1">
                  * Memo ini diteruskan langsung ke kanal pribadi tanpa perantara bot.
                </p>
              </form>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

