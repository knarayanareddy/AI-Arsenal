---
id: "mask-prompt-tokens-in-the-training-loss"
title: "Mask Prompt Tokens So Loss Trains Only on the Completion"
category: "debugging-llm-apps"
tags:
  - fine-tuning
  - llm
  - efficiency
difficulty: "advanced"
impact: "medium"
time_to_implement: "an hour"
phase: fine-tuning
effort: hours
estimated_time: "~1 hour"
reversible: true
verification_status: community-reported
verified_by: "community reports (SFT/instruction-tuning practice)"
applies_to:
  - fine-tuning-workflows
gotchas:
  - "Many SFT trainers do NOT mask prompt tokens by default -- check the completion-only / instruction-masking flag rather than assuming it's on"
  - "If your data has very long prompts and short completions, un-masked loss is dominated by prompt tokens and can drown out the signal you actually care about"
metrics: []
related_tips:
  - match-training-and-inference-prompt-formats
  - establish-a-prompting-baseline-before-fine-tuning
added_date: "2026-07-08"
added_by: maintainer
last_reviewed: "2026-07-08"
enrichment_status: draft
---

## What & Why

In supervised fine-tuning you usually want the model to learn to produce the *completion* given the prompt — not to learn to generate the prompt itself. If the loss is computed over all tokens (prompt + completion), the model spends gradient on predicting the instruction text, which is both wasteful and, when prompts are long relative to completions, actively dilutes the learning signal for the part you care about. Masking the prompt tokens (labeling them so they don't contribute to the loss) focuses training on the response. It's a small config change with an outsized effect on data-heavy-prompt setups.

## Before / After

**Before:** Loss is averaged over the full sequence; with 800-token RAG-style prompts and 50-token answers, ~94% of the loss is the model learning to echo context it will never need to generate.

**After:** Prompt tokens are masked; the loss reflects answer quality, and the same number of steps yields a noticeably better-aligned completion behavior.

## Implementation

Use your trainer's completion-only / instruction-masking option (e.g. a data collator that sets prompt-token labels to the ignore index). Confirm it's active by inspecting a batch's labels — the prompt positions should be the ignore index and only completion positions should carry targets. Keep the prompt template identical to inference (see the format-matching tip) so masking lines up with real boundaries.

## Gotchas

- Don't assume masking is the default — several popular trainers train on the full sequence unless you opt in
- Masking helps most when prompts are long relative to completions; for short prompts the effect is minor

## When NOT to Apply

- Continued-pretraining objectives (learn to model *all* text) intentionally train on every token — don't mask there
- If your goal is to teach the model to produce a full structured document including the "prompt-like" preamble, the boundary is different — mask accordingly

## Verification

Community-reported: completion-only loss masking is standard in SFT tooling and instruction-tuning guides. The magnitude of improvement depends on the prompt/completion length ratio and is not independently benchmarked here.
