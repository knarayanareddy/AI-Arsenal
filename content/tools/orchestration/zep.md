---
id: zep
name: Zep
type: tool
job: [memory-management]
description: Memory and context engineering platform for AI agents and assistants
url: "https://github.com/getzep/zep"
cost_model: open-source
pricing_detail: Open source or free to start
tags: [memory, agents, retrieval]
maturity: production
stack: [python, typescript]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/getzep/zep"
docs_url: "https://github.com/getzep/zep"
github_url: "https://github.com/getzep/zep"
alternatives: [letta, mem0, redis-memory]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [prototype, production]
best_when:
  - You need temporal/episodic memory that tracks how facts about a user change over time, not just a flat vector store
  - You want a memory layer with built-in summarization, fact extraction, and knowledge-graph-style retrieval
avoid_when:
  - You only need simple session-scoped chat history (a plain message buffer is simpler and cheaper)
  - You need a fully self-hostable open-source memory layer with no managed-service dependency for the hosted tier
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
---

> **TL;DR:** Memory and context engineering platform for AI agents and assistants. Open source or free to start. Best for agent memory and context.

## Overview

A memory and context-engineering platform for AI agents that models temporal/episodic memory — tracking how facts about a user change over time — rather than treating memory as a flat, unordered vector store.

## Why It's in the Arsenal

Zep earns a place in the Arsenal because it directly addresses a recurring decision point: you need temporal/episodic memory that tracks how facts about a user change over time, not just a flat vector store. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Temporal knowledge graph of user facts
- Automatic summarization and fact extraction
- Framework-agnostic SDKs

## Architecture / How It Works

Conversation history is processed into a temporal knowledge graph; retrieval can pull both raw history and synthesized facts, weighted by recency and relevance.

## Getting Started

```bash
pip install zep-python
```

## Use Cases

1. **Scenario**: you need temporal/episodic memory that tracks how facts about a user change over time, not just a flat vector store
2. **Scenario**: you want a memory layer with built-in summarization, fact extraction, and knowledge-graph-style retrieval
3. **Scenario where this is NOT the right fit**: you only need simple session-scoped chat history (a plain message buffer is simpler and cheaper) — evaluate an alternative instead

## Strengths

- You need temporal/episodic memory that tracks how facts about a user change over time, not just a flat vector store
- You want a memory layer with built-in summarization, fact extraction, and knowledge-graph-style retrieval

## Limitations / When NOT to Use

- You only need simple session-scoped chat history (a plain message buffer is simpler and cheaper)
- You need a fully self-hostable open-source memory layer with no managed-service dependency for the hosted tier

## Integration Patterns

- Compare against [Letta](./letta.md), [Mem0](./mem0.md), [Redis](./redis-memory.md) before adopting — they solve the same job in this phase.
- Link this tool from job guides using its canonical ID `zep`.
- Record pricing, hosting, and data-retention assumptions before production adoption.


## Resources

- [Primary site](https://github.com/getzep/zep)
- [Documentation](https://github.com/getzep/zep)
- [Source](https://github.com/getzep/zep)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for memory-management.

---
*Last reviewed: 2026-06-30 by @maintainer*

