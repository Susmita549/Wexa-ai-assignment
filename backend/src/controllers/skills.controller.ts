import { Request, Response } from "express";
import { skillService } from "../services/graph.service";
import { sendList, sendSuccess } from "../utils/response";
import { requireNonEmptyString } from "../utils/validate";

export async function listSkills(_req: Request, res: Response): Promise<void> {
  const skills = await skillService.getAllSkills();
  sendList(res, skills);
}

export async function getSkillRelated(req: Request, res: Response): Promise<void> {
  const skillId = requireNonEmptyString(req.params.id, "Skill ID");
  const related = await skillService.getSkillRelated(skillId);
  sendSuccess(res, related, 200, {
    technologyCount: related.technologies.length,
    jobCount: related.jobs.length,
  });
}
