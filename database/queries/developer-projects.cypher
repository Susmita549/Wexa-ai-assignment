// Developer projects with technologies used
// Parameters: $developerId (string)

MATCH (d:Developer {id: $developerId})-[wo:WORKED_ON]->(p:Project)
OPTIONAL MATCH (p)-[:USES|BUILT_WITH]->(t:Technology)
RETURN p, wo.role AS role, collect(DISTINCT t.name) AS technologies
