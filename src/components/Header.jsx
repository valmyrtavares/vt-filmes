import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Video, Play, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/videoData';
import './Header.css';

export default function Header({ 
  activeCategory, 
  activeSubcategory, 
  onSelectCategory, 
  onSelectSubcategory, 
  onResetHome 
}) {
  const [openCategory, setOpenCategory] = useState(null);
  const navRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenCategory(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (category) => {
    if (category.isAboutPage) {
      setOpenCategory(null);
      onSelectCategory(category);
    } else if (category.directCategory) {
      setOpenCategory(null);
      onSelectCategory(category);
    } else {
      // Toggle dropdown for items with subcategories
      if (openCategory === category.id) {
        setOpenCategory(null);
      } else {
        setOpenCategory(category.id);
      }
    }
  };

  const handleSubcategoryClick = (category, subcategory) => {
    setOpenCategory(null);
    onSelectSubcategory(category, subcategory);
  };

  // Accordion variants for Framer Motion
  const accordionContainerVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.25,
        staggerChildren: 0.05,
        delayChildren: 0.02
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.18
      }
    }
  };

  const accordionItemVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <header className="header-container">
      {/* Brand Logo - Top Left */}
      <div 
        className="brand-logo-button" 
        onClick={onResetHome}
        title="Voltar para a Home (VT Videos)"
      >
        <div className="brand-icon-box">
          VT
        </div>
        <div className="brand-text-container">
          <span className="brand-title">VT Videos</span>
          <span className="brand-subtitle">Valmyr Tavares</span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <nav ref={navRef}>
        <ul className="nav-menu-list">
          {CATEGORIES.map((category) => {
            const hasSubcategories = category.subcategories && category.subcategories.length > 0;
            const isOpen = openCategory === category.id;
            const isActiveCategory = activeCategory?.id === category.id;

            return (
              <li key={category.id} className="nav-item">
                <button
                  className={`nav-button ${isActiveCategory ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  <span>{category.name}</span>
                  {hasSubcategories && (
                    <ChevronDown className={`nav-chevron ${isOpen ? 'open' : ''}`} size={16} />
                  )}
                </button>

                {/* Sanfona / Accordion Dropdown */}
                <AnimatePresence>
                  {hasSubcategories && isOpen && (
                    <motion.div
                      className="dropdown-accordion"
                      variants={accordionContainerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {category.subcategories.map((sub) => {
                        const isSubActive = activeSubcategory?.id === sub.id && isActiveCategory;
                        return (
                          <motion.button
                            key={sub.id}
                            variants={accordionItemVariants}
                            className={`dropdown-item ${isSubActive ? 'active' : ''}`}
                            onClick={() => handleSubcategoryClick(category, sub)}
                          >
                            <span>{sub.name}</span>
                            {isSubActive && <Sparkles size={14} color="#C59B27" />}
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
