---
id: mooncake
name: "Mooncake"
type: tool
job: [production-serving]
description: "KVCache-centric serving platform that separates prefill from decode and moves caches over RDMA"
url: "https://github.com/kvcache-ai/Mooncake"
cost_model: open-source
pricing_detail: "Apache-2.0; you supply the GPU cluster and high-speed fabric, which dominate the cost"
tags: [inference, caching, efficiency, self-hosted]
maturity: production
stack: [cpp, python]
free_tier: true
free_tier_limits: "Source is unlimited; the hardware requirement is RDMA-capable networking between pools"
self_hostable: true
open_source: true
source_url: "https://github.com/kvcache-ai/Mooncake"
docs_url: null
github_url: "https://github.com/kvcache-ai/Mooncake"
alternatives: [sglang]
integrates_with: []
added_date: "2026-10-20"
last_reviewed: "2026-10-20"
added_by: repo-maintainer
reviewed_by: null
verdict: recommended
verdict_rationale: "The reference design for splitting prefill from decode when long prompts interfere with active generations; requires RDMA and cluster operations expertise, so not a default"
status: active
phase: serving-and-deployment
audience: [production]
best_when:
  - "Long prompts and active streams share GPUs and the interference shows up as tail latency on time-to-first-token"
  - "The cluster already has RDMA between nodes, so a cache transfer engine can beat re-computation instead of becoming the new bottleneck"
avoid_when:
  - "Serving runs on one node or a small cluster where chunked prefill inside vLLM or SGLang is already adequate"
  - "The workload is short-prompt request-response, where cache handoff latency dominates any gain"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Design described from the project's documentation and papers; cluster performance numbers were not reproduced for this entry."
buzz_sources: []
---

## Overview

Mooncake is a serving platform built around one separation. Prefill is compute-bound: it processes the whole prompt in dense matrix operations and saturates the arithmetic units. Decode is memory-bandwidth-bound: it emits one token at a time and saturates the memory bus. Scheduled together on the same GPUs, each stage eats the other's headroom, and the symptom is a long prompt arriving mid-generation and stalling every active stream.

Mooncake runs prefill and decode on separate pools and moves the resulting key-value cache between them. The transfer engine is the novel part: a C++ transport that performs zero-copy moves over RDMA, with tiers spanning GPU memory, host DRAM and NVMe, so a cache block can live where it is cheapest and be pulled to where it is needed.

It came out of Moonshot AI's Kimi service, and it integrates as an execution backend for vLLM and SGLang rather than replacing them.

## Why It's in the Arsenal

The Arsenal's serving entries differ in where they put complexity. Chunked prefill keeps one engine and accepts interference; this entry removes interference and takes on cluster topology, fabric and cache placement as the cost. Recording both makes the tradeoff explicit.

It is also the clearest illustration of why cache reuse is the dominant lever in long-context economics: recomputing a shared prefix across turns is pure waste, and a global cache pool turns it into a lookup.

## Key Features

- Separate prefill and decode clusters, so one stage's saturation cannot stall the other.
- A native RDMA transfer engine for zero-copy cache movement across nodes, with PCIe peer-to-peer and multi-path support.
- A hierarchical cache pool spanning HBM, host memory and SSD, with prefix-hash based eviction and prefetch.
- Integration with vLLM and SGLang so existing model deployments can use disaggregated execution.
- A topology-aware scheduler that routes prefill results to decode instances based on cache placement and queue depth.

## Architecture / How It Works

A request lands on a scheduler that hashes the prompt prefix, checks whether a matching cache block already exists anywhere in the pool, and dispatches the prefill to a compute-oriented instance only if a miss occurs. The resulting blocks are written into the transfer engine and pulled by the chosen decode instance, which then generates tokens against a cache it never computed.

Prefix hashing makes multi-turn conversations cheap: the shared history is computed once and reused, while only the new suffix is prefilled. Hierarchical placement decides whether blocks sit in HBM, spill to host memory or land on NVMe, trading access latency against capacity.

## Getting Started

This is not a laptop-scale install. Start by measuring whether your serving cluster actually suffers prefill interference — compare time-to-first-token for short and long prompts under concurrent load — because without that interference the architecture adds cost for nothing. Then verify RDMA reachability and bandwidth between candidate pools before deploying anything; the transfer fabric decides whether the design works.

## Use Cases

1. Long-context assistants with million-token windows where recomputing prefixes per turn is unaffordable.
2. Agent platforms whose tool loops repeatedly reuse a long system prompt across calls.
3. Mixed workloads — heavy batch summarisation alongside interactive chat — where stages must not compete.
4. Cluster operators standardising cache reuse across several model deployments behind one scheduler.

## Strengths

- Removes prefill/decode interference structurally rather than tuning around it.
- Prefix reuse converts repeated prompt processing into cache lookups, which is where long-context cost lives.
- Native RDMA transport avoids the HTTP or gRPC overhead that makes naive cache handoff pointless.
- Plugs into vLLM and SGLang, so model weights and tooling carry over.
- Proven in a large consumer service, not only in a paper.

## Limitations / When NOT to Use

- Requires fast RDMA between pools; on ordinary Ethernet the transfer becomes the bottleneck and the gain disappears.
- Adds cluster topology, multi-tier failure modes and heterogeneous autoscaling to the operational surface.
- Scheduler lookups and transport setup add control-plane latency that only amortises over long contexts.
- Single-node or short-prompt deployments get complexity without benefit.
- Debugging a miss path spans scheduler, transport and storage tiers, which is a harder on-call story than one engine's logs.

## Integration Patterns

Deploy inside an existing inference platform with the cache pool treated as stateful infrastructure: capacity planning, eviction policy and failure recovery all need owners. Keep a monolithic vLLM path behind the same router as a fallback for when RDMA links degrade, and instrument cache hit rate by prefix length — a low hit rate is the signal that the hierarchy is not earning its complexity.

## Resources

- [GitHub — kvcache-ai/Mooncake](https://github.com/kvcache-ai/Mooncake)
- [Mooncake paper](https://arxiv.org/abs/2407.00079)

## Buzz & Reception

Reception centres on the published Kimi serving results and on adoption inside vLLM and SGLang discussions; independent reproductions on third-party clusters are not recorded here. The number to obtain before committing is the prefill-interference cost on your own workload.
