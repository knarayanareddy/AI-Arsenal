---
id: whisperx
name: WhisperX
version_tracked: null
artifact_type: library
category: voice-audio
subcategory: libraries
description: Whisper transcription with accurate word-level timestamps (forced phoneme alignment) and speaker diarization, at 70x-realtime batched throughput
github_url: "https://github.com/m-bain/whisperX"
license: BSD-2-Clause
primary_language: Python
org_or_maintainer: m-bain
tags: [voice, inference, data]
maturity: production
cost_model: open-source
github_stars: 22968
github_stars_last_30d: 0
trending_score: 55
last_commit: "2026-06-26"
docs_url: "https://github.com/m-bain/whisperX#readme"
demo_url: null
paper_url: "https://arxiv.org/abs/2303.00747"
paper_id: null
phase: inference-engine
domain: [audio]
relation_to_stack: [build-on-top, deploy-as-is]
health_signals: [research-origin, community-driven, production-proven]
ecosystem_role:
  - "The standard answer to Whisper's two biggest production gaps — imprecise timestamps and no speaker attribution: forced alignment with a phoneme model fixes word timing, pyannote integration adds who-spoke-when, VAD-based chunking enables 70x-realtime batching"
best_for:
  - You need word-accurate timestamps — subtitles, video editing, audio search, training-data alignment — where Whisper's native segment timestamps (often off by seconds) are unusable
  - "You need diarized transcripts (meetings, interviews, calls) from one pipeline: transcription + alignment + speaker labels in a single pass"
avoid_if:
  - You only need plain transcripts — faster-whisper alone is simpler and avoids the alignment/diarization model downloads and pyannote's gated-model setup
  - You need streaming/low-latency output — WhisperX is a batch pipeline; its VAD-chunked design assumes you have the whole file
upstream_dependencies: [faster-whisper]
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
enrichment_notes: Stars (22.9k), BSD-2-Clause, and active maintenance (last push 2026-06-26) verified via the GitHub API on 2026-07-08. The 70x-realtime figure and alignment accuracy are from the WhisperX paper (arXiv:2303.00747, INTERSPEECH 2023) using large-v2 with batching; diarization quality depends on the pyannote model version and is not re-measured here.
added_date: "2026-07-08"
last_reviewed: "2026-07-08"
added_by: maintainer
reviewed_by: maintainer
buzz_sources:
  - {"source":"github-trending","url":"https://github.com/m-bain/whisperX","date":"2026-07-08","description":"22.9k stars, research-origin (INTERSPEECH 2023), actively maintained"}
featured: false
status: active
---

## Overview

WhisperX layers three missing capabilities onto Whisper: VAD-based cut-and-merge chunking that enables large-batch inference (70× realtime with large-v2), forced alignment against a phoneme recognition model (wav2vec2) that corrects Whisper's notoriously drifty timestamps to word-level accuracy, and pyannote-based speaker diarization that assigns speaker labels per word. Research-origin (INTERSPEECH 2023), it became the default pipeline for "transcript with accurate timing and speakers."

## Why it's in the Arsenal

Whisper's raw output fails two production requirements immediately: timestamps are unreliable (utterance-level, prone to multi-second drift) and there's no speaker attribution. WhisperX is the established open-source fix for both by mechanism — forced phoneme alignment rather than trusting the decoder's timing, external diarization rather than hoping — and effectively completes the open speech stack on top of `faster-whisper`.

## Architecture

Pipeline: Silero/pyannote VAD segments speech → segments batched through faster-whisper for transcription (batching is safe because VAD boundaries prevent cross-talk between windows) → each segment force-aligned against a language-specific wav2vec2 phoneme model yielding per-word start/end times → optional pyannote diarization assigns speaker labels merged onto aligned words.

## Ecosystem Position

Upstream: `faster-whisper` (transcription engine), wav2vec2 alignment models, pyannote (diarization — gated HF models requiring token acceptance). Competing: hosted STT APIs with diarization (Deepgram, AssemblyAI) on the buy side; NeMo-based diarization stacks for teams already on NVIDIA tooling.

## Getting Started

```python
import whisperx

model = whisperx.load_model("large-v2", "cuda", compute_type="float16")
audio = whisperx.load_audio("audio.mp3")
result = model.transcribe(audio, batch_size=16)
align_model, meta = whisperx.load_align_model(result["language"], "cuda")
result = whisperx.align(result["segments"], align_model, meta, audio, "cuda")
```

## Key Use Cases

1. **Scenario**: subtitle/caption generation and audio search indexes where word-level timing accuracy is the product requirement
2. **Scenario**: meeting/interview/call transcription with speaker attribution — one pipeline instead of stitching transcription and diarization systems yourself

## Strengths

- Fixes Whisper timing by mechanism (forced phoneme alignment), not post-hoc heuristics — word-level accuracy validated in the accompanying paper
- Complete pipeline economics: VAD-batching makes it *faster* than plain Whisper while adding alignment and diarization

## Limitations

- Diarization depends on pyannote's gated models (HF token + terms acceptance) and remains the pipeline's weakest link on overlapping speech and short turns
- Alignment requires a per-language phoneme model — coverage is good for major languages, thinner elsewhere; numbers/currency get dropped from alignment when the phoneme model can't represent them

## Relation to the Arsenal

The alignment/diarization layer on top of `faster-whisper` in the open speech stack; its research pedigree links to the evaluation practices for speech pipelines discussed in observability/, and its output feeds the data-ingestion side of voice RAG builds.

## Resources

- [GitHub](https://github.com/m-bain/whisperX)
- [Paper](https://arxiv.org/abs/2303.00747)
