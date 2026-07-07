---
id: "agent-design"
title: "Agent Design"
entry_type: "guide"
section: "skills"
description: "The skill of designing reliable LLM agents: tool interfaces, control loops, guardrails, and failure recovery"
tags:
  - agents
  - tool-use
  - planning
  - orchestration
related_entries: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

Agent design is the skill of building LLM systems that take actions — calling tools, iterating on results, and deciding when to stop. The design decisions that matter are unglamorous: tool interface shape, loop budgets, state management, and what happens when a step fails.

## Why It's in the Arsenal

The gap between an agent demo and a production agent is entirely design discipline. The reasoning patterns (ReAct-style loops) are commodity; reliability comes from constraints the designer imposes around them.

## Key Features

### Core Concepts

- An agent is a loop: model proposes an action → runtime executes → result feeds back → repeat until done or budget exhausted. Everything else is elaboration.
- Tool design dominates agent quality: few, well-described, hard-to-misuse tools beat many overlapping ones; validate arguments before executing.
- Budgets are non-negotiable: max steps, max retries per tool, max cost per run — unbounded loops are the canonical agent failure.
- State must be externalized and checkpointed; the context window is not a database.
- Autonomy is graded: irreversible actions (sends, deletes, payments) require approval gates; everything else can be autonomous.

### Practical Workflow

1. Start with a single agent and the minimum tool set; add multi-agent structure only when a single context demonstrably cannot hold the job.
2. Write machine-checkable success criteria before writing the loop.
3. Add budgets, retries with fallbacks, and a kill switch on day one.
4. Log every state transition and tool I/O — agents are undebuggable without traces.
5. Eval on end-to-end task completion, not per-step plausibility.

## Architecture / How It Works

The runtime holds the loop, the tool registry, and the state store; the model only ever sees an assembled context and returns a proposed action. Keeping the model stateless against an externalized state store is what makes agents recoverable, replayable, and testable.

## Getting Started

```text
Minimum production agent checklist:
[ ] max_steps and per-tool retry caps
[ ] argument validation before every tool execution
[ ] approval gate for irreversible actions
[ ] checkpointed state after each tool call
[ ] machine-checkable success criteria
[ ] full trace logging
```

## Use Cases

1. **Scenario**: A support agent that must look up orders, draft refunds, and escalate — with refunds gated on approval
2. **Scenario**: A research agent that browses and synthesizes, bounded by cost and step budgets
3. **Scenario**: Deciding whether a workflow needs an agent at all, or just a fixed pipeline

## Strengths

- Design constraints transfer across frameworks — the checklist outlives the tooling
- Bounded agents fail cheaply and recoverably
- Clear autonomy grading makes agents deployable in risk-averse environments

## Limitations / When NOT to Use

- If the task decomposes into a fixed sequence, a pipeline is cheaper, faster, and more reliable than an agent
- Multi-agent architectures multiply failure modes; exhaust single-agent designs first
- Agent evals are immature — budget real effort for end-to-end testing

## Integration Patterns

- Choose a framework with [choose an agent framework](../../architectures/model-selection/choose-agent-framework.md); [LangGraph](../../projects/frameworks/langgraph.md), [PydanticAI](../../projects/frameworks/pydantic-ai.md), and [OpenAI Agents SDK](../../projects/frameworks/openai-agents-sdk.md) are cataloged options.
- Apply the agents-and-orchestration tips: [max step budgets](../../tips-and-tricks/agents-and-orchestration/add-a-max-step-budget-to-every-agent.md), [approval for irreversible actions](../../tips-and-tricks/agents-and-orchestration/require-human-approval-for-irreversible-actions.md), [validate tool arguments](../../tips-and-tricks/agents-and-orchestration/validate-tool-arguments-before-execution.md).
- Study the loop's origins in [ReAct](../../research/agents-and-reasoning/yao-2022-react.md) and [Toolformer](../../research/agents-and-reasoning/schick-2023-toolformer.md).

## Resources

- [ReAct paper](../../research/agents-and-reasoning/yao-2022-react.md)
- [SWE-agent paper](../../research/agents-and-reasoning/yang-2024-swe-agent.md)
- [Agent Builder learning path](../learning-paths/agent-builder.md)
- [Multi-agent reference stack](../../architectures/reference-stacks/multi-agent-system.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-07-07 by @maintainer*
