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
  - "Provides a focused building block for downstream AI workflows"
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

This entry adds a concrete, currently relevant building block to the Arsenal: its README exposes a runnable workflow rather than only a paper, while its open repository makes the integration boundary inspectable for engineers. Omnilingual ASR is especially useful because low-resource language transcription studies.

## Architecture

The release spans CTC and LLM-ASR families from roughly 300M to 7B parameters, with a shared corpus and evaluation tooling. A zero-shot path handles unseen languages, while larger checkpoints trade GPU cost for accuracy; the hosted transcription Space is a useful way to inspect behavior before local deployment.

## Ecosystem Position

Omnilingual ASR complements commercial speech APIs and established multilingual ASR engines by prioritizing breadth and low-resource research. It is an alternative to a per-language model zoo, but teams should compare CER, latency, diarization, and punctuation on their own recordings rather than treating the headline language count as universal quality.

## Getting Started

Begin with the linked README and documentation, install the project in an isolated environment, and reproduce the smallest supplied example before connecting it to production data or an agent loop. For Omnilingual ASR, consult the GitHub entry first.

## Key Use Cases

The strongest fits are Low-resource language transcription studies; Language coverage experiments for global voice products. These scenarios keep the project's intended interface visible and avoid implying capabilities that the README does not promise.

## Strengths

Unusually broad language coverage, few-shot extensibility, and both CTC and LLM-ASR families make it a strong research reference for inclusive speech technology.

## Limitations

The repository is not actively maintained by the catalog's date, and the license is recorded as Other. Reported CER varies sharply by language, script, and recording conditions; the model family needs substantial GPU capacity at its upper end and does not by itself solve diarization, translation, or privacy governance.

## Relation to the Arsenal

Omnilingual ASR sits at a distinct boundary in the catalog: provides a focused building block for downstream ai workflows. Teams can connect its outputs to adjacent model, tool, or workflow entries, while retaining ownership of deployment policy and workload-specific evaluation.

## Resources

- [GitHub](https://github.com/facebookresearch/omnilingual-asr)
- [Transcription demo](https://huggingface.co/spaces/facebook/omniasr-transcriptions)
