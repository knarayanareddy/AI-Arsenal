---
id: wang-2023-voyager
title: "Voyager: An Open-Ended Embodied Agent with Large Language Models"
phase: agents-and-reasoning
venue: arxiv-preprint
year: 2023
authors:
  - "Wang, G."
  - "Xie, Y."
  - "Jiang, Y."
  - "Mandlekar, A."
  - "Xiao, C."
  - "Zhu, Y."
  - "Fan, L."
  - "Anandkumar, A."
arxiv_id: "2305.16291"
arxiv_url: "https://arxiv.org/abs/2305.16291"
pdf_url: "https://arxiv.org/pdf/2305.16291"
code_url: "https://github.com/MineDojo/Voyager"
venue_url: null

practical_applicability: medium
reproduction_status: code-available
result_status: current
has_code: true
citation_count_approx: 1800

tldr: "First LLM-powered lifelong-learning agent in Minecraft: an automatic curriculum, an ever-growing skill library of verified executable code, and iterative environment-feedback prompting — the origin of the 'skill library' pattern now reappearing in agent skill systems"
key_contribution: "Showed an agent can accumulate competence without weight updates by writing, verifying, and storing reusable code skills retrieved via embeddings for later composition — plus a GPT-4-driven automatic curriculum — achieving 3.3x more Minecraft discoveries than prior SOTA and zero-shot transfer of the skill library to new worlds"

builds_on:
  - "yao-2022-react"
  - "wei-2022-chain-of-thought"

tags:
  - "agents"
  - "planning"
  - "code-gen"
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
enrichment_status: draft
---

## Overview

Voyager plays Minecraft as a lifelong learner: a GPT-4 automatic curriculum proposes progressively harder objectives given the agent's current state and history; the agent writes JavaScript (Mineflayer) code to accomplish them, iterating against execution errors and environment feedback until self-verified success; working programs are stored in a skill library, embedded by description, and retrieved for reuse and composition on later tasks. Competence therefore compounds in code, not weights — and the library transfers to unseen worlds.

## Why it's in the Arsenal

- The skill-library idea — persist verified, executable procedures and retrieve them by relevance — is the direct intellectual ancestor of today's agent-skills ecosystems (Claude Code skills, agent skill packs) that this catalog tracks in the skills vertical
- It remains the reference demonstration of open-ended, curriculum-driven exploration with frozen models, defining the pattern for agents that must get durably better at a domain over time

## Core Contribution

Three interlocking mechanisms: (1) the automatic curriculum, turning exploration into a self-paced syllabus that maximizes novelty; (2) the skill library — verified executable programs as the unit of memory, retrieved by embedding similarity, making learned behavior compositional, interpretable, and non-forgetting; (3) iterative prompting with three feedback channels (environment state, execution errors, self-verification via a GPT-4 critic). The skill library is the enduring contribution: procedural memory as versioned code rather than opaque parameters.

## Key Results

- 3.3x more unique items discovered than prior SOTA LLM-agent baselines (ReAct, Reflexion, AutoGPT adaptations), with 2.3x longer map traversal (paper Section 4, 2023)
- Unlocked the diamond-tools tech-tree milestone up to 15.3x faster than baselines (2023)
- Skill library transferred zero-shot to a new Minecraft world, solving previously unseen tasks where baselines failed entirely; ablations showed removing the skill library or curriculum collapses performance (2023)

## Methodology

The curriculum agent proposes the next task from agent state, inventory, and exploration history under a novelty-seeking directive; the action agent generates Mineflayer JavaScript conditioned on retrieved skills, refining over rounds using execution errors and environment feedback; a critic agent checks task completion; verified programs are summarized, embedded, and indexed into the skill library. Evaluated in MineDojo on discovery breadth, tech-tree speed, map coverage, and zero-shot transfer against prompted-agent baselines.

## Practical Applicability

The transferable design, not the Minecraft agent, is the payload: store what worked as executable, testable artifacts; verify before persisting; retrieve by semantic relevance; compose upward. This is recognizably the architecture of current agent-skill systems (skill files with descriptions, loaded on demand into coding agents) and of self-improving automation pipelines that promote validated scripts into reusable tools. The verification gate is the critical detail — persisting unverified procedures compounds errors instead of competence.

## Limitations & Critiques

Everything runs through GPT-4-class API calls with substantial cost, and the environment is uniquely favorable: Minecraft offers a programmatic API, cheap resets, and unambiguous success checks — assets most real-world domains lack, which bounds the direct transferability of the results. Self-verification by an LLM critic is imperfect and task-specific; the curriculum's novelty pursuit lacks any safety or utility constraint; and hallucinated APIs/items remain an acknowledged failure mode in the paper's own analysis.

## Reproductions & Follow-up Work

Code is open and widely built upon; the skill-library pattern propagated into agent frameworks (skill/tool registries with embedding retrieval), the agent-skills ecosystem (reusable skill files for coding agents), and follow-up embodied-agent research (Odyssey, JARVIS-1, MineDreamer). Lifelong-learning agent benchmarks routinely use Voyager as the canonical baseline for open-ended competence accumulation.

## Relation to the Arsenal

Extends the `yao-2022-react` acting loop with persistent procedural memory, and complements `shinn-2023-reflexion` (same phase): Reflexion persists lessons as text, Voyager persists competence as verified code. The skill-library lineage runs directly to this catalog's skills vertical (content/skills/agent-skills/) and the skill-based coding-agent entries in projects/agent-systems/.

## Resources

- [Paper (PDF)](https://arxiv.org/pdf/2305.16291)
- [arXiv](https://arxiv.org/abs/2305.16291)
- [Code](https://github.com/MineDojo/Voyager)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft; metadata (arXiv ID, venue, year) verified against arXiv on 2026-07-08; citation count approximate.*
