import { Router } from "express";
import { listCompanies } from "../controllers/companies.controller";
import { asyncHandler } from "../middleware/asyncHandler";

export function createCompaniesRouter(): Router {
  const router = Router();
  router.get("/", asyncHandler(listCompanies));
  return router;
}
