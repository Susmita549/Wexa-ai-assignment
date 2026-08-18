// Find jobs matching selected skills (direct match)
// Parameters: $skillIds (list of skill ID strings)

MATCH (s:Skill)
WHERE s.id IN $skillIds
MATCH (j:Job)-[r:REQUIRES]->(s)
RETURN j,
       collect(DISTINCT { skill: s.name, importance: r.importance }) AS matchedSkills,
       count(s) AS matchCount
ORDER BY matchCount DESC
