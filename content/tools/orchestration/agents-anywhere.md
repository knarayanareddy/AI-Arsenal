---
id: agents-anywhere
name: "Agents-Anywhere"
type: tool
job: [orchestration]
description: "Cross-device workbench for driving and monitoring agents on remote machines over ACP"
url: "https://github.com/anywhere-labs/Agents-Anywhere"
cost_model: open-source
pricing_detail: "Open-source repository under its published licence terms; no hosted tier is documented"
tags: [agents, orchestration, tool-use, security, local]
maturity: alpha
stack: [typescript]
free_tier: true
free_tier_limits: "Self-hosted open-source build; you pay only for the machines running it and any model calls"
self_hostable: true
open_source: true
source_url: "https://github.com/anywhere-labs/Agents-Anywhere"
docs_url: null
github_url: "https://github.com/anywhere-labs/Agents-Anywhere"
alternatives: []
integrates_with: []
added_date: "2026-10-18"
last_reviewed: "2026-10-18"
added_by: repo-maintainer
reviewed_by: null
verdict: watching
verdict_rationale: "Addresses a real gap — operating coding agents on machines you are not sitting at — but is alpha, so the transport schema and security model are still moving"
status: active
phase: orchestration
audience: [prototype, research]
best_when:
  - "You want to watch and steer coding-agent sessions running on other boxes from a single surface without SSHing into each one"
  - "You are building on Agent Client Protocol and need a reference implementation of the client and server halves"
avoid_when:
  - "The machines execute untrusted instructions and you need a hardened, audited isolation boundary before anything runs"
  - "You need vendored compliance reporting and an availability commitment from a maintained product team"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Architecture summarised from the repository README; the project is alpha and no security review or production deployment was performed here."
buzz_sources: []
---

## Overview

Agents-Anywhere is an open-source workbench for running agent sessions on machines other than the one you are typing at. It separates where an agent executes from where you observe it: a small runtime sits on each target host, and a client surface subscribes to that runtime over the network to stream terminal output, file diffs and execution events.

That separation is the whole point. Local-first coding agents assume the repository, the toolchain and the developer are on one machine; the moment the interesting machine is a build box, a GPU node or a colleague's workstation, the local-only model breaks and people fall back to SSH plus a terminal multiplexer. This project tries to make the remote case a first-class session.

The transport layer is built around the Agent Client Protocol and a shell-plugin mechanism, with WebSocket and RPC carrying events between client and runtime.

## Why It's in the Arsenal

The Arsenal tracks where agent orchestration actually happens. Most entries assume one process and one filesystem; Agents-Anywhere is catalogued because remote execution is a distinct operational problem with its own failure modes — reconnection, partial output, and the fact that a network boundary sits between the model's intent and the machine that runs it.

It is also an early implementation of Agent Client Protocol from the client side, which makes it useful as a reference for anyone designing against that protocol rather than as a finished tool.

## Key Features

- ACP-based client and server transport with structured event streaming instead of scraped terminal text.
- Device pairing and session bridging across hosts, with authentication on the connection.
- Concurrent session management so several agent tasks can be monitored from one surface.
- Terminal and editor integrations aimed at CLI coding agents, with diff rendering for changes applied on the remote host.
- A plugin shell (`dsh`) for custom runtime hooks, tool verification and sandbox options.

## Architecture / How It Works

A runtime process on the target host owns the agent session and the working directory; clients connect over WebSocket and exchange ACP messages describing session lifecycle, output events and file changes. Because the protocol is structured rather than a byte stream, the client can reconstruct state after a reconnect instead of replaying a log, and multiple clients can attach to the same session.

The plugin layer wraps command execution so hooks can inspect or reject invocations. That is also where the security posture lives: the runtime executes what the agent asks it to execute, so isolation depends on the sandbox the host provides — container, VM or dedicated user — rather than on the workbench itself.

## Getting Started

Start the runtime on the machine that will execute work, pair the client with it, and create a session pointed at the repository you want the agent to operate on. Verify the pairing path and the reconnect behaviour first, on a host you are willing to lose; only then add model credentials and let an agent modify a working tree.

## Use Cases

1. Driving a coding agent on a remote build machine while reviewing diffs from a laptop, without keeping an SSH session open.
2. Running the same task on several heterogeneous hosts — an ARM edge box and an x86 server — and comparing outcomes from one window.
3. Teaching and pairing scenarios where a second person watches an agent session live without gaining shell access.
4. Prototyping ACP client behaviour against a real server implementation before committing to the protocol in a product.

## Strengths

- Structured protocol traffic makes multi-client attachment and post-reconnect state reconstruction possible in a way terminal scraping never is.
- Execution stays on the host that owns the repository and toolchain, so the agent uses the real build environment rather than a copy.
- Plugin hooks give a place to intercept command execution, which is the minimum needed before letting an agent run unattended.
- Small TypeScript surface, so reading the transport end to end is feasible before trusting it with credentials.

## Limitations / When NOT to Use

- Alpha status: message schemas and upstream dependencies change, and there is no compatibility promise across releases.
- Every action crosses a network hop, which adds latency to the tight feedback loop agents depend on and demands reconnection handling for flaky links.
- Security is delegated to the sandbox you configure. A misconfigured node equals remote command execution with whatever privileges the runtime holds.
- No hosted offering or support contract; operating it is your team's responsibility.

## Integration Patterns

Place the runtime inside the isolation boundary you already trust — a container with the repository mounted, or a dedicated build user — and treat the client as a control surface only. Route model credentials to the runtime, never to the client, so a compromised laptop does not expose keys. For auditability, mirror command events into the log pipeline on the executing host; that is the record of what actually ran, independent of what the client displayed.

## Resources

- [GitHub — anywhere-labs/Agents-Anywhere](https://github.com/anywhere-labs/Agents-Anywhere)
- [Agent Client Protocol specification](https://agentclientprotocol.com/)

## Buzz & Reception

Reception data for this entry is limited to repository activity; there is no independent deployment report or security review available, and the project is young enough that its user base is not yet visible in public discussion. Treat the security model as unproven until you have read the runtime code yourself.
