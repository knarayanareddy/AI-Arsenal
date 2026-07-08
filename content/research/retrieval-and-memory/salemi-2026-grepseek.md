---
id: salemi-2026-grepseek
title: "GrepSeek: Training Search Agents for Direct Corpus Interaction"
phase: retrieval-and-memory
venue: arxiv-preprint
year: 2026
authors:
  - "Salemi, A."
  - "Zeng, C."
  - "Nijasure, A."
  - "Chung, J."
  - "Rahimi, R."
  - "Diaz, F."
arxiv_id: "2605.29307"
arxiv_url: "https://arxiv.org/abs/2605.29307"
pdf_url: "https://arxiv.org/pdf/2605.29307"
code_url: "https://github.com/alirezasalemi7/grepseek"
venue_url: null

practical_applicability: high
reproduction_status: code-available
result_status: current
has_code: true
citation_count_approx: 0

tldr: "Trains a compact search agent to find evidence by issuing shell commands (grep-style) directly against the corpus instead of querying a vector index -- validates the index-free retrieval pattern coding agents already use, and shows how to train for it"
key_contribution: "Formalizes and optimizes direct corpus interaction (DCI): a two-stage pipeline (Tutor/Planner-generated cold-start trajectories, then GRPO refinement) that trains a compact agent to find, filter, and compose evidence from large text corpora via executable shell commands rather than a pre-built retrieval index"

builds_on: []
implemented_in: []

tags:
  - agents
  - retrieval
  - rag
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Most LLM search agents access information through a retriever: a query goes in, a ranked list from a pre-computed index comes out. This paper explores the complementary approach the coding-agent world stumbled into empirically — treat the corpus itself as the search environment and let the agent issue executable shell commands (grep-style search, filtering, composition) directly against it. GrepSeek is a compact search agent trained specifically for this direct corpus interaction (DCI) setting.

## Why it's in the Arsenal

- It gives a research grounding to a pattern practitioners already bet on: agentic grep over embeddings for many retrieval tasks (no index build, no staleness, exact-match power), the same debate running through this catalog's RAG tips. This paper is the strongest formal treatment of when and how to *train* for that pattern.
- `practical_applicability: high` because the engineering trade-off it studies — index-based retrieval vs. direct corpus interaction — is a live architecture decision in nearly every RAG and agent system built today.

## Core Contribution

Two things. First, the framing: direct corpus interaction as a first-class retrieval paradigm, where evidence-finding is a sequence of executable commands rather than a single dense query — which handles exact identifiers, rare strings, and compositional filters that embedding retrieval is structurally bad at. Second, the training recipe: naive RL directly on large corpora is unstable, so GrepSeek uses a two-stage pipeline — a cold-start dataset built by an answer-aware **Tutor** and an answer-blind **Planner** generating verified, causally grounded search trajectories, followed by Group Relative Policy Optimization (GRPO) to refine task-oriented search behavior.

## Key Results

- A compact (small-model) search agent trained with the two-stage pipeline learns effective find/filter/compose behavior on large text corpora, where direct RL from scratch is unstable (the paper's central claim; consult the paper for the specific benchmark suites and numbers)
- The Tutor/Planner split matters: answer-aware trajectory generation with answer-blind planning yields verified trajectories without leaking the answer into the search policy — the mechanism that makes the cold-start data causally grounded

## Methodology

Stage one constructs supervised trajectories: the Tutor (which knows the answer) verifies that a trajectory actually surfaces the needed evidence, while the Planner (which does not) produces the search behavior, preventing answer leakage. Stage two applies GRPO on top of the cold-started policy so the agent improves its multi-step search behavior against task reward. The action space is executable shell commands over the corpus, making the environment the corpus itself rather than an index built from it.

## Practical Applicability

If you are choosing between building a vector index and giving an agent direct search tools over your corpus: this paper is evidence that the direct route is trainable and effective, and its failure-mode analysis (instability of naive RL, need for verified cold-start trajectories) transfers to anyone fine-tuning a small in-house search agent. For most teams the immediate takeaway is architectural, not training: DCI works best where exact-match and compositional filtering dominate; dense retrieval keeps the advantage for fuzzy semantic matching — hybrid designs remain the pragmatic default.

## Limitations & Critiques

An arXiv preprint without peer review or independent reproduction at `last_reviewed: 2026-07-08`. DCI's costs are real and the approach inherits them: per-query latency scales with corpus scanning rather than index lookup, and shell-command action spaces raise sandboxing requirements when the corpus lives near anything sensitive. Results are on text corpora; how far the trained behaviors transfer across corpus formats and domains is untested here.

## Reproductions & Follow-up Work

Official code is released (alirezasalemi7/grepseek; a small academic repo, 47 stars as of 2026-07-08 — code-available, not community-validated). No independent reproductions identified as of `last_reviewed: 2026-07-08`; the paper drew significant attention on Hugging Face Papers (116 upvotes), so follow-up work is likely — revisit at next review.

## Relation to the Arsenal

Sits opposite the index-centric line in this folder — `gao-2022-hyde`, `sarthi-2024-raptor`, `edge-2024-graphrag` all improve what you build *around* an index; this paper argues for skipping the index where direct interaction fits. It is also the research counterpart to the agentic-search behavior of the coding agents cataloged under [agent systems](../../projects/agent-systems/_index.md), which use grep-style corpus interaction as their default retrieval mode.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2605.29307)
- [arXiv](https://arxiv.org/abs/2605.29307)
- [Official Code](https://github.com/alirezasalemi7/grepseek)
