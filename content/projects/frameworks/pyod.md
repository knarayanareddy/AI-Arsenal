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
org_or_maintainer: "yzhao062"
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
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: pyod
name: "PyOD"
artifact_type: library
category: tooling
subcategory: libraries
description: "A comprehensive Python library for anomaly and outlier detection with 60+ algorithms spanning classical, ensemble"
github_url: https://github.com/yzhao062/pyod
license: "BSD-2-Clause"
primary_language: "Python"
tags:
  - "self-hosted"
  - "evaluation"
maturity: production
cost_model: open-source
github_stars: 9913
last_commit: "2026-06-17"
docs_url: https://pyod.readthedocs.io/
phase: framework
domain:
  - "general-purpose"
relation_to_stack:
  - "build-on-top"
  - "deploy-as-is"
health_signals:
  - "actively-maintained"
  - "community-driven"
ecosystem_role:
  - "The standard Python toolkit for outlier/anomaly detection with a scikit-learn-style unified API across many detectors."
best_for:
  - "You need outlier or anomaly detection with many algorithms behind one consistent, scikit-learn-style API"
  - "You want to benchmark multiple detectors quickly, including deep-learning-based ones, on the same data"
avoid_if:
  - "Your problem is supervised classification rather than unsupervised anomaly detection"
  - "You need a managed streaming anomaly-detection service rather than a library"
enrichment_notes: "Repository, BSD-2-Clause license, and 2026-06-17 activity verified via the GitHub API on 2026-07-12. Detector choice and thresholds require domain validation."
---

## Overview

PyOD is a comprehensive Python library for detecting anomalies and outliers in data. It implements more than 60 detection algorithms, spanning classical statistical methods, proximity- and ensemble-based detectors, and deep-learning approaches, behind a consistent scikit-learn-style API, making it the de facto standard toolkit for outlier detection across tabular and other data types.

## Why it's in the Arsenal

Anomaly detection underpins data-quality monitoring, fraud/abuse detection, and observability, and PyOD's unified access to many detectors makes it a practical, foundational tooling entry that complements the observability and evaluation areas.

## Architecture

PyOD exposes every detector through a common `fit`/`decision_function`/`predict` interface with calibrated anomaly scores, so algorithms as different as Isolation Forest, k-NN, HBOS, and autoencoder-based detectors are interchangeable. It integrates with the scientific Python stack (NumPy, scikit-learn, and PyTorch for deep detectors), provides model combination and thresholding utilities, and includes benchmarking helpers to compare detectors on the same dataset.

## Ecosystem Position

PyOD competes with scattered per-algorithm implementations and with scikit-learn's limited outlier tools, differentiating on breadth and a unified API. It complements observability and data-quality tools by providing the detection algorithms behind them, and compared with a managed anomaly-detection service it is a self-hosted library you embed rather than an operated system.

## Getting Started

Install with `pip install pyod`, import a detector such as `from pyod.models.iforest import IForest`, call `fit(X)`, then use `decision_scores_` or `predict(X)` for anomaly labels; the docs show combining and benchmarking multiple detectors.

## Key Use Cases

Outlier detection in tabular data; data-quality and drift monitoring; fraud and intrusion detection features; benchmarking anomaly-detection algorithms.

## Strengths

60+ detectors under one API, classical-to-deep coverage, scikit-learn compatibility, benchmarking and model-combination utilities, production maturity, and a permissive BSD license.

## Limitations

It targets unsupervised anomaly detection rather than supervised tasks, detector and threshold selection require domain validation, and deep detectors add heavier dependencies and compute.

## Relation to the Arsenal

It provides detection algorithms that support the observability, evaluation, and data-pipeline areas.

## Resources

- [GitHub repository](https://github.com/yzhao062/pyod)
- [Documentation](https://pyod.readthedocs.io/)
