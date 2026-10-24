---
id: adk-python
name: "Google ADK (Agent Development Kit)"
type: tool
job: [orchestration]
description: "Google's code-first Python SDK for building, evaluating and deploying multi-agent systems"
url: "https://github.com/google/adk-python"
cost_model: open-source
pricing_detail: "Apache-2.0 source; model usage is billed by the configured provider, with Gemini as the tuned path"
tags: [agents, orchestration, tool-use, structured-output, cloud]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: "Apache-2.0 source is unrestricted; Gemini or third-party inference is billed per token"
self_hostable: true
open_source: true
source_url: "https://github.com/google/adk-python"
docs_url: null
github_url: "https://github.com/google/adk-python"
alternatives: [adk-go, adk-java]
integrates_with: []
added_date: "2026-10-03"
last_reviewed: "2026-10-03"
added_by: repo-maintainer
reviewed_by: null
verdict: recommended
verdict_rationale: "Plain-Python agent definitions with strong Gemini integration and no proprietary graph DSL; lighter than most orchestration frameworks and correspondingly less batteries-included"
status: active
phase: orchestration
audience: [production, prototype]
best_when:
  - "You want agent definitions expressed as ordinary Python classes and functions, debuggable with pdb and profilers instead of a framework-specific runtime"
  - "Gemini's native tool calling, schema enforcement and context caching are central to your design and you want their fast paths exposed"
avoid_when:
  - "Non-engineers need to assemble or inspect agent flows visually and a drag-and-drop canvas is part of the requirement"
  - "Your existing investment in another orchestration stack already encodes state management you would have to reproduce"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Behaviour described from the ADK repository and documentation; no independent benchmark of the runtime was run for this entry."
buzz_sources: []
---

## Overview

Google's Agent Development Kit is a code-first Python framework for constructing, evaluating and deploying agentic workflows. Its design premise is that orchestration should look like ordinary Python: agents are objects with instructions, tools and optional sub-agents, and control flow is written by the developer rather than inferred from a configuration file or a proprietary graph syntax.

That choice matters more than it sounds. When an execution loop is a normal function, the debugger, the profiler, the mock library and the test runner all keep working, and a stack trace points at the line that failed instead of at a framework-internal scheduler. ADK keeps its multi-agent primitives — handoff, sequential execution, parallel fan-out — visible for the same reason.

Model access sits behind a provider abstraction, so Gemini, OpenAI-compatible endpoints and local models are interchangeable, though the deepest optimisations target Google's own models.

## Why It's in the Arsenal

The Arsenal uses ADK as the reference point for "framework, but not a second platform". Most orchestration libraries either hide the loop behind a graph DSL or grow into a hosted product with its own deployment story; ADK stays a library you import, which is the right shape for teams that already have a service architecture and only need the agent machinery.

Its practical advantage over rolling your own loop is the unglamorous part: tool schema generation from docstrings, argument validation before invocation, session state that survives turns, and an evaluation hook for replaying transcripts.

## Key Features

- Agents, instructions and generation parameters declared as typed Python objects; no YAML, no separate topology file.
- Multi-agent composition with explicit handoff and routing, including sequential and parallel patterns over specialist sub-agents.
- Tool registration from plain functions, with docstring parsing into a callable schema and runtime type validation of arguments.
- Session and memory providers for conversation history and long-term context, pluggable per deployment.
- Provider-agnostic execution with Gemini, OpenAI-compatible endpoints and local models behind one interface.
- A built-in evaluation path for running an agent against defined cases and comparing behaviour across versions.

## Architecture / How It Works

A runner owns the turn loop. It builds the model request from the agent's instruction, the session's event history and the tool declarations, calls the model connector, then interprets the response: text is appended as an event, tool calls are validated against the declared schema and dispatched, and any configured transfer hands the session to a sub-agent and resumes the loop there. Events are the unit of state, so persistence and replay reduce to storing an ordered event log per session.

Memory and session storage are separate interfaces, which is what allows a stateless service to keep durability in Redis or a database while the agent code stays unaware. Because tools are normal Python callables, an authorisation decorator or a rate limiter composes around them the same way it would around any other function.

## Getting Started

Install the package from the repository, then supply model credentials through the environment — a Gemini API key is the documented default path. Declare one agent with an instruction and one tool, attach it to a runner with an in-memory session service, and send a first message from a script or `adk` CLI. The repository's samples are organised by capability, so copying the single-agent sample and adding a sub-agent afterwards is the least confusing route.

## Use Cases

1. A research assistant that decomposes a question, dispatches sub-questions to parallel specialist agents and assembles a cited answer.
2. Internal tooling where the agent calls existing Python functions directly — a database query helper, an internal API client — with schema validation preventing malformed arguments from reaching them.
3. Evaluation harnesses that replay a fixed case set through the runner and compare tool-selection sequences across prompt revisions.
4. Serving a conversational surface behind FastAPI, using a persistent session service so conversations survive process restarts.

## Strengths

- Debuggability follows from the design: breakpoints, profilers and mocks work because nothing is hidden behind a compiled graph runtime.
- Schema generation from docstrings keeps documentation and the model-facing contract in sync, removing a common source of silent tool-call failures.
- The session event log is a clean persistence boundary, so durability and replay are storage problems rather than framework problems.
- Deployment is ordinary Python packaging; there is no separate control plane to operate.

## Limitations / When NOT to Use

- No visual builder: teams that need non-engineers to inspect or edit flows will be wiring their own rendering on top.
- Release cadence is fast and the framework is beta, so minor upgrades have historically carried interface changes; pin and read release notes.
- The Gemini-specific optimisations — context caching, structured-output guarantees — degrade on other providers, so a multi-vendor deployment gets the lowest common denominator.
- Evaluation tooling is thinner than dedicated eval frameworks, so teams with mature eval needs will still add one.

## Integration Patterns

Wrap the runner behind your existing API layer and keep session state in the store you already operate; the agent then scales like any other stateless service. Tools should be thin adapters over service clients so retries and timeouts stay in one place, and authorisation belongs in the tool wrapper where the caller's identity is still available. For observability, hook the runner's event stream and emit one span per model turn and one per tool call, which separates model latency from tool latency without instrumenting each agent.

## Resources

- [GitHub — google/adk-python](https://github.com/google/adk-python)
- [ADK documentation](https://google.github.io/adk-docs/)

## Buzz & Reception

Signals for this entry come from Google's documentation and repository activity; no independent production post-mortem or third-party benchmark is recorded here. The claim worth testing yourself is that the code-first loop really does reduce debugging time at your team's scale — that is measurable against your own incident history.
