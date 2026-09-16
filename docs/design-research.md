# Commonplace: design reference lock

Date: 16 September 2026. Scope: an open-source discovery product, built directly in the supplied workspace. The user authorized autonomous design and implementation. Keep the established Commonplace name; validate any final trademark/domain choice separately before branding a public business.

## Research access

Initial Refero calls returned NO_SUBSCRIPTION; the user subscribed and reconnected the plugin. The parent session retained stale tool handles, so a fresh GPT-6 Astra research agent verified live access and completed 18 successful Refero calls: 3 full styles, 6 detailed screens, 3 full flows, and 3 screenshot downloads. The parent visually inspected all three screenshots. See [the live research report](refero-live-research.md) for exact IDs, provenance, and decision-by-decision synthesis. Raw results and screenshot hashes are in `work/research/refero-live-20260916T094645Z-4f17/`.

The Refero skill and its motion, craft, anti-pattern, and visual-workflow references were applied. Mobbin was installed but exposed no callable library tools; only its public site was examined. Firecrawl credits were exhausted; primary-source web research supplied the fallback. We make no claim to paid Mobbin research or to viewing animation videos.

## Reference synthesis

- [Raycast Store](https://www.raycast.com/store/extensions) and [its official extensions guide](https://manual.raycast.com/extensions): a searchable community catalog; clear project identity, compatibility and a detail step. Adapt category-based discovery and useful summaries, without copying its marketing language or importing installation counts.
- [Linear's interface refresh](https://linear.app/now/behind-the-latest-design-refresh): stable view controls and quiet navigation. Adapt a consistent workspace header and subdued sidebar; the catalog remains the visual focus.
- [Mobbin's public product](https://mobbin.com/): search, collections and connected journeys are distinct activities. Adapt saved-tool collections and responsive discovery. No claim to have inspected its subscription library.
- [Apple's Meet Liquid Glass session](https://developer.apple.com/videos/play/wwdc2025/219/): materials establish hierarchy and must remain legible. Adapt limited translucent controls, restrained shadow and fast response. This web design is an interpretation, not Apple's native rendering.

## Live reference lock

- **Dominant surface and type hierarchy:** Apple style `e02fcb85-b3eb-4b9e-985f-ab2044beb6cc`: neutral canvas, graphite text, white reading surfaces, precise separators, compact glass controls.
- **Catalog anatomy:** [Raycast Store screen](https://refero.design/pages/9e4bfde0-d22a-4646-aca0-1878bcf82e5a): two-column desktop catalog, logo beside name, searchable categories and a distinct featured collection. Its gradients are deliberately excluded by the user's brief.
- **Touch navigation:** [Apple Books library](https://refero.design/pages/c6bf8079-78aa-4092-9530-bb24598690c8) and [Target filters](https://refero.design/pages/559815b6-9589-4454-b4ce-9c617db56da6): readable list identities, contained translucency, persistent labeled tabs, and explicit filter state.
- **Optional personalization:** [Cohere flow 3790](https://refero.design/flows/3790), [VSCO flow 422](https://refero.design/flows/422), and [Clay flow 5853](https://refero.design/flows/5853): short device/use-case choices, Back, visible Skip, and editable preferences.
- **Supporting rhythm only:** Linear changelog style supplies measured spacing and font weights; it is a dark reference and is not represented as a light visual source. Shop supplies search/filter structure, not its commerce branding.

The browser pass increased metadata and control text sizes, corrected contrast, limited pointer-following translation to 1px, introduced a dedicated mobile logo row, and retained opaque catalog cards. Motion uses CSS and pointer coordinates, not a canvas, shader, animation runtime, or autoplay media.

## Chosen direction

A precise, light software workspace. Off-white cool canvas, white reading surfaces, graphite text, blue restricted to selection and links. Desktop persistent rail; compact header and bottom navigation on phones. Real software logos are the main color. No gradients, decorative photos, neon, artificial popularity, sprawling marketing hero or fixed square frame.

## Decision ledger

| Decision                            | Evidence and role                                 | Implementation                                                           |
| ----------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------ |
| Full browser canvas and fluid grids | User: every device, no square frame               | 320px through wide monitors; content-driven heights                      |
| Logo immediately beside name        | User                                              | Stable image box on every tool identity; no decorative badge after brand |
| Translucent moving selection        | User liquid-glass hover; Apple material hierarchy | Navigation selection, floating compare tray; opaque reading surfaces     |
| Quiet persistent navigation         | Linear hierarchy                                  | Rail with predictable headings; mobile tab navigation                    |
| Search by need + platform           | User; Raycast discovery                           | Deterministic keyword/intent matching with visible reasons; no AI claim  |
| Independent collections and shelf   | Mobbin public product                             | Curated workflows and locally saved favorites                            |
| Fast micro-interactions             | Refero motion/craft                               | 120–220ms opacity/transform, keyboard focus, reduced-motion rules        |
| Trust grounded in evidence          | User community curation                           | License, source links, verification date, no fabricated stars            |

## Delivery boundaries

This base includes local profile and shelf state, static curated catalog, explainable search, comparisons and exportable contributor drafts. Shared accounts, moderation backend, agent ingestion and AI are later integrations. A CDN can serve this architecture to a community of 1,000 without a per-user application server; that is an architectural fit, not a production load-test claim.

## Adaptive appearance, added at the owner's request

The brief expanded to Light, Dark and System on September 16. The already-retrieved full Linear Changelog style now supplies the dark reference: Canvas Black #08090a, elevated Surface Dark #141516, Line Graphite #34343a, light text #f7f8f8 and secondary text #d0d6e0. Commonplace adapts this to a slightly softer #111214 canvas, #1b1d21 reading surfaces and #b2b9c5 secondary text. These are deliberately tuned application tokens, not an exact copy.

Appearance is a persistent, immediately previewable three-way choice. System reacts to operating-system changes while open. A small self-hosted bootstrap applies the saved theme before React renders. All major surface, text, border, selection, status and glass roles use semantic CSS variables. Logos retain their authentic colors on stable identity tiles. Dark mode is tested independently; no gradients or neon are introduced.
