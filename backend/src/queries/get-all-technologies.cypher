/**
 * GET ALL TECHNOLOGIES
 *
 * What: Returns all technologies with related skill and project counts.
 * Hops: 1 (Technology → RELATED_TO → Skill, Technology ← USES|BUILT_WITH ← Project)
 * Params: none
 */
MATCH (t:Technology)
OPTIONAL MATCH (t)-[:RELATED_TO]->(s:Skill)
OPTIONAL MATCH (t)<-[:USES|BUILT_WITH]-(p:Project)
RETURN t { .id, .name, .category } AS technology,
       count(DISTINCT s) AS relatedSkillCount,
       count(DISTINCT p) AS projectCount
ORDER BY t.category, t.name
