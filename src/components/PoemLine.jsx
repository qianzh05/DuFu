import React from 'react';
import { etymologyData } from '../data/etymologyData';

export const Character = ({ char, pinyin, hasEtymology, onCharClick }) => {
  const handleClick = (e) => {
    if (hasEtymology && onCharClick) {
      e.stopPropagation();
      onCharClick(char);
    }
  };

  return (
    <div
      className={`char-container ${hasEtymology ? 'has-etymology' : 'no-etymology'}`}
      onClick={handleClick}
    >
      <span className="pinyin-char">{pinyin}</span>
      <span className="hanzi-char">{char}</span>
    </div>
  );
};

export const PoemLine = ({ line, pinyin, showPinyin, onCharClick }) => {
  if (!showPinyin) {
    return (
      <span className="poem-line-plain">
        {line}
      </span>
    );
  }

  const chars = line.split('');
  const pinyins = pinyin.split(' ');

  return (
    <div className="poem-line-with-pinyin">
      {chars.map((char, i) => (
        <Character
          key={i}
          char={char}
          pinyin={pinyins[i] || ''}
          hasEtymology={!!etymologyData[char]}
          onCharClick={onCharClick}
        />
      ))}
    </div>
  );
};
