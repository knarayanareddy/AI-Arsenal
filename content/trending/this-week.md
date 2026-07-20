---
id: "this-week"
title: "This Week in AI Arsenal"
entry_type: "trend"
kind: "weekly-snapshot"
status: "draft"
as_of: "2026-07-20"
window:
  start: "2026-07-13"
  end: "2026-07-20"
signals_used:
  - github-stars-velocity
  - github-stars-total
  - github-activity
sources:
  - source: "github"
    url: "https://github.com/trending"
    last_checked: "2026-07-20"
    notes: "GitHub Trending is the primary star-velocity signal."
ranked_entries:
  - rank: 1
    entry_id: "anythingllm"
    entry_type: "project"
    why_here: "Trending score 80/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 80
  - rank: 2
    entry_id: "browser-use"
    entry_type: "project"
    why_here: "Trending score 80/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 80
  - rank: 3
    entry_id: "cognee"
    entry_type: "project"
    why_here: "Trending score 80/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 80
  - rank: 4
    entry_id: "comfyui"
    entry_type: "project"
    why_here: "Trending score 80/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 80
  - rank: 5
    entry_id: "ktransformers"
    entry_type: "project"
    why_here: "Trending score 80/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 80
  - rank: 6
    entry_id: "librechat"
    entry_type: "project"
    why_here: "Trending score 80/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 80
  - rank: 7
    entry_id: "lobe-chat"
    entry_type: "project"
    why_here: "Trending score 80/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 80
  - rank: 8
    entry_id: "paddleocr"
    entry_type: "project"
    why_here: "Trending score 80/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 80
  - rank: 9
    entry_id: "page-agent"
    entry_type: "project"
    why_here: "Trending score 80/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 80
  - rank: 10
    entry_id: "speech-to-speech"
    entry_type: "project"
    why_here: "Trending score 80/100 from GitHub star velocity, recency, and buzz sources."
    score_snapshot: 80
last_reviewed: "2026-07-20"
added_date: "2026-07-20"
added_by: "maintainer"
enrichment_status: "draft"
tags:
  - trending
---

## Overview

This weekly draft summarizes notable project movement and ecosystem signals for maintainer review.

## What this snapshot covers

Top projects by trending score (GitHub star velocity, recency, and buzz sources) over the trailing 7-day window (2026-07-13 → 2026-07-20).

## Method (signals + caveats)

Trending scores are computed by `scripts/calculate-trending.js` from structured project metadata. Star velocity is noisy and community buzz is anecdotal; scores are only as good as source metadata and must be human-verified before publishing.

## Ranked entries (with why)

1. [AnythingLLM](content/projects/agent-systems/anythingllm) — All-in-one desktop and self-hosted AI application: private document chat, RAG, and agents over any LLM with no-code setup
2. [Browser Use](content/projects/agent-systems/browser-use) — The most-starred open-source browser agent: connects LLMs to a real browser so agents can navigate, fill forms and complete web tasks autonomously
3. [Cognee](content/projects/data-and-retrieval/cognee) — Memory engine that replaces naive RAG with ECL pipelines combining knowledge graphs and embeddings over documents and conversations
4. [ComfyUI](content/projects/frameworks/comfyui) — Node-graph engine for visual generative AI: the standard open-source interface for building diffusion and video-generation pipelines
5. [KTransformers](content/projects/inference-engines/ktransformers) — CPU/GPU heterogeneous inference for giant MoE models — experts on CPU with AMX kernels, attention on GPU, running DeepSeek-class models on desktops
6. [LibreChat](content/projects/agent-systems/librechat) — Self-hosted ChatGPT-style interface unifying OpenAI, Anthropic, Google, and local models with agents, code interpreter, and multi-user auth
7. [LobeChat (LobeHub)](content/projects/agent-systems/lobe-chat) — Self-hostable, multi-provider AI chat platform with plugins, agents marketplace, knowledge base, and one-click deployment
8. [PaddleOCR](content/projects/data-and-retrieval/paddleocr) — Baidu's industrial OCR and document-AI toolkit: 80+ language text recognition, layout parsing, and lightweight models that run from server to edge
9. [PageAgent](content/projects/agent-systems/page-agent) — JavaScript in-page GUI agent from Alibaba that controls web interfaces with natural language
10. [Speech To Speech](content/projects/frameworks/speech-to-speech) — Hugging Face's modular open-source voice-agent pipeline (VAD→STT→LLM→TTS) exposed via an OpenAI Realtime-compatible WebSocket API

## Notable changes to watch

- Re-run `pnpm run update:trending` and `node scripts/draft-trending.js` before publishing; verify external buzz sources.

## How to use this (links into the Arsenal)

Link the weekly draft from monthly digests and launch posts once reviewed. Pair with the [Hall of Fame](./hall-of-fame.md) for evergreen context.

## Sources

- [GitHub Trending](https://github.com/trending) (last_checked: 2026-07-20)
