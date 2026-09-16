# Architecture

## Current application

React + TypeScript + Vite produces static assets. React Router handles browser navigation. The typed catalog and curated release snapshots are imported local data; browsing makes no runtime catalog or release API requests. Zod validates locally restored preferences, shelf IDs, stacks, trail and release read state. Radix Dialog supplies modal focus trapping, Escape behavior and focus restoration. Lucide icons, local project artwork and DM Sans Variable avoid remote font/icon dependencies.

Discovery is available immediately; collections, comparison, alternatives, stacks, trail and release radar are lazy-loaded routes. Discovery initially displays 12 cards with incremental display. The current catalog has 46 tools, ten categories, seven topics and nine curated collections. Synchronous deterministic matching remains appropriate to this implementation; add indexing or a worker only when measured catalog size and latency justify it.

## Route and state ownership

| Area                              | Implementation and state                                                                                                                                                                                                                                                                           |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Discovery, recommendations, shelf | `pages/Discover.tsx` at `/`, `/for-you`, `/shelf`. Search/filter/sort/view criteria live in URL parameters. Query changes replace history; committed category/topic, OS and view actions create navigable states.                                                                                  |
| Tool details                      | `components/Dialogs.tsx`, opened by `?tool=<id>`. A valid opened tool records a local trail visit.                                                                                                                                                                                                 |
| Curated collections               | `/collections` and `/collections/:id`, using maintained catalog IDs.                                                                                                                                                                                                                               |
| Alternative finder                | `pages/Alternatives.tsx`, `/alternatives?from=<source-app>&platform=<platform>`. The source picker derives 94 unique names from catalog `alternatives`; case-insensitive source matching and the deterministic discovery platform filter produce results. Source-picker search text is view-local. |
| Personal stacks                   | `pages/Stacks.tsx`, `/stacks` and `/stacks/:id`; browser-local records owned by `LibraryProvider`. A stack URL on another browser may have no corresponding record.                                                                                                                                |
| Discovery trail                   | `pages/Trail.tsx`, `/trail`; recent valid tool IDs and current local shelf/stack state supply category coverage and four milestones.                                                                                                                                                               |
| Comparison                        | `pages/Compare.tsx`, `/compare?tools=<ids>&differences=1`. Add/replace/remove and differences mode preserve unrelated parameters and support history navigation.                                                                                                                                   |
| Release radar                     | `pages/Updates.tsx`, `/updates`. Shelf/category/unread filters are view-local; explicit read state is stored separately in the browser.                                                                                                                                                            |

Comparison validates and deduplicates known tool IDs before the three-tool cap. Differences-only compares platform set, license, offline, self-hosting and setup. It omits matching rows and project-specific prose while retaining source links. The empty-difference message is qualified to those five recorded facts; it does not claim identical capabilities. Native selectors allow add/replace/remove without rebuilding the selection. The table preserves row/column headers and accessible horizontal scrolling.

## Browser-local library

`AppProvider` owns shelf saves, the local discovery profile, transient comparison-tray selection and shared dialog/notification state. The new `LibraryProvider` in `src/lib/library-context.tsx` owns stacks and recent visits. Stack membership and shelf membership are independent: adding a tool to a stack does not implicitly save it to the shelf, and deleting a stack does not remove shelf saves.

`useStored` uses schema-validated JSON under the `commonplace:v1:` prefix. Invalid or unreadable stored values fall back to defaults. Failed writes leave state usable in memory and expose a persistence flag for a session-only notice. These are local browser data, not authenticated profiles, shared records or cross-device sync.

| Storage suffix       | Owner and bounds                                                                                                                                                                                                                                                                              |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `saved`, `profile`   | `AppProvider`; existing shelf/profile schemas.                                                                                                                                                                                                                                                |
| `stacks`             | `LibraryProvider`; at most 60 stacks, 60-character names, 600-character notes and 100 tool IDs per stack. IDs and creation timestamps are validated. Restore removes duplicate stack IDs and normalizes membership to unique known catalog IDs. Create/update also normalize tool membership. |
| `trail`              | `LibraryProvider`; at most 60 recent unique known tool IDs. Opening a tool moves it to the front; revisiting does not duplicate it. Restore removes unknown/duplicate IDs.                                                                                                                    |
| `release-radar:read` | Release radar; schema bounds IDs to 160 characters and the stored list to 10,000 entries. Independent of shelf membership and stack/trail storage.                                                                                                                                            |

These bounds describe local validation, not deployed service capacity.

Stacks support create, edit name/note, tool selection, removal, confirmed deletion and JSON export. `StackPicker.tsx` adds a tool from its detail dialog to an existing stack or creates a new stack containing it; existing membership is shown as already added. Export uses `format: commonplace-stack`, version 1, name, note and tool records containing ID, name, website and repository. It downloads locally; no import, account, hosted sharing or synchronization service is implemented.

Trail progress derives from current retained state: **First find** opens one tool, **Good eye** saves three tools, **Wide angle** explores three categories and **Toolkit ready** creates a stack with at least three tools. Clearing history affects visits and category coverage, not shelf or stacks. Milestones are derived indicators rather than permanent awards; changes to retained history, saves or stack contents can change earned state.

## Release snapshots and manual curation

`src/data/releases.ts` contains **eight actual upstream release snapshots**, checked on 16 September 2026. Each records stable identity, tool ID, tag/title, official URL, upstream publication time, source API URL, checked time and editorial summary. These are selected static observations, not live polling, an exhaustive history or catalog addition notices. [Release sources](releases-v3-sources.md) document the official responses and retrieval evidence in `work/research/v3-releases/`; raw research is not imported into the browser bundle.

All releases / From your shelf combines with category and unread filters. Individual toggles and Mark visible read are explicit; opening an official link does not mark it read. Reset read status is confirmed and clears the stored read IDs, including those outside current filters. The release ID distinguishes versions, so an unseen version starts unread.

Maintainers continue manual typed-catalog changes and reviewed pull requests, following [CONTRIBUTING.md](../CONTRIBUTING.md). `addedAt`, `verifiedAt` and release `publishedAt` have separate meanings. No automated curation or publishing pipeline is implied.

### Multiple tabs and storage availability

`useStored` listens for same-origin storage events so open tabs receive shelf, stack, history and read-state changes. Functional edits read the latest stored record before committing; creating a separate stack in another tab therefore preserves existing stacks. Writes occur outside React state updaters and opening a tab does not rewrite an old snapshot. This is browser-local persistence, not collaborative editing or synchronization between devices. Simultaneous edits to the same record retain last-write behavior.

When browser storage is blocked or full, the hook retains state in memory and surfaces a notice. Further actions use the in-memory value rather than reloading an older disk value. A refresh then loses that session's unsaved changes.

## Contributions and future in-app intake

Repository contributions are open through GitHub issues and reviewed pull requests. Active forms cover bugs, feature proposals and tool suggestions (tool name plus official link). Follow [CONTRIBUTING.md](../CONTRIBUTING.md). Suggestions require maintainer review before publication.

The in-app `SubmitDialog` still displays a paused notice. No email action, developer-DM integration or send endpoint exists. The future two-field DM intake needs an explicit destination, backend and validation before it can claim delivery. The old multi-field issue form under `docs/templates/` is historical; the active two-field GitHub form is in `.github/ISSUE_TEMPLATE/`.

## Future AI boundary

A model may eventually assist with description drafting and needs-based suggestions. It should consume the same validated catalog and return tool IDs with evidence, never fabricated products, compatibility or license claims. Keep deterministic search as a fast fallback. AI, accounts, paid products, subscriptions and scheduled digest delivery are deliberately outside this design-first base.

## Adaptive appearance, motion and brand

Semantic CSS variables define Light and Dark surfaces, text, borders, glass, selection, focus and status. `Appearance.tsx` offers Light/Dark/System; `lib/theme.ts` persists the choice and observes OS and cross-tab appearance changes. Self-hosted `public/theme-init.js` resolves preference before the main module. System is the default; explicit choices override OS changes.

The current discovery and sidebar reference lock is [design-v5.md](design-v5.md). [design-v3.md](design-v3.md) and [v3 screen/flow research](research-v3-interactions.md) document the earlier feature foundation. Research distinguishes observed screens, documented behavior and proposed choreography; it is not an implementation checklist claimed complete. [design-v2.md](design-v2.md) and [v2 patterns](refero-v2-patterns.md) remain historical context. CSS and bounded pointer-property updates provide the interaction effects; there is no animation framework, shader, video background or AI runtime. Keep reduced motion, touch and reduced transparency usable, with no gradients or neon.

| Stylesheet                     | Responsibility                                                      |
| ------------------------------ | ------------------------------------------------------------------- |
| `styles/tokens.css`            | Semantic color and typography variables.                            |
| `styles/app.css`               | Shared chrome, components and route foundations.                    |
| `styles/discovery.css`         | Established discovery edits, brand and topic explorer.              |
| `styles/experience.css`        | Shipment 3 navigation, interaction, alternatives, stacks and trail. |
| `styles/releases.css`          | Scoped release radar UI, imported by Updates.                       |
| `styles/library-rail.css`      | Grouped category navigation and compact sidebar.                    |
| `styles/discovery-folders.css` | Stable category folders and direct tool interactions.               |
| `styles/tool-motion.css`       | Tool colors and bounded card feedback.                              |
| `styles/comparison.css`        | Comparison controls and responsive table, imported by Compare.      |

`PlatformBrand.tsx` supplies decorative inline SVG platform identifiers. macOS, Windows and Linux use Font Awesome Free 6.7.2 artwork with recorded **CC BY 4.0 attribution**; callers provide text labels. Source SVGs and the retained license are under `public/platforms/`. [platform-icons-v3.md](platform-icons-v3.md) records exact source links, presentation changes and attribution/trademark boundaries. Project logos remain local under `public/logos/`; the Commonplace identity is under `public/brand/`.

## Discovery modules

`data/catalog.ts` combines the established catalog with `data/expansion.ts`. `data/categories.ts` and `data/topics.ts` define the broad categories and capability edits. A valid incoming topic takes precedence over category. Unknown topics fall back to the broad category or full library. Topic changes clear pagination and the mutually exclusive category/topic key while preserving other discovery criteria.

`TopicExplorer.tsx` separates preview state from committed URL state. Focus and pointer movement preview a topic; following its link commits it, including modified-click navigation. Desktop has a preview pane, touch has inline logo previews, and short landscape layouts retain a shrinking scroll region. IME composition is excluded from keyboard navigation handling.

## Deployment boundary

The application can be built into static assets and searches locally. No authentication backend, sync service, production capacity measurement or deployment success is asserted here. A community size alone is not a concurrency specification.

A future host requires HTTPS, SPA fallback to `/index.html`, immutable caching for hashed assets, appropriate revalidation for the entry document, logo caching and tested security headers. A Content-Security-Policy must account for existing inline style/custom-property use without introducing blanket script exceptions. The source repository is `saketh12e/commonplace`. A hosting project, domain and website deployment policy remain separate decisions; publishing source to GitHub does not deploy the application.
