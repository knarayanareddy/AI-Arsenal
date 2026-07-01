---
id: langfuse
name: Langfuse
artifact_type: platform
category: observability
subcategory: tracing
description: >-
  Open-source LLM observability platform for traces, evals, prompts, metrics,
  and datasets
github_url: 'https://github.com/langfuse/langfuse'
license: MIT core / Enterprise
primary_language: TypeScript
tags:
  - observability
  - tracing
  - evaluation
  - self-hosted
maturity: production
cost_model: freemium
github_stars: 29021
github_stars_last_30d: 0
trending_score: 30
last_commit: '2026-06-13'
docs_url: 'https://langfuse.com/docs'
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
approach: sdk
alternatives:
  - langsmith-platform
  - phoenix
  - helicone
  - opik
integrates_with:
  - langchain
  - langgraph
added_date: '2026-06-13'
last_reviewed: '2026-06-13'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

> **TL;DR:** Langfuse is a self-hostable LLM observability platform for traces, evals, prompts, and datasets. Use it when data ownership and open-source deployment matter.

## Overview

Langfuse covers tracing, prompt management, evaluations, datasets, metrics, and playground workflows for LLM applications. It has both cloud and self-hosted deployment options.

## Why It's in the Arsenal

It is one of the strongest defaults for teams that want an open-source observability layer rather than a purely managed service.

## Key Features

- Tracing for LLM calls and agents
- Prompt management and playground workflows
- Datasets and evaluation support
- OpenTelemetry integrations
- Self-hosted and cloud options
- Broad SDK/provider integrations

## Architecture / How It Works

**Approach:** `sdk`

Langfuse typically instruments application code through SDKs or integrations and records observations, traces, prompts, scores, and metadata in the Langfuse backend.

## Getting Started

```bash
pip install langfuse
```

## Integration Snippet

```python
from langfuse import observe

@observe()
def answer(question: str):
    return "instrumented response"
```

## Use Cases

1. **Scenario**: Self-hosted LLM observability
2. **Scenario**: Prompt/version/eval workflows
3. **Scenario**: Teams wanting one platform for traces and evaluation

## Strengths

- Strong open-source/self-host story
- Combines tracing, prompts, evals, and datasets
- Broad ecosystem integrations

## Limitations / When NOT to Use

- Enterprise features and cloud limits require pricing review
- Self-hosting still needs database/infra operations
- Deep custom eval pipelines require design work

## Integration Patterns

- Use SDK decorators or framework integrations for traces
- Attach user/session/tenant metadata to every trace
- Run eval datasets against production trace samples

## Resources

- [GitHub](https://github.com/langfuse/langfuse)
- [Docs](https://langfuse.com/docs)

## Buzz & Reception

- Included because observability choice shapes debugging, evals, cost control, and production trust for LLM systems.

---
*Last reviewed: 2026-06-13 by @maintainer*

