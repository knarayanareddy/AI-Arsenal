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
org_or_maintainer: "bytedance"
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
id: ui-tars-desktop
name: "UI-TARS Desktop"
artifact_type: platform
category: tooling
subcategory: platforms
description: "ByteDance multimodal agent stack shipping an MCP-based CLI and a native GUI agent for desktop control"
github_url: "https://github.com/bytedance/UI-TARS-desktop"
license: Apache-2.0
primary_language: TypeScript
tags: [agents, vision, tool-use]
maturity: beta
cost_model: usage-based
github_stars: 39143
last_commit: "2026-09-24"
docs_url: "https://agent-tars.com"
phase: agent-system
domain:
  - "language"
  - "multimodal"
relation_to_stack:
  - "deploy-as-is"
  - "fork-and-adapt"
health_signals:
  - "actively-maintained"
  - "org-backed"
  - "community-driven"
ecosystem_role:
  - "A desktop GUI-agent runtime that pairs a vision-language grounding model with screen capture and input control to operate computer and browser interfaces."
best_for: ["You need a GUI agent that works on a real desktop rather than only a browser, because the local and remote computer operators are the first-class path alongside the browser operator.", "You want the browser control mode to be a choice rather than a fixed approach, since the hybrid agent can drive by GUI grounding, by DOM, or by mixing the two per step.", "You are wiring MCP tools into an agent kernel, because the README states the kernel is built on MCP and supports mounting MCP servers to reach real-world tools."]
avoid_if: ["You need a stable release with a compatibility promise, because the project is tracked through dated beta and v0.x announcements rather than a semver line.", "You want a text-only, DOM-only automation path, because the whole premise is a vision-language model interpreting screenshots, which is slower and less precise than a selector.", "You cannot run a GUI automation tool with full mouse and keyboard control, because the security posture of granting that to a model is a decision your environment has to permit."]
enrichment_notes: "Official repository, Apache-2.0 license, and 2026-07-01 activity were reviewed on 2026-07-12. Reliability and safety of autonomous computer-use remain draft and require sandboxing."
---

## Overview

TARS is a multimodal agent stack that ships two projects. Agent TARS is the general stack: a CLI and a Web UI that bring GUI agent capability and vision into a terminal, a computer, a browser or a product, with both headful Web UI and headless server execution. UI-TARS Desktop is the native desktop application, driven by the UI-TARS model and the Seed-1.5-VL/1.6 series, shipping local and remote computer operators plus a browser operator. The architecture detail worth knowing is the hybrid browser agent, which can control a browser using visual grounding, the DOM, or a hybrid strategy, and the protocol-driven Event Stream that drives both context engineering and the agent UI. The kernel is built on MCP, and MCP servers can be mounted to connect real tools.

## Why it's in the Arsenal

The decision it addresses is where visual grounding belongs in your stack. Most agent tooling either works purely in a browser via the DOM or is a desktop robot; for anything that has no API - a native settings panel, a proprietary client, a CAD tool - you need a model that can look at a screenshot and decide where to click. Putting that behind an Event Stream protocol means the same grounded decisions can feed a CLI, a web UI, or a product, and MCP means the tools around it are the ones your agent ecosystem already has. The trade is cost and control: a screenshot per step is more tokens and more latency than a DOM query, and the desktop path requires an unusual permission grant.

## Architecture

The kernel is MCP, so tool servers mount into the agent rather than being coded into it, and the Event Stream is the protocol that carries tool results, shell output and multi-file structured display to both the context assembler and the UI - the v0.3.0 CLI notes name the Event Stream Viewer for tracing data flow. Model invocation is provider-configured on the command line, with the README showing Volcengine Doubao vision-thinking models and Anthropic Claude as examples. UI-TARS Desktop wraps the same grounding model in a desktop application with local or remote computer operators and a browser operator, so a remote machine can be driven without the desktop binary being co-located. The v0.3.0 release also added AIO agent Sandbox support as an isolated all-in-one tool execution environment.

## Ecosystem Position

Agent TARS competes with the browser-driving agents in the same set - stagehand and browser-use - but is broader in surface, since it covers the terminal, the desktop and the browser rather than the browser alone. It overlaps with Midscene.js, which the README cross-links as the browser-side counterpart, and differs in that Midscene is a web-automation SDK while this is an agent stack with a kernel. Compared with Open-AutoGLM, which is scoped to phone screens over ADB, TARS targets desktop and browser. It complements rather than replaces the vision models in content/projects/model-layer, and the MCP tooling in content/tools/developer-experience is what you mount for capabilities beyond the screen.

## Getting Started

The CLI installs with npx or globally, and Node 22 or newer is required for the global path:

```bash
npx @agent-tars/cli@latest
```

```bash
npm install @agent-tars/cli@latest -g
agent-tars --provider anthropic --model claude-3-7-sonnet-latest --apiKey your-api-key
```

The desktop application is a separate download with its own quick-start, and the model weights are on Hugging Face and ModelScope.

## Key Use Cases

1. Native desktop automation: configure an application that has no API and let the model read the screen, then issue precise mouse and keyboard control.
2. Hybrid browser work: choose DOM-based control for stable pages and visual grounding for canvas or image-heavy ones, mixing the two per step.
3. Remote operation: drive a machine you are not sitting at through the remote computer or browser operator, with no configuration required per the v0.2.0 notes.

## Strengths

- Covers terminal, desktop and browser in one stack, with a native desktop application rather than browser-only scope.
- Hybrid browser control lets you take the cheaper, more precise DOM path where it exists and fall back to vision where it does not.
- MCP kernel means real tools mount in rather than being reimplemented per surface.
- Apache-2.0, with UI-TARS model weights published on Hugging Face and ModelScope for self-hosting the grounding model.

## Limitations

Release discipline is the weak point: the timeline runs through Agent TARS Beta and CLI v0.3.0 with dated announcements, which means pre-1.0 semantics and a tool surface that can move. A screenshot-per-step loop is materially more expensive in tokens and latency than a DOM-driven automation, and the grounding accuracy is a property of whichever model you configure. The desktop operator needs broad mouse and keyboard permissions on the machine it drives, which is a real security decision for a production workstation. The two products in the repository are versioned independently, so pinning the CLI does not pin the desktop app.

## Relation to the Arsenal

This is an agent-systems phase entry and the multimodal counterpart to stagehand, which does browser work without a vision model. Compare it against the phone-scoped Open-AutoGLM in the same folder, and against the frameworks in content/projects/frameworks if you are assembling a stack rather than adopting a stack. The vision models it depends on live in content/projects/model-layer, the MCP servers it mounts come from content/tools/developer-experience, and the inference path it calls is any provider endpoint such as those served by vLLM in content/projects/inference-engines.

## Resources

- [GitHub - bytedance/UI-TARS-desktop](https://github.com/bytedance/UI-TARS-desktop)
- [Agent TARS docs and site](https://agent-tars.com)
- [UI-TARS paper - arXiv 2501.12326](https://arxiv.org/abs/2501.12326)
