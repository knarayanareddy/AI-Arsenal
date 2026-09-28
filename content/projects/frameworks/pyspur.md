---
id: pyspur
name: pyspur
version_tracked: null
artifact_type: library
category: llms
subcategory: frameworks
description: "A visual playground for agentic workflows with trace capture, evals, RAG tooling, and one-click deployment as an API"
github_url: "https://github.com/PySpur-Dev/pyspur"
license: Apache-2.0
primary_language: TypeScript
tags: [agents, tracing, evaluation]
maturity: beta
cost_model: freemium
github_stars: 5796
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-06-29"
docs_url: "https://docs.pyspur.dev/"
demo_url: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Replaces terminal-based agent debugging with a graph view of each run plus a test-case set you iterate against."
best_for:
  - "You are debugging why an agent took a wrong branch and need to see every node's input and output in one view."
  - "You are building an agent against a fixed test set and need to compare two prompt versions side by side."
  - "You are prototyping in Python and want a visual builder without surrendering the code you will actually ship."
avoid_if:
  - "You have a hard requirement that agent state stay in your own datastore, because the platform persists projects and traces."
  - "You need a self-hosted deployment with no external calls, since the hosted cloud option is the easy path and is a paid dependency."
  - "You are shipping a runtime-critical path, because this is an iteration environment first and a deploy target second."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 5796, Apache-2.0, TypeScript, last commit 2026-06-29, topics. From README: four-step workflow, Python node files, pyspur init and serve --sqlite on 6080, human-in-the-loop, JSON Schema editor, RAG pipeline, integrations, traces, evals, 100+ providers, Python 3.11+. Cloud pricing unverified."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

PySpur is a TypeScript platform with Python nodes. The workflow is four steps: define test cases, build the agent in Python code or through the UI, iterate against those cases, then deploy. The feature set covers the failure modes the README names as prompt hell, workflow blindspots, and terminal testing nightmare - human-in-the-loop workflows that pause for approval, loops with memory for iterative tool calling, file upload and URL ingestion, a JSON Schema editor for structured outputs, a RAG pipeline doing parse, chunk, embed, and upsert into a vector DB, multimodal handling for video, images, audio, text, and code, integrations including Slack, Firecrawl, Google Sheets, and GitHub, automatic trace capture from deployed agents, and evals against real-world datasets. New nodes are a single Python file, which is what keeps the escape hatch open. Vendor support is broad - over a hundred LLM providers, embedders, and vector databases.

## Why it's in the Arsenal

The recurring problem in agent development is that failures are distributed across steps, so you end up reading raw JSON in a terminal and reconstructing what happened. The test-case-first flow answers this directly: build the case you know is hard, then change one thing and see whether the trace still takes the branch you expect. Automatic traces remove the second half of the problem, because the thing you squint at in the terminal becomes a graph you can step through, and evals turn the qualitative version of that into something you can run in CI once a regression set exists.

## Architecture

A Python worker executes nodes written as plain Python files, while the TypeScript app provides the graph editor, test-case runner, trace viewer, and eval harness. Each node returns structured output validated against a JSON Schema you define in the UI, so a malformed step fails at the node boundary rather than three nodes later. Traces are captured automatically from runs - including deployed agents, not only local ones - and stored with the project, which is what makes before-and-after comparison possible. State persistence defaults to SQLite via pyspur serve --sqlite, with a PostgreSQL URL recommended in .env for anything more stable, and deployment publishes the workflow as an API endpoint. Provider access is abstracted so the same workflow can be pointed at different models without a graph edit.

## Ecosystem Position

PySpur competes with LangSmith, Langfuse, Braintrust, and Arize Phoenix for the tracing-and-iteration slot, but positions itself as a builder first rather than an observer of something you built elsewhere. Compared with LangSmith, which is deeply tied to LangChain and LlamaIndex runtimes, this lets you keep plain Python nodes with no framework import. It overlaps with n8n and Flowise as a visual flow editor, though those are integration-first and this is agent-first with code nodes. It complements content/projects/data-and-retrieval by shipping its own vector-DB ingestion rather than deferring to an external store, and it is a plausible authoring front end for the harnesses in content/projects/frameworks, since exported Python can be lifted into another runtime. Its eval and trace surfaces belong to the same category as content/projects/benchmark-and-eval, and provider breadth means model cost decisions still route through content/projects/inference-engines.

## Getting Started

Install, initialize a project, and serve it locally against SQLite. Python 3.11 or newer is required.

```bash
pip install pyspur
pyspur init my-project
cd my-project
pyspur serve --sqlite        # app at http://localhost:6080
```

Put a PostgreSQL URL in .env before you rely on it for more than a prototype, since SQLite is the convenience default.

## Key Use Cases

1. Debug a failing step: open the trace for a run and read each node's actual input and output instead of parsing terminal JSON.
2. Compare prompt versions: run the same test-case set against two graph configurations and diff where the branches diverge.
3. Ship the workflow: deploy the graph as an API endpoint and keep automatic trace capture on the deployed agent.

## Strengths

- Test-case-first iteration turns agent debugging into a repeatable before-and-after rather than terminal archaeology.
- Automatic traces cover deployed agents as well as local runs, so regressions introduced in production stay visible.
- Python nodes are plain files, so nothing is trapped in the visual editor and code can move to another runtime.
- JSON Schema validation at each node boundary localizes malformed output instead of letting it propagate.

## Limitations

State lives in the platform's datastore by default, which is a real dependency for production workloads and means SQLite locally and PostgreSQL in production is the honest default rather than a preference. The convenient path runs through a hosted cloud service, so a hard requirement for full self-hosting means more of the feature set has to be verified as present on your own infrastructure. Broad vendor support - a hundred providers, embedders, and vector databases - means the abstraction layer is real and some integrations will be thinner than the headline count suggests. Traces and evals capture behavior, not correctness, so a passing eval suite can still encode the wrong expectation. The project is young and iterates quickly, which is a feature for an iteration tool and a liability for anything you depend on.

## Relation to the Arsenal

This framework-phase entry is an authoring and observability front end for the agent patterns in the sibling content/projects/frameworks phase rather than a runtime itself. Its bundled RAG ingestion overlaps content/projects/data-and-retrieval, its trace and eval surfaces are the same category as content/projects/benchmark-and-eval, and its provider abstraction makes content/projects/inference-engines the layer where model cost and quality actually get decided.

## Resources

- [Repository](https://github.com/PySpur-Dev/pyspur)
- [Documentation](https://docs.pyspur.dev/)
