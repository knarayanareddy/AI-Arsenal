---
title: "Retrieval and Memory Research"
section: "research/retrieval-and-memory"
auto_generated: false
---

# Retrieval and Memory Research

## What belongs here

RAG techniques, dense and hybrid retrieval, long-context memory strategies, knowledge-graph-backed retrieval, vector indexing approaches, and retrieval-specific evaluation techniques (like HyDE's zero-shot retrieval or RAPTOR's hierarchical summarization) — papers whose primary contribution is how a system finds and incorporates external information.

## What does NOT belong here

The paper that coined the term "RAG" itself ([Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](../foundational/lewis-2020-rag.md)) lives in `foundational/`, not here, because nearly every entry in this folder is implicitly building on the vocabulary and framing it established — see that entry's placement rationale for the reasoning. A paper about evaluating RAG pipeline quality (rather than proposing a retrieval technique itself) belongs in `evaluation-and-safety/` (see `ragas-paper` there).

## Engineering frame

When I am designing a retrieval or memory system for an LLM application, which technique fits my specific retrieval problem (global summarization vs. targeted lookup vs. zero-shot retrieval without labeled data), and is it still the current default or has simpler tooling superseded it in practice?

## Reading order guidance

- Read [Precise Zero-Shot Dense Retrieval without Relevance Labels (HyDE)](./gao-2022-hyde.md) first for the narrowest, most broadly-applicable technique (useful specifically when you lack labeled relevance data).
- Read [RAPTOR](./sarthi-2024-raptor.md) next for hierarchical, multi-level summarization retrieval — a different retrieval shape than flat top-k search.
- Read [From Local to Global: A Graph RAG Approach to Query-Focused Summarization](./edge-2024-graphrag.md) last — the narrowest-scope entry in this folder, useful specifically for global/holistic summarization queries over private corpora, not general-purpose RAG.

## Papers in this phase

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Retrieval And Memory in This Phase

### Recently Added

- [Memory is Reconstructed, Not Retrieved: Graph Memory for LLM Agents](./ji-2026-mragent.md)
- [Dense Passage Retrieval for Open-Domain Question Answering](./karpukhin-2020-dpr.md)
- [ColBERT: Efficient and Effective Passage Search via Contextualized Late Interaction over BERT](./khattab-2020-colbert.md)
- [MemGPT: Towards LLMs as Operating Systems](./packer-2023-memgpt.md)
- [GrepSeek: Training Search Agents for Direct Corpus Interaction](./salemi-2026-grepseek.md)
- [From Local to Global: A Graph RAG Approach to Query-Focused Summarization](./edge-2024-graphrag.md)
- [Precise Zero-Shot Dense Retrieval without Relevance Labels](./gao-2022-hyde.md)
- [RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval](./sarthi-2024-raptor.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [From Local to Global: A Graph RAG Approach to Query-Focused Summarization](./edge-2024-graphrag.md) — Built a knowledge-graph index with hierarchical community summaries for global, holistic corpus queries -- reach for GraphRAG only for 'summarize the whole dataset' queries, given its indexing cost runs 100x-6000x that of standard vector RAG
- [Precise Zero-Shot Dense Retrieval without Relevance Labels](./gao-2022-hyde.md) — Showed you can retrieve well in a zero-shot setting by generating a hypothetical answer first and embedding that instead of the raw query, meaning you should reach for HyDE specifically when you have no labeled relevance data to train or fine-tune a retriever
- [Memory is Reconstructed, Not Retrieved: Graph Memory for LLM Agents](./ji-2026-mragent.md) — Replaces static retrieve-then-reason agent memory with active reconstruction over a Cue-Tag-Content graph -- the agent iteratively explores and prunes retrieval paths as evidence accumulates, gaining up to 23% on LoCoMo/LongMemEval while cutting tokens
- [Dense Passage Retrieval for Open-Domain Question Answering](./karpukhin-2020-dpr.md) — Showed a simple dual-encoder trained with in-batch negatives beats BM25 for passage retrieval — the paper that made dense embedding retrieval the default, and the direct ancestor of every embedding model powering today's RAG stacks
- [ColBERT: Efficient and Effective Passage Search via Contextualized Late Interaction over BERT](./khattab-2020-colbert.md) — Introduced late interaction: keep one vector per token and score via MaxSim at query time, capturing term-level matching that single-vector retrieval loses — the architecture behind ColBERTv2/PLAID and modern multi-vector rerankers
- [MemGPT: Towards LLMs as Operating Systems](./packer-2023-memgpt.md) — Framed context-window management as an OS problem: the LLM manages its own memory hierarchy via self-editing function calls, paging information between in-context 'main memory' and external storage — the founding pattern of agent memory systems
- [GrepSeek: Training Search Agents for Direct Corpus Interaction](./salemi-2026-grepseek.md) — Trains a compact search agent to find evidence by issuing shell commands (grep-style) directly against the corpus instead of querying a vector index -- validates the index-free retrieval pattern coding agents already use, and shows how to train for it
- [RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval](./sarthi-2024-raptor.md) — Showed recursively clustering and summarizing chunks into a multi-level tree lets retrieval pull both fine details and high-level themes -- reach for RAPTOR when queries need cross-document synthesis, not simple fact lookup
