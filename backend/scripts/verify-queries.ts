import dotenv from "dotenv";
import path from "path";
import { loadEnv } from "../src/config/env";
import { initNeo4j, closeDriver, verifyConnectivity } from "../src/db/neo4j";
import { graphQueries } from "../src/queries/graph.queries";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

interface VerifyCase {
  name: string;
  run: () => Promise<unknown[]>;
  minRows?: number;
}

function logSection(title: string): void {
  console.log(`\n${"=".repeat(60)}`);
  console.log(title);
  console.log("=".repeat(60));
}

function logResult(label: string, rows: unknown[]): void {
  console.log(`\n${label} (${rows.length} rows)`);
  console.log(JSON.stringify(rows.slice(0, 3), null, 2));
  if (rows.length > 3) console.log(`  ... and ${rows.length -  3} more`);
}

async function main(): Promise<void> {
  const config = loadEnv();
  initNeo4j(config);

  const connectivity = await verifyConnectivity();
  if (!connectivity.connected) {
    console.error("Cannot verify queries — CognoDB not connected:", connectivity.message);
    console.error("\nTroubleshooting:");
    console.error("  • Confirm your CognoDB instance is Running at https://console.cognodb.com");
    console.error("  • COGNODB_URI must use bolt+s:// (copy exactly from the console)");
    console.error("  • After connectivity works, run: npm run db:seed");
    process.exit(1);
  }

  console.log("Connected to CognoDB. Running query verification...\n");

  const cases: VerifyCase[] = [
    {
      name: "1. Get all jobs",
      run: () => graphQueries.getAllJobs(),
      minRows: 10,
    },
    {
      name: "2. Get job by ID",
      run: () => graphQueries.getJobById("job-graph-engineer-wexa"),
      minRows: 1,
    },
    {
      name: "3. Get all skills",
      run: () => graphQueries.getAllSkills(),
      minRows: 20,
    },
    {
      name: "4. Get all companies",
      run: () => graphQueries.getAllCompanies(),
      minRows: 5,
    },
    {
      name: "5. Get all technologies",
      run: () => graphQueries.getAllTechnologies(),
      minRows: 15,
    },
    {
      name: "6. Get skills required by a job",
      run: () => graphQueries.getJobSkills("job-graph-engineer-wexa"),
      minRows: 3,
    },
    {
      name: "7. Get jobs requiring a specific skill",
      run: () => graphQueries.getJobsBySkill("skill-react-dev"),
      minRows: 3,
    },
    {
      name: "8. Find jobs matching multiple skills",
      run: () =>
        graphQueries.getJobsByMultipleSkills([
          "skill-typescript",
          "skill-react-dev",
          "skill-node-backend",
        ]),
      minRows: 3,
    },
    {
      name: "9. Multi-hop: Developer → HAS_SKILL → Skill ← REQUIRES ← Job",
      run: () => graphQueries.developerSkillsToJobs("dev-alice-chen"),
      minRows: 3,
    },
    {
      name: "10. Multi-hop: Job → REQUIRES → Skill ← RELATED_TO ← Technology",
      run: () => graphQueries.jobSkillsToTechnologies("job-graph-engineer-wexa"),
      minRows: 2,
    },
    {
      name: "11. Multi-hop: Developer → Project → Technology → Skill",
      run: () => graphQueries.developerProjectToSkills("dev-isabel-torres"),
      minRows: 5,
    },
    {
      name: "12. Graph exploration around a node",
      run: () => graphQueries.exploreNodeNeighborhood("skill-graph-db", "Skill"),
      minRows: 1,
    },
    {
      name: "13. Job recommendations by skill match percentage",
      run: () =>
        graphQueries.recommendJobsBySkills([
          "skill-typescript",
          "skill-react-dev",
          "skill-graph-db",
        ]),
      minRows: 3,
    },
  ];

  let passed = 0;
  let failed = 0;

  for (const testCase of cases) {
    try {
      const rows = await testCase.run();
      const minRows = testCase.minRows ?? 1;

      if (rows.length < minRows) {
        console.error(`✗ ${testCase.name} — expected ≥${minRows} rows, got ${rows.length}`);
        failed++;
        continue;
      }

      console.log(`✓ ${testCase.name} — ${rows.length} rows`);
      passed++;

      if (["2", "8", "9", "10", "11", "12", "13"].some((n) => testCase.name.startsWith(n))) {
        logResult(testCase.name, rows);
      }
    } catch (error) {
      console.error(`✗ ${testCase.name} —`, error instanceof Error ? error.message : error);
      failed++;
    }
  }

  logSection(`Results: ${passed} passed, ${failed} failed`);

  await closeDriver();
  process.exit(failed > 0 ? 1 : 0);
}

main().catch(async (error) => {
  console.error("Verification failed:", error);
  await closeDriver();
  process.exit(1);
});
