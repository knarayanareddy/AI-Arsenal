---
id: goose
name: goose (Block)
version_tracked: null
artifact_type: platform
category: agents
subcategory: coding-agents
description: Block's open-source on-machine AI agent that installs, executes, edits, and tests code with any LLM — a local, MCP-extensible coding agent
github_url: "https://github.com/block/goose"
license: Apache-2.0
primary_language: Rust
org_or_maintainer: Block (aaif-goose)
tags: [agents, code-gen, tool-use]
maturity: beta
cost_model: open-source
github_stars: 50845
github_stars_last_30d: 0
trending_score: 75
last_commit: "2026-07-08"
docs_url: "https://goose-docs.ai/"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [deploy-as-is, study-and-reference]
health_signals: [org-backed, actively-maintained]
ecosystem_role:
  - A model-agnostic, on-machine coding agent that executes real actions (shell, file edits, tests) via MCP-based extensions — the open, self-hosted counterpart to hosted coding agents, with no vendor model lock-in
best_for:
  - You want a local coding agent that runs on your machine with your choice of LLM (OpenAI, Anthropic, Google, or local via Ollama) rather than being tied to one vendor's model and cloud
  - You want to extend an agent's capabilities through the Model Context Protocol — goose consumes MCP servers as tools, so it grows with the MCP ecosystem instead of a closed plugin API
avoid_if:
  - You want a fully managed, zero-setup cloud coding agent with a team dashboard — goose is a local runtime you install and point at your own model keys
  - You need enterprise governance (audit logs, centralized policy) out of the box — that's not what an on-machine open agent provides without additional tooling
upstream_dependencies: []
downstream_consumers: []
alternatives: [aider, openhands]
integrates_with: [ollama]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: 50.8k stars, Apache-2.0, and active development (last push 2026-07-08) verified via the GitHub API on 2026-07-08. The repository was recently moved under the aaif-goose org; github.com/block/goose redirects there. Capability claims come from project documentation and have not been independently benchmarked here.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/trending","date":"2026-07-08","description":"50.8k stars; one of the most-starred open coding agents"}
featured: false
status: active
---

## Overview

goose is Block's open-source AI agent that runs on your own machine: given a task, it plans and executes real actions — running shell commands, editing files, invoking tools, and running tests — using whichever LLM you configure. It ships as a CLI and a desktop app, and its capabilities are extended through Model Context Protocol (MCP) servers rather than a proprietary plugin system.

## Why it's in the Arsenal

The coding-agent space is dominated by hosted, model-locked products; goose is the credible open, model-agnostic, on-machine alternative, with serious backing (Block) and one of the largest star counts in the category. Its MCP-native extension model is the mechanism that matters: it inherits the growing MCP tool ecosystem instead of reinventing a plugin API, which is why it belongs alongside `aider` and `openhands` as a reference agent-system.

## Architecture

goose runs an agent loop (reason → select tool → execute → observe) against a configured LLM provider. Tools are supplied by MCP server extensions — filesystem, shell, web, and third-party servers — so adding a capability means attaching an MCP server, not patching goose. It executes on your machine with your credentials, which is both its power (real local actions) and its risk surface (sandbox and scope deliberately).

## Ecosystem Position

Upstream: any configured LLM provider (hosted APIs or local via Ollama) and the MCP tool ecosystem. Downstream: your codebase and dev environment. Competing/complementary: `aider` (git-native pair-programming CLI) and `openhands` (autonomous software-engineering agent) occupy adjacent slots; goose's differentiator is being model-agnostic and MCP-extensible on-machine.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install command for the CLI and desktop app.
```

## Key Use Cases

1. **Scenario**: running a local coding agent against a model you choose (including a local Ollama model) with no cloud dependency
2. **Scenario**: extending an agent with new tools by attaching MCP servers rather than writing plugins

## Strengths

- Model-agnostic and self-hosted — no vendor model lock-in, works with local models
- MCP-native extension model inherits a growing tool ecosystem rather than a closed plugin API

## Limitations

- On-machine execution with your credentials is a real risk surface — scope and sandbox deliberately
- Not a managed product: no built-in team governance, audit, or zero-setup cloud experience

## Relation to the Arsenal

This is an agent-system entry: a deployable/runnable agent, not a library you import to build one. For agent-building SDKs see [Frameworks](../frameworks/_index.md); for job-based tool comparisons see [tools/by-job/](../../tools/by-job/_index.md).

## Resources

- [GitHub](https://github.com/block/goose)
- [Documentation](https://goose-docs.ai/)
