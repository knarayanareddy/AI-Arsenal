---
id: liu-2026-mcp-execution-control
title: "From Tool Connection to Execution Control: Benchmarking Security Invariants in MCP-Style Agent Runtimes"
phase: evaluation-and-safety
venue: arxiv-preprint
year: 2026
authors:
  - Ting Liu
arxiv_id: '2606.29073'
arxiv_url: https://arxiv.org/abs/2606.29073
pdf_url: https://arxiv.org/pdf/2606.29073
code_url: null
venue_url: https://arxiv.org/abs/2606.29073
practical_applicability: high
reproduction_status: not-reproduced
result_status: current
has_code: false
citation_count_approx: 0
tldr: "Argues that MCP-style connection conventions need an explicit execution-control layer with principals, capabilities, data-flow checks, and deny-path audit."
key_contribution: "Defines eight execution invariants and evaluates a Handle-Capability Protocol runtime against a naive connection layer and a mitigation baseline across ten modeled attack cases."
superseded_by: null
builds_on: []
implemented_in: []
corresponding_project_entry: null
tags:
  - agents
  - security
  - evaluation
  - tool-use
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
enrichment_status: draft
---

## Overview

This paper examines the security gap between connecting an agent to a tool and controlling what that tool execution is allowed to do. In MCP-style systems, decisions can be scattered across client metadata, prompts, approval dialogs, OAuth configuration, servers, and logs. The proposed answer is an execution layer with explicit principals, resources, grants, capabilities, data pipes, policy decisions, and audit entries.

## Why it's in the Arsenal

The paper addresses a concrete architecture failure: a client may know which tool is connected without proving who authorized a particular invocation or where its data can flow. That distinction matters for agent platforms, MCP gateways, and sandbox designs. The result is a narrow modeled benchmark, but the invariants are useful as a checklist for real implementations.

## Core Contribution

The paper defines eight invariants: metadata non-authority, grant-backed approval, canonical resources, principal binding, scoped capability invocation, source-and-target data-flow authorization, deny-path audit, and explicit protocol state. It implements them in HCP, a Handle-Capability Protocol reference runtime for MCP-style execution, rather than adding another client-side convention.

## Key Results

- In the ten-case benchmark, the naive connection-layer runtime permits all modeled attacks (2026).
- A mitigation baseline with metadata linting, session checks, and per-call approvals permits 6 of 10 modeled attacks (2026).
- HCP blocks all ten modeled cases while preserving audit evidence (2026).
- A local in-memory microbenchmark reports sub-millisecond mean latency for the measured policy, invocation, peek, and pipe operations (2026).

## Methodology

HCP is compared with two MCP-like baselines: a naive connection layer and a practice-informed mitigation layer. The benchmark exercises the stated invariants and uses ablations to identify which runtime components block attacks or preserve forensic evidence. A bounded GitHub README-screening sample is explicitly treated as ecosystem context, not as a vulnerability study.

## Practical Applicability

Turn the eight invariants into integration tests for an MCP runtime: vary principal, resource, grant, capability, source, destination, approval, and protocol state; assert both denial and audit records. Use the paper’s distinction between metadata and authority to review client-supplied tool descriptions and approval flows.

## Limitations & Critiques

Ten modeled cases cannot establish broad attack coverage, and an in-memory microbenchmark does not predict distributed or cryptographic overhead. HCP’s policy model may make guarantees easier to state than in a legacy runtime. The paper’s narrow claim is persuasive as a design warning, but independent implementation and adversarial testing are still required.

## Reproductions & Follow-up Work

Implement the invariants in an existing MCP gateway, reproduce the ten cases, and add confused-deputy, cross-tenant, replay, redirect, and partial-failure scenarios. Measure policy latency, operator usability, false denials, and audit completeness under real tool traffic.

## Relation to the Arsenal

This paper connects MCP operations, agent security, sandboxing, authorization, and auditability. It complements egress firewalls and tool-management platforms by specifying what an execution-control layer should make explicit.

## Resources

- [Primary source](https://arxiv.org/abs/2606.29073)
- [HTML paper](https://arxiv.org/html/2606.29073v1)
