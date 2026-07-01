---
id: autogen
name: AutoGen
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: >-
  Microsoft multi-agent framework now maintained as legacy after Agent Framework
  convergence
github_url: 'https://github.com/microsoft/autogen'
license: CC-BY-4.0
primary_language: Python
tags:
  - agents
  - orchestration
  - planning
  - tool-use
maturity: production
cost_model: open-source
github_stars: 58925
github_stars_last_30d: 0
trending_score: 40
last_commit: '2026-04-15'
docs_url: 'https://microsoft.github.io/autogen/'
demo_url: null
paper_url: null
paper_id: null
alternatives:
  - microsoft-agent-framework
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
featured: false
status: deprecated
---

> **TL;DR:** AutoGen popularized Microsoft’s open-source multi-agent orchestration patterns. For new projects, prefer Microsoft Agent Framework because AutoGen is maintained for fixes rather than major new features.

## Overview

- AutoGen remains historically important and still useful for existing applications.
- Microsoft maintainers announced that AutoGen and Semantic Kernel are merging into Microsoft Agent Framework, with AutoGen continuing for critical fixes and security patches.

## Key Features

- Conversational multi-agent abstractions
- Agent collaboration and handoff patterns
- Large installed base and many examples
- Still available for existing AutoGen applications
- Migration path to Microsoft Agent Framework
- Important historical influence on agent orchestration

## Architecture Model

AutoGen models applications as collaborating conversational agents. Agents exchange messages, call tools, and can coordinate through group chat or orchestration patterns.

## Getting Started

```bash
pip install autogen-agentchat autogen-ext[openai]
```

```python
from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.openai import OpenAIChatCompletionClient

model_client = OpenAIChatCompletionClient(model="gpt-4o-mini")
agent = AssistantAgent("assistant", model_client=model_client)
# See official docs for running team and UI examples.
```

## Best For

- Maintaining existing AutoGen applications
- Studying conversational multi-agent patterns
- Migrating older Microsoft agent systems to Agent Framework

## Not Ideal For

- New Microsoft-stack agent projects
- Teams wanting the newest Microsoft workflow API
- Projects that require long-term feature development in AutoGen itself

## Comparison Context

Compared with Microsoft Agent Framework, AutoGen is the legacy predecessor. Compared with CrewAI, AutoGen is more conversation-centric and research-oriented.

## Resources

- [GitHub](https://github.com/microsoft/autogen)
- [Docs](https://microsoft.github.io/autogen/)
- [Migration discussion](https://github.com/microsoft/autogen/discussions/7066)

## Community Buzz

- [AutoGen update discussion](https://github.com/microsoft/autogen/discussions/7066)

---
*Last reviewed: 2026-06-13 by @maintainer*

