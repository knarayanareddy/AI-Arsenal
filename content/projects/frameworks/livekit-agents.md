---
id: livekit-agents
name: "LiveKit Agents"
version_tracked: null
artifact_type: framework
category: voice-audio
subcategory: frameworks
description: "Framework for realtime voice and video AI agents that join a LiveKit room as participants"
github_url: "https://github.com/livekit/agents"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "LiveKit"
tags: [voice, agents, streaming, tool-use]
maturity: production
cost_model: open-source
github_stars: 13979
github_stars_last_30d: 0
trending_score: 60
last_commit: "2026-09-03"
docs_url: "https://github.com/livekit/agents#readme"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [audio, multimodal, language]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "The room-centric realtime agent framework: an agent becomes a participant in a LiveKit room, so voice, video, and screen share arrive through the same WebRTC transport as every human in the call."
best_for:
  - "Your product already runs on LiveKit, or needs voice and video together in one session, and you want the agent to join as an ordinary participant"
  - "You are building multi-party conversational experiences where several humans and an agent share one room and need consistent transport for all of them"
avoid_if:
  - "You want transport independence and expect to swap the media layer later — the room and participant model is coupled to LiveKit's infrastructure by design"
  - "Your workload is audio-only and single-participant, where a lighter pipeline framework carries less operational surface than a WebRTC SFU"
upstream_dependencies: []
downstream_consumers: []
alternatives: [pipecat]
integrates_with: [whisper, openai-swarm]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Stars (13,979), forks (3,681), licence (Apache-2.0), primary language (Python), created 2023-10-19, and last commit (2026-09-03) verified via the GitHub API on 2026-09-03. Maintainer attribution to LiveKit comes from the repository owner and description. Architecture claims derive from the README and repository topics, not hands-on verification."
added_date: "2026-09-03"
last_reviewed: "2026-09-03"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/livekit/agents", "date": "2026-09-03", "description": "13,979 stars on GitHub as of 2026-09-03 (GitHub API), created 2023-10-19"}]
featured: false
status: active
---

## Overview

LiveKit Agents is a Python framework, licensed Apache-2.0, for building realtime voice and video agents on top of LiveKit's WebRTC infrastructure. Its defining abstraction is the participant: an agent joins a room exactly as a human client would, subscribing to audio and video tracks and publishing its own. That choice means the agent inherits the transport, synchronisation, and scaling behaviour of an established media platform instead of managing socket lifecycles itself, and it makes multi-party sessions — several people plus an agent in one room — a natural case rather than an extension. The project has been developed since 2023-10-19 and reached roughly 14,000 stars by 2026-09-03.

## Why it's in the Arsenal

The catalogue covers conversational agents that exchange text and, in a few cases, audio, but it does not otherwise cover the case where an agent is a peer in a live media session. That case has different engineering constraints: track subscription, clock synchronisation between participants, and the need to publish audio at a rate a human listener perceives as continuous. Documenting LiveKit Agents records one coherent answer to those constraints, and it gives a concrete point of comparison for the pipeline-centred alternative, since the two projects solve the same product problem with genuinely different structural bets.

## Architecture

The runtime connects an agent worker to a LiveKit room over WebRTC. Incoming audio tracks are decoded and routed to a speech-to-text stage, the resulting text drives a model call, and the model's output is synthesised and published back into the room as an audio track. Video and screen-share tracks can be subscribed to and fed to a multimodal model. Turn detection and interruption are handled in the worker, cancelling in-flight synthesis when a human starts speaking. Because every participant uses the same protocol, the agent scales and fails the way any other client does, and LiveKit's selective forwarding unit handles fan-out to multiple listeners rather than the application doing it.

## Ecosystem Position

The clearest comparison is [Pipecat](./pipecat.md): both build realtime voice agents over WebRTC, but Pipecat treats transport as one replaceable stage in a processor pipeline while LiveKit Agents treats the room as the unit of composition and couples to LiveKit's infrastructure. That coupling is a feature when you are already on LiveKit or need video, and a constraint when you want to change media providers later. It sits above speech models such as [Whisper](../foundation-models/whisper.md), and it pairs with orchestration frameworks rather than replacing them — an agent worker can host a [LangGraph](./langgraph.md) graph as its reasoning step. It is not an observability layer, so session traces still belong in something like [Langfuse](../benchmarks-and-evals/langfuse.md).

## Getting Started

```bash
pip install livekit-agents
python -m livekit.agents create my-agent
cd my-agent && pip install -r requirements.txt
python main.py dev          # connects a worker to your LiveKit project
```

Room credentials come from a LiveKit project, self-hosted or managed.

## Key Use Cases

1. **Voice agents in an existing LiveKit deployment** — reusing the media infrastructure already running for human calls.
2. **Video-aware assistants** — subscribing to camera or screen-share tracks and reasoning over them alongside speech.
3. **Multi-party sessions** — several humans and one or more agents sharing a room with consistent transport semantics.

## Strengths

- Treating the agent as a participant means fan-out, synchronisation, and reconnection are handled by the media layer rather than reimplemented per application.
- First-class video support covers multimodal sessions that audio-only frameworks cannot reach.
- Apache-2.0 licensing with a self-hostable server keeps both licence and infrastructure decisions open.

## Limitations

- The design is coupled to LiveKit; moving to a different media provider means rewriting the transport boundary rather than swapping a component.
- Running a worker means operating a long-lived connection pool with capacity planning, which is more surface than a stateless API integration.
- Self-hosting the SFU to avoid the managed service shifts substantial operational burden onto the team.

## Relation to the Arsenal

Catalogued in the framework phase because it is a library you build a worker on, though deploying that worker makes it look like a service. For the pipeline-centred alternative see [Pipecat](./pipecat.md); for other build-on-top frameworks, see [Frameworks](./_index.md).

## Resources

- [GitHub](https://github.com/livekit/agents)
- [README](https://github.com/livekit/agents#readme)

---
*GitHub API check by @maintainer on 2026-09-03 — enrichment_status: draft. 13,979 stars, 3,681 forks, Apache-2.0, Python, created 2023-10-19, last commit 2026-09-03.*
