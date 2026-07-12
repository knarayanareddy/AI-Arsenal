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
org_or_maintainer: browser-use
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
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: browser-harness
name: Browser Harness
artifact_type: framework
category: agents
subcategory: browser-agents
description: Self-healing browser-agent harness for completing tasks with LLM-driven web automation
github_url: https://github.com/browser-use/browser-harness
license: MIT
primary_language: Python
tags:
  - agents
  - tool-use
  - planning
  - security
  - self-hosted
maturity: beta
cost_model: open-source
github_stars: 15886
last_commit: '2026-07-11'
docs_url: https://github.com/browser-use/browser-harness
phase: agent-system
domain:
  - language
  - vision
  - general-purpose
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A browser execution and recovery layer that helps agents complete web tasks through persistent browser state, automation, and self-healing behavior
best_for:
  - You are evaluating browser-use agents with retries, persistent sessions, and recovery behavior
  - You can isolate browser credentials, network access, and side effects in a controlled environment
avoid_if:
  - You need a deterministic scraper or test runner without model variability
  - You cannot sandbox browser sessions or provide explicit approval for external side effects
enrichment_notes: Repository metadata, MIT license, and active July 2026 development were reviewed on 2026-07-11. Reliability, side-effect control, and browser security remain draft.
---

## Overview

Browser Harness is self-healing browser-agent harness for completing tasks with llm-driven web automation.

## Why it's in the Arsenal

Browser Harness is a fresh candidate for the agent-system layer because it addresses a concrete engineering decision rather than only presenting a model or marketing surface.

## Architecture

The repository's implementation, integrations, and operational boundaries should be read from the official source before production adoption. This entry records the high-level position without claiming independent verification.

## Ecosystem Position

It complements adjacent model, data, agent, serving, or evaluation components and should be compared by deployment surface, evidence, and tradeoffs rather than star count.

## Getting Started

Follow the official repository setup, pin versions, run a minimal example, and measure the behavior that matters for your workload before enabling real data or side effects.

## Key Use Cases

- A focused engineering use case aligned with the repository description
- A controlled evaluation or integration experiment

## Strengths

- Active official repository and a clear problem focus
- Explicit tradeoffs are documented rather than presented as unconditional recommendations

## Limitations

- Independent production evidence is not established in this first pass
- Compatibility, operational cost, and security boundaries need workload-specific testing

## Relation to the Arsenal

This is a agent-system project and should be evaluated alongside the relevant AI Arsenal tools, architectures, and build examples.

## Resources

- [Official source](undefined)
