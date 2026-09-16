# Discovery motion validation — 16 September 2026

Local production preview: http://127.0.0.1:4173/. No deployment or Git push was performed.

- `npm run check`: TypeScript, all **192 existing tests**, and production build passed (`work/qa-v4/check.log`). Final interaction/semantics fixes were rebuilt successfully (`final-build.log`).
- **48 behavior checks passed** across the main flow and targeted follow-up (`behavior-summary.json`). These exercise three-second timing, hover/manual pause, next/previous, all seven collections, stable geometry, previews, keyboard holds, real detail links, modal focus restoration, explicit resume, catalog navigation, offscreen suspension, one-shot card jiggle, stable text, save/compare actions, canceled-pointer recovery, reduced motion, and five first-touch detail openings.
- **84 responsive cases passed:** seven collections × six widths (320, 390, 768, 1366, 1440, 1920px) × light/dark. No page overflow, copy/stage overlap, control overlap, unloaded images, or missing links. Narrowest icon hitbox: 47.19px. Evidence: `responsive.json`; actual PNGs in `output/playwright/v4-*`.
- **14 initial axe scans reported zero violations:** 12 spotlight cases and the light/dark card grids. Spotlight name contrast requires manual review because of the glass pseudo-element. A generic control container's incomplete ARIA result was corrected by giving it an explicit group role. Final light/dark scans and manual background-composited label calculations are recorded in `contrast-final.json`.
- Fresh Chromium confirmed the logo hover animation is 280ms and runs once. An older QA context retained touch emulation through navigation, correctly suppressing desktop-only animation; its failed harness result is retained in `interactions-touch-emulation.log`. A fresh desktop context passes the same check. This was a QA-environment issue, not a hover defect.
- GPT-6 Astra independent review found the canceled-pointer → keyboard-resume edge case. Keyboard activation now uses current playback state instead of stale pointer intent; both independent dev verification and the final production regression passed.

Scope: Chromium desktop rendering, emulated phone dimensions and touch input, actual responsive layouts, keyboard interaction, and automated accessibility checks with manual visual/contrast review. Hidden-tab suspension was tested with a synthetic visibility event; offscreen suspension was tested by scrolling. This does not claim physical-device/Safari testing, a full accessibility certification, or load-test results.

Source and build remain under `<local-project>`. A build hash manifest accompanies the validation artifacts. Existing fonts, layout identity, adaptive theme selection, and local storage data model are preserved. AI integration and public tool contributions remain deferred.

Final glass-label contrast across all seven editions and both themes is at least **12.34:1**. Final scans report zero violations; remaining incomplete results are the five pseudo-element-backed names, covered by the composited contrast calculation and visual review.
