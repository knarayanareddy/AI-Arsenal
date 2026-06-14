---
id: ragflow
name: RAGFlow
type: platform
category: rag
subcategory: frameworks
description: >-
  Open-source RAG engine combining document understanding, retrieval, and agent
  capabilities
github_url: 'https://github.com/infiniflow/ragflow'
license: Apache-2.0
primary_language: Python
tags:
  - rag
  - retrieval
  - agents
  - cloud
maturity: production
cost_model: open-source
github_stars: 82655
github_stars_last_30d: 0
trending_score: 30
last_commit: '2026-06-13'
docs_url: 'https://ragflow.io/docs/dev/'
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

> **TL;DR:** RAGFlow is an open-source RAG engine that combines document understanding, retrieval, and agent capabilities. Use it when you want an application-level RAG platform rather than only a library.

## Overview

RAGFlow packages RAG pipeline capabilities into a platform-like system with document parsing, retrieval, and user-facing workflows.

## Why It's in the Arsenal

It is useful for teams that want more of the RAG application stack assembled rather than wiring all components manually.

## Key Features

- RAG engine with agent capabilities
- Document understanding focus
- Application/platform orientation
- Apache-2.0 repository license
- High community interest

## Architecture / How It Works

RAGFlow combines document ingestion/parsing, retrieval, generation, and agent/application workflows into an integrated platform.

## Getting Started

```bash
git clone https://github.com/infiniflow/ragflow.git
cd ragflow
docker compose up -d
```

```python
# RAGFlow is typically started through Docker Compose.
# See official docs for current service configuration.
```

## Use Cases

1. **Scenario**: Teams wanting an integrated RAG platform
2. **Scenario**: Document-heavy knowledge assistants
3. **Scenario**: RAG applications where UI/workflow packaging matters

## Strengths

- Integrated RAG stack
- Strong document-processing orientation
- Good self-hostable evaluation candidate

## Limitations / When NOT to Use

- Heavier than a library
- Operational footprint is larger than LlamaIndex/LangChain
- Customization may require platform-specific work

## Integration Patterns

- Use as a self-hosted RAG application backend
- Compare against Dify when visual/application workflow matters
- Use specialized vector DBs only when platform defaults are insufficient

## Resources

- [GitHub](https://github.com/infiniflow/ragflow)
- [Docs](https://ragflow.io/docs/dev/)

## Buzz & Reception

- Included because this project is frequently evaluated in production RAG architecture decisions.

---
*Last reviewed: 2026-06-13 by @maintainer*

