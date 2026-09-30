---
id: secure-code-game
name: secure-code-game
version_tracked: null
artifact_type: library
category: evaluation
subcategory: evaluation
description: A browser-based in-editor game where players secure a simulated AI agent across four self-contained seasons
github_url: "https://github.com/skills/secure-code-game"
license: MIT
primary_language: Other
tags: [security, agents, guardrails, community-favorite]
maturity: production
cost_model: open-source
github_stars: 2838
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-13"
docs_url: "https://gh.io/scg"
demo_url: null
phase: benchmark-and-eval
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Teaches agent-specific weaknesses - tool abuse, memory poisoning, multi-agent trust - in a sandbox with no setup."
best_for:
  - "You are teaching secure-by-default thinking to engineers who have no security background and no appetite for a CVE course."
  - "You are onboarding a team onto agent tooling and want them to internalize prompt injection and tool-permission risk first."
  - "You are running a workshop and need a self-contained exercise that works in the browser with no local toolchain."
avoid_if:
  - "You need to train engineers on real production vulnerabilities, since the scenarios are simulated and structured for teaching."
  - "You have a policy against spending GitHub Actions minutes, because every season runs in a Codespace against the 60-hour monthly allowance."
  - "You want assessment analytics, since completion is self-reported rather than captured for a manager."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 2838, MIT, JavaScript, last commit 2026-09-13, topics, homepage. From README: template-repo workflow, Codespaces under three minutes, 60-hour Actions allowance, Season 4 agentic ~2h, Season 3 LLM ~1.5h, Season 2 CodeQL ~6h, Season 1 Python/C ~6h, 10,000 players claim. Exercises unverified."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

Secure Code Game is a GitHub template repository that clones itself per player - the README tells you to click Use this template, which starts each person with their own copy so Actions minutes are not shared. Season 4 places the player inside a fully interactive AI coding assistant that turns natural language into bash, browses the web, connects to live data sources, runs org-approved skills, stores persistent memory, and orchestrates multi-agent workflows; the goal is securing agentic workflows and multi-agent communications across five progressively harder levels, taking roughly two hours. Season 3 covers LLM application security - prompt design, input and output handling, connected data sources - in about ninety minutes. Seasons 2 and 1 are the conventional secure-coding foundations, with Season 2 spanning CI/CD, backend services, and web apps using CodeQL with GitHub Actions, Go, Python, and JavaScript in roughly six hours, and Season 1 covering web apps, systems programming, and data handling in Python and C for another six. Each season is self-contained, so Season 3 or 4 can be started without finishing what came before.

## Why it's in the Arsenal

The recurring problem is that security training material assumes you already know the vulnerability class. That works for web frameworks and fails for agent systems, where the dangerous primitives - a tool the agent may call, memory it writes, a peer agent it messages - are recent and unfamiliar. Putting the player inside a working AI assistant means prompt injection is a thing they cause rather than a thing they read about, which is the only way the intuition transfers. Self-contained seasons also solve the sequencing problem: a team can start at the level that matches what their agents actually do.

## Architecture

Each season is a directory with its own README and a configured GitHub Codespace environment, so the whole experience runs in the browser with VS Code in the tab and no local installation. The repository is a template on purpose - each player forks it rather than contributing upstream, which keeps per-player progress independent and avoids a shared workspace bottleneck. Exercises are organized as levels with a stated time budget and named tools the player manipulates: for the AI seasons, prompt design, connected data sources, tool permissions, persistent memory, and inter-agent messaging. Earlier seasons pair GitHub Actions workflows with real language stacks so CodeQL findings are genuine rather than simulated, and the whole thing is designed to be finished in under two minutes of setup.

## Ecosystem Position

Secure Code Game competes with Snyk, OWASP Juice Shop, PortSwigger Web Security Academy, and the free tiers of security training vendors, all of which target conventional application vulnerabilities rather than agent-specific ones. Compared with Juice Shop or the PortSwigger academy, the material is self-hosted in Codespaces rather than browser-hosted by a vendor, which is a real advantage when you cannot send trainee activity to an external platform. It overlaps with the security skill libraries in the sibling framework entries that teach procedures to an agent, but the audience is inverted: this teaches humans the failure modes, which is what you want before anyone wires an agent into a privileged tool. It complements content/projects/benchmark-and-eval in spirit - both are verification thinking - though neither produces a metric, and it shares no code with the frameworks, retrieval, or serving entries.

## Getting Started

Fork your own copy from the template repository, then let Codespaces build the environment. The GitHub CLI form of the create-and-open path is:

```bash
gh repo fork skills/secure-code-game --clone --remote
cd secure-code-game
gh codespace create        # opens a Codespace on your fork
```

Pick a season folder from the README once the Codespace finishes installing extensions, which takes under three minutes.

## Key Use Cases

1. Onboard engineers onto agent risk: run Season 4 so the team experiences prompt injection and tool abuse from inside the agent before they build one.
2. Refresh fundamentals cheaply: use Season 1 or 2 with CodeQL on a real repository so the training involves genuine findings.
3. Run a workshop without setup help: hand each participant a template fork and a Codespace link, and everyone works independently in the browser.

## Strengths

- The only widely available training that puts the learner inside a working AI agent with real bash, web, memory, and multi-agent capabilities.
- Self-contained seasons let a team jump to the level matching their actual agent surface instead of completing a curriculum.
- Runs entirely in Codespaces with no local toolchain, which removes the usual reason training never happens.
- Template-per-player by design, so dozens of participants work simultaneously without a shared environment.

## Limitations

This is simulated training, so it teaches the shape of agent vulnerabilities without the depth of real exploitation or defense - a passing Season 4 is not evidence of secure design. Each Codespace consumes the repository owner's GitHub Actions allowance, and the README's advice to go public shifts that cost rather than removing it. There is no assessment, leaderboard, or completion tracking, so you cannot prove to a compliance regime that anyone was trained. Season 2 and Season 1 need real toolchains working inside Codespaces, which makes them slower and more failure-prone than the AI seasons. Content is English-only and the framing assumes a learner comfortable in an editor.

## Relation to the Arsenal

This benchmark-and-eval-phase entry trains the people rather than measuring a system, but it shares the verification mindset of the evaluation tooling in this phase. Its agent scenarios assume the tooling patterns in content/projects/frameworks, its defensive advice maps onto the MCP and agent-security surfaces catalogued in content/projects/data-and-retrieval, and it evaluates no model, so content/projects/inference-engines is not involved.

## Resources

- [Repository and season index](https://github.com/skills/secure-code-game)
- [Project site and FAQs](https://gh.io/scg)
- [Season 4 - Agentic AI](https://github.com/skills/secure-code-game/tree/main/Season-4)
