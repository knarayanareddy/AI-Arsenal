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
org_or_maintainer: Google
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
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: langextract
name: LangExtract
artifact_type: library
category: data-pipelines
subcategory: document-processing
description: Python library for grounded structured extraction from unstructured text with source spans and visualization
github_url: https://github.com/google/langextract
license: Apache-2.0
primary_language: Python
tags:
  - data
  - structured-output
  - llm
  - reasoning
maturity: beta
cost_model: open-source
github_stars: 37100
last_commit: '2026-07-02'
docs_url: https://github.com/google/langextract
phase: data-and-retrieval
domain:
  - language
  - general-purpose
relation_to_stack:
  - build-on-top
  - deploy-as-is
health_signals:
  - org-backed
  - actively-maintained
ecosystem_role:
  - A grounded extraction component that maps model-produced structured facts back to source spans for reviewable data pipelines.
best_for:
  - You need structured extraction where each field must remain traceable to the input text.
  - You can build examples and evaluations for the document layouts, overlap cases, and model providers in your corpus.
avoid_if:
  - You only need schema validation after a trusted deterministic parser has already identified the source spans.
  - You require domain accuracy without owning annotation, abstention, and malformed-input handling.
enrichment_notes: Official repository, Apache-2.0 license, Google ownership, and 2026-07-02 activity were reviewed on 2026-07-11. Provider coverage and extraction accuracy remain draft.
---

## Overview

LangExtract is a Python library for turning unstructured text into structured extractions while retaining the source spans that justify each result. Its distinctive output is not just a JSON object; it is an extraction that can be aligned back to the input and inspected or visualized by a reviewer.

## Why it's in the Arsenal

Many document pipelines fail at the handoff between “the model produced a field” and “a reviewer can prove where that field came from.” LangExtract is relevant when provenance and reviewability are part of the data contract. It should be compared with deterministic parsers, constrained decoding, and ordinary structured-output libraries according to the document layout and error cost.

## Architecture

The pipeline accepts text, extraction examples or schema-like instructions, a model/provider configuration, and an output representation. An alignment layer maps extracted spans back to source text, including repeated mentions and ordering cases; recent repository work specifically addresses repeated-mention alignment. Visualization then exposes the source-to-extraction relationship for inspection. This design makes alignment quality a first-class failure mode: a correctly named field with a wrong span is still bad data.

## Ecosystem Position

LangExtract sits in the document-processing stage before indexing, analytics, or RAG. It complements a schema validator and downstream storage, but it does not guarantee that a model found every entity, interpreted a domain-specific phrase correctly, or abstained when evidence was missing. A rules-first parser remains preferable where the source format is stable and the field semantics are deterministic.

## Getting Started

Pick a narrow document family and create a gold set with expected fields and source spans. Run the official example, pin the model/provider and package, and evaluate exact-field accuracy, span overlap, missing-field abstention, duplicate mentions, and malformed documents before scaling.

## Key Use Cases

- Extracting entities, events, or structured facts from long documents with inspectable provenance.
- Building reviewable ingestion pipelines where extracted records need to link back to source text.

## Strengths

- Source grounding makes extraction errors easier to audit than bare structured output.
- Python API, Apache-2.0 licensing, and active Google-backed development make it practical to integrate into a data pipeline.

## Limitations

- Span alignment cannot fix a model that hallucinated a fact or misunderstood the extraction schema.
- Model calls, examples, and document structure strongly affect recall and precision; no domain-independent accuracy guarantee follows from the library.
- Long-document batching and repeated mentions can add latency and require explicit regression tests.

## Relation to the Arsenal

LangExtract is a data-and-retrieval component, not a complete RAG system. Use its grounded records as input to indexing and evaluation, and retain raw text plus extraction provenance for correction and reprocessing.

## Resources

- [Official source](https://github.com/google/langextract)
