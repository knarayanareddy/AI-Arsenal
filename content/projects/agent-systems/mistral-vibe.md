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
org_or_maintainer: "mistralai"
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
id: mistral-vibe
name: "Mistral Vibe"
artifact_type: tool
category: code-generation
subcategory: coding-agents
description: "Mistral's open-source CLI coding assistant with subagents, delegated tasks, skills, and a voice mode"
github_url: https://github.com/mistralai/mistral-vibe
license: "Apache-2.0"
primary_language: "Python"
tags:
  - "code-gen"
  - "agents"
  - "orchestration"
  - "tool-use"
  - "voice"
maturity: beta
cost_model: open-source
github_stars: 4709
last_commit: "2026-07-17"
docs_url: https://pypi.org/project/mistral-vibe
phase: agent-system
domain:
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "org-backed"
  - "actively-maintained"
ecosystem_role:
  - "Mistral open-source CLI coding assistant with skills and subagents"
  - "Terminal alternative for delegated repository work and voice interaction"
best_for:
  - "Terminal coding assistance with delegated subagents"
  - "Exploring reusable skills for repository work"
avoid_if:
  - "You need a non-interactive CI reviewer with deterministic output"
  - "Your team cannot permit an agent to read or modify local repositories"
enrichment_notes: "The CLI is an active open-source project, but coding-agent quality and tool permissions remain model- and repository-dependent. Draft pending review."
---

## Overview

Mistral Vibe brings an interactive coding-agent experience to a Python CLI, emphasizing delegation and reusable skills rather than one monolithic prompt. Voice mode broadens the interaction model, while the Apache-2.0 repository lets teams inspect how the assistant handles terminal-oriented work.

## Why it's in the Arsenal

Mistral Vibe earns a place as an open CLI coding assistant that exposes subagents, delegated tasks, a skills system, and voice interaction in one operator-facing workflow. Apache-2.0 licensing and a PyPI distribution make it a useful counterpart to hosted terminal agents for teams evaluating Mistral's coding stack.

## Architecture

The runtime combines a main coding agent with subagents, task delegation, and a skills system that packages repeatable instructions or capabilities. It runs at the command line and depends on a configured model/provider, so filesystem access, shell execution, and repository context are central parts of the architecture.

## Ecosystem Position

Mistral Vibe competes with terminal assistants such as Claude Code and Codex while complementing local inference servers and repository tools. Its skills and subagent model provide an alternative workflow for teams already using Mistral models, but it is not itself a sandbox, CI gate, or code-review benchmark.

## Getting Started

Install the published Python package from PyPI in an isolated environment, configure the Mistral model endpoint and repository permissions, and launch the Vibe CLI from a test checkout. Exercise one skill and one delegated subtask first, then review shell access and model spend before enabling voice mode.

## Key Use Cases

Use Vibe for interactive repository changes, delegating independent investigation tasks, and packaging recurring coding guidance as reusable skills. Voice mode can support hands-busy exploration, but generated commands and edits still need the same review gates as any terminal agent.

## Strengths

The CLI combines a skills system with subagent delegation instead of relying on one undifferentiated conversation. Apache-2.0 source, Python packaging, and voice mode give developers both inspectability and a broader interaction surface for coding work.

## Limitations

A coding agent can execute unsafe shell commands, expose source code to a provider, or make plausible but incorrect edits. Voice input can introduce ambiguity, and subagent delegation increases cost and traceability requirements; teams should establish repository permissions, review gates, and reproducible model settings before broad rollout.

## Relation to the Arsenal

Mistral Vibe complements Claude Code, Codex, Open Code Review, and local inference endpoints, while competing with terminal coding assistants. It is an operator tool above shell and repository access, not a CI reviewer, sandbox, or model-serving engine.

## Resources

- [GitHub](https://github.com/mistralai/mistral-vibe)
- [PyPI](https://pypi.org/project/mistral-vibe)
