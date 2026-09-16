# Release radar — shipment 3 sources

Snapshot checked **16 September 2026, 12:19:38 UTC**, using the actual execution clock. Eight latest stable releases returned by the selected catalog repositories' official GitHub `/releases/latest` endpoints. Each is published, non-draft, non-prerelease, and earlier than retrieval. These are selective static snapshots, not a live feed or an exhaustive release history. Dates displayed in the UI use UTC.

| Catalog ID | Official title (trimmed)                   | Published at (UTC)   | Source                                                                            | Full response in work/research/v3-releases/ |
| ---------- | ------------------------------------------ | -------------------- | --------------------------------------------------------------------------------- | ------------------------------------------- |
| ollama     | v0.34.1                                    | 2026-09-14T22:14:03Z | [Official release](https://github.com/ollama/ollama/releases/tag/v0.34.1)         | `ollama.json`                               |
| goose      | v1.50.1                                    | 2026-09-14T21:00:01Z | [Official release](https://github.com/aaif-goose/goose/releases/tag/v1.50.1)      | `goose.json`                                |
| brave      | Release v1.95.101 (Chromium 153.0.8010.37) | 2026-09-11T03:31:20Z | [Official release](https://github.com/brave/brave-browser/releases/tag/v1.95.101) | `brave.json`                                |
| zed        | v1.19.2                                    | 2026-09-09T17:41:24Z | [Official release](https://github.com/zed-industries/zed/releases/tag/v1.19.2)    | `zed.json`                                  |
| node-red   | 5.0.7: Maintenance Release                 | 2026-09-08T13:35:43Z | [Official release](https://github.com/node-red/node-red/releases/tag/5.0.7)       | `node-red.json`                             |
| penpot     | 2.17.2                                     | 2026-08-27T08:31:12Z | [Official release](https://github.com/penpot/penpot/releases/tag/2.17.2)          | `penpot.json`                               |
| localsend  | v1.18.2                                    | 2026-08-21T14:02:01Z | [Official release](https://github.com/localsend/localsend/releases/tag/v1.18.2)   | `localsend.json`                            |
| jan        | 0.8.4                                      | 2026-07-23T06:29:15Z | [Official release](https://github.com/janhq/jan/releases/tag/v0.8.4)              | `jan.json`                                  |

## Provenance and editorial review

The full GitHub JSON responses preserve release bodies, identifiers, asset metadata, publication dates, and canonical release URLs. Each `<tool>-fetch.json` preserves the requested API URL and actual retrieval timestamp; `<tool>-headers.txt` preserves the HTTP responses and redirects. `sourceApi` in the shipped data uses the immutable release-ID endpoint returned by GitHub. UI titles trim outer whitespace only; tags, dates, and official URLs are copied exactly. Summaries are editorial paraphrases of the saved body, never model capability guesses or catalog taglines.

- Ollama: the What's Changed section supports stable MLX safetensors creation, Apple Silicon memory improvements, faster model listings, and the required llama.cpp GGUF conversion workflow. The workflow change is retained because it affects users.
- Goose: the entire patch body describes reverting model updates and rolling back MCP default version selection. No new capability is claimed. The catalog's `block/goose` endpoint returns an HTTP 301, then the canonical `aaif-goose/goose` release. Header and JSON evidence preserve that transfer; the catalog itself was not edited.
- Brave: Leo and General sections support conversation sharing, address-bar calculations, duplicate-tab shortcut, and the precise Chromium version. Browser platform support is not inferred from the release.
- Zed: Languages/Git sections support call hierarchy and Git multi-select; the first paragraph and Guild section support untitled-buffer language detection. Breaking Changes explicitly documents search-on-type and its opt-out.
- Node-RED: patch notes support patched JSONata, dark-mode disabled wires, single-type input rendering, and file completion after filename evaluation error.
- Penpot: its three bug-fix entries support the two text/export fixes and SVG export security correction.
- LocalSend: introduction and feature/fix/security bullets support older-device compatibility, web drag/drop, signed Windows binaries, and refusal of peer HTTP redirects.
- Jan: Migration section explicitly distinguishes the automatic backend/keyring migration, retained old storage, and the behavior of subsequent changes when downgrading. The summary preserves that distinction.

## Interaction contract

`Updates` remains the route export, so the parent can rename the navigation without a routing change. The page imports `src/styles/releases.css`; all new selectors are scoped/namespaced. Existing `Logo`, `CategoryIcon`, `Modal`, `EmptyState`, `useApp`, and `useStored` are reused. No external API is called by the page.

All releases / From your shelf uses saved catalog IDs. Categories and unread-only intersect with the current scope. Mark visible read updates only the visible unread release IDs. Individual read changes are reversible. Reset read status requires a confirmation modal and clears all release read IDs, including those outside the current filters. Read state uses `commonplace:v1:release-radar:read`, independent of shelf data; blocked storage produces a truthful session-only notice. Opening an official link does not imply that the user read it. The official link opens a new tab with accessible text announcing it. Tool links use `?tool=<catalog-id>`.

## Design references

Two focused Refero screens were fetched and visually inspected before implementation:

- [Descript changelog](https://refero.design/pages/0daf0eb9-9796-41ff-8953-dd05a9f30c1e): date rail and concise chronological release entries.
- [Twist inbox](https://refero.design/pages/28b317de-f669-4cbd-86b5-dcf5df79fdfc): scope controls and explicit reversible read/done states.

The existing Commonplace design system remains primary: DM Sans, restrained neutral glass controls, a contained teal accent, and a single readable column. Refero's shadcn style informed subtle surface borders. Full reference responses and preimplementation decisions live in `work/research/v3-releases/refero-evidence.json` and `design-lock.md`.

## Verification

`src/data/releases.test.ts` checks catalog identity, per-release stable IDs, exact official metadata, the Goose transfer evidence, date ordering and nonfuture publication, recent snapshot coverage, safe canonical URLs, UTC boundary formatting, shelf/category/unread intersections, new-version unread behavior, orphan/future exclusion, and persistence schema bounds. Runtime filtering uses `Date.now()`, never a hardcoded current date. Raw upstream JSON and research files are not imported into the browser bundle.

Validation outcome: **16/16 data tests pass**. Chromium verified persistent read state, combined filters, reset/cancel, tool links, malformed/blocked storage, and 320px/390px layout. Scoped axe checks found zero WCAG A/AA violations in light/dark views and the reset dialog. Full typecheck reported no owned-file diagnostics; its latest run was blocked by unused imports in `Shell.tsx` (`ArrowRight`) and `Discover.tsx` (`PlatformIcon`), which remain with their owners. See `work/research/v3-releases/verification.md` and the saved screenshots for the evidence.

## Reproducible repository checks

Reduced upstream metadata and retrieval timestamps are committed under `src/data/__fixtures__/releases/`. Unit tests use those fixtures, so `npm run check` works in a clean clone without the local `work/` research archive. Release bodies are represented by their length and SHA-256 rather than republished prose.
