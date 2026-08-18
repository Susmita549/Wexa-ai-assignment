/**
 * MULTI-HOP: DEVELOPER → WORKED_ON → PROJECT → USES|BUILT_WITH → TECHNOLOGY → RELATED_TO → SKILL
 *
 * What: Infers skills a developer has exposure to through project technology usage.
 * Why:  This is the flagship indirect-discovery query. It chains experience → tools → capabilities
 *       in one pattern. SQL would require recursive joins across 4 bridge tables and still
 *       struggle to express the path clearly.
 * Hops: 4 (Developer → Project → Technology → Skill)
 * Params: $developerId (string)
 */
MATCH (d:Developer {id: $developerId})-[wo:WORKED_ON]->(p:Project)
      -[:USES|BUILT_WITH]->(t:Technology)-[rel:RELATED_TO]->(s:Skill)
RETURN s { .id, .name, .category } AS skill,
       collect(DISTINCT {
         projectId: p.id,
         projectName: p.name,
         role: wo.role,
         technologyId: t.id,
         technologyName: t.name,
         relationStrength: rel.strength
       }) AS exposurePaths,
       count(DISTINCT t) AS technologyCount,
       avg(rel.strength) AS avgStrength
ORDER BY technologyCount DESC, avgStrength DESC, s.name
