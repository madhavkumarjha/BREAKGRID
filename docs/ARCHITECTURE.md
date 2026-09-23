# ARCHITECTURE.md — Technical Architecture: BREAKGRID

> Details technical system design, component structure, state flow, and rendering loop for **BREAKGRID**.

---

## 1. System Architecture Overview

BREAKGRID pairs **React 18** for UI state management, modals, and HUD overlays with a **Canvas 2D Engine** for high-frequency physics, particle simulation, and collision loops.

```
+-------------------------------------------------------------------+
|                           React App.jsx                           |
+-------------------------------------------------------------------+
       |                                             |
       v                                             v
+------------------+                        +-----------------------+
|  React UI Layer  |                        |   HTML5 Canvas (2D)   |
| - HUD.jsx        |                        +-----------------------+
| - Overlays.jsx   |                                    ^
+------------------+                                    |
       ^                                                v
       | (onStateUpdate Callback)             +-------------------+
       +--------------------------------------|  Breakout Engine  |
                                              | - game.js         |
                                              | - audio.js        |
                                              | - particles.js    |
                                              | - levels.js       |
                                              | - powerups.js     |
                                              +-------------------+
```

---

## 2. Component & Module Breakdown

1. **`src/App.jsx`**: Top-level React container. Mounts the HTML5 canvas, manages state notifications from the game engine, and binds the `requestAnimationFrame` render loop.
2. **`src/components/HUD.jsx`**: Glassmorphic header rendering reactive props (Score, High Score, Lives, Combo, Level Name).
3. **`src/components/Overlays.jsx`**: Declarative modal rendering for Main Menu, Level Select grid, Pause, Game Over, and Win screens.
4. **`src/engine/game.js`**: Pure JavaScript Breakout physics engine. Tracks paddle coordinates, ball velocities, laser projectiles, brick grid state, collision matrices, and boss AI.
5. **`src/engine/audio.js`**: Web Audio API sound synthesizer producing procedural SFX on demand.
6. **`src/engine/particles.js`**: Particle emitter handling brick debris, shockwaves, ball trails, and floating score texts.
7. **`src/engine/levels.js`**: Level grid schemas and boss parameters.
8. **`src/engine/powerups.js`**: Power-up item drops and duration timers.

---

## 3. Performance & Rendering Strategy

- **Logical Canvas Resolution**: Fixed at 800x600 px, scaled responsively via CSS (`max-width: 1000px`, `max-height: 750px`).
- **Render Loop**: 60 FPS requestAnimationFrame loop drawing background grid, bottom energy shield, bricks, boss module, paddle, laser beams, item drops, balls, and particles.
- **State Notifications**: Throttled state updates from the game loop to React via `onStateUpdate` callbacks to prevent unnecessary DOM re-renders.
