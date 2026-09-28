#!/usr/bin/env node
// Semantic editorial pass: have a model judge whether an entry is specific.
//
// The mechanical gates (validate-editorial-quality.js) check structure and
// pattern-match boilerplate. They cannot tell a genuinely informative
// Architecture section from a plausible-sounding paragraph that names nothing
// real. This pass asks a model that question directly.
//
// It is deliberately OPT-IN and report-only:
//   - it never rewrites an entry
//   - it does not write to the finding baseline
//   - it exits non-zero only when --enforce is passed
// so it can run in CI as a signal without blocking on model variance, and a
// maintainer decides what to act on.
//
// Usage:
//   node scripts/semantic-editorial-pass.js --changed-only
//   node scripts/semantic-editorial-pass.js --all --concurrency 4
//   node scripts/semantic-editorial-pass.js --all --enforce
//   node scripts/semantic-editorial-pass.js --all --id vllm --id sglang
//
// Requires OPENROUTER_API_KEY (or HERMES model access via OPENAI_BASE_URL).

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { getEntryFiles, readMarkdown } from './utils/frontmatter.js';
import { getChangedMarkdownFiles, isContentEntryCandidate } from './utils/changed-files.js';

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const option = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};

const ALL = flag('all');
const CHANGED = flag('changed-only');
const ENFORCE = flag('enforce');
const IDS = args.reduce((acc, value, index) => (value === '--id' ? [...acc, args[index + 1]] : acc), []);
const CONCURRENCY = Number(option('concurrency', '3'));
const MODEL = option('model', process.env.SEMANTIC_EDITORIAL_MODEL ?? 'stealth/space-bunny-alpha');
const API_URL = process.env.OPENAI_BASE_URL ?? 'https://openrouter.ai/api/v1';
const API_KEY = process.env.OPENROUTER_API_KEY ?? process.env.OPENAI_API_KEY;
const OUT = option('out', 'data/semantic-editorial-report.json');

// The judgement. Written to be hard to satisfy by padding: a section passes
// only if it names specifics, states a cost, or draws a boundary.
const RUBRIC = `You are auditing a technical catalog entry for SPECIFICITY.

Judge the entry as a whole. Pass only if a senior engineer reading it would
learn something they could not get from the project's README title, and if the
entry is honest about what the project does NOT do well.

FAIL the entry if any of these hold:
- it describes the project in superlatives without naming anything concrete
- sections restate frontmatter rather than adding analysis
- Architecture/How It Works names no module, function, protocol, or algorithm
- Limitations lists no real cost, scaling limit, or operational burden
- claims are vague hedges ("widely used", "powerful", "flexible") with no evidence
- it would read identically if you swapped in a different project

Do NOT fail an entry merely for being short. A tight, concrete 150-word entry
is better than a padded 600-word one.

Respond with ONLY compact JSON:
{"verdict":"pass"|"fail","score":0-100,"reasons":["...","..."],"weakest_section":"..."}`;

async function askModel(entryText, retry = false) {
  const response = await fetch(`${API_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0,
      max_tokens: 4000,
      messages: [
        { role: 'system', content: RUBRIC },
        { role: 'user', content: entryText }
      ]
    })
  });
  if (!response.ok) {
    throw new Error(`model request failed: ${response.status} ${await response.text()}`);
  }
  const payload = await response.json();
  const choice = payload.choices?.[0];
  const raw = choice?.message?.content ?? '';
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) {
    // A reasoning model can spend the whole completion budget on hidden
    // reasoning and return an empty visible message (finish_reason: length).
    // Retry once with headroom rather than reporting a harness error.
    if ((choice?.finish_reason === 'length' || raw.length === 0) && !retry) {
      return askModel(entryText, true);
    }
    throw new Error(
      `no JSON in model reply (finish_reason=${choice?.finish_reason ?? 'unknown'}): ${raw.slice(0, 200)}`
    );
  }
  return JSON.parse(match[0]);
}

async function main() {
  if (!API_KEY) {
    console.error('semantic pass: no API key. Set OPENROUTER_API_KEY (or OPENAI_API_KEY) to run it.');
    process.exit(ENFORCE ? 1 : 0);
  }

  let files;
  if (IDS.length) {
    files = [];
    for (const id of IDS) {
      const found = (await getEntryFiles()).filter((file) => path.basename(file, '.md') === id);
      if (found.length === 0) {
        console.error(`semantic pass: no entry with id "${id}"`);
        process.exit(ENFORCE ? 1 : 0);
      }
      files.push(...found);
    }
  } else if (CHANGED && !ALL) {
    files = (await getChangedMarkdownFiles()).filter(isContentEntryCandidate);
  } else {
    files = await getEntryFiles();
  }

  console.log(`semantic pass: ${MODEL} over ${files.length} entr${files.length === 1 ? 'y' : 'ies'}`);
  const results = [];
  const queue = [...files];

  async function worker() {
    while (queue.length) {
      const file = queue.shift();
      try {
        const { data, content } = await readMarkdown(file);
        const judgement = await askModel(content);
        results.push({ file, id: data.id ?? path.basename(file, '.md'), ...judgement });
        const mark = judgement.verdict === 'pass' ? 'pass' : 'FAIL';
        console.log(`  ${mark}  ${data.id ?? file}  score=${judgement.score}`);
      } catch (error) {
        results.push({ file, verdict: 'error', error: String(error.message ?? error) });
        console.error(`  error ${file}: ${error.message ?? error}`);
      }
    }
  }

  await Promise.all(Array.from({ length: Math.max(1, CONCURRENCY) }, worker));

  const judged = results.filter((r) => r.verdict !== 'error');
  const failures = judged.filter((r) => r.verdict === 'fail');
  const errors = results.filter((r) => r.verdict === 'error');
  const mean = judged.length
    ? Math.round(judged.reduce((sum, r) => sum + (r.score ?? 0), 0) / judged.length)
    : 0;

  const report = {
    model: MODEL,
    generated_for: files.length,
    judged: judged.length,
    errors: errors.length,
    pass: judged.length - failures.length,
    fail: failures.length,
    mean_score: mean,
    results: results.sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
  };
  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, `${JSON.stringify(report, null, 2)}\n`);

  console.log(
    `\nsemantic pass: ${report.pass} pass / ${report.fail} fail / ${report.errors} error, mean score ${mean}. Report: ${OUT}`
  );
  if (failures.length) {
    console.log('\nLowest-scoring entries:');
    for (const failure of failures.slice(0, 15)) {
      console.log(`  ${String(failure.score).padStart(3)}  ${failure.id}  (${failure.weakest_section})`);
      for (const reason of (failure.reasons ?? []).slice(0, 2)) console.log(`        - ${reason}`);
    }
  }
  // Never writes the baseline: this is a signal, not a gate, unless enforced.
  if (ENFORCE && failures.length) process.exit(1);
}

await main();
