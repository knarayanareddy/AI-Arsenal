---
id: gao-2023-rag-survey
title: "Retrieval-Augmented Generation for Large Language Models: A Survey"
phase: surveys
venue: arxiv-preprint
year: 2023
authors:
  - "Gao, Y."
  - "Xiong, Y."
  - "Gao, X."
  - "Jia, K."
  - "Pan, J."
  - "Bi, Y."
  - "Dai, Y."
  - "Sun, J."
  - "Wang, M."
  - "Wang, H."
arxiv_id: "2312.10997"
arxiv_url: "https://arxiv.org/abs/2312.10997"
pdf_url: "https://arxiv.org/pdf/2312.10997"
code_url: "https://github.com/Tongji-KGLLM/RAG-Survey"
venue_url: null

practical_applicability: high
reproduction_status: no-code
result_status: current
has_code: true
citation_count_approx: 3000

tldr: "The standard map of the RAG landscape: organizes the field into Naive, Advanced, and Modular RAG paradigms and systematizes retrieval, generation, and augmentation techniques — the orientation document for anyone building retrieval systems"
key_contribution: "Established the Naive → Advanced → Modular RAG progression as the field's shared taxonomy, decomposing the space into pre-retrieval (query rewriting, routing), retrieval (embedding choice, chunking), post-retrieval (reranking, compression), and generation stages, plus an evaluation-framework synthesis"

builds_on:
  - "lewis-2020-rag"

tags:
  - "rag"
  - "retrieval"
  - "llm"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

This survey organizes the sprawling RAG literature into a coherent developmental arc: Naive RAG (embed-retrieve-stuff-generate), Advanced RAG (adding pre-retrieval optimization like query rewriting and post-retrieval steps like reranking and context compression), and Modular RAG (recomposable retrieval/memory/routing/prediction modules with iterative and adaptive patterns). It then systematizes the core axes — retrieval sources and granularity, embedding and indexing choices, augmentation loops, and evaluation frameworks — with a technology tree tracing the field's evolution.

## Why it's in the Arsenal

- RAG is the most-built pattern in applied LLM engineering and the most fragmented literature; this survey supplies the shared vocabulary (advanced/modular RAG, pre/post-retrieval optimization) that RAG framework docs and this catalog's retrieval entries implicitly assume
- Its stage decomposition doubles as a debugging checklist for production RAG: each stage it names is a distinct failure locus (chunking, retrieval, reranking, generation grounding)

## Core Contribution

The taxonomy itself became the field's working language: 'advanced RAG' and 'modular RAG' are now standard terms in framework documentation and engineering discussions, and the survey's stage decomposition (pre-retrieval / retrieval / post-retrieval / generation) gave practitioners a shared structural frame for both architecture decisions and failure analysis. It also consolidated the then-scattered evaluation landscape (faithfulness, answer relevance, context relevance — the RAGAS-style triad) into one reference.

## Key Results

- Synthesized 100+ RAG techniques into three paradigms with explicit lineage, showing how iterative/recursive/adaptive retrieval variants relate rather than compete (survey Sections 2-3, 2023)
- Systematized retrieval-granularity trade-offs (token/sentence/chunk/document/graph) and indexing strategies, mapping which techniques address which failure mode (2023)
- Consolidated RAG evaluation into retrieval-quality and generation-quality axes with the downstream frameworks (RAGAS, ARES, TruLens-style triads) that operationalize them (2023)

## Methodology

Literature survey methodology: papers are organized along the three-paradigm arc and decomposed by pipeline stage; each technique is classified by which stage it modifies and which deficiency of Naive RAG it addresses (retrieval precision, context noise, generation grounding); evaluation section catalogs benchmarks, metrics, and tooling; a concluding roadmap identifies open problems (long-context vs RAG, robustness, multimodal RAG).

## Practical Applicability

Use it as the decision map it became: when a RAG system underperforms, the survey's stage decomposition localizes the intervention — query rewriting and routing for intent mismatch, chunking/embedding changes for recall, reranking and compression for precision and context noise, iterative retrieval for multi-hop questions. Reading it before building prevents the most common failure of RAG projects: treating 'RAG' as one technique rather than a pipeline of independently tunable stages.

## Limitations & Critiques

A survey's shelf life: it predates the long-context-vs-RAG debates matured in 2024-25, agentic RAG patterns, and late-interaction/multi-vector production adoption, so its frontier sections are dated even though the taxonomy holds. It catalogs techniques without adjudicating between them — few quantitative comparisons under matched conditions — so it orients but does not settle architecture choices; and 'Modular RAG' is defined loosely enough that much of the current agentic-retrieval work fits only awkwardly.

## Reproductions & Follow-up Work

Widely cited as the field's reference taxonomy; the authors' companion 'Modular RAG' paper (2024) deepened the third paradigm, and successor surveys (agentic RAG, graph-RAG) extend the frame. The stage vocabulary it standardized structures the documentation of RAG tooling across the ecosystem (LlamaIndex/LangChain advanced-RAG guides, evaluation frameworks).

## Relation to the Arsenal

The map for the territory this catalog covers in depth: `lewis-2020-rag` (foundational/) is where the term began, `karpukhin-2020-dpr` and `khattab-2020-colbert` (retrieval-and-memory/) are its retrieval substrate, `gao-2022-hyde`, `sarthi-2024-raptor`, and `edge-2024-graphrag` are Advanced/Modular techniques it classifies, and the RAG guidance in content/skills/applied/building-rag-systems.md follows its stage decomposition.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2312.10997)
- [arXiv](https://arxiv.org/abs/2312.10997)
- [Code](https://github.com/Tongji-KGLLM/RAG-Survey)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
