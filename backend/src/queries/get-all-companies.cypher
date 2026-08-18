/**
 * GET ALL COMPANIES
 *
 * What: Returns all companies with their posted job count.
 * Hops: 1 (Company ← POSTED_BY ← Job)
 * Params: none
 */
MATCH (c:Company)
OPTIONAL MATCH (c)<-[:POSTED_BY]-(j:Job)
RETURN c { .id, .name, .industry, .location } AS company,
       count(DISTINCT j) AS jobCount
ORDER BY c.name
