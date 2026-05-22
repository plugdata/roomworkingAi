# Cursor Background Agent setup

## 1. Privacy

Dashboard → Privacy Settings → **Privacy Mode** (not Legacy).

## 2. GitHub

Dashboard → Integrations → **GitHub** → Manage → allow access to `plugdata/roomworkingAi`.

## 3. Session token

1. Log in at [cursor.com](https://cursor.com)
2. DevTools → Application → Cookies → `WorkosCursorSessionToken`
3. Save to `cookies.json` in [cursor-background-agent-api](https://github.com/mjdierkes/cursor-background-agent-api) (do not commit)

## 4. Create agent on this repo

```powershell
node dist/cli.js create -d "สวัสดี cursor test tools and cookies" `
  -r "https://github.com/plugdata/roomworkingAi.git" -f json
```

## 5. List agents

```powershell
node dist/cli.js list -f json
```

## Troubleshooting

| Error | Fix |
|-------|-----|
| 401 + `ERROR_GITHUB_USER_NO_ACCESS` | Re-authorize GitHub; grant repo access |
| Privacy Legacy | Switch to Privacy Mode |
| Invalid Cookie header | Use full token, not placeholder `token_ของคุณ` |
