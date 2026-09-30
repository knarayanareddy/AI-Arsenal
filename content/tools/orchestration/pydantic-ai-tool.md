---
id: pydantic-ai-tool
name: Pydantic AI
type: tool
job: [structured-output, orchestration]
description: "Typed Python AI SDK with an agent loop, dependency injection, model swapping by string id, and a harness for long-running work"
url: "https://github.com/pydantic/pydantic-ai"
cost_model: open-source
pricing_detail: Open source or free to start
tags: [structured-output, embeddings]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/pydantic/pydantic-ai"
docs_url: "https://pydantic.dev/pydantic-ai"
github_url: "https://github.com/pydantic/pydantic-ai"
alternatives: [guidance, instructor, outlines]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [prototype, production]
best_when: ["You write Python and you want model output validated as typed data at the boundary, because the SDK's central claim is typed end to end with Pydantic schemas for structured output.", "You need to move between model providers without rewriting agent logic, because the model is selected by a string id and the README frames every model as a string swap away.", "You are building something that runs for a long time rather than one call, because the harness adds memory, guardrails, sub-agents, planning, context compaction and persistence as composable capabilities."]
avoid_when: ["You want a non-Python stack, because this is explicitly the Python AI SDK and the typed story depends on Pydantic models.", "You want a hosted control plane with a managed runtime, because the harness is a library you assemble and run in your own process.", "You need the full observability and gateway product rather than a code dependency, because those are separate commercial offerings referenced alongside the open source."]
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
corresponding_project_entry: pydantic-ai
enrichment_status: draft
---

## Overview

Pydantic AI is a Python SDK built around a typed, extensible agent loop where the model is a string swap away and the same agent runs in a web frontend, a terminal, a realtime voice session, a durable background queue, GitHub Actions, or as a plain object you call run() on. Image generation and embeddings ship in the same package, while Pydantic Graph provides typed control flow and Pydantic Evals provides testing for agent behaviour in pytest style. A separate harness package adds the capabilities a long-running agent needs as composable pieces: memory, guardrails, sub-agents, planning, context management including compaction, persistence, and a complete coding agent. Observability and routing are addressed by Pydantic Logfire and a self-hostable AI Gateway, with instrumentation expressed as plain OpenTelemetry so an existing backend works unchanged.

## Why It's in the Arsenal

The recurring decision in a Python AI service is where an untyped model response becomes typed data, and what happens when the model returns something that does not fit. Pydantic AI makes that boundary a Pydantic model, validated at the call site, so a schema drift is a test failure rather than an AttributeError three services away. The second decision is provider lock-in: with the model as a string id and a common interface, swapping a frontier model for a local one is configuration. The third is what happens on long jobs, which the harness answers with compaction, persistence and sub-agents instead of an unbounded context window.

## Key Features

- Typed end to end, so model output is a Pydantic model and schema problems surface as validation failures at the call site.
- Model selection is a string, which makes provider changes a configuration change rather than a refactor.
- One loop with many interfaces, spanning web, terminal, realtime voice, durable queues and CI without rewriting the agent.
- OpenTelemetry instrumentation and a self-hostable gateway, so observability and cost control are not vendor lock-in.

## Architecture / How It Works

The core is an agent loop whose model, tools and output type are declared rather than inferred, with structured output validated against a Pydantic model and dependency injection used to wire tools and services into the run. Model providers sit behind a common interface selected by string id, so an agent definition is portable across hosted APIs and local runtimes. Interfaces layer on top of the same loop: a web frontend, a CLI, a realtime voice surface, a durable execution queue, and GitHub Actions integration, plus direct run() calls for embedding the agent as an object. Pydantic Graph adds explicit typed control flow for cases where an agent needs a state machine rather than a model-decided loop, and Pydantic Evals is a separate evaluation package for testing behaviour. The harness composes capabilities onto the loop, including compaction for context growth, persistence for resumability, and guardrails that intercept outputs. Telemetry is OpenTelemetry instrumentation, so the tracing backend is your choice.

## Getting Started

Install the SDK, then declare an agent with a model id, a dependency and a typed output, and run it:

```bash
pip install pydantic-ai
```

```python
from pydantic_ai import Agent
from pydantic import BaseModel

class SupportReply(BaseModel):
    reply: str
    escalate: bool

agent = Agent("openai:gpt-5", output_type=SupportReply)
result = agent.run_sync("A customer says their invoice is wrong twice")
print(result.output.reply, result.output.escalate)
```

Swap the model string to move providers. For long-running work, add the harness package and attach memory, guardrails, planning or persistence as capabilities; Graph and Evals install as their own packages.

## Use Cases

1. Typed structured output: declare a Pydantic model as the agent's output type and get validated data with a typed test surface rather than hand-written parsing.
2. Provider-portable agents: keep one agent definition and change the model string when a provider changes price, availability or data-handling policy.
3. Long-running agent jobs: assemble a harness with memory, context compaction, persistence and sub-agents for work that outlives a single context window.

## Strengths

Pydantic AI competes with the other typed and code-first agent frameworks in content/projects/framework, and the distinguishing commitment is that the model and its output are ordinary Python types rather than strings you parse defensively. It overlaps with LangGraph on the control-flow side, where both offer explicit graph state, and with the framework entries in content/projects/agent-systems on the agent loop, but the dependency-injection and Pydantic-native ergonomics are the reason a Python team picks it. Compared with a hosted agent platform, it is a library you own rather than a service you rent, and the Logfire and Gateway products are adjacent rather than required. It complements the inference entries in content/projects/inference-engines by consuming whichever backend you name, and the separate Evals package connects to the eval tooling in content/projects/benchmark-and-eval.

## Limitations / When NOT to Use

The value depends on your team actually typing its boundaries; a codebase that passes dicts everywhere will not get much from a typed SDK, and the dependency-injection style is a real learning curve for teams used to simple script agents. Python-only is a hard boundary when part of the stack is TypeScript, and the parallel Strands entry in this batch shows that the same two-language problem has other answers. The harness capabilities are composable but you must assemble them, and long-running jobs with persistence and compaction are where the configuration surface starts to grow. Logfire and the hosted gateway are separate commercial products, so full observability is not a free part of the open SDK even though the instrumentation itself is standard OpenTelemetry.

## Integration Patterns

This belongs in content/projects/framework as the typed, code-first agent option and reads most usefully beside the other framework entries such as LangGraph, CrewAI and smolagents when the deciding question is typing discipline versus graph control flow. The model-abstraction boundary it defines is the same one the serving entries in content/projects/inference-engines implement, so pick them together rather than independently. The pydantic-ai framework entry in this batch covers the library itself while this one covers the SDK and harness surface, which is worth knowing before installing both. For evaluation, its Evals package meets the eval tooling in content/projects/benchmark-and-eval, and for tracing it meets the observability entries in content/projects/evaluation-and-observability.

## Resources

- [GitHub — pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai)
- [Documentation — pydantic.dev/pydantic-ai](https://pydantic.dev/pydantic-ai)
- [Harness package — pydantic-ai-harness](https://github.com/pydantic/pydantic-ai-harness)

## Buzz & Reception

Type-checks model output and agent state with Pydantic, so an agent that returns malformed data fails at a boundary instead of downstream in production.
