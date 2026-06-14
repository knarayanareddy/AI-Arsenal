---
id: "dvc"
name: "DVC"
type: "tool"
job:
  - "model-registry"
description: "Open-source data and model versioning tool for ML projects and pipelines"
url: "https://github.com/iterative/dvc"
cost_model: "open-source"
pricing_detail: "Open source or free to start"
tags:
  - data
  - monitoring
maturity: "production"
stack:
  - python
free_tier: true
free_tier_limits: "Free/open-source use or free tier; verify current limits before production"
self_hostable: true
open_source: true
source_url: "https://github.com/iterative/dvc"
docs_url: "https://github.com/iterative/dvc"
github_url: "https://github.com/iterative/dvc"
alternatives: []
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-13"
added_by: "maintainer"
reviewed_by: "maintainer"
verdict: "recommended"
verdict_rationale: "Useful option when it matches your stack, cost, and operational constraints"
status: "active"
---

> **TL;DR:** Open-source data and model versioning tool for ML projects and pipelines. Open source or free to start. Best for data/model versioning in Git workflows.

## Overview

DVC is included as a tool for model-registry workflows in AI engineering systems.

## Why It's in the Arsenal

It solves a recurring job in the AI engineering lifecycle and is useful to compare by cost, stack, open-source status, and operational model.

## Key Features

- Data versioning
- Pipeline stages
- Remote storage integration

## Architecture / How It Works

DVC versions datasets, models, and pipelines alongside Git metadata.

## Getting Started

```bash
pip install dvc
```

## Use Cases

1. **Scenario**: Versioning eval datasets
2. **Scenario**: Tracking model artifacts
3. **Scenario**: Reproducible ML pipelines

## Strengths

- Git-friendly model/data versioning
- Open source
- Works with object storage

## Limitations / When NOT to Use

- Not LLM-specific
- Requires team discipline
- Registry UI depends on ecosystem choices

## Integration Patterns

- Link this tool from job guides using its canonical ID `dvc`.
- Record pricing, hosting, and data-retention assumptions before production adoption.
- Pair with tracing and evaluation for production LLM workflows.

## Resources

- [Primary site](https://github.com/iterative/dvc)
- [Documentation](https://github.com/iterative/dvc)
- [Source](https://github.com/iterative/dvc)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for model-registry.

---
*Last reviewed: 2026-06-13 by @maintainer*

