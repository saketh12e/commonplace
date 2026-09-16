# Commonplace — third shipment interaction research

16 September 2026. Research only. Baseline read: `docs/design-v2.md`. Parent owns styles, tokens, layout and implementation. Another worker owns actual Release Radar research. All changes from this research task are confined to this document and `work/research/v3-interactions/`.

## Immediate implementation decisions

1. **Personal stacks with explicit membership.** Preserve the fast shelf save. Pair it with “Choose stack”; after saving, “Saved” opens membership management. Selecting a stack to browse must never add or remove tools. Keep collection navigation, stack membership and bulk selection as three separate states.
2. **Create and add in one operation.** Carry tool IDs and the exact count from selection into stack naming. On success show “Added 3 tools to Design work”, with Open stack and Undo. Cancel returns to the picker with the prior selection.
3. **Discovery passport as memory.** Show recently viewed tools, saved tools and a resumable comparison. Count real actions. “Viewed” does not mean reviewed, installed or completed. Avoid streaks, arbitrary points and a progress percentage across an unbounded catalog.
4. **Alternative finder with reasons, then differences.** Carry the source tool and chosen requirements into a shortlist. Explain matches and unknowns. Compare up to three tools; make differences-only a reversible checkbox with a visible remaining-row count.
5. **Motion follows identity.** Keep navigation fixed. Use a source-aware detail transition and restore the correct tool, scroll and focus on return. Every transition accepts a second action immediately.

These are **proposed Commonplace contracts**, not observations of upstream behavior. Timing values below are authored for the v3 brief, grounded in the motion craft guide. Light/Dark/System remain independent appearance choices; reduced motion applies across all three. No gradients, neon, animated blur, cursor magnetism or decorative loops.

## Research coverage and limits

Live Refero: **7 focused searches, 8 full screen records, 4 actual images requested with image_size=full and visually inspected, 2 complete flow records comprising 14 steps**. Search and retrieval responses are retained, including uncertainty in Refero’s own descriptions.

| Search        | Query                                                 | Actual useful result                                                                                |
| ------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Screen 1      | Cosmos save to collection selector search collections | Pexels empty picker and new-collection form. Cosmos was not returned among the ten screen previews. |
| Screen 2      | Milanote personal boards library board overview       | SAVEE board creation and Playbook board detail. Do not attribute these to Milanote.                 |
| Screen 3      | Readwise Reader recently read progress library        | Literal goal creation. No evidence of a Readwise recent-history UI from this query.                 |
| Screen 4      | software feature comparison table differences filters | DJI side-by-side comparison with Hide Duplicated Details.                                           |
| Screen 5, iOS | Apple Music library sidebar album detail navigation   | Albums grid and open sort popover. This is mobile navigation, not evidence for a desktop sidebar.   |
| Flow 1        | Cosmos saving to collection                           | Cosmos flow 844, Create and Connect Cluster.                                                        |
| Flow 2        | Milanote creating board                               | SAVEE flow 534, Save selected images to a new board.                                                |

The existing v2 reference lock remains the visual authority. No new style searches were performed because this worker was explicitly assigned screens and flows while the parent owns styles.

Evidence levels used below:

- **V — visually observed:** actual still image inspected; establishes visible content/state, not interaction timing.
- **R — Refero record:** full screen or flow description inspected; may contain inferred actions. It is not live product execution.
- **D — official documented behavior:** official text or video transcript supports a behavioral principle. No video was timed or frame-analyzed.
- **P — proposal:** Commonplace behavior, dimensions, duration, easing, keyboard/touch rules or recovery designed for this brief.

## Screen ledger

| Ref | Full screen and source                                                                         | Evidence and adaptation                                                                                                                                                                            | Boundary                                                                                                                                        |
| --- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| S1  | [Pexels save picker](https://refero.design/pages/4793187c-92ca-441f-a4a0-8609811b613c)         | V + R: centered Save to collection dialog, create tile, close control; browsing remains visible behind. Keep the create action next to destinations.                                               | Screenshot is an empty destination state. It does not establish search or selected membership. Its truncated create label is a defect to avoid. |
| S2  | [Pexels create form](https://refero.design/pages/58fba66c-332f-4967-84b7-0bcd3aeeb95a)         | R: required Collection title, Back and disabled Create New Collection. Keep naming within the save journey and provide a return path.                                                              | No raw image inspected; validation behavior is described by Refero, not executed.                                                               |
| S3  | [SAVEE New Board](https://refero.design/pages/51682e47-eeff-4ebd-8650-09bd9f44311a)            | V + R: title, “5 images”, name field, privacy row and Create. Carry selection count into creation instead of relying on remembered context.                                                        | Privacy appears subdued in the image; its enabled state is not inferred. Commonplace browser-local stacks need no public/private toggle.        |
| S4  | [Playbook board](https://refero.design/pages/1022e30f-5e54-458a-a239-483bff6c9e9e)             | R: selected board in sidebar, board title, contextual actions and asset grid. Keep current-stack identity and its actions together.                                                                | No raw image inspected. Do not borrow publishing, sharing, color swatches or collaboration without actual features.                             |
| S5  | [Literal goal setup](https://refero.design/pages/79edf0eb-8d27-4748-bbec-8dea8749c002)         | V + R: 15 Books in 2025, circular graphic, Advanced setup and Create goal. A metric needs a named unit and scope.                                                                                  | This is a target-setting screen, **not completed reading progress**. It does not validate progress rings, history tracking or gamification.     |
| S6  | [DJI comparison](https://refero.design/pages/713b66c0-3567-4982-aa54-6cb09d42d356)             | R: product selectors above aligned specification columns and Hide Duplicated Details. Keep selectors visible and differences optional.                                                             | No raw image inspected; table stickiness, transitions and keyboard behavior were not verified.                                                  |
| S7  | [Apple Music Albums](https://refero.design/screens/d35b1fd5-8c9b-4e09-a104-fd007e22e1f8)       | R: Library back label, local search, album grid, persistent player and main tabs. Preserve local context and a stable global navigation anchor.                                                    | Screen is an older captured UI; no current-version claim. Do not copy five tabs or player chrome mechanically.                                  |
| S8  | [Apple Music sort popover](https://refero.design/screens/9baa4891-5bc2-4a43-8c47-fb8a0e8e124d) | V + R: current Recently Added option has a check; Title and Artist remain alternatives; sort is anchored beside local search. Apply an explicit check to current sort or active collection choice. | Current sort is single-select; stack memberships are multi-select. Do not use the same semantics for both.                                      |

Four images are preserved unchanged in `work/research/v3-interactions/images/`, named by screen UUID. Returned web images are 800×450; the Apple Music image is 800×1732. “Full” names the requested tool mode, not a guarantee of original browser capture resolution. Typography/pixel estimates in generated metadata were not treated as measured source tokens.

## Two flow analyses

### F1 — Cosmos: connect an item to a new cluster

[Full flow 844](https://refero.design/flows/844), six steps, R evidence:

1. Item detail exposes a Connections rail and connect affordance.
2. Connect opens destinations including Your Library, Public Place and New Cluster.
3. New Cluster opens name, description, privacy and Create.
4. Attempting private creation exposes a premium interstitial.
5. User supplies a name and returns to creation without private enabled.
6. The final record reports “Connected to Evo”, an incremented connections count and the new cluster in the rail.

**Adapt:** show destinations at the point of intent; carry the originating item through naming; put success in the changed destination and in a concise confirmation. **Reject:** mid-save privacy upsell, global naming detached from the selected tool, a toast as the only persistent evidence.

**Uncertainty:** Refero describes step 4 as a toggle attempt “or otherwise” attempting privacy and step 6 as modal closing “or” dismissal. These are recorded interpretations, not a verified event trace. Error handling, duplicate names, keyboard, timing and persistence were not established. The Commonplace recovery contract below fills those gaps explicitly as P.

### F2 — SAVEE: selected items to a new board

[Full flow 534](https://refero.design/flows/534), eight steps, R evidence:

1. Profile gallery.
2. Explicit selection mode with instructions and Escape hint.
3. Selected item outlines and a toolbar containing a selection count.
4. Add to board opens existing boards and Create new board.
5. New Board retains the item count beside naming and privacy.
6. Creation is submitted.
7. Profile presents the new board.
8. Opening that board reveals its contents.

**Adapt:** use an explicit selection mode, a stable bulk-action bar, retained item IDs through naming, and a destination that can be opened immediately. **Reject:** hidden shortcut-only entry and the surplus Print/Private/Delete actions for this product.

**Uncertainty:** the recorded example moves from “6 selected” to a modal/final board with five images. Do not infer silent deduplication or deletion; the exact cause is not shown. Commonplace must reconcile the count from actual unique tool IDs before commit. Refero’s sequence also reports server creation without proving an inspected network transaction. For Commonplace, verify local persistence rather than claiming a server save.

## Official motion and input evidence

- **D1 — [Apple WWDC24, Enhance your UI animations and transitions](https://developer.apple.com/videos/play/wwdc2024/10145/):** the transcript at 1:34–4:15 explains source-to-detail zoom, continuous interaction and matching a stable source identifier on entry and return. The 7:02 chapter says new navigation can begin during a transition. The introduction explicitly says demonstrations run at half speed. This supports identity and interruption; it supplies no Commonplace CSS curve or millisecond duration.
- **D2 — [Apple HIG Motion](https://developer.apple.com/design/human-interface-guidelines/motion?changes=l_9_3):** purposeful, brief feedback and cancelable motion; interaction frequency matters. The readable indexed page was available; the bare canonical URL returned only a JavaScript shell through the browser reader.
- **D3 — [Apple Reduced Motion evaluation](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/reduced-motion-evaluation-criteria):** replace problematic scaling, depth and multi-axis effects while retaining meaning through alternatives such as dissolves or highlights.
- **D4 — [Apple Pointing devices](https://developer.apple.com/design/human-interface-guidelines/pointing-devices?changes=_5):** distinguishes highlight for small transparent controls, lift for small opaque elements and customizable hover for large elements. Embedded-video descriptions explain the effects. They were read, not played or measured. Adapt component-specific feedback while keeping the normal browser pointer.
- **D5 — [W3C modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/):** move focus into a modal, contain Tab traversal, support Escape and return focus to the trigger or logical successor.
- **Craft:** Refero `references/motion.md` and `references/craft-details.md` were read. They support frequency-based duration, explicit animated properties, interruptibility, focus visibility, stable image dimensions, real links, URL criteria and polite status announcements. The motion guide contains an early `transition: all` sample contradicted by its later explicit prohibition; follow the prohibition. Do not import every sample literally.

No source here proves actual Cosmos/Pexels/SAVEE hover animations or exact Apple Music transitions.

## Proposed timing vocabulary

All values are P; parent may map these roles to its motion system without treating them as measured Apple tokens.

| Role                   | Value                          | Purpose                                                                                |
| ---------------------- | ------------------------------ | -------------------------------------------------------------------------------------- |
| press                  | 90ms                           | Control-only compression to scale .98; release starts immediately on pointerup/cancel. |
| feedback               | 120ms                          | Surface/border change, check appearance, local action visibility.                      |
| content                | 160ms                          | Filter or sibling-content replacement.                                                 |
| panel-in / panel-out   | 180ms / 120ms                  | Destination picker or nested naming view.                                              |
| layout                 | 200ms                          | Small bounded list reflow or selection indicator.                                      |
| detail-in / detail-out | 280ms / 220ms                  | Source-aware detail continuity.                                                        |
| enter curve            | cubic-bezier(.2,0,0,1)         | Fast response, controlled settling.                                                    |
| exit curve             | cubic-bezier(.4,0,1,1)         | Short removal.                                                                         |
| change curve           | cubic-bezier(.4,0,.2,1)        | Selection/reordering.                                                                  |
| reduce                 | 0ms transforms; 0–80ms opacity | Immediate meaningful state; optional short dissolve.                                   |

No serial “exit, wait, load, enter” chain. State and controls update on commit; the motion follows. A repeated input retargets or cancels the active visual transition. Hover timing does not delay input. Avoid per-card stagger on filter, sort or paging. Animate transform/opacity for spatial effects; keep blur and large shadows static.

## P1 — precise card and navigation hover

| Transition                      | Choreography                                                                                                                                                                                                         | Keyboard, touch, reduced motion                                                                                                                             |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rest → hover, fine pointer only | In 120ms enter, change card border/surface within parent theme tokens. Keep card position and text stable. On the card’s primary link only, project identity artwork may scale 1 → 1.025 inside its fixed 62px slot. | Enable only under hover:hover and pointer:fine. Touch always exposes Save and overflow; first tap performs its action. Reduce removes scale.                |
| Hover → child Save/Compare      | Stop logo emphasis; brighten only the actual target. Do not translate the entire card when crossing between children. Action hitboxes exist at rest and never change size.                                           | Focus-visible gives an immediate 2px outline with 2px offset. Focus-within may reveal secondary labels, but does not mark the card selected.                |
| Pointerdown → pointerup/cancel  | Only the button compresses to .98 over 90ms; release returns in 120ms. No card tilt, pointer-follow shadow or glint.                                                                                                 | Enter/Space uses native button behavior. Pointercancel restores state. Reduce uses immediate surface feedback.                                              |
| Rest → hover on nav item        | Local rounded surface appears in 120ms. Active destination remains a distinct persistent marker; hover never moves it.                                                                                               | Real links preserve middle-click/Cmd-click. On touch use a visible pressed state.                                                                           |
| Icon tooltip                    | Optional 450ms hover dwell, 120ms opacity entry; immediate on keyboard focus. Escape dismisses; pointer leave closes.                                                                                                | Accessible name exists independently. No touch tooltip dependency; all crucial actions have labels or accessible names. Reduce changes opacity immediately. |

Selection precedence: disabled/error messaging remains readable; keyboard focus ring is always visible; selection check and active destination are persistent; hover is transient. Never substitute a hover background for a checkmark.

## P2 — selecting saved collections, choosing destinations and bulk save

Two controls need different contracts:

**Browse a saved stack:** the stack name is a navigation link or a single-select destination control. Clicking it updates currentStackId and URL criteria, leaves memberships untouched, and keeps the chosen stack visibly checked/active. A sort option uses native radio semantics where practical. It does not share the bulk-selection store.

**Save to a stack:** the fast Save action adds the tool to the existing shelf, shows Saved and announces success only after persistence succeeds. An adjacent Choose stack control opens a compact destination dialog; activating Saved can also open it. Use a visible control label or accessible name such as “Choose stacks for Zed”.

Desktop dialog proposal: 360px wide, viewport-constrained, anchored near the trigger with an 8px gap. At narrow widths use an inset bottom sheet, max-height calc(100dvh - 24px), with safe-area padding. Geometry is P, not extracted source style.

| State / event         | Content and durable effect                                                                                                                                                                                   | Motion and input                                                                                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Closed → picker       | Title names the tool, or “Add 3 tools to stacks”; search; labeled checkbox rows; tool counts; Create stack; Done. Existing membership is checked.                                                            | Enter: opacity 0→1 and translateY(4px)→0 in 180ms; origin at trigger-facing edge. Focus search on desktop; focus heading on touch so the keyboard does not open unexpectedly.           |
| Search                | Filter destination rows without changing membership. Keep Create stack available. Empty: “No stacks match ‘design’” and Create “design”.                                                                     | Update local results immediately; no row stagger. Clear restores the list. Search input keeps focus; typing/IME is never used to trigger Save.                                          |
| Toggle membership     | Checkbox changes and count updates only after the local write succeeds. Dialog remains open for more destinations. Removing a membership leaves the tool saved on the shelf.                                 | 120ms check opacity, immediate label/state. Native Tab/Shift-Tab traverse controls; Space toggles checkbox. Do not invent listbox arrow behavior for a dialog containing form controls. |
| Create stack          | Replace picker content in the same dialog with Name, selected count, Back and “Create and add 3 tools”. Search text may prefill the name.                                                                    | 160ms crossfade; no nested modal. Focus Name; Enter submits when not composing. Escape/Back returns to picker with search and selected IDs retained.                                    |
| Create success        | One persistence operation creates the stack and associates unique selected IDs. Show destination and exact newly-added/already-present counts. Return to updated picker; Open stack is explicit.             | 120ms confirmation; do not navigate away automatically. Close on Done, return focus to trigger. Undo restores only the affected membership/create operation.                            |
| Empty/duplicate/error | Empty name gets inline error on submit. Exact normalized duplicate offers the existing stack. Storage error leaves dialog and user input intact with Retry and a factual error.                              | Focus first invalid field; no shake. No success toast before persistence.                                                                                                               |
| Dismiss               | Done, Escape from picker, close or backdrop dismisses. Checkbox edits already saved are retained; text says “Changes saved” where useful. Backdrop dismissal from naming returns to picker without creation. | Exit 120ms; all content behind the modal is inert. Restore focus without waiting for exit animation. Reduce uses no translation and up to 80ms dissolve.                                |

A native checkbox may be mixed for bulk membership: all chosen tools present → checked; some → indeterminate with “2 of 3 already here”; none → unchecked. First activation of mixed state adds the missing items; explicit uncheck removes the selected items from that stack. The count is computed from IDs, never DOM position or the number of visible cards.

Shelf is the superset of stack memberships. Add to stack also saves to shelf; removing from a stack or deleting a stack keeps tools on shelf. An explicit Remove everywhere operation must disclose the number of affected stacks and provide Undo. Do not overload ordinary “Saved” activation with that operation.

For **Save curated collection**, say “Save 12 tools”; after deduplication say “8 added · 4 already saved”. Creating a personal stack from a curated collection names the source and snapshots the current tool IDs; it does not silently subscribe the user to future additions.

## P3 — personal boards / stacks

Treat a board as a named working set of software, not an empty visual canvas. The v2 identity tile and tool card stay recognizable. Suggested initial value: name, optional purpose (“Design and publish”), ordered tool IDs and optional short per-tool note. Sharing, collaboration and real-time status are outside this proposal.

- Overview: stack name, real tool count, small authentic identity previews and recently edited ordering. Opening a stack preserves the overview’s scroll. Empty state offers Create stack and Browse tools; no prefilled fake personal history.
- Detail: title and count persist above search/filter controls; Add tools, Rename, Compare selected and overflow remain contextual. Keep source provenance when copied from a curated collection.
- Reorder: provide Move earlier/later in a menu as the baseline. Optional drag is a later enhancement; it requires a handle, real insertion marker, autoscroll bounds and Escape cancellation. Keyboard moves announce “Zed moved to position 2 of 5”; settle affected rows in 200ms change, with no motion under reduce.
- Removing an item fades 120ms and neighboring rows settle in 200ms concurrently, not one after another. Put focus on the next row’s equivalent control, previous row if last, Add tools if now empty. Undo restores the original index.
- Rename never changes the stable stack ID. Delete stack shows exact impact and an Undo path; saved tools remain on shelf.

## P4 — alternative finder and differences comparison

Alternative finder is a guided filter, not an unsupported claim that one tool is better. Entry from a tool detail preselects that tool as the baseline. Show requirements the catalog actually represents, such as platform, license category, local/offline capability or self-hosting. Unknown values stay Unknown; free price and open-source license remain separate.

Requirement toggles update checked state immediately. Retain the current result region while computing; replace it with a 160ms opacity change and announce result count once per settled action. Each result states why it appears (“macOS + local storage”) and a material limitation. For zero matches, show active constraints and an explicit remove-constraint action; never loosen requirements silently. If computation is asynchronous, only the newest request may update results.

Compare tray preserves stable tool order and visible names, maximum three tools. At the fourth addition, keep the three and offer Replace a tool; do not evict silently. The tray enters once in 180ms from 8px below, remains fixed thereafter, and must not cover focused rows or bottom navigation.

Differences-only is a checkbox. Keep product headers, row labels and comparison controls in place; remove identical rows together with at most 120ms opacity and a 200ms bounded layout change. For large tables, skip spatial animation. Show “7 differing fields · 12 identical hidden”. Two Unknown values are not evidence of equivalence: keep those rows visible or explicitly disclose unknown rows separately. Offer Show all when no verified differences remain.

Use a semantic table with row/column headers. At narrow widths keep the criteria column and two readable product columns, with accessible horizontal scrolling for the third; do not squeeze text into miniature cards. Preserve the baseline column. Remove tool and differences toggle are ordinary focusable controls. Reduced motion updates rows immediately; focus remains on the toggle, not a disappearing row.

## P5 — discovery passport / recently viewed

This feature earns its space by helping users resume decisions.

| Measure                     | Event that changes it                                                                                                                          | Useful next action                                        |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Recently viewed             | A tool detail route/panel successfully commits, keyed by tool ID and timestamp. Reopening moves it to the front; unique count does not double. | Reopen tool with the previous browse context.             |
| Saved                       | Actual shelf membership write succeeds.                                                                                                        | Open shelf or a chosen stack.                             |
| Compared                    | At least two tools are actually rendered in the comparison view. Selecting a tray item alone does not count.                                   | Resume the last tool set and differences preference.      |
| Topic exploration, optional | Distinct viewed tools within the explicitly chosen topic.                                                                                      | “Continue Browsers” with the saved topic/filter criteria. |

Do not infer “reviewed” from viewing. The data is browser-local; the product should say “On this browser”, provide Clear history, and retain shelf/stacks when clearing history. Proposed bounded history: most recent 50 unique tool IDs; export/import is a future option, not a hidden promised feature. Handle missing catalog items with an unavailable entry or removal notice.

A 160ms nonrolling numeral crossfade can acknowledge a changed count; no ring animation when a user merely scrolls. Recently viewed rows update when the user returns to that section, not by shuffling under their pointer. Empty state explains what will appear and links to discovery. Clear history immediately resets counts and shows Undo; reduced motion uses instant content. Ordinary links/buttons make the entire feature keyboard and touch operable.

Release Radar is the fifth shipment feature owned elsewhere. This passport must not count releases, claim upstream freshness, or duplicate Radar alerts.

## P6 — Apple-like navigation continuity on the web

**Sibling destinations:** retain header/sidebar/bottom navigation. At t=0, commit active destination and URL. Move the persistent selection surface to the new item in 200ms change; crossfade only the changing pane in 160ms, with no lateral slide between unrelated destinations. Keep each destination’s scroll position. Real links and browser back remain functional.

**Tool grid → detail:** at t=0, capture the source tool ID, current criteria, scroll offset and source bounds; commit accessible detail content immediately. Over 280ms enter, interpolate the identity tile to its corresponding detail position while the detail body fades in over 160ms starting at t=40ms. Keep the full grid stationary. Do not scale text or expand an entire densely populated card. Transition decoration must be aria-hidden and must not duplicate focusable content.

**Detail → grid:** resolve the source by stable tool ID in the current data. Restore its original browsing criteria/scroll and animate the identity back over 220ms; return keyboard focus to the original tool link. If the source no longer exists, is offscreen, or cannot be matched correctly, use a 160ms opacity fallback and focus the logical result heading. Never animate into whichever item now occupies the old array index.

**Rapid input:** Back at 80ms, choosing another tool during entry, browser history changes or resized layout must take effect immediately. Cancel/retarget the visual animation from its current presentation; clean overlays and temporary styles even on cancellation. No isAnimating lock and no navigation queued behind animation timers.

**Modal vs page:** use a dialog only for an actual transient task. Full detail navigation receives heading focus and browser history semantics; a dialog receives modal focus containment and Escape dismissal. Do not mix Escape-to-close behavior into normal pages indiscriminately.

**Touch:** regular tap opens detail once. Preserve the browser edge-back gesture; do not add a full-screen competing custom swipe recognizer. A bottom sheet has an explicit close control and scrolls its contents without scrolling the obscured page. Drag dismissal is optional and must not steal vertical content scrolling.

**Reduced motion:** remove shared-element movement, scale, selected-pill travel, smooth scroll and staged delays. Commit the destination immediately and optionally dissolve the changing pane for 80ms. Restore focus/scroll identically to full motion. Theme changes do not trigger route or layout animation.

## Decision ledger

| Decision                                                 | Authority                                                               | Reason                                                                 |
| -------------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Destination-aware saving and create-in-place             | F1 + S1/S2; adapted P                                                   | Preserves original intent through organization.                        |
| Exact count retained during bulk create                  | F2 + S3; adapted P                                                      | User can verify what will be added.                                    |
| Persistent stack context                                 | S4 + v2                                                                 | Names the current workspace and scopes its controls.                   |
| Check current selection; distinguish radio from checkbox | S8 + craft; adapted P                                                   | Current navigation and many-stack membership are different operations. |
| Bounded, truthful discovery history                      | S5 supplies named-unit principle; brief supplies feature; behavior is P | Useful return path without fabricated progress.                        |
| Differences-only with aligned tools                      | S6 + earlier Commonplace IA; adapted P                                  | Makes comparison answer a concrete choice.                             |
| Stable identity and interruption                         | D1/D2 + motion craft; adapted P                                         | Maintains orientation under rapid input.                               |
| Component-specific hover and pointer restraint           | D4 + brief; adapted P                                                   | Precise feedback without moving target hitboxes.                       |
| Focus restoration and reduced motion                     | D3/D5 + craft; adapted P                                                | Same task outcome across input and accessibility settings.             |

## Acceptance checks for the parent

These are proposed checks, **not executed application tests**.

1. Save a new tool, choose two stacks, remove one membership, reload: shelf remains saved and only the remaining stack is checked.
2. Select three tools including two already in the destination; create or choose a stack: tool IDs and newly-added counts remain exact; repeat click does not duplicate.
3. Enter a name, Back, reopen creation, Escape: no accidental stack, retained selection; storage failure yields no success state.
4. Switch visible stack while tools are selected: membership does not change; bulk selection is explicitly retained with a count or explicitly cleared with notice, never silently reassigned.
5. Pointer crosses card → Save → overflow: stable hitboxes, no child click opens detail; keyboard focus reveals all actions; touch first tap works.
6. Open detail, Back during the first 80ms, open another tool: URL, content, focus and identity agree, with no frozen controls or orphan transition overlay.
7. Reorder/filter the grid before returning from detail: return targets the tool ID or takes the documented fallback.
8. Toggle differences with Unknown values and with no verified differences: no false equivalence or empty unexplained table.
9. Revisit the same tool and only hover/scroll other tools: view history changes only on committed detail access; clearing history preserves stacks and shelf.
10. Repeat save/create, detail/back and comparison flows in Light, Dark, System, reduced motion, keyboard-only, touch, 320px width, short landscape and 200% zoom. Confirm visible focus, unobscured controls and contained modal scrolling.
11. On a modest device, profile a filtered list and rapid detail transitions: no full-grid stagger, layout polling per frame, animated backdrop blur or main-thread blocking that delays interaction.
12. Switching system theme or reduced-motion preference while a panel is open updates its presentation without discarding entered text or selections.

Delivery status: research and specifications complete; application behavior, performance and accessibility validation remain the parent’s implementation responsibility. No application edits, dependencies, builds, deployments or commits were made by this worker.
