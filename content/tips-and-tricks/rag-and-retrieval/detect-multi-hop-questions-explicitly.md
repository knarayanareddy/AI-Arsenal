---
id: "detect-multi-hop-questions-explicitly"
title: "Classify Multi-Hop Questions Before Relying on Single-Pass Retrieval"
category: "rag-tuning"
tags:
  - rag
  - retrieval
  - evaluation
difficulty: "intermediate"
impact: "medium"
time_to_implement: "1-2 hours"
phase: rag-and-retrieval
effort: hours
estimated_time: "~1.5 hours"
reversible: true
verification_status: theoretical
applies_to:
  - rag-pipelines
  - multi-hop-qa
gotchas:
  - "A question can look single-hop but actually require combining facts from two documents (e.g. 'who is older, X or Y') -- classification accuracy matters, and false negatives silently degrade answer quality without an obvious error"
  - "Multi-hop handling (iterative or decomposed retrieval) is more expensive per query -- classify first so you only pay that cost when needed, not on every query"
metrics: []
related_tips:
  - measure-retrieval-recall-before-answer-quality
added_date: "2026-06-14"
added_by: maintainer
last_reviewed: "2026-07-02"
enrichment_status: draft
---

## What & Why

Classify whether an incoming question requires combining facts from multiple documents (multi-hop) before deciding whether single-pass retrieval is sufficient. A single retrieval-then-generate pass structurally cannot answer a question requiring facts from documents that don't share embedding similarity with each other, even if each individual fact is retrievable.

## Before / After

**Before:** every query is routed through the same single-pass retrieve-then-generate pipeline regardless of whether it needs one fact or several combined.

**After:** a lightweight classifier (a prompt-based check or a small trained model) flags multi-hop queries, routing them to an iterative or decomposed retrieval strategy instead of the default single pass.

## Implementation

Prompt a small, fast model to classify whether a query requires combining information from multiple distinct sources versus a single lookup; route multi-hop-flagged queries to a decomposition strategy (break into sub-questions, retrieve for each, combine) rather than the default single retrieval pass.

## Gotchas

- A question can look single-hop but actually require combining facts from two documents — classification accuracy matters, and false negatives silently degrade answer quality without an obvious error
- Multi-hop handling (iterative or decomposed retrieval) is more expensive per query — classify first so you only pay that cost when needed, not on every query

## When NOT to Apply

- Skip this if your query distribution is genuinely single-hop by design (a narrow FAQ-style corpus) — the classification step adds cost with no benefit
- Skip building a custom classifier if your framework already ships multi-hop detection or your generator model is capable enough to implicitly handle simple multi-hop cases without explicit routing

## Verification

Theoretical: the underlying limitation (single-pass retrieval cannot combine facts from dissimilar documents) is a structural property of the retrieve-then-generate pattern, but this specific classification-then-route technique has not yet been verified against a named production deployment in this catalog — flagged `enrichment_status: draft` pending verification.
