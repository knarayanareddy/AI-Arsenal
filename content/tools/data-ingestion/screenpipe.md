---
id: screenpipe
name: "Screenpipe"
type: tool
job: [memory-management]
description: "Local daemon recording screen OCR and audio transcripts into a queryable store for agents"
url: "https://github.com/screenpipe/screenpipe"
cost_model: open-source
pricing_detail: "Core engine open source; a paid tier covers prebuilt binaries and cloud sync"
tags: [local, memory, multimodal, agents, security, self-hosted]
maturity: beta
stack: [rust]
free_tier: true
free_tier_limits: "Open-source core with no usage cap; local storage and compute are yours to size"
self_hostable: true
open_source: true
source_url: "https://github.com/screenpipe/screenpipe"
docs_url: null
github_url: "https://github.com/screenpipe/screenpipe"
alternatives: []
integrates_with: []
added_date: "2026-10-02"
last_reviewed: "2026-10-02"
added_by: repo-maintainer
reviewed_by: null
verdict: solid-choice
verdict_rationale: "The open, inspectable version of OS-level recall: local OCR and transcription, SQLite you can query, an MCP server for agents — with consent and battery cost as real costs"
status: active
phase: data-ingestion
audience: [prototype, research]
best_when:
  - "An assistant needs what was on screen or said a moment ago, and that context must not leave the machine"
  - "You want to query your own activity history with SQL rather than ask a vendor's search box"
avoid_when:
  - "The device is managed by an employer whose policy forbids screen capture or always-on microphone access"
  - "Storage and battery are tightly constrained, since continuous capture is not free even in a fast language"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Behaviour described from the repository and documentation; resource use varies by platform and was not measured on reference hardware here."
buzz_sources: []
---

## Overview

Screenpipe is a background daemon that records what a computer displays and plays, then makes it searchable. Screen frames pass through OCR, audio goes through speech recognition, and the extracted text lands in a local SQLite database with timestamps and window metadata. Nothing is uploaded by default.

That store is the point. Language models are limited by context, and an agent that can query "what did I look at this morning" or "what was said in that call" gains context no prompt can supply. Screenpipe exposes the history through REST, GraphQL and an MCP server, so a local agent can pull it as a tool result.

Written in Rust with platform-native capture APIs, which is a deliberate response to the fact that continuous capture is otherwise a battery and CPU tax.

## Why It's in the Arsenal

Most agent memory is conversation-shaped: retrieved past turns, summarised state. This entry represents ambient memory — the environment itself as an input stream — which raises the questions the Arsenal cares about: where the data lives, who can query it, and what happens when the recorder captures a password field.

It is catalogued as the open alternative to vendor recall features, and its limitations are as instructive as its capabilities.

## Key Features

- Concurrent screen capture and audio capture, including microphone and system output.
- Local OCR for text extraction, with pluggable engines, and local speech recognition through Whisper or Candle.
- SQLite storage of text, app and window metadata with timestamps, queryable directly.
- A REST and GraphQL API plus an MCP server, so agents can query history as tool calls.
- Application and window blocklists to exclude sensitive contexts from capture.
- Swappable backends, letting operators trade accuracy against speed per platform.

## Architecture / How It Works

Capture adapters use ScreenCaptureKit on macOS and Desktop Duplication on Windows, feeding frames to an OCR worker at a configurable interval; a separate audio pipeline chunks input into windows and transcribes them. Both write structured rows into SQLite, which is the single source of truth for queries.

Agents reach the data through the API or MCP, which turns history into retrievable context. The local-first design is a deliberate constraint: storage, indexing and inference stay on the device, so privacy depends on device security rather than on a vendor's policy.

## Getting Started

Install, set the capture interval higher than the default, and add blocklists for password managers and banking before enabling continuous recording. Query the database directly first — a `SELECT` over yesterday's rows tells you more about capture quality than any demo, and it shows how much irrelevant text OCR produced.

## Use Cases

1. A local assistant answering questions about the current workday — documents opened, tabs visited, calls held.
2. Personal search over everything you have read, run against your own database.
3. Meeting notes generated from transcripts without sending audio to a transcription vendor.
4. Research on ambient context for agents, where capture and privacy tradeoffs are the subject.

## Strengths

- Keeps raw capture on the device; no account is required for the core pipeline.
- SQLite plus SQL means the history is inspectable and composable, not locked behind a search interface.
- MCP support makes the history a tool any compatible agent can call.
- Pluggable OCR and speech backends let the same design fit different hardware.
- Blocklists exist as a first-class feature, which is a rare concession in this category.

## Limitations / When NOT to Use

- Continuous recording is a genuine load on battery and CPU, however efficient the implementation.
- Storage grows quickly with OCR text, transcripts and frame caches unless pruning is configured.
- Platform parity is uneven; Linux capture in particular depends on the display server and audio loopback setup.
- Consent is an organisational problem the software cannot solve — recording colleagues on a call has legal weight.
- Building from source pulls in FFmpeg and platform SDKs, which is awkward for managed device fleets.

## Integration Patterns

Treat the daemon as a sensitive data store: full-disk encryption, a locked screen policy and immediate blocklists for credential UIs. Expose it to agents through MCP rather than giving them raw database access, so queries stay scoped and loggable. Cap retention by days and size, and audit what the pipeline captured in the first week — the first audit usually finds something it should not have kept.

## Resources

- [GitHub — screenpipe/screenpipe](https://github.com/screenpipe/screenpipe)
- [Screenpipe documentation](https://docs.screenpi.pe/)

## Buzz & Reception

Visibility comes from the local-first AI community and from comparison with proprietary recall features; battery and storage criticism in issue threads is the substantive signal. Measure both before enabling it on a laptop you rely on.
