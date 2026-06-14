# Security Policy

AI Arsenal is a knowledge base. It links to third-party tools and projects, but does **not** audit or guarantee their security. For a full disclosure policy, see [`docs/policies/security-disclosure.md`](./docs/policies/security-disclosure.md).

## Reporting a Vulnerability in AI Arsenal Itself

If you discover a security issue in:

- repository automation (`.github/workflows/`, `scripts/`)
- GitHub Actions configuration
- generated data (`/data/*.json`)
- validation pipeline
- the future UI consumer of `/data/*.json`

**Use GitHub Security Advisories (private disclosure).**

> <https://github.com/knarayanareddy/AI-Arsenal/security/advisories/new>

Do not open a public issue. We will respond within **72 hours** of disclosure and aim to publish a fix or mitigation within **14 days** for high-severity issues, **30 days** for medium, **90 days** for low.

We follow a 90-day coordinated disclosure timeline. If we cannot fix within that window, we will publish a security advisory with mitigations and credit the reporter (unless they prefer anonymity).

## Supported Versions

| Branch  | Supported          |
|---------|--------------------|
| `main`  | ✅ Active          |
| `<tag`  | ✅ Until next minor (6 months) |
| older    | ❌ No patches      |

## Reporting Vulnerabilities in Listed Tools

If you discover a vulnerability in a tool or project listed by AI Arsenal, **report it to that upstream project** using its responsible disclosure process.

AI Arsenal will mark entries with warnings or status changes **after** upstream disclosure is handled. We will not pre-publish unverified vulnerability claims.

## Scope

**In scope:**

- Vulnerabilities in repository scripts.
- Unsafe GitHub Actions behavior.
- Credential exposure risks.
- Malicious links or supply-chain concerns introduced into content.
- Generated data integrity (XSS, prototype pollution, etc.).

**Out of scope:**

- Vulnerabilities in unrelated third-party projects, except for updating metadata or warnings in Arsenal entries.
- Theoretical attacks without a concrete exploit path.
- Issues already filed and tracked publicly.

## Security Tooling

This repository uses:

- **CodeQL** (`codeql.yml`) — weekly static analysis for JavaScript.
- **OSSF Scorecard** (`scorecard.yml`) — supply-chain health check.
- **Dependabot** (`dependabot.yml`) — weekly dependency update PRs.
- **GitHub secret scanning** — enabled at repo level.

## Security Contacts

- Primary: GitHub Security Advisories (link above)
- Backup: `@knarayanareddy` via GitHub mention (please mark `@knarayanareddy` and prefix with `[SECURITY]`)

We will **not** respond to security issues filed via Twitter/X, LinkedIn, or other public channels. Use the private channel above.
