---
id: agentic-security
name: Agentic Security
type: tool
job:
- security-and-guardrails
- evaluation
description: Open-source red-team toolkit for finding vulnerabilities in agentic LLM
  applications
url: https://github.com/msoedov/agentic_security
cost_model: open-source
pricing_detail: Apache-2.0 software; target models, sandboxes, and test infrastructure
  are separate costs
tags:
- security
- guardrails
- agents
- tool-use
- evaluation
maturity: beta
stack:
- python
free_tier: true
free_tier_limits: Fully open source; no hosted tier required
self_hostable: true
open_source: true
source_url: https://github.com/msoedov/agentic_security
docs_url: https://github.com/msoedov/agentic_security
github_url: https://github.com/msoedov/agentic_security
alternatives:
- ai-infra-guard
- garak
- pyrit
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
- You need targeted adversarial tests for prompt injection, tool misuse, and agent
  workflow boundaries rather than only model-level jailbreak probes
- You want an inspectable Python scanner that can be adapted to the tools and permissions
  in your own agent
avoid_when:
- You need a complete vulnerability-management platform, continuous runtime blocking,
  or a compliance report without adding your own controls
- You cannot provide a safe replica of the agent and its tools for destructive or
  state-changing attack experiments
version_tracked: null
enrichment_status: draft
enrichment_notes: Metadata and feature claims are grounded in the project README and
  public repository state; draft pending maintainer review.
verdict: solid-choice
verdict_rationale: A focused open scanner for agent-specific attack paths that complements
  model red-team suites
status: active
---

## Overview

Agentic Security is an open-source Python red-team kit aimed at vulnerabilities that appear when an LLM can call tools, retain state, and follow multi-step workflows. Its purpose is narrower than a general model benchmark: it helps probe the control loop and the permissions around it.

## Why It's in the Arsenal

The toolkit merits inclusion because prompt-injection advice often stops at the model boundary while real agent failures occur in tool selection, untrusted context handling, and action authorization. An inspectable scanner focused on those paths gives teams a practical starting point for testing the exact agent graph they plan to deploy.

## Key Features

The project provides attack-oriented checks for agentic LLM applications, including prompt-injection and malicious-tool-use scenarios. Its Python implementation can be read and extended alongside the target agent, which is valuable when generic probe suites cannot express the application's tool schemas, approval steps, or state transitions.

## Architecture / How It Works

The scanner drives a configured agent or model through adversarial prompts and tool-facing inputs, then evaluates whether untrusted instructions cross the intended trust boundary. The useful unit is an agent trajectory rather than a single completion: a benign-looking response can still be a failure if it invokes the wrong tool, leaks context, or bypasses an approval step.

## Getting Started

Clone the repository and follow its Python setup instructions, then point the scanner at a disposable agent replica with synthetic secrets and reversible tools. Start with read-only tools and capture the complete trajectory, including tool arguments and authorization decisions, before expanding to state-changing actions. Keep the target isolated from production accounts and networks.

## Use Cases

Use Agentic Security to test whether retrieved documents can induce an agent to call an unrelated tool, whether a tool description grants more authority than intended, or whether a multi-step plan can smuggle an instruction past a human approval checkpoint. It is also useful for regression testing after changing the system prompt, tool schemas, or memory policy.

## Strengths

The project concentrates on the application-specific attack surface that broad LLM scanners often abstract away. Its small, inspectable Python footprint makes it easier to modify for custom tools and to connect failures to concrete remediation such as capability reduction, argument validation, or approval gates.

## Limitations / When NOT to Use

Scanner coverage depends on the attack corpus and on how faithfully the test harness reproduces the production agent. A clean run does not establish that authorization, secrets, dependencies, or network egress are safe, and a finding may require manual reconstruction to distinguish a real exploit from a harness artifact.

## Integration Patterns

Run it against a versioned staging agent in CI with synthetic credentials, retain failed trajectories, and require a human review before adding a new attack to the regression set. Pair it with AI Infra Guard or garak for broader probes and with gateway audit logs to verify that the attempted action was actually denied.

## Buzz & Reception

1,933 GitHub stars verified during the 2026-07-19 discovery sweep; community security toolkit with active recent commits.

## Resources

- [GitHub](https://github.com/msoedov/agentic_security)
