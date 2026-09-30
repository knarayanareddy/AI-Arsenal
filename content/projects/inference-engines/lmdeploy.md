---
id: lmdeploy
name: LMDeploy
version_tracked: null
artifact_type: platform
category: llms
subcategory: inference-engines
description: Toolkit for compressing, deploying, and serving LLMs with TurboMind and PyTorch backends
github_url: "https://github.com/InternLM/lmdeploy"
license: Apache-2.0
primary_language: Python
org_or_maintainer: null
tags: [llm, inference, quantization, cloud]
maturity: production
cost_model: open-source
github_stars: 7895
github_stars_last_30d: 0
trending_score: 30
last_commit: "2026-06-11"
docs_url: "https://lmdeploy.readthedocs.io/en/latest/"
demo_url: null
paper_url: null
paper_id: null
hf_url: null
model_sizes: []
benchmark_scores: []
supports_quantization: true
supported_formats: [HF, AWQ, W4A16]
api_compatible: openai
phase: inference-engine
domain: [language, vision]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed, actively-maintained]
ecosystem_role:
  - InternLM's (Shanghai AI Lab) inference and serving toolkit, with particular strength serving InternLM and other Chinese-origin open-weight models
best_for:
  - You're deploying InternLM models specifically and want the toolkit built and optimized by the same organization
  - You need a serving toolkit with strong quantization support (AWQ, W4A16) integrated directly into the deployment pipeline
avoid_if:
  - You need the largest community and broadest model-family support — vLLM and SGLang have substantially larger adoption and community integration coverage across model families
  - You want the most actively-innovating serving engine for cutting-edge model architectures — LMDeploy's development pace and community size are smaller than vLLM/SGLang's
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Limited independent third-party production evidence found beyond the project's own documentation and its association with InternLM's model releases; architecture claims are based on the public repository structure.
added_date: "2026-06-13"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: active
---

## Overview

An inference and serving toolkit from Shanghai AI Laboratory (InternLM's developing organization), providing optimized deployment for InternLM and other open-weight model families with a particular focus on quantization.

## Why it's in the Arsenal

LMDeploy is catalogued here on the strength of its own documentation and public record, not on independent measurement — treat the claims below as what the project states about itself until you have run it.

## Architecture

Provides both a Python inference engine and a serving component with support for continuous batching, tensor parallelism, and quantization formats (AWQ, W4A16) targeting efficient multi-GPU deployment.

## Ecosystem Position

Upstream: none of particular note. Downstream: none of particular note. Competing: vLLM, SGLang, TGI (in maintenance mode) — LMDeploy occupies a similar niche with a smaller community than the two leading options. Complementary: primarily used to serve InternLM models, though it supports other open-weight families.

## Getting Started

```bash
# See the project's official documentation (Resources below) for the
# canonical install/run command for this specific inference engine.
```

## Key Use Cases

1. **Sizing LMDeploy**: the decision is hardware and load, not features — measure throughput and time to first token at your concurrency, and size memory for the longest sequence you actually serve rather than the longest the model allows.
2. **What dominates the decision**: `deploying`, `internlm`, `models`, `specifically` are the variables that actually move the outcome for LMDeploy in this phase, and none of them appear in a feature comparison.
3. **Before committing**: pick the criterion that would make you abandon this choice, write it down, and check it against a representative slice of your own data — a catalog entry can tell you what is claimed, only a run tells you what is true.

## Strengths

- Beyond the headline description, LMDeploy's architecture section is the honest source: provides both a Python inference engine and a serving component with support for continuous batching, tensor parallelism, and quantization formats (AWQ, W4A16) targeting efficient multi-GPU deployment.
- Sits in the inference-engine phase alongside the alternatives named in its Ecosystem Position section; cross-phase comparison is usually a category error rather than a useful alternative.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- The cost this entry cannot quantify for you is operational: the LMDeploy footprint at your data volume, the failure modes of its dependencies, and who is on call when it degrades.
- Nothing in this entry substitutes for running LMDeploy against your own data; the specifics that decide adoption — your corpus, your latency budget, your ops capacity — are not represented here.
- No alternative is catalogued alongside LMDeploy here, so the entry cannot tell you what it is better than; treat that absence as a gap in the comparison rather than as a verdict.

## Relation to the Arsenal

LMDeploy is the TurboMind runtime from the InternLM group, and it sits in content/projects/inference-engines between the general-purpose schedulers and the single-machine runtimes. Where vllm and sglang compete on continuous-batching throughput for a serving fleet, LMDeploy's pitch is the PyTorch-native path with a tuned small-model deployment profile, which makes it the entry to read when your workload is many small models on a fixed GPU budget rather than a few large ones with long prompts.

## Resources

- [GitHub](https://github.com/InternLM/lmdeploy)
- [Documentation](https://lmdeploy.readthedocs.io/en/latest/)
