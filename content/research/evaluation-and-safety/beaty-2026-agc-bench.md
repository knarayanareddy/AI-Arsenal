---
id: beaty-2026-agc-bench
title: "AGC-Bench: Measuring Artificial General Creativity"
phase: evaluation-and-safety
venue: arxiv-preprint
year: 2026
authors:
  - Roger Beaty
  - Vijeta Deshpande
  - Clin K. Y. Lai
  - Anna Attuch
  - Namrata Shivagunde
  - Swastik Roy
  - Rajkumar Pujari
  - Paul V. DiStefano
  - Sherin Muckatira
  - Claire E. Stevenson
  - Mikhail Gronas
  - Anna Rumshisky
arxiv_id: "2607.01152"
arxiv_url: "https://arxiv.org/abs/2607.01152"
pdf_url: "https://arxiv.org/pdf/2607.01152"
code_url: null
venue_url: null
practical_applicability: medium
reproduction_status: not-reproduced
result_status: current
has_code: false
tldr: "An 78-dataset creativity benchmark paired with AGC-Judge, an open-weight judge calibrated to remove leniency bias."
key_contribution: "Judge bias is corrected psychometrically rather than ignored, which is the difference between a usable creative ranking and a self-fulfilling one."
tags:
  - benchmark
  - evaluation
added_date: '2026-09-28'
last_reviewed: '2026-09-28'
added_by: maintainer
enrichment_status: draft
---

## Overview

AGC-Bench measures artificial general creativity across 78 datasets spanning brainstorming, problem solving, STEM, narrative, figurative language and humour. Its construction came from a systematic review of the AI-creativity literature: 3,101 papers were screened and 497 benchmarks identified before selection. Two methodological pieces matter more than the dataset itself. The first is an agentic harness that converts idiosyncratic third-party benchmark codebases into HELM-standardised benchmark form, which is what makes heterogeneous creative tasks comparable at all. The second is judge calibration: the authors apply Judge Response Theory, a psychometric treatment of judge leniency and severity, to correct LLM-as-judge ratings, and then fine-tune Qwen3-30B on the bias-corrected ratings of three frontier LLMs to produce AGC-Judge, an open-weight judge reported to score new creativity benchmarks it was not trained on. Three findings are reported: a single creativity factor c recovered by factor analysis across 83 LLMs explains 81.5% of variance and is related to but separable from general knowledge and reasoning; instructing a model to be creative improves scores far more than enabling reasoning; and on a human-matched subset the strongest human still leads the strongest LLM.

## Why it's in the Arsenal

Creativity research has argued for decades about whether the construct is domain-specific and whether it is separable from general intelligence, and both arguments became testable the moment LLMs arrived. The obstacle was measurement, not theory. Creative benchmarks are individually idiosyncratic, and the obvious shortcut, an LLM judge, carries a well-known leniency and severity bias that silently reorders the leaderboard. AGC-Bench attacks both problems: an agentic harness standardises the tasks, and Judge Response Theory plus AGC-Judge removes the judge bias that would otherwise make the numbers meaningless. The recurring decision it resolves is whether a creative model's score is a property of the model or an artefact of how generously the judge graded it.

## Core Contribution

- Judge bias is corrected psychometrically rather than ignored, which is the difference between a usable creative ranking and a self-fulfilling one.
- A systematic literature review underwrites the dataset selection, so coverage is argued rather than assembled by convenience.
- An agentic harness standardises 78 heterogeneous codebases into one comparable form, which no single prior benchmark did.
- Factor analysis across 83 models turns a scoreboard into a construct-validity claim about what creativity measures in LLMs.

## Key Results

1. Model selection for ideation work: rank candidates on a creativity factor rather than on a general reasoning leaderboard.
2. Judge calibration: borrow the Judge Response Theory correction and the open-weight AGC-Judge for any pipeline where LLM-as-judge rankings drive a decision.
3. Construct validity research: test whether the single creativity factor c holds up on your own model set, as the paper's factor analysis invites.

## Methodology

The pipeline has four layers. A systematic literature review produced a candidate pool of 497 benchmarks from 3,101 screened papers, from which 78 datasets spanning six creative domains form the first release. An agentic harness then inspects each upstream codebase and rewrites it into HELM-standardised form, which is what allows prompts, scoring and adapters to be held constant across tasks that were never designed to be compared. Judging runs through a psychometric calibration step: Judge Response Theory models judge leniency and severity so raw ratings can be de-biased, and those corrected ratings from three frontier LLMs become supervised training data for AGC-Judge, a fine-tune of Qwen3-30B intended to generalise to benchmarks outside its training set. On top of the scores, factor analysis across 83 LLMs tests dimensionality, yielding a single creativity factor c and a measurement of how much variance it explains.

## Practical Applicability

There is no pip package; the release is a benchmark, a leaderboard, a judge checkpoint and human data. Start from the arXiv record and follow the project links for the harness and the AGC-Judge weights.

```bash
curl -L -o agc-bench.pdf https://arxiv.org/pdf/2607.01152
```

```python
# AGC-Judge is a fine-tune of Qwen3-30B: load it and score generations
from transformers import AutoModelForCausalLM, AutoTokenizer

judge = AutoModelForCausalLM.from_pretrained("<AGC-Judge checkpoint>", device_map="auto")
tok = AutoTokenizer.from_pretrained("<AGC-Judge checkpoint>")
score = judge.generate(**tok(prompt, return_tensors="pt").to(judge.device))
```

Plan for the fact that 78 datasets means 78 upstream codebases to standardise, so a first run is an integration exercise before it is an evaluation.

## Limitations & Critiques

This is an unreviewed preprint read from its abstract: the arXiv metadata was verified through the API and the substantive claims come from the abstract, with no independent reproduction of the scores, the factor structure or the judge. A 30B-parameter judge is a real operational cost, and a judge that inherits bias from three frontier models it was fine-tuned on may simply relocate the bias rather than remove it. Coverage stops at 78 datasets and six domains, so conclusions about figurative language or humour rest on a narrow slice of each, and the human comparison covers only a matched subset. The single-factor result explaining 81.5% of variance is a strong claim that would benefit from replication on a disjoint model population, and the reported ordering of writing above scientific ideation is exactly the kind of finding that a judge calibration choice can produce.

## Reproductions & Follow-up Work

The catalog records no third-party reproduction of AGC-Bench: Measuring Artificial General Creativity (arXiv:2607.01152). The reported numbers are author-reported: they have not been rerun on an independent implementation, so treat the effect sizes as a claim awaiting confirmation rather than an established result. A replication would need the same task set, the same scoring script, and a model family comparable to the one the authors evaluated.


## Relation to the Arsenal

This sits in content/research/evaluation-and-safety with the other measurement papers in this batch, and it is the creativity instrument where most of the others are domain or capability instruments. It depends on the open-weight models catalogued in content/projects/foundation-models, since Qwen3-30B is both the base for the judge and one of the 83 scored systems. The judge-calibration idea is directly usable from the harness tooling in content/projects/benchmarks-and-evals, and the HELM-standardised format connects it to the general benchmark practice discussed under content/research/sota-benchmarks. It touches no infrastructure in content/projects/inference-engines beyond the ordinary cost of hosting a 30B judge.

## Resources

- [arXiv abstract page](https://arxiv.org/abs/2607.01152)
- [PDF](https://arxiv.org/pdf/2607.01152)
