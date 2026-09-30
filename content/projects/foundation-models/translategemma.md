---
id: translategemma
name: TranslateGemma
version_tracked: null
artifact_type: model
category: llms
subcategory: open-source-models
description: Open translation model family built on Gemma 3 supporting 55 languages efficiently
github_url: "https://github.com/google-deepmind/gemma"
license: Apache-2.0
primary_language: Python
org_or_maintainer: null
tags: [multimodal, llm]
maturity: production
cost_model: open-source
github_stars: 5000
github_stars_last_30d: 0
trending_score: 50
last_commit: "2026-06-13"
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: foundation-model
domain: [language]
relation_to_stack: [deploy-as-is, build-on-top]
health_signals: [org-backed]
ecosystem_role:
  - Specialized translation fine-tune built on the Gemma 3 base architecture
best_for:
  - You need an efficient, open-weight machine translation model specifically fine-tuned for 55 languages rather than a general-purpose chat model repurposed for translation
  - You want a translation model that inherits Gemma 3's efficient long-context architecture for translating longer documents
avoid_if:
  - You need general-purpose chat/reasoning capability alongside translation — this is a narrowly specialized derivative, not a general model; use the base Gemma 3 or Gemma 4 for broader tasks
  - You need enterprise translation quality guarantees or the widest language coverage — compare against Cohere's Command A Translate (23 languages, enterprise-positioned) or dedicated commercial translation APIs depending on your quality/language-coverage requirements
upstream_dependencies: []
downstream_consumers: []
alternatives: [gemma-3]
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Limited independent third-party coverage found beyond the model's own description; architecture claims (built on Gemma 3, 55-language support) are consistent with Google's Gemma 3 technical report lineage but the translation-specific fine-tuning details have not been independently verified against a technical report or paper.
added_date: "2026-06-14"
last_reviewed: "2026-07-01"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"newsletter","url":"https://toolradar.com/featured/techpresso","date":"2026-06-14","description":"Featured in Techpresso under open-source-models"}
featured: false
status: active
---

## Overview

TranslateGemma is an open-weight machine-translation model family built by fine-tuning Google DeepMind's Gemma 3 base for translation across 55 languages, distributed under Apache-2.0 through the `google-deepmind/gemma` project. Rather than a general chat model, it is a task-specialized derivative that inherits Gemma 3's efficient, long-context decoder architecture, which lets it translate longer documents in a single pass instead of chunking them.

## Why it's in the Arsenal

TranslateGemma earns an entry because it represents a specific, increasingly common design choice: shipping a narrow, open-weight translation model rather than repurposing a general chat model for the job. For teams weighing open translation options against commercial APIs, it is a concrete, Apache-2.0 data point — see Strengths / Limitations before adopting it.

## Architecture

Architecturally TranslateGemma is a supervised translation fine-tune of the Gemma 3 decoder rather than a new base model, so it reuses Gemma 3's tokenizer, parameter shapes, and efficient long-context attention and loads through the same Hugging Face `transformers`/Gemma tooling. Its distinguishing layer is translation-specific training spanning 55 languages; per this entry's notes, those fine-tuning details track Google's Gemma 3 lineage but have not been independently verified against a technical report.

## Ecosystem Position

TranslateGemma occupies the narrow, task-specialized slot in the Gemma ecosystem: it sits below the general-purpose Gemma 3/Gemma 4 base models (use those for chat or reasoning) and competes with dedicated translation systems rather than general LLMs. This entry's frontmatter contrasts it with Cohere's Command A Translate (23 languages, enterprise-positioned) and commercial translation APIs — TranslateGemma trades breadth of quality guarantees for open weights and broader 55-language coverage.

## Getting Started

```bash
pip install transformers accelerate
```

```python
from transformers import pipeline

# Point at the TranslateGemma checkpoint from the Gemma project (see Resources).
translate = pipeline("text-generation", model="<gemma-org>/translategemma-<size>")
print(translate("Translate English to French: 'Retrieval-augmented generation grounds answers in sources.'", max_new_tokens=128)[0]["generated_text"])
```

## Key Use Cases

1. **Depending on it safely**: the work is the boundary — which calls go through TranslateGemma, what happens when it is slow, and what your system does instead, since those three answers determine whether adopting it is cheap or expensive.
2. **What to measure first**: `efficient`, `open-weight`, `machine`, `translation` decide whether TranslateGemma works for you; measure them on your own data because the published numbers are conditioned on someone else's setup.
3. **Choosing between candidates**: compare TranslateGemma against `gemma-3` on the same task with the same data, and record which you would abandon first — that decision, not the feature list, is what this entry should inform.

## Strengths

- The implementation detail worth checking before adopting TranslateGemma is specific — architecturally TranslateGemma is a supervised translation fine-tune of the Gemma 3 decoder rather than a new base model, so it reuses Gemma 3's tokenizer, parameter shapes, and efficient long-context attention and loads through the same Hugging Face transformers/Gemma tooling. Its distinguishing layer is translation-specific training spanning 55 languages; per this entry's notes, those fine-tuning details track Google's Gemma 3 lineage but have not been independently verified against a technical report — because that is where the capability claim either survives contact with your data or does not.
- It is a foundation-model entry in this catalog, so the comparison that matters is against the other foundation-model projects rather than against projects in adjacent phases.
- Maturity is recorded as production, so the interface is treated as stable enough to build against — which still says nothing about behaviour at your load, and that is the gap to measure.

## Limitations

- Adoption risk for TranslateGemma is mostly operational rather than technical — resource cost at your scale, dependency failure behaviour, and the upgrade path when interfaces move.
- The claims here come from the project's own documentation and public record, not from independent measurement on your workload; benchmark numbers in particular are point-in-time and harness-dependent.
- Where TranslateGemma overlaps `gemma-3`, the overlap is real and choosing between them on feature lists alone is the mistake; the deciding axis is usually operational.

## Relation to the Arsenal

As a foundation-model entry this covers TranslateGemma's weights and lineage, not serving. To deploy it for batch or streaming translation you pair it with an inference/serving stack — see [content/tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md) and [content/tools/model-layer/](../../tools/model-layer/_index.md); because it shares Gemma 3's runtime shape, existing Gemma serving paths apply.

## Resources

- [GitHub](https://github.com/google-deepmind/gemma)
- [Documentation](https://github.com/google-deepmind/gemma)
