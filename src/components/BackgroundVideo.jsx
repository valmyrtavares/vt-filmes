import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Film } from 'lucide-react';
import { HOME_VIDEO_ID } from '../data/videoData';
import './BackgroundVideo.css';

export default function BackgroundVideo() {
  // Embedded Vimeo Player configured for seamless background loop
  const embedUrl = `https://player.vimeo.com/video/${HOME_VIDEO_ID}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`;

  return (
    <div className="home-background-container">
      <iframe
        className="vimeo-bg-iframe"
        src={embedUrl}
        title="VT Videos Reel Background"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
      <div className="home-video-overlay" />

      {/* Floating Welcome Hero Card */}
      <motion.div
        className="home-hero-content"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        <div className="hero-tag">
          <Sparkles size={14} /> Portfólio Audiovisual
        </div>
        <h1 className="hero-headline">
          Videomaker de Histórias & Emoções Únicas
        </h1>
        <p className="hero-description">
          Registros inesquecíveis para Casamentos, Eventos Sociais, Projetos Institucionais, Música e Documentários com o olhar exclusivo de <strong>Valmyr Tavares</strong>.
        </p>
      </motion.div>
    </div>
  );
}
