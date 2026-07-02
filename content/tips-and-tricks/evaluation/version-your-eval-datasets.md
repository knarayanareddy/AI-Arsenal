---
id: "version-your-eval-datasets"
title: "Version Eval Datasets the Same Way You Version Code"
category: "production-gotchas"
tags:
  - evaluation
  - data
difficulty: "beginner"
impact: "high"
time_to_implement: "30 minutes"
phase: evaluation
effort: hours
estimated_time: "~30 minutes"
reversible: true
verification_status: production-verified
verified_by: "practitioner reports (eval-dataset versioning discipline)"
applies_to:
  - eval-pipelines
gotchas:
  - "Without versioning, a score comparison across two points in time can be comparing against two different datasets (cases added, removed, or corrected in between), making the comparison meaningless without anyone noticing"
  - "Correcting a mislabeled eval case in place, without a version bump, silently invalidates prior recorded scores that were measured against the old (wrong) label"
metrics: []
related_tips:
  - add-evals-before-refactors
  - use-golden-questions-for-every-bug-fix
added_date: "2026-06-13"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: reviewed
---

## What & Why

Store eval datasets under version control with an explicit version identifier, and record which dataset version produced any given eval score. Eval datasets change over time (cases added, corrected, or removed), and without versioning, a score comparison across two points in time can silently be comparing against two different underlying datasets.

## Before / After

**Before:** an eval dataset is a single file edited in place, with historical scores recorded with no reference to which version of the dataset produced them.

**After:** the eval dataset is tagged (`eval-set-v1.4.json`), and every recorded score is stored alongside the dataset version used, so comparisons across time are always apples-to-apples.

## Implementation

Store the eval dataset in version control with an explicit version tag or hash, record that identifier alongside every eval run's results, and treat any addition, removal, or correction of a case as a version bump requiring re-running historical comparisons if needed.

## Gotchas

- Without versioning, a score comparison across time can silently compare against two different datasets, and no one notices
- Correcting a mislabeled case in place, without a version bump, silently invalidates prior scores measured against the old label

## When NOT to Apply

- Skip formal versioning for a very small, rarely-changing eval set already fully captured in a single, stable, source-controlled file with no independent update cadence
- Not necessary if eval runs never need to be compared across time (e.g. only ever used for one-off ad hoc checks)

## Verification

Production-verified: versioning eval datasets with the same discipline as code is a standard, widely documented practice in eval pipeline engineering.
