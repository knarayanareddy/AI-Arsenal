---
id: letta
name: Letta
type: tool
job: [memory-management]
description: Stateful agent framework and memory system formerly known as MemGPT
url: "https://github.com/letta-ai/letta"
cost_model: open-source
pricing_detail: Open source or free to start
tags: [memory, agents, stateful]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/letta-ai/letta"
docs_url: "https://github.com/letta-ai/letta"
github_url: "https://github.com/letta-ai/letta"
alternatives: [mem0, redis-memory, zep]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: orchestration
audience: [prototype, research]
best_when:
  - You need an agent with explicit, inspectable long-term memory rather than just a longer context window
  - You are researching or building agents that must persist and edit their own memory across sessions
  - You want an open-source, self-hostable stateful-agent runtime (formerly MemGPT)
avoid_when:
  - A simple RAG-based memory layer (e.g. Mem0) would satisfy your needs with less operational complexity
  - You need a battle-tested, large-scale production deployment track record
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
---

> **TL;DR:** Stateful agent framework and memory system formerly known as MemGPT. Open source or free to start. Best for stateful agents with memory.

## Overview

An open-source stateful agent framework (formerly MemGPT) that gives agents an explicit, inspectable, and self-editable long-term memory system instead of relying solely on a longer context window.

## Why It's in the Arsenal

Letta earns a place in the Arsenal because it directly addresses a recurring decision point: you need an agent with explicit, inspectable long-term memory rather than just a longer context window. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Explicit memory blocks the agent can read and edit
- Persistent agent state across sessions
- Self-hostable, open-source runtime

## Architecture / How It Works

An agent's context is split into in-context memory (always visible) and out-of-context archival memory; the agent itself decides when to page information between them, similar to an OS managing virtual memory.

## Getting Started

```bash
pip install letta
```

## Use Cases

1. **Scenario**: you need an agent with explicit, inspectable long-term memory rather than just a longer context window
2. **Scenario**: you are researching or building agents that must persist and edit their own memory across sessions
3. **Scenario**: you want an open-source, self-hostable stateful-agent runtime (formerly MemGPT)
4. **Scenario where this is NOT the right fit**: a simple RAG-based memory layer (e.g. Mem0) would satisfy your needs with less operational complexity — evaluate an alternative instead

## Strengths

- You need an agent with explicit, inspectable long-term memory rather than just a longer context window
- You are researching or building agents that must persist and edit their own memory across sessions
- You want an open-source, self-hostable stateful-agent runtime (formerly MemGPT)

## Limitations / When NOT to Use

- A simple RAG-based memory layer (e.g. Mem0) would satisfy your needs with less operational complexity
- You need a battle-tested, large-scale production deployment track record

## Integration Patterns

- Compare against [Mem0](./mem0.md), [Redis](./redis-memory.md), [Zep](./zep.md) before adopting — they solve the same job in this phase.
- Link this tool from job guides using its canonical ID `letta`.
- Record pricing, hosting, and data-retention assumptions before production adoption.


## Resources

- [Primary site](https://github.com/letta-ai/letta)
- [Documentation](https://github.com/letta-ai/letta)
- [Source](https://github.com/letta-ai/letta)

## Buzz & Reception

- Included because this tool appears in current AI engineering tool comparisons for memory-management.

---
*Last reviewed: 2026-06-30 by @maintainer*

