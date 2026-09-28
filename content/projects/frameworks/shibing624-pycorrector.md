---
id: shibing624-pycorrector
name: "pycorrector"
version_tracked: null
artifact_type: library
category: tooling
subcategory: libraries
description: "Text error-correction toolkit that packages MacBERT, SoftMask, KenLM, and seq2seq correction models behind one short call"
github_url: "https://github.com/shibing624/pycorrector"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "shibing624"
tags: [llm]
maturity: production
cost_model: open-source
github_stars: 6528
github_stars_last_30d: 0
trending_score: 29
last_commit: "2026-07-25"
docs_url: "https://www.mulanai.com/product/corrector/"
demo_url: null
paper_url: null
paper_id: null
phase: framework
domain: [language]
relation_to_stack: [build-on-top]
health_signals: [org-backed]
ecosystem_role:
  - "Text error-correction toolkit spanning MacBERT and GPT-style correction models, used as a deterministic cleanup stage before text reaches a generative model."
best_for:
  - "You are building a Chinese search or ASR post-processing stage and need a dedicated corrector rather than a general LLM prompt."
  - "You want a fast, predictable baseline corrector to establish how much error-correction actually helps your downstream metric."
  - "You are mixing correction architectures across projects and want one API for MacBERT, SoftMask, BERT-based, and seq2seq models."
avoid_if:
  - "You need grammatical or stylistic rewriting beyond typo repair, since the trained checkpoints target character-level orthographic errors."
  - "Your text is English and the models were tuned on Chinese correction data, in which case a language-specific checker fits better."
  - "You are correcting text where a wrong substitution is worse than leaving it alone, since the model has no abstention mechanism and will always emit a guess."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (6528), Apache-2.0 license, last commit 2026-07-25, primary language Python, and all eight topics were read from the GitHub API. Backend names, the MacBERT span-tagging plus filling design, KenLM usage, and the training scripts come from the official README; no model was downloaded and no correction was run here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/shibing624/pycorrector", "date": "2026-09-28", "description": "6,528 stars and last commit 2026-07-25 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

pycorrector collects Chinese and English text error-correction models behind a single Python interface. The main entry is the corrector class, which dispatches to a backend by name: a MacBERT corrector for span detection plus BERT masked-language-model filling, a SoftMask-BERT corrector that predicts a correction position and length before filling, a traditional n-gram plus language-model corrector built on KenLM, and seq2seq backends including T5, ChatGLM3, and Qwen2.5 variants. The project also exposes training scripts so the MacBERT4CSC detection model and the filling model can be fine-tuned on your own correction pairs, plus evaluation utilities and a Chinese text-error-correction dataset loader.

## Why it's in the Arsenal

The decision it resolves is where typo handling belongs in a pipeline. Asking a large model to fix spelling as part of a summarization or extraction prompt spends context and output tokens on a trivial problem, and the result varies with sampling temperature. A dedicated corrector is a cheap deterministic stage: a few hundred milliseconds of CPU for the BERT variant, one narrow responsibility, and a metric you can measure on its own. It also gives you an ablation lever, since toggling the corrector on and off tells you whether the upstream ASR or OCR stage or the text normalization is the real bottleneck.

## Architecture

A correction backend exposes correct and batch_correct methods. The MacBERT path runs two models: MacBertCorrector performs sequence tagging over a BIO-style scheme to mark the error span, and a masked language model then fills each masked character, choosing the highest-scoring candidate under a similarity constraint that discourages wild substitutions. SoftMask-BERT predicts a position and correction length first, which reduces the search space. The n-gram backend combines a character bigram dictionary built from training text with a KenLM score to rank candidates. Seq2seq backends call a causal or encoder-decoder checkpoint through transformers, which is the highest quality and the highest latency option. A factory in the package selects the backend from a string name at construction time.

## Ecosystem Position

pycorrector overlaps with correction and normalization work in the OCR and speech phases, since the same PaddleOCR and faster-whisper pipelines routinely hand it noisy text, but it is not a substitute for either: it repairs characters an upstream engine misread, it does not read documents or transcribe audio. It is a lighter alternative to prompting a large language model for the same fix, trading fluency for latency and determinism. It complements the RAG entries in data-and-retrieval, where a normalized query or a cleaned chunk materially changes retrieval recall, and it sits upstream of the generation models it protects.

## Getting Started

Install the package and pick a backend:

```bash
pip install pycorrector torch transformers
```

```python
from pycorrector import Corrector

corrector = Corrector(corrector_type="macbert4csc")
print(corrector.correct("他在北京大学学生").correct_text)
# 他在北京大学学生

batched = corrector.batch_correct(["语言学朊", "今天天汽很好"])
```

```bash
# the n-gram + KenLM backend, which needs no deep model download
pip install kenlm
python -c "from pycorrector import Corrector; print(Corrector().correct('语言行测').correct_text)"
```

Seq2seq backends are selected by name, for example corrector_type="chatglm3" or "qwen2.5", once the corresponding transformers version is installed.

## Key Use Cases

1. Post-processing ASR transcripts from faster-whisper or sherpa-onnx before the text reaches a generative model or a search index.
2. Cleaning OCR output from PaddleOCR or docTR where character-level confusion errors are common and cheap to fix deterministically.
3. Fine-tuning on a domain-specific correction pair set, using the included training scripts to adapt MacBERT to your terminology and error patterns.

## Strengths

- One API across architectures that otherwise require separate code paths, from n-gram plus KenLM to seq2seq large models.
- Extremely low latency for the BERT and n-gram backends, making it viable as an inline preprocessing step on every request.
- A span-detection stage before filling, which reduces the candidate space and limits spurious rewrites compared with pure masked filling.
- Training scripts and a correction dataset loader, so domain adaptation is a matter of supplying labeled pairs rather than writing a pipeline.

## Limitations

The models target orthographic errors, not grammar, style, or meaning, so expect no help with awkward but correctly spelled sentences. Character-level substitution can silently corrupt named entities, numbers, or domain jargon, and there is no confidence threshold exposed by default, so you must add your own guard before production. The seq2seq backends pull in a large model and lose the latency advantage. Coverage of English is thin compared with Chinese, and the project maintains few models, so checkpoint staleness on newer error patterns is plausible.

## Relation to the Arsenal

This is a framework-phase library that consumes the output of the OCR and speech entries in the catalog rather than replacing them, and it feeds the foundation-model phase by cleaning prompts. In a RAG stack it pairs with the document-processing entries in data-and-retrieval, where cleaning chunks and queries changes retrieval quality measurably. The evaluation entries in benchmarks-and-evals are the right place to measure whether correction earns its place in your pipeline.

## Resources

- [pycorrector GitHub repository](https://github.com/shibing624/pycorrector)
- [pycorrector model list and usage on Hugging Face](https://huggingface.co/shibing624)
- [MulanAI corrector product page](https://www.mulanai.com/product/corrector/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (6,528 stars, last commit 2026-07-25, license Apache-2.0, verified via GitHub API on 2026-09-28)*
