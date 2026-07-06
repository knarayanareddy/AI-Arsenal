---
id: rgb
title: "RGB"
entry_type: benchmark
category: retrieval-rag
modality: [text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "Robustness of LLMs under retrieval-augmented generation — noise robustness, negative rejection, information integration, and counterfactual robustness, in English and Chinese."
metrics:
  - name: "accuracy"
    direction: higher
    notes: "Per-ability accuracy over the four RGB testbeds"
  - name: "rejection_rate"
    direction: higher
    notes: "Negative-rejection ability (abstain when evidence is absent)"
protocol:
  dataset: "RGB (Chen et al., 2024)"
  dataset_url: "https://github.com/chen700564/RGB"
  evaluation_setup: "LLM answers questions given retrieved passages. Standard script: `python evalue.py --dataset en --modelname chatgpt --noise_rate 0.6 --passage_num 5`. Four abilities are scored separately; English (en) and Chinese (zh) subsets exist."
  version: null
leaderboards:
  - name: "RGB — GitHub (Chen et al.)"
    url: "https://github.com/chen700564/RGB"
    last_checked: "2026-07-06"
  - name: "RGB — arXiv:2312.10336"
    url: "https://arxiv.org/abs/2312.10336"
    last_checked: "2026-07-06"
known_issues:
  - "English and Chinese only — no multilingual coverage beyond those two; results may not transfer to other languages"
  - "Answer is derived from a fixed small retrieved context (default 5 passages) — robustness depends heavily on the retriever and noise_rate, which must be stated"
  - "Negative-rejection and counterfactual testbeds mix generation and reasoning; a low score can reflect model priors, not just RAG behavior"
  - "Benchmarks a narrow slice of RAG failure modes (4 abilities); it does not measure faithfulness, citation quality, or end-to-end answer usefulness"
  - "Released in 2023 with a fixed corpus — contamination/aging risk grows as models are tuned on it; re-verify before quoting"
recommended_usage:
  - "Use to stress-test RAG robustness (noise, rejection, integration, counterfactual), not as a general QA score"
  - "Always report all four abilities separately and state noise_rate / passage_num / language"
  - "Pair with an end-to-end RAG eval (e.g. RAGAS) — RGB isolates robustness, not answer quality"
  - "Re-check the live repository before citing any 'SOTA' — it has no single maintained leaderboard"
last_reviewed: "2026-07-06"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: [beir]
enrichment_status: reviewed
enrichment_notes: "Live-verified 2026-07-06 via the official RGB GitHub repo and the primary paper (arXiv:2312.10336). Protocol-variant, language-coverage, and aging/robustness-slice notes emphasized per expansion-PR policy."
tags: [evaluation, retrieval, rag, benchmark]
---

## Overview

RGB (Retrieval-Augmented Generation Benchmark) is a targeted stress test for LLMs under RAG, probing four abilities that production RAG systems need: noise robustness, negative rejection, information integration, and counterfactual robustness. It ships English and Chinese subsets and a fixed evaluation script that injects controlled noise into retrieved passages.

## What it Measures (and what it doesn’t)

Measures: how well an LLM extracts correct answers from noisy/conflicting retrieved context, abstains when evidence is missing, integrates multiple documents, and resists counterfactual misinformation.

Does not measure: end-to-end answer faithfulness, citation quality, latency/cost, or general QA accuracy outside the four robustness abilities.

## Dataset & Protocol

- **Dataset:** RGB — English + Chinese subsets, four ability testbeds
- **Dataset URL:** https://github.com/chen700564/RGB
- **Evaluation setup:** `python evalue.py --dataset en --modelname chatgpt --noise_rate 0.6 --passage_num 5`; four abilities scored separately
- **Version:** –

## Metrics

- **accuracy** — higher is better — per-ability accuracy over the four RGB testbeds
- **rejection_rate** — higher is better — negative-rejection ability (abstain when evidence is absent)

## How to Run

```bash
git clone https://github.com/chen700564/RGB
cd RGB
python evalue.py --dataset en --modelname chatgpt --noise_rate 0.6 --passage_num 5
```

## Known Issues, Leakage & Gaming Risks

- English + Chinese only — no other multilingual coverage
- Robustness depends on retriever quality and noise_rate — must be stated
- Negative-rejection/counterfactual mix generation + reasoning — low scores may reflect priors
- Narrow slice (4 abilities) — no faithfulness/citation/answer-usefulness signal
- Fixed 2023 corpus — contamination/aging risk grows over time

## How to Interpret Scores

- Report all four abilities separately; an aggregate hides where the model breaks
- State noise_rate, passage_num, and language — results shift sharply with these
- High noise-robustness accuracy does not imply strength on rejection/integration/counterfactual
- RGB measures robustness, not answer quality — pair with an end-to-end RAG eval

**SOTA-safe wording – mandatory if mentioning leading models:**

> As of **2026-07-06**, the **RGB benchmark** (protocol: **English subset, 5 passages, noise_rate 0.6, accuracy**) shows that even strong LLMs such as **GPT-4 and ChatGPT** stay robust to retrieval noise yet score markedly lower on negative rejection, information integration, and counterfactual robustness — the original study reported these three as the weakest abilities across all six tested models. This is a **behavioral snapshot**, not a stable ranking.

## Recommended Usage

- Stress-test RAG robustness (noise, rejection, integration, counterfactual)
- Report all four abilities separately; state noise_rate / passage_num / language
- Pair with an end-to-end RAG eval (e.g. RAGAS)
- Re-check the live repository before citing any 'SOTA'

## Related Benchmarks

- [BEIR](./beir.md) — zero-shot retrieval generalization (complements RGB's generation-side robustness view)

## Relation to the Arsenal

Retrieval / RAG evaluation benchmark. Complements RAG projects in `content/projects/data-and-retrieval/`, RAG tips in `content/tips-and-tricks/rag-and-retrieval/`, and evaluation tooling.

## Resources

- [Dataset – GitHub (chen700564/RGB)](https://github.com/chen700564/RGB)
- [Paper – Chen et al., "Benchmarking Large Language Models in Retrieval-Augmented Generation", arXiv:2312.10336](https://arxiv.org/abs/2312.10336)

---

*Last reviewed: 2026-07-06 by @maintainer*
