---
id: "keep-instructions-outside-retrieved-context"
title: "Keep Instructions Outside Retrieved Context"
category: "context-window-management"
tags:
  - rag
  - retrieval
  - guardrails
difficulty: "intermediate"
impact: "high"
time_to_implement: "30 minutes"
phase: rag-and-retrieval
effort: minutes
estimated_time: "~30 minutes"
reversible: true
verification_status: community-reported
verified_by: "community reports (RAG prompt-injection writeups)"
applies_to:
  - rag-pipelines
  - customer-support-bots
gotchas:
  - "If a retrieved document happens to contain text formatted like an instruction (e.g. a scraped FAQ that says 'ignore previous rules'), the model can follow it unless the prompt template visually and structurally separates system rules from retrieved content"
  - "Delimiter-only separation (e.g. wrapping context in a single pair of tags) is weaker than combining delimiters with an explicit system-level statement that retrieved text is data, not instructions"
metrics: []
related_tips:
  - treat-retrieved-text-as-untrusted
  - use-delimiters-around-retrieved-context
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Place all system rules and task instructions in the system/instruction section of the prompt, never inside the block of retrieved documents. Retrieved text and instructions compete for the model's attention; when a rule is embedded near retrieved evidence, the model can weight document content as if it were a directive.

## Before / After

**Before:** `prompt = f"Answer using this: {retrieved_docs}\nAlso, always cite sources."` — the citation rule sits inside the same block as untrusted retrieved text.

**After:** `prompt = f"{system_instructions}\n\n<context>\n{retrieved_docs}\n</context>\n\n{user_question}"` — instructions live in a distinct, clearly labeled section before the context block.

## Implementation

Move every directive (formatting rules, citation requirements, refusal conditions) into the system message or a fixed instruction block that appears before the `<context>` tag, and keep the context block reserved exclusively for retrieved passages.

## Gotchas

- If a retrieved document happens to contain instruction-like text, the model can follow it unless the template structurally separates rules from retrieved content
- Delimiter-only separation is weaker than combining delimiters with an explicit statement that retrieved text is data, not instructions

## When NOT to Apply

- Skip restructuring if your retrieval sources are fully trusted, internally authored, and never contain user-editable or scraped external text
- Not a substitute for input sanitization when retrieved sources include public or user-submitted content — pair with `treat-retrieved-text-as-untrusted`

## Verification

Community-reported: separating instructions from retrieved context is a commonly cited mitigation in RAG prompt-injection discussions, though this entry has not been independently benchmarked against a named production incident.
