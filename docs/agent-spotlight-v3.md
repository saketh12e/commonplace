# Agentic spotlight — shipment 3 follow-up

Historical record. The current category-folder design is documented in [Category folders and direct discovery](design-v5.md).

The owner asked to replace the home page's Firefox/Brave/Zen browser edit with a more interactive feature containing current AI/agentic tool icons. This changes the opening editorial card, not the catalog's browser category or the future AI-integration boundary.

## Reference and implementation lock

The established Things/Sleeve proportions and neutral material remain primary. One focused live Refero search and full screen/image inspection of the [Raycast Store](https://refero.design/pages/9e4bfde0-d22a-4646-aca0-1878bcf82e5a) adds a bounded reference for grouping recognizable app objects above product discovery. The screen shows elevated square icons, discrete app names and a clear discovery hierarchy. Its red marketing art, glow, gradients, density and installation buttons were rejected. A still screenshot is not evidence of Raycast's animation behavior; the timings below are authored interaction decisions.

Raw search and full-screen records: `work/research/v3-spotlight/refero.json`.

## What ships

`src/components/AgentSpotlight.tsx` and `src/styles/spotlight.css` replace the old browser feature in Discover. Five existing, source-verified catalog projects are featured: **Aider, Goose, OpenCode, OpenHands, Continue**. Their original local artwork and official links remain unchanged. “Explore coding agents” opens the existing `coding-agents` topic.

- Desktop: five named, individually linked tiles sit on a restrained glass plane. Pointer/focus lifts the preview tile, settles its angle, adds a small open-detail affordance and updates its description/index. Copy and hitboxes do not move.
- Pointer tracking reuses the coalesced requestAnimationFrame primitive. Tile settling is 280ms, plate settling 380ms, the detail indicator 180ms, caption 150ms and press 80ms. No idle rotation, auto-advance, gradient, particle field or new animation library.
- Keyboard: each tile is a standard, named link with visible focus and its tagline in the accessible name. Focus also changes the preview. Enter opens actual tool details and closing restores focus.
- Phone: all five remain visible in one row. Hitboxes are at least 47×82px at 320px, with readable project names and a stacked preview description. The first tap opens detail; no hover-only action or tap-to-arm stage.
- Reduced motion removes spatial transforms, transfers and caption movement. Reduced transparency uses an opaque plane. Light, Dark and System continue to use shared tokens.

No tool is installed, agent is run or AI request is sent from this card.

## Visual checks

Fourteen actual renders at 320/390/768/1280/1366/1440/1920px in Light and Dark: no page overflow, no intersection between copy and icon stage, and all five images decoded. The narrowest hitboxes remain over 44px wide. Evidence: `work/qa-v3/spotlight-visual.json` and `output/playwright/v3-agent-spotlight-*.png`. Desktop hover capture: `output/playwright/v3-agent-hover.png`. Independent behavior/accessibility findings are recorded in `work/qa-v3/agent-responsive/spotlight/`.

## Final contrast correction

The independent run passed 38 of 39 assertions and found the desktop index at 4.44:1 contrast. Its color now uses the stronger muted token: **4.92:1 in Light**, **7.51:1 in Dark** against the card surface. Names now use body-ink color to retain clear contrast over the glass plane; the reference color pairs exceed 11:1 in the manual contrast check.

Four fresh axe scans—320px/1440px × Light/Dark—report zero violations after this correction (`work/qa-v3/spotlight-contrast.json`). Glass/pseudo-element backgrounds still require manual review; names were visually inspected and their foreground/background pairs checked rather than treating axe's incomplete items as passes. All five hover previews, keyboard/Enter/Escape focus return, topic navigation, five first-tap detail opens and reduced-motion behavior passed independently. The earlier report is retained as historical evidence of the defect and its repair.
