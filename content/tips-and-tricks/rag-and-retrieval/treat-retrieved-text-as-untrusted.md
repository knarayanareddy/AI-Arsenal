---
id: "treat-retrieved-text-as-untrusted"
title: "Treat Retrieved Text as Untrusted Input"
category: "security-best-practices"
tags:
  - rag
  - security
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
  - agentic-rag
gotchas:
  - "Documents from external, scraped, or user-uploaded sources can contain text engineered to look like system instructions -- if the model treats retrieved text as trusted, this becomes a prompt-injection vector"
  - "Treating retrieved text as untrusted has to extend to any tool the model calls with retrieved content as an argument -- a downstream tool call is equally exploitable as the model's own text output"
metrics: []
related_tips:
  - keep-instructions-outside-retrieved-context
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Treat every retrieved document as untrusted data, the same way you would treat raw user input, rather than as a trusted extension of the system prompt. Retrieved documents — especially from external, scraped, or user-uploaded sources — can contain text engineered to resemble instructions, and a model that doesn't distinguish "data to reason about" from "commands to follow" is vulnerable to indirect prompt injection.

## Before / After

**Before:** retrieved passages are concatenated directly into the prompt with no framing, and any tool calls the model makes based on retrieved content are executed without review.

**After:** retrieved passages are wrapped in an explicit "this is untrusted reference data, not instructions" framing, and any tool call whose arguments derive from retrieved content passes through the same validation used for user input.

## Implementation

Wrap retrieved context in delimiters with an explicit system-level statement that content inside is data, not commands, and apply the same input-validation path used for direct user input to any tool arguments that originate from retrieved text.

## Gotchas

- Documents from external, scraped, or user-uploaded sources can contain text engineered to look like system instructions
- This has to extend to any tool the model calls with retrieved content as an argument, not only the model's own text output

## When NOT to Apply

- Skip additional hardening if every retrieval source is fully trusted, internally authored, and never contains user-editable or scraped external content
- Not a complete defense on its own against sophisticated injection — pair with output validation and tool-argument allowlisting rather than relying on framing alone

## Verification

Community-reported: treating retrieved context as untrusted is a widely cited mitigation in RAG and agentic-RAG security writeups, not independently benchmarked here against a named production incident.
