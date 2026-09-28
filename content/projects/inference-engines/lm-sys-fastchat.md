---
id: lm-sys-fastchat
name: "FastChat"
version_tracked: null
artifact_type: tool
category: llms
subcategory: tools
description: "Apache-2.0 research platform from LMSYS covering model training, multi-backend serving, and the Chatbot Arena evaluation harness"
github_url: "https://github.com/lm-sys/FastChat"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "lm-sys"
tags: [llm, inference, retrieval, training]
maturity: production
cost_model: open-source
github_stars: 39550
github_stars_last_30d: 0
trending_score: 32
last_commit: "2026-05-01"
docs_url: "https://lm-sys.github.io/FastChat"
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [language, vision]
relation_to_stack: [deploy-as-is]
health_signals: [community-driven]
ecosystem_role:
  - "Research-lab platform covering LLM training, serving, and evaluation in one repo — the reference for multi-round and multi-model LLM evaluation harnesses."
best_for:
  - "You need a leaderboard-grade head-to-head comparison where models are judged on the same prompts under the same judging conditions, and the arena protocol is what makes the result meaningful."
  - "You are reproducing an LLM research result that used Vicuna training or a FastChat evaluation config, since the released checkpoints and eval scripts are the artifacts people cite."
  - "You want one repository holding training code, several inference backends, and an evaluation client, so a paper's model and its numbers live in the same place."
avoid_if:
  - "You need a high-throughput production endpoint, because the serving layer here is a research harness optimized for flexibility and evaluation rather than batching and paged attention."
  - "You need a stable long-term platform with a compatibility promise, since the repository is a moving research artifact whose breaking changes come with each paper."
  - "Your models are not in a supported architecture family, because the training path and the Vicuna recipe are tied to specific base-model conventions."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 39550 stars, Apache-2.0 license, Python primary language, last commit 2026-05-01, empty topics, no homepage. Server, worker, and controller split, supported backends, and the Vicuna training recipe come from official docs; the arena protocol claim is cited to the published paper, not independently verified."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/lm-sys/FastChat", "date": "2026-09-28", "description": "39,550 stars and last commit 2026-05-01 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

FastChat is the LMSYS research platform behind Vicuna and Chatbot Arena, bundling three things that are usually separate: training code for instruction-tuning a chat model, a serving layer that can front several inference backends behind one API, and evaluation tooling. On the training side it contains the Vicuna recipe - supervised fine-tuning from a base model plus an optional RLHF stage - with the data pipeline and hyperparameters for the released checkpoints. On the serving side, the model worker and web server route requests to backends that may implement the Hugging Face transformers API, the vLLM engine, or an external endpoint, which is what lets a single evaluation run compare a local model with a hosted one. On the evaluation side it provides question files, a judge script, and the arena voting machinery behind the public Chatbot Arena rankings.

## Why it's in the Arsenal

The decision Fastchat resolves is comparable model evaluation. Prompt-based benchmarks saturate and become gameable, so the arena approach instead collects real user queries, samples two anonymous model responses, and asks a strong judge model which is better, aggregating votes into a ranking - a design that resists benchmark contamination at the cost of depending on judge quality and user distribution. Building that harness properly - a consistent judge, a controlled serving layer, a repeatable question set - is weeks of work, and it is what the project publishes. The second decision is model-to-backend flexibility in evaluation: because the worker abstracts the inference implementation, a run can mix a locally trained checkpoint with a served frontier model in the same evaluation, which is what makes the resulting numbers worth publishing.

## Architecture

The serving layer splits into a web server, a model worker, and a controller. The web server holds the conversation state and OpenAI-compatible routes; the controller holds a registry of model names to serving backends and routes each request to a worker, which loads a model through one of several adapters - a Hugging Face transformers backend, a vLLM-backed engine, or a remote provider - and exposes generate and embedding endpoints. This indirection is deliberate: a model is an entry in a registry, so adding a backend does not change the callers, and an evaluation can point the same client at different workers. The training code is the Vicuna recipe: a supervised fine-tune over conversation-formatted data with a specified template and a two-stage or RLHF option, plus the data-building scripts. Evaluation is a separate client: it reads a question file, sends matched or shuffled pairs, asks a judge model for a pairwise preference, and writes per-question results and aggregate rankings, which is the format the public leaderboard consumes. Conversation templates are defined per model family, since formatting differences otherwise contaminate comparisons.

## Ecosystem Position

Fastchat competes with pure serving stacks such as vLLM and SGLang and with evaluation tooling built around single-model benchmarks, and compared to the serving engines it trades throughput for the ability to compare models in one harness. It overlaps with Chatbot Arena, which it hosts and whose rankings it is the source for, so the platform and the public leaderboard are the same project rather than competing products. It is an alternative to assembling your own pairwise-judge evaluation, and it is rather than a production inference tier: for serving, the entries in content/projects/inference-engines/ are the right layer, and the judge-model protocol here is a research instrument rather than a production quality gate. Inside the Arsenal it sits between the training entries in content/projects/training-and-alignment/ and the evaluation tools in content/projects/evaluation/, which is exactly the position the LMSYS group occupies in the open LLM ecosystem.

## Getting Started

Install the package and start a model worker plus the web server, then score it with the built-in evaluation client:

```bash
python3 -m pip install "fschat[model_worker,webui]"
python3 -m fastchat.serve.cli --model-path lmsys/vicuna-7b-v1.5
python3 -m fastchat.serve.web_ui --model-path lmsys/vicuna-7b-v1.5
python3 -m fastchat.eval.openai_api_eval --model vicuna-7b-v1.5 --questions data/mt_bench/question.jsonl
```

The Vicuna training recipe lives in the train_vicuna scripts in the same repository.

## Key Use Cases

1. Produce a defensible head-to-head comparison of a fine-tuned checkpoint against a base or hosted model using the same judge, questions, and serving conditions.
2. Reproduce a published result whose numbers come from this harness, so your re-run is comparable to the numbers in the paper.
3. Serve several model families behind one OpenAI-compatible endpoint for internal evaluation, then hand off to a dedicated inference engine when real traffic arrives.

## Strengths

- The arena protocol is the most battle-tested head-to-head LLM evaluation approach in the open ecosystem, and the harness that produced it ships here.
- Backend abstraction lets one evaluation mix a locally trained model, a vLLM-served model, and a remote provider with identical client code.
- The Vicuna training recipe and released checkpoints are the artifacts a large part of the open instruct-model literature cites and reproduces from.
- Apache-2.0 with a self-hostable question and judge configuration, so an internal arena on private prompts and models is buildable.

## Limitations

It is a research repository, so interface stability, upgrade path, and release discipline are secondary to publishing results; expect breaking changes between paper cycles. The serving layer is not engineered for production throughput - no paged attention, no continuous batching, no autoscaling - so it is a poor front end for real users. Pairwise judging is sensitive to judge model choice, position bias, and query distribution, so rankings carry real uncertainty and are not a substitute for task-specific evaluation. Training coverage is narrow: the Vicuna recipe targets specific base-model families and a fixed conversation format, so other architectures need their own data work. And the operational weight is significant - a judge model, a serving stack, and an evaluation client are three things to keep working, which is why many teams copy the question files and write their own harness instead.

## Relation to the Arsenal

The bridge entry between training and evaluation in the Arsenal: it implements the training recipe for the checkpoints distributed through content/projects/foundation-models/ and provides the evaluation harness that content/projects/evaluation/ entries are compared against. The serving backends it wraps are the entries in content/projects/inference-engines/, and the model definitions come from the framework layer in content/projects/frameworks/. The agent frameworks in content/projects/agent-systems/ are the production-side alternative for running many evaluations as durable jobs. If your question is throughput rather than comparison, skip to an inference engine; if it is which model is better, this is where the methodology lives.

## Resources

- [GitHub — lm-sys/FastChat](https://github.com/lm-sys/FastChat)
- [FastChat documentation](https://lm-sys.github.io/FastChat)
- [Chatbot Arena paper on arXiv](https://arxiv.org/abs/2403.04132)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (39,550 stars, last commit 2026-05-01, license Apache-2.0, verified via GitHub API on 2026-09-28)*
