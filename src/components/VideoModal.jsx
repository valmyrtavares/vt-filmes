import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle } from 'lucide-react';
import './VideoModal.css';

export default function VideoModal({ video, onClose }) {
  const modalRef = useRef(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Request native browser fullscreen on mount (triggered by click user gesture)
  useEffect(() => {
    const element = modalRef.current;
    if (element) {
      const requestFS = element.requestFullscreen || 
                        element.webkitRequestFullscreen || 
                        element.mozRequestFullScreen || 
                        element.msRequestFullscreen;
      if (requestFS) {
        requestFS.call(element).catch(err => {
          console.warn("Fullscreen request rejected or not supported on this browser/device:", err);
        });
      }
    }

    // Exit fullscreen on close/unmount
    return () => {
      const exitFS = document.exitFullscreen || 
                     document.webkitExitFullscreen || 
                     document.mozCancelFullScreen || 
                     document.msExitFullscreen;
      
      const isFS = !!(document.fullscreenElement || 
                      document.webkitFullscreenElement || 
                      document.mozFullScreenElement || 
                      document.msFullscreenElement);

      if (exitFS && isFS) {
        exitFS.call(document).catch(err => {
          console.warn("Failed to exit fullscreen on unmount:", err);
        });
      }
    };
  }, []);

  // Listen to native fullscreen changes (auto-close modal if user exits fullscreen via system swipe/back gesture)
  useEffect(() => {
    const handleFSChange = () => {
      const isFS = !!(document.fullscreenElement || 
                      document.webkitFullscreenElement || 
                      document.mozFullScreenElement || 
                      document.msFullscreenElement);
      if (!isFS) {
        onClose();
      }
    };

    document.addEventListener('fullscreenchange', handleFSChange);
    document.addEventListener('webkitfullscreenchange', handleFSChange);
    document.addEventListener('mozfullscreenchange', handleFSChange);
    document.addEventListener('MSFullscreenChange', handleFSChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFSChange);
      document.removeEventListener('webkitfullscreenchange', handleFSChange);
      document.removeEventListener('mozfullscreenchange', handleFSChange);
      document.removeEventListener('MSFullscreenChange', handleFSChange);
    };
  }, [onClose]);

  if (!video) return null;

  const playerUrl = `https://player.vimeo.com/video/${video.id}?autoplay=1&title=0&byline=0&portrait=0`;

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
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
