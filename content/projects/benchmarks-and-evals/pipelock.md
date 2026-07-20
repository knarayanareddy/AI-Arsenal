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
org_or_maintainer: luckyPipewrench
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 17
trending_score: 31
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: pipelock
name: Pipelock
artifact_type: platform
category: tooling
subcategory: platforms
description: AI-agent firewall for MCP, A2A, HTTP, and WebSocket egress with exfiltration and SSRF controls
github_url: https://github.com/luckyPipewrench/pipelock
license: Apache-2.0
primary_language: Go
tags:
  - security
  - guardrails
  - agents
  - self-hosted
  - monitoring
  - tool-use
maturity: beta
cost_model: open-source
github_stars: 772
last_commit: '2026-07-20'
docs_url: https://github.com/luckyPipewrench/pipelock
phase: benchmark-and-eval
domain:
  - safety-and-alignment
  - general-purpose
relation_to_stack:
  - deploy-as-is
  - fork-and-adapt
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A mediated-egress security boundary for inspecting agent traffic, blocking exfiltration/SSRF paths, and emitting external action receipts.
best_for:
  - You need policy and audit outside an agent for MCP, A2A, HTTP, or WebSocket egress.
  - You can define destinations, credentials, data-loss rules, and a fail-closed response for the traffic you mediate.
avoid_if:
  - You need a complete sandbox or an application-level authorization system rather than an egress firewall.
  - You cannot route all relevant tool traffic through the mediator or review false-positive handling.
enrichment_notes: Official repository, Apache-2.0 license, Go implementation, and same-day security/egress work were reviewed on 2026-07-11. Detection coverage and operational effectiveness remain draft.
---

## Overview

Pipelock is a Go agent firewall designed to mediate outbound MCP, A2A, HTTP, and WebSocket traffic. Its design places inspection and policy outside the agent process, where it can look for exfiltration, SSRF, prompt-injection-related payloads, and destination violations while emitting action receipts that the agent cannot rewrite.

## Why it's in the Arsenal

Prompt-level guardrails are weak evidence when the agent can call a network tool directly. Pipelock represents a defense-in-depth choice: constrain the egress path and record what happened independently of the model. It should be compared with a sandbox, service mesh, API gateway, and application authorization because each controls a different part of the threat.

## Architecture

The mediator sits between an agent/tool client and external destinations. It parses protocol-specific traffic, applies destination and content policy, checks SSRF and exfiltration conditions, and forwards or denies the request. Action receipts and SIEM forwarding provide an external record. The control is only effective when traffic actually passes through the mediator; direct sockets, unmediated subprocesses, and trusted sidecars remain outside its view. Policy ordering, fail-open behavior, spool limits, TLS, and resolved-IP checks therefore need explicit tests.

## Ecosystem Position

Pipelock is an egress and evidence layer below agent frameworks and MCP servers. It complements process sandboxing and identity/authorization systems, but it does not know whether a tool call is authorized for a particular business user unless that identity is propagated and enforced. The practical comparison is defense-in-depth coverage and failure behavior, not a claim that one firewall detects every prompt injection.

## Getting Started

Place one non-production agent route behind Pipelock and test allowed, denied, internal-IP, redirect, large-payload, and credential-bearing requests. Verify TLS requirements, resolved-IP pinning, action receipt integrity, SIEM backpressure, disk-spool limits, and what happens when the mediator is unavailable. Only then expand the policy to more protocols or sensitive tools.

## Key Use Cases

- Mediating outbound tool traffic for agents that use MCP, A2A, HTTP, or WebSockets.
- Producing security evidence outside the agent process for incident review and policy tuning.

## Strengths

- Treats egress and auditability as controls below the model’s decision layer.
- Apache-2.0 Go project with active work on SSRF, SIEM forwarding, and bounded failure behavior.

## Limitations

- Coverage depends on complete traffic mediation and correct protocol parsing.
- Blocking rules can interrupt legitimate tool calls, while allowing a destination does not prove that the payload is safe.
- It is not a substitute for sandboxing, identity authorization, secret isolation, or human approval.

## Relation to the Arsenal

Pipelock belongs in benchmark-and-eval/security infrastructure because its policy effectiveness must be tested adversarially. Pair it with agent traces, MCP governance, sandboxing, and a documented incident-response path.

## Resources

- [Official source](https://github.com/luckyPipewrench/pipelock)
