/**
 * GET JOBS REQUIRING A SPECIFIC SKILL
 *
 * What: Finds all jobs that require a given skill.
 * Hops: 1 (Job → REQUIRES → Skill)
 * Params: $skillId (string)
 */
MATCH (j:Job)-[req:REQUIRES]->(s:Skill {id: $skillId})
OPTIONAL MATCH (j)-[:POSTED_BY]->(c:Company)
RETURN j { .id, .title, .description, .location, .experienceLevel, .employmentType } AS job,
       c { .id, .name } AS company,
       req.importance AS importance,
       req.minLevel AS minLevel
ORDER BY j.title
