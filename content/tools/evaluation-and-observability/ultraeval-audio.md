---
id: ultraeval-audio
name: UltraEval-Audio
type: tool
job:
- evaluation
description: OpenBMB framework for evaluating ASR, TTS, audio codec, and audio-language
  models
url: https://github.com/OpenBMB/UltraEval-Audio
cost_model: open-source
pricing_detail: Apache-2.0 software; audio model downloads and GPU/API costs are separate
tags:
- evaluation
- voice
- multimodal
- benchmark
- research
maturity: beta
stack:
- python
free_tier: true
free_tier_limits: Fully open source; no hosted tier required
self_hostable: true
open_source: true
source_url: https://github.com/OpenBMB/UltraEval-Audio
docs_url: https://github.com/OpenBMB/UltraEval-Audio
github_url: https://github.com/OpenBMB/UltraEval-Audio
alternatives:
- evalscope
- lighteval
integrates_with: []
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience:
- research
- production
best_when:
- You need one reproducible harness for speech understanding, speech generation, codec,
  sound, medicine, and music evaluations
- You want benchmark download, metric binding, isolated model dependencies, and replication
  commands rather than assembling each audio test manually
avoid_when:
- Your target is a text-only model or a production audio monitor rather than an offline
  foundation-model evaluation
- You need to compare scores without pinning exact model checkpoints, dataset versions,
  language coverage, and metric implementations
version_tracked: null
enrichment_status: draft
enrichment_notes: Metadata and feature claims are grounded in the project README and
  public repository state; draft pending maintainer review.
verdict: solid-choice
verdict_rationale: A distinctive audio-evaluation niche with broad benchmark and model-replication
  coverage from OpenBMB
status: active
---

## Overview

UltraEval-Audio is OpenBMB's evaluation framework for audio foundation models. Its README covers ASR, TTS, audio codecs, speech, sound, medicine, and music across 34 benchmarks and provides replication recipes for named models, making it a specialized alternative to general LLM evaluation suites.

## Why It's in the Arsenal

The project deserves a slot despite its smaller star count because audio evaluation remains fragmented across task-specific scripts and metrics. UltraEval-Audio combines benchmark acquisition, model-specific replication, metric execution, custom datasets, and isolated dependency environments in one repository, which is a useful engineering reference for teams comparing audio models.

## Key Features

The framework automates downloads for datasets such as LibriSpeech and TED-LIUM, binds benchmark data to metrics including WER, BLEU, and quality measures, supports one-click replication documentation, and can install model-specific dependencies in isolated runtimes that communicate over IPC. The README lists ASR, TTS, codec, and multilingual evaluation paths.

## Architecture / How It Works

An evaluation task selects a dataset, model adapter, inference environment, and metric implementation. The isolated runtime keeps conflicting model dependencies out of the main process, while the evaluator collects predictions and computes task-appropriate scores. Replication directories make the model-specific setup explicit rather than pretending every audio checkpoint has the same interface.

## Getting Started

Clone the repository and follow its environment setup, then choose a replication recipe under `replication/`:

```bash
git clone https://github.com/OpenBMB/UltraEval-Audio.git
cd UltraEval-Audio
pip install -r requirements.txt
```

Use the documented one-command replication for a supported ASR or TTS model, pin the benchmark and checkpoint versions, and begin with a small subset before launching the full 34-benchmark matrix.

## Use Cases

Use UltraEval-Audio to compare Qwen3-ASR checkpoints across English and Chinese tasks, reproduce a TTS model's published benchmark table, or evaluate an audio codec and speech-quality pipeline on the same harness. Custom dataset support also makes it relevant for checking domain audio, but only after the public metric assumptions have been audited.

## Strengths

The isolated-runtime design directly addresses the dependency conflicts that make audio-model comparison painful. Its model replication documentation and task-specific metric bindings are also stronger than a generic benchmark runner that leaves waveform preprocessing, reference alignment, and score calculation to each user.

## Limitations / When NOT to Use

Audio scores are highly sensitive to sampling rate, normalization, language mix, reference quality, and model version; a unified command does not make those variables comparable automatically. The project is new and its ACL 2026 demo and replication claims should be reproduced on the exact hardware and checkpoints intended for deployment.

## Integration Patterns

Pin each evaluation recipe in a benchmark manifest, store raw predictions and audio preprocessing settings, and publish score tables with confidence intervals where sampling is involved. Feed important failures into a domain-specific listening or transcription review rather than making a release decision from one aggregate metric.

## Buzz & Reception

308 GitHub stars verified during the 2026-07-19 discovery sweep; OpenBMB project announced with an ACL 2026 demo paper.

## Resources

- [GitHub](https://github.com/OpenBMB/UltraEval-Audio)
- [ACL 2026 demo paper](https://aclanthology.org/2026.acl-demo.56/)
- [UTMOS/DNSMOS guide](https://github.com/OpenBMB/UltraEval-Audio/blob/main/docs/how%20use%20UTMOS%2C%20DNSMOS%20eval%20speech%20quality.md)
