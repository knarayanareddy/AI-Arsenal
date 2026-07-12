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
org_or_maintainer: "dataelement"
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
id: bisheng
name: "BISHENG"
artifact_type: platform
category: agents
subcategory: platforms
description: "An open enterprise LLMOps platform combining visual GenAI workflow building, RAG, agents, model management, evaluation"
github_url: https://github.com/dataelement/bisheng
license: "Apache-2.0"
primary_language: "TypeScript"
tags:
  - "agents"
  - "rag"
  - "llm"
  - "self-hosted"
  - "observability"
maturity: beta
cost_model: open-source
github_stars: 11512
last_commit: "2026-07-12"
docs_url: https://dataelem.com/
phase: agent-system
domain:
  - "language"
relation_to_stack:
  - "deploy-as-is"
  - "build-on-top"
health_signals:
  - "actively-maintained"
  - "org-backed"
ecosystem_role:
  - "An enterprise-oriented platform that unifies workflow building, RAG, agents, and model governance behind one system."
best_for:
  - "You need an on-prem, enterprise-grade platform bundling GenAI workflows, RAG, and model management with governance"
  - "Non-developers need a visual builder while the platform still handles auth, evaluation, and observability"
avoid_if:
  - "You want a lightweight code-first library rather than a full self-hosted platform"
  - "You need a hosted SaaS with no infrastructure to operate"
enrichment_notes: "Repository, Apache-2.0 license, and 2026-07-12 activity verified via the GitHub API on 2026-07-12. Enterprise focus; expect operational overhead to self-host."
---

## Overview

BISHENG is an open LLMOps platform aimed at enterprise AI applications. It bundles a visual GenAI workflow builder, retrieval-augmented generation, agents, unified model management, evaluation, supervised fine-tuning, dataset management, system administration, and observability into a single self-hostable system, targeting teams that need governance and non-developer authoring rather than a bare library.

## Why it's in the Arsenal

It represents the enterprise LLMOps-platform category, where workflow authoring, RAG, model governance, and observability are integrated behind auth and administration, which is a distinct shape from the code-first frameworks elsewhere in the catalog.

## Architecture

BISHENG pairs a TypeScript front end providing a drag-and-drop workflow canvas with backend services for orchestration, a RAG pipeline (document ingestion, chunking, embedding, and vector retrieval), an agent runtime, and a unified model gateway that fronts multiple LLM providers. It layers enterprise concerns, role-based access control, dataset and evaluation management, and observability, on top so applications can be built, governed, and monitored in one place.

## Ecosystem Position

BISHENG competes with platforms like Dify and FastGPT and overlaps with orchestration libraries such as LangChain, differentiating on enterprise governance (access control, fine-tuning, evaluation, administration) rather than just LLM workflow building. Compared with code-first frameworks it favors visual authoring and operational features, and compared with hosted SaaS it is self-hostable for data-control requirements.

## Getting Started

Deploy with the provided Docker Compose setup, configure model provider credentials in the model-management console, then build a workflow or RAG application in the visual editor and publish it as an API or chat app.

## Key Use Cases

Enterprise document-QA and RAG assistants; internal GenAI workflow apps built by non-developers; governed multi-model deployments; teams needing evaluation and observability in one platform.

## Strengths

Broad integrated feature set, visual authoring for non-developers, enterprise governance and administration, self-hostable, active organizational backing, and an Apache-2.0 license.

## Limitations

It is a heavy platform with real operational overhead to deploy and maintain, the breadth means individual features may be less deep than specialized tools, and self-hosting requires infrastructure and ongoing upgrades.

## Relation to the Arsenal

It anchors the enterprise LLMOps-platform pattern alongside the code-first agent and RAG frameworks in the catalog.

## Resources

- [GitHub repository](https://github.com/dataelement/bisheng)
- [DataElem](https://dataelem.com/)
