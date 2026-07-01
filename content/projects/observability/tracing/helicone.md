---
id: helicone
name: Helicone
artifact_type: platform
category: observability
subcategory: tracing
description: >-
  Proxy-based LLM observability platform for logs, costs, caching, experiments,
  and analytics
github_url: 'https://github.com/Helicone/helicone'
license: Apache-2.0
primary_language: TypeScript
tags:
  - observability
  - monitoring
  - cloud
  - self-hosted
maturity: production
cost_model: freemium
github_stars: 5809
github_stars_last_30d: 0
trending_score: 30
last_commit: '2026-06-11'
docs_url: 'https://docs.helicone.ai/'
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
approach: proxy
alternatives:
  - langfuse
  - langsmith-platform
  - phoenix
  - opik
integrates_with: []
added_date: '2026-06-13'
last_reviewed: '2026-06-13'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

> **TL;DR:** Helicone is a proxy-based observability platform for LLM requests, costs, caching, experiments, and analytics. Use it when you want fast rollout through a gateway/proxy pattern.

## Overview

Helicone sits between your app and model provider, making it attractive for quick request logging, cost tracking, caching, and experimentation.

## Why It's in the Arsenal

Proxy-based observability can be much easier to adopt than SDK instrumentation when many services call LLM providers.

## Key Features

- Proxy/gateway integration
- Request logs and cost analytics
- Caching and rate/usage controls
- Prompt experiments and datasets
- Cloud and self-host options

## Architecture / How It Works

**Approach:** `proxy`

Helicone observes traffic by routing provider requests through a proxy/gateway, capturing request/response metadata with minimal application instrumentation.

## Getting Started

```bash
pip install openai
```

## Integration Snippet

```python
from openai import OpenAI

client = OpenAI(base_url="HELICONE_OPENAI_BASE_URL", api_key="OPENAI_API_KEY")
# add Helicone auth headers per docs
```

## Use Cases

1. **Scenario**: Fast provider-level logging
2. **Scenario**: Cost tracking across services
3. **Scenario**: Teams that prefer gateway observability

## Strengths

- Low-friction proxy rollout
- Good request/cost visibility
- Works across apps if traffic routes through gateway

## Limitations / When NOT to Use

- Proxy pattern may not capture internal tool/retrieval spans
- Evaluation depth is not the main differentiator
- Requires routing sensitive traffic through the proxy/self-host

## Integration Patterns

- Use proxy for centralized logging and budgets
- Add SDK tracing separately for complex agents
- Tag requests by user, feature, and environment

## Resources

- [GitHub](https://github.com/Helicone/helicone)
- [Docs](https://docs.helicone.ai/)

## Buzz & Reception

- Included because observability choice shapes debugging, evals, cost control, and production trust for LLM systems.

---
*Last reviewed: 2026-06-13 by @maintainer*

