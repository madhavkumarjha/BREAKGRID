# BREAKGRID

> A modern, vibrant 2D Cyberpunk Arcade Brick Breaker with Boss Encounters, built with Vite + React.

---

## 1. What This Project Is

**BREAKGRID** is a 2D arcade brick breaker game set in a retro-futuristic synthwave world. The player controls a high-tech paddle to reflect active energy balls, shatter various brick types, collect falling power-up capsules, build combo multipliers, and conquer escalating levels culminating in a final Boss Encounter against "THE CORE".

**One-line pitch:** A fast, polished, React-powered arcade brick breaker with Web Audio synthesis, multi-ball chaos, laser cannons, and boss battles.

---

## 2. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | React 18 | Declarative UI state, overlays, and modal management |
| Build Tool | Vite 5 | Fast dev server (`npm run dev`) and production bundles |
| Rendering Engine | HTML5 2D Canvas | High performance physics, particle effects, and screen shake |
| Audio | Web Audio API | Procedural retro sound synthesis — 0 external audio files needed |
| Styling | Modern Vanilla CSS | Glassmorphism, neon glow accents, responsive layout |
| Target Platforms | Web (Desktop & Mobile) | Keyboard, Mouse, and Touch Drag controls |

---

## 3. Quick Setup

```bash
# Clone the repo
git clone <repo-url>
cd neon-breakout

# Install dependencies
npm install

# Run local dev server
npm run dev

# Build for production
npm run build
```

**Requirements:**
- Node.js 18+
- npm 9+

---

## 4. Clean Folder Structure

```
📦 d:/2D Cyberpunk/
│
├── 📄 README.md                → Project Overview & Quick Start (You are here)
├── 📄 package.json             → Vite + React dependencies & scripts
├── 📄 vite.config.js           → Vite server configuration
├── 📄 index.html               → Entrypoint HTML template
├── 📄 style.css                → Neon glassmorphism theme stylesheet
│
├── 📂 src/                     → React & Game Engine Source Code
│   ├── 📄 main.jsx             → React DOM root mount
│   ├── 📄 App.jsx              → Main App component & render loop
│   │
│   ├── 📂 components/          → UI Overlay & HUD Components
│   │   ├── 📄 HUD.jsx          → Score, High Score, Lives, Combo header
│   │   └── 📄 Overlays.jsx     → Menu, Level Select, Pause, Game Over, Win screens
│   │
│   └── 📂 engine/              → Core Game Physics & Audio Engine
│       ├── 📄 game.js          → Paddle, ball physics, collision matrix, boss AI
│       ├── 📄 audio.js         → Web Audio API sound synthesizer
│       ├── 📄 particles.js     → Particle debris, trails, shockwaves, floating text
│       ├── 📄 levels.js        → Handcrafted level grid schemas & boss specs
│       └── 📄 powerups.js      → Item drops & active power-up timer states
│
└── 📂 docs/                    → Full Project Documentation Kit
    ├── 📄 PRD.md               → Product Requirement Document
    ├── 📄 GDD.md               → Game Design Document
    ├── 📄 ARCHITECTURE.md      → System Architecture & Component Spec
    ├── 📄 PRODUCT_SPEC.md      → Feature & Audio Specifications
    ├── 📄 DECISIONS.md          → Architecture Decision Records (ADRs)
    ├── 📄 MASTER_ROADMAP.md    → Version Roadmap & Future Releases
    ├── 📄 v1_MVP_SCOPE.md      → Shipped V1 Scope
    ├── 📄 ART_STYLE_GUIDE.md   → Neon Visual Identity & Theme
    ├── 📄 UI_UX_FLOW.md        → Screen Navigation & Layout Specs
    └── 📄 rules.md             → Coding Standards & Guidelines
```

---

## 5. Documentation Index (`docs/`)

All project documentation lives cleanly inside the [`docs/`](file:///d:/2D%20Cyberpunk/docs) directory:

- [docs/PRD.md](file:///d:/2D%20Cyberpunk/docs/PRD.md)
- [docs/GDD.md](file:///d:/2D%20Cyberpunk/docs/GDD.md)
- [docs/ARCHITECTURE.md](file:///d:/2D%20Cyberpunk/docs/ARCHITECTURE.md)
- [docs/PRODUCT_SPEC.md](file:///d:/2D%20Cyberpunk/docs/PRODUCT_SPEC.md)
- [docs/DECISIONS.md](file:///d:/2D%20Cyberpunk/docs/DECISIONS.md)
- [docs/MASTER_ROADMAP.md](file:///d:/2D%20Cyberpunk/docs/MASTER_ROADMAP.md)
- [docs/v1_MVP_SCOPE.md](file:///d:/2D%20Cyberpunk/docs/v1_MVP_SCOPE.md)
