# AGENT.md — AI Agent Workspace Instructions & Rulebook

> Instructions and guidelines for AI agents working on **BREAKGRID**.

---

## 1. Core Project Overview

**BREAKGRID** is a 2D Cyberpunk Arcade Brick Breaker game built with **Vite 5 + React 18**.
- **Rendering**: HTML5 2D Canvas inside React root.
- **Audio Engine**: Web Audio API procedural synthesis (`src/engine/audio.js`). Zero external `.wav`/`.mp3` assets required.
- **Styling**: Modern Vanilla CSS (`style.css`) with glassmorphism and neon accents. No TailwindCSS.
- **Input**: Desktop (Mouse, Keyboard) and Mobile Touch drag/tap with passive scroll prevention.

---

## 2. Codebase Architecture

```
src/
├── main.jsx             → React DOM mount point
├── App.jsx              → Top-level React state manager & active power-up HUD
├── components/
│   ├── HUD.jsx          → In-game header (Score, Lives, Combo, High Score)
│   └── Overlays.jsx     → Menu, Level Select, Pause, Game Over, Victory modals
└── engine/
    ├── game.js          → Main canvas physics loop, paddle, ball, brick matrix, boss AI
    ├── audio.js         → Web Audio API sound generator
    ├── particles.js     → Particle debris, spark explosion, float text, screen shake
    ├── levels.js        → Handcrafted level matrix schemas (Levels 1 to 6)
    └── powerups.js      → Falling capsule items & active duration handlers
```

---

## 3. Strict Rules for AI Agents

1. **No External Image/Audio Assets**: All gameplay visual elements (paddle, bricks, balls, boss, particles) are rendered using native 2D Canvas context routines. All sound effects are procedurally generated in `src/engine/audio.js`.
2. **Preserve Engine & UI Boundary**:
   - `src/engine/*` classes do NOT contain React hooks or JSX.
   - `src/App.jsx` handles state synchronization via `game.onStateUpdate = (state) => { ... }`.
3. **Audio Context Safety**: Web Audio API `AudioContext` must be resumed on user gesture (`click`, `touchstart`, menu start). Never invoke audio constructor without user gesture handling.
4. **Touch Input Compatibility**: Keep touch drag (`touchstart`, `touchmove`, `touchend`) active on canvas to prevent scroll locking on mobile devices.
5. **Score Formula Integrity**:
   - Standard Brick: `100 * combo`
   - Reinforced Brick: `200 * combo`
   - Explosive Brick: `300 * combo`
   - Power-Up Brick: `150 * combo`
6. **No Phantom Imports**: Always import from `src/engine/*` module files. Do not create orphaned scripts in `src/` root.

---

## 4. Verification Protocol

Before completing any feature or bug fix:
1. Run `npm run build` to verify clean compilation without lint or JSX errors.
2. Ensure touch and keyboard events are both handled.
3. Validate that `breakgrid_high_score` local storage updates correctly.
