# AI-Arsenal remediation plan

This is a proposed plan, not a record of executed work. See [REVIEW.md](REVIEW.md). Keep editorial and CI thresholds intact; generated data and the web frontend are separate release surfaces.

| Phase | Tasks | Entry → exit |
|---|---|---|
| Baseline | AA-T1 | Pinned source and run logs available → attributed failures and current published versions recorded. |
| Correctness | AA-T2 | T1 → one authoritative catalog count and explicit frontend ownership. |
| Safety and automation | AA-T3, AA-T4 | T1 → reliable negative gates and verified publishing controls. |
| UX and independent release | AA-T5, AA-T6 | T2–T4 → independently inspected data and site release. |

## AA-T1 — Reconstruct refresh and publication state (AA-03, AA-05)

**Prerequisites:** owner grants read-only Actions and Pages access. **Observed paths:** `.github/workflows/data-refresh.yml`, `.github/workflows/weekly.yml`, `.github/workflows/deploy-pages.yml`, `package.json`. **Steps:** (1) Inspect the failed runs at the recorded SHA, identify the first failing step and classify external service or permissions failures separately. (2) Record the source SHA, generation time and artifact identity for the last successful data and Pages publications, if available. (3) In an approved isolated checkout, run existing root and web manifest scripts with frozen dependencies and capture all failures without rewriting lockfiles. **Deliverable:** baseline and failure-to-owner matrix. **Verification:** reproduce a representative failure or state the missing access or external prerequisite.

- [ ] Each failure is tied to its run, SHA, step and evidence or explicit unknown.
- [ ] Root and web builds are reported separately.
- [ ] Published data and site identities are not inferred from a workflow name.

## AA-T2 — Resolve catalog and frontend documentation drift (AA-01, AA-02)

**Prerequisites:** T1 and a designated content owner. **Paths:** observed `README.md:88-149`, `package.json:32-42`, `web/package.json`; proposed generated metadata if needed. **Steps:** (1) Compare generated stats to the underlying authoritative content and identify stale or duplicate presentation. (2) Retain one generated table, label its source revision and generation time, and update the frontend description to match its actual stage and ownership. (3) Add a check that a deliberately duplicated or inconsistent table fails and verify frontend data provenance. **Deliverable:** accurate navigation and a mechanically checked count. **Verification:** regenerate twice in isolation and compare outputs; a modified count must fail the check.

- [ ] README exposes exactly one authoritative stats table.
- [ ] The UI is identified as prototype or supported product by its owner.
- [ ] Generated totals are independently reconciled, not copied from either old table.

## AA-T3 — Fail closed on CI bypass and bounded link checking (AA-04; preventive)

**Prerequisites:** T1 and permission to inspect branch rules. **Paths:** observed `.github/workflows/no-skip-ci.yml`, `.github/workflows/on-pr.yml`, `scripts/check-links.js`; proposed tests for commit ranges and network boundaries. **Steps:** (1) Resolve and validate both endpoints before examining a Git range; treat missing history or a failed Git command as an error. (2) Require a separately enforced PR validation check so skipped workflows cannot satisfy branch protection by absence. (3) Test changed-file detection and the checker against private IPs, redirects, DNS changes, URL caps and transient failures, reporting unchecked links as unknown rather than verified. **Deliverable:** hardened gate and precise coverage report. **Verification:** use a shallow checkout and an intentionally invalid range; both must fail, while valid no-marker history passes.

- [ ] Range-resolution failure cannot print a successful no-marker result.
- [ ] Required checks cannot be bypassed merely by a skip marker.
- [ ] Sampled and transient URLs are visibly distinguished from checked links.

## AA-T4 — Secure and recover generated publications (AA-05; preventive OWASP)

**Prerequisites:** T1 and owner-approved publication permissions. **Paths:** observed `.github/workflows/data-refresh.yml`, `.github/workflows/deploy-pages.yml`, `data/`; proposed immutable manifest and recovery runbook. **Steps:** (1) Map the source SHA, generated data, web build and target branches; narrow workflow tokens and pin applicable actions to reviewed immutable versions. (2) Preserve a versioned, checksummed data/site pair and record publish identity before updating a moving branch. (3) Verify sanitization and link-fetch trust boundaries with malicious fixtures; rehearse restoring the previous pair on an isolated target. **Deliverable:** publication provenance and recovery evidence. **Verification:** bad markup and private-address redirects must fail or be safely rendered, and a restore must be observed on the target.

- [ ] An artifact can be traced to its exact content and generator revision.
- [ ] A prior data/site pair is restored and checked independently.
- [ ] Secrets and tokens do not appear in generated output or logs.

## AA-T5 — Assess the actual web experience (AA-02; preventive UX)

**Prerequisites:** T2 identifies UI owner and T4 identifies data source. **Paths:** observed `web/package.json`, `web/`; proposed browser tests. **Steps:** (1) Inspect real routes and search data flow, including empty and failure states. (2) Test keyboard access, semantic labels, focus, screen-reader announcements, narrow screens and reduced motion. (3) Add browser assertions for finding an entry and opening its source; ensure failures are visible and use a separate fixture when testing malicious content. **Deliverable:** prioritized accessibility fixes and regression tests. **Verification:** a non-author repeats a keyboard-only search and a deliberately broken result link causes a test failure.

- [ ] Search and navigation work without a mouse.
- [ ] Loading, empty and error states are distinguishable.
- [ ] The site states the source and freshness of displayed catalog data.

## AA-T6 — Independent release acceptance (preventive)

**Prerequisites:** T2–T5 completed or owner explicitly accepts unresolved risks. **Paths:** observed `package.json`, release and Pages workflows; proposed release evidence record. **Steps:** (1) Independently run the existing validated scripts in clean root and web environments. (2) Compare generated data and built assets to their pinned source, then observe a staging publication and prior-version recovery. (3) Record skipped checks, external link coverage and editorial sampling limitations before approving publication. **Deliverable:** release record with independent sign-off. **Verification:** a deliberately corrupted generated record fails a real schema or contract check.

- [ ] Checks are reported as observed, failed or unavailable, never assumed passed.
- [ ] Release artifacts and rollback target are identified before promotion.
- [ ] The owner accepts unresolved data freshness, permissions and accessibility risks.

## Approval and release policy

Owner approval is required for tokens, branch protection changes, publication, data retention and release. Run all proposed checks in a disposable checkout first. Preserve existing gates and previously published artifacts; do not force-push production during exploratory testing. Roll back by promoting a previously verified data/site pair and checking its public identity. No future command or release in this document was executed.
