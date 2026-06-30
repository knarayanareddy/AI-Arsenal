#!/usr/bin/env node
// Restores the curated (hand-authored) section index template for each
// tools phase folder. Safe to re-run; it only rewrites the authored
// preamble of content/tools/{phase}/_index.md, not the registry section,
// which generate-toc.js manages separately below the marker.

import fs from 'node:fs/promises';
import chalk from 'chalk';

const REGISTRY_MARKER = '<!-- AUTO-GENERATED REGISTRY BELOW — do not edit -->';

const phaseLabels = {
  'data-ingestion': 'Data Ingestion',
  'model-layer': 'Model Layer',
  orchestration: 'Orchestration',
  'serving-and-deployment': 'Serving & Deployment',
  'evaluation-and-observability': 'Evaluation & Observability',
  'dx-and-tooling': 'DX & Tooling'
};

const phaseScope = {
  'data-ingestion': {
    belongs: 'Loaders, scrapers, parsers, chunkers, embedding/annotation pipelines, and vector search tools that bring external data into an AI system.',
    notBelongs: 'Model providers and fine-tuning belong in Model Layer; agent memory belongs in Orchestration.',
    question: 'Does this tool primarily get data INTO the system, in a form the model layer can use?'
  },
  'model-layer': {
    belongs: 'LLM and image-model providers, local model runners, fine-tuning frameworks, model hubs/registries, and structured-generation libraries.',
    notBelongs: 'Hosting/serving infrastructure for those models belongs in Serving & Deployment; agent logic built on top of models belongs in Orchestration.',
    question: 'Is this tool primarily about producing, training, or hosting model weights/outputs, not the pipeline around it?'
  },
  orchestration: {
    belongs: 'Agent frameworks, workflow/pipeline schedulers, routers, memory layers, and tool-use coordination.',
    notBelongs: 'Raw inference serving belongs in Serving & Deployment; data collection belongs in Data Ingestion.',
    question: 'Does this tool coordinate multiple steps, tools, or agents toward a goal?'
  },
  'serving-and-deployment': {
    belongs: 'Inference servers, API gateways, containerization/scaling platforms, and hosting providers for AI workloads.',
    notBelongs: 'Agent logic belongs in Orchestration; model training belongs in Model Layer.',
    question: 'Does this tool primarily get a model or app running and reachable in production?'
  },
  'evaluation-and-observability': {
    belongs: 'Evaluation frameworks, tracing, monitoring, security/guardrail scanning, drift detection, and logging.',
    notBelongs: 'Data labeling for training data belongs in Data Ingestion; this phase is about judging behavior after the fact.',
    question: 'Does this tool tell you whether your AI system is working correctly, safely, or efficiently?'
  },
  'dx-and-tooling': {
    belongs: 'SDKs, CLIs, notebook/demo UI frameworks, prompt management, IDE/terminal assistants, and testing utilities for the humans building the system.',
    notBelongs: 'Tools whose primary consumer is the running AI system itself (not the developer) belong in one of the other five phases.',
    question: 'Does this tool primarily make the developer faster or the prompt/asset workflow easier, rather than run in production?'
  }
};

let written = 0;
for (const [phase, label] of Object.entries(phaseLabels)) {
  const scope = phaseScope[phase];
  const indexPath = `content/tools/${phase}/_index.md`;
  const content = `---
title: "${label} Tools"
section: "tools/${phase}"
auto_generated: false
---

# ${label} Tools

## What belongs here

${scope.belongs}

## What does NOT belong here

${scope.notBelongs}

## Decision guidance

Before picking a tool in this phase, consider:

- See [Architecture Decision Trees](../../architectures/decision-trees/_index.md) for cross-cutting guidance.
- Key question to ask: ${scope.question}

${REGISTRY_MARKER}
`;
  await fs.writeFile(indexPath, content);
  written += 1;
}

console.log(chalk.green(`Rebuilt ${written} curated phase index file(s).`));
