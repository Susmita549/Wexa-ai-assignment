import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import neo4j, { Session } from "neo4j-driver";
import {
  builtWithRels,
  companies,
  developers,
  hasSkillRels,
  jobs,
  projects,
  relatedToRels,
  requiresRels,
  skills,
  technologies,
  usesRels,
  workedOnRels,
} from "./data";
import { verifyTraversals } from "./verify";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const SCHEMA_DIR = path.resolve(__dirname, "../schema");

function getDriver() {
  const uri = process.env.COGNODB_URI;
  const username = process.env.COGNODB_USERNAME ?? "cognodb";
  const password = process.env.COGNODB_PASSWORD;

  if (!uri || !password) {
    throw new Error(
      "Missing COGNODB_URI or COGNODB_PASSWORD. Copy .env.example to .env and configure credentials."
    );
  }

  return neo4j.driver(uri, neo4j.auth.basic(username, password));
}

async function runCypherFile(session: Session, filePath: string): Promise<void> {
  const content = fs.readFileSync(filePath, "utf-8");
  const statements = content
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith("//"));

  for (const statement of statements) {
    await session.run(statement);
  }
}

async function applySchema(session: Session): Promise<void> {
  const files = ["constraints.cypher", "indexes.cypher"];

  for (const file of files) {
    const filePath = path.join(SCHEMA_DIR, file);
    console.log(`Applying schema: ${file}`);
    await runCypherFile(session, filePath);
  }
}

async function seedNodes(session: Session): Promise<void> {
  console.log("Seeding nodes...");

  await session.run(
    `
    UNWIND $rows AS row
    MERGE (d:Developer {id: row.id})
    SET d.name = row.name,
        d.title = row.title,
        d.experienceYears = row.experienceYears,
        d.location = row.location
    `,
    { rows: developers }
  );

  await session.run(
    `
    UNWIND $rows AS row
    MERGE (s:Skill {id: row.id})
    SET s.name = row.name, s.category = row.category
    `,
    { rows: skills }
  );

  await session.run(
    `
    UNWIND $rows AS row
    MERGE (c:Company {id: row.id})
    SET c.name = row.name, c.industry = row.industry, c.location = row.location
    `,
    { rows: companies }
  );

  await session.run(
    `
    UNWIND $rows AS row
    MERGE (p:Project {id: row.id})
    SET p.name = row.name, p.description = row.description, p.domain = row.domain
    `,
    { rows: projects }
  );

  await session.run(
    `
    UNWIND $rows AS row
    MERGE (t:Technology {id: row.id})
    SET t.name = row.name, t.category = row.category
    `,
    { rows: technologies }
  );

  await session.run(
    `
    UNWIND $rows AS row
    MERGE (j:Job {id: row.id})
    SET j.title = row.title,
        j.description = row.description,
        j.location = row.location,
        j.experienceLevel = row.experienceLevel,
        j.employmentType = row.employmentType
    `,
    { rows: jobs }
  );

  console.log(
    `  ${developers.length} developers, ${skills.length} skills, ${companies.length} companies,`,
    `${projects.length} projects, ${technologies.length} technologies, ${jobs.length} jobs`
  );
}

async function seedRelationships(session: Session): Promise<void> {
  console.log("Seeding relationships...");

  await session.run(
    `
    UNWIND $rows AS row
    MATCH (d:Developer {id: row.developerId})
    MATCH (s:Skill {id: row.skillId})
    MERGE (d)-[r:HAS_SKILL]->(s)
    SET r.level = row.level
    `,
    { rows: hasSkillRels }
  );

  await session.run(
    `
    UNWIND $rows AS row
    MATCH (d:Developer {id: row.developerId})
    MATCH (p:Project {id: row.projectId})
    MERGE (d)-[r:WORKED_ON]->(p)
    SET r.role = row.role
    `,
    { rows: workedOnRels }
  );

  await session.run(
    `
    UNWIND $rows AS row
    MATCH (p:Project {id: row.projectId})
    MATCH (t:Technology {id: row.technologyId})
    MERGE (p)-[:BUILT_WITH]->(t)
    `,
    { rows: builtWithRels }
  );

  await session.run(
    `
    UNWIND $rows AS row
    MATCH (p:Project {id: row.projectId})
    MATCH (t:Technology {id: row.technologyId})
    MERGE (p)-[:USES]->(t)
    `,
    { rows: usesRels }
  );

  await session.run(
    `
    UNWIND $rows AS row
    MATCH (t:Technology {id: row.technologyId})
    MATCH (s:Skill {id: row.skillId})
    MERGE (t)-[r:RELATED_TO]->(s)
    SET r.strength = row.strength
    `,
    { rows: relatedToRels }
  );

  await session.run(
    `
    UNWIND $rows AS row
    MATCH (j:Job {id: row.jobId})
    MATCH (s:Skill {id: row.skillId})
    MERGE (j)-[r:REQUIRES]->(s)
    SET r.importance = row.importance, r.minLevel = row.minLevel
    `,
    { rows: requiresRels }
  );

  await session.run(
    `
    UNWIND $rows AS row
    MATCH (j:Job {id: row.id})
    MATCH (c:Company {id: row.companyId})
    MERGE (j)-[r:POSTED_BY]->(c)
    SET r.postedDate = row.postedDate
    `,
    { rows: jobs }
  );

  console.log(
    `  ${hasSkillRels.length} HAS_SKILL, ${workedOnRels.length} WORKED_ON,`,
    `${builtWithRels.length} BUILT_WITH, ${usesRels.length} USES,`,
    `${relatedToRels.length} RELATED_TO, ${requiresRels.length} REQUIRES,`,
    `${jobs.length} POSTED_BY`
  );
}

async function seed(): Promise<void> {
  const driver = getDriver();
  const session = driver.session();

  try {
    await driver.verifyConnectivity();
    console.log("Connected to CognoDB\n");

    await applySchema(session);
    console.log("");
    await seedNodes(session);
    await seedRelationships(session);

    await verifyTraversals(session);
  } finally {
    await session.close();
    await driver.close();
  }
}

seed().catch((error) => {
  console.error("Seed failed:", error.message ?? error);
  process.exit(1);
});
