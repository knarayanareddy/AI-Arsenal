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
org_or_maintainer: google-gemini
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
trending_score: 30
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: genai-processors
name: GenAI Processors
artifact_type: framework
category: agents
subcategory: frameworks
description: Lightweight Python library from Google for building asynchronous, streaming, multimodal content-processing pipelines around Gemini and other models
github_url: https://github.com/google-gemini/genai-processors
license: Apache-2.0
primary_language: Python
tags:
  - streaming
  - orchestration
  - multimodal
  - tool-use
  - llm
  - efficiency
maturity: beta
cost_model: open-source
github_stars: 2116
last_commit: '2026-07-08'
docs_url: https://google-gemini.github.io/genai-processors/
phase: framework
domain:
  - language
  - multimodal
  - general-purpose
relation_to_stack:
  - build-on-top
  - fork-and-adapt
health_signals:
  - org-backed
  - actively-maintained
  - community-driven
ecosystem_role:
  - A composable async-streaming abstraction where units of work ("processors") transform bidirectional streams of multimodal parts for real-time GenAI pipelines.
best_for:
  - You are building real-time or streaming multimodal pipelines (audio/video/text) around Gemini and want structured concurrency instead of ad hoc callbacks.
  - You want to compose reusable processing stages (transcription, model calls, tool steps) that run in parallel over a stream.
avoid_if:
  - You only make single, synchronous model calls where a streaming pipeline abstraction is overkill.
  - You need a full agent orchestration framework with planning and memory rather than a stream-processing primitive.
enrichment_notes: Official Google Gemini repository, Apache-2.0 license, and 2026-07-08 activity were reviewed on 2026-07-12. API is early and may change; production fit remains draft.
---

## Overview

GenAI Processors is a Python library that models GenAI workloads as pipelines of asynchronous processors operating on streams of typed content parts. Each processor consumes and emits a bidirectional stream, and processors compose to build parallel, low-latency multimodal applications such as live audio/video assistants.

## Why it's in the Arsenal

Real-time multimodal apps struggle with concurrency, backpressure, and interleaving model calls with tool and I/O steps. GenAI Processors is worth cataloguing because it provides a principled asyncio-based abstraction for exactly that, backed by Google and aligned with the Gemini Live/streaming APIs.

## Architecture

The core abstraction is a Processor: an async function over an input stream of `ProcessorPart` objects producing an output stream. Processors chain with an operator to form pipelines, and the runtime schedules them concurrently with asyncio so independent stages (for example transcription and model inference) overlap. Content parts carry text, audio, images, or metadata, enabling multimodal flows and tool integration.

## Ecosystem Position

GenAI Processors is lower-level than agent frameworks like LangGraph and complements them rather than competing: it is a streaming/concurrency primitive you can build agents on top of. Compared to hand-written asyncio glue, it standardizes the stream contract and composition. Weigh its Gemini-oriented design against the portability of a provider-neutral framework.

## Getting Started

Install the library, write a minimal processor that transforms a text stream, and chain it with a Gemini model processor. Run it over a streamed input, confirm parts flow and stages overlap, then add an audio or tool processor to exercise the multimodal path.

## Key Use Cases

- Real-time audio/video assistants using the Gemini Live API.
- Streaming multimodal ETL where stages run concurrently.
- Composable building blocks under a higher-level agent framework.

## Strengths

- Clean asyncio streaming model with composable, reusable processors.
- First-party Google support and alignment with Gemini streaming APIs.
- Lightweight and focused rather than a heavyweight framework.

## Limitations

- Designed around Gemini; provider-neutral use requires extra adapters.
- Early API surface that may change between releases.
- Streaming concurrency adds debugging complexity versus synchronous calls.

## Relation to the Arsenal

GenAI Processors is a streaming-primitive counterpart to the agent frameworks and orchestration tips catalogued here. Use the Arsenal's latency and streaming-observability guidance when building real-time pipelines on it.

## Resources

- [Official source](https://github.com/google-gemini/genai-processors)
- [Documentation](https://google-gemini.github.io/genai-processors/)
