---
id: "building-rag-systems"
title: "Building RAG Systems"
entry_type: "guide"
section: "skills"
description: "The skill of building retrieval-augmented generation: ingestion, chunking, retrieval quality, and grounded generation"
tags:
  - rag
  - retrieval
  - embeddings
  - chunking
related_entries: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

RAG grounds model answers in your documents by retrieving relevant context at query time. The skill is a pipeline discipline: ingestion → chunking → indexing → retrieval → ranking → grounded generation, where retrieval quality — not the LLM — is usually the bottleneck.

## Why It's in the Arsenal

RAG is the default architecture for knowledge-intensive LLM applications, and the most common one to be built badly: teams tune prompts for weeks when the real problem is that the answer was never retrieved.

## Key Features

### Core Concepts

- Retrieval quality bounds answer quality: if the context does not contain the answer, no prompt fixes it — measure retrieval (recall@k) separately from generation.
- Chunking is a modeling decision: chunk boundaries determine what an embedding represents; respect document structure over fixed character counts.
- Hybrid search (dense + keyword) covers exact terms, IDs, and jargon that embeddings miss; add reranking only after recall is acceptable.
- Grounding must be enforced: instruct answers-from-context-only, require citations, and eval faithfulness.
- Metadata filters (recency, source, permissions) often improve results more than embedding-model upgrades.

### Practical Workflow

1. Build a labeled retrieval eval set (question → documents that contain the answer) before tuning anything.
2. Start simple: sensible chunks, one good embedding model, top-k dense retrieval.
3. Measure recall@k; fix ingestion/chunking first, add hybrid search second, reranking third.
4. Log retrieved chunks beside every answer — most "hallucinations" are retrieval misses.
5. Only then tune generation: context ordering, citation format, refusal-when-absent behavior.

## Architecture / How It Works

Offline, documents are parsed, chunked, embedded, and indexed with metadata. Online, the query is embedded (optionally rewritten), candidates are retrieved and reranked, and the top chunks are assembled into a delimited, budgeted context for generation. Advanced variants (query decomposition, GraphRAG, RAPTOR-style hierarchies) elaborate individual stages — the skeleton stays fixed.

## Getting Started

```text
Debugging order for a bad RAG answer:
1. Was the answer in the corpus at all?        (ingestion gap)
2. Was it in a retrievable chunk?              (chunking problem)
3. Was that chunk in the top-k?                (retrieval problem)
4. Did the model use it?                       (context/grounding problem)
Fix in that order. Never start at 4.
```

## Use Cases

1. **Scenario**: Internal knowledge assistant over wikis, tickets, and docs with per-team permissions
2. **Scenario**: Customer-facing product QA that must cite sources and refuse out-of-scope questions
3. **Scenario**: Deciding whether fresh or per-customer knowledge belongs in retrieval instead of fine-tuning

## Strengths

- Updatable knowledge without retraining; per-request access control is possible
- Every stage is independently measurable and improvable
- Failure analysis is tractable — the 4-step debugging order localizes most issues

## Limitations / When NOT to Use

- Wrong tool for style/format consistency — that is fine-tuning's job
- Poor fit for whole-corpus reasoning ("summarize everything") — retrieval selects, it does not aggregate
- Parsing messy PDFs/tables is often the real cost center; budget for ingestion quality

## Integration Patterns

- Pick storage with [choose a vector DB](../../architectures/data-strategy/choose-vector-db.md); [Qdrant](../../projects/data-and-retrieval/qdrant.md) and [pgvector](../../projects/data-and-retrieval/pgvector.md) are cataloged options; parse with [Docling](../../projects/data-and-retrieval/docling.md) or [Unstructured](../../projects/data-and-retrieval/unstructured.md).
- Apply the rag-and-retrieval tips, starting with [hybrid search for exact terms](../../tips-and-tricks/rag-and-retrieval/add-hybrid-search-for-exact-terms.md) and [evaluate embedding models before rechunking](../../tips-and-tricks/rag-and-retrieval/evaluate-embedding-models-before-rechunking.md).
- Grade faithfulness with [Ragas](../../projects/benchmarks-and-evals/ragas-rag-evaluation.md).

## Resources

- [RAG paper (Lewis 2020)](../../research/foundational/lewis-2020-rag.md)
- [Embeddings](../core-concepts/embeddings.md)
- [Production RAG reference stack](../../architectures/reference-stacks/production-rag.md)
- [Starter RAG chatbot build example](../../build-examples/rag-systems/starter-basic-rag-chatbot.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-07-07 by @maintainer*
