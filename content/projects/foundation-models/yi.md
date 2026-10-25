---
id: yi
name: Yi
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: 01.AI open model family with bilingual and long-context variants from small to mid-large sizes
github_url: "https://github.com/01-ai/Yi"
license: Apache-2.0
primary_language: Other
org_or_maintainer: null
tags: [llm, inference, local, multimodal]
maturity: production
cost_model: open-source
github_stars: 7834
github_stars_last_30d: 0
trending_score: 30
last_commit: "2024-11-27"
docs_url: "https://github.com/01-ai/Yi"
demo_url: null
paper_url: null
paper_id: null
hf_url: "https://huggingface.co/01-ai"
model_sizes: [6B, 9B, 34B]
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
phase: foundation-model
domain: [language]
relation_to_stack: [study-and-reference]
health_signals: [community-driven]
ecosystem_role:
  - 01.AI's open-weight model family from the 2023-2024 open-model wave
best_for:
  - You're doing comparative research across open-weight models from the 2023-2024 generation and need Yi as a reference point
  - You need a bilingual (English/Chinese) dense model and have already validated Yi meets your specific quality bar versus more actively maintained alternatives
avoid_if:
  - You need active vendor support or frequent updates — GitHub issue activity on 01-ai/Yi shows sparse, community-only engagement in 2026 with no clear maintainer response pattern, and 01.AI's public focus has shifted toward newer, less-established projects
  - You want a model with strong current-generation benchmark performance — Yi has been substantially outpaced by Qwen, Llama 3/4, and Gemma on most public leaderboards since its 2023-2024 release
upstream_dependencies: []
downstream_consumers: []
alternatives: [qwen, llama-3, gemma]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: "01.AI shows no maintainer activity on 01-ai/Yi since 2024-11-27, so the family is frozen; newer work moved to other 01.AI projects. Re-checked 2026-10-24 against the GitHub API: 7,834 stars, last push 2024-11-27, no archived flag."
added_date: "2026-06-13"
last_reviewed: "2026-10-24"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: []
featured: false
status: watching
---

## Overview

Yi is 01.AI's family of open-weight, decoder-only large language models released during the 2023-2024 open-model wave, published under Apache-2.0 in 6B, 9B, and 34B dense parameter sizes with weights hosted on Hugging Face under the `01-ai` org. The family targets bilingual English/Chinese use and shipped extended long-context variants. As of the last review the `01-ai/Yi` GitHub repository shows only sparse, community-authored activity, so the Arsenal tracks Yi primarily as a 2023-2024 reference point rather than an actively evolving model.

## Why it's in the Arsenal

Yi is worth keeping as a fixed comparison point: it was one of the stronger bilingual open-weight releases of its generation, so a documented, Apache-2.0 reference checkpoint makes it easier to judge how far newer families have moved. It is included here for comparative research, not as a current production default — see Strengths / Limitations before adopting it.

## Architecture

Yi ships as dense, decoder-only Transformer checkpoints in 6B, 9B, and 34B sizes that load through the standard Hugging Face `transformers` stack, so no bespoke runtime is required. The models are trained for bilingual English/Chinese coverage and were released with long-context variants. The released checkpoints are unquantized — there is no official AWQ/GPTQ/GGUF build — so serving the 34B size means either fitting roughly 68GB of bf16 weights or quantizing it yourself with bitsandbytes or llama.cpp, which works because the architecture is a stock Llama-style decoder.

## Ecosystem Position

Within the open-weight LLM landscape Yi sits alongside other 2023-2024 releases such as Llama 2/3, Qwen, and Mistral as a general-purpose bilingual option, but it has since been outpaced: this entry's own frontmatter notes Qwen, Llama 3/4, and Gemma lead it on most public leaderboards. Today it occupies a narrow niche — a reference checkpoint for comparative research rather than a default production model — and, unlike actively maintained families, it receives little upstream maintenance.

## Getting Started

```bash
pip install transformers accelerate
```

```python
from transformers import pipeline

# Yi publishes bilingual EN/ZH checkpoints under the 01-ai org (see Resources).
generate = pipeline("text-generation", model="01-ai/Yi-6B")
print(generate("用一句话解释检索增强生成（RAG）。", max_new_tokens=64)[0]["generated_text"])
```

## Key Use Cases

1. **A frozen bilingual baseline**: reproducing a 2023-2024 English/Chinese result where Yi is the original checkpoint and changing the model would change the comparison.
2. **Cheap Chinese-language prototyping on one GPU**: Yi-6B or Yi-9B in bf16 fits a 24GB card and runs through stock `transformers`, which is enough for prompt iteration before committing to a current-generation model.
3. **Long-context experiments (200K variants)**: the `Yi-6B-200K`/`Yi-34B-200K` checkpoints are a documented long-context baseline, useful when you need a second model to sanity-check a context-extension result against.

## Strengths

- Bilingual coverage was the differentiator at release: Yi was trained on a roughly 3:1 English-to-Chinese corpus and reports Chinese benchmark results that were competitive with much larger models of its generation.
- Three sizes plus 200K-context variants, all as stock Hugging Face checkpoints — no custom runtime, and quantizable with the usual tooling.
- Apache-2.0 weights, which is why it spread into Chinese-language fine-tunes and derivative models even after upstream development slowed.

## Limitations

- The family is frozen: the last commit is 2024-11-27 and 01.AI's public effort moved to newer lines, so there are no fixes, no safety updates, and no new sizes coming.
- Its benchmark position has decayed. Qwen2.5/3, Llama 3/4 and Gemma 2/3 all outperform Yi at comparable or smaller sizes, so choosing it for quality today is a mistake.
- The 200K variants degrade on long-context retrieval well before their advertised window, and the tokenizer's Chinese-heavy vocabulary makes English-only workloads pay extra tokens.

## Relation to the Arsenal

As a foundation-model entry this documents Yi's weights and positioning, not how to serve it. To run the 6B/9B/34B checkpoints you pair them with an inference/serving stack — see [content/tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md) and [content/tools/model-layer/](../../tools/model-layer/_index.md); because the weights are unquantized, a quantization-capable runtime is worth evaluating for the 34B size.

## Resources

- [GitHub](https://github.com/01-ai/Yi)
- [Documentation](https://github.com/01-ai/Yi)
