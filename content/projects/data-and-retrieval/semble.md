---
version_tracked: null
demo_url: null
paper_url: null
paper_id: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
org_or_maintainer: "minishlab"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 0
added_date: "2026-07-19"
last_reviewed: "2026-07-19"
added_by: maintainer
status: active
id: semble
name: "Semble"
artifact_type: library
category: tooling
subcategory: libraries
description: "MinishLab's CPU code-search library for agents, returning relevant snippets through natural-language retrieval, CLI, MCP, or subagent integrations"
github_url: https://github.com/minishlab/semble
license: "MIT"
primary_language: "Python"
tags:
  - "retrieval"
  - "efficiency"
  - "agents"
  - "embeddings"
  - "tool-use"
maturity: beta
cost_model: open-source
github_stars: 5650
last_commit: "2026-07-13"
docs_url: https://minish.ai/packages/semble/introduction/
phase: data-and-retrieval
domain:
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "community-driven"
  - "actively-maintained"
ecosystem_role:
  - "CPU semantic code search for token-efficient coding agents"
  - "MCP, CLI, and subagent retrieval layer without external services"
best_for:
  - "Token-efficient repository search for coding agents"
  - "CPU-only code retrieval without API keys or external services"
avoid_if:
  - "You need exhaustive, deterministic matches (e.g. security audits) where ranked semantic results can miss occurrences"
  - "Your repository is too dynamic for index refreshes or needs exact symbol-level static analysis"
enrichment_notes: "The README reports approximately 98% fewer tokens than grep-plus-read and benchmark quality near specialized transformers; these are project benchmarks requiring local validation. Draft pending review."
---

## Overview

Semble treats code search as retrieval rather than a sequence of shell greps. It indexes a repository locally, answers natural-language questions with only relevant snippets, and is designed to keep agent context small; the result is a practical bridge between embeddings/search and coding-agent tool use.

## Why it's in the Arsenal

Semble earns a place because it treats repository exploration as semantic retrieval and returns only the snippets an agent needs. The CPU-only, no-key design and integrations through MCP, AGENTS.md instructions, and a subagent make its reported token savings directly actionable in coding workflows.

## Architecture

The Python library builds and caches an index, performs semantic queries on CPU, and exposes the same capability through a CLI, MCP server, AGENTS.md instructions, or a dedicated subagent. Install-time integration detects agents such as Claude Code, Codex, and OpenCode, while top-k controls bound returned context.

## Ecosystem Position

Semble complements grep, language servers, and code-specialized transformers and competes with agent-native repository search tools. Its reported 98% token reduction is an efficiency advantage rather than a correctness guarantee; it sits below the agent and can be swapped without changing the higher-level workflow.

## Getting Started

Install it with `uv tool install semble`, run `semble install`, and select an MCP, instructions, or subagent integration for the coding agent in use. Index a local repository, ask a natural-language query such as `How is authentication handled?`, and tune `--top-k` while checking freshness and recall.

## Key Use Cases

Use Semble to answer architecture questions over a local codebase, reduce context passed to a coding agent, or search a remote repository without an external embedding API. MCP mode fits agents that can call tools, while AGENTS.md guidance and the dedicated subagent support simpler integrations.

## Strengths

The README reports CPU-only operation, no API keys or external services, approximately 98% fewer tokens than grep-plus-read, and sub-second end-to-end indexing. Its MCP server, CLI, instructions, and subagent modes let one index serve several coding-agent products.

## Limitations

Semantic retrieval can miss exact symbol relationships, stale indexes can return outdated snippets, and quality varies across languages and unusual repositories. CPU-only operation lowers infrastructure cost but does not eliminate indexing time; validate NDCG, recall, query latency, and prompt-injection handling on private code before relying on it.

## Relation to the Arsenal

Semble complements grep, language servers, embeddings, and code-review agents, while competing with code-specialized semantic search tools. It belongs in data and retrieval as a context-selection layer; the agent, repository permissions, and exact-symbol analysis remain separate responsibilities.

## Resources

- [GitHub](https://github.com/minishlab/semble)
- [Documentation](https://minish.ai/packages/semble/introduction/)
