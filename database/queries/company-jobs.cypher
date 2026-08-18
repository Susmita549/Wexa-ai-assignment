// Jobs posted by a company with required skills
// Parameters: $companyId (string)

MATCH (c:Company {id: $companyId})<-[:POSTED_BY]-(j:Job)-[:REQUIRES]->(s:Skill)
RETURN c, j, collect(DISTINCT s.name) AS requiredSkills
ORDER BY j.title
