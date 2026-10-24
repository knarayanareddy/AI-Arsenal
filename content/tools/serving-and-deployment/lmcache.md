---
id: lmcache
name: "LMCache"
type: tool
job: [production-serving]
description: "KV cache layer that persists and shares prefix state across vLLM instances and storage tiers"
url: "https://github.com/LMCache/LMCache"
cost_model: open-source
pricing_detail: "Apache-2.0; the additional cost is the storage and network plane you provide for the cache"
tags: [caching, inference, efficiency, self-hosted, llm]
maturity: beta
stack: [python, cpp]
free_tier: true
free_tier_limits: "Source is unlimited; cache capacity costs whatever DRAM, NVMe or Redis you allocate"
self_hostable: true
open_source: true
source_url: "https://github.com/LMCache/LMCache"
docs_url: null
github_url: "https://github.com/LMCache/LMCache"
alternatives: [mooncake]
integrates_with: []
added_date: "2026-10-20"
last_reviewed: "2026-10-20"
added_by: repo-maintainer
reviewed_by: null
verdict: recommended
verdict_rationale: "Makes prefix reuse a cluster property rather than a per-instance accident, which is the cheapest latency win available for agent loops and long system prompts"
status: active
phase: serving-and-deployment
audience: [production]
best_when:
  - "Many requests share a long prefix — a system prompt, a document, a conversation history — and that prefix is currently recomputed per request"
  - "Several vLLM replicas serve the same models and a cache built on one should be usable by the next"
avoid_when:
  - "Prompts are short and rarely repeat, so there is no prefix worth keeping"
  - "The serving engine is not vLLM or lacks the hooks the integration patches into"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Behaviour described from documentation and the project's published benchmarks; gains on a specific cluster depend on interconnect and were not measured here."
buzz_sources: []
---

## Overview

LMCache stores key-value cache state outside the engine that produced it. Normally a vLLM instance computes the cache for a prompt, uses it, and discards it when the request ends; a second instance handling the same system prompt pays the entire prefill cost again.

This layer chunks token sequences into fixed blocks, hashes each block by content, and offloads the corresponding tensors asynchronously to GPU memory, host DRAM, local NVMe or a remote store such as Redis. A later request whose prefix hashes to a known block skips the prefill and streams the tensors back into the engine's attention path.

Because the offload uses dedicated CUDA streams, transfer overlaps generation rather than pausing it, which is what makes the technique useful in production rather than only in benchmarks.

## Why It's in the Arsenal

Agent deployments spend a surprising share of compute re-processing text that has not changed. A tool loop with a 30,000-token system prompt re-prefills that prompt on every turn unless the engine happens to keep it resident.

Cataloguing LMCache records the cheapest structural fix: turn repeated prefill into a lookup. It is also the smaller-grained sibling of disaggregated serving — one reuses cache, the other separates whole stages — and the two compose.

## Key Features

- A tiered cache spanning GPU HBM, host memory, NVMe and remote stores, with configurable promotion between them.
- Content-addressed prefix matching at block granularity, so partial prefixes reuse whatever blocks match.
- Asynchronous transfers on dedicated streams, overlapping data movement with token generation.
- Optional KV quantisation to shrink transfer payloads at a measured quality cost.
- Integration with vLLM's paged memory layout, and CUDA/ROCm support for multi-vendor fleets.

## Architecture / How It Works

The engine's memory manager calls into LMCache when a request arrives and when a block completes. On arrival, block hashes are looked up across tiers; hits are fetched and installed into the paged KV buffers, misses fall through to normal prefill. On completion, new blocks are written back asynchronously.

Remote sharing works because hashes are deterministic across instances of the same model and tokenizer — a cache built by one replica is addressable by another. That property is also the constraint: a different model, quantisation or rope configuration produces incompatible tensors under the same token ids, so caches cannot be shared across those boundaries.

## Getting Started

Instrument prefill time and cache hit rate before enabling anything; without a baseline the change is unmeasurable. Start with host-memory offload on one instance and a workload that genuinely repeats a prefix, then add the remote tier once the single-node hit rate justifies the network dependency.

## Use Cases

1. Agent loops with long, stable system prompts and tool definitions reused across many turns.
2. RAG pipelines where the same retrieved documents answer many questions.
3. Multi-turn assistants whose history is re-sent each turn and re-prefilled per request.
4. Serving a document over and over for extraction tasks, where only the instruction changes.

## Strengths

- Converts repeated prefill into cache retrieval, cutting time-to-first-token for prompt-heavy workloads.
- Works across instances, so a cache survives scale-out and load balancing rather than being tied to one replica.
- Offload is asynchronous, so generation is not blocked while tensors move.
- Reuses existing storage infrastructure — DRAM, NVMe or Redis — instead of mandating a new system.
- Quantisation options let operators trade a measured quality delta for bandwidth.

## Limitations / When NOT to Use

- Adds a stateful data plane: cache nodes, eviction policy and capacity planning join your operational surface.
- Gains depend on interconnect; saturated PCIe or a slow network erases the benefit while still costing complexity.
- Aggressive KV quantisation degrades long-context recall in ways that appear late and are hard to attribute.
- Tightly coupled to engine internals — version mismatches or custom attention patches need adaptation.
- Sharing is only valid within the same model and tokenizer configuration, which limits reuse in multi-model deployments.

## Integration Patterns

Treat the cache tier as a cache, not a store: no durability guarantees, aggressive eviction, and a miss path that must remain fast. Co-locate remote cache nodes close to the serving replicas, size host memory for the working set rather than the corpus, and record hit rate per prefix length in the same dashboard as time-to-first-token. Roll model changes out with cache flushes, since stale blocks from a previous configuration are worse than no cache.

## Resources

- [GitHub — LMCache/LMCache](https://github.com/LMCache/LMCache)

## Buzz & Reception

Reception is driven by vLLM ecosystem adoption and the project's published cache-hit benchmarks; independent measurements on third-party clusters are not recorded here. The figure that matters is hit rate on your own traffic mix.
