---
id: codebase-memory-mcp
name: Codebase Memory MCP
type: tool
job: [memory-management]
description: MCP server that indexes codebases into a persistent knowledge graph for fast agent code intelligence
url: "https://github.com/DeusData/codebase-memory-mcp"
cost_model: open-source
pricing_detail: Free and open source (MIT)
tags: [agents, memory, retrieval, code-gen]
maturity: beta
stack: [cpp]
free_tier: true
free_tier_limits: Fully free and self-hostable; no paid tier exists
self_hostable: true
open_source: true
source_url: "https://github.com/DeusData/codebase-memory-mcp"
docs_url: "https://deusdata.github.io/codebase-memory-mcp/"
github_url: "https://github.com/DeusData/codebase-memory-mcp"
alternatives: []
integrates_with: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: maintainer
reviewed_by: maintainer
phase: dx-and-tooling
audience: [prototype, production]
best_when:
  - Your coding agent burns most of its context window re-discovering codebase structure every session — a persistent AST-derived knowledge graph answers "who calls this / where is this defined" in one cheap query
  - You work in a large repo where grep-based exploration is slow and imprecise, and you want structural queries (call graphs, symbol references) instead of text search
avoid_when:
  - Your repos are small enough that the agent's own file reading and grep are already fast — an index adds setup and staleness risk without payoff
  - Your language isn't covered by its tree-sitter grammars — verify language support before adopting
version_tracked: null
enrichment_status: draft
enrichment_notes: Star count (27.8k), MIT license, and active development (last push 2026-07-07) verified via the GitHub API on 2026-07-07; on GitHub weekly and monthly trending. Architecture (tree-sitter AST parsing into a SQLite-backed graph, Cypher-style queries) from the project's own documentation; latency claims not independently benchmarked here.
verdict: use-with-caution
verdict_rationale: Fast-growing and genuinely useful mechanism (persistent structural code index for agents), but young — verify index freshness behavior and language coverage on your repos
status: active
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/trending?since=monthly","date":"2026-07-07","description":"On GitHub weekly and monthly trending; 27.8k stars"}
---

> **TL;DR:** MCP server that parses your codebase (tree-sitter) into a persistent knowledge graph so coding agents query structure — definitions, call graphs, references — instead of re-grepping every session. Free, MIT. Best for large repos where context-window archaeology dominates agent time.

## Overview

A high-performance MCP server that indexes codebases into a persistent knowledge graph: it parses source with tree-sitter into ASTs, stores symbols and relationships in an embedded database, and exposes structural queries (find definition, list callers, trace references) to any MCP-capable coding agent.

## Why It's in the Arsenal

Coding agents on large repos spend a large share of tokens rediscovering structure — grepping, opening files, rebuilding a mental map that evaporates at session end. This tool earns a place in the Arsenal because it attacks that mechanism directly: a persistent, queryable structural index turns repeated context-window archaeology into single cheap tool calls, which is the same "externalize state, keep context for reasoning" principle behind good agent memory design.

## Key Features

- Tree-sitter AST parsing across many languages into a persistent graph
- Structural queries: definitions, references, call graphs, symbol search
- Embedded storage (SQLite) — no server infrastructure to operate
- Works with Claude Code, Codex, Cursor, Gemini CLI, and other MCP clients

## Architecture / How It Works

An indexing pass parses the repo with tree-sitter grammars and writes symbols, files, and relationships into an embedded graph store; the MCP server then answers Cypher-style structural queries against it. Because the index persists across sessions, the agent's knowledge of the codebase survives context resets — the graph is the memory, not the context window.

## Getting Started

```bash
# See the project's documentation (Resources below) for the current
# install command and MCP client configuration for your harness.
```

## Use Cases

1. **Scenario**: an agent asked to refactor a widely used function queries the call graph first, getting the full blast radius in one call instead of iterative grepping
2. **Scenario**: long-running work on a monorepo where each new session starts with instant structural context instead of re-exploration

## Strengths

- Attacks a real, mechanical cost: repeated structure re-discovery is one of the largest token sinks for coding agents on big repos
- Zero-infrastructure (embedded storage) and harness-agnostic via MCP (27.8k stars as of 2026-07-07)

## Limitations / When NOT to Use

- Index staleness: the graph must be kept in sync with fast-moving branches, or the agent reasons over outdated structure
- Young project; language coverage is bounded by available tree-sitter grammars — verify yours before adopting

## Integration Patterns

- Add alongside a coding agent's normal file tools: structural queries for orientation, direct file reads for the actual edit
- Complements [Chrome DevTools MCP](./chrome-devtools-mcp.md) in a frontend workflow: one gives the agent code structure, the other runtime behavior

## Resources

- [GitHub](https://github.com/DeusData/codebase-memory-mcp)
- [Documentation](https://deusdata.github.io/codebase-memory-mcp/)

## Buzz & Reception

On GitHub weekly and monthly trending with 27.8k stars as of 2026-07-07; rapid adoption across the MCP coding-agent ecosystem since its 2026-02 launch.
