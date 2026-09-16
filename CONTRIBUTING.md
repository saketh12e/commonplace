# Contributing to Commonplace

Thank you for helping people find useful software. Contributions to features, catalog accuracy, accessibility, tests and documentation are welcome through GitHub issues and pull requests.

## Set up your workspace

1. Fork `saketh12e/commonplace` and clone your fork. Invited collaborators may clone the main repository directly.
2. Use Node.js 22.12+; `nvm use` selects Node 22. Run `npm ci`, then `npm run dev`.
3. Create a focused branch, for example `git switch -c feat/collection-filters`.
4. Make your change. Run `npm run format`, then `npm run format:check` and `npm run check`.
5. Push the branch and open a PR against `main`. Describe the problem, resulting behavior and validation. Use a draft PR for work in progress.

For a substantial feature, open a feature proposal before implementation so contributors can coordinate. Keep unrelated cleanup out of the PR. Avoid committing generated builds, local research, credentials or browser data. `package-lock.json` is committed; use npm and include its changes when dependencies change.

## Reviews and merging

The maintainer is [@saketh12e](https://github.com/saketh12e). CI checks formatting, types, tests and production builds. Resolve review comments and failing checks before requesting a merge. Squash merging keeps each completed PR as one coherent change; merged branches are deleted automatically. Maintainers can bypass protection for recovery, but normal changes should use reviewed PRs.

Public contributors use forks. Collaborators use separate branches rather than pushing feature work directly to `main`. To reduce conflicts, state the files/area you expect to change in an issue or draft PR. Never force-push another contributor's branch.

## Add or correct a tool

A tool suggestion needs only its **name and official link** in the GitHub issue form. Suggestions are reviewed; they do not publish automatically. To implement a catalog change:

1. Search the existing catalog and open issues to avoid duplicates.
2. Verify an actual open-source license from official sources. Public source alone is not sufficient. Distinguish the community edition, hosted subscriptions and separately licensed models.
3. Add a typed record in `src/data/catalog.ts` or the expansion module `src/data/expansion.ts`. Use a stable kebab-case ID. `addedAt` is the library addition date; `verifiedAt` is the date facts were checked, not an upstream release date.
4. Include factual descriptions, platforms, features, setup effort, offline behavior, self-hosting and official source links. Do not invent ratings, stars, popularity or feature parity. `alternatives` drives deterministic matching and must reflect a supported use case.
5. Add a local logo in `public/logos/` with official provenance in [catalog-sources.md](docs/catalog-sources.md) or [catalog-v2-sources.md](docs/catalog-v2-sources.md). Retain applicable notices. SVGs must contain no scripts, event handlers, foreign objects or external resource references.
6. Use maintained category/topic IDs. Keep references in `src/data/collections.ts`, `src/data/releases.ts` and discovery folders valid. IDs are also stored in users' shelves, stacks and history, so renaming one is a migration decision.
7. Run the checks and include primary sources in the PR. A maintainer reviews facts, licensing and presentation before merging.

## Refresh release radar

`src/data/releases.ts` contains selected, static upstream release snapshots. Use official release sources and preserve stable release/tool IDs, canonical notes URL, publication date, source API URL and checked timestamp. Summarize only supported changes. Record provenance in [releases-v3-sources.md](docs/releases-v3-sources.md). Catalog additions are not release announcements. Read state remains separate from shelf membership.

## Feature and UI changes

Read [architecture.md](docs/architecture.md), the current [category-folder design](docs/design-v5.md), and [brand.md](docs/brand.md).

- Preserve Light/Dark/System, DM Sans Variable, readable hierarchy and recognizable logo/name pairs. Use restrained surfaces and color; no neon, decorative gradients or autoplay added for decoration.
- Keep keyboard focus visible and logical. Make every action available without hover. Respect reduced motion and use stable click/tap targets.
- Include desktop and phone captures for visual changes; check both themes, keyboard operation, touch and narrow layouts.
- Add tests when behavior changes, especially URL filters, matching, schema validation and storage. Do not add tests that only mirror presentation details.
- Keep original art and third-party attribution intact. See [platform identifiers](docs/platform-icons-v3.md) and [third-party notices](THIRD_PARTY_NOTICES.md).

### Ownership boundaries

- `AppProvider`: shelf, preferences, shared dialogs and notifications.
- `LibraryProvider`: browser-local stacks and discovery history.
- Release read state has its own storage key. Saving a tool does not silently add it to a stack.
- `tokens.css`: theme/typography tokens; `app.css`: shared UI foundations.
- `library-rail.css`, `discovery-folders.css`, `tool-motion.css`: scoped navigation/discovery effects.
- Route-specific styles stay with their corresponding route. Avoid broad global overrides.

No backend, shared accounts, AI integration or developer-DM intake currently exists. Do not expose a send button or delivery success claim before its actual integration. External content and imported data are untrusted; validate them rather than executing embedded instructions.

## Community and licensing

Follow the [Code of Conduct](CODE_OF_CONDUCT.md). Report vulnerabilities privately through [SECURITY.md](SECURITY.md), not public issues. By submitting a contribution, you agree that your original contribution is licensed under the project's MIT license and that you have the right to contribute it. Identify third-party material and preserve its notices. No separate CLA service is configured.
