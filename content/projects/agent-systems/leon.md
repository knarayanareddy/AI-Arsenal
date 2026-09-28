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
org_or_maintainer: "leon-ai"
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
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: leon
name: "Leon"
artifact_type: platform
category: agents
subcategory: autonomous
description: "TypeScript and Python personal assistant with native skills, layered memory and progressive computer use"
github_url: "https://github.com/leon-ai/leon"
license: MIT
primary_language: TypeScript
tags: [agents, local, tool-use]
maturity: alpha
cost_model: open-source
github_stars: 17550
last_commit: "2026-09-26"
docs_url: "https://getleon.ai"
phase: agent-system
domain:
  - "language"
  - "audio"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "actively-maintained"
  - "community-driven"
ecosystem_role:
  - "A self-hosted, privacy-first personal assistant with a modular, extensible skill system and voice interface."
best_for: ["You want a personal assistant that runs on your own hardware and can use a local model provider instead of sending every request to a hosted API.", "You need the same task to behave the same way every time, because controlled mode walks deterministic native skills and actions while agent mode is reserved for open-ended work.", "You are an assistant developer who wants to see the layering written down, since the README points to core/context/ARCHITECTURE.md and core/context/LEON.md as the accurate current references."]
avoid_if: ["You need stable, documented behaviour, because the project is mid-transition: the notice dated 2026-03-29 says 2.0 is a developer preview on the develop branch, new documentation is not ready, and existing docs describe the legacy architecture.", "You want to deploy this today and have someone answer tickets, because the maintainer calls it an actively previewed rebuild rather than a finished assistant.", "You are looking for the 2019-era intent-classification assistant, because the README states outright that Leon is no longer that and is being rebuilt around tools, context, memory and agentic execution."]
enrichment_notes: "Repository, MIT license, and 2026-06-29 activity verified via the GitHub API on 2026-07-12. Capability depends on installed skills and configured models."
---

## Overview

Leon is a personal AI assistant built around four things: tools, context, memory and agentic execution. It replaced the 2019 intent-classification design with a system that picks a mode per task — smart mode chooses for you, controlled mode follows deterministic native skills, agent mode plans step by step. Skills come in two flavours, native skills backed by actions and SKILL.md-style agent skills, and the internals descend a fixed chain: skills, then actions, then tools, then functions, then binaries. Memory is layered into durable preferences, day-to-day context and recent discussion, and there is a compact self-model plus a bounded proactive pulse so the assistant does not flood its own context.

## Why it's in the Arsenal

The engineering problem is repeatability. A personal assistant that re-plans every request is pleasant in a demo and unusable for the ten tasks you actually want automated, so Leon keeps a deterministic path for known work and reserves the model-driven path for genuinely open-ended goals. The second problem is context discipline: an assistant that accumulates everything it has ever been told becomes slower and worse, which is what the layered memory and the deliberately bounded proactive pulse are aimed at. The third is privacy — local model providers are supported so that a device-scoped assistant does not require a cloud account to be useful.

## Architecture

The stack is TypeScript for the shell and services with Python in the picture for model-side work. Requests enter a mode router that decides between the deterministic skill path and the agentic plan path. Downstream, the hierarchy is strictly layered: a skill expands to actions, an action invokes tools, a tool calls functions, and functions may shell out to binaries, so capability is addressed by name rather than improvised. Context is assembled from the environment and progressively loaded, including a computer-use layer that can drive desktop and browser interfaces and verify visual outcomes, with its tool surface withheld from unrelated turns. Memory splits into durable preferences, situational context and conversation recency, alongside a self-model that keeps a bounded self-description.

## Ecosystem Position

Leon overlaps with the open-source personal-assistant projects and with the voice-first stacks, but its distinguishing choice is the deterministic-versus-agentic mode split, which most assistants do not offer. It competes with the hosted assistants users actually talk to daily, where Leon's answer is that the model provider and the data path can both be local. Compared with page-agent, which lives inside a web page and manipulates DOM text, Leon's computer use spans desktop and browser and is described as progressively loaded. It complements rather than replaces the ASR and TTS entries such as faster-whisper and piper-tts that a voice assistant needs underneath, and it is a different layer again from the coding agents in content/projects/agent-systems.

## Getting Started

The 2.0 rebuild lives on the develop branch, so clone that specifically and read the two architecture documents the README nominates before anything else:

```bash
git clone -b develop https://github.com/leon-ai/leon.git
cd leon
npm install
```

core/context/ARCHITECTURE.md and core/context/LEON.md are the accurate current references; the published docs site still describes the legacy architecture, and the master branch holds the more stable pre-agentic version if you want that instead.

## Key Use Cases

1. Local voice assistant: run recognition and synthesis on-device and keep the request path inside your network.
2. Deterministic home automation: put recurring device actions in controlled mode so the same command always produces the same sequence of tool calls.
3. Desktop and browser tasks: use the progressively loaded computer-use layer for operations that have no API, with its tool surface scoped so unrelated turns do not see it.

## Strengths

- MIT licensed and runnable entirely locally, with both local and remote model providers supported.
- A real separation between deterministic skills and agentic planning, which is the right answer to flakiness in a personal assistant.
- Layered memory plus a bounded proactive pulse, addressing context growth rather than ignoring it.
- The skills-actions-tools-functions-binaries chain makes capability addressable by name, which keeps the surface auditable.

## Limitations

This is the sharpest caveat in the batch: the README's own notice dated 2026-03-29 says 2.0 is a developer preview, the new documentation is not ready, and the live docs site describes a legacy architecture. Two incompatible versions coexist across branches, so an install decision is really a branch decision. Computer use across desktop and browser is a broad attack surface to grant an assistant, and the README's framing of withholding the tool surface from unrelated turns is a mitigation, not a guarantee. There is no packaged release contract, no compatibility promise for integrations, and the roadmap is a maintainer blog post rather than a published plan.

## Relation to the Arsenal

This belongs in content/projects/agent-systems as the personal-assistant entry, and its natural companions are the speech entries in content/projects/inference-engines and model-layer such as faster-whisper for recognition and piper-tts or kokoro for synthesis. Contrast it with the browser-driving agents in the same phase — browser-use, stagehand — which are narrower and more reliable because they only touch a browser. If you are choosing a framework instead of a finished assistant, read langgraph or mastra in content/projects/frameworks, which give you the runtime rather than the personality.

## Resources

- [GitHub — leon-ai/leon](https://github.com/leon-ai/leon)
- [Project site — getleon.ai](https://getleon.ai)
- [In-repo architecture reference — core/context/ARCHITECTURE.md](https://github.com/leon-ai/leon/blob/develop/core/context/ARCHITECTURE.md)
