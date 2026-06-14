---
id: smolagents
name: Smolagents
type: framework
category: agents
subcategory: agent-frameworks
description: >-
  Hugging Face library for lightweight agents that can reason and act through
  code
github_url: 'https://github.com/huggingface/smolagents'
license: Apache-2.0
primary_language: Python
tags:
  - agents
  - tool-use
  - reasoning
  - local
maturity: production
cost_model: open-source
github_stars: 27839
github_stars_last_30d: 0
trending_score: 40
last_commit: '2026-06-09'
docs_url: 'https://huggingface.co/docs/smolagents'
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
    url: 'https://huggingface.co/docs/smolagents'
    date: '2026-06-13'
    description: Hugging Face docs
featured: false
status: active
---

> **TL;DR:** Smolagents is Hugging Face’s minimal agent library with first-class support for code agents. Use it when you want small abstractions, Python-native tools, and Hugging Face model integrations.

## Overview

- Smolagents intentionally keeps abstractions small and emphasizes agents that think in executable code.
- It works well for experiments, tool use, and Hugging Face-centered workflows.

## Key Features

- Small codebase and minimal abstractions
- CodeAgent abstraction for code-based reasoning/action
- Hugging Face model and tool ecosystem integration
- Supports managed and local model backends
- Good educational surface area
- Useful for quick agent experiments

## Architecture Model

Smolagents centers on agents that produce and execute code through controlled tools. Its architecture is lighter than graph frameworks and optimized for direct Python experimentation.

## Getting Started

```bash
pip install smolagents
```

```python
from smolagents import CodeAgent, DuckDuckGoSearchTool, InferenceClientModel

model = InferenceClientModel()
agent = CodeAgent(tools=[DuckDuckGoSearchTool()], model=model)
agent.run("Find one current fact about Hugging Face agents")
```

## Best For

- Code-agent experiments
- Hugging Face model workflows
- Small teams that want minimal abstractions

## Not Ideal For

- Enterprise workflow governance
- Complex stateful multi-agent graphs
- No-code agent builders

## Comparison Context

Compared with LangGraph, Smolagents is smaller and less workflow-heavy. Compared with OpenAI Agents SDK, it is more Hugging Face/open-model friendly.

## Resources

- [GitHub](https://github.com/huggingface/smolagents)
- [Docs](https://huggingface.co/docs/smolagents)
- [Agents course](https://huggingface.co/learn/agents-course)

## Community Buzz

- [Hugging Face docs](https://huggingface.co/docs/smolagents)

---
*Last reviewed: 2026-06-13 by @maintainer*

