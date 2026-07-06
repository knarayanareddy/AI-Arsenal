---
id: "ai-engineer"
title: "AI Engineer Learning Path"
entry_type: "guide"
section: "skills"
description: "Six-month practical path for becoming an AI engineer who can ship LLM, RAG, and agent systems"
tags:
  - llm
  - rag
  - agents
  - evaluation
related_entries: []
added_date: "2026-06-14"
last_reviewed: "2026-06-14"
added_by: "maintainer"
status: "active"
---

## Overview

This is a six-month project-first path for software engineers moving into AI engineering. The goal is not to memorize every model paper; the goal is to ship reliable LLM applications with retrieval, agents, evaluation, observability, and deployment.

## Why It's in the Arsenal

AI Arsenal is useful only if builders can turn curated tools and papers into practical skill development. This guide explains what to learn, what to build, and where to go next.

## Key Features

### Month 1: Foundations

- Learn Python packaging, APIs, async basics, and JSON/schema validation.
- Study transformers, tokenization, embeddings, and model inference at a conceptual level.
- Free resources: [Hugging Face NLP course](https://huggingface.co/learn/nlp-course), [fast.ai](https://www.fast.ai/), [Andrej Karpathy YouTube](https://www.youtube.com/@AndrejKarpathy).

### Month 2: First LLM App

- Build a simple chat or extraction app with structured outputs.
- Add prompt versioning and basic traces.
- Read: [Prompting fundamentals](../prompt-engineering/fundamentals.md) and [Structured Output tools](../../tools/by-job/structured-output.md).

### Month 3: RAG

- Build a document Q&A system.
- Learn chunking, embeddings, vector stores, reranking, and retrieval evaluation.
- Build: [Basic RAG Chatbot](../../build-examples/rag-systems/starter-basic-rag-chatbot.md), then [Production RAG API](../../build-examples/rag-systems/intermediate-production-rag-api.md).

### Month 4: Agents

- Learn tool calling, state, retries, memory, and human approval.
- Build: [Simple ReAct Agent](../../build-examples/agent-systems/starter-simple-react-agent.md) and [Multi-Tool Agent](../../build-examples/agent-systems/intermediate-multi-tool-agent.md).

### Month 5: Production

- Add evaluation, tracing, cost tracking, deployment, and rollback plans.
- Read: [Observability Overview](../../observability/overview.md) and [Evaluation Pipelines](../../observability/evaluation-pipelines.md).

### Month 6: Specialization

- Choose one: production RAG, agent reliability, inference optimization, or LLMOps.
- Publish one end-to-end portfolio project with docs, evals, and traces.

## Architecture / How It Works

The path follows the production dependency order: model basics → app interface → retrieval → agents → evaluation/observability → deployment. Do not skip evaluation and tracing; they are what separate demos from engineering.

## Getting Started

```bash
pnpm run validate:all
# Then pick one build example and implement it end to end.
```

## Use Cases

1. **Scenario**: You want a structured learning path instead of a random list of links
2. **Scenario**: You are using AI Arsenal with an LLM to plan study, projects, or hiring loops
3. **Scenario**: You need to map skills to concrete projects and production practices

## Strengths

- Turns broad AI topics into sequenced milestones
- Prioritizes free and primary-source resources where possible
- Connects learning to Arsenal projects, tools, decision trees, and build examples

## Limitations / When NOT to Use

- Does not replace hands-on building and evaluation
- Resource quality and availability can change over time
- Paid resources should be treated as optional unless explicitly required by your team

## Integration Patterns

- Use the learning path as an LLM prompt context when planning a study schedule.
- Convert each milestone into one portfolio artifact or internal project.
- Pair every conceptual topic with one build example and one evaluation checklist.

## Resources

- [Hugging Face Learn](https://huggingface.co/learn)
- [fast.ai](https://www.fast.ai/)
- [Andrej Karpathy YouTube](https://www.youtube.com/@AndrejKarpathy)
- [AI Engineer reference stack](../../architectures/reference-stacks/lean-mvp.md)
- [Production RAG stack](../../architectures/reference-stacks/production-rag.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-06-14 by @maintainer*

