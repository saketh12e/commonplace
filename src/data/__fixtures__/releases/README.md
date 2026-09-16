# Release snapshot fixtures

These are reduced observations from the official GitHub release API responses recorded on 16 September 2026. They keep the upstream fields exercised by catalog checks, the requested API URL and actual fetch timestamp. Release bodies are represented by trimmed character count and SHA-256 of the original UTF-8 body; release prose, author profiles, download assets and transport headers are not redistributed.

The Goose fixture also preserves the observed HTTP status sequence, including a repository-transfer redirect. Read the public source URLs in each fixture and the editorial provenance in `docs/releases-v3-sources.md` at the project root.

These files are test evidence, not runtime imports or live network tests. When updating release snapshots, fetch the official source, review the result, and update the record and its fixture together. Do not derive evidence fields from the catalog entry merely to make a test pass. Raw local captures remain under the Git-ignored research directory.
