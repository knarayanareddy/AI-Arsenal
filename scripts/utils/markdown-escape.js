// Markdown-safe escaping. We use this when interpolating user-supplied
// strings into generated Markdown tables and bullet lists to prevent
// pipe characters or backticks from breaking table rendering.

export function escapeMarkdownCell(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, ' ')
    .replace(/`/g, '\\`');
}

export function escapeMarkdownInline(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\r?\n/g, ' ');
}

export function truncate(text, max = 600) {
  if (typeof text !== 'string') return '';
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return trimmed.slice(0, max - 1).trimEnd() + '…';
}
