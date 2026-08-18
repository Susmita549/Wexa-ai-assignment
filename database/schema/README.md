# JobGraph Graph Data Model

This document defines the CognoDB graph schema for JobGraph. Apply constraints and indexes with:

```bash
npm run db:seed
```

## Node labels and properties

### Developer
Represents a person whose skills and project history drive recommendations.

| Property | Type | Description |
|---|---|---|
| `id` | string | Stable unique ID (e.g. `dev-alice-chen`) |
| `name` | string | Full name |
| `title` | string | Current role title |
| `experienceYears` | integer | Years of professional experience |
| `location` | string | City or region |

### Skill
Represents an abstract capability used to match developers and jobs.

| Property | Type | Description |
|---|---|---|
| `id` | string | Stable unique ID (e.g. `skill-graph-databases`) |
| `name` | string | Skill name |
| `category` | string | Grouping: `Language`, `Domain`, `Framework`, `Cloud`, `Soft` |

### Job
Represents an open role — the primary discovery target.

| Property | Type | Description |
|---|---|---|
| `id` | string | Stable unique ID (e.g. `job-backend-engineer-wexa`) |
| `title` | string | Job title |
| `description` | string | Short role description |
| `location` | string | City, region, or `Remote` |
| `experienceLevel` | string | e.g. `Junior`, `Mid`, `Senior`, `Lead` |
| `employmentType` | string | e.g. `Full-time`, `Contract`, `Part-time` |

### Company
Represents an organization that posts jobs.

| Property | Type | Description |
|---|---|---|
| `id` | string | Stable unique ID (e.g. `co-wexa-ai`) |
| `name` | string | Company name |
| `industry` | string | Industry sector |
| `location` | string | Headquarters or primary location |

### Project
Represents work from a developer's portfolio or experience.

| Property | Type | Description |
|---|---|---|
| `id` | string | Stable unique ID (e.g. `proj-api-gateway`) |
| `name` | string | Project name |
| `description` | string | One-line summary |
| `domain` | string | Problem domain (e.g. `FinTech`, `DevTools`, `Healthcare`) |

### Technology
Represents a concrete tool, framework, language, or platform.

| Property | Type | Description |
|---|---|---|
| `id` | string | Stable unique ID (e.g. `tech-neo4j`) |
| `name` | string | Technology name |
| `category` | string | e.g. `Database`, `Framework`, `Language`, `Tool`, `Platform` |

## Relationships

All relationships are **directed**. Properties are optional unless noted.

| Relationship | Pattern | Properties | Meaning |
|---|---|---|---|
| `HAS_SKILL` | `(Developer)-[:HAS_SKILL]->(Skill)` | `level` (1–5) | Developer possesses a skill |
| `WORKED_ON` | `(Developer)-[:WORKED_ON]->(Project)` | `role` (string) | Developer contributed to a project |
| `USES` | `(Project)-[:USES]->(Technology)` | — | Project uses a technology (supporting/auxiliary) |
| `BUILT_WITH` | `(Project)-[:BUILT_WITH]->(Technology)` | — | Project was primarily built with a technology (core stack) |
| `RELATED_TO` | `(Technology)-[:RELATED_TO]->(Skill)` | `strength` (0.0–1.0) | Technology implies or relates to a skill |
| `REQUIRES` | `(Job)-[:REQUIRES]->(Skill)` | `importance` (`required` / `preferred`), `minLevel` (1–5) | Job requires a skill |
| `POSTED_BY` | `(Job)-[:POSTED_BY]->(Company)` | `postedDate` (date/string) | Job was posted by a company |

### USES vs BUILT_WITH

Both connect projects to technologies with different semantics:

- **BUILT_WITH** — core stack technologies the project was architected around (e.g. React, Node.js).
- **USES** — additional technologies leveraged during the project (e.g. Docker, Redis).

This distinction supports richer traversal queries without adding extra node types.

## Graph diagram

See [docs/graph-model.md](../docs/graph-model.md) for the Mermaid diagram included in the README.

## Supported use cases

| Use case | Graph path |
|---|---|
| Skill-based job recommendations | `Skill ← REQUIRES ← Job` |
| Multi-hop traversal | `Developer → WORKED_ON → Project → USES/BUILT_WITH → Technology → RELATED_TO → Skill ← REQUIRES ← Job` |
| Technology discovery | `Skill ← RELATED_TO ← Technology ← USES/BUILT_WITH ← Project` |
| Project discovery | `Developer → WORKED_ON → Project` |
| Company/job exploration | `Company ← POSTED_BY ← Job` and `Job → REQUIRES → Skill` |
| Relationship exploration | `shortestPath` across all relationship types |

Validation queries are in `use-case-queries.cypher`.
