---
id: attarde-2026-k9-bench
title: "K9-Bench: Evaluating Multimodal LLMs on Canine-Centric Videos"
phase: evaluation-and-safety
venue: arxiv-preprint
year: 2026
authors:
  - Khush Attarde
  - Yusuf Ali
  - Megha Thukral
  - Divye Bhutani
  - Thomas Ploetz
  - Zsolt Kira
arxiv_id: "2607.02680"
arxiv_url: "https://arxiv.org/abs/2607.02680"
pdf_url: "https://arxiv.org/pdf/2607.02680"
code_url: null
venue_url: null
practical_applicability: medium
reproduction_status: not-reproduced
result_status: current
has_code: false
tldr: "A 5,000-pair question set over 907 home dog videos, built to test long-horizon reasoning about canine actions and interactions."
key_contribution: "Roughly 5,000 curated pairs over 907 real videos, which is large enough for a per-category breakdown rather than a single noisy score."
tags:
  - evaluation
  - multimodal
  - benchmark
  - research
  - memory
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
enrichment_status: draft
---

## Overview

K9-Bench is an evaluation dataset for multimodal large language models built from roughly 5,000 question-answer pairs over 907 real domestic dog videos, organised into five task categories. The questions are written to require fine-grained, multi-hop reasoning about canine actions and about temporally extended interaction sequences, which is what separates it from single-frame pet-image classification sets. Construction is automated: a scalable pipeline powered by VLM and LLM calls mines canine-centric video from the web and curates question-answer pairs over the mined clips, and the authors describe bias-mitigation steps intended to remove the biases that VLM curation introduces. The headline empirical result is negative. Frontier multimodal models show limited zero-shot ability on these tasks, with closed-source systems ahead of open-source counterparts but still struggling on compositional reasoning over subtle posture and interaction cues spread across long horizons. Generic chain-of-thought prompting adds only modest gains, and the project page sits at ogmenrobotics.github.io/K9Bench.

## Why it's in the Arsenal

There is a gap between what multimodal benchmarks measure and what household deployments would need. A model that can caption a dog correctly in one frame has not demonstrated that it can tell whether an animal is limping across a two-minute clip, whether two dogs are playing or fighting, or whether a sequence of posture changes signals distress. Those are compositional, long-horizon judgements over subtle cues, and they are exactly the kind of thing a robot companion or a vet-tech triage tool would hinge on. The paper's contribution is to make the gap measurable rather than anecdotal, and its dataset-construction pipeline is separately reusable for other low-data domains where labelled video does not exist.

## Core Contribution

- Roughly 5,000 curated pairs over 907 real videos, which is large enough for a per-category breakdown rather than a single noisy score.
- Questions require multi-hop reasoning across interaction sequences, so the benchmark is not satisfiable by single-frame recognition.
- The finding is negative and specific, which is more useful for planning than another leaderboard where everything scores high.
- The construction pipeline is documented as reusable, extending the paper's value beyond canine content.

## Key Results

1. Multimodal model selection for animal-facing or veterinary-adjacent products, using long-horizon canine questions as a hard filter.
2. Measuring long-video reasoning generally: the temporal-spread design transfers as a template to other subjects with subtle state.
3. Reusing the curation pipeline: apply the same web-mining, VLM-curation and bias-mitigation sequence to a different low-data video domain.

## Methodology

The benchmark is data plus a categorised question set, with no training component and no model changes. The construction pipeline has four stages: web mining for canine-centric video, VLM and LLM-assisted generation of question-answer pairs that require multi-hop reasoning over actions and interaction sequences, a curation pass that filters the generated pairs, and a bias-mitigation stage that targets the assumptions the VLM curators introduced. Evaluation then reports model accuracy per task category across the five categories, comparing closed-source and open-source multimodal systems and testing whether chain-of-thought prompting improves long-horizon reasoning. The authors position the pipeline itself as a reusable artefact: a general-purpose dataset construction method that can be pointed at a different low-data domain for quantitative analysis, with the caveat that a domain transferred this way inherits whatever biases the mining and curation steps introduce there.

## Practical Applicability

There is no code to install for scoring; the artefact is the dataset and the paper. Start from the arXiv record and the project page, then obtain the video and question data from the authors' release.

```bash
# fetch the preprint
curl -L -o k9-bench.pdf https://arxiv.org/pdf/2607.02680
```

```python
# treat the released pairs as an ordinary eval set for your own harness
for item in dataset:
    answer = model.generate(item.video, item.question)
    score(exact_match(answer, item.answer))
```

A 907-video corpus will need a host that can hold the media locally, and any reproduction should state the exact system-prompt and chain-of-thought setting, since the paper's own claim is that CoT helps only modestly.

## Limitations & Critiques

This is a preprint and a single-source result: the arXiv metadata was taken from the arXiv API and the content here reflects the abstract, not the full experimental section or any independent reproduction. The dataset is generated by a VLM and LLM curation pipeline, so label quality inherits whatever the curating models assumed about dog behaviour, and the bias-mitigation step is described only at a high level in the abstract. Roughly 907 videos is small by the standards of general video benchmarks, and the videos are mined from the web, so distribution shift to professionally shot or multi-dog-instruction footage is likely. The abstract reports no confidence intervals, no cost accounting for the pipeline, and no detail on which specific models were tested or under what decoding settings, so the comparison between closed and open models cannot be checked from the summary alone.

## Reproductions & Follow-up Work

The catalog records no third-party reproduction of K9-Bench: Evaluating Multimodal LLMs on Canine-Centric Videos (arXiv:2607.02680). The reported numbers are author-reported: they have not been rerun on an independent implementation, so treat the effect sizes as a claim awaiting confirmation rather than an established result. A replication would need the same task set, the same scoring script, and a model family comparable to the one the authors evaluated.


## Relation to the Arsenal

This entry belongs in content/research/evaluation-and-safety, alongside the other measurement papers in this batch, and it is the domain-narrow counterpart to the general capability benchmarks catalogued in content/research/sota-benchmarks. Its dataset sits downstream of the video and multimodal model entries in content/projects/foundation-models, which are what you would be scoring. The scoring harness it needs is the tooling in content/projects/benchmarks-and-evals, and the reusable curation pattern connects to the dataset and ingestion entries in content/projects/data-and-retrieval. Nothing here touches serving or inference cost; it tells you whether a model should be trusted, not how fast it runs.

## Resources

- [arXiv abstract page](https://arxiv.org/abs/2607.02680)
- [PDF](https://arxiv.org/pdf/2607.02680)
- [Project page](https://ogmenrobotics.github.io/K9Bench)
