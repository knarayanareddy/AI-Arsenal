---
version_tracked: null
demo_url: null
paper_url: null
paper_id: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
org_or_maintainer: "StarTrail-org"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 0
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: leann
name: "LEANN"
artifact_type: library
category: rag
subcategory: vector-databases
description: "Vector index that recomputes embeddings on demand, claiming 97 percent storage savings without accuracy loss"
github_url: "https://github.com/StarTrail-org/LEANN"
license: MIT
primary_language: Python
tags: [retrieval, local, efficiency, self-hosted]
maturity: beta
cost_model: open-source
github_stars: 12966
last_commit: "2026-09-28"
docs_url: "https://arxiv.org/abs/2506.08276"
phase: data-and-retrieval
domain:
  - "language"
relation_to_stack:
  - "build-on-top"
  - "deploy-as-is"
health_signals:
  - "actively-maintained"
  - "research-origin"
ecosystem_role:
  - "A low-storage vector index that makes private, on-device RAG practical by avoiding full embedding storage."
best_for: ["You want to index a personal corpus on a laptop - mail, chat history, browser history, a codebase - and the storage cost of conventional embeddings is what stopped you.", "You have an existing vector search backend you cannot move, because LEANN is positioned as a drop-in index rather than a new database.", "You are a Claude Code user who want semantic retrieval over your files, since the MCP service is documented as fully compatible with that client."]
avoid_if: ["You need deterministic, reproducible embeddings, because on-demand recomputation means the index is a function of the model and the pruning, not a fixed stored artefact.", "You cannot run a local embedding model, since the whole storage argument depends on recomputing embeddings rather than reading them from disk.", "You need a production service with an SLA, because the project is research-origin work from a university lab with a Slack community and a public roadmap rather than a support contract."]
enrichment_notes: "Repository, MIT license, and 2026-07-03 activity verified via the GitHub API on 2026-07-12. MLSys 2026 paper; storage-savings figures are project-reported."
---

## Overview

LEANN is a vector index that computes embeddings on demand instead of storing them all, which is where the storage saving comes from. The method is graph-based selective recomputation combined with high-degree preserving pruning: the graph keeps the connections needed to find neighbours, and the vectors along pruned edges are regenerated when a search needs them rather than persisted. The project reports 97% storage savings against traditional solutions with no accuracy loss, and published the work as a paper, winning an MLsys best-paper distinction. The stated targets are personal-scale corpora on a laptop: the file system, mail, browser history, chat history from services like WeChat and iMessage, agent conversation archives, live data through MCP, and external knowledge bases at sixty million documents. It exposes itself as a semantic-search MCP service and is MIT licensed.

## Why it's in the Arsenal

The decision it addresses is index size on personal hardware. A personal RAG index over years of mail and chat is dominated by the embedding vectors, and the two obvious answers - use fewer documents, or accept the disk cost - are both unsatisfying. Recomputing the embeddings that a pruned graph does not store moves the cost from storage to CPU, which is a trade that is nearly free on a machine that is idle and prohibitive on a shared server. That framing also explains the honesty of the claim: it is a laptop-first optimisation, and the accuracy equivalence is the load-bearing assumption rather than a side note.

## Architecture

The index is a graph rather than a flat vector list. High-degree preserving pruning keeps the topology that makes nearest-neighbour traversal work, so the structure that matters survives; the vectors for the pruned-away edges are not written to disk. At query time a search traverses the graph, and where a comparison needs a vector that was not stored, the embedding model recomputes it on demand - which is why a local model is a hard requirement rather than a preference. That same locality is what makes the index a drop-in: it presents a vector-search interface over a graph, so an existing backend can swap the index without changing the query layer. Access is through a native client and an MCP server, which is how the Claude Code integration works.

## Ecosystem Position

LEANN competes with the conventional vector stores in content/projects/data-and-retrieval - qdrant, milvus, lancedb - on a single axis: bytes on disk. Those store every embedding and trade storage for latency, while this trades storage for recompute, so the right answer depends on whether you have idle local compute or a latency-bound server. It overlaps with faiss-style graph indexes, which use the same HNSW-like structure but keep the vectors, and the pruning is what differentiates it. Compared with mempalace in content/projects/agent-systems, which is a memory system rather than an index, LEANN is the substrate such a system could sit on. It complements rather than replaces the embedding models in content/projects/model-layer - it depends on them entirely - and the eval tooling in content/projects/benchmark-and-eval is where the accuracy-equivalence claim should be checked on your own corpus.

## Getting Started

Install the package and its CLI, which brings the local embedding model along. The documented flow indexes a directory and then serves semantic search over MCP:

```bash
pip install leann
leann index your-directory
leann mcp
```

The repository also ships a per-package README for the MCP server with the Claude Code setup, and Python 3.10 through 3.14 are supported on macOS, Linux and Windows.

## Key Use Cases

1. Personal archive search: index several years of mail or chat on a laptop and search it semantically without a multi-gigabyte index.
2. Semantic MCP for a coding agent: give Claude Code retrieval over your notes and documents rather than the basic keyword search it ships with.
3. Storage-constrained private index: keep an embedding index on a small machine by accepting recompute latency instead of disk.

## Strengths

- The storage claim is structural, not a tuning trick: embeddings are recomputed rather than stored, so the saving scales with corpus size.
- Drop-in index shape, so an existing vector backend can adopt it without rewriting the query layer.
- Native MCP server, which is the shortest path from a local index to a coding agent that can use it.
- MIT licensed with a published paper and an MLsys best-paper distinction, so the method is inspectable rather than a black box.

## Limitations

The accuracy claim is the load-bearing assumption and the project asserts it rather than demonstrating it across corpora: 97% storage saved with no loss is measured on their benchmarks, and index quality on your own data with your own embedding model is worth checking before you trust it. On-demand recomputation adds latency proportional to how much the pruning forced you to recompute, which is a poor trade for a latency-bound server and a good one for an idle laptop. It is research-origin work from a university lab, so the roadmap is public and community-driven rather than a support commitment. It also carries the full weight of the local embedding stack, which is a dependency you would otherwise not have.

## Relation to the Arsenal

This is a data-and-retrieval phase entry and the storage-optimisation counterpoint to the full vector databases in the same folder. Read it against qdrant, milvus and lancedb, which store every embedding and are the right answer under latency constraints, and against mempalace in content/projects/agent-systems if your goal is personal memory rather than index efficiency. Its dependency is the embedding layer in content/projects/model-layer, and the retrieval quality it claims should be measured with the eval tooling in content/projects/benchmark-and-eval. For a laptop-first RAG application overall, raglite in the same folder is a more complete pipeline around a conventional index.

## Resources

- [GitHub - StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN)
- [Research paper on arXiv 2506.08276](https://arxiv.org/abs/2506.08276)
- [Detailed feature documentation](https://github.com/StarTrail-org/LEANN/blob/main/docs/features.md)
