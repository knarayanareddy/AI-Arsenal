---
id: cleanlab
name: cleanlab
version_tracked: null
artifact_type: library
category: data-pipelines
subcategory: libraries
description: Data-centric AI library that finds label errors, outliers, and low-quality examples in any dataset via confident-learning statistics on predictions
github_url: https://github.com/cleanlab/cleanlab
license: AGPL-3.0
primary_language: Python
org_or_maintainer: Cleanlab
tags:
  - data
  - evaluation
  - self-hosted
maturity: production
cost_model: open-source
github_stars: 11580
github_stars_last_30d: 18
trending_score: 41
last_commit: '2026-01-13'
docs_url: https://docs.cleanlab.ai
demo_url: null
paper_url: https://arxiv.org/abs/1911.00068
paper_id: null
phase: data-and-retrieval
domain:
  - general-purpose
relation_to_stack:
  - build-on-top
health_signals:
  - research-origin
  - production-proven
ecosystem_role:
  - The standard open implementation of confident learning — it cross-examines a model's out-of-sample predicted probabilities against given labels to statistically flag mislabeled, ambiguous, and outlier examples, model-agnostically
best_for:
  - You suspect label noise in a training or eval set and want a principled, model-agnostic ranking of which examples to re-review — rather than eyeballing or ad-hoc heuristics
  - You want dataset-level quality audits (near-duplicates, outliers, class overlap) as a routine step before fine-tuning or building eval sets
avoid_if:
  - Your data has no labels or your task isn't classification-like — confident learning needs predicted probabilities against given labels to work with
  - AGPL-3.0 is incompatible with your distribution model — check licensing before embedding it in shipped products
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: 11.6k stars, AGPL-3.0, last push 2026-01-13 verified via the GitHub API on 2026-07-08. Cadence has slowed as the company focuses on its commercial platform; the library remains the reference confident-learning implementation. Backed by the peer-reviewed confident-learning paper (Northcutt et al.).
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: arxiv
    url: https://arxiv.org/abs/1911.00068
    date: '2026-07-08'
    description: 'Confident Learning: Estimating Uncertainty in Dataset Labels'
featured: false
status: active
---

## Overview

cleanlab is a data-centric AI library that audits datasets rather than models: given any classifier's out-of-sample predicted probabilities, it applies confident learning to estimate which labels are likely wrong, which examples are outliers or near-duplicates, and which classes overlap — producing a ranked list of data issues to fix before you train or evaluate on that data.

## Why it's in the Arsenal

Label noise silently corrupts both fine-tuning data and eval sets, and the usual response is ad-hoc spot-checking. cleanlab is the principled alternative: confident learning is a published, model-agnostic statistical method, and this library is its reference implementation. It fills the dataset-quality-audit slot in the data-and-retrieval phase — upstream of training and eval-set construction, complementary to pipeline-level validation like `great-expectations`.

## Architecture

Confident learning estimates the joint distribution between given labels and true labels from out-of-sample predicted probabilities, using per-class probability thresholds to identify confidently mislabeled examples. Because it consumes only predictions and labels, it works with any model (sklearn, PyTorch, LLM-as-classifier). The Datalab interface layers additional issue detectors — outliers, near-duplicates, non-IID drift — over the same audit pass.

## Ecosystem Position

Upstream: any trained classifier's cross-validated predictions. Downstream: cleaned training sets and trustworthy eval sets. Complementary: `great-expectations` validates pipeline data against declared expectations (schema/statistics), while cleanlab finds label-level issues expectations can't express; the hosted Cleanlab platform is the commercial extension.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical Datalab audit workflow.
```

## Key Use Cases

1. **Scenario**: auditing a fine-tuning or eval dataset for mislabeled examples before trusting metrics computed on it
2. **Scenario**: routine dataset health checks — outliers, near-duplicates, class overlap — as part of data pipeline hygiene

## Strengths

- Peer-reviewed statistical method, not heuristics — and model-agnostic by construction
- Audits eval sets too, which directly protects the integrity of downstream benchmark numbers

## Limitations

- Needs classification-like tasks with labels and predicted probabilities; not a general text-quality scorer
- AGPL-3.0 license requires care when embedding in distributed products; open-source cadence has slowed

## Relation to the Arsenal

This is a data-and-retrieval entry: dataset quality tooling upstream of training and evaluation. For pipeline-level data validation see `great-expectations`; for eval harnesses that consume clean sets see the benchmark-and-eval phase.

## Resources

- [GitHub](https://github.com/cleanlab/cleanlab)
- [Documentation](https://docs.cleanlab.ai)
- [Confident Learning paper](https://arxiv.org/abs/1911.00068)
