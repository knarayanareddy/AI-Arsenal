---
id: anthropic-cybersecurity-skills
name: Anthropic-Cybersecurity-Skills
version_tracked: null
artifact_type: library
category: llms
subcategory: frameworks
description: "Eight hundred eighteen agent skills across thirty-four security domains, each mapped to the frameworks that apply to its type"
github_url: "https://github.com/mukul975/Anthropic-Cybersecurity-Skills"
license: Apache-2.0
primary_language: Python
tags: [agents, security]
maturity: alpha
cost_model: open-source
github_stars: 33509
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-08-31"
docs_url: "https://agentskills.io"
demo_url: null
phase: framework
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Solves the blank-page problem when an agent needs to know which tool and technique answers a specific security question."
best_for:
  - "You are a defender writing a threat-hunting playbook and need technique-level steps resembling what a working analyst would actually run."
  - "You are building a compliance mapping and need each skill tagged to ATT&CK, D3FEND, CSF 2.0, ATLAS, AI RMF, or MITRE F3."
  - "You are onboarding junior security staff who need a curated index instead of an unscoped research prompt."
avoid_if:
  - "You are shipping agent behavior to production without reviewing the content, because offensive and dual-use material sits alongside the defensive material."
  - "You are working air-gapped, since the skills assume access to scanners, cloud CLIs, and threat feeds they do not bundle."
  - "You need a vendor support contract, because this is an explicitly unaffiliated community project rather than an Anthropic product."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 33509, Apache-2.0, Python, last commit 2026-08-31, topics, homepage. From README: 818 skills, 34 domains, 6 frameworks, 26+ platforms, agentskills.io standard, authorized-use notice. Individual skill bodies and mapping accuracy were not spot-checked."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

The library holds 818 structured skills spread over 34 security domains, and each one follows the agentskills.io open standard so the same file loads in Claude Code, GitHub Copilot, Codex CLI, Cursor, Gemini CLI, and other platforms including Hermes Agent. The mapping is type-aware rather than blanket: a forensics skill carries ATT&CK plus CSF, while an AI-security skill additionally picks up ATLAS and the NIST AI RMF, so the compliance metadata reflects the domain instead of decorating every file with every badge. Content spans red-team tradecraft, malware analysis, cloud security, OSINT, incident response, and AI-specific domains, with an MCP integration path for tool-backed skills.

## Why it's in the Arsenal

The recurring problem is that a general model knows the vocabulary of security but not the procedure - which Volatility plugin, which Sigma rule shape, which scoping question for a multi-cloud breach. Skills supply the procedure without retraining anything, and the framework mapping turns that procedure into something a reviewer can check against a compliance baseline. Splitting the library per domain also means you install forensics guidance into a forensics context instead of pushing the entire corpus into every prompt.

## Architecture

The unit of packaging is one directory per skill containing a SKILL.md entrypoint with frontmatter for the framework mappings and a Markdown body holding the procedure. There is no runtime, no Python in the execution path, and no orchestration layer; the host agent loads a skill when its description matches the task. Because 818 entries is a lot of metadata for a model to sift, the practical architecture is directory-level selection - you copy the domains you need into the host's skills folder rather than installing everything everywhere. The MCP topic exists for skills whose procedure is only useful alongside a live tool.

## Ecosystem Position

This competes with the raw MITRE ATT&CK, D3FEND, ATLAS, and NIST publications it derives from, offering procedures instead of technique identifiers, and it overlaps with other open skill collections without importing their content. Compared with scanners such as Nuclei, Semgrep, or Trivy, which execute checks against live targets, every skill here is advisory text that describes a procedure an agent might follow by hand. It complements rather than replaces a detection platform, and sits next to the agent-harness doctrine in the sibling framework entries, which tell you when to run a procedure while this tells you what it is.

## Getting Started

Clone the library and copy the domain directories you need into the skills folder your agent reads, rather than installing all 818 skills at once.

```bash
git clone https://github.com/mukul975/Anthropic-Cybersecurity-Skills.git
cp -r Anthropic-Cybersecurity-Skills/<domain> ~/.claude/skills/
```

Verify the load path, then confirm the skill appears in your agent's skill list before relying on it during an investigation.

## Key Use Cases

1. Prime a hunting agent: load the memory forensics and Sigma detection domains so a triage question returns a concrete procedure instead of generic advice.
2. Draft a control mapping: pull the skills tagged to ATT&CK and CSF 2.0 for a given domain and turn their technique references into a coverage table.
3. Extend an LLM-security review: install the ATLAS and AI RMF tagged skills so agent-behavior risks get the same treatment as endpoint risks.

## Strengths

- Breadth that would take a team months to write: 818 procedures across 34 security domains.
- Type-aware framework mapping, so an AI-security skill is tagged ATLAS and AI RMF instead of inheriting a generic ATT&CK badge.
- Follows the agentskills.io standard, so one file loads across Claude Code, Copilot, Codex, Cursor, Gemini CLI, and others.
- Apache-2.0 licensed and community-maintained with an open contribution path.

## Limitations

Content quality is uneven across 818 entries reviewed by a small number of contributors, and there is no test suite that would catch a skill that reads well and prescribes the wrong procedure. A meaningful fraction of the library is offensive or dual-use - red-team command-and-control, phishing simulation, exploitation - which makes blanket installation into a general-purpose agent a real risk that you must curate by domain. The mappings are self-asserted metadata rather than third-party validated labels, and loading many skills at once is expensive in context even when only a few match the task.

## Relation to the Arsenal

This is a framework-phase knowledge package: the same slot as runnable harnesses, but supplying domain procedures instead of an execution loop. The harnesses that would load these skills live in the sibling content/projects/frameworks entries, the scanners and feeds the procedures call are retrieval-side concerns in content/projects/data-and-retrieval, and the token costs of loading skills are a serving-model question that content/projects/inference-engines addresses.

## Resources

- [Repository](https://github.com/mukul975/Anthropic-Cybersecurity-Skills)
- [Project site and skill index](https://mahipal.engineer/Anthropic-Cybersecurity-Skills/)
- [agentskills.io standard](https://agentskills.io)
