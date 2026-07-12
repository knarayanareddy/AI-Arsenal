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
description: "Research family of multimodal mobile GUI agents that operate Android apps from screenshots using vision-language perception and planning"
github_url: https://github.com/X-PLUG/MobileAgent
license: "MIT"
primary_language: "Python"
tags:
  - "agents"
  - "multimodal"
  - "vision"
  - "planning"
  - "tool-use"
  - "research"
maturity: beta
cost_model: open-source
github_stars: 8926
last_commit: "2026-07-07"
docs_url: https://github.com/X-PLUG/MobileAgent
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
best_for:
  - "You are researching mobile/GUI automation agents and want reference implementations (Mobile-Agent-v1/v2/E) with published methods."
  - "You need a starting point for screenshot-driven Android task automation with vision-language perception and planning."
avoid_if:
  - "You need a production, reliability-guaranteed mobile automation product rather than a research reference."
  - "The target app exposes a stable API or accessibility interface that is more robust than pixel-level control."
enrichment_notes: "Official repository from Alibaba X-PLUG, MIT license, and 2026-07-07 activity were reviewed on 2026-07-12. Results are research-reported and not independently production-verified."
---

## Overview

Mobile-Agent is a family of research agents (v1, v2, and later variants) that operate mobile devices by reading screenshots, planning a sequence of operations, and issuing taps, swipes, and text input. It couples multimodal perception with a planning and reflection loop to complete app-level tasks on Android.

## Why it's in the Arsenal

Mobile GUI control is a distinct, well-studied subproblem of computer-use, and this X-PLUG line of work is a frequently cited reference. It is worth cataloguing for its documented perception-planning-action designs, including multi-agent decomposition and self-reflection introduced across versions.

## Architecture

The agent captures the current screen and uses vision-language models plus detection/OCR to localize interactive elements. A planning module proposes the next operation from the instruction and history; an execution layer maps actions to ADB-style device inputs; and later versions add a decision/reflection agent and memory to recover from errors across long task sequences.

## Ecosystem Position

Mobile-Agent sits alongside desktop computer-use agents (UI-TARS Desktop) and AppAgent-style mobile projects; compared to accessibility-API automation it generalizes across apps but is less reliable than structured interfaces. It is primarily a study-and-reference codebase rather than a deployable product. Weigh its research breadth against the engineering needed for robust operation.

## Getting Started

Clone the version of interest, install its dependencies, and connect an Android device or emulator via ADB. Configure the required model/API access, run a simple in-app task, and observe the perception output and planned actions before attempting multi-step flows.

## Key Use Cases

- Research and benchmarking of mobile GUI agents.
- Prototyping screenshot-driven Android task automation.
- Studying perception-planning-reflection designs across agent versions.

## Strengths

- Well-documented, frequently cited research line with multiple iterations.
- Multimodal perception generalizes across apps without per-app scripting.
- Later versions add reflection and memory for longer tasks.

## Limitations

- Research-grade reliability: misperception and planning errors are common on complex UIs.
- Setup requires device/emulator, ADB, and specific model access; environments drift.
- Executing arbitrary device actions is a safety boundary requiring isolated test devices.

## Relation to the Arsenal

Mobile-Agent complements the desktop computer-use and agent-reliability entries. Treat it as a reference for GUI-grounding research and pair any deployment with sandboxed devices and human oversight.

## Resources

- [Official source](https://github.com/X-PLUG/MobileAgent)
