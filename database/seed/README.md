# JobGraph Seed Data

Realistic, connected graph data for demonstrating JobGraph traversals.

## Run

From the project root:

```bash
npm run db:seed
```

Or from the `database` workspace:

```bash
npm run db:seed -w database
```

## Requirements

- `.env` at project root with valid CognoDB credentials
- See [docs/cognodb-setup.md](../../docs/cognodb-setup.md)

## Behaviour

1. Applies schema constraints and indexes (`database/schema/`)
2. Upserts all nodes via parameterized `MERGE` (idempotent)
3. Upserts all relationships via parameterized `MERGE`
4. Runs verification queries to confirm traversals

Safe to run multiple times — duplicate nodes and relationships are not created.

## Dataset summary

| Entity | Count |
|---|---|
| Developers | 10 |
| Skills | 25 |
| Jobs | 12 |
| Companies | 6 |
| Projects | 10 |
| Technologies | 18 |

## Key demo paths

- **Direct match:** React Development skill → 4 matching jobs
- **Multi-hop:** Isabel Torres → JobGraph Explorer → Neo4j → Graph Databases → Graph Database Engineer
- **Technology discovery:** Graph Databases skill → Neo4j, Cypher
- **Company view:** Wexa AI → 3 open jobs with skill requirements
- **Shortest path:** Isabel Torres → Graph Database Engineer (4 hops)

## Files

| File | Purpose |
|---|---|
| `data.ts` | All seed entities and relationships |
| `seed.ts` | Main seed script |
| `verify.ts` | Post-seed traversal verification |
