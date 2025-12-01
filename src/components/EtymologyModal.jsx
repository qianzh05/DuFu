import React from 'react';
import { etymologyData } from '../data/etymologyData';

export const EtymologyModal = ({ character, onClose }) => {
  if (!character) return null;

  const data = etymologyData[character];
  
  if (!data) {
    return (
      <div className="etymology-overlay" onClick={onClose}>
        <div className="etymology-modal" onClick={(e) => e.stopPropagation()}>
          <button className="etymology-close" onClick={onClose}>✕</button>
          <div className="etymology-content">
            <div className="etymology-main-char">{character}</div>
            <p className="etymology-not-found">
              Etymology data not available for this character.
              <br />
              <span className="etymology-hint">We have detailed information for: 秋 江 心 泪 山 月 风 雨 花 云 孤 故 伤 望 思</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="etymology-overlay" onClick={onClose}>
      <div className="etymology-modal" onClick={(e) => e.stopPropagation()}>
        <button className="etymology-close" onClick={onClose}>✕</button>
        
        <div className="etymology-content">
          {/* Main Character Display */}
          <div className="etymology-header">
            <div className="etymology-main-char">{data.character}</div>
            <div className="etymology-basic-info">
              <div className="etymology-pinyin">{data.pinyin}</div>
              <div className="etymology-meaning">{data.meaning}</div>
            </div>
          </div>

          {/* Radical Breakdown */}
          <div className="etymology-section">
            <h3 className="etymology-section-title">Radical & Components</h3>
            <div className="etymology-radical-box">
              <div className="radical-item">
                <span className="radical-char">{data.radical}</span>
                <span className="radical-label">{data.radicalMeaning}</span>
              </div>
            </div>
            <div className="etymology-components">
              {data.components.map((comp, idx) => (
                <span key={idx} className="component-tag">{comp}</span>
              ))}
            </div>
          </div>

          {/* Etymology Explanation */}
          <div className="etymology-section">
            <h3 className="etymology-section-title">Etymology</h3>
            <p className="etymology-explanation">{data.etymology}</p>
          </div>

          {/* Examples from Poems */}
          <div className="etymology-section">
            <h3 className="etymology-section-title">In Du Fu's Poems</h3>
            <div className="etymology-examples">
              {data.examples.map((ex, idx) => (
                <div key={idx} className="example-item">
                  <div className="example-chinese">{ex.text}</div>
                  <div className="example-translation">"{ex.translation}"</div>
                  <div className="example-context">{ex.context}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
