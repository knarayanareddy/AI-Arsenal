---
id: "choose-embedding-model"
title: "Choosing an Embedding Model: Managed API, Open-Weight Self-Hosted, or Domain-Adapted"
category: "data-strategy"
decision_type: "fork"
decision_summary: "Pick by constraint, not leaderboard: a managed API for speed-to-ship, an open-weight model when residency or corpus-scale cost dominates, domain adaptation only after your own retrieval evals prove general models fail."
tags:
  - embeddings
  - rag
  - retrieval
  - self-hosted

approaches:
  - name: "Managed Embedding API"
    description: "Use a hosted embedding endpoint (OpenAI, Cohere, Voyage, and peers): no models to run, per-token pricing, and quality that tracks the provider's current generation."
    when_to_use:
      - "Getting a retrieval system working end-to-end quickly — embedding choice is rarely the first bottleneck, and an API removes an entire operational surface while you iterate on chunking and retrieval"
      - "Corpora and query volumes where per-token embedding cost is a rounding error next to LLM generation cost (true for most small-to-mid corpora)"
    when_not_to_use:
      - "Data residency or compliance rules prohibit sending document content to a third party — embedding requires shipping the full text out, not just queries"
      - "Very large corpora with frequent re-embedding (model upgrades, chunker changes force full re-runs) — per-token cost times corpus size times re-embedding count grows quickly"
    tradeoffs:
      complexity: "Lowest — an API call; no GPU serving, batching, or model lifecycle to own."
      cost: "Cheap at small scale; the cost curve steepens with corpus size and every full re-embedding pass, which teams systematically underestimate."
      reliability: "Provider-dependent, with a subtle lock-in: vectors from different models are incompatible, so switching providers later means re-embedding the entire corpus."
      flexibility: "You embed with whatever the provider serves; deprecations of embedding models force migrations on their schedule."

  - name: "Open-Weight Self-Hosted (BGE/GTE/E5-class models, served via TEI or sentence-transformers)"
    description: "Run an open-weight embedding model from the retrieval-benchmark leaderboards yourself — small enough (typically 0.1-7B parameters) that serving is far cheaper and simpler than LLM serving."
    when_to_use:
      - "Document content cannot leave your infrastructure, or air-gapped/edge deployment is required"
      - "Corpus-scale economics favor it: large corpora, frequent re-embedding, or sustained high query volume where amortized GPU cost undercuts per-token pricing"
      - "You need version pinning — self-hosting is the only way to guarantee the exact model (and thus vector space) stays available for the life of your index"
    when_not_to_use:
      - "Your team has no serving infrastructure and the corpus is small — the operational overhead buys nothing an API doesn't already provide"
    tradeoffs:
      cost: "Fixed serving cost that beats per-token pricing at sustained scale; poor economics for small, quiet workloads."
      complexity: "Real but modest — embedding models are small; dedicated servers (e.g. Hugging Face's text-embeddings-inference) make this closer to running a microservice than running an LLM."
      reliability: "Full control over availability and versioning — no provider deprecation can strand your index."
      accuracy: "Top open-weight models are competitive with commercial APIs on public retrieval benchmarks; verify on your own eval set, since benchmark rank and your-corpus rank frequently disagree."

  - name: "Domain-Adapted / Fine-Tuned Embeddings"
    description: "Fine-tune an open-weight embedding model on in-domain pairs (query-document relevance data, often mined from logs or synthetically generated) to specialize the vector space for your corpus."
    when_to_use:
      - "A retrieval eval on your own corpus shows general-purpose models genuinely failing — typically domains with specialized vocabulary where off-the-shelf embeddings conflate distinctions that matter (legal, biomedical, internal jargon)"
      - "You have or can mine real relevance signal (click-throughs, accepted answers, labeled pairs) — adaptation quality is bounded by training-pair quality"
    when_not_to_use:
      - "As a first resort — most retrieval-quality problems trace to chunking, query formulation, or missing hybrid search, all far cheaper to fix than maintaining a custom model"
      - "Without a frozen retrieval eval set — you cannot know whether adaptation helped, and every future re-adaptation requires re-embedding the corpus"
    tradeoffs:
      accuracy: "The highest ceiling on genuinely specialized corpora, and roughly no gain on corpora general models already handle."
      complexity: "Highest — training pipeline, pair mining, eval discipline, plus the full self-hosting burden, plus corpus re-embedding on every model revision."
      data-requirements: "Needs thousands of quality relevance pairs; weak or noisy pairs routinely make retrieval worse than the base model."
      cost: "Training is cheap (small models); the recurring costs are pipeline maintenance and repeated corpus re-embedding."

key_factors:
  - "Vector-space lock-in is the defining economics of this choice: embeddings from different models are mutually incompatible, so every model change — provider switch, deprecation, adapted-model revision — costs a full corpus re-embedding; index size and re-embedding frequency should drive the decision more than benchmark deltas"
  - "Data residency: embedding ships full document text to the provider, so compliance constraints bind harder here than for query-time LLM calls"
  - "Your-corpus evals over leaderboards: public retrieval-benchmark rankings compress to a few points' difference among top models and reorder on private corpora — a small frozen eval set on your own data is the only ranking that matters"
  - "Total retrieval stack first: chunking, hybrid search, and reranking usually move retrieval quality more per unit effort than swapping embedding models — exhaust those before escalating to domain adaptation"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Choosing an embedding model"] --> Res{"Can document text leave your infrastructure?"}
      Res -->|"No"| OW["Open-weight self-hosted (BGE/GTE/E5-class via TEI)"]
      Res -->|"Yes"| Scale{"Large corpus / frequent re-embedding / sustained volume?"}
      Scale -->|"No"| API["Managed embedding API"]
      Scale -->|"Yes"| OW
      API --> Eval{"Retrieval eval on YOUR corpus shows general models failing?"}
      OW --> Eval
      Eval -->|"No"| Keep["Keep the general model; invest in chunking/hybrid/reranking instead"]
      Eval -->|"Yes, with real relevance pairs available"| FT["Domain-adapt an open-weight model"]

confidence: "context-dependent"
tradeoffs_as_of: "2026-07-08"

approach_implementations:
  - approach_name: "Managed Embedding API"
    project_ids: []
    tool_ids:
      - litellm
    build_example_ids: []
  - approach_name: "Open-Weight Self-Hosted (BGE/GTE/E5-class models, served via TEI or sentence-transformers)"
    project_ids: []
    tool_ids: []
    build_example_ids: []
  - approach_name: "Domain-Adapted / Fine-Tuned Embeddings"
    project_ids: []
    tool_ids: []
    build_example_ids: []

related_decisions:
  - choose-vector-db
  - rag-vs-fine-tuning

common_mistakes:
  - "Choosing by public leaderboard rank alone — top models cluster within a few points on public benchmarks and reorder on private corpora; without a small frozen eval set on your own data, you are choosing on noise."
  - "Ignoring re-embedding economics — treating the embedding model as swappable when every change (provider deprecation, model upgrade, adaptation revision) requires re-embedding the entire corpus and rebuilding the index; this lock-in is the real cost driver at scale."
  - "Escalating to fine-tuned embeddings before fixing chunking, hybrid search, or reranking — the cheaper layers usually explain the retrieval failures being attributed to the embedding model."
  - "Forgetting that embedding sends full document content to the provider — teams that carefully gate what user queries reach an LLM API sometimes ship their entire confidential corpus to an embedding endpoint without the same review."

added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: "maintainer"
status: "active"
enrichment_status: "draft"
---

## Overview

The embedding model defines the vector space every retrieval decision downstream depends on — and, less obviously, it's the stickiest component in a RAG stack: vectors from different models are mutually incompatible, so changing models means re-embedding the whole corpus. That lock-in, more than benchmark rank, is what makes this a real architecture decision rather than a leaderboard lookup.

## The Decision

Two constraints fork the decision before quality enters the picture. First, residency: embedding requires shipping full document text to the provider, so if your corpus can't leave your infrastructure, open-weight self-hosting is the answer regardless of preference. Second, scale economics: per-token API pricing is negligible for small corpora and compounds painfully for large ones — especially because re-embedding is recurrent (chunker changes, model upgrades, and provider deprecations all force full passes), not a one-time cost. Teams unconstrained by either should default to a managed API for speed and simplicity. Domain adaptation is a third stage, not a third option: it's justified only after a retrieval eval on your own corpus demonstrates general-purpose models actually failing, and only when real relevance pairs exist to train on.

## Decision Framework

| Constraint | Recommended start | Canonical entries |
|---|---|---|
| Ship fast, small-to-mid corpus, no residency limits | Managed embedding API (routed via a gateway for portability) | [LiteLLM](../../tools/serving-and-deployment/litellm.md) |
| Data can't leave infra, or corpus-scale cost dominates | Open-weight model (BGE/GTE/E5-class) self-hosted | — |
| Proven eval failure on specialized corpus + relevance pairs | Domain-adapted open-weight model | — |

The frontmatter decision tree adds the gating question most teams skip: *does your own eval actually show general models failing?*

## Approach Deep-Dives

**Managed APIs** win on everything except the two binding constraints. The underrated risk is deprecation-driven lock-in: when a provider retires an embedding model, your index — built in that model's vector space — must be fully rebuilt on their timeline. Routing embedding calls through a gateway keeps the switch mechanical, but nothing makes it free.

**Open-weight self-hosting** is far more tractable than LLM self-hosting: leaderboard-class open embedding models run in the hundreds-of-millions to low-billions of parameters, and dedicated servers like text-embeddings-inference reduce serving to a well-understood microservice. What you buy beyond cost and residency is version pinning — the guarantee that the exact model behind your index remains available for the index's lifetime, which no API offers.

**Domain adaptation** has the highest ceiling and the highest rate of unjustified adoption. Its mechanism is narrow: it helps where the general model's vector space collapses distinctions your domain depends on (specialized vocabulary, internal jargon, domain-specific relevance notions). Where retrieval fails for other reasons — bad chunking, missing hybrid search, no reranker — adaptation adds a permanent training-and-re-embedding pipeline while fixing nothing. The eval-first gate exists because these failure classes are indistinguishable from anecdotes and cleanly separable with a small frozen eval set.

## Common Mistakes

- **Leaderboard-rank shopping** without a your-corpus eval — public rankings reorder on private data.
- **Ignoring re-embedding lock-in** — the corpus-rebuild cost of any model change is the decision's real economics.
- **Fine-tuning before fixing the retrieval stack** — chunking, hybrid search, and reranking move quality more per unit effort.
- **Residency-reviewing LLM calls but not embedding calls** — embedding ships the whole corpus out, not just queries.

## When This Guidance Might Be Outdated

Rated `context-dependent`, and the frontier moves quickly: open-weight embedding quality has repeatedly leapfrogged commercial APIs and vice versa, benchmark suites rotate as older ones saturate and contaminate, and provider prices and deprecation policies shift. The structural claims (vector-space lock-in, residency binding, eval-first gating for adaptation) are durable; any specific model family named here should be re-verified against current retrieval benchmarks — and your own eval set — at decision time.

## Related Decisions

This decision pairs with [Choosing Vector Storage](./choose-vector-db.md) — the two together define the retrieval index, and both changes force rebuilds — and sits downstream of [RAG vs Fine-Tuning](../system-design/rag-vs-fine-tuning.md), which determines whether a retrieval stack exists at all.

## Resources

- [LiteLLM](../../tools/serving-and-deployment/litellm.md)
- [Choosing Vector Storage](./choose-vector-db.md)
- [RAG vs Fine-Tuning](../system-design/rag-vs-fine-tuning.md)

---
*Last reviewed: 2026-07-08 by @maintainer*
