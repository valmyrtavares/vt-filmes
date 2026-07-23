import React from 'react';
import { motion } from 'framer-motion';
import VideoCard from './VideoCard';
import './VideoGrid.css';

export default function VideoGrid({ category, subcategory, onSelectVideo }) {
  // Determine which videos to display
  let videosToDisplay = [];
  let displayTitle = '';
  let categoryPath = '';

  if (subcategory) {
    videosToDisplay = subcategory.videos || [];
    displayTitle = subcategory.name;
    categoryPath = `${category?.name}  ▸  ${subcategory.name}`;
  } else if (category) {
    if (category.directCategory) {
      videosToDisplay = category.videos || [];
      displayTitle = category.name;
      categoryPath = category.name;
    } else {
      // Gather videos from all subcategories if main category clicked
      videosToDisplay = (category.subcategories || []).flatMap((sub) => sub.videos || []);
      displayTitle = category.name;
      categoryPath = category.name;
    }
  }

  return (
    <motion.div
      className="video-grid-wrapper"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header bar for active category */}
      <div className="grid-header-bar">
        <div className="grid-title-group">
          <span className="grid-category-path">{categoryPath}</span>
          <h2 className="grid-main-title">{displayTitle}</h2>
        </div>
        <div className="grid-count-badge">
          {videosToDisplay.length} {videosToDisplay.length === 1 ? 'Vídeo' : 'Vídeos'}
        </div>
      </div>

      {/* Grid container with custom scrollbar */}
      <div className="cards-container-scrollable custom-scrollbar">
        {videosToDisplay.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            categoryName={category?.name}
            subcategoryName={subcategory?.name}
            onClick={onSelectVideo}
          />
        ))}
      </div>
    </motion.div>
  );
}
