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
org_or_maintainer: "X-PLUG"
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
id: mobileagent
name: "Mobile-Agent"
artifact_type: platform
category: tooling
subcategory: platforms
description: "Alibaba Tongyi Lab's GUI agent family pairing Mobile-Agent orchestration with GUI-Owl vision-language models"
github_url: "https://github.com/X-PLUG/MobileAgent"
license: MIT
primary_language: Python
tags: [multimodal, agents]
maturity: beta
cost_model: open-source
github_stars: 9261
last_commit: "2026-07-07"
docs_url: "https://github.com/X-PLUG/MobileAgent"
phase: agent-system
domain:
  - "language"
  - "multimodal"
relation_to_stack:
  - "study-and-reference"
  - "fork-and-adapt"
health_signals:
  - "research-origin"
  - "actively-maintained"
  - "community-driven"
ecosystem_role:
  - "A research codebase of mobile GUI agents that perceive phone screens, plan multi-step operations, and execute taps and text input to complete app tasks."
best_for: ["You are building Android or cross-platform GUI automation and need a model that emits grounded tap, type and swipe actions rather than API calls into app internals.", "You need to run device control on hardware you choose, since 7B and 32B GUI-Owl checkpoints are published and the smaller sizes fit a single workstation GPU.", "You are comparing GUI grounding against tool-calling APIs and want a model that decides when to act through the screen and when to call a tool instead."]
avoid_if: ["You need an off-the-shelf API product with an SLA, because the hosted paths named in the README are Alibaba Bailian and ModelScope demos rather than a service you contract.", "You need stable Android automation for a production app without human review, because GUI grounding accuracy degrades with unfamiliar layouts.", "You are pinned to a stack that cannot host a 32B or 235B checkpoint, since the flagship sizes assume datacenter hardware."]
enrichment_notes: "Official repository from Alibaba X-PLUG, MIT license, and 2026-07-07 activity were reviewed on 2026-07-12. Results are research-reported and not independently production-verified."
---

## Overview

Mobile-Agent is a family rather than a single system: an orchestration layer from Tongyi Lab, Alibaba Group, and the GUI-Owl model family it drives. The current GUI-Owl-1.5 release is built on Qwen3-VL and comes in 2B, 4B, 8B, 32B and 235B variants in both Instruct and Thinking flavours, with the README claiming state-of-the-art results across more than twenty GUI benchmarks covering desktop, mobile and browser automation, grounding, tool and MCP calling, and long-horizon memory. ToolCUA extends the line into an end-to-end computer-use agent trained for GUI-versus-tool path selection, and Mobile-Agent-v3.5 is exposed through online demos and an API.

## Why it's in the Arsenal

The recurring decision in mobile automation is whether to drive apps through accessibility APIs and app-specific bridges, which are stable but require one integration per app, or through the screen itself, which works everywhere but is noisy. This project takes the second path with a vision-language controller that reads a screenshot and emits an action, so a single model covers apps nobody has written an integration for, at the cost of accuracy that depends on how legible the UI is.

## Architecture

A screenshot of the device becomes the model's visual input; the model emits an action in a normalised action space such as tap, type, swipe or a tool invocation, which an executor applies to the device over ADB or the platform automation bridge. Environment state, including prior observations and the action history, feeds back into the next turn, which is what supports long-horizon tasks. The ToolCUA branch adds a second stage where the model chooses between a GUI action and a tool call, trained through trajectory-aware tool synthesis followed by online agentic RL.

## Ecosystem Position

It sits in the computer-use lane alongside Anthropic's computer-use models and the browser-focused agents in this catalog, but its distinctive axis is mobile and cross-platform GUI rather than web. It overlaps with content/tools/dx-and-tooling entries such as Cline where the same question of GUI-versus-API action selection appears, and it complements content/projects/foundation-models entries such as qwen since GUI-Owl-1.5 is built on a Qwen3-VL backbone. Compared with the browser agents it is not tied to a DOM.

## Getting Started

The documented path is to pull the weights and run the inference script in a Python 3.10+ environment with vLLM serving the checkpoint:

```bash
pip install -U vllm
huggingface-cli download X-PLUG/GUI-Owl-32B
vllm serve X-PLUG/GUI-Owl-32B --trust-remote-code
```

Online demos on ModelScope and Alibaba Bailian need no local hardware; the README also documents Wuying Cloud Phone as a hosted Android environment.

## Key Use Cases

1. Automating an Android app with no accessible automation surface, using screen reading and normalised actions instead of an app-specific bridge.
2. Cross-platform GUI regression checks where the same model handles a desktop app and a browser with one action space.
3. Research on action selection: compare ToolCUA's GUI-versus-tool routing against a pure GUI agent on the same task set.

## Strengths

- Size range from 2B to 235B in both Instruct and Thinking variants lets you trade VRAM against accuracy on real tasks.
- One action space covering desktop, mobile and browser, so no DOM or accessibility bridge is required.
- Checkpoints are published rather than API-only, so you can serve them behind vLLM with your own data-handling rules.
- The GUI-versus-tool routing research in ToolCUA addresses a problem most computer-use agents leave implicit.

## Limitations

GUI grounding is inherently fragile: unfamiliar layouts, small hit targets and visual noise all reduce reliability, and the benchmark claims are self-reported by the project. The largest checkpoints assume datacenter GPUs, so the 32B and 235B variants are not a workstation proposition while the small ones give up accuracy. The repository is a research release train from a lab, last updated in mid-2026, so the code and checkpoint pairings move faster than a production deployment can track. And actions executed on a real device need containment, which this project does not provide.

## Relation to the Arsenal

This belongs in content/projects/foundation-models as a model family plus agent harness, and it is the GUI-agent counterpart to the coding agents in content/tools/dx-and-tooling. Its Qwen3-VL backbone links it to the qwen entries in the same phase, and its grounding claims are the kind you would verify with the benchmark tooling in content/tools/evaluation-and-observability before trusting on your own UI.

## Resources

- [GitHub — X-PLUG/MobileAgent](https://github.com/X-PLUG/MobileAgent)
- [Model collection — GUI-Owl-1.5 on Hugging Face](https://huggingface.co/X-PLUG)
- [ModelScope demo](https://modelscope.cn/studios)
