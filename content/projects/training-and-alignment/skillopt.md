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
org_or_maintainer: microsoft
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 44
trending_score: 34
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
status: active
id: skillopt
name: SkillOpt
artifact_type: framework
category: agents
subcategory: libraries
description: Microsoft's text-space optimizer for improving reusable natural-language agent skills from trajectory feedback while keeping the underlying LLM frozen
github_url: https://github.com/microsoft/SkillOpt
license: MIT
primary_language: Python
tags:
  - agents
  - training
  - efficiency
  - evaluation
  - reasoning
maturity: alpha
cost_model: open-source
github_stars: 13209
last_commit: '2026-07-18'
docs_url: https://microsoft.github.io/SkillOpt/
phase: training-and-alignment
domain:
  - language
relation_to_stack:
  - build-on-top
  - study-and-reference
health_signals:
  - org-backed
  - research-origin
ecosystem_role:
  - Text-space optimizer for reusable skills on frozen LLM agents
  - Prompt-level alternative to weight updates and conventional fine-tuning
best_for:
  - Optimizing prompts and skills without weight updates
  - Studying trajectory-based agent improvement
avoid_if:
  - You need to change model weights or guarantee skill transfer across providers
  - You lack reliable task feedback or enough representative trajectories
enrichment_notes: SkillOpt is a research release whose optimizer behavior depends on trajectory quality and task rubric; arXiv claims need replication. Draft pending review.
---

## Overview

SkillOpt reframes agent improvement as optimization in text space. Instead of fine-tuning weights, it iterates on reusable natural-language skills for a frozen LLM, making epochs, batch size, and learning-rate-like controls available without the cost or governance burden of model training.

## Why it's in the Arsenal

SkillOpt deserves a slot because it improves reusable agent instructions without changing the underlying model weights. Its trajectory-feedback loop exposes training-like epochs and batch controls in text space, offering a practical research path when teams can edit skills but cannot fine-tune a frozen LLM.

## Architecture

The Python framework collects agent trajectories, evaluates feedback, proposes skill revisions, and repeats the loop across optimization rounds. The model remains frozen; the changing artifact is the instruction/skill text, so the surrounding agent harness, evaluator, and rubric determine what signal the optimizer actually receives.

## Ecosystem Position

SkillOpt complements prompt optimizers and traditional fine-tuning while competing with manual skill authoring. Its frozen-model approach is an alternative when teams can edit prompts but not weights, yet it sits above an agent runtime and depends on a reliable judge rather than replacing evaluation infrastructure.

## Getting Started

Clone the repository, install its Python requirements, configure the target frozen LLM and evaluator, and provide a small set of representative task trajectories. Run the documented optimizer example, inspect each proposed skill revision, and evaluate it on held-out tasks before adopting it in an agent.

## Key Use Cases

Use SkillOpt to refine a repository skill, tool-use instruction, or domain procedure from successful and failed trajectories. It is suited to comparing prompt-level adaptation against weight updates, especially when the same model endpoint must remain unchanged for deployment or governance reasons.

## Strengths

The learned artifact remains readable natural-language skill text, while the optimizer provides epochs, batch-size, and learning-rate-like controls without GPU weight updates. Trajectory feedback and an explicit rubric make the improvement loop inspectable rather than hiding changes inside model parameters.

## Limitations

Text-space optimization can overfit a rubric, amplify evaluator bias, or produce skills that work only with one provider and model version. Trajectory collection costs tokens, and no weight update means fundamental capability gaps remain; inspect revisions and run held-out tasks before deployment.

## Relation to the Arsenal

SkillOpt complements prompt optimizers, evaluation judges, and OpenEnv-style environments, while offering an alternative to LoRA or full fine-tuning. It sits in training and alignment above the agent runtime; its results still depend on trajectory quality, evaluator bias, and provider behavior.

## Resources

- [GitHub](https://github.com/microsoft/SkillOpt)
- [Documentation](https://microsoft.github.io/SkillOpt/)
