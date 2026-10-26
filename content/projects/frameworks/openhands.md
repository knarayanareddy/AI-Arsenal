---
id: openhands
name: OpenHands
version_tracked: null
artifact_type: framework
category: agents
subcategory: agent-frameworks
description: Self-hosted Agent Canvas that runs OpenHands, Claude Code, Codex or any ACP agent across local, Docker, VM and cloud backends, with Slack/GitHub automations
github_url: "https://github.com/OpenHands/OpenHands"
license: MIT + Enterprise
primary_language: Python
org_or_maintainer: null
tags: [agents, code-gen, tool-use, planning]
maturity: production
cost_model: open-source
github_stars: 91902
github_stars_last_30d: 0
trending_score: 40
last_commit: "2026-10-26"
docs_url: "https://docs.openhands.dev/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language, reasoning]
relation_to_stack: [deploy-as-is, fork-and-adapt]
health_signals: [community-driven, org-backed, actively-maintained]
ecosystem_role:
  - Open-source autonomous coding-agent platform (formerly OpenDevin) for end-to-end software engineering tasks
best_for:
  - You want a deployable, open-source autonomous coding agent that can read/write code, run commands, and browse the web to complete software engineering tasks end to end
  - You need a self-hostable alternative to closed coding-agent products, with the ability to fork and adapt the agent's tool set or execution sandbox
avoid_if:
  - You need a narrowly-scoped code-completion or pair-programming assistant rather than a full autonomous agent — a lighter tool integrated into your IDE may be a better fit than an autonomous execution platform
  - You're not prepared to operate the sandboxed execution environment autonomous coding agents require — running arbitrary generated code safely needs real infrastructure investment
upstream_dependencies: []
downstream_consumers: []
alternatives: [metagpt, langgraph]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: OpenHands has a substantial GitHub star count (76K+) and is frequently referenced in coding-agent benchmark comparisons (e.g. SWE-bench leaderboards), which is a stronger signal of real usage than star count alone, though a specific named enterprise production deployment was not independently confirmed.
added_date: "2026-06-13"
last_reviewed: "2026-10-26"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"newsletter","url":"https://docs.all-hands.dev/","date":"2026-06-13","description":"Official docs"}
featured: false
status: active
---

## Overview

An open-source platform for autonomous AI software-engineering agents (formerly named OpenDevin), capable of reading and writing code, executing commands in a sandboxed environment, and browsing the web to complete end-to-end coding tasks.

## Why it's in the Arsenal

The case for OpenHands rests on its documentation and observed adoption rather than on a controlled comparison here, so the sections below state what it claims to do and what adopting it would commit you to.

## Architecture

An agent loop operates within a sandboxed execution environment (typically a Docker container) with access to a shell, code editor, and browser; the agent plans and executes multi-step coding tasks, observing command output and iterating, with the platform providing the surrounding orchestration, sandboxing, and UI.

## Ecosystem Position

Upstream: depends on sandboxing/containerization infrastructure (Docker) for safe code execution. Downstream: frequently used as a baseline/reference implementation in coding-agent benchmarks like SWE-bench. Competing: closed coding-agent products, MetaGPT (different architectural approach). Complementary: can be configured to use any LLM provider as its underlying reasoning engine.

## Getting Started

```bash
pip install openhands
```

```python
# See the project's official documentation (Resources below) for a
# runnable quickstart tailored to this framework's specific API.
```

## Key Use Cases

1. **Running a coding agent against your own repositories, self-hosted**: the Agent Canvas runs locally or on a server you own and connects to agents through a backend you control, which is the whole appeal over a hosted coding agent.
2. **Automations triggered by events rather than typed prompts**: issue decomposition, dependency updates, code review and report generation can run on a schedule or a webhook from Slack, GitHub, Linear or Datadog.
3. **Mixing agents behind one interface**: OpenHands, Claude Code, Codex, Gemini CLI, Pi, OpenCode or any ACP-compatible agent can be selected per conversation without changing the surrounding tooling.
4. **An always-on engineering assistant**: running on a server rather than a laptop means an agent keeps working after you close the lid, which changes the class of task it can take on.
5. **Isolating agent execution**: the backend can be local, Docker, a VM or your infrastructure, and the README is explicit that running without a sandbox gives the agent full filesystem access — the choice of backend is the security boundary.
6. **Team-shared agent infrastructure**: one Agent Server can serve a team's code-review automation while personal agents run on individual machines, with the same frontend.
7. **Evaluating which agent is better at your codebase**: switching agents on the same canvas is the cheapest way to compare them on real tasks instead of on a leaderboard.

## Strengths

- OpenHands 1.0's pivot to a control centre is the right shape for the problem: agents are long-running and multi-backend, which is not something a chat UI models well.
- ACP support makes it agent-agnostic, so the platform does not force OpenHands' own agent on a team that already standardised on Claude Code or Codex.
- Automation triggers (schedule and webhook) with Slack, GitHub, Linear and Notion integrations turn an agent into infrastructure rather than a toy.
- Backend flexibility is treated as a first-class concept: local, Docker, VM or cloud, switchable from one frontend.
- MIT licensed core with a hosted and enterprise tier, so the open path is real and the commercial boundary is documented rather than hidden.
- 91.9k stars and an active repository (pushed 2026-10-26) — this is one of the few agent platforms with both scale and a regular release cadence.

## Limitations

- **Security is your job.** The README warns that the no-sandbox install gives the agent full filesystem access, and a self-hosted control centre with Slack and GitHub tokens is a privileged system. Hardening guidance exists in `SELF_HOSTING.md`; applying it is a project.
- **The product moved under the entry.** OpenHands 1.0 re-centred the project on Agent Canvas; documentation, blog posts and third-party guides still describe the earlier single-agent workspace, so instructions found online may not match the current release.
- **A platform, not a library.** Node.js 24, `uv`, a frontend, agent servers and container backends are all part of the install — the operational surface is much larger than an agent SDK.
- **1,123 open issues.** Fast-moving and heavily used: expect to encounter rough edges, and expect to diagnose them yourself on the community edition.
- **Agent quality is inherited.** The canvas orchestrates models and agents; it does not make a weak model good at your codebase, and benchmark results for a coding agent rarely transfer unchanged to your repository.
- **Enterprise features sit behind the commercial tier.** Some governance and multi-tenant capabilities are OpenHands Enterprise, which matters if the plan assumes the open-core covers them.

## Relation to the Arsenal

The platform layer above the agent frameworks: `langgraph` and `crewai` are how you build an agent, and OpenHands is a self-hosted environment for running agents — its own, or someone else's via ACP — with automations attached.

Compare with `metagpt` (research-oriented multi-agent, unmaintained) and with hosted coding agents, where the trade is control and data residency against someone else's operational burden. The code-execution sandbox question links it to `terminal-bench`-style evaluation, which is how you would check whether a change to the agent actually helped.

## Resources

- [GitHub](https://github.com/OpenHands/OpenHands)
- [Documentation](https://docs.all-hands.dev/)
