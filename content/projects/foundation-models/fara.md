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
added_date: "2026-07-19"
last_reviewed: "2026-07-19"
added_by: maintainer
status: active
id: fara
name: "Fara"
artifact_type: model
category: agents
subcategory: open-source-models
description: "Microsoft's Fara-7B multimodal agentic model for computer use, with browser-task training and the WebTailBench benchmark"
github_url: https://github.com/microsoft/fara
license: "MIT"
primary_language: "Python"
tags:
  - "agents"
  - "multimodal"
  - "vision"
  - "tool-use"
  - "benchmark"
maturity: beta
cost_model: open-source
github_stars: 6015
last_commit: "2026-06-16"
docs_url: https://aka.ms/msaif/fara
phase: foundation-model
domain:
  - "vision"
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "org-backed"
  - "research-origin"
ecosystem_role:
  - "Provides a focused building block for downstream AI workflows"
best_for:
  - "Browser and desktop task automation research"
  - "Evaluating multimodal computer-use trajectories"
avoid_if:
  - "You need safe unattended control of sensitive production accounts"
  - "Your tasks are better served by a conventional API integration"
enrichment_notes: "Fara is a research-oriented computer-use model; WebTailBench and model claims should be independently reproduced. Draft pending review."
---

## Overview

Fara-7B is designed to turn screenshots and task instructions into computer actions, targeting browser and web workflows rather than ordinary chat. The inclusion of WebTailBench makes the repository useful both as a model and as a concrete evaluation reference for agent trajectories.

## Why it's in the Arsenal

This entry adds a concrete, currently relevant building block to the Arsenal: its README exposes a runnable workflow rather than only a paper, while its open repository makes the integration boundary inspectable for engineers. Fara is especially useful because browser-agent trajectory research.

## Architecture

The multimodal model consumes visual screen state and language goals, then predicts the next action in a browser-oriented loop. In practice it needs an execution harness, coordinate or DOM grounding, and a sandbox; the model alone is not an authorization layer or a reliable transaction executor.

## Ecosystem Position

Fara complements browser-agent frameworks and competes with proprietary computer-use models. Its open MIT release is useful for studying the policy/model boundary, but it sits below a complete agent system: orchestration, browser isolation, credential handling, and human approval remain application responsibilities.

## Getting Started

Begin with the linked README and documentation, install the project in an isolated environment, and reproduce the smallest supplied example before connecting it to production data or an agent loop. For Fara, consult the GitHub entry first.

## Key Use Cases

The strongest fits are Browser-agent trajectory research; Sandboxed web task automation experiments. These scenarios keep the project's intended interface visible and avoid implying capabilities that the README does not promise.

## Strengths

An open 7B computer-use model paired with a named benchmark gives engineers a concrete baseline for multimodal agent evaluation.

## Limitations

Computer-use policies can click the wrong control, leak sensitive screen content, or fail when layouts change. WebTailBench is a useful baseline, not proof of safe deployment; GPU serving and visual latency matter, and browser tasks involving payments, deletion, or authentication require explicit guardrails and human takeover.

## Relation to the Arsenal

Fara sits at a distinct boundary in the catalog: provides a focused building block for downstream ai workflows. Teams can connect its outputs to adjacent model, tool, or workflow entries, while retaining ownership of deployment policy and workload-specific evaluation.

## Resources

- [GitHub](https://github.com/microsoft/fara)
- [Project page](https://aka.ms/msaif/fara)
