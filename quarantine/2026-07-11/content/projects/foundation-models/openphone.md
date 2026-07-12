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
org_or_maintainer: HKUDS
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
id: openphone
name: OpenPhone
artifact_type: model
category: multimodal
subcategory: models
description: Open-source mobile-agent foundation model and phone-use toolkit for on-device GUI interaction
github_url: https://github.com/HKUDS/OpenPhone
license: Other
primary_language: Python
tags:
  - agents
  - multimodal
  - vision
  - tool-use
  - local
  - inference
maturity: beta
cost_model: open-source
github_stars: 876
last_commit: '2026-07-06'
docs_url: https://github.com/HKUDS/OpenPhone
phase: foundation-model
domain:
  - vision
  - multimodal
  - reasoning
relation_to_stack:
  - deploy-as-is
  - study-and-reference
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A mobile GUI-agent model and toolkit that combines learned visual interaction with deterministic phone macros and local execution
best_for:
  - Researching mobile computer-use agents under edge hardware and privacy constraints
  - Comparing model-driven phone actions with app maps or macro replay
avoid_if:
  - You need broad desktop/browser automation rather than phone-specific interaction
  - You require a stable production model license or general device coverage without reproducing the released setup
enrichment_notes: Official ACL 2026 repository, current phonecli work, and latest activity were reviewed on 2026-07-11. License interpretation, model coverage, and device reproducibility remain draft.
---

## Overview

OpenPhone is open-source mobile-agent foundation model and phone-use toolkit for on-device gui interaction.

## Why it's in the Arsenal

OpenPhone is a fresh candidate for the foundation-model layer because it addresses a concrete engineering decision and has an inspectable primary source.

## Architecture

The repository or paper provides the implementation/design described by its primary source. This entry keeps the architecture summary deliberately high-level until independent reproduction confirms exact operational boundaries.

## Ecosystem Position

It complements adjacent AI model, data, agent, serving, and evaluation components. Compare it by evidence, protocol, compatibility, and license—not by popularity alone.

## Getting Started

Follow the official source, pin versions, run a minimal example or reproduction, and measure the behavior that matters for your workload before enabling real data or side effects.

## Key Use Cases

- Researching mobile computer-use agents under edge hardware and privacy constraints
- Comparing model-driven phone actions with app maps or macro replay

## Strengths

- Clear problem focus and inspectable primary source
- Explicit tradeoffs are documented rather than presented as unconditional recommendations

## Limitations

- Independent production evidence is not established in this first pass
- Compatibility, operational cost, and security boundaries require workload-specific testing

## Relation to the Arsenal

This foundation-model project should be evaluated alongside the relevant AI Arsenal tools, architectures, build examples, and research entries.

## Resources

- [Primary source](https://github.com/HKUDS/OpenPhone)
