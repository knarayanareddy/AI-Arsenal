---
id: ai-infra-guard
name: AI Infra Guard
type: tool
job:
- security-and-guardrails
- evaluation
description: "Tencent Zhuque Lab's full-stack red-teaming platform covering agent, skill, MCP, AI-infrastructure and jailbreak scanning in one deployable product"
url: https://tencent.github.io/AI-Infra-Guard/
cost_model: open-source
pricing_detail: Apache-2.0 software; target-model, sandbox, and infrastructure costs
  are separate
tags: [embeddings, agents]
maturity: production
stack:
- python
free_tier: true
free_tier_limits: Fully open source; no hosted tier required
self_hostable: true
open_source: true
source_url: https://github.com/Tencent/AI-Infra-Guard
docs_url: "https://tencent.github.io/AI-Infra-Guard/"
github_url: https://github.com/Tencent/AI-Infra-Guard
alternatives:
- garak
- pyrit
- agentic-security
integrates_with: []
added_date: '2026-07-19'
last_reviewed: '2026-07-19'
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience:
- research
- production
best_when: ["You run agents that load third-party skills and MCP servers, and need a supply-chain assessment of what those components are permitted to do before trusting them with real data.", "You have no dedicated AI security team and need one platform covering prompt injection, jailbreak evaluation, infrastructure fingerprinting and component scanning rather than assembling four separate tools.", "You want skill and MCP scanning usable in a CI job without deploying a platform, because the standalone CLIs exist separately from the web product."]
avoid_when: ["You need something safe to expose beyond localhost, because the README is explicit that the platform ships without an authentication mechanism and must not be deployed on public networks.", "You want a lightweight library to embed in a service, because this is a deployable platform with a web interface and a Docker Compose footprint, not an import you add to a build.", "You are evaluating detection quality on a model you will ship, because the published skill-scanner F1 figures are the project's own benchmark against its own taxonomy and do not transfer automatically to your corpus."]
version_tracked: null
enrichment_status: draft
enrichment_notes: Metadata and feature claims are grounded in the project README and
  public repository state; draft pending maintainer review.
verdict: use-with-caution
verdict_rationale: Unusually broad AI red-team coverage, but attack breadth and vendor-associated
  claims require local validation
status: active
---

## Overview

AI-Infra-Guard, branded A.I.G, is a one-stop red-teaming platform from Tencent's Zhuque Lab bundling several scanners behind one web interface on port 8088. The pieces map onto layers of an AI system. ClawScan evaluates an OpenClaw deployment for insecure configuration, skill risk, known vulnerabilities and privacy leakage. Agent Scan is a standalone automated multi-agent framework that assesses agent workflows, with support for agents running on external platforms such as Dify and Coze. MCP server and agent skill scanning checks 14 principal risk categories and works from source code or a remote URL, so no running instance is required. AI infrastructure scanning fingerprints over a hundred AI framework components against more than two thousand known CVEs, covering servers such as Ollama, vLLM, ComfyUI, n8n and Triton. Jailbreak evaluation runs curated datasets through multiple attack methods and offers model-to-model comparison. The skill scanner also publishes numbers, reporting F1 scores from 0.974 to 0.985 across five judge models against the SkillTrustBench taxonomy of nine risk categories, spanning instruction hijacking, memory poisoning, remote payload download, embedded malicious code, privilege escalation, persistence, tool hijacking, insecure dependencies and insecure coding practices.

## Why It's in the Arsenal

The decision is whether AI security review is a model problem or a system problem. Most tooling answers the former, while the practical exposure in an agent deployment is usually the latter: a skill file that reads and forwards files, an MCP server with a broader tool scope than it needs, a serving stack two CVEs behind. Treating those as one assessment changes what a review can conclude and who can perform it, because a platform with a web interface is usable by someone who is not an application security engineer. The cost is exactly what the README says out loud: an unauthenticated service belonging on an internal network, plus the standing temptation to treat a scanner's clean result as a guarantee rather than as evidence.

## Key Features

- Covers the whole stack in one assessment, so a skill risk and a stale serving component are found in the same exercise rather than by two different teams.
- Skill, MCP and agent scanning exist as standalone CLIs, so the supply-chain check does not require standing up a platform or a web UI.
- Static analysis from source or URL means you can assess a component before it ever runs with real credentials.
- Apache-2.0 with published detection numbers on a named taxonomy, which is unusual transparency for a security tool of this size.

## Architecture / How It Works

The platform runs as a Docker Compose stack with a documented floor of Docker 20.10, 4 GB of RAM and 10 GB of disk, fronted by a web UI on port 8088, and there is a one-click install script as an alternative to building from source. Five scanners sit behind it, each usable through the interface and, in the case of skill, MCP and agent scanning, also available as standalone command-line tools that run against source or a URL - which is the path that fits a CI job. Skill scanning is LLM-assisted, and the published evaluation shows F1 varying with the judging model, which tells you detection quality is a function of what you run it with rather than a fixed property. Infrastructure scanning is a different mechanism underneath: it identifies which component and version is running and matches that against a vulnerability database, so a clean result depends on the fingerprint succeeding first. There is also a model and API relay checker for testing endpoints, and the components ship as ClawHub skills so the capability reaches agents that never install the platform.

## Getting Started

Deploy the stack with Compose and open the web interface on port 8088; the documented prerequisites are Docker 20.10 or higher, 4 GB of RAM and 10 GB of disk:

```bash
docker-compose -f docker-compose.images.yml up -d
```

Then browse http://localhost:8088. For CI use the standalone skill, MCP or agent scan CLIs instead of standing up the platform, and note the project's own warning that the default deployment has no authentication.

## Use Cases

1. Pre-install supply-chain review: point the skill scanner at a remote skill URL or a local source tree and get a T01-T09 classification before you let it load in an agent with file and shell access.
2. MCP server audit: scan a server definition for over-broad tool scopes, induced instructions in tool descriptions and unsafe data flows, from source without running it.
3. Estate exposure check: point the infrastructure scanner at your internal network to fingerprint running Ollama, vLLM, n8n or Triton instances and match versions against known CVEs.

## Strengths

It competes with Protect AI-style supply-chain scanners and with narrower single-purpose tools, and its sharpest contrast is with agentic-security in the same tools phase, which stops at the model API boundary while this reaches skills, MCP servers, agent configurations and serving components. Compared with ClawHub's own risk metadata, which is a catalogue of what a published skill is known to be, this performs its own detection, so the two are complementary rather than rivals. Where content/projects/evaluation-and-observability holds tools that watch agents after they run, this looks at the components that give agents capability in the first place, so a clean trace and a clean supply chain are different questions. Its infrastructure scanner overlaps with conventional CVE tooling for self-hosted servers, except that it is aimed at the AI-serving stack specifically.

## Limitations / When NOT to Use

The README's own warning is the first thing to weigh: no authentication and no public-network deployment, so this needs a trusted segment and network controls you supply. Detection quality is benchmark-dependent - the reported F1 scores come from the project's own taxonomy and vary with the judge model, so a clean result on a different corpus tells you much less. The CVEs and component database is necessarily a snapshot, and an internal deployment with patched or unusual builds will fingerprint poorly, producing both false negatives and false positives. The breadth is also a maintenance problem: five scanners plus a relay checker, several of them fast-moving, in one repository. Detection of prompt injection in particular is a moving target against models that were trained on the attack literature. And a commercial Pro tier with an invitation code sits alongside the open-source build, which is worth weighing when you are deciding what to deploy internally.

## Integration Patterns

This is the broad red-teaming entry in content/tools/evaluation-and-observability, and it covers more attack surface than the model-focused scanner in the same phase. Its targets reach into the agent tooling published under content/tools/dx-and-tooling and content/projects/agent-systems, which is where the skills and MCP servers being scanned come from. For what to do with a positive finding, the observability tools in the same phase give you the runtime view. If the exposure is in the serving layer rather than the agent layer, content/projects/inference-engines is where the affected components are catalogued.

## Resources

- [GitHub — Tencent/AI-Infra-Guard](https://github.com/Tencent/AI-Infra-Guard)
- [Official documentation](https://tencent.github.io/AI-Infra-Guard/)
- [SkillTrustBench taxonomy and leaderboard](https://matrix.tencent.com/skilltrustbench/)

## Buzz & Reception

Scans the whole AI stack rather than one model, so a supply-chain risk in a skill file, an over-permissioned MCP server and a stale serving component are one assessment instead of three tools.
