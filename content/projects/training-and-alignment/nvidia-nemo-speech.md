---
id: nvidia-nemo-speech
name: "Speech"
version_tracked: null
artifact_type: framework
category: voice-audio
subcategory: frameworks
description: "NVIDIA NeMo speech stack for training and serving ASR, TTS, diarization, and translation models"
github_url: "https://github.com/NVIDIA-NeMo/Speech"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "NVIDIA-NeMo"
tags: [voice, training, inference]
maturity: production
cost_model: open-source
github_stars: 18518
github_stars_last_30d: 0
trending_score: 34
last_commit: "2026-09-24"
docs_url: "https://docs.nvidia.com/nemo/speech/nightly/index.html"
demo_url: null
paper_url: null
paper_id: null
phase: training-and-alignment
domain: [audio, language]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [actively-maintained]
ecosystem_role:
  - "Conversational-speech toolkit spanning ASR, TTS, and voice conversion with NeMo-format checkpoints that drop into low-latency serving."
best_for:
  - "You are deploying a streaming ASR or TTS endpoint and want a low-latency server that loads a NeMo-format checkpoint without writing a custom inference loop."
  - "You are fine-tuning a speech model on your own audio and want distributed training, mixed precision, and pretrained model collection already wired together."
  - "You need a pipeline that spans ASR, translation, diarization, and voice conversion and must keep all of those on one framework's checkpoint format."
avoid_if:
  - "You want a small pure-Python speech library with no CUDA dependency, since the toolkit assumes substantial NVIDIA hardware for the paths that matter."
  - "You are evaluating open ASR models and need one uniform benchmarking harness across dozens of model families, since the collection is scoped to what NeMo supports."
  - "Your deployment target is a browser or mobile client, where the format and runtime are heavy and a lighter client-side stack will serve you better."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (18518), Apache-2.0 license, last commit 2026-09-24, Python as primary language and the topic list were API-verified. The .nemo archive format, model collections, chunk and stride streaming knobs, and the Triton service layout come from official docs and the repository README; hardware and upgrade-pain notes are engineering judgement, not measured here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/NVIDIA-NeMo/Speech", "date": "2026-09-28", "description": "18,518 stars and last commit 2026-09-24 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

NeMo Speech is the speech-focused collection within the NeMo framework, organised into an ASR collection (CTC, transducer/conformer, FastConformer hybrid with discriminative scores), a TTS collection, a text normalisation and denormalisation path for TTS, and a diarisation collection built on segmentation plus speaker embeddings, plus speech translation and voice conversion. Models are distributed as .nemo files, which are tar archives holding a config YAML, the weights, and any auxiliary tokenizers, so a model is portable as a single unit. Training is driven by NeMo's Lightning-based collection classes, exposing pretrainable_model, train_ds, validation_ds, and optim within a Python Trainer, with automatic mixed precision, DDP, and NeMo Run for job submission. For serving, the same ecosystem provides NeMo Framework's Triton-compatible service plus Riva-related deployment tooling, and the Python API lets you instantiate an EncDecHybridASRModel or FastPitchModel for direct scripted inference.

## Why it's in the Arsenal

The recurring decision for speech teams is whether to stitch a separate ASR runtime, a separate TTS runtime, and a separate diarisation tool into one pipeline, or standardise on one framework's artefact format. Stitching means three deployment paths, three sets of latency characteristics, and a format conversion at every boundary. NeMo resolves this at the checkpoint level: a single .nemo bundle is the contract across training, fine-tuning, and serving, so moving from a research notebook to a Triton-served endpoint is a config change rather than a re-export. The secondary benefit is recipe consistency, because a model collection ships the exact data pipeline and hyperparameters that produced the published checkpoint.

## Architecture

Each model is a LightningModule subclass combining a neural network with its data pipeline and decoding logic. In training, the collection class wraps dataset classes and a text/tokenizer pipeline into a ConcatDataset over shards, and the Trainer handles AMP, gradient accumulation, and DDP; saving emits one .nemo archive with the hydra config resolved. In inference, the model object loads that archive, builds a decoding strategy (greedy or beam search for transducer models, CTC beam search with a language model for hybrid ones, plus optional punctuation, casing, and diarisation as a post-stage), and streams results as tokens become available. Streaming uses a configurable chunk and stride plus a left context, so a model is selected and tuned for its latency regime, with FastConformer variants introduced specifically to cut that cost. Serving pushes the same model into a Triton ensemble with a backend for execution, keeping tokenisation and result formatting in dedicated stages so each can be scaled and versioned independently.

## Ecosystem Position

NeMo Speech overlaps with faster-whisper, whisper.cpp, and the espnet family on ASR, but the distinguishing axis is that it owns both training and serving for the formats it defines rather than wrapping a third-party checkpoint. Against faster-whisper it trades generality and a single pip-and-go quantised path for fine-tuning control and a production-serving story; against espnet it sits on a different framework convention, so mixing the two in one project carries a real integration cost. It is not a speech-to-speech model stack in the LLM sense, so it should be paired with rather than compared to the language-model serving entries, and for diarization specifically pyannote-audio is the lighter choice. Compared with the CoreML route on Apple hardware, this stack is the CUDA-first option by design.

## Getting Started

Install the speech extras, then instantiate a pretrained ASR model and transcribe a wav file:

```bash
pip install nemo_toolkit[asr]
```

```python
import nemo.collections.asr as nemo_asr

model = nemo_asr.models.EncDecHybridASRModel.from_pretrained(
    "QuartzNet15x5Base-En"
)
out = model.transcribe(["sample.wav"], batch_size=4, return_hypotheses=True)
print(out[0].text)
```

For fine-tuning, subclass the collection, set `pretrained_model` and your `train_ds`, and restore with `nemo_asr.models.EncDecHybridASRModel.restore_from(...)`; the same checkpoint then loads in the serving container.

## Key Use Cases

1. A streaming customer-service ASR endpoint where partial hypotheses must appear within a few hundred milliseconds, tuned via the model's chunk and stride settings.
2. Domain ASR fine-tuning on a few hundred hours of industry audio, reusing a pretrained conformer or FastConformer backbone and swapping the tokenizer and vocabulary.
3. A voice-assistant pipeline chaining TTS synthesis, streaming recognition, and speaker diarisation on one checkpoint format, with each stage served independently through Triton.

## Strengths

- A .nemo file is a self-contained training, fine-tuning, and serving artefact, so promotion from notebook to endpoint does not require a re-export step.
- The model collection ships strong pretrained baselines for ASR, TTS, and diarisation with documented recipes.
- Riva and Triton oriented serving gives real streaming support with separable, independently scalable pipeline stages.
- Broad task coverage across recognition, translation, synthesis, and voice conversion under one framework and one checkpoint convention.

## Limitations

The stack is heavyweight: installing the toolkit, matching CUDA and cuDNN versions, and building the NeMo containers is a real operational cost compared with a pip-install-and-go ASR library. Streaming latency is architecture dependent, so the fast options exist only for specific configurations and swapping a model for speed can cost accuracy. Model and container versions are tightly coupled, which turns upgrades into a pinning exercise, and the multi-GPU training configurations assume NVIDIA hardware with substantial memory. TTS quality also needs its own subjective evaluation, because loss numbers do not predict perceived naturalness.

## Relation to the Arsenal

This is the training-and-alignment phase entry for audio: it overlaps content/projects/frameworks with the broader NeMo language-model collection while staying speech-specific. Upstream, faster-whisper and whisperx entries cover fast batch transcription when no fine-tuning is needed, and pyannote-audio in the same folder owns diarization. Downstream, the serving entries in content/projects/inference-engines take the exported artefacts, and snakers4-silero-vad is the cheap VAD that gates streaming before recognition even starts.

## Resources

- [NeMo Speech documentation](https://docs.nvidia.com/nemo/speech/nightly/index.html)
- [NeMo Speech GitHub repository](https://github.com/NVIDIA-NeMo/Speech)
- [NeMo Framework GitHub repository](https://github.com/NVIDIA/NeMo)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (18,518 stars, last commit 2026-09-24, license Apache-2.0, verified via GitHub API on 2026-09-28)*
