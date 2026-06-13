#!/usr/bin/env node
import fs from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import chalk from 'chalk';

function gitLog() {
  try {
    return execFileSync('git', ['log', '--date=short', '--pretty=format:%ad%x09%s', '--max-count=200'], { encoding: 'utf8' });
  } catch {
    return '';
  }
}

const groups = new Map();
for (const line of gitLog().split(/\r?\n/).filter(Boolean)) {
  const [date, subject] = line.split('\t');
  const month = date?.slice(0, 7) ?? 'Unreleased';
  if (!groups.has(month)) groups.set(month, []);
  groups.get(month).push(subject);
}

let content = '# Changelog\n\nAll notable changes to AI Arsenal are documented here.\n\n';
if (!groups.size) {
  content += '## [Unreleased]\n\n### Added\n\n- Bootstrap repository foundation, schemas, automation, and curated content.\n';
} else {
  for (const [month, subjects] of groups) {
    content += `## ${month}\n\n`;
    for (const subject of subjects) content += `- ${subject}\n`;
    content += '\n';
  }
}
await fs.writeFile('CHANGELOG.md', content);
console.log(chalk.green('Generated CHANGELOG.md'));
