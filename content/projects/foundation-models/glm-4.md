---
id: glm-4
name: "GLM-4 / GLM-4.5"
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: "Zhipu AI's open-weights model family unifying reasoning, coding, and agentic capability, with MoE flagships and strong small dense variants"
github_url: "https://github.com/zai-org/GLM-4.5"
license: "MIT"
primary_language: Python
org_or_maintainer: "Zhipu AI (Z.ai)"
tags: [llm, agents, code-gen]
maturity: production
cost_model: open-source
github_stars: 4392
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-02-01"
docs_url: "https://docs.z.ai"
demo_url: null
paper_url: "https://arxiv.org/abs/2508.06471"
paper_id: null
phase: foundation-model
domain: [language, reasoning]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed, actively-maintained, research-origin]
ecosystem_role:
  - "The third pillar of China's open-weights frontier alongside DeepSeek and Qwen: GLM-4.5's ARC (agentic-reasoning-coding) focus and hybrid thinking/non-thinking modes made it a leading open choice for coding agents, with MIT licensing removing commercial friction."
best_for:
  - "You run coding-agent workloads on open weights — GLM-4.5 was trained explicitly for agentic coding and scores near the top of open models on agentic benchmarks, with native tool-calling in both thinking and instant modes"
  - "You want frontier-adjacent capability at moderate self-host cost — GLM-4.5-Air (106B total/12B active) delivers much of the flagship's capability at drastically lower serving requirements"
avoid_if:
  - "Your evaluation depends on English-ecosystem long-tail knowledge — Qwen/Llama lines sometimes edge GLM on Western-centric knowledge benchmarks; test on your distribution"
  - "You need the single best open reasoning model regardless of cost — DeepSeek-R1-class or larger thinking models may win on pure reasoning depth"
upstream_dependencies: []
downstream_consumers: []
alternatives: [deepseek-v3-r1, qwen-2-5, kimi-k2]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "Star count (4,392), primary language, license, and last commit (2026-02-01) verified via the GitHub API on 2026-07-08. Architecture and positioning claims are from official docs/README; not yet hands-on verified here."
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/zai-org/GLM-4.5", "date": "2026-07-08", "description": "4,392 stars on GitHub as of 2026-07-08 (GitHub API)"}]
featured: false
status: active
---

## Overview

Zhipu AI's GLM model family, whose GLM-4.5 generation unifies reasoning, coding, and agentic abilities in MoE architectures: the 355B-total/32B-active flagship and the 106B/12B Air variant, both offering hybrid thinking (deliberate reasoning) and non-thinking (instant) modes. MIT-licensed weights and an aggressive capability-per-dollar position made the family a staple in open coding-agent stacks.

## Why it's in the Arsenal

The third pillar of China's open-weights frontier alongside DeepSeek and Qwen: GLM-4.5's ARC (agentic-reasoning-coding) focus and hybrid thinking/non-thinking modes made it a leading open choice for coding agents, with MIT licensing removing commercial friction. It earns a place in the Arsenal because it directly addresses a recurring decision point: you run coding-agent workloads on open weights — GLM-4.5 was trained explicitly for agentic coding and scores near the top of open models on agentic benchmarks, with native tool-calling in both thinking and instant modes. See Strengths / Limitations below before adopting it.

## Architecture

MoE transformers with loss-free-balance routing and sigmoid gating, deeper-not-wider layout (more layers, fewer experts than DeepSeek-V3 at similar budgets) which Zhipu reports aids reasoning; QK-Norm stabilizes attention logits and a multi-token-prediction layer enables speculative decoding. Post-training uses expert-model iteration (reasoning, agent, chat experts distilled back) plus RL via the open slime framework.

## Ecosystem Position

Upstream: trained with Zhipu's open slime RL infrastructure; serving via vLLM/SGLang. Competing: DeepSeek V3.1/R1, Qwen3, Kimi K2 in the open-frontier tier. Complementary: hosted via Z.ai API and OpenRouter; the GLM coding plan is priced aggressively against Claude Code subscriptions, and the family (GLM-4.6 successor line) is a common default in open-weights coding agents like Cline forks.

## Getting Started

```bash
# Hosted (OpenAI-compatible):
curl https://api.z.ai/api/paas/v4/chat/completions -H 'Authorization: Bearer $ZAI_API_KEY' \
  -d '{"model":"glm-4.5-air","messages":[{"role":"user","content":"hello"}]}'
# Self-host: zai-org/GLM-4.5-Air weights from HF via vLLM/SGLang
```

## Key Use Cases

1. **Scenario**: you run coding-agent workloads on open weights — GLM-4.5 was trained explicitly for agentic coding and scores near the top of open models on agentic benchmarks, with native tool-calling in both thinking and instant modes
2. **Scenario**: you want frontier-adjacent capability at moderate self-host cost — GLM-4.5-Air (106B total/12B active) delivers much of the flagship's capability at drastically lower serving requirements

## Strengths

- You run coding-agent workloads on open weights — GLM-4.5 was trained explicitly for agentic coding and scores near the top of open models on agentic benchmarks, with native tool-calling in both thinking and instant modes
- You want frontier-adjacent capability at moderate self-host cost — GLM-4.5-Air (106B total/12B active) delivers much of the flagship's capability at drastically lower serving requirements

## Limitations

- Your evaluation depends on English-ecosystem long-tail knowledge — Qwen/Llama lines sometimes edge GLM on Western-centric knowledge benchmarks; test on your distribution
- You need the single best open reasoning model regardless of cost — DeepSeek-R1-class or larger thinking models may win on pure reasoning depth

## Relation to the Arsenal

This is a foundation-model entry: it documents model weights, architecture, and generational position. For hosted/managed access paths to models, see [tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://github.com/zai-org/GLM-4.5)
- [Documentation](https://docs.z.ai)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (4,392 stars, last commit 2026-02-01, verified via GitHub API on 2026-07-08)*
