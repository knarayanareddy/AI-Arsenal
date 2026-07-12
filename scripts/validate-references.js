#!/usr/bin/env node
import chalk from 'chalk';
import { loadEntries, buildIdIndex } from './utils/entries.js';

const entries = await loadEntries({ includeContent: false });
const idIndex = buildIdIndex(entries);
// These are ecosystem/framework names rather than catalog entries. They are
// intentionally allowed in integrates_with until/if canonical entries are
// added; treating them as IDs creates noise and encourages fake catalog rows.
const EXTERNAL_ECOSYSTEM_NAMES = new Set(['pytorch', 'huggingface']);
const ids = new Set(idIndex.keys());
const errors = [];
const warnings = [];

function checkRefs(entry, field, mode = 'error', allowedNames = new Set()) {
  const refs = entry.data[field];
  if (!Array.isArray(refs)) return;
  for (const ref of refs) {
    if (!ids.has(ref) && !allowedNames.has(ref)) {
      const msg = `${entry.file}: ${field} references unknown id "${ref}"`;
      (mode === 'warning' ? warnings : errors).push(msg);
    }
  }
}

for (const entry of entries) {
  checkRefs(entry, 'alternatives', 'warning');
  checkRefs(entry, 'integrates_with', 'warning', EXTERNAL_ECOSYSTEM_NAMES);
  // Note: 'applies_to' is intentionally NOT checked as a catalog-ID
  // reference. For tip entries specifically, applies_to is documented
  // (tips-vertical-reorg brief) as free-form context descriptors (e.g.
  // "rag-pipelines", "chat-applications"), not IDs that must resolve to
  // another catalog entry -- unlike alternatives/integrates_with/
  // related_tips, which are genuine ID references.
  checkRefs(entry, 'related_entries', 'warning');
  checkRefs(entry, 'top_projects', 'warning');
  checkRefs(entry, 'top_tools', 'warning');

  if (entry.data.paper_id && !ids.has(entry.data.paper_id)) warnings.push(`${entry.file}: paper_id references unknown id "${entry.data.paper_id}"`);

  if (entry.data.status === 'deprecated' && (!Array.isArray(entry.data.alternatives) || entry.data.alternatives.length === 0)) {
    warnings.push(`${entry.file}: deprecated entries should list alternatives`);
  }
  if (entry.type === 'project') {
    checkRefs(entry, 'upstream_dependencies', 'warning');
    checkRefs(entry, 'downstream_consumers', 'warning');
    if (entry.data.corresponding_tool_entry && !ids.has(entry.data.corresponding_tool_entry)) {
      warnings.push(`${entry.file}: corresponding_tool_entry references unknown id "${entry.data.corresponding_tool_entry}"`);
    }
  }
  if (entry.type === 'tool' && entry.data.corresponding_project_entry && !ids.has(entry.data.corresponding_project_entry)) {
    warnings.push(`${entry.file}: corresponding_project_entry references unknown id "${entry.data.corresponding_project_entry}"`);
  }

  if (entry.type === 'paper' && entry.data.phase) {
    checkRefs(entry, 'builds_on', 'warning');
    checkRefs(entry, 'implemented_in', 'warning');
    if (entry.data.superseded_by && !ids.has(entry.data.superseded_by)) {
      warnings.push(`${entry.file}: superseded_by references unknown id "${entry.data.superseded_by}"`);
    }
    if (entry.data.corresponding_project_entry && !ids.has(entry.data.corresponding_project_entry)) {
      warnings.push(`${entry.file}: corresponding_project_entry references unknown id "${entry.data.corresponding_project_entry}"`);
    }
    if (entry.data.result_status === 'superseded' && !entry.data.superseded_by) {
      warnings.push(`${entry.file}: result_status is "superseded" but superseded_by is not set (also enforced as an error in validate-schema.js)`);
    }
  }

  if (entry.type === 'tip' && entry.data.phase) {
    checkRefs(entry, 'related_tools', 'warning');
    checkRefs(entry, 'related_tips', 'warning');
    if (entry.data.implemented_from && !ids.has(entry.data.implemented_from)) {
      warnings.push(`${entry.file}: implemented_from references unknown id "${entry.data.implemented_from}"`);
    }
  }

  if (entry.type === 'architecture') {
    checkRefs(entry, 'related_decisions', 'warning');
    for (const impl of entry.data.approach_implementations ?? []) {
      checkRefs({ file: entry.file, data: impl }, 'tool_ids', 'warning');
      checkRefs({ file: entry.file, data: impl }, 'project_ids', 'warning');
      checkRefs({ file: entry.file, data: impl }, 'build_example_ids', 'warning');
    }
  }

  if (entry.type === 'observability') {
    checkRefs(entry, 'related_tools', 'warning');
    checkRefs(entry, 'related_projects', 'warning');
    checkRefs(entry, 'related_build_examples', 'warning');
    checkRefs(entry, 'related_tips', 'warning');
    if (entry.data.supersedes && !ids.has(entry.data.supersedes)) {
      warnings.push(`${entry.file}: supersedes references unknown id "${entry.data.supersedes}"`);
    }
    if (entry.data.superseded_by && !ids.has(entry.data.superseded_by)) {
      warnings.push(`${entry.file}: superseded_by references unknown id "${entry.data.superseded_by}"`);
    }
  }

  if (entry.type === 'community') {
    checkRefs(entry, 'related_communities', 'warning');
    checkRefs(entry, 'related_tools', 'warning');
    checkRefs(entry, 'related_projects', 'warning');
    checkRefs(entry, 'related_research', 'warning');
  }

  if (entry.type === 'trend') {
    // ranked_entries[].entry_id must resolve to an existing catalog entry
    // (or be an explicit TODO during migration). Warning-only so a single
    // stale reference does not block the suite.
    for (const re of entry.data.ranked_entries ?? []) {
      if (re && re.entry_id && !ids.has(re.entry_id)) {
        warnings.push(`${entry.file}: ranked_entries[].entry_id references unknown id "${re.entry_id}"`);
      }
    }
  }
}

// Rule T-10: related_tips must not create cycles longer than a direct
// mutual reference (A <-> B is explicitly allowed by the rule; a cycle of
// 3+ distinct entries is not). Checked globally, after the per-entry loop,
// since cycle detection needs the full related_tips graph across all tip
// entries. Uses a simple-path DFS (never revisits a node already on the
// current path) so genuine simple cycles are reported once each, rather
// than re-exploring already-visited nodes and reporting the same
// underlying cycle many times at different lengths.
const tipEntries = entries.filter((e) => e.type === 'tip' && e.data.phase && Array.isArray(e.data.related_tips));
const relatedTipsGraph = new Map(tipEntries.map((e) => [e.data.id, e.data.related_tips.filter((r) => ids.has(r))]));
const reportedCycles = new Set();
for (const [startId] of relatedTipsGraph) {
  const stack = [[startId, [startId]]];
  while (stack.length) {
    const [currentId, path] = stack.pop();
    for (const nextId of relatedTipsGraph.get(currentId) ?? []) {
      if (nextId === startId && path.length > 2) {
        const canonicalKey = [...path].sort().join(',');
        if (!reportedCycles.has(canonicalKey)) {
          reportedCycles.add(canonicalKey);
          warnings.push(`related_tips cycle detected (${path.length} distinct entries, Rule T-10): ${[...path, nextId].join(' -> ')}`);
        }
        continue;
      }
      // Simple-path constraint: never revisit a node already on this path.
      if (!path.includes(nextId) && path.length < 6) {
        stack.push([nextId, [...path, nextId]]);
      }
    }
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
