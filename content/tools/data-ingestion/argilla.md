---
id: argilla
name: Argilla
type: tool
job: [data-labeling, evaluation]
description: "Human feedback and dataset curation UI in maintenance mode, with script-defined annotation and evaluation workflows"
url: "https://github.com/argilla-io/argilla"
cost_model: open-source
pricing_detail: Open source or free to start
tags: [data, evaluation, huggingface, local]
maturity: production
stack: [python]
free_tier: true
free_tier_limits: Free/open-source use or free tier; verify current limits before production
self_hostable: true
open_source: true
source_url: "https://github.com/argilla-io/argilla"
docs_url: "https://argilla-io.github.io/argilla/latest/"
github_url: "https://github.com/argilla-io/argilla"
alternatives: [label-studio, prodigy, scale-ai]
integrates_with: []
added_date: "2026-06-13"
last_reviewed: "2026-06-30"
added_by: maintainer
reviewed_by: maintainer
phase: data-ingestion
audience: [research, production]
best_when: ["You need domain experts labelling data for text classification, NER, RAG relevance, preference tuning or multimodal work, and a generic spreadsheet interface would let the labelling rules drift.", "You want a programmatic way to build annotation workflows, because the approach is script-first with the UI as the review surface rather than a form builder.", "You are deciding what to keep maintaining, because the project states the codebase is mature and stable, features are frozen, and maintainers are being sought for the bug-fix line."]
avoid_when: ["You need new features, because the README notice says the original authors have moved on and no new features will be added going forward.", "You want an actively developed platform, since the ask in the README is for dedicated contributors to take ownership, which is the signal that governance is unresolved.", "You need a multi-tenant annotation vendor with an SLA, because this is a self-hosted open-source service whose feature roadmap has stopped while the community runs on."]
version_tracked: null
verdict: recommended
verdict_rationale: Useful option when it matches your stack, cost, and operational constraints
status: active
enrichment_status: draft
---

## Overview

Argilla is a collaboration tool for AI engineers and domain experts building high-quality datasets. Its premise is that output quality problems are usually data problems, and that fixing them means getting the right people looking at the right examples. The workflow is programmatic: you define records and questions in code, push them to a dataset, and domain experts review them in the interface with filters, AI feedback suggestions and semantic search to find the informative cases. The same surface is used for continuous evaluation, so the loop from the model is wrong on these to here are more of those labelled is one system rather than two. It is Apache-2.0, deployable on Hugging Face Spaces for a quick start, and the docs cover the fuller self-hosted path.

## Why It's in the Arsenal

The decision it addresses is who gets to define what correct means. A labelling spreadsheet assumes the engineer knows which examples matter; a purpose-built interface with filters and semantic search lets a domain expert find the hard cases themselves, which is the only way to get useful coverage on adversarial or edge-case inputs. Scripting the dataset definition also matters for reproducibility - you can regenerate the same review queue from your pipeline rather than re-uploading a CSV. The trade is that Argilla optimises for human throughput, not for automated scoring at scale, and it is now frozen.

## Key Features

- Script-first dataset definition, so a review queue is regenerable from a pipeline rather than a hand-uploaded file.
- Filters, AI-suggested labels and semantic search turn labelling from a bulk task into a targeted one.
- The same record model serves annotation and evaluation, so human and machine labels live together.
- Apache-2.0, with a Hugging Face Space route that removes the deployment question for a pilot.

## Architecture / How It Works

The service is Python and exposes an API for creating datasets, records and questions, which is how pipelines push work in; the storage layer keeps responses, suggestions and the resulting labels addressable so a training set can be exported from the same place. The UI is the review surface on top of that API, with filtering, suggested labels from a model and semantic search over the record text to narrow the queue. That same record model backs the evaluation path, so a scored run and a human-labelled one live in the same store and can be compared. Deployment is a self-hosted service, with a Hugging Face Space documented as the zero-setup route.

## Getting Started

The fast path in the README is a Hugging Face Space; locally it is a pip install plus the client:

```bash
pip install argilla
argilla login
```

Then sign in with your Hugging Face account to try the UI, or run the Space. The docs cover deploying the server yourself when the data must stay inside your network.

## Use Cases

1. RAG relevance labelling: have a domain expert mark which retrieved passages actually answer a query, then retrain the ranker on the disagreements.
2. Preference data for tuning: present pairs of model outputs to reviewers and export the preferences as a training set rather than scraping them from a chat log.
3. Targeted error analysis: use semantic search to pull the slice of production traffic where the model was confidently wrong, and queue exactly those for review.

## Strengths

Argilla competes with Label Studio and the hosted annotation services, and the differentiator is the model-first record model: responses, suggestions and multi-field metadata rather than a generic form. It overlaps with the eval tooling in content/projects/benchmark-and-eval - deepeval, braintrust, opik - but at the human-labelling end of the loop rather than the automated-scoring end, and the two compose: score automatically, then hand the disagreements to Argilla. Compared with the feature-frozen state, Braintrust and LangWatch are where to look for active development. It complements rather than replaces the training stack: the exported labels feed the fine-tuning entries in content/projects/training-and-alignment such as trl and xtuner.

## Limitations / When NOT to Use

The decisive constraint is governance, not code: features are frozen, the original authors have moved on, and the project is looking for maintainers to own bug fixes. That means you are adopting a mature but unstaffed codebase, and dependency bumps and security patches depend on whoever picks it up. It is optimised for human review throughput, so labelling at the scale where you want automated scoring instead is the wrong tool. Self-hosting it means owning the service, the storage and the upgrade path yourself, with no support contract to fall back on.

## Integration Patterns

This is a data-ingestion tool in the phase, and it is the human end of a loop the rest of the Arsenal covers in code. Its natural partner is the evaluation tooling in content/projects/benchmark-and-eval - opik, deepeval, promptfoo - which scores automatically and hands Argilla the disagreements. Downstream of the labels sits content/projects/training-and-alignment, where trl and xtuner consume the preference data. For model selection itself, read the label spaces in content/projects/model-layer. Treat it as infrastructure you will own, and check whether an actively developed alternative in the same folder serves you better.

## Resources

- [GitHub - argilla-io/argilla](https://github.com/argilla-io/argilla)
- [Documentation](https://argilla-io.github.io/argilla/latest/)
- [Maintenance-mode notice in the README](https://github.com/argilla-io/argilla#readme)

## Buzz & Reception

A purpose-built human review interface with filters, model-suggested labels and semantic search, from a team that has frozen features and is seeking maintainers
