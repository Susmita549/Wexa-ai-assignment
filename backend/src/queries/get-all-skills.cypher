/**
 * GET ALL SKILLS
 *
 * What: Returns all skills with counts of related jobs and technologies.
 * Why:  Aggregating relationship counts in one pass avoids N+1 lookups per skill.
 * Hops: 1 (Skill ← REQUIRES ← Job, Skill ← RELATED_TO ← Technology)
 * Params: none
 */
MATCH (s:Skill)
OPTIONAL MATCH (s)<-[:REQUIRES]-(j:Job)
OPTIONAL MATCH (s)<-[:RELATED_TO]-(t:Technology)
RETURN s { .id, .name, .category } AS skill,
       count(DISTINCT j) AS jobCount,
       count(DISTINCT t) AS technologyCount
ORDER BY s.category, s.name
