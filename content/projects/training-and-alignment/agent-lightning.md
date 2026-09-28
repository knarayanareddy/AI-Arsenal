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
org_or_maintainer: "microsoft"
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
trending_score: 0
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: agent-lightning
name: "Agent Lightning"
artifact_type: framework
category: agents
subcategory: fine-tuning
description: "Microsoft's roughly 3,500-line agentic RL framework that inserts a proxy between your agent and its model so a real harness can be trained without modification"
github_url: "https://github.com/microsoft/agent-lightning"
license: MIT
primary_language: Python
tags: [agents, llm]
maturity: beta
cost_model: open-source
github_stars: 18521
last_commit: "2026-09-28"
docs_url: "https://microsoft.github.io/agent-lightning/stable/"
phase: training-and-alignment
domain:
  - "language"
relation_to_stack:
  - "build-on-top"
  - "study-and-reference"
health_signals:
  - "actively-maintained"
  - "org-backed"
ecosystem_role:
  - "A training layer that optimizes agents via RL and other methods without rewriting the agent's code."
best_for: ["You have a working agent with tools and environments and you want to train it with RL, but cannot justify rewriting the agent to expose the training loop supervised fine-tuning frameworks expect.", "You are training a coding agent and want a reproducible reference pipeline, since the repository releases the full setup including data cleaning, reward-hacking prevention and training scripts alongside a reported SWE-bench Verified improvement on Qwen3.5-9B.", "Your rollouts are expensive or stateful and need isolation, because the rollout controller can run each agent as a Kubernetes Job rather than depending on an external sandbox service."]
avoid_if: ["You are on a single GPU with no appetite for a full training stack, because installation drives uv plus a verl setup script and the documented example is a CUDA 13.0 machine.", "You are still relying on pre-1.0 behaviour, because v1.0 was a complete refactor and older releases live on a separate v0.x branch with different internals and configuration.", "You need a peer-reviewed result rather than a project self-report, because the headline improvement numbers come from the project's own benchmark run and have not been independently reproduced."]
enrichment_notes: "Repository, MIT license, and 2026-04-29 activity verified via the GitHub API on 2026-07-12. Emerging area; expect setup effort to wire rewards and environments."
---

## Overview

Agent Lightning treats an agent as a black box that talks to a model. Instead of asking you to expose training hooks, it routes model traffic through a proxy it controls: whatever the agent sends and receives becomes trajectory data the trainer can consume. Version 1.0 was a full rewrite that deliberately kept the codebase small at around 3,500 lines, split into three components - a Trainer running verl and vLLM to build samples and update the policy, an API Gateway that proxies model calls and captures the data, and a Rollout Controller that launches agents locally or as Kubernetes Jobs. The claim is that the agent keeps its real harness, tools, context management, control flow and environment, with zero changes required on your side.

## Why it's in the Arsenal

The engineering decision is whether reinforcement learning on agents requires giving up your harness. Traditional RL fine-tuning assumes a training loop you wrote; an agent is a multi-turn program with tools, state and side effects, and converting one into the other is where most agentic RL work stalls. Inserting a proxy in the model path sidesteps that, which means you can take an agent that already works and improve it without a rewrite. The price is the verl and vLLM training stack underneath, plus Kubernetes if you want the rollout isolation the controller provides, and a codebase young enough that the v1.0 refactor reset everyone's mental model.

## Architecture

The data path runs in one direction. The Trainer creates rollouts and asks the Rollout Controller to launch agent processes; the controller runs them either as local processes or as Kubernetes Jobs, which is what lets each rollout get a clean environment without a third-party sandbox service. Every model call an agent makes passes through the API Gateway, a reverse proxy in front of the served model; it observes request and response pairs and turns the sequence into training data - a trajectory of interleaved tool calls, observations and model turns. That data is aggregated into training samples and handed to the Trainer, which runs verl with vLLM for the policy update. Because the gateway is a real proxy, the agent's existing HTTP client configuration is the only integration point, and an asynchronous mode supports collecting rollouts while training with pause and drain semantics. Example workloads cover AutoGen with MCP calculator tools, GSM8K-style maths, and a full coding agent pipeline.

## Ecosystem Position

It sits in the same territory as open-r1 and ms-swift, which also derive from reinforcement learning tooling, but competes with them on a different axis: those expect you to supply a training loop, while this one expects you to supply a finished agent. Where it genuinely overlaps is with verl, which Agent Lightning runs internally as its RL backend, so you get verl's algorithms through this project rather than calling it directly. It complements entries in content/projects/training-and-alignment such as trl or peft-library for the cases where supervised tuning is the right tool and RL on agent trajectories is overkill. Compared with the serving entries in content/projects/inference-engines, vLLM appears here as the rollout inference engine rather than as a product you operate.

## Getting Started

The documented path installs the repo and runs a setup script that builds the verl GPU stack for your CUDA version:

```bash
cd <this-repo>
uv sync
bash scripts/setup_verl.sh 0.8.0 cu130
```

The installation guide covers the base environment and the verl GPU stack; the quick start page walks a local first run end to end, and the Calc-X example is documented as needing only a single GPU.

## Key Use Cases

1. Train an existing coding agent: leave the harness exactly as it is, point its model traffic at the gateway, and let the trainer learn from trajectories that already occur in real use.
2. Reproduce the reference result: run the released coding-agent pipeline, including data cleaning and reward-hacking prevention, on a 9B-class model and compare against the reported baseline.
3. Isolate expensive rollouts: run each agent episode as a Kubernetes Job so a tool call that breaks the environment does not poison the training run.

## Strengths

- Zero modification required to the agent under training, which is the whole premise and the reason an existing working harness can be improved at all.
- Around 3,500 lines is a genuinely small codebase for an RL system, which makes the data path readable end to end.
- Native Kubernetes rollouts remove the external sandbox service most agentic RL setups depend on.
- The full pipeline is released, not just the framework, including the data cleaning and reward-hacking prevention that would otherwise be your problem.

## Limitations

The hard dependency is the training stack: verl and vLLM, CUDA, and the setup script's version matrix, which makes a trial expensive relative to a library install. The 3,500-line figure cuts both ways - it is a design choice, but it also means fewer of the production concerns in a mature RL system are handled for you. Evaluation is narrow: the reported domains are Search R1, LLM-in-Sandbox and a coding agent, so transfer to your workload is an assumption rather than a result. The v1.0 refactor is recent and the pre-1.0 branch is documented separately, so any configuration or example from before will not line up. And the trajectory-capture design means anything that does not go through the gateway is invisible to the trainer, which matters if your agent talks to a model out of band.

## Relation to the Arsenal

This is the reinforcement-learning entry in content/projects/training-and-alignment, sitting alongside the supervised-tuning tools such as peft-library, trl and unsloth rather than replacing them. The rollout inference engine it depends on is catalogued in content/projects/inference-engines, and the agent frameworks in content/projects/frameworks supply the harnesses you would be training. If the question is observability rather than training, the evaluation-and-observability phase holds the tracing tools instead.

## Resources

- [GitHub — microsoft/agent-lightning](https://github.com/microsoft/agent-lightning)
- [Official documentation](https://microsoft.github.io/agent-lightning/stable/)
- [Technical report on arXiv](https://arxiv.org/pdf/2608.17528)
