---
id: gini-agent
name: gini-agent
version_tracked: null
artifact_type: library
category: agents
subcategory: autonomous
description: "Bun-runtime personal agent whose gateway is the system of record, serving web, CLI, mobile, MCP and messaging clients over one API contract"
github_url: "https://github.com/Open-Curiosity/gini-agent"
license: MIT
primary_language: TypeScript
tags: [agents, routing, stateful, inference]
maturity: alpha
cost_model: open-source
github_stars: 2353
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-07-18"
docs_url: "https://github.com/Open-Curiosity/gini-agent/blob/main/docs/architecture-overview.md"
demo_url: null
phase: agent-system
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Puts durable state, memory, approvals and audit in one runtime process, with inline interactive controls so approvals happen where the work is."
best_for:
  - "You run agents on a machine you do not sit in front of and you want to approve a risky step or hand over a login from your phone rather than walking back to the desktop."
  - "You are handling credentials and do not want them pasted into a chat transcript, because Gini's secure field sends the value straight to the gateway without it reaching the model or the audit trail."
  - "You want an agent that remembers and improves its own skills from task outcomes, with the daily review and a human gate before anything is promoted."
avoid_if:
  - "You need the messaging bridges as a primary surface, because the README states the Telegram and Discord bridges exist to exercise the gateway contract and are not being actively worked on."
  - "You are on Linux and need the service to survive reboots unattended, because autostart is currently macOS-only."
  - "You need a stable release channel, because the project is young, documents an ADRs directory and a roadmap, and last committed in July 2026."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars, license, last commit, primary language, topics and issue count came from the GitHub API. Gateway architecture, ports, disk layout, provider list, control types and install commands are read from the official README and docs index; the runtime was not installed or exercised."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Gini's central design decision is that the runtime is the gateway: a single Bun process per instance owns state and performs work, and every client (a Next.js BFF for the browser UI, the CLI with a bearer token, the Expo mobile app, MCP surfaces and messaging bridges) talks to the same authenticated /api/* contract. That runtime holds conversations, runs, tasks, approvals, traces, audit events, jobs, memories and skills, with approval-gated file, terminal and code tools. Provider support spans Codex OAuth, OpenAI, Azure OpenAI, DeepSeek, OpenRouter, first-party Anthropic, Amazon Bedrock with SigV4 Converse, and any OpenAI-compatible local server, plus local embeddings, reranking and voice-message transcription by default. Its distinguishing UX is inline interactive controls: secure credential cards, choice prompts, sign-in handoff into the agent's own browser, and confirm-before-send.

## Why it's in the Arsenal

The recurring failure in personal agents is that a human-in-the-loop step gets stranded in prose: the model says please log in to your banking site and the session dies until you happen to be at that machine. Gini treats that as the primary product problem and solves it with typed controls rendered over one wire protocol to every client, plus a credential path that never touches the transcript. The cost is a real architecture commitment: a Bun runtime per instance with its own ports and disk layout, and a control protocol you inherit rather than design.

## Architecture

One Bun process per instance runs the agent loop, tools, memory, jobs and state. The Next.js app is a BFF that holds no browser token; the CLI authenticates with a bearer token; the Expo app and MCP surfaces use the same /api/* contract. Instances are isolated: each has its own state, ports and logs under ~/.gini/instances/<id>/, and additional instances get hash-derived ports, with the default instance pinned to 7777. Memory uses local embeddings with reranking, and a separate shared cache under ~/.gini/models/ holds embedding, reranker and speech-to-text weights. Skill learning runs a two-tier reward with attribution, a daily review and a human gate before promotion.

## Ecosystem Position

Gini competes with OpenClaw and gini-agent's own migration target in the personal-harness category, but is distinctive for making the gateway the record of truth and for its typed in-chat controls, which is closer to product design than most agent frameworks attempt. Compared with content/projects/frameworks entries such as LangGraph or CrewAI, it is an application with a runtime you cannot easily embed. It complements content/projects/agent-systems entries such as QwenPaw and CowAgent, which share the multi-channel personal-assistant shape, and it can import an existing openclaw install (plan then apply, with an archive of the original state written first).

## Getting Started

One installer line; on macOS it also enables per-user LaunchAgents for the runtime and webapp, waits for the webapp, and opens the setup page:

```bash
curl -fsSL https://raw.githubusercontent.com/Open-Curiosity/gini-agent/main/scripts/install.sh | bash
gini status   # prints the actual web URL if the browser did not open
```

The web UI lands on http://127.0.0.1:7777 and the runtime on 7778. Use gini update to upgrade.

## Key Use Cases

1. Remote approval of a blocked step: the agent surfaces a sign-in handoff or choice prompt on your phone and resumes when you answer, without you returning to the host machine.
2. Credential provisioning without transcript leakage: the agent requests exactly the secret it is missing through a secure field that goes to the gateway and never into the model input or the audit trail.
3. Multi-instance experimentation: run gini --instance sandbox run alongside your main instance to test a configuration without colliding on ports, state or logs.

## Strengths

- One runtime behind every surface, so web, CLI, mobile, MCP and messaging all see the same conversations, approvals, memory and audit events.
- Secure credential cards keep secrets out of the transcript and the model context, which removes a common failure mode.
- Instances are properly isolated (state, ports, logs), so parallel agents do not collide.
- Local embeddings, reranking and voice transcription by default, avoiding two more hosted dependencies.

## Limitations

Messaging bridges are explicitly deprioritised, so if Telegram is where your team lives this is the wrong tool today. Autostart is macOS-only, and on macOS 26 (Tahoe) launchd sometimes refuses to respawn after a SIGKILL, requiring a manual kick. Projects with a mature Claude Code plugin, MCP client and gateway model will find this architecture opinionated rather than composable. Bun as the runtime is a dependency choice some teams will not accept, and the ecosystem is young: last commit in July 2026, with a roadmap rather than a stable contract. Provider support is broad but shallow, with per-provider setup guides rather than deep integration.

## Relation to the Arsenal

This is the gateway-as-runtime personal agent in content/projects/agent-systems, and the entry to read when the deciding factor is remote human-in-the-loop rather than raw capability. Its memory system sits alongside the agent-memory entries in content/projects/data-and-retrieval, and its approval model is the same problem ECC addresses with hooks and AgentShield in this phase, from a different angle. The local model path connects to content/projects/inference-engines if you run Ollama behind the OpenAI-compatible setting, and the multi-agent shape overlaps with the frameworks phase if you would rather code the runtime yourself.

## Resources

- [GitHub — Open-Curiosity/gini-agent](https://github.com/Open-Curiosity/gini-agent)
- [Architecture overview and gateway docs](https://github.com/Open-Curiosity/gini-agent/tree/main/docs)
- [Migrating from openclaw](https://github.com/Open-Curiosity/gini-agent/blob/main/docs/migration-from-openclaw.md)
