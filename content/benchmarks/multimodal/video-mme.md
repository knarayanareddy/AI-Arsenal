---
id: video-mme
title: "Video-MME"
entry_type: benchmark
category: multimodal
modality: [vision, audio, text]
status: active
protocol_confidence: well-specified
score_interpretation: higher-is-better
what_it_measures: "How well a multimodal LLM understands video — across short, medium, and long clips — using questions that require temporal reasoning, not just reading a single frame, with subtitles and audio optionally available."
metrics:
  - name: "accuracy"
    direction: higher
    notes: "Multiple-choice accuracy over ~2,700 QA pairs; reported by video-duration bucket (short/medium/long) and with vs. without subtitles"
protocol:
  dataset: "Video-MME (900 videos, 6 domains, durations from seconds to ~1 hour; ~2,700 expert-annotated multiple-choice questions)"
  dataset_url: "https://video-mme.github.io/"
  evaluation_setup: "Answer multiple-choice questions about each video; models sample frames (and optionally subtitles/audio) up to their context budget. Accuracy reported per duration bucket and per with/without-subtitle condition."
  version: "2024 release"
leaderboards:
  - name: "Video-MME leaderboard"
    url: "https://video-mme.github.io/"
    last_checked: "2026-07-08"
known_issues:
  - "Frame-sampling density is a confound — scores depend heavily on how many frames a model can ingest, not only its reasoning"
  - "Multiple-choice format allows elimination strategies and can overstate genuine understanding"
  - "Subtitle condition can let text-strong models shortcut visual reasoning"
  - "Long-video results are sensitive to context length; comparisons must fix the sampling protocol"
recommended_usage:
  - "Report the frame-sampling and subtitle settings — Video-MME numbers are not comparable without them"
  - "Focus on the long-video bucket to distinguish real temporal understanding from single-frame captioning"
  - "Compare with/without subtitles to see how much a model leans on text vs. vision"
  - "Pair with an image benchmark (MMMU/MMBench) to separate video-specific ability from general multimodal skill"
last_reviewed: "2026-07-08"
reference_paper: null
benchmark_suite_project: null
harness_tools: []
related_benchmarks: ["mmmu", "mmbench", "seed-bench"]
enrichment_status: draft
enrichment_notes: "Authored from the Video-MME paper (arXiv:2405.21075) and video-mme.github.io leaderboard; URLs verified 2026-07-08."
tags: [evaluation, multimodal, benchmark, llm]
---

## Overview

Video-MME (2024) is a comprehensive evaluation of video understanding for multimodal LLMs. Its 900 videos span six domains and a wide range of durations — from seconds to roughly an hour — with ~2,700 expert-annotated multiple-choice questions that demand temporal reasoning across frames rather than reading one image. It explicitly reports results by video length and with/without subtitles, exposing how models degrade as videos get longer and how much they rely on text.

## What it Measures (and what it doesn’t)

Measures temporal, multi-frame video comprehension — recognizing events, ordering, and reasoning over time, optionally aided by subtitles and audio.

Does not measure: fine-grained pixel/spatial grounding, open-ended video generation or captioning quality, or performance under a fixed real-time frame budget (each model samples frames differently).

## Dataset & Protocol

- **Dataset:** 900 videos, 6 domains, durations from seconds to ~1 hour; ~2,700 multiple-choice questions
- **Dataset URL:** https://video-mme.github.io/
- **Evaluation setup:** multiple-choice accuracy, reported per duration bucket and per subtitle condition; models sample frames up to their budget
- **Version:** 2024 release

## Metrics

- **accuracy** — higher is better — multiple-choice correctness, sliced by duration and subtitle availability

## How to Run

```bash
# obtain the dataset per the site's instructions
# for each video: sample frames (+ optional subtitles), answer the MCQs
# score accuracy per duration bucket and subtitle condition
```

## Known Issues, Leakage & Gaming Risks

- Frame-sampling density strongly influences scores — a confound with reasoning ability
- Multiple-choice enables elimination heuristics
- Subtitle condition lets text-strong models bypass visual reasoning
- Long-video numbers depend on context length; fix the protocol before comparing

## How to Interpret Scores

- Always read the with/without-subtitle split: as of **2026-07-08**, many models gain substantially from subtitles, revealing reliance on text over vision.
- The long-video bucket is the discriminative one — short-clip accuracy saturates while long-video comprehension lags.
- Two models are only comparable at equal frame-sampling budgets; a higher score can simply mean more frames ingested.

## Recommended Usage

- Report frame-sampling and subtitle settings with every score
- Emphasize the long-video bucket for temporal-reasoning claims
- Use the subtitle ablation to gauge vision-vs-text reliance
- Pair with image benchmarks to isolate video-specific ability

## Related Benchmarks

- [MMMU](./mmmu.md) — expert-level multimodal (image) reasoning
- [MMBench](./mmbench.md) — broad multimodal capability probing
- [SEED-Bench](./seed-bench.md) — generative multimodal comprehension incl. temporal items

## Relation to the Arsenal

Video-understanding benchmark in the multimodal category; informs model selection for the multimodal and computer-vision projects and tools in the Arsenal.

## Resources

- [Video-MME leaderboard](https://video-mme.github.io/)
- [Video-MME paper — Fu et al., 2024](https://arxiv.org/abs/2405.21075)
