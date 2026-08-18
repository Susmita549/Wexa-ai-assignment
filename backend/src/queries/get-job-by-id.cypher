/**
 * GET JOB BY ID
 *
 * What: Returns one job, its company, and all required skills.
 * Why:  One graph pattern assembles job + company + skills that would be 3 SQL joins.
 * Hops: 1 (Job → POSTED_BY → Company, Job → REQUIRES → Skill)
 * Params: $jobId (string)
 */
MATCH (j:Job {id: $jobId})
OPTIONAL MATCH (j)-[:POSTED_BY]->(c:Company)
OPTIONAL MATCH (j)-[req:REQUIRES]->(s:Skill)
RETURN j {
  .id, .title, .description, .location, .experienceLevel, .employmentType
} AS job,
c { .id, .name, .industry, .location } AS company,
collect(DISTINCT {
  id: s.id,
  name: s.name,
  category: s.category,
  importance: req.importance,
  minLevel: req.minLevel
}) AS requiredSkills
