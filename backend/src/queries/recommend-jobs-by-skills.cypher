/**
 * JOB RECOMMENDATIONS: RANK BY MATCHING SKILL COUNT AND PERCENTAGE
 *
 * What: Ranks jobs by how well they match a user's selected skills.
 * Why:  One traversal finds all skill overlaps; ranking happens on the result set.
 *       Expresses "find jobs connected to these skills, score by overlap" naturally.
 * Hops: 1 (Skill ← REQUIRES ← Job), aggregated across the skill set
 * Params: $skillIds (list of skill ID strings)
 *
 * Metrics returned:
 *   - matchedCount:        how many of the user's skills match the job
 *   - userSkillCount:      total skills the user selected
 *   - userMatchPercentage: matchedCount / userSkillCount
 *   - jobRequirementCount: total skills the job requires
 *   - jobCoveragePercentage: matchedCount / jobRequirementCount
 */
MATCH (s:Skill)
WHERE s.id IN $skillIds
WITH collect(s) AS userSkills, count(s) AS userSkillCount
UNWIND userSkills AS s
MATCH (j:Job)-[req:REQUIRES]->(s)
WITH j, userSkillCount,
     collect(DISTINCT { id: s.id, name: s.name, importance: req.importance }) AS matchedSkills,
     count(DISTINCT s) AS matchedCount
OPTIONAL MATCH (j)-[:POSTED_BY]->(c:Company)
OPTIONAL MATCH (j)-[:REQUIRES]->(allReq:Skill)
WITH j, c, userSkillCount, matchedSkills, matchedCount,
     count(DISTINCT allReq) AS jobRequirementCount,
     collect(DISTINCT { id: allReq.id, name: allReq.name }) AS allRequiredSkills
RETURN j { .id, .title, .description, .location, .experienceLevel, .employmentType } AS job,
       c { .id, .name } AS company,
       matchedSkills,
       matchedCount,
       userSkillCount,
       jobRequirementCount,
       [req IN allRequiredSkills WHERE NOT req.id IN [m IN matchedSkills | m.id] | req.name] AS missingSkills,
       CASE WHEN userSkillCount = 0 THEN 0.0
            ELSE toFloat(matchedCount) / userSkillCount
       END AS userMatchPercentage,
       CASE WHEN jobRequirementCount = 0 THEN 0.0
            ELSE toFloat(matchedCount) / jobRequirementCount
       END AS jobCoveragePercentage
ORDER BY userMatchPercentage DESC, matchedCount DESC, j.title
