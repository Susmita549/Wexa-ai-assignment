# Backend Cypher Queries

All queries live as `.cypher` files in this directory and are loaded at runtime via `loader.ts`.

**Rules:**
- Every query uses `$parameter` placeholders — never string concatenation
- Block comments document purpose, hops, and parameters
- Execute via `graphQueries` from `index.ts`

## Query index

| File | Hops | Parameters | Purpose |
|---|---|---|---|
| `get-all-jobs.cypher` | 1 | — | List all jobs with company |
| `get-job-by-id.cypher` | 1 | `$jobId` | Job detail + company + skills |
| `get-all-skills.cypher` | 1 | — | All skills with counts |
| `get-all-companies.cypher` | 1 | — | All companies with job counts |
| `get-all-technologies.cypher` | 1 | — | All technologies with counts |
| `get-job-skills.cypher` | 1 | `$jobId` | Skills required by a job |
| `get-jobs-by-skill.cypher` | 1 | `$skillId` | Jobs requiring one skill |
| `get-jobs-by-multiple-skills.cypher` | 1 | `$skillIds` | Jobs matching any selected skills |
| `developer-skills-to-jobs.cypher` | 2 | `$developerId` | Developer profile → matching jobs |
| `job-skills-to-technologies.cypher` | 2 | `$jobId` | Job requirements → related technologies |
| `developer-project-to-skills.cypher` | 4 | `$developerId` | Project experience → inferred skills |
| `explore-node-neighborhood.cypher` | 1 | `$nodeId`, `$nodeLabel` | 1-hop graph exploration |
| `recommend-jobs-by-skills.cypher` | 1 | `$skillIds` | Ranked job recommendations |

## Verify

```bash
npm run verify:queries
```

Runs all queries against live CognoDB seed data and checks row counts.

## SQL comparison note

Query **#11** (`developer-project-to-skills.cypher`) is the best example of graph advantage:

> Developer → WORKED_ON → Project → USES → Technology → RELATED_TO → Skill

In SQL this chains across `developer_projects`, `project_technologies`, and `technology_skills` bridge tables — doable with multiple JOINs, but the query grows with each hop and obscures the relationship path. Cypher keeps the focus on connections.
