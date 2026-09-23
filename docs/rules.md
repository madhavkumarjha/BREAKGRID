# .ai/rules.md — Coding Standards

> This is the detailed, authoritative version of the coding standards summarized in `AGENT.md` Section 3. Per `AGENT.md` Section 3's own note: *"Full detail lives in `.ai/rules.md` — this section is the summary; that file is the source of truth if the two ever disagree."* If any AI agent finds a conflict between this file and `AGENT.md`, **this file wins** for coding-standard specifics; `AGENT.md` wins for everything else (process, escalation, delegation).

---

## 1. TypeScript Rules

- **Strict mode, no exceptions.** `tsconfig.json`'s `strict: true` is non-negotiable.
- **No `any`, ever.** Use `unknown` + type narrowing (type guards, `instanceof`, discriminated unions) instead. If a third-party library's types are genuinely broken, isolate the `any` to a single, clearly-commented adapter function at the integration boundary — never let it leak into game logic.
- **No implicit `any`** either — every function parameter, every variable that isn't immediately inferable, gets an explicit type.
- **Prefer discriminated unions over optional-everything interfaces.** Example from the doc kit itself: `docs/DATA_MODEL.md` Section 2.3's `WaveDefinition.clearCondition` is a discriminated union (`{ type: "timer"; durationSeconds } | { type: "boss_death" }`), not a single interface with an optional `durationSeconds?`. This pattern should be the default whenever a data shape has genuinely different fields depending on a `type`-like discriminant — it makes invalid states (e.g., a `"boss_death"` wave with a stray `durationSeconds`) unrepresentable at the type level, not just invalid-but-compiling.
- **Always export explicit types/interfaces** for data structures passed between modules — no inferred "shape" objects silently passed around.

## 2. Naming Conventions

- **`PascalCase`** for classes and Phaser scene/entity files: `PlayerController.ts`, `EnemySpawner.ts`, `WaveSystem.ts`.
- **`camelCase`** for utility/helper files and functions: `mathUtils.ts`, `getWeaponRangeInUnits()`.
- **Config entity `id` fields:** `snake_case` strings (e.g., `"pulse_pistol"`, `"drone_swarmer"`), per the examples throughout `docs/DATA_MODEL.md` and `docs/DECISIONS.md` Decision #006. These are **stable identifiers** — see Section 5 below for the rules governing them specifically.
- **Boolean variables/fields:** prefix with `is`/`has`/`should` (`isBossWave`, `hasStartingWeapon`) — already the convention used throughout `docs/DATA_MODEL.md`'s interfaces; keep it consistent in implementation.

## 3. File & Function Size

- **Max file length: 300 lines** (soft limit). If a file is approaching this, split into modules along a natural seam (e.g., separate the config-validation logic from the config data itself) rather than continuing to append.
- **Max function length: ~50 lines** (soft limit). A function doing multiple distinct things (e.g., "validate input AND compute result AND format output") should usually be three functions, not one.
- These are **soft limits, not lint-enforced hard errors** — a slightly-over-length function that's genuinely one cohesive piece of logic is fine; a 300-line function padded with unrelated concerns is not, even if it were somehow under the line limit.

## 4. Variable Declaration

- **`const` by default.** `let` only when a variable is genuinely reassigned. **Never `var`.**
- Prefer declaring variables as close to their first use as possible, not all hoisted to the top of a function.

## 5. Config Entity Rules (Extends `docs/DECISIONS.md` Decision #006)

Since `docs/DECISIONS.md` Decision #004 locks the data-driven, config-object entity pattern, config files carry unusual weight in this codebase — these rules exist specifically because of that architectural choice:

- **`id` fields are permanent once shipped.** Never reused, never renamed after the entity has appeared in a real build (per `docs/DATA_MODEL.md` Section 2.1's comment on `WeaponConfig.id`). If a weapon needs renaming for *display* purposes, change `displayName`, not `id`.
- **Before renaming or removing any `id`,** grep the entire `src/config/` directory (and `docs/DATA_MODEL.md`/`docs/GDD.md` for documentation references) for that exact string — per `docs/DATA_MODEL.md` Section 6's migration note. This is not optional due diligence; a silently-broken cross-reference (e.g., a `WaveDefinition.enemyComposition[].enemyId` pointing at a renamed enemy) is exactly the failure mode `docs/TEST_STRATEGY.md` Section 2.1's config-validation tests exist to catch — but catching it in a test is a fallback, not a substitute for not breaking it in the first place.
- **Reordering entries within a config file is always safe** — never rely on array index/order for anything; if code appears to depend on config array order, that's a bug to fix, not a pattern to preserve.

## 6. Comments

- Comments explain **why**, not **what**. Don't narrate obvious code (`// increment score` above `score++`).
- Reserve comments for: non-obvious logic, workarounds for a specific bug/limitation, or references to a `docs/DECISIONS.md` entry that explains why the code does something a certain (possibly non-obvious) way. Example pattern already used throughout this doc kit's own `docs/API_REFERENCE.md`: `// per docs/DECISIONS.md Decision #011` style references are the right level of comment density to carry into actual code comments too.
- **All comments and identifiers in English**, regardless of what language project conversations happen in (per `AGENT.md` Section 3).

## 7. Error Handling (Extends `docs/DECISIONS.md` Decision #008)

- **Service-layer code (`src/services/`) never throws on expected failure paths** — resolves a failure-indicating value instead (`null`, `false`, a `status` field), per `docs/DECISIONS.md` Decision #008. This applies to every service, not just `LeaderboardService`/`StorageService` — any future service (V2's `AIContentService`, per `docs/versions/v2_AI_FEATURES.md` Section 2.3) follows the same convention.
- **Game-logic code (`src/systems/`, `src/entities/`) may throw for genuinely unexpected/programmer-error conditions** (e.g., a config validation failure that should never happen if `docs/TEST_STRATEGY.md` Section 2.1's tests are passing) — the never-throw rule is specifically about *expected* failure paths (network, storage), not a blanket "never throw anywhere in the codebase" rule.
- **Never swallow an error silently** without either handling it meaningfully or explicitly logging why it's safe to ignore — a bare empty `catch {}` block is not acceptable.

## 8. Module Boundaries (Extends `docs/DECISIONS.md` Decision #009)

- **Only `LeaderboardService` imports/calls Supabase. Only `StorageService` imports/calls `localStorage`.** No other file in the codebase should import a Supabase client or call `window.localStorage` directly — route through the service.
- This is currently enforced **by convention, not tooling** (per Decision #009's own consequences section) — until an ESLint rule exists to catch violations automatically, code review (human or AI) is the enforcement mechanism. Any AI agent reviewing a diff that adds a direct `localStorage` or Supabase call outside these two services should flag it, not wave it through.

## 9. Testing Requirements (Ties to `docs/TEST_STRATEGY.md`)

- Every new config entry (weapon, enemy, wave) should be covered by the config-validation tests in `docs/TEST_STRATEGY.md` Section 2.1 — these tests should be written to validate *any* entry generically (uniqueness, cross-references, pairing rules), not hand-written per-entity, so adding a new config entry doesn't require also adding a new test.
- Every new public method on a system/service (anything that would need an entry in `docs/API_REFERENCE.md`) needs a corresponding unit test per `docs/TEST_STRATEGY.md` Section 2.2/2.3's pattern.
- Per `AGENT.md` Section 2 Rule 5: a functional change without a corresponding test update is incomplete work, not "done, tests later."

## 10. When These Rules Don't Cover a Situation

Per `AGENT.md` Section 2 Rule 2: if a situation isn't covered here, default to the strictest reasonable TypeScript/clean-code convention, and **note the gap** (in a PR description, in `.ai/context.md`, or as a flag to the human) rather than silently establishing a new unstated convention that the next AI agent won't know about.
