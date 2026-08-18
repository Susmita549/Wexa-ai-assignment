# CognoDB Setup Guide

JobGraph connects to CognoDB using the **official Neo4j JavaScript driver** over the **Bolt protocol** with **openCypher**. No custom SDK is required — only a connection URI and credentials.

## 1. Create a CognoDB instance

1. Sign up at [CognoDB Cloud](https://cognodb.com/).
2. Open the console and create a new instance (the free **c0** tier is sufficient for this assignment).
3. Choose a region close to where you will deploy the backend.
4. Wait for provisioning to complete (typically under one minute).

## 2. Obtain connection details

After the instance is ready, CognoDB provides:

| Detail | Example | Notes |
|---|---|---|
| **Bolt URI** | `bolt+s://db-7f3a2c1e.databases.cognodb.cloud` | Must use `bolt+s://` (TLS) |
| **Username** | `cognodb` | Default CognoDB username |
| **Password** | *(shown once)* | Copy immediately — it cannot be retrieved later |

> **Important:** The password is displayed exactly once during instance creation. Store it in a password manager or your local `.env` file immediately.

## 3. Configure environment variables

From the project root:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
COGNODB_URI=bolt+s://db-your-instance.databases.cognodb.cloud
COGNODB_USERNAME=cognodb
COGNODB_PASSWORD=your-password-here
```

**Never commit `.env` to version control.** It is listed in `.gitignore`.

## 4. Verify connectivity

Start the backend:

```bash
npm run dev:backend
```

Check the health endpoint:

```bash
curl http://localhost:3001/api/health
```

**Connected:**

```json
{
  "status": "ok",
  "database": "connected"
}
```

**Unreachable or not configured:**

```json
{
  "status": "error",
  "database": "disconnected",
  "message": "Unable to connect to CognoDB"
}
```

The server continues running even when CognoDB is unreachable — only the health check reports the failure.

## 5. Apply schema and seed data

Once connectivity is confirmed:

```bash
npm run db:seed
```

## Security notes

- Credentials are read from environment variables only — never hardcoded.
- API responses and server logs do not expose URIs, usernames, or passwords.
- Use separate CognoDB instances for local development and production deployment.

## Reference

- [CognoDB Developer Docs](https://cognodb.com/docs) — Bolt, Cypher, and official Neo4j drivers
- [Neo4j JavaScript Driver](https://neo4j.com/docs/javascript-manual/current/)
