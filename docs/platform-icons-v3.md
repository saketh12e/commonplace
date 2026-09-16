# Commonplace v3 platform identifiers

16 September 2026. Scope: `PlatformBrand.tsx`, local platform vectors, and comparison controls. The parent owns integration into `PlatformIcon` in `ui.tsx`.

## Asset provenance and licensing

The three brand paths come from **Font Awesome Free 6.7.2 by Fonticons, Inc., copyright 2024**, distributed under **Creative Commons Attribution 4.0 International** for SVG icons. This is the SVG artwork license, not Font Awesome's separate font or code licenses. Local original SVGs retain upstream attribution comments; `public/platforms/LICENSE.txt` retains the upstream license notice. The inline component also carries attribution and license links.

- [Apple SVG source](https://github.com/FortAwesome/Font-Awesome/blob/6.7.2/svgs/brands/apple.svg): the recognizable bitten Apple mark for macOS.
- [Windows SVG source](https://github.com/FortAwesome/Font-Awesome/blob/6.7.2/svgs/brands/windows.svg): the recognizable perspective four-pane Windows mark, preserving its asymmetric panes and spacing.
- [Linux SVG source](https://github.com/FortAwesome/Font-Awesome/blob/6.7.2/svgs/brands/linux.svg): the Tux penguin silhouette, with face, belly, and feet preserved.
- [Versioned upstream license](https://github.com/FortAwesome/Font-Awesome/blob/6.7.2/LICENSE.txt), [Font Awesome licensing](https://fontawesome.com/license/free), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

These are informational platform identifiers adjacent to platform labels, without an endorsement claim. The upstream license notes that brand marks remain trademarks of their respective owners. An artwork license does not grant trademark rights. No Apple SF Symbols package, licensed system font, private glyph, or extracted font outline is used. This route deliberately uses openly licensed web SVG artwork rather than relying on Apple system-symbol redistribution rights.

## Rendering and integration

`PlatformBrand({ platform, size = 20 })` accepts the existing `Platform | 'all'` union and returns one decorative SVG. The parent can delegate `PlatformIcon` to this component. macOS, Windows, and Linux use inline vector paths, with no asset request. Web uses Lucide `AppWindow` (aliased Browser); iOS/Android use Smartphone; All uses Monitor. Text labels belong to the caller. Every root SVG has `aria-hidden="true"` and `focusable="false"`.

The brand artwork is unchanged. Its presentation uses a square 512-unit coordinate box and `currentColor`; Apple is centered by 64 units, Windows by 32. Tux is scaled uniformly to 87.5% and translated to align its 448-unit ink height with the other marks. At 20px and 24px, the common ink height is approximately 17.5px and 21px. This retains each brand's aspect ratio, interior negative space, and theme contrast without stretching or clipping. The upstream local SVGs remain in their original coordinate systems as attribution/source artifacts.

Only SVG/path geometry is included in the local SVGs: no scripts, event handlers, remote references, embedded images, fonts, filters, or foreign objects. `xmlns` declares the SVG namespace; it does not fetch a resource. There is no image generation or new package dependency.

## Comparison behavior and design lock

The slice follows `docs/design-v2.md` and `docs/refero-v2-patterns.md`: Cosmos identity/spacing, Dia readable typography, Raycast precise names/actions, neutral theme tokens, visible keyboard focus, and explicit committed URL state. All new UI rules live in `src/styles/comparison.css`.

- Add, replace, and remove operate on the existing `tools` query parameter. Valid IDs are deduplicated before the three-tool cap; unknown IDs cannot displace valid tools. Unrelated query parameters survive. Each committed operation pushes history without resetting scroll.
- Native labeled selectors expose catalog choices, excluding already selected tools. At capacity, Add remains focusable and explains how to replace/remove; it offers no fourth choice. Replacement keeps the same column control DOM node. Removal focuses the next remaining remove control, the previous final control, or Add when empty.
- `differences=1` is shareable and restored by Back/Forward. The five common facts are platform set, license, offline, self-hosting, and setup. Platform order/duplicates do not affect equality; license whitespace is trimmed. A row remains if any of up to three tools differs.
- Matching rows and project-specific prose are omitted in Differences only. Source links remain in the tool headers. The no-differences message explicitly qualifies the five recorded facts; it does not claim identical capabilities. Fewer than two tools show an explanatory prompt and available facts, never an equality claim.
- The table retains scoped headers, a caption, keyboard-focusable horizontal scrolling, mobile swipe guidance, and a sticky first column. Selection and filter controls use native semantics. Self-hosting false displays “No,” matching the actual boolean rather than inferring “Not applicable.”

Two pure exports in `Compare.tsx`, `comparisonIds` and `differingComparisonFacts`, provide a focused seam for parent tests without changing another owned file.

## Validation

- Scoped strict TypeScript compilation of both TSX files and dependencies: passed.
- Prettier check of the two TSX files, stylesheet, and this document: passed.
- Existing catalog/discovery/topics suite: 109 tests passed across three files.
- Isolated Chromium mount: 21 checks passed, including pure comparison edge cases, add/replace/remove focus, duplicate and capacity constraints, preserved URL parameters, Back/Forward, qualified no-differences state, and mobile scrolling/sticky headers. The test harness lives outside the repository at `/tmp/commonplace-sidecar-check.js` and changes no app entry files.
- Rendered review: 1440px light/dark comparison and 390px mobile comparison; 20px/24px vector samples in light/dark. Local SVG XML allowlist validation passed for all three sources. Review caught and corrected inherited low-contrast utility-button colors in the comparison stylesheet.
- Final dark comparison axe scan: zero WCAG 2 A/AA and WCAG 2.1 AA violations in the comparison subtree. This automated check complements the keyboard and rendered review; it is not a full accessibility certification.
- Full-app typechecking was blocked during parallel integration by missing parent imports for Alternatives, Stacks, and Trail in `App.tsx`. This is not a full-app build acceptance claim; parent integration still needs its final check.
