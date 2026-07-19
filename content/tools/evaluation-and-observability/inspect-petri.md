---
id: inspect-petri
name: Inspect Petri
type: tool
job: [evaluation, security-and-guardrails]
description: An Inspect AI auditing agent for probing alignment failures, reward hacking, and unsafe model behavior
url: "https://meridianlabs-ai.github.io/inspect_petri/"
cost_model: open-source
pricing_detail: Open source (MIT); model-provider and compute costs are separate
tags: [evaluation, agents, alignment, security, tool-use, research]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: The software is open source; auditor, target, and judge model calls are not free
self_hostable: true
open_source: true
source_url: "https://github.com/meridianlabs-ai/inspect_petri"
docs_url: "https://meridianlabs-ai.github.io/inspect_petri/"
github_url: "https://github.com/meridianlabs-ai/inspect_petri"
alternatives: [inspect-ai]
integrates_with: [inspect-ai]
added_date: "2026-07-19"
last_reviewed: "2026-07-19"
added_by: maintainer
reviewed_by: maintainer
verdict: watching
verdict_rationale: A focused alignment-auditing layer for Inspect AI, with useful multi-turn probes but model-dependent evidence
status: active
phase: evaluation-and-observability
audience: [research, prototype]
best_when:
  - You need to turn a concrete alignment hypothesis into a repeatable multi-turn audit with an auditor, target, and judge model
  - Your audit needs simulated tools and rollback behavior rather than a single prompt-response safety check
  - You want transcript-level evidence that can be reviewed after a probe instead of only an aggregate refusal score
avoid_when:
  - You need a production guardrail that blocks requests synchronously; Petri is an audit harness, not an inline policy enforcement layer
  - Your team cannot budget for several model roles per scenario or lacks a safe sandbox for tool simulations
  - You need stable Python APIs across major versions without pinning; the v3 release is not fully compatible with the v2 branch
version_tracked: null
enrichment_status: draft
enrichment_notes: "README and official documentation reviewed 2026-07-19; v3/v2 compatibility caveat retained."
---

## Overview

Inspect Petri is an auditing agent built on Inspect AI. Instead of asking a model one safety question, it generates an audit scenario from seed instructions, has an auditor model interact with a target model over multiple turns, simulates tools and rollbacks, and sends the resulting transcript to a judge model with a defined rubric. The unit of analysis is therefore a behavioral trace rather than a single refusal.

## Why It's in the Arsenal

Most safety scanners stop at prompt-response probes or report a binary jailbreak result. Petri occupies a narrower but important space: testing an alignment hypothesis end to end while the model is allowed to act, revise plans, and encounter simulated tools. It belongs beside Inspect and agent-safety benchmarks as a way to investigate why a model exhibits a concerning behavior, not as a replacement for deployment-time controls.

## Key Features

- Seed-instruction-driven generation of realistic audit scenarios
- Separate auditor, target, and judge model roles for multi-turn testing
- Simulated tools and rollback paths for probing agentic behavior
- Rubric-based scoring over complete transcripts

## Architecture / How It Works

Petri orchestrates an auditor model that constructs and drives an audit against a target model. The scenario can expose tools and reversible actions, allowing the target's behavior to unfold over several turns. A judge model then evaluates the transcript against the audit rubric. This separation makes the audit reusable across target models, but it also means that the auditor and judge are part of the measurement apparatus and can introduce their own blind spots.

## Getting Started

```bash
git clone https://github.com/meridianlabs-ai/inspect_petri.git
cd inspect_petri
python -m venv .venv
source .venv/bin/activate
pip install -e .
```

The official documentation at [meridianlabs-ai.github.io/inspect_petri](https://meridianlabs-ai.github.io/inspect_petri/) contains the current CLI and scenario instructions. Pin the v3 revision when reproducing an audit; the README documents a separate `petri-v2` install for users who need the older API:

```bash
pip install git+https://github.com/meridianlabs-ai/inspect_petri@petri-v2
```

## Use Cases

1. **Scenario**: test whether an agent follows a reward signal into an unsafe strategy across multiple tool calls
2. **Scenario**: compare a safety intervention by replaying the same audit hypothesis against two target-model configurations
3. **Scenario where this is NOT the right fit**: enforce a live request policy at an API gateway — use a guardrail or policy layer for that path

## Strengths

- Models alignment questions as executable, multi-turn audits rather than static prompt lists
- Transcript judging makes the evidence inspectable and supports qualitative follow-up
- Simulated tools and rollback affordances cover failure modes that single-turn red-team suites cannot exercise

## Limitations / When NOT to Use

- Auditor and judge models shape both the scenarios and the conclusions; a weak judge can hide or overstate a failure
- Simulated environments do not establish that the same behavior will occur with real credentials, tools, or users
- Multi-role audits can be expensive and slow compared with a batch of single-model probes
- The v3 Python/API surface changed from v2, so old audit code needs explicit version pinning

## Integration Patterns

- Use Inspect AI as the surrounding evaluation runner and preserve Petri transcripts with the rest of the eval artifacts.
- Pair findings with [AgentDojo](../../benchmarks/safety/agentdojo.md) or AgentHarm to distinguish a bespoke hypothesis from benchmark coverage.
- Feed confirmed failure modes into a separate runtime guardrail and regression suite; Petri itself should not sit on the request path.

## Resources

- [GitHub](https://github.com/meridianlabs-ai/inspect_petri)
- [Documentation](https://meridianlabs-ai.github.io/inspect_petri/)
- [Inspect AI](https://inspect.aisi.org.uk/)

## Buzz & Reception

1.2k GitHub stars verified via the repository API on 2026-07-19; MIT-licensed and actively developed by Meridian Labs around the Inspect AI ecosystem. Its significance is in focused alignment auditing, not breadth of integrations.

---
*Last reviewed: 2026-07-19 by @maintainer*
