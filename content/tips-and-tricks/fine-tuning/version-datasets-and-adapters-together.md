---
id: "version-datasets-and-adapters-together"
title: "Version Datasets and Adapters Together as One Artifact Pair"
category: "production-gotchas"
tags:
  - fine-tuning
  - data
  - observability
difficulty: "beginner"
impact: "medium"
time_to_implement: "2 hours"
phase: fine-tuning
effort: hours
estimated_time: "~2 hours"
reversible: true
verification_status: community-reported
verified_by: "community reports (ML reproducibility practice)"
applies_to:
  - fine-tuning-workflows
gotchas:
  - "Storing only a dataset filename (not a content hash) breaks the link the first time the file is regenerated in place"
  - "The chat template and tokenizer version are part of the recipe -- an adapter is not reproducible from data alone"
metrics: []
related_tips:
  - match-training-and-inference-prompt-formats
  - version-your-eval-datasets
added_date: "2026-07-07"
added_by: maintainer
last_reviewed: "2026-07-07"
enrichment_status: draft
---

## What & Why

Every trained adapter or checkpoint should carry an immutable reference to exactly what produced it: dataset content hash, base model and tokenizer versions, chat template version, and training config. Six weeks later, "which data trained the adapter currently in production?" is a question that decides whether a quality regression is debuggable — and without the pairing recorded at training time, it is unanswerable, because datasets get regenerated in place and configs drift.

## Before / After

**Before:** `adapter-v3` misbehaves in production. The training data directory has been overwritten twice since; nobody can reproduce the run or diff its data against v2's.

**After:** `adapter-v3`'s metadata records `dataset sha256:9f2a..., base llama-3.1-8b-instruct, template v4, config hash`. Reproducing or diffing the run is a lookup.

## Implementation

At training time, compute a content hash of the final serialized training file and write a metadata record (alongside the adapter artifact and in the experiment tracker) containing: dataset hash and storage URI, base model revision, tokenizer and template versions, training config, and the eval-set version used for checkpoint selection. Make the training script fail if any component is untracked.

## Gotchas

- Filenames are not identity — hash the content
- Data alone does not reproduce an adapter; template, tokenizer, and config versions belong in the same record

## When NOT to Apply

- For throwaway exploratory runs that will never be deployed, a lighter record (tracker run with config) is acceptable — but promotion to any shared environment requires the full pair
- Teams already on a model registry with lineage tracking should use it rather than a parallel homegrown scheme

## Verification

Community-reported: artifact-lineage pairing is established ML-reproducibility practice, restated in every model-registry's documentation; the failure mode it prevents is ubiquitous in postmortems.
