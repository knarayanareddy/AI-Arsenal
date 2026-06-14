# Continuity Plan

This document describes how AI Arsenal can survive the unavailability or departure of its lead maintainer.

## Current Bus Factor

**Bus factor: 1.** The lead maintainer (`@knarayanareddy`) is the sole person with merge authority and CODEOWNERS coverage.

This is a single point of failure. We mitigate it through the following mechanisms:

## Goals

1. The repository remains operational if the lead maintainer is unavailable for 30+ days.
2. The data layer (`data-release` branch + `data/*.json` artifacts) continues to be publishable by automation without maintainer intervention.
3. Documentation is sufficient for a new contributor to take over without prior context.

## Mechanisms Already in Place

- **Automation-first workflows** — `data-refresh.yml`, `weekly.yml`, `monthly.yml` run on cron schedules. If the lead maintainer is unavailable, data refresh continues.
- **CODEOWNERS in `main`** — branch protection + CODEOWNERS ensure no privileged-path change ships without review.
- **Generated artifacts** — `data/*.json` is committed to `main` and republished to the `data-release` branch.
- **External consumers** — `docs/data-release.md` documents URLs for self-service fetching; no maintainer mediation required.

## Mechanisms to Add

These are tracked as ongoing work:

1. **Co-maintainer onboarding** — see "Adding Co-Maintainers" below.
2. **Fork-based continuity** — any co-maintainer can fork the repo, set up automation, and continue publishing the `data-release` branch.
3. **GitHub organization transfer** — the lead maintainer will document the transfer process in this file if/when needed.

## Adding Co-Maintainers

### Eligibility Criteria

A contributor becomes eligible for co-maintainer status after:

1. 10+ merged PRs.
2. Sustained activity (PRs in at least 3 of the last 6 months).
3. Demonstrated understanding of the schema/taxonomy/automation layers (e.g., reviewed 5+ schema or workflow PRs).
4. Two-factor authentication enabled.
5. A verified backup email on GitHub.

### Process

1. Lead maintainer opens a PR adding the new handle to `.github/CODEOWNERS`.
2. PR requires approval from any existing co-maintainer (if none, from the lead maintainer themselves — this is one of the few "self-merge" cases).
3. The new maintainer is added to GitHub as a repo admin.
4. Branch protection in GitHub Settings is updated to grant them bypass privileges for emergency hotfixes.

### Removal

A co-maintainer can be removed:

- By their own request.
- For inactivity (>6 months without PRs or reviews).
- For violation of the Code of Conduct (per `CODE_OF_CONDUCT.md`).

Removal is performed via PR to `CODEOWNERS` and to GitHub Settings.

## Fork-Based Continuity

If the lead maintainer becomes permanently unavailable and no co-maintainer exists, the community can:

1. Fork the repository (this is allowed by the MIT license).
2. Continue publishing `data-release` from the fork.
3. Use the existing automation scripts (which work without modification).
4. Notify downstream consumers of the fork URL via a public announcement.

The lead maintainer's commitment to this:

- ✅ Will keep the repo publicly forkable.
- ✅ Will keep the license (MIT + CC-BY-4.0) clearly visible.
- ✅ Will document transfer procedures here.
- ❌ Will not gatekeep automation — anyone can run the scripts.

## What This Document Is Not

This document does not specify:

- How to handle disputes between co-maintainers (see `GOVERNANCE.md`).
- How to handle violations of the Code of Conduct (see `CODE_OF_CONDUCT.md`).
- How to report security issues (see `SECURITY.md` and `docs/policies/security-disclosure.md`).
