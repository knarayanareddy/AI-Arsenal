---
id: pyannote-pyannote-audio
name: "pyannote-audio"
version_tracked: null
artifact_type: framework
category: voice-audio
subcategory: frameworks
description: "Neural building blocks for speaker diarization: activity detection, change detection, and speaker embeddings"
github_url: "https://github.com/pyannote/pyannote-audio"
license: "MIT"
primary_language: Python
org_or_maintainer: "pyannote"
tags: [voice, research]
maturity: production
cost_model: open-source
github_stars: 10598
github_stars_last_30d: 0
trending_score: 32
last_commit: "2026-09-24"
docs_url: "https://www.pyannote.ai"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [audio]
relation_to_stack: [build-on-top, study-and-reference]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Speaker-diarization toolkit whose segmentation, embeddings, and clustering pipeline is the reference implementation behind most open diarization stacks."
best_for:
  - "You are transcribing meetings or calls and need to know who spoke when, not just what was said, for downstream attribution or analytics."
  - "You are building a diarization pipeline and want the standard segmentation-plus-embedding-plus-clustering components separately so you can swap or fine-tune each stage."
  - "You are working with overlapping speech and want the overlapped-speech-detection model alongside segmentation rather than a single monolithic system."
avoid_if:
  - "You need speaker identity recognition as a security control, since diarization labels speakers within one recording and is not a verification system."
  - "Your audio is very clean with two known speakers, where energy-based voice-activity gating plus channel assignment is far cheaper and more accurate."
  - "You need everything in one package with a managed pipeline and support, since this is a research codebase that expects you to assemble and configure the stages yourself."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (10598), MIT license, last commit 2026-09-24, Python as primary language and the topic list were API-verified. Powerset segmentation decoding, ECAPA embeddings, agglomerative clustering, gated Hub pipeline access, and the 3.1 versus 4.x split come from official docs and repo history; accuracy and real-time-factor caveats are engineering judgement, not measured here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/pyannote/pyannote-audio", "date": "2026-09-28", "description": "10,598 stars and last commit 2026-09-24 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

pyannote.audio provides pretrained and trainable components rather than only an end-to-end system. The segmentation model produces frame-level, class-wise activity scores for a set of classes, typically speech versus non-speech and optionally overlapped speech, and the pipeline applies powerset post-processing to convert those local scores into temporally consistent speaker-change segments. Speaker embedding models such as ECAPA-TDANN or ResNet-based variants map a variable-length speech turn to a fixed-dimensional vector trained with angular prototypical or cosine losses. Diarization is then the glue: a speaker-change detector segments the audio, embeddings are computed for each turn, agglomerative clustering with a cosine distance threshold groups the turns, and the labels are written back as segments. The library also provides voice-activity detection, overlap detection, and verification models, plus train recipes built on PyTorch Lightning with a documented dependency set, and it works with the Hugging Face Hub for model and pipeline downloads. Version 4 and the 3.1 line introduced the two-stage separation of segmentation and embeddings, which is the design most downstream tools adopted.

## Why it's in the Arsenal

The recurring decision is whether transcription alone is enough for your data. For single-speaker audio it is; for anything conversational it is not, because a transcript with no speaker attribution cannot support per-person analytics, evaluation, training data curation, or anything downstream that needs to know who said what. pyannote.audio resolves this at the component level rather than the product level: segmentation, embedding, and clustering are separate models you can train, tune, and swap, which is exactly the granularity a research team needs when clustering hyperparameters are the thing you are studying. That modularity is also why its designs show up in other diarization stacks — the segmentation-embedding-clustering triad is close to a community standard.

## Architecture

The classic pipeline has three stages. First, segmentation: a model — typically a permutation-invariant LSTM or a more recent backbone with a powerset output layer — consumes log-mel spectrogram frames and emits a posterior over a powerset of speaker-change and speech activity classes; a decoding step maps those frame-level powerset posteriors back to speaker-change timestamps, which is what produces the boundaries. Second, embeddings: each detected speech turn is extracted with a small padding margin, passed through an ECAPA-TDANN-style network using squeeze-excitation and multi-layer aggregation to produce an L2-normalised fixed-length vector. Third, clustering: the vectors are agglomeratively clustered with a cosine distance matrix and a threshold, where the threshold is the main knob trading over-segmentation against merging distinct speakers, and agglomerative clustering is chosen because it is deterministic and needs no cluster count. A modern variant of the same design replaces the fixed threshold with end-to-end neural clustering or powerset-based multi-speaker segmentation, which handles overlapping speech more directly. Training is a Lightning module with a weighted cross-entropy loss over the powerset classes, and the preprocessing is standard log-mel filtering with VAD-based voice filtering and optional overlap merging at the turn level.

## Ecosystem Position

pyannote.audio is the reference implementation that most commercial and open diarization stacks borrow from, and it competes with 3D-Speaker, WeSpeaker, and NVIDIA NeMo's diarization collection for the embedding and segmentation pieces. It overlaps with NeMo Speech on diarization specifically, where NeMo is the more production-integrated option and pyannote the more modular research one. Compared with an energy-plus-clustering baseline it is dramatically more accurate on real conversations and dramatically more expensive, and compared with its own end-to-end variant it is easier to debug because the stages are separable. It is not a transcription tool: faster-whisper and whisperx handle the words, and the two compose with this providing the who. Against speaker-verification systems it is a different problem — clustering within a recording rather than matching to an enrolled identity.

## Getting Started

Load the Hub pipeline and diarize a file:

```bash
pip install pyannote.audio
```

```python
import torch
from pyannote.audio import Pipeline

pipeline = Pipeline.from_pretrained(
    "pyannote/speaker-diarization-3.1",
    use_auth_token="<HF token>",
)
pipeline.to(torch.device("cuda"))

for turn, _, speaker in pipeline("meeting.wav"):
    print(f"{turn.start:.1f}s - {turn.end:.1f}s  {speaker}")
```

For a transcript, pass Whisper word timestamps to the library's diarize and assign_word_speakers utilities so you get who said what rather than only speaker intervals.

## Key Use Cases

1. Attributing a meeting or call transcript to speakers so analytics, evaluation, or training-data curation has per-person data.
2. Segmenting long multi-speaker recordings into speaker turns before fine-tuning a speech model or building a speaker-labelled corpus.
3. Studying diarization itself: swapping the clustering threshold, the embedding model, or the overlap handling, with each stage separately trainable.

## Strengths

- Modular by design: segmentation, embedding, and clustering are separate models you can train, tune, and replace independently.
- Pretrained Hugging Face pipelines give strong diarization accuracy without training, including overlapped-speech handling.
- ECAPA-style embedding models are the community default for turn-level speaker representation and are widely reused.
- The segmentation-embedding-clustering design is now close to the reference architecture for the whole field.
  

## Limitations

Most models require accepting a gated licence and authenticating with a Hugging Face token, so this is not a zero-friction install, and the terms need checking for commercial use. The clustering step is fundamentally a heuristic threshold on a distance matrix: it fails on similar voices, short turns, or heavy overlap, and there is no principled way to set that threshold for a new domain. It is also a real-time-factor problem — diarization is far slower than real time on CPU, so processing hours of audio is a GPU job. Version churn around the 3.x to 4.x transition changed the API meaningfully, so older tutorials and code often do not run. And despite being the reference, it is a research codebase: expect to read source rather than docs when something does not behave.

## Relation to the Arsenal

This is the diarization entry in content/projects/frameworks, and it pairs directly with the speech entries in content/projects/training-and-alignment: NeMo Speech offers a more integrated diarization path if you are already in that stack, while faster-whisper and whisperx supply the words this supplies the who for. The silero-vad entry in content/projects/inference-engines is the cheap voice-activity gate used to trim audio before either runs, which is a very common pipeline. Its segmentation output is also the input a speaker-attributed corpus needs, so the training entries downstream consume this. Where the domain is not speech, none of this applies and you want the vision or text models instead.

## Resources

- [pyannote.audio documentation](https://pyannote.audio)
- [pyannote.audio GitHub repository](https://github.com/pyannote/pyannote-audio)
- [pyannote diarization models on Hugging Face](https://huggingface.co/pyannote/speaker-diarization-3.1)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (10,598 stars, last commit 2026-09-24, license MIT, verified via GitHub API on 2026-09-28)*
