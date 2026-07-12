# Maintainer Runbook

This runbook is for people maintaining AI Arsenal content, schemas, automation, and release workflows.

## Maintainer Responsibilities

Maintainers are responsible for:

- reviewing PRs
- preserving schema quality
- preventing taxonomy sprawl
- keeping generated data healthy
- reviewing stale content
- merging batched automation PRs
- ensuring the project remains useful to humans and machines

## Daily / Per-PR Tasks

For each PR, check:

- Does the content belong in scope?
- Is the entry curated rather than promotional?
- Are tags valid and not overused?
- Does the PR pass CI?
- Does the entry duplicate existing content?
- Are limitations and resources meaningful?

Useful commands:

```bash
pnpm run validate:changed
pnpm run check:duplicates
pnpm run validate:refs
```

## Weekly Tasks

The weekly workflow opens a maintenance PR that may include:

- updated GitHub stars
- updated trending scores
- generated data refresh
- weekly trending draft
- link-check report

Review the PR for:

- suspicious metric changes
- archived repositories
- broken links
- unexpected generated data differences
- bad trending draft content

Then merge if reasonable.

## Monthly Tasks

The monthly workflow opens a PR with:

- monthly digest draft
- stale report
- updated stats

Maintainer checklist:

- Review stale entries in `data/stale-report.json`.
- Update high-impact stale entries first.
- Edit the monthly digest before publishing.
- Confirm generated stats look reasonable.

## Generated Data Policy

Do not push generated data directly to `main` after every merge.

The project uses batched generated-data PRs to avoid:

- noisy git history
- merge conflicts in `data/*.json`
- confusing contributor workflows

See [`automation-policy.md`](./automation-policy.md).

## Schema Changes

Schema changes are high-impact.

Before changing a schema:

1. Open a discussion or RFC.
2. Explain why existing fields are insufficient.
3. Identify affected entries.
4. Provide a migration plan.
5. Update templates.
6. Update validation scripts if needed.
7. Regenerate data.
8. Run `pnpm run ci`.

Breaking schema changes should be rare.

## Taxonomy Changes

Taxonomy changes affect search, filtering, and validation.

Before adding a tag:

- Check if an existing tag already covers the concept.
- Prefer broad, reusable tags over narrow one-off tags.
- Avoid vendor-specific tags unless they are ecosystem anchors.
- Update docs if the tag changes contributor behavior.

Run:

```bash
pnpm run validate:taxonomy
pnpm run generate:all
```

## Running Maintenance Locally

### Full verification

```bash
pnpm run ci
```

### Refresh GitHub metrics

```bash
GITHUB_TOKEN=ghp_xxx pnpm run update:stars
pnpm run update:trending
pnpm run generate:all
```

### Editorial quality gate & baseline

Editorial validation runs in two complementary modes:

- **Changed-file (strict, baseline-free)** — `pnpm run validate:editorial` inspects
  every added/modified content entry vs the merge base and fails on *every*
  finding. This is the gate for a PR's own changes.
- **Full-catalog (baselined)** — `pnpm run validate:editorial:all` inspects all
  supported entries but suppresses pre-existing findings recorded in
  `docs/editorial-baseline.json`. It fails on any **new** finding and on any
  **stale** (resolved) baseline entry, so the baseline can only shrink.

The baseline is a committed, human-reviewed file of finding fingerprints
(`path + rule ID + normalized finding`) — never a file allowlist, never edited by
hand. Maintenance commands (not run in CI):

```bash
pnpm run editorial:baseline         # regenerate from current findings (accepts current debt; review the diff)
pnpm run editorial:baseline:prune   # drop only resolved entries so the baseline shrinks
```

When CI reports stale entries, run the prune command and commit the smaller
baseline. Only regenerate when intentionally accepting new debt — that diff must
be reviewed like any other change.

### Check links

```bash
pnpm run check:links
```

### Check stale entries

```bash
pnpm run check:stale
```

### Create a monthly digest manually

```bash
node scripts/create-monthly-digest.js --period=2026-06
```

### Generate changelog

```bash
pnpm run generate:changelog
```

## Release / Launch Checklist

Before public launch or a major release:

- [ ] `pnpm run ci` passes
- [ ] `pnpm run check:links` passes
- [ ] `data/stats.json` looks reasonable
- [ ] `CONTEXT.md` is current
- [ ] `AGENT.md` is current
- [ ] top-level README is accurate
- [ ] stale report reviewed
- [ ] generated-data refresh PR merged
- [ ] issue templates and PR template reviewed
- [ ] CODEOWNERS are current

## Incident Response

### Broken CI

1. Identify which validator failed.
2. Reproduce locally.
3. Fix content or script.
4. Run `pnpm run ci`.

### Bad generated data

1. Do not patch `data/*.json` directly unless emergency bootstrapping.
2. Fix the source Markdown or generator.
3. Run `pnpm run generate:all`.
4. Review the diff.

### Taxonomy sprawl

1. Pause new tag additions.
2. Consolidate near-duplicates.
3. Update affected entries.
4. Document the decision.

