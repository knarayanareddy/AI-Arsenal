---
id: strands-agents
name: "Strands Agents SDK"
type: tool
job: [orchestration]
description: "Model-driven agent SDK in Python and TypeScript that runs in your process with lifecycle limits, hooks, memory and tracing built in"
url: "https://strandsagents.com"
cost_model: open-source
pricing_detail: "Apache-2.0 open source; free (you pay for whatever model provider/hosting you use)"
tags: [agents, llm]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: "SDK is free; model inference billed by your chosen provider"
self_hostable: true
open_source: true
source_url: "https://github.com/strands-agents/sdk-python"
docs_url: "https://strandsagents.com/"
github_url: "https://github.com/strands-agents/sdk-python"
alternatives: [openai-agents-sdk, pydantic-ai-tool, crewai]
integrates_with: [composio, litellm]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [prototype, production]
best_when: ["You would otherwise write your own agent loop and want turn limits, token budgets, cancellation and stop reasons handled before they become incidents.", "You have both Python and TypeScript services and want one agent SDK across both rather than maintaining two hand-rolled loops.", "You need to intercept or redirect any step of an agent run, because the loop traces every decision by default and hooks let you log, validate or redirect it."]
avoid_when: ["You want a hosted control plane with a managed runtime, because the README is explicit that the agent runs in your process with no hosted control plane.", "You need a single-language SDK and want the smallest possible dependency, because this monorepo ships Python, TypeScript, a CLI, a harness and a documentation site.", "You are choosing between agent architectures on quality grounds alone, because the SDK is a harness not a model, so output quality still depends on the model you wire in."]
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (6,483), Apache-2.0 license, and last push (2026-07-08) verified via the GitHub API on 2026-07-08 (repo resolves from strands-agents/sdk-python). Feature claims from official docs; not hands-on verified here."
verdict: watching
verdict_rationale: "Clean model-driven agent SDK with strong MCP/provider support and AWS backing; the model-driven-loop category is still consolidating against graph-based frameworks"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/strands-agents/sdk-python", "date": "2026-07-08", "description": "6,483 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

Strands Agents is an open-source SDK for building and running agents in Python and TypeScript, positioned as the alternative to writing your own agent loop. The README's framing is that the SDK covers the jobs a hand-rolled loop grows into: lifecycle controls covering turn limits, token budgets, cancellation and stop reasons, plus tools and structured output, MCP, multi-agent patterns, memory and sessions, model portability across providers, streaming, guardrails, tracing and evals. Model support is first-class for Amazon Bedrock, Anthropic, OpenAI and Gemini, with more providers and custom ones available. The repository is a monorepo holding a Python harness and a TypeScript harness, each assembling a complete agent through create_harness() / createHarness(), the two core SDKs, a strands CLI for prototyping from a terminal, and the documentation site source.

## Why It's in the Arsenal

The recurring engineering decision is when a hand-written agent loop becomes a liability. The first version is ten lines: call the model, parse a tool call, run it, append the result, repeat. Then turn limits, cancellation, token budgets and stop reasons arrive one incident at a time, and a model that ignores a stop condition runs until it is expensive. Strands moves that work into the loop with controls you configure, and the hooks model is the part that pays off at scale: you can log, validate or redirect any step, which is how you put a policy in front of tool execution without rewriting the agent. The trade is that you inherit someone else's loop design rather than your own.

## Key Features

- Lifecycle controls are first-class: turn limits, token budgets, cancellation and stop reasons are configuration, not incidents you discover later.
- Hooks and default tracing make the loop observable and interceptable, which is the prerequisite for a real tool policy.
- Model portability is a real interface rather than a claim, with Bedrock, Anthropic, OpenAI and Gemini first-class and custom providers supported.
- A single SDK covers Python and TypeScript, including a harness, a CLI and an evals surface, in one actively maintained monorepo.

## Architecture / How It Works

The core is a model-driven loop that runs in your process: the SDK calls the model, executes the tools the model requests, and returns structured output, with lifecycle controls enforcing turn limits, token budgets, cancellation and typed stop reasons along the way. Every step of that loop is traceable, and hooks intercept any stage, so logging, validation or redirection do not require forking the loop. Model providers sit behind a common interface, with Bedrock, Anthropic, OpenAI and Gemini first-class and others plus custom providers available, which is what makes backend swapping a configuration change. Around the loop sit memory and session management, multi-agent patterns, MCP tool access, guardrails, streaming, and a tracing plus evals surface for observation and testing. In the monorepo the Python and TypeScript SDKs hold the loop, providers and tools, while the harness packages assemble a full agent via create_harness() for teams that want the batteries-included version.

## Getting Started

Install the Python SDK, define a model, and run the agent; the TypeScript SDK mirrors this shape:

```bash
pip install strands-agents
```

```python
from strands import Agent

agent = Agent(model="anthropic.claude-sonnet-4-5-v1:0")
result = agent("Summarise the failing CI job in this repo and suggest a fix")
print(result)
```

Set a provider key for the model you name. For a fully assembled agent rather than a bare loop, install the harness package and build it with create_harness(); the strands CLI is there for interactive prototyping from a terminal.

## Use Cases

1. Replace a hand-rolled loop: adopt the SDK when your loop needs turn limits, token budgets and stop reasons rather than growing them one outage at a time.
2. Multi-service agent: keep one agent implementation in Python and one in TypeScript from the same SDK, instead of two divergent loops.
3. Enforced tool policy: intercept steps with hooks so tool calls are logged, validated or redirected before they reach production systems.

## Strengths

Strands sits among the agent SDKs in content/projects/framework, and the honest comparison is with the model-driven designs: it competes with smolagents on the small readable loop, with the Strands-adjacent Pydantic AI entry on typed Python, and with the graph-based frameworks such as LangGraph on explicit state machines versus model-decided control flow. It is not a hosted platform, so it does not overlap with the no-code builders in content/projects/agent-systems, and it complements rather than duplicates the observability and eval tooling in content/projects/evaluation-and-observability since tracing and evals are first-party but the backend is yours. Its Bedrock-first provider story makes it a natural fit beside the serving entries in content/projects/inference-engines when you run a self-hosted model, though it works equally well with hosted APIs.

## Limitations / When NOT to Use

The repository is broad, shipping two SDKs, two harness packages, a CLI and a docs site, so you install more than a loop and have to work out which layer you actually want; a team that only needs a ten-line loop may find that heavier than the alternative. There is no hosted control plane, which is exactly what you want for self-hosting and exactly what you have to build yourself for scheduling, durable runs and cross-session coordination. Because the loop is model-driven, determinism and control flow are bounded by how well the model follows instructions, and a graph-based entry gives you tighter guarantees when you need them. The evals and tracing features are first-party but the storage backend is your problem, and there is no published benchmark in the README for agent quality on any task.

## Integration Patterns

This belongs in content/projects/orchestration as the harness-shaped agent SDK and reads best beside the framework entries in content/projects/framework, particularly the graph-based and typed Python options, to decide whether you want a model-driven loop or explicit state. Its MCP and multi-agent features connect it to the agent-system entries in the same phase, and its tracing surface meets the observability entries in content/projects/evaluation-and-observability. Model portability only means something if you have a backend to swap, so the inference entries in content/projects/inference-engines are the practical companion. It also overlaps with the pydantic-ai tool entry in this batch, where the deciding question is typed Pydantic output versus lifecycle controls and hooks.

## Resources

- [GitHub — strands-agents/harness-sdk](https://github.com/strands-agents/harness-sdk)
- [Documentation — strandsagents.com/docs](https://strandsagents.com/)
- [Python SDK on PyPI](https://pypi.org/project/strands-agents/)

## Buzz & Reception

Ships the parts a hand-rolled agent loop inevitably grows into: turn limits, token budgets, cancellation, stop reasons and interceptable hooks.
