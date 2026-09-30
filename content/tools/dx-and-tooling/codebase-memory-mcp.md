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

> **TL;DR:** Codebase Memory MCP, for the memory-management job. Read Strengths and Limitations together: this entry states what it claims to do, and what adopting it would commit you to operating.

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

1. **Where it sits**: on the memory-management leg, which means the decisions that matter are timeout, retry and degraded-mode behaviour, plus an interface boundary so Codebase Memory MCP can be swapped without touching callers.
2. **Validating the choice**: put Codebase Memory MCP and its named alternatives on the same task with the same data, and record the number that would make you switch — that criterion, not the feature list, is the decision.
3. **Deciding at all**: nothing is catalogued against Codebase Memory MCP here, so the honest first step is confirming the memory-management job needs a dedicated tool rather than the simpler approach you already have.

## Strengths

- The implementation detail worth reading before adopting Codebase Memory MCP is specific — an indexing pass parses the repo with tree-sitter grammars and writes symbols, files, and relationships into an embedded graph store; the MCP server then answers Cypher-style structural queries against it. Because the index persists across sessions, the agent's knowledge of the codebase survives context resets — the graph is the memory, not the context window — and that is where a capability claim either survives contact with your data or does not.
- No direct sibling is catalogued for Codebase Memory MCP in this phase, so it is the reference point for the job here; treat the absence as a gap in the catalog rather than as evidence that nothing else fits.
- Depending on Codebase Memory MCP means depending on a service rather than a package, which makes substitution easy and outage handling someone else's.
- Marked beta, so Codebase Memory MCP's interface may still move; pin the version you build against rather than tracking latest.

## Limitations / When NOT to Use

- There is no self-hosted path to Codebase Memory MCP, so quota and rate-limit changes are the vendor's to make and yours to absorb.
- Documentation for Codebase Memory MCP describes capability, not behaviour at your request shape; latency, concurrency and failure handling are the parts you must measure yourself.
- Codebase Memory MCP is beta, so interface churn is expected; read the changelog before an upgrade rather than after one breaks you.

## Integration Patterns

- Add alongside a coding agent's normal file tools: structural queries for orientation, direct file reads for the actual edit
- Complements [Chrome DevTools MCP](./chrome-devtools-mcp.md) in a frontend workflow: one gives the agent code structure, the other runtime behavior

## Resources

- [GitHub](https://github.com/DeusData/codebase-memory-mcp)
- [Documentation](https://deusdata.github.io/codebase-memory-mcp/)

## Buzz & Reception

On GitHub weekly and monthly trending with 27.8k stars as of 2026-07-07; rapid adoption across the MCP coding-agent ecosystem since its 2026-02 launch.
