---
id: agenta
name: Agenta
artifact_type: platform
category: observability
subcategory: tracing
description: >-
  Open-source LLMOps platform for prompt management, evaluation, observability,
  and playgrounds
github_url: 'https://github.com/agenta-ai/agenta'
license: MIT
primary_language: TypeScript
tags:
  - observability
  - evaluation
  - tracing
  - cloud
maturity: production
cost_model: freemium
github_stars: 3900
github_stars_last_30d: 0
trending_score: 30
last_commit: '2026-06-13'
docs_url: 'https://docs.agenta.ai/'
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
approach: platform
alternatives:
  - langfuse
  - langsmith-platform
  - phoenix
  - helicone
integrates_with: []
added_date: '2026-06-13'
last_reviewed: '2026-06-13'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

> **TL;DR:** Agenta is an open-source LLMOps platform for prompt management, evaluation, observability, and playground workflows. Use it when prompts and evals need a collaborative product surface.

## Overview

Agenta brings prompt collaboration, side-by-side experiments, evaluation, and observability into one LLMOps platform.

## Why It's in the Arsenal

Teams often outgrow prompts in code and need a shared workflow for subject matter experts, developers, and evaluators.

## Key Features

- Prompt playground and management
- Evaluation workflows
- Observability and tracing
- Open-source repository
- Collaboration between developers and domain experts

## Architecture / How It Works

**Approach:** `platform`

Agenta manages prompts/configurations and records traces/evals around application versions so teams can compare and deploy changes.

## Getting Started

```bash
npx create-agenta-app@latest
```

## Integration Snippet

```python
# Agenta setup changes by deployment mode.
# Use official docs for the current self-host or cloud setup.
# https://docs.agenta.ai/
```

## Use Cases

1. **Scenario**: Collaborative prompt management
2. **Scenario**: Evaluation workflows with non-engineers
3. **Scenario**: LLMOps teams standardizing prompt releases

## Strengths

- Prompt/eval/observability in one platform
- Open-source positioning
- Good collaboration story

## Limitations / When NOT to Use

- Feature maturity should be checked for your workflow
- May overlap with Langfuse/Braintrust/Opik
- Self-hosting needs operational review

## Integration Patterns

- Version prompts before production deployment
- Use eval sets for every prompt change
- Connect traces to prompt versions and datasets

## Resources

- [GitHub](https://github.com/agenta-ai/agenta)
- [Docs](https://docs.agenta.ai/)

## Buzz & Reception

- Included because observability choice shapes debugging, evals, cost control, and production trust for LLM systems.

---
*Last reviewed: 2026-06-13 by @maintainer*

