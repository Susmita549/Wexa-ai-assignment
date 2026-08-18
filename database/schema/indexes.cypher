// =============================================================================
// JobGraph — Lookup indexes
// Supports search, filtering, and listing by common properties.
// Safe to re-run: uses IF NOT EXISTS.
// =============================================================================

CREATE INDEX developer_name IF NOT EXISTS FOR (d:Developer) ON (d.name);
CREATE INDEX developer_location IF NOT EXISTS FOR (d:Developer) ON (d.location);

CREATE INDEX skill_name IF NOT EXISTS FOR (s:Skill) ON (s.name);
CREATE INDEX skill_category IF NOT EXISTS FOR (s:Skill) ON (s.category);

CREATE INDEX job_title IF NOT EXISTS FOR (j:Job) ON (j.title);
CREATE INDEX job_location IF NOT EXISTS FOR (j:Job) ON (j.location);
CREATE INDEX job_experience_level IF NOT EXISTS FOR (j:Job) ON (j.experienceLevel);
CREATE INDEX job_employment_type IF NOT EXISTS FOR (j:Job) ON (j.employmentType);

CREATE INDEX company_name IF NOT EXISTS FOR (c:Company) ON (c.name);
CREATE INDEX company_industry IF NOT EXISTS FOR (c:Company) ON (c.industry);

CREATE INDEX project_name IF NOT EXISTS FOR (p:Project) ON (p.name);
CREATE INDEX project_domain IF NOT EXISTS FOR (p:Project) ON (p.domain);

CREATE INDEX technology_name IF NOT EXISTS FOR (t:Technology) ON (t.name);
CREATE INDEX technology_category IF NOT EXISTS FOR (t:Technology) ON (t.category);
