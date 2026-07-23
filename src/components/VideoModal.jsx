import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle } from 'lucide-react';
import './VideoModal.css';

export default function VideoModal({ video, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!video) return null;

  const playerUrl = `https://player.vimeo.com/video/${video.id}?autoplay=1&title=0&byline=0&portrait=0`;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content-box"
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="modal-header">
            <div className="modal-title-group">
              <div className="modal-icon-badge">
                <PlayCircle size={20} />
              </div>
              <h2 className="modal-video-title">
                {video.displayTitle || video.title}
              </h2>
            </div>
            <button
              className="modal-close-button"
              onClick={onClose}
              title="Fechar vídeo (Esc)"
            >
              <X size={22} />
            </button>
          </div>

          {/* Vimeo Player Frame */}
          <div className="modal-player-wrapper">
            <iframe
              src={playerUrl}
              title={video.displayTitle || video.title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
