# Commonplace — third shipment

16 September 2026. Direct implementation requested by the owner. Current focus: useful discovery workflows, authentic OS icons, tactile pointer feedback, restrained vector celebrations, clear navigation. AI remains future work. Tool contributions are closed in this shipment; a future two-field name/link intake can deliver a developer DM only after its destination and authenticated backend exist.

## Reference lock

Primary: **Things**, Refero style `0796cd74-edc2-4e12-9c71-25fac02a1cb2` (culturedcode.com/things). Preserve organized desktop density, dark ink, cool white surfaces, recognizable objects and precise controls. Keep the established DM Sans family for product continuity, with 15–16px reading text and 12–13px metadata. Do not introduce its marketing device mockups into the working directory.

Bounded secondary references: **Raycast** `e5a749d7-9f71-4b52-9f50-24b243396034` supplies physical press feedback, inset edge definition and fast-settling transitions; **Sleeve** `bc95c7d9-4be3-4a8e-a057-48f2545c3734` supplies optically generous app objects and native-looking icon/name proportions. Gradients, glows, marble, marketing art and invalid extracted color values are excluded. Prior Cosmos research still informs content previews, but it is not another competing style authority.

Official motion evidence: Apple, [Meet Liquid Glass, WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/), transcript sections Dynamics/Adaptivity/Principles. The transcript describes flexible controls, moving highlights, destination continuity, glass in navigation rather than content, and reduced-motion/transparency behavior. Native Liquid Glass rendering is not claimed for this web implementation. Refero metadata and still images do not prove exact upstream animation timing.

Raw style records are in `work/research/v3-style/`; screen/flow evidence is in `docs/research-v3-interactions.md`.

## Five useful features

1. Release radar: verified upstream release snapshots, official notes, saved-tool filter and read state.
2. Alternative finder: choose software you already use, choose your device, inspect matched open-source alternatives and tradeoffs.
3. Personal stacks: named tool groups, notes, add/remove tools, export a portable stack.
4. Discovery trail: recently inspected tools, actual category coverage and small milestones. No fabricated rankings or streak pressure.
5. Comparison focus: show differing facts and replace/remove compared tools without rebuilding the whole selection.

## Motion and material contract

| Element         | Intent                 | Treatment                                                                                                                                     |
| --------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| App identity    | Inspectable object     | Logo plane tilts at most 5 degrees, a 2px pointer offset and a 2px lift; card text stays stable. Pointer updates are coalesced outside React. |
| Buttons         | Immediate feedback     | 100–140ms press/hover; 0.98 scale only while pressed; crisp edge contrast.                                                                    |
| Device selector | Selection continuity   | One glass selection capsule moves between equal-sized OS choices over 240ms. Real platform marks retain recognizable silhouettes.             |
| Navigation      | Orientation            | Shared selection plane travels between destinations; labels stay fixed.                                                                       |
| Saving          | Destination continuity | Brief shrinking logo transfer toward Saved, only after the user saves, with text confirmation. No idle loop.                                  |
| Stacks          | Grouping               | Vector sheets separate slightly on hover; actual member logos remain legible.                                                                 |
| Milestones      | Completion             | Earned checks draw once when this view opens, over 220ms; progress is derived from real local actions.                                        |
| Dialogs         | Entry/exit             | 240–300ms entrance, faster exit; trap/restore focus; short landscape scroll stays available.                                                  |

All effects respect reduced motion and touch. Glass is concentrated on controls and navigation; body text/cards use legible surfaces. New semantic accent roles: a restrained blue for selection, teal for completed state, graphite for neutral structure. Revalidate both themes; no decorative palette expansion.

The owner's final home-card direction replaces the browser edit with the five-tool [agentic spotlight](agent-spotlight-v3.md). This was the shipment 3 opening surface, now superseded by [Discovery in motion](discovery-motion-v4.md); earlier browser-card screenshots remain historical validation evidence only.
