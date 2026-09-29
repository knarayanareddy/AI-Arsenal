---
id: google-adk
name: Google ADK
version_tracked: null
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: Google code-first Python toolkit for building, evaluating, and deploying AI agents
github_url: "https://github.com/google/adk-python"
license: Apache-2.0
primary_language: Python
org_or_maintainer: null
tags: [agents, orchestration, graphs, tool-use]
maturity: production
cost_model: open-source
github_stars: 20097
github_stars_last_30d: 0
trending_score: 40
last_commit: "2026-06-13"
docs_url: "https://google.github.io/adk-docs/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language, reasoning]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [org-backed, actively-maintained]
ecosystem_role:
  - Google's official agent development framework, positioned as the Google Cloud-native path for building and deploying agents
best_for:
  - You're building on Google Cloud/Vertex AI and want an agent framework with first-party integration into that ecosystem, including deployment tooling
  - You need multi-agent orchestration with Google's own model family (Gemini/Gemma) as the primary target, with official support and documentation
avoid_if:
  - You need a cloud-agnostic framework — ADK's deployment and tooling story is most complete within Google Cloud, so a cloud-agnostic choice like LangGraph or CrewAI may fit better outside that ecosystem
  - You want the largest possible existing community and third-party tutorial base — as a comparatively newer entrant, ADK's community resources are smaller than LangChain/LangGraph's
upstream_dependencies: []
downstream_consumers: []
alternatives: [langgraph, crewai]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Limited independent third-party production case studies were found beyond Google's own documentation and sample repos (adk-python, adk-samples); architecture claims are based on the official GitHub repo structure rather than a technical paper.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"newsletter","url":"https://google.github.io/adk-docs/","date":"2026-06-13","description":"Official ADK docs"}
featured: false
status: active
---

## Overview

Google's official open-source framework for building, evaluating, and deploying AI agents, designed to integrate closely with Google Cloud and Vertex AI while remaining usable with other model providers.

## Why it's in the Arsenal

Google ADK is catalogued here on the strength of its own documentation and public record, not on independent measurement — treat the claims below as what the project states about itself until you have run it.

## Architecture

Provides an agent abstraction with built-in support for tool use, multi-agent composition, and evaluation, plus tooling for deploying agents to Google Cloud infrastructure; supports both Python and other language bindings per Google's official samples.

## Ecosystem Position

Upstream: designed to work with Gemini/Gemma models as first-class citizens, though not exclusively. Downstream: none of particular note yet given its relative newness. Competing: LangGraph, CrewAI, Microsoft Agent Framework, AWS's agent tooling. Complementary: integrates with Vertex AI's evaluation and deployment infrastructure.

## Getting Started

```bash
pip install google-adk
```

```python
# See the project's official documentation (Resources below) for a
# runnable quickstart tailored to this framework's specific API.
```

## Key Use Cases

1. **Adopting the abstraction**: for Google ADK, the question is whether the control-flow model it imposes is one you want in your codebase permanently, since every step written against it is a step you own later.
2. **What dominates the decision**: `building`, `google`, `cloud`, `vertex` are the variables that actually move the outcome for Google ADK in this phase, and none of them appear in a feature comparison.
3. **Choosing between candidates**: compare Google ADK against `langgraph`, `crewai` on the same task with the same data, and record which you would abandon first — that decision, not the feature list, is what this entry should inform.

## Strengths

- The implementation detail worth checking before adopting Google ADK is specific — provides an agent abstraction with built-in support for tool use, multi-agent composition, and evaluation, plus tooling for deploying agents to Google Cloud infrastructure; supports both Python and other language bindings per Google's official samples — because that is where the capability claim either survives contact with your data or does not.
- It is a framework entry in this catalog, so the comparison that matters is against the other framework projects rather than against projects in adjacent phases.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- The cost this entry cannot quantify for you is operational: the Google ADK footprint at your data volume, the failure modes of its dependencies, and who is on call when it degrades.
- The claims here come from the project's own documentation and public record, not from independent measurement on your workload; benchmark numbers in particular are point-in-time and harness-dependent.
- Where Google ADK overlaps `langgraph`, `crewai`, the overlap is real and choosing between them on feature lists alone is the mistake; the deciding axis is usually operational.

## Relation to the Arsenal

Google ADK is Google's official, Cloud/Vertex-native agent framework. This is a framework entry: it documents the library/SDK you build on top of. For a curated shortlist comparing this and adjacent tools for a specific job, see the relevant [tools/orchestration/](../../tools/orchestration/_index.md) or [tools/by-job/](../../tools/by-job/_index.md) entries.

## Resources

- [GitHub](https://github.com/google/adk-python)
- [Documentation](https://google.github.io/adk-docs/)
