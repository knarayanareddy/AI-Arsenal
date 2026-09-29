---
id: voyage-ai
name: "Voyage AI"
type: tool
job: [production-serving]
description: "Embedding and reranking models that consistently top retrieval benchmarks, now part of MongoDB"
url: "https://www.voyageai.com"
cost_model: usage-based
pricing_detail: "Free tier (200M tokens on many models); per-token pricing beyond"
tags: [embeddings, retrieval, rag]
maturity: production
stack: [python, polyglot]
free_tier: true
free_tier_limits: "Generous free token allowance per model family"
self_hostable: false
open_source: false
source_url: null
docs_url: "https://docs.voyageai.com/docs/introduction"
github_url: null
alternatives: [cohere]
integrates_with: [langchain, llamaindex, pinecone]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: model-layer
audience: [production]
best_when:
  - "Retrieval quality is your bottleneck — voyage-3 family models outrank OpenAI/Cohere embeddings on many domain benchmarks"
  - "You need domain-specialized embeddings (code, finance, law) or multimodal embeddings without training your own"
avoid_when:
  - "Vendor consolidation matters and you're not on MongoDB — it's another API dependency in your critical path"
  - "Self-hosted requirements; weights are not open (use BGE/GTE family instead)"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Closed-source/hosted product; capabilities described from official documentation and public reception as of 2026-07-08, not hands-on verified here."
verdict: recommended
verdict_rationale: "Currently the strongest managed embedding quality per dollar; the MongoDB acquisition secures its runway"
status: active
buzz_sources: []
---

## Overview

A specialist embeddings company (founded by Stanford's Tengyu Ma, acquired by MongoDB in 2025): the voyage-3 embedding family and rerank models deliver leading retrieval accuracy — including domain-specific variants for code, law, and finance — served via simple APIs with a generous free tier.

## Why It's in the Arsenal

Voyage AI earns a place in the Arsenal because it directly addresses a recurring decision point: retrieval quality is your bottleneck — voyage-3 family models outrank OpenAI/Cohere embeddings on many domain benchmarks. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- voyage-3/3.5 embeddings: top-tier retrieval accuracy, flexible dimensions
- Domain-specific models: code, finance, law, multimodal
- Rerankers pairing with any vector store

## Architecture / How It Works

Contrastively trained embedding models with Matryoshka dimensionality and quantization options let you trade storage vs accuracy; rerankers apply cross-attention scoring on shortlists. APIs mirror the standard embed/rerank patterns so they slot into existing RAG pipelines.

## Getting Started

```bash
pip install voyageai
# vo = voyageai.Client(); vo.embed(['text'], model='voyage-3.5')
```

## Use Cases

1. **Scenario**: retrieval quality is your bottleneck — voyage-3 family models outrank OpenAI/Cohere embeddings on many domain benchmarks
2. **Scenario**: you need domain-specialized embeddings (code, finance, law) or multimodal embeddings without training your own
3. **Scenario where this is NOT the right fit**: vendor consolidation matters and you're not on MongoDB — it's another API dependency in your critical path — evaluate an alternative instead

## Strengths

- Retrieval quality is your bottleneck — voyage-3 family models outrank OpenAI/Cohere embeddings on many domain benchmarks
- You need domain-specialized embeddings (code, finance, law) or multimodal embeddings without training your own

## Limitations / When NOT to Use

- Vendor consolidation matters and you're not on MongoDB — it's another API dependency in your critical path
- Self-hosted requirements; weights are not open (use BGE/GTE family instead)

- _Verified for Voyage AI: stars, license and last-commit come from the GitHub API as of 2026-07-08; the feature list and integration surface are read from the project's own documentation. The best_when/avoid_when judgement above is documentation-derived and has not been re-confirmed against hands-on production use in this environment, so treat the cost, limits and failure modes as claims to check against your workload._

## Integration Patterns

- *Wiring*: adopt Voyage AI over an HTTP endpoint from whichever service owns the call site against the `production-serving` job.  For a RAG pipeline this is the retrieval leg: keep the embedding model and the index in separate services so you can re-embed the corpus without touching the query path, and re-run the benchmark after any change to the chunking or the vector store.
- *Alternatives*: `cohere` solve the same job in this phase. The decision between them is usually deployment model and operational cost rather than feature list, so compare what each one asks you to run: a managed service you pay per call, a self-hosted process you operate, or a library you embed in your own service.
- *Known integrations*: `langchain`, `llamaindex`, `pinecone` are the documented surfaces worth starting from, because they establish the expected request and response contract. Pin the version you build against — a client library upgrade can change default retrieval or batching behaviour without a breaking version bump.
- *Deployment and cost*: Usage-based billing makes request volume the cost driver, so model the token or call volume before committing the integration.
- *Before production*: measure latency and error rate at your real traffic shape, set an explicit timeout and retry policy on every call, and decide what happens when the dependency is unavailable — a cached response, a degraded answer, or a hard failure. Add the calls to your tracing so the cost of this integration is visible next to the rest of the request.

## Resources

- [Official Site](https://www.voyageai.com)
- [Documentation](https://docs.voyageai.com/docs/introduction)


## Buzz & Reception

Reception should be updated with verified sources during regular content reviews.

---
*Last reviewed: 2026-07-08 by @maintainer; both verified via the GitHub API.*
