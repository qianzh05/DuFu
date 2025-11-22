import React from 'react';

export const Footer = () => (
  <footer>
    <div className="footer-quote">飘飘何所似 天地一沙鸥</div>
    <p className="footer-translation">"Drifting, drifting—what am I like? / A lone sandpiper between heaven and earth."</p>
    <p className="footer-attribution">— Du Fu, "Travelling at Night"</p>
    <div className="footer-divider"></div>
    <p className="footer-info">
      An interactive exploration of Du Fu's masterpiece<br />
      秋兴八首 · Eight Poems of Autumn Stirrings<br /><br />
      Created for EALC 145: Introduction to Chinese Literature<br />
      Fall 2025
    </p>
    <div className="footer-divider"></div>
    <div className="footer-sources">
      <h4>Sources & References</h4>
      <ul>
        <li>Owen, Stephen. <em>An Anthology of Chinese Literature: Beginnings to 1911</em>. New York: W.W. Norton, 1996. pp. 413-441. (English translations adapted from this authoritative source)</li>
        <li>Owen, Stephen. <em>The Poetry of Du Fu</em>. De Gruyter, 2016. (Complete scholarly translation)</li>
        <li>古詩文網 (gushiwen.cn) — Original text, annotations, and traditional commentary</li>
        <li>搜韻 (sou-yun.cn) — Textual variants and prosodic analysis</li>
        <li>Chou, Eva Shan. <em>Reconsidering Tu Fu: Literary Greatness and Cultural Context</em>. Cambridge UP, 1995.</li>
      </ul>
    </div>
  </footer>
);
