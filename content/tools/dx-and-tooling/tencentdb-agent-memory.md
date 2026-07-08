---
id: tencentdb-agent-memory
name: TencentDB Agent Memory
type: tool
job: [memory-management]
description: Fully local long-term memory for AI agents combining symbolic short-term compression with a layered (persona/scene) long-term store
url: "https://github.com/TencentCloud/TencentDB-Agent-Memory"
cost_model: open-source
pricing_detail: Free and open source; runs fully locally
tags: [agents, memory]
maturity: beta
stack: [typescript]
free_tier: true
free_tier_limits: Fully free and local; no hosted tier documented
self_hostable: true
open_source: true
source_url: "https://github.com/TencentCloud/TencentDB-Agent-Memory"
docs_url: "https://github.com/TencentCloud/TencentDB-Agent-Memory#readme"
github_url: "https://github.com/TencentCloud/TencentDB-Agent-Memory"
alternatives: []
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when:
  - Your agent's context fills with verbose tool logs — its symbolic short-term memory condenses them into compact structured symbols (Mermaid), which is a token-reduction mechanism rather than plain truncation
  - Flat vector-store memory retrieves fragments without coherence — its layered long-term memory distills conversations into structured personas and scenes instead of a pile of embeddings
avoid_when:
  - Your sessions are short and stateless — a memory layer adds pipeline complexity with no retrieval payoff
  - You need a battle-tested, harness-agnostic memory API — its headline benchmarks and deepest integration target one specific harness (OpenClaw); portability elsewhere is less proven
version_tracked: null
enrichment_status: draft
enrichment_notes: Star count (7.4k) and last push (2026-06-26) verified via the GitHub API on 2026-07-08; on GitHub daily trending same day. GitHub reports license NOASSERTION despite the README's MIT badge — verify before adopting. Benchmark numbers (−61% tokens, PersonaMem 48%→76%) are self-reported with OpenClaw, not reproduced here.
verdict: watching
verdict_rationale: The two-mechanism design (symbolic tool-log compression plus layered persona/scene memory) is a genuine alternative to flat vector memory, but evidence is self-reported and harness-specific
status: active
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/trending?since=daily","date":"2026-07-08","description":"On GitHub daily trending; 7.4k stars"}
---

> **TL;DR:** Tencent's fully local agent memory with two distinct mechanisms: symbolic short-term memory that condenses heavy tool logs into compact structured symbols (cutting tokens), and layered long-term memory that distills conversations into structured personas and scenes instead of flat vector piles. Self-reported: −61% tokens, PersonaMem 48%→76% with OpenClaw. Watch-status: promising design, self-reported evidence.

## Overview

TencentDB Agent Memory is an open-source memory layer for AI agents built around a 4-tier progressive pipeline, fully local. Its short-term component offloads verbose tool output and condenses it into compact symbolic representations; its long-term component distills fragmented conversation history into structured personas and scenes rather than storing flat embedding chunks. It ships as an npm package with first-class integration into the OpenClaw harness.

## Why It's in the Arsenal

Most agent-memory tools are a vector store with a summarizer in front — retrieval returns fragments with no structure. This project earns a look because both of its mechanisms differ from that default: symbolic compression targets the single largest context sink in tool-using agents (raw tool logs) with structured condensation rather than truncation, and the persona/scene layering imposes schema on long-term memory so retrieval returns coherent context, not shards. Whether the self-reported gains transfer beyond its home harness is exactly what `watching` status is for.

## Key Features

- Symbolic short-term memory: heavy tool logs condensed into compact structured (Mermaid) symbols
- Layered long-term memory: conversations distilled into structured personas and scenes
- Fully local operation — no external memory service dependency
- Self-reported benchmarks with OpenClaw: −61.38% tokens on WideSearch, +51.52% relative task success, PersonaMem accuracy 48%→76%

## Architecture / How It Works

A 4-tier progressive pipeline sits between the agent and its context: fresh tool output is symbolized and swapped out of the live context (retrievable on demand), while conversation history is progressively distilled upward into scene and persona layers. Retrieval works top-down through the layers, so the agent gets structured, deduplicated context instead of the k-nearest raw fragments a flat vector store returns.

## Getting Started

```bash
npm install @tencentdb-agent-memory/memory-tencentdb
# Requires Node >= 22.16; see the README (Resources below) for
# harness integration (OpenClaw >= 2026.3.13 documented first-class).
```

## Use Cases

1. **Scenario**: a research/search agent whose tool calls return huge result payloads — symbolization keeps the reasoning context small across dozens of calls
2. **Scenario**: a long-lived assistant that must remember user preferences and past situations coherently across sessions via persona/scene retrieval

## Strengths

- Attacks tool-log bloat, the dominant context cost in tool-heavy agents, with structured compression rather than truncation
- Org-backed (Tencent Cloud) and fully local — no memory-as-a-service dependency (7.4k stars as of 2026-07-08)

## Limitations / When NOT to Use

- Evidence is self-reported and measured within one harness (OpenClaw); expect integration and validation work elsewhere
- License metadata ambiguity (GitHub NOASSERTION vs. README MIT badge) — verify before adopting

## Integration Patterns

- Drop in as the memory layer for OpenClaw-based agents (documented path); for other harnesses, wrap the npm package behind your own memory interface
- Contrast with structural code memory like [Codebase Memory MCP](./codebase-memory-mcp.md): that indexes code structure, this manages conversational/tool-log memory — they are complementary, not alternatives

## Resources

- [GitHub](https://github.com/TencentCloud/TencentDB-Agent-Memory)
- [Documentation](https://github.com/TencentCloud/TencentDB-Agent-Memory#readme)

## Buzz & Reception

On GitHub daily trending with 7.4k stars as of 2026-07-08, three months after its April 2026 creation — one of several org-backed entries in the fast-moving agent-memory category this year.
