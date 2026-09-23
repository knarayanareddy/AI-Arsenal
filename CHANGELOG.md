# Changelog

All notable changes to AI Arsenal will be documented here.

This file follows Keep a Changelog conventions and is intended to be maintained by automation after repository bootstrap.

## [Unreleased]

This section is a placeholder. The authoritative history is the commit log and
the pull-request list; `node scripts/generate-changelog.js` rebuilds this file
in Keep-a-Changelog format from Conventional Commit messages, and the `Release`
workflow runs it when a version tag is cut. It has not been run yet, so no
released version is recorded here.

### Added

- Schema-first content model: 13 JSON Schemas, `TAXONOMY.md` controlled
  vocabulary, contributor templates, and `scripts/scaffold.js`.
- Validation pipeline: schema, taxonomy, structure, path, reference,
  internal-link, duplicate-ID, editorial-quality, and data-contract checks.
- Generated data layer (`data/*.json`), search index, registries, `CONTEXT.md`,
  and the `data-release` branch publication.
- Automation: PR validation, post-merge verification, daily data release,
  weekly metrics/links/trending, monthly digest/stale report, CodeQL, Scorecard.
- Editorial debt baseline (`docs/editorial-baseline.json`) with a ratchet that
  fails on new findings and on already-resolved baseline entries.

