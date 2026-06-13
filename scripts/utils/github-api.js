export function parseGitHubRepo(url) {
  const match = String(url ?? '').match(/^https:\/\/github\.com\/([^/]+)\/([^/#?]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
}

export async function fetchGitHubRepo(repoUrl, token = process.env.GITHUB_TOKEN) {
  const parsed = parseGitHubRepo(repoUrl);
  if (!parsed) return null;
  const headers = { Accept: 'application/vnd.github+json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`, { headers });
  if (!response.ok) throw new Error(`GitHub API ${response.status} for ${repoUrl}`);
  return response.json();
}
