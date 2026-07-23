import React, { useState } from 'react';
import Header from './components/Header';
import BackgroundVideo from './components/BackgroundVideo';
import VideoGrid from './components/VideoGrid';
import AboutView from './components/AboutView';
import VideoModal from './components/VideoModal';
import './assets/styles/global.css';

export default function App() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [isAboutView, setIsAboutView] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Reset to Home
  const handleResetHome = () => {
    setActiveCategory(null);
    setActiveSubcategory(null);
    setIsAboutView(false);
    setSelectedVideo(null);
  };

  // Select main category
  const handleSelectCategory = (category) => {
    if (category.isAboutPage) {
      setIsAboutView(true);
      setActiveCategory(category);
      setActiveSubcategory(null);
    } else {
      setIsAboutView(false);
      setActiveCategory(category);
      setActiveSubcategory(null);
    }
  };

  // Select subcategory from sanfona dropdown
  const handleSelectSubcategory = (category, subcategory) => {
    setIsAboutView(false);
    setActiveCategory(category);
    setActiveSubcategory(subcategory);
  };

  return (
    <div className="app-container">
      {/* O vídeo de fundo da Home permanece SEMPRE visível em todas as telas */}
      <BackgroundVideo />

      {/* Main Content View Stack */}
      <div className="content-layer">
        <Header
          activeCategory={activeCategory}
          activeSubcategory={activeSubcategory}
          onSelectCategory={handleSelectCategory}
          onSelectSubcategory={handleSelectSubcategory}
          onResetHome={handleResetHome}
        />

        {/* Content Section: Grid, About, ou Home zerada */}
        {isAboutView ? (
          <AboutView />
        ) : activeCategory ? (
          <VideoGrid
            category={activeCategory}
            subcategory={activeSubcategory}
            onSelectVideo={(video) => setSelectedVideo(video)}
          />
        ) : null}
      </div>

      {/* Fullscreen Video Modal Player (Quase tamanho total da tela) */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
