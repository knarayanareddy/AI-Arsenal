---
id: aisheets
name: Hugging Face AI Sheets
type: tool
job:
- data-labeling
- prototyping
description: "Spreadsheet-style web app for building, enriching and transforming datasets with LLM columns, deployable from Docker or pnpm against Hub or local models"
url: https://github.com/huggingface/aisheets
cost_model: open-source
pricing_detail: Apache-2.0 software; hosted inference and storage costs are separate
tags: [llm, data]
maturity: beta
stack:
- typescript
free_tier: true
free_tier_limits: Self-host the open-source application or use Hugging Face services
self_hostable: true
open_source: true
source_url: https://github.com/huggingface/aisheets
docs_url: "https://huggingface.co/spaces/aisheets/sheets"
github_url: https://github.com/huggingface/aisheets
alternatives:
- argilla
- label-studio
- prodigy
integrates_with:
- vllm
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience:
- prototype
- research
best_when: ["You have a CSV of a few thousand rows and you need one or two new columns produced by a model, and you would rather configure a grid than write and maintain a batch script.", "You want to prototype a synthetic-data pipeline and see intermediate results while you adjust the prompt, rather than waiting for a full run to finish.", "You need the same transformation logic reproducible later, because the dataset plus its column definitions is the artefact you keep, not a one-off script invocation."]
avoid_when: ["You are producing millions of rows, because the UI is built for iteration and the documented path to that scale is a separate script on HF Jobs rather than the spreadsheet itself.", "You need typed schemas, joins or transactional guarantees, because this is a grid with model-backed columns, not a data warehouse or a pipeline engine.", "Your data cannot be sent to a hosted provider, because the default path runs inference through the Hugging Face Inference Providers API and only the text columns are redirectable to a local endpoint."]
version_tracked: null
enrichment_status: draft
enrichment_notes: Metadata and feature claims are grounded in the project README and
  public repository state; draft pending maintainer review.
verdict: watching
verdict_rationale: An approachable Hugging Face data-preparation interface, with maintenance
  and scale assumptions still needing review
status: watching
---

## Overview

AI Sheets is a Hugging Face application that treats dataset transformation as spreadsheet work. You load a dataset, add a column whose value is produced by a model, and write the prompt and model selection for that column; the app runs it across the rows. The interesting part is deployment breadth: the same tool runs as a Space on the Hub, as a Docker image, or from a pnpm dev server, and by default it reaches models through the Hugging Face Inference Providers API, which covers thousands of open models including gpt-oss. It can be pointed at your own endpoint instead by setting MODEL_ENDPOINT_URL and MODEL_ENDPOINT_NAME, with any server implementing the OpenAI API specification - the README's worked example is a local Ollama instance on port 11434. Beyond the UI there are two standalone scripts for larger work: one driving the Inference Client, the other driving vLLM on an HF Job with a GPU flavor so a big generation run does not bill per token. The frontend is built on Qwik with Qwik City routing, and production serves through a small Express server.

## Why It's in the Arsenal

The recurring decision is how you get model-generated columns into a dataset. The usual path is a script that loads a CSV, calls an API in a loop, handles retries, writes the output, and is then edited again for the next column - slow to iterate on and painful to re-run. Putting a model behind a column makes the transformation declarative and the result inspectable row by row, which is what makes prompt iteration practical. The tradeoff is the scale ceiling: a grid is a development surface, and the honest path to bulk generation is the separate script, so this does not remove the need for a batch job - it replaces the fiddly part before you get there.

## Key Features

- Column-oriented iteration makes prompt tuning fast, because you see sample output immediately rather than waiting for a batch run.
- Deploys three ways from one codebase - Space, Docker image or pnpm dev - so it fits an evaluation, a laptop or a small server without a rewrite.
- Model-agnostic through the OpenAI API specification, so a local endpoint and a hosted provider are configuration rather than code.
- Ships a vLLM-backed generation script, so scaling past the grid does not require switching tools and can trade token cost for GPU time.

## Architecture / How It Works

The app is a TypeScript Qwik project with a Qwik City route tree split into stateless components, feature components carrying business logic, and directory-based routes where index.ts files double as endpoints. Inference is abstracted behind the OpenAI API specification: by default it targets the Hugging Face Inference Providers endpoint, and the two environment variables redirect it to any compatible base URL and model name. Column configuration is the unit of work, so a dataset plus a set of column definitions is the reproducible artefact. For scale, two Python scripts sit outside the UI - one using the Inference Client against Hub providers, one driving a vLLM-served model on a GPU-flavored HF Job with a configurable model, which is the cost-saving path since you pay for the GPU rather than the tokens. Production build emits a dist directory served by a minimal Express server, and development uses Vite with server-side rendering.

## Getting Started

The Docker path is one command once you have a token; the pnpm path gives you hot reload while you iterate:

```bash
export HF_TOKEN=your_token_here
docker run -p 3000:3000 -e HF_TOKEN=HF_TOKEN aisheets/sheets
```

Open http://localhost:3000. For development, clone and run pnpm install --frozen-lockfile then pnpm dev, which serves on port 5173.

## Use Cases

1. Add a model-generated column to an existing CSV: point it at a dataset, define the prompt and model for the new column, inspect the rows, and export.
2. Prototype a synthetic dataset: expand a small seed set interactively while refining the prompt, then run the same configuration at scale through the HF Jobs script.
3. Keep inference on your own hardware: point MODEL_ENDPOINT_URL and MODEL_ENDPOINT_NAME at a local Ollama server and use your own model for every text column.

## Strengths

It competes with no-code enrichment tools and with the notebook-plus-script workflow it replaces, and the difference from a notebook is that iteration is cell-shaped rather than line-shaped: you see sample output while you tune the prompt instead of rerunning a script. It overlaps with the synthetic-data tooling in content/tools/data-ingestion, where a pipeline framework would give you lineage, scheduling and typed transforms that this does not attempt. Compared with Open WebUI, which is a chat surface for a model, this is a dataset surface and the model is a column rather than the conversation. The model layer is a consumer: the default goes through Hub Inference Providers and the override talks to anything OpenAI-shaped, including the ollama and llama-cpp entries in content/projects/inference-engines. Its output lands wherever your dataset lives, which is where the ingestion and transformation entries in the same phase pick up.

## Limitations / When NOT to Use

The scale story has a seam: the grid is for iteration and production volume means moving to the standalone script, so you maintain a UI definition and a script configuration. It is a TypeScript Qwik application with an Express server and a Node toolchain, which is heavier than a script for a one-off job. Model support is OpenAI-shaped only, so a provider or local server with different semantics needs a shim, and the README notes the text-to-image feature still always uses the Hub provider with no local override - a real limitation if your workflow needs generated images on private hardware. The app also expects a Hugging Face token even in local deployments because of that dependency. There is no schema, typing, join or transactional story, so this is a transformation aid rather than something to run a production data pipeline on, and multi-user collaboration is not part of the design.

## Integration Patterns

This is the no-code dataset transformation entry in content/tools/data-ingestion, and it is the interactive counterpoint to the pipeline frameworks catalogued in content/projects/data-and-retrieval such as dvc, kedro and metaflow - use this to find the right prompt, then a pipeline to run it reliably. It consumes a model layer, so a local setup pairs with ollama or llama-cpp from content/projects/inference-engines. The synthesised output then feeds the retrieval and evaluation phases, and the observability tooling in the same phase is unrelated to this despite the shared word.

## Resources

- [GitHub — huggingface/aisheets](https://github.com/huggingface/aisheets)
- [Live Space — aisheets/sheets](https://huggingface.co/spaces/aisheets/sheets)
- [Introduction post on the Hugging Face blog](https://huggingface.co/blog/aisheets)

## Buzz & Reception

Makes model calls a column operation in a grid, so dataset enrichment becomes a reproducible cell configuration instead of a bespoke script per project.
