import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ExternalLink } from 'lucide-react';

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  title: string;
}

export default function FilePreviewModal({ isOpen, onClose, fileUrl, title }: FilePreviewModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Construct Google Docs Viewer URL
  const origin = window.location.origin.replace(/\/$/, '');
  const path = fileUrl.startsWith('/') ? fileUrl : `/${fileUrl}`;
  const fullUrl = origin + path;
  
  const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(fullUrl)}&embedded=true`;

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
        >
          <div
            onClick={onClose}
            className="absolute inset-0 cursor-pointer"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            className="relative w-full max-w-5xl h-[85vh] bg-cream rounded-[28px] overflow-hidden shadow-clay-raised flex flex-col z-10 border border-white p-4"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-b border-black/5 bg-bone-dark/20 rounded-t-[20px] relative">
              <div className="flex flex-col">
                <span className="text-[8px] font-mono uppercase font-black tracking-widest text-amber-clay-dark mb-1 block">// DOSSIER VIEW</span>
                <h3 className="font-display font-bold text-lg md:text-xl text-ink-navy leading-tight">{title}</h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-deep-teal animate-pulse"></span>
                  <span className="text-[9px] text-ink-soft font-mono font-bold uppercase tracking-wider">Status: Pratinjau Dokumen</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a 
                  href={fileUrl} 
                  download 
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cream border border-white shadow-clay-btn text-ink-navy hover:text-amber-clay-dark transition-all text-xs font-sans font-bold"
                  title="Download File"
                >
                  <Download size={13} />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <a 
                  href={fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cream border border-white shadow-clay-btn text-ink-navy hover:text-amber-clay-dark transition-all text-xs font-sans font-bold"
                  title="Buka di Tab Baru"
                >
                  <ExternalLink size={13} />
                  <span className="hidden sm:inline">Buka Tab</span>
                </a>
                <div className="w-[1px] h-6 bg-black/10 mx-1"></div>
                <button 
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl bg-cream border border-white shadow-clay-btn text-ink-navy hover:text-red-600 hover:rotate-90 transition-all flex items-center justify-center cursor-pointer"
                >
                  <X size={15} className="stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Content Container */}
            <div className="flex-1 bg-bone-dark/10 relative rounded-b-[20px] overflow-hidden border-t border-black/5 mt-4">
              <iframe 
                src={viewerUrl}
                className="w-full h-full border-none relative z-20 rounded-b-[20px]"
                title="Document Viewer"
              />
              
              {/* Background Loading/Fallback */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-8 bg-cream/95">
                <div className="w-12 h-12 border-3 border-deep-teal border-t-transparent rounded-full animate-spin mb-4"></div>
                <h4 className="text-xl font-display font-bold text-ink-navy mb-2">Memuat Dokumen...</h4>
                <p className="text-ink-soft font-semibold text-xs max-w-md mx-auto mb-6">
                  Pratinjau sedang dipersiapkan. Jika pratinjau dokumen tidak kunjung muncul, Anda bisa langsung mengunduh atau membukanya di tab baru melalui kontrol di bawah.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a href={fileUrl} download className="px-6 py-2.5 bg-amber-clay text-ink-navy rounded-xl text-xs font-bold font-sans border border-white shadow-clay-btn hover:bg-amber-clay/90 active:scale-95 transition-all">Unduh Sekarang</a>
                  <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-cream text-ink-navy rounded-xl text-xs font-bold font-sans border border-white shadow-clay-btn hover:shadow-clay-inset active:scale-95 transition-all">Buka Tab Baru</a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
