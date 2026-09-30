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

An ordering for engineers moving into applied AI: which layers to learn in, what to build at each stage, and which parts of the work belong to other roles. The path is sequenced so each stage depends only on the previous one, and every topic is paired with something you can ship.

## Why It's in the Arsenal

A catalogue of tools is only useful if someone can turn it into skill, and this path is the step that does that: what to learn, in what order, and what to build to prove it. The ordering is the contribution — a list of links does not tell you which dependency to acquire first or which topic to skip until later.

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
- Read: [Observability Overview](../../observability/_index.md) and [Evaluation Pipelines](../../observability/evaluation-quality/_index.md).

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

1. **Scenario**: you are a software engineer moving into applied AI and need an order to learn the layers in rather than a link dump.
2. **Scenario**: you are choosing what to build first to demonstrate applied-AI competence in a hiring loop.
3. **Scenario**: you have six months and want a month-by-month plan that ends in a portfolio project rather than a certificate.
4. **Scenario**: you already ship LLM features and need to know which month of this path you have actually skipped.

## Strengths

- Orders the layers so each month depends only on the previous one, which is the difference between a path and a link list.
- Ends every month in something shippable, so progress is visible as software rather than as reading completed.
- Names the free primary sources first, so the path costs nothing to walk before you decide a paid course is worth it.
- Marks out-of-scope areas explicitly, which is as useful in a learning plan as what is in scope.

## Limitations / When NOT to Use

- Does not replace hands-on building and evaluation; a completed month is a prompt to ship, not evidence you can.
- Assumes you can commit roughly six months. If you have eight weeks, take Month 1 and Month 2 and stop.
- The external links decay. Treat the ordering as durable and the URLs as a snapshot to re-check at the start of each month.

## Integration Patterns

- Use the path as planning context for an LLM that has to sequence your study time, not as a syllabus to paste wholesale.
- Convert each month into one portfolio artifact so the path produces evidence rather than notes.
- Pair every conceptual month with one build example and one eval checklist, so a finished month is a thing that runs.

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

