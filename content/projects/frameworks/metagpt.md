---
id: metagpt
name: MetaGPT
version_tracked: null
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: Research framework encoding software-team SOPs as role-based agents that turn a one-line requirement into specs and code; last pushed January 2026
github_url: "https://github.com/FoundationAgents/MetaGPT"
license: MIT
primary_language: Python
org_or_maintainer: null
tags: [agents, orchestration, planning, code-gen]
maturity: production
cost_model: open-source
github_stars: 71025
github_stars_last_30d: 0
trending_score: 40
last_commit: "2026-01-21"
docs_url: "https://docs.deepwisdom.ai/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language, reasoning]
relation_to_stack: [study-and-reference, deploy-as-is]
health_signals: [research-origin, community-driven, actively-maintained]
ecosystem_role:
  - Multi-agent framework modeling a software company's roles (PM, architect, engineer, QA) to collaboratively generate software from a requirement
best_for:
  - You're researching multi-agent role-based collaboration patterns for complex, multi-step generation tasks (MetaGPT's core research contribution, published as a paper and accepted at top-tier venues)
  - You want to study or experiment with the 'standard operating procedure' (SOP) approach to constraining multi-agent collaboration, which MetaGPT pioneered
avoid_if:
  - You need a production-ready coding agent for real software delivery — MetaGPT is better understood as a research artifact demonstrating the SOP-based multi-agent pattern than a polished production tool
  - You want an actively-supported commercial product — MGX (MetaGPT's commercial launch) is the productized direction, but the open-source repo itself is maintained more as an active research codebase than an enterprise product
upstream_dependencies: []
downstream_consumers: []
alternatives: [langgraph, crewai]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "MetaGPT originated as a paper ('MetaGPT: Meta Programming for a Multi-Agent Collaborative Framework') with continued academic output (AFlow accepted at ICLR 2025, further papers at NeurIPS/ICML 2025 per third-party coverage), and the GitHub repo shows active issue activity through June 2026, confirming both research-origin and ongoing maintenance."
added_date: "2026-06-13"
last_reviewed: "2026-10-26"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"newsletter","url":"https://docs.deepwisdom.ai/","date":"2026-06-13","description":"Official docs"}
featured: false
status: active
---

## Overview

A multi-agent framework that assigns LLM agents distinct software-company roles (product manager, architect, engineer, QA) and has them collaborate through a structured 'standard operating procedure' to turn a one-line requirement into working software.

## Why it's in the Arsenal

MetaGPT is catalogued here on the strength of its own documentation and public record, not on independent measurement — treat the claims below as what the project states about itself until you have run it.

## Architecture

Agents are organized into role-based pipelines mirroring a software team's division of labor; a shared message pool and structured document artifacts (requirements docs, design docs) flow between roles in a defined sequence, constraining the otherwise open-ended nature of multi-agent collaboration.

## Ecosystem Position

Upstream: none of particular note. Downstream: MGX is a commercial product built on the same research lineage. Competing: OpenHands and other autonomous coding-agent systems, though MetaGPT's role-based SOP approach is architecturally distinct. Complementary: none specific.

## Getting Started

```bash
pip install metagpt
```

```python
# See the project's official documentation (Resources below) for a
# runnable quickstart tailored to this framework's specific API.
```

## Key Use Cases

1. **Turning a one-line requirement into a documented spec**: the multi-role pipeline produces user stories, requirements, design and API documents, which is a deliverable even when the code it generates is not usable.
2. **Research on SOP-constrained multi-agent collaboration**: "Code = SOP(Team)" is a published thesis with code, so it is a reproducible baseline for comparing structured role pipelines against free-form agent chatter.
3. **Prototyping a product spec from a prompt**: faster and cheaper than a full agent coding loop when what the team needs is a structured brief to edit.
4. **Teaching multi-agent orchestration**: the role sequence and shared message pool are visible in the code, which makes the framework easier to explain than an emergent system.
5. **Workflows where artefacts must exist between steps**: requiring a design document before implementation is a constraint that most frameworks leave to the prompt, and here it is structural.
6. **Agent workflow research**: AFlow (ICLR 2025 oral) is part of the same line of work and is interesting independently of the product framing.

## Strengths

- The role-and-SOP structure is a real opinion about how to constrain multi-agent systems, and it produces intermediate artefacts that can be reviewed rather than only an end result.
- Strong research record: MetaGPT, AFlow (ICLR 2025 oral, AOT and SPO papers) all ship code in or alongside this repository, which makes claims checkable.
- 71k stars and an MIT licence put it among the most visible multi-agent projects, so examples and discussion are abundant.
- The "software company" framing is a good fit for demos and for the specific task of producing a spec from a requirement.

## Limitations

- **Development has effectively stopped.** The last push was 2026-01-21, nine months before this review; the release notes stop at product announcements from 2025, and the Python ceiling is `<3.12`, which increasingly means an unsupported interpreter.
- **The commercial successor is the real product.** The team's energy went to MGX (mgx.dev) and the research papers, so the open repository is a reference implementation you inherit rather than a maintained dependency.
- **Role-play is not engineering.** The pipeline generates plausible documents; whether they correspond to working software is a separate question, and the published evaluations target benchmark tasks rather than production codebases.
- **Token cost grows with role count.** Every role reads and writes into the shared message pool, so a five-role run is many model calls before any code exists.
- **137 open issues with no active triage** is consistent with an archived-in-practice project; bugs you hit are yours.
- **Alternatives have moved on.** `langgraph`, `crewai` and `openhands` all cover adjacent ground with active maintenance, and the honest reason to pick MetaGPT now is research reproduction, not production use.

## Relation to the Arsenal

A research artefact more than a default choice: compare it with `langgraph` for explicit graph-based orchestration, `crewai` for role-based agents with active development, and `openhands` when the task is actually writing code in a repository. `autogen` and `smolagents` cover the conversational multi-agent end of the same space.

The natural use is as a baseline in an evaluation of agent architectures — and that is a different product decision from adopting it.

## Resources

- [GitHub](https://github.com/FoundationAgents/MetaGPT)
- [Documentation](https://docs.deepwisdom.ai/)
