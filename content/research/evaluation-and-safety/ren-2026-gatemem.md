---
id: ren-2026-gatemem
title: "GateMem: Benchmarking Memory Governance in Multi-Principal Shared-Memory Agents"
phase: evaluation-and-safety
venue: arxiv-preprint
year: 2026
authors:
  - Zhe Ren
  - Yibo Yang
  - Yimeng Chen
  - Zijun Zhao
  - Benshuo Fu
  - Zhihao Shu
  - Bingjie Zhang
  - Yangyang Xu
  - Dandan Guo
  - Shuicheng Yan
arxiv_id: '2606.18829'
arxiv_url: https://arxiv.org/abs/2606.18829
pdf_url: https://arxiv.org/pdf/2606.18829
code_url: https://github.com/rzhub/GateMem
venue_url: https://arxiv.org/abs/2606.18829
practical_applicability: medium
reproduction_status: code-available
result_status: current
has_code: true
citation_count_approx: 0
tldr: "Tests whether shared agent memory can provide useful long-horizon assistance without crossing principal boundaries or retaining explicitly deleted information."
key_contribution: "Combines utility, contextual authorization, and active-forgetting tests in multi-party episodes spanning medical, office, education, and household settings."
superseded_by: null
builds_on: []
implemented_in: []
corresponding_project_entry: null
tags:
  - evaluation
  - benchmark
  - agents
  - memory
  - security
  - research
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
enrichment_status: draft
---

## Overview

GateMem evaluates a failure mode that ordinary memory benchmarks largely omit: several principals share one memory pool, but their requests have different roles, scopes, and deletion rights. A system can have excellent recall and still be unsafe if it returns another person’s memory or resurrects information after deletion.

## Why it's in the Arsenal

The benchmark maps directly to multi-tenant assistants, workplace copilots, household devices, and clinical systems. It is valuable as a reminder that memory quality has at least three axes—usefulness, authorization, and forgetting—and that optimizing only the first can make a shared assistant less trustworthy.

## Core Contribution

GateMem constructs multi-principal episodes with state updates, contextual access boundaries, hidden checkpoints, structured judging, and leak-target annotations. It evaluates whether an agent can complete legitimate long-horizon requests while refusing cross-principal retrieval and honoring an explicit deletion request. The accompanying code and dataset make the governance questions inspectable rather than leaving them as prose requirements.

## Key Results

- Across the paper’s baselines, no method simultaneously achieves strong utility, access control, and reliable forgetting (2026).
- Long-context prompting often provides the strongest governance score in the reported setup, but at high token cost (2026).
- Retrieval and external-memory methods reduce cost while still leaking unauthorized or deleted information in some conditions (2026).

## Methodology

The benchmark spans medical, office, education, and household scenarios. Episodes add memories over time, assign different principals and roles, insert hidden checks, and issue deletion requests. The authors compare long-context prompting and external-memory approaches using structured judgments and targeted leakage annotations rather than only answer accuracy.

## Practical Applicability

Translate the benchmark into a tenant-isolation test for any shared assistant: create principals with overlapping facts, change authorization mid-session, delete a memory, and inspect both direct and indirect retrieval. Record utility, leakage, deletion latency, and token cost separately.

## Limitations & Critiques

The domain scenarios, role definitions, annotations, and judge behavior determine what counts as a leak. Strong benchmark performance would not prove that an implementation satisfies a regulatory deletion request or a real organization’s access-control model. The preprint also does not remove the need for storage-level deletion and audit evidence.

## Reproductions & Follow-up Work

Run the official code and dataset, then add the application’s real principals, policy engine, memory store, and deletion semantics. Inspect raw leakage cases and false denials, not just the aggregate governance score; test prompt injection and stale authorization as separate threats.

## Relation to the Arsenal

GateMem connects agent memory, security evaluation, multi-tenancy, and observability. It should be paired with authorization design and incident response, not treated as a substitute for a security review.

## Resources

- [Primary source](https://arxiv.org/abs/2606.18829)
- [PDF](https://arxiv.org/pdf/2606.18829)
- [Official code](https://github.com/rzhub/GateMem)
