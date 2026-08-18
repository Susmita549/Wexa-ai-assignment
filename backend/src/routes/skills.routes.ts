import { Router } from "express";
import { getSkillRelated, listSkills } from "../controllers/skills.controller";
import { asyncHandler } from "../middleware/asyncHandler";

export function createSkillsRouter(): Router {
  const router = Router();

  router.get("/", asyncHandler(listSkills));
  router.get("/:id/related", asyncHandler(getSkillRelated));

  return router;
}
