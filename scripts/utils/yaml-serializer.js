// YAML serializer tailored for AI Arsenal frontmatter.
// Uses flow style for arrays (tags: [a, b]) and block style for objects.
// Always quotes date-shaped strings and YAML-unsafe scalars so gray-matter
// doesn't coerce them to native Date / number / boolean values.

export function yamlValue(v) {
  if (v === null || v === undefined) return 'null';
  if (typeof v === 'boolean') return String(v);
  if (typeof v === 'number') return String(v);
  if (Array.isArray(v)) {
    if (v.length === 0) return '[]';
    const items = v.map((item) => {
      if (item === null || item === undefined) return 'null';
      if (typeof item === 'boolean' || typeof item === 'number') return String(item);
      if (typeof item === 'string') {
        // Quote strings that contain YAML-unsafe chars or look like
        // native scalars (dates, booleans, numbers).
        if (/[\n:#,&[\]{}|]/.test(item) || /^(true|false|null|yes|no)$/i.test(item) || /^\d{4}-\d{2}-\d{2}$/.test(item)) {
          return JSON.stringify(item);
        }
        return item;
      }
      return JSON.stringify(item);
    });
    return `[${items.join(', ')}]`;
  }
  if (typeof v === 'object') {
    const entries = Object.entries(v).map(([k, val]) => {
      const inner = yamlValue(val);
      const multi = inner.includes('\n');
      if (multi) return `${k}:\n${inner.split('\n').map((line) => `  ${line}`).join('\n')}`;
      return `${k}: ${inner}`;
    });
    return entries.join('\n');
  }
  if (typeof v === 'string') {
    if (/[\n:#]|^(true|false|null|yes|no)$/i.test(v) || /^\d{4}-\d{2}-\d{2}$/.test(v)) {
      return JSON.stringify(v);
    }
    return v;
  }
  return String(v);
}
