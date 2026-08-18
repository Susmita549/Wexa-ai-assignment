import type {
  ApiSuccessResponse,
  CompanyListItem,
  DashboardStats,
  GraphExploreResult,
  JobDetailRecord,
  JobListItem,
  JobRecommendation,
  JobSkill,
  JobTechnology,
  NodeLabel,
  SkillListItem,
  SkillRelatedResult,
  TechnologyListItem,
} from "@/types/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export class ApiClientError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    cache: "no-store",
  });

  const body = (await response.json()) as T | { success: false; error: string };

  if (!response.ok || (body as { success?: boolean }).success === false) {
    const message =
      (body as { error?: string }).error ??
      `Request failed (${response.status})`;
    throw new ApiClientError(message, response.status);
  }

  return body as T;
}

function unwrapList<T>(response: ApiSuccessResponse<T[]>): T[] {
  return response.data;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [jobs, skills, companies, technologies] = await Promise.all([
    apiFetch<ApiSuccessResponse<JobListItem[]>>("/api/jobs"),
    apiFetch<ApiSuccessResponse<SkillListItem[]>>("/api/skills"),
    apiFetch<ApiSuccessResponse<CompanyListItem[]>>("/api/companies"),
    apiFetch<ApiSuccessResponse<TechnologyListItem[]>>("/api/technologies"),
  ]);

  return {
    jobs: jobs.meta?.count ?? jobs.data.length,
    skills: skills.meta?.count ?? skills.data.length,
    companies: companies.meta?.count ?? companies.data.length,
    technologies: technologies.meta?.count ?? technologies.data.length,
  };
}

export async function getJobs(): Promise<JobListItem[]> {
  const res = await apiFetch<ApiSuccessResponse<JobListItem[]>>("/api/jobs");
  return unwrapList(res);
}

export async function getJob(id: string): Promise<JobDetailRecord> {
  const res = await apiFetch<ApiSuccessResponse<JobDetailRecord>>(
    `/api/jobs/${id}`
  );
  return res.data;
}

export async function getJobSkills(id: string): Promise<JobSkill[]> {
  const res = await apiFetch<ApiSuccessResponse<JobSkill[]>>(
    `/api/jobs/${id}/skills`
  );
  return unwrapList(res);
}

export async function getJobTechnologies(id: string): Promise<JobTechnology[]> {
  const res = await apiFetch<ApiSuccessResponse<JobTechnology[]>>(
    `/api/jobs/${id}/technologies`
  );
  return unwrapList(res);
}

export async function getSkills(): Promise<SkillListItem[]> {
  const res = await apiFetch<ApiSuccessResponse<SkillListItem[]>>("/api/skills");
  return unwrapList(res);
}

export async function getSkillRelated(id: string): Promise<SkillRelatedResult> {
  const res = await apiFetch<ApiSuccessResponse<SkillRelatedResult>>(
    `/api/skills/${id}/related`
  );
  return res.data;
}

export async function getCompanies(): Promise<CompanyListItem[]> {
  const res = await apiFetch<ApiSuccessResponse<CompanyListItem[]>>(
    "/api/companies"
  );
  return unwrapList(res);
}

export async function getTechnologies(): Promise<TechnologyListItem[]> {
  const res = await apiFetch<ApiSuccessResponse<TechnologyListItem[]>>(
    "/api/technologies"
  );
  return unwrapList(res);
}

export async function getRecommendations(
  skillIds: string[]
): Promise<JobRecommendation[]> {
  const params = new URLSearchParams({ skills: skillIds.join(",") });
  const res = await apiFetch<ApiSuccessResponse<JobRecommendation[]>>(
    `/api/jobs/recommendations?${params}`
  );
  return unwrapList(res);
}

export async function exploreGraph(
  nodeId: string,
  label: NodeLabel
): Promise<GraphExploreResult> {
  const params = new URLSearchParams({ nodeId, label });
  const res = await apiFetch<ApiSuccessResponse<GraphExploreResult>>(
    `/api/graph/explore?${params}`
  );
  return res.data;
}
