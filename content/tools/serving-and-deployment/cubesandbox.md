---
id: cubesandbox
name: CubeSandbox
type: tool
job: [deployment, security-and-guardrails]
description: Self-hostable, hardware-isolated sandbox service for AI agent code execution with tens-of-milliseconds startup and an E2B-compatible API
url: "https://github.com/TencentCloud/CubeSandbox"
cost_model: open-source
pricing_detail: Free and open source; self-hosted on your own infrastructure
tags: [agents, security, guardrails, self-hosted]
maturity: beta
stack: [rust]
free_tier: true
free_tier_limits: Fully free and self-hostable; no hosted tier documented
self_hostable: true
open_source: true
source_url: "https://github.com/TencentCloud/CubeSandbox"
docs_url: "https://cubesandbox.com"
github_url: "https://github.com/TencentCloud/CubeSandbox"
alternatives: []
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: serving-and-deployment
audience: [production]
best_when:
  - You run agent-generated code at scale and need hardware-level isolation (microVM-class) rather than container isolation — agent code is untrusted by construction, and container escape is a real threat model
  - You want E2B's sandbox workflow but self-hosted — the API is E2B-compatible, so existing E2B-style integrations port with minimal change while data stays on your infrastructure
avoid_when:
  - You execute low-risk snippets occasionally — a subprocess with resource limits or a plain container is far less operational burden than running a sandbox service
  - You need a managed, zero-ops sandbox — this is infrastructure you deploy and operate yourself
version_tracked: null
enrichment_status: draft
enrichment_notes: Star count (8.8k) and last push (2026-07-08) verified via the GitHub API on 2026-07-08; on GitHub daily/weekly trending same day. GitHub reports license NOASSERTION despite the README's Apache-2.0 badge — verify before adopting. CNCF-landscape listed. Latency/isolation claims are the project's own.
verdict: watching
verdict_rationale: Org-backed agent sandbox with a real differentiator (hardware-level isolation plus E2B API compatibility, self-hosted), but young and with license-metadata ambiguity to resolve first
status: active
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/trending?since=daily","date":"2026-07-08","description":"On GitHub daily and weekly trending; 8.8k stars"}
---

> **TL;DR:** Tencent Cloud's open-source sandbox service for AI agent code execution: hardware-level isolation, tens-of-milliseconds startup, high-density concurrency, and an E2B-compatible API — self-hosted. Best when agent-executed code is untrusted at scale and you can't ship it to a managed sandbox vendor. Verify the license file first (GitHub metadata says NOASSERTION despite the Apache-2.0 badge).

## Overview

CubeSandbox is a sandbox service purpose-built for AI agents that execute code: it provisions isolated execution environments with hardware-level (microVM-class) isolation, startup in tens of milliseconds, and high-concurrency, high-density deployment. Its API is E2B-compatible, positioning it as a self-hosted drop-in for the managed sandbox workflow, with a Python SDK on PyPI.

## Why It's in the Arsenal

Code execution is the highest-risk tool you can hand an agent — generated code is untrusted by construction, and the common fallback (containers) shares a kernel with the host. CubeSandbox attacks the actual trade-off in this category: hardware-level isolation normally costs seconds of VM startup, which breaks interactive agent loops; getting microVM-class isolation at tens-of-milliseconds startup is the mechanism that makes strong isolation compatible with agent latency budgets. Self-hostability plus E2B API compatibility also gives teams an exit path from managed sandbox lock-in.

## Key Features

- Hardware-level isolation per sandbox, not shared-kernel containers
- Tens-of-milliseconds sandbox startup; designed for high-concurrency, high-density fleets
- E2B-compatible API — existing E2B-style integrations port with minimal change
- Python SDK (`cubesandbox` on PyPI); listed on the CNCF landscape as an AI-native workload runtime

## Architecture / How It Works

A Rust-based sandbox service: agents (or your orchestration layer) request sandboxes via the API, execute code inside hardware-isolated instances, and tear them down. The fast-startup/high-density design keeps a pool of lightweight VMs cheap enough to give every agent task its own isolated environment rather than reusing shared executors.

## Getting Started

```bash
pip install cubesandbox
# Deployment of the sandbox service itself: see the official docs
# (Resources below) for the current self-hosting guide.
```

## Use Cases

1. **Scenario**: a code-interpreter tool in a production agent product, where every user-triggered execution gets a fresh hardware-isolated sandbox
2. **Scenario**: migrating an E2B-based agent stack in-house for data-residency reasons, reusing the same API integration against self-hosted CubeSandbox

## Strengths

- Resolves the isolation-vs-latency trade-off that defines this category, rather than picking one side
- Org-backed (Tencent Cloud), actively developed, CNCF-landscape-listed (8.8k stars as of 2026-07-08)

## Limitations / When NOT to Use

- License ambiguity: GitHub metadata reports NOASSERTION while the README shows an Apache-2.0 badge — resolve before production use
- Young project (~3 months public); operating a sandbox fleet is real infrastructure work compared to a managed vendor

## Integration Patterns

- Wire it in as the execution backend for your agent's code-interpreter tool; keep the agent-facing tool schema unchanged and swap only the executor
- For the threat-model side of agent code execution, see the [security-and-guardrails tools shortlist](../by-job/security-and-guardrails.md)

## Resources

- [GitHub](https://github.com/TencentCloud/CubeSandbox)
- [Documentation](https://cubesandbox.com)

## Buzz & Reception

On GitHub daily and weekly trending with 8.8k stars as of 2026-07-08, roughly three months after creation — part of the 2026 surge of interest in agent execution sandboxes as code-running agents move into production.
