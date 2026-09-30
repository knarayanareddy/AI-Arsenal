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
org_or_maintainer: MemPalace
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
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: mempalace
name: MemPalace
artifact_type: platform
category: agents
subcategory: autonomous
description: "Local-first memory system that stores conversation history verbatim and retrieves it with scoped semantic search"
github_url: "https://github.com/MemPalace/mempalace"
license: MIT
primary_language: Python
tags: [memory, retrieval, local]
maturity: beta
cost_model: open-source
github_stars: 59335
last_commit: "2026-09-25"
docs_url: "http://mempalaceofficial.com/"
phase: agent-system
domain:
  - language
  - reasoning
  - general-purpose
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A persistent-memory layer with recall, storage, deletion, and agent-integration surfaces for long-running assistants.
best_for: ["You are losing long-running context to session expiry — the README specifically flags that Claude Code sessions expire in 30 days without auto-save hooks wired — and want durable recall before that happens.", "You need recall to return the original wording of a conversation rather than a paraphrase, because the system stores text verbatim and explicitly does not summarise, extract or rewrite.", "You want search scoped by subject rather than run against one flat corpus, since people and projects become wings, topics become rooms and the original content lives in drawers."]
avoid_if: ["You need compressed, token-cheap summaries of very large histories, because verbatim storage is the deliberate design choice and will grow your context rather than shrink it.", "You are on a machine where a local ChromaDB instance is not acceptable, because the current default backend is Chroma and the interface lives in mempalace/backends/base.py with alternatives still to be written.", "You are in a shared multi-tenant deployment needing hard isolation guarantees, because the local-palace, shared-brain-hub and client topologies described in the setup skill are early and the README warns about Claude Code session expiry without auto-save hooks."]
enrichment_notes: Official repository, MIT license, benchmark positioning, and 2026-07-10 activity were reviewed on 2026-07-12. Comparative claims and production fit remain draft.
---

## Overview

MemPalace stores conversation history as verbatim text and retrieves it with semantic search. It deliberately does not summarise, extract facts or paraphrase — the original text is the record. The index is structured rather than flat: people and projects become wings, topics become rooms, and the untouched content lives in drawers, so a search can be scoped to a project instead of hitting everything. Retrieval is a pluggable layer whose interface is declared in mempalace/backends/base.py, with ChromaDB as the current default. It installs as a CLI, exposes an MCP server, and can run as a private local palace, a shared-brain hub, or a client connected to an existing hub, with nothing leaving the machine unless you opt in.

## Why it's in the Arsenal

The decision is what memory is allowed to do to your text. Summarising memory is cheap in tokens and lossy in ways that matter later — the nuance, the hedge, the exact phrasing you committed to. MemPalace takes the opposite trade: store it verbatim, pay the storage and context cost, and let semantic search find the original passage. The second decision is placement: a local index means a memory system can be used with tools that have no data-retention agreement, and the README's own warning about Claude Code's 30-day session expiry is the concrete failure this prevents.

## Architecture

Content is written to the hierarchy as unmodified text; the wing/room/drawer structure is the scoping mechanism that replaces ad-hoc metadata filtering. Retrieval is semantic search over that store, with the backend behind an interface declared in mempalace/backends/base.py so ChromaDB can be swapped without touching the rest of the system. Distribution runs through three surfaces: a CLI installed as an isolated tool, three agent skills (guided installation and operations, search-before-answer recall, and logstream task delegation), and an MCP server so a coding agent can call recall directly. Setup records whether the runtime came from uv tool, pipx or pip, which keeps upgrade instructions from being wrong. Optional weekly release checks are off by default, contact only PyPI, and never install anything automatically.

## Ecosystem Position

MemPalace competes with the summarising memory layers such as mem0, zep and letta, and the split is definitional: those compress, this retrieves verbatim, which means better fidelity and worse token economics. It overlaps with chroma and qdrant in content/projects/data-and-retrieval only at the storage layer, which is swappable by design through mempalace/backends/base.py. Compared with building recall on a vector store yourself, the difference is the hierarchy and the agent skills rather than the embeddings. It complements rather than replaces the MCP tooling such as context7, since recall is exposed as an MCP server your agent can call before answering.

## Getting Started

Install the CLI in an isolated environment so Chroma's dependencies do not collide with your global site-packages, then initialise a palace for a project:

```bash
uv tool install mempalace
mempalace init ~/projects/myapp
```

pipx install mempalace works identically. Plain pip is only recommended inside an activated virtualenv, and the agent-guided route starts with npx skills add MemPalace/mempalace, which installs the setup skill that then handles the package, MCP configuration and live-connection check.

## Key Use Cases

1. Long-horizon project continuity: keep every prior session's verbatim text so a coding agent can recall a decision from weeks ago without a lossy summary in the way.
2. Scoped recall across many projects: search one project's rooms rather than one flat corpus when you work on several codebases at once.
3. Private conversational memory: hold sensitive history in a local palace with no outbound call, which is the configuration the README describes as the default posture.

## Strengths

- Verbatim storage means recall returns original wording, with no summary drift to argue about later.
- A structured index of wings, rooms and drawers makes scoped search possible instead of only global nearest-neighbour queries.
- The retrieval backend is an interface, so ChromaDB is a default rather than a dependency.
 - Zero API calls by default, with release checks disabled and non-automatic by construction.
- Ships agent skills for guided install, recall-before-answer and task delegation rather than only a CLI.

## Limitations

Verbatim storage is the cost: an index that never summarises grows without bound, and recall that returns long passages will inflate the context window of whatever agent is asking. ChromaDB is the only shipped backend in the excerpt, so the pluggability claim is architectural and untested by default. The README carries an active warning about Claude Code sessions expiring in 30 days without auto-save hooks, which means the retention story depends on configuration you have to get right. It also carries a caution about impostor sites naming other domains, which tells you the project has an ecosystem-copy problem you will have to navigate during install. The shared-hub topology is newer than the local palace and is where you would expect the sharp edges.

## Relation to the Arsenal

This is an agent-systems phase entry, but functionally it is a retrieval component: read it beside the memory entries such as mem0, letta and graphiti that store compressed representations instead, and beside qdrant or chroma in content/projects/data-and-retrieval for the storage layer it deliberately treats as swappable. It exposes itself over MCP, so it pairs with the MCP tooling in content/tools/developer-experience. The workflow that feeds it — coding agents such as OpenHands or mistral-vibe — is what writes the text it later retrieves.

## Resources

- [GitHub — MemPalace/mempalace](https://github.com/MemPalace/mempalace)
- [Docs — mempalaceofficial.com](http://mempalaceofficial.com/)
- [Architecture and mining flows — the palace concepts](https://mempalaceofficial.com/concepts/the-palace)
