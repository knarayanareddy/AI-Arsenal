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
github_stars_last_30d: 20
trending_score: 32
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: agent-lightning
name: Agent Lightning
artifact_type: framework
category: agents
subcategory: fine-tuning
description: A Microsoft framework for training and optimizing AI agents, including reinforcement learning, that decouples the training loop from any existing agent
github_url: https://github.com/microsoft/agent-lightning
license: MIT
primary_language: Python
tags:
  - agents
  - fine-tuning
  - llm
  - self-hosted
maturity: beta
cost_model: open-source
github_stars: 17401
last_commit: '2026-07-16'
docs_url: https://github.com/microsoft/agent-lightning
phase: training-and-alignment
domain:
  - language
relation_to_stack:
  - build-on-top
  - study-and-reference
health_signals:
  - actively-maintained
  - org-backed
ecosystem_role:
  - A training layer that optimizes agents via RL and other methods without rewriting the agent's code.
best_for:
  - You want to improve an existing agent with reinforcement learning without rebuilding it around a trainer
  - You are researching agent optimization and need a framework that separates rollout from training
avoid_if:
  - You only need to run agents, not train them, where an agent runtime alone suffices
  - You lack reward signals or environments to drive the optimization loop
enrichment_notes: Repository, MIT license, and 2026-04-29 activity verified via the GitHub API on 2026-07-12. Emerging area; expect setup effort to wire rewards and environments.
---

## Overview

Agent Lightning is a Microsoft framework for training and optimizing AI agents, including with reinforcement learning. Its central design choice is decoupling the training loop from the agent implementation, so an agent built with almost any framework can be optimized by connecting it to Agent Lightning's trainer with minimal code changes rather than being rewritten around a specific training harness.

## Why it's in the Arsenal

Improving agents through learning, not just prompt tweaks, is an emerging frontier, and Agent Lightning's implementation-agnostic training design is a distinct and forward-looking entry for the training-and-alignment area.

## Architecture

The framework separates two roles: the agent produces rollouts (trajectories of observations, actions, and rewards) during execution, and a training server consumes those trajectories to update the model via RL or other optimization. A lightweight client instruments an existing agent to emit the needed signals, and the trainer handles the reinforcement-learning algorithm, reward aggregation, and model updates, so the agent code stays largely intact while becoming trainable.

## Ecosystem Position

Agent Lightning complements agent runtimes and frameworks (which run agents) by adding a training layer, and it relates to RL libraries and to agent-optimization research. Compared with prompt-optimization tools it changes model weights through experience rather than editing prompts, and compared with tightly coupled RL frameworks it differentiates by working alongside your existing agent rather than replacing it.

## Getting Started

Install from the repository, wrap your existing agent with the provided client to emit trajectories and rewards, configure the training server with an RL recipe and base model, and run the optimization loop against your task environment.

## Key Use Cases

Reinforcement-learning optimization of existing agents; improving tool-use and multi-step reasoning from experience; research on agent training; turning evaluation feedback into weight updates.

## Strengths

Implementation-agnostic training design, reinforcement-learning support, minimal changes to existing agents, Microsoft backing, and an MIT license.

## Limitations

It requires reward signals and environments to be useful, agent RL is complex and sample-hungry, the area is young with evolving APIs, and wiring rollouts and rewards takes engineering effort.

## Relation to the Arsenal

It links the agent frameworks to the training-and-alignment area by making agents trainable.

## Resources

- [GitHub repository](https://github.com/microsoft/agent-lightning)
