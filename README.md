# roomworkingAi

AI conversation workspace — Cloud Agents, Cursor tools, and cookies-based API setup.

## Cursor Cloud Agent

Background agent runs on this repository via [cursor-background-agent-api](https://github.com/mjdierkes/cursor-background-agent-api).

| Field | Value |
|-------|--------|
| Repository | [plugdata/roomworkingAi](https://github.com/plugdata/roomworkingAi) |
| Latest agent ID | `bc-15b58c64-ec70-40e5-86dd-703f6e109112` |
| Status | Creating / running in [Cursor Dashboard](https://cursor.com/dashboard) → Cloud Agents |

### Create another agent (CLI)

```powershell
cd path\to\cursor-background-agent-api
# Token: WorkosCursorSessionToken in cookies.json (see SETUP-TOKEN.md)

node dist/cli.js create -d "your task here" -r "https://github.com/plugdata/roomworkingAi.git" -f json
```

### Requirements

- Cursor **Privacy Mode** (not Legacy) — Cloud Agents need code storage
- GitHub connected in Cursor Dashboard with access to `plugdata/roomworkingAi`
- Session token: `WorkosCursorSessionToken` from cursor.com cookies

## Project goals

- Cloud AI workflows for team “room working”
- Integrate Cursor Background Composer with GitHub
- Document tools, cookies, and API usage in this repo

## Links

- [Cursor Dashboard](https://cursor.com/dashboard)
- [plugdata repositories](https://github.com/plugdata?tab=repositories)
