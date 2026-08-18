import { Request, Response } from "express";
import { companyService } from "../services/graph.service";
import { sendList } from "../utils/response";

export async function listCompanies(_req: Request, res: Response): Promise<void> {
  const companies = await companyService.getAllCompanies();
  sendList(res, companies);
}
