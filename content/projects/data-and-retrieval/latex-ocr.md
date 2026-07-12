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
org_or_maintainer: "lukas-blecher"
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
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: latex-ocr
name: "LaTeX-OCR (pix2tex)"
artifact_type: model
category: computer-vision
subcategory: document-processing
description: "A vision-transformer model that converts images of mathematical equations into LaTeX code, with CLI, GUI, and API interfaces"
github_url: https://github.com/lukas-blecher/LaTeX-OCR
license: "MIT"
primary_language: "Python"
tags:
  - "multimodal"
  - "self-hosted"
  - "inference"
maturity: beta
cost_model: open-source
github_stars: 16481
last_commit: "2025-01-18"
docs_url: https://lukas-blecher.github.io/LaTeX-OCR/
phase: data-and-retrieval
domain:
  - "vision"
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "community-driven"
  - "research-origin"
ecosystem_role:
  - "A specialized image-to-LaTeX model that transcribes rendered math into editable markup."
best_for:
  - "You need to convert screenshots or photos of equations into LaTeX for papers, notes, or accessibility"
  - "You want a self-hostable math-OCR model with CLI, GUI, and API entry points"
avoid_if:
  - "You need general document or prose OCR, where full-text engines and layout models fit better"
  - "You require guaranteed correctness on very complex multi-line derivations without human review"
enrichment_notes: "Repository, MIT license, and 2025-01-18 activity verified via the GitHub API on 2026-07-12. Specialized to math; verify transcriptions for complex expressions."
---

## Overview

LaTeX-OCR (pix2tex) is a specialized model that converts images of mathematical formulas into LaTeX code. It uses a vision transformer encoder paired with a transformer decoder to read a rendered equation and emit the markup that would reproduce it, and it ships CLI, GUI, and API front ends for everyday use.

## Why it's in the Arsenal

Math OCR is a distinct, hard sub-problem that general OCR engines handle poorly, and pix2tex is the best-known open, self-hostable solution, making it a valuable niche entry for research and accessibility workflows.

## Architecture

The model is an image-to-sequence transformer: a ViT-style encoder tokenizes the equation image into patch embeddings, and an autoregressive decoder generates LaTeX tokens conditioned on those embeddings, trained on paired image/LaTeX data. Beam search improves output, and the packaged app renders predictions live so users can verify the transcription.

## Ecosystem Position

It complements general OCR such as Tesseract and layout models by targeting the one thing they cannot do well: structured mathematical markup. Compared with multimodal LLMs that can also transcribe math, pix2tex is smaller, self-hostable, and purpose-built, trading breadth for a focused, reproducible math-to-LaTeX capability.

## Getting Started

Install with `pip install pix2tex`, then run the `latexocr` GUI to snip an equation, use the CLI on an image file, or call the bundled API server; models download on first run.

## Key Use Cases

Transcribing equations for papers and notes; accessibility conversion of math images; building math-aware document pipelines; datasets for math understanding.

## Strengths

Focused and effective math OCR, multiple front ends (CLI/GUI/API), self-hostable, MIT license, and a live-render workflow that aids verification.

## Limitations

It is specialized to mathematical expressions and not general text, complex multi-line or unusual notation can produce errors that need review, upstream activity slowed after early 2025, and accuracy depends on image clarity.

## Relation to the Arsenal

It adds math-specific extraction to the document-processing area alongside general OCR engines.

## Resources

- [GitHub repository](https://github.com/lukas-blecher/LaTeX-OCR)
- [Project page](https://lukas-blecher.github.io/LaTeX-OCR/)
