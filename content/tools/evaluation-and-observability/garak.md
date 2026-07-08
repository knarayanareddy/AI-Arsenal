---
id: garak
name: "garak"
type: tool
job: [security-and-guardrails, evaluation]
description: "NVIDIA's open-source LLM vulnerability scanner: automated probes for jailbreaks, leakage, injection, and toxicity"
url: "https://garak.ai"
cost_model: open-source
pricing_detail: "Apache-2.0 open source"
tags: [security, evaluation, llm]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: "Open-source software; no imposed usage limits"
self_hostable: true
open_source: true
source_url: "https://github.com/NVIDIA/garak"
docs_url: "https://docs.garak.ai"
github_url: "https://github.com/NVIDIA/garak"
alternatives: [pyrit, promptfoo]
integrates_with: [nemo-guardrails]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience: [production, research]
best_when:
  - "You want an nmap-style scan of a model/endpoint before launch: run the probe library, get a vulnerability report"
  - "Regression-testing safety posture across model upgrades with a repeatable, versioned probe set"
avoid_when:
  - "Application-level red teaming of full agent systems with custom attack goals — PyRIT/promptfoo target that better"
  - "You need compliance-grade guarantees; probe coverage is necessary-not-sufficient evidence"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (8,364), license, and last push (2026-07-07) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The most comprehensive open LLM vulnerability scanner; NVIDIA stewardship keeps the probe library current"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/NVIDIA/garak", "date": "2026-07-08", "description": "8,364 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

An LLM vulnerability scanner in the lineage of nmap/Metasploit: point garak at a model (HF, OpenAI-compatible, REST) and it runs hundreds of probes — jailbreak suites, prompt injection, data leakage, encoding attacks, misinformation — scoring responses with detectors and emitting a report of failure modes with hit rates.

## Why It's in the Arsenal

garak earns a place in the Arsenal because it directly addresses a recurring decision point: you want an nmap-style scan of a model/endpoint before launch: run the probe library, get a vulnerability report. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- Hundreds of maintained probes across attack categories
- Works against local models, APIs, and arbitrary REST endpoints
- Detector-scored reports with per-probe hit rates; adaptive probing

## Architecture / How It Works

Each probe generates adversarial prompts (static corpora or generated variants), a generator adapter sends them to the target, and detectors (classifiers, string rules, judge models) score outputs for policy violations; results aggregate into an evaluation report comparable across runs.

## Getting Started

```bash
pip install garak
garak --model_type openai --model_name gpt-4o-mini --probes promptinject
```

## Use Cases

1. **Scenario**: you want an nmap-style scan of a model/endpoint before launch: run the probe library, get a vulnerability report
2. **Scenario**: regression-testing safety posture across model upgrades with a repeatable, versioned probe set
3. **Scenario where this is NOT the right fit**: application-level red teaming of full agent systems with custom attack goals — PyRIT/promptfoo target that better — evaluate an alternative instead

## Strengths

- You want an nmap-style scan of a model/endpoint before launch: run the probe library, get a vulnerability report
- Regression-testing safety posture across model upgrades with a repeatable, versioned probe set

## Limitations / When NOT to Use

- Application-level red teaming of full agent systems with custom attack goals — PyRIT/promptfoo target that better
- You need compliance-grade guarantees; probe coverage is necessary-not-sufficient evidence

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `pyrit`, `promptfoo` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `garak`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://garak.ai)
- [Documentation](https://docs.garak.ai)
- [GitHub](https://github.com/NVIDIA/garak)

## Buzz & Reception

- 8,364 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
