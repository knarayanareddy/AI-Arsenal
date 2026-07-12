// Helpers for building the auto-generated registry blocks in `_index.md`
// navigation files (see scripts/generate-toc.js).

// The "Browse All" section is contractually the COMPLETE listing of every
// entry in a section, so it must never be truncated — otherwise entries whose
// content files exist become undiscoverable from navigation once a section
// grows past any cap. `formatEntry` renders one entry to a markdown line.
export function renderBrowseSection(local, formatEntry) {
  return local.map(formatEntry).join('\n') || '_No entries yet._';
}
