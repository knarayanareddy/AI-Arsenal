---
id: "write-tool-descriptions-for-the-model-not-the-codebase"
title: "Write Tool Descriptions for the Model, Not the Codebase"
category: "agent-reliability"
tags:
  - agents
  - tool-use
  - routing
difficulty: "beginner"
impact: "high"
time_to_implement: "half a day"
phase: agents-and-orchestration
effort: hours
estimated_time: "~half a day"
reversible: true
verification_status: community-reported
verified_by: "practitioner reports (tool-use agent tuning)"
applies_to:
  - agent-tool-use
  - multi-tool-agents
gotchas:
  - "The model selects and fills tools using only their names, descriptions, and parameter docs — a description auto-generated from a terse function signature ('def q(s, n)') gives it nothing to disambiguate on, so it picks the wrong tool or passes wrong arguments"
  - "Near-duplicate descriptions across two similar tools make selection a coin flip; the descriptions must state the distinguishing 'use this when...' boundary, not only what each does in isolation"
metrics: []
related_tips:
  - allowlist-tools-per-agent-role
  - validate-tool-arguments-before-execution
  - budget-context-before-adding-tools
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Treat each tool's name, description, and parameter documentation as prompt engineering, because that is exactly what they are: the model chooses which tool to call and how to fill its arguments using only that text. Descriptions auto-generated from bare function signatures, or written in codebase jargon, give the model nothing to reason with — it cannot tell two similar tools apart or infer what a cryptic parameter expects, so it picks wrong or supplies malformed arguments. Descriptions written for the model, with explicit usage boundaries and argument formats, measurably raise tool-selection accuracy.

## Before / After

**Before:** `search(q: str, n: int)` with description `"runs search"` — the model cannot tell this from `lookup()`, guesses `n`, and sometimes searches when it should have used a direct lookup.

**After:** `search_knowledge_base(query: str, max_results: int)` — `"Full-text search over internal docs. Use for open-ended questions; use get_document_by_id when you already have an ID. max_results: 1-10, default 5."` — selection and arguments become unambiguous.

## Implementation

For every tool, give it a descriptive name, a one-to-two sentence description that includes a "use this when / use X instead when" boundary against neighboring tools, and per-parameter docs stating type, allowed range/format, and default. Review descriptions the way you review prompts — test with real queries and adjust the ones the model misuses. Keep them concise so many tools still fit the context budget.

## Gotchas

- The model selects and fills tools from their names and descriptions alone; a description auto-generated from a terse signature gives it nothing to disambiguate on.
- Near-duplicate descriptions across similar tools make selection a coin flip; state the distinguishing "use this when" boundary, not only what each does in isolation.

## When NOT to Apply

- Marginal for a single-tool agent where there is nothing to select between and the one call site is obvious.
- Diminishing returns once descriptions are already clear and selection accuracy is measured as high — do not over-tune working tools.

## Verification

Community-reported: tool-description quality driving selection accuracy is a widely reported agent-tuning lever; the accuracy gain is agent- and model-specific and is not benchmarked here.
