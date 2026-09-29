---
id: "stack-rust"
title: "Tools by Stack — Rust"
entry_type: "guide"
section: "tools"
description: "Tools in the Arsenal filtered by Stack facet Rust, with an auto-generated routing table that keeps this page current"
tags:
  - llm
  - data
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

The shortlist for a Rust codebase, filtered to what avoids a Python runtime in the process. The defining trade is binary size and startup against the loss of an ecosystem you would otherwise reuse for free, plus the fact that an absent Rust implementation means a port rather than an install.

## Why It's in the Arsenal

Not running a Python interpreter in the process is the reason to choose Rust here, and it is a real operational benefit: smaller binaries, faster starts, no second runtime to patch. Grouping by stack makes the corresponding cost visible too, which is that an absent Rust implementation is a port you own.

## Key Features

- Every entry avoids a Python runtime in the process, which is the defining argument for this stack.
- Backend feature flags are named, since a CUDA or Metal build is a different artefact from a CPU build.
- Where no Rust implementation exists, that is stated as a port you would own rather than an install.

## Architecture / How It Works

Each entry records its backend feature flags and whether it is a crate or a service, because in Rust those determine what you link and what you operate. The page is generated from the stack facet, and the build detail lives in the tool entry where it can be specific to the project.

## Getting Started

Pick a tool from the table below and validate it with a small proof of concept before adoption.

## Use Cases

1. **Scenario**: you are embedding inference or ML-adjacent work in a Rust service and need options that do not require a Python runtime.
2. **Scenario**: you are choosing between a Rust crate and a sidecar service and want the operational difference for a compiled binary.
3. **Scenario**: you are targeting an edge or WASM runtime and need to know which options compile for that target.

## Strengths

- Filters to what avoids a Python runtime, which is the defining constraint for this stack in an ML context.
- Makes backend feature flags visible, since a CUDA build and a CPU build are different artefacts.
- Acknowledges that absence of a Rust implementation means a port rather than an install.

## Limitations / When NOT to Use

- Rust removes the Python runtime from the process, which is the whole argument, and also removes the Python ecosystem you would otherwise reuse for free.
- Compile-time feature flags select the backend, so a CUDA or Metal build is a different artefact from a CPU build and the difference is invisible until link time.
- Ecosystem coverage is the constraint: an option with no Rust implementation means a port, not an install.

## Integration Patterns

- Link a Rust-native option here from inference-engine and edge entries, where removing the Python runtime is the deciding argument.
- When a crate's feature flags change, check the deployment guidance in every entry that depends on it.

## Resources

- Linked tool entries in the table below carry the authoritative detail

## Buzz & Reception

This page is a maintained routing surface; the tool table below is auto-refreshed and is not a popularity ranking.

<!-- AUTO-GENERATED TOOL TABLE BELOW — do not edit -->
| Tool | Phase | Jobs | Cost model | Free tier | Self-hostable | Open source | Stack | Verdict |
|---|---|---|---|---|---|---|---|---|
| [CubeSandbox](../serving-and-deployment/cubesandbox.md) | serving and deployment | deployment, security-and-guardrails | open-source | Yes | Yes | Yes | rust | watching |
| [Goose](../dx-and-tooling/goose.md) | dx and tooling | prototyping, orchestration | open-source | Yes | Yes | Yes | rust | recommended |
| [Jan](../dx-and-tooling/jan.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | typescript, rust | solid-choice |
| [llmfit](../model-layer/llmfit.md) | model layer | fine-tuning | open-source | Yes | Yes | Yes | rust | recommended |
| [LoRAX](../serving-and-deployment/lorax.md) | serving and deployment | production-serving | open-source | Yes | Yes | Yes | python, rust | solid-choice |
| [Meilisearch](../data-ingestion/meilisearch.md) | data ingestion | vector-search | freemium | Yes | Yes | Yes | rust | recommended |
| [OpenAI Codex CLI](../dx-and-tooling/openai-codex-cli.md) | dx and tooling | prototyping | usage-based | No | No | Yes | rust | recommended |
| [rtk](../dx-and-tooling/rtk.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | rust | recommended |
| [Tabby](../dx-and-tooling/tabby-ml.md) | dx and tooling | prototyping | open-source | Yes | Yes | Yes | rust | solid-choice |
| [Text Embeddings Inference (TEI)](../serving-and-deployment/text-embeddings-inference.md) | serving and deployment | production-serving, vector-search | open-source | Yes | Yes | Yes | rust | recommended |
