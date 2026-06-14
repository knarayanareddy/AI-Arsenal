# Security Disclosure Policy

This document specifies how security vulnerabilities in AI Arsenal are handled.

For the high-level policy, see `SECURITY.md` (at the repo root). This file is the **operational** playbook.

## Scope

In scope:

- Repository automation (`scripts/*.js`, `utils/*.js`)
- GitHub Actions workflows (`.github/workflows/*.yml`)
- Schema validation logic (`schemas/*.schema.json` + `scripts/validate-*.js`)
- Generated data layer (`/data/*.json`)
- Frontmatter parsing and Markdown rendering
- Any new tooling added in the future

Out of scope:

- Vulnerabilities in third-party tools/projects referenced by AI Arsenal — report to upstream.
- Theoretical issues without a working exploit.

## Disclosure Channels

### Preferred: GitHub Security Advisories

> <https://github.com/knarayanareddy/AI-Arsenal/security/advisories/new>

GitHub Security Advisories provide:

- Private visibility until publication
- Credit assignment (or anonymity)
- CVE number assignment
- Coordinated disclosure timeline

### Backup: Private GitHub mention

If GitHub Advisories are unavailable, mention `@knarayanareddy` in a private GitHub issue with the prefix `[SECURITY]`.

### Never:

- ❌ Twitter/X DMs
- ❌ Email (no security@ alias is published to avoid spam harvesting)
- ❌ Public issues (always public — visible to attackers)
- ❌ Discord or other public channels

## Acknowledgement Timeline

| Stage | Target |
|---|---|
| Initial acknowledgement | **72 hours** from disclosure |
| Severity assessment | **7 days** from acknowledgement |
| Patch development | **14 days** for Critical/High, **30 days** for Medium, **90 days** for Low |
| Public advisory publication | **At or before** patch release (or sooner with reporter agreement) |
| CVE assignment | At maintainer discretion; coordinated via GitHub |

## Severity Classification

We follow [CVSS v3.1](https://www.first.org/cvss/v3.1/specification-document).

### Critical (CVSS ≥ 9.0)

- RCE in CI runner
- Credential / token exfiltration
- Bypass of branch protection / CODEOWNERS
- Mass data corruption (mass update of `data/*.json`)
- XSS in generated `body_html` leading to UI consumer compromise

### High (7.0–8.9)

- SSRF leading to internal service access
- Arbitrary file write in CI
- Privilege escalation in contributor workflow
- Persistent denial of service

### Medium (4.0–6.9)

- Information disclosure (e.g., star counts revealing repo state)
- Bypass of single validation rule without affecting integrity
- Subtle Markdown injection leading to misleading display

### Low (< 4.0)

- Defensive recommendations
- Hardening opportunities
- Theoretical concerns without concrete exploit

## Disclosure Process

1. **Receive report** via private channel.
2. **Acknowledge** within 72 hours.
3. **Reproduce** in a private test environment.
4. **Triage** severity using CVSS.
5. **Develop fix** in a private branch.
6. **Test fix** with `pnpm test` and CodeQL.
7. **Coordinate publication** with reporter (default: publish at patch release).
8. **Publish security advisory** with:
   - Description and impact
   - Affected versions
   - Fixed version
   - Mitigations for unpatched users
   - Credit to reporter (unless anonymity requested)
9. **Backport** to supported branches if necessary.

## Embargo Period

Default embargo: **90 days** from initial disclosure, or until patch is released, whichever comes first.

We will negotiate the embargo with the reporter for cases that need more time (e.g., coordinating with downstream consumers).

We will publish an advisory **immediately** if:

- The vulnerability is being actively exploited in the wild.
- A patch cannot be developed within 90 days.
- The reporter requests early publication.

## Safe Harbor

We will not pursue legal action against security researchers who:

- Make a good-faith effort to avoid privacy violations and disruption.
- Only interact with accounts they own or have explicit permission to access.
- Stop testing immediately if they encounter user data and report it to us.
- Do not exploit a vulnerability beyond what is necessary to demonstrate it.

## Recognition

Security contributors are credited in:

- `CHANGELOG.md` under the `[Unreleased] / Security` section.
- The published GitHub Security Advisory.
- `CONTRIBUTORS.md` (anonymity respected on request).

## Post-Mortem

After resolving any security incident affecting the repository, we publish a post-mortem with:

- Timeline (with timestamps).
- Root cause.
- Detection and response.
- Lessons learned.
- Concrete improvements.

## Contact

Primary: GitHub Security Advisories (link above)
Backup: GitHub mention `@knarayanareddy` with `[SECURITY]` prefix
