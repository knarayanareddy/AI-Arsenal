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

- [AgenticSTS: A Bounded-Memory Testbed for Long-Horizon LLM Agents](./cheng-2026-agenticsts.md)
- [Graph of Thoughts: Solving Elaborate Problems with Large Language Models](./besta-2023-graph-of-thoughts.md)
- [Large Language Models are Zero-Shot Reasoners](./kojima-2022-zero-shot-cot.md)
- [WebGPT: Browser-assisted question-answering with human feedback](./nakano-2021-webgpt.md)
- [Generative Agents: Interactive Simulacra of Human Behavior](./park-2023-generative-agents.md)
- [Gorilla: Large Language Model Connected with Massive APIs](./patil-2023-gorilla.md)
- [Reflexion: Language Agents with Verbal Reinforcement Learning](./shinn-2023-reflexion.md)
- [Self-Consistency Improves Chain of Thought Reasoning in Language Models](./wang-2022-self-consistency.md)
- [Voyager: An Open-Ended Embodied Agent with Large Language Models](./wang-2023-voyager.md)
- [AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation](./wu-2023-autogen.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Graph of Thoughts: Solving Elaborate Problems with Large Language Models](./besta-2023-graph-of-thoughts.md) — Generalizes chain- and tree-of-thought by modeling reasoning as an arbitrary graph, where thoughts can be aggregated, refined, and looped -- enabling operations like merging partial solutions that a tree cannot express
- [AgenticSTS: A Bounded-Memory Testbed for Long-Horizon LLM Agents](./cheng-2026-agenticsts.md) — Tests a bounded-memory contract in which a long-horizon agent receives typed retrieval in a fresh prompt instead of an ever-growing raw transcript.
- [Large Language Models are Zero-Shot Reasoners](./kojima-2022-zero-shot-cot.md) — Appending the single trigger phrase 'Let's think step by step' elicits chain-of-thought reasoning zero-shot — no exemplars needed — showing that reasoning behavior in LLMs is latent and can be unlocked by prompt format alone
- [Self-Refine: Iterative Refinement with Self-Feedback](./madaan-2023-self-refine.md) — Showed self-critique-then-revise loops can improve output quality, but later rigorous studies found weak initial-response prompts inflated the reported improvement -- treat this with caution, not as a validated default
- [WebGPT: Browser-assisted question-answering with human feedback](./nakano-2021-webgpt.md) — Trained GPT-3 to operate a text-based web browser — searching, clicking, quoting — and answer questions with citations, using imitation learning plus human-preference RL; the first serious tool-using LLM agent and the origin of citation-grounded answers
- [Generative Agents: Interactive Simulacra of Human Behavior](./park-2023-generative-agents.md) — The Smallville paper: 25 LLM agents with a memory-stream architecture (observation, retrieval by recency/importance/relevance, reflection, planning) lived in a simulated town and produced emergent social behavior — the design that defined agent memory
- [Gorilla: Large Language Model Connected with Massive APIs](./patil-2023-gorilla.md) — Fine-tuned an LLM to select and correctly invoke the right API from thousands of options, using retrieval of live documentation to stay current and reduce hallucinated calls — an early rigorous tool/function-calling result
- [Toolformer: Language Models Can Teach Themselves to Use Tools](./schick-2023-toolformer.md) — Showed a model can teach itself which API calls to make via self-supervised annotation and perplexity-based filtering, but this approach is now superseded by native function-calling built into current frontier model APIs
- [Reflexion: Language Agents with Verbal Reinforcement Learning](./shinn-2023-reflexion.md) — Showed agents improve across retries by writing verbal self-reflections on failures into an episodic memory instead of updating weights — 'verbal reinforcement learning' — the retry-with-reflection loop now standard in coding and tool-use agents
- [Self-Consistency Improves Chain of Thought Reasoning in Language Models](./wang-2022-self-consistency.md) — Sample multiple reasoning chains at nonzero temperature and majority-vote the final answers: correct answers are reached by many diverse paths while errors scatter, yielding large accuracy gains at linear compute cost — the founding result of inference-time scaling
- [Voyager: An Open-Ended Embodied Agent with Large Language Models](./wang-2023-voyager.md) — First LLM-powered lifelong-learning agent in Minecraft: an automatic curriculum, an ever-growing skill library of verified executable code, and iterative environment-feedback prompting — the origin of the 'skill library' pattern now reappearing in agent skill systems
- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](./wei-2022-chain-of-thought.md) — Showed prompting a large enough model to produce intermediate reasoning steps improves multi-step reasoning accuracy -- use CoT for reasoning-heavy tasks, but don't trust the trace as an accurate explanation of the model's actual computation
- [AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation](./wu-2023-autogen.md) — Framed LLM applications as conversations among configurable agents (including tool-using and human-proxy agents), providing a general multi-agent programming model that became a widely-used agent framework
- [SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering](./yang-2024-swe-agent.md) — Showed a custom agent-computer interface (simplified LM-friendly commands for editing/testing code) matters as much as model quality -- treat interface design, not just model choice, as a first-class variable for coding agents
- [ReAct: Synergizing Reasoning and Acting in Language Models](./yao-2022-react.md) — Showed interleaving reasoning traces with external actions and their observations outperforms reasoning-only or acting-only prompting, meaning the reason-act-observe loop should be your default agent architecture pattern before reaching for something more complex
- [Tree of Thoughts: Deliberate Problem Solving with Large Language Models](./yao-2023-tree-of-thoughts.md) — Showed exploring and backtracking across multiple candidate reasoning paths beats single-chain CoT on hard search-style problems -- reach for ToT for problems needing exploration/backtracking, not as a default CoT replacement
- [COLLEAGUE.SKILL: Automated AI Skill Generation via Expert Knowledge Distillation](./zhou-2026-colleague-skill.md) — Automates trace-to-skill distillation: turns a person's heterogeneous work traces into a versioned, inspectable agent skill package with separate capability and behavior tracks -- treat expert knowledge capture as a pipeline, not manual skill authoring
