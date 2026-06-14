#!/usr/bin/env node
import fs from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import chalk from 'chalk';

// Conventional Commit → Keep-a-Changelog mapping.
const TYPE_GROUPS = {
  feat: 'Added',
  fix: 'Fixed',
  perf: 'Changed',
  refactor: 'Changed',
  docs: 'Documentation',
  style: 'Changed',
  test: 'Testing',
  build: 'Build',
  ci: 'CI',
  chore: 'Maintenance',
  schema: 'Schema',
  infra: 'Infrastructure',
  revert: 'Reverted',
  security: 'Security'
};

function gitLog() {
  try {
    return execFileSync('git', ['log', '--date=short', '--pretty=format:%ad%x09%s%x09%b', '--max-count=500'], { encoding: 'utf8' });
  } catch {
    return '';
  }
}

function classify(subject) {
  const match = subject.match(/^([a-z]+)(?:\([^)]*\))?:\s*(.+)$/);
  if (!match) return { group: 'Other', message: subject };
  const [, type, message] = match;
  return { group: TYPE_GROUPS[type] ?? 'Other', message: `${type}: ${message}` };
}

const groups = new Map();
for (const line of gitLog().split(/\r?\n/).filter(Boolean)) {
  const [date, subject] = line.split('\t');
  if (!date || !subject) continue;
  const month = date.slice(0, 7);
  if (!groups.has(month)) groups.set(month, new Map());
  const monthGroup = groups.get(month);
  const { group, message } = classify(subject);
  if (!monthGroup.has(group)) monthGroup.set(group, []);
  monthGroup.get(group).push({ date, message });
}

let content = `# Changelog

All notable changes to AI Arsenal are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Security

- Hardened GitHub Actions workflows: SHA-pinned all third-party actions, added explicit \`permissions:\` scopes, removed direct-to-main auto-commit in \`manual.yml\`.
- Hardened link checker: SSRF protection (private/loopback/link-local IPs blocked), per-host amplification cap, redirect chain re-validation, max URL length enforced.
- Hardened generated \`body_html\`: explicit sanitization with \`sanitize-html\` allowlist (defeats the removed \`remark-html\` sanitize option).
- Hardened GitHub star updater: required token in CI, file lock for concurrency, cache validation, auto-recompute of \`trending_score\`.
- Removed fake CODEOWNERS handles (every rule pointed at non-existent users); replaced with the real BDFL handle.

### Added

- \`.github/dependabot.yml\` for weekly npm + GitHub Actions updates with grouped PRs and security-sensitive packages ignored.
- \`.github/workflows/codeql.yml\` for weekly JavaScript static analysis.
- \`.github/workflows/scorecard.yml\` for OSSF Scorecard compliance.
- \`.github/workflows/release.yml\` for manual release tagging.
- \`scripts/utils/network-guard.js\` — SSRF-safe URL parsing and DNS resolution.
- \`scripts/utils/cache-guard.js\` — cache sanity checks.
- \`scripts/utils/html-sanitizer.js\` — explicit HTML sanitization.
- \`tests/\` — Node \`node:test\`-based unit tests for every validator.
- \`docs/policies/redteam-audit.md\` — full audit log.
- \`docs/policies/branch-protection.md\` — required GitHub branch settings.
- \`docs/policies/security-disclosure.md\` — vulnerability disclosure policy.
- \`docs/policies/continuity.md\` — single-maintainer bus-factor mitigation.
- \`docs/release-process.md\` — how to cut a release.
- \`meta/security-best-practices.md\` — guidance for AI agents consuming AI Arsenal.

### Changed

- \`update-star-counts.js\` recomputes trending score (previously required a separate run).
- \`create-link-issues.js\` deduplicates within a run and respects \`BROKEN_LINK_ISSUE_LIMIT\`.
- \`CONTRIBUTING.md\`, \`SECURITY.md\`, \`CODE_OF_CONDUCT.md\`, \`CODEOWNERS\`, PR template, issue templates hardened.

### Fixed

- Stored XSS in generated \`body_html\` (\`remark-html\` sanitize option is no-op in v14+).
- Bypass of CODEOWNERS due to non-existent handles.
- SSRF amplification vector in link checker.

`;

if (groups.size) {
  for (const [month, monthGroups] of [...groups.entries()].sort((a, b) => b[0].localeCompare(a[0]))) {
    if (month === groups.entries().next().value[0]) continue; // skip current month; rolled into Unreleased
    content += `## [${month}]\n\n`;
    for (const [group, items] of monthGroups) content += `### ${group}\n\n${items.map((i) => `- ${i.message}`).join('\n')}\n\n`;
  }
}

await fs.writeFile('CHANGELOG.md', content);
console.log(chalk.green('Generated CHANGELOG.md (Keep-a-Changelog format)'));
