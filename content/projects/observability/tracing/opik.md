---
id: opik
name: Opik
type: platform
category: observability
subcategory: tracing
description: >-
  Open-source Comet platform for LLM tracing, evaluation, prompt optimization,
  and dashboards
github_url: 'https://github.com/comet-ml/opik'
license: Apache-2.0
primary_language: Python
tags:
  - observability
  - tracing
  - evaluation
  - monitoring
maturity: production
cost_model: open-source
github_stars: 19609
github_stars_last_30d: 0
trending_score: 30
last_commit: '2026-06-13'
docs_url: 'https://www.comet.com/docs/opik/'
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
approach: platform
alternatives:
  - langfuse
  - langsmith-platform
  - phoenix
  - helicone
integrates_with: []
added_date: '2026-06-13'
last_reviewed: '2026-06-13'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

> **TL;DR:** Opik is Comet’s open-source platform for LLM tracing, evaluation, prompt optimization, and dashboards. Use it when evals and prompt iteration are central.

## Overview

Opik covers tracing, automated evaluations, prompt/version workflows, and monitoring for LLM apps, RAG systems, and agents.

## Why It's in the Arsenal

It is a strong eval-oriented open-source option from an established ML experiment-tracking vendor.

## Key Features

- LLM tracing
- Automated evaluation workflows
- Prompt management and optimization
- Production dashboards
- Self-hostable open-source platform

## Architecture / How It Works

**Approach:** `platform`

Opik collects traces and evaluation records through SDKs/integrations and connects them to prompts, datasets, and dashboards.

## Getting Started

```bash
pip install opik
```

## Integration Snippet

```python
import opik

opik.configure(api_key="OPIK_API_KEY")
# instrument calls per Opik docs
```

## Use Cases

1. **Scenario**: Eval-first LLM development
2. **Scenario**: Prompt iteration and regression testing
3. **Scenario**: Teams already familiar with Comet-style workflows

## Strengths

- Evaluation and prompt workflows are central
- Apache-2.0 open source
- Good bridge to ML experimentation practices

## Limitations / When NOT to Use

- Requires adopting Opik SDK/integration patterns
- Less generic infra monitoring than APM tools
- Operational maturity depends on deployment mode

## Integration Patterns

- Create datasets from failing traces
- Run evals before prompt/model changes ship
- Track prompt versions with scores

## Resources

- [GitHub](https://github.com/comet-ml/opik)
- [Docs](https://www.comet.com/docs/opik/)

## Buzz & Reception

- Included because observability choice shapes debugging, evals, cost control, and production trust for LLM systems.

---
*Last reviewed: 2026-06-13 by @maintainer*

