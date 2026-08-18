// Indirect job discovery through project technologies (multi-hop)
// Parameters: $developerId (string)

MATCH (d:Developer {id: $developerId})-[:WORKED_ON]->(p:Project)
      -[:USES|BUILT_WITH]->(tech:Technology)-[:RELATED_TO]->(s:Skill)<-[:REQUIRES]-(j:Job)
RETURN j,
       collect(DISTINCT tech.name) AS viaTechnologies,
       collect(DISTINCT s.name) AS impliedSkills,
       count(DISTINCT tech) AS connectionStrength
ORDER BY connectionStrength DESC
LIMIT 10
