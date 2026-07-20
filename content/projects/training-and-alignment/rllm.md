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
org_or_maintainer: rllm-org
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 30
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
status: active
id: rllm
name: rLLM
artifact_type: framework
category: agents
subcategory: frameworks
description: Reinforcement-learning framework for training language agents across model backends, sandboxes, rollouts, and benchmarks
github_url: https://github.com/rllm-org/rllm
license: Apache-2.0
primary_language: Python
tags:
  - agents
  - training
  - rlhf
  - reasoning
  - benchmark
  - tool-use
maturity: alpha
cost_model: open-source
github_stars: 5708
last_commit: '2026-07-19'
docs_url: https://docs.rllm-project.com/
phase: training-and-alignment
domain:
  - reinforcement-learning
  - language
relation_to_stack:
  - build-on-top
  - study-and-reference
health_signals:
  - community-driven
  - actively-maintained
ecosystem_role:
  - Agentic-RL training layer that complements agent harnesses and competes with narrower LLM post-training stacks
best_for:
  - Training tool-using language agents with environment feedback
  - Running comparable RL experiments across Tinker, Verl, or provider backends
avoid_if:
  - You lack GPU, sandbox, or external-provider budget for rollout-heavy training
  - You need supervised fine-tuning only without environment trajectories
enrichment_notes: Apache-2.0, rapidly evolving RL stack with substantial backend and sandbox costs. Draft pending review.
---

## Overview

rLLM is a framework for reinforcement learning with language agents, where the training signal comes from trajectories through tools, environments, and benchmarks rather than only next-token labels. It supports multiple model backends and sandbox providers so researchers can train and evaluate agents across math, code, search, and interactive tasks.

## Why it's in the Arsenal

It earns a slot because agentic post-training is becoming a distinct engineering discipline and requires more than a trainer wrapped around a chat model. rLLM connects rollout execution, reward/evaluation, backend adapters, and benchmark commands in one Apache-2.0 project.

## Architecture

The CLI configures a model provider and launches rollouts in Docker, Daytona, Modal, or local sandboxes, with snapshot and warm-pool mechanisms intended to reduce repeated environment setup. Backend integrations include Tinker and Verl paths; benchmark runners collect trajectories and scores that feed the RL loop.

## Ecosystem Position

rLLM complements agent frameworks that define tools and environments and competes with specialized RLHF or post-training stacks. Its center of gravity is agent trajectories and environment interaction, rather than generic supervised fine-tuning or a production inference server.

## Getting Started

Use Python 3.11 or newer, install the documented Git dependency such as `uv pip install "rllm @ git+https://github.com/rllm-org/rllm.git"`, choose a backend extra, and run `rllm model setup`. Configure a sandbox and benchmark before launching training so provider credentials and rollout limits are explicit.

## Key Use Cases

Use it for agentic RL on coding, search, math, and tool-use tasks, for comparing model backends, and for testing whether reward signals improve multi-step behavior. The 60-plus benchmark integrations also provide a common evaluation entry point.

## Strengths

Sandbox adapters, warm-pool acceleration, backend flexibility, and a large benchmark catalog address the operational parts of agentic RL that small research scripts usually omit. Apache-2.0 licensing allows teams to inspect and extend the stack.

## Limitations

Training requires substantial GPU, sandbox, and API resources, and backend integrations evolve quickly. Reward design, trajectory quality, environment determinism, and benchmark contamination can dominate results; the framework does not make an RL run scientifically valid by itself.

## Relation to the Arsenal

It connects the Arsenal's training-and-alignment phase to agent systems and benchmark entries. Compared with SkillOpt, it updates model behavior through RL trajectories and environments; compared with ordinary trainers, it has a much higher operational cost.

## Resources

- [GitHub](https://github.com/rllm-org/rllm)
- [Documentation](https://docs.rllm-project.com/)
