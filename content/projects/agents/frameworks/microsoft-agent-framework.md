---
id: microsoft-agent-framework
name: Microsoft Agent Framework
type: framework
category: agents
subcategory: agent-frameworks
description: >-
  Microsoft framework for Python and .NET agents, workflows, and production
  orchestration
github_url: 'https://github.com/microsoft/agent-framework'
license: MIT
primary_language: Python
tags:
  - agents
  - orchestration
  - graphs
  - cloud
  - tool-use
maturity: production
cost_model: open-source
github_stars: 11311
github_stars_last_30d: 0
trending_score: 50
last_commit: '2026-06-13'
docs_url: 'https://learn.microsoft.com/en-us/agent-framework/'
demo_url: null
paper_url: null
paper_id: null
alternatives:
  - autogen
  - semantic-kernel
integrates_with: []
added_date: '2026-06-13'
last_reviewed: '2026-06-13'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: 'https://github.com/microsoft/autogen/discussions/7066'
    date: '2026-06-13'
    description: AutoGen update discussion
  - source: youtube
    url: 'https://www.youtube.com/watch?v=AAgdMhftj8w'
    date: '2026-06-13'
    description: Intro video
featured: false
status: active
---

> **TL;DR:** Microsoft Agent Framework unifies Microsoft’s AutoGen and Semantic Kernel agent work into one Python and .NET framework. Use it when you are in the Microsoft/Azure ecosystem or need enterprise-oriented orchestration.

## Overview

- Microsoft announced Agent Framework as the successor path that combines AutoGen-style multi-agent orchestration with Semantic Kernel production foundations.
- It supports Python and .NET, graph-based workflows, provider flexibility, and Azure/Microsoft Foundry integration.

## Key Features

- Python and .NET support
- Graph-based workflows and multi-agent orchestration
- Built for production concerns such as durability and governance
- Provider flexibility across Microsoft and non-Microsoft models
- Natural migration target for new AutoGen/Semantic Kernel agent work
- Microsoft Learn documentation and samples

## Architecture Model

Microsoft Agent Framework models applications as agents and workflows. Its workflow API supports graph-style orchestration patterns such as sequential, concurrent, handoff, and group collaboration.

## Getting Started

```bash
pip install agent-framework
```

```python
from agent_framework import ChatAgent

agent = ChatAgent(name="helper", instructions="Answer concisely.")
# See Microsoft Learn for provider setup and runtime configuration.
# https://learn.microsoft.com/en-us/agent-framework/
```

## Best For

- Enterprises already using Azure, Foundry, or .NET
- Teams migrating from AutoGen or Semantic Kernel agent patterns
- Production workflows needing Microsoft support and governance

## Not Ideal For

- Teams avoiding Microsoft ecosystem dependencies
- Small prototypes where provider-neutral minimal SDKs are enough
- Projects that require a mature third-party plugin ecosystem immediately

## Comparison Context

Compared with AutoGen, Microsoft Agent Framework is the forward-looking successor. Compared with LangGraph, it is more Microsoft-enterprise oriented and explicitly supports .NET alongside Python.

## Resources

- [GitHub](https://github.com/microsoft/agent-framework)
- [Microsoft Learn docs](https://learn.microsoft.com/en-us/agent-framework/)
- [AutoGen update discussion](https://github.com/microsoft/autogen/discussions/7066)
- [Intro video](https://www.youtube.com/watch?v=AAgdMhftj8w)

## Community Buzz

- [AutoGen update discussion](https://github.com/microsoft/autogen/discussions/7066)
- [Intro video](https://www.youtube.com/watch?v=AAgdMhftj8w)

---
*Last reviewed: 2026-06-13 by @maintainer*

