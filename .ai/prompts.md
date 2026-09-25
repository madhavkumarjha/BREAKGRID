# AI Task Prompts — BREAKGRID

> Ready-to-use prompt templates for expanding and maintaining **BREAKGRID**.

---

## Prompt 1: Adding a Handcrafted Level

```markdown
Add a new handcrafted Level [N] ("Level Name") to `src/engine/levels.js`.
Requirements:
1. Define a 2D matrix layout of brick strings ('S', 'R', 'E', 'U', 'P', ' ').
2. Include at least 2 Explosive ('E') bricks and 3 Power-Up ('P') bricks.
3. Ensure side bounce channels remain open (do not place Unbreakable 'U' bricks across bottom or mid rows).
4. Update `LEVELS` array export and test level selection overlay in `src/components/Overlays.jsx`.
```

---

## Prompt 2: Creating a New Power-Up Capsule

```markdown
Implement a new power-up type "[POWERUP_NAME]" in `src/engine/powerups.js` and `src/engine/game.js`.
Requirements:
1. Register type key and color in `src/engine/powerups.js`.
2. Implement duration logic and active effect application in `BreakoutGame.prototype.applyPowerUp()`.
3. Add cleanup logic when duration expires in `BreakoutGame.prototype.updatePowerUps()`.
4. Render capsule icon in `src/engine/powerups.js` draw routine.
5. Add UI badge indicator to `activePowerups` state in `src/App.jsx`.
```

---

## Prompt 3: Adding Custom Web Audio Sound Effects

```markdown
Add a new procedural sound effect `play[SoundName]()` to `src/engine/audio.js`.
Requirements:
1. Use native Web Audio API oscillators (`sine`, `square`, `sawtooth`, or noise buffer).
2. Wrap call in `if (!this.ctx || this.isMuted) return;` check.
3. Ensure sound effect triggers correctly from `src/engine/game.js` on gameplay event.
```

---

## Prompt 4: Performing Codebase & Doc Consistency Audit

```markdown
Audit all documentation files in `docs/`, `README.md`, `AGENT.md`, and `.ai/` against current implementation in `src/`.
Requirements:
1. Verify all class names, file paths, and function signatures match actual source code.
2. Confirm no legacy game references ("Neon Protocol", top-down shooter, Phaser) exist.
3. Verify `npm run build` compiles cleanly without warnings or missing exports.
```
