# Security policy

## Report a vulnerability

Please use [GitHub private vulnerability reporting](https://github.com/saketh12e/commonplace/security/advisories/new) for sensitive findings. Do not include exploit details, credentials or personal information in public issues.

Include the affected commit/version, reproduction steps, likely impact and a suggested fix if available. Share the minimum data needed to reproduce the issue. Reports are reviewed by the maintainer; this volunteer project does not promise a response SLA.

## Supported code

Security fixes target the current `main` branch. Older snapshots do not receive a separate maintenance stream.

Commonplace is currently a static client application. Personal library state lives in browser storage; there is no application authentication server or secret required to run it. Catalog links lead to external projects, whose vulnerabilities should be reported to their respective maintainers.

Do not commit credentials. Anything in a `VITE_` environment variable is bundled into client-side code and must be treated as public. Future backend integrations require their own access-control and secret-storage design.
