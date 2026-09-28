---
id: aisoc
name: AiSOC
version_tracked: null
artifact_type: library
category: evaluation
subcategory: evaluation
description: "A Docker Compose security operations center that normalizes telemetry, runs a rule library, and audits LLM triage step by step"
github_url: "https://github.com/beenuar/AiSOC"
license: MIT
primary_language: Python
tags: [security, self-hosted]
maturity: beta
cost_model: self-hostable
github_stars: 2373
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://beenuar.github.io/AiSOC/"
demo_url: null
phase: benchmark-and-eval
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Triages alerts with a local model and no API key, and records every prompt and tool call so the reasoning can be replayed."
best_for:
  - "You are a SOC team that needs alert triage to keep working during an outage when outbound API keys are unavailable."
  - "You are an auditor who has to show exactly why an agent escalated or dismissed a detection rather than assert that it was reasonable."
  - "You are a small team starting detection content from scratch and want an existing rule library to fork rather than author from zero."
avoid_if:
  - "You are replacing a commercial SIEM that must retain and correlate evidence at enterprise scale, because this is a single-host Compose stack."
  - "You need native connectors for your specific EDR or identity provider, because the bundled connector set will not cover it."
  - "You have less than 8 GB of memory available inside the Docker VM, which is the documented floor before the first model download."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 2373, MIT, Python, last commit 2026-09-28, topics, homepage. From README: 6991-rule library with 2603 executable, v12.0.0, 8 GB / 20 GB floors, six generated secrets, ~2 GB model download, CISA KEV, MCP server. Connector list and rule execution not verified."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

AiSOC is versioned software with CI, CodeQL, and OpenSSF Scorecard badges, and its own docs include a page titled what actually works, which sets expectations honestly. Telemetry arrives from your security tools, gets normalized, passes through a 6991-rule library of which 2603 rules are executable, and what fires is grouped into incidents. Each incident is investigated by an AI agent whose prompts and tool calls are recorded, and the agent proposes a response that a human approves before anything executes. Threat intelligence such as the CISA KEV catalog arrives minutes after boot with no API key, and new intelligence re-sweeps history already collected. An MCP server exposes the console to Claude, Cursor, and Continue, and a cost dashboard reports the tokens triage actually spent.

## Why it's in the Arsenal

The recurring decision is whether to let a model close alerts autonomously when the model may be unreachable, and how a reviewer reconstructs the reasoning after the fact. Putting the model on the same host as the data removes the API dependency from the incident path, which is the difference between an assistant that helps and an assistant that dies when the internet does. Recording prompts and tool calls converts triage from an opaque verdict into a ledger you can audit, re-run, or use as evidence in a post-incident review.

## Architecture

The pipeline is connectors to normalization to rule evaluation to correlation into incidents to agent investigation to proposed action. Rules are compiled content, so the library and the executable subset are deliberately different numbers, and the correlation step groups multiple firings before an agent spends tokens on any of them. The agent layer is LangGraph-based, which is what makes the recorded step sequence replayable rather than a flat chat log. State lives in the Compose stack alongside the roughly 2 GB language model dropped into a named volume on first run, and make up writes a .env with six generated secrets covering the credential vault, the session signing key, and four service-to-service secrets.

## Ecosystem Position

AiSOC overlaps with Wazuh and Security Onion as a self-hosted detection stack, and competes with Elastic Security and Splunk where a commercial SIEM is the alternative. Compared with an SOAR such as TheHive or Shuffle, the difference is that the responder is a recorded agent rather than a deterministic playbook, so approvals and token spend become first-class operational objects. It complements rather than replaces a SIEM, and the audit trail is a differentiator against rule-only tools where nothing explains why an incident was grouped the way it was. Its MCP surface sits alongside the MCP servers catalogued in content/projects/data-and-retrieval, and its agent construction follows patterns from content/projects/frameworks.

## Getting Started

Clone and bring the stack up. `make doctor` verifies Docker Compose v2, 8 GB of memory, and 20 GB free in the Docker VM before you spend the model download.

```bash
git clone https://github.com/beenuar/AiSOC && cd AiSOC
make doctor
make up
```

`make up` creates the .env file and generates the six secrets itself. The first run pulls a roughly 2 GB model into a named volume; only `make clean` fetches it again.

## Key Use Cases

1. Stand up detection and triage on one host: normalize incoming telemetry, evaluate the executable rule set, and let the agent produce a verdict with a human approving any response.
2. Re-investigate after new intelligence: push a CISA KEV entry and let the stack re-sweep the history you already collected rather than starting from scratch.
3. Review agent decisions: read the recorded prompt and tool-call sequence for an incident to see whether the escalation was justified.

## Strengths

- Runs with no API key, using a local model, so triage survives the outages when you most need it.
- Every prompt and tool call is recorded, which makes the ledger replayable and usable as audit evidence.
- Ships a 6991-rule library with 2603 executable rules, giving a new team detection content to fork.
- `make doctor` and the what-actually-works documentation page state limits instead of hiding them.

## Limitations

The floor is real: 8 GB of RAM and 20 GB of free disk inside the Docker VM, plus a one-time 2 GB model download, so this will not fit a small CI container. Everything runs as a single Compose deployment with no clustering, no multi-tenant isolation, and no documented high-availability path, which rules out enterprise SOC tiers. Triage quality is bounded by the bundled local model's reasoning, and the cost dashboard will show that spend whether or not the verdicts improve on a written playbook. Rule quality also inherits every false-positive problem inherent to the imported detection content, and the connector set is finite.

## Relation to the Arsenal

This benchmark-and-eval-phase entry grades nothing and defends nothing; it is the operations layer where agent decisions get made and audited. Its agent-investigation patterns come from content/projects/frameworks, the KEV and telemetry feeds resemble the retrieval connectors in content/projects/data-and-retrieval, and the local model it runs sits in the same serving category as content/projects/inference-engines.

## Resources

- [Repository](https://github.com/beenuar/AiSOC)
- [Documentation site](https://beenuar.github.io/AiSOC/)
- [Architecture overview](https://github.com/beenuar/AiSOC/blob/main/docs/architecture/README.md)
