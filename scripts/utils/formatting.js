import fs from 'node:fs/promises';

export function normalizeMarkdownText(text) {
  return text
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/g, ''))
    .join('\n')
    .replace(/\n*$/g, '\n');
}

export async function fixTextFile(filePath) {
  const original = await fs.readFile(filePath, 'utf8');
  const fixed = normalizeMarkdownText(original);
  if (fixed !== original) {
    await fs.writeFile(filePath, fixed);
    return true;
  }
  return false;
}
