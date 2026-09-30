---
id: deepcode-cli
name: deepcode-cli
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "TypeScript terminal assistant tuned specifically for DeepSeek V4, exposing thinking mode, reasoning effort and agent skills"
github_url: "https://github.com/lessweb/deepcode-cli"
license: MIT
primary_language: TypeScript
tags: [code-gen, llm, agents]
maturity: beta
cost_model: open-source
github_stars: 2256
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://github.com/lessweb/deepcode-cli#readme"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "A deliberately single-model harness whose argument is that tool schemas are not neutral and DeepSeek performs best in a harness shaped for it."
best_for:
  - "You want a DeepSeek-only terminal assistant and you prefer a harness tuned to one model's behaviour over a generic multi-provider wrapper."
  - "You rely on DeepSeek's thinking mode and want explicit reasoning-effort control plus a raw-scroll mode for inspecting the full chain."
  - "You want agent skills that follow both DeepSeek-native and cross-client directory conventions so the same skills work in other tools."
avoid_if:
  - "You need to switch between model vendors mid-task, because the architecture explicitly forgoes generality in favour of one tuned target."
  - "You need the deepest reasoning controls available, because the highest documented reasoningEffort setting is already max."
  - "You need a mature, heavily English-documented project, because the README is primarily Chinese and the surrounding documentation is thinner than for the English-first entries here."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license, last commit, primary language, topics and issue count came from the GitHub API. Install command, settings keys, slash-command table, skill directory precedence and the tuning rationale are read from the official README; the third-party benchmark was not rerun."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Deep Code CLI is a terminal coding assistant published as @vegamo/deepcode-cli and invoked with the deepcode command. It is tuned for deepseek-v4 and exposes the model's thinking mode plus a reasoningEffort control (the example configuration sets thinkingEnabled true with reasoningEffort max). Slash commands include /model for switching model, thinking mode and reasoning effort, /fork to branch a conversation, /raw for a Lite or Raw scrollback view, /undo to restore code and conversation state, and /init to write an AGENTS.md. Skills resolve across four directories in priority order, including the shared .agents/skills/ convention for cross-client interoperability, and a VS Code extension shares the same ~/.deepcode/settings.json.

## Why it's in the Arsenal

The design argument is stated plainly and it is the interesting part: tool schemas are not neutral, because a model inherits the tool-use habits from its own training, so a model that is reliable inside one mainstream harness can become unstable under a different tool shape. Rather than trying to be compatible with everyone, Deep Code shapes the harness around DeepSeek's behaviour. The tradeoff is total provider lock-in, and the evidence offered for the claim is a third-party QR-code benchmark rather than a published benchmark suite.

## Architecture

Configuration lives in ~/.deepcode/settings.json and is shared with the VS Code extension, so terminal and editor share one settings tree; a documented multi-level precedence chain covers layered overrides and environment variables. Skills are scanned across project and user directories in both the native .deepcode/skills layout and the cross-client .agents/skills layout. Model calls go to an OpenAI-compatible base URL, with DeepSeek-specific handling for thinking mode and reasoning effort, and context caching is used to lower cost. Conversation state supports forking, resuming and undoing, with /raw exposing a scrollback view of the raw stream.

## Ecosystem Position

Deep Code competes with the other DeepSeek-tuned terminal agents in content/projects/agent-systems, including dao-code, Whale and DeepSeek-Reasonix, but takes the narrowest position: it does not attempt cost engineering via fork tricks or checkpointing, it simply refuses to generalise. Compared with content/projects/frameworks entries such as LangChain, it is an application rather than a library, and it contrasts with the provider-neutral entries here (Zero, Codewhale) by assuming you will use one model. Its VS Code extension occupies the same ground as the Cline and Roo Code class of editor agents.

## Getting Started

Install globally and run the CLI in any project directory:

```bash
npm install -g @vegamo/deepcode-cli
deepcode
```

Write ~/.deepcode/settings.json with MODEL, BASE_URL and API_KEY, then set thinkingEnabled and reasoningEffort. The VS Code extension installs from the Marketplace and reads the same settings file.

## Key Use Cases

1. DeepSeek-native daily coding: work in a repo with a harness whose tool schema and reasoning controls were shaped for that model's habits.
2. Reasoning inspection: switch to /raw scrollback or adjust reasoningEffort when a task needs more or less deliberation than the default.
3. Portable skills: keep project skills in .agents/skills/ so they work in Deep Code and in other clients that adopt the same convention.

## Strengths

- Genuinely single-model focus, which is unusual and is stated as a deliberate architectural choice rather than an accident.
- Thinking mode and reasoning effort are first-class controls instead of hidden behind a single toggle.
- Skills resolve through the cross-client .agents/skills/ convention, so they are not locked to one tool.
- Shares one settings file with its VS Code extension, so terminal and editor stay in sync.

## Limitations

Single-provider by construction means no fallback when DeepSeek is degraded, rate-limited or geographically unavailable, and the CLI's own README notes mainland availability as a motivation, which is also a constraint. The strongest evidence offered for the tuning claim is one third-party QR-code benchmark rather than a broad evaluation, so the advantage may be workload-specific. The documentation is Chinese-first and thinner in English than the other entries here, which raises onboarding cost for non-Chinese users. A high open-issue count relative to the project size points to responsiveness gaps on bugs.

## Relation to the Arsenal

This is one of three DeepSeek-focused terminal agents in content/projects/agent-systems, and the clearest to read alongside dao-code and Whale: all three bet on DeepSeek-V4 economics, but Deep Code's bet is behavioural tuning rather than cache-hit engineering. Where those two optimise cost, this one optimises reliability for one model's tool-use habits. If you want provider neutrality instead, Zero and Codewhale in the same phase are the comparison points; for embedding an agent in your own application, the frameworks phase is the relevant layer instead.

## Resources

- [GitHub — lessweb/deepcode-cli](https://github.com/lessweb/deepcode-cli)
- [npm package — @vegamo/deepcode-cli](https://www.npmjs.com/package/@vegamo/deepcode-cli)
- [Project site — deepcode.vegamo.cn](https://deepcode.vegamo.cn/)
