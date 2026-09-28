---
id: deezer-spleeter
name: "spleeter"
version_tracked: null
artifact_type: model
category: voice-audio
subcategory: models
description: "MIT-licensed TensorFlow library with pretrained models that split a music mix into vocals, drums, bass, and accompaniment"
github_url: "https://github.com/deezer/spleeter"
license: "MIT"
primary_language: Python
org_or_maintainer: "deezer"
tags: [voice, pytorch]
maturity: beta
cost_model: open-source
github_stars: 28477
github_stars_last_30d: 0
trending_score: 32
last_commit: "2026-06-18"
docs_url: "https://research.deezer.com/projects/spleeter.html"
demo_url: null
paper_url: null
paper_id: null
phase: foundation-model
domain: [audio]
relation_to_stack: [build-on-top, study-and-reference]
health_signals: [community-driven]
ecosystem_role:
  - "Music source-separation model family that splits a mix into vocals, drums, bass, and accompaniment with pretrained checkpoints and a short training recipe."
best_for:
  - "You have commercial recordings and need karaoke or practice stems, and the source is already a stereo mix rather than the individual tracks."
  - "You are building a dataset for a music analysis model and need vocals isolated from a large catalog of mixed audio before training."
  - "You need a short, readable training recipe for a source-separation model on your own data, since the repository includes the training script alongside the checkpoints."
avoid_if:
  - "You need sample-accurate, artifact-free stems from a professional session, because a model reconstructing sources from a mix introduces bleed and phase artifacts that a mixing engineer will not accept."
  - "You need to separate many more than four stems or handle classes the checkpoints do not cover, since the released models are trained on a fixed small set of source groups."
  - "You need real-time or low-latency separation, because the network is a full offline spectral model with a forward pass over the whole signal rather than an online algorithm."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "API-verified: 28477 stars, MIT license, Python primary language, last commit 2026-06-18, 9 GitHub topics including audio-processing, pretrained-models, tensorflow. The 2/4/5-stem configurations, mask-normalized U-Net, and waveform loss are from the README and paper; no audio was separated in this session."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/deezer/spleeter", "date": "2026-09-28", "description": "28,477 stars and last commit 2026-06-18 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

Spleeter is a source-separation library from Deezer built on TensorFlow, with pretrained checkpoints that take a stereo mix and produce separated stems. The released models cover the common decomposition - two stems for vocals and accompaniment, four stems for vocals, drums, bass, and other, and five stems adding piano - and the separation is done in the time-frequency domain: a spectrogram is computed, a neural network predicts a soft mask per source for each time-frequency bin, and the masked spectrograms are inverted back to waveforms. The masks come from a network with a U-Net-like encoder-decoder operating on magnitude spectrograms, trained with a waveform-consistency objective so the separation loss is applied in the time domain rather than only on the spectrogram. A command-line tool and a small Python API both take a file or a folder and write stems, and the training script for adapting the model to a new source set is included.

## Why it's in the Arsenal

The recurring decision Spleeter resolves is that a mixed recording is a locked box. Getting isolated vocal or instrumental tracks for karaoke, remixing, or dataset construction normally means a stem-separation service or a plugin, and for many applications a good-enough model beats a paid service on cost and privacy. Since the network runs on a spectrogram and its output is a soft mask, the same checkpoint handles arbitrary signal length and resamples the mask to the original frame rate, which is why one file works for a 30-second clip and a 70-minute mix. It also stays useful as a research starting point: the architecture is small, the training script is short, and a new source class is a matter of changing the mask count and supplying data, which is not true of heavier systems. The limits are equally clear, and a mixing engineer is the person to ask about them.

## Architecture

Input audio is decoded to stereo, resampled, and split into overlapping frames, each transformed by a short-time Fourier transform into a complex spectrogram, from which the model takes magnitude and the mixture phase is retained. The separator network is a U-shaped convolutional encoder-decoder - stacked strided convolutions reducing the time-frequency resolution with parallel residual-style blocks, then transposed convolutions upsampling back to full resolution - whose output is a soft mask per source, passed through a nonlinearity and normalized so the masks over sources sum to one, which constrains the decomposition to be a partition of the mixture. The mask is applied to the mixture spectrogram, and the resulting per-source spectrograms are inverted with the original phase by an inverse short-time Fourier transform and resynthesized with overlap-add, which is why the output stays time-aligned with the input. The loss is computed on the reconstructed waveforms, comparing each estimated source to the ground-truth stem, rather than on the spectrogram, so the objective penalizes time-domain artifacts. Training uses stft loss parameters for the transform, the same architecture with the mask count set to the number of sources, and a data pipeline that generates random mixtures from isolated source stems with gains. Inference runs the same graph at batch level, and the released checkpoints are the four- and five-stem configurations most users want.

## Ecosystem Position

Spleeter competes with dedicated stem-separation products and with the source-separation models in the Demucs family, and compared with those it is the more conservative choice: smaller model, fixed source set, released checkpoints that just work, at some quality cost. It is an alternative to a paid separation API for offline batch work, and rather than a music generator it is a decomposition tool, so the audio synthesis entries in the Arsenal are the reverse direction. It overlaps with the speech entries in the Arsenal's audio and voice surface only in that both are learned signal transforms, and the speech toolchain is where you go for transcription rather than separation. Inside the Arsenal it sits at the ingestion edge: separated vocals are a common preprocessing step for lyric alignment, speaker or singer analysis, and music-retrieval datasets, which is where the data-and-retrieval entries come in. Compared with the classical machine-learning entry in this batch, this is a neural signal model with a fixed label set rather than a general estimator.

## Getting Started

Install the package and separate a stereo file into its stems:

```bash
python3 -m pip install spleeter
spleeter separate -p spleeter:4stems \
  -o output/ \
  -c audio.mp3
```

That writes vocals.wav, drums.wav, bass.wav, and other.wav; use `spleeter:2stems` for vocals and accompaniment only, and pass a directory to process a whole batch.

## Key Use Cases

1. Producing karaoke and practice stems from finished stereo mixes, where the accompaniment track is derived by subtraction rather than by a second recording.
2. Isolating vocals across a large catalog to build a dataset for lyric alignment, singer analysis, or music retrieval.
3. Adapting separation to a new source set, where changing the mask count and supplying matched stems is enough to retrain the same architecture.

## Strengths

- One command produces a usable multi-stem separation from a stereo mix, with released checkpoints so there is no training step to get started.
- Waveform-level loss, so the objective penalizes audible reconstruction artifacts rather than only spectral error.
- Works on arbitrary signal length because the network is applied to masked spectrograms with overlap-add resynthesis.
- MIT licensed with a short, readable architecture and a training script, which makes it a practical base for a new source set.

## Limitations

Reconstruction from a mix is lossy in a way a real session is not: bleed, phase artifacts, and room ambience leak between stems, and a professional mix engineer will hear them, so this is a utility and a dataset tool rather than a mastering path. The released source sets are fixed - the common four and five groups - and separating anything outside them means retraining, which is a data project. The model is small and comparatively old, and quality lags the best available separation models on difficult material. There is bleed in the other direction too: vocals that are heavily processed, heavily reverbed, or in a dense mix are the hardest cases and the ones where the output is least usable. Runtime cost is real - the full forward pass over the mixture is several times the length of the audio on modest hardware - and there is no streaming or real-time path, so a large catalog is a batch scheduling decision. Finally, TensorFlow 1-era artifacts and dependencies mean the environment is not current.

## Relation to the Arsenal

The audio-decomposition entry in the Arsenal's foundation-model phase, upstream of any music or audio analysis built on isolated stems. The speech toolchain in the Arsenal's voice and audio surface is the adjacent entry and covers the opposite direction - getting text from audio rather than sources from a mix - and the general training framework in this batch is the substrate its TensorFlow implementation runs inside. The classical and neural training entries in this batch are the algorithm comparison for anyone considering a different separation model. Downstream, separated vocals feed the retrieval and dataset work in content/projects/data-and-retrieval/ and the audio analysis in content/projects/foundation-models/. For transcription, live captions, or real-time work, the speech entries in the Arsenal are the right tools and this is not.

## Resources

- [GitHub — deezer/spleeter](https://github.com/deezer/spleeter)
- [Deezer research page for the project](https://research.deezer.com/projects/spleeter.html)
- [Source separation paper on arXiv](https://arxiv.org/abs/1902.08652)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (28,477 stars, last commit 2026-06-18, license MIT, verified via GitHub API on 2026-09-28)*
