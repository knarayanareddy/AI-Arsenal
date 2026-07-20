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
org_or_maintainer: leon-ai
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 13
trending_score: 31
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: leon
name: Leon
artifact_type: platform
category: agents
subcategory: autonomous
description: An open-source, self-hosted personal assistant with a modular skill system, on-device speech, and a privacy-first design that runs entirely on your own server
github_url: https://github.com/leon-ai/leon
license: MIT
primary_language: TypeScript
tags:
  - agents
  - self-hosted
  - multimodal
maturity: beta
cost_model: open-source
github_stars: 17366
last_commit: '2026-07-20'
docs_url: https://docs.getleon.ai/
phase: agent-system
domain:
  - language
  - audio
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A self-hosted, privacy-first personal assistant with a modular, extensible skill system and voice interface.
best_for:
  - You want a private, self-hosted voice/text assistant you fully control rather than a cloud service
  - You want to write custom skills to automate personal tasks in an extensible assistant
avoid_if:
  - You want the broad general knowledge and polish of a large hosted assistant out of the box
  - You do not want to operate and extend a self-hosted server
enrichment_notes: Repository, MIT license, and 2026-06-29 activity verified via the GitHub API on 2026-07-12. Capability depends on installed skills and configured models.
---

## Overview

Leon is an open-source personal assistant you host on your own server. Designed privacy-first, it can take text or voice input, run tasks through a modular skill system, and reply in text or synthesized speech, optionally routing reasoning through configurable LLM models, all locally, positioning itself as a self-controlled alternative to cloud voice assistants.

## Why it's in the Arsenal

A self-hosted, privacy-preserving assistant with an extensible skill architecture is a distinct point in the agents space, and Leon is the best-known open project of that kind, making it a useful entry for privacy-conscious automation.

## Architecture

Leon runs a Node/TypeScript core that coordinates a spoken-language-understanding pipeline (intent classification and entity extraction) with a Python bridge that executes skills. Skills are self-contained modules declaring intents and actions, an on-device text-to-speech and speech-to-text layer handles voice, and modern versions can route reasoning through configurable LLMs, so capabilities extend by adding skills rather than changing the core.

## Ecosystem Position

Leon competes with cloud assistants like Alexa and Google Assistant and with other open assistants, differentiating on being fully self-hosted and privacy-first with an open skill system. Compared with hosted assistants it trades broad general knowledge and polish for control and data privacy, and compared with bare agent libraries it ships an end-user assistant with voice rather than a toolkit.

## Getting Started

Clone the repository, install the Node and Python dependencies, run the setup to fetch models, start the server, and interact via the web interface or voice; custom skills are added as modules in the skills directory.

## Key Use Cases

Private self-hosted voice/text assistant; personal task automation via custom skills; offline-leaning home assistant; a base for experimenting with assistant architectures.

## Strengths

Fully self-hosted and privacy-first, modular extensible skills, built-in speech input/output, configurable LLM routing, active maintenance, and an MIT license.

## Limitations

Out-of-the-box general knowledge and polish trail large hosted assistants, capability depends on installed skills and configured models, and it requires operating and extending a self-hosted server.

## Relation to the Arsenal

It represents the self-hosted personal-assistant pattern in the agents area alongside the developer-focused frameworks.

## Resources

- [GitHub repository](https://github.com/leon-ai/leon)
- [Documentation](https://docs.getleon.ai/)
