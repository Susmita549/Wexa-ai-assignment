import { Router } from "express";
import { listTechnologies } from "../controllers/technologies.controller";
import { asyncHandler } from "../middleware/asyncHandler";

export function createTechnologiesRouter(): Router {
  const router = Router();
  router.get("/", asyncHandler(listTechnologies));
  return router;
}
