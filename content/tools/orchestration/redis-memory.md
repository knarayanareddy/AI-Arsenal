---
id: redis-memory
name: Redis
type: tool
job: [memory-management]
description: In-memory data store commonly used for caching, session memory, queues, and vector search
url: "https://github.com/redis/redis"
cost_model: open-source
pricing_detail: Open source or free to start
tags: [memory, caching, retrieval]
maturity: production
stack: [polyglot]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/redis/redis"
docs_url: "https://github.com/redis/redis"
github_url: "https://github.com/redis/redis"
alternatives: [letta, mem0, zep]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [production]
best_when:
  - You already operate Redis and want to reuse it for agent session state, caching, or vector search instead of adding a new system
  - You need very low-latency key/value or queue-based memory for an agent loop
  - You want a mature, battle-tested datastore rather than an AI-specific memory product
avoid_when:
  - You need rich semantic memory extraction/summarization out of the box (consider Mem0 or Zep on top of or instead of Redis)
  - Your dataset and query patterns need a purpose-built vector database with advanced filtering at scale
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
---

> **TL;DR:** In-memory data store commonly used for caching, session memory, queues, and vector search. Open source or free to start. Best for fast operational memory/cache.

## Overview

A mature, widely-deployed in-memory data store frequently reused in AI systems as a fast cache, session-state store, message queue, or basic vector index, rather than a purpose-built AI memory product.

## Why It's in the Arsenal

Redis earns a place in the Arsenal because it directly addresses a recurring decision point: you already operate Redis and want to reuse it for agent session state, caching, or vector search instead of adding a new system. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Sub-millisecond key/value and queue operations
- Optional vector search module for similarity queries
- Operationally mature with broad hosting support

## Architecture / How It Works

Runs as an in-memory data structure server; agent applications use it directly via client libraries for caching, pub/sub, or as a backing store for higher-level memory frameworks.

## Getting Started

```bash
docker run -p 6379:6379 redis
```

## Use Cases

1. **Scenario**: you already operate Redis and want to reuse it for agent session state, caching, or vector search instead of adding a new system
2. **Scenario**: you need very low-latency key/value or queue-based memory for an agent loop
3. **Scenario**: you want a mature, battle-tested datastore rather than an AI-specific memory product
4. **Scenario where this is NOT the right fit**: you need rich semantic memory extraction/summarization out of the box (consider Mem0 or Zep on top of or instead of Redis) — evaluate an alternative instead

## Strengths

- You already operate Redis and want to reuse it for agent session state, caching, or vector search instead of adding a new system
- You need very low-latency key/value or queue-based memory for an agent loop
- You want a mature, battle-tested datastore rather than an AI-specific memory product

## Limitations / When NOT to Use

- You need rich semantic memory extraction/summarization out of the box (consider Mem0 or Zep on top of or instead of Redis)
- Your dataset and query patterns need a purpose-built vector database with advanced filtering at scale

## Integration Patterns

- Compare against [Letta](./letta.md), [Mem0](./mem0.md), [Zep](./zep.md) before adopting — they solve the same job in this phase.
- Link this tool from job guides using its canonical ID `redis-memory`.
- Record pricing, hosting, and data-retention assumptions before production adoption.


## Resources

- [Primary site](https://github.com/redis/redis)
- [Documentation](https://github.com/redis/redis)
- [Source](https://github.com/redis/redis)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for memory-management.

---
*Last reviewed: 2026-06-30 by @maintainer*

