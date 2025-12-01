import React, { useState, useEffect, useRef } from 'react';
import { historicalContext } from '../data/historicalContext';

export const ContextSection = () => {
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
    <section className="context-section" id="context">
      <div ref={ref} className={`context-content ${visible ? 'visible' : ''}`}>
        <div className="context-year">{historicalContext.year}</div>
        <div className="context-era">{historicalContext.era}</div>
        <h2 className="context-title">A Poet in Exile</h2>
        <p className="context-text">{historicalContext.summary}</p>

        <div className="location-badge">
          <span className="chinese">夔州</span>
          <span className="arrow">→</span>
          <span className="chinese">长安</span>
          <span className="distance">~1,500 li (750 km) apart</span>
        </div>

        <div className="context-bio">
          <h3 className="context-bio-title">
            <span>The Poet-Sage</span>
          </h3>
          <p>{historicalContext.duFuBio}</p>
        </div>
      </div>
    </section>
  );
};
