---
id: openhands
name: OpenHands
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: >-
  AI software engineering agent platform for coding, terminal work, browser
  actions, and automation
github_url: 'https://github.com/OpenHands/OpenHands'
license: MIT + Enterprise
primary_language: Python
tags:
  - agents
  - code-gen
  - tool-use
  - planning
maturity: production
cost_model: open-source
github_stars: 76854
github_stars_last_30d: 0
trending_score: 40
last_commit: '2026-06-13'
docs_url: 'https://docs.all-hands.dev/'
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
    url: 'https://docs.all-hands.dev/'
    date: '2026-06-13'
    description: Official docs
featured: false
status: active
---

> **TL;DR:** OpenHands is an AI software engineering agent platform for coding tasks, shell work, browser use, and developer automation. Use it when the agent’s job is to operate like a software engineer, not just call app tools.

## Overview

- OpenHands focuses on AI-driven development workflows rather than general business-process agents.
- It gives agents a developer environment with code, terminal, browser, and task execution capabilities.

## Key Features

- Coding-agent focus
- Terminal and browser-oriented workflows
- Interactive developer task automation
- Self-hostable open-source core with enterprise areas
- Large community interest around software engineering agents
- Useful benchmark target for SWE-style automation

## Architecture Model

OpenHands models an agent as a software engineering worker operating in an execution environment. It emphasizes environment interaction over role-based crew orchestration.

## Getting Started

```bash
See official docs for current Docker and runtime setup
```

```python
# OpenHands setup changes with runtime images and deployment mode.
# Use the official installation docs instead of copying stale Docker commands.
# https://docs.all-hands.dev/
```

## Best For

- Coding task automation
- Developer-assistant experiments
- Benchmarks and workflows where the agent needs shell/browser access

## Not Ideal For

- General chatbot workflows
- Simple RAG applications
- Teams unwilling to sandbox agent execution carefully

## Comparison Context

Compared with LangGraph or CrewAI, OpenHands is more application/platform than library. Compared with AutoGPT, it is more focused on software engineering environments.

## Resources

- [GitHub](https://github.com/OpenHands/OpenHands)
- [Docs](https://docs.all-hands.dev/)
- [Website](https://openhands.dev)

## Community Buzz

- [Official docs](https://docs.all-hands.dev/)

---
*Last reviewed: 2026-06-13 by @maintainer*

