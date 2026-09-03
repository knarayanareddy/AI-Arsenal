---
id: cua
name: "Cua"
version_tracked: null
artifact_type: platform
category: agents
subcategory: autonomous
description: "Open drivers, virtual-machine fleets, and benchmarks for computer-use agents across macOS, Windows, and Linux"
github_url: "https://github.com/trycua/cua"
license: "MIT"
primary_language: Python
org_or_maintainer: "Cua"
tags: [agents, tool-use, benchmark, evaluation]
maturity: beta
cost_model: open-source
github_stars: 22143
github_stars_last_30d: 0
trending_score: 68
last_commit: "2026-09-03"
docs_url: "https://github.com/trycua/cua#readme"
demo_url: null
paper_url: null
paper_id: null
phase: agent-system
domain: [vision, multimodal, general-purpose]
relation_to_stack: [build-on-top, study-and-reference]
health_signals: [actively-maintained, community-driven]
ecosystem_role:
  - "The infrastructure layer beneath computer-use agents: virtualisation drivers plus a fleet API plus task benchmarks, so an agent can be pointed at a disposable desktop operating system instead of the operator's machine."
best_for:
  - "You need to evaluate or train a computer-use agent against reproducible desktop tasks and want isolated, disposable virtual machines rather than a shared host"
  - "You are generating trajectories or demonstration data for GUI automation and need cross-OS capture with a consistent action schema"
avoid_if:
  - "Your target is a single stable web application — a browser-level driver is a far cheaper and more deterministic surface than a full desktop virtual machine"
  - "You cannot afford the host hardware or orchestration overhead of running virtualised desktops, where a headless browser or API integration costs a fraction of the compute"
upstream_dependencies: []
downstream_consumers: []
alternatives: [browser-use, skyvern]
integrates_with: [browser-use]
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Stars (22,143), forks (1,523), licence (MIT), and last commit (2026-09-03) verified via the GitHub API on 2026-09-03. The API reports HTML as dominant across a polyglot monorepo (Rust, Python, TypeScript, Go, Swift); Python is recorded as the agent-facing integration surface."
added_date: "2026-09-03"
last_reviewed: "2026-09-03"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/trycua/cua", "date": "2026-09-03", "description": "22,143 stars on GitHub as of 2026-09-03 (GitHub API)"}]
featured: false
status: active
---

## Overview

Cua is the infrastructure side of computer-use agents: a set of open virtualisation drivers, an API for standing up fleets of disposable desktop operating systems, and task benchmarks for evaluating agents that act through a graphical interface. Where most projects in this lane give an agent a browser, Cua gives it a whole machine — macOS, Windows, or Linux — reachable through a consistent action schema of clicks, keystrokes, and screenshots. The repository is a polyglot monorepo spanning Rust, Python, TypeScript, Go, and Swift, with Python as the surface most agent authors integrate against. It reached roughly 22,100 stars by 2026-09-03.

## Why it's in the Arsenal

Computer-use is the one agent capability that is almost impossible to evaluate safely on real infrastructure: an agent that clicks through a desktop can also delete files, spend money, and exfiltrate credentials. The catalogue documents the agents that do this but not the isolation layer that makes doing it testable. Cua fills that gap, and its benchmark component makes it doubly relevant — the repository's own framing is training, evaluation, and data generation, which puts it closer to the benchmark lane than the other agent-system entries here. Anyone claiming a computer-use success rate should be able to name the environment it was measured in.

## Architecture

The bottom layer is virtualisation: drivers built on platform-native facilities such as Apple's Virtualization framework and Windows sandboxing, wrapped so a guest operating system can be created, snapshotted, and destroyed through one API. Above that sits a fleet manager that allocates machines, exposes them over a network transport, and handles session lifecycle. The agent-facing layer normalises perception and action — screenshots and element state in, pointer and keyboard events out — so a policy written against one guest OS runs against the others. The benchmark harness replays scripted desktop tasks against that stack and scores completion, which is also how demonstration trajectories get captured for training.

## Ecosystem Position

It is complementary to [Browser Use](./browser-use.md) rather than a replacement for it: browser agents operate on a constrained, inspectable DOM, while Cua operates on an opaque desktop where the only signal is pixels. Against [Skyvern](./skyvern.md) the difference is scope — Skyvern automates web workflows, Cua provisions the machine a web browser happens to run on. It overlaps the [benchmark entries](../benchmarks-and-evals/_index.md) in intent but not in kind, since it supplies the environment as well as the task set. It is not an agent itself: there is no planner or policy to compare against the frameworks in [Frameworks](../frameworks/_index.md).

## Getting Started

```bash
pip install cua
```

```python
from cua import Computer
computer = Computer(os="macos")   # allocates a disposable guest
computer.screenshot()
computer.click(x=400, y=300)
computer.release()                # destroy the guest
```

## Key Use Cases

1. **Safe evaluation of GUI agents** — running a task suite against throwaway virtual machines instead of a developer laptop.
2. **Trajectory generation** — capturing action-and-screenshot sequences for fine-tuning a computer-use policy.
3. **Cross-OS automation research** — testing one policy across macOS, Windows, and Linux guests behind a single API.

## Strengths

- Isolation is architectural: each task runs in a guest that can be snapshotted and destroyed, which bounds the damage an agent can do.
- Cross-OS coverage behind one action schema removes a large class of per-platform special-casing from agent code.
- Shipping the benchmark alongside the drivers means the environment and the measurement cannot drift apart.

## Limitations

- Desktop virtualisation is expensive; a fleet of graphical guests costs an order of magnitude more compute than headless browser sessions.
- Pixel-only perception means no accessibility tree or DOM to fall back on, so failures are harder to attribute than in a browser agent.
- The monorepo spans many languages, so the boundary between a stable public API and internal implementation is harder to identify than in a single-language project.

## Relation to the Arsenal

Catalogued as an agent-system because it is deployed as running infrastructure, though its benchmark component also makes it relevant to [Benchmarks & Evals](../benchmarks-and-evals/_index.md). For browser-scoped alternatives that avoid virtualisation entirely, see [Browser Use](./browser-use.md).

## Resources

- [GitHub](https://github.com/trycua/cua)
- [README](https://github.com/trycua/cua#readme)

---
*Confirmed against the GitHub API on 2026-09-03 by @maintainer — enrichment_status: draft. 22,143 stars, 1,523 forks, MIT, last commit 2026-09-03. Primary language recorded as Python: the API reports HTML as dominant across a polyglot monorepo, which reflects bundled web assets rather than the integration surface.*
