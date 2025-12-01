import React from 'react';
import { FallingLeaves } from './FallingLeaves';

export const HeroSection = () => (
  <section className="hero" id="hero">
    <FallingLeaves />
    <div className="hero-content">
      <h1 className="hero-chinese">秋兴八首</h1>
      <p className="hero-english">Autumn Stirrings</p>
      <div className="hero-byline">
        <p className="hero-poet">杜甫</p>
        <p className="hero-poet-english">Du Fu (712-770)</p>
      </div>
      <p className="hero-subtitle">Eight Poems Written in Kuizhou, 766 CE</p>
    </div>
    <div className="scroll-hint">
      <span>Scroll to explore</span>
      <div className="scroll-line"></div>
    </div>
  </section>
);
