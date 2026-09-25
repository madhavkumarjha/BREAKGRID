# DECISIONS.md — Architecture & Design Decision Records

> Architectural and design decisions logged for **BREAKGRID**.

---

## Decision #001: Pivot Project Concept to BREAKGRID (Arcade Brick Breaker)
- **Status**: Accepted
- **Context**: The legacy top-down shooter spec ("Neon Protocol") was created by mistake. The requirement is a 2D Arcade Brick Breaker game.
- **Decision**: Built a fresh 2D Arcade Brick Breaker ("BREAKGRID") with boss battles, multi-ball mechanics, laser cannons, power-up capsules, and Web Audio synthesis.

---

## Decision #002: Adopt Vite + React Stack
- **Status**: Accepted
- **Context**: Modern web app structure requires fast HMR dev servers and clean UI component overlays.
- **Decision**: Built application on React 18 + Vite 5 (`package.json`, `vite.config.js`, `src/App.jsx`, `src/components/`).

---

## Decision #003: Procedural Web Audio API for Sound Effects
- **Status**: Accepted
- **Context**: Relying on external `.wav` or `.mp3` audio files introduces missing asset risks, CORS issues, and slower load times.
- **Decision**: Implemented `src/engine/audio.js` using Web Audio API synthesis for zero external audio asset dependencies.

---

## Decision #004: Native Mobile Touch & Gesture Input System
- **Status**: Accepted
- **Context**: Mobile browsers require touch drag and tap input handling with passive scroll cancellation.
- **Decision**: Added `touchstart`, `touchmove`, and `touchend` event handlers to `src/engine/game.js` for seamless paddle movement and ball launches on mobile devices.

---

## Decision #005: Duration-Based Speed Reset for Slow-Motion Power-Up
- **Status**: Accepted
- **Context**: The `SLOW` power-up permanently reduced ball velocity (`0.7x`) without restoring original speed upon timer expiry.
- **Decision**: Added active timer state tracking in `src/engine/game.js` to multiply velocity by `/= 0.7` when the `SLOW` duration expires.

---

## Decision #006: Brick-Specific Score Multipliers
- **Status**: Accepted
- **Context**: Flat score values for all brick types degraded combo multiplier progression.
- **Decision**: Implemented brick-specific point formulas in `damageBrick()`: Standard (`100 * combo`), Reinforced (`200 * combo`), Explosive (`300 * combo`), Power-Up (`150 * combo`).

---

## Decision #007: Spatial Clearance for Boss Encounters
- **Status**: Accepted
- **Context**: On Level 6 ("THE CORE"), the boss spawned at `y: 90` with height `50`, overlapping top brick rows at `y: 96`.
- **Decision**: Repositioned Boss to `y: 40` and set brick grid `marginTop: 105` on boss levels to prevent spatial collision overlaps.

---

## Decision #008: Open-Channel Brick Layouts for Unbreakable Blocks
- **Status**: Accepted
- **Context**: Unbreakable (`U`) bricks on lower grid rows created impenetrable wedge traps in early levels.
- **Decision**: Redesigned brick matrices in `src/engine/levels.js` to restrict Unbreakable bricks to top pillars, ensuring side bounce channels remain open.

---

## Decision #009: Clean Engine Modularization & Legacy File Deletion
- **Status**: Accepted
- **Context**: Orphaned legacy scripts existed in `src/` root alongside the structured `src/engine/` module folder.
- **Decision**: Removed all 6 root orphan files (`src/game.js`, `src/levels.js`, `src/particles.js`, `src/powerups.js`, `src/audio.js`, `src/ui.js`) to maintain a clean codebase.

---

## Decision #010: High Score LocalStorage Migration
- **Status**: Accepted
- **Context**: Storage key needed alignment with the official game title `breakgrid`.
- **Decision**: Standardized on `breakgrid_high_score` key while providing fallback migration from legacy `breakout_high_score`.
