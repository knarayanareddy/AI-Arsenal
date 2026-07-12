---
id: ming-2026-llm-wiki
title: 'Retrieval as Reasoning: Self-Evolving Agent-Native Retrieval via LLM-Wiki'
phase: retrieval-and-memory
venue: arxiv-preprint
year: 2026
authors:
  - Haoliang Ming
  - Feifei Li
  - Xiaoqing Wu
  - Wenhui Que
arxiv_id: '2605.25480'
arxiv_url: https://arxiv.org/abs/2605.25480
pdf_url: https://arxiv.org/pdf/2605.25480
code_url: null
venue_url: https://arxiv.org/abs/2605.25480
practical_applicability: high
reproduction_status: not-reproduced
result_status: current
citation_count_approx: 0
has_code: false
tldr: "Recasts agent retrieval as search, reading, link traversal, and evidence-sufficiency decisions over a compiled, self-evolving wiki rather than flat embedding lookup."
key_contribution: "Introduces structured wiki pages with bidirectional links, tool-calling search/read/follow operations, and an Error Book for structural and semantic correction."
superseded_by: null
builds_on: []
implemented_in: []
corresponding_project_entry: null
tags:
  - rag
  - retrieval
  - agents
  - reasoning
  - memory
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
enrichment_status: draft
---

## Overview

LLM-Wiki treats retrieval for agents as a sequence of searching, reading, traversing, and deciding whether evidence is sufficient. Instead of presenting a flat set of embedding-nearest chunks, it compiles documents into linked wiki pages that an agent can navigate and correct over time.

## Why it's in the Arsenal

Flat chunk retrieval is a weak interface for questions that require several documents, explicit structure, or a decision about whether the current evidence is enough. The paper is valuable as an architecture reference for teams comparing vector lookup with structured, agent-controlled retrieval, while its reported benchmark gains still need independent reproduction.

## Core Contribution

The paper changes the retrieval unit from an isolated chunk to a navigable, compilable knowledge object. A document compiler creates wiki pages and links; tool APIs expose search, page reading, and link traversal; and an Error Book records structural or semantic mistakes for later correction. This gives the agent intermediate evidence and navigation state instead of forcing every decision through one similarity-ranked context window.

## Key Results

- LLM-Wiki reports gains over HippoRAG 2, LightRAG, and GraphRAG on HotpotQA, MuSiQue, and 2WikiMultiHopQA (2026).
- The abstract reports 2.0–8.1 F1-point improvements across the named multi-hop benchmarks (2026).
- It also reports the best overall accuracy on AuthTrace, with stronger results on multi-document structured queries (2026).

## Methodology

The system compiles documents into linked wiki pages and evaluates agent-native search, read, and link-follow operations on multi-hop QA and structured-query tasks. The Error Book feeds structural or semantic corrections back into the compiled knowledge representation. The comparison is against retrieval systems that include graph and memory-oriented baselines, not only a plain vector index.

## Practical Applicability

Use the paper to design an A/B test between flat, hybrid, graph, and agent-navigated retrieval. Measure index compilation cost, link correctness, tool calls, evidence sufficiency, citation quality, context tokens, and answer accuracy. Keep the compiled structure versioned so a self-correction cycle cannot silently change past evaluations.

## Limitations & Critiques

The reported results are paper-specific and have not been independently reproduced here. Compilation and Error Book maintenance can be more expensive than chunk indexing, and incorrect links can make a structured representation confidently misleading. The benchmark domains may favor documents with recoverable structure and do not establish production behavior on arbitrary corpora.

## Reproductions & Follow-up Work

Reproduce the named benchmarks with pinned document compilation, tool budgets, and prompts. Then test noisy enterprise documents, changing facts, partial links, and a fixed-cost baseline; report both retrieval quality and the maintenance cost of the evolving wiki.

## Relation to the Arsenal

LLM-Wiki connects advanced RAG, graph/structured retrieval, agent tool use, and memory. It is a retrieval architecture hypothesis, not a universal replacement for vector search.

## Resources

- [Primary source](https://arxiv.org/abs/2605.25480)
- [HTML paper](https://arxiv.org/html/2605.25480v2)
