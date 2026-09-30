---
id: mem0
name: Mem0
type: tool
job: [memory-management]
description: "Memory layer for agents using add-only fact extraction with entity linking and fused multi-signal retrieval"
url: "https://github.com/mem0ai/mem0"
cost_model: freemium
pricing_detail: Open source or free to start
tags: [retrieval, embeddings]
maturity: production
stack: [python, typescript]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/mem0ai/mem0"
docs_url: "https://docs.mem0.ai"
github_url: "https://github.com/mem0ai/mem0"
alternatives: [letta, redis-memory, zep]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [prototype, production]
best_when: ["You have a long-running assistant whose context window is being consumed by chat history and you want compact recalled facts instead of a growing transcript.", "You need retrieval that handles questions about current state, past events and upcoming plans, which the temporal reasoning path ranks separately.", "You are storing what an agent did, not just what a user said, because agent-confirmed actions are first-class records with equal weight to user statements."]
avoid_when: ["You are evaluating the published benchmark numbers on your own stack, because the README states the scores reflect the managed platform including proprietary optimisations not in the open-source SDK.", "You need memory that self-corrects, because the algorithm is ADD-only by design: nothing is overwritten, so a contradicted fact stays in the store.", "You cannot afford an LLM call per ingestion, because extraction is one model call per write even though retrieval is single-pass with no agentic loop."]
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
enrichment_status: draft
---

## Overview

Mem0 exposes a memory layer with add, search and retrieval APIs for assistants and agents. The April 2026 algorithm revision replaced update-and-delete extraction with single-pass ADD-only extraction in one LLM call, promoted agent-generated facts to first-class records, added entity linking so entities are extracted and embedded across memories, and moved retrieval to a multi-signal fusion of semantic search, BM25 keyword matching and entity matching. Temporal reasoning ranks the right dated instance for questions about current state, past events and plans. Published results include 92.5 on LoCoMo, 94.4 on LongMemEval and 64.1 on BEAM at 1M tokens.

## Why It's in the Arsenal

The recurring decision is what to keep when a conversation grows past what fits in context. The naive answer is summarisation, which quietly destroys detail; the other naive answer is vectorising every turn, which makes retrieval return near-duplicates and inflates token cost on every call. Mem0's bet is that the useful unit is the atomic fact rather than the message, extracted once and then fused across three retrieval signals so a query can hit on meaning, keyword or entity.

## Key Features

- Bounded read cost: single-pass retrieval with no agentic loop keeps latency near a second at p50.
- Multi-signal fusion of semantic, BM25 and entity matching beats any one retrieval mode on mixed query shapes.
- ADD-only writes mean one LLM call per ingestion and no update-inference pass to slow ingestion down.
- The evaluation framework is open-sourced, so the benchmark methodology is inspectable rather than asserted.

## Architecture / How It Works

Ingestion is a single LLM call that extracts facts and entities from a turn and writes them to the store; there is no update or delete pass, so the write path is one call and the read path is bounded. Retrieval scores semantic vector similarity, BM25 keyword overlap and entity matches in parallel and fuses the three rankings, then applies time-aware weighting to separate current-state facts from historical and future-dated ones. Because extraction is per-turn rather than per-batch, write latency is dominated by a single model call, reported at roughly a second at p50.

## Getting Started

Install the SDK and point it at either the hosted platform or a self-hosted vector store:

```bash
pip install mem0ai
```

Python and JavaScript packages are both published; the self-hosted path configures an LLM provider plus a vector store, and the managed tier is the configuration the published benchmarks were measured on.

## Use Cases

1. Customer support continuity: store extracted preferences and prior resolutions so a returning user is not re-onboarded on every ticket.
2. Long-horizon assistants: keep a year of sessions while each request pays for a compact fact set instead of the whole transcript.
3. Agent action memory: persist what the agent confirmed it did, so later reasoning can rely on completed work rather than planned work.

## Strengths

It competes with Zep and Letta in the agent-memory layer, and the meaningful distinction is where memory lives: Zep's temporal knowledge graph makes relationships explicit, Mem0's approach is embedding-centric with entity linking on top. It overlaps with content/projects/data-and-retrieval entries such as graphiti where graph extraction is the goal. Compared with a plain vector store, Mem0 is not a database but the write and recall policy in front of one, and it complements content/projects/agent-systems frameworks that have no memory of their own.

## Limitations / When NOT to Use

The headline benchmark scores explicitly include proprietary optimisations that are not in the open-source SDK, and the README says so, so treat the numbers as a managed-platform ceiling rather than an OSS expectation. ADD-only is a real semantic limitation: contradicted facts are never retired, so a stale belief persists until your own application layer prunes it. Ingestion still costs one LLM call per turn, which is the dominant write expense at scale. And entity linking quality is only as good as the extraction model, so a weak or cheap extractor degrades the whole pipeline.

## Integration Patterns

This is the memory-layer entry in content/tools/orchestration, and it is the natural counterpart to the framework entries in content/projects/frameworks that assume stateless request handling. Read it against Zep and Letta, which take different approaches to the same problem. Its vector store dependency puts it in conversation with the retrieval entries in content/projects/data-and-retrieval, and the LoCoMo and LongMemEval results are directly comparable to the numbers in the evaluation entries.

## Resources

- [GitHub — mem0ai/mem0](https://github.com/mem0ai/mem0)
- [Docs — docs.mem0.ai](https://docs.mem0.ai)
- [Benchmark write-up and open evaluation framework](https://mem0.ai/blog)

## Buzz & Reception

Replaces full conversation replay with extracted, entity-linked facts and single-pass retrieval, so long-term memory costs a bounded number of tokens per turn instead of unbounded history.
