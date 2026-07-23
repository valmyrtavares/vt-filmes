import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BackgroundVideo from './components/BackgroundVideo';
import VideoGrid from './components/VideoGrid';
import AboutView from './components/AboutView';
import VideoModal from './components/VideoModal';
import { CATEGORIES } from './data/videoData';
import './assets/styles/global.css';

// Search helper to find video metadata by ID in CATEGORIES configuration
const findVideoById = (id) => {
  for (const cat of CATEGORIES) {
    if (cat.videos) {
      const vid = cat.videos.find(v => v.id === id);
      if (vid) return { video: vid, category: cat, subcategory: null };
    }
    if (cat.subcategories) {
      for (const sub of cat.subcategories) {
        if (sub.videos) {
          const vid = sub.videos.find(v => v.id === id);
          if (vid) return { video: vid, category: cat, subcategory: sub };
        }
      }
    }
  }
  return null;
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Sync state on popstate event (back/forward browser buttons)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
  };

  // Derive route parameters and active states from URL path segments
  const segments = currentPath.split('/').filter(Boolean);

  let isAboutView = false;
  let activeCategory = null;
  let activeSubcategory = null;
  let selectedVideo = null;

  if (segments[0] === 'quem-sou') {
    isAboutView = true;
    activeCategory = CATEGORIES.find(c => c.isAboutPage) || null;
  } else if (segments[0] === 'categoria' && segments[1]) {
    const catId = segments[1];
    activeCategory = CATEGORIES.find(c => c.id === catId) || null;
    if (segments[2]) {
      const subId = segments[2];
      activeSubcategory = activeCategory?.subcategories?.find(s => s.id === subId) || null;
    }
  } else if (segments[0] === 'video' && segments[1]) {
    const videoId = segments[1];
    const match = findVideoById(videoId);
    if (match) {
      selectedVideo = { ...match.video };
      activeCategory = match.category;
      activeSubcategory = match.subcategory;
    } else {
      // Fallback object for dynamically loaded video IDs
      selectedVideo = { id: videoId, title: "Vídeo VT Filmes" };
    }
  }

  // Handle route navigation triggers
  const handleResetHome = () => {
    navigate('/');
  };

  const handleSelectCategory = (category) => {
    if (category.isAboutPage) {
      navigate('/quem-sou');
    } else if (category.directCategory) {
      navigate(`/categoria/${category.id}`);
    }
  };

  const handleSelectSubcategory = (category, subcategory) => {
    navigate(`/categoria/${category.id}/${subcategory.id}`);
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
            onSelectVideo={(video) => navigate(`/video/${video.id}`)}
          />
        ) : null}
      </div>

      {/* Fullscreen Video Modal Player (Quase tamanho total da tela) */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={handleResetHome}
        />
      )}
    </div>
  );
}

