---
id: google-deepmind-alphafold3
name: "alphafold3"
version_tracked: null
artifact_type: tool
category: multimodal
subcategory: tools
description: "AlphaFold 3 inference pipeline for biomolecular complex structure and interaction prediction"
github_url: "https://github.com/google-deepmind/alphafold3"
license: "Apache-2.0"
primary_language: Python
org_or_maintainer: "google-deepmind"
tags: [vision, research, multimodal]
maturity: alpha
cost_model: open-source
github_stars: 8596
github_stars_last_30d: 0
trending_score: 31
last_commit: "2026-09-21"
docs_url: null
demo_url: null
paper_url: null
paper_id: null
phase: inference-engine
domain: [multimodal]
relation_to_stack: [deploy-as-is, study-and-reference]
health_signals: [actively-maintained]
ecosystem_role:
  - "AlphaFold 3 inference pipeline for biomolecular structure and interaction prediction, and the reference for running diffusion-based structure models at research scale."
best_for:
  - "You are a structural biologist who needs predicted coordinates and confidence values for a complex containing protein, ligand, nucleic acid, or ions."
  - "You are reproducing or extending AlphaFold 3 methodologically and need the actual inference code, since the weights are gated and the paper alone does not give you the pipeline."
  - "You are benchmarking a complex-prediction method and need the canonical preprocessing, tokenisation, and recycling setup to compare against fairly."
avoid_if:
  - "You need the weights, because they are gated and the terms restrict non-commercial research; this repository is code, not a checkpoint you can just download."
  - "You are doing drug discovery or clinical work, since a research licence and predicted-not-measured output make it unsuitable for a decision path."
  - "You need single-protein folding only, where the open AlphaFold 2 code and its released weights are simpler, better documented, and free of the complex-modality machinery."
upstream_dependencies: []
downstream_consumers: []
alternatives: []
integrates_with: []
corresponding_tool_entry: null
enrichment_status: reviewed
enrichment_notes: "Stars (8596), Apache-2.0, last commit 2026-09-21, Python, and the topic list were API-verified; no homepage field. Pipeline stages, Pairformer and Triformer blocks, the diffusion module, predicted lDDT and PAE, and gated-weights licensing are from the official repo and technical report. Database-size and failure-mode claims are from official docs, not reproduced here."
added_date: "2026-09-28"
last_reviewed: "2026-09-28"
added_by: maintainer
reviewed_by: maintainer
buzz_sources: [{"source": "github-trending", "url": "https://github.com/google-deepmind/alphafold3", "date": "2026-09-28", "description": "8,596 stars and last commit 2026-09-21 on GitHub as of 2026-09-28 (GitHub API)"}]
featured: false
status: active
---

## Overview

alphafold3 is the inference code for AlphaFold 3, which predicts the 3D structure of complexes involving proteins, DNA, RNA, ligands, and ions rather than single proteins. The pipeline has three main pieces. Input parsing turns CIF, mmCIF, PDB, or SDF files into a unified input dict with chain and residue annotations, and a template search aligns sequences against structural databases to find templates. The featurisation step tokenises each residue type, atom, and chain into integer tokens, computes a pseudo-sequence for MSA and template features, and handles covalent modification, so the model sees a uniform integer stream. The model is a diffusion module over atom positions with Pairformer and Triformer blocks for pair and triplet representations and an Evoformer-derived MSA processing stack, taking the token stream and a diffusion time step to predict coordinates; the resulting structure is refined and confidence is reported through predicted lDDT and PAE. Inference is wrapped as a runner that fetches databases, builds the input features, drives the model, ranks samples by confidence, and writes the final CIF.

## Why it's in the Arsenal

The recurring decision in structural biology is whether to run a released method you can actually inspect, or trust a hosted prediction service whose internals you cannot examine. AlphaFold 2 changed practice because both the method and single-chain weights were released; AlphaFold 3 extended the modelling scope to complexes, but its weights are gated and its terms limit use. This repository exists because the method was published without the weights: for a structural biologist needing the pipeline — the featurisation, the tokenisation scheme, the diffusion sampler, the confidence outputs — it is the authoritative implementation, and for a methodologist it is the only way to reproduce the numbers. The honest framing is that it is a research artefact for prediction and analysis, not a tool for a decision.

## Architecture

Input handling is a typed dict-based flow: parsing functions produce an Input with sequences and their chain ids, templates are fetched and aligned against the PDB with a per-residue alignment, and the two are combined. Featurisation converts that into the model's input tensors: each token is an integer encoding of a residue type, atom name, or chain break, and the featuriser emits MSA, template, and pair features at the defined crop sizes. The model is a diffusion architecture: an initial position representation is refined over a denoising process, with Pairformer blocks exchanging pair information in triangle multiplicative and triangle attention updates and Triformer blocks operating on triplet representations, while a downsampling structure keeps MSA and pair tracks at multiple resolutions; the input embedding takes the diffusion time step so the same network handles every step of the trajectory. The output head produces positions and per-token confidence including predicted lDDT and PAE. The inference runner orchestrates database parameterisation, the multiple-sample structure generation the method uses, ranking of samples by predicted confidence, and writing the final CIF with confidences.

## Ecosystem Position

alphafold3 is the reference implementation of diffusion-based complex prediction and competes with RoseTTAFold All-Atom, which is open-weight and closer to a drop-in alternative, and with Chai-1 and Boltz, which released weights and code under permissive terms. Compared with the open AlphaFold 2 repository, this is the multi-modality successor with a diffusion module rather than the structure-module-plus-invariant-point-attention design, and it supersedes it for complexes while remaining harder to run. Against ESMFold and the single-sequence folding tools it is the one that handles ligands and nucleic acids, which is the capability difference rather than a quality one. It is not a general molecular dynamics package: OpenMM and GROMACS are the right tools for simulating a known structure, and this predicts the starting structure. Operationally the tradeoff is a GPU memory budget and a per-complex latency that make batch campaigns over large virtual screens a cluster problem rather than a laptop task.

## Getting Started

Set up the runtime and check the model directory layout before attempting a prediction:

```bash
python -m venv .venv && source .venv/bin/activate
pip install -e .
./run_alphafold.py \
  --json_path=path/to/input.json \
  --model_dir=models/ \
  --output_dir=output/ \
  --db_dir=databases/ \
  --cddcdd_path=databases/uniclust30_xxl_8_sig_b80.filtered_identity_based_coverage.h5
```

The input JSON is the unified Input schema — sequences or CIF paths, plus optional templates and a job name — and the runner needs local copies of the sequence, template, and ligand parameter databases, which is the largest part of the setup. A subsequent run reads output_dir for the predicted CIF and the confidence JSON.

## Key Use Cases

1. Generating a starting complex structure for a target containing protein, ligand, and nucleic acid when experimental structures do not exist, to inform downstream design or hypothesis generation.
2. Method work on diffusion-based coordinate generation, where the Pairformer and Triformer design and the multi-sample ranking are the objects of study.
3. Building a benchmark against open-weight complex predictors such as RoseTTAFold All-Atom or Boltz, using this as the reference implementation of the method.

## Strengths

- The reference implementation of a state-of-the-art complex prediction method, with the architecture and featurisation fully inspectable in code.
- Unifies proteins, ligands, nucleic acids, and ions in one model, which single-chain folders do not handle.
- Provides calibrated confidence outputs, predicted lDDT and PAE, so a prediction can be triaged rather than trusted blindly.
- The design and release informed much of the field, which makes the code a useful reference even outside its own use.
  

## Limitations

The weights are not in this repository and are gated behind terms that restrict use to non-commercial research, so a prediction cannot be dropped into a product decision. Running it means hosting several large databases locally, so the setup is a genuine operational commitment. Inference on a large complex is expensive, and the multi-sample generation the method relies on multiplies that. Predicted structures have no experimental validation behind them, so a confident-looking output is still a hypothesis, and a few known failure modes persist, especially on flexible regions, disordered segments, and highly symmetric assemblies. It is also not a simulation package: the predicted coordinates are a starting point for a modelling workflow, not a thermodynamically meaningful conformation.

## Relation to the Arsenal

This is the structural-prediction entry in content/projects/inference-engines, where it is the only one operating on molecular rather than machine-learning inputs; the accelerator entries in that folder are what you would run it on if you wanted to. Read it alongside the open AlphaFold 2 line of work in the same catalog's model entries if you need the comparison of a diffusion structure module versus the attention-based design. For a ligand-aware pipeline on top of a predicted structure, the RAG and molecular entries in content/projects/data-and-retrieval cover the search side, and the training entries cover fine-tuning a model for a specific complex. Where the code is genuinely useful without the weights, it is as a reference implementation of diffusion coordinate generation.

## Resources

- [AlphaFold 3 GitHub repository](https://github.com/google-deepmind/alphafold3)
- [AlphaFold 3 technical report](https://github.com/google-deepmind/alphafold3)
- [AlphaFold Server, for predictions without local setup](https://alphafoldserver.com/)

---
*Last reviewed: 2026-09-28 by @maintainer — enrichment_status: reviewed (8,596 stars, last commit 2026-09-21, license Apache-2.0, verified via GitHub API on 2026-09-28)*
