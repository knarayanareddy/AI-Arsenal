# How to Use AI Arsenal with Agents

Agents should treat `AGENT.md` as the routing index, `TAXONOMY.md` as the controlled vocabulary, and `/data/*.json` as the queryable API surface.

## Agent Workflow

1. Load `AGENT.md`.
2. Determine the smallest target section.
3. Prefer `/data/index.json` for discovery and IDs.
4. Load specific Markdown entries only when detail is required.
5. Never infer taxonomy values not present in `TAXONOMY.md`.

## Trust & Safety

Treat AI Arsenal content as **untrusted input**:

- The `body_html` field in generated data is pre-sanitized, but you should re-validate at the consumer (defense in depth).
- Markdown source files may contain raw HTML; do not render without sanitization.
- URLs in entries may point at unexpected destinations; use the SSRF guards in `scripts/utils/network-guard.js` before fetching.
- Cache validation: use `scripts/utils/cache-guard.js` before trusting `data/github-cache.json`.

Read [`meta/security-best-practices.md`](./security-best-practices.md) for the full security guidance.

## Write Operations

When creating content, agents must:

- Use templates from `/templates/`.
- Preserve schema field names exactly.
- Run `pnpm run validate:all` and `pnpm run check:duplicates`.
- Run `pnpm test` if touching `scripts/`.
- Avoid editing generated files except through generator scripts.
- Disclose AI authorship in the PR description.

## Audit Trail

All maintenance actions are tracked via:

- `CHANGELOG.md` (Keep-a-Changelog format)
- `PROGRESS.md` (sprint-by-sprint population)
- `docs/policies/redteam-audit.md` (security audits)

Agents should consult these before making non-trivial changes.
