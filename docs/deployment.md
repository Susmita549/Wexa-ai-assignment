# Deployment Guide

## Production URLs

| Service | URL |
|---|---|
| **Backend API (Render)** | https://wexa-ai-assignment-ma1t.onrender.com |
| **Health check** | https://wexa-ai-assignment-ma1t.onrender.com/api/health |
| **Frontend (Netlify)** | _Set after Netlify deploy — update README section 14_ |

Database seed status: **complete** (12 jobs, 25 skills verified via production API).

---

## Render (backend)

Same monorepo — no separate repository required.

| Setting | Value |
|---|---|
| Root Directory | *(empty — repo root)* |
| Build Command | `npm install --include=dev && npm run build -w backend` |
| Start Command | `npm run start -w backend` |

**Environment variables on Render:**

```env
COGNODB_URI=bolt+s://your-instance.databases.cognodb.cloud
COGNODB_USERNAME=cognodb
COGNODB_PASSWORD=your-password
NODE_ENV=production
CORS_ORIGIN=https://your-app.netlify.app
```

Set `CORS_ORIGIN` to your exact Netlify frontend URL after frontend deploy.

---

## Netlify (frontend)

`netlify.toml` at the repo root configures the build and sets:

```env
NEXT_PUBLIC_API_URL=https://wexa-ai-assignment-ma1t.onrender.com
```

Manual override: Netlify dashboard → **Site settings → Environment variables** → same key/value.

| Setting | Value |
|---|---|
| Build command | `npm install --include=dev && npm run build -w frontend` |
| Node version | 20 |

---

## Seeding CognoDB

Run once from your machine (or when data changes):

```bash
cp .env.example .env
# Edit .env with CognoDB credentials
npm install
npm run db:seed
```

The production Render instance uses the same CognoDB credentials configured in Render env vars.

Verify production data:

```bash
curl https://wexa-ai-assignment-ma1t.onrender.com/api/health
curl https://wexa-ai-assignment-ma1t.onrender.com/api/jobs
```
