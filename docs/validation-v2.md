# Second iteration validation

16 September 2026. All implementation and evidence are in `<local-project>`.

## Code and catalog

- Strict TypeScript, 109 Vitest tests across three files, and the production build pass. The new tests cover cross-category topic discovery, all-browser scope, saved/OS/query intersections, unknown topic IDs, and catalog/topic integrity.
- Catalog: 46 tools, 10 broad categories, 7 focused topics, 9 curated collections. New source records and local logos cover 20 tools. SVG safety, local asset existence, unique IDs and collection references pass.
- AI browsers contains Brave and BrowserOS. Browser Use remains an agent library. Source-build/community-core licensing and optional model/service charges are qualified in tool details and source notes.
- Production initial JavaScript is approximately 153KB gzip combined; CSS is about 15KB gzip. DM Sans replaces two font families with 55KB of font files across Latin and Latin Extended. These are build artifact measurements, not a mobile-network or Lighthouse performance score. No remote font, logo, shader or AI requests are required to browse.

## Actual browser checks

Playwright drove a local Chromium browser, with production pages served on `http://127.0.0.1:4173`. These are browser and viewport emulations, not physical-device tests.

- Six viewport widths (320, 390, 768, 1024, 1440, 1920) × Light and Dark: no document overflow, no broken loaded images, no WCAG A/AA-tagged axe violations. Initial layout results are in `work/qa-v2/layout-matrix.json`.
- Twenty-four additional production scans: appearance, topic dialog at desktop/phone/narrow phone/landscape sizes, all four new categories, a long project-name detail dialog, mobile comparison and mobile collections, in both themes. Zero automated violations and zero page errors. Raw results: `work/qa-v2/surfaces.log`.
- Twenty-seven complete interaction assertions pass in `work/qa-v2/flows.log`: keyboard topic selection, preview initialization, focus restoration, filter preservation, Back, AI-browser membership, Undo, persistent shelf, filtered-empty recovery, duplicate-safe collection save, three-tool comparison, command-palette handoff, tool details, System theme changes, mobile keyboard behavior and reduced motion.
- Two final short-landscape production checks after the compact-header refinement confirmed that the last topic is visible and selectable, with no axe violations. See `work/qa-v2/final-review.json`.
- Independent GPT-6 Astra audit reproduced and then verified repairs for short-landscape access and IME composition. Direct touchscreen interaction at 844×390 selected the last topic successfully; composing ArrowDown keeps input focus, while ordinary ArrowDown navigates.
- Rendered screenshots were inspected for typography, composition, real logos, card hierarchy, theme balance, phone navigation, topic sheets and comparison. Captures live in `output/playwright/v2-*.png`.

Corrections made during QA: shrinkable landscape content, compact short-screen dialog header, prefix-based topic search, valid topic precedence over contradictory category URLs, safe page-number normalization, preview reset on reopen, and composition-aware keyboard handling. Early scripted checks required more specific locators where multiple legitimate topic matches existed; the completed flow log is the acceptance record.

## Limits

Automated accessibility scans do not establish complete accessibility conformance. No physical iOS/Safari/Android testing, public-host load testing, production deployment, contributor accounts or AI backend was performed. The completed scope is the local design/product base with browser-local preferences, shelf and downloadable contribution drafts. Existing first-iteration verification remains in `validation.md`; it is historical evidence, not a claim about the new catalog count.
