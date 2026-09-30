---
id: autocve
name: AutoCVE
version_tracked: null
artifact_type: library
category: evaluation
subcategory: evaluation
description: A multi-agent platform that audits source code for reportable vulnerabilities and produces CVE-ready findings with reproduction steps
github_url: "https://github.com/larlarua/AutoCVE"
license: AGPL-3.0
primary_language: Python
tags: [security, agents]
maturity: beta
cost_model: self-hostable
github_stars: 1425
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-03"
docs_url: null
demo_url: null
phase: benchmark-and-eval
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Replaces a one-shot audit prompt with an orchestrated agent pipeline that filters tool false positives before deep verification."
best_for:
  - "You are hunting CVEs in open-source projects and need the full loop from repository import through deduplicated findings to a submission-ready report."
  - "You are triaging a scanner's output and need an agent to explain why each finding is or is not real rather than reading raw SAST JSON yourself."
  - "You are running security research as a team and want the audit trail, agent tree, and tool calls preserved per session for later review."
avoid_if:
  - "You need a scanner that is safe to point at untrusted repositories, because agents execute analysis tooling against code you import."
  - "You are deploying without a plan for the AGPL-3.0 obligations, which reach any network service you expose from modified code."
  - "You are evaluating an audit whose output feeds a disclosure process, because agent-produced severity calls need human verification before disclosure."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 1425, AGPL-3.0, Python, last commit 2026-09-03, topics. From README: five-agent graph, three audit modes, ReAct loop, FinalizeFinding, port layout, pinned v1.0.5 compose URL, 30 CVE and 14 project badges. CVE claim not independently verified; accuracy untested."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

AutoCVE automates the path from selecting a target project to importing its repository, creating an audit task, running agents to find vulnerabilities, and generating a CVE application report that a human copies and submits. The Orchestrator dispatches five roles: Recon for information collection, Scan for tool-driven scanning, Triage for false-positive filtering, Finding for deep source-level analysis aimed at high-value and zero-day issues, and Verification for dynamic proof, merging into a finalize step. Three audit modes change which agents run - enhanced scan is Scan to Triage, intelligent audit runs Finding alone, and comprehensive audit combines both paths. The Finding Agent is the CVE-specific core, using a ReAct loop, dedicated tools, nudge-based course correction, and a structured FinalizeFinding termination that produces something meeting disclosure bar.

## Why it's in the Arsenal

The recurring problem in vulnerability research is that tool output is mostly noise: a static scanner flags hundreds of candidates and a researcher has to triage them by hand before any real bug emerges. Splitting the pipeline so Triage filters before Finding spends model budget turns a token-expensive deep search into something you can actually run across many projects. Standardizing termination on a structured finding object also makes results machine-readable, which is what allows deduplication across audits and the claim of tens of CVEs already produced from a limited project set.

## Architecture

The stack is FastAPI on the backend with a React frontend, Python 3.11 or newer, and PostgreSQL 15, deployed via Docker Compose with the frontend on port 3000, the API on 8000 with Swagger at /docs, and Adminer on 8080. The Orchestrator holds a directed graph: Recon fans out to both Scan and Finding, Scan flows to Triage, Triage and Finding both converge on Verification, and Verification merges into finalize. Audit sessions persist the full execution path - activity log, agent tree, tool invocations, stage progress, preliminary report, and the session itself - which is what makes interactive follow-up queries about a result possible. Findings are submitted through tools, deduplicated, and stored as structured records; per-agent Skills are configurable to extend capability boundaries.

## Ecosystem Position

AutoCVE overlaps with Semgrep, CodeQL, and Snyk as static analysis, adding an agent layer that explains and filters their output rather than replacing their rule engines. It competes with commercial vulnerability-research platforms that sell curated zero-day pipelines, and compared with a plain coding agent pointed at a repository, the difference is the orchestrator graph and the structured finding contract. Unlike AutoPentest-style fuzzing harnesses that drive binaries blindly, this works from source reading plus targeted tool calls. Its LangGraph-shaped agent graph resembles the orchestration patterns in content/projects/frameworks, its dependency and advisory metadata lookups overlap with the vulnerability-intelligence feeds in content/projects/data-and-retrieval, and its model calls sit above whatever backend content/projects/inference-engines serves.

## Getting Started

The README documents a one-line deployment that fetches a pinned compose file, plus a source path for local development. Python 3.11+ and Docker are required.

```bash
curl -fsSL https://raw.githubusercontent.com/larlarua/AutoCVE/v1.0.5/docker-compose.prod.yml | docker compose -f - up -d
# or from source
git clone https://github.com/larlarua/AutoCVE.git && cd AutoCVE && docker compose up -d --build
```

Open http://localhost:3000, configure a model, import a project, then create an audit task and watch the agent tree execute.

## Key Use Cases

1. Run a CVE research cycle: pick an open-source project, run comprehensive audit, and receive deduplicated findings that already include evidence and reproduction steps.
2. Cut triage labor: run enhanced scan so the Scan and Triage agents filter a scanner's candidates before a human reads anything.
3. Investigate interactively: after an audit, ask follow-up questions in the session context to expand the attack chain, add evidence, or improve reproduction steps.

## Strengths

- Five-agent orchestrator with explicit fan-out and fan-in, so expensive deep analysis only runs on findings that survived filtering.
- Three selectable audit modes let you trade breadth against depth per project instead of running one fixed pipeline.
- Structured FinalizeFinding termination produces schema-shaped output, which is what makes deduplication and report generation possible at all.
- Full execution trace - agent tree, tool calls, stage progress - is persisted per session for post-hoc review.

## Limitations

AGPL-3.0 is the binding constraint for any team that wants to expose this over a network; the copyleft reaches modifications, not just internal use. Model cost scales with the number of projects because Finding-agent sessions are long, and there is no cost ceiling documented. Claimed CVE counts are the maintainer's own and carry no independent verification, so treat the badge as marketing rather than a benchmark. The pipeline also assumes it can run analysis tooling against imported code, which makes untrusted-repository use a genuine risk. Output quality is bounded by whatever model you configure, and false-negative rates for subtle logic bugs are unknown.

## Relation to the Arsenal

This benchmark-and-eval-phase entry audits software rather than models, but it sits in the same verification family as the catalog's evaluation tooling. The agent graph borrows orchestration patterns from content/projects/frameworks, the vulnerability metadata it filters resembles the CVE and advisory feeds catalogued in content/projects/data-and-retrieval, and its severity calls depend on model quality served through content/projects/inference-engines.

## Resources

- [Repository](https://github.com/larlarua/AutoCVE)
- [Architecture design document](https://github.com/larlarua/AutoCVE/blob/main/docs/ARCHITECTURE_DESIGN.md)
- [User guide](https://github.com/larlarua/AutoCVE/blob/main/docs/USER_GUIDE.md)
