# UI_UX_FLOW.md — Screens, Navigation & Controls

> This document defines **every screen the player sees, how they move between them, and exactly how input works** on each platform. It implements the UI requirements from `docs/PRODUCT_SPEC.md` Sections 9–10 at a level detailed enough to build against, and locks in the control scheme from `docs/GDD.md` Section 3 / `docs/DECISIONS.md` Decision #014. Visual styling (colors, fonts, iconography) is explicitly **not** covered here — that's `docs/ART_STYLE_GUIDE.md` (not yet written). This document is about structure and flow, not appearance.

---

## 1. Screen List

| Screen | Purpose | Reachable from |
|---|---|---|
| **Boot / Loading** | Asset loading, shown once on launch | App launch only |
| **Main Menu** | Entry hub | Boot; Run-End screen; Pause (via "Quit to Menu") |
| **Settings** | Audio controls | Main Menu; Pause |
| **Leaderboard** | View top scores | Main Menu; Run-End screen |
| **In-Run HUD** | Overlaid during active gameplay | Started from Main Menu ("Start Run") |
| **Upgrade Choice** | Presented after each wave clear | Triggered automatically during a run |
| **Pause** | Overlaid pause state | In-Run HUD (pause input) |
| **Run-End** | Post-death results + score submission | Automatic on player death |
| **Display Name Entry** | One-time or per-submission name entry for leaderboard | Part of Run-End flow (see Section 3.6) |

Nine screens/states total — matches the "minimum viable UI surface" scope locked in `docs/PRODUCT_SPEC.md` Section 9. No screen beyond this list is in V1 scope (e.g., no campaign chapter-select, no codex/lore screen — those are V3 per `docs/GDD.md` Section 11's out-of-scope note).

---

## 2. Navigation Flow

```
                    ┌─────────────┐
                    │ Boot/Loading│
                    └──────┬──────┘
                           ▼
                    ┌─────────────┐
              ┌────▶│  Main Menu  │◀────────────────┐
              │     └──────┬──────┘                  │
              │            │                          │
    ┌─────────┼────────────┼──────────────┐           │
    ▼         ▼            ▼               │           │
┌────────┐┌─────────┐┌─────────────┐       │           │
│Settings││Leaderbrd││ Start Run   │       │           │
└───┬────┘└────┬────┘└──────┬──────┘       │           │
    │          │             ▼              │           │
    │          │      ┌─────────────┐       │           │
    │          │      │ In-Run HUD  │◀──┐   │           │
    │          │      └──────┬──────┘   │   │           │
    │          │             │           │   │           │
    │          │     ┌───────┴───────┐   │   │           │
    │          │     ▼               ▼   │   │           │
    │          │ ┌────────┐   ┌──────────┴┐ │           │
    │          │ │ Pause  │   │Upgrade    │ │           │
    │          │ └───┬────┘   │Choice     │ │           │
    │          │     │        └───────────┘ │           │
    │          │     │ (resume)──────────────┘           │
    │          │     │ (quit to menu)─────────────────────┘
    │          │     │
    │          │     ▼ (player death, from In-Run HUD)
    │          │ ┌─────────────┐
    │          │ │  Run-End    │
    │          │ └──────┬──────┘
    │          │        │
    │          │        ▼
    │          │ ┌─────────────────┐
    │          │ │Display Name Entry│ (see Section 3.6 for when this is skipped)
    │          │ └──────┬──────────┘
    │          │        │
    └──────────┴────────┴──────────────────────▶ back to Main Menu
```

**Design intent:** every path back to Main Menu is short — no screen is more than 2 taps/clicks from returning to the hub, and Run-End → new run is exactly 1 tap, per `docs/PRODUCT_SPEC.md` Section 7's requirement that starting a new run from Run-End takes one interaction (supporting the "one more run" loop from `docs/PRD.md` Section 1).

---

## 3. Screen-by-Screen Detail

### 3.1 Boot / Loading

- Shows once, on cold launch only (not between runs).
- Loads assets, initializes `StorageService` (reads or creates `np_device_id`, per `docs/DATA_MODEL.md` Section 4), reads persisted `np_settings`.
- No player interaction available — auto-advances to Main Menu when loading completes.

### 3.2 Main Menu

- Entry points: **Start Run**, **Leaderboard**, **Settings** — matches `docs/PRODUCT_SPEC.md` Section 9's requirement that all three be reachable within one tap/click from launch.
- Displays the player's `np_last_score_cache` (last run's score, if any) somewhere visible — not a hard requirement from `docs/PRODUCT_SPEC.md`, but a low-cost addition that reinforces the score-chasing loop; flagging as a recommended addition rather than an assumed lock.

### 3.3 Settings

- Per `docs/PRODUCT_SPEC.md` Section 9 and `docs/DATA_MODEL.md` Section 4: master volume, SFX volume, music volume — three sliders, minimum.
- **No control-scheme toggle** — per `docs/DECISIONS.md` Decision #014, V1 desktop is auto-fire only, so there is nothing to toggle. Do not add a control-scheme UI element; the `np_settings.controlScheme` field was deliberately removed from the schema.
- Changes apply and persist immediately (per `docs/PRODUCT_SPEC.md` Section 13 — no separate "Save" button; every change writes through `StorageService` on change).
- Reachable from both Main Menu and Pause, so a player can adjust volume mid-run without losing progress.

### 3.4 In-Run HUD

Live, non-modal overlay during active gameplay. Elements:
- **HP indicator** (bar or numeric, updating live).
- **Current wave number** (per `docs/PRODUCT_SPEC.md` Section 3's requirement that this always be visible).
- **Current score** (live-updating).
- **Boss HP bar** — appears only during a boss wave, distinct from the player's own HP indicator, reinforcing `docs/PRODUCT_SPEC.md` Section 6's requirement that a boss be visually unmistakable.
- **Pause button** (mobile — a tappable UI element, since there's no physical pause key; desktop also supports a keyboard shortcut per Section 4 below).

No wave timer countdown is shown for boss waves (there is none running, per `docs/DECISIONS.md` Decision #011) — showing a countdown UI element that doesn't correspond to actual wave-end logic would be actively misleading, so the HUD should suppress or replace the timer element specifically during boss waves rather than displaying a frozen or fake value.

### 3.5 Upgrade Choice

- Modal overlay, pauses all gameplay systems while shown (per `docs/PRODUCT_SPEC.md` Section 5's requirement — no time pressure on this decision).
- Displays exactly 3 choices (or fewer, in the rare edge case from `docs/PRODUCT_SPEC.md` Section 5) from `UpgradeSystem.getUpgradeChoices()`.
- Each choice shows: name, short description, and its category (weapon level / new weapon / stat boost) so the player can quickly parse what kind of choice it is at a glance.
- On a boss-wave clear, this screen is preceded by (or combined with) the "guaranteed upgrade" moment from `docs/GDD.md` Section 7 — exact presentation (separate screen vs. an indicator on this same screen) is a design detail to resolve during implementation, not locked here.

### 3.6 Pause

- Triggered by: keyboard key (desktop) or dedicated UI button (mobile), per Section 4 below.
- Freezes all system clocks completely — per `docs/PRODUCT_SPEC.md` Section 9's edge case, a telegraphed boss attack must resume correctly on unpause, not skip or double-fire, which requires genuinely freezing `WaveSystem` and `CombatSystem` cooldowns, not just visually hiding the screen.
- Options: **Resume**, **Settings** (opens Settings without ending the run), **Quit to Main Menu** (ends the run — should require a confirmation step, since this discards run progress and is not the same as dying).

### 3.7 Run-End

- Displays: waves survived, kills, time survived, final score — sourced from `RunState` per `docs/DATA_MODEL.md` Section 3, shown **immediately**, not gated on any network call (per `docs/PRODUCT_SPEC.md` Section 7).
- **Start New Run** button — one tap/click back into a run, per Section 2's navigation-flow design intent.
- Leads into Display Name Entry (3.8) as part of the score-submission flow, unless a name is already cached from a previous submission (see below).

### 3.8 Display Name Entry

- Shown as part of the Run-End flow so the score can be submitted to the leaderboard (`docs/DATA_MODEL.md` Section 5, `docs/API_REFERENCE.md` Section 4.1).
- Client-side validation before submission attempt: 1–20 characters, trimmed of leading/trailing whitespace — matching the Supabase check constraint, per `docs/PRODUCT_SPEC.md` Section 8's edge case, so the player gets immediate feedback rather than a failed network round-trip.
- **Recommended UX (not yet locked as a decision):** once a player has entered a display name once, remember it (a new, small addition to `np_settings` or its own key) and skip this screen on future runs, only showing an "edit name" option rather than re-prompting every single run. This isn't specified anywhere else in the doc kit — flagging it here as a sensible addition rather than assuming it silently; if adopted, it needs a one-line addition to `docs/DATA_MODEL.md` Section 4's `LocalStorageSchema`.

---

## 4. Controls

### 4.1 Desktop

| Action | Input |
|---|---|
| Move | WASD or Arrow keys |
| Aim | Mouse position |
| Fire | **Automatic** — no fire input exists; locked per `docs/DECISIONS.md` Decision #014 |
| Pause | A dedicated key (e.g., `Esc`) |
| Menu navigation | Mouse click |

### 4.2 Mobile (Touch)

| Action | Input |
|---|---|
| Move | Virtual joystick, left side of screen (per `docs/GDD.md` Section 3) |
| Aim + Fire | **Automatic**, targeting nearest/sensibly-chosen enemy — no separate aim control, per `docs/GDD.md` Section 3's stated rationale (avoids needing a second touch zone) |
| Pause | Dedicated on-screen button (top corner, out of the way of the joystick and play area) |
| Menu navigation | Tap |

### 4.3 Input Method Detection

Per `docs/PRODUCT_SPEC.md` Section 10: both input schemes must work without a separate build. Recommended approach — detect touch capability at launch to decide initial UI layout (joystick visible or not), and per that same section's edge case, treat true simultaneous touch+mouse support (e.g., touchscreen laptops) as a nice-to-have refinement rather than a P0 requirement if it proves complex.

---

## 5. Accessibility

Not exhaustively specified in `docs/PRD.md` or `docs/PRODUCT_SPEC.md`, but the following minimum bar is recommended, consistent with the "recommended addition" flagged in `docs/PRODUCT_SPEC.md` Section 12:

- **Screen shake toggle** — off switch in Settings for players sensitive to it (per `docs/PRODUCT_SPEC.md` Section 12's recommendation).
- **Touch target sizing** — meets the "reasonable minimum size for thumb interaction" bar already required by `docs/PRODUCT_SPEC.md` Section 10; this section just reiterates it applies to every UI screen, not only in-run controls (e.g., Upgrade Choice buttons, Pause menu buttons).
- **Color contrast** — deferred to `docs/ART_STYLE_GUIDE.md` (not yet written) but flagged here as a requirement that document should address, given the neon-cyberpunk aesthetic's tendency toward low-contrast color combinations.
- **No time-pressured menu decisions** — already true of Upgrade Choice (Section 3.5), which pauses the game; worth stating explicitly as a project-wide principle for any future modal decision screens.

Full accessibility scope beyond this minimum bar (colorblind modes, remappable controls, subtitle/caption needs for audio cues) is not decided anywhere in the doc kit — flagging as an open item for the human to prioritize (or explicitly defer) rather than silently deciding it's out of scope.

---

## 6. Open Items Raised in This Document

1. **Upgrade-choice presentation on boss-wave clears** (Section 3.5) — separate screen or combined indicator? Implementation detail, not blocking, but worth a quick decision before that screen is built.
2. **Display name persistence across runs** (Section 3.8) — recommended but not locked; needs a `docs/DATA_MODEL.md` addition if adopted.
3. **Accessibility scope beyond the minimum bar** (Section 5) — colorblind modes, remappable controls, etc. — not decided anywhere.
4. **Screen orientation** — already flagged as open in `docs/TEST_STRATEGY.md` Section 9; repeating here since it directly affects this document's mobile layout assumptions and should be resolved before mobile UI implementation, not just before mobile testing.

---

## 7. Out of Scope for This Document (V2+ UI — Noted for Traceability Only)

Per `AGENT.md` Section 2, Rule 7:

- **V2:** Any UI surfacing AI-generated content (e.g., a visual indicator that a weapon variant was AI-generated) — deferred to `docs/versions/v2_AI_FEATURES.md`.
- **V3:** Campaign chapter-select screen, codex/lore screen — deferred to `docs/versions/v3_CAMPAIGN.md`.
- **V4:** Multiplayer lobby, friends/social UI, matchmaking screens — deferred to `docs/versions/v4_PLATFORM.md`.
