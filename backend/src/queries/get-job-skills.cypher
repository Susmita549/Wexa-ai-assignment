/**
 * GET SKILLS REQUIRED BY A JOB
 *
 * What: Returns all skills a specific job requires with requirement metadata.
 * Hops: 1 (Job → REQUIRES → Skill)
 * Params: $jobId (string)
 */
MATCH (j:Job {id: $jobId})-[req:REQUIRES]->(s:Skill)
RETURN s { .id, .name, .category } AS skill,
       req.importance AS importance,
       req.minLevel AS minLevel
ORDER BY req.importance, s.name
