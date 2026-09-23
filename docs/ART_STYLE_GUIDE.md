# ART_STYLE_GUIDE.md — Visual Identity

> This document defines **how Neon Protocol looks** — color, typography, iconography, animation feel, and the asset list needed to build V1. It does not define *layout/structure* (that's `docs/UI_UX_FLOW.md`) or *mechanics* (that's `docs/GDD.md`) — this is purely the visual language layered on top of both. Where this document proposes a specific choice (exact hex codes, font names), treat it as a **starting art direction to confirm**, not a locked decision, unless explicitly marked LOCKED — visual style benefits from being seen before being signed off on, more than most other docs in this kit.

---

## 1. Visual Direction Summary

**One-line direction:** *High-contrast neon-on-dark cyberpunk — readable first, atmospheric second.* Per `docs/PRODUCT_SPEC.md` Section 2's performance requirement (visual effects should degrade before input responsiveness under load) and Section 5's accessibility note (contrast matters given the genre's low-contrast tendencies), **gameplay readability always wins over moodiness** when the two conflict. A gorgeous screenshot that's hard to parse mid-combat is a failure of this document's core goal.

**Reference tone (not exact reproductions — see Section 7 on copyright):** the neon-drenched, rain-slicked aesthetic associated with cyberpunk media broadly — think saturated magenta/cyan lighting against near-black environments, holographic UI elements, glitch/scan-line accents used sparingly as accents rather than constant noise.

---

## 2. Color Palette (Proposed — Confirm Before Locking)

### 2.1 Core Palette

| Role | Color | Hex (proposed) | Notes |
|---|---|---|---|
| Background / arena base | Near-black | `#0A0A12` | Not pure black — slight blue-violet tint keeps it from feeling flat |
| Primary accent (UI, player) | Electric cyan | `#00F0FF` | Player character, primary UI highlights |
| Secondary accent (danger, enemies) | Hot magenta | `#FF2079` | Enemy telegraphs, damage numbers, HP-critical states |
| Tertiary accent (boss, rare) | Amber/gold | `#FFB800` | Reserved for boss-specific UI and the "guaranteed upgrade" moment (`docs/GDD.md` Section 7) — used sparingly so it reads as special |
| Success / positive | Neon green | `#39FF88` | Upgrade confirmations, positive feedback only |
| UI text (primary) | Off-white | `#E8E8F0` | Not pure white — softer against the dark background |
| UI text (secondary/muted) | Cool gray | `#8A8A9E` | Descriptions, secondary labels |

### 2.2 Contrast Rule (LOCKED)

Regardless of the exact palette above, **every text element and every gameplay-critical indicator (HP, telegraphed attacks, boss markers) must meet at least WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large text/UI components) against its background.** This is locked as a rule even though the exact hex values above are not — per Section 1's readability-first principle and the accessibility note carried over from `docs/UI_UX_FLOW.md` Section 5.

### 2.3 Enemy/Weapon Color Coding

To support fast visual parsing during combat (ties to `docs/PRODUCT_SPEC.md` Section 2's responsiveness requirements), each enemy type and weapon projectile should have a **consistent, distinct color** used every time it appears:

| Entity | Proposed color | Rationale |
|---|---|---|
| Drone Swarmer | Cyan-white | Small, fast, "cheap" enemy — cool/light tone |
| Enforcer | Magenta | Standard threat — the genre-default danger color |
| Sniper Turret | Amber | Ranged threat — warm tone reads as "watch out from a distance" |
| Brute | Deep red | High-threat tank — the most saturated warning tone reserved for the biggest melee danger |
| Warden Unit (boss) | Gold/amber with red accents | Distinct from all regular enemies per `docs/PRODUCT_SPEC.md` Section 6's "never mistakable for a regular enemy" requirement |

This table is a proposal for confirmation, not a lock — but the *principle* (consistent per-entity color coding for fast parsing) should be treated as locked regardless of the exact colors chosen.

---

## 3. Typography

| Use | Style direction | Notes |
|---|---|---|
| Headings / titles / large UI (menu titles, "WAVE 5") | Bold, geometric, slightly futuristic sans-serif | Should read clearly even at a glance mid-combat |
| Body / UI text (descriptions, settings labels) | Clean, highly legible sans-serif | Readability over character here — this is the text most likely to be read carefully (upgrade descriptions) |
| Numeric displays (score, HP, wave counter) | Tabular/monospaced figures preferred | Prevents numbers from visually "jumping" in width as they update live |

**Specific font selection is not locked here** — recommend selecting from a small set of free/licensable web fonts (e.g., via Google Fonts) once implementation begins, tested directly in-engine at actual gameplay sizes rather than chosen from a static mockup, since legibility at small HUD sizes during motion is the real test.

---

## 4. Icon Style

- **Weapon icons:** simple, high-contrast silhouettes — recognizable at small size (upgrade-choice cards, HUD if weapon icons are shown there).
- **Stat/upgrade icons:** abstract geometric symbols (e.g., a chevron-up for damage, a shield shape for HP) rather than literal illustrations — keeps the upgrade-choice screen fast to parse.
- **UI chrome (buttons, panels):** angular, geometric edges (avoid soft/rounded corners, which read as friendlier/less cyberpunk) — beveled or clipped-corner panel shapes are a common, effective genre convention.

---

## 5. Animation Principles

Ties directly to `docs/PRODUCT_SPEC.md` Section 12 (Visual Feedback / Juice):

- **Hit feedback:** brief, high-contrast flash (white or the entity's accent color inverted) on taking damage — must read clearly even with multiple entities on screen at once.
- **Boss telegraphs:** per `docs/GDD.md` Section 7's "readable pattern" design goal, a telegraph should have a clear **wind-up** phase (visually distinct from the attack itself, ideally 0.5–1 second minimum) before the attack executes — the wind-up is the actual gameplay-critical animation, more important to get right than the attack's impact effect.
- **Death effects:** enemies should have a clear, brief death animation/effect rather than instant disappearance — reinforces impact without adding meaningful visual clutter, per the "juice" goal in `docs/PRODUCT_SPEC.md`.
- **Screen shake:** capped intensity (ties to the toggleable-off accessibility requirement in `docs/UI_UX_FLOW.md` Section 5) — should never obscure the player's ability to read the next incoming threat.
- **Upgrade selection:** a satisfying, brief confirmation animation on the Upgrade Choice screen — this is a positive-reinforcement moment (per `docs/GDD.md` Section 8's "build variety" design intent) and deserves a bit more visual flourish than in-combat feedback, since it's not time-pressured.

---

## 6. Asset List (V1)

A first-pass inventory of visual assets needed for V1 launch, organized by category. Exact counts assume the locked V1 roster from `docs/DECISIONS.md` Decision #010.

### 6.1 Characters & Enemies
- [ ] Player character sprite (+ movement/idle animation states)
- [ ] Drone Swarmer sprite + animation
- [ ] Enforcer sprite + animation
- [ ] Sniper Turret sprite + animation (stationary — simpler animation needs)
- [ ] Brute sprite + animation
- [ ] Warden Unit (boss) sprite + animation, including distinct telegraph animations for both attack patterns (`docs/GDD.md` Section 7)

### 6.2 Weapons & Projectiles
- [ ] Pulse Pistol — weapon visual + hitscan effect
- [ ] Neon SMG — weapon visual + hitscan effect
- [ ] Arc Shotgun — weapon visual + cone-AoE effect
- [ ] Homing Drone — weapon visual + seeking-projectile visual
- [ ] EMP Launcher — weapon visual + explosive-AoE effect (should visually communicate blast radius clearly, given the self-damage mechanic from `docs/DECISIONS.md` Decision #012 — the player needs to be able to judge "am I in range" at a glance)

### 6.3 Environment
- [ ] Arena background/floor (cyberpunk setting — exact scene TBD, e.g. rooftop, underground arena, server-farm floor per `docs/GDD.md` Section 2)
- [ ] Arena boundary/wall visual treatment
- [ ] Ambient background elements (non-gameplay-critical — city skyline, neon signage, etc., consistent with Section 1's atmosphere-second principle — these should never compete visually with gameplay-critical elements)

### 6.4 UI
- [ ] Main Menu background/layout art
- [ ] Button/panel chrome (per Section 4's icon style direction)
- [ ] HP bar (player + boss variants)
- [ ] Wave counter UI element
- [ ] Score display UI element
- [ ] Upgrade Choice card design (x1 template, reused for all upgrade types)
- [ ] Settings screen layout
- [ ] Leaderboard screen layout
- [ ] Run-End screen layout

### 6.5 VFX
- [ ] Hit-flash effect
- [ ] Death effect (enemy)
- [ ] Level-up/upgrade-selected effect
- [ ] Boss entrance effect
- [ ] Explosion effect (EMP Launcher)

---

## 7. Copyright & Originality Note

All visual assets must be original work or properly licensed — no direct reproduction of existing copyrighted cyberpunk media's specific character designs, logos, or distinctive proprietary visual elements. "Cyberpunk aesthetic" as a genre (neon, dark environments, holographic UI) is a broad style, not owned by any one work, and is fine to draw genre-conventions from — but specific recognizable designs from existing franchises are not.

---

## 8. Open Items Raised in This Document

1. **Exact color hex values** (Section 2) — proposed, not locked; should be confirmed visually (in-engine or in a mockup) before final art production begins.
2. **Font selection** (Section 3) — direction given, not a specific font locked.
3. **Exact arena setting** (Section 6.3) — rooftop vs. underground vs. server-farm floor, still open per `docs/GDD.md` Section 2.

None of these block earlier-stage implementation (gameplay code doesn't depend on final art), but should be resolved before art production time is invested, to avoid rework.

---

## 9. Out of Scope for This Document (V2+ Visuals — Noted for Traceability Only)

Per `AGENT.md` Section 2, Rule 7:

- **V2:** Visual treatment for AI-generated weapon variants (should they look visually distinct from hand-authored weapons? Not decided) — deferred to `docs/versions/v2_AI_FEATURES.md`.
- **V3:** Campaign-specific art (chapter environments, codex/lore screen illustrations, additional unique boss designs) — deferred to `docs/versions/v3_CAMPAIGN.md`.
- **V4:** Any multiplayer-specific visual needs (player differentiation in co-op, etc.) — deferred to `docs/versions/v4_PLATFORM.md`.
