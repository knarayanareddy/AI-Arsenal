---
id: haystack-agents
name: Haystack
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: >-
  Modular AI orchestration framework for RAG, agents, routing, retrieval, and
  generation pipelines
github_url: 'https://github.com/deepset-ai/haystack'
license: Apache-2.0
primary_language: Other
tags:
  - agents
  - rag
  - orchestration
  - retrieval
maturity: production
cost_model: open-source
github_stars: 25559
github_stars_last_30d: 0
trending_score: 40
last_commit: '2026-06-12'
docs_url: 'https://docs.haystack.deepset.ai/'
demo_url: null
paper_url: null
paper_id: null
alternatives:
  - langgraph
  - crewai
  - haystack
integrates_with: []
added_date: '2026-06-13'
last_reviewed: '2026-06-13'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: newsletter
    url: 'https://haystack.deepset.ai/tutorials'
    date: '2026-06-13'
    description: Official tutorials
featured: false
status: active
---

> **TL;DR:** Haystack is a modular orchestration framework for RAG, agents, routing, retrieval, and generation pipelines. Use it when explicit pipeline composition and production search/RAG matter.

## Overview

- Haystack is historically strong in retrieval and question-answering, but now supports broader LLM pipelines and agent workflows.
- It fits teams that want modular components and explicit pipeline control.

## Key Features

- Composable pipeline architecture
- Strong retrieval and RAG roots
- Agent, routing, memory, and generation components
- Production search and semantic search focus
- Integrations with many model and vector backends
- Apache-2.0 open-source license

## Architecture Model

Haystack models applications as modular pipelines made from components. Agent workflows are composed explicitly rather than hidden inside a conversational abstraction.

## Getting Started

```bash
pip install haystack-ai
```

```python
from haystack import Pipeline

pipe = Pipeline()
# Add retrievers, generators, routers, or agent components.
# See official docs for complete runnable examples.
```

## Best For

- Production RAG and semantic search systems
- Pipelines that need explicit components and routing
- Teams that want retrieval-first architecture with agent extensions

## Not Ideal For

- Tiny single-prompt agents
- Visual builder use cases
- Teams that want role-playing agents as the primary abstraction

## Comparison Context

Compared with LlamaIndex, Haystack is more pipeline/component oriented. Compared with LangGraph, it is more retrieval/RAG native and less centered on graph state machines.

## Resources

- [GitHub](https://github.com/deepset-ai/haystack)
- [Docs](https://docs.haystack.deepset.ai/)
- [Tutorials](https://haystack.deepset.ai/tutorials)

## Community Buzz

- [Official tutorials](https://haystack.deepset.ai/tutorials)

---
*Last reviewed: 2026-06-13 by @maintainer*

