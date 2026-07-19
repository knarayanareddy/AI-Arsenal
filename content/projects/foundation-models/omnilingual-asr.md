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
org_or_maintainer: "facebookresearch"
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
added_date: "2026-07-19"
last_reviewed: "2026-07-19"
added_by: maintainer
status: active
id: omnilingual-asr
name: "Omnilingual ASR"
artifact_type: model
category: voice-audio
subcategory: open-source-models
description: "Meta's speech recognition family covering more than 1,600 languages, including zero-shot adaptation to languages with few paired examples"
github_url: https://github.com/facebookresearch/omnilingual-asr
license: "Other"
primary_language: "Python"
tags:
  - "voice"
  - "research"
  - "foundational"
maturity: beta
cost_model: open-source
github_stars: 2851
last_commit: "2025-12-30"
docs_url: https://huggingface.co/spaces/facebook/omniasr-transcriptions
phase: foundation-model
domain:
  - "audio"
relation_to_stack:
  - "deploy-as-is"
  - "study-and-reference"
health_signals:
  - "org-backed"
  - "research-origin"
ecosystem_role:
  - "Low-resource and multilingual ASR foundation for 1,600-plus languages"
  - "Research baseline for zero-shot language expansion"
best_for:
  - "Transcribing underserved languages and dialects"
  - "Researching low-resource ASR adaptation"
avoid_if:
  - "You need mature accuracy guarantees for a narrow high-stakes language"
  - "Your product cannot test language-specific CER and transcription bias"
enrichment_notes: "The December 2025 commit is stale relative to this catalog date, so health intentionally omits actively-maintained. License metadata is Other and the project includes research-oriented model families. Draft pending review."
---

## Overview

Omnilingual ASR targets the long tail of speech recognition: more than 1,600 languages, including hundreds without prior ASR coverage. Its value is not merely a large language count; the README describes adding a new language from a few paired examples without requiring a bespoke specialist team or enormous dataset.

## Why it's in the Arsenal

Omnilingual ASR earns a slot for addressing the long tail of speech recognition rather than optimizing only the most common languages. Its release combines a 1,600-plus-language ambition, zero-shot expansion from a few paired examples, and both CTC and LLM-ASR model families.

## Architecture

The release spans CTC and LLM-ASR families from roughly 300M to 7B parameters, with a shared corpus and evaluation tooling. A zero-shot path handles unseen languages, while larger checkpoints trade GPU cost for accuracy; the hosted transcription Space is a useful way to inspect behavior before local deployment.

## Ecosystem Position

Omnilingual ASR complements commercial speech APIs and established multilingual ASR engines by prioritizing breadth and low-resource research. It is an alternative to a per-language model zoo, but teams should compare CER, latency, diarization, and punctuation on their own recordings rather than treating the headline language count as universal quality.

## Getting Started

Install the repository's Python dependencies and begin with the hosted Omnilingual transcription Space or the smallest local checkpoint. For experiments, download the model and corpus resources linked in the README, then compare character error rate by language before selecting a 300M-to-7B family member.

## Key Use Cases

Use it to test transcription for languages absent from ordinary commercial ASR catalogs or to bootstrap a low-resource language study from a small paired sample. It is also valuable for measuring language coverage and CER across a multilingual product before committing to per-language model work.

## Strengths

The project covers more than 1,600 languages, includes hundreds with little prior ASR support, and offers both CTC and LLM-ASR approaches. The few-shot language-addition story and released corpus make it useful as a research baseline, not merely a hosted demo.

## Limitations

The repository is not actively maintained by the catalog's date, and the license is recorded as Other. Reported CER varies sharply by language, script, and recording conditions; the model family needs substantial GPU capacity at its upper end and does not by itself solve diarization, translation, or privacy governance.

## Relation to the Arsenal

Omnilingual ASR complements Whisper, FunASR, and other speech entries by prioritizing language breadth and adaptation. It belongs in the foundation-model layer and feeds transcription or retrieval systems; diarization, punctuation, translation, and production monitoring remain separate Arsenal concerns.

## Resources

- [GitHub](https://github.com/facebookresearch/omnilingual-asr)
- [Transcription demo](https://huggingface.co/spaces/facebook/omniasr-transcriptions)
