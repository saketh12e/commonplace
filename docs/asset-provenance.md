# Logo asset provenance

Recorded 16 September 2026. [asset-manifest.json](asset-manifest.json) inventories all **49 current files** in `public/logos/`, including the three retained historical logos. Every entry records the current byte count and SHA-256, associated project, source URL or explicit source gap, evidence strength, modification status and known artwork terms.

This is attribution metadata, not a legal audit or a redistribution approval. Project association does not independently establish legal ownership. Application code licenses are **not** treated as artwork licenses. Unverified terms do not mean public domain. Platform icons, DM Sans, Lucide and original Commonplace branding are covered separately by [third-party notices](../THIRD_PARTY_NOTICES.md).

## Evidence and byte identity

- **23 assets match recorded download hashes:** the 20 `v2-` assets and three `v3-` replacements. The current Aider 192px PNG matches the later public catalog record; the older private manifest describes its superseded 32px favicon.
- Exact URLs for 4 older assets are documented, and 5 URLs are reconstructed from documented repository/branch/path information. Neither category has a matching saved original-download digest in this bounded evidence set.
- 8 older URLs come from download attempts supported by descriptive catalog notes. An attempted fetch does not prove success or identity with the current file; these entries are marked `download_attempt_only`.
- 9 older assets lack an exact current source URL. Their `source_url` is `null`, with a project URL and a factual gap description.

Hashes were calculated from the current local files. No upstream requests were made. Branch-based URLs and the Browser Use organization-avatar URL are mutable; the hash identifies the included bytes, not future remote content. Unknown modification histories remain unverified. Krita's documented transformation is SVGZ decompression to SVG; no visual edits are documented. Local filenames and CSS sizing/backgrounds do not establish changes to the artwork bytes.

The allowed private download scripts/manifests were consulted only for attribution fields. They are not copied into this repository documentation. Public source records remain in [catalog sources](catalog-sources.md), [expanded catalog sources](catalog-v2-sources.md) and [replacement icon sources](project-icons-v3.md).

## Artwork declarations retained in the files

- **Krita:** the SVG metadata declares **CC BY-SA 4.0**, credits **Wolthera van Hövell tot Westerflier and Timothée Giet**, and says it is based on Timothée Giet's 2013 icon.
- **Audacity:** the SVG metadata declares **GPL v2 or later**, names **Aaron Spike** as creator and the **Audacity development team** as rights holder, dated 2009-06-14.
- **The other 47 files:** artwork-specific terms are explicitly **unverified**. Repository/code license labels and project association alone are insufficient to fill this field. Separate trademark permissions were not investigated.

## Exact-source gaps

- `bitwarden.png` — Catalog identifies an official desktop app PNG, but the allowed scripts only attempt browser SVGs; exact PNG URL is absent.
- `dbeaver.png` — Catalog identifies a 256px standalone app PNG; the allowed scripts attempt SVGs and do not establish its exact source URL.
- `kdeconnect.svg` — Catalog identifies an icons/app scalable icon; attempted URLs in the scripts point to other paths and do not establish the current asset URL.
- `libreoffice.svg` — Catalog identifies a sysui scalable startcenter icon, without a complete asset path or download URL in the allowed evidence.
- `localsend.png` — Catalog identifies an app-assets logo-512.png; the allowed scripts attempt SVGs and do not establish the complete PNG URL.
- `obs.svg` — Catalog identifies a Linux scalable icon; allowed scripts attempt other SVG locations and do not establish the current asset URL.
- `sharex.png` — Catalog identifies a ShareX.HelpersLib PNG logo resource, without a complete asset path or download URL in the allowed evidence.
- `vlc.png` — Catalog identifies a 256px PNG under share/icons; allowed scripts attempt SVGs and do not establish the complete PNG URL.
- `zotero.svg` — Catalog identifies a chrome skin zotero.svg wordmark but omits its full path; allowed script attempts name other files. Retained historical asset.

Attempt-only sources: `appflowy.svg`, `blender.svg`, `cryptomator.svg`, `flameshot.svg`, `inkscape.svg`, `keepassxc.svg`, `syncthing.svg`, `vscodium.svg`.

## Maintaining the record

For an asset replacement, record the exact official URL, upstream revision when known, current SHA-256 and bytes, any transformation, and artwork-specific notices or permission evidence. Preserve existing embedded credits. Resolve missing source URLs from an actual download record or a verified upstream match; do not promote an attempted URL to verified provenance. Keep unknown terms explicitly unverified until asset-specific evidence establishes them.
