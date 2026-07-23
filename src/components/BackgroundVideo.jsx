import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import './BackgroundVideo.css';

export default function BackgroundVideo() {
  // Novo embed exato gerado pelo Vimeo com autoplay=1 e muted=1 habilitados
  const embedUrl = "https://player.vimeo.com/video/57230104?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1";

  return (
    <div className="home-background-container">
      <iframe
        className="vimeo-bg-iframe"
        src={embedUrl}
        title="site front page 1"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
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
