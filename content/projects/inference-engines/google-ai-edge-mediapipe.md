---
id: google-ai-edge-mediapipe
name: "mediapipe"
version_tracked: null
artifact_type: library
category: computer-vision
subcategory: libraries
description: "Apache-2.0 cross-platform pipeline for live media shipping ready-made face, hand, pose, and segmentation graphs that run on-device"
github_url: "https://github.com/google-ai-edge/mediapipe"
license: "Apache-2.0"
primary_language: C++
org_or_maintainer: "google-ai-edge"
tags: [vision, streaming]
maturity: production
cost_model: open-source
github_stars: 37105
github_stars_last_30d: 0
trending_score: 36
last_commit: "2026-09-25"
docs_url: "https://ai.google.dev/edge/mediapipe"
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [vision, audio]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [actively-maintained]
ecosystem_role:
  - "Cross-platform ML pipeline for live and streaming media, shipping face, hand, pose, and segmentation graphs that run on-device across mobile and web."
best_for:
  - "You are building a camera feature on mobile or in the browser and need face landmarks, hand tracking, or pose estimation running at interactive frame rates without a server round trip."
  - "You need a composable inference graph rather than a single model call, so you can reorder, drop, or add stages - an image-effect renderer, an ROI crop, a second classifier - with each node timed separately."
  - "You are porting a perception feature across Android, iOS, the web, and desktop and want one graph definition and one set of packaged models instead of four separate implementations."
avoid_if:
  - "You need to train or fine-tune the perception models, because the packaged task graphs are provided and the repository is a runtime for them rather than a training toolkit."
  - "You need general image classification or segmentation on server GPUs, where a training framework in content/projects/frameworks/ and a model-definition layer give you far more control."
  - "Your accuracy requirement exceeds what a quantized mobile-optimized model can deliver, since the shipped graphs trade a few points of accuracy for latency and footprint."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 37105 stars, Apache-2.0 license, C++ primary language, last commit 2026-09-25, 17 GitHub topics, homepage ai.google.dev. Calculator and graph model, task bundle format, delegate choices, and the two API generations are read from official docs; nothing was run on a device."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/google-ai-edge/mediapipe", "date": "2026-09-28", "description": "37,105 stars and last commit 2026-09-25 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

MediaPipe is a framework for building real-time perception pipelines over live video, audio, and sensor streams, shipped as native C++ with bindings for Android, iOS, Python, Java, and JavaScript. Its distinguishing asset is a library of ready-made task solutions - face detection with 468-point landmarks, hand and finger tracking, pose and world-coordinate estimation, holistic tracking, selfie segmentation, object detection, and image classification - each packaged as a model asset plus a prebuilt graph, so an app gets a working solution before writing any code. The lower layer is a graph framework: a pipeline is a set of calculators connected by streams, each with a defined input and output contract, and the framework handles scheduling, timestamps, and synchronization across the graph.

## Why it's in the Arsenal

The recurring decision MediaPipe resolves is shipping real-time perception somewhere performance matters. A server-side model with a network round trip cannot keep up with a camera at 30 frames per second on a phone, and building a mobile inference stack from scratch means handling delegate placement, memory limits, and platform-specific threading. MediaPipe packages the tuned models, the graph wiring, and the platform bindings so that a feature is a few API calls, and the same graph definition compiles across Android, iOS, web, and desktop, which is what makes a cross-platform camera feature tractable. The cost is the other side of that bargain: you are consuming a curated model set, so accuracy on your domain is fixed unless you rebuild the graph with your own models, and the model updates follow Google's release cycle.

## Architecture

A graph is composed of calculators, each a node with typed input and output streams, a graph-level thread policy, and a validator that checks the connections at build time. When the graph runs, a packet flows between calculators carrying a timestamp, and the scheduler decides which nodes execute on which thread - CPU-bound image ops, a GPU delegate, and an inference delegate can be placed in parallel branches. The modern solution layer wraps a prebuilt graph plus a model asset - a task bundle containing the graph and a TFLite model - and exposes a narrow task API such as FaceLandmarker or HandLandmarker, so the same bundle is what the Android, iOS, and web SDKs load. Inference itself runs on TFLite with XNNPACK for CPU paths and a GPU delegate where available, and the models are quantized or distilled specifically for mobile latency. The Python package exposes the same graph API for prototyping on a workstation, and the older solutions-based API covers tasks such as holistic tracking with a shared landmark set, which is how a face or pose result maps to hand regions.

## Ecosystem Position

MediaPipe competes with TFLite directly for on-device inference and with mobile-first vision SDKs, and compared with bare TFLite it wins by supplying the graph composition, threading, and ready-made models rather than just the runtime. It overlaps with the general training frameworks in content/projects/frameworks/ as an inference path for models you trained yourself, but in the opposite direction: MediaPipe consumes TFLite models rather than producing trainable ones. It is an alternative to calling a remote vision endpoint, trading capability for latency and privacy, and rather than a research library it is a productized runtime - compared with the OpenCV entry in this batch, MediaPipe is where the model comes pre-solved and OpenCV is where you assemble the primitives. The browser and video-generation entries in this batch share the same constraint of running where the user is rather than where your GPU is.

## Getting Started

Install the Python package and run a face-detection graph against an image to see the graph API in use:

```bash
python3 -m pip install mediapipe opencv-python
```

```python
import mediapipe as mp

with mp.solutions.face_detection.FaceDetection(model_selection=1, min_detection_confidence=0.5) as det:
    img = mp.Image.create_from_file("photo.jpg")
    for face in det.process(img).detections:
        print(face.bounding_box, face.score)
```

For shipping, load the packaged task bundle through the task APIs in the Android, iOS, or Web SDK rather than this Python surface.

## Key Use Cases

1. Camera-based UX on mobile - selfie framing, a virtual background, hand-gesture control, or form guidance - where a network round trip is not an option.
2. A cross-platform feature that must behave the same on Android, iOS, and the web, using one graph definition and one packaged model asset.
3. Building a custom perception pipeline by reusing the graph framework, threading model, and streaming discipline with your own calculators in place of the stock tasks.

## Strengths

- Ready-made, mobile-optimized models for the common perception tasks, which removes the model work and the quantization pass from most projects.
- One graph definition compiled to Android, iOS, web, and desktop, so a cross-platform feature stops being four implementations.
- Explicit timestamped streaming with a scheduler that parallelizes CPU, GPU, and inference branches, which is how interactive frame rates are actually reached.
- Apache-2.0 with model assets distributed alongside the runtime, so there is no hosted dependency or telemetry.

## Limitations

The model set is curated and fixed; if your domain needs a class, a pose range, or an output resolution the stock models do not provide, you rebuild the graph with your own TFLite model and lose the out-of-the-box benefit. Accuracy is chosen for mobile latency, so on a difficult domain the gap to a server-side model is real, and the usual answer is to move inference off-device - at which point this library stops being the right tool. The two API generations coexist, and examples online are split between the older solutions surface and the newer task bundles, which produces a steady stream of confusion. Platform parity is uneven: feature support and performance differ between the mobile SDKs, the web build, and the Python package, and the web build has a smaller task set. And because the release train follows Google's model cadence, upgrading can change model behavior under you without a versioned compatibility promise.

## Relation to the Arsenal

The on-device perception branch of the Arsenal, and the counterpart to the server-side vision stack: the OpenCV entry in this batch supplies the classical primitives these graphs are built from, while the training frameworks in content/projects/frameworks/ produce the custom models you can drop into a MediaPipe graph as a calculator. The video-generation tooling in this batch runs under the same latency-versus-flexibility tradeoff on a different workload. For evaluation of streaming pipelines, the observability entries in content/projects/evaluation/ apply; for anything that needs a server round trip instead, the inference engines in content/projects/inference-engines/ are the other end of the design space.

## Resources

- [GitHub — google-ai-edge/mediapipe](https://github.com/google-ai-edge/mediapipe)
- [MediaPipe documentation](https://ai.google.dev/edge/mediapipe)
- [Solutions guide with the task list](https://ai.google.dev/edge/mediapipe/solutions)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (37,105 stars, last commit 2026-09-25, license Apache-2.0, verified via GitHub API on 2026-09-28)*
