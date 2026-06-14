---
id: google-adk
name: Google ADK
type: framework
category: agents
subcategory: agent-frameworks
description: >-
  Google code-first Python toolkit for building, evaluating, and deploying AI
  agents
github_url: 'https://github.com/google/adk-python'
license: Apache-2.0
primary_language: Python
tags:
  - agents
  - orchestration
  - graphs
  - tool-use
maturity: production
cost_model: open-source
github_stars: 20097
github_stars_last_30d: 0
trending_score: 40
last_commit: '2026-06-13'
docs_url: 'https://google.github.io/adk-docs/'
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
    url: 'https://google.github.io/adk-docs/'
    date: '2026-06-13'
    description: Official ADK docs
featured: false
status: active
---

> **TL;DR:** Google ADK is a code-first Python toolkit for building, evaluating, and deploying agents. Use it when you want Google ecosystem integration and explicit workflow/runtime primitives.

## Overview

- ADK 2.0 emphasizes a workflow runtime, task API, graph execution, routing, fan-out/fan-in, loops, retries, and state management.
- It is a stronger fit for code-first teams than visual agent builders.

## Key Features

- Python code-first agent definitions
- Workflow runtime for graph execution
- Task API for agent-to-agent delegation
- Human-in-the-loop support
- Google documentation and sample repos
- Evaluation and deployment focus

## Architecture Model

ADK models agentic applications with agents, tasks, and a workflow runtime. The workflow runtime supports graph-like routing, loops, retry, fan-out/fan-in, and state management.

## Getting Started

```bash
pip install google-adk
```

```python
from google.adk import Agent

root_agent = Agent(
    name="greeting_agent",
    model="gemini-2.5-flash",
    instruction="Greet the user and answer briefly.",
)
```

## Best For

- Google/Gemini-centered agent applications
- Code-first agent teams needing workflow primitives
- Agent evaluation and deployment experiments

## Not Ideal For

- Teams that want provider-neutral abstractions first
- No-code visual workflows
- Existing LangChain/LangGraph-heavy stacks

## Comparison Context

Compared with OpenAI Agents SDK, Google ADK is Google/Gemini-oriented and has an explicit workflow runtime. Compared with LangGraph, it is younger but more tied to Google’s agent ecosystem.

## Resources

- [GitHub](https://github.com/google/adk-python)
- [Docs](https://google.github.io/adk-docs/)
- [Samples](https://github.com/google/adk-samples)

## Community Buzz

- [Official ADK docs](https://google.github.io/adk-docs/)

---
*Last reviewed: 2026-06-13 by @maintainer*

