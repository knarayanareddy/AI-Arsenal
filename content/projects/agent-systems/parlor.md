---
id: parlor
name: parlor
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "Python FastAPI voice stack giving a browser full-duplex-feel conversation with Gemma 4 via llama.cpp, Kokoro TTS and smart-turn detection"
github_url: "https://github.com/fikrikarim/parlor"
license: Apache-2.0
primary_language: Python
tags: [voice, local, multimodal, streaming]
maturity: experimental
cost_model: open-source
github_stars: 2069
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-08-03"
docs_url: "https://github.com/fikrikarim/parlor#readme"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Reproduces the GPT-Live interaction model entirely on-device, including barge-in and mid-thought pause handling, with no frontier API in the loop."
best_for:
  - "You want a voice assistant that never sends audio off your machine, and you have an Apple Silicon machine where the MLX TTS path performs well."
  - "You are building or studying a real-time multimodal stack and you want a reference implementation whose latency benchmarks and architectural trade-offs are published."
  - "You want the action channel separated from speech, because timers and mode switches go through a grammar-forced JSON head instead of riding on the spoken reply."
avoid_if:
  - "You need production reliability, because the project labels itself a research preview and tells you to expect rough edges and bugs."
  - "You are on an older llama.cpp build, because it requires build b9503 or newer (b9512 for the 12b model) as older builds lack Gemma 4 audio or crash loading the mmproj."
  - "You need frontier-quality conversation quality, because the README is candid that a cascade of small models is the fallback while a comparable full-duplex model does not exist locally."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license (Apache-2.0), last commit, primary language, topics and issue count came from the GitHub API. Architecture diagram, module layout, llama.cpp build requirements, model choices, action-head benchmark and mode list are read from the official README; the voice pipeline was not run."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Parlor is a research-grade, fully on-device voice assistant that aims at GPT-Live-like behaviour. Audio and camera frames stream from the browser over WebSocket into a FastAPI server, where four things happen: smart-turn-v3 judges whether you actually finished your thought (roughly 20 ms), Gemma 4 E4B running through llama.cpp as a QAT q4_0 quantisation hears and sees and streams the reply, an action head issues grammar-forced JSON for timers, mode switches and research requests, and Kokoro TTS speaks sentence by sentence (MLX on Mac, ONNX on Linux). Transcript and streamed audio chunks go back to the browser. Optional background research hands a question to a frontier model on any OpenAI-compatible endpoint while the conversation continues.

## Why it's in the Arsenal

The interesting engineering here is the interaction model rather than the model. Voice assistants feel alive because of turn-taking, barge-in and the guarantee that a spoken promise is kept, and those are properties of the pipeline, not of the weights. Parlor's decoupled action head exists precisely because a turn-based model asked to emit control markup inline will occasionally say a control tag out loud or forget a timer; separating the channel fixed both (recall 1.0 versus 0.955 in-band, per its own benchmark). The cost is that this is one person's research preview, and the README is unusually honest about the first attempt (fine-tuning Gemma for full-duplex) failing.

## Architecture

The browser captures mic PCM and camera JPEG frames and pushes them over a WebSocket; browser-side Silero VAD with a ~200 ms silence cutoff handles hands-free detection, and smart-turn-v3 on the server decides whether a turn ended. llama.cpp serves Gemma 4 with the camera frame and speech pushed through its prompt cache while you are still talking, so long questions still start fast. The pipeline streams: a transcript of what was heard first (which measurably improves accuracy), then sentence-by-sentence TTS while generation continues. The action head issues grammar-constrained JSON over the same prompt cache, hidden under TTS playback, so control markup cannot leak into speech. A background reasoner, off unless REASONER_API_KEY is set, handles web research on any OpenAI-compatible endpoint. Server-side modules are split into server, llama, pipeline, actions, reasoner, modes, turn_detector and tts.

## Ecosystem Position

Parlor competes with GPT-Live, Advanced Voice Mode and the open voice stacks built on Pipecat, LiveKit Agents and Daily, and its position is distinctive: it is the one that refuses any cloud dependency in the main path. It overlaps with content/projects/inference-engines entries such as sherpa-onnx and the Whisper family at the VAD and ASR layer, and with TTS entries such as Kokoro or Piper, but it composes them into a turn-taking system those libraries deliberately do not define. Compared with content/projects/agent-systems entries it is not an agent harness at all: there is no tool loop, no memory store, no persistence, which makes it a building block rather than a competitor. The model side points at the foundation-models phase for Gemma itself.

## Getting Started

Python 3.12+ and a recent llama.cpp build are the hard prerequisites:

```bash
brew install llama.cpp   # macOS; needs build b9503+, b9512 for MODEL=12b
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
# start the server and open the browser page it serves
```

Background research stays off unless you set REASONER_API_KEY, in which case it is fully on-device.

## Key Use Cases

1. Private voice assistant: hold a spoken conversation with camera context where no audio or video leaves the machine.
2. Consecutive interpretation: switch to translate mode and get each utterance rendered after a short silence in any language Gemma understands.
3. Turn-taking research: study how VAD, an end-of-turn classifier and sentence-level streaming combine, with published benchmarks for latency, turn accuracy and action recall.

## Strengths

- Fully on-device in the default configuration, including VAD, turn detection, the model and TTS, with the frontier model strictly optional.
 - Decoupled action head guarantees control markup never leaks into speech, which it measures rather than asserts.
- Camera and speech are pushed through the llama.cpp prompt cache while you talk, so latency stays low even on long questions.
- Publishes benchmarks for latency, turn detection, camera attachment and the in-band versus decoupled action question.

## Limitations

This is explicitly a research preview with the author's own caveat about rough edges, and it is one maintainer's project with a very small issue count, so expect no support. It requires a specific recent llama.cpp build; older ones either lack Gemma 4 audio support or crash loading the mmproj. The fine-tuned full-duplex attempt failed, so the architecture remains a cascade of small models, which is exactly where GPT-Live is far ahead, as the README admits. No persistence, no memory, no tool calling: this is a conversation surface, not an agent. Hardware matters enormously, since a MacBook M3 Pro is the stated target and the Kokoro path differs by platform.

## Relation to the Arsenal

This is the voice-and-vision entry in content/projects/agent-systems, but it is the least agent-like item in the phase: there is no tool loop, so it does not compete with the coding agents here. Its real relationships are to content/projects/inference-engines, where Silero VAD, sherpa-onnx and the TTS entries supply the components it composes, and to the foundation-models phase for Gemma 4. Where content/projects/frameworks would give you an agent loop to hang a voice front end on, Parlor gives you the front end and expects you to bring the loop if you want one.

## Resources

- [GitHub — fikrikarim/parlor](https://github.com/fikrikarim/parlor)
- [Benchmark scripts in benchmarks/](https://github.com/fikrikarim/parlor/tree/main/benchmarks)
- [Dependencies — smart-turn-v3 and Silero VAD](https://huggingface.co/pipecat-ai/smart-turn-v3)
