---
id: dvc
name: DVC
type: tool
job: [model-registry]
description: Open-source data and model versioning tool for ML projects and pipelines
url: "https://github.com/iterative/dvc"
cost_model: open-source
pricing_detail: Open source or free to start
tags: [data, monitoring]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/iterative/dvc"
docs_url: "https://github.com/iterative/dvc"
github_url: "https://github.com/iterative/dvc"
alternatives: [hugging-face-hub, mlflow, weights-biases]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [production, research]
best_when:
  - You want Git-like versioning for datasets and model artifacts without paying for large binary storage in Git itself
  - You need reproducible ML pipelines tied to your existing Git workflow
avoid_when:
  - You need a full model registry with stage promotion (staging/production) and serving integration (use MLflow or Hugging Face Hub for that)
  - Your team wants a managed UI-first experience rather than a CLI/Git-centric workflow
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
---

> **TL;DR:** Open-source data and model versioning tool for ML projects and pipelines. Open source or free to start. Best for data/model versioning in Git workflows.

## Overview

An open-source tool that brings Git-like version control to datasets and model artifacts, keeping large binary files out of Git itself while preserving full lineage and reproducibility.

## Why It's in the Arsenal

DVC earns a place in the Arsenal because it directly addresses a recurring decision point: you want Git-like versioning for datasets and model artifacts without paying for large binary storage in Git itself. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Git-compatible versioning for large data/model files
- Reproducible, declarative ML pipelines
- Works with many remote storage backends (S3, GCS, etc.)

## Architecture / How It Works

Large files are stored in configured remote storage and referenced from Git via small pointer files; DVC pipelines declare stages with explicit inputs/outputs to make runs reproducible and cacheable.

## Getting Started

```bash
pip install dvc
```

## Use Cases

1. **Scenario**: you want Git-like versioning for datasets and model artifacts without paying for large binary storage in Git itself
2. **Scenario**: you need reproducible ML pipelines tied to your existing Git workflow
3. **Scenario where this is NOT the right fit**: you need a full model registry with stage promotion (staging/production) and serving integration (use MLflow or Hugging Face Hub for that) — evaluate an alternative instead

## Strengths

- You want Git-like versioning for datasets and model artifacts without paying for large binary storage in Git itself
- You need reproducible ML pipelines tied to your existing Git workflow

## Limitations / When NOT to Use

- You need a full model registry with stage promotion (staging/production) and serving integration (use MLflow or Hugging Face Hub for that)
- Your team wants a managed UI-first experience rather than a CLI/Git-centric workflow

## Integration Patterns

- Compare against [Hugging Face Hub](./hugging-face-hub.md), [MLflow](./mlflow.md), [Weights & Biases](./weights-biases.md) before adopting — they solve the same job in this phase.
- Link this tool from job guides using its canonical ID `dvc`.
- Record pricing, hosting, and data-retention assumptions before production adoption.


## Resources

- [Primary site](https://github.com/iterative/dvc)
- [Documentation](https://github.com/iterative/dvc)
- [Source](https://github.com/iterative/dvc)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for model-registry.

---
*Last reviewed: 2026-06-30 by @maintainer*

