# UI_UX_FLOW.md — Screens, Navigation & Controls: BREAKGRID

> Defines screens, navigation overlays, HUD items, and user controls for **BREAKGRID**.

---

## 1. Screen & Overlay List

| Screen / Overlay | Purpose | React Component |
|---|---|---|
| **Main Menu** | Title screen, Play Game, Level Select | `src/components/Overlays.jsx` |
| **Level Select** | Grid overlay to choose handcrafted levels (1 to 6) | `src/components/Overlays.jsx` |
| **In-Game HUD** | Persistent top bar showing Score, High Score, Lives, Combo multiplier, and Level name | `src/components/HUD.jsx` |
| **Active Powerups Bar** | Displays currently active powerups (Enlarge, Laser, Slow, Fireball, Magnet, Shield) | `src/App.jsx` |
| **Pause Overlay** | Resume game, restart current level, or return to Main Menu | `src/components/Overlays.jsx` |
| **Game Over Screen** | Final score display, high score update, option to try again or return to Menu | `src/components/Overlays.jsx` |
| **Victory Screen** | Displayed upon defeating "THE CORE" (Boss level), showing grand score & play again | `src/components/Overlays.jsx` |

---

## 2. Navigation Diagram

```
                 ┌───────────────┐
                 │   Main Menu   │
                 └───────┬───────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
  ┌──────────────┐ ┌───────────┐ ┌──────────────┐
  │ Level Select │ │ Play Game │ │ High Score   │
  └──────┬───────┘ └─────┬─────┘ └──────────────┘
         │               │
         └───────┬───────┘
                 ▼
         ┌───────────────┐
         │  In-Game HUD  │
         │  & Canvas 2D  │
         └───────┬───────┘
                 │
       ┌─────────┴─────────┐
       ▼                   ▼
┌─────────────┐     ┌─────────────┐
│ Game Over / │     │ Pause Menu  │
│ Victory Screen    └─────────────┘
└─────────────┘
```

---

## 3. Controls Scheme

| Input Method | Action | Implementation |
|---|---|---|
| **Mouse Drag** | Move paddle left / right | `mousemove` canvas listener |
| **Touch Drag (Mobile)** | Move paddle left / right | `touchmove` / `touchstart` canvas listener |
| **Keyboard A / D or ← / →** | Move paddle left / right | `keydown` / `keyup` listeners |
| **Spacebar / Touch Tap** | Launch stuck ball / Fire Laser Cannons | `space` key / `click` / `touchstart` |
| **P / Escape** | Toggle Pause | `p` / `Escape` key |
