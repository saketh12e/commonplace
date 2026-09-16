# Commonplace v2: screens and flows

Research date: 2026-09-16. Scope: interaction research only; styles, brand, implementation and rendered-product QA belong to the parent. **6 concrete screen searches, 2 flow searches, 8 full screen records, 4 screenshot inspections, 2 full flows (11 recorded steps).** Raw tool responses and screenshot bytes are preserved in [the evidence folder](../work/research/v2-patterns/).

## Primary recommendation: a visual “Browse topics” drawer

Place a prominent **“All software ▾”** topic button next to the library heading, changing to the selected category name. Its accessible label is “Browse topics, current topic: …”. Opening it reveals a searchable topic list and a preview of the selected topic: a short explanation, a truthful matching-tool count, and three large real project logos. This makes categories tangible before someone knows a product name.

This is a **Commonplace synthesis**, not an interaction claimed to exist verbatim in Refero. The dominant product reference is **Cosmos Explore S1**: preview the contents of a collection before opening it. Borrow only Raycast’s compact search/action structure (S3/S7) and fal’s explicit scoped filtering (S4). Parent owns the visual style.

- **Desktop:** a dialog around 720–800px wide, anchored visually near the topic trigger, with topic links on the left and a stable preview on the right. Dimensions are proposed starting points. Retain a visible close control.
- **Selection:** keyboard focus or pointer hover on a topic may update its informational preview; neither changes results. Enter or a single click on the topic link commits it and closes the drawer. No additional Apply step for one category.
- **Touch:** one-column sheet with all category names and small logo previews in each row; one tap selects. Do not require hover, swiping or a second tap. The search field must not automatically summon the mobile keyboard.
- **Taxonomy:** reuse the 10 existing category IDs: ai, agents, browsers, automation, design, development, productivity, privacy, media, utilities. Include “All software”. Avoid invented nested taxonomy and separate role-based menus.
- **Content:** show exact category labels plus the existing short descriptions. Examples: “Web browsers”, “Agentic tools”, “Photo, video & audio”. Topic search matches labels, descriptions and maintained aliases; it does not silently run a tool search.
- **Logo treatment:** proposed 64–80px logos in the drawer preview, 80–112px on the main project cards. Preserve intrinsic aspect ratio with contain sizing and reserved dimensions; verify transparent/dark marks against both themes. The logos carry identity, with a neutral backing only where needed. No gradients, glow or decorative neon.
- **Placement:** keep Explore, Saved and Collections as stable destinations in the existing shell. Use one canonical topic entry point instead of repeating ten categories in both the sidebar and a wrapping chip row. Collections and Saved are user destinations, not software categories.

The current source already has category URL state, ten categories, a command dialog and shelf storage. This proposal can build on those structures. Named personal collections would require new state; the current app stores saved tool IDs and curated collection definitions.

## Screen evidence and bounded adaptations

“Visual” means the actual MCP image was inspected. “Metadata” means the full screen record was read; it is not a claim of image inspection. UUIDs are the durable evidence IDs.

| ID / reference                                                                                                                               | Inspection         | Concrete evidence and adaptation                                                                                                                                                                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **S1 Cosmos Explore** [99d2b4af-6ea0-499e-adb6-3732cdbdaec3](https://refero.design/pages/99d2b4af-6ea0-499e-adb6-3732cdbdaec3)               | Full + visual      | Two-column collection cards use collages, titles, item counts and separate Follow/Following controls. An Activity panel overlays the upper right. Borrow content previews and separate collection action; do not borrow social-feed chrome.                                                                    |
| **S2 Cosmos type filter** [2971ab3a-4807-473e-ae03-b144f62b28e6](https://refero.design/pages/2971ab3a-4807-473e-ae03-b144f62b28e6)           | Full + visual      | Bottom floating “Type” panel, two rows of options, Notes selected, Reset plus separate cancel/check controls. One collection result remains visible above. Borrow explicit selected/reset states; reject detached positioning and unlabeled confirmation icons.                                                |
| **S3 Raycast empty command search** [370ddbce-beea-405c-86d5-f43e61f6a453](https://refero.design/pages/370ddbce-beea-405c-86d5-f43e61f6a453) | Full + visual      | Small search overlay, “Explore” section, Browse Extensions and Create an Extension rows; first row highlighted with an Enter hint. Borrow useful empty-query actions and concise rows. Avoid making the entire library depend on knowing a shortcut.                                                           |
| **S4 fal empty collection** [05b3e10a-4fff-45b5-a76e-0c0713410c1b](https://refero.design/pages/05b3e10a-4fff-45b5-a76e-0c0713410c1b)         | Full + visual      | Selected collection with count in sidebar, scoped “Search CHANEL…”, breadcrumb, inline toolbar, empty message with Add assets/Upload/New subcollection, active-filter chip and Clear all at right. Borrow scope clarity and recovery actions. Reject permanent third panel and zoom controls for this library. |
| **S5 Coolors empty collections** [ec05d4e8-31c2-42ae-904b-31c483cea0ed](https://refero.design/pages/ec05d4e8-31c2-42ae-904b-31c483cea0ed)    | Full metadata      | Empty collection message and a New action in the sidebar. Use the explicit zero state; improve locality with “Explore software” in the empty Saved canvas.                                                                                                                                                     |
| **S6 Rise command palette** [afa7b140-19db-49a9-8241-bd428fc498bf](https://refero.design/pages/afa7b140-19db-49a9-8241-bd428fc498bf)         | Full metadata      | Command groups and right-aligned shortcuts over an existing sidebar workspace. Borrow grouping and hints; exclude irrelevant/destructive commands from Commonplace discovery.                                                                                                                                  |
| **S7 Raycast search suggestions** [d907406e-b209-461b-a53a-bf87e3c406b6](https://refero.design/pages/d907406e-b209-461b-a53a-bf87e3c406b6)   | Full metadata + F2 | Result icons, names and descriptions, plus “View all results”. Borrow the handoff to durable full results; no installation or launch claims.                                                                                                                                                                   |
| **S8 Cosmos connected success** [1ef50c75-9754-4ef4-969e-a9980cdaf94c](https://refero.design/pages/1ef50c75-9754-4ef4-969e-a9980cdaf94c)     | Full metadata + F1 | “Connected to Evo”, updated Connections count and new cluster in list. Borrow confirmation that both the collection and item membership exist.                                                                                                                                                                 |

The four returned “full” images are 800px-wide JPEGs; they support composition and visible-control observations, not exact source CSS measurements. Refero prose contains speculative motion, hover, color and geometry suggestions. **No animation was watched.** In S2, the image shows two rows despite the record describing a horizontal row; the image takes precedence. In S1, the heading is centered despite prose describing it as left aligned.

## Two full flows

**F1 — Cosmos, Create and Connect Cluster, [flow 844](https://refero.design/flows/844), six recorded steps.**

1. Content detail with Connections rail — identify where to save the current item.
2. Open Connect menu — destinations include Your Library, Public Place and New Cluster.
3. New Cluster form — name, optional description and private toggle.
4. Private option encounters a premium gate — the record does not establish a completed upgrade.
5. Fill name “Evo”, optional description, private off.
6. Create closes the modal; “Connected to Evo”, count 17 → 18 and the new destination provide completion evidence.

**Adaptation:** retain one-click Save to the existing shelf. Offer “Add to collection…” as a secondary action only once personal collections are implemented. Its picker can create a named collection inline and add the originating tool as one operation. Preserve the tool ID while changing views. If persistence fails, retain the draft and membership intent and offer Retry; do not announce durable success. Cancellation leaves the shelf and memberships unchanged. Skip public/private and premium branching unless the product actually supports those concepts. Never use a checked icon as the sole completion signal.

**F2 — Raycast, Extension discovery and search, [flow 10105](https://refero.design/flows/10105), five recorded states.**

1. Store landing: categories/recency/popularity choices and search entry.
2. Empty overlay: browse/create actions.
3. Numeric query: no-results message with Build your own Extension CTA.
4. Changed query “arc”: matching rows and View all results.
5. Full results: icons, descriptions, authors, platform labels, Install buttons and pagination.

This is a recorded sequence that includes a recovery branch, not a mandatory five-step funnel. **Installation completion is not shown.**

**Adaptation:** Cmd/Ctrl+K and a visible Search control open the same palette. Empty input offers Browse topics, Open Saved and Open Collections. Search groups Tools, Topics and Collections; each row has an unambiguous destination. “View all results for …” transfers the query to the library URL. Preserve the active discovery/shelf scope, display it in the palette, and provide an explicit “Search all software” escape. For zero results, offer Clear filters or Explore all before Suggest a tool. A submission workflow is a secondary recovery path.

## Explore, Saved and collection behavior

- Explore shows category and platform scope adjacent to its result count. Keep platform, offline and self-host filters in a labeled toolbar and an optional expanded panel. Show active values as removable chips in the results region.
- Desktop filter toggles apply immediately. If the mobile sheet batches several filters, show draft choices, “Show N tools”, Clear and Cancel; commit one history entry on Apply. Cancel discards only the draft.
- Collection cards preview three or four real member logos, the title, a concrete purpose and count. Card navigation and Save tools are separate targets. Saving a curated collection currently saves its member tools, not a durable personal collection object; label the action **“Save N tools”** and report the number newly saved.
- Saved keeps the same card geometry and visible bookmark state as Explore. Preserve filters when entering Saved intentionally, but state the scope. Distinguish “Nothing saved yet” from “No saved tools match these filters”; show Explore software for the first and Clear filters for the second.
- Unsaving is immediate with an accessible Undo action. Restoring must preserve original item identity. A shelf count changes only after the state changes, not when a menu opens.
- Current storage is local to this device. Do not imply account sync or public collection links. If storage is unavailable, describe session-only saving truthfully.

## Keyboard, touch, URL and accessibility contract

| Concern             | Proposed behavior                                                                                                                                                                                                                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Topic drawer        | Named modal dialog, expanded state on trigger, focus contained while open, Escape/close dismiss, focus restored to trigger. Topic choices are real links: Tab and Enter work and modified-click can open a new tab. Informational previews do not steal focus or trigger navigation.                                        |
| Command palette     | Labeled search input; implement an actual combobox/listbox interaction if using arrow selection. Up/Down navigate, Enter activates, Escape closes. Use stable option IDs and expose active option; do not nest independent buttons inside options. Cmd/Ctrl+K must respect IME composition and existing modal context.      |
| Touch               | Proposed minimum 44×44px primary hit areas. Visible labels for filters/save, no hover-only actions. Sheet respects viewport height, safe area and scroll containment; zoom remains enabled.                                                                                                                                 |
| URL                 | Reuse existing `q`, `category`, `platform`, `offline=1`, `selfhost=1`, `sort`, `view`, `page`. Example: `/?category=design&platform=linux&offline=1`. Saved stays `/shelf`; curated collections stay `/collections/:id`.                                                                                                    |
| History             | Committed topic/filter changes push state; typing replaces transient query state. Reset pagination when scope changes, preserve unrelated filters/view/sort, and make Back restore the committed prior set. Opening/previewing/closing the topic drawer does not create history entries.                                    |
| Empty/invalid state | Unknown categories fall back to All software. Unknown collection IDs show a recoverable missing page. Keep query/filter explanation visible when there are zero matches. Counts and preview logos must use the same active constraints as the pending category. A zero-count topic remains selectable and honestly labeled. |
| Results update      | Keep focus on the activated control, update the heading/count, and announce a concise result count via a polite live region. Avoid repeated announcements for every preview or keystroke.                                                                                                                                   |
| Semantics           | Navigation uses links; toggles use buttons with pressed state or native checkboxes. Give icon buttons action+tool names. Avoid a card link wrapping Save/Compare buttons. Use an ordinary document grid rather than an ARIA grid unless its full keyboard model is implemented.                                             |
| Logos/theme         | Reserve image dimensions. Use empty alt text when adjacent text already names the project; provide a name when the logo is the only label. Test contrast and focus visibility in light, dark and system modes. Parent controls final colors/materials.                                                                      |
| Motion              | Any drawer fade is a proposal, not observed Refero behavior. Reduced-motion mode removes scale/sliding; no auto-advancing category carousel.                                                                                                                                                                                |

## Rejected alternatives

| Alternative                                     | Why rejected                                                                                                                                                             |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Command palette as the only category switcher   | Hides the taxonomy from browsing and touch users; keep it as the fast route. S3 provides a narrow pattern, not the primary navigation architecture.                      |
| Cosmos bottom floating type tray                | S2 separates selection from search/results and depends on small symbolic confirmation controls. Keep Commonplace filters beside the affected results.                    |
| A horizontally scrolling category carousel      | Ten categories become partly concealed; wheel/swipe discovery and positional memory are unnecessary burdens. A complete searchable drawer handles the existing taxonomy. |
| Large hover-only mega menu                      | Cannot be relied on for touch or keyboard; use an explicit trigger and single-activation destinations.                                                                   |
| Full fal asset-manager layout                   | Persistent details pane, upload, subcollections and zoom would overwhelm this software browsing task. Borrow only scoped filtering and empty-state recovery.             |
| Cosmos social/paywall language                  | “Connect”, Follow and private-cluster gating are specific to its product. Use Save and Collection with truthful current persistence.                                     |
| Decorative category emoji or miniature favicons | Weakens the user's requested project-logo emphasis. Use actual project marks with generous stable space.                                                                 |

## Evidence manifest and coverage limits

[manifest.json](../work/research/v2-patterns/manifest.json) records requests, selected screen IDs, inspected images, flow step IDs, source URLs and file hashes. The raw directory contains the exact MCP response objects, including text-encoded JSON and original base64 image responses; screenshots are decoded originals.

Six screen queries: “Cosmos explore clusters topics”; “Are.na channels search collections”; “Raycast Arc command menu search filters”; “Raindrop collections bookmarks filter”; “Cosmos”; “command palette”. Two flow queries: “Cosmos saving”; “creating collection”. All used web, page 1. Broad multi-brand queries returned substantial noise, so the final two searches narrowed the terms instead of paging farther. No claim of exhaustive coverage.

Cosmos and Raycast were actually returned. Are.na, Arc and Raindrop did not yield relevant in-app screens in these searches; “arc” in F2 is a Raycast extension search query, not evidence of Arc's own UI. fal, Coolors and Rise are explicitly labeled secondary matches.

Acceptance for the parent: verify topic selection with keyboard and touch, back/forward and deep links, matching counts, empty Saved versus filtered-empty, persistence failure, long labels, all three theme settings, and visible project logos. This research delivered no application changes and ran no product tests.
