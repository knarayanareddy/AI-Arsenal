---
id: tabby
name: Tabby
version_tracked: null
artifact_type: platform
category: code-generation
subcategory: coding-agents
description: "Self-hosted coding assistant that runs completion and chat on your own GPU with no DBMS or cloud dependency"
github_url: "https://github.com/TabbyML/tabby"
license: NOASSERTION
primary_language: Rust
org_or_maintainer: TabbyML
tags: [self-hosted, agents]
maturity: production
cost_model: self-hostable
github_stars: 33890
github_stars_last_30d: 0
trending_score: 55
last_commit: "2026-06-30"
docs_url: "https://tabby.tabbyml.com/docs/welcome/"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [deploy-as-is]
health_signals: [actively-maintained, org-backed, production-proven]
ecosystem_role:
  - "The turnkey pole of self-hosted coding assistance: one Rust binary/container that serves the models, indexes your repositories for context-aware suggestions, and manages team access — versus Continue-style extensions that require you to operate serving separately"
best_for: ["You have a source-code confidentiality constraint that rules out sending code to a hosted completion API, and you have a GPU to spend on it.", "You want an internal Answer Engine that answers questions from your own documentation and repositories through REST APIs rather than a public chatbot.", "You need to plug the assistant into cloud IDE infrastructure through an OpenAPI interface instead of shipping a proprietary client."]
avoid_if: ["You need frontier-model answer quality on a large refactor, because a self-hosted model on a single GPU will not match a hosted frontier model.", "You want a fully autonomous agent that writes and opens pull requests, because the Pochi task integration arrived in a December 2025 release and is still early.", "You cannot dedicate hardware or accept indexing your codebase, because a self-hosted assistant needs both a GPU and a populated index."]
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

Tabby positions itself as an open-source, on-premises alternative to GitHub Copilot with three stated constraints: self-contained with no DBMS or cloud service, an OpenAPI interface for integration with existing infrastructure such as cloud IDEs, and support for consumer-grade GPUs. It provides inline completion plus an Answer Engine, described as a central knowledge engine that can be fed with your own documentation through REST APIs, with Answer Engine messages convertible into persistent shareable Pages. Recent additions include GitLab merge-request indexing as context, Pochi tasks that turn GitHub issues into pull requests from the sidebar with CI, lint and test breakdowns, and an agent private preview.

## Why it's in the Arsenal

The decision it removes is whether code can leave the network. Completion tools that call a hosted API are unusable in some regulated environments and awkward in others, so the choice is between no assistant and an approved one. Tabby answers that by running the model where the code already lives, indexing the repository once, and exposing an OpenAPI surface so the security review covers an HTTP interface rather than a vendor extension.

## Architecture

A Rust server hosts the inference and indexing path, loading a model locally on consumer hardware and building a repository index that powers completion and Answer Engine retrieval. The OpenAPI layer exposes completions and knowledge endpoints, which is how v0.29 added user-supplied documentation through REST APIs and how cloud IDEs integrate without a bespoke client. The VS Code extension is the primary front end, with the agent entry point living in the separate Pochi project rather than the server itself.

## Ecosystem Position

It competes with GitHub Copilot as the named alternative and with Continue as the closest open-source peer, but the axis is deployment: Tabby's differentiator is a single self-contained binary with no external database, while Continue is a config-driven client that can point anywhere. It overlaps with the coding assistants in content/tools/dx-and-tooling such as cline, and it is a natural consumer of the local inference entries in content/projects/inference-engines. Compared with a hosted assistant it trades raw model capability for locality.

## Getting Started

The quickest route is the container image published under the tabbyml organisation:

```bash
docker run --gpus all -p 8888:8888 ghcr.io/tabbyml/tabby serve
```

The OpenAPI surface on that port is the same interface a cloud IDE or an internal tool would call.

## Key Use Cases

1. Air-gapped code completion in a regulated environment where a hosted API is not an option and a consumer GPU is the only hardware available.
2. Internal Answer Engine over documentation and repos, indexed from GitLab merge requests and fed through the documentation REST API.
3. Issue-to-pull-request flow through Pochi, which opens a PR from a GitHub issue and reports CI, lint and test status back in the sidebar.

## Strengths

- No DBMS or cloud service required, so the deployment is one process rather than a stack someone has to operate.
- Runs on consumer-grade GPUs, which makes it reachable for a team without a datacenter allocation.
- OpenAPI interface means cloud IDEs and internal tooling integrate against an HTTP contract, not a proprietary protocol.
- Self-hosted and on-premises by design, which is the whole reason a team accepts its model-quality limits.

## Limitations

The GitHub license field reports NOASSERTION, so redistribution and embedding terms need to be read from the repository's own license text before any commercial use; for an on-premises product inside a company that is a legal step, not a formality. Answer quality is bounded by whatever model fits the hardware you have, so self-hosted is a real capability ceiling. The repository's last commit is mid-2026, and the changelog's most ambitious features, the agent preview and Pochi-driven PRs, are newer than the completion core, so maturity is uneven across the product. And indexing your own codebase means handling sensitive material at rest with nothing to offload to.

## Relation to the Arsenal

This is the self-hosted coding assistant in content/projects/agent-systems and the counterpart to the hosted coding agents in content/tools/dx-and-tooling. It pairs with the local inference entries in content/projects/inference-engines and with the retrieval entries in content/projects/data-and-retrieval, since its Answer Engine is a RAG problem. Pochi is the separate agent repository and is worth evaluating on its own before you assume Tabby can drive issues end to end.

## Resources

- [GitHub — TabbyML/tabby](https://github.com/TabbyML/tabby)
- [Docs — tabby.tabbyml.com/docs](https://tabby.tabbyml.com/docs/welcome/)
- [Pochi agent repository](https://github.com/TabbyML/pochi)
