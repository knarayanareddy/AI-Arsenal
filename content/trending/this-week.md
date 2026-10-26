---
id: "this-week"
title: "This Week in AI Arsenal"
entry_type: "trend"
kind: "weekly-snapshot"
status: "draft"
as_of: "2026-10-26"
window:
  start: "2026-10-19"
  end: "2026-10-26"
signals_used:
  - github-stars-velocity
  - github-stars-total
  - github-activity
sources:
  - source: "github"
    url: "https://github.com/trending"
    last_checked: "2026-10-26"
    notes: "GitHub Trending is the primary star-velocity signal."
ranked_entries:
  - rank: 1
    entry_id: "deepseek-harness"
    entry_type: "project"
    why_here: "Trending score 80/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 80
  - rank: 2
    entry_id: "aaif-goose-goose"
    entry_type: "project"
    why_here: "Trending score 73/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 73
  - rank: 3
    entry_id: "anomalyco-opencode"
    entry_type: "project"
    why_here: "Trending score 73/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 73
  - rank: 4
    entry_id: "cjpais-handy"
    entry_type: "project"
    why_here: "Trending score 73/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 73
  - rank: 5
    entry_id: "comfy-org-comfyui"
    entry_type: "project"
    why_here: "Trending score 73/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 73
  - rank: 6
    entry_id: "d4vinci-scrapling"
    entry_type: "project"
    why_here: "Trending score 73/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 73
  - rank: 7
    entry_id: "hiyouga-llamafactory"
    entry_type: "project"
    why_here: "Trending score 73/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 73
  - rank: 8
    entry_id: "huggingface-lerobot"
    entry_type: "project"
    why_here: "Trending score 73/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 73
  - rank: 9
    entry_id: "huggingface-transformers"
    entry_type: "project"
    why_here: "Trending score 73/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 73
  - rank: 10
    entry_id: "invoke-ai-invokeai"
    entry_type: "project"
    why_here: "Trending score 73/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 73
last_reviewed: "2026-10-26"
added_date: "2026-10-26"
added_by: "maintainer"
enrichment_status: "draft"
tags:
  - trending
---

## Overview

This weekly draft summarizes notable project movement and ecosystem signals for maintainer review.

## What this snapshot covers

Top projects by trending score (GitHub star velocity, recency, and buzz sources) over the trailing 7-day window (2026-10-19 → 2026-10-26).

## Method (signals + caveats)

Trending scores are computed by `scripts/calculate-trending.js` from structured project metadata. Star velocity is noisy and community buzz is anecdotal; scores are only as good as source metadata and must be human-verified before publishing.

## Ranked entries (with why)

1. [DeepSeek Harness](content/projects/agent-systems/deepseek-harness) — DeepSeek's open agent harness (dsh): every component — model adapter, tool registry, agent loop — is a replaceable plugin on the Cordis framework
2. [goose](content/projects/agent-systems/aaif-goose-goose) — Apache-2.0 Rust agent that installs dependencies, edits files, and runs commands locally, extended through provider-agnostic MCP tools
3. [opencode](content/projects/agent-systems/anomalyco-opencode) — MIT-licensed terminal coding agent in TypeScript that edits files, runs shell commands, and exposes a client/server session protocol
4. [Handy](content/projects/inference-engines/cjpais-handy) — MIT-licensed Rust desktop app for fully offline Whisper-family speech-to-text, built as a Tauri v2 native client
5. [ComfyUI](content/projects/frameworks/comfy-org-comfyui) — GPL-3.0 node-graph engine for diffusion and video models where a saved workflow is a JSON graph other tools can replay
6. [Scrapling](content/projects/data-and-retrieval/d4vinci-scrapling) — BSD-3-Clause adaptive scraping framework that detects blocking, escalates to a stealth browser, and re-locates selectors when markup shifts
7. [LlamaFactory](content/projects/training-and-alignment/hiyouga-llamafactory) — Apache-2.0 fine-tuning workbench covering 100+ LLM and VLM families behind one YAML config for LoRA, QLoRA, and RLHF
8. [lerobot](content/projects/training-and-alignment/huggingface-lerobot) — Apache-2.0 robotics learning stack standardizing datasets, policies, and evaluation so imitation learning transfers across robot hardware
9. [transformers](content/projects/frameworks/huggingface-transformers) — Apache-2.0 model-definition layer exposing one AutoModel API over thousands of text, vision, audio, and multimodal checkpoints
10. [InvokeAI](content/projects/agent-systems/invoke-ai-invokeai) — Apache-2.0 creative engine for Stable Diffusion with a managed asset database, board, and metadata stored per generation

## Notable changes to watch

- Re-run `pnpm run update:trending` and `node scripts/draft-trending.js` before publishing; verify external buzz sources.

## How to use this (links into the Arsenal)

Link the weekly draft from monthly digests and launch posts once reviewed. Pair with the [Hall of Fame](./hall-of-fame.md) for evergreen context.

## Sources

- [GitHub Trending](https://github.com/trending) (last_checked: 2026-10-26)
