---
id: langroid
name: "Langroid"
type: tool
job: [orchestration]
description: "Python multi-agent framework built on message passing, with Pydantic-validated tool calls and built-in RAG"
url: "https://github.com/langroid/langroid"
cost_model: open-source
pricing_detail: "MIT-licensed source; model inference is billed by whichever provider each agent is configured to use"
tags: [agents, orchestration, tool-use, rag, retrieval]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: "MIT source with no usage limits; inference cost depends on the models each agent calls"
self_hostable: true
open_source: true
source_url: "https://github.com/langroid/langroid"
docs_url: null
github_url: "https://github.com/langroid/langroid"
alternatives: [langgraph, openagents]
integrates_with: []
added_date: "2026-10-09"
last_reviewed: "2026-10-09"
added_by: repo-maintainer
reviewed_by: null
verdict: recommended
verdict_rationale: "Message-passing agents with typed tool schemas are easier to reason about than a graph DSL; the cost is a smaller integration catalogue and a paradigm shift for the team"
status: active
phase: orchestration
audience: [production, prototype]
best_when:
  - "Several agents with independent state must hand work to each other, and you want that routing expressed as ordinary Python rather than a declared graph"
  - "Tool arguments need validation before execution, so malformed model output must fail at a typed boundary instead of inside business logic"
avoid_when:
  - "You need a fortnight prototype of one prompt against one model, where the agent abstraction costs more than it returns"
  - "Your team works outside Python and cannot adopt a library that has no other runtime"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Design described from the repository and documentation; no multi-agent deployment was built or benchmarked for this entry."
buzz_sources: []
---

## Overview

Langroid models a multi-agent system the way an actor system models a service mesh: each agent is an autonomous object holding its own model configuration, conversation state, tool set and vector store, and agents exchange structured messages rather than sharing a global context. The framework is small and readable on purpose — the argument being that orchestration code you can step through beats a framework you have to learn.

Two primitives carry the design. `ChatAgent` is the participant: it owns a prompt, history and tools. `Task` is the loop that routes messages between the agent, the user, tools and child tasks, which is where delegation, termination conditions and human-in-the-loop pauses are expressed.

Tool definitions are Pydantic models, so the schema handed to the model and the validation applied to its output come from one declaration.

## Why It's in the Arsenal

The Arsenal documents orchestration as a spectrum with two visible ends: graph-declared workflows that are explicit but verbose, and framework-driven agents that are terse but opaque. Langroid is the third position — explicit message routing without declaring every edge up front — and it is the one that fits iterative and conversational work with people in the loop.

It is also a useful reference for tool safety. Typed tool payloads with structured errors the agent can read and correct is a pattern worth copying regardless of which framework a team ends up on.

## Key Features

- `ChatAgent` instances that keep isolated state, preventing context bleeding between collaborators in one task network.
- `Task` loops handling delegation to sub-tasks, context-window management and return routing to the parent.
- Tools declared by subclassing `ToolDoc`, with schemas generated for provider function calling and payloads validated on the way back.
- A `DocChatAgent` configuration that wires document parsing, chunking, embedding and retrieval over Qdrant, Chroma or LanceDB.
- Provider coverage through LiteLLM and direct Ollama support, so different agents in one network can run different models.
- Retry and rate-limit handling as framework behaviour rather than per-call boilerplate.

## Architecture / How It Works

A task drives a loop: it formats the current message history, calls the agent's model, then dispatches whatever the response requests. A tool call is validated against its Pydantic schema; a validation failure becomes a structured error message appended to the conversation, which the model sees on the next turn and can correct. A delegation is a nested task, so the child's messages are handled by the child's loop and only the result returns to the parent.

Because each agent owns its vector store handle and model client, retrieval and inference configuration are per-participant rather than global — the mechanism that lets a cheap model route and an expensive model reason inside the same workflow.

## Getting Started

Install the package, set the provider keys you intend to use, and build a single `ChatAgent` with one `ToolDoc` subclass before adding a second agent. The documentation's examples progress from a lone agent through a task with a sub-agent to a retrieval-backed agent; following that order makes the message routing observable at each step rather than arriving at a network of agents all at once.

## Use Cases

1. A research task where a lead agent decomposes a question, delegates to specialist sub-agents and reconciles their answers.
2. An internal workflow that pauses for human approval before executing a tool with side effects, using the task loop's interrupt points.
3. Document Q&A over a private corpus, with a retrieval agent whose vector store is scoped to the requesting team.
4. Migration off a graph framework: expressing an existing workflow as message passing to see whether the explicit edges were doing any work.

## Strengths

- State isolation per agent is enforced by construction, which removes the context-pollution bugs that plague shared-memory designs.
- Pydantic schemas give one declaration for both the model-facing JSON schema and runtime validation, so the two cannot drift.
- Delegation is dynamic: the routing decision happens from conversation content and tool results rather than from pre-declared edges.
- The codebase is small enough to read, which shortens the path from a confusing trace to an explanation.

## Limitations / When NOT to Use

- Python only; teams on other runtimes cannot reuse the primitives.
- Message-passing is a genuine paradigm shift, and engineers used to linear scripting will spend the first week reasoning about loop structure.
- The integration catalogue is far smaller than the larger frameworks', so niche SaaS connectors are tools you write.
- For single-call work the abstraction is pure overhead: an agent, a task and a tool declaration to wrap one completion.

## Integration Patterns

Embed tasks inside existing services and let the outer application own retries and persistence; the task loop is not a job queue. Where a tool has side effects, put idempotency keys in the tool implementation rather than relying on the orchestrator not to retry. For observability, log each message with its sender and task nesting depth — that trace is what makes a delegation storm visible before it becomes a token bill.

## Resources

- [GitHub — langroid/langroid](https://github.com/langroid/langroid)
- [Langroid documentation](https://langroid.github.io/langroid/)

## Buzz & Reception

The entry follows the project's own documentation and source; no independent production case study is recorded here. The claim worth testing is that message passing reduces the debugging cost of multi-agent work — measurable by comparing incident time against your current framework.
