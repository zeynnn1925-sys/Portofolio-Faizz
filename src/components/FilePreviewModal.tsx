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
  // Ensure no double slashes and handle origin correctly
  const origin = window.location.origin.replace(/\/$/, '');
  const path = fileUrl.startsWith('/') ? fileUrl : `/${fileUrl}`;
  const fullUrl = origin + path;
  
  // Try to use Google Docs Viewer
  const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(fullUrl)}&embedded=true`;

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
        >
          <div
            onClick={onClose}
            className="absolute inset-0 bg-ink/90 backdrop-blur-xl cursor-pointer"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-6xl h-[85vh] bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-ink/5 bg-paper/80 backdrop-blur-md">
              <div className="flex flex-col">
                <h3 className="font-serif font-bold text-xl text-ink leading-tight">{title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                  <span className="text-xs text-ink/40 font-light uppercase tracking-widest">Pratinjau Dokumen</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a 
                  href={fileUrl} 
                  download 
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-ink/5 text-ink/60 hover:bg-accent hover:text-white transition-all text-sm font-medium"
                  title="Download File"
                >
                  <Download size={18} />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <a 
                  href={fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-ink/5 text-ink/60 hover:bg-accent hover:text-white transition-all text-sm font-medium"
                  title="Buka di Tab Baru"
                >
                  <ExternalLink size={18} />
                  <span className="hidden sm:inline">Buka</span>
                </a>
                <div className="w-px h-6 bg-ink/10 mx-1"></div>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-ink/5 text-ink/60 hover:text-accent transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 bg-ink/5 relative">
              <iframe 
                src={viewerUrl}
                className="w-full h-full border-none relative z-20"
                title="Document Viewer"
              />
              
              {/* Background Loading/Fallback */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-12 bg-paper/50">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-6"></div>
                <h4 className="text-2xl font-serif font-bold text-ink mb-4">Sedang Memuat Dokumen</h4>
                <p className="text-ink/60 font-light max-w-md mx-auto mb-8">
                  Kami sedang menyiapkan pratinjau dokumen Anda. Jika pratinjau tidak muncul dalam beberapa detik, hal ini mungkin disebabkan oleh batasan akses di lingkungan ini.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href={fileUrl} download className="px-8 py-3 bg-accent text-white rounded-full text-sm font-bold hover:shadow-lg hover:shadow-accent/30 transition-all transform hover:-translate-y-1">Download Sekarang</a>
                  <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-ink/20 text-ink/60 rounded-full text-sm font-bold hover:bg-ink/5 transition-all">Buka di Tab Baru</a>
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
