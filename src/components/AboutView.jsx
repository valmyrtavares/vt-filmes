import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Mail, Phone, Award, Video, Heart } from 'lucide-react';
import '../assets/styles/AboutView.css';

// Inline Instagram SVG component following Lucide design parameters (stroke, rounding)
const InstagramIcon = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function AboutView() {
  return (
    <div className="about-container custom-scrollbar">
      <motion.div
        className="about-card"
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        {/* Profile Column */}
        <div className="about-profile-side">
          <div className="about-avatar-box">
            <div className="about-avatar-inner">
              VT
            </div>
          </div>
          <h2 className="about-name">Valmyr Tavares</h2>
          <span className="about-role-badge">Desenvolvedor & Videomaker</span>
        </div>

        {/* Biography Column */}
        <div className="about-bio-side">
          <h3 className="about-headline">
            Transformando Grandes Momentos em Filmes Cinematográficos
          </h3>
          <p className="about-paragraph">
            Com anos de atuação no mercado audiovisual, sou especializado em registros sociais e corporativos de alta sensibilidade e dinamismo. Da emoção de casamentos à grandiosidade de empreendimentos imobiliários e shows ao vivo.
          </p>
          <p className="about-paragraph">
            Cada filme é planejado e editado de forma personalizada, integrando narrativa poética, imagens aéreas com drone e captação sonora cristalina para perpetuar a sua história.
          </p>

          <div className="about-features-list">
            <div className="about-feature-item">
              <span className="feature-gold-dot" /> Casamentos & Mini Weddings
            </div>
            <div className="about-feature-item">
              <span className="feature-gold-dot" /> Retrospectivas Contadas
            </div>
            <div className="about-feature-item">
              <span className="feature-gold-dot" /> Empreendimentos Imobiliários
            </div>
            <div className="about-feature-item">
              <span className="feature-gold-dot" /> Documentários & Videoclipes
            </div>
          </div>

          <div className="about-actions">
            <a
              href="https://wa.me/551197041310" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-contact-gold"
            >
              <Phone size={18} /> Entrar em Contato
            </a>
            
            <a
              href="https://www.instagram.com/valmyr_tavares/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-instagram-outline"
              title="Siga no Instagram"
            >
              <InstagramIcon size={18} /> Instagram
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
