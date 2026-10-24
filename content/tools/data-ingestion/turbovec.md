---
id: turbovec
name: "turbovec"
type: tool
job: [vector-search]
description: "In-process vector index that searches 2- or 4-bit TurboQuant codes directly, at a fraction of float32 memory"
url: "https://github.com/RyanCodrai/turbovec"
cost_model: open-source
pricing_detail: "MIT open source"
tags: [retrieval, rag, efficiency]
maturity: beta
stack: [rust, python]
free_tier: true
free_tier_limits: "Open-source library; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/RyanCodrai/turbovec"
docs_url: "https://github.com/RyanCodrai/turbovec/blob/main/docs/api.md"
github_url: "https://github.com/RyanCodrai/turbovec"
alternatives: [faiss, qdrant, lancedb]
integrates_with: [langchain, llamaindex, haystack]
added_date: "2026-10-24"
last_reviewed: "2026-10-24"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [prototype, production]
best_when:
  - "Your embeddings have outgrown RAM: ten million 768-dimensional float32 vectors are roughly 31GB, and 4-bit turbovec holds the same corpus in about 4GB at recall comparable to FAISS at the same bit rate"
  - "The corpus changes constantly and rebuilding an index is unacceptable — there is no training step, adds are immediately searchable, and removing an id is microseconds rather than a full repack"
  - "You need filtered search over ids another system owns (an ACL, a SQL predicate, a time window) without a database in the loop: pass an allowlist or bitmask and the kernel returns k results from the allowed set"
avoid_when:
  - "You need a graph index at hundreds of millions of vectors under strict p95 latency — turbovec scans every vector, so query cost grows linearly and an HNSW or IVF index is the right shape"
  - "You need exact float results or a server: quantization is lossy, and the library has no network API, replication or multi-tenancy"
  - "Your embedding dimension is not a multiple of 8 or is wider than 16,384, or you need bit widths other than 2 and 4"
version_tracked: null
enrichment_status: reviewed
enrichment_notes: "Stars (17,418), forks (1,489), open issues (23), licence (MIT), language (Rust), contributors (8) and last push (2026-10-07) verified via the GitHub API on 2026-10-24 for a repository created 2026-03-26. The 4.4x FAISS FastScan and 7.8x/15.5x memory figures are the author's published benchmarks on OpenAI and GloVe corpora, not independently reproduced here."
verdict: solid-choice
verdict_rationale: "The right answer for a large, frequently updated embedding set that has to stay in-process — provided you accept linear-scan latency and lossy quantization"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/RyanCodrai/turbovec", "date": "2026-10-24", "description": "17,418 stars and 1,489 forks by 2026-10-24 (GitHub API); implements the TurboQuant paper (ICLR 2026)"}]
---

## Overview

turbovec is an in-process vector index for Python and Rust that implements TurboQuant, the online quantization method published at ICLR 2026. It stores every vector at 2 or 4 bits per dimension and searches that compressed representation directly with SIMD kernels. The headline trade is memory for speed: ten million 768-dimensional float32 embeddings occupy about 31GB, the 4-bit index holds them in roughly 4GB, and the author's benchmarks report 4.4x FAISS FastScan throughput at 4-bit with recall at or near FAISS's at the same bit rate.

## Why It's in the Arsenal

The retrieval entries here split into vector databases you deploy (`qdrant`, `lancedb`) and libraries you embed (`faiss`). turbovec belongs to the second group but changes the usual constraint: most compressed indexes (product quantization) need a training pass over a representative sample, so the index is tied to a corpus snapshot and an update means re-encoding. TurboQuant derives its codebook from the geometry of the rotated vector distribution instead, which is why this index has no training step, why an added vector is searchable immediately, and why deletes are cheap. That is the property to evaluate when the corpus is a live store rather than a batch export.

## Key Features

- 2-bit and 4-bit storage with search directly over the compressed codes
- No training step: add a vector and it is immediately searchable; remove by id in microseconds
- Incremental `sync(path)` that writes only the delta, crash-safe at any byte
- `IdMapIndex` with application-owned `uint64` ids, `allowlist` and bitmask filtering
- Python and Rust APIs over the same file format, with LangChain, LlamaIndex, Haystack and Agno integrations

## Architecture / How It Works

Each vector is normalised and its length stored. A single shared random orthogonal matrix rotates every vector, after which each coordinate follows a known distribution regardless of the input, and a Lloyd-Max codebook computed for that distribution quantizes each coordinate to 4 levels at 2-bit or 16 at 4-bit before bit-packing. At query time the query is rotated once and scored against the codebook through SIMD lookup tables; a per-vector scalar fixed at encode time removes the inner-product bias quantization introduces. Search is staged: one bit plane is scanned to build a shortlist, then the shortlist is rescored exactly, which is how a linear scan keeps its recall.

## Getting Started

```bash
pip install turbovec
```

```python
import numpy as np
from turbovec import TurboQuantIndex

vectors = np.load("embeddings.npy").astype(np.float32)   # shape (n, 1536)
index = TurboQuantIndex(dim=1536, bit_width=4)
index.add(vectors)

scores, slots = index.search(vectors[:1], k=5)   # inner products, slot positions
index.sync("index.tv")                            # first sync writes; later ones write the delta
index = TurboQuantIndex.load("index.tv")
```

Inputs must be 2-D `float32`; other dtypes raise rather than converting silently. Scores are inner products, so normalise vectors if you want cosine similarity, and use `IdMapIndex` when ids have to survive deletes.

## Use Cases

1. **A live embedding store that must fit one machine**: index a few million chunks with `IdMapIndex`, keep the ids aligned with your document store, and sync the delta after each ingest batch.
2. **Filtered retrieval at the application edge**: pass the ids an authorisation check already returned as an `allowlist`, so the index never ranks documents the user cannot see.
3. **An offline or edge deployment**: a library with a single file format and no service, paired with a local embedding model, gives a retrieval stack that runs without a network.

## Strengths

- The memory reduction is large enough to change a deployment decision: 7.8x at 4-bit and 15.5x at 2-bit against float32, at recall matched to FAISS product quantization.
- The absence of training is the engineering win: no sample-selection step, no rebuild when the corpus shifts, and cheap deletes because nothing is repacked.
- Crash-safe incremental persistence (`sync`) is unusual in an in-process index and removes the "save the whole file on every batch" habit.
- Id-keyed filtering inside the kernel keeps authorisation and time-window constraints out of post-processing.
- The benchmark suite, raw JSON and scripts are published, so the 4.4x claim is checkable rather than asserted.

## Limitations / When NOT to Use

- Query cost is linear in corpus size: an exhaustive scan is 0.13-0.25 ms per query at 100K vectors on eight cores, which is fine for millions and the wrong shape for hundreds of millions behind a strict latency target.
- Quantization is lossy: the true nearest neighbour appears first 96-98% of the time at 4-bit on the OpenAI corpora and 90-93% at 2-bit, with larger losses on low-dimensional embeddings such as GloVe d=200.
- It is a library with a file format, not a server: no network API, replication, tenancy or live index sharing between processes.
- Dimension constraints are hard: multiples of 8 only, at most 16,384 wide, and only 2- or 4-bit widths.
- Eight contributors and a repository created in March 2026 mean the project is young; pin the version and budget for reading the API docs on upgrade.

## Integration Patterns

- *Wiring*: replace the in-memory store inside a framework's retriever — `turbovec[langchain]`, `turbovec[llama-index]`, `turbovec[haystack]` and `turbovec[agno]` expose the same public surface as the store they replace.
- *Alternatives*: `faiss` for a mature index family with training-based quantization and GPU paths, `qdrant` and `lancedb` when you need a service, replication or hybrid search rather than a file.
- *Persistence*: call `sync(path)` after each ingest batch and treat the file as the source of truth on restart; `load` accepts either a synced or a `write()` file.
- *Before production*: measure recall@k on a sample of your own embeddings at both bit widths, then set the bit width from that number rather than from the published benchmark.

## Resources

- [GitHub repository](https://github.com/RyanCodrai/turbovec)
- [API reference](https://github.com/RyanCodrai/turbovec/blob/main/docs/api.md)
- [Benchmarks and raw results](https://github.com/RyanCodrai/turbovec/blob/main/docs/benchmarks.md)
- [Paper: TurboQuant (ICLR 2026)](https://arxiv.org/abs/2504.19874)

## Buzz & Reception

- 17,418 stars and 1,489 forks as of 2026-10-24 (GitHub API), with 23 open issues — a small, active backlog rather than a launch spike left unattended.
- Positioned explicitly against FAISS FastScan on speed and memory at matched bit rate, with the benchmark scripts published in the repository.
