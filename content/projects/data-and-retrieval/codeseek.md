---
id: codeseek
name: codeseek
version_tracked: null
artifact_type: library
category: rag
subcategory: vector-databases
description: "A Rust CLI that indexes seven languages with tree-sitter call graphs plus hybrid dense and sparse search, exposed as MCP tools"
github_url: "https://github.com/CodeBendKit/codeseek"
license: MIT
primary_language: Rust
tags: [code-gen, retrieval, tool-use, inference]
maturity: alpha
cost_model: open-source
github_stars: 768
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-08-02"
docs_url: null
demo_url: null
phase: data-and-retrieval
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Gives an agent grounded symbol-level answers and a real call graph instead of grep over files it has to read itself."
best_for:
  - "You are wiring a coding agent that keeps guessing at call relationships and need callers and callees resolved from the AST."
  - "You are onboarding an agent to a large polyglot repository and need an incremental index with hybrid recall rather than brute-force reading."
  - "You are budgeted on embedding spend and want BM25 fused with dense vectors through reciprocal rank fusion instead of one expensive path."
avoid_if:
  - "You are on Windows or ARM Linux, since the released binaries cover macOS arm64 and x64 plus Linux x64 only."
  - "You are in a dynamically typed language where call edges are ambiguous, because graph accuracy depends on the parser resolving the call site."
  - "You cannot run a local Rust binary per developer, which rules it out for some locked-down managed environments."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 768, MIT, Rust, last commit 2026-08-02, topics. From README: npm wrapper, platform matrix, tree-sitter, BM25/dense/RRF/reranker, LanceDB and cross-encoder topics, MD5 incremental index, command table. Language list and index accuracy not confirmed."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

CodeSeek builds two indexes per repository. The first is a call graph derived from tree-sitter parses across seven languages, which is what makes callers and callees answers rather than guesses. The second is a hybrid search index combining dense vector embeddings with BM25 sparse retrieval, merged through reciprocal rank fusion and then reranked by a cross-encoder - a standard high-recall design that keeps lexical precision for exact symbol names while embeddings handle conceptual queries. Indexing is incremental after the first run, keyed by MD5, so a reindex after a commit only touches changed files. Commands include init, status, search, callers, callees, callgraph with configurable depth and bi-directional traversal, list, and install-hooks for post-commit and post-merge automation. Native language query is supported, and codeseek install registers the tool as MCP servers for Claude Code and Codex CLI.

## Why it's in the Arsenal

The recurring decision is how a coding agent answers questions about an unfamiliar codebase. Grep finds text, not semantics, and reading files one by one burns context on structure the agent does not need. Symbol search plus a call graph turns a vague question like how the embedding path works into a ranked list of functions with file and line, which is the difference between a grounded answer and a plausible one. Hybrid retrieval matters specifically here because code queries are half keyword-shaped - looking up apply_rerank is a lexical problem - and half conceptual - asking how embedding works is not.

## Architecture

A Rust core owns parsing and querying. tree-sitter produces the AST that the call-graph builder walks to create edges, stored alongside the symbol metadata the CLI prints with paths and line numbers. The search service computes dense vectors through a configurable embedding provider set at first-run wizard time, runs BM25 lexically, fuses the two ranked lists with reciprocal rank fusion, then applies a cross-encoder reranker that produced the 0.7973-scored top hit in the README example. The npm package is a thin JavaScript wrapper that runs the first-run wizard for embedding credentials, downloads the correct platform binary from GitHub Releases, and forwards every subcommand. An MCP server mode over stdio JSON-RPC exposes the same capabilities to hosts that are not terminals.

## Ecosystem Position

CodeSeek competes with Sourcegraph's code search, with ctags-style indexers, and with hand-rolled tree-sitter indexing scripts an agent writes for itself. Compared with a pure embedding index such as a LanceDB-backed semantic search over code, hybrid BM25 plus dense recall is meaningfully better on identifier queries, which are the majority of real code questions. Compared with grep or ripgrep it adds a graph but loses raw speed and zero-setup availability. It overlaps with the code-intelligence MCP tools catalogued in content/projects/data-and-retrieval, and complements content/projects/frameworks by giving the agent harness a retrieval tool it would otherwise have to build; the reranker's cost is a serving-model question that content/projects/inference-engines governs.

## Getting Started

Install globally through npm, let the wizard configure an embedding model, index the repo, and register the MCP integration.

```bash
npm install -g codeseek
codeseek            # first-run wizard: embedding token, model, base URL
codeseek init
codeseek search main --limit 10
codeseek callers main
codeseek install   # register as MCP tools for Claude Code / Codex
```

Add codeseek install-hooks to keep the index fresh on every commit and merge.

## Key Use Cases

1. Ground an agent in a large repo: index once, then let the agent query symbols and call graphs instead of reading hundreds of files.
2. Trace an impact: use callers on a function to find everything that must change, and callees to understand what a change will pull in.
3. Auto-refresh the index: install git hooks so post-commit and post-merge rebuilds keep the graph current without anyone remembering to run it.

## Strengths

- Hybrid dense plus BM25 retrieval fused with RRF and reranked, which handles both identifier lookups and conceptual queries.
- AST-derived call graph rather than text heuristics, so callers and callees are real edges from a parser.
- MD5-keyed incremental indexing keeps reindex cost proportional to what changed, not to repository size.
- Drops into Claude Code and Codex as native MCP tools, so an existing agent gains retrieval without prompt changes.

## Limitations

Platform support is narrow: released binaries cover macOS arm64 and x64 plus Linux x64, with no Windows build. Index quality inherits the embedding model you configure at first run, and the cross-encoder reranker adds a per-query model call whose latency and cost are not documented. Seven languages means a polyglot monorepo with the eighth language will have partial coverage. Graph accuracy degrades on dynamic dispatch, reflection, and template metaprogramming, and there is no precision metric published for the edges. The project is young at under a thousand stars with an alpha-level release cadence, so index format changes should be expected.

## Relation to the Arsenal

This data-and-retrieval-phase entry is code retrieval with a specialized index rather than a document store, so it sits alongside the vector databases in this phase while occupying a narrower niche. It exists to serve coding agents built with the runtimes in content/projects/frameworks, and its embedding and rerank calls depend on endpoints served through content/projects/inference-engines. No benchmark tooling in the catalog measures code-retrieval quality, which is a gap if you need one.

## Resources

- [Repository](https://github.com/CodeBendKit/codeseek)
- [npm package](https://www.npmjs.com/package/codeseek)
- [Homebrew tap](https://github.com/CodeBendKit/codeseek)
