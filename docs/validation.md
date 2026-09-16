# Validation record

First-iteration record. See [validation-v2.md](validation-v2.md) for current second-iteration results.

Date: 16 September 2026. Workspace: `<local-project>`.

## Automated build and data checks

- `npm run check`: passed strict TypeScript, 83 Vitest tests across two files, and the production build.
- Discovery: 54 tests cover search/intent ranking, platform compatibility, combined criteria, sorting and saved-only behavior.
- Catalog: 29 tests cover the 26 entries, unique identity, every category, local artwork, unsafe SVG content, source URLs and collection references.
- `npm run format:check`: passed.
- Production build: approximately 144 KB gzip for the two initially loaded JavaScript chunks, 15 KB gzip CSS. The full build directory is approximately 1.2 MB, including logo assets and international font subsets. The English UI uses the Latin subsets; browser font loading is scoped by unicode ranges.

These are local asset measurements, not network latency or production concurrency results. There is no AI SDK, animation runtime, remote-font request or application server on the browsing path. The local preview server does not represent CDN compression/cache configuration.

## Browser behavior checked

Playwright CLI with Chromium; a local browser installation is in `work/browsers`. The development build was exercised at port 5173, followed by a production-build smoke check at port 4173.

- Need-based search finds GIMP for “edit photos”; unmatched text returns a genuine empty state.
- Load more advances from 12 to 24 to all 26 tools. Category + OS filtering combines, macOS excludes Windows-only ShareX, alphabetical sorting and list view work.
- Saves survive reload; Shelf shows saved entries. Saving a curated collection adds its four tools without duplicates.
- Three-tool comparison limit, feedback, copied link and reloadable URL work. Mobile comparison scrolls within its own region; the page stays within the viewport. Its label column remains visible while swiping.
- Optional onboarding Skip, Back retention, saving, compatible recommendations, persistence and explicit OS override work.
- Cmd+K focuses Quick search; arrow keys move to a result; Enter opens tool details; Escape dismisses dialogs. Closing a dialog returns focus to its opening control.
- Missing contribution fields, insecure URLs and duplicate projects are rejected. A valid test draft generated a real downloaded JSON file with `status: draft`. This did not send or publish a contribution. Test artifact: `output/playwright/contribution-draft.json`.
- Dark choice survives reload. Explicit Light overrides an OS Dark setting. System follows an OS Dark setting and changes immediately when the emulated OS switches to Light.
- When browser storage throws, a visible notice appears and saving still works for the current visit.
- Reduced-motion emulation removes tool-card and logo translation; transition duration is effectively zero.

## Responsive and visual review

Light and Dark were captured at widths **320, 390, 768, 1024, 1440 and 1920**. At every sampled size, the document remained within the viewport and no loaded image was broken. Phone appearance, preferences, contribution and comparison screens were also captured. Screenshots were visually inspected; this revealed and corrected crowded featured logos, faint metadata, poor logo variants and cramped comparison columns.

Representative evidence in `output/playwright/`:

- `production-light-desktop.png`, `production-dark-desktop.png`, `production-light-mobile.png`
- `final-light-320.png` through `final-dark-1920.png`
- `light-profile-mobile.png`, `dark-appearance-mobile.png`, `dark-submit-mobile.png`
- `dark-compare-mobile.png`

A CSS `zoom: 2` stress capture was also taken. It is not equivalent to native browser zoom because CSS zoom does not change media-query breakpoints; it is not used as a native zoom certification.

## Accessibility scan

Axe-core, limited to WCAG 2 A/AA and WCAG 2.1 AA tags:

- **18 desktop route/theme scans:** nine routes in each theme, zero reported violations.
- **Six phone dialog/theme scans:** appearance, preferences and contribution dialogs in each theme, zero reported violations.
- Production dark discovery scan: zero reported violations.

Routes covered: discovery, collections, collection details, updates, shelf, personalized discovery, comparison, tool details and the missing-page fallback. No page exceptions occurred during the route audit. The production smoke check also checked route entry and asset responses.

Automated scans do not establish complete accessibility conformance. Safari, Firefox, actual phones, assistive-technology sessions and native browser zoom have not been independently tested. CSS includes keyboard focus, reduced-motion, reduced-transparency and forced-color fallbacks.

## Delivery scope

This is the complete local discovery/design base. Shared accounts, cross-device sync, hosted submissions, moderation backend, Codex ingestion, AI and scheduled digest delivery remain future integrations. Contributor templates, data/source documentation, a quality workflow and architecture guidance are included. No production service has been load-tested for 1,000 simultaneous users, and no remote GitHub/hosting destination has been guessed or modified.
