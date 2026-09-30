---
id: xtreme1
name: xtreme1
version_tracked: null
artifact_type: library
category: rag
subcategory: vector-databases
description: "An open-source annotation platform for images, 3D LiDAR point clouds, sensor fusion, and LLM preference data with RLHF"
github_url: "https://github.com/xtreme1-io/xtreme1"
license: Apache-2.0
primary_language: TypeScript
tags: [vision, rlhf, multimodal]
maturity: beta
cost_model: open-source
github_stars: 1322
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://docs.xtreme1.io/"
demo_url: null
phase: data-and-retrieval
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Covers the labeling modalities self-driving and multimodal teams actually ship on, plus the preference data LLMs now need."
best_for:
  - "You are labeling LiDAR or camera-LiDAR fusion data and need 3D boxes and tracking in one tool rather than separate scripts."
  - "You are building preference data for RLHF and need pairwise ranking with a working reward-model training loop."
  - "You need pre-labeling to cut annotation cost, with built-in models for 2D and 3D object detection running on your own GPU."
avoid_if:
  - "You cannot run NVIDIA containers, because the built-in pre-labeling model containers require CUDA and the NVIDIA Container Toolkit."
  - "You need hosted annotation with a vendor SLA and pay-per-task labor, since this is a self-hosted platform you operate."
  - "You are labeling text-only classification at small scale, where this is heavier than a spreadsheet or a form tool."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 1322, Apache-2.0, TypeScript, last commit 2026-09-28, topics, homepage. From README: v0.9.3, YOLOR pre-labeling, OpenPCDet and AB3DMOT, MobileNetV3 and openTSNE curation, Ontology Center, RLHF beta, 2 GB/10 GB floors, Docker requirements, T4-class GPU for model containers. Not confirmed."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Xtreme1 covers the modalities self-driving and multimodal teams actually label. Images get bounding boxes, polygons, polylines, and key points, with YOLOR-based pre-labeling. LiDAR and camera-LiDAR fusion datasets get 3D annotation integrated with OpenPCDet conventions and AB3DMOT for tracking, so a box produced here is usable by the detector training pipeline that consumes it. A configurable Ontology Center manages class hierarchies and attributes once and reuses them across datasets, which is what stops label drift when three annotators invent three names for the same thing. Beyond drawing boxes, the platform does curation and debugging - MobileNetV3 and openTSNE embeddings let you visualize a dataset's feature space and spot outliers and mislabeled clusters - and model-results visualization lets you overlay detections to see where a model disagrees with a label. RLHF annotation for LLMs is present in beta, covering preference ranking alongside the perception data.

## Why it's in the Arsenal

The recurring decision is whether to buy a perception annotation platform, stitch together separate tools per modality, or build labeling infrastructure yourself. Stitching together loses the ontology, because class definitions drift between a 2D tool and a 3D tool, and you discover the drift when a model's training set has three spellings of one class. A single Ontology Center fixes that at the source, and pre-labeling from built-in detection models is the cost lever that makes large LiDAR datasets tractable at all - manual point-cloud labeling is measured in person-hours per frame. The curation view exists because the second-worst cost after labeling is discovering a mislabeled cluster after training has already converged on it.

## Architecture

The platform runs as a Docker Compose stack - the core is installable on any OS through Docker Desktop on Mac, Windows, and Linux or Docker Engine 20.10+ with the Compose plugin 2.0+ on a Linux server, with AMD64 or ARM64 CPUs, 2 GB RAM minimum, and 10 GB free disk. Storage is a backing service behind the app and API tier, which is what the Adminer-style database access in the install docs implies. Pre-labeling models ship as separate containers that run only on a Linux host with an NVIDIA CUDA driver and the NVIDIA Container Toolkit on an NVIDIA T4-class GPU with 4 GB or more RAM, so the labeling UI and the inference path are decoupled by hardware rather than merely by process. Ontology definitions, dataset versioning, and annotation state persist centrally, and RLHF preference pairs reuse the same project, user, and review machinery as perception labels.

## Ecosystem Position

Xtreme1 competes with Label Studio, CVAT, Supervisely, and Encord, and the differentiator is the perception-specialist coverage - LiDAR point clouds, LiDAR-camera fusion, and 3D tracking in the same tool as 2D labels - where the general-purpose tools thin out or leave you exporting to domain scripts. Compared with CVAT, which is strong on video and 2D but treats 3D as an add-on, Xtreme1 treats 3D as a first-class annotation mode. It overlaps with RLHF tooling like the alignment-data workflows around TRL and OpenRLHF, where those train on preference data and this produces it. It complements content/projects/data-and-retrieval by feeding curated datasets into training pipelines, and it connects to the perception model entries in content/projects/frameworks as an upstream data source. Inference is not its concern, so content/projects/inference-engines matters only where you run the pre-labeling containers.

## Getting Started

Download the release package, unpack it, and bring the Compose stack up. Docker Desktop 4.1+ or Docker Engine 20.10+ is required.

```bash
docker pull xtreme1/xtreme1:latest
unzip xtreme1-*.zip && cd xtreme1-*
docker compose up -d
```

The built-in model containers additionally require a Linux host, an NVIDIA CUDA driver, the NVIDIA Container Toolkit, and a T4-class GPU with 4 GB or more RAM.

## Key Use Cases

1. Label an autonomous-driving dataset: annotate 3D boxes and tracks across LiDAR and fused camera data in one project with a shared ontology.
2. Bootstrap labels with pre-labeling: run the built-in 2D and 3D detection models on your frames, then have annotators correct rather than draw from scratch.
3. Build preference data for RLHF: use the beta preference-ranking workflow to produce the pairwise comparisons an alignment run needs.

## Strengths

- 3D LiDAR and camera-LiDAR fusion annotation with OpenPCDet and AB3DMOT conventions, so labels feed detectors directly.
- Ontology Center enforces class hierarchies and attributes once, which is what prevents label drift across annotators.
- Built-in pre-labeling models for 2D and 3D detection turn manual point-cloud labeling from a person-hour problem into a correction task.
- Embedding-based curation with MobileNetV3 and openTSNE surfaces mislabeled clusters before training bakes them in.

## Limitations

The GPU requirement is a hard split: pre-labeling containers need Linux, an NVIDIA CUDA driver, the NVIDIA Container Toolkit, and a T4-class card with 4 GB or more, so macOS and ARM hosts get the annotation UI but none of the built-in models. RLHF support is explicitly beta, so the LLM preference workflow is the least proven part of the surface. The 2 GB RAM and 10 GB disk figures are floors, not realistic working sizes - real LiDAR datasets run to terabytes and you will size storage separately. Self-hosting means you own uptime, upgrades, and user management with no vendor SLA. The Enterprise version is marketed separately, which is a signal about where the polished path sits.

## Relation to the Arsenal

This data-and-retrieval-phase entry produces training data rather than retrieving it, but it occupies the same phase because the curation and ontology layer is a data-management problem. Its output feeds the perception and alignment entries in content/projects/frameworks, and the pre-labeling containers are an inference deployment in miniature, which makes content/projects/inference-engines relevant for that half of the platform. There is no evaluation tooling here, so verifying label quality needs content/projects/benchmark-and-eval.

## Resources

- [Repository](https://github.com/xtreme1-io/xtreme1)
- [Documentation](https://docs.xtreme1.io/xtreme1-docs/)
