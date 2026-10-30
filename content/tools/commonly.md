---
id: commonly
name: commonly
type: tool
job:
  - Provide a shared pod infrastructure for running, hosting, and collaborating with local and hosted developer agents
description: An open-source, self-hostable team pod environment for hosting and collaborating with autonomous AI agents like Claude Code, OpenClaw, and custom LLM runtimes.
url: https://github.com/Team-Commonly/commonly
cost_model: open-source
pricing_detail: Free Apache-2.0 open-source core; self-hosted infrastructure costs apply based on deployed agent runtimes.
tags:
  - agent-harness
  - multi-agent
  - claude-code
  - orchestration
  - developer-tools
  - self-hosted
maturity: alpha
stack:
  - TypeScript
  - Node.js
  - Docker
  - WebSockets
free_tier: True
self_hostable: True
open_source: True
added_date: 2026-10-30
last_reviewed: 2026-10-30
added_by: repo-maintainer
verdict: watching
verdict_rationale: Commonly addresses the critical operational challenge of collaborative agent state management by providing shared pods for local engines (e.g., Claude Code) and cloud agent runtimes. While early in development, its unified control plane for team-wide agent orchestration is promising.
status: active
phase: orchestration
audience:
  - AI Engineers
  - DevOps Engineers
  - Software Architects
  - Technical Leads
best_when: Teams need a shared, multi-tenant workspace to run, monitor, and interact with autonomous coding agents (such as Claude Code or OpenClaw) without siloing agent contexts on individual engineer laptops.
avoid_when: You only need single-user local CLI coding assistance or require a mature enterprise platform with strict RBAC, SOC2 compliance, and legacy SAML integrations out of the box.
github_url: https://github.com/Team-Commonly/commonly
docs_url: null
---

## Overview

Commonly is an open-source, self-hostable orchestration environment designed to bridge the gap between individual local agent execution (such as Claude Code running in a local terminal) and centralized cloud-hosted developer agents. Built on TypeScript and Node.js, Commonly structures agent execution around the concept of a shared team 'pod'. Each pod serves as an isolated runtime container and workspace context where human developers and automated agents can jointly execute workflows, inspect code modifications, and coordinate complex multi-step developer operations.

Architecturally, Commonly decouples the agent runtime execution layer from the user interface and state transport mechanisms. It wraps CLI tools, autonomous coding harnesses, and model API interfaces into standardized session workers. These workers expose control streams, file system diffs, and stdout/stderr event buses over WebSocket protocols. This abstraction allows team members to trigger hosted agents with one-click deployments or bring their own local CLI agent instances into a shared team channel.

By centralizing agent execution within shared pods, Commonly solves the contextual isolation problem inherent in standalone coding assistants. Agents operating within a pod share explicit workspace states, environment variables, tool definitions, and reflection loops. This allows real-time observation and intervention by human team members, preventing parallel agent executions from drifting out of sync or clobbering remote branch states.

## Why It's in the Arsenal

Commonly provides a unified control plane for heterogeneous agent runtimes. Rather than forcing teams to choose exclusively between purely local CLI tools (like Claude Code) or vendor-locked cloud agents, Commonly treats both execution topologies as first-class citizens within the same workspace.

The platform eliminates 'agent siloing' by preserving conversation telemetry, tool invocations, and workspace mutations in a centralized team repository. This audit trail is critical for engineering organizations that must evaluate guardrail trip rates, track agent-induced code regressions, or inspect reasoning traces across multiple developer sessions.

Its open-source Apache-2.0 license and Docker-native architecture allow strict data-sovereignty compliance. Organizations can deploy Commonly within private VPCs or air-gapped infrastructure, routing agent tool calls through local LLM proxies or enterprise API gateways without leaking source code context to external multi-tenant SaaS platforms.

## Key Features

Team Pod Architecture: Multi-tenant containerized workspaces that aggregate agent processes, environment variables, and git working directories across engineering teams.

One-Click Agent Provisioning: Standardized worker templates to deploy hosted agent runtimes alongside existing local CLI tools like Claude Code and OpenClaw.

Bidirectional Multiplexed Transport: WebSocket-based protocol multiplexing real-time terminal output, structured tool execution events, and active human intervention channels.

Heterogeneous Engine Compatibility: Native abstractions for wrapping local shell-based LLM drivers, OpenAI API endpoints, and custom model orchestration harnesses.

Shared Workspace Telemetry: Centralized logging of agent tool calls, file modifications, and prompt context windows to allow team-wide observability and session replay.

## Trade-offs

Early Maturity Curve: As an active alpha project, core APIs, session schema definitions, and pod configuration formats remain subject to breaking changes between releases.

Operational Overhead: Self-hosting shared pod environments requires managing Docker container lifecycles, resource quotas (CPU/RAM per agent worker), and persistent volume mounts for persistent git trees.

Security Context Boundaries: Executing autonomous coding agents with local shell access in shared team environments presents sandboxing challenges; strict container isolation and user privilege controls must be manually tuned.
