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
org_or_maintainer: "truefoundry"
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
id: cognita
name: "Cognita"
artifact_type: framework
category: rag
subcategory: advanced-rag
description: "Archived RAG platform from TrueFoundry that wraps LangChain and LlamaIndex into a modular, API-driven, UI-configurable production structure"
github_url: "https://github.com/truefoundry/cognita"
license: Apache-2.0
primary_language: Python
tags: [rag, langchain]
maturity: experimental
cost_model: open-source
github_stars: 4419
last_commit: "2026-03-13"
docs_url: "https://github.com/truefoundry/cognita#readme"
phase: data-and-retrieval
domain:
  - "language"
relation_to_stack:
  - "build-on-top"
  - "deploy-as-is"
health_signals:
  - "actively-maintained"
  - "org-backed"
ecosystem_role:
  - "A structured RAG framework that turns notebook-style pipelines into modular, deployable, API-driven services."
best_for: ["You are moving a LangChain or LlamaIndex RAG prototype into production and want each component modular, API-driven and separately extendable.", "You want a no-code UI over a RAG pipeline so a non-developer can create collections and data sources without editing a metadata YAML file.", "You are studying how a retrieval platform was structured around LangChain and LlamaIndex and need a readable reference rather than a maintained dependency."]
avoid_if: ["You need a maintained product, because the README opens with a notice that the project is no longer actively maintained.", "You want new features or bug fixes, because the repository is archived and the GitHub API confirms the archived flag.", "You are starting a new production retrieval system, because adopting an unmaintained platform's structure means you own every future dependency upgrade yourself."]
enrichment_notes: "Repository, Apache-2.0 license, and 2026-03-13 activity verified via the GitHub API on 2026-07-12. Production framing; expect to operate backing services."
---

## Overview

Cognita is a RAG platform from TrueFoundry whose premise is stated directly: LangChain and LlamaIndex give easy abstractions for experimentation in a notebook, but production imposes constraints, and that is where Cognita sits. It uses LangChain and LlamaIndex under the hood and provides an organisation for the codebase in which each RAG component is modular, API-driven and easily extendable, with a local quickstart and a production environment option plus a no-code UI. It also supports incremental indexing by default. The changelog in the README shows the trajectory: an AudioParser built on a faster-whisper server and a VideoParser added in September 2024, migration to Pydantic v2 in August, a model gateway file centralising model configuration in July, and a Prisma and Postgres-backed Metadatastore in June 2024 that let you drive the whole system from the UI without a local metadata file. A hosted instance at cognita.truefoundry.com was offered for evaluation.

## Why it's in the Arsenal

The recurring decision is what happens to a notebook prototype once real constraints arrive. A notebook that embeds, chunks, retrieves and prompts in one cell is fine until you need to swap the embedding model, scale retrieval separately, or let a colleague change a setting. Cognita's contribution is organisational rather than algorithmic: it defines boundaries between components so each can be replaced, scaled or extended independently, and adds the no-code surface and incremental indexing that a production deployment needs. That reasoning still holds even though the project itself no longer does, which is what makes it useful as a design reference.

## Architecture

A backend API drives the pipeline, with the retrieval layer delegated to LangChain or LlamaIndex so the framework's abstractions remain the substrate rather than being reimplemented. Components are separated behind API boundaries, which is the core structural claim: an embedding component, a retriever, a generator and configuration can each change without rewriting the others. Configuration is centralised, first in a metadata YAML file and later through a model gateway described as a single file holding all model configuration, so provider and model changes are not scattered through code. A Metadatastore powered by Prisma and Postgres holds the collections, data sources and their index state, which is what makes the UI able to create and index sources without editing YAML, and incremental indexing updates those collections without full rebuilds. Parsers sit at the ingest edge, with AudioParser and VideoParser added for speech and multimodal input.

## Ecosystem Position

Cognita is an alternative to the retrieval frameworks in content/projects/framework rather than a competitor, since it is built on LangChain and LlamaIndex and adds production packaging, a UI and a metadatastore around them. It overlaps with the retrieval-phase entries in content/projects/data-and-retrieval on the vector store side, but the store is configuration rather than a differentiator. Its position relative to the still-maintained RAG builders in content/projects/agent-systems is instructive: those shipped a no-code surface too, and their continued maintenance is the argument for choosing them over this. Compared with a framework you embed in a service, Cognita is a deployed application with an API, which is why incremental indexing and a metadatastore matter more here than library ergonomics. It complements the orchestration entries in content/projects/orchestration for scheduled re-indexing rather than replacing them.

## Getting Started

Clone the repository and run the local quickstart, which starts the API and the UI against a local store:

```bash
git clone https://github.com/truefoundry/cognita.git
cd cognita
git submodule update --init --recursive
make run-debug
```

The frontend has its own README, and a hosted instance was available at cognita.truefoundry.com. Expect to read the archived documentation carefully: the project is not maintained, so dependency versions in the lockfile are historical.

## Key Use Cases

1. Productionising a notebook RAG: take a LangChain or LlamaIndex prototype and split it into modular, API-driven components with separate configuration.
2. No-code corpus management: create collections and data sources and trigger indexing through the UI rather than editing configuration by hand.
3. Incremental corpus updates: keep a growing knowledge base current without rebuilding the whole index on every document change.

## Strengths

- A clear statement of the production constraint a notebook prototype hits, which is a framing more projects do not articulate.
- Modular, API-driven component boundaries inherited from LangChain and LlamaIndex rather than a bespoke reimplementation.
- No-code UI plus a Prisma and Postgres metadatastore, so corpus management stops being a YAML file exercise.
- Incremental indexing by default, and parsers extended to audio and video input over its life.

## Limitations

The README's first line is a notice that the project is no longer actively maintained, and the repository is archived, so the last real feature work is from 2024 and dependency drift is now on you. A RAG platform built on LangChain and LlamaIndex inherits both frameworks' breaking changes, and with no maintainer those breakages have no upstream fix path. The no-code UI and multi-component service are real operational surface for what is fundamentally a retrieval pipeline, and the Postgres-backed metadatastore is a second datastore to run and back up. The hosted evaluation instance has gone with the project's maintenance status, which means there is no longer a zero-setup path. For anything new, the maintained retrieval builders and frameworks cover the same ground with current dependency support.

## Relation to the Arsenal

This belongs in content/projects/data-and-retrieval as a production-packaging reference for RAG components, and it is worth reading against the still-maintained retrieval frameworks in content/projects/framework since it sits directly on LangChain and LlamaIndex. The metadatastore and vector store it manages meet the entries in content/projects/data-and-retrieval, and the audio and video parsers meet the document-processing entries in the same phase. Scheduled re-indexing is the orchestration entries' problem in content/projects/orchestration. Its main value today is as a design reference for splitting a notebook prototype into modular components, not as a dependency.

## Resources

- [GitHub — truefoundry/cognita (archived)](https://github.com/truefoundry/cognita)
- [Frontend README](https://github.com/truefoundry/cognita/blob/main/frontend/README.md)
- [Hosted instance (historical) — cognita.truefoundry.com](https://cognita.truefoundry.com)
