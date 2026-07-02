---
id: "sandbox-code-execution-tools"
title: "Add Resource and Network Limits to Sandboxed Code Execution Calls"
category: "agent-reliability"
tags:
  - agents
  - tool-use
  - security
difficulty: "advanced"
impact: "high"
time_to_implement: "3-4 hours"
phase: agents-and-orchestration
effort: day
estimated_time: "~4 hours"
reversible: true
verification_status: community-reported
verified_by: "community reports (coding-agent sandboxing practices)"
applies_to:
  - autonomous-coding-agents
  - code-execution-tools
gotchas:
  - "This tip assumes an existing sandboxed execution backend (a container, a restricted subprocess, a managed code-execution API) is already in place -- building sandbox infrastructure from scratch is a multi-day project, not a tip, and belongs in build-examples/ or architectures/"
  - "A time limit without a network limit still lets a compromised or hallucinated script exfiltrate data before it's killed -- both limits are required together, not either alone"
  - "Resource limits that are too generous (unlimited memory, long timeouts) provide false confidence -- size limits to the smallest values your legitimate workloads actually need"
metrics: []
related_tips:
  - validate-tool-arguments-before-execution
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Given an existing sandboxed code/shell/browser execution backend, add explicit CPU time, memory, and network-egress limits to each execution call, rather than relying on the sandbox's default configuration. An agent-generated script — whether from a bug or an adversarial prompt injection — should be unable to consume unbounded resources or reach the network even if the code itself is not malicious, because the sandbox boundary must not depend on the code's intent.

## Before / After

**Before:** `sandbox.execute(code)` with the sandbox's default (often permissive) resource and network configuration.

**After:** `sandbox.execute(code, timeout_s=10, memory_mb=256, network="deny")`, with limits set explicitly per call rather than inherited from a shared default.

## Implementation

Set per-call timeout, memory ceiling, and network policy explicitly at the call site rather than relying on the sandbox provider's defaults; deny network access by default and allowlist specific egress destinations only if a task genuinely requires them (e.g. fetching a package from a known registry).

## Gotchas

- This tip assumes an existing sandboxed execution backend is already in place — building sandbox infrastructure from scratch is a multi-day project, not a tip
- A time limit without a network limit still lets a compromised or hallucinated script exfiltrate data before it is killed — both limits are required together
- Resource limits that are too generous provide false confidence — size limits to the smallest values your legitimate workloads actually need, not a large round number

## When NOT to Apply

- Skip this if you have no code-execution tool at all — there is nothing to add limits to
- Skip customizing limits per call if your sandbox provider already enforces sufficiently strict organization-wide defaults that meet your risk tolerance

## Verification

Community-reported: explicit per-call resource and network limits on sandboxed code execution are a commonly recommended practice in coding-agent security discussions, though this entry has not yet been independently verified against a named production incident or deployment — flagged `enrichment_status: draft` pending stronger evidence.
