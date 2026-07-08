---
id: faiss
name: "FAISS"
type: tool
job: [vector-search]
description: "Meta's foundational library for efficient similarity search over billions of dense vectors"
url: "https://faiss.ai"
cost_model: open-source
pricing_detail: "MIT open source"
tags: [retrieval, embeddings, efficiency]
maturity: production
stack: [cpp, python]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/facebookresearch/faiss"
docs_url: "https://github.com/facebookresearch/faiss/wiki"
github_url: "https://github.com/facebookresearch/faiss"
alternatives: [qdrant, milvus, pgvector]
integrates_with: [langchain, llamaindex]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [production, research]
best_when:
  - "You need a vector index inside your process (no server) — for research, batch jobs, or embedded retrieval"
  - "Extreme scale/efficiency tuning: IVF-PQ, GPU indexes, and quantization tradeoffs no managed DB exposes as directly"
avoid_when:
  - "You need CRUD, filtering, replication, and multi-tenancy — FAISS is a library, not a database; use Qdrant/Milvus (many are built on or benchmarked against FAISS)"
  - "Metadata-heavy filtered search; bolting filtering onto FAISS yourself is a solved problem elsewhere"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (40,464), license, and last push (2026-07-07) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: best-in-class
verdict_rationale: "The reference ANN library the vector-DB industry builds on; unmatched for in-process and research use"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/facebookresearch/faiss", "date": "2026-07-08", "description": "40,464 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

The library that defined modern approximate nearest-neighbor search: FAISS implements the canonical index families (Flat, IVF, HNSW, PQ/OPQ compositions) on CPU and GPU, scaling to billions of vectors — it is both a production workhorse (inside many vector DBs and Meta's own systems) and the standard research baseline.

## Why It's in the Arsenal

FAISS earns a place in the Arsenal because it directly addresses a recurring decision point: you need a vector index inside your process (no server) — for research, batch jobs, or embedded retrieval. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Full ANN index zoo: Flat, IVF, HNSW, PQ and compositions
- GPU acceleration and billion-scale sharding
- Index factory strings for reproducible configurations

## Architecture / How It Works

Indexes trade recall vs speed vs memory: IVF partitions the space via k-means and searches nearest cells; PQ compresses vectors into subquantizer codes for in-RAM billion-scale; HNSW builds navigable graphs. The C++ core with Python bindings runs in-process — persistence and serving are your responsibility.

## Getting Started

```bash
pip install faiss-cpu
# index = faiss.IndexFlatIP(d); index.add(xb); D,I = index.search(xq, k)
```

## Use Cases

1. **Scenario**: you need a vector index inside your process (no server) — for research, batch jobs, or embedded retrieval
2. **Scenario**: extreme scale/efficiency tuning: IVF-PQ, GPU indexes, and quantization tradeoffs no managed DB exposes as directly
3. **Scenario where this is NOT the right fit**: you need CRUD, filtering, replication, and multi-tenancy — FAISS is a library, not a database; use Qdrant/Milvus (many are built on or benchmarked against FAISS) — evaluate an alternative instead

## Strengths

- You need a vector index inside your process (no server) — for research, batch jobs, or embedded retrieval
- Extreme scale/efficiency tuning: IVF-PQ, GPU indexes, and quantization tradeoffs no managed DB exposes as directly

## Limitations / When NOT to Use

- You need CRUD, filtering, replication, and multi-tenancy — FAISS is a library, not a database; use Qdrant/Milvus (many are built on or benchmarked against FAISS)
- Metadata-heavy filtered search; bolting filtering onto FAISS yourself is a solved problem elsewhere

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `qdrant`, `milvus`, `pgvector` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `faiss`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://faiss.ai)
- [Documentation](https://github.com/facebookresearch/faiss/wiki)
- [GitHub](https://github.com/facebookresearch/faiss)

## Buzz & Reception

- 40,464 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
