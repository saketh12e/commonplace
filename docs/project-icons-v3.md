# Project icon corrections — shipment 3

Verified 16 September 2026. App tiles need standalone marks with sufficient contrast at small sizes. Visual inspection found that the original Zotero and Syncthing assets were horizontal wordmarks, while Zed used a pale in-app glyph. All replacements below are the official project's unmodified bytes, served locally. Their artwork remains owned by the respective projects; no affiliation is implied.

| Project   | New local asset                 | Official source                                                                                           | Reason                                                                   |
| --------- | ------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Zotero    | `public/logos/v3-zotero.png`    | [Linux app icon, 128px](https://raw.githubusercontent.com/zotero/zotero/main/app/linux/icons/icon128.png) | Recognizable red Z at app-tile scale, instead of shrinking a wordmark.   |
| Syncthing | `public/logos/v3-syncthing.svg` | [Standalone logo](https://raw.githubusercontent.com/syncthing/syncthing/main/assets/logo-only.svg)        | Square symbol, clear white network motif.                                |
| Zed       | `public/logos/v3-zed.svg`       | [96px brand vector](https://raw.githubusercontent.com/zed-industries/zed/main/assets/images/zed_logo.svg) | Crisp black mark on a white tile, without the low-contrast in-app glyph. |

The Zed PNG app icon was inspected, then rejected in favor of the 861-byte SVG to keep the interface light. That candidate stays in research evidence only. Shipped replacement assets total approximately 11 KB uncompressed. Original historical assets remain for provenance; catalog references point to the new files.

Source URLs, exact sizes and SHA-256 hashes: `work/research/v3-icons/manifest.json`. SVG safety checks exclude scripts, event handlers, foreign objects and external references. Syncthing's own brand gradient is preserved within its artwork; no gradient was introduced to interface surfaces.

macOS, Windows and Linux platform marks are documented separately in [platform-icons-v3.md](platform-icons-v3.md).
