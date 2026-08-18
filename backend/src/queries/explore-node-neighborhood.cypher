/**
 * GRAPH EXPLORATION: CONNECTED ENTITIES AROUND A SELECTED NODE
 *
 * What: Returns a node and its 1-hop neighbors with relationship metadata.
 * Why:  Graph databases treat neighborhood exploration as a native operation.
 *       SQL would need separate queries (or UNION joins) per relationship type and direction.
 * Hops: 1
 * Params: $nodeId (string), $nodeLabel (string — Developer|Skill|Job|Company|Project|Technology)
 */
MATCH (center)
WHERE center.id = $nodeId AND $nodeLabel IN labels(center)
OPTIONAL MATCH (center)-[r]-(neighbor)
WHERE neighbor IS NOT NULL
RETURN center {
  .id,
  labels: labels(center),
  name: coalesce(center.name, center.title, center.id),
  properties: properties(center)
} AS center,
collect(DISTINCT {
  id: neighbor.id,
  labels: labels(neighbor),
  name: coalesce(neighbor.name, neighbor.title, neighbor.id),
  relationship: type(r),
  direction: CASE WHEN startNode(r) = center THEN 'outgoing' ELSE 'incoming' END
}) AS connections
