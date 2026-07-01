---
id: dify
name: Dify
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: >-
  Visual platform for building agentic workflows, RAG apps, chatbots, and AI
  automations
github_url: 'https://github.com/langgenius/dify'
license: Modified Apache-2.0
primary_language: TypeScript
tags:
  - agents
  - orchestration
  - rag
  - cloud
maturity: production
cost_model: open-source
github_stars: 145081
github_stars_last_30d: 0
trending_score: 40
last_commit: '2026-06-13'
docs_url: 'https://docs.dify.ai/'
demo_url: null
paper_url: null
paper_id: null
alternatives:
  - langgraph
  - crewai
integrates_with: []
added_date: '2026-06-13'
last_reviewed: '2026-06-13'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: newsletter
    url: 'https://docs.dify.ai/'
    date: '2026-06-13'
    description: Official docs
featured: false
status: active
---

> **TL;DR:** Dify is a visual platform for building agentic workflows, RAG apps, chatbots, and AI automations. Use it when your team wants a product-builder interface rather than a code-first framework.

## Overview

- Dify is not a code-first library like LangGraph or CrewAI.
- It provides a visual builder, workflow orchestration, model/provider integrations, RAG features, and self-hostable deployment options under a modified license.

## Key Features

- Visual workflow and app builder
- Agentic workflow development
- RAG and knowledge-base features
- Multi-provider model support
- Self-hostable Docker deployment
- Useful for product teams and internal tools

## Architecture Model

Dify models applications as visual workflows and configured AI apps. The architecture is platform-oriented: users compose nodes, model calls, knowledge retrieval, and tool integrations in a UI.

## Getting Started

```bash
docker compose up -d
```

```python
git clone https://github.com/langgenius/dify.git
cd dify/docker
cp .env.example .env
docker compose up -d
```

## Best For

- Product teams building AI apps quickly
- Internal chatbot/RAG/workflow builders
- Teams that prefer visual workflows over code-first SDKs

## Not Ideal For

- Library-style embedding into a Python package
- Fine-grained graph state control in code
- Teams needing an unmodified Apache-2.0 license for all use cases

## Comparison Context

Compared with LangGraph, Dify is a platform and visual builder. Compared with CrewAI, it targets application builders and operations users more than Python developers writing agents in code.

## Resources

- [GitHub](https://github.com/langgenius/dify)
- [Docs](https://docs.dify.ai/)
- [Dify Cloud](https://dify.ai)

## Community Buzz

- [Official docs](https://docs.dify.ai/)

---
*Last reviewed: 2026-06-13 by @maintainer*

