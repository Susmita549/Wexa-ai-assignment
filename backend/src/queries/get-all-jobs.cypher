/**
 * GET ALL JOBS
 *
 * What: Returns every Job node with its posting company.
 * Why:  A single OPTIONAL MATCH attaches company context without a separate lookup query.
 * Hops: 1 (Job → POSTED_BY → Company)
 * Params: none
 */
MATCH (j:Job)
OPTIONAL MATCH (j)-[:POSTED_BY]->(c:Company)
RETURN j {
  .id, .title, .description, .location, .experienceLevel, .employmentType
} AS job,
c { .id, .name, .industry, .location } AS company
ORDER BY j.title
