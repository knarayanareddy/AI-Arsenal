---
id: ji-2026-mragent
title: "Memory is Reconstructed, Not Retrieved: Graph Memory for LLM Agents"
phase: retrieval-and-memory
venue: arxiv-preprint
year: 2026
authors:
  - "Ji, S."
  - "Li, Y."
  - "Hooi, B."
arxiv_id: "2606.06036"
arxiv_url: "https://arxiv.org/abs/2606.06036"
pdf_url: "https://arxiv.org/pdf/2606.06036"
code_url: "https://github.com/Ji-shuo/MRAgent"
venue_url: null

practical_applicability: medium
reproduction_status: code-available
result_status: current
has_code: true
citation_count_approx: 0

tldr: "Replaces static retrieve-then-reason agent memory with active reconstruction over a Cue-Tag-Content graph -- the agent iteratively explores and prunes retrieval paths as evidence accumulates, gaining up to 23% on LoCoMo/LongMemEval while cutting tokens"
key_contribution: "MRAgent: an associative Cue-Tag-Content memory graph plus an active reconstruction mechanism that integrates LLM reasoning into memory access itself, letting the agent dynamically adapt retrieval paths to intermediate evidence instead of executing a fixed retrieve-then-reason pipeline"

builds_on: []
implemented_in: []

tags:
  - agents
  - memory
  - retrieval
  - graphs
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Memory-augmented agents today mostly run a static pipeline: retrieve relevant memories, then reason over them. This paper argues the pipeline shape itself is the bottleneck — retrieval fixed before reasoning starts cannot adapt to evidence discovered mid-inference. MRAgent replaces it with an associative memory graph (Cue-Tag-Content) and an active reconstruction mechanism in which the LLM's reasoning drives iterative exploration and pruning of retrieval paths, reporting up to 23% improvements on long-interaction memory benchmarks while reducing token and runtime cost.

## Why it's in the Arsenal

- Agent memory is one of the least-settled layers of the stack (see this catalog's memory-management tools, where verdicts are mostly `watching`), and this paper attacks the paradigm rather than the storage: "memory is reconstructed, not retrieved" is a mechanism-level claim about pipeline shape, not another vector-store variant.
- `practical_applicability: medium` because the idea transfers today (let intermediate evidence trigger further memory access) even if you never adopt the specific graph schema — but implementing the full framework is research-grade work, and most teams will consume it via future memory products rather than directly.

## Core Contribution

Two coupled pieces. The **Cue-Tag-Content graph** structures memory so that associative tags act as semantic bridges connecting fine-grained cues to memory contents — giving reasoning a navigable structure rather than a flat similarity space. The **active reconstruction mechanism** places LLM reasoning inside memory access: the agent explores retrieval paths, evaluates them against accumulated evidence, and prunes — bounding the combinatorial explosion that unconstrained graph expansion would cause. The contribution is the integration: retrieval becomes an adaptive part of inference instead of a preprocessing step.

## Key Results

- Up to 23% improvement over strong memory-augmented baselines on LoCoMo and LongMemEval (long-interaction-history benchmarks)
- Simultaneously reduces token and runtime cost relative to baselines — adaptivity plus pruning retrieves less, not more, which is the practically interesting half of the result

## Methodology

Interaction history is encoded into the Cue-Tag-Content graph as memories accrue. At inference, instead of one-shot top-k retrieval, the agent walks the graph: cues matched from the current reasoning state lead through associative tags to candidate contents; the LLM judges which paths to expand or prune given evidence so far, iterating until the reasoning need is met. Evaluation compares against static retrieve-then-reason baselines on the two benchmarks, measuring both accuracy and token/runtime cost.

## Practical Applicability

The transferable design principle: don't finalize memory retrieval before reasoning begins. Even in a conventional RAG-style memory stack you can approximate this with iterative retrieval triggered by intermediate reasoning (retrieve, reason, notice a gap, retrieve again) — this paper is evidence that the adaptive loop, done with structure and pruning, beats bigger one-shot retrieval on both quality and cost. Adopting the full graph schema is only justified if long multi-session memory is core to your product.

## Limitations & Critiques

An arXiv preprint without peer review or independent reproduction at `last_reviewed: 2026-07-08`. Gains are demonstrated on two conversational-memory benchmarks; generalization to other memory workloads (tool logs, codebase state, multi-agent shared memory) is untested. Active reconstruction puts an LLM call inside the retrieval loop, so the reported cost reductions depend on pruning working well — an adversarially structured or very noisy memory graph could invert the cost advantage.

## Reproductions & Follow-up Work

Official code is released (Ji-shuo/MRAgent, 211 stars as of 2026-07-08 — code-available, early community interest, not yet independently validated). No reproductions or challenges identified as of `last_reviewed: 2026-07-08`; revisit at next review.

## Relation to the Arsenal

Complements `edge-2024-graphrag` (this folder): GraphRAG builds graph structure over a *corpus* for query-time summarization, while MRAgent builds graph structure over an *agent's own interaction history* and makes traversal adaptive. On the tooling side it is the research counterpart to the layered-memory products in [memory-management tools](../../tools/by-job/memory-management.md) — both reject flat vector piles, from different directions (structure there, adaptive access here).

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2606.06036)
- [arXiv](https://arxiv.org/abs/2606.06036)
- [Official Code](https://github.com/Ji-shuo/MRAgent)
