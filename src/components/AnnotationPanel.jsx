import React from 'react';

export const AnnotationPanel = ({ annotation, onClose }) => (
  <div className={`annotation-panel ${annotation ? 'visible' : ''}`}>
    {annotation && (
      <>
        <div className="annotation-term">{annotation.term}</div>
        <div className="annotation-content">
          <h3>{annotation.title}</h3>
          <p>{annotation.description}</p>
        </div>
        <button className="annotation-close" onClick={onClose}>Close</button>
      </>
    )}
  </div>
);
