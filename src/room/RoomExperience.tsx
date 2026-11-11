import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, Moon, Volume2, VolumeX, Sparkles, RefreshCw, 
  ExternalLink, ChevronRight, Layers, BookOpen, Monitor, 
  FolderArchive, Phone, User, Compass, Info, Maximize2, Minimize2,
  Terminal, Code2, Send, X, FileText, Download, Award, Shield, CheckCircle2,
  Calendar, Clock, ShieldCheck, Database, Mail, Move, Cpu, Check, FileCheck, TerminalSquare
} from 'lucide-react';
import { RoomCanvas } from './RoomCanvas';
import { HOTSPOTS } from '../data/room';
import { ROOM_COPY } from '../data/copy';
import { SKILL_BOOKS, type SkillBook } from '../data/skills';
import { soundSynth } from './AudioSynthesis';
import FilePreviewModal from '../components/FilePreviewModal';

export function RoomExperience() {
  const [activeHotspotId, setActiveHotspotId] = useState<string>('overview');
  const [selectedSkillBook, setSelectedSkillBook] = useState<SkillBook | null>(null);

  // Floating System Information Card for Books
  const [showSystemInfoCard, setShowSystemInfoCard] = useState<boolean>(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState<boolean>(false);
  const [isHudCollapsed, setIsHudCollapsed] = useState<boolean>(false);

  const [activeModal, setActiveModal] = useState<
    'none' | 'about' | 'projects' | 'experience' | 'skills' | 'contact'
  >('none');
  const [previewDoc, setPreviewDoc] = useState<{ url: string; title: string } | null>(null);

  // Inisialisasi otomatis sesuai waktu nyata (Malam: 18:00 - 05:59, Siang: 06:00 - 17:59)
  const [isNightMode, setIsNightMode] = useState<boolean>(() => {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6;
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [morphProgress, setMorphProgress] = useState<number>(0);
  const [isMorphing, setIsMorphing] = useState<boolean>(false);
  const [isDigital, setIsDigital] = useState<boolean>(false);

  const [monitorMode, setMonitorMode] = useState<'code' | 'terminal'>('code');
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    '➜ whoami',
    'Muhammad Faiz Dzahin (Zeynn)',
    '➜ role',
    'Web Developer & Pembangun Sistem',
    '➜ projects --featured',
    '* LifeFlow System (Productivity & Wealth AI)',
    '* OPMAZ Admin Hub (200+ Arsip Digital)',
    '➜ type "help" to list available commands',
  ]);

  const [memoName, setMemoName] = useState('');
  const [memoSubject, setMemoSubject] = useState('');
  const [memoBody, setMemoBody] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const [lowPowerMode, setLowPowerMode] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  const [introStep, setIntroStep] = useState<'dark' | 'lights_on' | 'ready'>('dark');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);

      try {
        const testCanvas = document.createElement('canvas');
        const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
        if (!gl) {
          setWebglSupported(false);
        } else {
          const cores = navigator.hardwareConcurrency || 4;
          if (cores <= 2) {
            setLowPowerMode(true);
          }
        }
      } catch {
        setWebglSupported(false);
      }
    }
  }, []);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIntroStep('lights_on');
    }, 1000);

    const timer2 = setTimeout(() => {
      setIntroStep('ready');
    }, 1800);

    const timer3 = setTimeout(() => {
      handleTriggerMorph(true);
    }, 3600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'l' || e.key === 'L') {
        handleToggleLights();
      }
      if (e.key === 'Escape') {
        if (showSystemInfoCard) {
          setShowSystemInfoCard(false);
        } else if (activeModal !== 'none') {
          setActiveModal('none');
        } else if (activeHotspotId !== 'overview') {
          handleSelectHotspot('overview');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isNightMode, activeModal, activeHotspotId, showSystemInfoCard]);

  const handleTriggerMorph = (toDigital?: boolean) => {
    const targetState = toDigital !== undefined ? toDigital : !isDigital;
    soundSynth.playMorphSound(targetState);
    setIsMorphing(true);

    const startVal = morphProgress;
    const endVal = targetState ? 1 : 0;
    const startTime = performance.now();
    const duration = 1200;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      const current = startVal + (endVal - startVal) * eased;
      setMorphProgress(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setMorphProgress(endVal);
        setIsDigital(targetState);
        setIsMorphing(false);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleToggleLights = () => {
    soundSynth.playSwitchClick();
    setIsNightMode((prev) => !prev);
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundSynth.soundEnabled = next;
    if (next) soundSynth.playSwitchClick();
  };

  const handleSelectHotspot = (id: string) => {
    setActiveHotspotId(id);
    if (id !== 'rak_buku') {
      setSelectedSkillBook(null);
      setShowSystemInfoCard(false);
    }

    if (id === 'buku_laptop') {
      soundSynth.playPaperRustle();
    } else if (id === 'sertifikat') {
      soundSynth.playTypewriterKey();
    } else if (id === 'kucing') {
      soundSynth.playCatMeow();
    } else if (id === 'saklar') {
      soundSynth.playSwitchClick();
    }
  };

  // Called when user clicks an individual book on the 3D bookshelf
  const handleSelectSkillBook = (book: SkillBook) => {
    setSelectedSkillBook(book);
    setActiveHotspotId('rak_buku');
    setShowSystemInfoCard(true);
    soundSynth.playPaperRustle();
  };

  const handleExecuteTerminalCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    soundSynth.playTypewriterKey();
    const commandLower = trimmed.toLowerCase();
    const newHistory = [...terminalHistory, `➜ ${trimmed}`];

    if (commandLower === 'help') {
      newHistory.push(
        '! Perintah: whoami, skills, projects, morph, lampu, cat, clear, contact'
      );
    } else if (commandLower === 'whoami') {
      newHistory.push('Muhammad Faiz Dzahin (Zeynn) - Web Developer & Pembangun Sistem');
    } else if (commandLower === 'skills') {
      newHistory.push('TypeScript, React 19, Python, Java, SQL, Tailwind, Three.js, Excel, Mail Merge');
      setActiveModal('skills');
    } else if (commandLower === 'projects') {
      newHistory.push('1. LifeFlow System (AI Wealth & Habits)');
      newHistory.push('2. OPMAZ Admin Hub (200+ Arsip Digital)');
      newHistory.push('3. Dynamic Notula & Mail Sync');
      setActiveModal('projects');
    } else if (commandLower === 'morph') {
      newHistory.push('! Menjalankan morph transformasi analog -> digital...');
      handleTriggerMorph();
    } else if (commandLower === 'lampu') {
      newHistory.push('! Mengubah pencahayaan ruangan...');
      handleToggleLights();
    } else if (commandLower === 'cat') {
      newHistory.push('Meow! 🐱 Kucing di karpet melompat santai.');
      soundSynth.playCatMeow();
    } else if (commandLower === 'clear') {
      setTerminalHistory(['➜ terminal cleared. Type "help" for commands.']);
      setTerminalInput('');
      return;
    } else if (commandLower === 'contact') {
      newHistory.push('Membuka formulir memo kontak...');
      setActiveModal('contact');
    } else {
      newHistory.push(`zsh: command not found: ${trimmed}. Ketik "help" untuk opsi.`);
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

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

  const activeCopy = ROOM_COPY[activeHotspotId] || ROOM_COPY.overview;

  const navItems = [
    { id: 'overview', label: 'Seluruh Kamar', icon: Compass, modalKey: 'none' },
    { id: 'poster', label: 'Tentang Saya', icon: User, modalKey: 'about' },
    { id: 'jendela', label: 'Jendela (Perumahan Asri)', icon: Sun, modalKey: 'none' },
    { id: 'monitor', label: 'Proyek Utama', icon: Monitor, modalKey: 'projects' },
    { id: 'lemari_server', label: 'Pengalaman & Arsip', icon: FolderArchive, modalKey: 'experience' },
    { id: 'sertifikat', label: 'Kertas Ketikan CV', icon: FileText, modalKey: 'experience' },
    { id: 'rak_buku', label: 'Pustaka Keahlian (Rak)', icon: BookOpen, modalKey: 'skills' },
    { id: 'telepon', label: 'Hubungi Saya', icon: Phone, modalKey: 'contact' },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#15121A] select-text">
      
      {/* ========================================================
          FULLSCREEN 3D ROOM CANVAS (Default Viewport)
          ======================================================== */}
      <div className="absolute inset-0 w-full h-full z-0">
        {webglSupported ? (
          <Suspense
            fallback={
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#15121A] text-center text-cream">
                <div className="w-10 h-10 border-3 border-deep-teal border-t-transparent rounded-full animate-spin mb-4" />
                <h4 className="text-lg font-display font-bold">Mempersiapkan Kamar 3D...</h4>
                <p className="text-xs text-ink-soft font-mono mt-1">Procedural PBR Textures & Geometry</p>
              </div>
            }
          >
            <RoomCanvas
              activeHotspotId={activeHotspotId}
              onSelectHotspot={handleSelectHotspot}
              selectedBook={selectedSkillBook}
              onSelectSkillBook={handleSelectSkillBook}
              morphProgress={morphProgress}
              isNightMode={isNightMode}
              onToggleLight={handleToggleLights}
              lowPowerMode={lowPowerMode}
              reducedMotion={reducedMotion}
              terminalInput={terminalInput}
              terminalHistory={terminalHistory}
              monitorMode={monitorMode}
            />
          </Suspense>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-bone-light text-center">
            <img
              src="/photos/hoodie.png"
              alt="Kamar Kerja Zeynn"
              className="w-48 h-48 object-cover rounded-2xl mb-4 shadow-clay-raised"
            />
            <h3 className="font-display font-bold text-xl text-ink-navy mb-2">Kamar Kerja Zeynn</h3>
            <p className="text-xs text-ink-soft font-sans max-w-sm mb-4 leading-relaxed">
              Peramban Anda menjalankan mode hemat daya. Anda dapat menavigasi seluruh profil melalui tombol navigasi.
            </p>
          </div>
        )}
      </div>

      {/* Intro sequence overlay */}
      <AnimatePresence>
        {introStep === 'dark' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-[#120F16] flex flex-col items-center justify-center text-center p-6 z-50 pointer-events-none"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-lg sm:text-2xl font-display text-[#E8DFD1] max-w-md italic"
            >
              "Dulu buku besar dan arsip. Sekarang kode dan sistem."
            </motion.p>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xs font-mono text-amber-clay mt-3 uppercase tracking-widest"
            >
              Menyalakan lampu kamar 3D...
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          TOP HUD BAR: Identity & Controls
          ======================================================== */}
      <header className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6 flex items-center justify-between pointer-events-none">
        
        {/* Brand identity pill */}
        <div className="pointer-events-auto bg-cream/90 backdrop-blur-md border border-white/80 rounded-2xl px-4 py-2.5 shadow-clay-raised flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl overflow-hidden border border-white bg-cream flex items-center justify-center shadow-clay-subtle shrink-0">
            <img 
              src="/FAVICON.png" 
              alt="Logo FAEEZZ" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-display font-bold text-ink-navy">
                Muhammad Faiz Dzahin
              </span>
              <span className="text-amber-clay-dark font-sans text-xs font-black">(Zeynn)</span>
            </div>
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-deep-teal block">
              Web Developer & Pembangun Sistem
            </span>
          </div>
        </div>

        {/* Quick Room Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Audio Toggle */}
          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-2xl border transition-all duration-300 shadow-clay-btn cursor-pointer ${
              soundEnabled
                ? 'bg-cream text-deep-teal border-white'
                : 'bg-bone-dark/50 text-ink-soft border-black/5'
            }`}
            title="Efek suara interaktif"
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
        </div>
      </header>

      {/* ========================================================
          SIDEBAR / DOCK: Interactive Hotspot Navigation (ULTRA-COMPACT)
          ======================================================== */}
      <aside className="absolute bottom-5 left-4 sm:left-5 z-20 pointer-events-none max-w-[195px] w-full">
        {isNavCollapsed ? (
          <button
            onClick={() => setIsNavCollapsed(false)}
            className="pointer-events-auto bg-cream/95 backdrop-blur-md border border-white rounded-xl px-2.5 py-1.5 shadow-clay-subtle flex items-center gap-1.5 text-[10px] font-mono text-ink-navy font-bold hover:bg-cream transition-all cursor-pointer"
            title="Buka Panduan Kamar"
          >
            <Compass size={12} className="text-deep-teal" />
            <span>Panduan ({navItems.length})</span>
            <span className="text-[9px] text-amber-clay-dark ml-0.5">▲</span>
          </button>
        ) : (
          <div className="pointer-events-auto bg-cream/90 backdrop-blur-md border border-white/80 rounded-[18px] shadow-clay-subtle p-2">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-ink-soft">
                PANDUAN KAMAR
              </span>
              <div className="flex items-center gap-1.5">
                {activeHotspotId !== 'overview' && (
                  <button
                    onClick={() => handleSelectHotspot('overview')}
                    className="text-[8px] font-mono font-bold text-amber-clay-dark hover:underline cursor-pointer"
                  >
                    Reset
                  </button>
                )}
                <button
                  onClick={() => setIsNavCollapsed(true)}
                  className="w-4 h-4 rounded text-ink-soft hover:text-ink-navy flex items-center justify-center cursor-pointer"
                  title="Perkecil menu"
                >
                  <Minimize2 size={10} />
                </button>
              </div>
            </div>

            <nav className="flex flex-col space-y-0.5">
              {navItems.map((item) => {
                const isActive = activeHotspotId === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleSelectHotspot(item.id);
                      if (item.modalKey !== 'none') {
                        setActiveModal(item.modalKey as any);
                      }
                    }}
                    className={`flex items-center justify-between px-2 py-1 rounded-md text-left transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'border-l-2 border-amber-clay bg-bone-dark/40 text-ink-navy font-bold shadow-clay-inset pl-1.5'
                        : 'border-l-2 border-transparent hover:bg-bone-dark/20 text-ink-soft hover:text-ink-navy font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Icon size={10} className={isActive ? 'text-amber-clay-dark shrink-0' : 'text-deep-teal shrink-0'} />
                      <span className="text-[10px] font-sans leading-none truncate">{item.label}</span>
                    </div>
                    {item.modalKey !== 'none' ? (
                      <span className="text-[7px] font-mono font-bold text-deep-teal shrink-0 ml-1">Buka ›</span>
                    ) : (
                      <span className="text-[7px] font-mono text-ink-soft shrink-0 ml-1">
                        {isActive ? '●' : '›'}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </aside>

      {/* ========================================================
          FLOATING 'SYSTEM INFORMATION' CARD ON BOOK CLICK
          ======================================================== */}
      <AnimatePresence>
        {showSystemInfoCard && selectedSkillBook && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-full max-w-md p-4 sm:p-0 pointer-events-none"
          >
            <div className="pointer-events-auto bg-cream/95 backdrop-blur-md border-2 border-white rounded-[26px] shadow-clay-raised p-6 relative overflow-hidden text-left">
              
              {/* Header with OS / System Info styling */}
              <div className="flex items-center justify-between pb-3.5 border-b border-black/5 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-deep-teal">
                    SYSTEM INFORMATION // SKILL MODULE
                  </span>
                </div>
                <button
                  onClick={() => setShowSystemInfoCard(false)}
                  className="w-7 h-7 rounded-lg bg-cream border border-white text-ink-navy hover:text-red-600 flex items-center justify-center shadow-clay-btn transition-colors cursor-pointer"
                  aria-label="Tutup info kartu"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Main Content: Logo & Details */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-bone-dark/20 border border-white/60 p-2.5 flex items-center justify-center shadow-clay-inset shrink-0">
                  <img
                    src={selectedSkillBook.techLogo}
                    alt={selectedSkillBook.name}
                    className="w-full h-full object-contain filter drop-shadow-sm"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-clay-dark block">
                    KATEGORI: {selectedSkillBook.category.toUpperCase()}
                  </span>
                  <h3 className="text-xl font-display font-bold text-ink-navy leading-tight mt-0.5">
                    {selectedSkillBook.name}
                  </h3>
                  <p className="text-xs font-sans text-deep-teal font-bold mt-0.5">
                    {selectedSkillBook.subtitle}
                  </p>
                </div>
              </div>

              {/* System Specs Box */}
              <div className="p-3.5 rounded-xl bg-bone-dark/25 border border-black/5 shadow-clay-inset space-y-2 mb-4 font-mono text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-ink-soft uppercase text-[9px]">Tingkat Penguasaan:</span>
                  <span className="font-bold text-ink-navy">{selectedSkillBook.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ink-soft uppercase text-[9px]">Indeks Kemahiran:</span>
                  <span className="font-bold text-deep-teal">{selectedSkillBook.proficiency}</span>
                </div>
                <div className="w-full bg-bone-dark/60 h-2 rounded-full overflow-hidden border border-black/5">
                  <div
                    className="h-full bg-gradient-to-r from-deep-teal to-amber-clay rounded-full"
                    style={{ width: selectedSkillBook.proficiency }}
                  />
                </div>
              </div>

              {/* Description Body */}
              <div className="text-xs text-ink-soft font-sans font-medium leading-relaxed mb-5">
                <p>{selectedSkillBook.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-black/5">
                {selectedSkillBook.proofLink ? (
                  <button
                    onClick={() => {
                      setShowSystemInfoCard(false);
                      setPreviewDoc({
                        url: selectedSkillBook.proofLink!,
                        title: `Bukti Dokumen Kearsipan — ${selectedSkillBook.name}`
                      });
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-deep-teal text-white text-xs font-sans font-bold shadow-clay-btn hover:bg-deep-teal/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <FileCheck size={13} />
                    <span>Lihat Dokumen Terkait</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowSystemInfoCard(false);
                      setActiveModal('skills');
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-cream border border-white text-ink-navy hover:text-amber-clay-dark text-xs font-sans font-bold shadow-clay-btn transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen size={13} />
                    <span>Buka Matriks Seluruh Keahlian</span>
                  </button>
                )}
                <button
                  onClick={() => setShowSystemInfoCard(false)}
                  className="py-2 px-4 rounded-xl bg-amber-clay text-ink-navy text-xs font-sans font-bold border border-white shadow-clay-btn hover:bg-amber-clay/90 transition-all cursor-pointer"
                >
                  OK, Tutup
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          BOTTOM-RIGHT HUD: Hotspot Card / Quick Focus Card (ULTRA-COMPACT)
          ======================================================== */}
      <aside className="absolute bottom-5 right-4 sm:right-5 z-20 pointer-events-none max-w-[260px] w-full flex justify-end">
        {isHudCollapsed ? (
          <button
            onClick={() => setIsHudCollapsed(false)}
            className="pointer-events-auto bg-cream/95 backdrop-blur-md border border-white rounded-xl px-2.5 py-1.5 shadow-clay-subtle flex items-center gap-1.5 text-[10px] font-mono text-ink-navy font-bold hover:bg-cream transition-all cursor-pointer"
            title="Buka Info Fokus"
          >
            <Info size={12} className="text-amber-clay-dark" />
            <span className="truncate max-w-[120px]">
              {selectedSkillBook ? selectedSkillBook.name : activeHotspotId}
            </span>
            <span className="text-[9px] text-amber-clay-dark ml-0.5">▲</span>
          </button>
        ) : (
          <div className="pointer-events-auto bg-cream/90 backdrop-blur-md border border-white/80 rounded-[18px] shadow-clay-subtle p-2.5 space-y-1.5 w-full">
            
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-mono font-extrabold uppercase tracking-widest text-amber-clay-dark truncate">
                {selectedSkillBook ? `BUKU: ${selectedSkillBook.category}` : '// FOKUS RUANGAN'}
              </span>
              <div className="flex items-center gap-1 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] font-mono text-ink-soft font-bold uppercase">
                  {activeHotspotId}
                </span>
                <button
                  onClick={() => setIsHudCollapsed(true)}
                  className="w-4 h-4 ml-0.5 rounded text-ink-soft hover:text-ink-navy flex items-center justify-center cursor-pointer"
                  title="Perkecil info"
                >
                  <Minimize2 size={10} />
                </button>
              </div>
            </div>

            {/* Skill Book Card Header with Logo */}
            {selectedSkillBook ? (
              <div className="flex items-center gap-2 bg-bone-dark/20 p-1.5 rounded-xl border border-black/5 shadow-clay-inset">
                <div className="w-8 h-8 rounded-lg bg-cream border border-white p-1 flex items-center justify-center shadow-clay-subtle shrink-0">
                  <img
                    src={selectedSkillBook.techLogo}
                    alt={selectedSkillBook.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-display font-bold text-ink-navy truncate leading-tight">
                    {selectedSkillBook.name}
                  </h3>
                  <p className="text-[9px] font-sans text-deep-teal font-semibold truncate">
                    {selectedSkillBook.subtitle}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xs font-display font-bold text-ink-navy leading-tight truncate">
                  {activeCopy.title}
                </h3>
                <p className="text-[9px] font-sans text-deep-teal font-semibold mt-0.5 truncate">
                  {activeCopy.subtitle}
                </p>
              </div>
            )}

            <div className="text-[10px] text-ink-soft font-sans font-medium leading-relaxed max-h-12 overflow-y-auto pr-0.5">
              {selectedSkillBook ? (
                <p>{selectedSkillBook.description}</p>
              ) : (
                <p>{activeCopy.paragraphs[0]}</p>
              )}
            </div>

            {/* Direct Shelf Level Selector when focusing bookshelf */}
            {activeHotspotId === 'rak_buku' && (
              <div className="grid grid-cols-2 gap-1 pt-1 border-t border-black/5">
                <button
                  onClick={() => handleSelectSkillBook(SKILL_BOOKS[0])}
                  className={`py-1 px-1.5 rounded-md text-[8px] font-mono font-bold transition-all cursor-pointer text-left truncate ${
                    selectedSkillBook?.category === 'Bahasa Pemrograman Utama'
                      ? 'bg-amber-clay text-ink-navy border border-white shadow-clay-subtle'
                      : 'bg-bone-dark/30 text-ink-soft hover:bg-bone-dark/50'
                  }`}
                  title="Fokus ke Rak 1 (Atas) - Bahasa Pemrograman"
                >
                  ▲ Rak 1: Bahasa
                </button>
                <button
                  onClick={() => handleSelectSkillBook(SKILL_BOOKS[8])}
                  className={`py-1 px-1.5 rounded-md text-[8px] font-mono font-bold transition-all cursor-pointer text-left truncate ${
                    selectedSkillBook?.category === 'Frontend Framework & Tools'
                      ? 'bg-amber-clay text-ink-navy border border-white shadow-clay-subtle'
                      : 'bg-bone-dark/30 text-ink-soft hover:bg-bone-dark/50'
                  }`}
                  title="Fokus ke Rak 2 - Frontend"
                >
                  ■ Rak 2: Frontend
                </button>
                <button
                  onClick={() => handleSelectSkillBook(SKILL_BOOKS[14])}
                  className={`py-1 px-1.5 rounded-md text-[8px] font-mono font-bold transition-all cursor-pointer text-left truncate ${
                    selectedSkillBook?.category === 'Backend & Basis Data'
                      ? 'bg-amber-clay text-ink-navy border border-white shadow-clay-subtle'
                      : 'bg-bone-dark/30 text-ink-soft hover:bg-bone-dark/50'
                  }`}
                  title="Fokus ke Rak 3 - Backend"
                >
                  ■ Rak 3: Backend
                </button>
                <button
                  onClick={() => handleSelectSkillBook(SKILL_BOOKS[20])}
                  className={`py-1 px-1.5 rounded-md text-[8px] font-mono font-bold transition-all cursor-pointer text-left truncate ${
                    selectedSkillBook?.category === 'Administrasi & Data'
                      ? 'bg-amber-clay text-ink-navy border border-white shadow-clay-subtle'
                      : 'bg-bone-dark/30 text-ink-soft hover:bg-bone-dark/50'
                  }`}
                  title="Fokus ke Rak 4 (Bawah) - Administrasi & Data"
                >
                  ▼ Rak 4: Admin
                </button>
              </div>
            )}

            {/* Action trigger button */}
            <div className="pt-1 border-t border-black/5 flex items-center justify-between">
              {activeHotspotId === 'poster' && (
                <button
                  onClick={() => setActiveModal('about')}
                  className="w-full py-1.5 px-2 rounded-lg bg-amber-clay text-ink-navy text-[10px] font-sans font-bold border border-white shadow-clay-btn hover:bg-amber-clay/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <User size={11} />
                  <span>Buka Detail Profil & Cerita</span>
                </button>
              )}
              {activeHotspotId === 'monitor' && (
                <button
                  onClick={() => setActiveModal('projects')}
                  className="w-full py-1.5 px-2 rounded-lg bg-amber-clay text-ink-navy text-[10px] font-sans font-bold border border-white shadow-clay-btn hover:bg-amber-clay/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Monitor size={11} />
                  <span>Buka Katalog Proyek</span>
                </button>
              )}
              {activeHotspotId === 'lemari_server' && (
                <button
                  onClick={() => setActiveModal('experience')}
                  className="w-full py-1.5 px-2 rounded-lg bg-amber-clay text-ink-navy text-[10px] font-sans font-bold border border-white shadow-clay-btn hover:bg-amber-clay/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FolderArchive size={11} />
                  <span>Buka Arsip OPMAZ</span>
                </button>
              )}
              {activeHotspotId === 'sertifikat' && (
                <button
                  onClick={() => setActiveModal('experience')}
                  className="w-full py-1.5 px-2 rounded-lg bg-amber-clay text-ink-navy text-[10px] font-sans font-bold border border-white shadow-clay-btn hover:bg-amber-clay/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileText size={11} />
                  <span>Baca Lembaran CV</span>
                </button>
              )}
              {activeHotspotId === 'rak_buku' && (
                <button
                  onClick={() => {
                    if (selectedSkillBook) {
                      setShowSystemInfoCard(true);
                    } else {
                      setActiveModal('skills');
                    }
                  }}
                  className="w-full py-1.5 px-2 rounded-lg bg-amber-clay text-ink-navy text-[10px] font-sans font-bold border border-white shadow-clay-btn hover:bg-amber-clay/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Cpu size={11} />
                  <span>{selectedSkillBook ? 'System Info Card' : 'Lihat 24 Keahlian'}</span>
                </button>
              )}
              {activeHotspotId === 'telepon' && (
                <button
                  onClick={() => setActiveModal('contact')}
                  className="w-full py-1.5 px-2 rounded-lg bg-deep-teal text-white text-[10px] font-sans font-bold border border-deep-teal shadow-clay-btn hover:bg-deep-teal/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Phone size={11} />
                  <span>Hubungi Faiz</span>
                </button>
              )}
              {activeHotspotId === 'jendela' && (
                <div className="flex flex-col gap-1.5 w-full">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleLights()}
                      className="flex-1 py-1 px-2 rounded-lg bg-cream border border-white text-ink-navy text-[9px] font-sans font-bold shadow-clay-btn hover:bg-white transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      {isNightMode ? <Sun size={10} className="text-amber-500" /> : <Moon size={10} className="text-indigo-400" />}
                      <span>{isNightMode ? 'Siang' : 'Malam'}</span>
                    </button>
                    <button
                      onClick={() => handleSelectHotspot('overview')}
                      className="py-1 px-2 rounded-lg bg-amber-clay text-ink-navy text-[9px] font-sans font-bold border border-white shadow-clay-btn hover:bg-amber-clay/90 transition-all flex items-center justify-center gap-1 cursor-pointer"
                      title="Zoom Out ke Kamar"
                    >
                      <Minimize2 size={10} />
                      <span>Zoom Out</span>
                    </button>
                  </div>
                  <span className="text-[8px] text-ink-soft font-mono text-center">
                    Klik gorden di 3D untuk buka / tutup
                  </span>
                </div>
              )}
              {activeHotspotId === 'overview' && (
                <div className="flex items-center justify-between w-full">
                  <button
                    onClick={() => handleSelectHotspot('jendela')}
                    className="py-1 px-2 rounded-lg bg-cream border border-white text-ink-navy text-[9px] font-sans font-bold shadow-clay-btn hover:bg-white transition-all flex items-center gap-1 cursor-pointer"
                    title="Zoom in pemandangan luar jendela"
                  >
                    <Maximize2 size={10} className="text-deep-teal" />
                    <span>Zoom Jendela</span>
                  </button>
                  <span className="text-[8px] text-amber-clay-dark font-bold font-mono">11 Hotspot</span>
                </div>
              )}
              {activeHotspotId === 'buku_laptop' && (
                <button
                  onClick={() => handleTriggerMorph()}
                  className="w-full py-1.5 px-2 rounded-lg bg-deep-teal text-white text-[10px] font-sans font-bold border border-deep-teal shadow-clay-btn hover:bg-deep-teal/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw size={11} className={isMorphing ? 'animate-spin' : ''} />
                  <span>{isDigital ? 'Kembalikan Buku' : 'Digitalkan Laptop'}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </aside>

      {/* ========================================================
          FULL INTERACTIVE OVERLAY MODALS INSIDE 3D ROOM
          ======================================================== */}
      <AnimatePresence>
        {activeModal !== 'none' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md"
            onClick={() => setActiveModal('none')}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[90vh] bg-cream border border-white rounded-[28px] shadow-clay-raised p-6 sm:p-8 overflow-y-auto relative flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModal('none')}
                className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-cream border border-white text-ink-navy hover:text-red-600 hover:rotate-90 flex items-center justify-center shadow-clay-btn transition-all cursor-pointer z-20"
                aria-label="Tutup modal"
              >
                <X size={16} className="stroke-[2.5]" />
              </button>

              {/* MODAL 1: TENTANG SAYA */}
              {activeModal === 'about' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-deep-teal block mb-1">
                      // IDENTITAS & FILOSOFI KERJA
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-display font-medium text-ink-navy">
                      Tentang <span className="text-amber-clay-dark italic font-semibold">Muhammad Faiz Dzahin</span>
                    </h2>
                    <p className="text-xs text-ink-soft font-mono font-bold mt-1">
                      Web Developer & Pembangun Sistem • Indramayu, Jawa Barat
                    </p>
                  </div>

                  <div className="grid md:grid-cols-12 gap-6 items-start">
                    <div className="md:col-span-4 rounded-2xl bg-bone-dark/30 border border-black/5 p-4 shadow-clay-inset text-center">
                      <img
                        src="/photos/profile.png"
                        alt="Muhammad Faiz Dzahin"
                        className="w-36 h-36 mx-auto object-cover rounded-2xl border border-white shadow-clay-raised mb-3"
                      />
                      <h4 className="font-display font-bold text-base text-ink-navy">Faiz Dzahin</h4>
                      <p className="text-[11px] text-deep-teal font-mono font-semibold">@zeynnn1925-sys</p>
                      <div className="mt-3 pt-3 border-t border-black/5 text-left text-xs space-y-1 text-ink-soft font-medium">
                        <p>• MAS Ma'had Al-Zaytun (IPS)</p>
                        <p>• Eks Sekretaris OPMAZ (2024-2025)</p>
                        <p>• Fokus: Full-Stack Web & POS System</p>
                      </div>
                    </div>

                    <div className="md:col-span-8 space-y-4 text-xs sm:text-sm text-ink-soft font-sans font-medium leading-relaxed">
                      <p>
                        Saya adalah seorang <strong>Web Developer otodidak</strong> yang mengawali perjalanan dari disiplin administrasi tata usaha dan pembukuan di Ma'had Al-Zaytun.
                      </p>
                      <p>
                        Bagi saya, kerapian kode sama sakralnya dengan keakuratan angka di buku kas. Pengalaman memimpin persuratan dan notula 200+ berkas resmi membentuk ketelitian tinggi saat merancang skema basis data relasional, validasi data, serta antarmuka web modern yang bersih tanpa kompromi.
                      </p>
                      <div className="p-4 rounded-2xl bg-bone-dark/20 border border-black/5 shadow-clay-inset">
                        <h5 className="font-display font-bold text-xs text-ink-navy uppercase tracking-wider mb-2">
                          Prinsip Kerja "Kamar Dua Dunia":
                        </h5>
                        <ul className="space-y-1.5 text-xs text-ink-navy">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-clay" />
                            <span><strong>Analog:</strong> Ketelitian tata tertib, dokumentasi terperinci, arsip terpercaya.</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-deep-teal" />
                            <span><strong>Digital:</strong> Otomasi proses, arsitektur kode bersih, antarmuka cepat dan intuitif.</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* MODAL 2: PROYEK UTAMA & DOKUMEN */}
              {activeModal === 'projects' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-deep-teal block mb-1">
                      // KATALOG SOLUSI & KARYA NYATA
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-display font-medium text-ink-navy">
                      Katalog <span className="text-amber-clay-dark italic font-semibold">Proyek Pilihan</span>
                    </h2>
                    <p className="text-xs text-ink-soft font-sans font-medium mt-1">
                      Platform produktivitas cerdas, dasbor kearsipan santri, serta utilitas administrasi.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Featured: LifeFlow */}
                    <div className="p-5 rounded-2xl bg-bone-dark/20 border border-black/5 shadow-clay-inset">
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <Sparkles size={14} className="text-amber-clay-dark" />
                          <h4 className="font-display font-bold text-base text-ink-navy">LifeFlow System</h4>
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-amber-clay/20 text-amber-clay-dark">
                            PROYEK UNGGULAN
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href="https://github.com/zeynnn1925-sys/life-flow"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 rounded-lg bg-cream border border-white text-xs font-mono font-bold text-ink-navy hover:text-amber-clay-dark shadow-clay-btn flex items-center gap-1 cursor-pointer"
                          >
                            <ExternalLink size={11} /> Source
                          </a>
                          <a
                            href="https://life-flow-ashy.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 rounded-lg bg-amber-clay border border-white text-xs font-mono font-bold text-ink-navy shadow-clay-btn flex items-center gap-1 cursor-pointer"
                          >
                            <ExternalLink size={11} /> Live Demo
                          </a>
                        </div>
                      </div>
                      <p className="text-xs text-ink-soft font-sans leading-relaxed mb-3">
                        Platform produktivitas dan manajemen kekayaan pribadi all-in-one dengan AI Daily Planner, pelacak habits/streak, dan analisis pengeluaran metode 50/30/20.
                      </p>
                      <div className="flex flex-wrap gap-1.5 text-[9px] font-mono font-bold text-deep-teal">
                        <span className="px-2 py-0.5 rounded bg-cream border border-white">React 19</span>
                        <span className="px-2 py-0.5 rounded bg-cream border border-white">TypeScript</span>
                        <span className="px-2 py-0.5 rounded bg-cream border border-white">Tailwind CSS</span>
                        <span className="px-2 py-0.5 rounded bg-cream border border-white">AI Centric Engine</span>
                      </div>
                    </div>

                    {/* OPMAZ Admin Hub */}
                    <div className="p-5 rounded-2xl bg-bone-dark/20 border border-black/5 shadow-clay-inset">
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <Database size={14} className="text-deep-teal" />
                          <h4 className="font-display font-bold text-base text-ink-navy">OPMAZ Admin Panel Hub</h4>
                        </div>
                        <button
                          onClick={() => setPreviewDoc({ url: '/laporan-pekanan-osis.docx', title: 'Draf Dokumen Kearsipan OPMAZ (.docx)' })}
                          className="px-3 py-1 rounded-lg bg-deep-teal text-white text-xs font-sans font-bold shadow-clay-btn flex items-center gap-1.5 hover:bg-deep-teal/90 cursor-pointer"
                        >
                          <FileText size={12} />
                          <span>Pratinjau Dokumen (.docx)</span>
                        </button>
                      </div>
                      <p className="text-xs text-ink-soft font-sans leading-relaxed mb-3">
                        Sistem manajemen kearsipan 200+ berkas persuratan santri terpusat, memudahkan pelacakan disposisi dan pembuatan laporan rekap mingguan secara instan.
                      </p>
                    </div>

                    {/* Al-Zaytun Portal Presensi */}
                    <div className="p-5 rounded-2xl bg-bone-dark/20 border border-black/5 shadow-clay-inset">
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <Shield size={14} className="text-deep-teal" />
                          <h4 className="font-display font-bold text-base text-ink-navy">Al-Zaytun Student Portal & Presensi</h4>
                        </div>
                        <button
                          onClick={() => setPreviewDoc({ url: '/presensi-kehadiran.xlsx', title: 'Tabel Rekapitulasi Presensi Kehadiran (.xlsx)' })}
                          className="px-3 py-1 rounded-lg bg-deep-teal text-white text-xs font-sans font-bold shadow-clay-btn flex items-center gap-1.5 hover:bg-deep-teal/90 cursor-pointer"
                        >
                          <FileText size={12} />
                          <span>Pratinjau Lembar Kerja (.xlsx)</span>
                        </button>
                      </div>
                      <p className="text-xs text-ink-soft font-sans leading-relaxed mb-3">
                        Purwarupa pencatatan presensi santri asrama dengan formula otomatisasi tingkat lanjut (VLOOKUP, IF bertingkat, Data Validation).
                      </p>
                    </div>

                    {/* Mail Merge & Proposal */}
                    <div className="p-5 rounded-2xl bg-bone-dark/20 border border-black/5 shadow-clay-inset">
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <Mail size={14} className="text-deep-teal" />
                          <h4 className="font-display font-bold text-base text-ink-navy">Dynamic Notula & Mail Sync</h4>
                        </div>
                        <button
                          onClick={() => setPreviewDoc({ url: '/proposal-gema-alquran.docx', title: 'Proposal & Persuratan Resmi (.docx)' })}
                          className="px-3 py-1 rounded-lg bg-deep-teal text-white text-xs font-sans font-bold shadow-clay-btn flex items-center gap-1.5 hover:bg-deep-teal/90 cursor-pointer"
                        >
                          <FileText size={12} />
                          <span>Pratinjau Proposal (.docx)</span>
                        </button>
                      </div>
                      <p className="text-xs text-ink-soft font-sans leading-relaxed mb-3">
                        Format persuratan massal dan proposal terstandarisasi untuk agenda tahunan organisasi santri.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* MODAL 3: PENGALAMAN & ARSIP OPMAZ */}
              {activeModal === 'experience' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-deep-teal block mb-1">
                      // TATA KELOLA, PRESTASI & DOKUMEN CETAK
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-display font-medium text-ink-navy">
                      Pengalaman <span className="text-amber-clay-dark italic font-semibold">Kepemimpinan OPMAZ & CV</span>
                    </h2>
                    <p className="text-xs text-ink-soft font-mono font-bold mt-1">
                      Sekretaris Organisasi Pelajar Ma'had Al-Zaytun (2024 - 2025)
                    </p>
                  </div>

                  {/* 3 Physical Typewritten Papers View inside Modal */}
                  <div className="p-4 rounded-2xl bg-bone-dark/20 border border-black/5 shadow-clay-inset space-y-3">
                    <h4 className="font-display font-bold text-sm text-ink-navy">
                      Naskah Kertas Ketikan Mesin Tik Asli di Dinding Kamar:
                    </h4>
                    <p className="text-xs text-ink-soft leading-relaxed">
                      Sesuai dengan arsip di dinding kiri kamar 3D, berikut rincian otentik lembar ketikan CV, dokumen dinas OPMAZ, dan portofolio proyek:
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 pt-2">
                      {/* Sheet 1 */}
                      <div className="p-4 rounded-xl bg-white border border-[#E8DFD1] shadow-clay-subtle font-mono text-[11px] space-y-1.5">
                        <span className="text-[9px] font-bold text-deep-teal block">// LEMBAR 1: BIODATA & PENDIDIKAN</span>
                        <h5 className="font-bold text-ink-navy text-xs">Curriculum Vitae Resmi</h5>
                        <p className="text-ink-soft leading-relaxed">
                          Muhammad Faiz Dzahin. Pendidikan di MAS Ma'had Al-Zaytun (IPS). Terbiasa dengan etika kerja asrama berdisiplin tinggi, penataan dokumen teratur, dan logika pemrograman mandiri.
                        </p>
                      </div>

                      {/* Sheet 2 */}
                      <div className="p-4 rounded-xl bg-white border border-[#E8DFD1] shadow-clay-subtle font-mono text-[11px] space-y-1.5">
                        <span className="text-[9px] font-bold text-amber-clay-dark block">// LEMBAR 2: KEPEMIMPINAN OPMAZ</span>
                        <h5 className="font-bold text-ink-navy text-xs">Kearsipan & 100% Izin</h5>
                        <p className="text-ink-soft leading-relaxed">
                          Sekretaris OPMAZ (2024-2025). Mengelola 200+ berkas dinas kearsipan santri, 30+ agenda koordinasi rapat tahunan, dan 100% perizinan tepat waktu melalui komunikasi aktif dengan pembina.
                        </p>
                      </div>

                      {/* Sheet 3 */}
                      <div className="p-4 rounded-xl bg-white border border-[#E8DFD1] shadow-clay-subtle font-mono text-[11px] space-y-1.5">
                        <span className="text-[9px] font-bold text-deep-teal block">// LEMBAR 3: PRESTASI & PROYEK</span>
                        <h5 className="font-bold text-ink-navy text-xs">Inovasi Web & Sistem</h5>
                        <p className="text-ink-soft leading-relaxed">
                          Pembangunan LifeFlow System (AI Wealth & Habits), portal presensi santri dengan formula kompleks Excel, Mail Merge massal, dan katalog 3D Three.js.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-bone-dark/20 border border-black/5 shadow-clay-inset">
                      <div className="flex items-center gap-2 mb-2">
                        <Database size={15} className="text-deep-teal" />
                        <h4 className="font-display font-bold text-xs text-ink-navy uppercase">200+ Kearsipan</h4>
                      </div>
                      <p className="text-xs text-ink-soft font-sans leading-relaxed">
                        Mendokumentasikan, menata, dan mengarsipkan surat-menyurat resmi organisasi dengan Mail Merge massal yang presisi.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-bone-dark/20 border border-black/5 shadow-clay-inset">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={15} className="text-deep-teal" />
                        <h4 className="font-display font-bold text-xs text-ink-navy uppercase">30+ Notula Rapat</h4>
                      </div>
                      <p className="text-xs text-ink-soft font-sans leading-relaxed">
                        Mempersiapkan penjadwalan dan mencatat seluruh kesepakatan koordinasi pimpinan dalam format notula yang transparan.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-bone-dark/20 border border-black/5 shadow-clay-inset">
                      <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck size={15} className="text-deep-teal" />
                        <h4 className="font-display font-bold text-xs text-ink-navy uppercase">100% Perizinan</h4>
                      </div>
                      <p className="text-xs text-ink-soft font-sans leading-relaxed">
                        Penghubung komunikasi resmi antara jajaran santri dengan pembina lembaga dengan ketepatan waktu sempurna.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FFFDF8] border border-white shadow-clay-raised">
                    <h4 className="font-display font-bold text-sm text-ink-navy mb-2">
                      Dokumen Bukti Fisik / Portofolio Kearsipan:
                    </h4>
                    <p className="text-xs text-ink-soft mb-3">
                      Anda dapat langsung membuka dokumen arsip Word (.docx) dan Excel (.xlsx) asli yang telah diverifikasi di bawah:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setPreviewDoc({ url: '/laporan-pekanan-osis.docx', title: 'Laporan Pekanan OPMAZ (.docx)' })}
                        className="px-3.5 py-2 rounded-xl bg-bone-dark/30 hover:bg-bone-dark/50 text-ink-navy text-xs font-mono font-bold border border-black/5 shadow-clay-inset flex items-center gap-2 cursor-pointer"
                      >
                        <FileText size={13} className="text-deep-teal" />
                        <span>laporan-pekanan-osis.docx</span>
                      </button>
                      <button
                        onClick={() => setPreviewDoc({ url: '/presensi-kehadiran.xlsx', title: 'Tabel Presensi Kehadiran (.xlsx)' })}
                        className="px-3.5 py-2 rounded-xl bg-bone-dark/30 hover:bg-bone-dark/50 text-ink-navy text-xs font-mono font-bold border border-black/5 shadow-clay-inset flex items-center gap-2 cursor-pointer"
                      >
                        <FileText size={13} className="text-emerald-700" />
                        <span>presensi-kehadiran.xlsx</span>
                      </button>
                      <button
                        onClick={() => setPreviewDoc({ url: '/proposal-gema-alquran.docx', title: 'Proposal Gema Al-Quran (.docx)' })}
                        className="px-3.5 py-2 rounded-xl bg-bone-dark/30 hover:bg-bone-dark/50 text-ink-navy text-xs font-mono font-bold border border-black/5 shadow-clay-inset flex items-center gap-2 cursor-pointer"
                      >
                        <FileText size={13} className="text-deep-teal" />
                        <span>proposal-gema-alquran.docx</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* MODAL 4: PUSTAKA KEAHLIAN LENGKAP DENGAN LOGO */}
              {activeModal === 'skills' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-deep-teal block mb-1">
                      // MATRIKS 24 KEAHLIAN LENGKAP & LOGO TEKNOLOGI
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-display font-medium text-ink-navy">
                      Pustaka <span className="text-amber-clay-dark italic font-semibold">Keahlian di Rak Buku</span>
                    </h2>
                    <p className="text-xs text-ink-soft font-sans font-medium mt-1">
                      Keahlian pemrograman, framework frontend, arsitektur backend, serta administrasi data santri. Klik salah satu buku untuk menyorotnya di kamar 3D!
                    </p>
                  </div>

                  {/* 4 Categorized Sections */}
                  {['Bahasa Pemrograman Utama', 'Frontend Framework & Tools', 'Backend & Basis Data', 'Administrasi & Data'].map((cat) => {
                    const booksInCat = SKILL_BOOKS.filter((b) => b.category === cat);
                    return (
                      <div key={cat} className="space-y-3">
                        <div className="flex items-center gap-2 border-b border-black/5 pb-1">
                          <span className="w-2 h-2 rounded-full bg-amber-clay" />
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink-navy">
                            {cat} ({booksInCat.length} Keahlian)
                          </h4>
                        </div>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {booksInCat.map((book) => (
                            <div
                              key={book.id}
                              onClick={() => {
                                setSelectedSkillBook(book);
                                setActiveHotspotId('rak_buku');
                                setShowSystemInfoCard(true);
                                setActiveModal('none');
                              }}
                              className="p-3.5 rounded-2xl bg-bone-dark/20 border border-black/5 shadow-clay-inset hover:bg-bone-dark/35 transition-all cursor-pointer flex items-start gap-3 group"
                            >
                              <div className="w-10 h-10 rounded-xl bg-cream border border-white p-1.5 flex items-center justify-center shadow-clay-subtle shrink-0 group-hover:scale-105 transition-transform">
                                <img
                                  src={book.techLogo}
                                  alt={book.name}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between mb-0.5">
                                  <h5 className="font-display font-bold text-xs text-ink-navy truncate">{book.name}</h5>
                                  <span className="text-[8px] font-mono font-bold text-deep-teal">{book.proficiency}</span>
                                </div>
                                <p className="text-[10px] font-sans font-bold text-amber-clay-dark mb-1">
                                  {book.subtitle}
                                </p>
                                <p className="text-[9.5px] text-ink-soft line-clamp-2 leading-relaxed">
                                  {book.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* MODAL 5: KONTAK & MEMO */}
              {activeModal === 'contact' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-deep-teal block mb-1">
                      // KANAL RESMI & MEMORANDUM
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-display font-medium text-ink-navy">
                      Hubungi <span className="text-amber-clay-dark italic font-semibold">Faiz Dzahin</span>
                    </h2>
                    <p className="text-xs text-ink-soft font-sans font-medium mt-1">
                      Kirim memo langsung ke meja kerja atau hubungi melalui kanal media sosial resmi.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-12 gap-6 items-start">
                    {/* Direct Links */}
                    <div className="md:col-span-5 space-y-2.5">
                      <a
                        href="mailto:muhammadfaizdzahin11@gmail.com"
                        className="p-3 rounded-xl bg-bone-dark/20 border border-black/5 shadow-clay-inset flex items-center gap-3 hover:bg-bone-dark/35 transition-all block cursor-pointer"
                      >
                        <Mail size={16} className="text-deep-teal shrink-0" />
                        <div className="truncate">
                          <span className="text-[8px] font-mono font-bold uppercase text-ink-soft block">Email</span>
                          <span className="text-xs font-bold text-ink-navy truncate block">muhammadfaizdzahin11@gmail.com</span>
                        </div>
                      </a>

                      <a
                        href="https://wa.me/6287792811601"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-bone-dark/20 border border-black/5 shadow-clay-inset flex items-center gap-3 hover:bg-bone-dark/35 transition-all block cursor-pointer"
                      >
                        <Phone size={16} className="text-emerald-600 shrink-0" />
                        <div>
                          <span className="text-[8px] font-mono font-bold uppercase text-ink-soft block">WhatsApp</span>
                          <span className="text-xs font-bold text-ink-navy block">0877-9281-1601</span>
                        </div>
                      </a>

                      <a
                        href="https://github.com/zeynnn1925-sys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-bone-dark/20 border border-black/5 shadow-clay-inset flex items-center gap-3 hover:bg-bone-dark/35 transition-all block cursor-pointer"
                      >
                        <ExternalLink size={16} className="text-ink-navy shrink-0" />
                        <div>
                          <span className="text-[8px] font-mono font-bold uppercase text-ink-soft block">GitHub</span>
                          <span className="text-xs font-bold text-ink-navy block">@zeynnn1925-sys</span>
                        </div>
                      </a>
                    </div>

                    {/* Memo Form */}
                    <div className="md:col-span-7 rounded-2xl bg-[#FFFBEA] border border-[#F0E6B8] p-5 shadow-clay-raised">
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E8DC9E]">
                        <span className="text-[9px] font-mono font-bold uppercase text-amber-clay-dark">
                          MEMO LANGSUNG KE MEJA ZEYNN
                        </span>
                        <Sparkles size={12} className="text-amber-clay-dark" />
                      </div>

                      <form onSubmit={handleSendViaEmail} className="space-y-3">
                        <div className="grid sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            required
                            value={memoName}
                            onChange={(e) => setMemoName(e.target.value)}
                            placeholder="Nama / Instansi"
                            className="w-full px-3 py-2 rounded-lg bg-white/90 border border-[#E8DC9E] text-xs font-sans text-ink-navy focus:outline-none focus:border-amber-clay-dark"
                          />
                          <input
                            type="text"
                            required
                            value={memoSubject}
                            onChange={(e) => setMemoSubject(e.target.value)}
                            placeholder="Topik / Proyek"
                            className="w-full px-3 py-2 rounded-lg bg-white/90 border border-[#E8DC9E] text-xs font-sans text-ink-navy focus:outline-none focus:border-amber-clay-dark"
                          />
                        </div>

                        <textarea
                          rows={3}
                          required
                          value={memoBody}
                          onChange={(e) => setMemoBody(e.target.value)}
                          placeholder="Tuliskan pesan atau kebutuhan sistem Anda..."
                          className="w-full px-3 py-2 rounded-lg bg-white/90 border border-[#E8DC9E] text-xs font-sans text-ink-navy focus:outline-none focus:border-amber-clay-dark resize-none font-mono"
                        />

                        {sentSuccess && (
                          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-900 text-xs flex items-center gap-2">
                            <CheckCircle2 size={13} className="text-emerald-700 shrink-0" />
                            <span>Memo siap dikirimkan via email!</span>
                          </div>
                        )}

                        <div className="flex gap-2 pt-1">
                          <button
                            type="submit"
                            className="flex-1 py-2 rounded-xl bg-deep-teal hover:bg-deep-teal-light text-white text-xs font-sans font-bold flex items-center justify-center gap-1.5 shadow-clay-btn cursor-pointer"
                          >
                            <Send size={12} />
                            <span>Kirim via Email</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleSendViaWA}
                            disabled={!memoBody.trim()}
                            className="py-2 px-3 rounded-xl bg-cream border border-[#E8DC9E] text-ink-navy text-xs font-sans font-bold flex items-center justify-center gap-1.5 shadow-clay-btn cursor-pointer disabled:opacity-50"
                          >
                            <Phone size={12} className="text-emerald-600" />
                            <span>WhatsApp</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Document File Preview Modal */}
      <FilePreviewModal
        isOpen={!!previewDoc}
        onClose={() => setPreviewDoc(null)}
        fileUrl={previewDoc?.url || ''}
        title={previewDoc?.title || ''}
      />

    </div>
  );
}
