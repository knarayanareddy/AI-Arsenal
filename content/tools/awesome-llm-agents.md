---
id: awesome-llm-agents
name: awesome-llm-agents
type: tool
job:
  - Orchestrates discovery and evaluation of LLM agent frameworks, architectures, research papers, and developer tooling
description: A curated reference directory of Autonomous LLM Agent frameworks, multi-agent systems, memory architectures, and tooling.
url: https://github.com/kaushikb11/awesome-llm-agents
cost_model: open-source
pricing_detail: Free and open-source under the Creative Commons Zero v1.0 Universal license.
tags:
  - agents
  - llm
  - langchain
  - multi-agent-systems
  - autonomous-agents
  - curated-list
maturity: beta
stack:
  - Markdown
  - Python
  - GitHub Pages
free_tier: True
self_hostable: False
open_source: True
added_date: 2026-11-22
last_reviewed: 2026-11-22
added_by: repo-maintainer
verdict: solid-choice
verdict_rationale: Serves as a consolidated map of the rapid-evolving LLM agent domain, indexing execution frameworks, memory components, and foundational research papers.
status: active
phase: orchestration
audience:
  - AI System Architects
  - LLM Application Developers
  - Autonomous Systems Researchers
best_when: Surveying the competitive landscape of agent execution engines (e.g., AutoGen, CrewAI, LangGraph) or looking for canonical literature on agentic memory and tool use.
avoid_when: You need run-time execution engines, code SDKs, or standardized APIs; this repository is an indexed metadata reference, not an execution library.
github_url: https://github.com/kaushikb11/awesome-llm-agents
docs_url: null
---

## Overview

The kaushikb11/awesome-llm-agents repository acts as a specialized technical registry for autonomous agent infrastructure, frameworks, and foundational academic literature. As large language models transitioned from single-turn zero-shot inference to complex, stateful loops utilizing tools, memory reflection, and multi-agent coordination, keeping track of emerging topologies became an operational necessity. This collection indexes projects based on functional agent archetypes including single-agent loops, multi-agent orchestrators, domain-specific coding agents, and evaluation taxonomies.

Architecturally, the resource categorizes projects by their underlying execution models—ranging from ReAct and Plan-and-Solve primitives to graph-based deterministic execution trees like LangGraph and task-decomposition engines like AutoGen or CrewAI. By organizing projects alongside foundational papers on self-reflection (such as Self-RAG) and dynamic memory mechanisms, the repository functions as a taxonomy map for engineers designing agentic control flows.

The repository serves as an architectural index rather than code software. It reduces discovery latency for system architects tasked with building agentic execution layers, providing direct pointers to production-grade orchestration SDKs, memory-vector backends, and benchmarking environments.

## Why It's in the Arsenal

Provides a focused, noise-filtered taxonomy specifically targeted at agentic systems rather than generic LLM pipelines or simple prompt templates.

Cross-references software frameworks (e.g., AutoGen, CrewAI, BabyAGI) directly with the academic papers (e.g., Voyager, Generative Agents, Toolformer) that define their operational mechanics.

Acts as a key reference during system architecture reviews when evaluating whether to build custom agent state machines or adopt existing orchestration engines.

## Key Features

Framework Taxonomy: Categorizes agent runtime environments by control topology, separating single-agent execution loops from collaborative multi-agent patterns.

Research Indexing: Groups foundational papers on autonomous planning, tool invocation protocols, and self-correction strategies like Self-RAG.

Tooling and Infrastructure Mapping: Details supporting components such as long-term memory stores, vector index integrators, and environment sandbox environments.

Evaluation Framework Mapping: Tracks benchmarks specifically designed for multi-step reasoning, agentic planning durability, and tool invocation accuracy.

Community-Driven Maintenance: Receives regular updates from practitioners tracking changes in LLM orchestration ecosystems.

## Trade-offs

Static Reference Constraints: As an awesome-list repository, it contains no executable code, unit tests, or CI validation pipelines for the projects it references.

Variable Granularity: Sub-categories rely on community pull requests, which can lead to uneven coverage between mainstream Python frameworks and niche experimental libraries.

Maintenance Overhead: The high velocity of the LLM ecosystem means linked repositories may occasionally become abandoned or introduce breaking API changes without immediate updates in the reference index.
