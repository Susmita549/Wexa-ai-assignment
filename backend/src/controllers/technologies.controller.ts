import { Request, Response } from "express";
import { technologyService } from "../services/graph.service";
import { sendList } from "../utils/response";

export async function listTechnologies(_req: Request, res: Response): Promise<void> {
  const technologies = await technologyService.getAllTechnologies();
  sendList(res, technologies);
}
