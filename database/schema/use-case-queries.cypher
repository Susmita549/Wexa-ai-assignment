// =============================================================================
// JobGraph — Use-case validation queries
// Run after seeding to confirm the model supports required traversals.
// These are reference queries; parameters use placeholder values.
// =============================================================================

// 1. Skill-based job recommendations (direct match)
// Replace $skillIds with a list of skill ID strings.
// MATCH (s:Skill) WHERE s.id IN $skillIds
// MATCH (j:Job)-[:REQUIRES]->(s)
// RETURN j, collect(DISTINCT s.name) AS matchedSkills
// ORDER BY size(matchedSkills) DESC;

// 2. Multi-hop traversal — indirect job via project technologies
// Replace $developerId with a developer ID string.
// MATCH (d:Developer {id: $developerId})-[:WORKED_ON]->(p:Project)
//       -[:USES|BUILT_WITH]->(tech:Technology)-[:RELATED_TO]->(s:Skill)<-[:REQUIRES]-(j:Job)
// RETURN j, collect(DISTINCT tech.name) AS viaTechnologies, collect(DISTINCT s.name) AS impliedSkills;

// 3. Technology discovery from a skill
// Replace $skillId with a skill ID string.
// MATCH (s:Skill {id: $skillId})<-[:RELATED_TO]-(t:Technology)
// OPTIONAL MATCH (t)<-[:USES|BUILT_WITH]-(p:Project)
// RETURN t, count(DISTINCT p) AS projectCount
// ORDER BY projectCount DESC;

// 4. Project discovery for a developer
// Replace $developerId with a developer ID string.
// MATCH (d:Developer {id: $developerId})-[wo:WORKED_ON]->(p:Project)
// RETURN p, wo.role AS role;

// 5. Company and job exploration
// Replace $companyId with a company ID string.
// MATCH (c:Company {id: $companyId})<-[:POSTED_BY]-(j:Job)-[:REQUIRES]->(s:Skill)
// RETURN c, j, collect(DISTINCT s.name) AS requiredSkills;

// 6. Relationship exploration — shortest path between developer and job
// Replace $developerId and $jobId with ID strings.
// MATCH (d:Developer {id: $developerId}), (j:Job {id: $jobId})
// MATCH path = shortestPath(
//   (d)-[:HAS_SKILL|WORKED_ON|USES|BUILT_WITH|RELATED_TO|REQUIRES|POSTED_BY*..10]-(j)
// )
// RETURN path, length(path) AS hops;
