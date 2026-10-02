---
id: screenpipe
name: Screenpipe
type: tool
job:
  - Continuously capture local screen and audio data to expose structured, searchable context to AI agents via local APIs and MCP.
description: A local-first, high-performance background daemon written in Rust that continuously records screen (OCR) and audio (STT) data, indexing it into a local SQLite…
url: https://github.com/screenpipe/screenpipe
cost_model: open-source
pricing_detail: Fully open-source core engine under permissive licensing. Paid cloud sync and pre-built binary distributions available via subscription.
tags:
  - ai-memory
  - local-first
  - mcp
  - rust
  - ocr
  - speech-to-text
  - agents
maturity: beta
stack:
  - Rust
  - SQLite
  - FFmpeg
  - Tesseract
  - Whisper.cpp
  - Candle
free_tier: True
self_hostable: True
open_source: True
added_date: 2026-10-02
last_reviewed: 2026-10-02
added_by: repo-maintainer
verdict: best-in-class
verdict_rationale: Screenpipe provides an exceptionally engineered, local-first, low-overhead alternative to proprietary OS-level recall systems. Its native Rust implementation, local SQLite storage, and first-class Model Context Protocol (MCP) support make it the premier choice for developers building context-aware local AI agents.
status: active
phase: data-ingestion
audience:
  - AI Engineers and Local Agent Developers
best_when: You need to feed continuous, real-time desktop context (what the user sees and hears) into local LLMs or agent frameworks without compromising privacy or leaking data to third-party APIs.
avoid_when: You are operating on extremely resource-constrained hardware where background video encoding, OCR, and audio transcription overhead cannot be tolerated, or when strict enterprise MDM policies prohibit low-level screen and audio capture.
github_url: https://github.com/screenpipe/screenpipe
docs_url: null
---

## Overview

Screenpipe is a high-performance, local-first background utility written in Rust designed to solve the context-window limitation of AI agents. By continuously capturing screen frames and audio inputs/outputs, Screenpipe builds a comprehensive, multi-modal history of a user's digital workflow. The core engine operates as a daemon, leveraging native platform APIs (such as ScreenCaptureKit on macOS and DXGI Desktop Duplication on Windows) to capture screen states with minimal CPU overhead.

The captured data is processed through two parallel local pipelines: a computer vision pipeline that runs optical character recognition (OCR) on screen frames, and an audio pipeline that transcribes incoming microphone and system audio using Whisper.cpp or Hugging Face's Candle framework. The resulting structured text, metadata, and temporal anchors are indexed in a local SQLite database, ensuring that the user's raw data never leaves their machine.

Exposing this rich historical context to external applications is achieved through a built-in REST API, a GraphQL interface, and native support for the Model Context Protocol (MCP). This allows agents running in environments like Claude Desktop, Openclaw, or custom local scripts to query the user's past actions, read screen states, and retrieve spoken dialogue using simple, structured API calls.

## Why It's in the Arsenal

Screenpipe stands out as an open-source, highly hackable alternative to proprietary systems like Windows Recall or Rewind.co. By writing the core engine in Rust, the project achieves tight memory management and low-latency frame processing, which is critical for a utility designed to run continuously in the background.

Unlike cloud-centric logging tools, Screenpipe's architecture prioritizes local-first execution. Developers can swap out OCR engines (e.g., Apple's native Vision framework vs. Tesseract) and STT backends (e.g., local Whisper models running on Apple Silicon GPU vs. cloud APIs) to match their hardware capabilities and privacy requirements. Its native integration with the Model Context Protocol (MCP) makes it instantly compatible with modern LLM agent tool-calling ecosystems.

## Key Features

Continuous Local Ingestion: Captures screen frames and system/microphone audio concurrently, utilizing platform-specific hardware acceleration (Metal/CUDA) for encoding and processing.

Local OCR & STT Engines: Employs high-performance local inference engines including Whisper.cpp for audio transcription and Apple Vision / Tesseract for text extraction from screen frames.

Structured SQLite Storage: Persists all extracted text, window metadata, application names, and timestamps into a queryable local SQLite database, enabling complex SQL-based historical searches.

Model Context Protocol (MCP) Server: Exposes a standardized MCP interface, allowing LLM clients to naturally discover and invoke tools that query the user's screen and audio history.

Granular Privacy Filters: Supports application-level and window-level blacklisting/whitelisting to prevent the capture of sensitive information such as password managers or banking applications.

## Trade-offs

Resource Consumption: Despite Rust-based optimizations, continuous video encoding, OCR, and audio transcription impose a non-trivial baseline load on the host CPU and GPU, which can degrade battery life on laptops.

Storage Overhead: Storing continuous OCR text, audio transcripts, and optional frame cache files can quickly consume gigabytes of local disk space if aggressive pruning and database vacuuming policies are not configured.

Platform Disparities: Due to deep reliance on OS-level capture APIs, feature parity can diverge between macOS, Windows, and Linux, with Linux requiring complex Wayland/X11 configurations and manual audio loopback setups.

Dependency Complexity: Compiling the project from source requires managing complex native dependencies, including FFmpeg libraries, OpenSSL, and platform-specific SDKs, which can complicate custom deployments.
