export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: ApiMeta;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  details?: unknown;
}

export interface ApiMeta {
  count?: number;
  [key: string]: unknown;
}

export interface JobSummary {
  id: string;
  title: string;
  description: string;
  location: string;
  experienceLevel: string;
  employmentType: string;
}

export interface CompanySummary {
  id: string;
  name: string;
  industry?: string;
  location?: string;
}

export interface SkillSummary {
  id: string;
  name: string;
  category: string;
}

export interface TechnologySummary {
  id: string;
  name: string;
  category: string;
}

export interface JobListItem {
  job: JobSummary;
  company: CompanySummary | null;
}

export interface JobDetailRecord {
  job: JobSummary | null;
  company: CompanySummary | null;
  requiredSkills: Array<
    SkillSummary & { importance?: string; minLevel?: number }
  >;
}

export interface JobSkill extends SkillSummary {
  importance?: string;
  minLevel?: number;
}

export interface JobTechnology {
  technology: TechnologySummary;
  viaSkills: Array<{
    skillId: string;
    skillName: string;
    importance?: string;
    relationStrength: number;
  }>;
  avgStrength: number;
}

export interface JobRecommendation {
  job: JobSummary;
  company: CompanySummary | null;
  matchedSkills: Array<{ id: string; name: string; importance?: string }>;
  matchedCount: number;
  userSkillCount: number;
  jobRequirementCount: number;
  userMatchPercentage: number;
  jobCoveragePercentage: number;
  missingSkills: string[];
}

export interface GraphExploreConnection {
  id: string;
  labels: string[];
  name: string;
  relationship: string;
  direction: string;
}

export interface GraphExploreResult {
  center: Record<string, unknown> | null;
  connections: GraphExploreConnection[];
}

export interface SkillRelatedResult {
  skill: SkillSummary;
  technologies: TechnologySummary[];
  jobs: Array<{ job: JobSummary | null; company: CompanySummary | null }>;
}

export interface SkillListItem {
  skill: SkillSummary;
  jobCount: number;
  technologyCount: number;
}

export interface CompanyListItem {
  company: CompanySummary;
  jobCount: number;
}

export interface TechnologyListItem {
  technology: TechnologySummary;
  relatedSkillCount: number;
  projectCount: number;
}

export type NodeLabel =
  | "Developer"
  | "Skill"
  | "Job"
  | "Company"
  | "Project"
  | "Technology";

export interface DashboardStats {
  jobs: number;
  skills: number;
  companies: number;
  technologies: number;
}
