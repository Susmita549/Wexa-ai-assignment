import { Neo4jConfigError } from "../db/neo4j";
import { graphQueries } from "../queries";
import {
  CompanySummary,
  GraphExploreResult,
  HealthData,
  JobDetailRecord,
  JobRecommendation,
  JobSummary,
  SkillRelatedResult,
  SkillSummary,
  TechnologySummary,
} from "../types/api";
import { ApiError } from "../utils/apiError";

function wrapDbError(error: unknown): never {
  if (error instanceof Neo4jConfigError) {
    throw new ApiError(503, "Database is not configured");
  }
  throw error;
}

export class HealthService {
  async getHealth(
    check: () => Promise<{ connected: boolean; message?: string }>
  ): Promise<HealthData> {
    const result = await check();
    if (result.connected) {
      return { status: "ok", database: "connected" };
    }
    return {
      status: "error",
      database: "disconnected",
      message: result.message ?? "Unable to connect to CognoDB",
    };
  }
}

export class JobService {
  async getAllJobs(): Promise<Array<{ job: JobSummary; company: CompanySummary | null }>> {
    try {
      return (await graphQueries.getAllJobs()) as Array<{
        job: JobSummary;
        company: CompanySummary | null;
      }>;
    } catch (error) {
      wrapDbError(error);
    }
  }

  async getJobById(jobId: string): Promise<JobDetailRecord> {
    try {
      const rows = (await graphQueries.getJobById(jobId)) as unknown as JobDetailRecord[];
      if (rows.length === 0 || !rows[0].job) {
        throw new ApiError(404, `Job not found with id '${jobId}'`);
      }
      return rows[0];
    } catch (error) {
      if (error instanceof ApiError) throw error;
      wrapDbError(error);
    }
  }

  async getJobSkills(
    jobId: string
  ): Promise<Array<SkillSummary & { importance?: string; minLevel?: number }>> {
    try {
      await this.getJobById(jobId);
      const rows = (await graphQueries.getJobSkills(jobId)) as Array<{
        skill: SkillSummary;
        importance?: string;
        minLevel?: number;
      }>;
      return rows.map((row) => ({
        ...row.skill,
        importance: row.importance,
        minLevel: row.minLevel,
      }));
    } catch (error) {
      if (error instanceof ApiError) throw error;
      wrapDbError(error);
    }
  }

  async getRecommendations(skillIds: string[]): Promise<JobRecommendation[]> {
    try {
      const rows = (await graphQueries.recommendJobsBySkills(skillIds)) as unknown as JobRecommendation[];
      return rows.map((row) => ({
        ...row,
        missingSkills: row.missingSkills ?? [],
      }));
    } catch (error) {
      wrapDbError(error);
    }
  }

  async getJobTechnologies(jobId: string): Promise<
    Array<{
      technology: TechnologySummary;
      viaSkills: Array<{
        skillId: string;
        skillName: string;
        importance?: string;
        relationStrength: number;
      }>;
      avgStrength: number;
    }>
  > {
    try {
      await this.getJobById(jobId);
      return (await graphQueries.getJobTechnologies(jobId)) as unknown as Array<{
        technology: TechnologySummary;
        viaSkills: Array<{
          skillId: string;
          skillName: string;
          importance?: string;
          relationStrength: number;
        }>;
        avgStrength: number;
      }>;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      wrapDbError(error);
    }
  }
}

export class SkillService {
  async getAllSkills(): Promise<
    Array<{ skill: SkillSummary; jobCount: number; technologyCount: number }>
  > {
    try {
      return (await graphQueries.getAllSkills()) as Array<{
        skill: SkillSummary;
        jobCount: number;
        technologyCount: number;
      }>;
    } catch (error) {
      wrapDbError(error);
    }
  }

  async getSkillRelated(skillId: string): Promise<SkillRelatedResult> {
    try {
      const rows = (await graphQueries.getSkillRelated(skillId)) as unknown as SkillRelatedResult[];
      if (rows.length === 0 || !rows[0].skill) {
        throw new ApiError(404, `Skill not found with id '${skillId}'`);
      }

      const result = rows[0];
      return {
        skill: result.skill,
        technologies: (result.technologies ?? []).filter((t) => t?.id),
        jobs: (result.jobs ?? []).filter((j) => j?.job?.id),
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      wrapDbError(error);
    }
  }
}

export class CompanyService {
  async getAllCompanies(): Promise<Array<{ company: CompanySummary; jobCount: number }>> {
    try {
      return (await graphQueries.getAllCompanies()) as Array<{
        company: CompanySummary;
        jobCount: number;
      }>;
    } catch (error) {
      wrapDbError(error);
    }
  }
}

export class TechnologyService {
  async getAllTechnologies(): Promise<
    Array<{ technology: TechnologySummary; relatedSkillCount: number; projectCount: number }>
  > {
    try {
      return (await graphQueries.getAllTechnologies()) as Array<{
        technology: TechnologySummary;
        relatedSkillCount: number;
        projectCount: number;
      }>;
    } catch (error) {
      wrapDbError(error);
    }
  }
}

export class GraphExploreService {
  async explore(nodeId: string, nodeLabel: string): Promise<GraphExploreResult> {
    try {
      const rows = (await graphQueries.exploreNodeNeighborhood(
        nodeId,
        nodeLabel
      )) as unknown as GraphExploreResult[];
      if (rows.length === 0 || !rows[0].center) {
        throw new ApiError(404, `${nodeLabel} not found with id '${nodeId}'`);
      }
      return {
        center: rows[0].center,
        connections: rows[0].connections ?? [],
      };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      wrapDbError(error);
    }
  }
}

export const healthService = new HealthService();
export const jobService = new JobService();
export const skillService = new SkillService();
export const companyService = new CompanyService();
export const technologyService = new TechnologyService();
export const graphExploreService = new GraphExploreService();
