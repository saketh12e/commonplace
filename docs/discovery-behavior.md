# Deterministic discovery behavior

`src/lib/discovery.ts` exports `discoverTools`, `rankForProfile`, `getMatchReasons`,
`DiscoveryFilters`, and `DiscoveryProfile`. It imports the shared catalog types.
All operations run locally and synchronously without AI, APIs, network access,
telemetry, saved global state, popularity data, or invented match percentages.
They return new arrays and preserve the original catalog objects and input order
when all sorting criteria tie.

## Catalog search

`discoverTools(tools, filters)` intersects category, platform, offline,
self-hosting, saved-only, and text requirements. Category/platform `all` or an
omitted selection is unrestricted. Offline/self-hosting `true` requires the
corresponding flag; `false` or omission leaves that checkbox inactive.
Saved-only requires an ID in `savedIds`; omitted/empty IDs produce no results.
Repeated saved IDs never duplicate a tool. IDs alone do not enable saved-only.

Text is case-insensitive, accent-insensitive, and punctuation-insensitive while
preserving Unicode letters and digits. Repeated words are counted once. Common
function words and generic requests such as “I want an app for” are ignored.
Empty, punctuation-only, or entirely ignored text uses the normal browse order.
Every remaining term must have catalog evidence, possibly in different fields.
An unknown term rejects a result, even alongside a known term. Arbitrary unknown
queries therefore return an empty list rather than fallback recommendations.

Explicit finite aliases normalize both queries and indexed fields. Examples:

- “screen capture”, “screen shot”, and “screenshots” match screenshots.
- “taking notes”, “note-taking”, and “notebooks” match notes.
- “designing apps” matches design; “coding” matches programming/code.
- “to-do” matches tasks; “self-hosted” matches the self-hosting flag.
- “without internet” matches offline support.

Screen recording remains distinct from screenshots. Aliases are not a general
language model: unlisted synonyms, negation, and typo correction are unsupported.
Do not interpret a query such as “not offline” as a negative filter; use the
structured filters for supported constraints. Words can match a token prefix
with at least two characters, e.g. `screensh` or `noti`. Single characters must
match a whole token. Infix matching is not supported. Original catalog tokens
are retained alongside canonical aliases so prefix search is not lost.

Each query term contributes its strongest field evidence: name 60, feature 36,
use case 32, alternative 28, tagline 20, category 16, description 10. True offline
and self-hosting flags contribute 36. A token prefix contributes 60% of that
field weight. An exact canonical name adds 120; a canonical name prefix adds 60.
These are internal ordering weights, never confidence or relevance percentages.
License, URLs, timestamps, and IDs are not free-text relevance fields.

## Ordering

- `recommended` (default): descending search score, featured first, then name.
  With no meaningful query, featured first and then name is the entire rule.
- `name`: normalized alphabetical name, overriding relevance and featured.
- `newest`: descending `addedAt`, then name. `verifiedAt` does not affect it.
  Date-only ISO values and timezone-qualified ISO timestamps are accepted;
  missing/unparseable dates or timestamps without a timezone sort last.

All names use Unicode code-point string comparison after normalization rather
than an environment-dependent locale. Exact ties preserve input order. Explicit
sorts still apply every filter and reject nonmatching text. Nothing infers usage,
popularity, quality, or current time from the catalog.

## Platform compatibility

A direct listed platform always qualifies. Selecting macOS, Windows, or Linux
also includes any tool explicitly listing `web`, including a browser-only tool
or a tool whose listed native desktop version targets another OS. In that case,
compatibility means access through the browser, not native support. A desktop
native tool without either the selected platform or `web` is excluded.

Web/iOS/Android selections require an explicitly listed matching platform;
mobile compatibility is not inferred from web support. `all` imposes no platform
restriction, even when platform metadata is empty.

## Use-case matching and explanations

`rankForProfile(tools, profile)` first removes incompatible tools. It then orders
by goal evidence, role evidence, featured, normalized name, and original order.
Goal evidence outranks role evidence even when the latter has more matches.
Profile text uses the same tokens, aliases, and field weights as search, but
sums individually supported terms rather than requiring all profile words.
Unmatched compatible tools remain at the bottom as a browse fallback. Unknown
role/goal text adds no score or relevance reason; an empty profile uses the
normal browse order. Profile ranking adds no exact-name bonus.

Roles use explicit mappings to catalog terms:

| Role                              | Terms                                        |
| --------------------------------- | -------------------------------------------- |
| Designer / design                 | design, vector, prototype, photo             |
| Developer / engineer / programmer | development, code, terminal, version control |
| Writer / writing                  | writing, notes, markdown                     |
| Student / learner                 | notes, study, research, tasks, PDF           |
| Researcher                        | research, notes, references, PDF             |
| Creator / creative                | media, video, audio, photo, design           |

Recognized labels can appear in longer phrases such as “software engineer”.
Unrecognized roles use their own meaningful words; no personal attributes or
capabilities are inferred. These mappings are inspectable heuristics, not a claim
that every tool in a category suits everyone with that role.

`getMatchReasons` returns at most three truthful facts: the strongest goal
fact, a distinct strongest role fact, and the selected platform fact. Feature,
use-case, and alternative reasons quote the corresponding catalog value;
description-only evidence states that the terms occur in the description.
Offline/self-hosting reasons require the corresponding true flag. The browser
fallback explicitly says native support is not listed. An incompatible tool has
no match reasons. An unsupported profile with platform `all` can have no reasons.
The UI should present an empty reason list as absent evidence, not a percentage.

## Validation

`npm test -- src/lib/discovery.test.ts` runs synthetic Vitest fixtures independent
of production catalog contents. Tests cover aliases, partial words, unknown
queries, conjunctive filters, saved state, platform fallbacks, weighted ranking,
truthful reasons, empty inputs, stable ties, ISO time ordering, and non-mutation.
