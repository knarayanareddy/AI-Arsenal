---
id: docetl
name: "DocETL"
type: tool
job: [orchestration]
description: "LLM-powered document-processing framework with map/reduce-style operators and an optimizer that rewrites LLM steps for accuracy (UC Berkeley EPIC lab)"
url: "https://www.docetl.org"
cost_model: open-source
pricing_detail: "MIT open source; free (you pay your own LLM provider costs). A hosted playground (DocWrangler) is available"
tags: [data, llm, orchestration]
maturity: alpha
stack: [python]
free_tier: true
free_tier_limits: "Open source and free; LLM inference billed by your provider"
self_hostable: true
open_source: true
source_url: "https://github.com/ucbepic/docetl"
docs_url: "https://ucbepic.github.io/docetl/"
github_url: "https://github.com/ucbepic/docetl"
alternatives: [unstructured, dlt]
integrates_with: [litellm]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [prototype, research]
best_when:
  - "You need to extract/transform/summarize over large document collections where a single prompt won't fit or won't be accurate — DocETL decomposes it into optimized LLM operators"
  - "You want an optimizer to rewrite/decompose LLM steps (e.g. split a complex map, add a gleaning pass) rather than hand-tuning each prompt"
avoid_when:
  - "Your transformation is deterministic and structured — classic ETL (dlt/SQL) is cheaper and more reliable than LLM operators"
  - "You need a hardened, high-SLA production pipeline today; DocETL is research-stage and evolving"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (3,880), MIT license, and last push (2026-06-26) verified via the GitHub API on 2026-07-08. Feature claims from official docs/paper; not hands-on verified here."
verdict: watching
verdict_rationale: "Novel LLM-operator + optimizer approach to unstructured-data ETL from a strong research group; still alpha-stage for production use"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/ucbepic/docetl", "date": "2026-07-08", "description": "3,880 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

DocETL, from UC Berkeley's EPIC lab, is a framework for LLM-powered processing of unstructured documents. You express a pipeline as declarative operators (map, reduce, resolve, filter) whose logic is an LLM prompt, and an agentic optimizer rewrites those operators — decomposing overly complex steps, adding verification/gleaning passes — to improve accuracy on large or messy corpora.

## Why It's in the Arsenal

It earns a place because "run an LLM over a big pile of documents accurately" is an unsolved, common need, and DocETL contributes an optimizer that tunes the pipeline rather than leaving it to manual prompt fiddling. It is a comparison point against traditional ETL and parsing tools in the data-ingestion phase, not an unconditional recommendation — see Strengths / Limitations.

## Key Features

- Declarative LLM operators: map, reduce, resolve, filter, split/gather
- Agentic optimizer that rewrites/decomposes operators for accuracy
- DocWrangler interactive playground for building pipelines
- Model-agnostic via LiteLLM

## Architecture / How It Works

A pipeline is a YAML/Python spec of operators over a document dataset. Each operator's semantics come from an LLM prompt. The optimizer treats accuracy as the objective: it can split a hard map into sub-steps, insert a "gleaning" self-check, or restructure a reduce, searching for a decomposition that yields more reliable outputs than a single monolithic prompt.

## Getting Started

```bash
pip install docetl
# define a pipeline.yaml with map/reduce operators over your docs
# docetl run pipeline.yaml   (optionally docetl build to optimize)
```

## Use Cases

1. **Scenario**: extract structured findings across thousands of documents too large for one prompt
2. **Scenario**: summarize/aggregate themes over a corpus with an accuracy-optimized reduce
3. **Scenario where this is NOT the right fit**: deterministic, schema-known transforms — classic ETL is cheaper and safer

## Strengths

- Decomposes complex document tasks into optimized LLM operators
- Optimizer reduces manual prompt tuning
- Research-grade approach with an interactive builder

## Limitations / When NOT to Use

- Alpha/research-stage; APIs and stability evolving
- LLM operators cost tokens and can err vs deterministic ETL
- Optimization itself consumes model calls/time

- _Enrichment status: draft — best_when/avoid_when above are based on official documentation and public reception; not yet confirmed against hands-on production usage here. Last reviewed: 2026-07-08._

## Integration Patterns

- Compare against `unstructured` and `dlt` before adopting — they overlap on data-ingestion.
- Link this tool from job guides using its canonical ID `docetl`.
- Record cost and reliability assumptions before production adoption.

## Resources

- [Official Site](https://www.docetl.org)
- [Documentation](https://ucbepic.github.io/docetl/)
- [GitHub](https://github.com/ucbepic/docetl)

## Buzz & Reception

- 3,880 stars on GitHub as of 2026-07-08 (verified via the GitHub API).

---
*Last reviewed: 2026-07-08 by @maintainer*
