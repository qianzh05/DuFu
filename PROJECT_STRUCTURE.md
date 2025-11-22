# Autumn Stirrings - 秋兴八首

An interactive exploration of Du Fu's masterpiece "Eight Poems of Autumn Stirrings"

## 📁 Project Structure

```
src/
├── AutumnStirrings.jsx          # Main application component
├── AutumnStirrings.old.jsx      # Original monolithic file (backup)
│
├── data/                         # Data modules
│   ├── index.js                  # Data barrel export
│   ├── poemsData.js              # All 8 poems with translations & annotations
│   ├── historicalContext.js     # Historical background information
│   ├── keyImagery.js             # Key symbols and imagery
│   └── journeyData.js            # Du Fu's life journey data
│
├── components/                   # React components
│   ├── index.js                  # Component barrel export
│   ├── Navigation.jsx            # Top navigation with poem indicators
│   ├── Controls.jsx              # Language and pinyin toggles
│   ├── HeroSection.jsx           # Landing page with title
│   ├── FallingLeaves.jsx         # Animated falling leaves
│   ├── ContextSection.jsx        # Historical context section
│   ├── PoemLine.jsx              # Character & PoemLine components
│   ├── PoemSection.jsx           # Individual poem display
│   ├── ImagerySection.jsx        # Key imagery cards
│   ├── JourneyMap.jsx            # Interactive map of Du Fu's travels
│   ├── TimelineSection.jsx       # Timeline of Du Fu's life
│   ├── AnnotationPanel.jsx       # Sliding annotation panel
│   └── Footer.jsx                # Footer with sources
│
└── styles/
    └── AutumnStirrings.css       # All styles (1500+ lines)
```

## 🎯 Benefits of This Structure

### Before (2697 lines in one file)
- ❌ Hard to navigate
- ❌ Difficult to maintain
- ❌ Slow editor performance
- ❌ Components tightly coupled with data
- ❌ Hard to test individual pieces

### After (Modular structure)
- ✅ Each file is 50-300 lines
- ✅ Easy to find and edit specific components
- ✅ Data separated from UI logic
- ✅ Components are reusable
- ✅ Better for team collaboration
- ✅ Easier to test
- ✅ Faster editor performance

## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📦 Component Dependencies

```
AutumnStirrings (main)
├── Navigation (uses poemsData)
├── Controls
├── HeroSection
│   └── FallingLeaves
├── ContextSection (uses historicalContext)
├── PoemSection × 8 (uses poemsData)
│   └── PoemLine
│       └── Character
├── ImagerySection (uses keyImagery)
├── JourneyMap (uses journeyData)
├── TimelineSection
├── AnnotationPanel
└── Footer
```

## 📝 Notes

- Original file backed up as `AutumnStirrings.old.jsx`
- All functionality preserved
- No changes to user experience
- Easier to maintain and extend

## 🎨 Styling

All styles remain in a single CSS file (`styles/AutumnStirrings.css`) for:
- Easier theme management
- Better CSS variable usage
- Simpler media queries
- Consistent design system

---

**Course**: EALC 145 - Introduction to Chinese Literature  
**Fall 2025**
