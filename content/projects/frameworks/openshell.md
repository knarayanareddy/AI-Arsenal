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
org_or_maintainer: NVIDIA
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 13
trending_score: 31
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
status: active
id: openshell
name: OpenShell
artifact_type: platform
category: tooling
subcategory: platforms
description: NVIDIA's Rust sandboxed runtime for autonomous agents, governed by declarative YAML policies for files, network, and data exfiltration
github_url: https://github.com/NVIDIA/OpenShell
license: Apache-2.0
primary_language: Rust
tags:
  - agents
  - security
  - self-hosted
  - kubernetes
maturity: alpha
cost_model: self-hostable
github_stars: 7685
last_commit: '2026-07-20'
docs_url: https://docs.nvidia.com/openshell/latest/index.html
phase: framework
domain:
  - general-purpose
relation_to_stack:
  - deploy-as-is
  - build-on-top
health_signals:
  - org-backed
  - experimental
ecosystem_role:
  - NVIDIA Rust runtime for policy-governed autonomous-agent sandboxes
  - Agent-specific isolation alternative to broad container permissions
best_for:
  - Running untrusted agent tools with explicit policy
  - Building a private execution layer for autonomous workflows
avoid_if:
  - You need a mature, compliance-certified isolation platform today
  - Your workload cannot tolerate MicroVM startup or policy integration overhead
enrichment_notes: OpenShell is explicitly Alpha; its sandbox and policy guarantees require threat-model testing rather than assumption. Draft pending review.
---

## Overview

OpenShell addresses the missing runtime boundary around autonomous agents. Instead of allowing a tool-using model to share the host filesystem and network, it starts work inside an isolated sandbox whose allowed capabilities are declared and reviewable as configuration.

## Why it's in the Arsenal

OpenShell earns a slot because it makes the runtime boundary around autonomous agents explicit: MicroVM or container isolation is governed by declarative policy rather than broad host permissions. NVIDIA's Rust implementation and YAML controls target file access, network reachability, and exfiltration risks that ordinary agent frameworks leave to operators.

## Architecture

The Rust runtime combines MicroVM/container isolation with declarative YAML policy for file access, network reachability, and exfiltration controls. Agent processes execute inside the sandbox while the host-side control plane manages lifecycle and policy; Kubernetes or container deployment details should be validated against the target environment.

## Ecosystem Position

OpenShell complements agent frameworks and competes with generic containers, gVisor, and other sandbox runtimes. Its agent-specific policy vocabulary is an alternative to relying on broad Docker permissions, but it is infrastructure rather than an orchestration framework, model gateway, or complete security program.

## Getting Started

Install the Alpha release from NVIDIA's documented distribution, provision the required container or MicroVM backend, and write a minimal YAML policy allowing only a test workspace and approved network destination. Launch one agent inside the sandbox, inspect policy and logs, then expand capabilities incrementally.

## Key Use Cases

Use OpenShell to run coding agents that need a compiler but must not read host secrets, or to isolate research agents that can fetch approved data without arbitrary egress. It is also useful for testing deny-by-default policy and measuring the startup and throughput cost of stronger isolation.

## Strengths

The runtime is written in Rust and combines sandbox lifecycle management with declarative YAML policy for filesystem, network, and exfiltration controls. Its focus on autonomous-agent capabilities is more precise than granting a generic Docker container broad access.

## Limitations

Alpha status means isolation, escape resistance, startup latency, and policy completeness need adversarial validation. YAML mistakes can over-permit tools, and agents can still misuse every capability granted; operators must layer identity, secrets management, network controls, logging, and human approval.

## Relation to the Arsenal

OpenShell complements nanobot, Symphony, and other agent orchestration entries by supplying the execution boundary, while competing with Docker, gVisor, and MicroVM sandbox approaches. It belongs below the agent loop and beside deployment infrastructure, not inside model training or prompt management.

## Resources

- [GitHub](https://github.com/NVIDIA/OpenShell)
- [Documentation](https://docs.nvidia.com/openshell/latest/index.html)
