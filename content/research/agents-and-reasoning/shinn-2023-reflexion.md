---
id: shinn-2023-reflexion
title: "Reflexion: Language Agents with Verbal Reinforcement Learning"
phase: agents-and-reasoning
venue: neurips
year: 2023
authors:
  - "Shinn, N."
  - "Cassano, F."
  - "Berman, E."
  - "Gopinath, A."
  - "Narasimhan, K."
  - "Yao, S."
arxiv_id: "2303.11366"
arxiv_url: "https://arxiv.org/abs/2303.11366"
pdf_url: "https://arxiv.org/pdf/2303.11366"
code_url: "https://github.com/noahshinn/reflexion"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 2500

tldr: "Showed agents improve across retries by writing verbal self-reflections on failures into an episodic memory instead of updating weights — 'verbal reinforcement learning' — the retry-with-reflection loop now standard in coding and tool-use agents"
key_contribution: "Reinforced agents through language instead of gradients: after a failed episode, the agent generates a self-reflection diagnosing the failure, stores it in episodic memory, and conditions the next attempt on it — yielding large gains (e.g. 91% HumanEval pass@1 vs GPT-4's 80%) with no fine-tuning"

builds_on:
  - "yao-2022-react"
  - "wei-2022-chain-of-thought"

tags:
  - "agents"
  - "reasoning"
  - "evaluation"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Reflexion turns episode failure into a learning signal without touching model weights: an actor attempts a task, an evaluator scores the outcome (unit tests, environment reward, or an LLM judge), and a self-reflection model converts the failure trajectory into a short verbal diagnosis stored in episodic memory that conditions subsequent attempts. Across sequential decision-making (ALFWorld), reasoning (HotPotQA), and code generation (HumanEval), a few reflection cycles produced dramatic improvements over strong non-reflective baselines.

## Why it's in the Arsenal

- The reflect-and-retry loop is now a stock pattern in production agents (coding agents retrying on failing tests, tool agents recovering from errors) — Reflexion is the paper that isolated and measured it
- It also delineates when the pattern works: you need an external success signal (tests, environment feedback); without one, self-reflection degrades into self-agreement — a boundary condition practitioners routinely rediscover

## Core Contribution

Framing self-improvement as 'verbal RL': the policy update is a natural-language memo rather than a gradient step, exploiting the model's in-context learning to convert sparse scalar feedback into dense, actionable guidance. Distinct from Self-Refine (same-episode output polishing), Reflexion operates across episodes with an explicit evaluator and persistent memory — which is why it works on tasks where you can retry against a checkable signal, and why it became the template for test-driven coding agents.

## Key Results

- 91% pass@1 on HumanEval with GPT-4 as the base, versus 80% for GPT-4 without reflection (paper Section 4, 2023)
- 130/134 ALFWorld tasks solved with reflection versus significantly lower ReAct-only baselines — absolute gains of ~22% (2023)
- 20% improvement on HotPotQA multi-hop reasoning over strong baselines, with ablations showing episodic reflection memory, not mere retrying, drives the gains (2023)

## Methodology

Three cooperating components: an Actor (ReAct-style agent) generates trajectories; an Evaluator produces a success signal — unit tests for code (with self-generated tests), environment reward for ALFWorld, exact-match/LLM heuristics for QA; a Self-Reflection model maps failed trajectory + signal to a concise verbal lesson appended to a bounded episodic memory (typically last 1-3 reflections) included in the next attempt's context. Ablations isolate reflection versus naive retry and vary evaluator quality.

## Practical Applicability

Directly deployable wherever a task is retryable against an objective check: failing CI tests, schema validation, execution errors, environment rewards. Modern coding agents' 'analyze the failure, then fix' loops are Reflexion operationalized. Design guidance from the paper that holds up: invest in the evaluator (reflection quality is bounded by feedback quality), keep reflections short and bounded (memory bloat degrades performance), and expect little from reflection when no external signal exists — self-evaluation alone is a weak reward model.

## Limitations & Critiques

The method presupposes a reliable success signal and cheap retries; on tasks without checkable outcomes it inherits all the weaknesses of LLM self-evaluation, and later work (e.g. critiques of intrinsic self-correction) showed models often cannot identify their own reasoning errors unaided — Reflexion's gains come substantially from the external evaluator, not introspection per se. Self-generated unit tests can be wrong, producing confident convergence to incorrect code; and token costs multiply with retries, making the pattern expensive for long-horizon tasks.

## Reproductions & Follow-up Work

Extensively reproduced; the reflect-retry pattern is embedded in production coding agents and agent frameworks (LangGraph reflection templates, eval-driven repair loops in SWE-agents). Follow-up research refines it: separating evaluator quality from reflection quality, warnings about intrinsic self-correction (Huang et al. 2024), and structured variants (tree search with reflections, RL fine-tuning on reflection data). It remains the canonical citation for cross-episode verbal learning.

## Relation to the Arsenal

Builds directly on `yao-2022-react` (same phase) as its actor and on `wei-2022-chain-of-thought` for reasoning traces; contrasts with `madaan-2023-self-refine` (same-episode refinement, no external evaluator). The pattern underlies test-driven repair in coding agents cataloged in projects/agent-systems/ and evaluation-loop tooling in tools/evaluation-and-observability/.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2303.11366)
- [arXiv](https://arxiv.org/abs/2303.11366)
- [Code](https://github.com/noahshinn/reflexion)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
