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
org_or_maintainer: flashlight
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
trending_score: 30
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: wav2letter
name: wav2letter (Flashlight ASR)
artifact_type: framework
category: voice-audio
subcategory: frameworks
description: Facebook AI Research's C++ automatic-speech-recognition toolkit built on the Flashlight library, notable for fully convolutional acoustic models and fast
github_url: https://github.com/flashlight/wav2letter
license: NOASSERTION
primary_language: C++
tags:
  - voice
  - inference
  - self-hosted
maturity: beta
cost_model: open-source
github_stars: 6440
last_commit: '2026-07-14'
docs_url: https://github.com/flashlight/wav2letter/wiki
phase: framework
domain:
  - audio
relation_to_stack:
  - study-and-reference
  - fork-and-adapt
health_signals:
  - research-origin
  - community-driven
ecosystem_role:
  - A C++ ASR research toolkit demonstrating fully convolutional acoustic models and an efficient WFST-style beam-search decoder.
best_for:
  - You want a fast, C++-native ASR training/decoding codebase to study convolutional acoustic modeling
  - You are building on the Flashlight ML library and need its integrated speech recognition components
avoid_if:
  - You need an actively developed, easy-to-use framework; wav2letter has largely folded into Flashlight and is research-first
  - You want Python-first ergonomics, which PyTorch toolkits provide
enrichment_notes: Repository and 2026-01-12 activity verified via the GitHub API on 2026-07-12; license metadata is NOASSERTION. Development has largely consolidated into Flashlight; included as a study reference.
---

## Overview

wav2letter is Facebook AI Research's automatic-speech-recognition toolkit, written in C++ on top of the Flashlight machine-learning library. It is historically notable for popularizing fully convolutional acoustic models and an efficient beam-search decoder, and for showing that competitive ASR could be built without recurrent networks.

## Why it's in the Arsenal

It is an influential reference in ASR history and a rare example of a high-performance C++-native training and decoding stack, useful for study and for teams building on Flashlight even though most activity has moved into that parent project.

## Architecture

The toolkit trains fully convolutional acoustic models with the ASG or CTC criteria and decodes with a lexicon- and language-model-aware beam search implemented for speed in C++. Built on Flashlight's tensor and autograd primitives, it emphasizes throughput and memory efficiency, and it introduced techniques later generalized in self-supervised speech models like wav2vec.

## Ecosystem Position

It contrasts with Python-first frameworks such as ESPnet, SpeechBrain, and NeMo by being C++-native and closely tied to Flashlight, trading ecosystem breadth and ease of use for raw performance and low-level control. Today it complements those toolkits as a historical and performance reference rather than competing for everyday use.

## Getting Started

Build Flashlight and wav2letter from source following the wiki, prepare a lexicon and tokens, then use the training and decoding binaries with configuration files; pretrained recipes for LibriSpeech are documented.

## Key Use Cases

Studying convolutional ASR and efficient decoders; high-performance C++ recognition pipelines; building on the Flashlight library; historical benchmarking.

## Strengths

C++-native performance, efficient beam-search decoder, influential convolutional-ASR designs, and integration with the Flashlight ML library.

## Limitations

Development has largely consolidated into Flashlight, so this repository is more of a reference than a maintained product; the C++ build is involved; there is no Python-first ergonomics; and the license metadata is non-standard and should be verified.

## Relation to the Arsenal

It provides historical grounding for ASR in the voice-audio category next to the modern PyTorch toolkits.

## Resources

- [GitHub repository](https://github.com/flashlight/wav2letter)
- [Flashlight library](https://github.com/flashlight/flashlight)
