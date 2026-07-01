---
id: langsmith-platform
name: LangSmith
artifact_type: service
category: observability
subcategory: tracing
description: >-
  Managed LangChain platform for tracing, evaluation, prompt workflows, and
  deployment feedback
github_url: 'https://smith.langchain.com'
license: Proprietary
primary_language: Other
tags:
  - observability
  - tracing
  - evaluation
  - langchain
maturity: production
cost_model: freemium
github_stars: 0
github_stars_last_30d: 0
trending_score: 15
last_commit: '2026-06-13'
docs_url: 'https://docs.smith.langchain.com/'
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

> **TL;DR:** LangSmith is LangChain’s managed platform for tracing, evaluation, prompt workflows, and debugging. Use it when your stack already uses LangChain or LangGraph.

## Overview

LangSmith is a managed service by the LangChain team. It is tightly integrated with LangChain/LangGraph and focuses on traces, datasets, evals, and application debugging.

## Why It's in the Arsenal

For LangChain/LangGraph teams, LangSmith is often the fastest path to high-fidelity traces and eval workflows.

## Key Features

- Native LangChain/LangGraph tracing
- Datasets and evaluation workflows
- Prompt playground and debugging UI
- Managed hosted service
- Annotation and feedback workflows

## Architecture / How It Works

**Approach:** `platform`

LangSmith collects traces through LangChain/LangGraph callbacks and SDK instrumentation, then links runs to datasets, evaluations, and feedback in its hosted platform.

## Getting Started

```bash
pip install langsmith langchain
```

## Integration Snippet

```python
import os
os.environ["LANGSMITH_TRACING"] = "true"
os.environ["LANGSMITH_API_KEY"] = "lsv2_..."
```

## Use Cases

1. **Scenario**: LangGraph/LangChain production debugging
2. **Scenario**: Managed eval and dataset workflows
3. **Scenario**: Teams that prefer hosted observability over self-hosting

## Strengths

- Best native experience for LangChain ecosystem
- Low setup friction for supported stacks
- Strong trace-to-eval workflow

## Limitations / When NOT to Use

- Not fully open source/self-hosted
- Deepest value is tied to LangChain/LangGraph
- Pricing and retention should be checked for production use

## Integration Patterns

- Enable tracing in dev and staging before production
- Link regression datasets to prompts and chain versions
- Use feedback to create eval examples

## Resources

- [Product](https://smith.langchain.com)
- [Docs](https://docs.smith.langchain.com/)

## Buzz & Reception

- Included because observability choice shapes debugging, evals, cost control, and production trust for LLM systems.

---
*Last reviewed: 2026-06-13 by @maintainer*

