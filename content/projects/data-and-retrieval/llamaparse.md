---
id: llamaparse
name: LlamaParse
version_tracked: null
artifact_type: service
category: rag
subcategory: document-processing
description: "Deprecated SDK repository for LlamaParse, the managed document-parsing and knowledge-agent service"
github_url: "https://github.com/run-llama/llama_cloud_services"
license: MIT
primary_language: TypeScript
org_or_maintainer: null
tags: [data, cloud, featured]
maturity: production
cost_model: paid
github_stars: 4267
github_stars_last_30d: 0
trending_score: 15
last_commit: "2026-05-18"
docs_url: "https://github.com/run-llama/llama_cloud_services#readme"
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
phase: data-and-retrieval
domain: [language, vision]
relation_to_stack: [deploy-as-is]
health_signals: [org-backed, production-proven]
ecosystem_role:
  - LlamaIndex's commercial, managed document-parsing service, specializing in complex PDF/document layouts for RAG ingestion
best_for: ["You are evaluating managed document parsing and want the vendor's own migration path documented, because this repository states exactly which package replaces it and when maintenance ends.", "You need LlamaParse's current client and this entry tells you the old import is wrong, since the successor is a differently named Python package and a scoped npm package.", "You are auditing dependencies and found this package installed, because the README carries an explicit deprecation notice with a stated maintenance deadline rather than a silent rot."]
avoid_if: ["You are starting anything new, because the repository states the packages are deprecated and maintained only until May 1, 2026, with migration to differently named packages as the only path forward.", "You need a self-hosted parser, because this is a client for a hosted service rather than an implementation you can run.", "You need an open-source dependency you can vendor, because the value here is the API contract against a commercial backend, not code you own."]
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: LlamaParse is referenced in independent production case studies as a component of larger LlamaIndex-based systems (e.g. StackAI's use of LlamaParse for high-accuracy retrieval in enterprise document agents, per LlamaIndex's own case-study blog, corroborating real customer usage beyond marketing claims).
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"conference","url":"https://www.llamaindex.ai/blog?tag=Llamaindex","date":"2024-09-16","description":"LlamaIndex case study documenting StackAI's production use of LlamaParse to power high-accuracy retrieval for enterprise document agents"}
featured: false
status: active
---

## Overview

This repository holds the deprecated packages for Llama Cloud Services, which front LlamaParse - the hosted document parsing and knowledge-agent service. The entire README is a deprecation notice: the packages are deprecated, maintenance runs until May 1, 2026, and users are pointed to successor packages - a new Python package for Python and a scoped npm package for TypeScript - which the notice says provide the same functionality with better performance and active development. The GitHub topics describe what the service does rather than what the client is: PDF to markdown, text, JSON and Excel, DOCX to markdown, PPTX to JSON, and structured table extraction. That mapping is the useful part of this entry: it is a compact, vendor-stated description of the managed parsing surface and how to reach its current client.

## Why it's in the Arsenal

It is in the catalog for two reasons, one of them negative. Positively, the topic list is a clean statement of what a commercial document parser is expected to produce across formats - structured tables, JSON extraction, slide decks - which is a useful benchmark list when you are choosing between hosted and self-hosted. Negatively, it is a live example of dependency rot with a documented remedy: a package that was the default a year ago is now a deprecation notice pointing at a different name, and the deadline is stated. If you find this in a requirements file, the migration is mechanical, and the entry is the fastest way to find out what the replacement is.

## Architecture

There is no architecture here to describe, which is the honest framing. The repository is a thin client surface - Python and TypeScript bindings plus a CLI - over a managed API that does the parsing. The service side is where the work happens: layout-aware document conversion, table reconstruction and structured output generation, none of which is in this repository. The topics name the format conversions the service covers, which tells you the API surface is per-format and per-output-type rather than one endpoint with a mode parameter. What the successor package changes is the client, not the service, since the notice claims the same functionality.

## Ecosystem Position

This entry competes with the self-hosted parsers in content/projects/data-and-retrieval - docling, marker, unstructured - and the comparison is deployment model rather than capability: those run on your hardware with a model you control, while this is a metered API. It overlaps with the vision-based OCR entry chandra-ocr for the scanned-document case, where a managed service and a self-hosted model compete on the same documents. Compared with LlamaParse's own newer package names, this repository is strictly a predecessor. It complements rather than replaces the ingestion pipeline entries such as crawl4ai, which fetch the bytes before anything parses them, and it is a client of the hosted tier rather than a member of the local stack.

## Getting Started

Do not install from this repository. The notice names the successors directly:

```bash
pip install llama-cloud>=1.0
```

```bash
npm install @llamaindex/llama-cloud
```

If you are migrating an existing integration, this repository is the place that confirms the old packages are the wrong ones and states the maintenance deadline.

## Key Use Cases

1. Dependency audit: find this package in a requirements file or lockfile and replace it with the successor named in the notice.
2. Capability shortlist: use the documented format and output conversions as the checklist for evaluating any document parser, hosted or not.
3. Migration scoping: read the notice to confirm the deprecation is real and dated rather than an unmaintained repo that quietly stopped.

## Strengths

- The deprecation notice is explicit, dated and names both successor packages, so migration is unambiguous.
- The topic list is a concise vendor statement of the managed parsing surface across PDF, DOCX and PPTX and five output formats.
- A useful negative reference point in a catalog, since almost every batch has a self-hosted parser and few have the vendor's own deprecation path.
- MIT licensed, so reading the client is unconstrained even though running the service is not.

## Limitations

The repository is deprecated with a stated maintenance end date, so it will not receive fixes and installing it puts you on a path to a breaking upgrade. It is a client, not an implementation: no parsing logic, no model and no local execution mode, so none of the quality characteristics can be inspected or reproduced from the code. The service is metered and hosted, which means a cost per document and a data-residency decision, neither of which is documented in this repository. Any capability claim here describes the service's advertised surface as reflected in the repository topics, not a verified behaviour.

## Relation to the Arsenal

This is a data-and-retrieval phase entry for the managed tier of document parsing. Read it against docling, marker and unstructured in the same folder for the self-hosted route, and against chandra-ocr for the vision-based scanned-document case. Its bytes come from the ingestion tools in content/tools/data-ingestion before anything parses them. If your decision is capability versus control rather than managed versus self-hosted, the OCR and parsing entries in the same phase are where the comparison is actually made; treat this one as the reference for what a commercial parser advertises and as a migration notice.

## Resources

- [GitHub - run-llama/llama_cloud_services](https://github.com/run-llama/llama_cloud_services)
- [Deprecation notice in the README](https://github.com/run-llama/llama_cloud_services#readme)
- [LlamaParse service documentation](https://llamaindex.ai)
