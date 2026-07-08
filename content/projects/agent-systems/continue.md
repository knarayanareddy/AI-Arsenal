---
id: continue
name: Continue
version_tracked: null
artifact_type: platform
category: code-generation
subcategory: coding-agents
description: Open-source AI coding assistant for VS Code and JetBrains — chat, autocomplete, edit, and agent modes over any model, including fully local
github_url: "https://github.com/continuedev/continue"
license: Apache-2.0
primary_language: TypeScript
org_or_maintainer: continuedev
tags: [code-gen, agents, self-hosted]
maturity: production
cost_model: open-source
github_stars: 34744
github_stars_last_30d: 0
trending_score: 60
last_commit: "2026-07-08"
docs_url: "https://docs.continue.dev"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [deploy-as-is, fork-and-adapt]
health_signals: [actively-maintained, org-backed, community-driven]
ecosystem_role:
  - "The open-source, bring-your-own-model counterpart to Copilot/Cursor: the reference choice when the constraint is model control (local models, self-hosted endpoints, no code leaving the network) rather than maximum assistant capability"
best_for:
  - Your organization cannot send code to third-party SaaS — Continue + Ollama/vLLM gives chat, autocomplete, and edit against models running entirely on your infrastructure
  - You want per-capability model routing (a fast local model for autocomplete, a frontier API model for chat/agent) — Continue's config makes each role independently pluggable
avoid_if:
  - You want maximum out-of-the-box capability and don't have data-residency constraints — Cursor and Copilot ship deeper product integration than a BYO-model extension can
  - You expect local models to match hosted frontier assistants — the honest trade is privacy and control for capability, especially in agent mode
upstream_dependencies: []
downstream_consumers: []
alternatives: [aider, cline, tabby]
integrates_with: [ollama, vllm]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (34.7k), Apache-2.0, and active development (last push 2026-07-08) verified via the GitHub API on 2026-07-08. Capability descriptions from official docs; comparative capability claims are qualitative, not benchmarked here.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/continuedev/continue","date":"2026-07-08","description":"34.7k stars, Apache-2.0, active development"}
featured: false
status: active
---

## Overview

Continue is the open-source AI coding assistant that decouples the IDE experience from the model: VS Code and JetBrains extensions providing chat, inline edit, tab autocomplete, and agent mode, each independently configurable to any provider — hosted APIs, self-hosted vLLM, or local Ollama. Configuration is code (YAML/JSON), shareable across a team, with hooks for custom context providers and rules.

## Why it's in the Arsenal

For every team whose code cannot leave the network, "which coding assistant?" becomes "which BYO-model assistant?" — and Continue is the most adopted open-source answer inside the IDE (34k+ stars, Apache-2.0, company-backed). Its per-role model routing is the practically important design: autocomplete latency wants a small local model, agent tasks want a frontier model, and Continue is built around exactly that split.

## Architecture

TypeScript extension core with a provider-abstraction layer; distinct model roles (chat, edit, autocomplete, embed, rerank) each bound to any configured provider; context engine assembling repo context via retrieval (codebase indexing/embeddings), open files, and pluggable context providers; agent mode with tool use (terminal, file edits) building on the same core; team config distributable via Continue Hub.

## Ecosystem Position

Upstream: any model provider — the point of the project; Ollama and vLLM for the fully-local story. Competing: Copilot/Cursor (closed, capability-maximal), Cline (agent-first VS Code extension), aider (terminal-based), Tabby (self-hosted server including its own serving layer). Complementary: the serving engines in tools/serving-and-deployment that host its models.

## Getting Started

```bash
# Install "Continue" from the VS Code marketplace, then configure models:
#   ~/.continue/config.yaml
# models:
#   - name: Local Llama
#     provider: ollama
#     model: llama3.1:8b
#     roles: [chat, edit]
```

## Key Use Cases

1. **Scenario**: air-gapped or compliance-constrained development — full assistant capability (chat, edit, autocomplete) with all inference on internal vLLM/Ollama endpoints
2. **Scenario**: cost/latency-tuned assistant stack — small local model on autocomplete's hot path, frontier API model reserved for chat and agent tasks, configured once and shared team-wide

## Strengths

- Cleanest separation of assistant UX from model choice in the space: every capability independently routable, making it the default IDE assistant for self-hosted-model shops
- Apache-2.0 with genuine extensibility (custom context providers, rules, hub-shared configs) — fork-and-adapt is realistic, not theoretical

## Limitations

- Trails Cursor/Copilot on integrated product polish and frontier features — the structural cost of being model-agnostic rather than vertically integrated
- Assistant quality is bounded by the models you bring: with small local models, autocomplete is serviceable but agent mode disappoints; setting expectations there is part of adopting it

## Relation to the Arsenal

The IDE-integrated member of the open coding-assistant set — `aider` (terminal), `cline` (agent-first extension), `tabby` (self-hosted server with own serving). The local-model serving guidance in [tools/serving-and-deployment](../../tools/serving-and-deployment/_index.md) covers the endpoints it points at.

## Resources

- [GitHub](https://github.com/continuedev/continue)
- [Documentation](https://docs.continue.dev)
