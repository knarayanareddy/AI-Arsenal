---
id: "fundamentals"
title: "Prompt Engineering Fundamentals"
entry_type: "guide"
section: "skills"
description: "Practical prompt engineering fundamentals for production LLM applications"
tags:
  - llm
  - structured-output
  - evaluation
related_entries: []
added_date: "2026-06-14"
last_reviewed: "2026-06-14"
added_by: "maintainer"
status: "active"
---

## Overview

What each part of a prompt is doing, why techniques interact unpredictably rather than stacking cleanly, and how to tell a prompt problem from a capability problem. The operational concerns — versioning, regression testing, latency — are included, because that is where prompt work becomes engineering.

## Why It's in the Arsenal

Prompt advice is usually a recipe list that transfers badly, because it does not say what each part is doing. Explaining the structure is what makes the techniques portable across models and tasks, and separating prompt problems from capability problems is what stops effort being spent on the wrong one.

## Key Features

- Gives each part of a prompt a job, so the guidance transfers instead of being a recipe list.
- Separates prompt problems from capability problems, which stops wasted effort on the wrong one.
- Covers versioning and regression testing, where prompt work actually becomes engineering.

## Architecture / How It Works

Prompts are interfaces between product intent and probabilistic model behavior. Treat them as versioned application artifacts with tests, owners, and rollback plans.

## Getting Started

```bash
# Prompt change workflow
# 1. Add failing example
# 2. Change prompt
# 3. Run eval
# 4. Compare traces
# 5. Release with version note
```

## Use Cases

1. **Scenario**: your prompts work in testing and fail on real input, and you need the structural reasons why rather than more examples.
2. **Scenario**: you are standardising prompts across a team and need a shared vocabulary for what each part of a prompt is doing.
3. **Scenario**: you need to decide whether a problem is a prompt problem or a capability problem before investing more in prompt work.

## Strengths

- Explains what each part of a prompt is doing, which is what makes the advice transferable rather than a recipe list.
- Separates prompt problems from capability problems, the distinction that stops wasted effort.
- Acknowledges that techniques interact unpredictably instead of implying a reliable order.

## Limitations / When NOT to Use

- Prompting advice ages with the models it was written for, and some of it was always folklore rather than finding.
- Techniques interact unpredictably: few-shot examples and chain-of-thought can each help or hurt depending on the task, so there is no reliable stacking order.
- Most guidance stops before the operational concerns — versioning, regression testing, latency — which is where prompt work actually becomes engineering.

## Integration Patterns

- Link a specific technique here from a tool or framework entry's prompt guidance, so the pattern is documented once with its limits.
- When a model release invalidates advice here, mark it rather than silently leaving stale guidance.

## Resources

- [Prompt patterns catalog](prompt-patterns-catalog.md)
- [Store prompts with release versions](../../tips-and-tricks/prompting/store-prompts-with-release-versions.md)
- [Use XML tags for long prompt sections](../../tips-and-tricks/prompting/use-xml-tags-for-long-prompt-sections.md)
- [Use JSON only for machine parsed outputs](../../tips-and-tricks/prompting/use-json-only-for-machine-parsed-outputs.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-06-14 by @maintainer*

