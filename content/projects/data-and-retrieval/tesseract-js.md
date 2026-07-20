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
org_or_maintainer: naptha
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 175
trending_score: 44
added_date: '2026-07-12'
last_reviewed: '2026-07-12'
added_by: maintainer
status: active
id: tesseract-js
name: Tesseract.js
artifact_type: library
category: computer-vision
subcategory: document-processing
description: A pure-JavaScript OCR library that runs Tesseract compiled to WebAssembly in the browser and Node, supporting 100+ languages without a server
github_url: https://github.com/naptha/tesseract.js
license: Apache-2.0
primary_language: Other
tags:
  - multimodal
  - self-hosted
  - inference
maturity: production
cost_model: open-source
github_stars: 38543
last_commit: '2026-05-17'
docs_url: http://tesseract.projectnaptha.com/
phase: data-and-retrieval
domain:
  - vision
  - language
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A WebAssembly build of Tesseract that brings offline OCR to browsers and Node without a backend service.
best_for:
  - You need client-side OCR in a web app so images never leave the user's browser
  - You want JavaScript/Node OCR without deploying a separate Python or C++ OCR service
avoid_if:
  - You need maximum throughput on large batches, where native Tesseract or GPU models are faster
  - Your documents need advanced layout/table understanding beyond Tesseract's capabilities
enrichment_notes: Repository, Apache-2.0 license, and 2026-05-17 activity verified via the GitHub API on 2026-07-12. Performance is bounded by the WebAssembly Tesseract core.
---

## Overview

Tesseract.js is a pure-JavaScript OCR library that runs the Tesseract engine compiled to WebAssembly, so it works in the browser and in Node.js without any native binaries or server. It supports 100+ languages and exposes a promise-based API, bringing offline text recognition directly to web applications.

## Why it's in the Arsenal

It uniquely enables privacy-preserving, client-side OCR: images can be recognized entirely in the browser with no upload. That capability, plus a clean JS API, makes it a distinct and widely used entry for web engineers.

## Architecture

The library ships Tesseract's LSTM engine compiled to WASM and lazily fetches the WebAssembly core, worker scripts, and per-language recognizer model data at runtime, executing recognition in a Web Worker to keep the UI responsive. It mirrors Tesseract's output options (text, words with bounding boxes, hOCR) and manages a scheduler for parallel workers in Node.

## Ecosystem Position

Tesseract.js is a JavaScript delivery of the same engine cataloged as Tesseract, so it complements rather than competes with the native build: it trades some speed for zero-install, in-browser execution. Compared with cloud OCR APIs it keeps data on the client, and compared with GPU vision-language models it is far lighter but less capable on complex layouts.

## Getting Started

Install with `npm install tesseract.js`, then `Tesseract.recognize(image, 'eng').then(({ data }) => data.text)`; a worker/scheduler API handles multiple images, and language data is downloaded on first use.

## Key Use Cases

In-browser document scanning and form filling; privacy-sensitive OCR that avoids uploads; Node microservices needing OCR without native deps; client-side text extraction for web tools.

## Strengths

Runs fully client-side, no native install, 100+ languages, familiar Tesseract outputs, and an Apache-2.0 license with a large web-developer community.

## Limitations

It inherits Tesseract's weaknesses on complex layouts and handwriting, WASM execution is slower than native or GPU OCR, initial language-data downloads add latency, and large batches strain browser memory.

## Relation to the Arsenal

It extends the document-processing area to web/JS deployment and links back to the native Tesseract entry.

## Resources

- [GitHub repository](https://github.com/naptha/tesseract.js)
- [Project site](http://tesseract.projectnaptha.com/)
