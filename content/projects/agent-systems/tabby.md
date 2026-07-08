---
id: tabby
name: Tabby
version_tracked: null
artifact_type: platform
category: code-generation
subcategory: coding-agents
description: Self-hosted AI coding assistant server in Rust — an on-prem Copilot alternative bundling its own model serving, code RAG, and IDE integrations
github_url: "https://github.com/TabbyML/tabby"
license: "Apache-2.0 (with enterprise-licensed components)"
primary_language: Rust
org_or_maintainer: TabbyML
tags: [code-gen, self-hosted, inference]
maturity: production
cost_model: self-hostable
github_stars: 33679
github_stars_last_30d: 0
trending_score: 55
last_commit: "2026-06-30"
docs_url: "https://tabby.tabbyml.com/docs/"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [deploy-as-is]
health_signals: [actively-maintained, org-backed, production-proven]
ecosystem_role:
  - "The turnkey pole of self-hosted coding assistance: one Rust binary/container that serves the models, indexes your repositories for context-aware suggestions, and manages team access — versus Continue-style extensions that require you to operate serving separately"
best_for:
  - You want on-prem team coding assistance as an appliance — single deployment providing autocomplete + chat with built-in serving (llama.cpp-based), repo indexing, auth, and usage analytics, no separate inference stack to run
  - Platform teams provisioning assistant capability for many developers centrally, where "extension + everyone configures their own endpoint" doesn't scale organizationally
avoid_if:
  - You already operate vLLM/Ollama serving — an extension like Continue over your existing endpoints avoids running a second inference stack
  - "You expect frontier-assistant capability: Tabby's sweet spot is completion-focused workflows on open code models (StarCoder, Qwen-Coder family), not Cursor-class agentic development"
upstream_dependencies: []
downstream_consumers: []
alternatives: [continue, aider]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (33.6k), Rust, and recent activity (last push 2026-06-30) verified via the GitHub API on 2026-07-08. License structure (open core with enterprise components) per repository. Deployment/feature claims from official docs; suggestion quality not independently benchmarked here.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/TabbyML/tabby","date":"2026-07-08","description":"33.6k stars, Rust, org-backed active development"}
featured: false
status: active
---

## Overview

Tabby is a self-hosted coding-assistant *server*: a Rust deployment that bundles model serving (llama.cpp-backed, GPU or CPU), repository indexing for context-aware completions, chat, team account management, and analytics behind one endpoint, with clients for VS Code, JetBrains, and Vim. It is the appliance model of on-prem Copilot — deploy one thing, point the IDE plugins at it.

## Why it's in the Arsenal

Self-hosted coding assistance has two architectures: bring-your-own-serving extensions (Continue) and integrated servers (Tabby). Tabby is the defining example of the second — meaningful for platform teams who'd rather operate one appliance than a serving stack plus per-developer configuration. Rust implementation, 33k+ stars, and a real company behind it clear the evidence bar.

## Architecture

Single Rust binary/container exposing completion and chat APIs; embedded llama.cpp-based inference for open code models (configurable per capability); a repository-context module that crawls and indexes configured git repos so completions see relevant cross-file context; web admin UI with team management, usage reporting, and the Answer Engine (chat grounded in your code and docs). Scales from a laptop CPU to multi-GPU serving.

## Ecosystem Position

Upstream: open code models (StarCoder2, Qwen2.5-Coder, CodeLlama families). Competing: Continue (extension, BYO serving), GitHub Copilot (SaaS incumbent). Its integrated-appliance approach trades the flexibility of composed stacks for operational simplicity — the classic build-vs-appliance decision.

## Getting Started

```bash
docker run -it --gpus all -p 8080:8080 -v $HOME/.tabby:/data \
  registry.tabbyml.com/tabbyml/tabby \
  serve --model Qwen2.5-Coder-7B --chat-model Qwen2.5-Coder-7B-Instruct --device cuda
```

## Key Use Cases

1. **Scenario**: rolling out coding assistance to a 50-developer org with a no-external-inference policy — one GPU box, one deployment, centralized auth and analytics, standard IDE plugins
2. **Scenario**: completion-heavy workflows on private codebases where repo-indexed context matters more than agentic capability

## Strengths

- Lowest operational surface for on-prem team assistance: serving, indexing, auth, and analytics in one deployment instead of a composed stack
- Repository-context indexing gives cross-file-aware completions — the feature that separates useful self-hosted autocomplete from single-file toys

## Limitations

- Bundled serving is also lock-in: model support and inference performance are bounded by Tabby's integration choices, and it won't reuse an existing vLLM investment
- Capability ceiling is open code models with completion-centric UX — teams comparing against Cursor-class agents will find the gap real; enterprise features (SSO etc.) sit behind the commercial license

## Relation to the Arsenal

The appliance counterpart to `continue` in the self-hosted coding-assistant pair; the models it serves are covered by foundation-model entries, and self-hosted serving trade-offs are discussed in [tools/serving-and-deployment](../../tools/serving-and-deployment/_index.md).

## Resources

- [GitHub](https://github.com/TabbyML/tabby)
- [Documentation](https://tabby.tabbyml.com/docs/)
