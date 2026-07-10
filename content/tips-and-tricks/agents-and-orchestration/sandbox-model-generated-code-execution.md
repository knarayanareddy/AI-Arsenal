---
id: "sandbox-model-generated-code-execution"
title: "Sandbox Model-Generated Code Execution"
category: "security-best-practices"
tags:
  - security
  - tool-use
  - guardrails
difficulty: "advanced"
impact: "high"
time_to_implement: "half a day"
phase: agents-and-orchestration
effort: day
estimated_time: "~half a day"
reversible: true
verification_status: community-reported
verified_by: "community reports (code-interpreter and autonomous-coding-agent security discussions)"
applies_to:
  - agent-tool-use
  - autonomous-coding-agents
  - production-llm-systems
gotchas:
  - "A container is not a security boundary by default -- without dropped capabilities, a read-only root filesystem, and disabled networking, container escape and data exfiltration are both realistic"
  - "Network egress is the most commonly forgotten control -- code that can reach the internet can exfiltrate anything it can read and pull in anything it wants to run, so deny egress by default and allowlist specific hosts"
  - "Resource limits (CPU, memory, wall-clock, output size) are part of the sandbox, not an optimization -- unbounded generated code will eventually hang or OOM the host"
metrics: []
related_tips:
  - validate-tool-arguments-server-side-before-execution
  - require-human-approval-for-irreversible-actions
  - allowlist-tools-per-agent-role
added_date: "2026-07-09"
added_by: maintainer
last_reviewed: "2026-07-09"
enrichment_status: draft
---

## What & Why

If your agent runs code the model generated — a code interpreter, a "run this script" tool, a data-analysis step — execute it in an isolated sandbox with no ambient access to the host, secrets, or network. Model-generated code is attacker-influenceable (via prompt injection in the task, retrieved data, or tool output), so it must be treated like untrusted user-submitted code, not like your own application code.

## Before / After

**Before:** generated code runs in the app process or a plain subprocess: `exec(code)` / `subprocess.run(["python", "-c", code])` — with full access to env vars, the filesystem, and the network.

**After:** generated code runs in a locked-down container/microVM: no host mounts, secrets stripped from the environment, network egress denied by default, non-root user, read-only root FS, and CPU/memory/time/output caps enforced.

## Implementation

Run each execution in a fresh, disposable sandbox (gVisor, a microVM, or a hardened container): dropped Linux capabilities, `--network none` (or an egress allowlist proxy), a non-root user, a read-only root FS with a small writable scratch dir, no secrets in the environment, and hard CPU/memory/time/output limits. Return only captured stdout/stderr/artifacts, and destroy the sandbox after each run so state can't leak between tasks.

## Gotchas

- A container is not a security boundary by default — without dropped capabilities, a read-only root filesystem, and disabled networking, container escape and data exfiltration are both realistic
- Network egress is the most commonly forgotten control — code that can reach the internet can exfiltrate anything it can read and pull in anything it wants to run, so deny egress by default and allowlist specific hosts
- Resource limits (CPU, memory, wall-clock, output size) are part of the sandbox, not an optimization — unbounded generated code will eventually hang or OOM the host

## When NOT to Apply

- If you never execute model-generated code (the model only *emits* code for a human to review and run), this doesn't apply — the review step is the control
- For trusted, fixed, human-written code paths, prefer a validated tool over a general code sandbox — a narrow tool is easier to secure than an arbitrary-code executor

## Verification

Community-reported: sandboxing untrusted code is long-established practice, and applying it to model-generated code is standard code-interpreter/coding-agent security guidance (reflected in how hosted code-execution products isolate runs). Not tied to a specific named incident here, so flagged `enrichment_status: draft`.
