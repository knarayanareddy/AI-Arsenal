---
id: skillspector
name: SkillSpector
type: tool
job: [security-and-guardrails]
description: Security scanner from NVIDIA that detects vulnerabilities and malicious patterns in AI agent skills
url: "https://github.com/NVIDIA/SkillSpector"
cost_model: open-source
pricing_detail: Free and open source (Apache-2.0)
tags: [agents, security, guardrails]
maturity: beta
stack: [python]
free_tier: true
free_tier_limits: Fully free and self-hostable; no paid tier exists
self_hostable: true
open_source: true
source_url: "https://github.com/NVIDIA/SkillSpector"
docs_url: "https://github.com/NVIDIA/SkillSpector"
github_url: "https://github.com/NVIDIA/SkillSpector"
alternatives: []
integrates_with: []
added_date: "2026-07-07"
last_reviewed: "2026-07-07"
added_by: maintainer
reviewed_by: maintainer
phase: evaluation-and-observability
audience: [production]
best_when:
  - Your team installs third-party agent skills (from marketplaces or community collections) and you want automated scanning for prompt-injection payloads, malicious instructions, and dangerous script patterns before they reach an agent
  - You maintain an internal skill library and want a security gate in CI, the same way you scan dependencies
avoid_when:
  - You treat a scan as a substitute for reading third-party skills — scanners catch known patterns; novel injected instructions can pass
  - You only run first-party skills you authored — review effort is better spent on your agents' tool permissions
version_tracked: null
enrichment_status: draft
enrichment_notes: Star count (12.2k), Apache-2.0 license, NVIDIA ownership, and active development (last push 2026-07-07) verified via the GitHub API on 2026-07-07; on GitHub monthly trending. Detection-capability claims from the project's own documentation; coverage not independently benchmarked here.
verdict: watching
verdict_rationale: First serious org-backed answer to a real new attack surface (malicious agent skills), but young — pattern coverage and false-negative rate are unproven
status: active
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/trending?since=monthly","date":"2026-07-07","description":"On GitHub monthly trending; 12.2k stars"}
---

> **TL;DR:** NVIDIA's open-source scanner for AI agent skills — detects prompt-injection payloads, malicious instructions, and dangerous script patterns in skill packs before you install them. Free, Apache-2.0. Best as a CI gate on third-party skills; not a substitute for reading them.

## Overview

An open-source security scanner from NVIDIA that analyzes AI agent skills — the Markdown-instruction-plus-script packages installed into coding agents — for vulnerabilities, malicious patterns, and security risks, treating skills as the supply-chain artifact they are.

## Why It's in the Arsenal

Agent skills are instructions an agent will *follow with your permissions*, making a malicious skill closer to malware than to a bad dependency — and skill marketplaces have exploded with unvetted third-party packs. SkillSpector earns a place in the Arsenal as the first org-backed tooling for this specific attack surface: an automated scan layer for the "read before installing" discipline that manual review doesn't scale to.

## Key Features

- Scans skill files for prompt-injection payloads and hidden malicious instructions
- Analyzes bundled scripts for dangerous execution patterns (exfiltration, credential access)
- Suitable as a pre-install check or CI gate over an internal skill library
- Python, Apache-2.0, NVIDIA-maintained

## Architecture / How It Works

SkillSpector parses a skill package (instruction Markdown plus any bundled scripts/resources) and runs detection passes over both layers: content analysis for instruction-level attacks (injections, deceptive directives) and static analysis for script-level risks. Findings are reported per file with the matched pattern, so a human can adjudicate rather than trusting a binary verdict.

## Getting Started

```bash
# See the project's README (Resources below) for current install
# and scan-invocation commands.
```

## Use Cases

1. **Scenario**: before installing a community skill pack from a marketplace, scan it and review flagged files instead of trusting the README
2. **Scenario**: an internal skill library gets a CI job that scans every skill PR, the same way dependency scanners gate package updates

## Strengths

- Addresses a genuinely new, genuinely dangerous surface — skills execute with the agent's (your) permissions
- Org-backed (NVIDIA), open-source, and actively developed (12.2k stars as of 2026-07-07)

## Limitations / When NOT to Use

- Pattern-based detection has unknown false-negative rates against novel attacks; it complements, not replaces, reading third-party skills
- Young project — coverage claims are the project's own and unbenchmarked by third parties so far

## Integration Patterns

- Gate skill installation: scan → human review of findings → install, mirroring dependency-review workflows
- Pair with least-privilege agent configuration (scoped tool permissions, approval gates for irreversible actions) so a missed detection has bounded blast radius — see [security-and-guardrails tools](../by-job/security-and-guardrails.md)

## Resources

- [GitHub](https://github.com/NVIDIA/SkillSpector)

## Buzz & Reception

On GitHub monthly trending with 12.2k stars as of 2026-07-07; notable as the first major-vendor security tool aimed specifically at the agent-skills supply chain.
