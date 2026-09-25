# v1_MVP_SCOPE.md — Scope Document: BREAKGRID V1

> Defines the exact scope delivered in V1 for **BREAKGRID**.

---

## 1. Shipped Scope Summary

- **Title**: BREAKGRID
- **Genre**: 2D Cyberpunk / Synthwave Arcade Brick Breaker
- **Tech**: React 18 + Vite 5 + HTML5 Canvas 2D
- **Levels**: 6 Levels (5 Grid levels + 1 Boss Encounter)
- **Power-Ups**: 7 Types (Multi-Ball, Laser Cannon, Expand Paddle, Fireball, Magnetic Stick, Energy Shield, Slow-Motion)
- **Audio**: Web Audio API Sound Synthesizer
- **State**: Persistent High Score via `localStorage` (`breakgrid_high_score`)
- **Controls**: Keyboard (`A`/`D`, `Arrow Keys`, `Space`), Mouse, Touch Drag & Tap

---

## 2. V1.1 Post-Launch Audit Fixes

The following 7 technical enhancements and bug fixes were completed in the V1.1 audit cycle (`docs/bugs/BUGS_AND_MISSING.md`):

1. ✅ **Mobile Touch Controls**: Added native `touchstart`, `touchmove`, and `touchend` canvas listeners.
2. ✅ **Slow-Motion Expiry Fix**: Velocity restoration (`/= 0.7`) applied when timer expires.
3. ✅ **Brick-Specific Scoring**: Score formula upgraded from flat 100 to brick-specific multiplier matrix.
4. ✅ **Boss Clearance**: Repositioned Boss to `y: 40` and grid `marginTop: 105` on Level 6.
5. ✅ **Level 2 Re-balance**: Restructured Unbreakable blocks to top pillars, clearing side channels.
6. ✅ **Legacy Cleanup**: Deleted 6 orphaned root JS files (`src/*.js`).
7. ✅ **Storage Migration**: Unified local storage key under `breakgrid_high_score` with automatic migration.
