---
id: agentbench
title: "AgentBench"
entry_type: benchmark
category: agents
modality: [text, code]
status: active
protocol_confidence: evolving
score_interpretation: higher-is-better
what_it_measures: "LLM agent task completion across heterogeneous environments including web shopping, databases, knowledge graphs, operating systems, and household tasks, with a current function-calling release."
metrics:
  - name: "task success rate"
    direction: higher
    notes: "Environment-specific completion score aggregated across the benchmark tasks"
  - name: "test-set score"
    direction: higher
    notes: "Leaderboard result under the selected AgentBench release and prompting protocol"
protocol:
  dataset: "AgentBench environments"
  dataset_url: "https://github.com/THUDM/AgentBench"
  evaluation_setup: "Deploy an agent against the selected environment workers and score completed tasks; the current FC release uses function-calling prompts and containerized workers for five environments."
  version: "Current AgentBench FC release; original v0.1/v0.2 environments remain available by tag"
leaderboards:
  - name: "AgentBench leaderboard"
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRR3Wl7wsCgHpwUw1_eUXW_fptAPLL3FkhnW_rua0O1Ji_GIVrpTjY5LaKAhwO-WeARjnY_KNw0SYNJ/pubhtml"
    last_checked: "2026-07-19"
known_issues:
  - "The current FC release is not directly comparable with original v0.1/v0.2 scores because prompts, task coverage, and deployment differ"
  - "Environment dependencies are heavy: Docker workers, Redis, MySQL, operating-system images, and a Freebase database may be required"
  - "Different environments expose different tool APIs and failure modes, so the aggregate score hides important per-task variation"
  - "Several original environments and dependencies use older Python packages; reproducibility requires the documented Python and container versions"
recommended_usage:
  - "Report per-environment results and the exact AgentBench release rather than treating the aggregate as a general intelligence score"
  - "Use the function-calling release to test multi-turn tool interaction across several environment types"
  - "Record container images, database snapshots, model prompt format, and resource limits with every run"
  - "Pair it with focused benchmarks such as WebArena or OSWorld when a deployment depends on one environment family"
last_reviewed: "2026-07-19"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [gaia, webarena, osworld, tau-bench]
enrichment_status: draft
enrichment_notes: "Based on THUDM/AgentBench README and AgentBench, arXiv:2308.03688; title verified 2026-07-19."
tags: [evaluation, agents, tool-use, benchmark, research]
---

## Overview

AgentBench evaluates LLMs as agents across several environments instead of reducing the task to a single response. The original release covered operating systems, databases, knowledge graphs, games, puzzles, household tasks, web shopping, and web browsing. The repository now foregrounds AgentBench FC, a function-calling release with containerized workers for ALFWorld, DBBench, KnowledgeGraph, OS interaction, and WebShop.

## What it Measures (and what it doesn’t)

Measures an agent's ability to follow a multi-turn function-calling protocol, select tools, and complete tasks in heterogeneous environments.

Does not measure: one uniform capability across environments, production reliability, cost/latency, or GUI competence outside the specific environments selected for a run. Its aggregate is a portfolio score, not a universal agent ranking.

## Dataset & Protocol

- **Dataset:** AgentBench environment workers and task sets
- **Dataset URL:** https://github.com/THUDM/AgentBench
- **Evaluation setup:** deploy the agent against selected environment workers and score completed tasks; AgentBench FC uses function-calling prompts and Docker Compose orchestration
- **Version:** current FC release, with original v0.1/v0.2 available by tag

## Metrics

- **task success rate** — higher is better — environment-specific completion score
- **test-set score** — higher is better — reported leaderboard result under the selected release and prompt protocol

## How to Run

The current FC release requires more than a Python package install. The README recommends Python 3.9 and Docker:

```bash
git clone https://github.com/THUDM/AgentBench.git
cd AgentBench
conda create -n agent-bench python=3.9
conda activate agent-bench
pip install -r requirements.txt
docker pull mysql:8
docker build -t local-os/default -f data/os_interaction/res/dockerfiles/default data/os_interaction/res/dockerfiles
docker build -t local-os/packages -f data/os_interaction/res/dockerfiles/packages data/os_interaction/res/dockerfiles
docker build -t local-os/ubuntu -f data/os_interaction/res/dockerfiles/ubuntu data/os_interaction/res/dockerfiles
docker compose -f extra/docker-compose.yml up
```

Knowledge-graph tasks additionally require the Freebase database from the repository's setup instructions. WebShop can require roughly 16 GB of RAM, and the README warns that the ALFWorld worker can leak memory and disk space until restarted.

## Known Issues, Leakage & Gaming Risks

- FC and original AgentBench results are separate protocols; mixing them creates a false trend line.
- Containerized environments can fail for infrastructure reasons before the model is meaningfully evaluated.
- WebShop, ALFWorld, and knowledge-graph workers have materially different resource and data dependencies.
- Prompt format, tool descriptions, environment state, and task selection can dominate the score; publish them with results.

## How to Interpret Scores

- Start with the per-environment table. A high WebShop score does not imply operating-system or database competence.
- Treat the aggregate as a rough portfolio summary only when the same environment set, task split, prompt format, and resource limits are used.
- Current FC results should be compared with other FC runs, not with the original v0.1/v0.2 leaderboard without a protocol note.

## Recommended Usage

- Use AgentBench to smoke-test an agent framework across several tool and environment interfaces.
- Report environment-level success, failure modes, and infrastructure assumptions.
- Use a focused benchmark for the production domain after AgentBench identifies a capability gap.

## Related Benchmarks

- [GAIA](../agents/gaia.md) — general assistant tasks with tool use and multimodal inputs
- [WebArena](../agents/webarena.md) — browser-based web tasks
- [OSWorld](../agents/osworld.md) — multimodal computer-use tasks
- [TAU-bench](../agents/tau-bench.md) — customer-service tool-agent interaction

## Relation to the Arsenal

AgentBench is a broad agent-capability reference point: useful for comparing environment coverage and orchestration choices, but intentionally less diagnostic than a domain-specific benchmark. It complements the Arsenal's browser, computer-use, and tool-agent entries by covering multiple interaction surfaces in one repository.

## Resources

- [GitHub](https://github.com/THUDM/AgentBench)
- [Leaderboard](https://docs.google.com/spreadsheets/d/e/2PACX-1vRR3Wl7wsCgHpwUw1_eUXW_fptAPLL3FkhnW_rua0O1Ji_GIVrpTjY5LaKAhwO-WeARjnY_KNw0SYNJ/pubhtml)
- [Paper](https://arxiv.org/abs/2308.03688)
