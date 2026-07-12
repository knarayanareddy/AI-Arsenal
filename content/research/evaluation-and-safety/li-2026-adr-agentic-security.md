---
id: li-2026-adr-agentic-security
title: "ADR: An Agentic Detection System for Enterprise Agentic AI Security"
phase: evaluation-and-safety
venue: other
year: 2026
authors:
  - Chenning Li
  - Pan Hu
  - Justin Xu
  - Baris Ozbas
  - Olivia Liu
  - Caroline Van
  - Manxue Li
  - Wei Zhou
  - Mohammad Alizadeh
  - Pengyu Zhang
  - KK Sriramadhesikan
  - Ming Zhang
arxiv_id: '2605.17380'
arxiv_url: https://arxiv.org/abs/2605.17380
pdf_url: https://arxiv.org/pdf/2605.17380
code_url: null
venue_url: https://arxiv.org/abs/2605.17380
practical_applicability: high
reproduction_status: not-reproduced
result_status: current
citation_count_approx: 0
has_code: false
tldr: "Describes an enterprise agent-security detection and response system combining high-fidelity telemetry, red-team exploration, and two-tier online detection."
key_contribution: "Combines an ADR Sensor, Explorer, and Detector, then evaluates the system on ADR-Bench and AgentDojo while reporting deployment experience and explicitly scoped claims."
superseded_by: null
builds_on: []
implemented_in: []
corresponding_project_entry: null
tags:
  - agents
  - evaluation
  - security
  - observability
added_date: '2026-07-11'
last_reviewed: '2026-07-11'
added_by: maintainer
enrichment_status: draft
---

## Overview

ADR—Agentic AI Detection and Response—targets enterprise agents operating through MCP. The paper argues that ordinary endpoint telemetry sees file writes but misses the agent’s prompts, reasoning context, and causal chain from intent to execution. It combines telemetry, adversarial exploration, and online detection instead of relying on static rules or an expensive LLM call for every event.

## Why it's in the Arsenal

This is one of the more operationally grounded agent-security papers in the quarantine batch because it describes a deployed system as well as a benchmark. Its claims still require careful reading: “production-proven” is an author-reported deployment statement, while benchmark precision, recall, and attack coverage depend on the detector, telemetry, and test distribution.

## Core Contribution

ADR has three components. The ADR Sensor collects high-fidelity agentic telemetry; the ADR Explorer performs pre-deployment red teaming and generates hard examples; and the ADR Detector uses fast triage plus context-aware reasoning for scalable online detection. The design treats causal context and tool traces as security signals rather than observing only the final filesystem effect.

## Key Results

- The paper reports deployment at Uber for more than ten months, over 7,200 unique hosts, and more than 10,000 agent sessions per day (2026).
- It reports hundreds of credential exposures across 26 categories, 97.2% precision, and 206 detected credentials in the described deployment setting (2026).
- On ADR-Bench, comprising 302 tasks, 17 techniques, and 133 MCP servers, ADR reports zero false positives and 67% attack detection, outperforming three named baselines by 2–4x in F1 (2026).
- On AgentDojo, it reports detecting all attacks with three false alarms across 93 tasks (2026).

## Methodology

The paper evaluates the production system and introduces ADR-Bench for controlled testing. The detector uses a two-tier path: inexpensive triage first, followed by context-aware reasoning for selected events. The benchmark compares ADR with ALRPHFS, GuardAgent, and LlamaFirewall, while the deployment section reports operational scale and credential-exposure findings.

## Practical Applicability

Use the architecture as a reference for agent telemetry design: capture prompts, tool calls, principals, destinations, execution results, and causal links before asking a detector to classify them. Separate fast blocking signals from slower investigation, and build hard examples from red-team and production incidents rather than relying only on synthetic prompts.

## Limitations & Critiques

The deployment claims and benchmark numbers are from the authors and have not been independently reproduced here. Zero false positives on a benchmark does not imply zero false positives in a noisy enterprise. Detection coverage is bounded by what the sensor observes, what the explorer generates, and how the labels define an attack; latency, privacy, and investigator workload also matter.

## Reproductions & Follow-up Work

Reproduce ADR-Bench with the released task definition if available, then report per-technique confusion matrices, detector latency, and missed causal chains. Evaluate whether the two-tier path remains effective under tool-schema drift, multilingual prompts, unseen MCP servers, and privacy-redacted telemetry.

## Relation to the Arsenal

ADR connects agent observability, red teaming, MCP security, and online detection. It complements execution-control and egress-policy work by focusing on the telemetry and detection loop after an agent begins operating.

## Resources

- [Primary source](https://arxiv.org/abs/2605.17380)
- [HTML paper](https://arxiv.org/html/2605.17380v1)
