import React from 'react';
import './BackgroundVideo.css';

export default function BackgroundVideo() {
  // Embed oficial do Vimeo com autoplay=1, muted=1, loop=1 e app_id
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
    </div>
  );
}
