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

1. **Scenario**: You want a structured learning path instead of a random list of links
2. **Scenario**: You are using AI Arsenal with an LLM to plan study, projects, or hiring loops
3. **Scenario**: You need to map skills to concrete projects and production practices

## Strengths

- Turns broad AI topics into sequenced milestones
- Prioritizes free and primary-source resources where possible
- Connects learning to Arsenal projects, tools, decision trees, and build examples

## Limitations / When NOT to Use

- Does not replace hands-on building and evaluation
- Resource quality and availability can change over time
- Paid resources should be treated as optional unless explicitly required by your team

## Integration Patterns

- Use the learning path as an LLM prompt context when planning a study schedule.
- Convert each milestone into one portfolio artifact or internal project.
- Pair every conceptual topic with one build example and one evaluation checklist.

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

