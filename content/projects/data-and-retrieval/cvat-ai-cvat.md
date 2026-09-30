---
id: cvat-ai-cvat
name: "cvat"
version_tracked: null
artifact_type: platform
category: data-pipelines
subcategory: tools
description: "Web platform for annotating images, video, and 3D scenes with review workflows, consensus, and AI-assisted labeling"
github_url: "https://github.com/cvat-ai/cvat"
license: "MIT"
primary_language: Python
org_or_maintainer: "cvat-ai"
tags: [vision, data]
maturity: production
cost_model: open-source
github_stars: 16808
github_stars_last_30d: 0
trending_score: 34
last_commit: "2026-09-28"
docs_url: "https://www.cvat.ai"
demo_url: null
paper_url: null
paper_id: null
phase: data-and-retrieval
domain: [vision]
relation_to_stack: [deploy-as-is]
health_signals: [actively-maintained]
ecosystem_role:
  - "Computer-vision annotation platform covering image, video, and 3D formats with consensus workflows — the default choice when labeling quality needs inter-annotator agreement."
best_for:
  - "You are building a detection, tracking, or segmentation dataset and label quality has to be demonstrable to a reviewer, so you need consensus scoring and a review stage."
  - "You are annotating long video where object tracks must persist across occlusion and you need interpolation plus a tracker-driven auto-annotation path to skip obvious frames."
  - "You have a team of annotators and need roles, job assignment, and a programmatic path to export labels into training pipelines."
avoid_if:
  - "You are labelling a few hundred images solo and want zero setup, since standing up the Docker stack is real overhead for a small job."
  - "You need text, audio, or point-cloud annotation, which this platform does not cover."
  - "Your data cannot leave the trust boundary of an offline environment, because the standard deployment is a server plus object storage and a Postgres metadata database."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (16808), MIT license, last commit 2026-09-28, Python as primary language and the topic list were API-verified. Task and job hierarchy, consensus, review workflow, annotation dump storage, and the SDK surface come from official docs and source reading; no instance was deployed and no labelling throughput was measured for this entry."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/cvat-ai/cvat", "date": "2026-09-28", "description": "16,808 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

CVAT is a Django and Django-REST web application for dataset annotation built on a task, job, and label hierarchy. A project holds tasks; a task is a media set with an explicit annotation schema of labels, attributes, and shapes; each task is sliced into jobs that annotators claim, which is what makes per-annotator statistics and partial-progress recovery possible. Shape types cover rectangle, polygon, polyline, point, and cuboid for 3D, and video tasks add a track abstraction so a shape can span frames with interpolation between keyframes. Built on top are the review workflow with annotation, review, and acceptance stages and per-job status, the consensus feature that scores agreement between two annotators on the same job, automatic annotation built on the server-side model manager with adapters for detection and tracking checkpoints, and interpolation for dense video. The SDK and REST API cover dataset export, task creation, frame and region queries, and format conversion to COCO, Pascal VOC, and the YOLO formats.

## Why it's in the Arsenal

The recurring decision is how to make annotation quality measurable instead of anecdotal. Single-annotator labelling produces a dataset whose error rate is unknown, and disagreements only surface when the trained model misbehaves, far too late to fix cheaply. CVAT resolves this with the job and task abstraction: two people can label the same job independently, a consensus score quantifies their overlap, and a review stage is a first-class state rather than a Slack message asking someone to double-check. The second decision it settles is video throughput: interpolation plus a tracker-based auto-annotation path means an annotator labels the first and last frames of a track and fills the middle, which is the difference between a day and a week of work on a video dataset.

## Architecture

The system is a Django app behind a reverse proxy with a Postgres metadata store, an object storage layer (the built-in Django storage, or S3, MinIO, or Azure via the ffmpeg-plus-storage path) for media and annotation dumps, and an optional Redis and RabbitMQ for background jobs. The backend stores a task's annotations as compressed JSON dumps keyed by frame, which keeps whole-task reads cheap while individual-region writes still go through the API. Media handling runs through an ffmpeg pipeline that decodes videos, generates thumbnails and frame-index caches, and produces chunked segments for the browser player, so the client streams only the region being viewed. The client is a TypeScript SPA that renders shapes on canvas over the video or image, with a hit-testing and auto-save model that batches region changes. The model manager loads a server-side ML backend and exposes it as the auto-annotation format provider, with adapter templates that normalise a custom detector or tracker into the same request contract. The REST SDK mirrors the same surface for scripted dataset assembly.

## Ecosystem Position

CVAT competes with Label Studio and Labelme for general annotation, but it is the deepest of the three on video and 3D, where it supports cuboid and track primitives that the others handle thinly. It overlaps with the VGG Image Annotator and VoTT, both of which are simpler and quicker for small image-only jobs, and with Supervisely, a commercial platform with a broader model marketplace. Against FiftyOne it is complementary rather than rival: CVAT produces labels, while FiftyOne is where you inspect and curate a dataset. Compared with a fully hosted service, the self-hosted version trades convenience for control of where media and annotations are stored, and the project also sells cloud and enterprise offerings alongside the MIT-licensed core.

## Getting Started

Run the Docker Compose stack, create an admin, then push frames and open a labelling job through the SDK:

```bash
docker compose up -d
docker compose run --rm backend python manage.py createsuperuser
```

```python
from cvat_sdk import Client

client = Client("http://localhost:8080", "admin", "")
task = client.make_task(
    "frames/",                       # media the server will import
    task_name="shelf-demo",
    labels=[{"name": "bottle"}],
    overwrite=True,
)
task.upload_job("annotate")
print(task.get_job(1).get_frame(0).name)
```

Open the task URL, draw a shape, and use the Review stage plus the Consensus tab to measure annotator agreement before exporting to COCO or YOLO.

## Key Use Cases

1. Building a video detection dataset where a track spans thousands of frames: label keyframes, let interpolation fill the rest, and use auto-annotation to skip frames a tracker already solved.
2. Running a quality-controlled labelling programme where consensus scoring identifies ambiguous images and routes them to review instead of accepting the first label.
3. Scripted dataset assembly: pull frames from object storage into a task through the SDK, export standard formats, and feed the result straight into a training pipeline.

## Strengths

- Consensus scoring and a formal review stage make annotation agreement measurable, which is rare outside vendor tools.
- Broad shape and modality coverage across polygons, polylines, cuboids, tracks, and 3D scenes, with interpolation for video throughput.
- A real SDK and REST API, so dataset creation, querying, and export are scriptable rather than manual.
- Self-hostable with a straightforward Docker Compose path and S3-compatible storage, so media never has to leave your infrastructure.

## Limitations

Running the stack means Docker, Postgres, object storage, and often Redis and RabbitMQ, and a single-host deployment becomes slow once concurrent annotators and long videos are involved. The auto-annotation backend must be configured with a GPU host and per-format adapter templates, so AI assistance is powerful but not zero-setup. Some media and 3D formats have rough edges in the player and require ffmpeg plus storage plugins that are harder to install than the base image. The MIT core covers self-hosting, while collaboration, quality, and analytics features are positioned as commercial, so price the right edition before committing a labelling budget. Serving a REST API for one-shot labelling is more machinery than a script over a small image folder.

## Relation to the Arsenal

This is the labelling half of content/projects/data-and-retrieval, sitting upstream of everything the training entries in content/projects/training-and-alignment consume and downstream of the ingestion tools that gather raw media. Pair it with the model entries in content/projects/foundation-models, which is exactly what its auto-annotation adapters connect to, and with the document-parsing entries in the same data folder for text-and-image corpora. For dataset iteration after labelling, the evaluation entries are the natural next read, and the vector-database entries share this folder's concern with retrieval corpora rather than pixel labels.

## Resources

- [CVAT site and product overview](https://www.cvat.ai)
- [CVAT GitHub repository](https://github.com/cvat-ai/cvat)
- [CVAT documentation](https://docs.cvat.ai/docs/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (16,808 stars, last commit 2026-09-28, license MIT, verified via GitHub API on 2026-09-28)*
