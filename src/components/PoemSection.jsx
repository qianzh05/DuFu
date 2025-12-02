import React, { useState, useEffect, useRef } from 'react';
import { PoemLine } from './PoemLine';
import { etymologyData } from '../data/etymologyData';

export const PoemSection = ({
  poem,
  index,
  language,
  showPinyin,
  highlightedLine,
  setHighlightedLine,
  onAnnotationClick,
  onCharClick
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleLineClick = (lineIndex, line, event) => {
    const annotation = poem.annotations[lineIndex];
    const charsWithEtymology = line.split('').filter(char => etymologyData[char]);

    // if this line has annotation or etymology, show combined panel
    if (annotation || charsWithEtymology.length > 0) {
      onAnnotationClick({
        annotation: annotation,
        characters: charsWithEtymology,
        line: line
      });
    }
  };

  const onCopy = (text, element) => {
    navigator.clipboard.writeText(text).then(() => {
      element.classList.add('copied');
      setTimeout(() => element.classList.remove('copied'), 1500);
    }).catch(() => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      element.classList.add('copied');
      setTimeout(() => element.classList.remove('copied'), 1500);
    });
  };

  const handlePlayAudio = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const speak = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.75;
      utterance.pitch = 1.1;

      const voices = window.speechSynthesis.getVoices();
      const preferredVoices = [
        'Tingting', 'Sinji', 'Meijia', 'Lili', 'Huihui', 'Yaoyao',
        'Google 普通话', 'Microsoft Huihui', 'Microsoft Yaoyao',
      ];

      let selectedVoice = null;
      for (const prefName of preferredVoices) {
        const found = voices.find(v => v.name.includes(prefName));
        if (found) {
          selectedVoice = found;
          break;
        }
      }

      if (!selectedVoice) {
        selectedVoice = voices.find(v =>
          v.lang.startsWith('zh') &&
          (v.name.toLowerCase().includes('female') ||
           v.name.includes('Ting') ||
           v.name.includes('mei') ||
           v.name.includes('hui'))
        );
      }

      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang.startsWith('zh'));
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      window.speechSynthesis.speak(utterance);
    };

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      speak();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        speak();
      };
      setTimeout(speak, 100);
    }
  };

  return (
    <section className="poem-section" id={`poem-${index + 1}`} ref={ref} data-poem={index + 1}>
      <div className={`poem-header ${visible ? 'visible' : ''}`}>
        <div className="poem-number-display">其{poem.number}</div>
        <h3 className="poem-title-english">{poem.title}</h3>
        <p className="poem-theme">{poem.theme}</p>
      </div>

      <div className={`poem-container ${language === 'both' ? 'bilingual-mode' : ''}`}>
        {language === 'both' ? (
          /* Bilingual mode - lines aligned side by side */
          <div className={`poem-bilingual ${visible ? 'visible' : ''}`}>
            {poem.chinese.map((chLine, i) => (
              <div
                key={i}
                className={`poem-line-pair ${highlightedLine === i ? 'highlighted' : ''}`}
                onMouseEnter={() => setHighlightedLine(i)}
                onMouseLeave={() => setHighlightedLine(null)}
              >
                <div className={`poem-chinese-line ${showPinyin ? 'show-pinyin' : ''}`}>
                  <span
                    className={`poem-line ${poem.annotations[i] ? 'has-annotation' : ''}`}
                    onClick={(e) => { handleLineClick(i, chLine, e); onCopy(chLine, e.currentTarget); }}
                  >
                    <span className="poem-line-inner">
                      <button className="audio-btn" onClick={(e) => { e.stopPropagation(); handlePlayAudio(chLine); }} title="Play pronunciation">
                        🔊
                      </button>
                      <PoemLine
                        line={chLine}
                        pinyin={poem.pinyin[i]}
                        showPinyin={showPinyin}
                        onCharClick={onCharClick}
                      />
                    </span>
                    <span className="copy-feedback">Copied!</span>
                  </span>
                </div>
                <div className="poem-english-line-wrapper">
                  <p className="poem-english-line">
                    {poem.english[i]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Single language mode - original layout */
          <>
            <div className={`poem-chinese-block ${visible ? 'visible' : ''} ${language === 'en' ? 'hidden' : ''}`}>
              <div className={`poem-chinese ${showPinyin ? 'show-pinyin' : ''}`}>
                {poem.chinese.map((line, i) => (
                  <span
                    key={i}
                    className={`poem-line ${highlightedLine === i ? 'highlighted' : ''} ${poem.annotations[i] ? 'has-annotation' : ''} ${showPinyin ? 'show-pinyin-active' : ''}`}
                    onMouseEnter={() => setHighlightedLine(i)}
                    onMouseLeave={() => setHighlightedLine(null)}
                    onClick={(e) => { handleLineClick(i, line, e); onCopy(line, e.currentTarget); }}
                  >
                    <span className="poem-line-inner">
                      <button className="audio-btn" onClick={(e) => { e.stopPropagation(); handlePlayAudio(line); }} title="Play pronunciation">
                        🔊
                      </button>
                      <PoemLine
                        line={line}
                        pinyin={poem.pinyin[i]}
                        showPinyin={showPinyin}
                        onCharClick={onCharClick}
                      />
                    </span>
                    <span className="copy-feedback">Copied!</span>
                  </span>
                ))}
              </div>
            </div>

            <div className={`poem-english-block ${visible ? 'visible' : ''} ${language === 'zh' ? 'hidden' : ''}`}>
              <div className="poem-english">
                {poem.english.map((line, i) => (
                  <p
                    key={i}
                    className={`poem-english-line ${highlightedLine === i ? 'highlighted' : ''}`}
                    onMouseEnter={() => setHighlightedLine(i)}
                    onMouseLeave={() => setHighlightedLine(null)}
                    onClick={() => handleLineClick(i)}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className={`poem-analysis ${visible ? 'visible' : ''}`}>
        <h4>Analysis</h4>
        <p>{poem.analysis}</p>
      </div>
    </section>
  );
};
