# SplitSync

Expense-splitting PWA for roommates. Monorepo: ASP.NET Core API (`server`) + React/Vite/TS client (`client`).

## Prerequisites

- .NET 10 SDK
- Node 22+ with pnpm

## Run

```bash
# terminal 1 — API (http://localhost:5085)
cd server
dotnet run

# terminal 2 — client (http://localhost:5173)
cd client
pnpm dev
```

The client dev server proxies `/api/*` to the API (see `client/vite.config.ts`), so fetch calls from React can just hit `/api/...` with no CORS setup needed.

Check the wire-up: visit `http://localhost:5173`, then hit `http://localhost:5085/api/health` directly, or add a fetch to `/api/health` in the client and confirm `{ "status": "ok" }` comes back through the proxy.

## Structure

```
server/   ASP.NET Core Web API (controllers)
client/   React + TypeScript (Vite)
```
