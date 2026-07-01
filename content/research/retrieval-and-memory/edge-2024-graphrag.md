---
id: edge-2024-graphrag
title: "From Local to Global: A Graph RAG Approach to Query-Focused Summarization"
phase: retrieval-and-memory
venue: arxiv-preprint
year: 2024
authors:
  - "Edge, D."
  - "Trinh, H."
  - "Cheng, N."
  - "Bradley, J."
  - "et al."
arxiv_id: "2404.16130"
arxiv_url: "https://arxiv.org/abs/2404.16130"
pdf_url: "https://arxiv.org/pdf/2404.16130"
code_url: "https://github.com/microsoft/graphrag"
venue_url: null

practical_applicability: low
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 400

tldr: "Built a knowledge-graph index with hierarchical community summaries for global, holistic corpus queries -- reach for GraphRAG only for 'summarize the whole dataset' queries, given its indexing cost runs 100x-6000x that of standard vector RAG"
key_contribution: "Showed constructing an LLM-derived knowledge graph from a corpus, then generating hierarchical community summaries over that graph, enables answering global, holistic queries (e.g. 'what are the main themes across this entire dataset') that standard retrieve-then-generate RAG structurally cannot answer well"

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

This paper showed that constructing an LLM-extracted knowledge graph from a corpus, then generating hierarchical community summaries over that graph, enables answering global, holistic queries — "what are the main themes across this entire dataset" — that standard retrieve-then-generate RAG structurally cannot answer well, since standard RAG retrieves a small number of individually-relevant chunks rather than synthesizing across an entire corpus. This remains current for its specific narrow use case, but independent post-publication cost analysis has found GraphRAG's indexing cost can run 100x to 6,000x that of standard vector RAG depending on configuration, which is the single most important practical fact for anyone evaluating whether to adopt it.

## Why it's in the Arsenal

- GraphRAG addresses a genuinely distinct problem that standard chunk-based RAG cannot solve well: queries requiring a holistic understanding of an entire corpus rather than a specific, locally-answerable fact — this is a real, narrow, recurring need (e.g. "summarize the themes across all incident reports this quarter"), and this paper is the reference architecture for it.
- `practical_applicability: low` is a deliberately honest, non-inflated classification: this is a narrow-use-case technique, not general-purpose RAG, and its substantial indexing cost (documented in Limitations below) means most teams should confirm they actually have global/holistic query needs before adopting it, rather than reaching for it as a default "better RAG."

## Core Contribution

Standard RAG (see `lewis-2020-rag`) retrieves a small number of individually relevant chunks and generates an answer conditioned on them — a pattern well suited to specific, locally-answerable questions but structurally unable to answer questions requiring synthesis across information spread throughout an entire large corpus, since no small set of retrieved chunks can represent "the whole dataset's themes." This paper's contribution is a graph-based indexing pipeline: an LLM extracts entities and relationships from the corpus to build a knowledge graph, a community-detection algorithm partitions that graph into hierarchical clusters ("communities") of related entities, and an LLM generates a summary for each community at each level of the hierarchy. At query time, for global questions, the system can generate partial answers from multiple relevant community summaries and combine them into a final answer — directly addressing the global-summarization gap standard chunk-retrieval RAG has.

## Key Results

- GraphRAG demonstrated substantial improvements over standard RAG specifically on query-focused, global summarization tasks in the paper's own evaluation (2024) — the paper's central claim, targeted at exactly the query type standard RAG is weakest on
- Independent 2025-2026 benchmark analyses report GraphRAG achieving up to 3.4x accuracy improvement over vector RAG specifically on queries requiring entity-relationship understanding, and notably higher accuracy on numerical and temporal reasoning tasks in at least one independent comparison — evidence the paper's core claim (better performance on relationship/synthesis-heavy queries) has held up in subsequent third-party evaluation, not just the original paper's own benchmarks
- The same independent analyses report GraphRAG's query-time latency running roughly 2.3x higher than standard vector RAG on average, with one study finding it consuming around 610,000 tokens per retrieval compared to roughly 100 tokens for lightweight alternatives — a substantial and directly relevant cost finding dated to the independent 2025 analysis, not the original paper

## Methodology

The indexing pipeline has two main stages (paper Section 3): first, an LLM processes the corpus to extract entities and their relationships, constructing a knowledge graph; second, a community-detection algorithm (the paper uses Leiden clustering) partitions this graph into a hierarchy of communities at multiple levels of granularity, and an LLM generates a natural-language summary for each community at each level. At query time, for a global/holistic question, the system distributes the query across relevant community summaries (typically at a chosen level of the hierarchy), generates a partial answer from each, and then combines these partial answers into a final response — a map-reduce-style pattern over the pre-computed summaries, rather than retrieving and reasoning over raw chunks directly. This indexing process (entity/relationship extraction plus multi-level summarization, all LLM-driven) is what gives GraphRAG its global-summarization capability, and is also the direct source of its substantial indexing cost, since it requires the LLM to process the entire corpus multiple times during construction rather than only at query time.

## Practical Applicability

If your actual query distribution includes genuine "understand the whole corpus" style questions — cross-document theme summarization, holistic relationship queries a single retrieved chunk could never answer — GraphRAG's architecture is a validated, purpose-built solution that standard vector RAG cannot match on this specific query type, evidenced by independent third-party benchmarks showing substantial accuracy gains on relationship-heavy and holistic queries. If your query distribution is predominantly specific, locally-answerable factual lookups (which is the common case for most production RAG systems), GraphRAG's indexing cost — independently documented as 100x to 6,000x that of vector RAG depending on configuration, plus 2-8 second additional query latency for some variants — is very unlikely to be worth it, and standard vector RAG (or a lighter-weight graph variant, see Limitations) is the better default. Microsoft's own more recent variants (LazyGraphRAG, deferring expensive community summarization until query time) and independent lighter-weight alternatives (LightRAG, reported at 70-90% of full GraphRAG's performance for roughly 1% of the cost) exist specifically because the original architecture's indexing cost is a genuine, widely-recognized adoption barrier — evaluate these before committing to the full original architecture.

## Limitations & Critiques

Indexing cost is GraphRAG's most significant, well-documented limitation: independent 2025-2026 analyses report indexing an 800KB text corpus with GPT-4.1-class models costing approximately $10-15, with one study finding token consumption per retrieval up to 6,000x higher than lightweight alternatives — Microsoft's own documentation explicitly warns that indexing can be costly and recommends starting with small corpora. The original architecture (what independent analysis terms "Type 3" full GraphRAG) has no support for incremental updates — adding new documents to an already-indexed corpus requires substantial re-processing, a limitation similar in kind to RAPTOR's update-sensitivity (see `sarthi-2024-raptor`) but generally reported as more severe given GraphRAG's heavier indexing pipeline. Entity resolution quality is a practical failure mode independent analysis has flagged repeatedly: the same real-world entity extracted with different surface forms ("Dr. John Smith" vs. "J. Smith" vs. "John") can fragment the graph if deduplication is inadequate, directly degrading the community structure the technique depends on. Microsoft has itself responded to the cost criticism with Dynamic Community Selection (reported to reduce token usage by 79% while maintaining answer quality) and LazyGraphRAG (deferring community summarization until query time, reported at roughly 0.1% of standard indexing cost with increased query latency as the tradeoff) — meaning the cost critique is substantive enough that even the original authors' own organization has shipped mitigations, not merely a third-party complaint the paper's authors dispute.

## Reproductions & Follow-up Work

Microsoft released official code for GraphRAG, and independent third-party benchmark studies (cited throughout this entry) have both validated the paper's core accuracy claims on relationship/synthesis-heavy queries and independently quantified its cost profile in more operational detail than the original paper's own evaluation emphasized. Notable follow-up variants include Microsoft's own LazyGraphRAG and Dynamic Community Selection (both directly targeting the indexing-cost limitation), and the independently developed LightRAG (a simpler flat-graph structure targeting a more favorable cost/performance tradeoff for use cases that don't need full hierarchical community structure).

## Relation to the Arsenal

This paper builds on `lewis-2020-rag` (foundational/), extending that paper's retrieve-then-generate framing specifically to address the global/holistic-query gap standard RAG has. It is grouped alongside `gao-2022-hyde` and `sarthi-2024-raptor` in this phase folder as the third of three distinct approaches to different retrieval-shape problems — of the three, this is the narrowest in applicability (per `practical_applicability: low`) and the most operationally expensive, so it should be the last one evaluated, and only once you've confirmed your actual query distribution genuinely needs global/holistic synthesis that the other two techniques (and standard RAG) cannot provide.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2404.16130)
- [arXiv](https://arxiv.org/abs/2404.16130)
- [Official Code](https://github.com/microsoft/graphrag)
- [Papers With Code](https://paperswithcode.com/paper/from-local-to-global-a-graph-rag-approach-to)
- [Key Reproduction / Analysis](https://tianpan.co/blog/2026-04-09-graphrag-production-when-vector-search-hits-ceiling/) — 2026 independent production analysis of GraphRAG's cost structure, Microsoft's LazyGraphRAG/Dynamic Community Selection mitigations, and the LightRAG lighter-weight alternative
