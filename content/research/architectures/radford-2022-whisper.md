---
id: radford-2022-whisper
title: "Robust Speech Recognition via Large-Scale Weak Supervision"
phase: architectures
venue: icml
year: 2022
authors:
  - "Radford, A."
  - "Kim, J. W."
  - "Xu, T."
  - "Brockman, G."
  - "et al. (OpenAI)"
arxiv_id: "2212.04356"
arxiv_url: "https://arxiv.org/abs/2212.04356"
pdf_url: "https://arxiv.org/pdf/2212.04356"
code_url: "https://github.com/openai/whisper"
venue_url: null

practical_applicability: high
reproduction_status: code-available
result_status: current
has_code: true
citation_count_approx: 6000

tldr: "Whisper: a plain encoder-decoder transformer trained on 680K hours of weakly-labeled web audio achieves human-competitive, zero-shot-robust speech recognition across 96+ languages — and its released weights became the default open ASR component"
key_contribution: "Demonstrated that scale and diversity of weak supervision beat dataset-specific training for ASR robustness: one multitask model (transcribe, translate, detect language, timestamp) generalizes zero-shot across domains where supervised models overfit their benchmarks — with fully released open weights"

builds_on:
  - "vaswani-2017-attention"

tags:
  - "voice"
  - "multimodal"
  - "transformers"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Whisper's thesis mirrors the scaling story of text LLMs applied to speech: instead of clever architectures or self-supervised pretraining pipelines, train a standard encoder-decoder transformer on 680,000 hours of noisy, weakly-labeled audio scraped from the web, with multiple tasks encoded as decoder prompt tokens. The result generalizes zero-shot to benchmarks it never saw — approaching human error rates where dataset-specific models fail badly out of domain — and, because OpenAI released the weights, it became the open ASR standard.

## Why it's in the Arsenal

- Whisper is the transcription layer of the practical AI stack: voice agents, meeting transcription, video subtitling, and audio-input LLM pipelines overwhelmingly run Whisper or a derivative — it is the rare frontier-lab model that is also everyday open infrastructure
- Its central lesson — weakly-supervised scale beats benchmark-specific training for robustness — transfers to how practitioners should evaluate any model claiming benchmark SOTA

## Core Contribution

Two contributions: methodological — showing that data scale/diversity with weak labels is the dominant robustness lever in speech, with zero-shot out-of-distribution evaluation as the honest metric (supervised models matching humans on LibriSpeech make many times more errors than humans off-benchmark); and practical — a single multitask interface where special decoder tokens select transcription, X→English translation, language ID, and timestamps, removing the pipeline of separate components.

## Key Results

- Zero-shot Whisper approached or matched human transcription error rates on out-of-distribution test sets where LibriSpeech-supervised SOTA models degraded severely (2022)
- Averaged across many datasets, zero-shot Whisper made ~55% fewer relative errors than prior supervised-SOTA models evaluated off their training distribution (2022)
- Multilingual coverage across ~96 languages plus speech translation from one model, with performance scaling smoothly with per-language training hours (2022)

## Methodology

680K hours of web audio-transcript pairs, aggressively filtered for machine-generated transcripts and misaligned language labels; a standard encoder-decoder transformer (up to 1.55B parameters) consuming log-Mel spectrograms, with all tasks and metadata expressed as decoder token sequences. Evaluation deliberately centered zero-shot transfer: no fine-tuning on the target benchmarks, measuring robustness rather than leaderboard fit.

## Practical Applicability

Immediately deployable and ubiquitous: open weights in five sizes make quality/latency trade-offs easy, and the ecosystem hardened it for production — faster-whisper (CTranslate2), whisper.cpp for edge/local, and countless hosted APIs. For most transcription needs it remains the default starting point; fine-tuning on domain audio (accents, jargon, telephony) is well-supported and often worthwhile.

## Limitations & Critiques

Whisper hallucinates — on silence, music, or noisy segments it can emit fluent text that was never spoken, a well-documented failure mode requiring VAD front-ends in production. Long-form transcription relies on heuristic 30-second chunking with fragile timestamp alignment; low-resource languages perform far below English; and the training corpus is undisclosed and unreleased, so reproduction of training is closed even though weights are open.

## Reproductions & Follow-up Work

Training is not independently reproduced (corpus unreleased), but weights are open and the inference ecosystem validated the model exhaustively: faster-whisper, whisper.cpp, WhisperX (alignment/diarization), and distil-whisper (distilled variants) form the derivative family. OpenAI's own large-v2/v3 refreshes improved multilingual performance; open self-supervised competitors exist but haven't displaced it as the general-purpose default.

## Relation to the Arsenal

The ASR component behind the voice entries in projects/ (e.g. `speech-to-speech` in projects/frameworks/, which pairs it with TTS for full voice pipelines). Its scale-over-benchmark-fit argument parallels `brown-2020-gpt3` (foundational/) applied to the speech modality.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2212.04356)
- [arXiv](https://arxiv.org/abs/2212.04356)
- [Code + weights (openai/whisper)](https://github.com/openai/whisper)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
