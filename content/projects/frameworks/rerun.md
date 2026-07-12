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
org_or_maintainer: Rerun
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
id: rerun
name: Rerun
artifact_type: platform
category: observability
subcategory: monitoring
description: Visualize, query, and stream multimodal and robotics data for AI development
github_url: https://github.com/rerun-io/rerun
license: Apache-2.0
primary_language: Rust
tags:
  - observability
  - multimodal
  - vision
  - data
  - monitoring
  - tracing
maturity: production
cost_model: open-source
github_stars: 11100
last_commit: '2026-07-10'
docs_url: https://github.com/rerun-io/rerun
phase: framework
domain:
  - vision
  - multimodal
  - general-purpose
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A visual observability and data platform for inspecting multimodal and robotics workloads during development and evaluation.
best_for:
  - You need synchronized images, tensors, poses, point clouds, or scalar signals visible alongside an AI run.
  - You want to replay and inspect multimodal behavior instead of debugging model output from text logs alone.
avoid_if:
  - You need a conventional metrics backend or distributed trace store with no visual artifact workflow.
  - You cannot control sensitive image, sensor, or user-data retention in the viewer and recorded data.
enrichment_notes: Official repository, Apache-2.0 license, Rust implementation, and 2026-07-10 activity were reviewed on 2026-07-11. Deployment and data-retention fit remain workload-specific.
---

## Overview

Rerun is an Apache-2.0 visualization and data platform for multimodal and robotics workloads. It records time-indexed images, tensors, point clouds, poses, text, and scalar signals so an engineer can replay a run and inspect how model inputs, intermediate data, and outputs changed together.

## Why it's in the Arsenal

Text traces are a poor debugging surface for a vision or robotics system. Rerun is included because it makes spatial and temporal artifacts inspectable, which can expose preprocessing, tracking, calibration, or model-failure issues that aggregate metrics hide. It is a complement to metrics and traces, not a replacement for them.

## Architecture

A Rust core and SDKs log typed entities into a time-aware recording. The viewer and server can replay or stream recordings, while the data model associates multiple timelines and entity paths with the same run. That supports synchronization of camera frames, detections, transforms, embeddings, and scalar health signals. The operational tradeoff is data volume: high-rate images and sensor streams require sampling, retention, and access policies rather than indiscriminate logging.

## Ecosystem Position

Rerun sits beside observability and evaluation systems at the multimodal data/debugging layer. It overlaps with experiment trackers and robotics visualization tools, but its differentiator is the unified time/entity view across visual and non-visual data. A team should keep conventional alerting, traces, and aggregate metrics for production SLOs.

## Getting Started

Instrument one representative pipeline stage and record a bounded sample of inputs, detections, poses, and outputs. Use the viewer to inspect a known failure, then measure recording overhead, viewer load time, storage growth, and redaction behavior before enabling continuous capture.

## Key Use Cases

- Debugging vision, robotics, and multimodal model pipelines with synchronized visual and numeric data.
- Replaying evaluation runs to compare preprocessing, model versions, or tracking behavior.

## Strengths

- Makes multimodal failure evidence visible instead of flattening it into text or scalar metrics.
- Active Rust project with a broad viewer/server/SDK surface and Apache-2.0 licensing.

## Limitations

- Recordings can contain sensitive images, sensor data, or user context and need retention and access controls.
- Visual replay complements but does not replace statistical evaluation, alerting, or distributed tracing.
- High-rate streams can create storage and network costs that must be budgeted explicitly.

## Relation to the Arsenal

Rerun is an observability/data project in the framework phase. Pair it with evaluation-quality checks, trace correlation, redaction, and cost controls when moving from development replay to production telemetry.

## Resources

- [Official source](https://github.com/rerun-io/rerun)
