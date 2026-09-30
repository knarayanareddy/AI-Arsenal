---
id: "ml-engineer"
title: "ML Engineer to AI Engineer Bridge"
entry_type: "guide"
section: "skills"
description: "Bridge path for ML engineers moving from training workflows to production LLM applications"
tags:
  - llm
  - evaluation
  - inference
  - data
related_entries: []
added_date: "2026-06-14"
last_reviewed: "2026-06-14"
added_by: "maintainer"
status: "active"
---

## Overview

A path from data science toward owning the platform: the training, serving, registry and monitoring concerns that sit outside the modelling most ML engineers already do. The ordering is general by design, with the specialisation forks called out rather than silently assumed.

## Why It's in the Arsenal

The gap this addresses is specific: most ML engineers arrive from modelling and discover that deployment, monitoring and reproducibility are where the time goes. Sequencing those concerns explicitly is what turns a list of relevant tools into a plan, and pairing each stage with a buildable project is what makes progress visible.

## Key Features

### Phase 1: Re-map ML Concepts to LLM Apps

- Dataset → eval set, traces, prompt examples, retrieval corpus.
- Model metric → task-specific rubric, win rate, retrieval recall, latency, cost.
- Training run → prompt/model/retriever experiment.

### Phase 2: Learn RAG as Data Engineering

- Treat parsing, chunking, metadata, and retrieval evals as data pipeline work.
- Build: [Document Q&A Pipeline](../../build-examples/data-pipelines/intermediate-document-qa-pipeline.md).

### Phase 3: Learn Serving and Inference

- Compare hosted APIs, vLLM, SGLang, Ollama, and llama.cpp.
- Read: [Choose an LLM](../../architectures/model-selection/choose-llm.md) and [Choose a Deployment Target](../../architectures/serving-patterns/choose-deployment-target.md).

### Phase 4: Learn LLMOps

- Add tracing, datasets, evals, cost attribution, and rollback.
- Use: Langfuse, Phoenix, Braintrust, Opik, MLflow, W&B, DVC.

### Phase 5: Specialize

- Fine-tuning: Unsloth, Axolotl, PEFT, torchtune.
- Inference: vLLM, SGLang, quantization, speculative decoding.
- Evaluation: RAGAS, DeepEval, Phoenix, promptfoo.

## Architecture / How It Works

This bridge path keeps the ML discipline of datasets, reproducibility, and metrics, but applies it to LLM system behavior instead of only model training.

## Getting Started

```bash
# Start by converting one existing ML eval habit into an LLM eval dataset.
pnpm run generate:all
```

## Use Cases

1. **Scenario**: you are a data scientist moving toward owning model deployment and monitoring rather than only notebook work.
2. **Scenario**: you need to know which training and serving concerns sit outside the modelling you already do well.
3. **Scenario**: you are re-mapping classical ML instincts onto LLM work and want to know which transfer and which mislead.
4. **Scenario**: you are choosing a specialisation fork in month five and want the trade-offs written down before you commit.

## Strengths

- Separates the modelling you already do from the platform work that is new, which is the actual gap this path closes.
- Front-loads deployment and monitoring rather than treating them as later-career topics, so the expensive lessons arrive early.
- Calls out the specialisation forks in month five instead of presenting one ordering as universal.
- Maps classical ML concepts onto their LLM equivalents explicitly, so you can see which instincts transfer and which mislead.

## Limitations / When NOT to Use

- Assumes you already understand datasets, metrics, training and experiment tracking; if you do not, start from the AI-engineer path instead.
- The named tooling changes faster than the concepts. Re-check the vendors before committing to a platform.
- Does not cover the research half of the role. If your work involves training new models rather than adapting and serving them, this is the wrong path.

## Integration Patterns

- Use the concept-remapping table as a review prompt for an LLM judging whether a pull request is a data-engineering change or a modelling change.
- Convert each phase into one deployable artifact so the path ends with running systems rather than notes.
- Hold the month-five fork open until you have shipped at least one production service, or the choice will be made on vibes.

## Resources

- [Research Platform Stack](../../architectures/reference-stacks/research-platform.md)
- [Fine-tuning tools](../../tools/by-job/fine-tuning.md)
- [Evaluation tools](../../tools/by-job/evaluation.md)
- [vLLM](../../projects/inference-engines/vllm.md)
- [PEFT](../../tools/model-layer/peft.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-06-14 by @maintainer*

