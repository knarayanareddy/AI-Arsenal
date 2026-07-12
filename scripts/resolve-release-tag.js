#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const STABLE_TAG = /^v(\d+)\.(\d+)\.(\d+)$/;
const REQUESTED_VERSION = /^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;

export function normalizeReleaseTag(value) {
  const match = String(value ?? '').trim().match(REQUESTED_VERSION);
  if (!match) throw new Error(`Release version must be semver, for example v1.2.3; received ${JSON.stringify(value)}`);
  const [, major, minor, patch, prerelease] = match;
  return `v${major}.${minor}.${patch}${prerelease ? `-${prerelease}` : ''}`;
}

export function resolveReleaseTag(requestedVersion, tags = []) {
  if (String(requestedVersion ?? '').trim()) return normalizeReleaseTag(requestedVersion);

  const latestStable = tags
    .map((tag) => String(tag).trim())
    .filter((tag) => STABLE_TAG.test(tag))
    .sort((a, b) => {
      const av = a.slice(1).split('.').map(Number);
      const bv = b.slice(1).split('.').map(Number);
      return bv[0] - av[0] || bv[1] - av[1] || bv[2] - av[2];
    })[0];

  if (!latestStable) return 'v1.0.0';
  const [, major, minor, patch] = latestStable.match(STABLE_TAG);
  return `v${major}.${minor}.${Number(patch) + 1}`;
}

async function main() {
  const requested = process.env.RELEASE_VERSION ?? '';
  const output = process.env.GITHUB_OUTPUT;
  const tags = execFileSync('git', ['tag', '--list', 'v*'], { encoding: 'utf8' })
    .split(/\r?\n/)
    .map((tag) => tag.trim())
    .filter(Boolean);
  const value = resolveReleaseTag(requested, tags);
  if (tags.includes(value)) throw new Error(`Release tag already exists: ${value}`);
  if (output) await fs.appendFile(output, `value=${value}\n`);
  console.log(value);
}

const thisFile = path.resolve(fileURLToPath(import.meta.url));
if (process.argv[1] && path.resolve(process.argv[1]) === thisFile) {
  main().catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
}
