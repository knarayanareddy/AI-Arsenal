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
  - "ADB-controlled Android phone-agent framework built on AutoGLM"
  - "Reference for supervised multimodal mobile automation and takeover"
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

Open-AutoGLM earns inclusion as a concrete phone-agent reference that combines AutoGLM perception with real Android control through ADB. Its sensitive-action confirmation and human takeover paths acknowledge the operational risks that are often omitted from screenshot-only agent demos.

## Architecture

The Python framework combines VLM perception, planning, action execution, and remote ADB over USB or network. It supports Android 7+ preparation and multilingual model variants; an external device, keyboard/input setup, and an automation harness remain part of the deployment architecture.

## Ecosystem Position

Open-AutoGLM complements UI automation SDKs such as Midscene.js and competes with mobile agent research stacks. It is closer to a reference framework than a hardened device-management platform: the model supplies perception and planning, while application owners must provide policy checks, sandbox devices, and approval UX.

## Getting Started

Prepare Python 3.10 or newer, install Android platform-tools and an Android 7+ device with USB debugging, then install the repository dependencies. Download AutoGLM-Phone-9B or its multilingual variant, verify `adb devices`, and run the supplied phone-agent command on a dedicated test phone.

## Key Use Cases

Use it for supervised Android UI automation experiments such as opening an app, searching, or navigating a form. Researchers can compare screen perception and planning across Chinese and multilingual model variants, while human takeover handles login, CAPTCHA, and other interruption points.

## Strengths

The framework combines VLM screen perception, natural-language planning, ADB action execution, remote debugging, sensitive-operation confirmation, and manual takeover. It also documents integration with Midscene.js and provides distinct Chinese and multilingual phone checkpoints.

## Limitations

The repository is research/learning-only, stale by the catalog date, and mobile actions can have irreversible side effects. VLM screen errors, changing app layouts, login/CAPTCHA interruptions, ADB permissions, and network exposure all require defensive testing; never grant it unsupervised access to sensitive accounts.

## Relation to the Arsenal

Open-AutoGLM complements Midscene.js and mobile-agent projects in the Arsenal, while competing with proprietary phone automation systems. It belongs at the agent-system layer above ADB and VLM checkpoints; device permissions, account security, and policy enforcement remain external.

## Resources

- [GitHub](https://github.com/zai-org/Open-AutoGLM)
- [Project blog](https://autoglm.z.ai/blog)
