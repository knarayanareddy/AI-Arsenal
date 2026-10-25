# Quarantine — 2026-10-24

Two removals from the catalog, kept here rather than deleted so the decision is
reviewable and reversible. See `manifest.json` for the machine-readable record.

## `content/projects/frameworks/uiverse-design.md`

A general-purpose CSS/Tailwind component library with no AI functionality,
admitted by a newsletter-driven population sweep. The entry's own
`enrichment_notes` asked for a keep/recategorize/remove review — this is the
remove. It also carried a fabricated `last_commit` (2026-06-13, the date of the
bulk import) while the repository's last push was 2024-09-02.

## `scripts/populate-from-toolradar.js`

The generator behind that batch. It hardcoded `last_commit` to its own run date
and estimated `github_stars` from a list, then emitted template prose for every
section. Both practices are incompatible with the catalog's contract:

- `last_commit` drives freshness buckets; a guessed value makes a stale entry
  look current and hides it from `check:stale` and the triage report.
- `github_stars` is presented as a measured field.
- The body generator produced sentences that the editorial gate now rejects
  (see `GENERATED_PROSE_PATTERNS` in `scripts/validate-editorial-quality.js`).

Re-running it would inject all three problems at once, so it is retired here
instead of left in `scripts/`. Entries that came from it remain in the catalog
and are being re-authored individually; the debt is tracked in
`docs/generated-prose-audit.md`.
