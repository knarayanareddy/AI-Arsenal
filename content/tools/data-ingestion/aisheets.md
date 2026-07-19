---
id: aisheets
name: Hugging Face AI Sheets
type: tool
job:
- data-labeling
- prototyping
description: Hugging Face open-source no-code tool for generating and enriching datasets
  with AI models
url: https://github.com/huggingface/aisheets
cost_model: open-source
pricing_detail: Apache-2.0 software; hosted inference and storage costs are separate
tags:
- data
- llm
- huggingface
- batching
maturity: beta
stack:
- typescript
free_tier: true
free_tier_limits: Self-host the open-source application or use Hugging Face services
self_hostable: true
open_source: true
source_url: https://github.com/huggingface/aisheets
docs_url: https://github.com/huggingface/aisheets
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
best_when:
- You need a visual, low-code workflow for adding model-generated columns, labels,
  or transformations to a dataset
- Your team wants to move between a local Docker deployment, Hugging Face Hub data,
  and hosted inference providers
avoid_when:
- You need deterministic ETL guarantees, strict row-level lineage, or high-volume
  processing without validating the current release's scaling behavior
- Your data cannot leave the approved model/provider boundary or you have not budgeted
  for hosted inference and batch execution
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

AI Sheets is Hugging Face's open-source, spreadsheet-like interface for building, enriching, and transforming datasets with AI models. It can run locally or on the Hub and can call thousands of Hub models through Inference Providers or local inference, making model-assisted data preparation accessible to people who do not want to write an entire pipeline first.

## Why It's in the Arsenal

AI Sheets deserves a place as a data-preparation tool because it turns common enrichment operations—classification, generation, rewriting, and extraction—into inspectable dataset transformations. The Hugging Face integration also connects the visual workflow to Hub datasets and model choices rather than locking the user into one proprietary model endpoint.

## Key Features

The README describes no-code row transformations, local Docker deployment, Hugging Face Hub integration, hosted Inference Providers, local models, and scripts for extending datasets with inference clients or vLLM. A user can prototype a transformation in the sheet UI, then move a larger job into the repository's command-line scripts.

## Architecture / How It Works

The web application represents a dataset as rows and generated or transformed columns. A model/provider configuration supplies the operation for a column, while the backend executes requests and materializes the results into a dataset that can be exported or pushed to the Hub. The companion scripts expose a more reproducible batch path for larger jobs and local vLLM execution.

## Getting Started

The README offers a Docker quick start:

```bash
git clone https://github.com/huggingface/aisheets.git
cd aisheets
docker run -p 3000:3000 ghcr.io/huggingface/aisheets:latest
```

For local development, install pnpm dependencies with `pnpm install --frozen-lockfile` and run the app as documented. Configure a Hugging Face token only after deciding whether the dataset can be sent to an external inference provider.

## Use Cases

Use AI Sheets to add synthetic questions to a seed dataset, label support messages with a candidate taxonomy, or enrich Hub rows with model-generated explanations before a human review pass. Its batch scripts are a better fit than the UI for generating a large training set, but the same prompts and model revision should be recorded for reproducibility.

## Strengths

The visual row-and-column interaction lowers the cost of exploring a data transformation, while Hugging Face integration provides an unusually broad model and dataset surface. The project also shows a path from interactive experimentation to `hf jobs` or vLLM-backed batch execution rather than forcing every user to choose one mode.

## Limitations / When NOT to Use

Generated labels and text inherit model bias, prompt drift, and provider nondeterminism; a spreadsheet view does not replace schema validation, deduplication, or human sampling. The default branch was last updated 2026-04-09 in the discovery metadata, so teams should verify current deployment instructions and scale behavior before making it a critical data pipeline.

## Integration Patterns

Prototype a column transformation on a small, redacted sample, export the prompt and model configuration, then run the corresponding repository script against a versioned input. Add row-level provenance and human acceptance checks before pushing enriched data into training or retrieval systems.

## Buzz & Reception

1,637 GitHub stars verified during the 2026-07-19 discovery sweep; Hugging Face project whose default branch was last updated 2026-04-09.

## Resources

- [GitHub](https://github.com/huggingface/aisheets)
- [Hugging Face announcement](https://huggingface.co/blog/aisheets)
- [Hosted Sheets Space](https://huggingface.co/spaces/aisheets/sheets)
