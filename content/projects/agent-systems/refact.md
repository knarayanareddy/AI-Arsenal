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
org_or_maintainer: "smallcloudai"
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
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: refact
name: "Refact.ai"
artifact_type: platform
category: code-generation
subcategory: coding-agents
description: "Archived Rust coding agent that planned, executed and iterated on engineering tasks inside the IDE"
github_url: "https://github.com/smallcloudai/refact"
license: BSD-3-Clause
primary_language: Rust
tags: [retrieval, agents]
maturity: experimental
cost_model: open-source
github_stars: 3541
last_commit: "2026-05-30"
docs_url: "https://docs.refact.ai"
phase: agent-system
domain:
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "actively-maintained"
  - "org-backed"
ecosystem_role:
  - "A self-hostable coding agent that plans, executes, and iterates on engineering tasks across developer tools."
best_for: ["You are still running an installed Refact build and need the BSD-3-Clause terms and the original repository as the historical reference for its behaviour.", "You want to understand the local-first coding-agent design, including self-hosted model support and RAG over the repository, before evaluating the successor.", "You are migrating off Refact and need to know which features disappeared when Refact Cloud was retired and development moved to another repository."]
avoid_if: ["You are starting a new project, because the README states this repository is a legacy archive and directs all new issues and pull requests elsewhere.", "You need the hosted assistant, because Refact Cloud has been retired.", "You need security fixes or compatibility with current model providers, since an archive stops at whatever release predates the migration."]
enrichment_notes: "Repository, BSD-3-Clause license, and 2026-05-30 activity verified via the GitHub API on 2026-07-12. Agentic code changes require review before merging."
---

## Overview

Refact was an open-source, local-first AI coding assistant built in Rust, covering IDE chat, autonomous agent workflows and tool-powered development, with self-hosted and on-premises deployment, RAG over the codebase, and a VS Code extension. The autonomous mode handled engineering tasks end to end by integrating with developer tools, planning, executing and iterating until it reached a successful result, and the repository topics advertise swe-bench alongside enterprise and on-prem positioning. What remains in this repository is an archive: development moved to JegernOUTT/refact and the hosted Refact Cloud service was shut down.

## Why it's in the Arsenal

The value of an archived project is diagnostic. Refact's design put the model on premises and drove an autonomous plan-execute-iterate loop against real developer tooling, which was the position most coding agents took later with more funding. Reading where it landed, which loops it closed automatically and which steps still required a human is a cheap way to scope your own requirements before you commit to a currently maintained alternative.

## Architecture

A Rust core hosted the agent loop, with an inference path that could point at a self-hosted model so code never left the machine, and a retrieval component indexing the repository for context. The VS Code extension supplied the chat surface and the tool integrations the loop called into. Autonomous mode ran plan, execute and iterate cycles over those tools, terminating on a success condition the model judged met, which is the mechanism that later products refined with explicit test and build verification.

## Ecosystem Position

It occupied the same slot as Cline, Continue and Tabby: an IDE-resident coding assistant that could act rather than only suggest. The local-first angle distinguished it from Copilot-style hosted tools, and it overlapped with content/tools/dx-and-tooling entries in this catalog that solve the same problem with an active maintainer. Compared with cloud coding agents it trades model capability for data locality, which remains the trade-off every local-first assistant makes.

## Getting Started

There is no live install path in this repository; the README is an archive notice plus the BSD-3-Clause license statement. The practical step is to read the archived documentation and evaluate the successor repository named in the notice:

```bash
git clone https://github.com/smallcloudai/refact.git
```

Cloning this repo gives you history and docs, not a maintained product.

## Key Use Cases

1. Reference reading: understand a local-first autonomous coding-agent design and its plan-execute-iterate loop before choosing a maintained equivalent.
2. Migration planning: diff what the archived build offered against the successor repository to see what you lose.
3. License reference: confirm BSD-3-Clause terms for a fork or derivative you inherited from an older deployment.

## Strengths

- Local-first architecture kept code on premises, which was the differentiator when the project was active.
- Rust core, so the agent loop ran without a managed runtime dependency.
- Autonomous mode closed the plan-execute-iterate loop rather than stopping at suggestions.
- BSD-3-Clause is a permissive license, so the archived code carries low friction for the derivative you already have.

## Limitations

The repository is explicitly a legacy archive with no active development, so no fixes, no provider updates and no compatibility work. Refact Cloud has been retired, removing the managed path entirely. The README is now mostly notice and license text, so documentation for the active product lives elsewhere and this repository's value is historical. Anything you still run from it is unpatched, which for a tool with IDE and shell access is a security posture you should end.

## Relation to the Arsenal

This entry in content/projects/agent-systems documents a retired entrant in the coding-agent field. Its live counterparts are the coding assistants in content/tools/dx-and-tooling such as cline and the self-hosted Tabby entry; read Refact for the design history and one of those for a product you can still install. Its local-first constraint is the same one the local inference entries in content/projects/inference-engines address.

## Resources

- [GitHub — smallcloudai/refact (archived)](https://github.com/smallcloudai/refact)
- [Docs — docs.refact.ai](https://docs.refact.ai)
- [Refact Cloud shutdown announcement](https://refact.ai/blog/2026/refact-cloud-is-shutting-down/)
