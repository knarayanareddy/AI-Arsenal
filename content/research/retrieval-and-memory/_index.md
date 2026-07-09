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

- [Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection](./asai-2023-self-rag.md)
- [Improving Language Models by Retrieving from Trillions of Tokens](./borgeaud-2021-retro.md)
- [REALM: Retrieval-Augmented Language Model Pre-Training](./guu-2020-realm.md)
- [Leveraging Passage Retrieval with Generative Models for Open Domain Question Answering (Fusion-in-Decoder)](./izacard-2020-fid.md)
- [Unsupervised Dense Information Retrieval with Contrastive Learning (Contriever)](./izacard-2021-contriever.md)
- [Memory is Reconstructed, Not Retrieved: Graph Memory for LLM Agents](./ji-2026-mragent.md)
- [Billion-scale similarity search with GPUs](./johnson-2017-faiss.md)
- [Dense Passage Retrieval for Open-Domain Question Answering](./karpukhin-2020-dpr.md)
- [ColBERT: Efficient and Effective Passage Search via Contextualized Late Interaction over BERT](./khattab-2020-colbert.md)
- [Lost in the Middle: How Language Models Use Long Contexts](./liu-2023-lost-in-the-middle.md)

### Most Popular

_No star-tracked entries yet._

### Browse All

- [Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection](./asai-2023-self-rag.md) — Trains an LM to emit reflection tokens deciding when to retrieve and whether retrieved passages support its output — making retrieval adaptive and self-critiqued instead of always-on, and improving factuality over standard RAG
- [Improving Language Models by Retrieving from Trillions of Tokens](./borgeaud-2021-retro.md) — RETRO augments a Transformer with chunk-level retrieval from a trillions-of-tokens database via cross-attention, letting a small model match much larger ones -- retrieval as a way to move knowledge out of parameters and into an index
- [From Local to Global: A Graph RAG Approach to Query-Focused Summarization](./edge-2024-graphrag.md) — Built a knowledge-graph index with hierarchical community summaries for global, holistic corpus queries -- reach for GraphRAG only for 'summarize the whole dataset' queries, given its indexing cost runs 100x-6000x that of standard vector RAG
- [Precise Zero-Shot Dense Retrieval without Relevance Labels](./gao-2022-hyde.md) — Showed you can retrieve well in a zero-shot setting by generating a hypothetical answer first and embedding that instead of the raw query, meaning you should reach for HyDE specifically when you have no labeled relevance data to train or fine-tune a retriever
- [REALM: Retrieval-Augmented Language Model Pre-Training](./guu-2020-realm.md) — First model to pretrain a language model jointly with a learned neural retriever over Wikipedia, backpropagating through retrieval — establishing that external knowledge can be a trained component of an LM rather than a bolt-on
- [Leveraging Passage Retrieval with Generative Models for Open Domain Question Answering (Fusion-in-Decoder)](./izacard-2020-fid.md) — Fusion-in-Decoder: encode each retrieved passage independently, concatenate the encodings, and let the decoder attend across all of them — scaling QA accuracy monotonically with passage count at linear (not quadratic) encoding cost
- [Unsupervised Dense Information Retrieval with Contrastive Learning (Contriever)](./izacard-2021-contriever.md) — Trained a competitive dense retriever with no labeled query-document pairs, using contrastive learning over automatically-constructed positive pairs — strong zero-shot retrieval and a much better fine-tuning starting point than BM25 or random init.
- [Memory is Reconstructed, Not Retrieved: Graph Memory for LLM Agents](./ji-2026-mragent.md) — Replaces static retrieve-then-reason agent memory with active reconstruction over a Cue-Tag-Content graph -- the agent iteratively explores and prunes retrieval paths as evidence accumulates, gaining up to 23% on LoCoMo/LongMemEval while cutting tokens
- [Billion-scale similarity search with GPUs](./johnson-2017-faiss.md) — The FAISS paper — GPU-accelerated similarity search with product quantization that made billion-vector nearest-neighbor search practical, underpinning large-scale retrieval and vector-store backends
- [Dense Passage Retrieval for Open-Domain Question Answering](./karpukhin-2020-dpr.md) — Showed a simple dual-encoder trained with in-batch negatives beats BM25 for passage retrieval — the paper that made dense embedding retrieval the default, and the direct ancestor of every embedding model powering today's RAG stacks
- [ColBERT: Efficient and Effective Passage Search via Contextualized Late Interaction over BERT](./khattab-2020-colbert.md) — Introduced late interaction: keep one vector per token and score via MaxSim at query time, capturing term-level matching that single-vector retrieval loses — the architecture behind ColBERTv2/PLAID and modern multi-vector rerankers
- [Lost in the Middle: How Language Models Use Long Contexts](./liu-2023-lost-in-the-middle.md) — Documented the U-shaped curve: LLMs use information at the beginning and end of long contexts far better than the middle — sometimes scoring worse with relevant context mid-prompt than with no context at all — the finding that shaped RAG context-ordering practice
- [Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs](./malkov-2016-hnsw.md) — Introduced the HNSW graph index for approximate nearest-neighbor search — the algorithm powering most production vector databases and the retrieval step of essentially every RAG system
- [MemGPT: Towards LLMs as Operating Systems](./packer-2023-memgpt.md) — Framed context-window management as an OS problem: the LLM manages its own memory hierarchy via self-editing function calls, paging information between in-context 'main memory' and external storage — the founding pattern of agent memory systems
- [Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks](./reimers-2019-sentence-bert.md) — Sentence-BERT: fine-tune BERT in a siamese architecture so sentences map to independently comparable embeddings — turning O(n²) cross-encoder comparison into O(n) encoding + vector similarity, and spawning the sentence-transformers library that underpins semantic search and RAG
- [GrepSeek: Training Search Agents for Direct Corpus Interaction](./salemi-2026-grepseek.md) — Trains a compact search agent to find evidence by issuing shell commands (grep-style) directly against the corpus instead of querying a vector index -- validates the index-free retrieval pattern coding agents already use, and shows how to train for it
- [RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval](./sarthi-2024-raptor.md) — Showed recursively clustering and summarizing chunks into a multi-level tree lets retrieval pull both fine details and high-level themes -- reach for RAPTOR when queries need cross-document synthesis, not simple fact lookup
