---
id: potapov-2026-agi-maze
title: AGI Maze as a Benchmark Framework for World-Modeling Agents
phase: agents-and-reasoning
venue: arxiv-preprint
year: 2026
authors:
  - Alexey Potapov
arxiv_id: "2607.00627"
arxiv_url: "https://arxiv.org/abs/2607.00627"
pdf_url: "https://arxiv.org/pdf/2607.00627"
code_url: null
venue_url: null
practical_applicability: medium
reproduction_status: not-reproduced
result_status: current
has_code: false
tldr: "A grid-maze benchmark showing LLMs do not build persistent internal world models, even with message history as memory."
key_contribution: "Strips perception and action complexity to near zero, so a failure points at world-modelling rather than at perception or planning noise."
tags:
  - multimodal
  - memory
  - research
  - benchmark
  - planning
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
enrichment_status: draft
---

## Overview

AGI Maze is a lightweight framework for building grid-based maze environments designed to test whether an agent forms a usable representation of external world state. The motivation is a specific critique of LLM reasoning evaluation: a model's default mode is next-token prediction over a static context, which does not reliably produce a persistent, manipulable representation of the world, and a task that looks like reasoning in text becomes substantially harder once the environment is partially observable, stateful, and requires memory plus structured hypotheses about hidden state. The framework offers a family of maze tasks behind a clean API with several difficulty regimes, deliberately avoiding high-dimensional sensory input so the measurement targets world-modelling rather than perception. Results are negative and the paper is candid about it: an initial evaluation of several vanilla LLMs on simple mazes shows they fail to represent mazes internally at inference time. A baseline agent is then introduced, allowed to use its own message history as a working memory in which it constructs descriptions of observations at agentic runtime, which improves performance but remains insufficient to solve even small mazes reliably within a step budget that is ample for a human. The author is Alexey Potapov.

## Why it's in the Arsenal

Almost every reasoning benchmark hands the model the world as text, which means a capable model can pass by applying a local rule to an observation it was just given. That tests something real but narrower than world-modelling, and it means our benchmarks systematically overstate the planning ability of models that will actually be asked to remember an environment over hundreds of steps. Stripping the environment down to a grid makes the confound impossible to hide: there is no perception problem, no language ambiguity and no action space to learn, only the question of whether state persists anywhere the model can use it. The paper's contribution is as much its cheapness as its finding. A maze environment can be built and instrumented in an afternoon, which means the claim can be checked rather than argued about, and the message-history baseline is the natural first control for anyone building an external memory layer.

## Core Contribution

- Strips perception and action complexity to near zero, so a failure points at world-modelling rather than at perception or planning noise.
- Includes a message-history working-memory baseline, which is the control any external-memory design needs to beat.
- Uses a step budget ample for humans, removing the escape hatch that a model is merely too slow.
- A clean API over multiple difficulty regimes makes the whole study reproducible by a small team in a day.

## Key Results

1. Screening memory architectures: use the maze as a cheap first test before committing to a complex external-memory design, since message history is the control to beat.
2. Separating planning from rule application: distinguish a model that reasons over retained state from one that reacts to the latest observation.
3. Building an interpretable failure case: a grid maze is small enough that a wrong belief can be read straight off the trajectory and diagnosed.

## Methodology

The framework provides maze task generators behind a common API and multiple difficulty regimes, varying in grid size, degree of partial observability, and how much of the layout the agent can see at each step. Because the environment is a grid with discrete symbols, the correct internal representation is expressible in a few lines of text, which is what makes failure interpretable rather than a black box. The agent interface follows the usual loop: observe, act, receive the next observation, repeat under a step budget. Two evaluation modes are reported. The first runs vanilla LLMs directly, where the model receives observations as text and must act; results are consistent with guessing from local observations rather than reasoning over retained layout, and the paper's phrase is that the models fail to represent mazes internally at inference time. The second introduces a baseline agent that maintains working memory in its own message history, writing structured descriptions of what it has observed at agentic runtime and consulting them on later steps, which improves scores but still falls short of reliable solving on small mazes. The abstract does not specify the maze representation, the difficulty regimes in detail, or the memory serialisation format.

## Practical Applicability

The framework is a research codebase, so build the environment yourself and reproduce the two evaluation modes before drawing conclusions. The point is that the setup is deliberately small enough to audit.

```bash
curl -L -o agi-maze.pdf https://arxiv.org/pdf/2607.00627
```

```python
# mode 1: vanilla LLM, observations only
for episode in env.reset(seed):
    action = llm.act(episode.observe())
    episode.step(action)

# mode 2: message history as agentic working memory
mem = ""
for step in env:
    mem += describe(step.observe())   # written at agentic runtime
    action = llm.act(step.observe(), memory=mem)
    step(action)
```

Hold the step budget well above what a human needs, as the paper does, so a failure cannot be explained by running out of turns. If both modes fail, the interpretation is that the model is not forming state, not that it is slow.

## Limitations & Critiques

This is a single-author preprint verified only through arXiv metadata, with content taken from the abstract: the maze encoding, the difficulty regimes, the models evaluated, the step budgets and the memory serialisation format are not specified in what was read, and no score was reproduced. A grid maze is an unusually clean world, so negative results here do not transfer to partially observable, noisy or social environments without a strong argument. The evaluation covers several vanilla LLMs, not a sweep of frontier reasoning models with long context or tool scaffolding, so the reported failure is a negative result under an early experimental setup rather than a settled finding. Message history is a weak memory substrate by construction, since a transcript is neither indexed nor compressed, so the baseline understates what a designed memory system can achieve. Negative maze results are also common in the LLM evaluation literature, which is a reason to treat this as a hypothesis to test rather than a settled constraint.

## Reproductions & Follow-up Work

The catalog records no third-party reproduction of AGI Maze as a Benchmark Framework for World-Modeling Agents (arXiv:2607.00627). The reported numbers are author-reported: they have not been rerun on an independent implementation, so treat the effect sizes as a claim awaiting confirmation rather than an established result. A replication would need the same task set, the same scoring script, and a model family comparable to the one the authors evaluated.


## Relation to the Arsenal

This is an agents-and-reasoning research entry that functions as a diagnostic for the memory work in content/research/retrieval-and-memory, and the two should be read together: the baseline agent here is the null hypothesis that external-memory systems in this catalogue exist to beat. Implementation belongs with the frameworks in content/projects/frameworks and the harnesses in content/projects/agent-systems, and the models it probes are the general entries in content/projects/foundation-models. It is a cheap experiment by design, so it also belongs near the benchmark tooling in content/projects/benchmarks-and-evals as a pattern for building small, interpretable capability probes. It says nothing about serving cost or latency, so content/projects/inference-engines is not part of this entry's story.

## Resources

- [arXiv abstract page](https://arxiv.org/abs/2607.00627)
- [PDF](https://arxiv.org/pdf/2607.00627)
