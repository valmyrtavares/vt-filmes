import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, Menu, X } from 'lucide-react';
import { CATEGORIES } from '../data/videoData';
import './Header.css';

export default function Header({ 
  activeCategory, 
  activeSubcategory, 
  onSelectCategory, 
  onSelectSubcategory, 
  onResetHome 
}) {
  const [openCategory, setOpenCategory] = useState(activeCategory?.id || null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Sync openCategory with activeCategory prop changes (e.g. on back/forward browser navigation)
  useEffect(() => {
    if (activeCategory) {
      setOpenCategory(activeCategory.id);
    } else {
      setOpenCategory(null);
    }
  }, [activeCategory]);


  // Close dropdowns and mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenCategory(null);
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on screen resize above 1024px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCategoryClick = (category) => {
    if (category.isAboutPage || category.directCategory) {
      setOpenCategory(null);
      setIsMobileMenuOpen(false); // Close menu on click of direct category
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
    setIsMobileMenuOpen(false); // Close menu on click of subcategory
    onSelectSubcategory(category, subcategory);
  };

  const handleLogoClick = () => {
    setOpenCategory(null);
    setIsMobileMenuOpen(false);
    onResetHome();
  };

  // Accordion variants for Framer Motion (Desktop)
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
    <header className="header-container" ref={navRef}>
      {/* Brand Logo - Top Left */}
      <div 
        className="brand-logo-button" 
        onClick={handleLogoClick}
        title="Voltar para a Home (VT Filmes)"
      >
        <div className="brand-icon-box">
          VT
        </div>
        <div className="brand-text-container">
          <span className="brand-title">VT Filmes</span>
          <span className="brand-subtitle">Valmyr Tavares</span>
        </div>
      </div>

      {/* Mobile Hamburger Toggle Button */}
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Alternar menu de navegação"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Desktop Navigation Buttons */}
      <nav className="desktop-nav">
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

                {/* Sanfona / Accordion Dropdown (Desktop) */}
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
                            {isSubActive && <Sparkles size={14} color="#E5C378" />}
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

      {/* Mobile Navigation Dropdown Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <ul className="mobile-nav-list">
              {CATEGORIES.map((category) => {
                const hasSubcategories = category.subcategories && category.subcategories.length > 0;
                const isOpen = openCategory === category.id;
                const isActiveCategory = activeCategory?.id === category.id;

                return (
                  <li key={category.id} className="mobile-nav-item">
                    <button
                      className={`mobile-nav-button ${isActiveCategory ? 'active' : ''}`}
                      onClick={() => handleCategoryClick(category)}
                    >
                      <span>{category.name}</span>
                      {hasSubcategories && (
                        <ChevronDown className={`nav-chevron ${isOpen ? 'open' : ''}`} size={18} />
                      )}
                    </button>

                    {/* Mobile Subcategories Accordion */}
                    <AnimatePresence>
                      {hasSubcategories && isOpen && (
                        <motion.div
                          className="mobile-dropdown-accordion"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          {category.subcategories.map((sub) => {
                            const isSubActive = activeSubcategory?.id === sub.id && isActiveCategory;
                            return (
                              <button
                                key={sub.id}
                                className={`mobile-dropdown-item ${isSubActive ? 'active' : ''}`}
                                onClick={() => handleSubcategoryClick(category, sub)}
                              >
                                <span>{sub.name}</span>
                                {isSubActive && <Sparkles size={14} color="#E5C378" />}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

