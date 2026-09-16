# Shipment 3 validation

16 September 2026. Product source and build: `<local-project>`. Local production preview: `http://127.0.0.1:4173`. No deployment, GitHub push, AI integration or developer-DM delivery is part of this shipment.

## Automated checks

- Strict TypeScript, production build and **192 Vitest tests** pass. No skipped or expected-failure tests remain. Evidence: `work/qa-v3/check.log`.
- **50 complete workflow checks** pass on the production build: save/hover/reset; stable OS controls and URL; tool detail/nested stack picker/focus return; quick-create, rename, selection, cancellation, reload, remove, delete and export; real discovery history/milestones; exact alternative relationships and OS recovery; comparison differences/add/replace/remove/duplicate protection/browser Back; eight upstream releases, shelf scope, persistent read state/reset; closed intake; reduced motion. Evidence: `work/qa-v3/flows-final.log` and its runnable script.
- Exported stack JSON was parsed separately: format/version, name, note, three exact unique IDs, and official website/repository URLs matched the selected tools.
- **14 additional interaction assertions** cover real theme controls, persisted Dark choice, live System changes, keyboard focus containment, nested return focus after modal motion, 320px and short-landscape dialogs, touch input, and reduced-motion dialogs. **Ten focused axe scans** of these dialog states have zero violations. Evidence: `interactions.log` plus `interactions-followup.log` in `work/qa-v3/`. The first run stopped at an ambiguous test locator matching both Joplin and a curated alternative; the locator was narrowed and the remaining checks passed. The initial CDP touch test also needed its target centered above fixed navigation; the corrected first-tap check passed.
- **Five blocked-storage assertions** pass: clear notice, multiple in-memory edits retained, reload matches the session-only notice, sequential shelf saves retained, no JavaScript errors. Evidence: `work/qa-v3/storage-fallback.log`.
- **Twelve cross-tab/focus regressions** pass: creating separate stacks preserves both; a newly mounted tab does not overwrite existing records; stack routes survive reload; shelf changes propagate; removing stack items focuses a neighboring control or Add tools; clearing history focuses Explore; clearing the alternative focuses the source picker. Evidence: `work/qa-v3/agent-responsive/followup/flows.log`.

## Responsive and accessibility review

The independent reviewer captured **60 rendered cases**: six surfaces (Alternatives, Stacks index, stack detail, Trail, Radar, Compare) × 320/390/768/1024/1440px × Light/Dark. The initial review found unnamed tablet navigation and a 33px Alternatives overflow at 768px. Both were fixed. The final tablet design uses an 80px rail with accessible names and a source picker above results.

The final **12 tablet cases** pass full-document axe scans and page-bound checks with zero violations, overflow or browser errors. Evidence: `work/qa-v3/agent-responsive/followup/compact-tablet/`. Original evidence is retained rather than overwritten. Compare's wide table scrolls inside its region and retains its sticky first column.

The final home page was separately checked at **320, 390, 768, 1024, 1440 and 1920px**: no page-level horizontal overflow. Dialogs were checked at **320×740** and **844×390**; touch events were dispatched in Chromium at **390×844**. These are browser-emulated viewports/input, not a claim of testing physical devices or Safari/Firefox. Axe incomplete/manual-review items remain visible in the raw reports; automated scans are not accessibility certification.

## Visual review against the reference lock

Source truth: [design-v3.md](design-v3.md), [Refero screen/flow research](research-v3-interactions.md), the established neutral DM Sans identity, and the owner's no-neon/no-gradient interface constraint. Research distinguishes inspected still screens from documented motion and proposed timing.

Reviewed actual Light/Dark and desktop/tablet/phone renders for type hierarchy, line length, logo/name pairing, alignment, surfaces, empty and populated states, input visibility, selected state, and fixed navigation. Final captures include:

- `output/playwright/v3-final-discover-1440.png`
- `output/playwright/v3-final-discover-390.png`
- `work/qa-v3/agent-responsive/followup/compact-tablet/screenshots/alternatives-768-light.png`
- Dark equivalents and populated library/compare/radar screens in the review directories.

Three undersized/low-contrast project assets were replaced with official standalone icons, documented in [project-icons-v3.md](project-icons-v3.md). Platform marks and artwork attribution are in [platform-icons-v3.md](platform-icons-v3.md). UI surfaces use no gradients. Third-party artwork is preserved as provided by its owners.

Motion is input-driven: bounded logo tilt without moving card text; moving navigation/device selection; brief save-to-shelf transfer; vector stack sheets; drawn earned checks; short modal transitions. Reduced motion removes depth/transfer effects. New SVGs were checked for active content/external references, and visible images were decoded in browser. Lazy images were also checked after real scrolling.

All confirmed P1/P2 review findings were resolved and rechecked. Final visual result: passed against this reference lock.

## Size and product limits

The initial two JavaScript chunks total approximately **158 KB gzip**, with **20.7 KB gzip** of shared CSS and roughly 55 KB of local variable fonts. New routes remain lazy-loaded; no animation or AI dependency was added. The three replacement project icons total 10,796 bytes. Production output remains around 1.3 MB. These are artifact sizes, not a measured network/Lighthouse score or a 1,000-user load test.

Personal stacks/history/preferences are browser-local, with same-origin tab synchronization and in-memory fallback when storage is blocked. Simultaneous edits to the same record remain last-write behavior. Release Radar contains eight dated, verified snapshots; it is selective and does not poll upstream at runtime. Tool submissions remain paused; the later two-field developer-DM flow and AI integration still require separate implementation.

## Follow-up: agentic home spotlight

The owner added a request before handoff to modernize the home browser card and replace its icons with agentic projects. The final implementation now features five named, interactive agent tiles and a live hover/focus preview. See [agent-spotlight-v3.md](agent-spotlight-v3.md) for the targeted Refero reference, original artwork sources, motion decisions and responsive evidence. Fourteen new Light/Dark renders at seven widths pass overflow, copy/stage separation and image-decode checks. No backend AI behavior was introduced.

The independent spotlight review passed all behavioral checks and caught one 4.44:1 desktop index contrast. This was corrected to 4.92:1 in Light, with stronger agent-name text. Four final focused axe scans (320/1440 × Light/Dark) report zero violations. Manual foreground/background review addresses the five name labels that axe could not determine automatically under the glass pseudo-element. Evidence: `work/qa-v3/spotlight-contrast.json`; the historical 38/39 report remains under `agent-responsive/spotlight/`.
