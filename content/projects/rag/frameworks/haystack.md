---
id: haystack
name: Haystack
artifact_type: framework
category: rag
subcategory: frameworks
description: >-
  Modular framework for production search, RAG, agents, routing, and generation
  pipelines
github_url: 'https://github.com/deepset-ai/haystack'
license: Apache-2.0
primary_language: Other
tags:
  - rag
  - retrieval
  - orchestration
  - agents
maturity: production
cost_model: open-source
github_stars: 25559
github_stars_last_30d: 0
trending_score: 30
last_commit: '2026-06-12'
docs_url: 'https://docs.haystack.deepset.ai/'
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
alternatives: []
integrates_with: []
added_date: '2026-06-13'
last_reviewed: '2026-06-13'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

> **TL;DR:** Haystack is a modular pipeline framework for search, RAG, routing, generation, and agent workflows. Use it when explicit pipeline components matter.

## Overview

Haystack is retrieval-first and production-oriented, with explicit components for pipelines, retrievers, generators, routers, and agents.

## Why It's in the Arsenal

It is a strong fit for teams that want RAG pipelines to be inspectable and modular instead of hidden inside a single chain.

## Key Features

- Pipeline/component architecture
- Strong retrieval and search foundation
- RAG and agent workflows
- Production-oriented integrations
- Apache-2.0 open source

## Architecture / How It Works

Haystack composes applications as directed pipelines of components such as converters, embedders, retrievers, rankers, generators, and agents.

## Getting Started

```bash
pip install haystack-ai
```

```python
from haystack import Pipeline

pipe = Pipeline()
# Add components such as retrievers and generators per official docs.
```

## Use Cases

1. **Scenario**: Production RAG/search systems
2. **Scenario**: Explicit retrieval pipelines
3. **Scenario**: Teams that want modular component control

## Strengths

- Clear pipeline structure
- Strong retrieval heritage
- Good fit for production search/RAG

## Limitations / When NOT to Use

- Less popular for quick demos than LangChain/LlamaIndex
- Requires component design discipline
- Agent abstractions are not the main community narrative

## Integration Patterns

- Use with Qdrant, Weaviate, OpenSearch, or custom document stores
- Pair with eval pipelines for retrieval quality
- Use explicit routing for multi-index systems

## Resources

- [GitHub](https://github.com/deepset-ai/haystack)
- [Docs](https://docs.haystack.deepset.ai/)

## Buzz & Reception

- Included because this project is frequently evaluated in production RAG architecture decisions.

---
*Last reviewed: 2026-06-13 by @maintainer*

