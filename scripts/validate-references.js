#!/usr/bin/env node
import chalk from 'chalk';
import { loadEntries, buildIdIndex } from './utils/entries.js';

const entries = await loadEntries({ includeContent: false });
const idIndex = buildIdIndex(entries);
const ids = new Set(idIndex.keys());
const errors = [];
const warnings = [];

function checkRefs(entry, field, mode = 'error') {
  const refs = entry.data[field];
  if (!Array.isArray(refs)) return;
  for (const ref of refs) {
    if (!ids.has(ref)) {
      const msg = `${entry.file}: ${field} references unknown id "${ref}"`;
      (mode === 'warning' ? warnings : errors).push(msg);
    }
  }
}

for (const entry of entries) {
  checkRefs(entry, 'alternatives', 'warning');
  checkRefs(entry, 'integrates_with', 'warning');
  checkRefs(entry, 'applies_to', 'warning');
  checkRefs(entry, 'related_entries', 'warning');
  checkRefs(entry, 'top_projects', 'warning');
  checkRefs(entry, 'top_tools', 'warning');

  if (entry.data.paper_id && !ids.has(entry.data.paper_id)) warnings.push(`${entry.file}: paper_id references unknown id "${entry.data.paper_id}"`);

  if (entry.type === 'project' && entry.data.type === 'tool') warnings.push(`${entry.file}: project type is "tool"; consider whether this belongs under /content/tools/ instead`);
  if (entry.data.status === 'deprecated' && (!Array.isArray(entry.data.alternatives) || entry.data.alternatives.length === 0)) {
    warnings.push(`${entry.file}: deprecated entries should list alternatives`);
  }
}

if (warnings.length) {
  console.warn(chalk.yellow(`Reference validation warnings (${warnings.length}):`));
  for (const warning of warnings) console.warn(chalk.yellow(`- ${warning}`));
}
if (errors.length) {
  console.error(chalk.red(`Reference validation failed with ${errors.length} error(s):`));
  for (const error of errors) console.error(chalk.red(`- ${error}`));
  process.exit(1);
}
console.log(chalk.green(`Reference validation passed. Checked ${entries.length} entries.`));
