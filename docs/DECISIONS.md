# DECISIONS.md — Architecture & Design Decision Records

> Architectural and design decisions logged for **Neon Breakout**.

---

## Decision #001: Pivot Project Concept to Neon Breakout (Arcade Brick Breaker)
- **Status**: Accepted
- **Context**: The top-down shooter spec ("Neon Protocol") was created by mistake from a previous template. The user requested building a 2D Arcade Brick Breaker game instead.
- **Decision**: Abandoned top-down shooter specs and built a fresh 2D Arcade Brick Breaker ("Neon Breakout") with boss battles, multi-ball mechanics, laser cannons, and procedural audio.

---

## Decision #002: Adopt Vite + React Stack
- **Status**: Accepted
- **Context**: The user specified that their workflow and live deployment pipeline relies on Vite + React.
- **Decision**: Converted project to a React 18 + Vite 5 application (`package.json`, `vite.config.js`, `src/App.jsx`, `src/components/`).

---

## Decision #003: Procedural Web Audio API for Sound Effects
- **Status**: Accepted
- **Context**: Relying on external `.wav` or `.mp3` audio files introduces missing asset risks, CORS issues, and slower load times.
- **Decision**: Implemented `src/engine/audio.js` using Web Audio API synthesis for zero external asset dependencies.
