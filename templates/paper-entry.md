---
id: "example-paper"                  # lowercase-kebab, convention: {first-author}-{year}-{slug}
title: "Example Paper"
phase: "training-and-alignment"      # one of: foundational | architectures | training-and-alignment |
                                      # inference-and-efficiency | retrieval-and-memory |
                                      # agents-and-reasoning | evaluation-and-safety | surveys
venue: "arxiv-preprint"              # one of: neurips | icml | iclr | acl | emnlp | arxiv-preprint |
                                      # blog-post | technical-report | other
year: 2026
authors:
  - "Lastname, F."
  - "et al."                         # if more than 4 authors
arxiv_id: "2606.00000"               # omit if not on arXiv
arxiv_url: "https://arxiv.org/abs/2606.00000"
pdf_url: "https://arxiv.org/pdf/2606.00000"
code_url: null                       # omit if has_code: false
venue_url: null                      # proceedings page; omit if preprint

practical_applicability: "medium"    # one of: high | medium | low | theoretical
                                      # be honest -- most papers are medium or low.
reproduction_status: "not-reproduced" # one of: reproduced | partially-reproduced |
                                       # not-reproduced | code-available | no-code
result_status: "current"             # one of: current | superseded | challenged | foundational
                                      # if superseded, superseded_by below is REQUIRED
has_code: false
citation_count_approx: 0             # approximate, note source (e.g. Semantic Scholar) and date

tldr: "One sentence, engineering frame. Not 'proposes a novel method' -- 'showed X, meaning you should do Y instead of Z'"
key_contribution: "One sentence: what this paper established that was not known before."

superseded_by: null                  # research entry id; required if result_status: superseded
builds_on: []                        # research entry ids this paper directly extends
implemented_in: []                   # tool or project entry ids implementing this technique
corresponding_project_entry: null    # omit if none

tags:
  - llm
added_date: "2026-06-13"
last_reviewed: "2026-06-13"
added_by: "github-username"
enrichment_status: "draft"           # one of: draft | reviewed | verified
---

## Overview

2-3 sentences. What the paper established and why it matters for engineers, not what it proposed for academics. If `result_status` is `superseded` or `challenged`, say so here, in the first paragraph -- not buried in Limitations.

## Why it's in the Arsenal

1-3 bullets. Why THIS paper vs others in this phase. Connect `practical_applicability` to a real engineering scenario. If `practical_applicability` is `theoretical` or `low`, honestly explain why it's still worth knowing despite low direct applicability.

## Core Contribution

What the paper established that was not known before, stated in engineering terms (name the specific mechanism/technique/finding), not academic terms ("proposes a novel method for X").

## Key Results

The results that matter for engineers. Every benchmark claim must carry: the benchmark/dataset name, the score or delta, and the publication year -- never write "achieves 92.3 on GLUE" without "(2019)". Note if a benchmark is now considered flawed, gamed, or obsolete.

## Methodology

How it works, in enough detail that an engineer can implement the core idea or understand why an implementation works the way it does. Use a Mermaid diagram if the method has a non-obvious flow. Cite the paper section for every architectural claim.

## Practical Applicability

The reason this entry exists. Answer directly: what does an engineer DO differently after reading this paper? Format: "If you are building [X], this paper means you should [do Y] instead of [Z] because [reason]." Never leave this as "this paper is important and engineers should read it" -- that is not an answer, even for `theoretical`/`low` applicability entries.

## Limitations & Critiques

Honest, evidence-backed. Must address: author-acknowledged limitations, limitations discovered post-publication, known failed replications or challenged results, conditions under which the approach breaks down. Must never be shorter than Key Results. "No known limitations" is never acceptable -- minimum acceptable text: "No post-publication challenges identified as of last_reviewed: {date}. Known author-acknowledged limitations: [X]."

## Reproductions & Follow-up Work

What happened after publication: named independent reproductions (with links), follow-up papers that extend/correct/challenge this work. If superseded, name the superseding paper and what it does better. If no reproductions exist, say so explicitly -- never leave this section empty.

## Relation to the Arsenal

Cross-reference explicitly: one line per `builds_on` entry on what this paper took from it; for `implemented_in` entries, name the specific tool/project and link it; if `superseded_by` is set, name what replaces this approach and for what use case.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2606.00000)
- [arXiv](https://arxiv.org/abs/2606.00000) — omit if not on arXiv
- [Official Code](https://github.com/example/example) — omit if `has_code: false`
- [Venue Proceedings](https://example.com) — omit if preprint
- [Papers With Code](https://paperswithcode.com/paper/example)
- [Key Reproduction / Analysis](https://example.com) — one-line description
