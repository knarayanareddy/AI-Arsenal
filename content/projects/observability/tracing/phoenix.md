---
id: phoenix
name: Phoenix
artifact_type: platform
category: observability
subcategory: tracing
description: >-
  Arize Phoenix open-source observability and evaluation platform for LLM, RAG,
  and agent systems
github_url: 'https://github.com/Arize-ai/phoenix'
license: Elastic-2.0
primary_language: Python
tags:
  - observability
  - tracing
  - evaluation
  - monitoring
maturity: production
cost_model: open-source
github_stars: 10124
github_stars_last_30d: 0
trending_score: 30
last_commit: '2026-06-13'
docs_url: 'https://arize.com/docs/phoenix'
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
approach: otel-native
alternatives:
  - langfuse
  - langsmith-platform
  - helicone
  - opik
integrates_with: []
added_date: '2026-06-13'
last_reviewed: '2026-06-13'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

> **TL;DR:** Phoenix is an open-source observability and evaluation platform for LLM, RAG, and agent systems. Use it when OpenTelemetry and RAG debugging are priorities.

## Overview

Phoenix focuses on traces, evaluations, experimentation, and RAG/agent debugging with open-source local/self-host options and Arize ecosystem integration.

## Why It's in the Arsenal

It is a strong choice for ML/AI engineers who want standards-oriented tracing and RAG evaluation workflows.

## Key Features

- OpenTelemetry-oriented tracing
- RAG and agent evaluation workflows
- Notebook/local debugging story
- Self-hostable Phoenix app
- Integration with Arize ecosystem

## Architecture / How It Works

**Approach:** `otel-native`

Phoenix ingests traces and spans, often through OpenTelemetry instrumentation, then supports analysis, evals, and debugging workflows.

## Getting Started

```bash
pip install arize-phoenix openinference-instrumentation-openai
```

## Integration Snippet

```python
import phoenix as px

session = px.launch_app()
print(session.url)
```

## Use Cases

1. **Scenario**: RAG debugging and evals
2. **Scenario**: OpenTelemetry-first AI observability
3. **Scenario**: Notebook-to-production investigation workflows

## Strengths

- Strong RAG/ML observability orientation
- Open-source local workflow
- Standards-friendly instrumentation

## Limitations / When NOT to Use

- License is not MIT/Apache
- Product surface differs from prompt-management-first tools
- Teams need to design eval datasets separately

## Integration Patterns

- Instrument model calls and retrievers with OpenInference/OpenTelemetry
- Inspect retrieved documents and generation spans together
- Use Phoenix evals to compare RAG changes

## Resources

- [GitHub](https://github.com/Arize-ai/phoenix)
- [Docs](https://arize.com/docs/phoenix)

## Buzz & Reception

- Included because observability choice shapes debugging, evals, cost control, and production trust for LLM systems.

---
*Last reviewed: 2026-06-13 by @maintainer*

