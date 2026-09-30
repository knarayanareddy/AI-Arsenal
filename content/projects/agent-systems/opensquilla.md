---
id: opensquilla
name: opensquilla
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "Python microkernel agent whose local SquillaRouter picks the cheapest capable model per turn, with tool compression and one shared runtime"
github_url: "https://github.com/TokenRhythm/opensquilla"
license: Apache-2.0
primary_language: Python
tags: [routing, efficiency, memory]
maturity: beta
cost_model: open-source
github_stars: 7062
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://opensquilla.ai/"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Optimises cost per successful outcome rather than per turn, routing locally and compressing tool output before it reaches the context."
best_for:
  - "You are paying per token across several providers and you want simple turns to stop hitting your frontier model."
  - "Your agents produce enormous tool outputs (logs, web pages, diffs, JSON) and you need those results preserved without flooding the context window."
  - "You want CLI, Web UI, gateway RPC and chat channels to behave identically, because they all run through one shared runtime path."
avoid_if:
  - "You want a small Python library, because this is a full runtime with a gateway, control console and channel bridges."
  - "You need the routing decision to be inspectable by an external classifier, because SquillaRouter keeps routing decisions local and does not send your prompt elsewhere to pick a model."
  - "You are on a machine without Git LFS and need the source install path, because the from-source route requires git clone plus Git LFS for the Vue control console."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license (Apache-2.0), last commit, primary language, topics and issue count came from the GitHub API. SquillaRouter behaviour, tool compression, provider list, install commands, gateway defaults and feature table are read from the official README and product guide; routing quality was not measured."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

OpenSquilla is a microkernel AI agent with a single shared turn loop that the CLI, Web UI, gateway RPC and chat channels all run through, so tool dispatch, retries and decision logging behave the same everywhere. SquillaRouter is the local routing layer: it keeps lightweight tasks on cheaper model tiers and reserves stronger ones for harder turns, and it does this on-device without sending your prompt to an external classifier. Tool compression keeps the raw result available on disk while projecting a compact model-visible preview, so context pressure drops without losing working state. Around that sit persistent memory with local keyword and semantic search, a layered sandbox, built-in web search, on-device embeddings, goal mode for bounded multi-turn objectives, scheduling, artifacts and an MCP server bridge. The provider layer covers 20+ backends through one schema.

## Why it's in the Arsenal

The cost problem it attacks is structural rather than incidental: most agents send every turn to the most expensive model and then blow the context window on tool output. Routing plus compression attack both, and the design choice to route locally means the decision does not leak your prompt to yet another service. The tradeoff is that routing quality is bounded by the local classifier, and misrouting a hard turn to a cheap model costs you more in retries than you saved. The published technical report is the place to look for evidence on whether the routing helps.

## Architecture

The gateway process owns the turn loop, and every surface (CLI, Web UI, RPC, channels) is a client of it, which is what keeps behaviour identical. SquillaRouter classifies each turn locally and selects a provider and model tier from a single provider schema covering TokenRhythm, OpenRouter, OpenAI, Anthropic, Ollama, DeepSeek, Gemini and DashScope among others. Tool results are written through a compression step: the raw output is preserved and a compact preview is what the model sees, with handles to retrieve the full result later. Memory uses local embeddings plus keyword search for recall; compaction and cache logic preserve continuity in long sessions; and approvals plus sandbox policy gate file, shell, web, memory, git, artifact and media tools.

## Ecosystem Position

OpenSquilla competes with LiteLLM and Portkey at the routing and gateway layer, but adds an agent runtime, memory and a tool surface on top rather than exposing only a proxy API; it overlaps with Helicone and Langfuse where those focus on observability rather than execution. Compared with content/projects/frameworks entries such as LangChain or CrewAI it is an application with a gateway rather than a library, and it is the only entry in this batch whose primary axis is cost-per-outcome rather than autonomy, memory or device control. Its local-model path overlaps with content/projects/inference-engines (Ollama especially) and its provider breadth with the foundation-models phase.

## Getting Started

Python 3.12+. The recommended path is the quick terminal install of the release wheel, then onboard and start the gateway:

```bash
uv tool install --python 3.12 "opensquilla[recommended] @ https://github.com/TokenRhythm/opensquilla/releases/download/v0.5.5/opensquilla-0.5.5-py3-none-any.whl"
opensquilla onboard
opensquilla gateway run
```

Then use opensquilla chat, opensquilla agent -m "...", and opensquilla cost to inspect spend.

## Key Use Cases

1. Mixed-tier routing: run a cheap model for classification and extraction turns and a strong model only for the hard ones, from the same agent.
2. Tool-output pressure: work with logs, web pages, diffs and JSON where the raw result is kept on disk and only a preview enters the context.
3. Surface parity: use the CLI interactively, the Web UI visually, and chat channels remotely, and get the same tools, memory, approvals and cost accounting in each.

## Strengths

- Local routing that keeps simple turns off premium models without sending your prompt to a separate classifier.
- Tool compression preserves the raw result while bounding what the model sees, which is a genuine context-engineering feature.
- One shared runtime path across CLI, Web UI, gateway RPC and channels, so retries and approvals do not diverge by surface.
- Broad provider coverage (20+) behind a single config schema, plus durable sessions, goal mode and scheduling.

## Limitations

Routing and compression are the entire value proposition, and both are only as good as the local heuristics behind them; a misrouted hard turn can cost more than it saves, and there is no escape hatch other than forcing a model yourself. The install story has four paths and the source route needs git clone plus Git LFS, with versioned wheel filenames the installer validates, which is more friction than a single pip install. The control console is a Vue app bundled into release artifacts, so developing against it means the Node toolchain too. It is a large surface (gateway, router, memory, sandbox, scheduling, artifacts, MCP, channels) in a young project with a very high open-issue count, so expect churn.

## Relation to the Arsenal

This is the cost-and-context engineering entry in content/projects/agent-systems, and it is the one in this batch whose primary design axis is efficiency rather than autonomy or device control. It complements the personal assistants here (CowAgent, QwenPaw, gini-agent) by offering a runtime where spend is a first-class design constraint, and it overlaps with the model-routing and gateway tooling in other phases while adding an agent loop on top. Its local inference path goes to content/projects/inference-engines, and its provider list reaches into content/projects/foundation-models. If you want cost engineering in a DeepSeek-specific CLI instead, dao-code and Whale in this same phase are the closer read.

## Resources

- [GitHub — TokenRhythm/opensquilla](https://github.com/TokenRhythm/opensquilla)
- [Product guide — README.product.md](https://github.com/TokenRhythm/opensquilla/blob/main/README.product.md)
- [Project site — opensquilla.ai](https://opensquilla.ai/)
