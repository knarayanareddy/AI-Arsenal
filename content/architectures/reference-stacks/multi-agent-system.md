---
id: "multi-agent-system"
title: "Multi-Agent System Stack vs Single-Agent Loop: When Role Decomposition Is Worth It"
category: "reference-stacks"
decision_type: "progressive"
decision_summary: "Adopt the multi-agent stack (LangGraph supervisor, typed tools, memory, human review) for long-running, multi-stage tasks needing approval/rollback — start with a single-agent loop for simpler tasks."
tags:
  - agents
  - orchestration
  - planning
  - memory

approaches:
  - name: "Multi-Agent System Stack"
    description: "A supervised multi-agent architecture (LangGraph as control plane, role-decomposed agents for planning/research/execution/review, typed tool contracts, layered memory, and full observability) for tasks requiring explicit multi-stage state and human review points."
    when_to_use:
      - "The task genuinely spans multiple stages with distinct responsibilities (planning, research, execution, review), not just a single tool-calling loop"
      - "Workflows require approval or rollback points before high-impact actions execute"
      - "Tool calls must be validated and fully traced, not just executed and logged after the fact"
    when_not_to_use:
      - "The task is a simple chatbot or single-step workflow — this stack's role decomposition and state management are pure overhead for that shape of problem"
      - "The task has no clear, checkable success criteria — multi-agent orchestration doesn't fix an ill-defined problem, it just adds structure around one"
      - "Autonomous actions in the workflow cannot be safely sandboxed — this stack assumes tool execution is validated and reversible where it matters, not a substitute for that safety work"
    tradeoffs:
      cost: "$20-$150/month at hobbyist scale, $500-$3,000/month at small-startup scale, $3,000+ at real scale — driven by token volume across multiple agent roles (each stage is its own LLM call), trace/eval volume, and human-review operational cost."
      complexity: "Higher than a single-agent loop by design — explicit state, role decomposition, typed tool contracts, and layered memory are each real components, justified specifically by multi-stage task structure and safety requirements."
      reliability: "Explicit state and checkpointing (via LangGraph) support resumable, auditable multi-step runs — a real reliability advantage for long-running tasks over an implicit single-loop agent."

  - name: "Single-Agent Loop (see Simple ReAct Agent / Multi-Tool Agent)"
    description: "A single agent with a bounded tool-calling loop, without role decomposition into separate planner/researcher/writer/reviewer stages — see the agent-systems build examples for what this looks like concretely."
    when_to_use:
      - "The task is a single-stage, bounded tool-calling problem, not a genuinely multi-stage workflow"
    when_not_to_use:
      - "The task has genuinely distinct stages (plan, research, execute, review) that benefit from separate permission scopes and state tracking"
    tradeoffs:
      complexity: "Lower — a single agent loop with a step budget is meaningfully simpler to build, debug, and reason about than a multi-role graph."
      cost: "Lower per-task cost, since only one agent role's LLM calls are involved, not several."

key_factors:
  - "Task stage count: a genuinely multi-stage task (plan, research, execute, review) favors the multi-agent stack; a single bounded loop does not need it"
  - "Approval/rollback requirement: any workflow needing a human checkpoint before high-impact actions strongly favors the multi-agent stack's explicit review stage"
  - "Success criteria clarity: multi-agent orchestration adds structure but does not substitute for a genuinely well-defined success criterion — an ill-defined task fails either way"
  - "Tool safety: actions that can't be safely sandboxed need real safety engineering regardless of which agent architecture is chosen, not just more orchestration structure"
  - "Cost tolerance: multi-agent stacks multiply LLM calls per task (one per role, potentially per loop iteration) — cost-sensitive applications should weight this heavily"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Choosing single-agent vs multi-agent"] --> Stages{"Does the task have genuinely distinct stages (plan/research/execute/review)?"}
      Stages -->|"No, single bounded loop"| SingleAgent["Use a single-agent loop (see Simple ReAct Agent / Multi-Tool Agent build examples)"]
      Stages -->|"Yes"| Approval{"Needs human approval/rollback before high-impact actions?"}
      Approval -->|"Yes"| MultiAgent["Use the Multi-Agent System Stack"]
      Approval -->|"No, but still multi-stage"| Complexity{"Is the multi-stage structure complex enough to warrant separate roles/permissions?"}
      Complexity -->|"Yes"| MultiAgent
      Complexity -->|"No"| SingleAgent

confidence: "evolving"
tradeoffs_as_of: "2026-07-06"

approach_implementations:
  - approach_name: "Multi-Agent System Stack"
    project_ids:
      - langgraph
      - crewai
      - metagpt
    tool_ids:
      - instructor
      - pydantic-ai-tool
      - redis-memory
      - langfuse
    build_example_ids:
      - advanced-multi-agent-research
  - approach_name: "Single-Agent Loop (see Simple ReAct Agent / Multi-Tool Agent)"
    project_ids:
      - langgraph
    tool_ids: []
    build_example_ids:
      - starter-simple-react-agent
      - intermediate-multi-tool-agent

related_decisions:
  - choose-agent-framework
  - choose-memory-solution

common_mistakes:
  - "Adopting full multi-agent role decomposition for a task that is actually a single bounded tool-calling loop, multiplying LLM cost and debugging surface for no corresponding benefit — see starter-simple-react-agent and intermediate-multi-tool-agent for what the simpler shape actually looks like before assuming you need the full multi-agent stack."
  - "Building multi-agent orchestration around a task with no clear success criteria, expecting the orchestration structure itself to compensate for an ill-defined problem — it doesn't; a poorly specified task fails in a multi-agent system too, just with more moving parts to debug."
  - "Treating this stack's human-review stage as decorative rather than a real safety gate — the getting-started guidance explicitly says 'add human approval before high-impact actions,' and skipping this while keeping the rest of the stack undermines its core safety rationale."

added_date: "2026-06-13"
last_reviewed: "2026-07-06"
added_by: "maintainer"
status: "active"
enrichment_status: "reviewed"
---

## Overview

This reference stack is an opinionated baseline for complex task automation requiring multiple AI roles and durable state — it prioritizes controllability over agent novelty, using typed tool contracts to reduce unsafe execution and separating short-term state from long-term memory. It is a strictly heavier architecture than a single-agent loop, and that added weight should be justified by genuine task structure, not adopted as a default "more sophisticated must be better" choice.

## The Decision

The forcing function for this stack is genuine multi-stage task structure — distinct planning, research, execution, and review responsibilities that benefit from separate state tracking and, often, separate permission scopes. If a task is actually a single bounded tool-calling loop, the multi-agent stack's role decomposition adds cost and debugging surface without a corresponding benefit; see [Simple ReAct Agent](../../build-examples/agent-systems/starter-simple-react-agent.md) and [Multi-Tool Agent](../../build-examples/agent-systems/intermediate-multi-tool-agent.md) for what that simpler shape looks like concretely before assuming you need the full stack described here.

## Decision Framework

| Layer | Tool | Why This Choice |
|---|---|---|
| Orchestration | LangGraph | Explicit graph state, branching, retries, and human-in-the-loop |
| Role Patterns | CrewAI / MetaGPT patterns | Useful mental model for role decomposition |
| LLM | Hosted model or self-hosted Qwen/Llama | Quality-first for planning; self-host where privacy requires |
| Tools | Instructor / Pydantic AI | Typed tool inputs and structured outputs |
| Memory | Redis + Mem0/Zep as needed | Fast state plus optional long-term semantic memory |
| Observability | LangSmith or Langfuse | Trace agent steps, tool calls, and eval outcomes |

```mermaid
flowchart TD
    USER[User task] --> GRAPH[LangGraph supervisor]
    GRAPH --> PLAN[Planner agent]
    GRAPH --> RESEARCH[Research agent]
    GRAPH --> EXEC[Execution agent]
    GRAPH --> REVIEW[Reviewer / human approval]
    EXEC --> TOOLS[Typed tools]
    GRAPH --> MEM[Redis / Mem0 / Zep]
    GRAPH --> OBS[LangSmith / Langfuse]
    PLAN --> LLM[LLM]
    RESEARCH --> LLM
    EXEC --> LLM
    REVIEW --> USER
```

Getting started:
```bash
pip install langgraph langfuse instructor redis
# Model roles first, then state transitions, then tools, then memory.
# Add human approval before high-impact actions.
```

## Approach Deep-Dives

**The multi-agent system stack** is justified specifically by multi-stage task structure that benefits from separate roles, separate permission scopes, and explicit review checkpoints — [Multi-Agent Research System](../../build-examples/agent-systems/advanced-multi-agent-research.md) shows this pattern concretely with a planner/researcher/writer/reviewer graph and a bounded review-retry loop. **A single-agent loop** covers a large share of real agent use cases more simply and cheaply — the temptation to reach for full role decomposition before confirming a task actually needs it is one of this stack's most common misapplications.

## Common Mistakes

- **Adopting full role decomposition for a single bounded tool-calling task.** This multiplies cost and debugging surface for no benefit — start with the simpler shape.
- **Expecting orchestration structure to compensate for an ill-defined success criterion.** It doesn't; a poorly specified task fails in a multi-agent system too, with more moving parts.
- **Treating the human-review stage as decorative.** The stack's own guidance calls for human approval before high-impact actions — skipping this undermines its safety rationale.

## When This Guidance Might Be Outdated

Confidence is `evolving` because agent framework APIs and multi-agent orchestration patterns are changing quickly across the ecosystem (see [Choosing an Agent Framework](../model-selection/choose-agent-framework.md) for specific examples of recent API churn) — this stack's specific component recommendations should be re-checked against current framework versions at each review.

## Related Decisions

Directly related to [Choosing an Agent Framework](../model-selection/choose-agent-framework.md) (this stack's orchestration layer is a specific instance of that decision) and [Choosing an Agent Memory Architecture](../system-design/choose-memory-solution.md) (this stack's memory layer choice follows that decision's framework directly).

## Resources

- [LangGraph](../../projects/frameworks/langgraph.md)
- [CrewAI](../../projects/frameworks/crewai.md)
- [MetaGPT](../../projects/frameworks/metagpt.md)
- [Instructor](../../tools/dx-and-tooling/instructor.md)
- [Pydantic AI](../../tools/orchestration/pydantic-ai-tool.md)
- [Redis](../../tools/orchestration/redis-memory.md)
- [Langfuse](../../projects/benchmarks-and-evals/langfuse.md)

---
*Last reviewed: 2026-07-06 by @maintainer*
