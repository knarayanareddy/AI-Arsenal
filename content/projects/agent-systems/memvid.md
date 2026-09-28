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
org_or_maintainer: "memvid"
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
id: memvid
name: "Memvid"
artifact_type: library
category: agents
subcategory: libraries
description: "Single-file memory layer for agents that packs content, embeddings and search structure into an append-only sequence of Smart Frames"
github_url: "https://github.com/memvid/memvid"
license: Apache-2.0
primary_language: Rust
tags: [retrieval, embeddings]
maturity: beta
cost_model: open-source
github_stars: 16564
last_commit: "2026-07-14"
docs_url: "https://docs.memvid.com"
phase: agent-system
domain:
  - "language"
relation_to_stack:
  - "build-on-top"
  - "deploy-as-is"
health_signals:
  - "actively-maintained"
  - "community-driven"
ecosystem_role:
  - "A single-file agent memory layer offering portable semantic retrieval without operating a vector database."
best_for: ["You are shipping an agent that needs persistent memory on a laptop or edge device and cannot justify standing up a vector database or an embedding service.", "You want memory you can version, copy between machines, and query at earlier points in time, because the frame design makes writes append-only and history rewindable.", "You are an engineer evaluating a memory layer and want a reproducible benchmark harness, because the project publishes an open-source LoCoMo evaluation with an LLM-as-judge scorer."]
avoid_if: ["You need concurrent writers across a service fleet, because the design is an append-only single file rather than a networked store that coordinates multiple clients.", "You cannot accept project-published accuracy numbers without independent reproduction, because the headline gains are vendor benchmarks and the store is only at 1,600 stars with recent activity.", "Your memory is large enough that a single file becomes an operational problem, because there is no server tier described anywhere in the design."]
enrichment_notes: "Repository, Apache-2.0 license, and 2026-07-10 activity verified via the GitHub API on 2026-07-12. Novel approach; benchmark against a conventional vector store for your workload."
---

## Overview

Memvid replaces a RAG pipeline plus vector database with one file that contains the data, the embeddings, the search structure and the metadata together. Its organising idea comes from video encoding, though it stores no video: memory is an append-only sequence of Smart Frames, each an immutable unit holding content plus timestamps, checksums and basic metadata, grouped so that compression, indexing and parallel reads all work. The properties that follow from that structure are append-only writes that cannot corrupt earlier data, queries against past memory states, timeline inspection of how knowledge changed, crash safety through committed frames, and compression borrowed from video codecs. Retrieval runs directly against the file, so an agent gets a model-agnostic, infrastructure-free memory layer it can carry anywhere.

## Why it's in the Arsenal

The decision it removes is how much infrastructure a memory feature drags into a deployment. A conventional agent memory means an embedding pipeline, a vector index, a running database, and backups for all three, before the agent has remembered anything. Memvid collapses that to an artefact, which changes the failure mode too: a corrupt index is a bad file rather than an unavailable service, and copying memory to another machine is a file copy. The video-encoding inspiration is not decoration either, because inter-frame compression is a plausible answer to a memory log that is mostly redundant text.

## Architecture

The core object is a Smart Frame: immutable, checksummed, timestamped content in a sequence. Because frames are grouped rather than written independently, the format can compress runs of similar frames, build an index over frame groups, and read several ranges in parallel during a query, which is where the claimed sub-millisecond P50 and P99 figures come from. Writes only append, so a partially written or crashed process leaves prior frames valid, and queries can address a point in the timeline rather than only the present state. Retrieval is described as running directly from the file with no server process, so the query path is a read plus a search over the frame index rather than a network round trip. The engine is written in Rust, which is consistent with both the compression work and the latency claims, and it exposes a Python-facing surface for agent frameworks.

## Ecosystem Position

Memvid competes directly with the server-backed memory and vector-store entries in content/projects/data-and-retrieval, and the distinction is deployment shape rather than retrieval quality: a vector database wins on concurrent access and horizontal scale, while Memvid wins on portability and zero infrastructure. It overlaps with the agent-memory projects in content/projects/agent-systems such as Mem0 and Zep, which sit closer to a write API than a storage format, and with LightRAG and GraphRAG in the same retrieval phase where the memory is derived from a graph rather than a file. Compared with a hosted vector service, it is the opposite trade: you give up managed uptime and multi-writer safety in exchange for an artefact you own. It complements the agent frameworks rather than replacing them, since it is a memory store they call into.

## Getting Started

Install the Python package, which exposes the file-backed store, then create a memory file and index content into it:

```bash
pip install memvid
```

```python
import memvid

with memvid.Memvid.new("agent_memory.mv2") as store:
    store.add("user prefers pithy release notes")
    hits = store.search("how should release notes read?")
    print(hits)
```

The file is self-contained, so copying it is the backup strategy. A hosted sandbox and the online docs are linked from the README if you want to try the retrieval path before wiring it into an agent.

## Key Use Cases

1. Agent memory on a single machine: give a desktop or edge agent persistent recall with no database, no embedding service and no network dependency at query time.
2. Memory versioning and audit: keep every frame, query what the agent knew at a past timestamp, and diff how a belief changed over a session.
3. Embedding experiments in a sandbox: run the open-source LoCoMo evaluation yourself to get a reproducible long-conversation recall number before committing to the layer.

## Strengths

- One portable file holds content, embeddings, index and metadata, so memory can be copied, versioned and shipped like any other artefact.
- Append-only immutable frames with checksums give crash safety and make history queries a native operation rather than a bolt-on.
- Sub-millisecond latency figures come with a published open-source LoCoMo evaluation and LLM-as-judge scorer, so the claims are at least reproducible in principle.
- Apache-2.0 licensed, which matters for a memory layer that ends up holding long-lived user data inside a product.

## Limitations

Every headline number here is a project benchmark against an industry average, and the eval set is 10 conversations of roughly 26,000 tokens each, which is a narrow base for a claim about long-horizon recall. The design is inherently single-file, so concurrent writers from several processes or replicas are not something the architecture addresses, and there is no server tier in the description to coordinate them. You are storing embeddings in the file, which means changing embedding models is a re-index of everything you have accumulated. At roughly 1,600 stars with the last commit in mid-2026, the project is young and lightly staffed, and adopting it as the durable memory of a production agent is a bet on a small team.

## Relation to the Arsenal

This is the memory-storage entry for content/projects/agent-systems and the answer to the question the agent frameworks there cannot answer on their own. Compare it against mem0 and zep in the same phase for API-shaped memory versus a storage artefact, and against the vector database entries in content/projects/data-and-retrieval when you need multi-writer durability instead of portability. Its retrieval quality will be judged by the eval tooling in content/projects/benchmark-and-eval, which is the honest place to pressure-test the LoCoMo claim. If your memory is a graph over entities rather than a conversation log, the graph-memory entries in the same retrieval phase are the more direct comparison.

## Resources

- [GitHub — memvid/memvid](https://github.com/memvid/memvid)
- [Project site and sandbox — memvid.com](https://www.memvid.com)
- [Documentation — memvid docs site](https://docs.memvid.com)
