# Commonplace v2 catalog sources

Verified on **2026-09-16** against official repositories, license files, product pages, and documentation. This is a source review, not a hands-on installation or security audit. Source snapshots and manifests are in `work/research/v2-catalog/`. Fetches used curl with certificate verification, HTTPS-only redirects and TLS 1.2 or later; no repositories were cloned. Browser tools cross-checked BrowserOS, LibreWolf, Chromium and mixed-license projects. Firecrawl had no remaining credits, so research used direct TLS-verified curl and the available web tool.

## Integration contract

`src/data/expansion.ts` exports `expansionTools: Tool[]`: 20 additions, with 4 AI, 6 browsers, 6 agents, and 4 automation entries. Parent integration owns the CategoryId union, optional `topics?: string[]`, category definitions, concatenation into the existing catalog, and tests. This sidecar does not modify those files. All entries set `featured: false`; no popularity, ratings, downloads, or stars are invented or imported into the catalog.

Tags are editorial discovery labels backed by described capabilities, not additional categories. BrowserOS has a built-in browser agent; Brave is also tagged AI browsers for its documented built-in Leo assistant. Stable Leo capabilities are distinct from experimental Nightly-only AI Browsing; Browser Use is a developer library and is classified under agents. BrowserOS neo is deliberately not added as a duplicate entry with different platform claims.

## Field interpretation

- `offline: true` means the described core workflow can run without an internet connection after installation and required downloads/configuration. It never means cloud APIs, remote tools, live websites, package downloads, or model acquisition work offline.
- `selfHost: true` means the listed product supplies a server/application deployment path; it does not simply mean a desktop program runs locally. Web platform entries describe browser access to a deployed service, not native applications for every operating system.
- AI application licenses do not license their model weights. Hardware, model capabilities, token costs, and connected-service charges depend on the chosen provider and configuration.
- Desktop browser platform lists are intentionally scoped to desktop builds. Branding, bundled dependencies, extensions, hosted services, and commercial editions may have separate terms.

## Inclusion and exclusions

- Windmill is listed as **Windmill (source build)**: the root license explicitly distinguishes the AGPL build without enterprise features from distributed Community Edition binaries/images that also contain proprietary code. Apache-2.0 applies to specified clients. Do not relabel official Community Edition images as fully open source.
- Activepieces is listed as **Activepieces (Community)**: MIT covers the community core; designated enterprise directories are commercially licensed.
- Jan’s current LICENSE specifies Apache-2.0. The GitHub metadata classifier returns NOASSERTION, so the actual license text takes precedence.
- OpenHands’ current repository describes Agent Canvas with local/remote backend orchestration. The entry reflects that product rather than older installation instructions.
- Excluded Open WebUI: the current license contains branding restrictions, with specific exceptions, beyond the standard permissive license conditions.
- Excluded n8n: the Sustainable Use License restricts use and distribution; it is not treated as an OSI open-source entry.
- Excluded LM Studio under the requested proprietary-product exclusion. It can appear as a comparison alternative, never as a catalog addition.

Exclusion evidence: [Open WebUI LICENSE](https://raw.githubusercontent.com/open-webui/open-webui/main/LICENSE); [n8n LICENSE](https://raw.githubusercontent.com/n8n-io/n8n/master/LICENSE.md).

## Per-entry source record

### Ollama

Category: `ai`. Platforms: macos, windows, linux. License: **MIT**.

Ollama runs downloaded language models locally and exposes an API for other applications on macOS, Windows, and Linux. Local inference can work offline after model downloads, with enough RAM or GPU memory for the selected model. Optional cloud models require internet access and have separate service terms and usage limits; model licenses are separate from the MIT runtime.

Primary evidence:

- [Official product / documentation](https://github.com/ollama/ollama)
- [README / product and setup](https://raw.githubusercontent.com/ollama/ollama/main/README.md)
- [License](https://raw.githubusercontent.com/ollama/ollama/main/LICENSE)
- [Official product / documentation](https://docs.ollama.com/faq)

Logo: [/logos/v2-ollama.svg](https://raw.githubusercontent.com/ollama/ollama/main/docs/ollama-logo.svg); 6,915 bytes. Official standalone product asset, downloaded without modifying its bytes.

SHA-256: `397a6ee071cce1496edd8a86dd1c91ce005712ec161690e411b3dc7f151181f5`

### llama.cpp

Category: `ai`. Platforms: macos, windows, linux. License: **MIT**.

llama.cpp provides command-line inference and an HTTP server for compatible GGUF models. It supports CPU execution and hardware-specific GPU backends across macOS, Windows, and Linux. Local use works offline once binaries and model files are installed; setup requires choosing a compatible model and backend, and model weights carry their own licenses.

Primary evidence:

- [Official product / documentation](https://github.com/ggml-org/llama.cpp)
- [README / product and setup](https://raw.githubusercontent.com/ggml-org/llama.cpp/master/README.md)
- [License](https://raw.githubusercontent.com/ggml-org/llama.cpp/master/LICENSE)
- [Official product / documentation](https://raw.githubusercontent.com/ggml-org/llama.cpp/master/docs/build.md)

Logo: [/logos/v2-llama-cpp.svg](https://raw.githubusercontent.com/ggml-org/llama.cpp/master/media/llama1-icon.svg); 2,807 bytes. Official standalone product asset, downloaded without modifying its bytes.

SHA-256: `3613677483c2bd701c3205fafe1b93345b7c66f79c829b733a68137d35e142d9`

### Jan

Category: `ai`. Platforms: macos, windows, linux. License: **Apache-2.0**.

Jan runs downloaded language models on macOS, Windows, and Linux and can expose an OpenAI-compatible local API. Local models can work offline after downloading their files; hardware requirements depend on model size. Connecting a remote provider sends requests to that provider and may incur API charges. The application uses Apache-2.0; model licenses remain separate.

Primary evidence:

- [Official product / documentation](https://github.com/janhq/jan)
- [README / product and setup](https://raw.githubusercontent.com/janhq/jan/main/README.md)
- [License](https://raw.githubusercontent.com/janhq/jan/main/LICENSE)

Logo: [/logos/v2-jan.png](https://raw.githubusercontent.com/janhq/jan/main/src-tauri/icons/icon.png); 36,896 bytes. Official standalone product asset, downloaded without modifying its bytes. A direct PNG is used instead of the SVG that wraps an embedded raster image.

SHA-256: `959cc9db27d57d34b516b9abef28c3240b1dc836c50f6ffafa9215beb699c81b`

### GPT4All

Category: `ai`. Platforms: macos, windows, linux. License: **MIT**.

GPT4All offers a desktop chat client and Python bindings for running language models locally on macOS, Windows, and Linux. LocalDocs lets you query an indexed document collection. Offline use requires downloading a model first and enough memory for it; supported processors and architectures vary by installer. The MIT application license does not replace the separate licenses of downloaded models.

Primary evidence:

- [Official product / documentation](https://github.com/nomic-ai/gpt4all)
- [README / product and setup](https://raw.githubusercontent.com/nomic-ai/gpt4all/main/README.md)
- [License](https://raw.githubusercontent.com/nomic-ai/gpt4all/main/LICENSE.txt)

Logo: [/logos/v2-gpt4all.svg](https://raw.githubusercontent.com/nomic-ai/gpt4all/main/gpt4all-chat/icons/gpt4all.svg); 5,844 bytes. Official standalone product asset, downloaded without modifying its bytes.

SHA-256: `2c449520c6f9eed1433dc87dcc2808f8bfe999ceed6a7ebc3c8db56266c8a844`

### Firefox

Category: `browsers`. Platforms: macos, windows, linux. License: **MPL-2.0**.

Firefox is Mozilla’s open-source browser with tracking protection, extensions, bookmarks, and developer tools. This entry covers desktop builds for macOS, Windows, and Linux. Normal web browsing requires internet access; local files can be opened offline. Firefox Sync is optional and requires an account. Mozilla branding and bundled third-party components have separate terms.

Primary evidence:

- [Official product / documentation](https://github.com/mozilla-firefox/firefox)
- [README / product and setup](https://raw.githubusercontent.com/mozilla-firefox/firefox/main/README.md)
- [License](https://raw.githubusercontent.com/mozilla-firefox/firefox/main/LICENSE)
- [Official product / documentation](https://www.firefox.com/en-US/features/)
- [Official product / documentation](https://www.firefox.com/en-US/desktop/)
- [License](https://raw.githubusercontent.com/mozilla-firefox/firefox/main/toolkit/content/license.html)

Logo: [/logos/v2-firefox.png](https://raw.githubusercontent.com/mozilla-firefox/firefox/main/browser/branding/official/default128.png); 13,513 bytes. Official standalone product asset, downloaded without modifying its bytes.

SHA-256: `9926bbb47e152c9747c8e7fbe9d7679fbcf221a4aa13400cbf1d2da3210d1b20`

### Brave

Category: `browsers`. Platforms: macos, windows, linux. License: **MPL-2.0**.

Brave includes Shields to block ads and trackers and supports Chromium extensions on desktop. This entry covers macOS, Windows, and Linux downloads. Web browsing needs internet access; optional services such as VPN or premium AI features have their own pricing and terms. The browser’s open-source license does not imply that every connected service is free or runs locally.

Primary evidence:

- [Official product / documentation](https://github.com/brave/brave-browser)
- [README / product and setup](https://raw.githubusercontent.com/brave/brave-browser/master/README.md)
- [License](https://raw.githubusercontent.com/brave/brave-browser/master/LICENSE)
- [Official product / documentation](https://brave.com/download/)

Logo: [/logos/v2-brave.png](https://raw.githubusercontent.com/brave/brave-core/master/app/theme/brave/product_logo_128.png); 9,427 bytes. Official standalone product asset, downloaded without modifying its bytes.

SHA-256: `dcfd409dd1def2f404600f5a116fbc2796abcde3a01a136b8be7376db2abf846`

### Zen Browser

Category: `browsers`. Platforms: macos, windows, linux. License: **MPL-2.0**.

Zen builds on Firefox with vertical tabs, workspaces, and split views for organizing desktop browsing. It provides macOS, Windows, and Linux builds and supports Firefox extensions. Online pages require internet access. Compatibility can differ from Firefox, including DRM-protected streaming, so check the project’s current guidance for sites you depend on.

Primary evidence:

- [Official product / documentation](https://github.com/zen-browser/desktop)
- [README / product and setup](https://raw.githubusercontent.com/zen-browser/desktop/dev/README.md)
- [License](https://raw.githubusercontent.com/zen-browser/desktop/dev/LICENSE)
- [Official product / documentation](https://zen-browser.app/)
- [Official product / documentation](https://zen-browser.app/download/)

Logo: [/logos/v2-zen.svg](https://raw.githubusercontent.com/zen-browser/desktop/dev/docs/assets/zen-dark.svg); 1,141 bytes. Official standalone product asset, downloaded without modifying its bytes.

SHA-256: `e33073d00a5b8330b0eb1ac34d574e385cfe7c4012c71d07d4ec8a11b25aee50`

### LibreWolf

Category: `browsers`. Platforms: macos, windows, linux. License: **MPL-2.0**.

LibreWolf is an independent Firefox fork for macOS, Windows, and Linux. It disables telemetry, includes uBlock Origin, and applies settings intended to reduce tracking and fingerprinting. Its stricter defaults can affect website compatibility, and DRM is disabled by default. Internet access is needed for online browsing and updates; it is not an anonymity network.

Primary evidence:

- [Official product / documentation](https://librewolf.net/)
- [License](https://librewolf.net/license-disclaimers/)
- [Official product / documentation](https://librewolf.net/installation/)

Logo: [/logos/v2-librewolf.svg](https://librewolf.net/icon.svg); 5,916 bytes. Official standalone product asset, downloaded without modifying its bytes.

SHA-256: `b85d68f1b5b47b9b2c3a3e6b5f5a0f887577e0eb6ee8387fb7b81f5f8e4017c4`

### Chromium

Category: `browsers`. Platforms: macos, windows, linux. License: **BSD-3-Clause**.

Chromium supplies the browser engine, developer tools, and extension platform used by many downstream browsers. This entry covers desktop builds for macOS, Windows, and Linux. Official snapshots are development builds, may be buggy, and do not automatically update; use a maintained distribution when ongoing updates matter. Online browsing needs internet access, and bundled components have additional licenses.

Primary evidence:

- [Official product / documentation](https://github.com/chromium/chromium)
- [README / product and setup](https://raw.githubusercontent.com/chromium/chromium/main/README.md)
- [License](https://raw.githubusercontent.com/chromium/chromium/main/LICENSE)
- [Official product / documentation](https://www.chromium.org/getting-involved/download-chromium/)

Logo: [/logos/v2-chromium.png](https://raw.githubusercontent.com/chromium/chromium/main/chrome/app/theme/chromium/product_logo_64.png); 2,172 bytes. Official standalone product asset, downloaded without modifying its bytes.

SHA-256: `aa7f129dcfe02276ebd365781c6a0c3c8ab1ca41abf3408ca47e604e7fe12018`

### BrowserOS

Category: `browsers`. Platforms: macos, windows, linux. License: **AGPL-3.0-only**.

BrowserOS includes an agent that can summarize pages, extract information, and act on websites on macOS, Windows, and Linux. Connect a supported cloud provider or a local Ollama model. Cloud inference may cost money and sends model context to that provider; local inference needs downloaded weights and suitable hardware. Live web tasks still need internet access. This entry covers BrowserOS, distinct from BrowserOS neo.

Primary evidence:

- [Official product / documentation](https://github.com/browseros-ai/BrowserOS)
- [README / product and setup](https://raw.githubusercontent.com/browseros-ai/BrowserOS/main/README.md)
- [License](https://raw.githubusercontent.com/browseros-ai/BrowserOS/main/LICENSE)
- [README / product and setup](https://raw.githubusercontent.com/browseros-ai/BrowserOS/main/README.BrowserOS.md)

Logo: [/logos/v2-browseros.png](https://raw.githubusercontent.com/browseros-ai/BrowserOS/main/packages/browseros/resources/browseros/icons/product_logo_192.png); 14,389 bytes. Official standalone product asset, downloaded without modifying its bytes.

SHA-256: `a872a7a411a4117cb6c04558ad211a74579d91015223f067b631362bcec87ada`

### Aider

Category: `agents`. Platforms: macos, windows, linux. License: **Apache-2.0**.

Aider edits code through terminal conversations, builds a map of a repository, and integrates changes with Git. It can use cloud APIs or a compatible local model on macOS, Windows, and Linux. Local operation requires a configured model server and enough memory; cloud providers may charge for tokens and receive the code context you share. Install Python and Git before setup.

Primary evidence:

- [Official product / documentation](https://github.com/Aider-AI/aider)
- [README / product and setup](https://raw.githubusercontent.com/Aider-AI/aider/main/README.md)
- [License](https://raw.githubusercontent.com/Aider-AI/aider/main/LICENSE.txt)

Logo: [/logos/v2-aider.png](https://raw.githubusercontent.com/Aider-AI/aider/main/aider/website/assets/icons/android-chrome-192x192.png); 29,475 bytes. Official standalone 192px PNG, downloaded without modifying its bytes. Replaces the initial 32px favicon for sharper rendering.

SHA-256: `9242d14983bd63790790581471f6e33ba09a143feb841598107635d58ea96018`

### OpenHands

Category: `agents`. Platforms: web. License: **MIT**.

OpenHands Agent Canvas provides a browser interface for working with software agents through local, Docker, remote, or cloud backends. The current local launcher requires Node.js 22.12 or later and uv; container isolation additionally requires Docker. Configure a supported agent backend and model provider. Hosted backends and cloud inference have separate charges and terms; self-hosting alone does not guarantee offline operation.

Primary evidence:

- [Official product / documentation](https://github.com/OpenHands/OpenHands)
- [README / product and setup](https://raw.githubusercontent.com/OpenHands/OpenHands/main/README.md)
- [License](https://raw.githubusercontent.com/OpenHands/OpenHands/main/LICENSE)

Logo: [/logos/v2-openhands.svg](https://raw.githubusercontent.com/OpenHands/OpenHands/main/public/favicon.svg); 7,502 bytes. Official standalone product asset, downloaded without modifying its bytes.

SHA-256: `c932042b36a7a18c8585dc41e0e03fbff86096ec78718243ccac9fe1c4e110b7`

### Goose

Category: `agents`. Platforms: macos, windows, linux. License: **Apache-2.0**.

Goose offers a native desktop app and CLI for macOS, Windows, and Linux, with tools and MCP extensions for multi-step work. It supports hosted model providers and local Ollama models. Offline use requires a capable local model and local-only tools; hosted inference and subscription-backed providers have separate costs and terms. Tasks involving websites or remote services require connectivity.

Primary evidence:

- [Official product / documentation](https://github.com/block/goose)
- [README / product and setup](https://raw.githubusercontent.com/block/goose/main/README.md)
- [License](https://raw.githubusercontent.com/block/goose/main/LICENSE)

Logo: [/logos/v2-goose.svg](https://raw.githubusercontent.com/block/goose/main/ui/desktop/src/images/icon.svg); 3,318 bytes. Official standalone product asset, downloaded without modifying its bytes.

SHA-256: `b4a9ab0aa1da378732f41c0e00733e7a37c9b97bab368ea6fddc25821ddbefc2`

### Continue

Category: `agents`. Platforms: macos, windows, linux. License: **Apache-2.0**.

Continue provides open-source VS Code and JetBrains extensions plus a CLI for AI-assisted development. Choose models and context sources for chat and coding workflows on macOS, Windows, and Linux. Offline use requires local models, local embeddings where needed, and the documented network-free configuration. Cloud APIs and hosted services may charge separately and receive submitted code context.

Primary evidence:

- [Official product / documentation](https://github.com/continuedev/continue)
- [README / product and setup](https://raw.githubusercontent.com/continuedev/continue/main/README.md)
- [License](https://raw.githubusercontent.com/continuedev/continue/main/LICENSE)
- [Official product / documentation](https://docs.continue.dev/guides/running-continue-without-internet)

Logo: [/logos/v2-continue.png](https://raw.githubusercontent.com/continuedev/continue/main/extensions/vscode/media/icon.png); 3,826 bytes. Official standalone product asset, downloaded without modifying its bytes.

SHA-256: `c615fb9d525937b3610e6ba2965e6f433f3b5d4680e861b90016881d14a7552a`

### OpenCode

Category: `agents`. Platforms: macos, windows, linux. License: **MIT**.

OpenCode provides a terminal interface and desktop app for working with coding agents across macOS, Windows, and Linux. It supports multiple model providers, including configured local endpoints. Offline coding requires a compatible local model and local tools; provider APIs and optional hosted offerings have their own costs and terms. Review proposed file changes and tool actions as part of your workflow.

Primary evidence:

- [Official product / documentation](https://github.com/anomalyco/opencode)
- [README / product and setup](https://raw.githubusercontent.com/anomalyco/opencode/dev/README.md)
- [License](https://raw.githubusercontent.com/anomalyco/opencode/dev/LICENSE)
- [Official product / documentation](https://opencode.ai/docs/providers/)

Logo: [/logos/v2-opencode.svg](https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/ui/src/assets/favicon/favicon.svg); 612 bytes. Official standalone product asset, downloaded without modifying its bytes. The app favicon path is a repository symlink; this URL resolves to its real source asset.

SHA-256: `e29bbe33380ad1c1ada9134b52f229d30e9776d60481512c9d81f2bb6f37def9`

### Browser Use

Category: `agents`. Platforms: macos, windows, linux. License: **MIT**.

Browser Use is an MIT-licensed Python library for building agents that navigate and interact with browser pages. It can connect to a local or hosted browser; install its supported Python environment, browser dependencies, and configure a model provider. Live websites need internet access. Model inference and the optional Browser Use Cloud service are separate from the library and may incur charges.

Primary evidence:

- [Official product / documentation](https://github.com/browser-use/browser-use)
- [README / product and setup](https://raw.githubusercontent.com/browser-use/browser-use/main/README.md)
- [License](https://raw.githubusercontent.com/browser-use/browser-use/main/LICENSE)

Platform evidence: [Python package manifest](https://raw.githubusercontent.com/browser-use/browser-use/main/pyproject.toml) declares OS independence and platform-specific dependencies for macOS, Linux, and Windows.

Logo: [/logos/v2-browser-use.png](https://avatars.githubusercontent.com/u/192012301?v=4&s=128); 5,040 bytes. Official GitHub organization avatar fallback: the repository tree contains no standalone logo/icon asset; the README uses an attachment banner. The organization identity was verified from the official repository metadata.

SHA-256: `3e72f0ba6839ff7c85d4bab1ffd98d38111c3d99e508fb2bc34a002f8a3f0e6e`

### Node-RED

Category: `automation`. Platforms: web. License: **Apache-2.0**.

Node-RED runs a browser-based flow editor on a Node.js runtime and connects events, devices, and services through reusable nodes. Install a supported Node.js release or use the project’s container guidance. Local device and file flows can run without internet after setup; cloud integrations need network access, credentials, and sometimes paid service accounts. Community nodes carry their own licenses and requirements.

Primary evidence:

- [Official product / documentation](https://github.com/node-red/node-red)
- [README / product and setup](https://raw.githubusercontent.com/node-red/node-red/main/README.md)
- [License](https://raw.githubusercontent.com/node-red/node-red/main/LICENSE)
- [Official product / documentation](https://nodered.org/docs/getting-started/local)

Logo: [/logos/v2-node-red.svg](https://nodered.org/about/resources/media/node-red-icon-2.svg); 6,821 bytes. Official standalone product asset, downloaded without modifying its bytes.

SHA-256: `a23927a2731164b0b1c466f00435d1620356e9ef1b34ddb5f9314d421fff2b4a`

### Huginn

Category: `automation`. Platforms: web. License: **MIT**.

Huginn is a self-hosted system whose agents observe inputs, create events, and pass them to other agents. It can monitor sites, process feeds, and trigger notifications through a web interface. Deployment needs the official Docker setup or a Ruby environment with a supported database. Website monitoring and external delivery need internet access and service credentials; third-party service fees may apply.

Primary evidence:

- [Official product / documentation](https://github.com/huginn/huginn)
- [README / product and setup](https://raw.githubusercontent.com/huginn/huginn/master/README.md)
- [License](https://raw.githubusercontent.com/huginn/huginn/master/LICENSE)

Logo: [/logos/v2-huginn.svg](https://raw.githubusercontent.com/huginn/huginn/master/media/huginn-icon-square.svg); 5,197 bytes. Official standalone product asset, downloaded without modifying its bytes.

SHA-256: `652f37e3af9cb4c9a24635736ca04023f72a8a484e05fa3d5bd8a5da8f6d4402`

### Windmill (source build)

Category: `automation`. Platforms: web. License: **AGPL-3.0-only / Apache-2.0 (source build)**.

Windmill turns scripts into workflows and web interfaces backed by workers and PostgreSQL. This entry covers the AGPL source build without proprietary enterprise features; Apache-2.0 applies to specified clients. Published Community Edition images and release binaries also contain proprietary code and are not equivalent to that open-source build. Self-hosting requires server setup, and external APIs or hosted services may add costs.

Primary evidence:

- [Official product / documentation](https://github.com/windmill-labs/windmill)
- [README / product and setup](https://raw.githubusercontent.com/windmill-labs/windmill/main/README.md)
- [License](https://raw.githubusercontent.com/windmill-labs/windmill/main/LICENSE)
- [License](https://raw.githubusercontent.com/windmill-labs/windmill/main/LICENSE-AGPL)

Logo: [/logos/v2-windmill.svg](https://raw.githubusercontent.com/windmill-labs/windmill/main/frontend/static/logo.svg); 1,958 bytes. Official standalone product asset, downloaded without modifying its bytes.

SHA-256: `4c114f3758666410c10976935562440eef8b0c9748426d1875556e60a731ec72`

### Activepieces (Community)

Category: `automation`. Platforms: web. License: **MIT (community core)**.

Activepieces Community provides a visual flow builder and reusable integrations called pieces. This entry covers the MIT community core; designated enterprise directories use a commercial license. Self-hosting requires the documented server or container setup, and integrations need service credentials and connectivity. Cloud hosting, enterprise features, and connected AI or SaaS services can carry separate charges.

Primary evidence:

- [Official product / documentation](https://github.com/activepieces/activepieces)
- [README / product and setup](https://raw.githubusercontent.com/activepieces/activepieces/main/README.md)
- [License](https://raw.githubusercontent.com/activepieces/activepieces/main/LICENSE)
- [License](https://raw.githubusercontent.com/activepieces/activepieces/main/packages/ee/LICENSE)

Logo: [/logos/v2-activepieces.svg](https://raw.githubusercontent.com/activepieces/activepieces/main/docs/favicon.svg); 799 bytes. Official standalone product asset, downloaded without modifying its bytes.

SHA-256: `0addda76f840adcf5d0da2c5975eb6744d471ab7533bca22bcfae97fd232f515`

## Logo handling

All catalog logo filenames are new and prefixed `v2-`. SVGs are checked as XML and reject script, foreignObject, event handlers, animation, external resources, and font imports. PNGs are checked for signature and dimensions. The sole organization-avatar fallback is Browser Use; it is downloaded as a local PNG and never fetched by the page at runtime. Source code licenses do not grant trademark rights; the logos identify their respective projects and imply no endorsement.

## Validation

See `work/research/v2-catalog/validation.json` and `validation.log` for the final targeted checks. Parent-owned files may change concurrently; catalog integration and full-app acceptance remain the parent’s responsibility.

Parent integration supplement: Brave Leo capabilities checked against https://support.brave.app/hc/en-us/articles/20958609786637-How-do-I-use-Brave-Leo. Experimental AI Browsing is distinguished using https://support.brave.app/hc/en-us/articles/41240379376909-How-do-I-use-AI-Browsing-in-Brave. Final AI browsers topic contains Brave and BrowserOS.
