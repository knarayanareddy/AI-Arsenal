---
id: kimi-k2
name: "Kimi K2"
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: "Moonshot AI's trillion-parameter open-weights MoE model optimized for agentic tool use and coding, with 32B active parameters"
github_url: "https://github.com/MoonshotAI/Kimi-K2"
license: "Modified-MIT"
primary_language: Python
org_or_maintainer: "Moonshot AI"
tags: [llm, agents, code-gen]
maturity: production
cost_model: open-source
github_stars: 10889
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-01-21"
docs_url: "https://platform.kimi.ai/docs/overview"
demo_url: null
paper_url: null
paper_id: null
phase: foundation-model
domain: [language, reasoning]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed, actively-maintained]
ecosystem_role:
  - "The open-weights model that made 'agentic-first' a training target rather than a fine-tune: a 1T-parameter MoE (32B active) trained with the MuonClip optimizer and large-scale synthetic tool-use data, competing with closed frontier models on coding and agentic benchmarks."
best_for:
  - "You run agentic/coding workloads on self-hosted or provider-hosted open weights — K2 was purpose-trained for multi-step tool use and tops open-model agentic benchmarks (SWE-bench Verified, Tau2)"
  - "You need frontier-adjacent capability with weight access for customization — the modified-MIT license permits commercial use with an attribution condition at very large scale"
avoid_if:
  - "You self-host on modest infrastructure — serving a 1T MoE (even at 32B active) requires multi-GPU node configurations beyond most teams; use hosted providers instead"
  - "You need strong multimodal input — K2's headline strengths are text, code, and tool use; vision-language options elsewhere fit image-heavy workloads better"
upstream_dependencies: []
downstream_consumers: []
alternatives: [deepseek-v3-r1, qwen-2-5]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (10,889), primary language, license, and last commit (2026-01-21) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/MoonshotAI/Kimi-K2", "date": "2026-07-08", "description": "10,889 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

Moonshot AI's open-weights mixture-of-experts model: 1 trillion total parameters with 32B activated per token, trained on 15.5T tokens using the MuonClip optimizer to eliminate training instability at scale. K2's distinguishing bet is agentic-intelligence-first training — large-scale synthetic tool-use trajectories and joint RL — which shows up in its coding-agent and tool-calling benchmark leadership among open models at release.

## Why it's in the Arsenal

Kimi K2 appears in this catalog as a reference point for the foundation-model phase; the useful question is what hosting and licence terms it commits you to beyond the weights themselves. The sections below state what it claims to do and what adopting it would commit you to.

## Architecture

A DeepSeek-V3-lineage MoE architecture (384 experts, 8 active plus one shared, MLA attention) at 1T scale; MuonClip's qk-clip mechanism stabilized the Muon optimizer for the full 15.5T-token run with reported zero loss spikes. Post-training combines supervised agentic-trajectory data synthesized across thousands of tools with a joint RL stage using verifiable rewards plus a self-critique rubric reward.

## Ecosystem Position

Upstream: DeepSeek-architecture lineage, vLLM/SGLang/TensorRT-LLM for serving. Competing: DeepSeek V3/R1, Qwen3 (open weights); GPT/Claude-class models on agentic work. Complementary: hosted access via Moonshot's platform and OpenRouter-class aggregators; the K2 Thinking variant extends the line into interleaved reasoning+tool-use. Kimi-inspired training details (MuonClip) influenced subsequent open-model training practice.

## Getting Started

```bash
# Hosted (OpenAI-compatible):
curl <moonshot-api-endpoint>/v1/chat/completions -H 'Authorization: Bearer $MOONSHOT_API_KEY' \
  -d '{"model":"kimi-k2-0905-preview","messages":[{"role":"user","content":"hello"}]}'
# Self-host: deploy the HF weights (moonshotai/Kimi-K2-Instruct) with vLLM or SGLang on a multi-GPU node
```

## Key Use Cases

1. **Taking the dependency**: the weights for Kimi K2 are the small part — the commitment is context behaviour, licensing and hosting, and those three decide whether the checkpoint is usable in your product at all.
2. **What to measure first**: `agentic`, `coding`, `workloads`, `self-hosted` decide whether Kimi K2 works for you; measure them on your own data because the published numbers are conditioned on someone else's setup.
3. **Choosing between candidates**: compare Kimi K2 against `deepseek-v3-r1`, `qwen-2-5` on the same task with the same data, and record which you would abandon first — that decision, not the feature list, is what this entry should inform.

## Strengths

- The implementation detail worth checking before adopting Kimi K2 is specific — a DeepSeek-V3-lineage MoE architecture (384 experts, 8 active plus one shared, MLA attention) at 1T scale; MuonClip's qk-clip mechanism stabilized the Muon optimizer for the full 15.5T-token run with reported zero loss spikes. Post-training combines supervised agentic-trajectory data synthesized across thousands of tools with a joint RL stage using verifiable rewards plus a self-critique rubric reward — because that is where the capability claim either survives contact with your data or does not.
- It is a foundation-model entry in this catalog, so the comparison that matters is against the other foundation-model projects rather than against projects in adjacent phases.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- The cost this entry cannot quantify for you is operational: the Kimi K2 footprint at your data volume, the failure modes of its dependencies, and who is on call when it degrades.
- Nothing in this entry substitutes for running Kimi K2 against your own data; the specifics that decide adoption — your corpus, your latency budget, your ops capacity — are not represented here.
- Where Kimi K2 overlaps `deepseek-v3-r1`, `qwen-2-5`, the overlap is real and choosing between them on feature lists alone is the mistake; the deciding axis is usually operational.

## Relation to the Arsenal

As a foundation-model entry this documents Kimi K2's open weights and agentic-first training, not serving. The 1T MoE needs a multi-GPU node to self-host; for hosted access see Moonshot's platform and the model-layer entries under [tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://github.com/MoonshotAI/Kimi-K2)
- [Documentation](https://platform.kimi.ai/docs/overview)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (10,889 stars, last commit 2026-01-21, verified via GitHub API on 2026-07-08)*
