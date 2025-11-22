import React from 'react';
import { poemsData } from '../data/poemsData';

export const Navigation = ({ activePoem, onPoemClick, scrolled }) => (
  <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
    <div>
      <div className="nav-title">Autumn Stirrings</div>
      <div className="nav-chinese">秋興八首</div>
    </div>
    <div className="poem-indicators">
      {['一','二','三','四','五','六','七','八'].map((num, i) => (
        <div
          key={i}
          data-num={num}
          className={`poem-dot ${activePoem === i + 1 ? 'active' : ''}`}
          onClick={() => onPoemClick(i + 1)}
          title={`Poem ${i + 1}: ${poemsData[i].title}`}
        />
      ))}
    </div>
  </nav>
);
