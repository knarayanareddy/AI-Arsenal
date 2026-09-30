---
id: vulnclaw
name: VulnClaw
version_tracked: null
artifact_type: library
category: evaluation
subcategory: evaluation
description: "An autonomous penetration-testing CLI that runs recon, discovery, exploitation, and reporting from natural language with evidence-gated output"
github_url: "https://github.com/Netw0rkNoob/VulnClaw"
license: MIT
primary_language: Python
tags: [security, tool-use, orchestration]
maturity: beta
cost_model: open-source
github_stars: 3460
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-23"
docs_url: "https://unclecheng-li.github.io/vulnclaw.com/"
demo_url: null
phase: benchmark-and-eval
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Refuses to accept a claimed flag unless it appears verbatim in real tool output, blocking the usual hallucinated-success failure."
best_for:
  - "You are running an authorized engagement and want the full recon-to-report chain driven from one natural-language instruction."
  - "You are preparing CTF or lab material and need an agent that shows its evidence rather than asserting a finding."
  - "You are behind a restrictive egress and need a toolchain where fetch and memory MCP servers work locally with no cloud dependency."
avoid_if:
  - "You lack explicit written authorization for the target, since the project carries an authorized-only scope badge and a security statement."
  - "You need deterministic, reproducible results for compliance evidence, since the agent decides its own next step each round."
  - "You want passive reconnaissance only, because the default loop proceeds toward exploitation without a human gate."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 3460, MIT, Python, last commit 2026-09-23, topics, homepage. From README: AgentState.evidence with preview-only context, verbatim anti-hallucination gate, stall guard, four MCP servers, 14 providers, JSONL traffic index, 50 skills via load_skill_reference, PyPI v0.4.0. Success rates unverified."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

VulnClaw's execution model is model-led rather than scripted: given 'pentest http://target', the agent runs four phases - recon with fingerprinting, port scanning, and directory enumeration; discovery probing for injection points, known CVEs, and misconfiguration; exploitation with PoC verification and privilege gain; and report generation producing a structured write-up plus a Python PoC script. The architectural piece worth understanding is AgentState evidence memory. Every tool result is written to AgentState.evidence with the raw body preserved, while the active context injected into the model is a high-signal preview only; evidence_search and evidence_view retrieve the original on demand. That split is what makes long engagements fit in a context window. On top of it sits an anti-hallucination gate - a claimed flag or conclusion is only accepted if it appears character-for-character in real tool output - plus a light correction layer that suppresses repeated reads of the same evidence range and trips a stall guard on consecutive empty turns, without reintroducing a rigid stage planner.

## Why it's in the Arsenal

The recurring decision is whether a penetration test can be driven by a model that decides its own next step, and what stops that from becoming a source of fabricated findings. Offensive agents fail in a specific way: they announce a flag or a compromise that never appeared in any output, and the report inherits it. Building the loop around an evidence store where raw tool bodies are retained outside the model's context, and gating every claim on a verbatim match against that store, turns the agent's self-report from something you trust into something you check. The design bet is that an attacker-quality loop needs adaptive tool selection more than a fixed script, and that the missing ingredient was auditability rather than capability.

## Architecture

The agent loop is OpenAI-compatible tool calling with 14 providers including OpenAI, Anthropic, MiniMax, DeepSeek, Zhipu, Moonshot, Qwen, SiliconFlow, Doubao, Baichuan, StepFun, SenseTime, Yi, and local Ollama. The MCP toolchain has four servers: fetch and memory implemented locally and working out of the box, with chrome-devtools and burp as external MCP servers for browser automation and HTTP replay. fetch is an enhanced request tool returning the full response body with control over method, headers, params, cookies, body, timeout, redirects, and TLS, and TLS verification is disabled by default for CTF targets. Raw traffic evidence is appended to a per-run JSONL index with each request written to evidence/traffic/, readable through traffic_list, traffic_view, traffic_repeat, and traffic_sitemap. Fifty reference skills covering CTF, web, internal network, reverse engineering, and authorized red-team work are exposed only as an index - the model must call load_skill_reference to pull a body on demand rather than having all 50 injected. There is also a 29-operation codec and crypto toolset, a source_extract tool for auto-recovering clean source from HTML-highlighted bodies, a shell_command for local verification like php -r deserialization checks, and a low-coupling plugin runtime with a built-in read-only web plugin.

## Ecosystem Position

VulnClaw competes with Kali Linux tooling driven by hand, with PentestGPT-style LLM research assistants, and with commercial pentest orchestration platforms such as Pentera or XM Cyber, but at the CLI and open-source end. Compared with scripting nmap and nikto directly, the difference is the model choosing tool sequence and adapting after failure, which is also where the variance comes from. Compared with AutoPentest or an LLM agent framework wrapped around subprocess calls, this ships its own evidence architecture and stall guard rather than delegating memory to a general framework's vector store. It overlaps with the other security skill libraries in content/projects/frameworks, but in the opposite direction - those describe procedures while this executes them through a live toolchain. Its plugin runtime resembles the tool registries in content/projects/frameworks and its MCP servers sit in the same family as the connector entries in content/projects/data-and-retrieval. Models are bring-your-own, so content/projects/inference-engines is upstream and not involved.

## Getting Started

Install from PyPI, point it at an OpenAI-compatible endpoint, and describe the target in natural language. Python 3.10+ is required.

```bash
pip install vulnclaw
vulnclaw --target http://target.example.com --instructions "perform an authorized pentest and produce a report"
# switch providers with the built-in provider selector; local Ollama is supported
vulnclaw plugins        # inspect the plugin runtime
```

Targets must be systems you own or have explicit written permission to test.

## Key Use Cases

1. Drive a full engagement: give one natural-language instruction and get recon, discovery, exploitation, and a structured report with a Python PoC.
2. Verify a claimed finding: rely on the evidence gate so a flag or conclusion is only reported if it appears verbatim in real tool output.
3. Replay captured traffic: use traffic_list, traffic_view, and traffic_repeat against the JSONL-indexed raw request log to reproduce or extend a result.

## Strengths

- Evidence gate requires a claimed flag to appear character-for-character in real output, which kills the hallucinated-success failure mode.
- AgentState separates full evidence storage from a preview injected into context, so long engagements fit a bounded window.
- fetch and memory MCP servers ship locally implemented, so the core loop works with no external service.
- Fifty skills exposed as an on-demand index via load_skill_reference instead of fifty bodies injected into every prompt.

## Limitations

Model-led execution is nondeterministic - two runs against the same target can take different paths and reach different depths, which makes it unsuitable as standalone compliance evidence. The anti-hallucination gate is a substring check against tool output, so a conclusion phrased differently than the raw output will be rejected even when correct. No human approval gate sits between discovery and exploitation, so the operator's authorization is the only control on an active attack loop. Scope discipline is on the user: the tool has no built-in allowlist, and running it outside authorization is both illegal and the reason the repository carries a scope badge. Offensive tooling is dual-use by construction, which means every deployment needs the access controls your organization already applies to Kali.

## Relation to the Arsenal

This benchmark-and-eval-phase entry exercises an agent end to end rather than measuring one, but verification is its central idea - the evidence gate is a correctness check on model output. Its agent loop and plugin runtime follow patterns from content/projects/frameworks, its MCP toolchain belongs to the same integration family as the connector servers in content/projects/data-and-retrieval, and it hosts no model, so content/projects/inference-engines is purely an upstream provider choice. It shares defensive-briefing ground with the security skill libraries in the same phase, but executes rather than documents.

## Resources

- [Repository](https://github.com/Netw0rkNoob/VulnClaw)
- [Project site](https://unclecheng-li.github.io/vulnclaw.com/)
- [PyPI package](https://pypi.org/project/vulnclaw/)
