---
id: "choose-retrieval-strategy"
title: "Dense vs Sparse vs Hybrid Retrieval: How Should You Actually Find the Right Chunks?"
category: "data-strategy"
decision_type: "spectrum"
decision_summary: "Use dense (embedding) retrieval when meaning matters, sparse (BM25) when exact terms/codes/rare tokens matter, and hybrid fusion plus reranking when the query mix is uncertain — which, for most real corpora, it is."
tags:
  - rag
  - retrieval
  - embeddings
  - data

approaches:
  - name: "Dense (embedding) retrieval"
    description: "Encode the query and every chunk into vectors with an embedding model and retrieve by nearest-neighbor similarity. Matches on meaning, so paraphrases and synonyms retrieve even with zero shared words."
    when_to_use:
      - "Queries and documents use different vocabulary for the same concept (natural-language questions over prose, cross-lingual retrieval, synonym-heavy domains)"
      - "Recall on semantically-similar-but-lexically-different content is the dominant failure mode"
      - "The corpus is prose the embedding model was trained to represent well (support docs, articles, policy text)"
    when_not_to_use:
      - "Queries hinge on exact tokens the embedding model smooths over — product SKUs, error codes, function names, legal citations, rare proper nouns"
      - "The domain vocabulary is far outside the embedding model's training distribution (specialized jargon, internal codenames) and you can't fine-tune or swap the embedder"
      - "You need exact-match guarantees for compliance/audit (\"did this exact clause appear?\")"
    tradeoffs:
      cost: "Embedding the corpus is a one-time near-free cost with a local model; per-query cost is one embedding call plus vector search. As of 2026-07, self-hosted embedding is effectively free and hosted embedding runs cents per million tokens."
      latency: "One embedding call (~10-50ms) plus ANN search (single-digit to low-tens of ms on HNSW). Fast and predictable."
      accuracy: "High semantic recall; systematically weak on exact-token and rare-term queries, where it silently returns plausible-but-wrong neighbors instead of no result."
      complexity: "Needs an embedding model, a vector store, and re-embedding whenever the model changes — see choose-embedding-model and choose-vector-db."
      flexibility: "Swapping embedding models means re-embedding the whole corpus; the query interface itself stays constant."

  - name: "Sparse (BM25 / keyword) retrieval"
    description: "Rank chunks by term-overlap statistics (BM25 / TF-IDF over an inverted index). Matches on exact tokens, weighting rare terms heavily, with no learned representation."
    when_to_use:
      - "Exact tokens carry the signal — identifiers, codes, function/API names, legal citations, part numbers, rare proper nouns"
      - "You need an interpretable, zero-training baseline that works on day one with no embedding pipeline"
      - "The corpus vocabulary is out-of-distribution for available embedding models"
    when_not_to_use:
      - "Queries and documents describe the same idea with different words (BM25 scores a perfect paraphrase with no shared tokens as zero)"
      - "You need cross-lingual retrieval or robustness to morphology/synonymy without heavy analyzer tuning"
    tradeoffs:
      cost: "Cheapest to run — an inverted index (Elasticsearch/OpenSearch/Lucene, or SQLite FTS) with no model calls at query time."
      latency: "Very low; mature inverted-index engines return in single-digit milliseconds."
      accuracy: "Excellent exact-term precision; blind to semantic similarity, so it misses relevant content that shares no vocabulary with the query."
      complexity: "Low and well-understood; tokenization/analyzer/stemming config is the main tuning surface."
      flexibility: "Trivial to update (index a new doc, it's searchable immediately) and fully interpretable (you can see which terms matched)."

  - name: "Hybrid (fusion + rerank)"
    description: "Run dense and sparse retrieval in parallel, fuse the candidate lists (Reciprocal Rank Fusion or weighted score combination), then optionally rerank the merged top-k with a cross-encoder or LLM reranker that scores each query-chunk pair jointly."
    when_to_use:
      - "Real-world query mix contains both semantic questions and exact-token lookups (the common case for any general corpus)"
      - "Retrieval recall is the binding constraint on answer quality and you can afford one more stage to fix it"
      - "You can add a reranker to buy precision at the top of the list without re-architecting retrieval"
    when_not_to_use:
      - "Latency budget genuinely cannot absorb a second retrieval path plus a rerank pass (rerankers add tens to low-hundreds of ms)"
      - "You have not yet measured that a single method is actually failing — hybrid adds moving parts that must be justified by a recall measurement, not adopted by default"
    tradeoffs:
      cost: "Two retrieval passes plus a reranker. A cross-encoder reranker is a small self-hostable model; a hosted reranker (e.g. Cohere Rerank) runs cents per 1K queries as of 2026-07."
      latency: "Dense + sparse can run in parallel (bounded by the slower), but the rerank pass is additional (~20-150ms depending on top-k and model). This is the main cost of hybrid."
      accuracy: "Highest and most robust across query types — fusion covers each method's blind spot, and reranking sharply improves top-k precision, which is what the generator actually consumes."
      complexity: "Highest: two indexes, a fusion step, and a reranker to operate and tune (fusion weights, rerank top-k). See choose-vector-db for stores that do dense+sparse natively."
      flexibility: "Most tunable (fusion weights, rerank depth) but also the most surface area to keep healthy."

key_factors:
  - "Query composition: profile a real query log — the ratio of semantic questions to exact-token lookups is the single most decisive factor and is almost always mixed, which is why hybrid is the pragmatic default for general corpora"
  - "Cost of a miss vs cost of latency: hybrid+rerank trades tens-to-hundreds of ms for materially higher recall/precision; if a miss produces a confidently wrong answer, that trade is usually worth it"
  - "Vocabulary distribution: identifier/code/citation-heavy corpora favor sparse; paraphrase-heavy prose favors dense"
  - "Measurement readiness: you cannot choose rationally without a labeled retrieval eval set — recall@k per method on real queries beats any a-priori argument"
  - "Reranker availability: a good cross-encoder/LLM reranker often recovers more end-to-end quality than switching base retrieval method, and can be added to any of the three"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Have you measured recall@k on a real, labeled query set?"] --> Measured{"Measured?"}
      Measured -->|"No"| Build["Build a labeled retrieval eval set first — you cannot choose rationally without one"]
      Measured -->|"Yes"| Mix{"What dominates your query log?"}
      Mix -->|"Exact tokens: codes, IDs, citations, names"| Sparse["Start sparse (BM25); add dense only if semantic misses appear"]
      Mix -->|"Paraphrases / natural-language questions"| Dense["Start dense (embeddings); add sparse only if exact-token misses appear"]
      Mix -->|"Genuinely mixed (most corpora)"| Hybrid["Hybrid: dense + sparse fused (RRF)"]
      Dense --> Precision{"Is top-k precision the remaining problem?"}
      Sparse --> Precision
      Hybrid --> Precision
      Precision -->|"Yes"| Rerank["Add a cross-encoder / LLM reranker on the merged top-k"]
      Precision -->|"No"| Done["Ship and keep the eval set in CI to catch regressions"]

confidence: "established"
tradeoffs_as_of: "2026-07-08"

approach_implementations:
  - approach_name: "Dense (embedding) retrieval"
    tool_ids: []
    project_ids:
      - qdrant
      - weaviate
    build_example_ids: []
  - approach_name: "Sparse (BM25 / keyword) retrieval"
    tool_ids:
      - elasticsearch
    project_ids: []
    build_example_ids: []
  - approach_name: "Hybrid (fusion + rerank)"
    tool_ids:
      - cohere
    project_ids:
      - weaviate
      - qdrant
    build_example_ids: []

related_decisions:
  - choose-vector-db
  - choose-embedding-model
  - choose-chunking-strategy

common_mistakes:
  - "Defaulting to dense retrieval because 'embeddings are modern' and never testing BM25: on identifier/code/citation-heavy corpora a keyword baseline frequently beats an embedding index outright, and it is nearly free to run as a comparison."
  - "Adopting hybrid + reranking before measuring that a single method is actually failing: hybrid multiplies operational surface area (two indexes, a fusion step, a reranker), and adopting it without a recall measurement means you can't tell whether it helped."
  - "Tuning the generator/prompt to fix answers that are actually retrieval misses: if the right chunk never entered the context, no amount of prompt engineering recovers it — measure retrieval recall before touching the generation side."
  - "Treating fusion weights and rerank top-k as set-and-forget: these are the two highest-leverage knobs in a hybrid pipeline and should be tuned against the eval set, not left at library defaults."

added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: "maintainer"
status: "active"
enrichment_status: "draft"
---

## Overview

Most RAG quality problems are retrieval problems wearing a generation costume: the model answers badly because the right chunk never made it into the context. This decision is about *how* you find candidate chunks, and it is a spectrum, not a fork — dense, sparse, and hybrid sit on a line from "match on meaning" to "match on exact tokens" to "do both and reconcile." The mistake that dominates real systems is picking one method by reputation (usually dense, because embeddings feel modern) and never measuring the query types where it silently fails.

## The Decision

Choose based on what your queries actually contain, measured on a real query log — not on which method is fashionable. **Dense** retrieval matches meaning and is the right default for natural-language questions over prose, but it systematically fails on exact tokens (codes, identifiers, citations, rare names), where it returns plausible-but-wrong neighbors instead of admitting no match. **Sparse** (BM25) matches exact terms, is nearly free, works on day one, and is unbeatable on identifier-heavy corpora, but scores a perfect paraphrase with no shared words as zero. **Hybrid** runs both, fuses the results (Reciprocal Rank Fusion is the standard, weight-free starting point), and optionally reranks the merged top-k with a cross-encoder — this is the pragmatic default for any general corpus, because real query logs are almost always a mix and hybrid covers each method's blind spot. The reranker is the highest-leverage addition to any of the three, because it improves the precision of exactly the top-k the generator consumes.

## Decision Framework

The `decision_tree` in this entry's frontmatter encodes the full logic. In plain language:

1. **Build a labeled retrieval eval set first.** Recall@k per method on real queries settles this decision faster and more reliably than any argument. Without it you are guessing.
2. **Profile the query mix.** Exact-token-dominated (codes, IDs, citations) → start sparse. Paraphrase-dominated (natural-language questions) → start dense. Genuinely mixed (most corpora) → hybrid with RRF fusion.
3. **Attack top-k precision with a reranker.** If the right chunks are being retrieved but ranked below the cutoff the generator sees, add a cross-encoder or LLM reranker on the merged candidates — this is often a bigger win than switching base method.
4. **Keep the eval set in CI** so a chunking change, an embedding-model swap, or an index-config drift can't silently regress recall.

## Approach Deep-Dives

**Dense.** An embedding model maps query and chunks into a shared vector space; nearest-neighbor search (typically HNSW) returns the closest chunks. Its power is vocabulary-independence — a question and its answer retrieve even with no shared words. Its structural weakness is that rare, information-dense tokens (an error code, a function name) get averaged into a dense vector and lose their discriminative power, so dense retrieval is confidently wrong exactly where exact matching matters. Depends on [choose-embedding-model](./choose-embedding-model.md) and [choose-vector-db](./choose-vector-db.md).

**Sparse (BM25).** An inverted index scores documents by term frequency and inverse document frequency, upweighting rare terms. It is interpretable (you can see which terms matched), needs no training or embedding pipeline, and is the correct baseline every RAG system should measure against before concluding it needs embeddings. Mature engines like [Elasticsearch](../../tools/data-ingestion/elasticsearch.md)/OpenSearch (or even SQLite FTS) run it in single-digit milliseconds.

**Hybrid (fusion + rerank).** Run dense and sparse in parallel, merge with Reciprocal Rank Fusion (which needs no score calibration between the two very different score scales), then rerank the merged top-k with a cross-encoder or LLM reranker that scores each query-chunk pair jointly rather than independently. Vector stores like [Weaviate](../../projects/data-and-retrieval/weaviate.md) and [Qdrant](../../projects/data-and-retrieval/qdrant.md) support dense+sparse natively, and hosted rerankers such as [Cohere](../../tools/model-layer/cohere.md) Rerank slot in with a single call. The cost is latency (a second path plus a rerank pass); the payoff is robustness across query types and sharply better top-k precision.

## Common Mistakes

- **Defaulting to dense and never testing BM25.** On code/identifier/citation-heavy corpora, keyword search frequently wins outright and is nearly free to compare against.
- **Adopting hybrid+rerank before measuring a single method fails.** Hybrid multiplies operational surface area; justify it with a recall number, not a hunch.
- **Fixing retrieval misses in the prompt.** If the chunk never entered context, prompt engineering cannot recover it — measure retrieval recall first.
- **Leaving fusion weights and rerank depth at defaults.** These are the two highest-leverage knobs in a hybrid pipeline; tune them against the eval set.

## When This Guidance Might Be Outdated

The `established` confidence reflects that the dense/sparse/hybrid tradeoffs are stable and well-studied. Two things to re-check periodically: (1) long-context models shrink the set of small, static corpora where retrieval is strictly necessary versus stuffing the whole corpus in context — re-evaluate for small corpora specifically; (2) learned sparse representations (e.g. SPLADE-style) and stronger multi-vector/late-interaction retrievers continue to blur the dense/sparse line, so "sparse = BM25" may become an oversimplification — re-verify the state of learned-sparse tooling against your corpus every 6-12 months.

## Related Decisions

This decision sits downstream of [choose-chunking-strategy](./choose-chunking-strategy.md) (what you retrieve *over*) and [choose-embedding-model](./choose-embedding-model.md) (which model powers the dense side), and upstream/parallel to [choose-vector-db](./choose-vector-db.md) (which store executes it — several support hybrid natively). The whole decision is only worth making after [rag-vs-fine-tuning](../system-design/rag-vs-fine-tuning.md) has established that retrieval is the right tool at all.

## Resources

- [Weaviate](../../projects/data-and-retrieval/weaviate.md)
- [Qdrant](../../projects/data-and-retrieval/qdrant.md)
- [Elasticsearch](../../tools/data-ingestion/elasticsearch.md)
- [Cohere](../../tools/model-layer/cohere.md)
- [Retrieval-Augmented Generation (Lewis et al., 2020)](../../research/foundational/lewis-2020-rag.md)

---
*Last reviewed: 2026-07-08 by @maintainer*
