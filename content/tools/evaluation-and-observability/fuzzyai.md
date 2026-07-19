---
id: fuzzyai
name: FuzzyAI
type: tool
job:
- security-and-guardrails
- evaluation
description: CyberArk toolkit for automated LLM API fuzzing and jailbreak testing
url: https://github.com/cyberark/FuzzyAI
cost_model: open-source
pricing_detail: Apache-2.0 software; target API and local-model compute costs are
  separate
tags:
- security
- evaluation
- llm
- guardrails
maturity: beta
stack:
- polyglot
free_tier: true
free_tier_limits: Fully open source; no hosted tier required
self_hostable: true
open_source: true
source_url: https://github.com/cyberark/FuzzyAI
docs_url: https://github.com/cyberark/FuzzyAI
github_url: https://github.com/cyberark/FuzzyAI
alternatives:
- garak
- pyrit
- agentic-security
integrates_with:
- ollama
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience:
- research
- production
best_when:
- You need repeatable jailbreak and fuzzing experiments against an LLM API or local
  Ollama model
- You want reusable attack datasets and a web UI for inspecting which prompt mutations
  pass through a target
avoid_when:
- You need a live filter that blocks attacks during user requests rather than an offline
  fuzzing harness
- You require current coverage for a newly released model without first checking the
  repository's older attack modules and dependencies
version_tracked: null
enrichment_status: draft
enrichment_notes: Metadata and feature claims are grounded in the project README and
  public repository state; draft pending maintainer review.
verdict: use-with-caution
verdict_rationale: CyberArk-backed attack experimentation with useful datasets, but
  the default branch is stale for a security scanner
status: watching
---

## Overview

FuzzyAI is CyberArk's automated fuzzing toolkit for finding jailbreaks and unsafe behavior in LLM APIs. It packages attack strategies, datasets, optional classifier models, and a web interface so a security researcher can run repeatable probes instead of manually collecting jailbreak prompts.

## Why It's in the Arsenal

FuzzyAI is worth keeping as a security-testing reference because it turns jailbreak research into a configurable fuzzing workflow with target adapters and included resources. CyberArk's security context makes the project relevant to defensive review, while its 2026-02-06 last commit means the entry should be treated as a useful but not actively maintained snapshot.

## Key Features

The README documents standalone and in-project installation, Ollama as an optional local model path, a web UI, attack resources, and command-line fuzzing against HTTP or OpenAI-style targets. Attack options can select a classifier model and target endpoint, allowing researchers to compare payload families under controlled conditions.

## Architecture / How It Works

FuzzyAI combines an attack generator with a target adapter and an evaluator or classifier that decides whether the response exhibits the tested failure. The target can be a local Ollama model or an HTTP API; the included resources provide starting attack and dataset material, while the command-line options determine the model, endpoint, and auxiliary classifier.

## Getting Started

The README's quick path installs directly from the repository:

```bash
pip install git+https://github.com/cyberark/FuzzyAI.git
ollama run llama3.1
fuzzyai fuzz --help
```

For a standalone checkout, use Poetry and the documented editable install. Begin with a local target or a tightly scoped staging API, and never point an attack loop at an account with irreversible tools.

## Use Cases

Use FuzzyAI to compare jailbreak resistance after a system-prompt or guardrail change, to test a local model before exposing it through an API, or to seed an internal red-team corpus with reproducible attack cases. It is a security research harness, not a replacement for application authorization or runtime moderation.

## Strengths

The combination of fuzzing commands, attack resources, optional local inference, and a UI makes the first jailbreak experiment approachable. It also exposes the auxiliary classifier and target configuration instead of presenting a single opaque score, which helps a researcher inspect why a case was marked successful.

## Limitations / When NOT to Use

The default branch has not been updated since 2026-02-06, so model API changes, dependency vulnerabilities, and newer attack techniques may not be reflected. Classifier judgments and included datasets can over- or under-report risk, and a passing fuzz run says little about business-logic authorization or agent tool misuse.

## Integration Patterns

Pin the repository revision and attack corpus in a staging security job, archive raw responses, and review classifier-positive cases manually before filing a vulnerability. Pair FuzzyAI with garak or AI Infra Guard for broader probe families and with a runtime guardrail for the mitigations discovered by the scan.

## Buzz & Reception

1,530 GitHub stars verified during the 2026-07-19 discovery sweep; CyberArk project whose default branch was last updated 2026-02-06.

## Resources

- [GitHub](https://github.com/cyberark/FuzzyAI)
- [Wiki](https://github.com/cyberark/FuzzyAI/wiki)
- [Attacks guide](https://github.com/cyberark/FuzzyAI/wiki/Attacks)
- [Related paper](https://arxiv.org/abs/2402.11753)
