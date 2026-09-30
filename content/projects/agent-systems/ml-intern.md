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
org_or_maintainer: "huggingface"
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
id: ml-intern
name: "ml-intern"
artifact_type: tool
category: agents
subcategory: autonomous
description: "Retired Hugging Face agent that researched, wrote and shipped ML code, now archived with its CLI and hosted app shut down"
github_url: "https://github.com/huggingface/ml-intern"
license: Apache-2.0
primary_language: Python
tags: [huggingface, agents]
maturity: experimental
cost_model: open-source
github_stars: 10816
last_commit: "2026-09-14"
docs_url: "https://huggingface.co/chat/"
phase: agent-system
domain:
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "study-and-reference"
health_signals:
  - "org-backed"
  - "research-origin"
ecosystem_role:
  - "Autonomous ML-engineer agent connecting research, training, inference, and Hub publishing"
  - "smolagents reference for end-to-end ML workflow automation"
best_for: ["You are studying how an autonomous ML-engineering agent was structured and want its historical documentation as a reference for agent loop, tool use and model routing.", "You already have a deployment built against the ml-intern CLI and you need to know precisely what was retired and what to migrate to instead.", "You want to understand the Hugging Face Inference Providers and Hub integration pattern the agent used, since the retained docs still describe the token and routing setup."]
avoid_if: ["You need a working agent, because the README states the hosted web application and the ml-intern CLI have both been retired.", "You need support, bug fixes, or security updates, because the repository is archived and explicitly promises none of those.", "You are evaluating it as a maintained dependency, because the maintainers redirect all users to HuggingChat instead."]
enrichment_notes: "The agent uses hosted Inference Providers by default and can use local OpenAI-compatible servers; compute billing and sandbox controls are operator concerns. Draft pending review."
---

## Overview

ML Intern was an autonomous agent that researched, wrote and shipped machine-learning code using the Hugging Face ecosystem, with access to documentation, papers, datasets and cloud compute. The retained documentation shows a Python CLI installed from a git clone with uv, requiring HF_TOKEN for Inference Providers and Hub actions plus GITHUB_TOKEN for repository work, with all API model calls routed through Hugging Face Inference Providers. It supported an interactive chat mode and a headless single-prompt auto-approve mode, with flags for sandbox tools from an HF Space, a maximum-iteration cap, streaming control, and per-run model selection, and it also documented a local-model path. The repository is now archived: the README is an IMPORTANT banner stating the project is no longer maintained, the web app and CLI are retired, and users should move to HuggingChat.

## Why it's in the Arsenal

The useful thing here is historical rather than operational. ML Intern is a documented example of an agent scoped to one ecosystem, with deep access to that ecosystem's docs, papers, datasets and compute, and the README describes it as having written and shipped ML code rather than merely suggested it. That makes it a readable reference for a design that most agents avoid: narrow domain scope, provider routing through a single hub, and a headless mode built for automation. Anyone choosing an agent today should read it for shape and then use something maintained.

## Architecture

The architecture visible from the retained docs is a CLI-first agent: uv-managed install from source, a tool registry over the Hugging Face Hub, Inference Providers as the single model access path, and an iteration-bounded loop exposed through --max-iterations. Streaming is on by default with --no-stream to disable, model choice is a per-run flag with a slash command inside the interactive session, and a sandbox-tools option delegates execution to an HF Space. Two credentials separate concerns: HF_TOKEN carries inference and Hub permissions, GITHUB_TOKEN carries the write path for shipped code. The design assumption throughout is that the agent can act, not just advise, which is why a token with repository scope is required.

## Ecosystem Position

ML Intern overlaps with the coding agents in content/projects/dx-and-tooling and the research agents in content/projects/agent-systems, but its distinguishing scope was a single ecosystem rather than a general-purpose codebase, which is a narrower proposition than either. Compared with a general coding agent, it traded breadth for depth of access to Hugging Face documentation, datasets and compute, and the retired status means it no longer competes with anything current. Its successor path is the hosted HuggingChat the README names, which is a chat product rather than an autonomous code-shipping agent, so the migration is not like for like. Read it against the still-maintained agent entries in the same phase for a live comparison, and against content/projects/inference-engines for the model-serving decisions it deferred to a hub.

## Getting Started

Nothing here is supported, but the historical install is preserved in the archived documentation if you want to read a working example of the pattern:

```bash
git clone https://github.com/huggingface/ml-intern.git
cd ml-intern
uv sync
uv tool install -e .
ml-intern
```

The README explicitly directs current users to HuggingChat at huggingface.co/chat. Treat this command as documentation archaeology, not as an installation you should expect to depend on.

## Key Use Cases

1. Design reference: read the retained docs to see a narrow-ecosystem autonomous agent with Inference Providers routing, an iteration cap and a headless mode in one readable CLI.
2. Migration input: for anyone with an existing ml-intern setup, use the retirement notice and the HuggingChat pointer to plan a move rather than debugging a dead CLI.
3. Scope lesson: use it as a concrete example of what a single-ecosystem agent gives up against a general coding agent before scoping your own the same way.

## Strengths

- Narrow, deep ecosystem scope is a legible design lesson that most general-purpose agents do not make explicit.
- Headless auto-approve mode plus an iteration bound is a sane default for an agent that is allowed to write code.
- Single-token model routing through Inference Providers kept provider configuration in one place.
- Apache-2.0 licensing on the historical code, so the retired pattern remains readable and forkable.

## Limitations

The repository is archived and the README states the hosted web application and the CLI are both retired, with no support, no bug fixes and no security updates promised. Anyone adopting it today is depending on code nobody maintains, and the local-model path and sandbox-tools behaviour described in the retained docs are frozen in whatever state they were left. The documented successor, HuggingChat, is a chat product, so the migration loses the autonomous code-shipping behaviour entirely. The archived docs are preserved for reference and the README is explicit that they are unsupported, which makes every example a starting point for reading rather than for running.

## Relation to the Arsenal

This belongs in content/projects/agent-systems as a documented dead end and a design reference, and it is most useful read next to the maintained coding agents in content/projects/dx-and-tooling, where the same loop and tool pattern is live. Its ecosystem-scoping decision is a useful counterpoint to the general-purpose agent frameworks in content/projects/framework. The model-serving half, which it delegated to a hosted router, is the same choice the gateway entries in content/projects/agent-systems make today. If you are actually choosing something to build on, the maintenance signals on the live entries matter far more than anything in this repository.

## Resources

- [GitHub — huggingface/ml-intern (archived)](https://github.com/huggingface/ml-intern)
- [Retirement notice and historical docs in the README](https://github.com/huggingface/ml-intern#readme)
- [Successor — HuggingChat](https://huggingface.co/chat/)
