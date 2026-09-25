# UI_UX_FLOW.md — Screens, Navigation & Controls: BREAKGRID

> Defines screen overlays, navigation flow, HUD layouts, and input controls for **BREAKGRID**.

---

## 1. Screen & Overlay List

| Screen / Overlay | Purpose | React Component |
|---|---|---|
| **Main Menu** | Title screen, Play Game, Level Select buttons | `src/components/Overlays.jsx` |
| **Level Select** | Grid modal to select handcrafted levels (1 to 6) | `src/components/Overlays.jsx` |
| **In-Game HUD** | Top bar displaying Score, High Score, Lives, Combo, Level | `src/components/HUD.jsx` |
| **Active Powerups Bar** | Displays currently active powerup timers & badges | `src/App.jsx` |
| **Pause Overlay** | Resume game, restart level, return to Main Menu | `src/components/Overlays.jsx` |
| **Game Over Screen** | Final score display, high score banner, retry / menu options | `src/components/Overlays.jsx` |
| **Victory Screen** | Defeat "THE CORE" celebration modal, final stats, play again | `src/components/Overlays.jsx` |

---

## 2. Navigation Flowchart

```
                 +-----------------+
                 |    Main Menu    |
                 +--------+--------+
                          |
         +----------------+----------------+
         |                                 |
         v                                 v
+-----------------+               +-----------------+
|  Level Select   |               |    Play Game    |
+--------+--------+               +--------+--------+
         |                                 |
         v                                 v
+-----------------+               +-----------------+
| Load Selected   |               |  Start Level 1  |
| Level (1-6)     |               |                 |
+--------+--------+               +--------+--------+
         |                                 |
         +----------------+----------------+
                          |
                          v
                 +-----------------+
                 |   In-Game HUD   |
                 |  & Canvas 2D    |
                 +--------+--------+
                          |
        +-----------------+-----------------+
        |                                   |
        v                                   v
+---------------+                   +---------------+
| Game Over /   |                   |  Pause Menu   |
| Victory Modal |                   +-------+-------+
+-------+-------+                           |
        |                                   |
        |                    +--------------+--------------+
        |                    |                             |
        v                    v                             v
+---------------+    +---------------+           +---------------+
|  Main Menu    |    |  Resume       |           |  Restart /    |
|  (Back)       |    |  (→ HUD)      |           |  Main Menu    |
+---------------+    +---------------+           +---------------+
```

---

## 3. Controls Scheme

| Input Method | Action | Event / Key Binding |
|---|---|---|
| **Mouse Drag** | Move paddle left / right | `mousemove` canvas event |
| **Touch Drag (Mobile)** | Move paddle left / right | `touchstart` / `touchmove` canvas events |
| **Keyboard A / D or Left / Right** | Move paddle left / right | `ArrowLeft`, `ArrowRight`, `KeyA`, `KeyD` |
| **Spacebar / Touch Tap** | Launch ball / Fire Laser Cannons | `Space` key / canvas `click` / `touchstart` |
| **P / Escape** | Toggle Pause overlay | `KeyP`, `Escape` |
