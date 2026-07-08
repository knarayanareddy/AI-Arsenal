---
id: garak
name: garak (NVIDIA)
type: tool
job: [security-and-guardrails, evaluation]
description: NVIDIA's open LLM vulnerability scanner — nmap for language models, probing deployed systems for jailbreaks, prompt injection, leakage, and toxic generation
url: "https://github.com/NVIDIA/garak"
cost_model: open-source
pricing_detail: Open source (Apache-2.0)
tags: [evaluation, llm, self-hosted]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Fully open source; compute/API costs are your own
self_hostable: true
open_source: true
source_url: "https://github.com/NVIDIA/garak"
docs_url: "https://docs.garak.ai/garak"
github_url: "https://github.com/NVIDIA/garak"
alternatives: [promptfoo, rebuff]
integrates_with: [nemo-guardrails]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience: [production, research]
best_when:
  - You need a pre-deployment security scan of an LLM system — garak fires curated attack probes (jailbreaks, injection, encoding smuggling, data leakage, malware generation) and scores responses with detectors, producing a vulnerability report
  - You want repeatable red-teaming in CI rather than ad-hoc manual jailbreak testing — probes are versioned modules, so scans are comparable across model versions
avoid_when:
  - You need runtime protection — garak is offline assessment; blocking live attacks is a guardrail's job (NeMo Guardrails, Llama Guard) that scanning complements but doesn't replace
  - You need application-logic security review (authz, tool-call abuse in your agent) — garak probes the model interface generically, not your business logic
version_tracked: null
verdict: recommended
verdict_rationale: The most complete open attack-probe library for LLMs, NVIDIA-backed and actively maintained — the standard first move for LLM security assessment, not a runtime defense
status: active
---

## Overview

garak (Generative AI Red-teaming and Assessment Kit) is an open-source LLM vulnerability scanner, self-described as "nmap for LLMs": it runs libraries of attack probes — jailbreak suites (DAN and descendants), prompt injection, encoding-based smuggling, training-data leakage replay, toxicity elicitation, hallucinated-package prompts — against any target (HF models, OpenAI-compatible APIs, REST endpoints, Ollama), scores responses with paired detectors, and emits a report of what got through.

## Why It's in the Arsenal

LLM security guidance is long on advice and short on tooling; garak is the tool: a concrete, runnable answer to "how vulnerable is our deployed model to known attack classes?" Its probe/detector structure operationalizes the OWASP-LLM-style threat lists the catalog's guardrail entries defend against — scan with garak, then configure guardrails for what actually landed.

## Key Features

- Dozens of probe modules spanning jailbreaks, injection, XSS/encoding smuggling, leakage, misinformation, and malware-generation elicitation
- Detector-scored results (string/ML classifiers) with per-probe hit rates and an HTML/JSONL report
- Generator abstraction targets HF, OpenAI-compatible, NIM, Ollama, LiteLLM, and raw REST endpoints
- Extensible: custom probes/detectors as Python modules; buff system mutates probes (paraphrase, encoding) to defeat brittle filters

## Architecture / How It Works

A scan is a matrix: generators (model targets) × probes (attack payload families) × detectors (response classifiers). Each probe sends its payloads N times (sampling matters for stochastic failures), detectors flag harmful/leaky outputs, and the evaluator aggregates hit rates per probe class — making "which attack families does this deployment fail on" a queryable artifact.

## Getting Started

```bash
python -m pip install -U garak
python -m garak --model_type openai --model_name gpt-4o-mini --probes promptinject
python -m garak --model_type huggingface --model_name gpt2 --probes dan.Dan_11_0
```

## Use Cases

1. **Scenario**: pre-launch security gate — scan the exact model+system-prompt combination you'll ship and file the report with the release
2. **Scenario**: comparing jailbreak resistance across candidate models or after a guardrail change, using identical probe suites
3. **Scenario where this is NOT the right fit**: stopping a live prompt-injection attack in production — that's runtime guardrail territory; garak tells you where to point the guardrails

## Strengths

- Breadth and currency of the probe library — community-maintained attack suites beat any internally curated jailbreak list
- Versioned, repeatable methodology turns red-teaming from an art demo into a regression test

## Limitations / When NOT to Use

- Probes cover known attack classes; a clean scan is necessary, not sufficient — novel and application-specific attacks remain your problem
- Full scans are slow and API-expensive (many probes × many generations); scope probe selection deliberately

## Integration Patterns

Link this tool from reference stacks, decision trees, and project entries using its canonical ID `garak` rather than duplicating details.

## Resources

- [GitHub](https://github.com/NVIDIA/garak)
- [Docs](https://docs.garak.ai/garak)

## Buzz & Reception

8.4k GitHub stars (verified via API 2026-07-08); Apache-2.0; NVIDIA-maintained with active development. Widely referenced as the default open LLM security scanner in red-teaming guidance.

---
*Last reviewed: 2026-07-08 by @maintainer*
