// =============================================================================
// JobGraph — Uniqueness constraints
// Ensures stable string IDs are unique per node label.
// Safe to re-run: uses IF NOT EXISTS.
// =============================================================================

CREATE CONSTRAINT developer_id IF NOT EXISTS
FOR (d:Developer) REQUIRE d.id IS UNIQUE;

CREATE CONSTRAINT skill_id IF NOT EXISTS
FOR (s:Skill) REQUIRE s.id IS UNIQUE;

CREATE CONSTRAINT job_id IF NOT EXISTS
FOR (j:Job) REQUIRE j.id IS UNIQUE;

CREATE CONSTRAINT company_id IF NOT EXISTS
FOR (c:Company) REQUIRE c.id IS UNIQUE;

CREATE CONSTRAINT project_id IF NOT EXISTS
FOR (p:Project) REQUIRE p.id IS UNIQUE;

CREATE CONSTRAINT technology_id IF NOT EXISTS
FOR (t:Technology) REQUIRE t.id IS UNIQUE;
