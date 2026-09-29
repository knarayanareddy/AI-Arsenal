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

- Sequenced so each stage depends only on earlier ones, which is the difference between a path and a link list.
- Every stage ends in something shippable, so progress is visible as software rather than as reading completed.
- Out-of-scope areas are marked, which is as useful in a learning plan as what is in scope.

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
3. **Scenario**: you have model API experience and need to know which production concerns you are missing.

## Strengths

- Orders the layers so each depends only on the previous one, which is the whole point of a path rather than a list.
- Pairs every topic with a buildable project, so progress is visible as working software rather than as completed reading.
- Marks what is out of scope for the role, which is as useful for a learning plan as what is in it.

## Limitations / When NOT to Use

- A path is an ordering, not a curriculum with prerequisites enforced; nothing stops you reading out of order and getting gaps you will not notice until later.
- The projects referenced assume you can already read Python and hold a development environment, which is the real barrier for many readers.
- Roles at this level overlap heavily with ML engineering; the boundary drawn here is one team's, not the field's.

## Integration Patterns

- Link a topic here from a tool or project entry when that entry assumes knowledge the topic covers, so a reader is not left with an unexplained dependency.
- When a project referenced here changes ownership or disappears, replace the link rather than leaving a dead reference in a study plan.

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

