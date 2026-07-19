---
id: ai-infra-guard
name: AI Infra Guard
type: tool
job:
- security-and-guardrails
- evaluation
description: Tencent full-stack red-team platform for models, agents, skills, MCP,
  and AI infrastructure
url: https://tencent.github.io/AI-Infra-Guard/
cost_model: open-source
pricing_detail: Apache-2.0 software; target-model, sandbox, and infrastructure costs
  are separate
tags:
- security
- guardrails
- evaluation
- agents
- tool-use
maturity: beta
stack:
- python
free_tier: true
free_tier_limits: Fully open source; no hosted tier required
self_hostable: true
open_source: true
source_url: https://github.com/Tencent/AI-Infra-Guard
docs_url: https://tencent.github.io/AI-Infra-Guard/
github_url: https://github.com/Tencent/AI-Infra-Guard
alternatives:
- garak
- pyrit
- agentic-security
integrates_with: []
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience:
- research
- production
best_when:
- You need repeatable adversarial scans spanning model jailbreaks, agent behavior,
  MCP endpoints, skills, and infrastructure rather than only prompt probes
- You are building a security review pipeline that can keep attack modules, datasets,
  and target adapters under version control
avoid_when:
- You need a runtime guardrail that blocks attacks inline; a red-team scanner is an
  assessment tool, not an enforcement proxy
- Your team cannot isolate destructive probes or independently validate the provenance
  and coverage of third-party attack datasets
version_tracked: null
enrichment_status: draft
enrichment_notes: Metadata and feature claims are grounded in the project README and
  public repository state; draft pending maintainer review.
verdict: use-with-caution
verdict_rationale: Unusually broad AI red-team coverage, but attack breadth and vendor-associated
  claims require local validation
status: active
---

## Overview

AI Infra Guard is Tencent's broad red-team platform for AI systems. Its repository spans LLM jailbreak evaluation, agent scans, skills scans, MCP scans, and infrastructure checks, making it a security workbench for the surrounding AI stack rather than a single prompt-injection detector.

## Why It's in the Arsenal

The project earns a slot because modern agent risk is distributed across model prompts, tool descriptions, skills, protocol servers, and deployment infrastructure. A platform that can exercise those surfaces from one repository is useful for mapping a threat model before choosing narrower scanners, provided its attack modules and datasets are treated as inputs to validate rather than authoritative evidence.

## Key Features

The README describes modules for OpenClaw, agents, skills, MCP, AI infrastructure, and LLM jailbreak evaluation, with configurable probes, target endpoints, datasets, thresholds, and reports. It also includes examples for extending dataset collections and connecting an OpenAI-compatible target, which makes the scanner adaptable to local evaluation environments.

## Architecture / How It Works

AI Infra Guard organizes security checks as modules that send attack or probe traffic to a configured model, agent, skill, protocol server, or infrastructure component. Module options select datasets, model endpoints, ports, thresholds, and multi-step behavior; the runner aggregates findings so teams can compare attack classes across targets. The breadth means each module has its own assumptions and isolation requirements.

## Getting Started

Follow the repository's installation and deployment instructions, then start with a non-production OpenAI-compatible target and one scan module. The README's examples configure a local endpoint such as `http://0.0.0.0:8718/v1/self-probe`, a dataset module, and thresholds before running the scanner. Keep credentials and attack payloads in a disposable test environment, and inspect the module-specific setup before enabling multi-step attacks.

## Use Cases

Use the platform to compare jailbreak resistance before and after a system-prompt change, to test whether an MCP registry exposes an over-privileged tool, or to exercise an agent skill package against known attack datasets. It can also structure a red-team review across model and infrastructure layers, but it should not be the only evidence in a security sign-off.

## Strengths

AI Infra Guard's differentiator is coverage across adjacent attack surfaces that are often reviewed by separate teams. The module and dataset model gives a security engineer a place to add organization-specific probes, while threshold configuration and target adapters make repeated scans more comparable than ad hoc demonstrations.

## Limitations / When NOT to Use

A broad scanner can create a broad false sense of coverage: a passing module may reflect an incomplete dataset, an incompatible target adapter, or a threshold that hides useful failures. The README includes vendor-associated datasets and examples, so reproduce important claims, pin module versions, and pair results with manual review of authorization, secrets, network boundaries, and destructive tool behavior.

## Integration Patterns

Run selected modules in an isolated pre-release environment, archive the exact dataset and target configuration, and compare findings across model or agent revisions. Combine it with a runtime guardrail and gateway audit logs; the scanner should discover weaknesses while the live system enforces policy and records attempted abuse.

## Buzz & Reception

4,150 GitHub stars verified during the 2026-07-19 discovery sweep; Tencent-backed red-team project with broad AI infrastructure coverage.

## Resources

- [Project documentation](https://tencent.github.io/AI-Infra-Guard/)
- [GitHub](https://github.com/Tencent/AI-Infra-Guard)
- [Release history](https://github.com/Tencent/AI-Infra-Guard/releases)
- [Black Hat Arsenal listing](https://www.blackhat.com/eu-25/arsenal/schedule/index.html)
