# AGENTS.md

## Cursor Cloud specific instructions

This is a **documentation-only repository** (no application code, no build system, no tests).

### Repository contents

- `README.md` — Project overview and CLI usage examples
- `docs/CURSOR-SETUP.md` — Step-by-step Cursor Background Agent setup guide
- `.gitignore` — Prepared for future Node.js code (`node_modules/`, `dist/`)

### Development notes

- There is no `package.json`, no dependencies to install, and no services to start.
- The `.gitignore` anticipates future Node.js code but none exists yet.
- Linting/testing/building: not applicable — the repo has only Markdown files.
- To validate Markdown formatting, use any Markdown linter (e.g. `markdownlint`) if desired, but none is configured in-repo.
- The repository references an external tool ([cursor-background-agent-api](https://github.com/mjdierkes/cursor-background-agent-api)) but does not include it as a submodule or dependency.
