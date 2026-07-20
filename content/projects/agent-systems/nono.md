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
org_or_maintainer: nolabs-ai
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 80
trending_score: 36
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
status: active
id: nono
name: nono
artifact_type: platform
category: tooling
subcategory: platforms
description: Rust sandbox for isolating AI-agent execution with zero-setup positioning
github_url: https://github.com/nolabs-ai/nono
license: Apache-2.0
primary_language: Rust
tags:
  - security
  - guardrails
  - agents
  - self-hosted
  - local
  - docker
maturity: beta
cost_model: open-source
github_stars: 3055
last_commit: '2026-07-20'
docs_url: https://github.com/nolabs-ai/nono
phase: agent-system
domain:
  - language
  - general-purpose
relation_to_stack:
  - deploy-as-is
  - fork-and-adapt
health_signals:
  - actively-maintained
  - community-driven
ecosystem_role:
  - A process and syscall sandbox candidate for constraining agent-created commands, files, network connections, and descendants.
best_for:
  - You need a local execution boundary around an agent’s shell, code, or tool process.
  - You can test the sandbox on the target operating systems and define explicit allowed paths, commands, and network destinations.
avoid_if:
  - You need a cloud multi-tenant isolation guarantee without validating the host kernel and deployment mode.
  - You cannot tolerate platform-specific behavior when a process daemonizes, uses seccomp, or accesses credentials.
enrichment_notes: Official repository, Apache-2.0 license, Rust implementation, and 2026-07-10 activity were reviewed on 2026-07-11. Isolation guarantees remain draft pending hands-on threat-model testing.
---

## Overview

nono is a Rust sandbox for running AI-agent workloads with constrained process, filesystem, and network behavior. Its purpose is to put a policy boundary around code and commands that an agent wants to execute, rather than asking the model to decide whether its own tool call is safe.

## Why it's in the Arsenal

Agent isolation is a separate problem from prompt injection detection. A model may be manipulated into requesting a dangerous command even when the command looks ordinary, so the host needs a second control point. nono is worth evaluating as a local sandbox, while its “zero setup” positioning should not be confused with a universal container or kernel isolation guarantee.

## Architecture

The Rust implementation uses operating-system process and syscall mechanisms, including supervisor behavior and seccomp-notify paths on supported systems, to mediate commands and descendants. The boundary can cover executable paths, filesystem access, network operations, and selected process behavior. The hard cases are the important ones: a child can daemonize or reparent, a permitted binary can access more than expected, and policy behavior differs by OS and kernel. Test these paths directly rather than validating only a successful shell command.

## Ecosystem Position

nono sits below coding agents and tool runners as an execution boundary. It complements an agent framework, MCP gateway, or application-level policy engine, and competes with containers, sandboxed runners, and OS-specific isolation tools. The comparison should include escape resistance, startup cost, policy expressiveness, observability, and the consequence of a denied syscall.

## Getting Started

Run a harmless command, then test denied file, network, process, and credential paths in a disposable environment. Exercise child processes, backgrounding, symlinks, shell expansion, and cleanup. Record the kernel/OS, policy, supervisor logs, and actual process tree before granting access to real repositories or secrets.

## Key Use Cases

- Local coding-agent and tool execution with explicit filesystem and network constraints.
- Testing whether an agent can operate inside a smaller, reviewable permission boundary.

## Strengths

- Places enforcement below model-generated tool decisions.
- Rust implementation, Apache-2.0 licensing, and active security-focused development make the boundary inspectable.

## Limitations

- Sandbox strength is platform- and configuration-dependent; a successful local test is not a multi-tenant security proof.
- Restrictive policies can break legitimate toolchains, background processes, or model runtimes.
- The operator still needs secret isolation, audit logging, patching, and a response plan for sandbox violations.

## Relation to the Arsenal

nono is an agent-system security component, not an agent framework. Pair it with least-privilege tool policy, MCP governance, and adversarial tests that assume the model may issue malicious or confused commands.

## Resources

- [Official source](https://github.com/nolabs-ai/nono)
