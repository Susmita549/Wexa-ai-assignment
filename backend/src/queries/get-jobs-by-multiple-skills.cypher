/**
 * FIND JOBS MATCHING MULTIPLE USER SKILLS
 *
 * What: Returns jobs that require any of the selected skills, ranked by match count.
 * Why:  Matching across a skill set is a single pattern; SQL needs repeated joins or IN subqueries.
 * Hops: 1 (Job → REQUIRES → Skill)
 * Params: $skillIds (list of skill ID strings)
 */
MATCH (s:Skill)
WHERE s.id IN $skillIds
MATCH (j:Job)-[req:REQUIRES]->(s)
OPTIONAL MATCH (j)-[:POSTED_BY]->(c:Company)
WITH j, c, collect(DISTINCT { id: s.id, name: s.name, importance: req.importance }) AS matchedSkills,
     count(DISTINCT s) AS matchCount
RETURN j { .id, .title, .description, .location, .experienceLevel, .employmentType } AS job,
       c { .id, .name } AS company,
       matchedSkills,
       matchCount
ORDER BY matchCount DESC, j.title
