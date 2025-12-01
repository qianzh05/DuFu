import React, { useState, useEffect, useRef } from 'react';
import { journeyData } from '../data/journeyData';

export const JourneyMap = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeLocation, setActiveLocation] = useState(null);
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);

  const startAnimation = () => {
    setAnimationStep(0);
    setIsAnimating(true);

    intervalRef.current = setInterval(() => {
      setAnimationStep(prev => {
        if (prev >= journeyData.length) {
          clearInterval(intervalRef.current);
          setIsAnimating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
  };

  const handleReplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    startAnimation();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimating && animationStep === 0) {
          setVisible(true);
          startAnimation();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <section className="journey-section" id="journey">
      <div ref={ref} className={`journey-container ${visible ? 'visible' : ''}`}>
        <div className="journey-header">
          <div>
            <h2 className="journey-title">A Life of Wandering</h2>
            <p className="journey-subtitle">Du Fu's journey across Tang China (712-770 CE)</p>
          </div>
          <button
            className="replay-button"
            onClick={handleReplay}
            aria-label="Replay journey animation"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
              <path d="M3 21v-5h5"/>
            </svg>
            Replay Journey
          </button>
        </div>

        <div className="journey-map">
          <svg viewBox="0 0 100 80" className="china-map-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(201, 162, 39, 0.15)" />
                <stop offset="100%" stopColor="rgba(139, 107, 58, 0.1)" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <path
              className="china-outline"
              d="M18,25 L22,20 L28,18 L35,15 L42,12 L50,10 L58,8 L65,10 L72,8 L78,12 L82,18 L85,15 L88,20 L90,28 L88,35 L85,32 L82,35 L85,42 L82,48 L78,52 L80,58 L76,62 L72,58 L68,62 L72,68 L68,72 L62,70 L58,74 L52,72 L48,68 L44,72 L38,70 L35,65 L32,68 L28,65 L25,60 L22,55 L18,52 L15,48 L12,42 L10,35 L12,28 L15,25 Z"
              fill="url(#landGradient)"
              stroke="rgba(201, 162, 39, 0.4)"
              strokeWidth="0.3"
            />

            <path
              className="provinces"
              d="M35,35 Q42,32 50,35 M32,45 Q40,42 48,45 Q55,48 62,45 M38,55 Q48,52 58,55"
              fill="none"
              stroke="rgba(201, 162, 39, 0.15)"
              strokeWidth="0.2"
              strokeDasharray="1,2"
            />

            <path
              className="river yellow-river"
              d="M22,32 Q28,28 35,30 Q42,25 48,28 Q52,32 48,38 Q52,42 58,40 Q65,38 72,42 Q78,45 82,42"
              fill="none"
              stroke="rgba(201, 162, 39, 0.5)"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
            <text x="70" y="38" className="river-label" fill="rgba(201, 162, 39, 0.4)" fontSize="2.5" fontStyle="italic">黄河</text>

            <path
              className="river yangtze"
              d="M18,52 Q25,50 32,52 Q38,50 43,52 Q48,55 55,52 Q62,50 68,55 Q75,58 82,55"
              fill="none"
              stroke="rgba(74, 102, 112, 0.7)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <text x="60" y="50" className="river-label" fill="rgba(74, 102, 112, 0.5)" fontSize="2.5" fontStyle="italic">长江</text>

            <text x="25" y="48" className="region-label" fill="rgba(201, 162, 39, 0.25)" fontSize="3">蜀</text>
            <text x="55" y="35" className="region-label" fill="rgba(201, 162, 39, 0.25)" fontSize="3">中原</text>
            <text x="75" y="58" className="region-label" fill="rgba(201, 162, 39, 0.25)" fontSize="3">江南</text>

            {animationStep > 0 && (
              <path
                className="journey-path"
                d={`M${journeyData.slice(0, animationStep).map(l => `${l.x},${l.y}`).join(' L')}`}
                fill="none"
                stroke="var(--autumn-red)"
                strokeWidth="0.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="2,1"
                style={{ opacity: visible ? 0.8 : 0, transition: 'opacity 0.5s ease' }}
              />
            )}

            {journeyData.map((loc, i) => {
              const isActive = activeLocation === loc.id;
              const isVisible = i < animationStep;
              // different colors for each location type
              const markerColor = loc.type === 'birth' ? '#4ade80' :
                                  loc.type === 'capital' ? '#fbbf24' :
                                  loc.type === 'death' ? '#94a3b8' :
                                  loc.highlight ? '#ef4444' :
                                  '#60a5fa';
              return (
                <g
                  key={loc.id}
                  className={`location-marker ${isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${i * 0.4}s` }}
                >
                  <circle
                    cx={loc.x}
                    cy={loc.y}
                    r="4"
                    fill="transparent"
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setActiveLocation(loc.id)}
                    onMouseLeave={() => setActiveLocation(null)}
                  />
                  {isActive && (
                    <circle
                      cx={loc.x}
                      cy={loc.y}
                      r="3"
                      fill="none"
                      stroke={markerColor}
                      strokeWidth="0.3"
                      opacity="0.8"
                    />
                  )}
                  <circle
                    cx={loc.x}
                    cy={loc.y}
                    r={loc.highlight ? 2.2 : isActive ? 1.9 : 1.4}
                    fill={markerColor}
                    stroke="var(--paper)"
                    strokeWidth="0.5"
                    filter={loc.highlight ? "url(#glow)" : undefined}
                    style={{ transition: 'r 0.2s ease' }}
                  />
                  {loc.highlight && (
                    <circle
                      cx={loc.x}
                      cy={loc.y}
                      r="4"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="0.3"
                      className="pulse-ring"
                    />
                  )}
                  <text
                    x={loc.x}
                    y={loc.y - 3}
                    textAnchor="middle"
                    fill="var(--paper)"
                    fontSize="2"
                    opacity={isActive ? 1 : 0.8}
                    style={{ transition: 'opacity 0.2s ease', pointerEvents: 'none' }}
                  >
                    {i + 1}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className={`journey-info ${activeLocation ? 'visible' : ''}`}>
          {activeLocation && (() => {
            const loc = journeyData.find(l => l.id === activeLocation);
            return (
              <>
                <div className="info-year">{loc.year}</div>
                <div className="info-place">
                  <span className="info-chinese">{loc.place}</span>
                  <span className="info-english">{loc.english}</span>
                </div>
                <p className="info-event">{loc.event}</p>
              </>
            );
          })()}
        </div>

        <div className="journey-legend">
          <div className="legend-item">
            <span className="legend-dot birth"></span>
            <span>Birthplace</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot capital"></span>
            <span>Capital City</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot poetry"></span>
            <span>秋兴八首 Written Here</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot travel"></span>
            <span>Travels / Exile</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot death"></span>
            <span>Final Journey</span>
          </div>
        </div>

        <div className="journey-quote">
          <p className="quote-chinese">支离东北风尘际，漂泊西南天地间</p>
          <p className="quote-english">"Torn apart amid the dust of the northeast, / Drifting through the southwest between heaven and earth."</p>
        </div>
      </div>
    </section>
  );
};
