## PR Type

- [ ] ➕ New content (project/tool/paper/tip)
- [ ] ✏️ Update existing content
- [ ] 🐛 Fix error or broken link
- [ ] 🏗️ Infrastructure/tooling change (scripts / schemas / workflows)
- [ ] 📚 Documentation update
- [ ] 🔒 Security fix

## Security Impact

> If your PR touches `scripts/`, `.github/workflows/`, or `schemas/`, complete this section.
> Otherwise mark as N/A.

- [ ] N/A — no security-relevant changes
- [ ] I have considered SSRF (no new outbound HTTP without `network-guard.js`)
- [ ] I have considered XSS (no new user-supplied HTML in generated data)
- [ ] I have considered workflow injection (no tag-pinned Actions; all SHA-pinned)
- [ ] I have considered credential exposure (no secrets in code or fixtures)
- [ ] I have added or updated tests under `tests/`

## Summary

<!-- 1-3 sentences describing what this PR does. -->

## Content Checklist (for new/updated entries)

- [ ] Frontmatter is complete (all required fields filled)
- [ ] All tags used exist in `TAXONOMY.md`
- [ ] Entry ID is unique (not used by any other entry)
- [ ] Markdown body follows the template structure
- [ ] All URLs have been personally verified to be working
- [ ] `added_date` / `last_reviewed` is set to today's date (`YYYY-MM-DD`)
- [ ] `added_by` is set to your GitHub username
- [ ] No `[skip ci]` in commit messages (reserved for automation)

## AI Agent Disclosure

- [ ] This PR was authored entirely by a human
- [ ] This PR was authored with AI assistance (describe scope below)

<!-- If AI-assisted, describe what the AI did and what was human-reviewed. -->

## Related Issues

Closes #

## Notes for Reviewers
