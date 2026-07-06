---
id: "choose-agent-framework"
title: "Choosing an Agent Framework: State Model, Language, and Provider Constraints"
category: "model-selection"
decision_type: "fork"
decision_summary: "Choose an agent framework by primary language, how explicit you need state/control flow to be, and whether you're building provider-native — not by feature-list comparison."
tags:
  - agents
  - orchestration
  - planning
  - tool-use

approaches:
  - name: "Explicit State Graph (LangGraph)"
    description: "Model agent behavior as a directed graph of nodes and edges with explicit, inspectable state at every step, supporting branching, retries, and human-in-the-loop interruption as first-class constructs."
    when_to_use:
      - "You need explicit control over branching, retries, and human-in-the-loop interruptions rather than an implicit conversational loop"
      - "Production durability (checkpointing, persistence, resuming after failure) matters more than minimal setup"
      - "The workflow genuinely has multiple distinct states/stages, not just a single tool-calling loop"
    when_not_to_use:
      - "The task is a simple, single-prompt or single-tool-loop agent where explicit graph construction is unnecessary overhead"
      - "The team wants a higher-level, less explicit abstraction and is willing to trade control for less setup"
    tradeoffs:
      complexity: "Higher upfront modeling effort (defining nodes, edges, state schema) in exchange for explicit control over every transition."
      flexibility: "High — branching, loops, and interruption points are all first-class, not workarounds."
      reliability: "Checkpointing and persistence are built in, supporting resumable, production-durable agent runs."

  - name: "Role-Based Multi-Agent (CrewAI, MetaGPT patterns)"
    description: "Model agent behavior as a team of role-scoped agents (planner, researcher, writer, reviewer) with a higher-level abstraction than an explicit state graph."
    when_to_use:
      - "The problem naturally decomposes into distinct roles/responsibilities and a role-based mental model speeds up both design and onboarding new team members"
      - "You want less boilerplate than an explicit graph for a role-decomposition pattern that fits the framework's built-in abstractions well"
    when_not_to_use:
      - "The workflow needs fine-grained control over state transitions that don't map cleanly onto the role abstraction"
      - "You need the durability/checkpointing guarantees of an explicit graph framework for production reliability"
    tradeoffs:
      complexity: "Lower setup complexity than an explicit graph for role-shaped problems; higher complexity than a graph framework once you need to escape the role abstraction for edge cases."
      flexibility: "Good fit for problems that are naturally role-shaped; more awkward for problems that aren't."

  - name: "Provider-Native SDK (OpenAI Agents SDK, Google ADK, Microsoft Agent Framework)"
    description: "Use the agent framework maintained by the same provider as your primary model/cloud platform, optimized for tight integration with that provider's tools and ecosystem."
    when_to_use:
      - "You are already committed to a specific provider ecosystem (OpenAI, Google/Gemini, Microsoft/Azure/.NET) and want the officially maintained, tightly integrated path"
      - "Enterprise constraints favor a vendor-supported framework with a clear support/maintenance lifecycle"
    when_not_to_use:
      - "You need portability across model providers — provider-native SDKs are, by design, less portable than framework-agnostic options"
      - "The provider's SDK doesn't yet support a control-flow pattern your workflow needs (check current SDK capabilities before committing, since these evolve quickly)"
    tradeoffs:
      flexibility: "Lower portability across providers in exchange for tighter integration and (typically) better-supported lifecycle within that one ecosystem."
      reliability: "Backed by the provider's own support and maintenance commitment, which can be an advantage for enterprise risk management specifically."

  - name: "TypeScript-Native / Visual Builder (Mastra, Dify)"
    description: "A full application framework for TypeScript-first teams (Mastra), or a visual/no-code workflow builder (Dify) for teams that want to avoid hand-writing orchestration code."
    when_to_use:
      - "Your team is TypeScript-first and wants a full application framework rather than adapting a Python-first framework"
      - "Non-engineering stakeholders need to author or modify workflows directly, favoring a visual builder"
    when_not_to_use:
      - "The team is Python-first with no strong reason to switch ecosystems"
      - "The workflow's control-flow complexity exceeds what a visual builder comfortably expresses"
    tradeoffs:
      complexity: "Visual builders lower the barrier for simple workflows but can become harder to reason about than code once complexity grows."
      flexibility: "TypeScript-native frameworks match teams already committed to that language; visual builders trade code-level flexibility for accessibility."

key_factors:
  - "Primary language: Python-first vs TypeScript-first materially narrows the realistic option set before any other factor matters"
  - "State-control needs: explicit branching/retry/human-in-the-loop control favors a graph framework over a role-based or provider-native abstraction"
  - "Provider commitment: an existing deep commitment to one model/cloud provider favors that provider's native SDK for maintenance and support reasons"
  - "Team composition: engineering-only teams can use code-first frameworks freely; teams needing non-engineer workflow authorship should weight visual builders higher"
  - "Portability requirement: needing to swap model providers later favors framework-agnostic options over provider-native SDKs"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Choosing an agent framework"] --> Visual{"Need a visual/no-code builder?"}
      Visual -->|"Yes"| Dify["Use Dify"]
      Visual -->|"No"| Lang{"Primary language?"}
      Lang -->|"TypeScript"| TSFull{"Need a full app framework?"}
      TSFull -->|"Yes"| Mastra["Use Mastra"]
      TSFull -->|"No"| TSCustom["Consider a provider SDK or custom orchestration"]
      Lang -->|"Python"| StateNeed{"Need explicit stateful branching/retries/human-in-the-loop?"}
      StateNeed -->|"Yes"| LangGraph["Use LangGraph"]
      StateNeed -->|"No"| Roles{"Naturally role-based multi-agent team?"}
      Roles -->|"Yes"| CrewAI["Use CrewAI (study MetaGPT for software-company-style patterns)"]
      Roles -->|"No"| Provider{"Provider-native commitment?"}
      Provider -->|"OpenAI"| OpenAISDK["Use OpenAI Agents SDK"]
      Provider -->|"Google/Gemini"| ADK["Use Google ADK"]
      Provider -->|"Microsoft/Azure/.NET"| MAF["Use Microsoft Agent Framework"]
      Provider -->|"Hugging Face/open models"| Smol["Use Smolagents"]
      Provider -->|"Coding-environment agent"| OpenHands["Use OpenHands"]

confidence: "evolving"
tradeoffs_as_of: "2026-07-06"

approach_implementations:
  - approach_name: "Explicit State Graph (LangGraph)"
    project_ids:
      - langgraph
    tool_ids: []
    build_example_ids:
      - starter-simple-react-agent
      - intermediate-multi-tool-agent
      - advanced-multi-agent-research
  - approach_name: "Role-Based Multi-Agent (CrewAI, MetaGPT patterns)"
    project_ids:
      - crewai
    tool_ids: []
    build_example_ids: []
  - approach_name: "Provider-Native SDK (OpenAI Agents SDK, Google ADK, Microsoft Agent Framework)"
    project_ids:
      - openai-agents-sdk
      - google-adk
      - microsoft-agent-framework
      - autogen
      - smolagents
      - openhands
    tool_ids: []
    build_example_ids: []
  - approach_name: "TypeScript-Native / Visual Builder (Mastra, Dify)"
    project_ids:
      - mastra
      - dify
    tool_ids: []
    build_example_ids: []

related_decisions:
  - choose-llm
  - choose-deployment-target

common_mistakes:
  - "Choosing AutoGen for new work: AutoGen is Microsoft's legacy multi-agent framework, and Microsoft Agent Framework is its named successor — existing AutoGen users should have an explicit migration plan, and new projects should default to Microsoft Agent Framework unless there is a specific reason to use the legacy framework."
  - "Reaching for a full graph framework (LangGraph) for a single-prompt or single-tool-loop agent, importing state-modeling overhead that a simpler abstraction would have avoided entirely."
  - "Using a low-level API within a framework that the framework's own maintainers have deprecated in favor of a higher-level replacement: LangGraph's prebuilt.create_react_agent, for example, is deprecated as of LangGraph 1.0 in favor of langchain.agents.create_agent — check current deprecation notices for whichever framework you choose before building on an API path the maintainers are actively moving away from."
  - "Committing to a provider-native SDK without confirming your workflow's specific control-flow needs (retries, human-in-the-loop, checkpointing) are actually supported at the maturity level you need — provider-native SDKs vary significantly in how much of this they've built out at any given time."

added_date: "2026-06-13"
last_reviewed: "2026-07-06"
added_by: "maintainer"
status: "active"
enrichment_status: "reviewed"
---

## Overview

Agent framework choice determines how your team models state, tools, delegation, retries, observability, and human review — the wrong abstraction can make simple systems fragile or complex systems unmaintainable. This decision resolves cleanly by checking primary language and state-control needs before comparing feature lists, since those two factors eliminate most of the option space immediately.

## The Decision

Start with primary language: TypeScript-first teams have a genuinely different, smaller option set than Python-first teams, and forcing a Python-first framework onto a TypeScript codebase (or vice versa) creates friction that outweighs most other feature considerations. Within Python, the next fork is how explicit your control-flow needs are: if you need branching, retries, and human-in-the-loop interruption as first-class, inspectable constructs, an explicit state-graph framework (LangGraph) is the right level of abstraction; if the problem naturally decomposes into roles (planner, researcher, writer, reviewer) and you don't need that level of explicit control, a role-based framework (CrewAI) gets you there with less boilerplate. Provider-native SDKs are the right choice specifically when you are already committed to that provider's ecosystem and want the officially maintained, best-integrated path — not a compromise choice, but a legitimate one when that commitment already exists.

## Decision Framework

The decision tree in this entry's frontmatter encodes the full branching logic; condensed as a quick-reference table:

| Need | Recommended Start | Canonical Entry |
|---|---|---|
| Explicit state graph | LangGraph | [LangGraph](../../projects/frameworks/langgraph.md) |
| Role/task crews | CrewAI | [CrewAI](../../projects/frameworks/crewai.md) |
| Microsoft/Azure enterprise | Microsoft Agent Framework | [Microsoft Agent Framework](../../projects/frameworks/microsoft-agent-framework.md) |
| Legacy Microsoft multi-agent apps | AutoGen → migrate | [AutoGen](../../projects/frameworks/autogen.md) |
| OpenAI-native | OpenAI Agents SDK | [OpenAI Agents SDK](../../projects/frameworks/openai-agents-sdk.md) |
| Google/Gemini-native | Google ADK | [Google ADK](../../projects/frameworks/google-adk.md) |
| Hugging Face/open-model code agents | Smolagents | [Smolagents](../../projects/frameworks/smolagents.md) |
| Visual workflows | Dify | [Dify](../../projects/frameworks/dify.md) |
| TypeScript app framework | Mastra | [Mastra](../../projects/frameworks/mastra.md) |
| Coding environment agent | OpenHands | [OpenHands](../../projects/frameworks/openhands.md) |

## Approach Deep-Dives

**Explicit state graphs (LangGraph)** treat state, branching, and interruption as first-class modeling concerns, at the cost of more upfront design work than a simpler abstraction — this is a deliberate tradeoff, appropriate once a workflow genuinely has multiple distinct stages or needs production-durable checkpointing, and overkill for a single-loop agent. **Role-based frameworks (CrewAI, MetaGPT patterns)** fit naturally when a problem decomposes into distinct responsibilities, and reduce boilerplate for that specific shape of problem, but become more awkward than a graph framework once you need fine-grained control that doesn't map onto the role metaphor. **Provider-native SDKs** are the correct default once you're already committed to that provider's ecosystem — they are not a fallback for teams who couldn't decide, but the pragmatic choice for teams optimizing for tight integration and vendor support within an existing commitment. This entry's own catalog explicitly tracks one framework transition worth naming directly: AutoGen is Microsoft's legacy multi-agent framework, and Microsoft Agent Framework is its stated successor — this is not a hypothetical future migration, it is a currently active one.

## Common Mistakes

- **Choosing AutoGen for new work.** It is legacy; Microsoft Agent Framework is the named successor, and new projects should default there absent a specific reason not to.
- **Reaching for LangGraph for a single-prompt or single-tool-loop agent.** This imports state-modeling overhead a simpler abstraction would have avoided.
- **Building on a framework API the maintainers have already deprecated**, such as LangGraph's `prebuilt.create_react_agent` in favor of `langchain.agents.create_agent` as of LangGraph 1.0 — check current deprecation notices before building on a path the framework is actively moving away from.
- **Committing to a provider-native SDK without confirming it supports your specific control-flow needs** (retries, human-in-the-loop, checkpointing) at the maturity level required — these vary significantly across provider SDKs at any given time.

## When This Guidance Might Be Outdated

Confidence is rated `evolving` because agent framework APIs are changing quickly across the whole ecosystem — the AutoGen-to-Microsoft-Agent-Framework transition and the LangGraph `create_react_agent` deprecation noted above are both examples of exactly this kind of shift happening within the last year, and this entry's specific framework recommendations should be re-checked against each framework's current changelog/deprecation notices at least every 6 months, not treated as a stable, one-time decision reference.

## Related Decisions

This decision is downstream of [Choosing a Model](./choose-llm.md), since provider-native SDK choice presupposes a model provider commitment, and upstream of [Choosing a Deployment Target](../serving-patterns/choose-deployment-target.md), since agent framework choice affects what serving infrastructure the resulting system needs.

## Resources

- [LangGraph](../../projects/frameworks/langgraph.md)
- [CrewAI](../../projects/frameworks/crewai.md)
- [Microsoft Agent Framework](../../projects/frameworks/microsoft-agent-framework.md)
- [OpenAI Agents SDK](../../projects/frameworks/openai-agents-sdk.md)
- [Google ADK](../../projects/frameworks/google-adk.md)
- [Dify](../../projects/frameworks/dify.md)

---
*Last reviewed: 2026-07-06 by @maintainer*
