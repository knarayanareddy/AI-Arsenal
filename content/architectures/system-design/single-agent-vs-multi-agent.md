---
id: "single-agent-vs-multi-agent"
title: "Single Agent vs Multi-Agent: When Splitting the Work Actually Helps"
category: "system-design"
decision_type: "progressive"
decision_summary: "Default to one agent with good tools and context management; split into multiple agents only when context isolation, parallelism, or distinct tool/permission domains force it — coordination overhead grows fast."
tags:
  - agents
  - orchestration
  - planning

approaches:
  - name: "Single agent with tools"
    description: "One agent loop owning the whole task, with capability added through tools, retrieval, and context management rather than through additional agents."
    when_to_use:
      - "The task fits in one context window with room for working state — most production agent tasks do"
      - "Steps are sequential and share state, so handing off would mean serializing and re-explaining context between agents"
      - "You are starting: a single agent is the baseline that tells you whether more structure is even needed"
    when_not_to_use:
      - "Independent subtasks could run concurrently and the wall-clock win matters (broad research, fan-out over many files or sources)"
      - "The task accumulates more context than one window holds even with summarization and selective retrieval"
    tradeoffs:
      complexity: "Lowest — one prompt, one loop, one trace to debug; failure analysis stays tractable."
      reliability: "Fewer hand-offs means fewer places for state to be lost or corrupted between steps."
      latency: "Sequential by construction — cannot exploit parallelism across independent subtasks."
      cost: "One context accumulating across steps; long tasks pay growing per-step token costs unless context is actively managed."

  - name: "Orchestrator with subagents (hierarchical)"
    description: "A lead agent decomposes the task and dispatches focused subagents — each with its own clean context, narrow tool set, and defined deliverable — then integrates results."
    when_to_use:
      - "Subtasks are parallelizable and context-heavy: each subagent burns its own window on its slice and returns only a distilled result"
      - "Context isolation is the goal — exploration garbage from one subtask must not pollute the main thread"
      - "Tool or permission domains genuinely differ per subtask (e.g. one subagent with write access, others read-only)"
    when_not_to_use:
      - "Subtasks are tightly coupled and need shared evolving state — hand-off summaries become the bottleneck and error source"
      - "The task is short enough that orchestration overhead (planning, dispatch, integration) exceeds the work itself"
    tradeoffs:
      cost: "Materially higher token spend — every subagent re-establishes context, and orchestrator-side planning/integration adds its own; multi-agent research systems commonly cost several times a single-agent run on the same task"
      latency: "Parallel fan-out can cut wall-clock time substantially on wide tasks, while adding dispatch/integration overhead on narrow ones."
      reliability: "Failure modes multiply: bad decomposition, lost context at hand-offs, duplicated or conflicting subagent work — reliability engineering shifts to the orchestration layer."
      interpretability: "Traces are larger but well-structured: each subagent's work is isolated and independently inspectable."

  - name: "Peer/role-based multi-agent (collaborative)"
    description: "Multiple peer agents with distinct roles (planner/critic/executor, or role-played specialists) interacting through conversation or a shared workspace rather than strict hierarchy."
    when_to_use:
      - "Adversarial or review dynamics measurably help: a separate critic/verifier catching an executor's errors against an objective check"
      - "Workflow mirrors real role separation with different prompts, tools, and permissions per role, and the interaction pattern is fixed rather than emergent"
    when_not_to_use:
      - "Roles are cosmetic — three personas sharing one context and one tool set is a single agent with extra token overhead, not a multi-agent system"
      - "You cannot define objective hand-off or termination criteria; free-form agent conversation without termination conditions produces circular, expensive dialogues"
    tradeoffs:
      cost: "Every inter-agent exchange is paid inference; conversational coordination is the most token-expensive coordination form."
      accuracy: "Genuine generator/verifier separation with an external signal helps; unstructured multi-persona debate shows weak, inconsistent gains over strong single-agent prompting."
      complexity: "Interaction protocols, turn-taking, and termination conditions are all new failure surfaces requiring design and testing."

key_factors:
  - "Context arithmetic: if the task's working set fits one window with summarization, a single agent avoids the entire hand-off problem; if it cannot, subagent isolation is a real mechanism rather than an aesthetic choice"
  - "Parallelizability: fan-out only pays when subtasks are independent — coupled subtasks force serialization through hand-off summaries, which is slower and lossier than one continuous context"
  - "Coordination tax: multi-agent runs cost a multiple of single-agent token spend (subagent context re-establishment plus orchestration); the subtask value must exceed that multiple"
  - "Permission boundaries: distinct tool/access domains per subtask (write vs read-only, prod vs sandbox) are among the strongest genuine reasons to split agents"
  - "Debuggability budget: every added agent multiplies trace complexity; teams without per-step tracing in place will feel multi-agent failures as undiagnosable answer-quality noise"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Designing an agent system"] --> Fit{"Does the working set fit one context window (with summarization/retrieval)?"}
      Fit -->|"Yes"| Par{"Are there independent subtasks where parallel wall-clock time matters?"}
      Fit -->|"No"| Orch["Orchestrator + subagents: isolate context per subtask"]
      Par -->|"No"| Single["Single agent with tools — the default"]
      Par -->|"Yes"| Worth{"Is the wall-clock/isolation win worth a multiple of the token cost?"}
      Worth -->|"No"| Single
      Worth -->|"Yes"| Orch
      Single --> Verify{"Would a separate verifier against an objective check catch real errors?"}
      Verify -->|"Yes"| Peer["Add a critic/verifier role with defined termination"]
      Verify -->|"No"| Single

confidence: "emerging-consensus"
tradeoffs_as_of: "2026-07-07"

approach_implementations:
  - approach_name: "Single agent with tools"
    project_ids:
      - smolagents
      - openai-agents-sdk
    tool_ids: []
    build_example_ids: []
  - approach_name: "Orchestrator with subagents (hierarchical)"
    project_ids:
      - langgraph
      - crewai
    tool_ids: []
    build_example_ids: []
  - approach_name: "Peer/role-based multi-agent (collaborative)"
    project_ids:
      - autogen
    tool_ids: []
    build_example_ids: []

related_decisions:
  - choose-agent-framework
  - choose-memory-solution

common_mistakes:
  - "Reaching for multi-agent as the first architecture because it matches the product vision, before a single agent with good tools has been tried — the single agent is both the baseline that justifies added structure and, for most tasks, the final answer."
  - "Splitting tightly coupled work across agents, then spending the project's complexity budget on hand-off summaries — coupled state serialized through natural-language summaries is lossier and slower than one agent's continuous context."
  - "Creating role-named personas that share one context and one tool set — this is a single agent paying multi-agent token overhead, and the roles add prompt noise instead of isolation."
  - "Running agent-to-agent conversation without objective termination conditions, producing circular dialogues that burn tokens until a step budget kills them — every inter-agent protocol needs a defined done-state and a step cap."
  - "Adopting multi-agent without per-step tracing already in place — when the orchestration layer fails (bad decomposition, lost hand-off context), teams without span-level traces experience it as inexplicable quality regression rather than a diagnosable fault."

added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
enrichment_status: "draft"
---

## Overview

"Should this be one agent or several?" is now the first architecture question in agent system design, and the industry answer has converged after two years of both patterns shipping: single-agent-with-tools is the right default, and multi-agent earns its cost through specific mechanisms — context isolation and parallel fan-out — rather than through the intuition that more agents mean more capability.

## The Decision

This is a progressive decision, not a one-time fork: systems should earn each increment of structure. Start with one agent, good tools, and deliberate context management. Move to an orchestrator-with-subagents shape when a concrete mechanism demands it: the working set exceeds one context window even with summarization, independent subtasks would benefit from parallel execution, or subtasks need different permission boundaries. Add peer roles (critic/verifier) only where a separate check against an objective signal demonstrably catches errors. Each step up multiplies token cost and failure surface, so the burden of proof sits on the more complex architecture — measured on your task, not argued from analogy.

## Decision Framework

The frontmatter decision tree encodes the progression. The three questions that do most of the work, in order: (1) does the working set fit one window — if yes, hand-offs solve a problem you don't have; (2) are subtasks independent enough to parallelize — coupled subtasks serialized through summaries are worse than one continuous context; (3) is the win worth a token-cost multiple — orchestrated multi-agent runs routinely cost several times a single-agent attempt, which is a fine trade on high-value wide research tasks and a poor one on short transactional flows.

## Approach Deep-Dives

**Single agent with tools** is more capable than its reputation: most published multi-agent gains evaporate against a well-prompted single agent with the same tools and disciplined context management, because the hardest part of both architectures — deciding what information the model sees at each step — is identical, and the single agent pays no hand-off tax on it. Frameworks like [smolagents](../../projects/frameworks/smolagents.md) and the [OpenAI Agents SDK](../../projects/frameworks/openai-agents-sdk.md) are deliberately minimal for this reason. **Orchestrator/subagent systems** are the shape behind production deep-research features: subagents spend their own context windows exploring in parallel and return distilled findings, so the orchestrator's context holds conclusions rather than exploration debris. [LangGraph](../../projects/frameworks/langgraph.md) expresses this as explicit graph state; [CrewAI](../../projects/frameworks/crewai.md) as declarative crews. The cost multiple is real and documented across implementations — plan for it in unit economics. **Peer/role-based systems** ([AutoGen](../../projects/frameworks/autogen.md) is the canonical framework) are strongest where the role separation maps to a real verification asymmetry: a critic with test results or schema checks catches what a generator misses. Role-play without an objective signal mostly redistributes the same model's opinions at conversational token prices.

## Common Mistakes

- **Multi-agent-first design.** The single agent is the baseline that justifies structure; skipping it means never learning whether the complexity was needed.
- **Splitting coupled work.** Hand-off summaries are a lossy channel; coupled state belongs in one context.
- **Cosmetic roles.** Personas sharing one context and toolset are overhead, not architecture.
- **Unterminated agent conversation.** Every protocol needs objective done-states and step caps.
- **Multi-agent before tracing.** Orchestration failures without span-level traces present as undiagnosable quality noise.

## When This Guidance Might Be Outdated

Confidence is `emerging-consensus` because the tradeoff arithmetic tracks model properties that are moving: longer effective context windows and better context compression shrink the isolation motive for splitting, while cheaper inference shrinks the cost penalty of fan-out — the two forces push in opposite directions. Agent-to-agent protocol standardization and models RL-trained specifically for orchestration could also materially change hand-off reliability. Re-verify against current model behavior roughly every six months.

## Related Decisions

[Choosing an Agent Framework](../model-selection/choose-agent-framework.md) is downstream: the single-vs-multi shape constrains which frameworks fit (graph-state engines vs minimal loops vs conversation frameworks). [Choosing an Agent Memory Architecture](../data-strategy/choose-memory-solution.md) interacts directly — shared memory stores are one alternative to conversational hand-offs for coordinating multi-agent state.

## Resources

- [smolagents](../../projects/frameworks/smolagents.md)
- [OpenAI Agents SDK](../../projects/frameworks/openai-agents-sdk.md)
- [LangGraph](../../projects/frameworks/langgraph.md)
- [CrewAI](../../projects/frameworks/crewai.md)
- [AutoGen](../../projects/frameworks/autogen.md)

---
*Last reviewed: 2026-07-07 by @maintainer*
