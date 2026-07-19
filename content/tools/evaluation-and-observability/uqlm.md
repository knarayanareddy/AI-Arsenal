---
id: uqlm
name: UQLM
type: tool
job:
- evaluation
description: Python uncertainty-quantification library for detecting unreliable LLM
  responses
url: https://cvs-health.github.io/uqlm/latest/index.html
cost_model: open-source
pricing_detail: Apache-2.0 package; model/provider calls and repeated samples are
  separate costs
tags:
- llm
- evaluation
- efficiency
- research
maturity: beta
stack:
- python
free_tier: true
free_tier_limits: Fully open source; no hosted tier required
self_hostable: true
open_source: true
source_url: https://github.com/cvs-health/uqlm
docs_url: https://cvs-health.github.io/uqlm/latest/index.html
github_url: https://github.com/cvs-health/uqlm
alternatives:
- lm-evaluation-harness
- openjudge
- ragas
integrates_with:
- langchain
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience:
- research
- production
best_when:
- You need a response-level confidence signal to triage generated answers before human
  review or downstream action
- You can afford repeated sampling, semantic comparison, or access to token probabilities
  for the scorer you select
avoid_when:
- You need a calibrated factuality guarantee for a high-stakes decision without validating
  the scorer on your domain
- Your latency or provider budget cannot accommodate multiple generations or an additional
  entailment/semantic model
version_tracked: null
enrichment_status: draft
enrichment_notes: Metadata and feature claims are grounded in the project README and
  public repository state; draft pending maintainer review.
verdict: solid-choice
verdict_rationale: A practical collection of black-box and white-box UQ scorers with
  a clear distinction between confidence and correctness
status: active
---

## Overview

UQLM is a Python library for uncertainty quantification over LLM responses. It exposes response-level scorers that estimate how likely an answer is to be unreliable, including black-box methods that compare multiple sampled answers and white-box methods that can use model internals or token probabilities.

## Why It's in the Arsenal

UQLM earns a slot because it turns the vague question 'how much should I trust this answer?' into a set of testable scoring strategies. The CVS Health project brings recent uncertainty methods into a reusable package, while its own documentation is appropriately narrower than a factuality guarantee: a confidence score is a signal for triage and mitigation, not proof that an answer is true.

## Key Features

The package includes consistency-style black-box scorers, semantic entropy and semantic-set approaches, non-contradiction and entailment probabilities, exact-match and BERTScore-style comparisons, and mitigation that can select a lower-uncertainty response. It works with LangChain chat models and separates scorer choice from the application that consumes the score.

## Architecture / How It Works

A scorer receives a prompt and one or more model responses, then maps agreement, semantic clustering, entailment, or token-level evidence to a confidence value between zero and one. Black-box scorers do not need hidden model states but usually require multiple generations; white-box variants can be cheaper or more direct when log probabilities and internal representations are available.

## Getting Started

Install UQLM from PyPI and connect a supported chat model:

```bash
pip install uqlm
```

The README's examples initialize a `ChatOpenAI` model and call a response scorer with `use_best=True` when selecting the lowest-uncertainty answer. Recalibrate the threshold on held-out domain questions before wiring the score to an automated rejection or escalation policy.

## Use Cases

Use UQLM to route uncertain medical or finance-support answers to review, to compare uncertainty before and after retrieval changes, or to select among several sampled completions for a low-risk drafting workflow. It is also useful for measuring whether a model change increases disagreement, even when the application still requires a separate factuality check.

## Strengths

UQLM presents several families of uncertainty methods behind a consistent Python interface, including approaches that work when only API access is available. The library also makes mitigation explicit, so teams can test whether uncertainty scoring improves answer selection rather than merely adding another dashboard number.

## Limitations / When NOT to Use

Agreement can be confidently wrong, and semantic similarity or entailment models can inherit the same blind spots as the generator. Multiple samples add latency and cost, white-box methods narrow model compatibility, and thresholds are domain-dependent; a UQLM score should therefore be validated against labeled errors and paired with provenance or retrieval checks.

## Integration Patterns

Log the score, scorer version, sampling parameters, and eventual human outcome together so calibration can be revisited. Use UQLM as one feature in an evaluation pipeline or review router, and combine it with RAG citation checks and application-specific validators before allowing an answer to trigger an external action.

## Buzz & Reception

1,186 GitHub stars verified during the 2026-07-19 discovery sweep; CVS Health open-source research library with a JMLR reference.

## Resources

- [Documentation](https://cvs-health.github.io/uqlm/latest/index.html)
- [GitHub](https://github.com/cvs-health/uqlm)
- [JMLR reference](https://www.jmlr.org/papers/v27/25-1557.html)
