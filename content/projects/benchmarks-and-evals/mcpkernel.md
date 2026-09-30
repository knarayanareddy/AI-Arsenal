---
id: mcpkernel
name: mcpkernel
version_tracked: null
artifact_type: library
category: evaluation
subcategory: evaluation
description: "An MCP and A2A gateway that enforces policy, tracks taint, sandboxes tool calls, and signs audit records with Sigstore attestations"
github_url: "https://github.com/piyushptiwari1/mcpkernel"
license: Apache-2.0
primary_language: Python
tags: [security, tool-use, guardrails]
maturity: experimental
cost_model: open-source
github_stars: 2
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-06-16"
docs_url: "https://piyushptiwari1.github.io/mcpkernel/"
demo_url: null
phase: benchmark-and-eval
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Makes the agent-to-tool boundary the control point, scanning results before the model ever sees them."
best_for:
  - "You are exposing third-party MCP tool servers to an agent and need one policy layer between the model and those tools."
  - "You are handling untrusted tool output and need secrets and PII scanned out of results before they enter the context window."
  - "You need tamper-evident records of agent actions for audit, including signed DSSE in-toto attestations rather than plain logs."
avoid_if:
  - "You have a two-star dependency that has never run in production, because the repository itself shows 2 stars and a mid-2026 last commit."
  - "You cannot accept an extra hop in every tool call, since every call is proxied through the gateway."
  - "You are on an MCP client that cannot point at an HTTP gateway, since proxy mode replaces direct stdio connections."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 2, Apache-2.0, Python, last commit 2026-06-16, topics, homepage. From README: v0.3.0 features, PL001-PL007 lint codes, RFC 8707 default, Sigstore/DSSE in-toto, CycloneDX 1.6 SBOM, 718 tests and 86% coverage badges, Python 3.12+. OWASP claim unverified."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

MCPKernel sits between an MCP client and its tool servers and claims OWASP ASI 2026 compliance coverage for agentic AI. The v0.3.0 release list describes the mechanism set: post-execution taint scanning that inspects both content and structuredContent for secrets and PII before the agent sees them, with elicitation responses auto-tainted as USER_INPUT; RFC 8707 enforced by default, making audience binding mandatory in OAuth2Auth; Sigstore Bundle v0.3 with DSSE in-toto attestations via mcpkernel.audit.attest_audit_batch, producing SLSA-ready signed statements; a policy-lint command doing static analysis over rule sets under codes PL001 through PL007, catching duplicate IDs, unmatchable rules, ReDoS, shadowed denies, and missing OWASP maps; and supply-chain hardening with a CycloneDX 1.6 SBOM on every release, a committed uv.lock, CodeQL, and Hypothesis fuzz tests on the JSON-RPC parser.

## Why it's in the Arsenal

The recurring decision is what to trust once you install third-party MCP servers into an agent. Tool poisoning, rug-pull description changes, prompt injection in tool output, and data exfiltration are all attacks on the boundary between model and tool, and that boundary is usually unguarded. Scanning results rather than only requests is the design choice that matters: a tool that returns a credential in its body has already leaked into the context window by the time a request-side filter runs. Fencing tools behind a policy layer also gives you one place to revoke, which is otherwise impossible across a dozen independently installed servers.

## Architecture

Three deployment shapes cover most cases. Gateway mode runs mcpkernel serve and clients point at http://localhost:8000/mcp, so the proxy sits on every call path. Tool mode installs the kernel itself as an MCP server into an IDE - claude, cursor, vscode, windsurf, zed, openclaw, or goose - exposing scan, taint-check, and policy-validate calls to the agent directly. The Python API offers MCPKernelProxy for programmatic use with upstream lists and a policy level, plus a @protect decorator that applies the same policy and taint handling to a single async function. Data flow is inspect then authorize then execute then scan then log: policy is evaluated against the call, execution happens in a sandbox, results are taint-scanned on the way back, and the record is eligible for batch attestation.

## Ecosystem Position

MCPKernel competes with LLM firewalls and guardrail layers such as Lakera Guard, Protect AI, or the guardrails-style output validators, but at the protocol layer rather than as a model wrapper. Compared with a guardrail library in the agent process, gateway placement covers every tool regardless of which agent process invoked it, which is the property that matters when your tools outnumber your agents. It overlaps with other MCP servers in content/projects/data-and-retrieval in protocol but not in purpose - those extend capability while this constrains it, and the two compose by pointing the gateway at them. It complements content/projects/frameworks by adding an enforcement point beneath any harness, and its OWASP mapping is documentation rather than evaluation, so it does not substitute for content/projects/benchmark-and-eval.

## Getting Started

Install with the all extra, scaffold policy files, and serve the gateway; or install it into a specific IDE as an MCP server.

```bash
pip install "mcpkernel[all]"
mcpkernel init                  # scaffold .env, policies/, agent.yaml
mcpkernel serve --host 127.0.0.1 --port 8000
# or install into a client directly
pip install mcpkernel && mcpkernel install claude
```

Python 3.12 or newer is required. Every setting is configurable through environment variables listed in .env.example.

## Key Use Cases

1. Gate untrusted tool servers: put the gateway in front of third-party MCP servers so policy, sandboxing, and taint scanning apply to all of them at once.
2. Stop context poisoning: have tool results scanned for secrets and PII before the model reads them, and have elicitation answers auto-tainted as user input.
3. Produce audit evidence: roll audit records into signed DSSE in-toto attestations with a CycloneDX SBOM attached to each release.

## Strengths

- Scans tool output, not just tool calls, which closes the exfiltration path before data reaches the context window.
- Three adoption shapes - gateway proxy, IDE MCP server, Python decorator - so enforcement fits whatever you already run.
- policy-lint catches the rule-set mistakes that silently disable enforcement: duplicate IDs, unmatchable rules, and shadowed denies.
- Real supply-chain hygiene for a security tool: SBOM per release, pinned uv.lock, CodeQL, and Hypothesis fuzzing of the JSON-RPC parser.

## Limitations

Adoption risk is the headline problem: the repository shows 2 GitHub stars and a last commit months behind the rest of this batch, so there is no evidence of production use, no community to report bugs to, and the audit badge claiming 718 passing tests reflects one author's suite. Adding a gateway hop to every tool call adds latency and a new failure mode, and strict policy will block legitimate calls until you tune it. The OWASP ASI 2026 claim is self-assessed against a mapping document rather than audited by anyone else. Sandbox strength depends on the backend chosen, and the README does not specify the isolation primitive. Requiring Python 3.12 narrows where it can run.

## Relation to the Arsenal

This benchmark-and-eval-phase entry is a control point rather than an assessment, sitting in the verification family because it produces the evidence an auditor reads. It constrains the tool surface that content/projects/data-and-retrieval exposes, and it enforces beneath whatever harness in content/projects/frameworks is making the calls. It hosts no model, so content/projects/inference-engines is untouched, and its policy mapping is documentation rather than a measured benchmark.

## Resources

- [Repository and threat model](https://github.com/piyushptiwari1/mcpkernel)
- [Documentation site](https://piyushptiwari1.github.io/mcpkernel/)
- [PyPI package](https://pypi.org/project/mcpkernel/)
