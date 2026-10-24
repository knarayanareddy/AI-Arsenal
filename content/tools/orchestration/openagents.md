---
id: openagents
name: "OpenAgents"
type: tool
job: [orchestration]
description: "TypeScript runtime for peer-to-peer agent networks with capability discovery and task routing"
url: "https://github.com/openagents-org/openagents"
cost_model: open-source
pricing_detail: "Apache-2.0 source; you fund the model providers each node calls"
tags: [agents, orchestration, routing, serverless, cloud]
maturity: beta
stack: [typescript]
free_tier: true
free_tier_limits: "Apache-2.0 source is unrestricted; inference and hosting are yours to pay for"
self_hostable: true
open_source: true
source_url: "https://github.com/openagents-org/openagents"
docs_url: null
github_url: "https://github.com/openagents-org/openagents"
alternatives: [langroid, agents-anywhere]
integrates_with: []
added_date: "2026-10-18"
last_reviewed: "2026-10-18"
added_by: repo-maintainer
reviewed_by: null
verdict: watching
verdict_rationale: "Takes agent-to-agent networking seriously, with discovery and task routing built in; the distributed failure modes and beta protocols are the open risk"
status: active
phase: orchestration
audience: [prototype, research]
best_when:
  - "Agents run as independent services that must find each other by declared capability rather than by a hard-coded address"
  - "Node.js or edge runtimes are already the deployment target and a Python sidecar would be an unwanted second stack"
avoid_when:
  - "One process and one model already deliver the behaviour, so a network protocol adds failure modes without adding capability"
  - "You need protocol stability guarantees before shipping, given that the contracts are still evolving"
version_tracked: null
enrichment_status: draft
enrichment_notes: "Architecture summarised from the repository README; no multi-node cluster was deployed for this entry and the beta protocols were not exercised."
buzz_sources: []
---

## Overview

OpenAgents treats a multi-agent system as a network rather than a program. Agents register the capabilities they offer, publish and discover tasks, and negotiate execution with peers, rather than being composed ahead of time by a controller that knows every participant.

Written in TypeScript, it targets the runtime most web teams already operate: Node services, serverless functions and edge workers. The runtime localises the parts that distributed systems always need here — message routing, state exchange, execution permissions — so agent code can stay about the task while the transport handles delivery.

Model access is provider-agnostic, which is what allows a cluster to mix a cheap local model for routing with a hosted model for reasoning without rewriting the collaboration logic.

## Why It's in the Arsenal

The Arsenal catalogues orchestration frameworks that differ mainly in how they decide who does what. Most answer with a static composition; OpenAgents answers with discovery and negotiation, which is the right shape when the set of agents is not known at build time or spans organisational boundaries.

It is also the entry that makes distributed-systems cost visible in this vertical: once agents are separate nodes, partial failure, duplicate delivery and cascading timeouts become normal operational events rather than exceptions.

## Key Features

- Capability registration and discovery, so tasks match to agents by declared function rather than configured identity.
- Peer-to-peer task negotiation with delegation and completion verification, avoiding a single controller as a failure point.
- Shared workspace state for passing memory snapshots and execution history across node boundaries.
- A typed TypeScript SDK with runtime and middleware primitives for Node and browser environments.
- Pluggable transports over WebSocket and HTTP for multi-host deployment.

## Architecture / How It Works

Each node runs the runtime, registers a capability manifest and joins the network. A submitted task is matched against that manifest, negotiated with the offering node, executed there and reported back with a completion record. State that several agents need — a working document, a partial plan — moves through structured context messages rather than a shared database, which keeps nodes loosely coupled but makes versioning the contract important.

Transport is pluggable, so the same protocol can run over a WebSocket mesh between long-lived services or over HTTP calls between serverless functions, with delivery guarantees determined by the chosen driver rather than by the framework.

## Getting Started

Bring up two nodes locally first — one offering a trivial capability, one submitting a task — and watch the discovery and completion handshake before introducing a real model. Add a second model provider and a failure case (kill one node mid-task) early: the interesting behaviour of this framework is what happens when a peer disappears, and that is cheapest to observe in development.

## Use Cases

1. A platform team exposing several specialised agents — retrieval, code execution, analysis — that other teams call without knowing deployment topology.
2. Edge deployments where a worker agent runs close to users and defers heavy reasoning to a central node with a stronger model.
3. Prototyping capability-based routing as an alternative to a hard-coded orchestrator, then measuring how often discovery chooses a worse agent.
4. Multi-team experiments where each team owns a node, its model budget and its tool permissions.

## Strengths

- Capability-based discovery decouples callers from deployment, which is the property that makes agent fleets composable across teams.
- The TypeScript runtime lands in an existing web deployment model rather than requiring a new one.
- Provider-agnostic node configuration lets cost and capability be tuned per participant instead of per system.
- No mandatory central controller means a coordinator outage degrades routing rather than stopping execution.

## Limitations / When NOT to Use

- Distributed failure modes arrive with the architecture: lost messages, split views of membership, and timeouts that cascade through negotiated tasks.
- Moving data between nodes appears in the ML tooling gap: vector store clients and document parsers are Python-first, so wrappers or RPC bridges become your work.
- Beta protocols means version alignment across nodes is a deployment constraint; a rolling upgrade can leave peers unable to negotiate.
- For a small deterministic workflow the network is pure overhead compared with a single process calling functions in order.

## Integration Patterns

Run each node behind your existing service mesh and treat the capability manifest as an API contract that is versioned alongside the code. Give every task a correlation identifier and make completion handling idempotent, because negotiation retries are normal. For observability, trace the task identifier across nodes — a single logical task touching three agents should produce one trace, not three unrelated span trees.

## Resources

- [GitHub — openagents-org/openagents](https://github.com/openagents-org/openagents)

## Buzz & Reception

The entry is based on the project's repository and documentation; no independent multi-node deployment report is recorded, and the beta protocol status means the design should be read as a direction rather than a settled contract. Worth watching: whether real deployments keep the peer-to-peer model once operational complexity shows up.
