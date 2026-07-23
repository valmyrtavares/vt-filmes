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

  // Reset to Home Fullscreen Vimeo Reel
  const handleResetHome = () => {
    setActiveCategory(null);
    setActiveSubcategory(null);
    setIsAboutView(false);
    setSelectedVideo(null);
  };

  // Select main category (Batizado, Quem Sou, or Category header click)
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

  // Determine if we are showing Home background video
  const isHomeView = !activeCategory && !isAboutView;

  return (
    <div className="app-container">
      {/* Background Vimeo Video (Active on Home) */}
      {isHomeView && <BackgroundVideo />}

      {/* Main Content View Stack */}
      <div className="content-layer">
        <Header
          activeCategory={activeCategory}
          activeSubcategory={activeSubcategory}
          onSelectCategory={handleSelectCategory}
          onSelectSubcategory={handleSelectSubcategory}
          onResetHome={handleResetHome}
        />

        {/* Content Section: Grid, About, or Home Background */}
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

      {/* Fullscreen Video Modal Player */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}
