---
id: zhou-2026-colleague-skill
title: "COLLEAGUE.SKILL: Automated AI Skill Generation via Expert Knowledge Distillation"
phase: agents-and-reasoning
venue: arxiv-preprint
year: 2026
authors:
  - "Zhou, T."
  - "Liu, D."
  - "Yuan, L."
  - "Shao, J."
  - "Hu, X."
arxiv_id: "2605.31264"
arxiv_url: "https://arxiv.org/abs/2605.31264"
pdf_url: "https://arxiv.org/pdf/2605.31264"
code_url: "https://github.com/titanwings/colleague-skill"
venue_url: null

practical_applicability: high
reproduction_status: code-available
result_status: current
has_code: true
citation_count_approx: 0

tldr: "Automates trace-to-skill distillation: turns a person's heterogeneous work traces into a versioned, inspectable agent skill package with separate capability and behavior tracks -- treat expert knowledge capture as a pipeline, not manual skill authoring"
key_contribution: "An end-to-end workflow for distilling a person's or role's heterogeneous traces (documents, communications, decisions) into versioned, inspectable, correctable agent skill packages, split into a capability track (practices, mental models, heuristics) and a bounded behavior track (style, interaction rules, correction history)"

builds_on: []
implemented_in: []

tags:
  - agents
  - code-gen
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

This paper addresses a gap between two maturing ecosystems: memory/persona systems that capture fragments of a person's knowledge, and skill frameworks that provide portable packaging formats for agent capabilities. COLLEAGUE.SKILL bridges them with an automated trace-to-skill distillation system — given heterogeneous materials from a target person or role, it produces a versioned skill package that an agent can invoke and a human can inspect, correct via natural-language feedback, roll back, and install across agent hosts.

## Why it's in the Arsenal

- The agent-skills ecosystem this catalog documents (see the [agent-skills subsection](../../skills/agent-skills/_index.md)) is today almost entirely hand-authored. This paper is the first prominent treatment of skill *generation* as a pipeline problem — distilling skills from evidence rather than writing them — which is the obvious next stage of that ecosystem if it holds up.
- `practical_applicability: high` because the output format is directly compatible with how skills are consumed today (portable packages installed into agent hosts), and the correction/rollback loop addresses the real operational problem of skills drifting out of date.

## Core Contribution

Actionable expert knowledge is usually embedded in heterogeneous traces (documents, decisions, communications) rather than clean instructions, and no prior end-to-end workflow distilled those traces into agent-usable form. The paper's contribution is the two-track package design plus the automation around it: a **capability track** capturing practices, mental models, and decision heuristics, coordinated with a **bounded behavior track** capturing communication style, interaction rules, and correction history. Keeping behavior bounded and separate from capability is the key engineering decision — it makes the person-grounding inspectable and correctable instead of an opaque persona blob.

## Key Results

- Produces versioned skill packages that can be inspected, invoked, updated through natural-language feedback, rolled back, and installed across agent hosts (the paper's central system claim; specific benchmark numbers should be read from the paper directly rather than summarized secondhand here)
- One of the most visible papers of its month on Hugging Face Papers (123 upvotes as of 2026-07-08), with an unusually popular code release for a paper artifact (20.2k GitHub stars as of 2026-07-08)

## Methodology

The distillation pipeline ingests a target person's or role's materials, extracts candidate knowledge along the two tracks, and compiles them into a skill package with version history. Natural-language feedback from the person (or a reviewer) is applied as corrections that update the package rather than retraining anything — the skill is a document artifact, which is what makes rollback and cross-host installation cheap.

## Practical Applicability

If you maintain agent skills today, the near-term applicable idea is the two-track separation: keep "what this expert knows/does" distinct from "how this expert communicates and what corrections they've issued," and version both. Teams with rich internal traces (runbooks, review comments, decision logs) are the natural early adopters; the failure mode to watch is distilling confidential or context-bound judgment into a package that then travels further than the person intended.

## Limitations & Critiques

This is a 2026 arXiv preprint without independent peer review or third-party reproduction at `last_reviewed: 2026-07-08`; its evaluation of distilled-skill quality is inherently hard to ground (there is no established benchmark for "does this skill faithfully represent this person"). Person-grounded skills also raise consent, attribution, and confidentiality questions the engineering community has not settled — treat the governance side as unsolved. The very high GitHub star count reflects ecosystem enthusiasm for the idea, not validation of the distillation quality.

## Reproductions & Follow-up Work

Official code is released (titanwings/colleague-skill, 20.2k stars, last push 2026-06-01 as of review date). No independent reproductions or credible challenges identified as of `last_reviewed: 2026-07-08` — expected for a paper this recent; revisit at next review.

## Relation to the Arsenal

Directly upstream of this catalog's [agent-skills ecosystem guide](../../skills/agent-skills/agent-skills-ecosystem.md): the frameworks documented there (hand-curated skill packs) are what this paper proposes to generate automatically. Read alongside `yang-2024-swe-agent` (this folder) for the broader theme that agent capability is engineered around the model — via interfaces there, via distilled skills here — rather than being purely a model property.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2605.31264)
- [arXiv](https://arxiv.org/abs/2605.31264)
- [Official Code](https://github.com/titanwings/colleague-skill)
