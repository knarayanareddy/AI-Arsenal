---
id: sarthi-2024-raptor
title: "RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval"
phase: retrieval-and-memory
venue: iclr
year: 2024
authors:
  - "Sarthi, P."
  - "Abdullah, S."
  - "Tuli, A."
  - "Khanna, S."
  - "et al."
arxiv_id: "2401.18059"
arxiv_url: "https://arxiv.org/abs/2401.18059"
pdf_url: "https://arxiv.org/pdf/2401.18059"
code_url: "https://github.com/parthsarthi03/raptor"
venue_url: "https://openreview.net/forum?id=GN921JHCRw"

practical_applicability: medium
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 300

tldr: "Showed recursively clustering and summarizing chunks into a multi-level tree lets retrieval pull both fine details and high-level themes -- reach for RAPTOR when queries need cross-document synthesis, not simple fact lookup"
key_contribution: "Built a multi-level tree by recursively embedding, clustering, and summarizing text chunks, so retrieval can pull relevant information from both original fine-grained chunks and higher-level generated summaries depending on what a query needs"

builds_on:
  - lewis-2020-rag
implemented_in: []

tags:
  - rag
  - retrieval
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
enrichment_status: reviewed
---

## Overview

This paper showed that recursively clustering and summarizing text chunks into a multi-level tree structure — rather than retrieving only flat, fixed-size chunks — lets a retrieval system pull information at whatever level of granularity a query actually needs, from specific details in leaf-level chunks to broad themes captured in higher-level generated summaries. This remains current practice for a specific class of retrieval problem: queries requiring synthesis or understanding across a long document, where flat chunk retrieval alone tends to miss information that only becomes apparent when chunks are considered together.

## Why it's in the Arsenal

- Most RAG systems in this catalog and elsewhere default to flat chunk retrieval (split a document into fixed-size pieces, embed and retrieve each independently), which structurally cannot answer questions that require synthesizing information spread across many chunks — RAPTOR's tree-based approach is a direct, validated answer to exactly this gap, integrated into LlamaIndex as a retrieval strategy.
- `practical_applicability: medium` is an honest classification: this is valuable specifically for long-document, synthesis-requiring use cases, not a universal replacement for flat retrieval — most queries most of the time are well-served by simpler flat chunking, and RAPTOR's added indexing complexity is only worth it when your actual query distribution needs cross-chunk synthesis.

## Core Contribution

Prior recursive-summarization approaches to document retrieval either summarized only adjacent chunks (missing distant but related content) or retained only top-level summaries (losing fine-grained detail needed for specific factual queries). This paper's contribution is a tree construction process that recursively clusters *semantically similar* chunks (not just adjacent ones, which is the key difference from prior recursive-summarization work), summarizes each cluster, and repeats this clustering-and-summarizing process on the resulting summaries to build multiple levels of abstraction — with both the original leaf-level chunks and every level of generated summary available for retrieval. In engineering terms: this means retrieval can pull from whichever level of the tree best matches the query's granularity, and because clustering is similarity-based rather than adjacency-based, RAPTOR can group and summarize related content that appears in different, non-adjacent parts of a document — a capability flat or purely-adjacent-chunk approaches structurally lack.

## Key Results

- RAPTOR outperformed established baselines BM25 and Dense Passage Retrieval (DPR) across all tested language models (GPT-3, GPT-4, UnifiedQA-3B) on the QASPER dataset, with F1 scores at least 1.8 points higher than DPR and at least 5.3 points higher than the "title + abstract only" baseline (2024) — the paper's central comparative evaluation
- These specific QASPER benchmark numbers are 2024-era comparisons against specific retrieval baselines; RAPTOR's positioning relative to newer retrieval techniques and embedding models released since should be checked against current comparative literature before being cited as a current-state benchmark
- The paper's own results are strongest on tasks requiring broader document understanding rather than narrow factual lookup, consistent with the technique's design goal of capturing multiple levels of abstraction

## Methodology

RAPTOR first splits a document into small text chunks and embeds each using a standard dense embedding model (paper Section 3). It then clusters chunks by embedding similarity (using Gaussian Mixture Models, not simple adjacency) — critically, chunks that are semantically related but located in different parts of the document can end up in the same cluster, unlike prior work that only grouped adjacent chunks. Each cluster is summarized using an LLM, producing a new, higher-level "node" in the tree; this clustering-and-summarizing process is then repeated recursively on the resulting summary nodes, building successive levels of abstraction until a single root-level summary remains. At retrieval time, RAPTOR supports two strategies: tree traversal (starting at the root and descending into the most relevant branches) or collapsed-tree retrieval (treating every node at every level — original chunks and all levels of generated summaries — as a single flat pool to search directly), with the paper reporting collapsed-tree retrieval as generally more effective in their evaluation (paper Section 4).

## Practical Applicability

If your RAG use case involves queries that require synthesizing or understanding information spread across a long document — "what are the main themes of this report" rather than "what is the value in this specific table" — RAPTOR's tree-based indexing is a validated technique worth adopting, and it's directly available as a retrieval strategy in LlamaIndex rather than requiring you to implement the paper from scratch. If your queries are predominantly narrow factual lookups well-served by matching a query to a single relevant chunk, RAPTOR's additional indexing complexity and cost (building and maintaining a multi-level tree, including re-summarization when documents change) is likely not worth it compared to simpler flat chunk retrieval — evaluate your actual query distribution before adopting this pattern.

## Limitations & Critiques

The clustering-based tree structure is sensitive to updates: adding or removing documents can require recomputing significant portions of the tree, since new content may change which existing chunks cluster together — a limitation independent follow-up work (proposing "adRAP," an adaptive extension of RAPTOR specifically addressing this) directly identifies as a practical barrier for dynamic, frequently-updated datasets, a scenario the original paper's evaluation (static document sets) does not stress-test. Independent analysis has also noted RAPTOR can produce relatively flat tree structures in some cases, potentially missing some of the intended multi-level abstraction benefit depending on the input document's structure and the clustering algorithm's behavior on it. The technique's indexing cost (embedding, clustering, and LLM-based summarization at every tree level) is higher than flat chunking, a tradeoff the original paper's framing emphasizes less than its retrieval-quality gains — teams should weigh this against the narrower benefit RAPTOR provides for non-synthesis-requiring queries. No independent, credible failed-replication challenge to the paper's core empirical claims has been identified as of `last_reviewed: 2026-07-01`; the critiques that have emerged (update-sensitivity, tree-flatness in some cases) are refinements and extensions, not challenges to the core result.

## Reproductions & Follow-up Work

RAPTOR's authors released official code, and the technique has been integrated into LlamaIndex as a documented, ready-to-use retrieval strategy — a direct, practical validation beyond the paper's own academic benchmarks. "adRAP" (adaptive Recursive Abstractive Processing) is a notable independent follow-up specifically addressing RAPTOR's dynamic-dataset update-sensitivity limitation, incrementally adjusting the tree structure rather than requiring full recomputation after each document change.

## Relation to the Arsenal

This paper builds on `lewis-2020-rag` (foundational/), operating within the retrieve-then-generate framing that paper established, applied specifically to the multi-level document-summarization retrieval problem. It is grouped alongside `gao-2022-hyde` and `edge-2024-graphrag` in this phase folder — all three address different specific retrieval-shape problems (zero-shot retrieval without labels, hierarchical tree-based summarization here, and global graph-based summarization respectively) rather than being interchangeable general-purpose RAG techniques.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2401.18059)
- [arXiv](https://arxiv.org/abs/2401.18059)
- [Official Code](https://github.com/parthsarthi03/raptor)
- [Venue Proceedings](https://openreview.net/forum?id=GN921JHCRw)
- [Papers With Code](https://paperswithcode.com/paper/raptor-recursive-abstractive-processing-for)
- [Key Reproduction / Analysis](https://www.educative.io/blog/mastering-rag-with-raptor) — practitioner guide to RAPTOR's LlamaIndex integration, including its tree-traversal and collapsed-tree retrieval mechanisms
