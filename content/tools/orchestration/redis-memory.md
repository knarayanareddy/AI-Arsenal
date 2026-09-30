---
id: redis-memory
name: Redis
type: tool
job: [memory-management]
description: "In-memory data structure server with multiple eviction policies, TTL expiry, and document and vector query engines on top of key-value storage"
url: "https://github.com/redis/redis"
cost_model: self-hostable
pricing_detail: Open source or free to start
tags: [retrieval, llm]
maturity: production
stack: [polyglot]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/redis/redis"
docs_url: "https://redis.io/docs/latest/"
github_url: "https://github.com/redis/redis"
alternatives: [letta, mem0, zep]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [production]
best_when: ["You need sub-millisecond reads for session state, caches or rate-limit counters and you want a single dependency rather than an in-process map that a second replica cannot see.", "You are storing agent conversation history and memory with an expiry policy, because Redis supports multiple eviction policies plus key expiration and hash-field expiration.", "You want vector similarity search and cache in the same process as your key-value traffic, because the README describes Redis as a document and vector query engine as well as a cache."]
avoid_when: ["Your primary requirement is analytical querying over large scans, because Redis is an in-memory store rather than an analytical database.", "Your dataset must comfortably fit on disk and grow unpredictably, because an in-memory store prices memory as a hard ceiling rather than a scaling curve.", "You need multi-record ACID transactions across several keys, because the data model is not a relational transaction engine."]
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
enrichment_status: draft
---

## Overview

Redis is described as a data structure server, cache, document query engine and vector query engine for real-time data-driven applications. Its use cases in the README include caching with multiple eviction policies, key expiration and hash-field expiration, plus the broader list of real-time and data-structure workloads. The README doubles as a quick-start guide and a build-from-source resource, covering dependencies, build flags, the 32-bit build issue, allocator choice, monotonic clock handling, verbose builds and running with TLS. Client access is documented through client libraries, redis-cli and the Redis Insight GUI, and a cloud-hosted option is referenced for teams that do not want to run it themselves. The data model is the differentiator: not just strings, but the range of Redis data types with in-process operations rather than a query language.

## Why It's in the Arsenal

The decision it resolves is how many stores a latency-sensitive service needs. A typical application ends up with a cache, a session store, a queue, a rate limiter and increasingly a vector index, and each is a separate process, a separate failure mode and a separate connection pool. Redis collapses that because the operations are in-process over data structures rather than disk reads, so session lookups, queue pops and vector searches all happen at memory speed in one system. The expiry story is what makes it usable for agent memory specifically: you can set a TTL on a whole key or on a field inside a hash, so short-lived context and long-lived memory can live in the same structure.

## Key Features

- Memory-speed reads and writes with in-process operations over rich data types, so no query planner sits between your code and the data.
- Multiple eviction policies plus key and hash-field expiration, which is what makes it usable as both cache and memory store.
- Document and vector query engines in the same server, removing a separate vector database for modest workloads.
- Exceptionally mature, with a documented build-from-source path, TLS support, GUI tooling and a hosted option.

## Architecture / How It Works

Redis keeps its dataset in memory and applies a configurable eviction policy when the configured memory limit is reached, which is why the README's build section covers the allocator: memory behaviour is the core of the design rather than an afterthought. Data types, not just keys, are the unit of work, so operations like list pops, hash field updates, sorted-set range queries and set algebra execute inside the server without a query planner. Persistence and replication are layered on top of the in-memory image rather than replacing it, so durability is a deliberate trade rather than the default. The vector and document query engines run as part of the same server, which is what lets a similarity search share memory and protocol with a key-value read. Client access is through language client libraries, redis-cli for interactive work, and Redis Insight for a GUI, and TLS is a supported run mode covered in the build docs.

## Getting Started

Build or install Redis, start a server, and exercise the common paths with redis-cli:

```bash
# Debian/Ubuntu quick path, or build from source per the README
git clone https://github.com/redis/redis.git && cd redis
make -j
src/redis-server --daemonize yes

redis-cli SET agent:session:42 "context" EX 3600
redis-cli HSET agent:memory:42 fact "user prefers pithy notes"
redis-cli INFO memory
```

Set `maxmemory` and an eviction policy deliberately, since the default is unlimited and the README's build notes cover the allocator settings that determine real memory behaviour. Redis Insight is documented for a GUI view of the data.

## Use Cases

1. Agent session and memory store: keep conversation history and long-term facts in hashes and lists with per-field TTLs so short-lived and durable state coexist.
2. Caching layer for model calls: cache prompts, embeddings or completions keyed by content hash and let eviction handle the memory ceiling.
3. Queue and rate limiting: use lists or streams for work distribution and atomic counters for per-tenant limits in the same process as your reads.

## Strengths

Redis overlaps heavily with Memcached as a cache and with Valkey, the community fork, as a drop-in alternative in exactly the same category, so the choice there is governance rather than capability. It competes with the vector database entries in content/projects/data-and-retrieval for small-to-medium vector search workloads, and the honest boundary is scale: an in-memory vector index wins on latency and operational simplicity while a purpose-built vector database wins on corpus size, filtering expressiveness and persistence. Compared with a document store it overlaps on JSON-shaped data, and compared with the message brokers in content/projects/orchestration it covers queues but not the durable workflow semantics a scheduler provides. It complements rather than replaces the orchestration entries, which use it happily as a backend for state and task queues.

## Limitations / When NOT to Use

Memory is a hard ceiling rather than a scaling curve: once the dataset outgrows the box, eviction starts dropping data and the failure mode is cache misses or lost memory, so anything you cannot afford to lose needs persistence or a second store. The README positions this as a real-time data structure server, which means heavy analytical scans and large aggregations are the wrong workload even when the box has room. Its transaction model is per-command atomicity across keys rather than multi-record ACID, so a workflow needing rollback needs an external coordinator such as the orchestration entries. The build path itself is a maintenance surface, since allocator and clock flags documented in the README affect memory behaviour and differ across platforms.

## Integration Patterns

This is the default fast-state store for content/projects/orchestration and the substrate most agent frameworks assume for session state. It is the natural companion to the vector database entries in content/projects/data-and-retrieval, with the crossover point being corpus size and filtering complexity, and the model-serving entries in content/projects/inference-engines will often use it for caching. Compare against Valkey or Memcached when the deciding question is governance or pure cache semantics, and read it alongside the streaming and agent-runtime entries in content/projects/agent-systems that would keep per-session state here. If your workload is scheduled batch ETL rather than low-latency state, the data-ingestion entries are the honest starting point.

## Resources

- [GitHub — redis/redis](https://github.com/redis/redis)
- [Documentation — redis.io/docs](https://redis.io/docs/)
- [Redis Insight GUI](https://redis.io/insight/)

## Buzz & Reception

Gives an agent or service one low-latency store for session state, caches, queues and vector search, without running four separate datastores.
