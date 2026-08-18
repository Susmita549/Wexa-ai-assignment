import { Router } from "express";
import { getHealth } from "../controllers/health.controller";
import { asyncHandler } from "../middleware/asyncHandler";

export function createHealthRouter(): Router {
  const router = Router();
  router.get("/", asyncHandler(getHealth));
  return router;
}
