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
org_or_maintainer: yzhao062
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
id: pyod
name: PyOD
artifact_type: library
category: evaluation
subcategory: libraries
description: Python anomaly-detection library covering tabular, time-series, graph, text, image, and audio data
github_url: https://github.com/yzhao062/pyod
license: BSD-2-Clause
primary_language: Python
tags:
  - evaluation
  - data
  - embeddings
  - multimodal
  - efficiency
  - research
maturity: production
cost_model: open-source
github_stars: 9900
last_commit: '2026-06-16'
docs_url: https://github.com/yzhao062/pyod
phase: framework
domain:
  - language
  - vision
  - audio
  - multimodal
relation_to_stack:
  - build-on-top
  - study-and-reference
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A broad detector library and workflow layer for anomaly and outlier detection in AI data and model pipelines.
best_for:
  - You need tested detector families or a common anomaly-scoring API across data modalities.
  - You can calibrate thresholds and validate detector behavior on domain-specific data.
avoid_if:
  - You need a general-purpose drift or quality policy without labeled baselines.
  - You cannot measure false positives, false negatives, or distribution shift for your use case.
enrichment_notes: Official repository, BSD-2-Clause license, current 3.6.x work, and 2026-06-16 activity were checked on 2026-07-11. Detector suitability remains data-dependent.
---

## Overview

PyOD is a Python library for detecting outliers and anomalies across tabular, time-series, graph, text, image, and audio data. Its current repository also describes detector orchestration and agent-oriented workflows.

## Why it's in the Arsenal

AI systems need anomaly checks for data, embeddings, outputs, and operational signals. PyOD offers a common detector surface, but an anomaly score is not automatically a production incident or a quality verdict; thresholding and validation remain application work.

## Architecture

The library exposes detector implementations, fit/score APIs, utility and persistence helpers, benchmarks, and modality-specific components. Newer workflow layers add planning or analysis around detectors, but the trust boundary still includes data preprocessing, model persistence, and threshold decisions.

## Ecosystem Position

PyOD sits in the framework/evaluation layer below data-quality and monitoring systems. It can feed an observability or validation pipeline, but it does not define a universal anomaly policy.

## Getting Started

Select a detector family, split representative normal and anomalous data, and establish a baseline before adding it to a pipeline. Pin persistence dependencies and record thresholds, features, calibration, and drift assumptions.

## Key Use Cases

- Outlier and anomaly detection for AI data pipelines
- Comparing detector families across structured and multimodal data

## Strengths

- Long-running open library with broad detector coverage
- Current work addresses persistence, multimodal inputs, and workflow ergonomics

## Limitations

- Detector quality and threshold stability depend strongly on data and operating conditions
- False positives and missed anomalies can be costly without calibrated labels and review paths

## Relation to the Arsenal

Use PyOD as a detector component alongside evaluation, monitoring, and incident-response practices. It complements but does not replace drift definitions or human review.

## Resources

- [Official source](https://github.com/yzhao062/pyod)
- [Official license](https://github.com/yzhao062/pyod/blob/master/LICENSE)
