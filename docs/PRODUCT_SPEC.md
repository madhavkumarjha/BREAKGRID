# PRODUCT_SPEC.md — Feature Specifications: BREAKGRID

> Feature-by-feature detailed product specifications for **BREAKGRID**.

---

## 1. HUD & User Interface

### Header Bar
- **Score Counter**: Displays accumulated points, updating instantly on brick hit / power-up collection.
- **High Score**: Loaded from `localStorage.getItem('breakout_high_score')`, updated when current score exceeds high score.
- **Lives Display**: Visual heart icons (`❤️ ❤️ ❤️`), decrementing when all balls fall past the bottom.
- **Combo Multiplier**: Tracks consecutive brick hits without paddle bounce (`1x`, `x2`, `x3`, etc.).
- **Level Name**: Shows the current level title (e.g., *Neon Waves*, *THE CORE*).

### Overlays & Screens
- **Main Menu**: Options to start new game or access Level Select.
- **Level Select Grid**: 6 interactive buttons allowing direct entry to any level (including Boss Level).
- **Pause Menu**: Options to resume, restart current level, or return to main menu.
- **Game Over Screen**: Displays final score vs high score with a "Try Again" option.
- **Win Screen**: Celebrates clearing all levels and defeating The Core.

---

## 2. Audio Architecture

- **Web Audio API**: Uses procedural audio nodes (`OscillatorNode`, `GainNode`, `BiquadFilterNode`) to synthesize sounds programmatically.
- **Sound Events**:
  - `playPaddleHit(position)`: Tone frequency scales with hit position across paddle width.
  - `playBrickHit(pitchMultiplier)`: Higher pitch per combo level.
  - `playExplosion()`: White noise buffer filtered with lowpass envelope.
  - `playLaser()`: Fast frequency sweep down.
  - `playPowerup()`: Ascending C5-E5-G5-C6 arpeggio.
  - `playLifeLost()`: Descending sawtooth triad.
  - `playWin()`: A-major chord.
