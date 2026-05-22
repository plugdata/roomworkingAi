# AGENTS.md

## Cursor Cloud specific instructions

### Overview

roomworkingAi is a single-service Node.js/Express application (AI conversation workspace). No external services (databases, caches, AI APIs) are required — all AI responses are placeholders.

### Running the application

- **Dev server:** `npm run dev` (uses nodemon, auto-reloads on file changes, runs on port 3000)
- **Production start:** `npm start`
- **Environment config:** Copy `.env.example` to `.env` before first run. Defaults work for local development.

### Lint / Test / Build

- **Lint:** `npm run lint` — ESLint 8 with `eslint-config-standard`. The config file is `.eslintrc.cjs` (CommonJS required because ESLint 8 does not support ES module default exports).
- **Tests:** `npm test` — Jest with ESM support via `NODE_OPTIONS='--experimental-vm-modules'`. All tests are in `tests/`.
- **Build:** `npm run build` (runs tests first, then `scripts/build.js`).

### Gotchas

- The project uses `"type": "module"` in `package.json` (ES modules throughout). ESLint and Jest configs must use CommonJS (`.cjs`) or the `NODE_OPTIONS='--experimental-vm-modules'` flag respectively.
- The `jest` config block was removed from `package.json` to avoid conflicts with `jest.config.js`. Do not re-add it.
- Pre-existing lint warnings (`no-console`) in source files are expected and can be ignored during development.
- The `docs/CURSOR-SETUP.md` file documents Cursor Background Agent setup, not application setup.
