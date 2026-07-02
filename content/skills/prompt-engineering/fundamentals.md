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

Prompt engineering is not magic wording. It is the practice of specifying task, context, constraints, examples, output format, and evaluation criteria clearly enough that behavior can be tested and maintained.

## Why It's in the Arsenal

AI Arsenal is useful only if builders can turn curated tools and papers into practical skill development. This guide explains what to learn, what to build, and where to go next.

## Key Features

### Core Prompt Structure

1. Role or task identity
2. Goal and success criteria
3. Inputs and context
4. Constraints and policies
5. Examples or counterexamples
6. Output schema or format
7. Fallback behavior

### Production Rules

- Keep system, developer, retrieved context, and user input separate.
- Version prompts like code.
- Test prompts with golden examples and adversarial inputs.
- Use structured outputs only when a parser actually needs them.
- Track prompt version in every trace.

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

- [Prompt patterns catalog](prompt-patterns-catalog.md)
- [Store prompts with release versions](../../tips-and-tricks/prompting/store-prompts-with-release-versions.md)
- [Use XML tags for long prompt sections](../../tips-and-tricks/prompting/use-xml-tags-for-long-prompt-sections.md)
- [Use JSON only for machine parsed outputs](../../tips-and-tricks/prompting/use-json-only-for-machine-parsed-outputs.md)

## Buzz & Reception

Skills pages are evergreen and should be reviewed quarterly as tools, model families, and best practices change.

---
*Last reviewed: 2026-06-14 by @maintainer*

