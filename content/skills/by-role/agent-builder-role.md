---
id: "agent-builder-role"
title: "Agent Builder — Role Overview"
entry_type: "guide"
section: "skills"
description: "Role overview mapping the Agent Builder job to the Arsenal's learning paths, skill guides, and tooling"
tags:
  - agents
  - tool-use
  - orchestration
  - evaluation
related_entries: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

The Agent Builder designs, ships, and operates LLM systems that take actions — tool-using assistants, coding agents, workflow automations. This page routes that job to the Arsenal's learning path, applied skill guides, and cataloged frameworks.

## Why It's in the Arsenal

Agent work has become a distinct role with its own failure modes (unbounded loops, unsafe tool access, untestable behavior). Routing it explicitly keeps the guidance in one place instead of scattered across frameworks.

## Key Features

- Maps the role to a sequenced learning path plus the applied agent-design guide.
- Every recommendation links to a canonical Arsenal entry.
- Emphasizes the production disciplines (budgets, guardrails, evals) that separate demos from deployments.

## Architecture / How It Works

Agent Builders sit at the intersection of application engineering and orchestration: choosing frameworks, designing tool interfaces, managing state, and gating autonomy. The Arsenal covers each concern as a vertical; this page is the role-level router.

## Getting Started

1. **Bounded ReAct agent** — follow the [Agent Builder learning path](../learning-paths/agent-builder.md) and the [starter simple ReAct agent](../../build-examples/agent-systems/starter-simple-react-agent.md) build, adding a step budget from day one.
2. **Multi-tool agent with guardrails** — extend to the [intermediate multi-tool agent](../../build-examples/agent-systems/intermediate-multi-tool-agent.md), applying [argument validation](../../tips-and-tricks/agents-and-orchestration/validate-tool-arguments-before-execution.md) and [approval gates](../../tips-and-tricks/agents-and-orchestration/require-human-approval-for-irreversible-actions.md).
3. **Agent evals** — build end-to-end task-completion evals per [Evaluation Methodology](../core-concepts/evaluation-methodology.md) before adding autonomy.

## Use Cases

1. **Scenario**: An application engineer taking ownership of a tool-using assistant feature.
2. **Scenario**: Standardizing agent practices (budgets, guardrails, skills) across a team.
3. **Scenario**: Choosing between agent frameworks with a decision tree instead of hype.

## Strengths

- Single entry point for the fastest-growing AI engineering role.
- Routes to build artifacts and guardrail tips, not just reading.
- Covers both building agents and equipping them (agent skills).

## Limitations / When NOT to Use

- Not a substitute for the [Agent Design](../applied/agent-design.md) guide — this page routes, that page teaches.
- Framework recommendations age quickly; re-verify against the linked entries.

## Integration Patterns

- Start with the [Agent Builder learning path](../learning-paths/agent-builder.md), then deepen with [Agent Design](../applied/agent-design.md).
- Choose tooling via [choose an agent framework](../../architectures/model-selection/choose-agent-framework.md).
- Equip agents with reusable procedures per [Agent Skills — Overview](../agent-skills/agent-skills-overview.md).
- Harden with [Structured Output & Tool Use](../applied/structured-output-and-tool-use.md).

## Resources

- [Agent Builder learning path](../learning-paths/agent-builder.md)
- [Agent Design](../applied/agent-design.md)
- [Multi-agent reference stack](../../architectures/reference-stacks/multi-agent-system.md)
- [ReAct paper](../../research/agents-and-reasoning/yao-2022-react.md)
- [Agent Skills — Ecosystem](../agent-skills/agent-skills-ecosystem.md)

## Buzz & Reception

Role-based routing is evergreen; review quarterly as the learning paths and tool landscape change.

---
*Last reviewed: 2026-07-07 by @maintainer*
