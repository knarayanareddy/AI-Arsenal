---
id: nod
name: Nod
type: tool
job:
  - Execute autonomous local desktop and web tasks via multi-modal computer use, local-first workflows, and chat interface integrations
description: Open-source personal AI agent desktop application built with Electron and TypeScript that executes multi-step web and system tasks using LLM vision and local c…
url: https://github.com/n8n-io/nod
cost_model: open-source
pricing_detail: Apache-2.0 licensed software. Requires user-provided LLM API credentials (e.g., Anthropic Claude 3.5 Sonnet, OpenAI GPT-4o) or a locally running LLM instance.
tags:
  - agents
  - computer-use
  - browser-automation
  - electron
  - typescript
  - mcp
  - local-first
  - n8n
maturity: alpha
stack:
  - typescript
  - electron
  - node.js
  - playwright
  - anthropic-api
  - mcp
free_tier: True
self_hostable: True
open_source: True
added_date: 2026-11-21
last_reviewed: 2026-11-21
added_by: repo-maintainer
verdict: watching
verdict_rationale: Nod provides a compelling local-first architecture for OS and web automation via multi-modal vision and MCP protocols, backed by the n8n ecosystem. However, as an early alpha, tool execution safety and LLM computer-use reliability require strict human-in-the-loop guardrails.
status: active
phase: orchestration
audience:
  - AI Engineers
  - Automation Engineers
  - Power Users
  - DevOps Engineers
best_when: You need an open-source, privacy-preserving desktop agent that acts locally to complete web interactions, chase invoices, or orchestrate workflows via standard messaging clients like Telegram or WhatsApp.
avoid_when: You require deterministic enterprise RPA with sub-second SLA requirements, zero-human-supervision execution of destructive financial actions, or headless background worker pools running on minimal Linux server instances.
github_url: https://github.com/n8n-io/nod
docs_url: null
---

## Overview

Nod is an open-source, local-first personal AI agent developed by n8n-io. Built using Electron and TypeScript, Nod runs directly on the user's workstation to combine OS-level computer use, browser automation, and multi-modal Model Context Protocol (MCP) tool bindings into a unified task execution agent.

Architecturally, Nod leverages foundation models with strong visual reasoning capabilities (such as Anthropic Claude 3.5 Sonnet or OpenAI GPT-4o) to evaluate screen state, synthesize mouse and keyboard primitives, and drive arbitrary web interfaces. By default, it operates with strict local control: execution runs locally on the host machine, user credentials remain within local storage, and remote interfaces like Telegram or WhatsApp bots interact with the local agent process through secured hooks.

## Why It's in the Arsenal

Unlike cloud-hosted AI autonomous agents that demand uploading auth cookies and session tokens to vendor servers, Nod enforces a local-first security boundary. Browser automation and desktop interaction occur in the user's native environment, mitigating data leak risks for sensitive tasks like managing subscriptions or retrieving financial invoices.

Nod integrates directly into the n8n automation lineage while adopting modern open standards like Model Context Protocol (MCP). This design allows engineers to extend the agent's action capabilities using standard JSON-RPC tool definitions, bridging multi-modal LLM reasoning with existing n8n webhooks and local system execution environments.

## Key Features

Multi-Modal OS & Web Automation: Translates intent into OS-level mouse movements, keystrokes, and web driver DOM actions using LLM vision feedback loops.

Human-in-the-Loop Safeguards: Implements explicit consent primitives ('asks before it acts') to intercept non-deterministic or high-risk tool calls prior to execution.

Extensible Messaging Interfaces: Bridges desktop automation routines to remote chat channels, including Telegram Bot and WhatsApp Bot bindings.

Local-First Cryptographic & Token Storage: Keeps session keys, model parameters, and local file access contained within the desktop application sandbox.

Model Agnostic Configuration: Supports direct integration with Anthropic, OpenAI, and local LLM endpoints (via Ollama or OpenAI-compatible local gateways).

## Trade-offs

High Model Dependency and Token Cost: Operating visual loop feedback systems requires continuous consumption of high-resolution vision tokens, leading to potential latency and high inference costs.

Alpha Stability & Non-Deterministic Execution: Computer-use agents using screen layout inference can fail when UI elements dynamically shift or DOM structures undergo frequent modification.

Resource Footprint: Running an Electron runtime alongside Chromium browser drivers and local IPC event loops requires significant host system memory and CPU budget.
