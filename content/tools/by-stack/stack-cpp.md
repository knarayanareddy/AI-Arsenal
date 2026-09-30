---
id: "stack-cpp"
title: "Tools by Stack — Cpp"
entry_type: "guide"
section: "tools"
description: "Tools in the Arsenal filtered by Stack facet Cpp, with an auto-generated routing table that keeps this page current"
tags:
  - llm
  - data
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

The shortlist for a native C++ build, filtered to runtimes that fit an existing build system. The defining constraint is that every dependency is something you compile and maintain yourself, and a wrong fast path fails silently, so numerical behaviour needs checking against a reference.

## Why It's in the Arsenal

Native builds give the smallest binaries and the tightest control, and in exchange every dependency is something you compile and maintain. Grouping by stack keeps that cost attached to the choice, including the fact that a wrong fast path fails silently and needs checking against a reference.

## Key Features

- Every entry is a native runtime that fits an existing build system.
- Build-system and linkage implications are stated per entry, because in C++ that is the integration cost.
- Numerical behaviour should be checked against a reference implementation, since a wrong fast path fails silently.

## Architecture / How It Works

Each entry records its build requirements and linkage implications, because in a C++ build those propagate into the whole dependency graph. The page is generated from the stack facet, with build detail in the tool entry.

## Getting Started

Pick a tool from the table below and validate it with a small proof of concept before adoption.

## Use Cases

1. **Scenario**: you are embedding inference in a C++ system and need a runtime that fits an existing native build.
2. **Scenario**: you are choosing between a C++ inference runtime and binding to one from another language, and want the build-system trade stated.
3. **Scenario**: you are porting a Python model implementation to a native service and need to know what the ecosystem gap costs.

## Strengths

- Filters to native runtimes that fit an existing build, which is a much shorter list than in Python.
- Treats each dependency as a build-system commitment, because that is the real integration cost in C++.
- Emphasises checking numerical behaviour against a reference, since a wrong fast path fails silently.

## Limitations / When NOT to Use

- C++ gives the smallest binaries and the tightest control, at the cost of every dependency being something you build and maintain yourself.
- The inference runtimes available here are fewer than in Python, and each one is a build-system commitment that affects your whole dependency graph.
- Numerical behaviour must be checked against a reference implementation, because a wrong fast path is silent.

## Integration Patterns

- Link a C++ runtime here from the model entries whose reference implementations are native.
- When a runtime changes its build requirements, the impact reaches every dependent entry, so update those too.

## Resources

- Linked tool entries in the table below carry the authoritative detail

## Buzz & Reception

This page is a maintained routing surface; the tool table below is auto-refreshed and is not a popularity ranking.

<!-- AUTO-GENERATED TOOL TABLE BELOW — do not edit -->
| Tool | Phase | Jobs | Cost model | Free tier | Self-hostable | Open source | Stack | Verdict |
|---|---|---|---|---|---|---|---|---|
| [Codebase Memory MCP](../dx-and-tooling/codebase-memory-mcp.md) | dx and tooling | memory-management | open-source | Yes | Yes | Yes | cpp | use-with-caution |
| [DeepSpeed](../model-layer/deepspeed.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | python, cpp | recommended |
| [FAISS](../data-ingestion/faiss.md) | data ingestion | vector-search | open-source | Yes | Yes | Yes | cpp, python | best-in-class |
| [LM Studio](../dx-and-tooling/lm-studio.md) | dx and tooling | prototyping | freemium | Yes | Yes | No | typescript, cpp | recommended |
| [NVIDIA NIM](../serving-and-deployment/nvidia-nim.md) | serving and deployment | production-serving, deployment | paid | Yes | Yes | No | python, cpp | solid-choice |
| [NVIDIA Triton Inference Server](../serving-and-deployment/triton-inference-server.md) | serving and deployment | production-serving, deployment | open-source | Yes | Yes | Yes | cpp, python | recommended |
| [Typesense](../data-ingestion/typesense.md) | data ingestion | vector-search | freemium | Yes | Yes | Yes | cpp | solid-choice |
| [Vespa](../data-ingestion/vespa.md) | data ingestion | vector-search | open-source | Yes | Yes | Yes | java, cpp | solid-choice |
