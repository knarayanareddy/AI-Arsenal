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
docs_url: "https://docs.voyageai.com"
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

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `cohere` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `voyage-ai`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://www.voyageai.com)
- [Documentation](https://docs.voyageai.com)


## Buzz & Reception

Reception should be updated with verified sources during regular content reviews.

---
*Last reviewed: 2026-07-08 by @maintainer*
