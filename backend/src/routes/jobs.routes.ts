import { Router } from "express";
import {
  getJobById,
  getJobRecommendations,
  getJobSkills,
  getJobTechnologies,
  listJobs,
} from "../controllers/jobs.controller";
import { asyncHandler } from "../middleware/asyncHandler";

export function createJobsRouter(): Router {
  const router = Router();

  router.get("/", asyncHandler(listJobs));
  router.get("/recommendations", asyncHandler(getJobRecommendations));
  router.get("/:id/skills", asyncHandler(getJobSkills));
  router.get("/:id/technologies", asyncHandler(getJobTechnologies));
  router.get("/:id", asyncHandler(getJobById));

  return router;
}
