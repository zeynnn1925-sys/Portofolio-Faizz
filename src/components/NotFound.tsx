import { motion } from 'motion/react';
import { ArrowLeft, FolderX } from 'lucide-react';

interface NotFoundProps {
  onBackToHome?: () => void;
}

export default function NotFound({ onBackToHome }: NotFoundProps) {
  const handleGoHome = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-paper-grid bg-bone-light relative overflow-hidden select-text">
      
      {/* Decorative Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-amber-clay/5 blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-deep-teal/5 blur-[100px]" />
      </div>

      {/* Main Administrative Dossier Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="clay-card-raised p-8 sm:p-12 max-w-md w-full relative border border-white bg-cream text-center z-10 space-y-6 overflow-hidden"
      >
        {/* Index card top ruling accent line (binder style) */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-deep-teal" />
        
        {/* Binder Holes Visual representation for administrative card */}
        <div className="absolute top-4 inset-x-0 flex justify-center gap-12 opacity-25">
          <div className="w-3.5 h-3.5 rounded-full bg-ink-navy shadow-inner" />
          <div className="w-3.5 h-3.5 rounded-full bg-ink-navy shadow-inner" />
          <div className="w-3.5 h-3.5 rounded-full bg-ink-navy shadow-inner" />
        </div>

        {/* Chip tag "REC-404" */}
        <div className="pt-2">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-flex items-center gap-1.5 py-1 px-3 rounded-xl bg-bone-dark/50 border border-black/5 shadow-clay-inset text-[10px] font-mono text-ink-navy uppercase tracking-wider font-bold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-clay animate-pulse" />
            REC-404
          </motion.div>
        </div>

        {/* Dynamic Icon */}
        <div className="py-2">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-20 h-20 mx-auto rounded-full bg-bone-dark/30 border border-black/5 shadow-clay-inset flex items-center justify-center text-deep-teal relative"
          >
            <FolderX size={36} className="stroke-[1.5]" />
          </motion.div>
        </div>

        {/* Content Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-display font-medium text-ink-navy tracking-tight leading-tight">
            Record Tidak Ditemukan
          </h1>
          <p className="text-ink-soft font-sans font-medium text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
            Halaman yang Anda cari sepertinya sudah dipindahkan atau belum diarsipkan dalam sistem repositori portofolio kami.
          </p>
        </div>

        {/* Bottom divider line */}
        <div className="h-px bg-black/5 w-full my-2" />

        {/* CTA Button */}
        <div className="pt-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoHome}
            className="clay-button-primary uppercase tracking-wider text-[10px] inline-flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={13} className="stroke-[2.5]" />
            kembali ke beranda
          </motion.button>
        </div>
      </motion.div>

      {/* Subtle Archive System Footer Mark */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.8 }}
        className="mt-8 font-mono text-[9px] uppercase tracking-widest text-ink-soft z-10"
      >
        Sistem Dokumentasi Digital • Muhammad Faiz Dzahin
      </motion.p>
    </div>
  );
}
