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
docs_url: "https://docs.z.ai/guides/overview/quick-start"
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

The case for GLM-4 / GLM-4.5 rests on its documentation and observed adoption rather than on a controlled comparison here, so the sections below state what it claims to do and what adopting it would commit you to.

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

1. **Running it in anger**: the first real evaluation of GLM-4 / GLM-4.5 is your own traffic, not the documentation's example; instrument latency, error rate and quality on a representative slice of data before the choice is load-bearing.
2. **What dominates the decision**: `coding-agent`, `workloads`, `open`, `weights` are the variables that actually move the outcome for GLM-4 / GLM-4.5 in this phase, and none of them appear in a feature comparison.
3. **Choosing between candidates**: compare GLM-4 / GLM-4.5 against `deepseek-v3-r1`, `qwen-2-5`, `kimi-k2` on the same task with the same data, and record which you would abandon first — that decision, not the feature list, is what this entry should inform.

## Strengths

- Beyond the headline description, GLM-4 / GLM-4.5's architecture section is the honest source: moE transformers with loss-free-balance routing and sigmoid gating, deeper-not-wider layout (more layers, fewer experts than DeepSeek-V3 at similar budgets) which Zhipu reports aids reasoning; QK-Norm stabilizes attention logits and a multi-token-prediction layer enables speculative decoding. Post-training uses expert-model iteration (reasoning, agent, chat experts distilled back) plus RL via the open slime framework.
- It is a foundation-model entry in this catalog, so the comparison that matters is against the other foundation-model projects rather than against projects in adjacent phases.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- The cost this entry cannot quantify for you is operational: the GLM-4 / GLM-4.5 footprint at your data volume, the failure modes of its dependencies, and who is on call when it degrades.
- Documentation describes intended behaviour, not observed behaviour: latency, memory and failure rates for GLM-4 / GLM-4.5 at your scale need measuring before this informs a production decision.
- Where GLM-4 / GLM-4.5 overlaps `deepseek-v3-r1`, `qwen-2-5`, `kimi-k2`, the overlap is real and choosing between them on feature lists alone is the mistake; the deciding axis is usually operational.

## Relation to the Arsenal

As a foundation-model entry this documents GLM-4.5's open weights and MoE architecture, not serving. Its Air variant (106B total/12B active) is the practical self-host target; for hosted access see Z.ai's API and the model-layer entries under [tools/model-layer/](../../tools/model-layer/_index.md).

## Resources

- [GitHub](https://github.com/zai-org/GLM-4.5)
- [Documentation](https://docs.z.ai/guides/overview/quick-start)

---
*Last reviewed: 2026-07-08 by @maintainer — enrichment_status: draft (4,392 stars, last commit 2026-02-01, verified via GitHub API on 2026-07-08)*
