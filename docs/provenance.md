# Provenance & Editorial Confidence

This document explains where AI Arsenal's content comes from and what the
`enrichment_status` field on each entry means. It exists so consumers
(humans, LLMs, and agents) can weigh how much to trust a given entry.

## How the catalog was seeded

The catalog was bootstrapped from a mix of:

- **Curated, hand-authored entries** for foundational projects, tools,
  papers, architectures, tips, and build examples.
- **Machine-assisted ingestion** of third-party tooling directories,
  primarily the ToolRadar "Featured in Techpresso" dataset, via
  `scripts/populate-from-toolradar.js` (see
  [`meta/sources/toolradar-techpresso.md`](../meta/sources/toolradar-techpresso.md)).
  That script did **not** copy descriptions verbatim; it used the source as
  research material to identify candidates, confirm activity, and add
  `buzz_sources` citations. Open-source projects were only added after
  web-search verification of their canonical GitHub repository, and no
  fabricated GitHub URLs were introduced.

After ingestion, every vertical was migrated and enriched in batches (see
the `*-migration-completion-report.md` files in `docs/reports/` and the
`check-*-migration-progress.js` scripts), bringing each entry up to the
current schema and controlled vocabulary.

## What `enrichment_status` means

Every content entry carries an `enrichment_status` field that tracks
editorial confidence in the entry's research depth. This is distinct from
`maturity` / `verdict` / `status`, which describe the entry's *subject*,
not the catalog entry's research depth:

- **`draft`** — written from the project/tool's own docs or marketing copy
  only; no third-party production-usage evidence, paper citation, or
  dependency-graph verification reviewed yet. Entries migrated or imported
  from a source dataset should default to `draft` and carry an
  `enrichment_notes` line stating they were imported and need human review.
- **`reviewed`** — a maintainer has read the official docs/paper and at
  least one third-party source (blog post, case study, issue thread, or
  dependent-repo evidence).
- **`verified`** — hands-on production usage, or a maintainer-confirmed
  architecture/ecosystem claim backed by a primary source, confirms the
  entry's claims.

(Controlled vocabulary is defined in [`TAXONOMY.md`](../TAXONOMY.md).)

## Trust guidance for consumers

- Prefer `verified` and `reviewed` entries when making production
  decisions.
- Treat `draft` entries as starting points that need human confirmation
  before you rely on the specifics. This includes the `supabase` and
  `browserbase` stub entries, which were added only to resolve dangling
  cross-references and are explicitly marked `draft`.
- The `enrichment_notes` field (when present) explains exactly what was
  and was not checked for that entry.
