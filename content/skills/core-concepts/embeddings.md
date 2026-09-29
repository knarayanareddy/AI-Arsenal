---
id: "embeddings"
title: "Embeddings"
entry_type: "guide"
section: "skills"
description: "Practical guide to embeddings for retrieval, clustering, semantic search, and RAG"
tags:
  - embeddings
  - rag
  - retrieval
related_entries: []
added_date: "2026-06-14"
last_reviewed: "2026-06-14"
added_by: "maintainer"
status: "active"
---

## Overview

The embedding layer as an engineering decision rather than a model choice: what similarity means, why the metric is a correctness question, and why changing the encoder means re-embedding everything. The published retrieval scores are treated as conditional on their own chunking and pooling choices.

## Why It's in the Arsenal

The embedding model is chosen once and paid for on every query afterwards, and the decisions that determine whether it suits a corpus — metric, dimensionality, pooling, chunking — are made once and rarely revisited. Stating them as engineering decisions rather than model choices is the contribution, because the failure is a silent quality loss rather than an error.

## Key Features

- Treats the similarity metric as a correctness question, since the wrong one degrades results silently.
- Makes re-embedding cost explicit, because it dominates the decision to change encoder.
- Conditions published scores on their chunking and pooling choices, so they are not transferred blindly.

## Architecture / How It Works

Embeddings convert content into vectors. Retrieval systems compare query vectors to document vectors, then pass the top results to an LLM, reranker, or downstream system.

## Getting Started

```bash
# Minimal retrieval mental model
query_vector = embed(question)
results = vector_db.search(query_vector, top_k=8)
```

## Use Cases

1. **Scenario**: you are choosing an embedding model and need to know which properties actually transfer to your domain.
2. **Scenario**: your retrieval quality is poor and you need to work out whether the embeddings, the chunking or the index is at fault.
3. **Scenario**: you are reducing embedding dimensionality or changing model and need to know what that costs you.

## Strengths

- Explains similarity choices as a correctness question, not a tuning detail, because the wrong metric degrades results silently.
- Makes re-embedding cost explicit, since it dominates the decision to change encoder.
- Notes that published retrieval scores depend on their own chunking and pooling, so the numbers do not transfer automatically.

## Limitations / When NOT to Use

- Benchmark scores for embedding models come from retrieval suites with their own chunking and pooling choices, so transferring a number to your pipeline is an assumption.
- Similarity means different things per model: cosine, dot product and normalised inner product are not interchangeable, and getting this wrong degrades results silently.
- Changing the encoder means re-embedding the entire corpus, which is the dominant cost of the decision and is usually underestimated.

## Integration Patterns

- Link this concept from every vector-store and RAG entry, since the store cannot compensate for an embedding-side problem.
- When a build example changes its embedding model, note the re-index requirement rather than only the model name.

## Resources

- [Choose a Vector Database](../../architectures/decision-trees/choose-vector-db.md)
- [Qdrant](../../projects/data-and-retrieval/qdrant.md)
- [pgvector](../../projects/data-and-retrieval/pgvector.md)
- [Evaluate embedding models before rechunking](../../tips-and-tricks/rag-and-retrieval/evaluate-embedding-models-before-rechunking.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-06-14 by @maintainer*

