---
id: pipecat
name: "Pipecat"
version_tracked: null
artifact_type: framework
category: voice-audio
subcategory: frameworks
description: "Frame-pipeline framework for building realtime voice agents and multimodal conversational applications"
github_url: "https://github.com/pipecat-ai/pipecat"
license: "BSD-2-Clause"
primary_language: Python
org_or_maintainer: "Daily"
tags: [voice, streaming, agents, multimodal]
maturity: production
cost_model: open-source
github_stars: 15163
github_stars_last_30d: 0
trending_score: 62
last_commit: "2026-09-03"
docs_url: "https://github.com/pipecat-ai/pipecat#readme"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [audio, multimodal, language]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained, org-backed, community-driven]
ecosystem_role:
  - "The pipeline abstraction for realtime voice: media and inference are modelled as typed frames flowing through composable processors, so transport, speech, and model choices stay independently swappable."
best_for:
  - "You are building a spoken conversational product and need explicit control over interruption handling, turn-taking, and the latency budget between microphone input and speaker output"
  - "You want to assemble a voice agent from separate speech-to-text, model, and text-to-speech providers rather than adopting one vendor's end-to-end realtime API"
avoid_if:
  - "Your product is a single-turn voice command with no conversational state, where a hosted speech API call is simpler than running a pipeline"
  - "You cannot operate a service that holds persistent realtime connections, since per-session latency tuning and backpressure are your responsibility, not a vendor's"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: [whisper, ollama]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Stars (15,163), forks (2,625), licence (BSD-2-Clause), primary language (Python), created 2023-12-27, and last commit (2026-09-03) verified via the GitHub API on 2026-09-03. Maintainer attribution to Daily comes from the repository description. Architecture claims derive from the README and repository topics, not hands-on verification."
added_date: "2026-09-03"
last_reviewed: "2026-09-03"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/pipecat-ai/pipecat", "date": "2026-09-03", "description": "15,163 stars on GitHub as of 2026-09-03 (GitHub API), created 2023-12-27"}]
featured: false
status: active
---

## Overview

Pipecat is a Python framework for realtime voice and multimodal conversational applications, released under the permissive BSD-2-Clause licence and maintained by Daily alongside its community. Its organising idea is that everything moving through a voice session — microphone audio, transcription partials, model tokens, synthesised speech, transport events — is a typed frame, and an application is a directed pipeline of processors that consume and emit those frames. That framing turns latency and interruption handling into pipeline concerns you can inspect and reorder, rather than behaviour locked inside a hosted endpoint. It has been developed since 2023-12-27 and reached roughly 15,200 stars by 2026-09-03.

## Why it's in the Arsenal

Voice is the one modality in this catalogue with almost no framework coverage, and it is also the one where the engineering difficulty is least visible in a demo. Conversational turn-taking, barge-in interruption, and the end-to-end budget between a user finishing a sentence and hearing a reply are all pipeline properties. Pipecat makes those properties explicit and individually replaceable, which gives a reader something to reason about instead of a vendor's latency claim. Cataloguing it also records the alternative to the end-to-end realtime speech APIs: assemble the pipeline yourself and keep each stage swappable.

## Architecture

A session is a graph of frame processors connected in sequence. A transport processor sits at the edge, ingesting and emitting media over WebRTC or another channel; downstream sit speech-to-text, language-model, and text-to-speech processors, each contributing frames of its own type. Because processors communicate through a common frame contract, replacing a transcription provider or a synthesiser means swapping one processor rather than rewriting the session. Interruption is handled inside the pipeline: an inbound audio frame indicating speech cancels pending synthesis and flushes queued output, which is what keeps barge-in feeling immediate. Backpressure and buffering between stages are explicit, so a slow model call degrades a session predictably rather than silently.

## Ecosystem Position

Its direct counterpart is [LiveKit Agents](./livekit-agents.md), which also builds realtime voice on WebRTC but centres the design on a room-and-participant model tied to a specific SFU, whereas Pipecat centres on the processor pipeline and treats transport as one stage among others. It sits above speech models such as [Whisper](../foundation-models/whisper.md) rather than replacing them, and it can drive a local model through [Ollama](../inference-engines/ollama.md) when a hosted API is not acceptable. It is not an agent-orchestration framework: there is no planner or tool graph to compare against [LangGraph](./langgraph.md).

## Getting Started

```bash
pip install pipecat-ai
```

```python
from pipecat.pipeline.pipeline import Pipeline
from pipecat.transports.services.daily import DailyTransport

pipeline = Pipeline([transport.input(), stt, llm, tts, transport.output()])
await pipeline.run()
```

## Key Use Cases

1. **Spoken assistants with barge-in** — users interrupt mid-reply and the pipeline cancels synthesis rather than talking over them.
2. **Provider-mixed voice stacks** — one transcription vendor, another for synthesis, and a model of your choosing behind the same pipeline.
3. **Multimodal conversation** — adding video or image frames alongside audio without changing the session's control flow.

## Strengths

- The frame abstraction makes each stage independently replaceable, which is the property most hosted voice APIs do not offer.
- Interruption and turn-taking are pipeline concerns you can inspect, rather than opaque server-side behaviour.
- BSD-2-Clause is among the most permissive licences in this catalogue, so commercial embedding carries little licence risk.

## Limitations

- Owning the pipeline means owning its latency: buffering, jitter, and provider round-trip time are yours to tune per deployment.
- A session holds a persistent realtime connection per user, so capacity planning looks like a streaming service rather than a request/response API.
- Assembling several third-party speech and model providers multiplies the failure modes you must handle, compared with a single integrated endpoint.

## Relation to the Arsenal

Catalogued in the framework phase because it is a library you build an application on, not a service you deploy. For the alternative realtime design see [LiveKit Agents](./livekit-agents.md); for the speech models commonly wired into it, see [Foundation Models](../foundation-models/_index.md).

## Resources

- [GitHub](https://github.com/pipecat-ai/pipecat)
- [README](https://github.com/pipecat-ai/pipecat#readme)

---
*Recorded from the GitHub API on 2026-09-03 by @maintainer — enrichment_status: draft. 15,163 stars, 2,625 forks, BSD-2-Clause, Python, created 2023-12-27, last commit 2026-09-03.*
