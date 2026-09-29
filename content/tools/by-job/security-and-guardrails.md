---
id: "security-and-guardrails"
title: "Security And Guardrails Tools"
entry_type: "guide"
section: "tools"
description: "Curated tools for security and guardrails workflows in AI engineering"
tags:
  - llm
  - data
related_entries: []
added_date: "2026-06-13"
last_reviewed: "2026-06-13"
added_by: "maintainer"
status: "active"
---

## Overview

This guide compares tools for the `security-and-guardrails` job. Use it as a routing page, then open the linked canonical project or tool entry for full details.

## Why It's in the Arsenal

Untrusted input reaches the model at several points, and each entry point needs a different mechanism: input filtering, output filtering, tool-argument validation and access control are not substitutes for one another. Grouping by this job keeps the false-positive cost visible, since a guardrail that blocks legitimate traffic is its own outage.

## Key Features

- Job-focused shortlist
- Links to canonical entries instead of duplicating long-form content
- Scannable TL;DR cards for each tool

## Architecture / How It Works

Choose the job first, then compare tools by cost, open-source status, self-hostability, stack, and operational complexity.

## Getting Started

```bash
# Pick one tool from the shortlist and validate it with a small proof of concept.
```

## Tool Shortlist

### Llama Guard — 🔄

> **TL;DR:** Llama Guard is a candidate for `security-and-guardrails` workflows. Full details: [Llama Guard](../evaluation-and-observability/llamaguard.md).

| Field | Value |
|---|---|
| **Cost** | Check linked entry |
| **Open Source** | Check linked entry |
| **Self-hostable** | Check linked entry |
| **Stack** | Check linked entry |

**Strengths:**
- Good fit when its operational model matches your stack
- Worth comparing against adjacent tools before adoption

**Limitations:**
- Pricing, hosting, and integration details change; verify before production

**Get started:** See [Llama Guard](../evaluation-and-observability/llamaguard.md)
**Alternatives:** Guardrails AI, NeMo Guardrails, Rebuff

### Guardrails AI — 🔄

> **TL;DR:** Guardrails AI is a candidate for `security-and-guardrails` workflows. Full details: [Guardrails AI](../evaluation-and-observability/guardrails-ai.md).

| Field | Value |
|---|---|
| **Cost** | Check linked entry |
| **Open Source** | Check linked entry |
| **Self-hostable** | Check linked entry |
| **Stack** | Check linked entry |

**Strengths:**
- Good fit when its operational model matches your stack
- Worth comparing against adjacent tools before adoption

**Limitations:**
- Pricing, hosting, and integration details change; verify before production

**Get started:** See [Guardrails AI](../evaluation-and-observability/guardrails-ai.md)
**Alternatives:** Llama Guard, NeMo Guardrails, Rebuff

### NeMo Guardrails — 🔄

> **TL;DR:** NeMo Guardrails is a candidate for `security-and-guardrails` workflows. Full details: [NeMo Guardrails](../evaluation-and-observability/nemo-guardrails.md).

| Field | Value |
|---|---|
| **Cost** | Check linked entry |
| **Open Source** | Check linked entry |
| **Self-hostable** | Check linked entry |
| **Stack** | Check linked entry |

**Strengths:**
- Good fit when its operational model matches your stack
- Worth comparing against adjacent tools before adoption

**Limitations:**
- Pricing, hosting, and integration details change; verify before production

**Get started:** See [NeMo Guardrails](../evaluation-and-observability/nemo-guardrails.md)
**Alternatives:** Llama Guard, Guardrails AI, Rebuff

### Rebuff — 🔄

> **TL;DR:** Rebuff is a candidate for `security-and-guardrails` workflows. Full details: [Rebuff](../evaluation-and-observability/rebuff.md).

| Field | Value |
|---|---|
| **Cost** | Check linked entry |
| **Open Source** | Check linked entry |
| **Self-hostable** | Check linked entry |
| **Stack** | Check linked entry |

**Strengths:**
- Good fit when its operational model matches your stack
- Worth comparing against adjacent tools before adoption

**Limitations:**
- Pricing, hosting, and integration details change; verify before production

**Get started:** See [Rebuff](../evaluation-and-observability/rebuff.md)
**Alternatives:** Llama Guard, Guardrails AI, NeMo Guardrails


<!-- AUTO-GENERATED MATCHING TOOLS BELOW — do not edit -->
This table is exhaustive for tools tagged with job = security-and-guardrails.

| Tool | Phase | Cost model | Free tier | Self-hostable | Open source | Stack | Verdict |
|---|---|---|---|---|---|---|---|
| [Agent Browser Shield](../data-ingestion/agent-browser-shield.md) | data ingestion | freemium | Yes | No | No | python | watching |
| [Agentic Security](../evaluation-and-observability/agentic-security.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | solid-choice |
| [AGNT.Hub](../orchestration/agnt-hub.md) | orchestration | paid | No | No | No | python | watching |
| [AI Infra Guard](../evaluation-and-observability/ai-infra-guard.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | use-with-caution |
| [Astra Autonomous Pentest](../evaluation-and-observability/astra-autonomous-pentest.md) | evaluation and observability | paid | No | No | No | python | watching |
| [CubeSandbox](../serving-and-deployment/cubesandbox.md) | serving and deployment | open-source | Yes | Yes | Yes | rust | watching |
| [FuzzyAI](../evaluation-and-observability/fuzzyai.md) | evaluation and observability | open-source | Yes | Yes | Yes | polyglot | use-with-caution |
| [garak (NVIDIA)](../evaluation-and-observability/garak.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | recommended |
| [Giskard](../evaluation-and-observability/giskard.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | recommended |
| [Giskard OSS](../evaluation-and-observability/giskard-oss.md) | evaluation and observability | open-source | No | Yes | Yes | python | watching |
| [Guardrails AI](../evaluation-and-observability/guardrails-ai.md) | evaluation and observability | freemium | Yes | Yes | Yes | python | recommended |
| [Inspect Petri](../evaluation-and-observability/inspect-petri.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | watching |
| [Llama Guard](../evaluation-and-observability/llamaguard.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | recommended |
| [LLM Guard](../evaluation-and-observability/llm-guard.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | solid-choice |
| [MCP Context Forge](../serving-and-deployment/mcp-context-forge.md) | serving and deployment | open-source | Yes | Yes | Yes | python | recommended |
| [NeMo Guardrails](../evaluation-and-observability/nemo-guardrails.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | recommended |
| [PyRIT](../evaluation-and-observability/pyrit.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | recommended |
| [Rebuff](../evaluation-and-observability/rebuff.md) | evaluation and observability | open-source | Yes | Yes | Yes | python, typescript | recommended |
| [SkillSpector](../evaluation-and-observability/skillspector.md) | evaluation and observability | open-source | Yes | Yes | Yes | python | watching |
| [ToolHive](../serving-and-deployment/toolhive.md) | serving and deployment | open-source | No | Yes | Yes | go | watching |
<!-- AUTO-GENERATED MATCHING TOOLS ABOVE — do not edit -->

## Use Cases

1. **Scenario**: you need to block specific prompt or output patterns and you need to know whether the mechanism is a classifier, a filter or a model.
2. **Scenario**: your guardrail has false positives on legitimate traffic and you need to understand the precision/recall trade you are making.
3. **Scenario**: you are deciding whether a hosted guardrail service is acceptable given your data sensitivity, or whether you must run it in-process.

## Strengths

- Separates input from output filtering, because a jailbreak and a harmful completion are different problems needing different mechanisms.
- Includes the false-positive cost explicitly, since a guardrail that blocks legitimate traffic is an outage of its own.
- Notes that these are layers over access control rather than substitutes for it.

## Limitations / When NOT to Use

- Guardrails are classifiers, so they have a false-positive rate you are choosing to accept; the question is what that rate costs you, not whether it is zero.
- Input and output filtering catch different things: a jailbreak in the prompt and a harmful completion need different mechanisms.
- None of these substitute for access control and rate limiting at the API boundary, which address a different threat entirely.

## Integration Patterns

- Link a guardrail here from any entry handling untrusted input, including scraping and agent tool-use entries where prompt injection is the live risk.
- When a security-and-observability entry describes redaction, cross-reference it so trace handling and input filtering stay consistent.

## Resources

- [Llama Guard](../evaluation-and-observability/llamaguard.md)
- [Guardrails AI](../evaluation-and-observability/guardrails-ai.md)
- [NeMo Guardrails](../evaluation-and-observability/nemo-guardrails.md)
- [Rebuff](../evaluation-and-observability/rebuff.md)

## Buzz & Reception

This page is maintained as a curated shortlist, not a popularity ranking.

---
*Last reviewed: 2026-06-13 by @maintainer*
