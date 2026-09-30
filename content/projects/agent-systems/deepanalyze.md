---
version_tracked: null
demo_url: null
paper_url: null
paper_id: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
org_or_maintainer: "ruc-datalab"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 0
added_date: "2026-07-19"
last_reviewed: "2026-07-19"
added_by: maintainer
status: active
id: deepanalyze
name: "DeepAnalyze"
artifact_type: model
category: agents
subcategory: autonomous
description: "Agentic LLM research system that runs the full data-science pipeline and writes analyst-grade reports"
github_url: "https://github.com/ruc-datalab/DeepAnalyze"
license: MIT
primary_language: Python
tags: [data, research]
maturity: beta
cost_model: open-source
github_stars: 4661
last_commit: "2026-09-23"
docs_url: "https://ruc-deepanalyze.github.io"
phase: agent-system
domain:
  - "language"
  - "reasoning"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "research-origin"
  - "community-driven"
ecosystem_role:
  - "Open 8B autonomous data-science agent with model, code, data, and UI"
  - "Execution-grounded analyst workflow for mixed structured and unstructured files"
best_for: ["You are a data analyst who wants the whole loop — load, inspect, model, plot, narrate — driven from a natural-language question rather than typed in a notebook cell by cell.", "You work across mixed sources, because the system is documented against structured data in databases, CSV and Excel alongside JSON, XML, YAML and plain-text or Markdown files.", "You want the reasoning trace behind an analysis, because the project ships model, code and training data openly rather than only a chat endpoint."]
avoid_if: ["You need audited, reproducible numbers for a regulatory or financial decision, because an autonomous agent choosing its own analysis steps is the opposite of a controlled pipeline.", "You have a tight time-to-first-answer budget, because this is a research project from Renmin University and Tsinghua with a model download step before anything runs.", "You want a governed tool with a stable API contract, because the outputs are analyst-style reports rather than a service you can call from a pipeline with a schema."]
enrichment_notes: "DeepAnalyze is an academic/research release with a Docker sandbox option, open model, code, and training data; its reports require independent validation. Draft pending review."
---

## Overview

DeepAnalyze is an agentic LLM trained for autonomous data science. Given a question it can move through the entire pipeline: prepare the data, run the analysis, fit a model, produce a visualisation, and write up a report. It is designed for open-ended research over heterogeneous sources — relational databases, CSV and Excel on the structured side, JSON, XML and YAML in the middle, TXT and Markdown on the unstructured side — and it produces analyst-grade reports rather than chat replies. The repository publishes the model, the training data and the code together, from a group at Renmin University of China and Tsinghua, and is distributed under MIT.

## Why it's in the Arsenal

The decision it addresses is how much of an analysis can be delegated to a model without handing it the keys to your warehouse. Traditional notebook work is linear and manual, so every new question restarts the loop; an agentic formulation lets the model plan the steps and choose tools. The trade is reproducibility: because the model selects its own sequence of operations, two runs on the same question can differ, which is fine for exploration and wrong for anything that has to be defended. The team is explicit that it is a research artefact, which is the honest framing.

## Architecture

The system is a language model specialised on data-science trajectories rather than a library of analysis functions with an LLM bolted on. During the run it plans across the pipeline stages, issuing data-loading, analysis, modelling and plotting operations against the connected sources, then composing the findings into a report. Breadth of source support is architectural: structured connectors for databases and spreadsheets sit beside parsers for semi-structured documents and a text path for Markdown and TXT. Because the model, the training data and the code are released together, the same trajectories can be inspected or re-run rather than treated as a black box.

## Ecosystem Position

DeepAnalyze overlaps with the notebook-and-copilot tools in the same territory, but the axis of difference is who picks the next step: Jupyter with an assistant still runs cells the analyst selected, while DeepAnalyze plans the sequence itself. It competes with the general data-agent frameworks — CrewAI and AutoGen configured with pandas and plotting tools — which can do the same job with more control and more assembly. Compared with Kaggle-style solution code, it is less reproducible but far faster to a first draft. It complements rather than replaces the orchestration entries in content/tools/orchestration such as dspy, because that is where you would tune the prompts and evaluation around it.

## Getting Started

The repository is a research release rather than a packaged CLI, so the honest first step is to pull the code and the released model and read the pipeline definition:

```bash
git clone https://github.com/ruc-datalab/DeepAnalyze.git
cd DeepAnalyze
pip install -r requirements.txt
```

The README also links a live demo and a project page, which is the faster way to see the report format before you commit hardware to it.

## Key Use Cases

1. Exploratory analysis on a fresh dataset: point it at a CSV and a question, and get a written narrative with charts rather than an empty notebook.
2. Cross-source research: combine a Postgres schema, an Excel export and a set of Markdown notes in one investigation and let the agent reconcile them.
3. Reproducible-teaching aid: study the released trajectories to see how a data-science plan is decomposed, which is useful when building your own agent harness.

## Strengths

- MIT license with the model, training data and code released together, which is rare for an agentic research system and makes the trajectories inspectable.
- Genuine breadth of input types in one system, from relational databases and spreadsheets through to semi-structured and plain-text documents.
- Produces a report artefact, so the output is shareable rather than a chat transcript you have to convert yourself.

## Limitations

Non-determinism is inherent: the model chooses its own analysis sequence, so a number in the report is not guaranteed to reappear on a second run and there is no seed-level determinism knob. The MIT licence covers the code, not the compute or the model weights' fitness for a production decision, and hardware requirements for a 9B-class model are not spelled out in the excerpt. This is university research output at roughly 4.6k stars, so issue handling, release cadence and API stability should not be assumed. It has no service contract, no auth, and no multi-user story — it is something you run, not something you deploy.

## Relation to the Arsenal

This is an agent-systems phase entry that is really a model-plus-harness hybrid, sitting closer to content/projects/model-layer work than to a general agent framework. Read it beside the other data-and-retrieval entries such as duckdb and polars for the execution substrate it drives, and against the framework entries in content/projects/frameworks such as CrewAI if you are building the same capability with explicit control. Its natural upstream is the ingestion layer — docling, trafilatura — for the unstructured sources it claims to read.

## Resources

- [GitHub — ruc-datalab/DeepAnalyze](https://github.com/ruc-datalab/DeepAnalyze)
- [Project page — ruc-deepanalyze.github.io](https://ruc-deepanalyze.github.io)
- [Tooling and model download links in the README](https://github.com/ruc-datalab/DeepAnalyze)
