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
org_or_maintainer: Tencent
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
id: ai-infra-guard
name: AI Infra Guard
artifact_type: platform
category: evaluation
subcategory: evaluation
description: AI red-team platform covering agent, skills, MCP, infrastructure, and jailbreak evaluation
github_url: https://github.com/Tencent/AI-Infra-Guard
license: Apache-2.0
primary_language: Python
tags:
  - evaluation
  - security
  - guardrails
  - agents
  - tool-use
  - benchmark
maturity: beta
cost_model: open-source
github_stars: 4093
last_commit: '2026-07-08'
docs_url: https://github.com/Tencent/AI-Infra-Guard
phase: benchmark-and-eval
domain:
  - language
  - safety-and-alignment
relation_to_stack:
  - deploy-as-is
  - study-and-reference
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A security evaluation and red-team surface for agent ecosystems and their surrounding infrastructure.
best_for:
  - You need the AI Infra Guard problem space covered by an open-source component
  - You can evaluate the current release against your own data, deployment, and operational constraints
avoid_if:
  - You need an independently verified production guarantee rather than a candidate component
  - You cannot review licenses, permissions, model dependencies, and failure behavior before adoption
enrichment_notes: Repository metadata, license, language, and latest activity were reviewed on 2026-07-11. Capability, maturity, and production-fit claims remain draft.
---

## Overview

AI Infra Guard is ai red-team platform covering agent, skills, mcp, infrastructure, and jailbreak evaluation.

## Why it's in the Arsenal

AI Infra Guard is a fresh candidate for the benchmark-and-eval layer because it addresses a concrete engineering decision and has an inspectable open-source implementation.

## Architecture

The repository provides the core implementation and integrations described by its official documentation. This entry keeps the architecture summary deliberately high-level until a hands-on run confirms the exact execution, storage, model, and deployment boundaries.

## Ecosystem Position

It complements adjacent AI model, data, agent, serving, and evaluation components. Compare it by operational surface, evidence, compatibility, and license—not by star count alone.

## Getting Started

Follow the official repository setup, pin versions, run a minimal example, and measure the behavior that matters for your workload before enabling real data or side effects.

## Key Use Cases

- You need the AI Infra Guard problem space covered by an open-source component
- You can evaluate the current release against your own data, deployment, and operational constraints

## Strengths

- Clear problem focus and inspectable source
- Open license and active repository development

## Limitations

- Independent production evidence is not established in this first pass
- Compatibility, operational cost, and security boundaries require workload-specific testing

## Relation to the Arsenal

This benchmark-and-eval project should be evaluated alongside the relevant AI Arsenal tools, architectures, build examples, and research entries.

## Resources

- [Official source](https://github.com/Tencent/AI-Infra-Guard)
