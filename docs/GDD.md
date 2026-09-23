# GDD.md — Game Design Document: Neon Breakout

> Defines game mechanics, balance numbers, brick behaviors, power-ups, and boss encounters for **Neon Breakout**.

---

## 1. Core Loop

```
Select Level / Start Game → Move Paddle & Reflect Ball → Shatter Bricks → Catch Power-Ups 
    → Build Combo Multiplier → Clear Grid / Defeat Boss → Level Victory → Next Level / High Score
```

---

## 2. Controls & Input Systems

- **Desktop Keyboard**: `A` / `D` or `Left` / `Right` Arrow keys for smooth paddle sliding. `Space` to launch stuck balls / fire lasers. `P` or `Esc` to toggle pause.
- **Mouse / Pointer**: Moving cursor horizontally repositions the paddle instantly. Click to launch / fire lasers.
- **Touch Devices**: Horizontal touch-drag moves paddle seamlessly. Single tap launches / fires lasers.

---

## 3. Brick Types & Scoring

| Brick Type | Visual Color | Hit Points | Score Value | Special Effect |
|---|---|---|---|---|
| Standard | Cyan / Pink / Yellow / Purple / Green | 1 | 100 x Combo | Standard destruction |
| Reinforced | Varied (Crack visual) | 2 | 200 x Combo | Shows crack on first hit |
| Unbreakable | Metallic Silver | Infinity | 0 | Reflects ball, cannot be destroyed |
| Explosive | Red (Bomb Icon 💣) | 1 | 300 x Combo | Triggers 90px radius AoE explosion |
| Power-Up | Gold | 1 | 150 x Combo | Guaranteed power-up item capsule drop |

---

## 4. Power-Up Capsules

| Power-Up | Icon | Color | Duration | Description |
|---|---|---|---|---|
| **Multi-Ball** | ⚽ | Cyan | Instant | Spawns 2 additional active energy balls |
| **Laser Cannon** | 🔫 | Pink | 10 sec | Equips dual lasers to fire with `Space`/Click |
| **Expand Paddle** | ↔️ | Green | 12 sec | Increases paddle width by 50% |
| **Fireball** | 🔥 | Red | 8 sec | Ball glows red and pierces through bricks |
| **Magnetic Stick** | 🧲 | Purple | 10 sec | Holds ball on paddle until launched |
| **Energy Shield** | 🛡️ | Yellow | 1 Use | Bottom barrier preventing ball loss once |
| **Slow-Motion** | ⏳ | Cyan | 8 sec | Reduces ball velocity by 30% |

---

## 5. Levels & Boss Encounters

1. **Level 1: Neon Waves** — Introductory level with basic brick grid.
2. **Level 2: Cyber Fortress** — Metallic unbreakable corner pillars and reinforced bricks.
3. **Level 3: Explosive Grid** — High-density explosive brick clusters.
4. **Level 4: Retro Invader** — Invader pixel shape crafted from reinforced bricks.
5. **Level 5: Diamond Citadel** — Citadel diamond layout with gold powerup centers.
6. **Level 6: THE CORE (Boss Encounter)** — Giant central boss module (150 HP) with health bar, moving shield bricks, and screen-shake hit reactions.
