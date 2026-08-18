import { Router } from "express";
import { exploreGraph } from "../controllers/graph.controller";
import { asyncHandler } from "../middleware/asyncHandler";

export function createGraphRouter(): Router {
  const router = Router();
  router.get("/explore", asyncHandler(exploreGraph));
  return router;
}
