import React, { useState, useEffect, useRef } from 'react';
import { keyImagery } from '../data/keyImagery';

export const ImagerySection = () => {
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
    <section className="imagery-section" id="imagery" ref={ref}>
      <div className="imagery-title">
        <h2>Key Imagery & Symbols</h2>
        <p>The recurring images that weave through Du Fu's autumn meditation</p>
      </div>
      <div className="imagery-grid" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
        {keyImagery.map((item, i) => (
          <div key={i} className="imagery-card" style={{ transitionDelay: `${i * 0.1}s` }}>
            <div className="imagery-card-chinese">{item.chinese}</div>
            <div className="imagery-card-pinyin">{item.pinyin}</div>
            <div className="imagery-card-english">{item.english}</div>
            <p className="imagery-card-description">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
