---
id: evidently
name: "Evidently"
type: tool
job: [evaluation, monitoring]
description: "Open-source evaluation and monitoring for ML and LLM systems: 100+ metrics from data drift to LLM-as-judge"
url: "https://www.evidentlyai.com"
cost_model: freemium
pricing_detail: "Apache-2.0 library free; Evidently Cloud freemium SaaS"
tags: [evaluation, observability, monitoring]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: "Cloud free tier; OSS library unlimited"
self_hostable: true
open_source: true
source_url: "https://github.com/evidentlyai/evidently"
docs_url: "https://docs.evidentlyai.com/introduction"
github_url: "https://github.com/evidentlyai/evidently"
alternatives: [deepchecks, phoenix, ragas-rag-evaluation]
integrates_with: []
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience: [production]
best_when:
  - "You monitor both classic ML (drift, data quality) and LLM outputs (judges, RAG metrics) and want one framework/report format"
  - "You want evaluation as code — reports and test suites in CI/pipelines, with an optional dashboard on top"
avoid_when:
  - "Pure LLM tracing/debugging is the need — trace-first tools (Langfuse, Phoenix) fit the workflow better"
  - "You want fully managed evals with no code; the library-first design assumes Python fluency"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (7,671), license, and last push (2026-05-02) verified via the GitHub API on 2026-07-08. Feature claims are from official docs; not yet hands-on verified here."
verdict: recommended
verdict_rationale: "The most complete open evaluation framework spanning tabular ML and LLM; report/test-suite abstractions age well in CI"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/evidentlyai/evidently", "date": "2026-07-08", "description": "7,671 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

A veteran open-source ML-observability framework that expanded into LLM evaluation: define Reports and Test Suites over datasets with 100+ built-in metrics — data drift, classification quality, text descriptors, RAG metrics, LLM-as-judge — run them in pipelines or CI, and visualize in notebooks or its dashboard.

## Why It's in the Arsenal

Evidently earns a place in the Arsenal because it directly addresses a recurring decision point: you monitor both classic ML (drift, data quality) and LLM outputs (judges, RAG metrics) and want one framework/report format. It is included as a comparison point against the other tools in its phase, not as an unconditional recommendation — see Strengths / Limitations below before adopting it.

## Key Features

- 100+ metrics: drift, data quality, text descriptors, LLM judges
- Declarative Reports and Test Suites runnable in CI
- Self-hostable dashboard; tracing for LLM apps in the platform version

## Architecture / How It Works

Metrics compute over pandas-friendly datasets (reference vs current for drift); LLM descriptors run per-row evaluators including judge prompts; results serialize as JSON/HTML reports or pass/fail test suites, making evaluation a pipeline artifact rather than a dashboard-only activity.

## Getting Started

```bash
pip install evidently
# Report(metrics=[DataDriftPreset()]).run(reference_data=ref, current_data=cur)
```

## Use Cases

1. **Scenario**: you monitor both classic ML (drift, data quality) and LLM outputs (judges, RAG metrics) and want one framework/report format
2. **Scenario**: you want evaluation as code — reports and test suites in CI/pipelines, with an optional dashboard on top
3. **Scenario where this is NOT the right fit**: pure LLM tracing/debugging is the need — trace-first tools (Langfuse, Phoenix) fit the workflow better — evaluate an alternative instead

## Strengths

- You monitor both classic ML (drift, data quality) and LLM outputs (judges, RAG metrics) and want one framework/report format
- You want evaluation as code — reports and test suites in CI/pipelines, with an optional dashboard on top

## Limitations / When NOT to Use

- Pure LLM tracing/debugging is the need — trace-first tools (Langfuse, Phoenix) fit the workflow better
- You want fully managed evals with no code; the library-first design assumes Python fluency

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `deepchecks`, `phoenix`, `ragas-rag-evaluation` before adopting — they compete for the same job in this phase.
- Link this tool from job guides using its canonical ID `evidently`.
- Record pricing, hosting, and data-retention assumptions before production adoption.

## Resources

- [Official Site](https://www.evidentlyai.com)
- [Documentation](https://docs.evidentlyai.com/introduction)
- [GitHub](https://github.com/evidentlyai/evidently)

## Buzz & Reception

- 7,671 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
