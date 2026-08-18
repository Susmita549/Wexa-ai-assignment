/**
 * MULTI-HOP: JOB → REQUIRES → SKILL ← RELATED_TO ← TECHNOLOGY
 *
 * What: Discovers technologies related to a job's required skills.
 * Why:  Connects job requirements to the tech stack ecosystem in one traversal.
 *       SQL would join Jobs → JobSkills → Skills → TechSkills → Technologies.
 * Hops: 2 (Job → Skill → Technology)
 * Params: $jobId (string)
 */
MATCH (j:Job {id: $jobId})-[req:REQUIRES]->(s:Skill)<-[rel:RELATED_TO]-(t:Technology)
RETURN t { .id, .name, .category } AS technology,
       collect(DISTINCT {
         skillId: s.id,
         skillName: s.name,
         importance: req.importance,
         relationStrength: rel.strength
       }) AS viaSkills,
       avg(rel.strength) AS avgStrength
ORDER BY avgStrength DESC, t.name
