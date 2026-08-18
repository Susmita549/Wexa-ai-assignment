import type { Session } from "neo4j-driver";

export async function verifyTraversals(session: Session): Promise<void> {
  console.log("\n--- Verifying graph traversals ---\n");

  // Node counts
  const counts = await session.run(`
    MATCH (d:Developer) WITH count(d) AS developers
    MATCH (s:Skill) WITH developers, count(s) AS skills
    MATCH (j:Job) WITH developers, skills, count(j) AS jobs
    MATCH (c:Company) WITH developers, skills, jobs, count(c) AS companies
    MATCH (p:Project) WITH developers, skills, jobs, companies, count(p) AS projects
    MATCH (t:Technology)
    RETURN developers, skills, jobs, companies, projects, count(t) AS technologies
  `);
  const c = counts.records[0];
  console.log("Node counts:");
  console.log(`  Developers:   ${c.get("developers")}`);
  console.log(`  Skills:       ${c.get("skills")}`);
  console.log(`  Jobs:         ${c.get("jobs")}`);
  console.log(`  Companies:    ${c.get("companies")}`);
  console.log(`  Projects:     ${c.get("projects")}`);
  console.log(`  Technologies: ${c.get("technologies")}`);

  // 1. Skill-based job recommendations (direct)
  const directMatch = await session.run(
    `
    MATCH (s:Skill {id: $skillId})<-[:REQUIRES]-(j:Job)
    RETURN j.title AS job, j.id AS jobId
    ORDER BY j.title
    `,
    { skillId: "skill-react-dev" }
  );
  console.log("\n1. Direct job match (React Development skill):");
  directMatch.records.forEach((r) =>
    console.log(`   • ${r.get("job")} (${r.get("jobId")})`)
  );

  // 2. Multi-hop — Isabel → JobGraph → Neo4j → Graph Databases → Graph Engineer job
  const graphPath = await session.run(
    `
    MATCH (d:Developer {id: $developerId})-[:WORKED_ON]->(p:Project {id: 'proj-jobgraph'})
          -[:USES|BUILT_WITH]->(tech:Technology)-[:RELATED_TO]->(s:Skill)<-[:REQUIRES]-(j:Job)
    RETURN j.title AS job, p.name AS project, tech.name AS technology, s.name AS skill
    ORDER BY j.title, tech.name
    `,
    { developerId: "dev-isabel-torres" }
  );
  console.log("\n2. Multi-hop via JobGraph project (Isabel Torres → Neo4j → skills → jobs):");
  graphPath.records.forEach((r) =>
    console.log(
      `   • ${r.get("job")} ← ${r.get("skill")} ← ${r.get("technology")} ← ${r.get("project")}`
    )
  );

  // 2b. Broader multi-hop — all jobs reachable through project technologies
  const multiHop = await session.run(
    `
    MATCH (d:Developer {id: $developerId})-[:WORKED_ON]->(:Project)
          -[:USES|BUILT_WITH]->(tech:Technology)-[:RELATED_TO]->(s:Skill)<-[:REQUIRES]-(j:Job)
    RETURN j.title AS job,
           count(DISTINCT tech) AS techCount,
           collect(DISTINCT tech.name)[..4] AS viaTechnologies,
           collect(DISTINCT s.name)[..4] AS impliedSkills
    ORDER BY techCount DESC
    LIMIT 5
    `,
    { developerId: "dev-isabel-torres" }
  );
  console.log("\n2b. Top multi-hop job matches for Isabel Torres (via project technologies):");
  multiHop.records.forEach((r) =>
    console.log(
      `   • ${r.get("job")} — ${r.get("techCount")} tech paths via [${r.get("viaTechnologies").join(", ")}]`
    )
  );

  // 3. Technology discovery from skill
  const techDiscovery = await session.run(
    `
    MATCH (s:Skill {id: $skillId})<-[:RELATED_TO]-(t:Technology)
    RETURN t.name AS technology ORDER BY t.name
    `,
    { skillId: "skill-graph-db" }
  );
  console.log("\n3. Technologies related to Graph Databases skill:");
  techDiscovery.records.forEach((r) =>
    console.log(`   • ${r.get("technology")}`)
  );

  // 4. Project discovery for developer
  const projects = await session.run(
    `
    MATCH (d:Developer {id: $developerId})-[wo:WORKED_ON]->(p:Project)
    RETURN p.name AS project, wo.role AS role ORDER BY p.name
    `,
    { developerId: "dev-alice-chen" }
  );
  console.log("\n4. Projects for Alice Chen:");
  projects.records.forEach((r) =>
    console.log(`   • ${r.get("project")} (${r.get("role")})`)
  );

  // 5. Company/job exploration
  const companyJobs = await session.run(
    `
    MATCH (c:Company {id: $companyId})<-[:POSTED_BY]-(j:Job)-[:REQUIRES]->(s:Skill)
    RETURN j.title AS job, collect(DISTINCT s.name) AS skills
    ORDER BY j.title
    `,
    { companyId: "co-wexa-ai" }
  );
  console.log("\n5. Jobs at Wexa AI:");
  companyJobs.records.forEach((r) =>
    console.log(`   • ${r.get("job")} — requires: [${r.get("skills").join(", ")}]`)
  );

  // 6. Shortest path — Isabel → Graph Database Engineer job
  const pathResult = await session.run(
    `
    MATCH (d:Developer {id: $developerId}), (j:Job {id: $jobId})
    MATCH path = shortestPath(
      (d)-[:HAS_SKILL|WORKED_ON|USES|BUILT_WITH|RELATED_TO|REQUIRES|POSTED_BY*..12]-(j)
    )
    RETURN [n IN nodes(path) | coalesce(n.name, n.title)] AS pathNodes, length(path) AS hops
    `,
    { developerId: "dev-isabel-torres", jobId: "job-graph-engineer-wexa" }
  );
  console.log("\n6. Shortest path: Isabel Torres → Graph Database Engineer @ Wexa:");
  if (pathResult.records.length > 0) {
    const r = pathResult.records[0];
    console.log(`   Path (${r.get("hops")} hops): ${r.get("pathNodes").join(" → ")}`);
  } else {
    console.log("   No path found");
  }

  // Relationship counts
  const relCounts = await session.run(`
    MATCH ()-[r:HAS_SKILL]->() WITH count(r) AS hasSkill
    MATCH ()-[r:WORKED_ON]->() WITH hasSkill, count(r) AS workedOn
    MATCH ()-[r:USES]->() WITH hasSkill, workedOn, count(r) AS uses
    MATCH ()-[r:BUILT_WITH]->() WITH hasSkill, workedOn, uses, count(r) AS builtWith
    MATCH ()-[r:RELATED_TO]->() WITH hasSkill, workedOn, uses, builtWith, count(r) AS relatedTo
    MATCH ()-[r:REQUIRES]->() WITH hasSkill, workedOn, uses, builtWith, relatedTo, count(r) AS requires
    MATCH ()-[r:POSTED_BY]->()
    RETURN hasSkill, workedOn, uses, builtWith, relatedTo, requires, count(r) AS postedBy
  `);
  const rc = relCounts.records[0];
  console.log("\nRelationship counts:");
  console.log(`  HAS_SKILL:  ${rc.get("hasSkill")}`);
  console.log(`  WORKED_ON:  ${rc.get("workedOn")}`);
  console.log(`  USES:       ${rc.get("uses")}`);
  console.log(`  BUILT_WITH: ${rc.get("builtWith")}`);
  console.log(`  RELATED_TO: ${rc.get("relatedTo")}`);
  console.log(`  REQUIRES:   ${rc.get("requires")}`);
  console.log(`  POSTED_BY:  ${rc.get("postedBy")}`);

  console.log("\n--- Verification complete ---\n");
}
