/**
 * MULTI-HOP: DEVELOPER → HAS_SKILL → SKILL ← REQUIRES ← JOB
 * (Equivalent to Developer → HAS_SKILL → Skill → REQUIRED_BY → Job)
 *
 * What: Finds jobs whose required skills overlap with a developer's profile.
 * Why:  Traverses the developer-to-job bridge through shared skills in one readable path.
 *       In SQL this needs DeveloperSkills JOIN Skills JOIN JobRequirements JOIN Jobs.
 * Hops: 2 (Developer → Skill → Job)
 * Params: $developerId (string)
 */
MATCH (d:Developer {id: $developerId})-[hs:HAS_SKILL]->(s:Skill)<-[req:REQUIRES]-(j:Job)
OPTIONAL MATCH (j)-[:POSTED_BY]->(c:Company)
RETURN j { .id, .title, .description, .location, .experienceLevel, .employmentType } AS job,
       c { .id, .name } AS company,
       collect(DISTINCT {
         skillId: s.id,
         skillName: s.name,
         developerLevel: hs.level,
         requiredMinLevel: req.minLevel,
         importance: req.importance
       }) AS skillMatches,
       count(DISTINCT s) AS matchingSkillCount
ORDER BY matchingSkillCount DESC, j.title
