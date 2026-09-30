---
id: docetl
name: "DocETL"
type: tool
job: [orchestration]
description: "Declarative map-reduce framework where each pipeline step is a natural-language operation with a typed output schema"
url: "https://www.docetl.org"
cost_model: usage-based
pricing_detail: "MIT open source; free (you pay your own LLM provider costs). A hosted playground (DocWrangler) is available"
tags: [data, structured-output, efficiency, agents]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: "Open source and free; LLM inference billed by your provider"
self_hostable: true
open_source: true
source_url: "https://github.com/ucbepic/docetl"
docs_url: "https://docetl.org"
github_url: "https://github.com/ucbepic/docetl"
alternatives: [unstructured, dlt]
integrates_with: [litellm]
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [prototype, research]
best_when: ["You are processing a large collection of documents where each step is an LLM operation - classify this ticket, then summarise each category - and you would otherwise hand-wire the batch calls.", "You need the cost of a pipeline to be a number before you run it, because rate limits are declared as calls-per-minute and tokens-per-minute and the total cost is reported after the run.", "You want the same pipeline in Python and in YAML, since both express typed map and reduce operations over a schema and both are checked in."]
avoid_when: ["You need byte-exact determinism, because the optimiser rewrites prompts and decomposes operations, so the same input can take a different internal path between runs.", "You are processing a small dataset, since the parallelisation, rate-limit bookkeeping and cost tracking are overhead a twenty-row job does not justify.", "You cannot call a hosted LLM, because the documented install sets a provider key and the optimisation story depends on comparing model outputs."]
version_tracked: null
enrichment_status: draft
enrichment_notes: "Star count (3,880), MIT license, and last push (2026-06-26) verified via the GitHub API on 2026-07-08. Feature claims from official docs/paper; not hands-on verified here."
verdict: watching
verdict_rationale: "Novel LLM-operator + optimizer approach to unstructured-data ETL from a strong research group; still alpha-stage for production use"
status: active
buzz_sources: [{"source": "github-trending", "url": "https://github.com/ucbepic/docetl", "date": "2026-07-08", "description": "3,880 stars on GitHub as of 2026-07-08 (GitHub API)"}]
---

## Overview

DocETL processes large collections of structured and unstructured data by letting you write each operation in natural language - pull out every complaint in this ticket - and letting the framework handle the rest. It supplies the operators you need, principally map, reduce and filter, and orchestrates them with work parallelised across your data. On top of that sits an optimiser that rewrites the pipeline to raise accuracy and cut cost: it swaps models, rewrites prompts, decomposes operations, and replaces subtasks with generated code where that is cheaper and more accurate than another LLM call. Output is a table, so the result is queryable in whatever database you already use. There are three interfaces - a Python API recommended for production and notebooks, a YAML declaration for low-code use, and a UI for interactive prompt development.

## Why It's in the Arsenal

The decision it addresses is pipeline economics. A hand-written LLM ETL script has a cost and a quality that you tune by hand, and hand-tuning does not scale across pipelines or across model price changes. Putting the optimisation inside the framework means the same declaration can be re-optimised when a cheaper model improves, and the substitution of code for a model call is a real saving on the sub-operations that never needed a language model. The price is opacity: you declared an operation, not the mechanism that satisfies it, which is exactly what you want at scale and exactly what makes debugging a wrong answer hard.

## Key Features

- The optimiser is the differentiator: model swapping, prompt rewriting, operation decomposition and code substitution are all handled inside the framework.
- Declared rate limits for calls and tokens make the cost and the throughput ceiling explicit before a run.
- Typed output schemas mean the result shape is known at declaration time and the output is a table, not a JSON blob.
- One declaration, three front ends - Python, YAML and the interactive UI - so the same pipeline is usable in a notebook and by a non-programmer.

## Architecture / How It Works

A pipeline is a chain of typed operations over a source. The read operation brings in data; map applies a prompt to one record at a time and returns a declared output schema; reduce groups by a key and applies a prompt over the group; filter drops records. The schema is a first-class object that you can print before the run, so the downstream shape is known in advance rather than inferred from the output. Execution is governed by declared rate limits for LLM calls and for tokens, which is what lets the orchestrator parallelise safely against provider limits instead of serialising defensively. The optimiser sits between the declaration and execution, substituting cheaper models or code for sub-operations, and the cost of the run is accumulated and exposed as a total. The same declaration can be expressed in Python or in YAML, and the interactive UI is a third front end over the same definition.

## Getting Started

Install with a provider key and declare a two-stage pipeline in Python:

```bash
pip install docetl
export OPENAI_API_KEY=your_key
```

```python
import docetl
pipeline = docetl.read_json("tickets.json")
pipeline = pipeline.map(
    prompt="Classify this support ticket: {{ input.text }}",
    output={"schema": {"category": "str", "priority": "str"}},
)
rows = pipeline.collect()
print(f"Cost: ${pipeline.total_cost:.4f}")
```

The install-skill command adds the authoring skill to a coding agent if you would rather have the pipeline written for you.

## Use Cases

1. Document triage: classify a large ticket or feedback corpus, then reduce each category into a summary, with a declared cost ceiling rather than a surprise.
2. Entity extraction at volume: pull a typed field set out of every contract or invoice and land the result as a table you can load into a warehouse.
3. Prompt economics review: run the same declaration against two configurations and compare total cost to see whether a cheaper model holds quality.

## Strengths

DocETL competes with a hand-written async pipeline plus a provider SDK, which is more explicit and more work, and with the batch-inference job runners such as those in AI Sheets, which schedule a script rather than optimise a declaration. It overlaps with dspy in content/tools/orchestration, which optimises prompts and reasoning programs rather than data pipelines, and the two compose - DocETL for the data work, dspy for the reasoning inside a step. Compared with unstructured in content/projects/data-and-retrieval, which parses documents into records, this operates on already-structured records. It complements rather than replaces the vector and table stores downstream, since the output is explicitly a table you query yourself.

## Limitations / When NOT to Use

The optimiser is the tradeoff you are accepting: because it rewrites prompts, decomposes operations and swaps models underneath, a wrong answer is hard to trace to a specific prompt, and reproducibility between runs is weaker than a fixed script. Cost is real and the framework's promise is to reduce it, not eliminate it - a large corpus still means a large number of model calls, and the rate-limit declarations are an upper bound you set rather than a saving. The whole optimisation story depends on being able to compare model outputs, which means hosted inference and a provider key. Being a young project with a September 2026 commit, the API surface in the README may still move between minor versions.

## Integration Patterns

This is a data-ingestion tool and the natural partner of aisheets in the same folder, which is the spreadsheet version of the same batch-enrichment job. Read it against dspy in content/tools/orchestration, which optimises a reasoning program rather than a data pipeline, and against the document parsers in content/projects/data-and-retrieval that produce the records it operates on. The output being a table connects it to duckdb and polars downstream, and the model providers it swaps between are the entries in content/projects/model-layer. If you need to evaluate whether an optimisation helped, the eval tooling in content/projects/benchmark-and-eval is the right next stop.

## Resources

- [GitHub - ucbepic/docetl](https://github.com/ucbepic/docetl)
- [Project site and docs](https://docetl.org)
- [Pipeline authoring skill prompt](https://docetl.org/llms-full.txt)

## Buzz & Reception

The optimiser swaps models, rewrites prompts, decomposes operations and replaces subtasks with plain code, which is the part hand-rolled LLM ETL never has and always needs
