---
id: pytorch-audio
name: "audio"
version_tracked: null
artifact_type: library
category: voice-audio
subcategory: libraries
description: "TorchAudio's audio I/O, transforms, and metrics, covering backends, effects, and functional DSP for PyTorch pipelines"
github_url: "https://github.com/pytorch/audio"
license: "BSD-2-Clause"
primary_language: Python
org_or_maintainer: "pytorch"
tags: [voice, pytorch]
maturity: production
cost_model: open-source
github_stars: 2949
github_stars_last_30d: 0
trending_score: 28
last_commit: "2026-09-28"
docs_url: "https://pytorch.org/audio"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [audio]
relation_to_stack: [build-on-top]
health_signals: [actively-maintained, org-backed]
ecosystem_role:
  - "Torch audio I/O, transforms, and metrics, supplying the waveform, spectrogram, and resampling utilities that voice pipelines share across model implementations."
best_for:
  - "You need load, resample, and spectrogram operations that stay differentiable and run inside a PyTorch training loop."
  - "You want waveform augmentations such as gain, fade, and polarity inversion implemented as batched tensor ops rather than a Python loop."
  - "You are migrating a pipeline from the legacy torchaudio backend and need the current functional and transform API mapped out."
avoid_if:
  - "You need a decoder torchaudio does not ship, since backend availability follows whichever audio library you already installed."
  - "You want state-of-the-art speech model inference, where a dedicated ASR or TTS package gives you checkpoints rather than signal processing."
  - "Your preprocessing is entirely file-format handling, which belongs in an ffmpeg wrapper rather than a tensor library."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (2949), BSD-2-Clause license, last commit 2026-09-28, primary language Python, and all seven topics were read from the GitHub API. Backend dispatch, the functional versus transformations split, the learnable separation and VAD components, and the multi-resolution STFT loss come from the official docs; no audio was processed and no backend probed here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/pytorch/audio", "date": "2026-09-28", "description": "2,949 stars and last commit 2026-09-28 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

Torchaudio is the PyTorch-maintained audio library, serving as the audio counterpart to torchvision. It provides backend-agnostic audio I/O with automatic resolution across soundfile, sox, FFmpeg, and others, a resampling and dithering layer, a functional DSP module with waveform transforms, pitch and frequency analysis, and a transformations module that mirrors the torchvision pattern with a composable pipeline object. It ships learnable components including source separation, speech enhancement, and voice activity detection pipelines, standard objective functions such as a multi-resolution STFT loss and a perceptual loss, and a set of metrics. The library deliberately moved away from a bundled decoder implementation toward pluggable backends, so what decodes depends on what you install.

## Why it's in the Arsenal

The recurring decision is where audio preprocessing lives relative to the model. A typical project ends up with a small private module of resample, preemphasis, and spectrogram functions, half of them on NumPy and half copied from a tutorial, and those become the part of the pipeline nobody tests and everybody depends on. Torchaudio makes them batched, differentiable torch ops, which means augmentation composes into the training graph, the same transform is reused at inference, and no CPU-to-GPU copy sits between the disk and the batch. The second benefit is conditional reproducibility: because the functional API is small and the backend choice is explicit, an input pipeline is portable to another machine in a way a bespoke decode-and-resample script is not.

## Architecture

The functional module is the low-level core: every operation is a pure function over tensors, so a waveform in and a waveform out with no state and no object lifecycle. The transformations module wraps those functions in objects configured with a sample rate and parameters, chained through an apply method, which is what allows transforms to be composed and to know whether they have already run. The I/O layer is backend-dispatching: it probes the installed backends, and a single call like load reads a file through whichever one is available, with backend_index forcing a specific one. Learnable pipelines wrap published pretrained architectures, so source separation and enhancement return separated tensors or masks rather than raw audio. Losses and metrics are implemented as torch modules so they participate in autograd and can be used inside a compiled loop. For realtime use, batching and streaming helpers operate on chunks with an explicit cache of state between calls, so a waveform never has to be fully resident before decoding starts.

## Ecosystem Position

Torchaudio is a rather than an alternative to a speech model package: Kaldi, WeNet, and ESPnet handle acoustic modelling and decoding, while this handles the signal in and out, so the two compose rather than compete. It competes with librosa, and the choice is largely about where your pipeline already lives, since torchaudio keeps audio ops inside the same autograd and device context as the model while librosa is NumPy-first and forces a boundary. It is a complement to the speech recognition entries in the voice-audio phase, which consume exactly the features this produces, and it overlaps with DALI on the decode side, where DALI does the work on the GPU in a training pipeline and torchaudio does it as torch ops with autograd. Against the previous torchaudio 2.0 torchaudio backend, the current functional and transform API is the deliberate replacement rather than a synonym.

## Getting Started

Install with an audio backend and build a differentiable transform pipeline:

```bash
pip install torchaudio
# a decode backend: pip install soundfile sox
```

```python
import torch, torchaudio

waveform, sr = torchaudio.load("speech.wav")          # backend-dispatching read
waveform = torchaudio.functional.resample(waveform, sr, 16_000)

transforms = torchaudio.transforms.Compose([
    torchaudio.transforms.AudioLambda(lambda w: w * (1.0 + 0.1 * torch.randn(1))),
    torchaudio.transforms.Spectrogram(n_fft=400, hop_length=160),
    torchaudio.transforms.AmplitudeToDB(),
])
features = transforms(waveform).to("cuda")             # stays in the training graph
```

```bash
# inspect which backend actually loaded the file, and force one when it matters
python -c "import torchaudio; print(torchaudio.info('speech.wav'), torchaudio.list_audio_backends())"
```

```python
# or stay fully functional and compose by hand
spec = torchaudio.transforms.Spectrogram(n_fft=400, hop_length=160)
S = torchaudio.functional.spectrogram(waveform, n_fft=400, hop_length=160)
```

## Key Use Cases

1. A PyTorch speech training loop where augmentation and feature extraction must be batched, differentiable, and on the same device as the model.
2. Loading heterogeneous audio formats from a training corpus, where backend-dispatching reads remove per-format decoder code.
3. Preprocessing for a k-means or diarization pipeline, using the learnable separation and voice activity detection components rather than hand-written masking.

## Strengths

- Batch-as-tensor audio ops that keep augmentation inside the autograd graph and on the training device.
- Backend-dispatching I/O, so WAV, FLAC, MP3, and video-container audio load without per-format decoder code.
- Composable transform objects plus a pure functional layer, so pipelines can be configured once and reused at inference.
- Learnable audio components and perceptual losses that are awkward to implement well, and are much better sourced than hand-rolled.

## Limitations

Decoding depends entirely on what you installed, so a missing backend surfaces as an import-time surprise rather than a clear feature list, and the previous bundled torchaudio backend no longer exists, which breaks a lot of older code on upgrade. The library is not a model zoo: it will not give you ASR, TTS, or diarization quality comparable to a dedicated package, and its own examples lean on external model implementations. The functional API is broad but unevenly documented, so the less common transforms are read from source. Version compatibility with torch and the backends is version-coupled, and features that assume a sample rate silently produce wrong results if you forget to set it.

## Relation to the Arsenal

This is a framework-phase entry in the voice-audio category, and it is the signal-processing substrate the speech entries in that same phase sit on rather than a competitor to them. The visual equivalent of its role is torchvision for images, and the DALI entry in the inference-engine phase addresses the same throughput problem on the GPU data path instead. The pretraining entry s3prl consumes exactly the frame-level features this library produces, and the eval entries in the benchmarks-and-evals phase are where a preprocessing change should be measured rather than assumed.

## Resources

- [Torchaudio GitHub repository](https://github.com/pytorch/audio)
- [Torchaudio documentation](https://pytorch.org/audio)
- [Torchaudio audio backends guide](https://docs.pytorch.org/audio/stable/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (2,949 stars, last commit 2026-09-28, license BSD-2-Clause, verified via GitHub API on 2026-09-28)*
