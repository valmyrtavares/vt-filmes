import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Film } from 'lucide-react';
import './VideoCard.css';

export default function VideoCard({ video, categoryName, subcategoryName, onClick }) {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [vimeoTitle, setVimeoTitle] = useState(video.title);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Fetch dynamic title & thumbnail from Vimeo API
    fetch(`https://vimeo.com/api/v2/video/${video.id}.json`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data && data[0]) {
          setThumbnailUrl(data[0].thumbnail_large || data[0].thumbnail_medium);
          if (data[0].title) {
            setVimeoTitle(data[0].title);
          }
        }
      })
      .catch((err) => {
        console.warn(`Could not fetch Vimeo metadata for ${video.id}, using fallback`, err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [video.id]);

  return (
    <motion.div
      className="video-card"
      whileHover={{ y: -6 }}
      onClick={() => onClick({ ...video, displayTitle: vimeoTitle })}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="thumbnail-wrapper">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={vimeoTitle}
            className="card-thumbnail-image"
            loading="lazy"
          />
        ) : (
          <div className="thumbnail-wrapper" style={{ background: 'linear-gradient(135deg, #134074 0%, #0B2545 100%)' }}>
            <Film size={40} color="#E5C378" opacity={0.6} />
          </div>
        )}

        <div className="play-overlay-button">
          <Play className="play-icon-adjust" size={24} fill="#0B2545" color="#0B2545" />
        </div>
      </div>

      <div className="card-details">
        <span className="card-badge">
          {subcategoryName || categoryName || 'VT Videos'}
        </span>
        <h3 className="card-title">{vimeoTitle}</h3>
      </div>
    </motion.div>
  );
}
