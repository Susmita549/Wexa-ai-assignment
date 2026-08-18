/**
 * GET RELATED ENTITIES FOR A SKILL
 *
 * What: Returns technologies and jobs connected to a skill.
 * Hops: 1 (Skill ← RELATED_TO ← Technology, Skill ← REQUIRES ← Job)
 * Params: $skillId (string)
 */
MATCH (s:Skill {id: $skillId})
OPTIONAL MATCH (s)<-[:RELATED_TO]-(t:Technology)
OPTIONAL MATCH (s)<-[:REQUIRES]-(j:Job)
OPTIONAL MATCH (j)-[:POSTED_BY]->(c:Company)
RETURN s { .id, .name, .category } AS skill,
       collect(DISTINCT t { .id, .name, .category }) AS technologies,
       collect(DISTINCT {
         job: j { .id, .title, .location, .experienceLevel, .employmentType },
         company: c { .id, .name }
       }) AS jobs
