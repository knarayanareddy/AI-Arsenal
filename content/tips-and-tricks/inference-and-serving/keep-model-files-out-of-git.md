---
id: "keep-model-files-out-of-git"
title: "Keep Local Model Weight Files Out of Git"
category: "local-model-tips"
tags:
  - local
  - self-hosted
difficulty: "beginner"
impact: "low"
time_to_implement: "15 minutes"
phase: inference-and-serving
effort: minutes
estimated_time: "~15 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (repo-hygiene discussions for local-model projects)"
applies_to:
  - local-model-deployment
gotchas:
  - "Model weight files committed to git bloat repository size permanently, since git history retains every version even after the file is later removed -- prevention (gitignore) is far cheaper than remediation (history rewriting)"
  - "A .gitignore rule alone doesn't clean up weight files already committed in prior history -- if this happens, a history rewrite (e.g. git filter-repo) is needed separately"
metrics: []
related_tips: []
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Store local model weight files in a dedicated cache directory, artifact store, or model registry, and explicitly exclude them from the application's git repository via `.gitignore`. Model weights are typically large binary files that don't diff meaningfully and permanently bloat repository size once committed, even after later removal.

## Before / After

**Before:** `git add model.gguf` commits a multi-gigabyte weight file directly into the repository.

**After:** `.gitignore` excludes `*.gguf`/`*.safetensors`/model-cache directories, and weights are fetched at build/deploy time from a model registry or cache.

## Implementation

Add model weight file extensions and cache directories to `.gitignore` before any weights are downloaded into the working directory, and document in the README how to fetch weights (a download script or registry reference) instead of expecting them in the repo.

## Gotchas

- Model weight files committed to git bloat repository size permanently, since history retains every version even after removal
- A `.gitignore` rule alone doesn't clean up weight files already committed in prior history — that needs a separate history rewrite

## When NOT to Apply

- Skip this for genuinely tiny model files (a few KB, e.g. small classical ML models) where repo bloat is not a real concern
- Not applicable if your team deliberately uses git-based large file storage (e.g. Git LFS) as the chosen artifact-versioning strategy — in that case, the weights are still tracked, through a purpose-built mechanism instead

## Verification

Community-reported: excluding model weight files from git in favor of a cache or artifact store is a widely repeated repo-hygiene recommendation for local-model projects, not independently benchmarked here against a named production system.
