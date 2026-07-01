---
title: "Agents and Reasoning Research"
section: "research/agents-and-reasoning"
auto_generated: false
---

# Agents and Reasoning Research

## What belongs here

Chain-of-thought and other reasoning-elicitation prompting techniques, tool use and function calling, ReAct-style reasoning-plus-acting loops, multi-agent coordination, planning, self-reflection/self-critique loops, and agent-computer interface design for tasks like coding agents — papers whose primary contribution is how a model reasons through a problem or acts in an environment.

## What does NOT belong here

A paper about training a model to reason better (e.g. an RL-from-verifiable-rewards recipe like DeepSeek-R1) belongs in `training-and-alignment/`, since its primary contribution is a training technique, not a prompting or agent-architecture technique — this folder covers how you elicit or structure reasoning/action at inference time, not how you train a model to be better at it. A paper about evaluating agent or reasoning quality belongs in `evaluation-and-safety/`.

## Engineering frame

When I am building an agent loop or trying to improve a model's multi-step reasoning without retraining it, which prompting or orchestration technique should I reach for, and does it still hold up given how much of this is now built into model APIs directly (native function calling, reasoning-trained models)?

## Reading order guidance

- Start with [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](./wei-2022-chain-of-thought.md) — still the default technique for eliciting multi-step reasoning via prompting alone.
- Read [ReAct: Synergizing Reasoning and Acting in Language Models](./yao-2022-react.md) next — the reasoning-plus-acting loop shape underlying most agent frameworks in this catalog's tools and projects verticals.
- [Tree of Thoughts](./yao-2023-tree-of-thoughts.md) and [Self-Refine](./madaan-2023-self-refine.md) extend the reasoning-loop idea with explicit search and self-critique, respectively — read after the two above.
- [Toolformer](./schick-2023-toolformer.md) and [SWE-agent](./yang-2024-swe-agent.md) are both largely superseded-in-practice by built-in model capabilities (native function calling) and existing coding-agent tooling respectively — read them for the underlying design ideas, not as current implementation guidance.

## Papers in this phase

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Agents And Reasoning in This Phase

### Recently Added

_No entries yet._

### Most Popular

_No star-tracked entries yet._

### Browse All

_No entries yet._
