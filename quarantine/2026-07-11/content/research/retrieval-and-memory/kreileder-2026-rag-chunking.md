---
id: kreileder-2026-rag-chunking
title: "Evaluating Chunking Strategies for Retrieval-Augmented Generation on Academic Texts"
phase: retrieval-and-memory
venue: arxiv-preprint
year: 2026
authors:
  - Valentin J. J. Kreileder
  - Johannes Reisinger
  - Andreas Fischer
arxiv_id: '2607.01852'
arxiv_url: https://arxiv.org/abs/2607.01852
pdf_url: https://arxiv.org/pdf/2607.01852
code_url: null
venue_url: https://arxiv.org/abs/2607.01852
practical_applicability: medium
reproduction_status: not-reproduced
result_status: current
has_code: false
citation_count_approx: 0
tldr: "Finds that semantic cluster chunking did not beat simpler chunking in the tested academic-text RAG setup and questions the reliability of one faithfulness metric."
key_contribution: "Compares cluster-based semantic, fixed-size, and recursive chunking on long structured theses using RAGAs-style evaluation, including fixed and document-specific questions."
superseded_by: null
builds_on: []
implemented_in: []
corresponding_project_entry: null
tags:
  - rag
  - retrieval
  - evaluation
  - benchmark
  - research
  - llm
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
enrichment_status: draft
---

## Overview

Evaluating Chunking Strategies for Retrieval-Augmented Generation on Academic Texts is a recent 2026 preprint about a concrete AI engineering evaluation problem.

## Why it's in the Arsenal

The work is useful because it exposes a measurement or reliability failure that can be hidden by aggregate benchmark scores. It is cataloged as a paper-reported result, not as an independently verified production guarantee.

## Core Contribution

Compares cluster-based semantic, fixed-size, and recursive chunking on long structured theses using RAGAs-style evaluation, including fixed and document-specific questions.

## Key Results

The 2026 paper reports no advantage for cluster-based chunking under its configuration and finds that RAGAs faithfulness has limited reliability in this setup.

## Methodology

The authors build a RAG evaluation over academic texts, vary chunking methods and question types, and analyze retrieval and answer-quality metrics against document formatting and preprocessing.

## Practical Applicability

Treat chunking as a workload-specific hypothesis. Evaluate fixed, recursive, and semantic strategies with questions that reflect real document structure and verify metric behavior.

## Limitations & Critiques

The corpus is academic theses, the study is a single preprint configuration, and metric reliability may differ across judges, domains, and document formats.

## Reproductions & Follow-up Work

Re-run with a versioned corpus, human factuality labels, varied chunk sizes, and independent retrieval/answer metrics before changing a production pipeline.

## Relation to the Arsenal

This entry complements the Arsenal's research, evaluation, multimodal, code-generation, and retrieval content. Use it to design a controlled test and record the assumptions that matter for your workload.

## Resources

- [Primary source](https://arxiv.org/abs/2607.01852)
- [PDF](https://arxiv.org/pdf/2607.01852)
