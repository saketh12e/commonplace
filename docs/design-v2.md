# Commonplace — second design iteration

16 September 2026. Direct build authorized by the owner. Preserve the working React product, accessible interactions, browser-local preferences, and Light/Dark/System modes. This pass specifically addresses a weak identity, undersized project logos, undifferentiated typography, and insufficient category depth.

## Reference lock before implementation

Three successful style searches compared curation/identity, browser/product craftsmanship, and software-marketplace structure. Full references retrieved:

- **Cosmos** `74444750-8178-411c-87e0-ba0b45aeacce`, https://cosmos.so — primary direction for content recognition: large identifiable objects, generous local spacing, strong ink typography, restrained framing and pill controls. Bring project logos forward. Adapt its custom Oracle type rather than copying a proprietary font; keep the existing cool-neutral constraint instead of introducing warm editorial decoration.
- **Dia Browser** `b4f02424-cfb4-4d08-aa38-e6a9b55dfd71`, https://www.diabrowser.com — secondary role: measured 16px body typography, lighter display weights, deliberate tracking, contained glass surfaces. Its extracted style names DM Sans as a structural alternative. Its spectrum gradients and glow are explicitly excluded by the owner's brief. This is a design reference, not a claim that Dia is open source.
- **Raycast** `e5a749d7-9f71-4b52-9f50-24b243396034`, https://www.raycast.com — secondary role: precise icon/name recognition, action contrast and surface hierarchy in Dark. No radial glow, red accents or simulated window decorations.

The full tool responses and search records are preserved in `work/research/v2-styles/evidence.json`. Invalid extracted hex values and absurd extracted pill-radius numbers are not copied. Screens/flows and their evidence are documented separately in `refero-v2-patterns.md`.

## Decisions

| Decision                  | Source or requirement                                          | Implementation commitment                                                                                                                                                                                            |
| ------------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ownable Commonplace mark  | Owner: replace generic four squares                            | Original vector mark, recognizably open, compact silhouette; test small and large, monochrome and reverse. No generic sparkle, AI orb, or logo copied from a reference.                                              |
| Larger project identities | Owner; Cosmos object recognition; Raycast catalog              | 60px identity tile, 40–44px actual artwork, 18px project name; logos remain authentic and local.                                                                                                                     |
| Consistent new type voice | Dia type hierarchy; bundled typography guide                   | DM Sans variable, 400/500/600 weights; 15–16px reading text; 12–13px metadata; restrained 40–48px desktop heading. One coherent family.                                                                              |
| Topic explorer            | Owner: meaningful category expansion and distinctive switching | Searchable, grouped catalog of subjects with real counts and tool previews. Persistent URL criteria and visible return to all tools. Familiar keyboard and touch behavior under a new presentation.                  |
| Disciplined surfaces      | Cosmos and existing theme system                               | Porcelain canvas, ink text, readable opaque cards; glass concentrated on moving controls, dialog framing and navigation. Both themes receive independent contrast checks.                                            |
| Purposeful motion         | Refero motion guide; owner                                     | 120ms feedback, 200–280ms state changes, selection continuity, restrained logo response; no autoplay loops, no shader dependency. Reduced motion removes displacement.                                               |
| Honest AI taxonomy        | Owner; official project evidence                               | Separate AI software, agents, automation and browsers; topics distinguish local inference, AI browsers, code agents and private browsing. Public-source/fair-code products are not automatically called open source. |

All design conclusions are adaptations. Still images do not establish exact upstream animation timings. This document records the intended direction; delivery requires real rendered review and regression checks.

## Implementation outcome

The finished local second iteration uses the Open Index mark, DM Sans Variable, larger 62px project identities, a browser edit, the searchable topic explorer, 20 source-reviewed new tools, and three new curated collections. The main shelf now offers Undo; collection saves report how many tools were newly added. Empty command search offers Topics, Shelf and Collections before recommended tools. Light/Dark/System remain adaptive and persistent.

Follow-up QA corrected short-landscape clipping, input-method composition handling, conflicting URL facets, malformed pagination, and stale preview selection. Topic search matches word prefixes so “AI” does not match unrelated words such as “available.” Brave’s Leo assistant is included in AI browsers while experimental autonomous browsing stays qualified. Tests and actual browser captures are documented in `validation-v2.md`.
