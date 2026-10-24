---
id: harness-sdk
name: "Harness SDK"
type: tool
job: [orchestration]
description: "Dual-language SDK for stateful agent harnesses with MCP tooling and multi-cloud model failover"
url: "https://github.com/strands-agents/harness-sdk"
cost_model: open-source
pricing_detail: "Apache-2.0 source; you pay whichever provider or Bedrock account backs the configured model"
tags: [agents, orchestration, tool-use, stateful, cloud]
maturity: beta
stack: [python, typescript]
free_tier: true
free_tier_limits: "Apache-2.0 source with no usage limits; inference cost depends on the configured provider"
self_hostable: true
open_source: true
source_url: "https://github.com/strands-agents/harness-sdk"
docs_url: null
github_url: "https://github.com/strands-agents/harness-sdk"
alternatives: [beeai-framework, adk-python]
integrates_with: []
added_date: "2026-10-08"
last_reviewed: "2026-10-08"
added_by: repo-maintainer
reviewed_by: null
verdict: recommended
verdict_rationale: "Exposes the control loop instead of hiding it, with Python and TypeScript parity; the price is boilerplate and a beta interface that still moves"
status: active
phase: orchestration
audience: [production]
best_when:
  - "Agents must run on two runtimes — a Python data service and a Node backend — sharing one set of tool contracts and execution semantics"
  - "You need to pause, inspect and resume runs at step granularity, which requires the harness rather than the agent to own the loop"
avoid_when:
  - "One completion against one provider is the whole requirement, where a thin client is smaller and faster to ship"
  - "You want a framework that decides agent behaviour for you rather than exposing every transition as code you write"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Design described from the repository and documentation; dual-runtime parity and failover behaviour were not exercised for this entry."
buzz_sources: []
---

## Overview

Harness SDK treats the agent as something it runs, not something it is. The SDK supplies the execution environment — the control loop, state machine, memory handling, tool dispatch and model routing — and the application supplies the agent's instructions and tools. That inversion is the point: when the harness owns the loop, pausing a run, replaying a step and switching provider mid-flight become supported operations rather than framework internals you reach into.

It ships as two SDKs with the same surface, Python and TypeScript, so the same agent pattern can run in a data pipeline and a Node service without two incompatible mental models.

Tool execution is standardised through Model Context Protocol, which decouples the tool catalogue from the model provider and keeps a growing set of integrations usable across agents.

## Why It's in the Arsenal

The Arsenal separates orchestration frameworks by how much they decide for you. At one end an agent is a config file; at the other it is a graph you draw. Harness SDK sits at the explicit end while still providing the operational furniture — retries, failover, state persistence — that teams otherwise rebuild.

It is also the entry that makes the two-runtime question concrete. Most catalogued options are Python-only, which turns a polyglot organisation into one where every AI feature needs a Python service.

## Key Features

- A stateful harness interface over the execution lifecycle, including step-level pause, resume and inspection.
- Native MCP client behaviour, so any local or remote MCP server becomes a tool source without custom glue.
- Provider routing across OpenAI, Anthropic and Bedrock with failover, rate-limit handling and runtime switching.
- Structured context and memory management intended to stop context bloat across long multi-turn runs.
- Typed SDKs in Python and TypeScript with matching API contracts.

## Architecture / How It Works

The harness owns a run: it assembles the prompt from instructions, memory and the current turn, selects a provider, executes the model call, dispatches any tool requests through MCP clients, and commits the resulting state transition. Because each step is a committed transition, an interrupted run resumes from the last completed step rather than restarting the conversation, and a debugging session can single-step the same run.

Provider selection is a routing decision inside the harness, so a rate limit or outage triggers a fallback rather than an exception. MCP sits between the agent and its tools, which means the tool's transport — stdio locally, HTTP remotely — is the harness's problem, not the agent author's.

## Getting Started

Define one tool against an MCP server and run a single agent with a step budget, then inspect the committed transitions; that exercise shows whether the harness's granularity matches how you intend to debug. Add the second runtime only after the first is working, since parity is the feature that most benefits from a reference implementation you already understand.

## Use Cases

1. A Node backend and a Python batch job running the same support-triage agent, with one tool contract shared through MCP.
2. Long-running research or migration tasks that must survive pod restarts, resuming from the last committed step.
3. Multi-cloud deployments where Bedrock is primary and a hosted provider is the fallback during regional incidents.
4. Security-sensitive workflows that pause for human approval at a specific transition instead of running to completion.

## Strengths

- Owning the loop is what makes deterministic replay and step debugging possible; frameworks that hide it cannot offer either.
- MCP as the tool boundary means the integration catalogue grows independently of the SDK release cycle.
- Dual-runtime parity removes the "which team owns the Python service" negotiation from polyglot organisations.
- Provider failover is built into routing, so model outages degrade throughput rather than stopping the workload.

## Limitations / When NOT to Use

- Explicit control means explicit code: a first agent needs drivers, tools, state and memory wired by hand before it does anything.
- The framework is beta and moving, so version pinning and upgrade testing are a standing cost.
- Distributed state synchronisation adds latency and invites race conditions unless persistence and locking are designed deliberately.
- It supplies execution, not opinion: teams expecting ready-made agent behaviours will find it thin.

## Integration Patterns

Persist harness state in the same store as the rest of your application so resumption shares the operational story, and give every run an identifier that appears in logs and traces. Expose tools through MCP servers owned by the teams that maintain the underlying system; that keeps credentials and rate limits inside the owning service. For approval gates, model the pause as a transition the harness can hold indefinitely rather than a blocking call in the agent.

## Resources

- [GitHub — strands-agents/harness-sdk](https://github.com/strands-agents/harness-sdk)

## Buzz & Reception

The entry follows the project's own documentation; no independent production deployment is recorded, and beta status makes the interface a moving target. The property worth verifying first is parity — whether a non-trivial agent really behaves the same on both runtimes.
