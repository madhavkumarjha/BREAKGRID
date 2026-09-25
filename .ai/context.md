# Project Context — BREAKGRID

> State snapshot and technical summary of **BREAKGRID** for AI context window hydration.

---

## 1. Executive Summary

**BREAKGRID** is a production-ready 2D synthwave arcade brick breaker game built with React 18, Vite 5, HTML5 2D Canvas, and Web Audio API synthesis.

---

## 2. Core Technical Specifications

- **Framework & Build**: Vite 5 + React 18 (`src/App.jsx`, `src/main.jsx`).
- **Canvas Physics Engine**: `src/engine/game.js` — class `BreakoutGame`. Handles ball velocity vectors, paddle deflection geometry, brick destruction collision matrix, falling capsules, laser projectiles, and boss AI state machines.
- **Audio Synthesizer**: `src/engine/audio.js` — class `SoundEngine`. Synthesizes square/sawtooth/sine oscillator tones, white noise explosion bursts, and pitch sweeps using native Web Audio API.
- **Particle System**: `src/engine/particles.js` — class `ParticleEngine`. Handles particle explosions, trails, floating score popups, and screen shake impulse decay.

---

## 3. Game Content Roster

### 3.1 Handcrafted Levels (`src/engine/levels.js`)
1. **Level 1 — Neon Waves**: Introductory level with standard cyan/pink/yellow brick rows.
2. **Level 2 — Cyber Fortress**: Unbreakable corner pillars protecting reinforced brick arches.
3. **Level 3 — Explosive Grid**: High-density explosive brick matrix triggering chain reactions.
4. **Level 4 — Retro Invader**: Invader pixel sprite structure composed of reinforced bricks.
5. **Level 5 — Diamond Citadel**: Diamond citadel layout with central power-up caches.
6. **Level 6 — THE CORE (Boss)**: Central boss entity (150 HP) with health bar and protective shield bricks.

### 3.2 Brick Types
- `S` — Standard Brick (1 hit, 100 * combo pts, Cyan `#00F0FF`).
- `R` — Reinforced Brick (2 hits, 200 * combo pts, Amber `#FFB800`).
- `E` — Explosive Brick (1 hit, 300 * combo pts, Magenta `#FF2079`, radial AoE blast).
- `U` — Unbreakable Brick (0 damage, deflects ball, Purple `#A020F0`, top pillars only).
- `P` — Power-Up Brick (1 hit, 150 * combo pts, Lime `#39FF88`, spawns falling capsule).

### 3.3 Power-Up Types (`src/engine/powerups.js` & `game.js`)
- `MULTIBALL` (⚽): Instant — Spawns 2 extra active energy balls into play.
- `ENLARGE` (↔️): 12 sec — Expands paddle width by +50% (`baseWidth * 1.5`).
- `LASER` (🔫): 10 sec — Equips dual wing cannons to fire laser beams (`Space`/Click/Tap).
- `FIREBALL` (🔥): 8 sec — Ball burns through bricks without deflecting.
- `MAGNET` (🧲): 10 sec — Holds ball on paddle upon reflection until launched.
- `SLOW` (⏳): 8 sec — Reduces ball speed by 30% (`0.7x`), restoring speed upon expiry.
- `SHIELD` (🛡️): Static Barrier — Places a bottom energy shield protecting against 1 ball drop.

---

## 4. Current Repository Audit Status

All critical bugs, audio context resume, touch controls, level bottlenecks, and storage migrations have been fully resolved and audited in `docs/bugs/BUGS_AND_MISSING.md` and logged in `docs/DECISIONS.md`.
