---
id: "prefer-data-quality-over-quantity"
title: "Prefer Data Quality Over Quantity for Instruction Tuning"
category: "production-gotchas"
tags:
  - fine-tuning
  - data
  - llm
difficulty: "beginner"
impact: "high"
time_to_implement: "ongoing"
phase: fine-tuning
effort: hours
estimated_time: "ongoing curation"
reversible: true
verification_status: community-reported
verified_by: "community reports (LIMA and instruction-tuning literature)"
applies_to:
  - fine-tuning-workflows
gotchas:
  - "A few hundred pristine examples beats tens of thousands of noisy ones -- but 'a few hundred' still has to cover the real distribution of inputs, not only easy cases"
  - "One consistently-wrong or contradictory example teaches the model that contradiction is acceptable; a single bad row can undo many good ones"
metrics: []
related_tips:
  - inspect-your-training-data-by-hand
  - deduplicate-training-data-before-fine-tuning
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

For instruction/style fine-tuning, a small, clean, consistent dataset almost always beats a large noisy one. The model learns the *distribution* of your examples — including their mistakes, inconsistencies, and formatting drift. Ten thousand scraped rows with contradictory answers teach the model to be contradictory; a few hundred carefully written, mutually consistent examples teach it the behavior you actually want. Spending your effort on curation rather than volume is the highest-leverage move at this scale, and it's why teams routinely get strong results from hundreds — not millions — of examples.

## Before / After

**Before:** 20,000 auto-generated Q&A pairs of mixed quality; the fine-tune is inconsistent and occasionally adopts the worst patterns in the set.

**After:** 500 hand-reviewed, format-consistent examples covering the real input distribution; the fine-tune is reliably on-style and easier to debug because you know every row.

## Implementation

Start smaller than feels comfortable. Write or curate examples that are mutually consistent in format, tone, and correctness, and that span the *range* of inputs you expect (including hard and edge cases), not only the easy majority. Review every row at small scale; at larger scale, sample and audit. Grow the set only when a held-out eval shows a specific gap, and add examples targeted at that gap rather than bulk data.

## Gotchas

- "Small" is not an excuse to skip coverage — a clean set that only has easy cases will fail on the hard ones the model never saw
- Contradictions between rows are worse than omissions; consistency matters more than completeness

## When NOT to Apply

- Continued pretraining / domain adaptation genuinely needs large corpora — this tip is about instruction/style tuning, not pretraining
- Tasks with huge natural input diversity may legitimately need more examples for coverage; scale *coverage*, not raw count

## Verification

Community-reported: the "less but higher-quality data" finding is well established in instruction-tuning literature (e.g. small-curated-set results) and widely reproduced in practitioner reports. Exact example counts are task-dependent and not benchmarked here.
