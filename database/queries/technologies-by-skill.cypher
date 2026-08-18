// Technologies related to a skill, with project usage counts
// Parameters: $skillId (string)

MATCH (s:Skill {id: $skillId})<-[:RELATED_TO]-(t:Technology)
OPTIONAL MATCH (t)<-[:USES|BUILT_WITH]-(p:Project)
RETURN t, count(DISTINCT p) AS projectUsage
ORDER BY projectUsage DESC
