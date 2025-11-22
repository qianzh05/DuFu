import React from 'react';

export const Controls = ({ language, setLanguage, showPinyin, setShowPinyin }) => (
  <div className="controls">
    <div className="lang-toggle">
      {['both', 'zh', 'en'].map(lang => (
        <button
          key={lang}
          className={`lang-btn ${language === lang ? 'active' : ''}`}
          onClick={() => setLanguage(lang)}
          title={lang === 'both' ? 'Show both languages' : lang === 'zh' ? 'Chinese only' : 'English only'}
        >
          {lang === 'both' ? '雙' : lang === 'zh' ? '中' : 'En'}
        </button>
      ))}
    </div>
    <button
      className={`pinyin-toggle ${showPinyin ? 'active' : ''}`}
      onClick={() => setShowPinyin(!showPinyin)}
      title="Toggle pinyin"
    >
      拼音
    </button>
  </div>
);
