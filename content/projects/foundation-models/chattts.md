---
version_tracked: null
demo_url: null
paper_url: null
paper_id: null
model_sizes: []
benchmark_scores: []
supports_quantization: false
supported_formats: []
api_compatible: null
org_or_maintainer: "2noise"
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: draft
reviewed_by: maintainer
buzz_sources: []
featured: false
github_stars_last_30d: 0
trending_score: 0
added_date: "2026-07-12"
last_reviewed: "2026-07-12"
added_by: maintainer
status: active
id: chattts
name: "ChatTTS"
artifact_type: model
category: voice-audio
subcategory: open-source-models
description: "AGPL-3.0 dialogue-oriented TTS from 2noise with token-level prosody control, zero-shot speaker sampling and a streaming audio path"
github_url: "https://github.com/2noise/ChatTTS"
license: AGPL-3.0
primary_language: Python
tags: [voice, multimodal, streaming, research]
maturity: beta
cost_model: open-source
github_stars: 39874
last_commit: "2026-04-10"
docs_url: "https://huggingface.co/2Noise/ChatTTS"
phase: foundation-model
domain:
  - "audio"
relation_to_stack:
  - "deploy-as-is"
  - "study-and-reference"
health_signals:
  - "community-driven"
  - "research-origin"
ecosystem_role:
  - "A dialogue-optimized TTS model that emits expressive, multi-speaker conversational speech with inline prosody and disfluency control."
best_for: ["You are building a Chinese or English conversational assistant and you need the model to place laughter, interjections and pauses in the reply rather than reading a flat transcript aloud.", "You want to control delivery per sentence or per word, because the proseody tokens `oral_0-9`, `laugh_0-2` and `break_0-7` can be injected into the text and sampled speaker embeddings are reusable via spk_emb.", "You need streaming audio generation, which is on the completed roadmap list alongside the open-sourced DVAE encoder and zero-shot inference code."]
avoid_if: ["You need a permissive licence for a product, because the model weights are CC BY-NC 4.0 for educational and research use and the code is AGPLv3+, so neither half is commercial-friendly.", "You need a stable single-pass output, because the maintainers document autoregressive instability that requires multiple samples to find an acceptable result, particularly with multiple speakers.", "You need a small GPU footprint or low latency, because a 30-second clip needs at least 4GB of VRAM and the README quotes a real-time factor near 0.3 on a 4090."]
enrichment_notes: "Repository, AGPL-3.0 license, and 2026-04-10 activity verified via the GitHub API on 2026-07-12. AGPL copyleft has real implications for hosted services; verify licensing before production use."
---

## Overview

ChatTTS is a generative speech model from 2noise aimed squarely at dialogue, such as an LLM assistant speaking its replies, and the repository is described as algorithm infrastructure plus simple examples rather than a product. Its distinguishing feature is fine-grained prosody control: the released model exposes only three token-level control units, `[laugh]`, `[uv_break]` and `[lbreak]`, and the advanced usage path shows sentence-level control through `RefineTextParams(prompt='[oral_2][laugh_0][break_6]')` and word-level control by embedding those tokens directly in the text with `skip_refine_text=True`. The API is `ChatTTS.Chat()` with `chat.load(compile=False)`, `chat.sample_random_speaker()` returning a Gaussian-sampled speaker embedding you can cache, and `chat.infer(texts, params_refine_text=..., params_infer_code=...)` returning waveforms at 24kHz. The training corpus is Chinese and English, the main model used 100,000+ hours, and the released Hugging Face checkpoint is the 40,000-hour pre-trained base without supervised fine-tuning. Vocoder work is credited to Vocos, with the codebase acknowledging bark, XTTSv2, VALL-E, fish-speech and the Westlake audio lab.

## Why it's in the Arsenal

The recurring problem in assistant speech is that the same sentence sounds like a manual read-out whether the answer is a joke, a warning or a list. ChatTTS treats prosody as something the caller can author, and the design bet is that a small set of control tokens plus a reusable speaker embedding is enough to make an assistant sound like a participant rather than a narrator. What you give up is predictability: an autoregressive decoder with documented instability means you pay in sampling attempts and review time, and the deliberate degradation applied to the public weights limits how good it can sound.

## Architecture

Generation runs in two stages. `infer` first refines text, optionally rewriting it against the prosody prompt and control tokens, then decodes semantic codes conditioned on a speaker embedding plus sampler parameters (temperature, top_p, top_k) passed as `InferCodeParams`; those codes are turned into a waveform at 24kHz. `sample_random_speaker()` draws a speaker embedding from a Gaussian over the published spk_stats distribution, and passing that embedding back on a later call preserves timbre without a reference audio file. DVAE is the open-sourced encoder path that supports zero-shot inference from an audio sample, and streaming generation is implemented rather than aspirational. Output is written with `torchaudio.save(..., 24000)`, and the WebUI at examples/web/webui.py plus the command-line runner at examples/cmd/run.py cover the two entry points; the maintainers explicitly warn against installing FlashAttention-2 or TransformerEngine in the current state.

## Ecosystem Position

ChatTTS competes with Piper, Coqui XTTS, Fish Speech and F5-TTS in open TTS, and it is an alternative to Chatterbox in content/projects/foundation-models for anyone who weighs prosody control above language breadth and licence permissiveness: two supported languages against Chatterbox's 23, and CC BY-NC 4.0 weights against MIT. It also overlaps with Bark and VALL-E, which the acknowledgements credit for the autoregressive TTS approach, and with fish-speech for using a generative vector-quantised audio tokeniser inside an LLM-style decoder. Where the ASR entries in content/projects/inference-engines cover the listening half, this is the speaking half tuned for turn-taking. Compared with the agent harnesses in content/projects/agent-systems, it supplies a voice, not the loop that decides when to use it.

## Getting Started

Install the package from PyPI and drive it from Python, saving at the model's 24kHz sample rate:

```bash
pip install ChatTTS
```

```python
import ChatTTS, torch, torchaudio
chat = ChatTTS.Chat(); chat.load(compile=False)
spk = chat.sample_random_speaker()   # cache this to keep the same voice later
wavs = chat.infer(["Good to see you again."])
torchaudio.save("out.wav", torch.from_numpy(wavs[0]).unsqueeze(0), 24000)
```

A web UI is available via `python examples/web/webui.py` from a source checkout.

## Key Use Cases

1. Assistant with personality: have the LLM emit a prosody prompt alongside its reply so a joke gets a laugh token and a warning gets a longer break.
2. Multi-turn voice consistency: sample a speaker embedding once, cache it, and reuse it across every reply in a session so the assistant does not change voice each turn.
3. Dialogue research: use the open DVAE encoder plus zero-shot path to clone a research-speaker voice for controlled expressive-tts experiments, which is what the academic licensing is aimed at.

## Strengths

- Explicit prosody control at sentence and word granularity through a small documented token vocabulary rather than only global knobs.
- Speaker embeddings are sampleable and reusable, so voice identity is a value you persist rather than a re-clone per request.
- Streaming audio generation and the DVAE encoder with zero-shot inference are both open-sourced, which is unusual for this class of model.
- Seven README translations and a published Colab notebook make the barrier to a first run low for both English and Chinese users.

## Limitations

The licensing is the hard stop: the weights are CC BY-NC 4.0 for educational and research use, the code is AGPLv3+, and the maintainers state the model is released for academic purposes only. Output quality is intentionally capped, with a small amount of high-frequency noise added during training on the 40,000-hour model and MP3 compression applied, plus an internally trained detection model they plan to open-source. Stability is the second limit and the maintainers are explicit that autoregressive models of this class struggle with multi-speaker output and occasionally poor audio, so you sample until you get something usable. Hardware is real: 4GB of VRAM minimum for a 30-second clip and an RTF near 0.3 on a 4090. Control is narrow, limited to three token types, with multi-emotion control still unchecked on the roadmap. The last recorded commit is also several months behind the other entries in this phase, so upstream breakage risk is higher than the star count implies.

## Relation to the Arsenal

This is the dialogue-first TTS entry in content/projects/foundation-models, and the comparison to make in that phase is against Chatterbox on the two axes where they genuinely differ, licence and language coverage. Its Chinese-English focus makes it a natural fit for a bilingual assistant, and the streaming path matters if the agent harness in content/projects/agent-systems needs to start speaking before a turn finishes generating. For transcription, the ASR entries in content/projects/inference-engines are the mirror image. If you need a permissive licence, look at the serving and voice-modeling options in content/tools/serving-and-deployment rather than working around CC BY-NC.

## Resources

- [GitHub — 2noise/ChatTTS](https://github.com/2noise/ChatTTS)
- [Weights on Hugging Face — 2Noise/ChatTTS](https://huggingface.co/2Noise/ChatTTS)
- [Community index of end-user products — Awesome-ChatTTS](https://github.com/libukai/Awesome-ChatTTS/tree/en)
