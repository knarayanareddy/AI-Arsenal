---
id: nvidia-dali
name: "DALI"
version_tracked: null
artifact_type: library
category: data-pipelines
subcategory: tools
description: "GPU-accelerated data loading and augmentation library whose operator graph and execution engine keep accelerators busy during training and inference"
github_url: "https://github.com/NVIDIA/DALI"
license: "Apache-2.0"
primary_language: C++
org_or_maintainer: "NVIDIA"
tags: [data, pytorch, efficiency]
maturity: production
cost_model: open-source
github_stars: 5767
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-09-28"
docs_url: "https://docs.nvidia.com/deeplearning/dali/user-guide/docs/index.html"
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [vision, general-purpose]
relation_to_stack: [build-on-top, contribute-to]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "GPU-accelerated data loading and augmentation pipeline that keeps accelerators saturated, the standard fix for input-bound multimodal training."
best_for:
  - "Your GPU utilization is low and the profile shows the input pipeline is the bottleneck, typically on JPEG decode or heavy augmentation."
  - "You train multimodal models and need decode, resize, crop, and normalization to run on-device as one fused graph rather than separate PyTorch ops."
  - "You want a pluggable data loader that keeps its PyTorch Dataset interface, so the model code does not change when you swap the input path."
avoid_if:
  - "Your dataset is small enough to sit in memory or is plain text and tensors, where the standard PyTorch DataLoader has no problem to solve."
  - "You are on AMD, Intel, or Apple Silicon, since DALI is CUDA and the pipeline-specific operators are NVIDIA-only."
  - "You need a decoding format or augmentation the operator set does not cover, since gaps force a CPU fallback that silently costs throughput."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (5767), Apache-2.0 license, last commit 2026-09-28, primary language C++, and all 16 topics were read from the GitHub API. Operator set, nvJPEG decode, executor split, prefetch queues, and the PyTorch adapter come from the official user guide; no pipeline was compiled or benchmarked on GPU here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/NVIDIA/DALI", "date": "2026-09-28", "description": "5,767 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

NVIDIA DALI splits a data pipeline into external sources, which run on the CPU and pull data using framework-specific readers, and DALI operators, which run on the GPU and transform it. The library supplies optimized operators for image decoding through nvJPEG, resizing, cropping, warping, color conversion, and normalization, plus audio decoding and signal processing, and it provides generic operators such as random crop, flip, rotate, and element-wise math. Users assemble these into a graph with a Python builder API, and DALI compiles the graph into an execution plan with a configurable executor split, prefetch queue depth, and parallel execution between CPU and GPU stages. Frameworks plug in through readers, so a PyTorch pipeline is a DALIGenericDataLoader and a TensorFlow pipeline uses the tf.data-compatible reader.

## Why it's in the Arsenal

The decision DALI resolves is the input-bound training run, where the accelerator sits idle waiting on the host. JPEG decode, random crop, and normalization are CPU-heavy and serialized with GPU compute when they run in a standard DataLoader, and moving them to the device removes both the host cost and the copy. It also lets operators fuse, so resize plus normalize plus channel reorder become a single kernel pass over GPU memory rather than three round trips. The second benefit is overlap: the external source stage, the operator stages, and the consumer can run concurrently within one pipeline, so prefetching stops being something you have to hand-tune with worker counts.

## Architecture

A pipeline is a graph of operators compiled into an execution plan. External source operators read from files, sockets, or framework datasets on a CPU thread pool; each DALI operator then requests a batch of variable-shaped blobs, which is why the graph uses a size-per-sample capacity model rather than static shapes. The plan splits the graph into CPU and GPU executor groups connected by queues with configurable prefetch depth, and the framework adapter presents a standard iterable so the training loop only changes its DataLoader argument. Support for variable resolutions, aspect ratio groups, prefetched decoders, and per-sample padding is built into the executor, and operators can be mixed with arbitrary callable transforms wrapped as ExternalSource, which is how unsupported operations get folded into the same scheduling model.

## Ecosystem Position

DALI overlaps with the PyTorch DataLoader, torchvision.transforms, and NVIDIA DALI-style pipelines in tf.data, and its genuine alternative is a well-tuned CPU DataLoader with persistent workers, which is free and often sufficient at moderate data rates. Compared to torchvision transforms, DALI runs the same augmentations on the GPU and fuses them, so it wins when the pipeline is the bottleneck and loses on flexibility for exotic transforms. It is a complement to mmcv, which owns the model and operator side of vision training, while DALI owns only the input path, and the two compose in a standard OpenMMLab training script. It also complements the Aim entry, since input throughput is one of the metrics worth charting next to model accuracy when you tune the pipeline.

## Getting Started

Install the wheel matched to your CUDA build, then build a pipeline and hand it to PyTorch:

```bash
pip install --extra-index-url https://developer.download.nvidia.com/compute/redist nvidia-dali-cuda120
```

```python
import nvidia.dali.fn as fn
from nvidia.dali import pipeline_def

@pipeline_def(batch_size=128, num_threads=8, device_id=0)
def images_pipeline():
    images, labels = fn.readers.file(
        base_dir="/data/imagenet", files=fn.input("files"), labels=fn.input("labels"),
    )
    images = images["gpu"]           # nvJPEG decode on device
    images = fn.resize(images, size=fn.random.uniform(size=(224, 256)))
    images = fn.crop(images, crop=(224, 224))
    return images, labels

loader = images_pipeline().build()
```

```python
from nvidia.dali.plugin.pytorch import DALIGenericDataLoader
train_loader = DALIGenericDataLoader(images_pipeline(), batch_size=128, num_threads=8, device_id=0)
```

Add `--use-nvjpeg` style flags and set `NVJPEG_MAX_CPU_THREADS` to tune decode throughput on your host.

## Key Use Cases

1. Image classification and detection training where JPEG decode and augmentation dominate the step time, typically on 8 or fewer GPUs where host parallelism is weak.
2. Video pipelines, where DALI decodes and resamples frames on device instead of shipping raw frames to the host.
3. Inference preprocessing, where the same operator graph is compiled once and reused at serving time, removing the train/serve skew of a separate CPU transform path.

## Strengths

- GPU-resident decode, resize, and normalization eliminate the CPU-to-GPU staging that throttles otherwise fast training loops.
- Operator fusion and a configurable CPU/GPU executor split with prefetch queues, which removes hand-tuned worker-count guesswork.
- The same graph definition serves training and inference, which keeps preprocessing identical between the two phases.
- A pluggable reader interface keeps the framework DataLoader contract intact, so the training loop barely changes.

## Limitations

DALI is CUDA-only, so there is no path on AMD, Intel, or Apple Silicon and no CPU-only fallback mode beyond the external source stage. Any transform lacking an operator forces a CPU round trip that can cost more than the DALI pipeline saves, and the debugging story is worse than a standard DataLoader because a bottleneck now sits inside a compiled plan. Plan compilation adds startup latency, and pinned memory pressure on large-frame workloads can interact badly with the host. It also carries a real dependency burden on the exact CUDA and driver combination, and NVIDIA's release cadence means version matrices move often.

## Relation to the Arsenal

This sits in the inference-engines phase but solves an input-side problem, so it pairs with the training-and-alignment phase rather than the serving entries. In a vision stack it is the data-path counterpart to the mmcv entry, which supplies the model and loss side, and the ColPali entry shows a different route where images bypass this stage entirely as retrieval inputs. The Aim tracker is the natural place to chart the throughput change that this entry produces.

## Resources

- [DALI GitHub repository](https://github.com/NVIDIA/DALI)
- [DALI user guide](https://docs.nvidia.com/deeplearning/dali/user-guide/docs/index.html)
- [DALI supported operations reference](https://docs.nvidia.com/deeplearning/dali/user-guide/docs/supported_ops.html)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (5,767 stars, last commit 2026-09-28, license Apache-2.0, verified via GitHub API on 2026-09-28)*
