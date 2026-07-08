---
id: sam2
name: SAM 2 (Segment Anything Model 2)
version_tracked: null
artifact_type: model
category: computer-vision
subcategory: models
description: Meta's promptable segmentation foundation model unified across images and video — click/box prompts yield masks tracked through time via streaming memory
github_url: "https://github.com/facebookresearch/sam2"
license: Apache-2.0
primary_language: Python
org_or_maintainer: facebookresearch
tags: [vision, multimodal, research]
maturity: production
cost_model: open-source
github_stars: 19492
github_stars_last_30d: 0
trending_score: 55
last_commit: "2026-05-30"
docs_url: "https://ai.meta.com/sam2/"
demo_url: "https://sam2.metademolab.com"
paper_url: "https://arxiv.org/abs/2408.00714"
paper_id: null
phase: foundation-model
domain: [vision]
relation_to_stack: [build-on-top, study-and-reference]
health_signals: [org-backed, research-origin, production-proven]
ecosystem_role:
  - "The reference promptable-segmentation foundation model: zero-shot mask generation from points/boxes on anything, extended to video via a streaming memory architecture — the \"segmentation as a promptable capability\" paradigm that closed-set models can't offer"
best_for:
  - Interactive or automated segmentation of arbitrary objects without training — annotation tooling, image editing, robotics perception, and medical/scientific imaging pipelines all build on its zero-shot masks
  - Video object segmentation and tracking from a single click — the memory-bank design tracks masklets through occlusion at interactive speed, previously a train-your-own-model problem
avoid_if:
  - You need semantic labels — SAM 2 produces masks, not classes; pair it with a detector (e.g. Grounding DINO for text-prompted boxes) for labeled segmentation
  - You need closed-set real-time segmentation on known classes at the edge — a fine-tuned YOLO-seg model is smaller, faster, and label-aware
upstream_dependencies: []
downstream_consumers: [supervision]
alternatives: []
integrates_with: [ultralytics]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (19.4k), Apache-2.0, and repository state (last push 2026-05-30 — research-release cadence, not abandonment) verified via the GitHub API on 2026-07-08. Capability and speed claims (44 FPS video, 6x faster than SAM 1 on images) from the SAM 2 paper (arXiv:2408.00714) and Meta's release notes; not re-benchmarked here.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/facebookresearch/sam2","date":"2026-07-08","description":"19.4k stars, Apache-2.0 weights + code, Meta research release"}
featured: false
status: active
---

## Overview

SAM 2 generalizes Segment Anything from images to video with one model: prompt with clicks, boxes, or masks on any frame, and a streaming architecture — image encoder per frame, memory attention over a bank of past-frame features and predictions — produces and tracks masks through the clip in real time (~44 FPS), handling occlusion and reappearance. Weights, code, and the SA-V dataset are Apache-2.0/open, making it the standard base for promptable segmentation.

## Why it's in the Arsenal

SAM created a new category — segmentation as a zero-shot, promptable capability rather than a supervised task — and SAM 2 is that category's current reference model, extending it to video where the engineering (memory across frames) is genuinely novel. It anchors the foundation-model end of the Arsenal's CV coverage: `ultralytics` for closed-set training, SAM 2 for promptable zero-shot, `supervision` gluing either into applications.

## Architecture

Hiera-based image encoder producing per-frame embeddings (streaming — one pass per frame); a memory bank storing downsampled features and mask predictions of prompted and recent frames; memory attention conditioning the current frame on that bank; prompt encoder + mask decoder as in SAM, with occlusion prediction. Trained on SA-V (~51K videos, ~643K masklets) plus SA-1B images, via interactive model-in-the-loop data collection.

## Ecosystem Position

Upstream: none — it is the foundation layer. Downstream: annotation tools (accelerating labeling for closed-set training — including for YOLO datasets), editing products, robotics stacks, medical-imaging adaptations (MedSAM-style), and `supervision`'s `from_sam` connector. Adjacent: Grounding DINO for text→box prompting, YOLO-seg for label-aware fast paths.

## Getting Started

```python
from sam2.build_sam import build_sam2_video_predictor

predictor = build_sam2_video_predictor("configs/sam2.1/sam2.1_hiera_l.yaml", "sam2.1_hiera_large.pt")
state = predictor.init_state(video_path="video.mp4")
predictor.add_new_points_or_box(state, frame_idx=0, obj_id=1, points=[[210, 350]], labels=[1])
for frame_idx, obj_ids, masks in predictor.propagate_in_video(state):
    ...
```

## Key Use Cases

1. **Scenario**: annotation acceleration — a click per object replaces polygon drawing, cutting segmentation-labeling cost by an order of magnitude for building closed-set training sets
2. **Scenario**: video object pipelines (editing, sports analysis, robotics perception) — click-to-track masklets through occlusion without training a tracker

## Strengths

- Unified image+video promptable segmentation with real-time propagation — a capability that simply didn't exist as an off-the-shelf artifact before it
- Fully open release (Apache-2.0 weights and code, SA-V dataset), making it safely buildable-upon commercially — rare at this capability level

## Limitations

- No semantics: masks come without labels, so most applications need a detector or classifier stage in front or behind it
- Heavy relative to closed-set edge models; struggles remain on thin structures, fine boundaries, and long videos with many similar objects — documented in the paper's own limitations

## Relation to the Arsenal

The promptable counterpart to `ultralytics` in the CV vertical, consumed through `supervision`; as a research artifact it pairs with `radford-2021-clip` (research) in the "foundation models redefine a CV task" lineage.

## Resources

- [GitHub](https://github.com/facebookresearch/sam2)
- [Paper](https://arxiv.org/abs/2408.00714)
- [Demo](https://sam2.metademolab.com)
