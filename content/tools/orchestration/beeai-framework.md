---
id: beeai-framework
name: "BeeAI Framework"
type: tool
job: [orchestration]
description: "Agent framework with matching Python and TypeScript SDKs, event-stream telemetry and schema-validated tools"
url: "https://github.com/i-am-bee/beeai-framework"
cost_model: open-source
pricing_detail: "Apache-2.0 source; inference is billed by Groq, OpenAI, Anthropic or whichever local runtime you point it at"
tags: [agents, orchestration, tool-use, tracing, local]
maturity: beta
stack: [python, typescript]
free_tier: true
free_tier_limits: "Apache-2.0 source is free; local Ollama deployments avoid per-token cost entirely"
self_hostable: true
open_source: true
source_url: "https://github.com/i-am-bee/beeai-framework"
docs_url: null
github_url: "https://github.com/i-am-bee/beeai-framework"
alternatives: [harness-sdk, langroid]
integrates_with: []
added_date: "2026-10-21"
last_reviewed: "2026-10-21"
added_by: repo-maintainer
reviewed_by: null
verdict: recommended
verdict_rationale: "Genuine Python and TypeScript parity with event-level observability, which suits polyglot teams; the integration catalogue is smaller than the incumbents"
status: active
phase: orchestration
audience: [production, prototype]
best_when:
  - "The same agent must ship on a Node service and a Python pipeline, and drifting behaviour between the two would be a real defect"
  - "You need every iteration, tool call and memory mutation as an event so tracing and interception attach without patching the framework"
avoid_when:
  - "You depend on a specific niche SaaS integration that only the larger frameworks already ship"
  - "A single ReAct loop is the whole design, where an explicit driver, tools and agent triple is more ceremony than the task deserves"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Capabilities described from the repository and documentation; cross-runtime parity was not verified by running the same agent on both SDKs here."
buzz_sources: []
---

## Overview

BeeAI Framework builds agentic workflows that run on either Python or TypeScript without changing their shape. Agents are event-driven engines: input arrives, the engine evaluates instructions against memory, and it decides between running code, calling an API or delegating to a sub-agent, emitting an event at each transition.

Schema validation is enforced at both ends — Pydantic on the Python side, Zod on the TypeScript side — so a tool contract produces the same validation behaviour in either runtime. That matters more than it sounds, because the usual failure when an agent stack is ported between languages is a schema that is subtly more permissive in one of them.

Memory is pluggable across short-term scratchpad, sliding-window history and vector-backed long-term stores, and drivers cover both hosted providers and local runtimes such as Ollama.

## Why It's in the Arsenal

The Arsenal catalogues orchestration frameworks by the constraints they remove. Most remove boilerplate; BeeAI removes the language boundary, which is a different and more organisational constraint.

It is also a good example of observability as an architectural property rather than an add-on: because every step emits an event, tracing, interception and human-in-the-loop approval are consumers of a stream instead of instrumentation bolted onto internals.

## Key Features

- Matching Python and TypeScript cores with the same paradigms, published under the same project.
- Multi-agent patterns — master-worker, sequential pipeline, collaborative — with routing between participants.
- Tool input and output validation through Pydantic or Zod, applied before execution.
- Pluggable memory subsystems spanning scratchpad, sliding window and vector-backed stores.
- An event emitter exposing start, update, tool and error hooks for each iteration.

## Architecture / How It Works

An agent instance is constructed from a model driver, a memory module and a tool registry. On each turn the engine composes the prompt from the system instruction and memory, calls the driver, parses the response, and either emits a final answer or executes the requested tool and loops with the result appended. Every stage publishes an event carrying the iteration index and payload, which is what makes the run replayable from the stream alone.

Drivers abstract provider specifics, so the same agent definition runs against a hosted API or a local Ollama endpoint. Memory is a separate module rather than part of the agent, which allows a vector store to be swapped for a sliding window without changing prompt construction.

## Getting Started

Pick one runtime, define a driver and a single tool, and run an agent with the event hooks printing to stdout; the stream is the best documentation of what the loop is doing. Once the Python or TypeScript version behaves, port it to the other runtime and compare traces — that comparison is the practical test of the parity claim.

## Use Cases

1. A full-stack product where the chat agent runs in Node while the offline evaluation pipeline runs the same definitions in Python.
2. Local-first deployments where Ollama drivers keep prompts and data inside the network.
3. Human-in-the-loop approval flows implemented as stream subscribers that intercept a tool event before execution.
4. Multi-agent research pipelines where a master agent delegates sub-questions and memory is shared deliberately rather than globally.

## Strengths

- Real parity rather than a stale port: both SDKs are maintained in the same project with matching abstractions.
- Event streams make telemetry, interception and replay straightforward, since each iteration is already a discrete record.
- Validation before execution keeps malformed tool payloads from reaching application code in either runtime.
- Memory is modular, so the retrieval strategy can change without rewriting agent logic.

## Limitations / When NOT to Use

- Integration coverage is narrower than the established frameworks; niche SaaS tools are yours to wrap.
- Simple loops carry visible ceremony: a driver, a tool registry and an agent instance before the first completion.
- Dual maintenance occasionally lags on experimental features, so a capability present in one SDK may arrive later in the other.
- Beta status means the surface can change; pin versions and test upgrades against a real agent, not a smoke test.

## Integration Patterns

Treat the event stream as the integration point: ship it to your tracing backend and let approval workflows subscribe to tool events. Keep tool implementations in the language of the system they call, exposing them as drivers or MCP servers rather than porting them. Where both runtimes are in play, keep agent definitions in one repository and generate per-runtime fixtures so drift shows up in CI rather than in production behaviour.

## Resources

- [GitHub — i-am-bee/beeai-framework](https://github.com/i-am-bee/beeai-framework)
- [BeeAI documentation](https://framework.beeai.dev/)

## Buzz & Reception

The entry reflects the project's documentation and repository activity; no independent comparison of the two SDKs' behaviour on an identical workload is recorded here. The claim to test is parity — run one agent on both runtimes and diff the traces.
