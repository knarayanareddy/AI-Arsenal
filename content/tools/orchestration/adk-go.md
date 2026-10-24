---
id: adk-go
name: "ADK for Go (Agent Development Kit)"
type: tool
job: [orchestration]
description: "Google's code-first Go toolkit for building, evaluating and deploying multi-agent systems"
url: "https://github.com/google/adk-go"
cost_model: open-source
pricing_detail: "Apache-2.0 source; Gemini and Vertex AI inference is billed per token by the provider"
tags: [agents, orchestration, tool-use, structured-output, cloud]
maturity: beta
stack: [go]
free_tier: true
free_tier_limits: "Apache-2.0 source is unrestricted; the underlying Gemini and Vertex AI calls are billed per token"
self_hostable: true
open_source: true
source_url: "https://github.com/google/adk-go"
docs_url: null
github_url: "https://github.com/google/adk-go"
alternatives: [adk-python, adk-java]
integrates_with: []
added_date: "2026-10-09"
last_reviewed: "2026-10-09"
added_by: repo-maintainer
reviewed_by: null
verdict: recommended
verdict_rationale: "Type-safe goroutine runtime for teams already on Go, MCP-native and tuned for Gemini, at the cost of a much thinner Go integration ecosystem"
status: active
phase: orchestration
audience: [production]
best_when:
  - "Agent logic has to live inside a compiled Go binary where a Python sidecar would add latency, memory and deployment surface"
  - "Your tool surface already speaks Model Context Protocol and you want discovery without writing a bespoke adapter per tool"
avoid_when:
  - "The integration you need ships only as a Python package, so you would be reimplementing a client in Go first"
  - "You want a catalogue of ready-made agent recipes rather than writing routing and state transitions yourself"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Behaviour described from the repository README and ADK documentation; no independent production deployment was reviewed here."
buzz_sources: []
---

## Overview

The Google Agent Development Kit for Go is a code-first framework for constructing, coordinating and evaluating autonomous agents inside a compiled Go process. It exists because the agent ecosystem is Python-shaped by default, and the runtime characteristics that matter in a large service fleet — static typing, bounded memory, cheap concurrency — are exactly the ones a Python interpreter makes expensive to obtain.

Agents are modelled as stateful values that exchange structured messages, tool calls and environment context. The toolkit wraps model invocation but leaves the execution loop, system instructions and tool schemas visible in the caller's code, so guardrails, cost accounting and step-level debugging are ordinary middleware rather than framework extensions. Gemini and Vertex AI are the first-class backends, with function calling, structured output and multimodal inputs reachable from the same compiled binary.

The differentiator is protocol alignment: Model Context Protocol primitives are implemented directly, so a tool server written once is discoverable by any MCP-compatible agent regardless of which framework the agent runs in.

## Why It's in the Arsenal

The Arsenal documents the recurring decision of where agent orchestration should run. The default answer — a Python service behind an HTTP hop — is fine until the agent sits on a hot request path, at which point the interpreter and the serialisation boundary dominate the budget. ADK for Go makes the other answer practical: agents share the process, the goroutine scheduler and the memory profile of the service that already owns the request.

It also resists the abstraction style that makes multi-agent systems hard to operate. There is no hidden planner loop to reason about; the graph you declare is the graph that executes, which is what makes per-step tracing and token accounting tractable in production.

## Key Features

- MCP implemented natively, so agents can discover, query and invoke external tool servers through a standard interface instead of per-integration glue.
- Tool schemas derived from Go structs, which moves argument-shape errors from runtime deserialisation into the compiler.
- Built-in collaboration patterns for sequential, hierarchical routing and broadcast-style fan-out across sub-agents.
- Gemini and Vertex AI bindings exposing system instructions, safety settings and search grounding.
- Evaluation and testing primitives for asserting agent behaviour against deterministic checks and model-as-judge criteria.

## Architecture / How It Works

The runtime is a loop over an agent definition: assemble the prompt from instructions plus conversation state, call the configured model connector, and dispatch any tool calls the response requests. Each agent can hold a sub-agent list, and the coordination strategies decide whether control passes to one child, several in parallel, or back to the parent after a handoff. Because tools are Go interfaces with typed arguments, the JSON schema handed to the model is generated from the struct and the result is validated on return, so a malformed tool call fails at the boundary rather than inside domain code.

State and context are explicit values rather than implicit framework globals, which is what allows several agent sessions to run concurrently in one process without contention. Model connectors sit behind an interface, so a Gemini call and an OpenAI-compatible endpoint are the same call site with a different implementation.

## Getting Started

Consume the toolkit as a Go module in a new or existing module, then supply credentials for the model backend — a Gemini API key for the direct path, or a Google Cloud project and location for Vertex AI. Define a tool as a typed function, register it on an agent, and run the agent with an initial prompt; the ADK samples in the repository are the fastest way to see the loop, the tool wiring and the multi-agent handoff side by side before adapting them.

## Use Cases

1. Placing a planning agent inside an existing Go API gateway so the request path never leaves the process, with tool calls to internal services expressed as typed interfaces.
2. Fan-out workloads such as per-document extraction or per-ticket triage, where goroutines run hundreds of concurrent agent turns while memory stays predictable.
3. Durable multi-agent topologies where a router agent delegates to specialists over MCP servers that are maintained and versioned independently of the orchestrator.
4. Evaluation harnesses that replay recorded transcripts against a candidate agent definition and assert on tool sequences rather than free text.

## Strengths

- Compile-time validation of tool signatures removes an entire class of runtime failures that other frameworks only discover when a model emits a malformed argument object.
- Goroutines and channels give concurrency without a worker pool, which is the mechanism behind running many agent sessions per process at low memory cost.
- The explicit execution loop keeps prompts, state transitions and stop conditions inspectable, so instrumentation attaches to ordinary code paths.
- MCP support decouples tool servers from the orchestrator's language, letting a Python or TypeScript tool implementation serve a Go agent unchanged.

## Limitations / When NOT to Use

- Ecosystem gravity: vector-store clients, document parsers and evaluation libraries are mostly published for Python first, so each gap becomes a Go client you own and maintain.
- Verbosity is inherent to the language. Declaring a tool, its schema and its validation in Go takes more lines than the equivalent dynamic-language registration, and that cost is paid per tool.
- Fewer community recipes and templates than the established Python frameworks, which shifts more orchestration design onto your team.
- The project is beta, so interfaces can still move between releases; pin the module version and read the release notes before upgrading a production deployment.

## Integration Patterns

Agents typically sit behind an existing HTTP or gRPC service: the handler builds the prompt, the agent runs in-process with tool calls routed to internal APIs, and MCP servers cover third-party capabilities such as search or ticket systems. Telemetry is emitted from the tool boundary and the model connector, which makes latency and token spend attributable per tool rather than per request. For multi-agent designs, keep the router thin — its only job is choosing a specialist — and put domain logic in the leaf agents so that retries and circuit breakers apply where the side effects are.

## Resources

- [GitHub — google/adk-go](https://github.com/google/adk-go)
- [ADK for Go documentation and samples](https://github.com/google/adk-go/tree/main/examples)

## Buzz & Reception

Adoption signals for this entry are repository activity and Google's own documentation rather than independent write-ups: no third-party production account of a Go ADK deployment has been reviewed here. Treat the beta interface as the main risk to verify, and check release cadence before committing a service to it.
