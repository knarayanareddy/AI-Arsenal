---
id: exo
name: exo (exo-explore)
version_tracked: null
artifact_type: platform
category: llms
subcategory: inference-engines
description: Clusters your everyday devices — phones, laptops, desktops — into one inference pool, sharding a model too big for any single machine
github_url: "https://github.com/exo-explore/exo"
license: Apache-2.0
primary_language: Python
org_or_maintainer: exo-explore
tags: [inference, self-hosted, local]
maturity: experimental
cost_model: open-source
github_stars: 46087
github_stars_last_30d: 0
trending_score: 72
last_commit: "2026-06-23"
docs_url: "https://github.com/exo-explore/exo"
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [general-purpose]
relation_to_stack: [deploy-as-is, study-and-reference]
health_signals: [community-driven, experimental]
ecosystem_role:
  - Distributed inference across heterogeneous consumer devices — pools the combined RAM of machines you already own to run a model none of them could hold alone, an alternative to buying one big GPU box
best_for:
  - You want to run a model larger than any single device's memory using hardware you already have — exo dynamically partitions the model across a discovered cluster of mixed devices
  - You want to study peer-to-peer model-sharding and device-discovery mechanics for distributed local inference
avoid_if:
  - You need production-grade throughput and reliability — cross-device communication over consumer networks is latency-bound and experimental; a single adequate GPU or a real serving engine (vLLM/TGI) wins on stable workloads
  - You have one machine that already fits your model — distribution adds overhead with no benefit
upstream_dependencies: []
downstream_consumers: []
alternatives: [llama-cpp, ollama]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: 46.1k stars, Apache-2.0, last push 2026-06-23 verified via the GitHub API on 2026-07-08. Cadence has slowed relative to peak; marked experimental. Performance depends heavily on network and device mix and is not benchmarked here.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/trending","date":"2026-07-08","description":"46.1k stars; widely shared distributed-local-inference project"}
featured: false
status: active
---

## Overview

exo lets you run large models across a cluster of your own everyday devices — a MacBook, a desktop, a phone, a spare GPU box — by discovering them on the local network and partitioning a single model's layers across their combined memory. The goal is to run a model that no individual device could hold, using hardware you already own instead of renting a large GPU.

## Why it's in the Arsenal

It represents a distinct point in the local-inference design space the catalog already covers with `llama-cpp` and `ollama`: rather than shrinking the model to fit one device, exo pools devices to fit the model. That peer-to-peer sharding approach — automatic discovery, dynamic layer partitioning by device capability — is a genuinely different mechanism worth cataloging, even as an experimental one.

## Architecture

Nodes discover each other on the network and form a ring; exo splits the model into contiguous layer shards sized to each node's available memory, and activations are passed device-to-device during the forward pass. An OpenAI-compatible API is exposed on the entry node. Throughput is bounded by the slowest link and node in the ring — the core trade-off of distributing inference over consumer hardware.

## Ecosystem Position

Upstream: model weights (typically from Hugging Face) and per-device runtimes. Downstream: OpenAI-compatible clients. Competing/complementary: `llama-cpp` and `ollama` run models on a single machine with quantization; exo is for when even the quantized model exceeds one device — a different answer to the same "no big GPU" constraint.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical cluster setup and launch commands.
```

## Key Use Cases

1. **Scenario**: running a model too large for any one of your machines by clustering several devices you already own
2. **Scenario**: studying device discovery and dynamic model sharding for distributed local inference

## Strengths

- Pools heterogeneous consumer hardware into one inference target — a novel alternative to single-box scaling
- OpenAI-compatible endpoint makes the cluster a drop-in backend for existing clients

## Limitations

- Experimental and network-bound: cross-device latency caps throughput; not for production SLAs
- No benefit (and added overhead) when a single machine already fits your model

## Relation to the Arsenal

This is an inference-engine entry: a runtime for serving weights. For the model weights themselves see [Foundation Models](../foundation-models/_index.md); for single-machine local runtimes see `llama-cpp` and `ollama`.

## Resources

- [GitHub](https://github.com/exo-explore/exo)
