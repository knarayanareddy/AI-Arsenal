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

- [Self-Refine: Iterative Refinement with Self-Feedback](./madaan-2023-self-refine.md)
- [Toolformer: Language Models Can Teach Themselves to Use Tools](./schick-2023-toolformer.md)
- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](./wei-2022-chain-of-thought.md)
- [SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering](./yang-2024-swe-agent.md)
- [ReAct: Synergizing Reasoning and Acting in Language Models](./yao-2022-react.md)
- [Tree of Thoughts: Deliberate Problem Solving with Large Language Models](./yao-2023-tree-of-thoughts.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Self-Refine: Iterative Refinement with Self-Feedback](./madaan-2023-self-refine.md) — Showed self-critique-then-revise loops can improve output quality, but later rigorous studies found weak initial-response prompts inflated the reported improvement -- treat this with caution, not as a validated default
- [Toolformer: Language Models Can Teach Themselves to Use Tools](./schick-2023-toolformer.md) — Showed a model can teach itself which API calls to make via self-supervised annotation and perplexity-based filtering, but this approach is now superseded by native function-calling built into current frontier model APIs
- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](./wei-2022-chain-of-thought.md) — Showed prompting a large enough model to produce intermediate reasoning steps improves multi-step reasoning accuracy -- use CoT for reasoning-heavy tasks, but don't trust the trace as an accurate explanation of the model's actual computation
- [SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering](./yang-2024-swe-agent.md) — Showed a custom agent-computer interface (simplified LM-friendly commands for editing/testing code) matters as much as model quality -- treat interface design, not just model choice, as a first-class variable for coding agents
- [ReAct: Synergizing Reasoning and Acting in Language Models](./yao-2022-react.md) — Showed interleaving reasoning traces with external actions and their observations outperforms reasoning-only or acting-only prompting, meaning the reason-act-observe loop should be your default agent architecture pattern before reaching for something more complex
- [Tree of Thoughts: Deliberate Problem Solving with Large Language Models](./yao-2023-tree-of-thoughts.md) — Showed exploring and backtracking across multiple candidate reasoning paths beats single-chain CoT on hard search-style problems -- reach for ToT for problems needing exploration/backtracking, not as a default CoT replacement
