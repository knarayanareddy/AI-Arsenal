---
id: "compact-tool-outputs-before-adding-to-context"
title: "Truncate or Summarize Tool Outputs Before They Enter Agent Context"
category: "context-window-management"
tags:
  - agents
  - tool-use
  - efficiency
difficulty: "intermediate"
impact: "high"
time_to_implement: "half a day"
phase: agents-and-orchestration
effort: hours
estimated_time: "~half a day"
reversible: true
verification_status: community-reported
verified_by: "community reports (context engineering writeups; agent framework output-processing patterns)"
applies_to:
  - agent-systems
gotchas:
  - "Naive truncation (first N chars) can cut exactly the part the agent needed — prefer structure-aware compaction: head+tail for logs, schema-plus-sample for query results, error-line extraction for stack traces"
  - "If you compact, give the agent a path to the full data (an ID or file reference it can re-query) — otherwise you've traded context bloat for dead ends"
  - "Summarizing with an LLM adds cost and can hallucinate details into the summary; deterministic truncation is safer for anything the agent will act on precisely"
metrics: []
related_tips:
  - budget-context-before-adding-tools
  - prefer-id-references-over-copying
  - summarize-long-running-agent-state
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

Post-process every tool's raw output before appending it to the agent's context: cap its size, extract the relevant structure, and reference the full payload by ID. Tool outputs are the dominant source of agent context bloat — one unfiltered API response, database query, or log dump can be tens of thousands of tokens, most of it irrelevant — and each bloated result is then re-sent on *every subsequent model call* in the loop, multiplying its cost by the number of remaining steps and pushing earlier reasoning out of effective context.

## Before / After

**Before:** A monitoring tool returns a 30K-token JSON payload; the agent's next 15 steps each re-transmit it, costing ~450K cumulative input tokens and degrading attention over the parts that matter.

**After:** The tool wrapper returns the 40 relevant lines plus `full_result_id: r_8213` (re-queryable); subsequent steps carry ~1K tokens of it instead of 30K.

## Implementation

Add a per-tool output policy: a hard token cap, structure-aware compaction (head+tail for logs, error extraction for traces, schema-plus-rows-sample for query results), and an ID or file reference for retrieving the full output on demand.

## Gotchas

- Truncate structure-aware, not first-N-chars — the needed detail is often at the end (stack traces) or middle
- Always leave a handle to the full data the agent can follow; compaction without recourse creates dead ends
- LLM summarization of outputs can hallucinate; use deterministic compaction for precision-critical data

## When NOT to Apply

- Tools whose outputs are already small and fully relevant (a calculator, a boolean check) — a policy layer there is pure overhead
- Cases where the agent must reproduce the output verbatim (e.g. quoting a file for an exact edit) — give it the full content for that step

## Verification

Community-reported: tool-output compaction with full-payload references is a core context-engineering pattern documented across agent framework guides and long-trace cost analyses; not independently benchmarked here against a named production system.
