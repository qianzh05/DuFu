import React, { useState, useEffect, useRef } from 'react';

// Poem data - all placeholders
const poemsData = [
  {
    number: '一',
    chinese: [
      '[玉露凋傷楓樹林]',
      '[巫山巫峽氣蕭森]',
      '[江間波浪兼天湧]',
      '[塞上風雲接地陰]',
      '[叢菊兩開他日淚]',
      '[孤舟一繫故園心]',
      '[寒衣處處催刀尺]',
      '[白帝城高急暮砧]'
    ],
    english: [
      '[Jade dew withers and wounds the maple forest,]',
      '[On Wu Mountain, Wu Gorge, the air is somber.]',
      '[Between the river\'s banks, waves surge to heaven,]',
      '[Above the passes, wind and clouds darken the earth.]',
      '[The clustered chrysanthemums twice blooming bring tears of other days,]',
      '[A lone boat, moored—my heart tied to my homeland.]',
      '[Everywhere they hurry with knife and ruler for winter clothes,]',
      '[White Emperor City\'s high walls echo with urgent evening pounding.]'
    ],
    imagery: {
      0: { key: 'jade-dew', chinese: '玉露', title: 'Jade Dew', description: '[Placeholder: Explanation of jade dew as autumn imagery]' },
      5: { key: 'lone-boat', chinese: '孤舟', title: 'The Lone Boat', description: '[Placeholder: The lone boat as symbol of exile]' }
    }
  },
  {
    number: '二',
    chinese: [
      '[夔府孤城落日斜]',
      '[每依北斗望京華]',
      '[聽猿實下三聲淚]',
      '[奉使虛隨八月槎]',
      '[畫省香爐違伏枕]',
      '[山樓粉堞隱悲笳]',
      '[請看石上藤蘿月]',
      '[已映洲前蘆荻花]'
    ],
    english: [
      '[Kuizhou\'s lonely city, the setting sun slants,]',
      '[Following the Northern Dipper, I gaze toward the capital.]',
      '[Hearing gibbons—truly three cries bring tears,]',
      '[On mission, I vainly follow the eighth-month raft.]',
      '[The painted ministry\'s incense burner—I lie sick, kept away,]',
      '[Mountain towers, powdered battlements hide the mournful horn.]',
      '[Look at the moon on the vines upon the rocks,]',
      '[Already shining on the reeds before the islet.]'
    ],
    imagery: {}
  },
  {
    number: '三',
    chinese: ['[第三首待補]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]'],
    english: ['[Poem III placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]'],
    imagery: {}
  },
  {
    number: '四',
    chinese: ['[第四首待補]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]'],
    english: ['[Poem IV placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]'],
    imagery: {}
  },
  {
    number: '五',
    chinese: ['[第五首待補]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]'],
    english: ['[Poem V placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]'],
    imagery: {}
  },
  {
    number: '六',
    chinese: ['[第六首待補]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]'],
    english: ['[Poem VI placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]'],
    imagery: {}
  },
  {
    number: '七',
    chinese: ['[第七首待補]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]'],
    english: ['[Poem VII placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]'],
    imagery: {}
  },
  {
    number: '八',
    chinese: ['[第八首待補]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]'],
    english: ['[Poem VIII placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]', '[Placeholder]'],
    imagery: {}
  }
];

// Styles
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

  :root {
    --ink: #1a1612;
    --paper: #f5f1e8;
    --paper-dark: #e8e0d0;
    --autumn-gold: #c9a227;
    --autumn-red: #8b3a3a;
    --autumn-orange: #b5651d;
    --river-blue: #4a6670;
    --mountain-grey: #6b7b7a;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  
  body {
    font-family: 'EB Garamond', 'Noto Serif SC', serif;
    background: var(--paper);
    color: var(--ink);
    line-height: 1.8;
    overflow-x: hidden;
  }

  /* Texture overlay */
  body::before {
    content: '';
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity: 0.03;
    pointer-events: none;
    z-index: 1000;
  }

  .app { position: relative; }

  /* Navigation */
  .nav {
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    padding: 1.5rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
    background: linear-gradient(to bottom, var(--paper) 0%, transparent 100%);
  }

  .nav-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--mountain-grey);
  }

  .nav-chinese {
    font-family: 'Noto Serif SC', serif;
    font-size: 1rem;
    color: var(--autumn-red);
    letter-spacing: 0.3em;
  }

  .poem-indicators { display: flex; gap: 0.5rem; }

  .poem-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--paper-dark);
    border: 1px solid var(--mountain-grey);
    cursor: pointer;
    transition: all 0.4s ease;
  }

  .poem-dot.active {
    background: var(--autumn-gold);
    border-color: var(--autumn-gold);
    transform: scale(1.3);
  }

  .poem-dot:hover {
    background: var(--autumn-orange);
    border-color: var(--autumn-orange);
  }

  /* Hero */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: 
      radial-gradient(ellipse at 20% 80%, rgba(201, 162, 39, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, rgba(139, 58, 58, 0.08) 0%, transparent 50%);
    animation: heroGlow 8s ease-in-out infinite alternate;
  }

  @keyframes heroGlow {
    0% { opacity: 0.6; }
    100% { opacity: 1; }
  }

  .hero-content { position: relative; z-index: 1; }

  .hero-chinese {
    font-family: 'Noto Serif SC', serif;
    font-size: clamp(3rem, 10vw, 7rem);
    font-weight: 700;
    letter-spacing: 0.5em;
    margin-left: 0.5em;
    color: var(--ink);
    opacity: 0;
    animation: fadeInUp 1.2s ease forwards;
  }

  .hero-english {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.2rem, 3vw, 2rem);
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--mountain-grey);
    margin-top: 1.5rem;
    opacity: 0;
    animation: fadeInUp 1.2s ease 0.3s forwards;
  }

  .hero-poet {
    font-family: 'EB Garamond', serif;
    font-size: 1.2rem;
    font-style: italic;
    color: var(--autumn-red);
    margin-top: 3rem;
    opacity: 0;
    animation: fadeInUp 1.2s ease 0.6s forwards;
  }

  .hero-subtitle {
    font-size: 1rem;
    color: var(--mountain-grey);
    margin-top: 0.5rem;
    opacity: 0;
    animation: fadeInUp 1.2s ease 0.8s forwards;
  }

  .scroll-hint {
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    opacity: 0;
    animation: fadeInUp 1.2s ease 1.2s forwards;
  }

  .scroll-hint span {
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--mountain-grey);
  }

  .scroll-line {
    width: 1px;
    height: 60px;
    background: linear-gradient(to bottom, var(--autumn-gold), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }

  @keyframes scrollPulse {
    0%, 100% { transform: scaleY(1); opacity: 1; }
    50% { transform: scaleY(0.6); opacity: 0.5; }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Context Section */
  .context-section {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem;
    background: linear-gradient(to bottom, var(--paper), var(--paper-dark));
  }

  .context-content {
    max-width: 800px;
    text-align: center;
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s ease;
  }

  .context-content.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .context-year {
    font-family: 'Cormorant Garamond', serif;
    font-size: 4rem;
    font-weight: 600;
    color: var(--autumn-gold);
    opacity: 0.3;
    margin-bottom: 1rem;
  }

  .context-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 2rem;
  }

  .context-text {
    font-size: 1.15rem;
    line-height: 2;
    color: var(--mountain-grey);
    max-width: 600px;
    margin: 0 auto;
  }

  .location-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 2rem;
    padding: 0.75rem 1.5rem;
    background: var(--paper);
    border: 1px solid var(--autumn-gold);
    font-size: 0.9rem;
  }

  .location-badge .chinese {
    font-family: 'Noto Serif SC', serif;
    color: var(--autumn-red);
  }

  /* Poem Section */
  .poem-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 4rem 2rem;
    position: relative;
  }

  .poem-section:nth-child(odd) { background: var(--paper); }
  .poem-section:nth-child(even) { background: var(--paper-dark); }

  .poem-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  @media (max-width: 900px) {
    .poem-container {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  .poem-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 8rem;
    font-weight: 600;
    color: var(--autumn-gold);
    opacity: 0.15;
    position: absolute;
    top: 2rem; left: 2rem;
    line-height: 1;
  }

  .poem-chinese-block {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s ease;
  }

  .poem-chinese-block.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .poem-chinese {
    font-family: 'Noto Serif SC', serif;
    font-size: 1.6rem;
    line-height: 2.5;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    height: 450px;
    letter-spacing: 0.1em;
  }

  .poem-line {
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0 0.3rem;
  }

  .poem-line:hover {
    color: var(--autumn-red);
    background: linear-gradient(to bottom, transparent, rgba(201, 162, 39, 0.1), transparent);
  }

  .poem-line.highlighted {
    color: var(--autumn-red);
    text-shadow: 0 0 20px rgba(139, 58, 58, 0.3);
  }

  .poem-english-block {
    padding-left: 2rem;
    border-left: 2px solid var(--autumn-gold);
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s ease 0.2s;
  }

  .poem-english-block.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .poem-english {
    font-family: 'EB Garamond', serif;
    font-size: 1.2rem;
    line-height: 2.2;
    color: var(--mountain-grey);
    font-style: italic;
  }

  .poem-english-line {
    opacity: 0.7;
    transition: all 0.3s ease;
    padding: 0.25rem 0;
  }

  .poem-english-line:hover {
    opacity: 1;
    color: var(--ink);
    padding-left: 0.5rem;
  }

  .poem-english-line.highlighted {
    opacity: 1;
    color: var(--autumn-red);
    padding-left: 0.5rem;
  }

  /* Language Toggle */
  .lang-toggle {
    position: fixed;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .lang-btn {
    width: 40px; height: 40px;
    border: 1px solid var(--mountain-grey);
    background: var(--paper);
    font-family: 'Noto Serif SC', serif;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lang-btn:hover, .lang-btn.active {
    background: var(--autumn-gold);
    border-color: var(--autumn-gold);
    color: var(--paper);
  }

  /* Imagery Panel */
  .imagery-panel {
    position: fixed;
    bottom: 0; left: 0;
    width: 100%;
    background: var(--ink);
    color: var(--paper);
    padding: 1.5rem 3rem;
    transform: translateY(100%);
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 50;
    display: flex;
    align-items: center;
    gap: 3rem;
  }

  .imagery-panel.visible { transform: translateY(0); }

  .imagery-chinese {
    font-family: 'Noto Serif SC', serif;
    font-size: 2rem;
    color: var(--autumn-gold);
  }

  .imagery-content h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .imagery-content p {
    font-size: 0.95rem;
    color: var(--paper-dark);
    max-width: 600px;
    line-height: 1.7;
  }

  .imagery-close {
    margin-left: auto;
    background: none;
    border: 1px solid var(--paper-dark);
    color: var(--paper);
    padding: 0.5rem 1rem;
    font-family: 'EB Garamond', serif;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .imagery-close:hover {
    background: var(--paper);
    color: var(--ink);
  }

  /* Map Section */
  .map-section {
    min-height: 100vh;
    background: var(--ink);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .map-container {
    width: 100%;
    max-width: 1000px;
    padding: 4rem 2rem;
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s ease;
  }

  .map-container.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .map-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    color: var(--paper);
    text-align: center;
    margin-bottom: 3rem;
    letter-spacing: 0.2em;
  }

  .map-visual {
    position: relative;
    height: 400px;
    background: linear-gradient(135deg, 
      rgba(74, 102, 112, 0.3) 0%, 
      rgba(107, 123, 122, 0.2) 50%,
      rgba(139, 58, 58, 0.2) 100%);
    border-radius: 4px;
    overflow: hidden;
  }

  .map-path {
    position: absolute;
    top: 50%; left: 15%;
    width: 70%; height: 2px;
    background: linear-gradient(to right, var(--river-blue), var(--autumn-gold));
    transform: translateY(-50%);
  }

  .map-path::before, .map-path::after {
    content: '';
    position: absolute;
    top: -4px;
    width: 10px; height: 10px;
    border-radius: 50%;
  }

  .map-path::before {
    left: 0;
    background: var(--river-blue);
    box-shadow: 0 0 20px var(--river-blue);
  }

  .map-path::after {
    right: 0;
    background: var(--autumn-gold);
    box-shadow: 0 0 20px var(--autumn-gold);
  }

  .map-location {
    position: absolute;
    text-align: center;
    color: var(--paper);
  }

  .map-location.kuizhou { top: 60%; left: 10%; }
  .map-location.changan { top: 60%; right: 10%; }

  .map-location .chinese {
    font-family: 'Noto Serif SC', serif;
    font-size: 1.5rem;
    color: var(--autumn-gold);
    display: block;
  }

  .map-location .english {
    font-size: 0.85rem;
    color: var(--paper-dark);
    letter-spacing: 0.1em;
  }

  .map-distance {
    position: absolute;
    top: 30%; left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }

  .map-distance .number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem;
    color: var(--autumn-red);
  }

  .map-distance .unit {
    font-size: 0.9rem;
    color: var(--paper-dark);
    display: block;
  }

  .map-caption {
    text-align: center;
    margin-top: 2rem;
    font-style: italic;
    color: var(--paper-dark);
    font-size: 1.1rem;
  }

  /* Footer */
  footer {
    background: var(--ink);
    color: var(--paper);
    padding: 4rem 2rem;
    text-align: center;
  }

  .footer-quote {
    font-family: 'Noto Serif SC', serif;
    font-size: 1.8rem;
    color: var(--autumn-gold);
    margin-bottom: 1rem;
  }

  .footer-translation {
    font-family: 'EB Garamond', serif;
    font-style: italic;
    color: var(--paper-dark);
    font-size: 1.1rem;
    margin-bottom: 3rem;
  }

  .footer-info {
    font-size: 0.85rem;
    color: var(--mountain-grey);
  }

  .hidden { display: none !important; }
`;

// Navigation Component
const Navigation = ({ activePoem, onPoemClick }) => (
  <nav className="nav">
    <div>
      <div className="nav-title">Autumn Stirrings</div>
      <div className="nav-chinese">秋興八首</div>
    </div>
    <div className="poem-indicators">
      {[1,2,3,4,5,6,7,8].map(num => (
        <div 
          key={num}
          className={`poem-dot ${activePoem === num ? 'active' : ''}`}
          onClick={() => onPoemClick(num)}
        />
      ))}
    </div>
  </nav>
);

// Language Toggle Component
const LanguageToggle = ({ language, setLanguage }) => (
  <div className="lang-toggle">
    {['both', 'zh', 'en'].map(lang => (
      <button
        key={lang}
        className={`lang-btn ${language === lang ? 'active' : ''}`}
        onClick={() => setLanguage(lang)}
      >
        {lang === 'both' ? '雙' : lang === 'zh' ? '中' : 'En'}
      </button>
    ))}
  </div>
);

// Hero Section Component
const HeroSection = () => (
  <section className="hero">
    <div className="hero-content">
      <h1 className="hero-chinese">秋興八首</h1>
      <p className="hero-english">Autumn Stirrings</p>
      <p className="hero-poet">Du Fu 杜甫</p>
      <p className="hero-subtitle">Eight Poems · 766 CE · Kuizhou</p>
    </div>
    <div className="scroll-hint">
      <span>Scroll to explore</span>
      <div className="scroll-line"></div>
    </div>
  </section>
);

// Context Section Component
const ContextSection = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="context-section">
      <div ref={ref} className={`context-content ${visible ? 'visible' : ''}`}>
        <div className="context-year">766</div>
        <h2 className="context-title">A Poet in Exile</h2>
        <p className="context-text">
          [Placeholder: Historical context about Du Fu's exile in Kuizhou after the An Lushan Rebellion. 
          Description of his circumstances, the fallen Tang dynasty, and his longing for the capital Chang'an.]
        </p>
        <div className="location-badge">
          <span className="chinese">夔州</span>
          <span>→</span>
          <span className="chinese">長安</span>
          <span style={{ marginLeft: '1rem', color: 'var(--mountain-grey)' }}>1,500 li apart</span>
        </div>
      </div>
    </section>
  );
};

// Poem Section Component
const PoemSection = ({ poem, index, language, highlightedLine, setHighlightedLine, onImageryClick }) => {
  const chineseRef = useRef(null);
  const englishRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (chineseRef.current) observer.observe(chineseRef.current);
    return () => observer.disconnect();
  }, []);

  const handleLineHover = (lineIndex, hasImagery) => {
    setHighlightedLine(lineIndex);
    if (hasImagery && poem.imagery[lineIndex]) {
      onImageryClick(poem.imagery[lineIndex]);
    }
  };

  return (
    <section className="poem-section" id={`poem-${index + 1}`}>
      <div className="poem-number">{poem.number}</div>
      <div className="poem-container">
        <div 
          ref={chineseRef}
          className={`poem-chinese-block ${visible ? 'visible' : ''} ${language === 'en' ? 'hidden' : ''}`}
        >
          <div className="poem-chinese">
            {poem.chinese.map((line, i) => (
              <span
                key={i}
                className={`poem-line ${highlightedLine === i ? 'highlighted' : ''}`}
                onMouseEnter={() => handleLineHover(i, !!poem.imagery[i])}
                onMouseLeave={() => setHighlightedLine(null)}
              >
                {line}
              </span>
            ))}
          </div>
        </div>
        <div 
          ref={englishRef}
          className={`poem-english-block ${visible ? 'visible' : ''} ${language === 'zh' ? 'hidden' : ''}`}
        >
          <div className="poem-english">
            {poem.english.map((line, i) => (
              <p
                key={i}
                className={`poem-english-line ${highlightedLine === i ? 'highlighted' : ''}`}
                onMouseEnter={() => setHighlightedLine(i)}
                onMouseLeave={() => setHighlightedLine(null)}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Map Section Component
const MapSection = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="map-section">
      <div ref={ref} className={`map-container ${visible ? 'visible' : ''}`}>
        <h2 className="map-title">The Distance Between</h2>
        <div className="map-visual">
          <div className="map-path"></div>
          <div className="map-location kuizhou">
            <span className="chinese">夔州</span>
            <span className="english">Kuizhou</span>
          </div>
          <div className="map-location changan">
            <span className="chinese">長安</span>
            <span className="english">Chang'an</span>
          </div>
          <div className="map-distance">
            <span className="number">~1,500</span>
            <span className="unit">li (里) · approximately 750 km</span>
          </div>
        </div>
        <p className="map-caption">"Following the Northern Dipper, I gaze toward the capital"</p>
      </div>
    </section>
  );
};

// Imagery Panel Component
const ImageryPanel = ({ imagery, onClose }) => (
  <div className={`imagery-panel ${imagery ? 'visible' : ''}`}>
    {imagery && (
      <>
        <div className="imagery-chinese">{imagery.chinese}</div>
        <div className="imagery-content">
          <h3>{imagery.title}</h3>
          <p>{imagery.description}</p>
        </div>
        <button className="imagery-close" onClick={onClose}>Close</button>
      </>
    )}
  </div>
);

// Footer Component
const Footer = () => (
  <footer>
    <div className="footer-quote">[飄飄何所似 天地一沙鷗]</div>
    <p className="footer-translation">[Drifting, drifting—what am I like? A lone gull between heaven and earth.]</p>
    <p className="footer-info">
      EALC 145 · Introduction to Chinese Culture, Art, and Literature<br />
      Creative Project · [Your Name] · Fall 2025
    </p>
  </footer>
);

// Main App Component
export default function AutumnStirrings() {
  const [language, setLanguage] = useState('both');
  const [activePoem, setActivePoem] = useState(1);
  const [highlightedLine, setHighlightedLine] = useState(null);
  const [activeImagery, setActiveImagery] = useState(null);

  // Update active poem on scroll
  useEffect(() => {
    const handleScroll = () => {
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

  const scrollToPoem = (num) => {
    const section = document.getElementById(`poem-${num}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <Navigation activePoem={activePoem} onPoemClick={scrollToPoem} />
        <LanguageToggle language={language} setLanguage={setLanguage} />
        
        <HeroSection />
        <ContextSection />
        
        {poemsData.map((poem, index) => (
          <PoemSection
            key={index}
            poem={poem}
            index={index}
            language={language}
            highlightedLine={highlightedLine}
            setHighlightedLine={setHighlightedLine}
            onImageryClick={setActiveImagery}
          />
        ))}
        
        <MapSection />
        <Footer />
        
        <ImageryPanel 
          imagery={activeImagery} 
          onClose={() => setActiveImagery(null)} 
        />
      </div>
    </>
  );
}
