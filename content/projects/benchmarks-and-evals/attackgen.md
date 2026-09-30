---
id: attackgen
name: attackgen
version_tracked: null
artifact_type: library
category: evaluation
subcategory: evaluation
description: "Generates tailored incident-response exercise scenarios from threat-actor profiles and MITRE ATT&CK or ATLAS technique sets"
github_url: "https://github.com/mrwadams/attackgen"
license: GPL-3.0
primary_language: Python
tags: [security, community-favorite]
maturity: beta
cost_model: open-source
github_stars: 1246
github_stars_last_30d: 0
trending_score: 0
last_commit: "2026-09-28"
docs_url: "https://attack.mitre.org/"
demo_url: null
phase: benchmark-and-eval
domain: [general-purpose]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained]
ecosystem_role:
  - "Turns a threat-actor selection into a facilitator-ready exercise with injects, success criteria, and rules of engagement."
best_for:
  - "You are planning a tabletop and need a scenario grounded in a named threat actor's actual technique usage rather than a generic exercise."
  - "You are testing an AI system's resilience and want an insider-threat scenario shaped by deployment autonomy level, STRIDE threats, and a threat model."
  - "You are a facilitator who needs injects, metrics, artefacts, and rules of engagement in one downloadable Markdown file."
avoid_if:
  - "You are running live detection engineering, because this produces exercises and documents rather than executing against your estate."
  - "You need an air-gapped deployment, since generation depends on a hosted model endpoint."
  - "You are a team that must keep exercise data inside your boundary, because threat-actor context and your organisational profile are sent to the provider."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: stars 1246, GPL-3.0, Python, last commit 2026-09-28, topics. From README: ATT&CK Enterprise/ICS/ATLAS, LiteLLM routing, provider list, v0.17 features, AI Insider Threat mode and its cited threat model, Docker, LangSmith, MCP server. Generation quality not exercised."
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

AttackGen takes a chosen threat-actor group or an ATLAS case study, plus your organisation's size and industry, and produces a full incident-response scenario. You can also start from a hand-picked set of ATT&CK or ATLAS techniques or from templates covering common incident types including AI/ML attack patterns. It supports the Enterprise, ICS, and ATLAS frameworks, shows the technique list behind the chosen actor so a facilitator can sanity-check it, and ships a newer AI Insider Threat mode where a frontier agent inside your organisation behaves as the insider, shaped by the agent's deployment archetype, threat category, STRIDE category, and an optional free-text seed. A chat Assistant can revise a generated scenario and apply refinements to the download, results persist per page across reruns, and there is a mandatory Setup sidebar that keeps Generate disabled until every requirement is satisfied.

## Why it's in the Arsenal

The recurring decision is where to spend the limited hours of an exercise: on realistic adversary behaviour or on workshop mechanics. Hand-written scenarios are usually generic and get solved from memory by experienced attendees, which wastes the session. Grounding generation in a real actor's technique list removes that escape hatch, and the guarded setup flow plus persisted inputs fix the other common failure, where a facilitator spends the first twenty minutes re-entering their organisation's profile and losing the generated result by navigating away.

## Architecture

A Streamlit front end drives a LangChain-based generation path where every provider - OpenAI, Anthropic, Google AI, Mistral, Groq, or any OpenAI-compatible endpoint such as Ollama, LM Studio, Azure OpenAI, or OpenRouter - is routed through LiteLLM behind a single internal wrapper, so adding a model is described as a one-line change. Credentials live in a .env file rather than the UI. The scenario document itself is assembled in sections: a compact summary with navigation for long scenarios, plus injects, success criteria, metrics, artefacts, and rules of engagement. Docker images are published for deployment, LangSmith integration is optional for tracing model calls, and an MCP server plus Agent Skills packaging extend the tool to agentic clients.

## Ecosystem Position

AttackGen overlaps with MITRE's own ATT&CK and ATLAS data, consuming those technique libraries rather than replacing them, and competes with manual scenario writing done in Confluence or with commercial exercise platforms such as ThreatInject or Prelude. Compared with a purple-team orchestration tool like MITRE Caldera or VECTR, AttackGen produces a document a human facilitates rather than executing adversary commands against live systems, which is a meaningfully different cost and risk profile. It is an alternative to paying a consultant to author an exercise, and it complements content/projects/data-and-retrieval, where the ATT&CK technique corpus would otherwise live behind its own retrieval stack. Its model-routing design follows the same LiteLLM pattern seen across content/projects/frameworks entries, and the provider abstraction keeps it independent of any particular entry in content/projects/inference-engines.

## Getting Started

Clone the repository, install dependencies, put a provider API key in .env, load the ATT&CK and ATLAS data, then run the Streamlit app.

```bash
git clone https://github.com/mrwadams/attackgen.git
cd attackgen
pip install -r requirements.txt
cp .env.example .env   # then add your provider API key
streamlit run app/attackgen_app.py
```

The app refuses to enable Generate until the Setup sidebar reports every requirement satisfied.

## Key Use Cases

1. Run a realistic tabletop: pick a threat actor, supply industry and headcount, and get a scenario whose techniques actually match that group's tradecraft.
2. Test AI-system exposure: generate an insider-threat exercise in which a deployed agent misbehaves at a chosen autonomy level against specified STRIDE threats.
3. Rehearse ICS or AI-specific incidents: generate against ATT&CK ICS or ATLAS rather than the default Enterprise matrix, then download the scenario for offline facilitation.

## Strengths

- Scenarios are anchored to real threat-actor technique usage, which makes them harder to dismiss as unrealistic.
- LiteLLM routing means any OpenAI-compatible endpoint works, including a local Ollama or LM Studio instance for sensitive exercises.
- The AI Insider Threat mode encodes a published frontier-agent threat model rather than inventing one.
- Persisted per-page results and an always-present Setup sidebar remove two facilitator time sinks that plague browser-based generators.

## Limitations

Generated scenarios inherit the model's quality: an LLM will produce plausible but occasionally technically wrong attack chains, and there is no technical validator checking that a proposed technique sequence would actually work. Everything is GPL-3.0, so linking it into a proprietary toolchain carries copyleft obligations. Exercise content and your organisation's profile travel to whichever provider you configure, which matters for regulated environments even when you point at a self-hosted model. The tool produces documents, so you still need a facilitator, a room, and participants; it does not deliver the exercise itself.

## Relation to the Arsenal

This benchmark-and-eval-phase entry measures readiness rather than model quality - it generates the scenario against which you test detection and response. The agentic access paths it exposes, an MCP server and Agent Skills, connect to content/projects/frameworks runtimes, the threat-actor and technique corpus resembles data assembled by content/projects/data-and-retrieval, and provider routing through LiteLLM is the same abstraction used when selecting a serving stack in content/projects/inference-engines.

## Resources

- [Repository](https://github.com/mrwadams/attackgen)
- [MITRE ATLAS framework](https://atlas.mitre.org/)
- [MITRE ATT&CK Enterprise](https://attack.mitre.org/)
