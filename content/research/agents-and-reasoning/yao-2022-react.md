---
id: yao-2022-react
title: "ReAct: Synergizing Reasoning and Acting in Language Models"
phase: agents-and-reasoning
venue: iclr
year: 2022
authors:
  - "Yao, S."
  - "Zhao, J."
  - "Yu, D."
  - "Du, N."
  - "et al."
arxiv_id: "2210.03629"
arxiv_url: "https://arxiv.org/abs/2210.03629"
pdf_url: "https://arxiv.org/pdf/2210.03629"
code_url: "https://github.com/ysymyth/ReAct"
venue_url: "https://openreview.net/forum?id=WE_vluYUL-X"

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 3500

tldr: "Showed interleaving reasoning traces with external actions and their observations outperforms reasoning-only or acting-only prompting, meaning the reason-act-observe loop should be your default agent architecture pattern before reaching for something more complex"
key_contribution: "Demonstrated that interleaving explicit reasoning traces with actions (like search queries) and their resulting observations, in a single prompted loop, produces more reliable and interpretable task-solving behavior than pure chain-of-thought reasoning or pure action-taking alone"

builds_on:
  - wei-2022-chain-of-thought
implemented_in:
  - langchain
  - langgraph
  - smolagents

tags:
  - agents
  - reasoning
  - tool-use
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
enrichment_status: reviewed
---

## Overview

This paper showed that interleaving explicit reasoning traces with external actions (like search queries) and their resulting observations — reason, act, observe, repeat — produces more reliable, grounded, and interpretable task-solving behavior than either pure chain-of-thought reasoning (which can hallucinate facts with no way to correct course) or pure action-taking (which lacks the reasoning needed to plan multi-step tasks well). This remains current, foundational practice: the reason-act-observe loop this paper establishes is the conceptual pattern underlying most agent frameworks built since, including several cataloged directly in this vertical's tools and projects.

## Why it's in the Arsenal

- The ReAct loop (reason about what to do, take an action, observe the result, repeat) is the default architectural pattern nearly every agent framework in this catalog implements in some form — LangChain's original agent executor, LangGraph's agent patterns, and smolagents all build on this exact loop shape.
- `practical_applicability: high` is a direct, non-inflated classification: this is not a historical curiosity, it is the pattern most production agent systems still use as their base loop, even when wrapped in more sophisticated orchestration on top.

## Core Contribution

Prior approaches either used chain-of-thought-style reasoning with no ability to interact with the outside world (meaning any factual claims the model reasoned about could not be verified or corrected mid-task) or had models take actions directly with no explicit reasoning about why, making their behavior harder to interpret, debug, or steer. This paper's contribution is combining both into a single interleaved loop: the model reasons about what it needs to do next, takes an action (like issuing a search query to an external tool), receives an observation (the tool's result), and reasons about that observation before deciding its next action — repeating until the task is complete. In engineering terms: this is the specific architecture that lets a language model use external tools while maintaining an inspectable trace of *why* it took each action, grounding its reasoning in real observations rather than purely relying on (potentially wrong) parametric knowledge.

## Key Results

- ReAct outperformed pure chain-of-thought prompting (which cannot access external information and can hallucinate facts) and pure action-only prompting (which lacks planning) on knowledge-intensive question-answering and fact-verification tasks in the paper's own evaluation using PaLM-540B (2022)
- Combining ReAct with self-consistency-style chain-of-thought sampling (switching between the two strategies) produced the paper's best results on the HotpotQA benchmark in its own comparison table (2022) — evidence that ReAct and pure CoT are complementary rather than strictly one superseding the other
- On decision-making benchmarks (interactive text-based environments), ReAct substantially outperformed both imitation learning and pure reinforcement learning baselines using very few or even zero task-specific training examples (2022) — these specific benchmark comparisons are dated to 2022-era baselines and should not be read as current state-of-the-art claims

## Methodology

At each step, the model is prompted to first produce a "Thought" — a reasoning statement about the current state of the task and what to do next — then an "Action" (a call to an external tool, such as a search query or a calculator, or a `Finish` action to complete the task with a specific answer), which is executed outside the model and returns an "Observation" (paper Section 2). This Thought-Action-Observation triple then becomes part of the context for the next step, so the model's subsequent reasoning is grounded in the actual observed result of its prior action, not just its own possibly-hallucinated assumptions about what that result would be. This loop repeats until the model produces a `Finish` action or a maximum number of steps is reached — the same fundamental Thought-Action-Observation loop that underlies the agent executor pattern in LangChain and similar frameworks, whether or not those frameworks use ReAct's exact original prompt format.

## Practical Applicability

If you are building any system where a language model needs to use external tools (search, calculators, APIs, code execution) to complete a task, the ReAct loop — reason about what to do, act, observe the result, reason again — is the default architectural pattern to start from, and it's already implemented as the core execution loop in LangChain, LangGraph, and smolagents rather than something you need to build from scratch. If you are debugging why an agent took a particular action, ReAct's explicit "Thought" step before each action is specifically designed to make that decision inspectable — look at the reasoning trace preceding the problematic action rather than treating the agent as a black box, though bear in mind the same faithfulness caveats documented in `wei-2022-chain-of-thought` apply to the reasoning traces here too.

## Limitations & Critiques

The paper's own evaluation is limited to the specific tool types available at the time (primarily a Wikipedia search API for knowledge-intensive tasks, and text-based interactive game environments for decision-making tasks) — it does not directly establish how well the pattern scales to the much broader and more complex tool ecosystems (arbitrary APIs, code execution, multi-tool orchestration) that modern agent frameworks built on this pattern now support, though the field's broad adoption of the underlying loop shape for exactly these more complex use cases is itself informal evidence the pattern generalizes reasonably well. As with `wei-2022-chain-of-thought`, the "Thought" reasoning traces this paper produces should not be assumed to be fully faithful accounts of the model's actual decision process — the same faithfulness concerns documented there apply here, since ReAct's Thought steps are themselves a form of chain-of-thought reasoning. The paper's own maximum-step and error-handling mechanisms are relatively simple (a fixed step limit, no sophisticated retry or backtracking logic) compared to later, more elaborate agent frameworks built on top of the same basic loop — meaning ReAct as originally described is best understood as establishing the core interaction pattern, not as a complete production agent architecture on its own. No credible failed-replication challenge to the paper's core empirical claims has been identified as of `last_reviewed: 2026-07-01`.

## Reproductions & Follow-up Work

ReAct's core Thought-Action-Observation loop has been reproduced and built upon so extensively that it is now the standard base pattern for LLM agent frameworks broadly, not merely a technique with isolated reproduction studies — LangChain's original agent executor was explicitly built around this pattern, and it remains foundational to LangGraph's and smolagents' agent execution models, per those tools' own documented architecture. Reflexion (Shinn et al., 2023, not yet separately cataloged) is a notable direct follow-up, adding a self-reflection memory mechanism on top of the ReAct loop specifically to let agents learn from repeated failures within a task, addressing one of the gaps in ReAct's original, relatively simple error-handling approach.

## Relation to the Arsenal

This paper builds directly on `wei-2022-chain-of-thought` (this phase folder), combining that paper's reasoning-elicitation technique with external actions and observations — read `wei-2022-chain-of-thought` first if you have not already. It is implemented, in spirit if not always in exact original prompt format, in three tool/project entries in this catalog: `langchain`, `langgraph`, and `smolagents` (all agent orchestration frameworks whose core execution loops are direct descendants of this paper's Thought-Action-Observation pattern), reflected in `implemented_in` above.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2210.03629)
- [arXiv](https://arxiv.org/abs/2210.03629)
- [Official Code](https://github.com/ysymyth/ReAct)
- [Venue Proceedings](https://openreview.net/forum?id=WE_vluYUL-X)
- [Papers With Code](https://paperswithcode.com/paper/react-synergizing-reasoning-and-acting-in)
- [Key Reproduction / Analysis](https://lilianweng.github.io/posts/2023-06-23-agent/) — widely referenced independent survey of LLM-powered agent architectures, situating ReAct as the foundational reasoning-plus-acting pattern underlying subsequent agent framework designs
