# MASTER_ROADMAP.md — Master Roadmap: BREAKGRID

> High-level versioning and release roadmap for **BREAKGRID**.

---

## 🟢 V1: MVP & V1.1 Audit Release (COMPLETED)
- **Vite 5 + React 18**: Modular component structure (`App.jsx`, `components/`, `engine/`).
- **HTML5 2D Canvas Engine**: 60 FPS physics loop, particle debris, screen shake, and boss AI routines.
- **6 Handcrafted Levels**: *Neon Waves*, *Cyber Fortress*, *Explosive Grid*, *Retro Invader*, *Diamond Citadel*, and *THE CORE (Boss)*.
- **7 Power-Up Drops**: Multi-ball, Laser Cannon, Expand Paddle, Fireball, Magnetic Stick, Energy Shield, Slow-Motion.
- **Web Audio API**: Procedural sound synthesis (0 external audio assets).
- **Cross-Platform Controls**: Responsive Keyboard, Mouse, and Mobile Touch Drag / Tap input systems.

---

## 🟡 V2: Custom Level Editor & Extra Mechanics (Planned)

### 2.1 Drag-and-Drop Level Editor
- **Scope**: In-game visual editor allowing players to design custom brick grid matrices.
- **Acceptance Criteria**:
  - Palette selector for brick types (`S`, `R`, `E`, `U`, `P`).
  - Grid canvas workspace (9 columns x 7 rows).
  - Test-play mode within editor window.
  - Custom level persistence in `localStorage` under `breakgrid_custom_levels`.
  - JSON Export / Import functionality.

### 2.2 Extended Power-Up Roster
- **Scope**: Introduce 3 new power-up items:
  - **Triple Lasers**: Fires 3-stream spread beams.
  - **Shrink Paddle** (Debuff): Reduces paddle width by 30% for 8 seconds.
  - **Time Freeze**: Pauses ball motion while paddle can be repositioned.

---

## 🔵 V3: Serverless Global Leaderboards & Challenges (Planned)

### 3.1 Online Leaderboard Integration
- **Scope**: Global high score tracking using serverless API endpoints (Supabase / Firebase / Cloudflare Workers).
- **Acceptance Criteria**:
  - Player display name input modal on game over / win screens.
  - Global Top 100 leaderboard overlay screen.
  - Anti-cheat sanity validation on score submissions.

### 3.2 Daily Challenge Mode
- **Scope**: Procedurally seeded daily brick layout with unique modifier rules (e.g., Double Ball Velocity, Low Gravity).
