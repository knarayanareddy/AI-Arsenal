---
id: lunary
name: Lunary
type: service
category: observability
subcategory: tracing
description: >-
  Open-source LLM observability and analytics platform for chatbots, RAG apps,
  and prompts
github_url: 'https://lunary.ai'
license: Unknown
primary_language: TypeScript
tags:
  - observability
  - tracing
  - rag
  - cloud
maturity: production
cost_model: freemium
github_stars: 0
github_stars_last_30d: 0
trending_score: 15
last_commit: '2026-06-13'
docs_url: 'https://lunary.ai/docs'
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
approach: sdk
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

> **TL;DR:** Lunary is an open-source LLM observability and analytics platform for chatbots and RAG apps. Use it when conversation analytics and prompt collaboration matter.

## Overview

Lunary focuses on monitoring user interactions, prompts, feedback, and chatbot/RAG behavior with cloud and self-host options.

## Why It's in the Arsenal

It is useful for product teams that need to understand chatbot usage and feedback, not only backend traces.

## Key Features

- Conversation analytics
- Tracing and feedback collection
- Prompt/version workflows
- Self-host/cloud options
- Chatbot and RAG orientation

## Architecture / How It Works

**Approach:** `sdk`

Lunary instruments application calls through SDKs and records messages, traces, feedback, and prompt data in its platform.

## Getting Started

```bash
pip install lunary
```

## Integration Snippet

```python
import lunary

lunary.monitor(openai=True)
# OpenAI calls are monitored after setup
```

## Use Cases

1. **Scenario**: Chatbot analytics
2. **Scenario**: RAG/product feedback loops
3. **Scenario**: Teams wanting lightweight prompt and conversation monitoring

## Strengths

- Product-facing conversation analytics
- Open-source/self-host option
- Good fit for chatbot/RAG apps

## Limitations / When NOT to Use

- Less suited for complex multi-agent trace graphs
- Smaller ecosystem than LangSmith/Langfuse
- Exact feature split should be checked before adoption

## Integration Patterns

- Track user/session identifiers
- Collect thumbs-up/down and qualitative feedback
- Turn failed conversations into eval examples

## Resources

- [Docs](https://lunary.ai/docs)

## Buzz & Reception

- Included because observability choice shapes debugging, evals, cost control, and production trust for LLM systems.

---
*Last reviewed: 2026-06-13 by @maintainer*

