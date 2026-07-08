---
id: liu-2023-lost-in-the-middle
title: "Lost in the Middle: How Language Models Use Long Contexts"
phase: retrieval-and-memory
venue: acl
year: 2023
authors:
  - "Liu, N. F."
  - "Lin, K."
  - "Hewitt, J."
  - "Paranjape, A."
  - "et al. (Stanford / UC Berkeley / Samaya AI)"
arxiv_id: "2307.03172"
arxiv_url: "https://arxiv.org/abs/2307.03172"
pdf_url: "https://arxiv.org/pdf/2307.03172"
code_url: "https://github.com/nelson-liu/lost-in-the-middle"
venue_url: null

practical_applicability: high
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 3000

tldr: "Documented the U-shaped curve: LLMs use information at the beginning and end of long contexts far better than the middle — sometimes scoring worse with relevant context mid-prompt than with no context at all — the finding that shaped RAG context-ordering practice"
key_contribution: "First systematic characterization of positional bias in long-context use: controlled experiments moving the answer-bearing document through the context show robust U-shaped performance across models, proving that a long context window is not the same as effective context use"

builds_on:
  - "lewis-2020-rag"

tags:
  - "rag"
  - "retrieval"
  - "evaluation"
  - "llm"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

As context windows raced upward, this paper asked the question vendors skipped: do models actually *use* all that context? Using multi-document QA where exactly one retrieved document contains the answer, the authors slid that document through every position and measured accuracy. The result is the field's most famous curve: high at the start, high at the end, cratering in the middle — in the worst cases, below the same model's closed-book performance. "Lost in the middle" became both a finding and a design constraint.

## Why it's in the Arsenal

- It is the single most operationally consequential evaluation result for RAG builders: retrieval order is not neutral, and stuffing more chunks into context can *reduce* accuracy — this paper is why reranking-then-reordering exists as a practice
- Its methodology (controlled position sweeps) became the template for long-context evaluation, feeding the needle-in-a-haystack test culture that now accompanies every long-context model release

## Core Contribution

The controlled-position experimental design and its two headline findings: (1) the U-shaped positional curve — primacy and recency effects — robust across models, open and closed; (2) the gap between *having* and *using* context: models with extended windows showed no advantage in using mid-context information, and performance degrades with more documents even when the answer is always present. A synthetic key-value retrieval task isolated the effect from world knowledge.

## Key Results

- GPT-3.5-Turbo's multi-document QA accuracy dropped over 20 points as the answer document moved from the edges to the middle of a 20-document context — mid-context performance fell below its closed-book baseline (2023)
- The U-shape replicated across all evaluated models (GPT-3.5/4, Claude, and open long-context models), with extended-context variants performing no better at equal lengths (2023)
- Adding more retrieved documents degraded performance well before context limits — early quantitative evidence for "retrieve less, retrieve better" (2023)

## Methodology

Multi-document QA built from NaturalQuestions with distractor passages from real retrieval; the gold document's position permuted systematically at 10, 20, and 30 documents. The synthetic key-value task (retrieve a value from a JSON of random UUID pairs) tested pure in-context lookup with no linguistic confounds. Query-aware contextualization and instruction-tuning ablations probed causes.

## Practical Applicability

Directly encoded into RAG best practice: rerank retrieved chunks, then *reorder* so the strongest evidence sits at the context's start or end; cap retrieved chunks by measured quality rather than window capacity; and evaluate your own pipeline with position sweeps rather than trusting the context-length spec. Long-context marketing numbers still routinely exceed effective-use performance, so the paper's skepticism remains the correct prior when choosing between long-context stuffing and retrieval.

## Limitations & Critiques

The evaluation covers extractive QA-style tasks; positional effects on generation, reasoning, and aggregation tasks are less cleanly characterized. Results are a 2023 snapshot: subsequent frontier models trained explicitly for long-context use show much flatter curves on these diagnostics (near-perfect needle tests), though harder multi-needle and aggregation variants still expose mid-context weaknesses. The paper diagnoses the phenomenon more than it explains the mechanism.

## Reproductions & Follow-up Work

Reproduced widely — code and data are public, and the position-sweep design was absorbed into standard long-context evaluation (needle-in-a-haystack, RULER, and successors are its descendants). Follow-up work attributes the bias partly to attention patterns and training-data position distributions, and mitigations (positional interpolation training, attention calibration, context reordering strategies) form an active literature. Model improvements have narrowed but not eliminated the effect.

## Relation to the Arsenal

The evaluation counterweight to the retrieval entries: it motivates the reranking step in `khattab-2020-colbert`-style pipelines and the retrieve-less discipline in RAG architecture entries (architectures/data-strategy/). Pairs with `gao-2023-rag-survey` (surveys/) as required reading before designing context assembly.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2307.03172)
- [arXiv](https://arxiv.org/abs/2307.03172)
- [Code (nelson-liu/lost-in-the-middle)](https://github.com/nelson-liu/lost-in-the-middle)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
