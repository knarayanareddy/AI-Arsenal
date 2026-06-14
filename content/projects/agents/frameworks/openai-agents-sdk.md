---
id: openai-agents-sdk
name: OpenAI Agents SDK
type: framework
category: agents
subcategory: agent-frameworks
description: >-
  Lightweight Python framework for OpenAI-style agents, tools, handoffs,
  guardrails, and tracing
github_url: 'https://github.com/openai/openai-agents-python'
license: MIT
primary_language: Python
tags:
  - agents
  - tool-use
  - guardrails
  - tracing
maturity: production
cost_model: open-source
github_stars: 27129
github_stars_last_30d: 0
trending_score: 40
last_commit: '2026-06-13'
docs_url: 'https://openai.github.io/openai-agents-python/'
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
    url: 'https://openai.github.io/openai-agents-python/'
    date: '2026-06-13'
    description: Official documentation
featured: false
status: active
---

> **TL;DR:** OpenAI Agents SDK is a lightweight Python framework for agents, tools, handoffs, guardrails, sessions, and tracing. Use it when you are building around OpenAI APIs but want a simple provider-aware orchestration layer.

## Overview

- The SDK provides agent primitives that map closely to OpenAI’s Responses and Chat Completions ecosystem.
- It includes tools, handoffs, sessions, guardrails, human-in-the-loop patterns, and tracing.

## Key Features

- Agent abstraction with instructions, tools, and handoffs
- Built-in tracing for debugging runs
- Guardrails for input and output validation
- Sessions for conversation history
- Realtime/voice agent support
- Examples for multi-agent workflows

## Architecture Model

The SDK models agents as configured LLM actors with tools, guardrails, sessions, and handoff targets. It is closer to an application harness than a general graph runtime.

## Getting Started

```bash
pip install openai-agents
```

```python
from agents import Agent, Runner

agent = Agent(name="Assistant", instructions="Answer in one sentence.")
result = Runner.run_sync(agent, "What is an AI agent?")
print(result.final_output)
```

## Best For

- OpenAI-first applications
- Simple multi-agent handoffs
- Teams that want built-in tracing and guardrails without a heavy graph runtime

## Not Ideal For

- Provider-neutral infrastructure-first teams
- Deep state-machine workflows
- No-code or visual agent building

## Comparison Context

Compared with LangGraph, OpenAI Agents SDK is lighter and more OpenAI-centered. Compared with Pydantic AI, it has broader agent workflow primitives but less emphasis on typed application architecture.

## Resources

- [GitHub](https://github.com/openai/openai-agents-python)
- [Docs](https://openai.github.io/openai-agents-python/)
- [Examples](https://github.com/openai/openai-agents-python/tree/main/examples)

## Community Buzz

- [Official documentation](https://openai.github.io/openai-agents-python/)

---
*Last reviewed: 2026-06-13 by @maintainer*

