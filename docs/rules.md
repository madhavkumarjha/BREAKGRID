# Coding Standards & Guidelines — BREAKGRID

> Defines coding standards, module boundaries, and conventions for **BREAKGRID**.

---

## 1. JavaScript & Code Standards

- **ES6+ Modules**: Modern JavaScript modules (`import` / `export`), native React 18 JSX (`.jsx`).
- **`const` by default**: Use `let` only when variables are reassigned. Never use `var`.
- **Naming Conventions**:
  - `PascalCase` for React components (`HUD.jsx`, `Overlays.jsx`) and Engine classes (`BreakoutGame`, `ParticleEngine`).
  - `camelCase` for functions, variables, methods (`damageBrick`, `applyPowerUp`, `activePowerups`).
  - `UPPER_CASE` for global constant lookups (`BRICK_TYPES`, `POWERUP_TYPES`, `LEVELS`).

---

## 2. Component & Engine Boundaries

- **React Layer (`src/App.jsx`, `src/components/`)**:
  - Handles state rendering, HUD display, menu overlays, pause state, and victory/game over modals.
  - Interacts with game engine via state update callbacks (`onStateUpdate`).
- **Canvas Engine Layer (`src/engine/`)**:
  - Pure JavaScript class-based canvas physics engine (`src/engine/game.js`).
  - Encapsulates physics update loop, collision checking, particle system, level loading, sound synthesizer (`src/engine/audio.js`), and touch/keyboard input handling.

---

## 3. Storage & Audio Best Practices

- **Storage**: Use `localStorage` key `breakgrid_high_score` (maintaining backward compatibility with `breakout_high_score`).
- **Audio**: Web Audio API synthesizer (`soundEngine.init()`) must be lazily initialized or resumed on user gesture (`click`, `touchstart`, `startNewGame`) to comply with browser autoplay policies.
