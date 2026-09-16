# Catalog sources and verification log

Reviewed on 2026-09-16. License labels describe the cataloged project code,
with component exceptions where noted. A generic GPL license text alone does
not establish whether a project permits later versions; project declarations
and source headers take precedence. This is a bounded catalog audit, not a
complete dependency or distribution-license audit. Logo assets were downloaded from official project repositories or
official source mirrors and stored locally in `public/logos/`; SVGs were
checked and contain no `<script>`, event-handler attributes, or external
href references. No star counts, ratings, or download counts are recorded.
No cloud plan pricing is claimed anywhere in the catalog.

GitHub REST API was rate-limited from this network during research, so
verification used raw.githubusercontent.com file fetches and shallow
`git clone` inspection of official repositories instead of the API.

| Tool              | License (verified source)                                                                         | Repository                          | Logo asset                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------- |
| Penpot            | MPL-2.0 (LICENSE, penpot/penpot main)                                                             | github.com/penpot/penpot            | penpot.svg — official repo standalone penpot-logo-icon.svg (square viewBox)             |
| Blender           | GPL-2.0-or-later (COPYING, blender/blender main)                                                  | github.com/blender/blender          | blender.svg — official repo freedesktop scalable icon                                   |
| Krita             | GPL-3.0-only (COPYING, KDE/krita master)                                                          | github.com/KDE/krita                | krita.svg — official repo stable default branding sc-apps-krita.svgz (decompressed)     |
| Inkscape          | GPL-2.0-or-later (project source)                                                                 | gitlab.com/inkscape/inkscape        | inkscape.svg — official GitLab share/branding/inkscape-flat.svg                         |
| GIMP              | GPL-3.0-or-later (COPYING, GNOME/gimp master)                                                     | gitlab.gnome.org/GNOME/gimp         | gimp.svg — official repo docs/Wilber.svg (mascot mark)                                  |
| VSCodium          | MIT (LICENSE, VSCodium/vscodium master)                                                           | github.com/VSCodium/vscodium        | vscodium.svg — official repo Linux app icon                                             |
| Bruno             | MIT (license.md, usebruno/bruno main)                                                             | github.com/usebruno/bruno           | bruno.png — official repo assets/images/logo-transparent.png (PNG, not SVG)             |
| DBeaver Community | Apache-2.0 (LICENSE.md, dbeaver/dbeaver devel)                                                    | github.com/dbeaver/dbeaver          | dbeaver.png — official repo standalone app icon (256px PNG, not SVG)                    |
| Zed               | GPL-3.0-or-later (README licensing and crates/zed/Cargo.toml; Apache-2.0 components where marked) | github.com/zed-industries/zed       | zed.svg — official repo assets/icons/ai_zed.svg (Zed brand mark)                        |
| Joplin            | AGPL-3.0-or-later (LICENSE, laurent22/joplin dev)                                                 | github.com/laurent22/joplin         | joplin.png — official repo Assets/LinuxIcons/256x256.png; square app icon               |
| LocalSend         | Apache-2.0 (LICENSE, localsend/localsend main)                                                    | github.com/localsend/localsend      | localsend.png — official repo app assets logo-512.png (PNG, not SVG)                    |
| Bitwarden         | GPL-3.0-only (LICENSE.txt, bitwarden/clients main; some directories under Bitwarden License v1.0) | github.com/bitwarden/clients        | bitwarden.png — official repo desktop app icon (PNG, not SVG)                           |
| Syncthing         | MPL-2.0 (LICENSE, syncthing/syncthing main)                                                       | github.com/syncthing/syncthing      | syncthing.svg — official repo GUI logo                                                  |
| OBS Studio        | GPL-2.0-or-later (COPYING, obsproject/obs-studio master)                                          | github.com/obsproject/obs-studio    | obs.svg — official repo Linux scalable icon                                             |
| Audacity          | GPL-3.0-only (LICENSE.txt, audacity/audacity master)                                              | github.com/audacity/audacity        | audacity.svg — official repo images/audacity.svg                                        |
| HandBrake         | GPL-2.0-only (COPYING, HandBrake/HandBrake master)                                                | github.com/HandBrake/HandBrake      | handbrake.png — official repo GTK 128px app icon; replaces oversized SVG in the product |
| VLC               | GPL-2.0-or-later (COPYING, videolan/vlc master)                                                   | github.com/videolan/vlc             | vlc.png — official repo share/icons 256px PNG (not SVG)                                 |
| Zotero            | AGPL-3.0-or-later (COPYING, zotero/zotero main)                                                   | github.com/zotero/zotero            | zotero.svg — official repo chrome skin zotero.svg                                       |
| Logseq            | AGPL-3.0-only (LICENSE.md, logseq/logseq master)                                                  | github.com/logseq/logseq            | logseq.png — official repo resources/icon.png (1024px PNG, not SVG)                     |
| LibreOffice       | MPL-2.0 (COPYING.MPL, LibreOffice/core master)                                                    | github.com/LibreOffice/core         | libreoffice.svg — official repo sysui scalable startcenter icon                         |
| KeePassXC         | GPL-2.0-only OR GPL-3.0-only (README and COPYING; third-party licenses listed separately)         | github.com/keepassxreboot/keepassxc | keepassxc.svg — official repo scalable app icon                                         |
| Cryptomator       | GPL-3.0-only (LICENSE.txt, cryptomator/cryptomator develop)                                       | github.com/cryptomator/cryptomator  | cryptomator.svg — official repo Linux appimage icon                                     |
| AppFlowy          | AGPL-3.0-only (LICENSE, AppFlowy-IO/AppFlowy main)                                                | github.com/AppFlowy-IO/AppFlowy     | appflowy.svg — official repo flowy_icons app logo                                       |
| Flameshot         | GPL-3.0-or-later (LICENSE, flameshot-org/flameshot master)                                        | github.com/flameshot-org/flameshot  | flameshot.svg — official repo hicolor scalable app icon                                 |
| ShareX            | GPL-3.0-only (LICENSE.txt, ShareX/ShareX develop)                                                 | github.com/ShareX/ShareX            | sharex.png — official repo ShareX.HelpersLib logo resource (PNG, not SVG)               |
| KDE Connect       | GPL-2.0-or-later (LICENSES/GPL-2.0-or-later.txt, KDE/kdeconnect-kde master)                       | github.com/KDE/kdeconnect-kde       | kdeconnect.svg — official repo icons/app scalable icon                                  |

## Known asset limitations

- **Bruno, DBeaver, Bitwarden, LocalSend, Logseq, ShareX, VLC** use PNG assets
  from their official repos because no suitable standalone SVG logo was found
  in the repository. These are transparent PNG assets; the HandBrake replacement is 128px.
- **Inkscape and GIMP**: primary development is on GitLab
  (gitlab.com/inkscape/inkscape, gitlab.gnome.org/GNOME/gimp). The GitHub
  inkscape/inkscape and GNOME/gimp repositories are official mirrors; the
  catalog records the GitLab repository URLs as canonical.
- **HandBrake** uses the official PNG at https://raw.githubusercontent.com/HandBrake/HandBrake/master/gtk/icons/128x128/apps/fr.handbrake.ghb.png. The 868 KB SVG was excluded from the product.
- **Krita** SVG now comes from `krita/pics/branding/default/sc-apps-krita.svgz`,
  the stable branding set. The prior Beta asset with a beta overlay was replaced.
- **Zed**: the initial research contained a stale Windows-in-development claim. The integration review corrected it using https://zed.dev/windows and https://zed.dev/docs/installation. Windows is included.
- **ShareX** is Windows-only per the official site; the catalog lists
  Windows only.
- **Zotero**: the integration review corrected the initial omission of Android using https://www.zotero.org/support/mobile and https://www.zotero.org/download/android/. Both iOS and Android are included.

- **Penpot** is marked Web, not a native desktop application. Desktop filters include browser-based tools and explain that compatibility. Source: https://help.penpot.dev/user-guide/first-steps/cloud-selfhost/.

Joplin icon source: https://raw.githubusercontent.com/laurent22/joplin/dev/Assets/LinuxIcons/256x256.png. The horizontal logo was unsuitable for the square identification slot and has been replaced with the official app icon.

## Bounded follow-up audit — 2026-09-16

The 26-tool catalog and its schema are unchanged in scope. Official pages were
retrieved as untrusted data with curl; no repositories were cloned during this
follow-up. Source links below are also attached to the relevant catalog rows.

- **Penpot artwork:** replaced the horizontal wordmark with the official
  [standalone brand icon](https://raw.githubusercontent.com/penpot/penpot/develop/frontend/resources/images/icons/penpot-logo-icon.svg),
  which has a square 500 × 500 viewBox. Its black mark uses a white catalog
  background. [Official media kit](https://penpot.app/media-kit).
- **Krita artwork:** replaced the Beta asset with the decompressed official
  [stable/default SVG](https://raw.githubusercontent.com/KDE/krita/master/krita/pics/branding/default/sc-apps-krita.svgz).
  The matching [256px stable PNG](https://raw.githubusercontent.com/KDE/krita/master/krita/pics/branding/default/256-apps-krita.png)
  was visually inspected and has no beta overlay. The project's
  [build configuration](https://github.com/KDE/krita/blob/master/CMakeLists.txt)
  distinguishes default stable branding from Beta, Plus, and Next. The
  [license page](https://krita.org/en/about/license/) confirms GPL v3 for Krita
  as a whole. The desktop platform list is retained; this bounded audit does
  not certify Android beta support as a stable desktop-equivalent release.
- **VSCodium:** removed the claim that all VS Code extensions and remote
  workflows are shared. Its [extension documentation](https://github.com/VSCodium/vscodium/blob/master/docs/extensions.md)
  documents Open VSX, missing extensions, and restrictions on Microsoft tools.
- **DBeaver Community:** qualified database support as SQL/JDBC-compatible;
  many non-JDBC NoSQL drivers belong to paid PRO editions. See the official
  [supported-database split](https://github.com/dbeaver/dbeaver#supported-databases).
- **Zed:** removed the remaining Windows-in-development sentence, preserving
  Windows in the platform array. Corrected the license to GPL-3.0-or-later
  from the [project declaration](https://github.com/zed-industries/zed#licensing)
  and [editor manifest](https://raw.githubusercontent.com/zed-industries/zed/main/crates/zed/Cargo.toml);
  Apache-2.0 components remain separately marked upstream.
- **Bitwarden:** exposed mixed licensing in the catalog label, consistent with
  its [license map](https://raw.githubusercontent.com/bitwarden/clients/main/LICENSE.txt).
  Enabled the offline flag with an explicit read-only qualification based on
  [official offline documentation](https://bitwarden.com/help/using-bitwarden-offline/).
  Offline access requires an existing unlocked vault; editing and sync need a
  connection. The single boolean cannot encode that distinction on its own.
- **Syncthing:** removed Android from the supported-platform array because the
  [official Android application is discontinued](https://github.com/syncthing/syncthing-android#discontinued).
  Removed Web as an execution platform: the [official download page](https://syncthing.net/downloads/)
  describes a locally running daemon with a browser management UI. Community
  mobile integrations are not certified by this row.
- **KeePassXC:** corrected its code license to GPL-2.0-only OR GPL-3.0-only,
  matching the [README](https://github.com/keepassxreboot/keepassxc#license) and
  [COPYING](https://raw.githubusercontent.com/keepassxreboot/keepassxc/develop/COPYING).
  Third-party components have additional licenses listed in COPYING.
- **Logseq:** qualified Markdown/Org storage and mobile platforms as the
  file-based product. The [official README](https://github.com/logseq/logseq#-database-version)
  describes a separate DB beta and different mobile rollout; the existing
  platforms do not promise matching DB-version availability.
- **Joplin:** qualified encrypted sync as optional; users must enable it in
  the [end-to-end encryption setup](https://joplinapp.org/help/apps/sync/e2ee/).
- **KDE Connect:** retained macOS and iOS, confirmed by the
  [official downloads page](https://kdeconnect.kde.org/download.html), and
  qualified feature availability by platform. Its iOS port has limitations.

Existing Penpot Web, Zed Windows, Zotero Android, and the Joplin/HandBrake PNG
corrections were preserved. Other entries were screened for suspicious claims;
this pass does not claim a fresh exhaustive verification of all 26 products,
all feature details, mobile licensing, or every source URL. Website fields were
not changed. GitHub's contents API returned 403; targeted raw files and official
pages supplied the required evidence without a clone.

Validation after these changes: `npm run test` passed all 83 tests across two
files; `npm run typecheck` passed. Both replacement SVGs parsed as XML and were
rendered with macOS Quick Look for visual inspection: Penpot is a standalone
pencil-cup mark, and Krita has no beta overlay. Asset sizes are 1,248 and 11,402
bytes respectively. No browser suite, production build, or publication ran in
this bounded follow-up.

## Shipment 3 icon corrections

The active catalog now uses standalone Zotero, Syncthing and Zed app/brand marks. See [project-icons-v3.md](project-icons-v3.md) for the three official source URLs, selection rationale and byte/hash evidence. The earlier table records historical assets; the catalog is the current asset mapping.
