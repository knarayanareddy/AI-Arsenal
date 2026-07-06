---
id: "research-platform"
title: "Research Platform Stack vs Product Stack: Reproducibility vs Shipping Speed"
category: "reference-stacks"
decision_type: "fork"
decision_summary: "Adopt the research platform stack for systematic model/prompt/fine-tuning comparison — not for a product MVP where shipping speed matters more than reproducibility."
tags:
  - pytorch
  - evaluation
  - inference
  - data

approaches:
  - name: "Research Platform Stack"
    description: "A stack built around reproducibility (experiment tracking, dataset versioning, a model hub, reproducible training/eval runs) for systematically comparing model, prompt, or fine-tuning variants, treating datasets and evals as first-class versioned artifacts."
    when_to_use:
      - "Systematically comparing model or prompt variants and needing to trace which dataset version and configuration produced which result"
      - "Building eval benchmarks for RAG or agent systems that need to be reproducible across team members and over time"
      - "Running open-source model fine-tuning experiments where tracking hyperparameters, data versions, and results together matters"
    when_not_to_use:
      - "Strict production uptime is the primary goal — this stack optimizes for reproducibility and iteration, not serving reliability"
      - "There is no time or team capacity to maintain datasets and eval harnesses — the stack's value depends entirely on that discipline being sustained"
      - "The immediate goal is a product MVP where shipping speed matters more than experimental rigor — see Lean MVP Stack instead"
    tradeoffs:
      cost: "$0-$200/month at hobbyist scale (local GPU/API tokens/storage), $500-$5,000/month at small-startup scale, $5,000+ at real scale — driven primarily by GPU compute for training/fine-tuning experiments and dataset/experiment storage."
      complexity: "Higher than a product stack for the specific dimension of experiment tracking and reproducibility discipline — versioning datasets and evals as first-class artifacts is real process overhead that pays off specifically for systematic comparison work."
      interpretability: "The stack's entire value proposition — every result should be traceable to a specific dataset version, configuration, and code state, which most product-focused stacks don't prioritize."

  - name: "Product Stack (Lean MVP or Production RAG)"
    description: "A stack optimized for shipping a working product rather than systematically comparing experimental variants — see Lean MVP Stack or Production RAG Stack."
    when_to_use:
      - "The immediate goal is a working, user-facing product, not a systematic comparison of approaches"
    when_not_to_use:
      - "You need to trace a production quality regression back to a specific data or configuration change — without experiment tracking, this becomes much harder"
    tradeoffs:
      complexity: "Lower for the specific dimension of experiment tracking, since product stacks don't need to reproduce arbitrary past experimental configurations the way a research platform does."

key_factors:
  - "Primary goal: systematic comparison of variants (research platform) vs shipping a working product (product stack) — these pull toward genuinely different tooling emphasis"
  - "Reproducibility requirement: needing to trace a result back to a specific dataset version and configuration favors the research platform's tracking/versioning discipline"
  - "Team discipline capacity: the research platform's value depends on datasets and evals actually being versioned and maintained, not just having the tools installed"
  - "Uptime requirement: strict production uptime as the primary goal points away from a stack optimized for iteration and reproducibility over serving reliability"

has_decision_framework: true
decision_tree: |
  flowchart TD
      Start["Choosing a research platform vs a product stack"] --> Goal{"Primary goal: systematic comparison of variants, or shipping a product?"}
      Goal -->|"Systematic comparison / research"| Discipline{"Team has capacity to maintain versioned datasets and eval harnesses?"}
      Discipline -->|"Yes"| Research["Use the Research Platform Stack"]
      Discipline -->|"No"| BuildDiscipline["Build that capacity first, or the stack's value won't be realized regardless of tooling"]
      Goal -->|"Shipping a product"| Uptime{"Strict production uptime is the primary goal?"}
      Uptime -->|"Yes"| ProductStack["Use a Product Stack (Lean MVP or Production RAG)"]
      Uptime -->|"No, still early"| ProductStack

confidence: "established"
tradeoffs_as_of: "2026-07-06"

approach_implementations:
  - approach_name: "Research Platform Stack"
    tool_ids:
      - weights-biases
      - mlflow
      - hugging-face-hub
      - dvc
      - peft
      - torchtune
    project_ids:
      - vllm
      - ragas-rag-evaluation
    build_example_ids: []

related_decisions:
  - rag-vs-fine-tuning
  - production-rag

common_mistakes:
  - "Adopting the research platform's full experiment-tracking and dataset-versioning discipline for a product MVP, slowing down shipping for reproducibility rigor that isn't the actual current priority."
  - "Installing the research platform's tools (W&B, DVC, MLflow) without the team discipline to actually version datasets and evals consistently — the tools provide no reproducibility benefit if the versioning habit isn't sustained, which is a process commitment, not a tooling one."
  - "Using this stack for production serving rather than experimentation — its component choices (notebooks, experiment tracking, ad hoc GPU allocation) are optimized for iteration speed on research questions, not for serving reliability."

added_date: "2026-06-13"
last_reviewed: "2026-07-06"
added_by: "maintainer"
status: "active"
enrichment_status: "reviewed"
---

## Overview

This reference stack is the opinionated baseline for repeatable model, agent, and retrieval experiments. It prioritizes reproducibility over minimal setup, making datasets and evals first-class artifacts — the correct tradeoff for systematic research and comparison work, and the wrong one for a product MVP where shipping speed is the actual priority.

## The Decision

The fork here is about primary goal, not maturity stage the way Lean MVP → Production RAG is: this isn't "start simple, graduate later," it's "these serve genuinely different purposes." If the immediate need is comparing model, prompt, or fine-tuning variants systematically and tracing results back to specific configurations, the research platform's tracking and versioning discipline is the right investment. If the immediate need is shipping a working product to users, a product stack ([Lean MVP](./lean-mvp.md) or [Production RAG](./production-rag.md)) serves that goal better, and adopting research-platform rigor at that stage is misapplied effort.

## Decision Framework

| Layer | Tool | Why This Choice |
|---|---|---|
| Experiment Tracking | Weights & Biases or MLflow | Track runs, metrics, artifacts, and comparisons |
| Model Hub | Hugging Face Hub | Publish and consume models/datasets |
| Training/Fine-tuning | torchtune / PEFT / Unsloth | Open-model adaptation experiments |
| Inference | vLLM / SGLang / Ollama | Serve models for evaluation and demos |
| Evaluation | RAGAS / DeepEval / Phoenix | Measure model/RAG/agent behavior |
| Data Versioning | DVC | Version datasets and eval fixtures |
| Compute | Local GPU / cloud GPU / Modal | Match hardware to experiment size |

```mermaid
flowchart TD
    IDEA[Research question] --> DATA[Dataset / eval set]
    DATA --> DVC[DVC / dataset version]
    DATA --> TRAIN[Fine-tune / prompt / RAG variant]
    TRAIN --> SERVE[vLLM / SGLang / Ollama]
    SERVE --> EVAL[Eval harness]
    EVAL --> TRACK[W&B / MLflow]
    TRAIN --> HUB[Hugging Face Hub]
    TRACK --> REPORT[Report / decision]
    EVAL --> IDEA
```

Getting started:
```bash
pip install wandb mlflow dvc peft torchtune vllm ragas
# Version eval data, run baseline, change one variable, compare results.
```

## Approach Deep-Dives

**The research platform stack** treats datasets and evaluation results as versioned artifacts specifically because the value of a comparison depends on knowing exactly what changed between experiments — this discipline is real process overhead, and it only pays off if a team actually sustains it, not merely installs the tooling. Fine-tuning experiments run through this stack connect directly to [RAG vs Fine-Tuning](../system-design/rag-vs-fine-tuning.md)'s decision framework — the platform is where you'd generate the evidence (labeled example counts, quality deltas) that decision framework asks for. **A product stack** ([Lean MVP](./lean-mvp.md) or [Production RAG](./production-rag.md)) fits better whenever the immediate goal is a working, shippable system rather than a systematic comparison — these are not stages of the same journey the way lean-to-production is, but genuinely different primary goals.

## Common Mistakes

- **Adopting full experiment-tracking rigor for a product MVP**, slowing shipping for reproducibility that isn't the current priority.
- **Installing the tools without the team discipline to version datasets/evals consistently.** The tools provide no benefit without the sustained habit.
- **Using this stack for production serving rather than experimentation.** Its components optimize for iteration speed on research questions, not serving reliability.

## When This Guidance Might Be Outdated

Confidence is `established` for the overall research-vs-product tooling split, which is a stable methodological distinction independent of the specific AI tooling landscape — but the specific tool recommendations (particularly in the fast-moving fine-tuning tooling space) should be re-checked periodically, since faster or more capable alternatives to any named tool here could emerge.

## Related Decisions

Directly related to [RAG vs Fine-Tuning](../system-design/rag-vs-fine-tuning.md), since this platform is where the evidence for that decision (dataset size thresholds, quality deltas from fine-tuning experiments) would actually be generated, and to [Production RAG Stack](./production-rag.md) as the contrasting product-focused stack.

## Resources

- [Weights & Biases](../../tools/model-layer/weights-biases.md)
- [MLflow](../../tools/model-layer/mlflow.md)
- [Hugging Face Hub](../../tools/model-layer/hugging-face-hub.md)
- [DVC](../../tools/model-layer/dvc.md)
- [PEFT](../../tools/model-layer/peft.md)
- [torchtune](../../tools/model-layer/torchtune.md)
- [vLLM](../../projects/inference-engines/vllm.md)
- [RAGAS](../../projects/benchmarks-and-evals/ragas-rag-evaluation.md)

---
*Last reviewed: 2026-07-06 by @maintainer*
