---
id: metagpt
name: MetaGPT
type: framework
category: agents
subcategory: agent-frameworks
description: >-
  Multi-agent framework that simulates software-company roles for
  natural-language programming
github_url: 'https://github.com/FoundationAgents/MetaGPT'
license: MIT
primary_language: Python
tags:
  - agents
  - orchestration
  - planning
  - code-gen
maturity: production
cost_model: open-source
github_stars: 68769
github_stars_last_30d: 0
trending_score: 40
last_commit: '2026-01-21'
docs_url: 'https://docs.deepwisdom.ai/'
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
    url: 'https://docs.deepwisdom.ai/'
    date: '2026-06-13'
    description: Official docs
featured: false
status: active
---

> **TL;DR:** MetaGPT is a multi-agent framework that simulates software-company roles such as product manager, architect, and engineer. Use it to study role-based software-generation workflows, not as a default production agent runtime.

## Overview

- MetaGPT became known for the “AI software company” pattern: multiple specialized agents collaborate on software tasks.
- It is useful as a reference implementation for role decomposition and software-generation pipelines.

## Key Features

- Role-based multi-agent software workflow
- Product/architect/engineer-style decomposition
- Natural-language programming experiments
- MIT-licensed repository
- Useful educational examples for agent collaboration
- Strong historical influence in multi-agent demos

## Architecture Model

MetaGPT models work as a set of collaborating software-company roles. Each role contributes artifacts and passes them through a structured process.

## Getting Started

```bash
pip install --upgrade metagpt
```

```python
pip install --upgrade metagpt
metagpt "Create a 2048 game"
```

## Best For

- Studying role-based software generation
- Prototyping multi-agent software-company patterns
- Educational demos of agent collaboration

## Not Ideal For

- General-purpose production orchestration
- Teams needing low-level state control
- Non-software workflows where the company-role metaphor does not fit

## Comparison Context

Compared with CrewAI, MetaGPT is more opinionated around software-company roles. Compared with OpenHands, it generates software artifacts but is less focused on interactive developer environments.

## Resources

- [GitHub](https://github.com/FoundationAgents/MetaGPT)
- [Docs](https://docs.deepwisdom.ai/)
- [Website](https://atoms.dev/)

## Community Buzz

- [Official docs](https://docs.deepwisdom.ai/)

---
*Last reviewed: 2026-06-13 by @maintainer*

