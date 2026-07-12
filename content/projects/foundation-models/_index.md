---
title: "Foundation Models"
section: "projects/foundation-models"
auto_generated: false
---

# Foundation Models

## What belongs here

Open-weight LLMs, embedding models, multimodal models, and speech models — the weights themselves plus their official training/inference reference code.

## What does NOT belong here

Runtimes that serve these weights (llama.cpp, vLLM, Ollama) belong in [Inference Engines](../inference-engines/_index.md); frameworks you build agent or RAG applications on top of belong in [Frameworks](../frameworks/_index.md).

## Relation to the Tools vertical

Foundation-model entries document the model itself — its architecture, training approach, and position in the model ecosystem — not how to operate it in production. Several models here also have a corresponding entry under `content/tools/model-layer/` for hosted/managed access; check each entry's `corresponding_tool_entry` field.

## Decision guidance

Before selecting a foundation model:
- Key question to ask: does this model's architecture, license, and current-generation status (not a superseded predecessor) actually fit my constraints?
- If you need usage guidance rather than architectural depth: see [tools/model-layer/](../../tools/model-layer/_index.md) and [tools/serving-and-deployment/](../../tools/serving-and-deployment/_index.md)
- See [Choose an LLM](../../architectures/decision-trees/choose-llm.md) for cross-cutting selection guidance

## Projects in this category

<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->

## Foundation Models in This Phase

### Recently Added

- [Bark](./bark.md)
- [ChatTTS](./chattts.md)
- [DeepSeek-VL](./deepseek-vl.md)
- [Dia](./dia-tts.md)
- [EmotiVoice](./emotivoice.md)
- [Fish Speech](./fish-speech.md)
- [Grounding DINO](./grounding-dino.md)
- [Hunyuan3D-2](./hunyuan3d-2.md)
- [HunyuanVideo](./hunyuanvideo.md)
- [IndexTTS](./index-tts.md)

### Most Popular

- [Whisper](./whisper.md) — ⭐ 104543
- [DeepSeek-V3 / R1](./deepseek-v3-r1.md) — ⭐ 103749
- [GPT-SoVITS](./gpt-sovits.md) — ⭐ 59564
- [Segment Anything (SAM)](./segment-anything.md) — ⭐ 54527
- [ChatTTS](./chattts.md) — ⭐ 39599
- [Bark](./bark.md) — ⭐ 39191
- [OpenVoice](./openvoice.md) — ⭐ 36917
- [CLIP (OpenAI)](./clip.md) — ⭐ 33936
- [VoxCPM](./voxcpm.md) — ⭐ 33194
- [Fish Speech](./fish-speech.md) — ⭐ 31234

### Browse All

- [AudioCraft (Meta)](./audiocraft.md) — Meta's audio-generation library and open models — MusicGen for text-conditioned music, AudioGen for sound effects, built on the EnCodec codec
- [Bark](./bark.md) — A transformer text-to-audio model from Suno that generates speech, non-speech sounds, music, and sound effects from text prompts via GPT-style audio tokens and
- [BGE / FlagEmbedding (BAAI)](./bge-embeddings.md) — BAAI's open embedding and reranker family — BGE-M3's dense+sparse+multi-vector retrieval made it the default self-hosted choice for multilingual RAG
- [Chatterbox (Resemble AI)](./chatterbox.md) — Resemble AI's MIT-licensed production TTS — zero-shot cloning with emotion-exaggeration control, multilingual coverage, and watermarked outputs by default
- [ChatTTS](./chattts.md) — A generative speech model tuned for natural conversational dialogue in English and Chinese, with fine-grained prosody and laughter control tokens
- [CLIP (OpenAI)](./clip.md) — OpenAI's contrastive image-text model — the shared embedding space that underlies zero-shot classification, image search, and the vision encoders of most VLMs
- [Command R+](./command-r-plus.md) — Cohere model family oriented toward enterprise RAG, tool use, and multilingual workflows
- [CosyVoice](./cosyvoice.md) — Multilingual text-to-speech model family from Alibaba with zero-shot voice cloning, cross-lingual synthesis, and streaming generation
- [DeepSeek-V3 / R1](./deepseek-v3-r1.md) — DeepSeek open-weight MoE and reasoning model family known for strong cost-performance
- [DeepSeek-VL](./deepseek-vl.md) — DeepSeek's open vision-language model family for real-world multimodal understanding, combining a hybrid vision encoder with an LLM for document, chart
- [Dia](./dia-tts.md) — A 1.6B-parameter open dialogue text-to-speech model from Nari Labs that generates multi-speaker conversational audio, including non-verbal cues
- [EmotiVoice](./emotivoice.md) — A multi-voice, prompt-controlled text-to-speech engine from NetEase Youdao that synthesizes English and Chinese speech with explicit emotion control via style
- [F5-TTS](./f5-tts.md) — Flow-matching open TTS with zero-shot voice cloning from seconds of reference audio — the fully non-autoregressive design that made open cloning fast and simple
- [Falcon 3](./falcon-3.md) — TII open model family with compact 1B to 10B text-only variants for local deployment
- [Fish Speech](./fish-speech.md) — An open text-to-speech model family using a dual autoregressive transformer over grouped audio tokens with the Firefly neural codec for fast
- [FLUX (Black Forest Labs)](./flux.md) — Black Forest Labs' rectified-flow image generation family — FLUX.1 [dev]/[schnell] set the open-weights quality bar after Stable Diffusion's momentum stalled
- [Gemma](./gemma.md) — Google open model family designed for efficient language and multimodal applications
- [Gemma 3](./gemma-3.md) — Google open model family with efficient text and multimodal variants for local and hosted use
- [GLM-4 / GLM-4.5](./glm-4.md) — Zhipu AI's open-weights model family unifying reasoning, coding, and agentic capability, with MoE flagships and strong small dense variants
- [GPT-SoVITS](./gpt-sovits.md) — Few-shot voice cloning and TTS toolkit that clones a voice from ~1 minute of audio, with WebUI for data prep, training, and inference
- [Grounding DINO](./grounding-dino.md) — An open-set object detector that localizes arbitrary objects from free-text prompts by fusing language and vision in a DINO-style detection transformer
- [Hunyuan3D-2](./hunyuan3d-2.md) — Tencent's open model for generating high-resolution textured 3D assets from images or text using a two-stage shape-then-texture diffusion pipeline
- [HunyuanVideo](./hunyuanvideo.md) — Tencent's large open text-to-video generation model with a diffusion-transformer backbone and a 3D VAE, targeting cinematic-quality clips
- [IndexTTS](./index-tts.md) — An industrial-grade controllable zero-shot text-to-speech system from Bilibili, designed for efficient
- [InternVideo](./internvideo.md) — Open-source family of video foundation models and datasets from OpenGVLab for video understanding, retrieval, and multimodal tasks
- [Janus](./janus.md) — DeepSeek's unified multimodal model that decouples visual understanding from generation, letting one model both interpret images and generate them
- [Kimi K2](./kimi-k2.md) — Moonshot AI's trillion-parameter open-weights MoE model optimized for agentic tool use and coding, with 32B active parameters
- [Kokoro TTS](./kokoro.md) — 82M-parameter open TTS that punches far above its size — Apache-2.0 weights, near-instant CPU-capable synthesis, and browser/edge deployment via ONNX
- [Llama 3.x](./llama-3.md) — Meta open-weight Llama 3 family for general, multilingual, code, and multimodal applications
- [LTX-Video](./ltx-video.md) — Lightricks' open DiT-based video-generation model optimized for real-time, high-resolution text-to-video and image-to-video synthesis on a single GPU
- [MiniCPM-V](./minicpm-v.md) — Efficient open vision-language model series from OpenBMB that runs strong image/video/OCR understanding on-device, including phones
- [Mistral / Mixtral](./mistral-models.md) — Mistral open-weight model family including dense and mixture-of-experts language models
- [MLX Audio](./mlx-audio.md) — Speech library for Apple Silicon built on MLX, providing text-to-speech, speech-to-text, and speech-to-speech inference optimized for on-device use
- [Moshi](./moshi.md) — Full-duplex speech-to-speech foundation model from Kyutai that listens and speaks simultaneously with low latency, no explicit ASR/TTS pipeline
- [MOSS-TTS](./moss-tts.md) — Open-source speech and sound generation model family for expressive, long-form, multi-speaker, and streaming audio
- [OLMo](./olmo.md) — AI2's fully-open language model family: weights, training data, code, and checkpoints all released — the reference for reproducible LLM science
- [Open-Sora](./open-sora.md) — Open-source text/image-to-video generation model and training pipeline from HPC-AI Tech, aiming for an accessible reproduction of Sora-style video synthesis
- [OpenVoice](./openvoice.md) — An instant voice-cloning model from MIT and MyShell that separates tone color from a base speaker, enabling cross-lingual cloning and style control
- [Phi-4](./phi-4.md) — Microsoft small language model family optimized for efficient reasoning and local-friendly deployment
- [Phi Cookbook](./phi-cookbook.md) — Microsoft examples and recipes for building with the Phi model family
- [Qwen](./qwen.md) — Alibaba open-weight model family covering language, coding, and multimodal use cases
- [Qwen 2.5 / QwQ](./qwen-2-5.md) — Alibaba Qwen open-weight family spanning small, large, coding, math, and reasoning models
- [Qwen3-VL](./qwen3-vl.md) — Alibaba's open vision-language model family — image, video, and document understanding with strong OCR and GUI-grounding across sizes from edge to flagship
- [SAM 2 (Segment Anything Model 2)](./sam2.md) — Meta's promptable segmentation foundation model unified across images and video — click/box prompts yield masks tracked through time via streaming memory
- [Segment Anything (SAM)](./segment-anything.md) — Meta's promptable segmentation foundation model that produces high-quality object masks from point, box, or text-free prompts, with zero-shot generalization
- [SenseVoice](./sensevoice.md) — A non-autoregressive multilingual speech-understanding model from Alibaba that jointly does ASR, spoken-language identification, emotion recognition
- [Stability AI Generative Models](./stability-generative-models.md) — Stability AI's official repository for its generative image models including SDXL and Stable Diffusion 3, with training, sampling, and model definitions
- [StyleTTS 2](./styletts2.md) — A text-to-speech model that reaches human-level naturalness using style diffusion and adversarial training with large speech language models as discriminators
- [TranslateGemma](./translategemma.md) — Open translation model family built on Gemma 3 supporting 55 languages efficiently
- [UniLM](./unilm.md) — Microsoft's large research repository of self-supervised pretrained models across languages, tasks, and modalities, including BEiT, LayoutLM, WavLM, and TrOCR
- [VAR (Visual Autoregressive)](./visual-autoregressive.md) — A NeurIPS 2024 best-paper image-generation model that reframes autoregression as next-scale prediction, outperforming diffusion on quality and speed at scale
- [VoxCPM](./voxcpm.md) — A tokenizer-free text-to-speech model that generates speech in a continuous acoustic space for multilingual synthesis, creative voice design
- [Whisper](./whisper.md) — OpenAI's open-source speech recognition model: robust multilingual transcription and translation trained on 680k hours of audio
- [Yi](./yi.md) — 01.AI open model family with bilingual and long-context variants from small to mid-large sizes
