---
id: "prompt-patterns-catalog"
title: "Prompt Patterns Catalog"
entry_type: "guide"
section: "skills"
description: "Catalog of practical prompt patterns for structured LLM application behavior"
tags:
  - llm
  - structured-output
  - reasoning
related_entries: []
added_date: "2026-06-14"
last_reviewed: "2026-06-14"
added_by: "maintainer"
status: "active"
---

## Overview

This catalog lists reusable prompt patterns and when to use them. Each pattern should be tested against your own eval set before production use.

## Why It's in the Arsenal

AI Arsenal is useful only if builders can turn curated tools and papers into practical skill development. This guide explains what to learn, what to build, and where to go next.

## Key Features

### Pattern: Delimited Context

Use XML or clear markers around retrieved context.

```text
<context>
...
</context>
```

### Pattern: Few-Shot Format Locking

Give 2-5 examples of the exact output format.

### Pattern: Ask Before Guessing

Tell the model to ask a clarifying question when required fields are missing.

### Pattern: Tool-Use Contract

Describe tools as typed contracts with when-to-use and when-not-to-use rules.

### Pattern: Critique Then Revise

Use for drafts, not for irreversible actions.

### Pattern: Refusal Boundary

Define concrete refusal conditions and safe alternatives.

### Pattern: JSON Schema Output

Use when a parser consumes the model output and validation errors can be handled.

## Architecture / How It Works

Prompt patterns are reusable interface designs. The same pattern can work across models, but each model may require different examples, delimiters, and output constraints.

## Getting Started

```bash
# Pick one pattern, add examples, then run evals.
# Do not combine many patterns before measuring the baseline.
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

- [Prompt engineering fundamentals](fundamentals.md)
- [Instructor](../../tools/dx-and-tooling/instructor.md)
- [Outlines](../../tools/model-layer/outlines.md)
- [Guidance](../../tools/model-layer/guidance.md)
- [Pydantic AI](../../tools/orchestration/pydantic-ai-tool.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-06-14 by @maintainer*

