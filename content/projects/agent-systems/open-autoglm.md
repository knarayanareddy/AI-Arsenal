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
org_or_maintainer: "zai-org"
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
id: open-autoglm
name: "Open-AutoGLM"
artifact_type: framework
category: agents
subcategory: autonomous
description: "Z.ai's Phone Agent framework that uses AutoGLM, VLM screen perception, planning, and ADB to control Android applications with confirmation and takeover paths"
github_url: https://github.com/zai-org/Open-AutoGLM
license: "Apache-2.0"
primary_language: "Python"
tags:
  - "agents"
  - "multimodal"
  - "vision"
  - "planning"
  - "tool-use"
maturity: alpha
cost_model: open-source
github_stars: 25822
last_commit: "2026-03-06"
docs_url: https://autoglm.z.ai/blog
phase: agent-system
domain:
  - "multimodal"
relation_to_stack:
  - "deploy-as-is"
  - "study-and-reference"
health_signals:
  - "org-backed"
  - "research-origin"
ecosystem_role:
  - "Provides a focused building block for downstream AI workflows"
best_for:
  - "Android automation research with visual screen understanding"
  - "Human-supervised phone-agent prototypes"
avoid_if:
  - "You need unattended control over banking or sensitive mobile workflows"
  - "You cannot provision ADB-enabled devices and manual takeover"
enrichment_notes: "The March 2026 commit is intentionally not labeled actively-maintained; the README limits use to research and learning and includes privacy/legal warnings. Draft pending review."
---

## Overview

Open-AutoGLM packages a phone agent around AutoGLM-Phone-9B models: a natural-language request is grounded in the current screen, converted into a plan, and executed through Android Debug Bridge. Sensitive-operation confirmation and human takeover acknowledge that mobile automation needs a stronger safety boundary than a generic tool call.

## Why it's in the Arsenal

This entry adds a concrete, currently relevant building block to the Arsenal: its README exposes a runnable workflow rather than only a paper, while its open repository makes the integration boundary inspectable for engineers. Open-AutoGLM is especially useful because supervised android ui-agent research.

## Architecture

The Python framework combines VLM perception, planning, action execution, and remote ADB over USB or network. It supports Android 7+ preparation and multilingual model variants; an external device, keyboard/input setup, and an automation harness remain part of the deployment architecture.

## Ecosystem Position

Open-AutoGLM complements UI automation SDKs such as Midscene.js and competes with mobile agent research stacks. It is closer to a reference framework than a hardened device-management platform: the model supplies perception and planning, while application owners must provide policy checks, sandbox devices, and approval UX.

## Getting Started

Begin with the linked README and documentation, install the project in an isolated environment, and reproduce the smallest supplied example before connecting it to production data or an agent loop. For Open-AutoGLM, consult the GitHub entry first.

## Key Use Cases

The strongest fits are Supervised Android UI-agent research; Testing visual planning on a dedicated device. These scenarios keep the project's intended interface visible and avoid implying capabilities that the README does not promise.

## Strengths

Combines real-device ADB control, VLM perception, planning, confirmation, and human takeover in an accessible reference implementation.

## Limitations

The repository is research/learning-only, stale by the catalog date, and mobile actions can have irreversible side effects. VLM screen errors, changing app layouts, login/CAPTCHA interruptions, ADB permissions, and network exposure all require defensive testing; never grant it unsupervised access to sensitive accounts.

## Relation to the Arsenal

Open-AutoGLM sits at a distinct boundary in the catalog: provides a focused building block for downstream ai workflows. Teams can connect its outputs to adjacent model, tool, or workflow entries, while retaining ownership of deployment policy and workload-specific evaluation.

## Resources

- [GitHub](https://github.com/zai-org/Open-AutoGLM)
- [Project blog](https://autoglm.z.ai/blog)
