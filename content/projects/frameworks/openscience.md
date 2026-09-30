---
id: openscience
name: openscience
version_tracked: null
artifact_type: library
category: llms
subcategory: frameworks
description: "A local-first research agent with a visible trace, real Python and R kernels, and bundled domain skills across biology and chemistry"
github_url: "https://github.com/synthetic-sciences/openscience"
license: Apache-2.0
primary_language: TypeScript
tags: [agents, research, local, observability]
maturity: beta
cost_model: open-source
github_stars: 3795
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://openscience.sh/docs"
demo_url: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Keeps the entire research session - searches, code, runs, outputs - on your machine and replayable afterwards."
best_for:
  - "You are reproducing a paper's result and need every generated file, kernel execution, and data source recorded in one trace."
  - "You are analysing sensitive experimental data that cannot leave your workstation or your institution's boundary."
  - "You are drafting a methods section and need the agent to write reproducible code rather than prose you cannot verify."
avoid_if:
  - "You want a hosted research platform, because this runs as a desktop app, browser workspace, or local terminal command."
  - "You need literature access without API keys, since the database connectors assume credentials you supply."
  - "You want autonomous multi-day experimentation, because the lead agent keeps synthesis and the final call for itself."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 3795, Apache-2.0, TypeScript, last commit 2026-09-28, topics, homepage. From README: npm @synsci/openscience, npx synsci, curl installer, keys add and local add and run, Python and R kernels, read/write grants, ChEMBL/UniProt/PubMed/arXiv, Ace paid option. Accuracy unverified."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

OpenScience is packaged as a desktop app for macOS, Windows, and Linux that self-updates, an npm CLI that also serves a browser workspace, and a standalone installer script. You point it at a project folder and describe work in plain language; it plans, gathers evidence, runs code, and returns results you can check. The execution surface is real rather than simulated: shell access, Python and R kernels, notebooks, a filesystem with explicit read and write grants, and remote compute when a laptop is not enough. Read and write grants are the important design detail - the agent asks before touching files. Connectivity is broad and byo-key: hundreds of bundled skills across biology, chemistry, physics, ML, and data engineering, plus connectors to ChEMBL, UniProt, PubMed, and arXiv, with your own API keys, a supported provider sign-in, a local model via Ollama or LM Studio, or a managed pay-as-you-go option called Ace.

## Why it's in the Arsenal

The recurring decision in research automation is how much you trust an agent that writes and runs code against your data. Most tools resolve this by hiding the execution or by running it somewhere you cannot inspect. OpenScience resolves it by making the trace the product: a turn reads as what it thought, what it searched, what it ran, what it wrote, then the answer, and nothing runs that you cannot see afterwards. Grants then make the boundary explicit rather than implicit, so an experiment touching source data is a decision you approved instead of a side effect you discovered.

## Architecture

A lead agent drives the turn, reading a trace that records each reasoning step, tool invocation, search, and file write in order. Tools split into three layers: general execution through shell and the Python and R kernels, domain skills packaged as reusable procedures the agent loads on demand, and database connectors for literature and structure sources. Delegation is bounded - workers handle parallel sub-tasks while the lead retains synthesis - which keeps one coherent record instead of interleaved subagent transcripts. Configuration lives behind a Customize, Models screen or the CLI, where openscience keys add adds a provider and openscience local add registers an Ollama or LM Studio endpoint. The /plan command forces agreement on method before execution, and openscience run executes a single turn for pipeline use.

## Ecosystem Position

OpenScience competes with agentic research tools such as Agent Laboratory, AI Scientist, and closed commercial science copilots, and its differentiator is local-first execution with a replayable trace rather than a hosted notebook environment. Compared with a Jupyter-plus-assistant workflow, it adds planning and delegation but gives up direct notebook control, so researchers who live in notebooks may prefer to keep them. It overlaps with the code-execution harnesses in content/projects/frameworks on the loop and with the document and PDF parsing entries in content/projects/data-and-retrieval on literature ingestion, while adding scientific connectors no general retriever carries. Model choice is byo-key and local, which means the inference decision lives in content/projects/inference-engines and results quality is not evaluated by anything here.

## Getting Started

Install the CLI globally or run it without installing, then point it at a project folder and register a model.

```bash
npm install -g @synsci/openscience
openscience keys add          # your own provider API key
openscience local add         # Ollama, LM Studio, or another local endpoint
openscience ~/research/my-project
```

Or run a single scripted turn with `openscience run "Review the analysis plan in this project"`, and use /plan to agree on the method before it executes.

## Key Use Cases

1. Reproduce a published result: let the agent pull the data, write the analysis, run it in a real kernel, and hand back code plus outputs you can rerun.
2. Audit a data quality pass: have it inspect a CSV for missing values and inconsistent labels while writing results to a separate directory, leaving the original untouched.
3. Draft methods from executed code: because the write-up follows real kernel runs, the described method matches the code that produced the figure.

## Strengths

- Local-first with byo-key and local-model support, so sensitive experimental data never has to leave the workstation.
- Explicit read and write grants make the agent's filesystem boundary a decision rather than an accident.
- Trace-first design where every search, kernel run, and file write is visible after the fact and replayable.
- Real Python and R kernels rather than a simulated tool layer, so results come from execution.

## Limitations

Local-first means you own the environment: kernel dependencies, database credentials, and compute capacity are all yours to configure, and remote compute for heavier work needs separate setup. Agentic research quality is unmeasured here - there is no accuracy benchmark against known literature findings, so claims about scientific reliability are the authors'. Bundled skills across many domains cannot be deep in all of them, and connector coverage depends on third-party APIs that change. The desktop app and self-updater are a heavier commitment than a CLI-only tool, and the paid Ace option introduces a vendor dependency inside an otherwise local workflow.

## Relation to the Arsenal

This framework-phase entry is a domain application built on agent patterns rather than a general framework, so it sits alongside the harnesses in the sibling content/projects/frameworks phase with a narrower audience. Its literature and structure connectors extend what content/projects/data-and-retrieval can reach, its model selection defers to content/projects/inference-engines, and it ships no evaluation harness, so validating its scientific claims needs content/projects/benchmark-and-eval.

## Resources

- [Repository](https://github.com/synthetic-sciences/OpenScience)
- [Documentation](https://openscience.sh/docs)
- [Quickstart](https://openscience.sh/docs/#/openscience/quickstart)
