---
id: "stack-go"
title: "Tools by Stack — Go"
entry_type: "guide"
section: "tools"
description: "Tools in the Arsenal filtered by Stack facet Go, with an auto-generated routing table that keeps this page current"
tags:
  - llm
  - data
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: "maintainer"
status: "active"
---

## Overview

The shortlist for a Go service, filtered to what fits a compiled, statically typed build. The defining constraint is that the ML ecosystem in Go is thin, so the realistic architecture is a Go client to a purpose-built inference server rather than embedded inference.

## Why It's in the Arsenal

A compiled, statically typed service that cannot depend on Python has a realistic architecture available to it, and it is usually a client to a purpose-built server rather than embedded inference. Grouping by stack keeps that honest, rather than implying a Go-native model runtime exists for every workload.

## Key Features

- Every entry fits a compiled, statically typed service without adding a second language to the build.
- Streaming, retry and backoff behaviour is documented per entry, since it is what production actually depends on.
- Where the answer is a client to an inference server, that is stated rather than dressed up as an in-process option.

## Architecture / How It Works

Each entry records whether it runs in-process or behind an HTTP contract, which is the architectural decision a Go team is actually making. The page is generated from the stack facet, with the client semantics documented in the tool entry where the retry and streaming behaviour is specific.

## Getting Started

Pick a tool from the table below and validate it with a small proof of concept before adoption.

## Use Cases

1. **Scenario**: you are adding AI capability to a Go service and need to know what runs in-process versus what needs a sidecar.
2. **Scenario**: you are choosing a Go client library and need to know whether its streaming and retry behaviour is production-shaped.
3. **Scenario**: you are standardising on Go across a fleet and need tooling that does not introduce a second language into the build.

## Strengths

- Filters to what fits a compiled, statically typed service without introducing a second language into the build.
- Emphasises that the realistic Go pattern is a client to a purpose-built server, not embedded inference.
- Notes that interface-based clients ease swapping while also hiding behavioural differences between providers.

## Limitations / When NOT to Use

- Go's concurrency model suits streaming and fan-out well, so HTTP and SSE clients here tend to be the stronger option compared with a blocking client in another language.
- The ML ecosystem in Go is thinner than Python's, so the practical pattern is a Go service calling a purpose-built inference server rather than embedding a model.
- Interface-based clients make it easy to swap providers, which is useful, and also easy to hide a behavioural difference between them.

## Integration Patterns

- Link a Go client here from any entry whose documented integration path is an HTTP call from Go.
- When a provider's streaming semantics change, check the Go client entry specifically, since retry and backoff behaviour lives there.

## Resources

- Linked tool entries in the table below carry the authoritative detail

## Buzz & Reception

This page is a maintained routing surface; the tool table below is auto-refreshed and is not a popularity ranking.

<!-- AUTO-GENERATED TOOL TABLE BELOW — do not edit -->
| Tool | Phase | Jobs | Cost model | Free tier | Self-hostable | Open source | Stack | Verdict |
|---|---|---|---|---|---|---|---|---|
| [Envoy AI Gateway](../serving-and-deployment/ai-gateway.md) | serving and deployment | production-serving, deployment | open-source | Yes | Yes | Yes | go | recommended |
| [Cog (Replicate)](../serving-and-deployment/cog.md) | serving and deployment | deployment | open-source | Yes | Yes | Yes | python, go | solid-choice |
| [E2B](../orchestration/e2b.md) | orchestration | orchestration | usage-based | Yes | Yes | Yes | typescript, python, go | recommended |
| [KServe](../serving-and-deployment/kserve.md) | serving and deployment | production-serving, deployment | open-source | Yes | Yes | Yes | go, python | solid-choice |
| [KubeAI](../serving-and-deployment/kubeai.md) | serving and deployment | deployment, production-serving | open-source | Yes | Yes | Yes | go | solid-choice |
| [Temporal](../orchestration/temporal.md) | orchestration | orchestration | self-hostable | Yes | Yes | Yes | go, polyglot | recommended |
| [ToolHive](../serving-and-deployment/toolhive.md) | serving and deployment | security-and-guardrails, deployment | open-source | No | Yes | Yes | go | watching |
