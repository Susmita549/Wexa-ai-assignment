// Shortest relationship path between a developer and a job
// Parameters: $developerId (string), $jobId (string)

MATCH (d:Developer {id: $developerId}), (j:Job {id: $jobId})
MATCH path = shortestPath(
  (d)-[:HAS_SKILL|WORKED_ON|USES|BUILT_WITH|RELATED_TO|REQUIRES|POSTED_BY*..10]-(j)
)
RETURN path, length(path) AS hops
LIMIT 1
