# Solo-Traveler Safety Panel - Component Guide

## 📌 Overview
The `SafetyPanel` component provides solo travelers in Sri Lanka with:
- **Emergency Hotlines**: Direct dial & copy buttons for Tourist Police (1912), Police (119), Ambulance (1990), etc.
- **Curated Safety Tips**: Categorized guidelines for Solo Female safety, Transport & Scam alerts, Health, and Culture.
- **Live Search & Filter**: Real-time search by keyword, category chips, and risk levels.
- **Emergency Quick-Card Modal**: Offline reference containing numbers and emergency Sinhala/Tamil phrases.

---

## 🚀 How to Integrate

Import and render `<SafetyPanel />` anywhere in the app (e.g. inside `App.jsx` or a tab component):

```jsx
import SafetyPanel from './components/SafetyPanel';

function App() {
  return (
    <div>
      <SafetyPanel />
    </div>
  );
}
```

---

## 📂 File Structure
- `src/data/safetyTips.json` - Curated Sri Lanka safety data & emergency numbers.
- `src/components/SafetyPanel.jsx` - Main panel wrapper.
- `src/components/EmergencyNumbers.jsx` - Hotline cards grid with call & copy actions.
- `src/components/SafetyTipCard.jsx` - Individual safety tip card with risk levels & accordion view.
- `src/components/EmergencyModal.jsx` - Pocket emergency reference modal.
