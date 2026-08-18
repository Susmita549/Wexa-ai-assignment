import { Request, Response } from "express";
import { jobService } from "../services/graph.service";
import { sendList, sendSuccess } from "../utils/response";
import { parseSkillIds, requireNonEmptyString } from "../utils/validate";

export async function listJobs(_req: Request, res: Response): Promise<void> {
  const jobs = await jobService.getAllJobs();
  sendList(res, jobs);
}

export async function getJobById(req: Request, res: Response): Promise<void> {
  const jobId = requireNonEmptyString(req.params.id, "Job ID");
  const job = await jobService.getJobById(jobId);
  sendSuccess(res, job);
}

export async function getJobSkills(req: Request, res: Response): Promise<void> {
  const jobId = requireNonEmptyString(req.params.id, "Job ID");
  const skills = await jobService.getJobSkills(jobId);
  sendList(res, skills);
}

export async function getJobRecommendations(req: Request, res: Response): Promise<void> {
  const skillIds = parseSkillIds(req.query.skills);
  const recommendations = await jobService.getRecommendations(skillIds);
  sendList(res, recommendations, 200, { skillIds });
}

export async function getJobTechnologies(req: Request, res: Response): Promise<void> {
  const jobId = requireNonEmptyString(req.params.id, "Job ID");
  const technologies = await jobService.getJobTechnologies(jobId);
  sendList(res, technologies);
}
