---
id: wu-2023-autogen
title: "AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation"
phase: agents-and-reasoning
venue: arxiv-preprint
year: 2023
authors:
  - "Wu, Q."
  - "Bansal, G."
  - "Zhang, J."
  - "Wu, Y."
  - "et al."
arxiv_id: "2308.08155"
arxiv_url: "https://arxiv.org/abs/2308.08155"
pdf_url: "https://arxiv.org/pdf/2308.08155"
code_url: "https://github.com/microsoft/autogen"
venue_url: "https://arxiv.org/abs/2308.08155"

practical_applicability: high
reproduction_status: code-available
result_status: current
has_code: true
citation_count_approx: 3000

tldr: "Framed LLM applications as conversations among configurable agents (including tool-using and human-proxy agents), providing a general multi-agent programming model that became a widely-used agent framework"
key_contribution: "A unified abstraction where customizable, conversable agents (LLM-backed, tool-backed, or human) coordinate by exchanging messages, letting complex workflows be composed as multi-agent conversations"

builds_on: []
implemented_in: []

tags:
  - agents
  - llm
  - orchestration
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

AutoGen proposed building LLM applications as conversations among multiple configurable agents. Each agent is "conversable" (it sends and receives messages) and "customizable" (its behavior can be backed by an LLM, by tools/code execution, by a human, or a mix). Complex tasks are then expressed as a structured multi-agent chat — for example an assistant agent that proposes code and a user-proxy agent that executes it and returns results, iterating until done. The paper's framing and the accompanying open-source framework (Microsoft AutoGen) made multi-agent orchestration a mainstream pattern and gave it a concrete programming model.

## Why it's in the Arsenal

- Multi-agent orchestration is a major design pattern for agentic systems, and AutoGen is one of its most influential frameworks; understanding its abstractions clarifies how to structure agent collaboration.
- Its assistant + user-proxy (code-executing) loop is a canonical, reusable pattern for tool-use and self-correcting code generation.
- `practical_applicability: high` — the framework is actively used to build agent applications, and the conversation abstraction transfers even if you use a different library.

## Core Contribution

AutoGen's contribution is an abstraction, not a single algorithm: a *conversable agent* interface plus *conversation programming*. Agents expose a uniform message-passing interface and can be composed into conversations with defined roles and termination conditions. Because an agent's "backend" is pluggable — an LLM, a code executor, a retrieval tool, or a human-in-the-loop proxy — the same framework expresses solo tool-using agents, two-agent assistant/executor loops, and group chats with many specialized agents and a manager that routes turns. Control flow can be steered by natural-language instructions, by code, or by both, so developers program *who talks to whom, when, and with what tools* rather than hand-coding a monolithic prompt. This unification is what makes diverse agent workflows expressible in one system.

## Key Results

- Demonstrated across diverse applications — math problem solving, coding, question answering, decision-making, and multi-agent group chat — that the same abstraction handles varied workflows (2023)
- Showed the assistant + user-proxy code-execution loop improves task completion via automatic execution and feedback rather than one-shot generation
- The accompanying open-source framework saw rapid, large-scale adoption, evidence the abstraction resonated with practitioners
- These are demonstration-style results (the paper is a framework paper), so treat them as illustrative of the programming model's generality rather than as head-to-head benchmark wins.

## Methodology

The paper defines the conversable-agent interface and conversation-programming model, then presents case studies applying it to multiple task types, comparing configurations (single-agent vs multi-agent, with/without code execution and human feedback). Because it is primarily a systems/framework contribution, evaluation is qualitative and application-driven, illustrating flexibility and where multi-agent decomposition helps, rather than reporting a single leaderboard metric.

## Practical Applicability

AutoGen is a build-with-it framework. Common practical uses: an assistant agent that writes code paired with a user-proxy agent that executes it and feeds back errors (a robust pattern for code tasks); group chats of specialized agents (planner, coder, critic) coordinated by a manager; and human-in-the-loop agents for approval gates. Even outside the library, the conversable-agent + termination-condition + tool/human-backed-agent framing is a clean mental model for designing agent systems. Watch cost and loop-termination carefully — multi-agent conversations multiply token usage.

## Limitations & Critiques

- Multi-agent conversations can be expensive and slow (many LLM calls) and can loop or drift without careful termination conditions and guardrails — a single-agent design is often cheaper and sufficient.
- Reliability depends heavily on prompt/role design; the framework provides structure but not guaranteed correctness.
- Automatic code execution introduces security concerns (sandboxing is essential).
- As a fast-moving framework, APIs have evolved significantly since the paper, so specifics may differ from the current library.

## Reproductions & Follow-up Work

The open-source framework is the reference implementation and is actively maintained (its architecture has been substantially revised since the paper). It sits alongside other agent frameworks and multi-agent works (e.g. MetaGPT), and builds on tool-use and reasoning ideas from [ReAct](./yao-2022-react.md) and [Toolformer](./schick-2023-toolformer.md). The catalog's single-agent-vs-multi-agent architecture guidance discusses when this pattern pays off.

## Relation to the Arsenal

- Foundational reference for the catalog's agent-orchestration tools and multi-agent architecture decisions.
- Pairs with [ReAct](./yao-2022-react.md) (single-agent reason+act loop), [Gorilla](./patil-2023-gorilla.md) (accurate tool/function calling), and the catalog's single-agent-vs-multi-agent decision entry.

## Resources

- [arXiv abstract](https://arxiv.org/abs/2308.08155)
- [PDF](https://arxiv.org/pdf/2308.08155)
- [AutoGen (microsoft/autogen)](https://github.com/microsoft/autogen)
