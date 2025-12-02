import React from 'react';
import { etymologyData } from '../data/etymologyData';

export const AnnotationPanel = ({ annotation, onClose }) => {
  if (!annotation) return <div className="annotation-panel" />;

  // Handle new combined format (annotation + characters)
  const isCombinedData = annotation.annotation !== undefined || annotation.characters !== undefined;

  if (isCombinedData) {
    const { annotation: annotationData, characters, line } = annotation;

    return (
      <div className="annotation-panel visible">
        {/* Show annotation if present */}
        {annotationData && (
          <>
            <div className="annotation-term">{annotationData.term}</div>
            <div className="annotation-content">
              <h3>{annotationData.title}</h3>
              <p>{annotationData.description}</p>
            </div>
          </>
        )}

        {/* Show etymology for characters in this line */}
        {characters && characters.length > 0 && (
          <div className="etymology-in-panel">
            {annotationData && <div className="panel-divider" />}
            <h3 className="etymology-panel-title">字源 (Character Etymology)</h3>
            <div className="etymology-list">
              {characters.map((char, idx) => {
                const data = etymologyData[char];
                if (!data) return null;

                return (
                  <div key={idx} className="etymology-item">
                    <div className="etymology-char-header">
                      <span className="etymology-char-large">{data.character}</span>
                      <div className="etymology-char-info">
                        <span className="etymology-pinyin-small">{data.pinyin}</span>
                        <span className="etymology-meaning-small">{data.meaning}</span>
                      </div>
                    </div>
                    <div className="etymology-radical-inline">
                      <strong>部首:</strong> {data.radical} ({data.radicalMeaning})
                    </div>
                    <p className="etymology-explanation-brief">{data.etymology}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <button className="annotation-close" onClick={onClose}>Close</button>
      </div>
    );
  }

  // Handle old format (just annotation)
  return (
    <div className="annotation-panel visible">
      <div className="annotation-term">{annotation.term}</div>
      <div className="annotation-content">
        <h3>{annotation.title}</h3>
        <p>{annotation.description}</p>
      </div>
      <button className="annotation-close" onClick={onClose}>Close</button>
    </div>
  );
};
