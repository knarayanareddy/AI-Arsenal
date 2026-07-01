---
id: yang-2024-swe-agent
title: "SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering"
phase: agents-and-reasoning
venue: neurips
year: 2024
authors:
  - "Yang, J."
  - "Jimenez, C."
  - "Wettig, A."
  - "Lieret, K."
  - "et al."
arxiv_id: "2405.15793"
arxiv_url: "https://arxiv.org/abs/2405.15793"
pdf_url: "https://arxiv.org/pdf/2405.15793"
code_url: "https://github.com/princeton-nlp/SWE-agent"
venue_url: "https://openreview.net/forum?id=WgTk8kwCu9"

practical_applicability: medium
reproduction_status: reproduced
result_status: current
has_code: true
citation_count_approx: 700

tldr: "Showed a custom agent-computer interface (simplified LM-friendly commands for editing/testing code) matters as much as model quality -- treat interface design, not just model choice, as a first-class variable for coding agents"
key_contribution: "Showed that designing a custom agent-computer interface (ACI) -- simplified, LM-friendly commands and feedback formats for navigating, editing, and testing code, rather than giving an agent a raw shell -- substantially improves autonomous software engineering task performance"

builds_on:
  - yao-2022-react
implemented_in: []

tags:
  - agents
  - code-gen
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
enrichment_status: reviewed
---

## Overview

This paper showed that the design of the interface between a language model agent and a codebase — not just the underlying model's raw capability — substantially affects autonomous software engineering performance, introducing a custom Agent-Computer Interface (ACI) with simplified, LM-friendly commands for navigating, editing, and testing code. This remains a current, valid reference architecture for coding-agent interface design, though the specific SWE-bench numbers this paper reported have since been surpassed by newer models and agent scaffolds, consistent with rapid ongoing progress on that same benchmark.

## Why it's in the Arsenal

- SWE-agent's core insight — that how you expose a codebase to an agent (the interface design) matters as much as which model powers the agent — is a transferable lesson for building any tool-use agent, not just coding agents specifically, and is a useful corrective to the common assumption that agent quality is purely a function of the underlying model.
- `practical_applicability: medium` reflects that most engineers building coding-agent-adjacent tools will use or build on top of an existing coding agent (this catalog's `openhands` project, or a commercial coding assistant) rather than implementing an ACI from scratch — but understanding why interface design matters is directly useful when evaluating or customizing any of those existing tools.

## Core Contribution

Prior approaches to LM-driven software engineering either gave the model a raw, general-purpose shell interface (the same interface a human developer would use, but harder for a model to use reliably, since it wasn't designed with the model's specific failure modes in mind) or used narrower, more rigid interfaces that limited what the agent could actually do. This paper's contribution is a custom Agent-Computer Interface: a set of simplified, purpose-built commands (for viewing, editing, navigating, and testing code) and structured feedback formats specifically designed around how language models parse and act on textual information, rather than reusing a raw developer-facing shell unmodified. In engineering terms: the paper found that the same underlying model performs substantially better at multi-step software engineering tasks when given this more LM-friendly interface than when given an unmodified raw shell, meaning interface design is a first-class lever for agent performance, not an afterthought.

## Key Results

- SWE-agent achieved a pass@1 rate of 12.5% on SWE-bench and 87.7% on HumanEvalFix at publication, reported by the paper as state-of-the-art at the time, "far exceeding" prior non-interactive language-model approaches on the same benchmarks (2024) — the paper's headline result
- The paper's own ablations specifically isolating interface design (comparing the custom ACI against a raw shell interface, holding the underlying model constant) found the ACI design itself accounted for a meaningful share of the performance improvement, not just model capability — the paper's central claim and the reason this entry is filed as an agent-architecture contribution rather than a benchmark paper
- These SWE-bench numbers are already dated: current, official SWE-bench Verified leaderboard tracking shows substantially higher resolution rates from newer models and agent scaffolds since 2024, including the project's own later "mini-SWE-agent" (a much simpler ReAct-loop-based successor) — check the live SWE-bench Verified leaderboard for current state-of-the-art rather than citing this paper's specific numbers as current

## Methodology

The Agent-Computer Interface provides the language model with a curated set of commands specifically designed for its use — for viewing and navigating files (rather than raw `cat`/`ls` output that can overwhelm limited context), for making targeted code edits (rather than requiring the model to regenerate entire files), and for running tests and interpreting their output — all formatted in ways the paper's own analysis found language models parse and act on more reliably than equivalent raw command-line output (paper Section 3). The agent operates in a loop structurally similar to ReAct (see `yao-2022-react`): reasoning about the current state, selecting an ACI command to execute, observing the result, and continuing until the task is judged complete — the paper's specific contribution is the careful design of the ACI commands and feedback formats themselves, not a novel agent-loop architecture, which is why this paper builds on rather than replaces the ReAct pattern.

## Practical Applicability

If you are building or customizing a coding agent, this paper's core lesson — invest in designing the interface between your agent and its environment specifically for how language models parse and act on information, rather than reusing a raw human-facing interface unmodified — is directly actionable and generalizes beyond just coding agents to any tool-use agent design. If you need a working coding agent today, the practical choice is typically to use or build on an existing, actively maintained implementation (this catalog's `openhands` project, SWE-agent's own successor "mini-SWE-agent," or a commercial coding assistant) rather than designing an ACI from scratch, since substantial engineering effort has already gone into refining these interfaces past what this paper's original design achieved.

## Limitations & Critiques

The paper's own benchmark numbers are specific to the SWE-bench and HumanEvalFix benchmarks and the models available in 2024; both the underlying models and the broader field's understanding of effective agent scaffolding have advanced substantially since, meaning these specific numbers should be treated as a historical reference point demonstrating the ACI concept's value, not a current-state benchmark. Notably, the same research team behind SWE-agent and SWE-bench has itself since built "mini-SWE-agent" — described in that project's own documentation as "the 100 line AI agent that solves..." SWE-bench tasks using "no tools, no special scaffold structure; just a simple ReAct agent loop" — which is a striking, authoritative signal from the original authors that as underlying models have become more capable, some of the original ACI's engineering complexity may no longer be strictly necessary to achieve strong results, though this doesn't invalidate the original paper's finding that interface design mattered a great deal at the capability level available in 2024. No independent, credible failed-replication challenge to the paper's core comparative claim (ACI design improves performance over a raw-shell baseline, holding the model constant) has been identified as of `last_reviewed: 2026-07-01`.

## Reproductions & Follow-up Work

SWE-agent's official code was released and is actively maintained by the original research team (Princeton University), constituting an ongoing, first-party validation and extension effort rather than a one-off research release. SWE-bench itself has become a standard, actively-used benchmark with its own dedicated leaderboard (SWE-bench Verified) tracking performance from numerous subsequent models and agent scaffolds, providing extensive ongoing third-party validation of the general problem area this paper addresses, even where specific competing systems use different agent architectures than SWE-agent's own ACI. The team's own "mini-SWE-agent" is a notable and authoritative follow-up, deliberately stripping back architectural complexity to test how much of the original ACI's sophistication remains necessary as underlying models improve.

## Relation to the Arsenal

This paper builds on `yao-2022-react` (this phase folder), using essentially the same reason-act-observe loop shape while contributing a domain-specific (software engineering) interface design layered on top of it — read `yao-2022-react` first for the underlying loop pattern this paper's ACI operates within. It is closely related to, but architecturally distinct from, this catalog's `openhands` project entry (`content/projects/frameworks/`), which is a different, actively developed coding-agent project rather than an implementation of this specific paper — the two share the same general problem space (autonomous software engineering agents) but are not the same system, which is why no `implemented_in` link is drawn between them here.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2405.15793)
- [arXiv](https://arxiv.org/abs/2405.15793)
- [Official Code](https://github.com/princeton-nlp/SWE-agent)
- [Venue Proceedings](https://openreview.net/forum?id=WgTk8kwCu9)
- [Papers With Code](https://paperswithcode.com/paper/swe-agent-agent-computer-interfaces-enable)
- [Key Reproduction / Analysis](https://www.swebench.com/verified.html) — the official, actively maintained SWE-bench Verified leaderboard, the authoritative current source for how SWE-agent and its many successors compare today, well beyond this paper's own original 2024 numbers
