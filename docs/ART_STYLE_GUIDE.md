# ART_STYLE_GUIDE.md — Visual Identity: BREAKGRID

> Defines color palette, typography, brick visuals, particle VFX, and UI aesthetic guidelines for **BREAKGRID** (2D Cyberpunk Arcade Brick Breaker).

---

## 1. Visual Direction Summary

**One-line direction:** *High-contrast neon-on-dark synthwave cyberpunk — readable first, atmospheric second.*

**BREAKGRID** combines retro-arcade brick breaker mechanics with a polished synthwave visual language. The dark background ensures high visual clarity, while vibrant neon hues delineate active gameplay elements (paddle, balls, brick types, power-up capsules, and boss hazards).

---

## 2. Color Palette & Visual System

### 2.1 Core Color Palette

| Role | Color Name | Hex Code | Canvas & UI Application |
|---|---|---|---|
| **Arena Base** | Cyberpunk Deep Black | `#0A0A12` | Main canvas background, dark overlay backdrop |
| **Primary Accent** | Neon Cyan | `#00F0FF` | Default Paddle, standard ball, HUD primary accents |
| **Secondary Accent**| Hot Magenta | `#FF2079` | Laser cannons, explosive bricks, danger UI elements |
| **Tertiary Accent** | Neon Amber / Gold | `#FFB800` | Boss "THE CORE", high combo popups, fireball state |
| **Success / Utility**| Neon Lime Green | `#39FF88` | Power-up capsules, shield aura, score popups |
| **Special / Shield** | Electric Purple | `#A020F0` | Unbreakable bricks, bottom shield barrier |
| **Text Primary** | Crisp White | `#F0F0FF` | Primary headers, scores, level titles |
| **Text Secondary** | Muted Slate | `#8A8A9E` | Subtitles, instructions, secondary metrics |

---

## 3. Brick Design & Visual Hierarchy

Each brick type has a distinct color scheme and visual state so players can identify grid compositions instantaneously:

| Brick Type | Symbol | Primary Color | Visual Styling & Effects |
|---|---|---|---|
| **Standard** | `S` | `#00F0FF` (Cyan) | Clean neon fill with 1px bright border and inner gradient glow. |
| **Reinforced** | `R` | `#FFB800` (Amber) | Metallic gold bevel with numerical hit counter overlay (2 HP -> 1 HP cracked visual). |
| **Explosive** | `E` | `#FF2079` (Magenta) | Pulsing warning fill; emits radial blast ring and particle debris upon destruction. |
| **Unbreakable** | `U` | `#A020F0` (Purple) | Dark graphite fill with purple corner rivets; produces deflection sparks when struck. |
| **Power-Up** | `P` | `#39FF88` (Lime) | Shimmering border glow; releases falling capsule item upon impact. |

---

## 4. Entity & VFX Visual Rules

### 4.1 Paddle & Balls
- **Paddle**: Sleek cyan rectangle with curved corner highlights and glowing side thrusters. When **Laser Cannon** is active, dual magenta weapon turrets deploy on the paddle wings.
- **Ball & Trails**: Default ball glows `#00F0FF` with a fading particle trail.
  - **Fireball**: Flaming orange/gold aura with dense fire particle emissions that cuts through bricks without deflecting.
  - **Multi-Ball**: Secondary balls use distinct lime green `#39FF88` hue to distinguish main vs extra balls.

### 4.2 Power-Up Capsules
- Capsule shapes drop vertically with slow rotation and glowing inner icons:
  - **ENLARGE (`E`)**: Cyan paddle expand icon.
  - **LASER (`L`)**: Magenta twin laser cannon icon.
  - **SLOW (`S`)**: Blue clock icon.
  - **FIREBALL (`F`)**: Gold flame icon.
  - **MULTI-BALL (`M`)**: Green split ball icon.
  - **MAGNET (`G`)**: Yellow horseshoe magnet icon.
  - **SHIELD (`B`)**: Purple shield barrier icon.

### 4.3 Boss Encounter: "THE CORE"
- Spawns at top center (`y: 40`) as an octagonal glowing energy core.
- **Phases**:
  - **Phase 1 (100%-66% HP)**: Glowing Cyan shield aura with periodic laser telegraph beams.
  - **Phase 2 (66%-33% HP)**: Amber color shift, faster movement, summons drone minion bricks.
  - **Phase 3 (33%-0% HP)**: Pulsing Magenta aura, high-frequency attack telegraphs, radial shockwaves.

---

## 5. UI & Typography

- **Fonts**: Modern geometric sans-serif fonts (`Inter`, `Roboto`, system-ui) for headers and overlays.
- **Monospaced Displays**: Scores, combo multipliers, and level counters use tabular monospaced numbers to prevent UI jitter during active gameplay updates.
- **Glassmorphism**: UI overlays feature dark semi-transparent backdrops (`rgba(10, 10, 18, 0.85)`), blur filters (`backdrop-filter: blur(8px)`), and 1px neon borders (`border: 1px solid rgba(0, 240, 255, 0.3)`).

---

## 6. Procedural Audio Alignment

Visual effects synchronize directly with Web Audio API sound triggers in `src/engine/audio.js`:
- **Brick Shatter**: Particle burst matched with high-frequency oscillator chime.
- **Laser Fire**: Muzzle light flash matched with quick frequency sweep down sound.
- **Explosion**: Radial shockwave animation matched with low-pass filtered noise burst.
- **Boss Damaged**: Screen shake and red flashing matched with distorted synth hit.
