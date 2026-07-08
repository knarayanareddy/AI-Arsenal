---
id: llm-guard
name: LLM Guard
type: tool
job: [security-and-guardrails]
description: Open-source security toolkit of input/output scanners for LLM interactions — prompt injection, PII, toxicity, and more
url: "https://protectai.github.io/llm-guard/"
cost_model: open-source
pricing_detail: MIT open source; some scanners run local ML models (compute cost), no SaaS required
tags: [security, guardrails, self-hosted]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Fully open source
self_hostable: true
open_source: true
source_url: "https://github.com/protectai/llm-guard"
docs_url: "https://protectai.github.io/llm-guard/"
github_url: "https://github.com/protectai/llm-guard"
alternatives: [nemo-guardrails, guardrails-ai, rebuff]
integrates_with: [langchain]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: null
phase: evaluation-and-observability
audience: [production]
best_when:
  - You need a self-hosted, composable scanner pipeline (prompt-injection, PII anonymization, toxicity, secrets, ban-topics) in front of and behind an LLM
  - Data-residency rules forbid sending prompts to a third-party moderation API — LLM Guard's scanners run locally
avoid_when:
  - You need dialogue-flow-level policy control (what the bot may talk about, tool-use rules) — that's NeMo Guardrails' territory, not per-message scanning
  - Latency budgets are tight and you enable many ML-based scanners; each adds inference time to every request
version_tracked: null
verdict: solid-choice
verdict_rationale: The most complete open-source scanner toolkit for LLM I/O security, best used with a curated scanner subset rather than everything enabled
status: active
enrichment_status: draft
---

> **TL;DR:** Open-source, self-hostable scanner pipeline for LLM inputs and outputs — prompt injection, PII anonymization, secrets, toxicity, ban-topics. Composable; each scanner costs latency.

## Overview

LLM Guard (Protect AI) is a security toolkit structured as composable input and output scanners: input scanners include prompt-injection detection (transformer-based), PII anonymization, secrets detection, and token limits; output scanners include PII deanonymization control, toxicity, ban-topics, and factual-consistency checks. Scanners run locally as Python components (~3K stars, MIT).

## Why It's in the Arsenal

The Arsenal's security guidance (treat retrieved text as untrusted; run prompt-injection regression tests) needs an enforcement layer, and LLM Guard is the broadest open-source one: a single pipeline abstraction covering the common input/output risks without a SaaS dependency. It slots between the app and the model as a policy checkpoint on both directions of traffic.

## Key Features

- 15+ input scanners and 15+ output scanners, individually composable
- Local ML-based prompt-injection and toxicity detection (no external API)
- PII anonymize-on-input / deanonymize-on-output round-trip
- API deployment mode for polyglot stacks

## Architecture / How It Works

Each scanner takes the prompt (or output), returns a sanitized version plus a validity flag and risk score; scanners chain sequentially into a pipeline. ML-based scanners load Hugging Face models locally at startup, so detection quality and latency are controlled by which scanners you enable.

## Getting Started

```bash
pip install llm-guard
```

## Use Cases

1. **Scenario**: anonymizing PII in user prompts before they reach a third-party model, restoring entities in the response
2. **Scenario**: scanning RAG context and user input for injection patterns before prompt assembly
3. **Scenario where this is NOT the right fit**: conversation-policy enforcement ("never discuss competitors") — use NeMo Guardrails' flow rules instead

## Strengths

- Breadth: one dependency covers injection, PII, secrets, toxicity, and topic bans
- Fully local operation satisfies data-residency and privacy constraints
- Per-scanner risk scores integrate cleanly into tracing and alerting

## Limitations / When NOT to Use

- Every enabled ML scanner adds per-request inference latency — measure with your real scanner set
- Detection is probabilistic: injection scanners reduce, not eliminate, attack surface (layer with least-privilege tool design)
- Maintenance cadence has slowed relative to the fast-moving attack landscape; review scanner model freshness

## Integration Patterns

- Compare against [NeMo Guardrails](./nemo-guardrails.md), [Guardrails AI](./guardrails-ai.md), and [Rebuff](./rebuff.md) before adopting — they cover flow policy, output structure, and injection detection respectively; LLM Guard is the scanner-breadth option.
- Link this tool from job guides using its canonical ID `llm-guard`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Documentation](https://protectai.github.io/llm-guard/)
- [Source](https://github.com/protectai/llm-guard)

## Buzz & Reception

- Included because LLM Guard is the most-referenced open-source scanner toolkit in LLM security comparisons and OWASP-LLM-Top-10 mitigation writeups.

---
*Last reviewed: 2026-07-08 by @maintainer*
