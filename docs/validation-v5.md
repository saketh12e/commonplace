# Category-folder validation — 16 September 2026

The supplied screenshot is the visual source. The previous rotating spotlight is replaced by four static category folders with real tool links. The sidebar now directly exposes the ten existing categories. No deployment or Git push was performed.

## Checks

- `npm run check`: strict TypeScript, **192 existing tests**, and production build passed (`work/qa-v5/check.log`). Changed source and documentation pass formatting.
- **20 responsive cases**: 320, 390, 620, 650, 760, 768, 1024, 1280, 1440, and 1920px, in light and dark. All four folders load their logos; titles stay on one line; tool names clear the folder fronts; there is no horizontal overflow or artwork collision. The narrowest tool target is 70px wide. Evidence: `responsive.json`.
- **Eight axe scans** of folders, sidebar, and header report zero violations. Automated contrast review cannot infer the SVG-backed folder fronts; actual foreground/background color calculations for all three text roles in both themes are recorded separately in `contrast.json`.
- **79 browser behavior assertions pass**, with the latest result for each assertion consolidated in `work/qa-v5/behavior-summary.json`. Raw evidence: `interactions.json`, `navigation.json`, and `navigation-final.json`. These cover static copy, hover feedback, actual tool details, focus restoration, collection links, category navigation, filters and browser history, compact rail/category browsing, short-window scrolling, reduced motion, and first-touch mobile opening.
- GPT-6 Astra independently verified sidebar counts, active states, filter preservation, history, 900px fit, 600px keyboard scrolling, and scroll behavior for category/topic changes. Platform changes and tool dialogs keep their existing scroll behavior.

Screenshots in `output/playwright/v5-*` were visually compared with the reference. Light-mode peach, lilac, blue, and sage are decorative folder identities; navigation/action colors and fonts retain the existing system. No doodles, autoplay, pause control, progress line, or changing lower caption remain.

Scope: Chromium, emulated device widths and touch, keyboard interaction, responsive geometry, automated accessibility checks plus manual contrast and visual review. This does not claim Safari/physical-device testing, a full accessibility certification, or capacity/load-test results.

The first focus assertion sampled before Radix's close-autofocus effect completed; it was corrected to wait for actual focus restoration. The CLI sandbox lacks a Node URL global, so URL assertions run in the browser context. These were test-harness corrections; no dialog behavior was altered.

Minimum verified folder-text contrast is **4.74:1**, across titles, descriptions, and counts in both themes.

The final production build passed (`final-build.log`). After rebuilding with the completed sidebar scroll handling, category navigation also passes the top-of-results check. All first-tap mobile, reduced-motion, compact-sidebar and short-window keyboard checks passed against port 4173. The final asset manifest is `final-build-manifest.json`. Superseded failed timing assertions remain in the raw logs; the consolidated summary records their successful reruns.
