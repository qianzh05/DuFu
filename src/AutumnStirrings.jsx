import React, { useState, useEffect, useCallback } from 'react';
import { poemsData } from './data/poemsData';
import { Navigation } from './components/Navigation';
import { Controls } from './components/Controls';
import { HeroSection } from './components/HeroSection';
import { ContextSection } from './components/ContextSection';
import { PoemSection } from './components/PoemSection';
import { ImagerySection } from './components/ImagerySection';
import { JourneyMap } from './components/JourneyMap';
import { TimelineSection } from './components/TimelineSection';
import { AnnotationPanel } from './components/AnnotationPanel';
import { EtymologyModal } from './components/EtymologyModal';
import { Footer } from './components/Footer';
import './styles/AutumnStirrings.css';

// ripple effect for clicks on cards and buttons
function useRippleEffect() {
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest('.imagery-card, .lang-btn, .pinyin-toggle, .poem-dot');
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      target.style.position = 'relative';
      target.style.overflow = 'hidden';
      target.appendChild(ripple);

      ripple.addEventListener('animationend', () => ripple.remove());
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}

// keep track of scroll position for progress bar
function useSmoothScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollProgress;
}

export default function AutumnStirrings() {
  useRippleEffect();
  const scrollProgress = useSmoothScrollProgress();

  const [language, setLanguage] = useState('both');
  const [showPinyin, setShowPinyin] = useState(false);
  const [activePoem, setActivePoem] = useState(1);
  const [highlightedLine, setHighlightedLine] = useState(null);
  const [activeAnnotation, setActiveAnnotation] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const scrollToPoem = useCallback((num) => {
    const section = document.getElementById(`poem-${num}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // figure out which poem section is showing
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      const sections = document.querySelectorAll('.poem-section');
      let current = 1;
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          current = index + 1;
        }
      });
      setActivePoem(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // arrow keys to move between poems
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && activePoem < 8) {
        scrollToPoem(activePoem + 1);
      } else if (e.key === 'ArrowLeft' && activePoem > 1) {
        scrollToPoem(activePoem - 1);
      } else if (e.key === 'Escape') {
        setActiveAnnotation(null);
        setSelectedCharacter(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePoem, scrollToPoem]);

  const handleCharacterClick = useCallback((char) => {
    setSelectedCharacter(char);
  }, []);

  return (
    <div className="app">
      {/* Scroll Progress Indicator */}
      <div
        className="scroll-progress"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '3px',
          background: 'linear-gradient(90deg, var(--autumn-gold), var(--autumn-red), var(--maple-red))',
          zIndex: 1000,
          transition: 'width 0.1s ease-out',
          boxShadow: '0 0 10px rgba(201, 162, 39, 0.5)',
        }}
      />
      <Navigation
        activePoem={activePoem}
        onPoemClick={scrollToPoem}
        scrolled={scrolled}
      />
      <Controls
        language={language}
        setLanguage={setLanguage}
        showPinyin={showPinyin}
        setShowPinyin={setShowPinyin}
      />

      <HeroSection />
      <ContextSection />

      {poemsData.map((poem, index) => (
        <PoemSection
          key={index}
          poem={poem}
          index={index}
          language={language}
          showPinyin={showPinyin}
          highlightedLine={highlightedLine}
          setHighlightedLine={setHighlightedLine}
          onAnnotationClick={setActiveAnnotation}
          onCharClick={handleCharacterClick}
        />
      ))}

      <ImagerySection />
      <JourneyMap />
      <TimelineSection />
      <Footer />

      <AnnotationPanel
        annotation={activeAnnotation}
        onClose={() => setActiveAnnotation(null)}
      />

      <EtymologyModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />
    </div>
  );
}
