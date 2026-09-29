---
id: "memory-management"
title: "Memory Management Tools"
entry_type: "guide"
section: "tools"
description: "Curated tools for memory management workflows in AI engineering"
tags:
  - llm
  - data
related_entries: []
added_date: "2026-06-13"
last_reviewed: "2026-06-13"
added_by: "maintainer"
status: "active"
---

## Overview

This guide compares tools for the `memory-management` job. Use it as a routing page, then open the linked canonical project or tool entry for full details.

## Why It's in the Arsenal

Tool-by-job pages help builders quickly shortlist options by task instead of browsing the entire repository.

## Key Features

- Job-focused shortlist
- Links to canonical entries instead of duplicating long-form content
- Scannable TL;DR cards for each tool

## Architecture / How It Works

Choose the job first, then compare tools by cost, open-source status, self-hostability, stack, and operational complexity.

## Getting Started

```bash
# Pick one tool from the shortlist and validate it with a small proof of concept.
```

## Tool Shortlist

### Mem0 — 🔄

> **TL;DR:** Mem0 is a candidate for `memory-management` workflows. Full details: [Mem0](../orchestration/mem0.md).

| Field | Value |
|---|---|
| **Cost** | Check linked entry |
| **Open Source** | Check linked entry |
| **Self-hostable** | Check linked entry |
| **Stack** | Check linked entry |

**Strengths:**
- Good fit when its operational model matches your stack
- Worth comparing against adjacent tools before adoption

**Limitations:**
- Pricing, hosting, and integration details change; verify before production

**Get started:** See [Mem0](../orchestration/mem0.md)
**Alternatives:** Zep, Letta, Redis

### Zep — 🔄

> **TL;DR:** Zep is a candidate for `memory-management` workflows. Full details: [Zep](../orchestration/zep.md).

| Field | Value |
|---|---|
| **Cost** | Check linked entry |
| **Open Source** | Check linked entry |
| **Self-hostable** | Check linked entry |
| **Stack** | Check linked entry |

**Strengths:**
- Good fit when its operational model matches your stack
- Worth comparing against adjacent tools before adoption

**Limitations:**
- Pricing, hosting, and integration details change; verify before production

**Get started:** See [Zep](../orchestration/zep.md)
**Alternatives:** Mem0, Letta, Redis

### Letta — 🔄

> **TL;DR:** Letta is a candidate for `memory-management` workflows. Full details: [Letta](../orchestration/letta.md).

| Field | Value |
|---|---|
| **Cost** | Check linked entry |
| **Open Source** | Check linked entry |
| **Self-hostable** | Check linked entry |
| **Stack** | Check linked entry |

**Strengths:**
- Good fit when its operational model matches your stack
- Worth comparing against adjacent tools before adoption

**Limitations:**
- Pricing, hosting, and integration details change; verify before production

**Get started:** See [Letta](../orchestration/letta.md)
**Alternatives:** Mem0, Zep, Redis

### Redis — 🔄

> **TL;DR:** Redis is a candidate for `memory-management` workflows. Full details: [Redis](../orchestration/redis-memory.md).

| Field | Value |
|---|---|
| **Cost** | Check linked entry |
| **Open Source** | Check linked entry |
| **Self-hostable** | Check linked entry |
| **Stack** | Check linked entry |

**Strengths:**
- Good fit when its operational model matches your stack
- Worth comparing against adjacent tools before adoption

**Limitations:**
- Pricing, hosting, and integration details change; verify before production

**Get started:** See [Redis](../orchestration/redis-memory.md)
**Alternatives:** Mem0, Zep, Letta


<!-- AUTO-GENERATED MATCHING TOOLS BELOW — do not edit -->
This table is exhaustive for tools tagged with job = memory-management.

| Tool | Phase | Cost model | Free tier | Self-hostable | Open source | Stack | Verdict |
|---|---|---|---|---|---|---|---|
| [Codebase Memory MCP](../dx-and-tooling/codebase-memory-mcp.md) | dx and tooling | open-source | Yes | Yes | Yes | cpp | use-with-caution |
| [Letta](../orchestration/letta.md) | orchestration | open-source | Yes | Yes | Yes | python | recommended |
| [Mem0](../orchestration/mem0.md) | orchestration | freemium | Yes | Yes | Yes | python, typescript | recommended |
| [Memoriq](../orchestration/memoriq.md) | orchestration | freemium | Yes | No | No | python | watching |
| [Redis](../orchestration/redis-memory.md) | orchestration | self-hostable | Yes | Yes | Yes | polyglot | recommended |
| [TencentDB Agent Memory](../dx-and-tooling/tencentdb-agent-memory.md) | dx and tooling | open-source | Yes | Yes | Yes | typescript | watching |
| [Zep](../orchestration/zep.md) | orchestration | usage-based | Yes | Yes | Yes | python, typescript | recommended |
<!-- AUTO-GENERATED MATCHING TOOLS ABOVE — do not edit -->

## Use Cases

1. **Scenario**: your agent loses context across a long task and you need to decide between truncation, summarisation and external memory.
2. **Scenario**: you are adding memory to an agent and need to know which failure modes retrieval introduces.
3. **Scenario**: you are deciding what an agent should remember across sessions and what it must not, given your data retention constraints.

## Strengths

- Frames every option as a retrieval system with retrieval's failure modes, which is the framing that actually predicts bugs.
- Covers the eviction and deletion problem, which is a production requirement and not an optional extra.
- Distinguishes in-context window management from external memory, because they trade off differently.

## Limitations / When NOT to Use

- Memory is a retrieval system, so it inherits retrieval's failure modes: stale entries, irrelevant recall and unbounded growth.
- More memory is not better; an agent that recalls the wrong fact is harder to debug than one that recalls nothing.
- Every option here needs an eviction policy and a deletion path, and neither is automatic.

## Integration Patterns

- Link a memory tool here from any agent entry that claims multi-turn or cross-session continuity.
- When a build example implements memory, link the entry here so its retention and deletion behaviour is documented in one place.

## Resources

- [Mem0](../orchestration/mem0.md)
- [Zep](../orchestration/zep.md)
- [Letta](../orchestration/letta.md)
- [Redis](../orchestration/redis-memory.md)

## Buzz & Reception

This page is maintained as a curated shortlist, not a popularity ranking.

---
*Last reviewed: 2026-06-13 by @maintainer*
