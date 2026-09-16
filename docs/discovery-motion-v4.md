# Discovery in motion

Historical record. The owner replaced this rotating design with [category folders and direct discovery](design-v5.md).

Designing the existing Commonplace spotlight and shared tool cards for desktop, tablet, and phone. Goal: introduce tools across the library without demanding attention or changing the established brand. Direct build from the existing product and the user's supplied screenshot.

## Reference lock

Primary: Commonplace's existing Things-inspired design, verified again through Refero's Things style (`0796cd74-edc2-4e12-9c71-25fac02a1cb2`). Preserve DM Sans, charcoal hierarchy, cool neutral canvas, generous space, and sparse soft depth.

Secondary: [Apple App Store](https://refero.design/pages/c634ccee-7041-41cd-a63d-6a0420d6840b) for varied recognizable app objects; [Shop discovery](https://refero.design/pages/66a8b970-b336-4b4e-9e6c-7c8d069be1ad) for clear browse controls and separation of catalog from featured content. Apple product style `04cc9d9d-a641-4552-b370-0dea414a15db` and Paste `1c0fbb80-f4ca-4c30-8f72-4a8f95a83005` inform bounded color roles and ambient depth only. Three style searches, three full styles, two full screens, one raw screenshot inspected. Raw results in `work/research/v4-motion/refero.json`.

These are static visual references, not evidence of actual animation timings. Motion follows the user's three-second request, Refero's motion craft reference, and the [WAI carousel pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/). Hidden-tab suspension follows the [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API).

| Decision                           | Source and role                                                 | Application                                                                              |
| ---------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Keep copy and layout stable        | Existing product, user: no clutter or changed family aesthetics | One headline and fixed geometry; only featured tool editions change                      |
| Rotate across purposes             | User request, Apple App Store icon variety                      | Everyday, design, privacy, media, AI, and development editions                           |
| Three-second automatic discovery   | User request                                                    | One timer while visible; pause on hover, keyboard focus, modal, hidden tab, or offscreen |
| Visible pause and previous/next    | WAI carousel pattern                                            | Controls precede rotating content; focus pause requires explicit resume                  |
| Pale tool-derived surfaces         | User request overrides Things' blue-only constraint             | Small local brand-tint mixes, not global chromatic navigation or semantic colors         |
| Brief icon settle on hover         | User request and Refero motion craft                            | One decaying jiggle; title, text, and click targets stay fixed                           |
| No gradients or typography changes | User's established constraints                                  | Original logos keep their own artwork; UI surfaces remain solid                          |
| Reduced motion                     | WAI and craft                                                   | Automatic rotation off by default, manual browsing available, spatial effects disabled   |

No new animation library, remote runtime requests, AI integration, or contribution backend.

## Shipped behavior

Seven editorial sets contain 30 distinct catalog tools. The heading and layout stay steady while the five tool tiles crossfade into a new set every 3,000ms. Incoming tiles settle over 300ms with 22ms offsets; outgoing artwork fades over 190ms, is inert, and is removed after 420ms. Names, official local logos, real tool-detail links, and tool-specific preview copy come from the catalog.

The visible play/pause control comes first in keyboard order. Previous and next wrap through all seven sets and stop autoplay. Hover temporarily suspends the interval; focus and touch interaction stop it until explicit play. A full interval restarts after hover/visibility suspension. Automatic rotation also stops offscreen and while global dialogs are open. Reduced motion offers manual browsing with no spatial effects. The progress line is decorative; screen readers do not receive automatic announcements. Manual edit titles are announced politely.

The shared color helper defines decorative artwork accents for all 46 catalog tools with category fallbacks. Cards use a 3% light-theme tint, increasing to 6% on hover/focus; dark mode uses 1.5%/3%. Spotlight color is derived from the currently previewed tool. LocalSend is muted teal, Blender muted orange, Bitwarden blue, and monochrome marks stay slate. Action and semantic tokens do not change.

Tool-card logos settle once over 280ms (-2°, +0.8°, -0.3°, rest), independently of pointer tilt. Text, card geometry, buttons, and targets stay still. The effect is limited to fine-pointer hover and keyboard focus, with touch press feedback and reduced-motion overrides. Existing navigation, selection, save, and modal micro-interactions remain in place.

Files: `src/components/ToolSpotlight.tsx`, `src/data/spotlights.ts`, `src/styles/spotlight.css`, `src/components/ToolCard.tsx`, `src/styles/tool-motion.css`, and `src/lib/tool-colors.ts`. No new dependency. Research and validation evidence are local under `work/research/v4-motion/` and `work/qa-v4/`.
