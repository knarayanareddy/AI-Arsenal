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
org_or_maintainer: bytedance
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 202
trending_score: 46
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: ui-tars-desktop
name: UI-TARS Desktop
artifact_type: platform
category: tooling
subcategory: platforms
description: Open-source desktop application and agent stack for computer-use and browser automation driven by vision-language GUI-grounding models
github_url: https://github.com/bytedance/UI-TARS-desktop
license: Apache-2.0
primary_language: TypeScript
tags:
  - agents
  - multimodal
  - vision
  - tool-use
  - planning
  - local
maturity: beta
cost_model: open-source
github_stars: 38136
last_commit: '2026-07-01'
docs_url: https://agent-tars.com
phase: agent-system
domain:
  - language
  - multimodal
relation_to_stack:
  - deploy-as-is
  - fork-and-adapt
health_signals:
  - actively-maintained
  - org-backed
  - community-driven
ecosystem_role:
  - A desktop GUI-agent runtime that pairs a vision-language grounding model with screen capture and input control to operate computer and browser interfaces.
best_for:
  - You are researching or building computer-use/GUI agents that click, type, and navigate real desktop or browser interfaces from screenshots.
  - You want a runnable reference stack around the UI-TARS grounding models rather than assembling capture, action, and planning loops yourself.
avoid_if:
  - You need reliable, unattended production automation; GUI agents remain error-prone and should run with supervision.
  - Your task can be done with a stable API or DOM-level automation, which is more robust than pixel-level GUI control.
enrichment_notes: Official repository, Apache-2.0 license, and 2026-07-01 activity were reviewed on 2026-07-12. Reliability and safety of autonomous computer-use remain draft and require sandboxing.
---

## Overview

UI-TARS Desktop is an application and agent stack for computer-use: it captures the screen, sends observations to a vision-language model that grounds UI elements, and executes the model's predicted mouse and keyboard actions in a perceive-plan-act loop across desktop and browser targets.

## Why it's in the Arsenal

GUI grounding—turning a screenshot plus an instruction into a concrete click coordinate or keystroke—is a distinct capability from text tool-calling. This project is a concrete, org-backed reference for that loop, including the Agent-TARS browser variant and MCP tool integration, which makes it useful for studying computer-use architecture.

## Architecture

The stack combines a screenshot/observation source, a UI-TARS vision-language model that outputs grounded actions (click coordinates, typing, scrolling), and an executor that drives OS or browser input. A planning loop iterates observation and action with history, and MCP servers extend the agent with additional tools. Browser and desktop operators share the grounding model but differ in their action backends.

## Ecosystem Position

UI-TARS Desktop competes with other computer-use agents (OpenAI/Anthropic computer-use, browser-use) and complements DOM-based automation rather than replacing it: pixel grounding generalizes across apps but is less reliable than structured APIs. Compared to closed computer-use offerings, it keeps the runtime and model open. Weigh generality against the higher error rate of vision-driven control.

## Getting Started

Install the desktop app or run the stack locally, configure access to a UI-TARS model endpoint, and grant screen and input permissions in a disposable or non-critical environment. Run a low-stakes task (open an app, fill a field), watch each grounded action, and confirm you can interrupt before attempting multi-step automation.

## Key Use Cases

- Research and benchmarking of GUI-grounding and computer-use agents.
- Automating repetitive desktop/browser tasks that lack stable APIs.
- A reference implementation of the perceive-plan-act loop with MCP tools.

## Strengths

- Open, org-backed stack around capable UI-TARS grounding models.
- Covers both desktop and browser control with shared grounding.
- MCP integration makes the agent extensible with external tools.

## Limitations

- Vision-driven GUI control is error-prone; misgrounded clicks can take unintended, irreversible actions.
- Granting screen and input control is a significant security boundary that demands sandboxing and supervision.
- Latency and cost of per-step vision inference limit long, high-frequency workflows.

## Relation to the Arsenal

UI-TARS Desktop is the computer-use counterpart to the browser-automation and agent-reliability entries in the catalog. Pair it with sandboxed execution and human approval for irreversible actions, as covered in the Arsenal's security tips.

## Resources

- [Official source](https://github.com/bytedance/UI-TARS-desktop)
- [Project site](https://agent-tars.com)
