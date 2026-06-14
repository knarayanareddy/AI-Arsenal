---
id: langgraph
name: LangGraph
type: framework
category: agents
subcategory: agent-frameworks
description: 'Graph-based framework for building stateful, durable LLM agents and workflows'
github_url: 'https://github.com/langchain-ai/langgraph'
license: MIT
primary_language: Python
tags:
  - agents
  - orchestration
  - graphs
  - stateful
  - tool-use
maturity: production
cost_model: open-source
github_stars: 34644
github_stars_last_30d: 0
trending_score: 40
last_commit: '2026-06-13'
docs_url: 'https://docs.langchain.com/oss/python/langgraph/'
demo_url: null
paper_url: null
paper_id: null
alternatives:
  - crewai
  - openai-agents-sdk
  - google-adk
integrates_with: []
added_date: '2026-06-13'
last_reviewed: '2026-06-13'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: newsletter
    url: 'https://docs.langchain.com/oss/python/langgraph/'
    date: '2026-06-13'
    description: LangGraph launch and ecosystem docs
featured: true
status: active
---

> **TL;DR:** LangGraph is a graph-based orchestration framework for durable, stateful LLM agents. Use it when agent state, branching, retries, and production control matter more than quick demos.

## Overview

- Part of the LangChain ecosystem, but focused on explicit graph execution rather than linear chains.
- Best known for state machines, human-in-the-loop pauses, persistence, streaming, and multi-agent workflows.

## Key Features

- Graph/state-machine execution model
- Durable state and checkpointing for long-running workflows
- Human-in-the-loop and interruption support
- Works with LangChain tools and model integrations
- Strong fit for production agents that need observability and retries
- Large ecosystem around LangSmith, LangChain, and LangGraph Platform

## Architecture Model

LangGraph models an agent application as a directed graph of nodes and edges. Nodes perform work, edges route state, and the graph state is persisted across steps when checkpointing is enabled.

## Getting Started

```bash
pip install -U langgraph
```

```python
from langgraph.prebuilt import create_react_agent

def get_weather(city: str) -> str:
    return f"Weather lookup for {city}"

agent = create_react_agent("openai:gpt-4.1-mini", tools=[get_weather])
result = agent.invoke({"messages": [{"role": "user", "content": "Weather in Paris?"}]})
```

## Best For

- Stateful agents with branching control flow
- Human-review workflows that pause and resume
- Production workflows needing retries, persistence, and tracing

## Not Ideal For

- Tiny one-shot prompt wrappers
- Teams that want a no-code visual builder
- Use cases where a simple function call pipeline is easier to operate

## Comparison Context

Compared with CrewAI, LangGraph is lower-level and more explicit about state and control flow. Compared with OpenAI Agents SDK, it is less provider-specific and better for complex graph workflows.

## Resources

- [GitHub](https://github.com/langchain-ai/langgraph)
- [Docs](https://docs.langchain.com/oss/python/langgraph/)
- [LangGraph Academy](https://academy.langchain.com/courses/intro-to-langgraph)

## Community Buzz

- [LangGraph launch and ecosystem docs](https://docs.langchain.com/oss/python/langgraph/)

---
*Last reviewed: 2026-06-13 by @maintainer*

