import { Router } from "express";
import { createCompaniesRouter } from "./companies.routes";
import { createGraphRouter } from "./graph.routes";
import { createHealthRouter } from "./health.routes";
import { createJobsRouter } from "./jobs.routes";
import { createSkillsRouter } from "./skills.routes";
import { createTechnologiesRouter } from "./technologies.routes";

export function createApiRouter(): Router {
  const router = Router();

  router.use("/health", createHealthRouter());
  router.use("/jobs", createJobsRouter());
  router.use("/skills", createSkillsRouter());
  router.use("/companies", createCompaniesRouter());
  router.use("/technologies", createTechnologiesRouter());
  router.use("/graph", createGraphRouter());

  return router;
}
