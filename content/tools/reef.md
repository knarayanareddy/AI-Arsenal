---
id: reef
name: reef
type: tool
job:
  - Continual learning and self-improvement infrastructure for LLM agents
description: Infrastructure for continually self-improving agents using reinforcement learning, reflection tokens, and automated trajectory collection.
url: https://github.com/Human-Agent-Society/reef
cost_model: open-source
pricing_detail: Free and open-source under the Apache-2.0 license.
tags:
  - agent-infrastructure
  - ai-agents
  - continual-learning
  - reinforcement-learning
  - self-improving-agents
  - llm-training
maturity: beta
stack: [Python, PyTorch, vLLM, Ray]
free_tier: True
self_hostable: True
open_source: True
added_date: 2026-10-20
last_reviewed: 2026-10-20
added_by: repo-maintainer
verdict: recommended
verdict_rationale: REEF provides a much-needed, production-oriented framework for closed-loop, continual learning of LLM agents. By bridging online inference trace gathering with off-policy RL fine-tuning and reflection token mechanics, it solves the gap between static prompt-engineering and true agent adaptation.
status: active
phase: orchestration
audience:
  - ML Research Engineers
  - Autonomous Agent Platform Teams
  - Applied AI System Architects
best_when: You need to continuously train autonomous agents on real-world execution trajectories, leveraging reflection, self-critique, and reinforcement learning loops.
avoid_when: You only require static prompt orchestration or simple stateless LLM chain pipelines without online policy updates or fine-tuning infrastructure.
github_url: https://github.com/Human-Agent-Society/reef
docs_url: null
---

## Overview

REEF (Human-Agent-Society/reef) is a specialized open-source infrastructure designed for building and fine-tuning continually self-improving LLM agents. Unlike traditional agent frameworks that rely solely on fixed in-context prompts or static vector store retrievals, REEF treats agent execution as an iterative, reinforceable control loop. It decouples trajectory generation from policy update steps, allowing live interaction logs to feed directly into continuous reinforcement learning (RL) and fine-tuning pipelines.

At its core, REEF operationalizes advanced self-reflection paradigms—such as Self-RAG—by training underlying language models to generate special critique and reflection tokens (`[Retrieval]`, `[IsRel]`, `[IsSup]`, `[IsUse]`). These tokens enable agents to dynamically evaluate when to retrieve external knowledge, assess the quality of context, and critique intermediate reasoning steps before delivering a final action. The framework handles trajectory capture, reward signal assignment, replay buffer management, and distributed policy optimization across GPU clusters.

By unifying inference environments with distributed RL training harnesses (e.g., integrating Ray and vLLM), REEF allows engineers to establish automated feedback loops. Agents operating under REEF continually update their weights based on success metrics, environment feedback, and post-hoc self-critique, preventing catastrophic forgetting through disciplined off-policy optimization routines.

## Why It's in the Arsenal

REEF addresses the fundamental limitation of static agent architectures: the inability to improve underlying policy parameters without manual dataset curation. It shifts agent improvement from manual prompt adjustments to continuous, automated RL finetuning on domain-specific execution trajectories.

The framework excels in its tight integration of reflection-token mechanics within the decoding loop. Rather than treating evaluation as an external post-processing step, REEF incorporates critique tokens into the model's action space, exposing fine-grained reward boundaries that allow fine-tuning algorithms to penalize hallucination and unhelpful retrieval immediately.

Furthermore, REEF provides a robust, decoupled architecture separating trajectory collection nodes from policy trainer nodes. This permits multi-agent scaling across dynamic environments while concurrently streaming training data to Ray-backed RL workers without slowing down real-time inference pipelines.

## Key Features

Trajectory Buffer & Rollout Engine: Captures state-action-reward step sequences from live multi-agent execution environments into structured replay buffers suitable for PPO, DPO, or off-policy RL algorithms.

Reflection Token Integration: Native support for decoding-time reflection and critique tokens, allowing models to make explicit probabilistic decisions regarding retrieval triggering and generation quality.

Distributed Policy Training: Leverages Ray and PyTorch pipelines to scale model fine-tuning across multi-node GPU setups without interrupting active agent sampling threads.

vLLM Engine Integration: Tight coupling with high-throughput inference backends (vLLM) to optimize candidate sampling and trajectory generation speeds during RL exploration phases.

Configurable Reward Functions: Provides abstractions for environment-driven rewards, model-based self-critique scores, and external rule-based verification heuristics.

## Trade-offs

High Operational Footprint: Implementing a full REEF pipeline requires dedicated distributed GPU infrastructure to run simultaneous generation environments and continuous RL training jobs.

Complexity in Reward Shaping: Misconfigured reward functions or faulty reflection heuristics can lead to policy collapse or extreme reward hacking, where agents emit false high-reward reflection tokens without improving target task resolution.

Dependency Stack Heavy: Relies heavily on complex distributed frameworks like Ray, PyTorch distributed, and vLLM; alignment across system CUDA drivers, PyTorch versions, and C++ inference extensions demands rigorous CI/CD maintenance.
