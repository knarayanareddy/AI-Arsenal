---
id: opengui
name: OpenGUI
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: Kotlin backend and Android accessibility client that lets a vision-language agent read and operate real Android app interfaces
github_url: "https://github.com/Core-Mate/OpenGUI"
license: NOASSERTION
primary_language: TypeScript
tags: [edge, agents, guardrails]
maturity: beta
cost_model: freemium
github_stars: 1807
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://github.com/Core-Mate/OpenGUI/blob/main/docs/get-started.md"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Targets the one device surface most agent tooling ignores: real Android apps driven through Accessibility rather than an emulated test harness."
best_for:
  - "You need an agent to operate a real Android app on an authorised device, because OpenGUI reads the live UI hierarchy and acts through Accessibility instead of a test emulator."
  - "You want GUI regression and flow testing on physical hardware, including repetitive game or in-app flows where the account owner permits automation."
  - "You already run DeepSeek Harness or WorkBuddy and you want phone operation added as a plugin rather than as a separate backend stack to deploy."
avoid_if:
  - "You intend to use this in a commercial product, because the licence is BUSL-1.1 with a change date of 2030-04-29, so it is source-available rather than OSI open source until then."
  - "You need unattended parallel operation across many phones, because the source implementation admits one OpenGUI task per DSH session and the managed browser is globally serial."
  - "You have no vision-language model available, because the recommended model order starts with Doubao VLM and each provider needs image input plus tool calling."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, licence as reported by the GitHub API (NOASSERTION, resolved from the repo to BUSL-1.1 with a 2030-04-29 change date), last commit, primary language and topics are API-verified. DSH version support, serialisation limits, model ranking, installer behaviour and system requirements are read from the official README; no Android device run was performed."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

OpenGUI is a full-stack mobile GUI agent: a Kotlin client (core_network, core_accessibility) talks to a backend with standby dispatch and IM-channel modules, while a VLM reads the screen and plans the next action. On the device, GestureService performs the actual touch, scroll and input operations through the Android Accessibility service, and the backend coordinates sessions, dispatch and standby connections. Its preferred distribution is as a plugin: the DeepSeek Harness installer Skill downloads a signed release package, verifies SHA-256, installs the plugin and opens DSH, avoiding a full backend deployment, and there is a separate WorkBuddy MCP plus skill and hooks connector. Model guidance ranks Doubao VLM first, Qwen VLM next, OpenAI vision models third, Grok last, and notes tasks can run up to about twelve hours.

## Why it's in the Arsenal

The gap is that Android app automation is dominated by test frameworks (Espresso, Appium, UiAutomator) which are built for controlled instrumentation rather than open-ended, model-driven operation on a device a user actually owns. OpenGUI's bet is that an accessibility tree plus a vision-language model is enough to plan real actions on a real device, which makes phone automation reachable from a general coding agent. The cost is licence ambiguity and a serialisation model that limits throughput, plus the general fragility of model-driven GUI work.

## Architecture

The Android client reads the accessibility node tree and captures a screenshot; the backend forwards both to a vision-language model, which returns a plan and action; the client executes the action in GestureService over the Accessibility service and reports a structured result. Backend dispatch happens over WebSocket, with a standby gateway for agents waiting for a device and a separate IM-channel dispatch path for chat-fronted runs. The DSH plugin packages this as a single downloadable artifact whose installer verifies the SHA-256 checksum and installs only the plugin, preserving unrelated DSH plugins and settings; a managed runtime is installed under an OpenGUI DSH home unless a PATH runtime matches the selected version exactly.

## Ecosystem Position

Where Appium and UiAutomator are the default Android automation tools, OpenGUI is an agent framework rather than a test SDK: it competes with the phone-use agents from the major model vendors and with general computer-use projects like open-codex-computer-use, but scoped to Android rather than the desktop. It is an alternative to adb shell scripting for exploratory flows, and it complements content/projects/agent-systems entries such as browser-harness by extending the same model-driven idea to a device platform neither covers. Compared with content/projects/frameworks, it supplies device capability rather than orchestration, and the DSH and WorkBuddy connectors place it in the same plugin ecosystem as the terminal agents in this phase.

## Getting Started

The documented short path on macOS is a single prompt into Codex that runs the installer Skill, verifies the checksum and installs the DSH plugin; Node.js 22.19+ or 24+ is required. Manual alternative from a release package:

```bash
git clone https://github.com/Core-Mate/OpenGUI.git
cd OpenGUI
# follow deepseek-harness-plugin/README.md for manual package install on Linux or Windows
```

After install, add a DSH workspace, connect and authorise an Android phone, then send: `@OpenGUI Open Settings and report the Android version`.

## Key Use Cases

1. Authorised UI regression on real hardware: script a flow across a physical phone, catching failures that emulator-only testing misses.
2. Social and lead research with confirmation: gather information through the GUI while keeping human confirmation before publishing, messaging or changing an account.
3. Repetitive in-game or in-app workflows: run a scripted sequence on a device where the account owner and the game's rules permit automation.

## Strengths

- Real device operation through Accessibility rather than an emulator, so it covers apps and states only reachable on hardware.
- Plugin distribution avoids a full backend deployment, with SHA-256 verification and preservation of unrelated DSH state.
- Explicit model guidance ranked by observed reliability rather than leaving you to guess which VLM to buy.
 - Human confirmation is part of the recommended flow for actions with external side effects, not an afterthought.

## Limitations

BUSL-1.1 is the headline constraint: with a change date of 2030-04-29 it is source-available, so production use, hosted services and commercial integration all require a separate licence from Core-Mate. Throughput is limited by design: one OpenGUI task per DSH session and a globally serial managed browser, which rules out fleet testing. Model-dependent reliability is the other limit; the README itself flags Grok as experimental for tool use and action reliability. A very high open-issue count on a fast-moving repository and a supported-but-enumerated DSH version list (with one version explicitly unsupported) point to sharp edges in the installer path. Accessibility-driven actions on third-party apps can also break when an app updates its view hierarchy.

## Relation to the Arsenal

This is the mobile-device member of content/projects/agent-systems, and the only entry in the phase targeting Android rather than the browser, the desktop or the terminal. Compare it with browser-harness for web automation and open-codex-computer-use for desktop automation: all three hand a model a perception-and-action surface, and all three inherit the same fragility from model-driven UI operation. For orchestration of the agent that drives it, content/projects/frameworks is the layer above, and the DSH and WorkBuddy connectors tie it into the same plugin model the terminal agents in this phase use. Testing infrastructure for deterministic flows would still come from the Android SDK tooling rather than from here.

## Resources

- [GitHub — Core-Mate/OpenGUI](https://github.com/Core-Mate/OpenGUI)
- [Project site — opengui.ai](https://opengui.ai/)
- [DSH plugin install guide](https://github.com/Core-Mate/OpenGUI/tree/main/deepseek-harness-plugin)
