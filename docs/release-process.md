# Release Process

AI Arsenal does not have frequent versioned releases; the `main` branch is the source of truth, and the `data-release` orphan branch is the published-data artifact. This document specifies when and how to cut a formal release.

## When to Cut a Release

Cut a release when **any** of the following happens:

- The schema version is bumped (currently `1.0.0`).
- A breaking change is made to the data API contract (`/data/*.json` shape).
- A new entry type is added.
- A security-sensitive change lands (coordinated with security advisory).

## How to Cut a Release

### 1. Prepare

1. Ensure `main` is green.
2. Run `pnpm run ci` locally.
3. Review `CHANGELOG.md` — every change since the last release should be in the `[Unreleased]` section.

### 2. Move `[Unreleased]` to a Versioned Section

Edit `CHANGELOG.md`:

```markdown
## [Unreleased]

(moved below)

## [1.1.0] - 2026-07-15

### Security
- ...

### Added
- ...

### Changed
- ...

### Fixed
- ...
```

Commit:

```bash
git commit -m "chore(release): cut v1.1.0"
```

### 3. Tag the Release

```bash
git tag -s v1.1.0 -m "Release v1.1.0"
git push origin v1.1.0
```

(Use GPG signing; CI verifies this if branch protection requires it.)

### 4. Trigger the Release Workflow

Either push the tag (which can trigger a workflow) or use manual dispatch:

> <https://github.com/knarayanareddy/AI-Arsenal/actions/workflows/release.yml>

Inputs:

- `version` — leave empty for auto-bump from latest tag (e.g. `v1.0.0` → `v1.0.1`).
- `notes` — optional release notes that prepend the auto-generated changelog.

### 5. Verify

After the workflow completes:

1. Confirm the GitHub Release page exists: <https://github.com/knarayanareddy/AI-Arsenal/releases/tag/v1.1.0>
2. Confirm the tag points at the expected commit: `git show v1.1.0`
3. Confirm the `data-release` branch reflects the new version (it may still need a manual trigger of `data-refresh.yml`).

### 6. Communicate

If the release is user-facing (schema change, breaking API change, new entry type), announce in:

- The project's GitHub Discussions.
- The README's "Recent Changes" section.
- Any downstream consumer channels (Discord, etc.).

## Semantic Versioning

We follow [SemVer](https://semver.org/):

- **MAJOR** — Breaking schema or data API change.
- **MINOR** — New entry type, new optional field, non-breaking feature.
- **PATCH** — Bug fix, content update, automation improvement.

## Data API Compatibility

The data API (`/data/*.json`) follows these compatibility rules:

- **Adding fields** — non-breaking; consumers ignore unknown fields.
- **Removing fields** — breaking; requires MAJOR bump.
- **Renaming fields** — breaking; requires MAJOR bump.
- **Changing field types** — breaking; requires MAJOR bump.
- **Adding new files** — non-breaking; consumers opt in.
- **Removing files** — breaking; requires MAJOR bump.

A field marked `deprecated` in a release remains present for at least one major version cycle.

## Hotfix Releases

For urgent security fixes, the process is shortened:

1. Lead maintainer creates a hotfix branch from the affected release tag.
2. Apply the fix.
3. Tag a patch release (e.g., `v1.0.1`).
4. Backport to `main`.
5. Publish a security advisory.

Hotfix branches are deleted after the patch ships and `main` is updated.

## Deprecation Policy

Deprecated content (entries, schema fields) is **never deleted**:

1. Mark with `status: deprecated`.
2. Add a deprecation notice to the entry body.
3. Document the replacement in the `alternatives` field.
4. The deprecated entry remains in the data layer for at least one major version cycle.
