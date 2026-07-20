---
id: speech-to-speech
name: Speech To Speech
version_tracked: null
artifact_type: framework
category: voice-audio
subcategory: frameworks
description: Hugging Face's modular open-source voice-agent pipeline (VAD→STT→LLM→TTS) exposed via an OpenAI Realtime-compatible WebSocket API
github_url: https://github.com/huggingface/speech-to-speech
license: Apache-2.0
primary_language: Python
org_or_maintainer: huggingface
tags:
  - voice
  - agents
  - streaming
  - local
maturity: production
cost_model: open-source
github_stars: 6188
github_stars_last_30d: 534
trending_score: 80
last_commit: '2026-07-17'
docs_url: https://github.com/huggingface/speech-to-speech#readme
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain:
  - audio
  - language
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - org-backed
  - actively-maintained
  - production-proven
ecosystem_role:
  - The reference open-source voice-agent pipeline — every stage (VAD, STT, LLM, TTS) swappable, speaking the OpenAI Realtime protocol, so it serves as both a deployable backend and a drop-in self-hosted replacement for hosted realtime voice APIs
best_for:
  - You want a voice agent without vendor lock-in — the server speaks the OpenAI Realtime WebSocket protocol, so existing Realtime clients can point at it unchanged while you swap the LLM slot between hosted providers, HF Inference, or a local vLLM/llama.cpp server
  - You need a fully local, fully open voice stack (privacy, edge, robotics) — local STT (Parakeet), local TTS (Qwen3-TTS), and a local LLM compose into a pipeline with no cloud dependency
avoid_if:
  - You need the absolute lowest-latency, most natural conversational experience and have no data-residency constraints — end-to-end hosted realtime models (native speech-to-speech) still lead a cascaded VAD→STT→LLM→TTS pipeline on latency and prosody
  - You want a batteries-included consumer voice assistant — this is a pipeline/server for builders, not an end-user product
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Star count (5.7k), Apache-2.0 license, and last push (2026-07-07) verified via the GitHub API on 2026-07-08; on GitHub weekly trending same day. Production-proven signal is README-documented (conversation backend for thousands of Reachy Mini robots — first-party but concrete). Latency claims not independently benchmarked.
added_date: '2026-07-08'
last_reviewed: '2026-07-08'
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - source: github-trending
    url: https://github.com/trending?since=weekly
    date: '2026-07-08'
    description: On GitHub weekly trending; 5.7k stars
featured: false
status: active
---

## Overview

Hugging Face's open-source voice-agent framework: a low-latency, fully modular VAD → STT → LLM → TTS pipeline exposed through an OpenAI Realtime-compatible WebSocket server. Every stage is swappable — the default local stack uses Parakeet TDT for STT and Qwen3-TTS for speech output, and the LLM slot speaks OpenAI-compatible protocols so it can target a hosted provider, HF Inference Providers, or your own vLLM/llama.cpp server for a fully local stack.

## Why it's in the Arsenal

Two mechanisms earn it a place. First, protocol compatibility: by implementing the OpenAI Realtime WebSocket API, it makes the entire hosted-vs-self-hosted decision reversible — existing Realtime clients repoint at it without code changes, which is rare leverage in the voice space. Second, it is production-proven in an unusually concrete way for an open pipeline: it runs as the conversation backend for thousands of Reachy Mini robots. Together those make it the default starting point for open-source voice agents.

## Architecture

A cascaded pipeline server: voice activity detection segments the input stream, STT transcribes, an OpenAI-compatible LLM produces the response, and TTS renders speech — all streamed over a Realtime-compatible WebSocket (`/v1/realtime`). Modularity is the design center: each stage is a swappable component behind a common interface, so the same server config spans fully-local, fully-hosted, and hybrid deployments.

## Ecosystem Position

Upstream: open STT/TTS models (Parakeet, Qwen3-TTS) and any OpenAI-compatible LLM server (vLLM, llama.cpp, hosted providers). Downstream: realtime voice clients and embodied deployments (Reachy Mini robots). Competing: hosted end-to-end realtime speech models, which lead on latency/prosody but cannot be self-hosted; complementary to the [inference engines](../inference-engines/_index.md) that serve its LLM slot locally.

## Getting Started

```bash
pip install speech-to-speech
export OPENAI_API_KEY=...
speech-to-speech
# Starts an OpenAI Realtime-compatible server at ws://localhost:8765/v1/realtime
```

## Key Use Cases

1. **Scenario**: replacing a hosted realtime voice API with a self-hosted backend for data-residency reasons, keeping existing Realtime clients unchanged
2. **Scenario**: a fully local voice assistant on your own hardware — local STT, local LLM via llama.cpp/vLLM, local TTS, no audio leaving the machine

## Strengths

- OpenAI Realtime protocol compatibility makes hosted↔self-hosted migration a config change, not a rewrite
- Concrete production deployment (conversation backend for thousands of Reachy Mini robots) — rare hard evidence for an open voice pipeline

## Limitations

- Cascaded pipelines lag native end-to-end speech models on latency and prosody; the modularity is bought at that cost
- Quality is bounded by the open STT/TTS components you choose; expect tuning per language and acoustic environment

## Relation to the Arsenal

This is a framework entry: a pipeline you deploy or build on rather than a model. For the runtimes that serve its local LLM slot, see [Inference Engines](../inference-engines/_index.md); for standalone agent platforms, see [Agent Systems](../agent-systems/_index.md).

## Resources

- [GitHub](https://github.com/huggingface/speech-to-speech)
- [Documentation](https://github.com/huggingface/speech-to-speech#readme)
- [PyPI](https://pypi.org/project/speech-to-speech/)
