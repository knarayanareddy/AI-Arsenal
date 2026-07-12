#!/usr/bin/env node

// Maintenance tool for the finding-level editorial baseline. NOT run in CI.
//
//   pnpm run editorial:baseline         Regenerate from the current full-catalog
//                                       findings (accepts current debt as the
//                                       baseline; adding entries is a reviewed act).
//   pnpm run editorial:baseline:prune   Drop only resolved (stale) entries, so the
//                                       baseline shrinks without accepting new debt.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateEditorialQuality, BASELINE_PATH, loadBaseline } from './validate-editorial-quality.js';
import { findingToBaselineEntry, computeFingerprint, serializeBaseline } from './utils/editorial-baseline.js';

async function currentFindings() {
  const { issues } = await validateEditorialQuality({ mode: 'all' });
  return issues;
}

async function regenerate() {
  const findings = await currentFindings();
  const byFingerprint = new Map();
  for (const finding of findings) {
    const entry = findingToBaselineEntry(finding);
    byFingerprint.set(entry.fingerprint, entry);
  }
  await fs.writeFile(BASELINE_PATH, serializeBaseline([...byFingerprint.values()]));
  console.log(`Wrote ${byFingerprint.size} baseline entr${byFingerprint.size === 1 ? 'y' : 'ies'} to ${BASELINE_PATH}.`);
}

async function prune() {
  const findings = await currentFindings();
  const current = new Set(findings.map(computeFingerprint));
  const baseline = await loadBaseline();
  const kept = [...baseline.values()].filter((entry) => current.has(entry.fingerprint));
  const removed = baseline.size - kept.length;
  await fs.writeFile(BASELINE_PATH, serializeBaseline(kept));
  console.log(`Pruned ${removed} stale entr${removed === 1 ? 'y' : 'ies'}; ${kept.length} remain in ${BASELINE_PATH}.`);
}

async function main() {
  if (process.argv.includes('--prune')) await prune();
  else await regenerate();
}

const entrypoint = process.argv[1] ? path.resolve(process.argv[1]) : null;
if (entrypoint && fileURLToPath(import.meta.url) === entrypoint) main();
