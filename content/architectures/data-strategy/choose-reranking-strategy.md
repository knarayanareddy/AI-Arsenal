---
id: "choose-reranking-strategy"
title: "Choosing a Reranking Strategy: Dense-Only, Cross-Encoder, or LLM Reranker"
category: "data-strategy"
decision_type: "progressive"
decision_summary: "Start dense-only; add a cross-encoder reranker over the top-k when retrieval precision limits answer quality; reach for an LLM reranker only when nuanced relevance justifies its latency and cost."
tags:
  - rag
  - retrieval
  - embeddings
  - llm

approaches:
  - name: "Dense-Only Retrieval (No Reranker)"
    description: "Return the vector search top-k directly to the generator, ordered by embedding similarity, with no second-stage scoring."
    when_to_use:
      - "Prototypes and low-stakes retrieval where the embedding top-k is already good enough to answer the question"
      - "Tight latency budgets where a second model call per query is unaffordable"
    when_not_to_use:
      - "Answer quality is bottlenecked by the wrong passage ranking first — the generator faithfully uses mediocre context because nothing re-scored it"
      - "Queries and documents are phrased differently enough that pure embedding similarity misranks the truly relevant passage"
    tradeoffs:
      latency: "Lowest — a single vector lookup, no second stage."
      accuracy: "Ceilinged by the embedding model's single-vector similarity; no cross-attention between query and document."
      cost: "Cheapest — no extra model inference per query."
      complexity: "Lowest — one retrieval call and done."

  - name: "Cross-Encoder Reranker"
    description: "Over-retrieve a larger candidate set with the vector index, then re-score each (query, passage) pair with a cross-encoder that attends jointly over both, and keep the top-n by that score."
    when_to_use:
      - "Production RAG where precision of the top few passages materially changes answer quality — the standard, cost-effective upgrade over dense-only"
      - "You can over-retrieve (e.g. top-50) cheaply and afford one batched reranker pass to distill it to top-5"
    when_not_to_use:
      - "Latency budgets that cannot absorb an extra scoring pass, even batched"
      - "The candidate set from first-stage retrieval already misses the right passage — a reranker can only reorder what it is given, not recover a missing document"
    tradeoffs:
      accuracy: "Strong precision gain in practice — joint query-document attention catches relevance that single-vector similarity misses."
      latency: "Adds one batched scoring pass over the candidate set; modest and tunable via candidate-set size."
      cost: "A hosted rerank API or a self-hosted cross-encoder per query; far cheaper than an LLM reranker."
      complexity: "Moderate — a two-stage pipeline with an over-retrieve-then-rerank contract."

  - name: "LLM-as-Reranker"
    description: "Prompt a general LLM to score or order candidate passages by relevance (pointwise, pairwise, or listwise), using its reasoning over the full query and passage text."
    when_to_use:
      - "Relevance depends on nuanced reasoning a cross-encoder misses (multi-hop, instruction-sensitive relevance) and quality outweighs cost"
      - "Low query volume where the per-query LLM cost and latency are acceptable"
    when_not_to_use:
      - "High-volume or latency-sensitive paths — an LLM call per query (or per pair) is the most expensive and slowest option"
      - "A cross-encoder already achieves the precision you need — the LLM reranker's marginal gain rarely justifies the cost jump"
    tradeoffs:
      accuracy: "Potentially highest on reasoning-heavy relevance, but sensitive to prompt and position bias."
      latency: "Worst — full LLM inference in the retrieval hot path, multiplied for pairwise/listwise schemes."
      cost: "Highest — LLM tokens per query, scaling with candidate count for pairwise comparisons."
      complexity: "High — prompt design, bias controls, and score aggregation on top of the two-stage pipeline."

key_factors:
  - "Retrieval recall vs. precision: a reranker improves precision of the top-n but cannot fix recall — if the right passage is not in the candidate set, rerank first-stage recall instead"
  - "Latency budget: every reranking stage adds a pass in the query hot path; cross-encoders are batchable, LLM rerankers much less so"
  - "Query volume and cost: cross-encoders scale to production volume affordably; LLM rerankers are usually reserved for low-volume, high-value queries"
  - "Candidate-set size: reranking quality and cost both scale with how many candidates you over-retrieve before re-scoring"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Retrieval quality limiting answers?"] --> Recall{"Is the right passage even in the top-k?"}
      Recall -->|"No — recall problem"| FixRecall["Improve first-stage recall (embeddings, hybrid search, chunking) before reranking"]
      Recall -->|"Yes but mis-ranked"| Budget{"Latency and cost budget?"}
      Budget -->|"Tight"| Dense["Stay dense-only; tune retrieval"]
      Budget -->|"Room for one pass"| Cross["Cross-encoder reranker over top-k"]
      Cross --> Enough{"Precision sufficient?"}
      Enough -->|"Yes"| Done["Ship cross-encoder"]
      Enough -->|"No, reasoning-heavy relevance"| LLM["LLM reranker for low-volume high-value queries"]

confidence: "established"
tradeoffs_as_of: "2026-07-08"

approach_implementations:
  - approach_name: "Dense-Only Retrieval (No Reranker)"
    project_ids: []
    tool_ids: []
    build_example_ids: []
  - approach_name: "Cross-Encoder Reranker"
    project_ids:
      - haystack
      - llamaindex
    tool_ids:
      - cohere
    build_example_ids: []
  - approach_name: "LLM-as-Reranker"
    project_ids:
      - langchain
    tool_ids: []
    build_example_ids: []

related_decisions:
  - choose-embedding-model
  - choose-vector-db
  - choose-chunking-strategy

common_mistakes:
  - "Adding a reranker to fix a recall problem — reranking only reorders the candidate set, so if first-stage retrieval never surfaced the right passage, no reranker can recover it; fix embeddings, hybrid search, or chunking first."
  - "Over-retrieving too few candidates before reranking — feeding the reranker only top-5 wastes it; the point is to over-retrieve (e.g. top-50) so the reranker has room to promote a passage dense search ranked low."
  - "Jumping straight to an LLM reranker for the prestige of it — a cross-encoder usually captures most of the precision gain at a fraction of the latency and cost; measure before paying for LLM reranking."
  - "Ignoring position and prompt bias in LLM rerankers — pointwise scores drift and pairwise/listwise orderings favor position; randomize and validate against labels before trusting the ordering."

added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: "maintainer"
status: "active"
enrichment_status: "draft"
---

## Overview

Retrieval quality is the usual ceiling on RAG answer quality, and reranking is the most common lever for raising the precision of the passages that reach the generator. But reranking is a second stage bolted onto retrieval, not a replacement for it — it reorders a candidate set, so its value depends entirely on that set already containing the right passage. This is a progressive decision: most systems start dense-only, add a cross-encoder when precision limits quality, and reserve LLM reranking for the narrow set of reasoning-heavy, low-volume queries where it pays for itself.

## The Decision

Diagnose before you add a stage. If the correct passage is not in the vector top-k at all, you have a recall problem, and the fix is better embeddings, hybrid (keyword + dense) search, or chunking — not a reranker. If the right passage is retrieved but ranked below noise, that is a precision problem a reranker addresses directly. The default upgrade is a cross-encoder: over-retrieve a wider candidate set, re-score each query-passage pair with a model that attends jointly over both, and keep the best few. An LLM reranker enters only when relevance hinges on reasoning a cross-encoder cannot do and query volume is low enough to absorb the cost.

## Decision Framework

| Situation | Recommended approach | Canonical entries |
|---|---|---|
| Prototype, top-k already adequate | Dense-only retrieval | — |
| Production RAG, precision-limited | Cross-encoder reranker | [Cohere](../../tools/model-layer/cohere.md), [Haystack](../../projects/frameworks/haystack.md), [LlamaIndex](../../projects/frameworks/llamaindex.md) |
| Reasoning-heavy relevance, low volume | LLM reranker | [LangChain](../../projects/frameworks/langchain.md) |
| Right passage missing from candidates | Fix recall first (not reranking) | [Choosing an Embedding Model](./choose-embedding-model.md) |

The frontmatter decision tree encodes the branching: recall check first, then latency/cost budget, then whether cross-encoder precision suffices.

## Approach Deep-Dives

**Dense-only** is the right starting point and often the right ending point for low-stakes retrieval. Its ceiling is structural: a single embedding vector per side cannot model the fine-grained interaction between a query and a passage, so lexically or structurally mismatched-but-relevant passages get misranked.

**Cross-encoder reranking** is the workhorse upgrade. Because it feeds the query and passage into the model together, it can score relevance that dense similarity misses, and it batches well over a candidate set. The operational contract that makes it work is over-retrieval: pull a wide candidate set from the vector index, then let the reranker distill it. Hosted rerank APIs and self-hosted cross-encoders both fit here; the choice is a cost/latency/control tradeoff.

**LLM reranking** puts a general model in the retrieval hot path to reason about relevance. It can win on multi-hop or instruction-sensitive relevance, but it is the most expensive and slowest option and inherits the LLM's position and prompt biases. Reserve it for low-volume, high-value queries, and validate its orderings against labeled relevance before trusting them.

## Common Mistakes

- **Reranking to fix recall** — a reranker cannot surface a passage that first-stage retrieval never returned.
- **Under-retrieving candidates** — reranking a top-5 set wastes the stage; over-retrieve so it has room to reorder.
- **Defaulting to an LLM reranker** — a cross-encoder usually captures most of the gain far more cheaply.
- **Ignoring LLM reranker bias** — position and prompt sensitivity distort scores; control for them.

## When This Guidance Might Be Outdated

Rated `established`: the two-stage retrieve-then-rerank pattern and the cost ordering (dense < cross-encoder < LLM) are stable. What moves is the frontier — long-context models and cheaper LLM inference keep nibbling at the volume threshold where LLM reranking is defensible, and stronger embedding models keep raising the bar dense-only clears without any reranker. Re-verify the precision gap a reranker buys on your own data periodically rather than assuming yesterday's gap holds.

## Related Decisions

Reranking sits downstream of [Choosing an Embedding Model](./choose-embedding-model.md) and [Choosing a Vector Database](./choose-vector-db.md) — both govern the candidate set a reranker depends on — and interacts with [Choosing a Chunking Strategy](./choose-chunking-strategy.md), since chunk size determines what a reranker is scoring.

## Resources

- [Cohere](../../tools/model-layer/cohere.md)
- [Haystack](../../projects/frameworks/haystack.md)
- [LlamaIndex](../../projects/frameworks/llamaindex.md)
- [LangChain](../../projects/frameworks/langchain.md)

---
*Last reviewed: 2026-07-08 by @maintainer*
