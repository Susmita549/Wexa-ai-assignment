import { Request, Response } from "express";
import { verifyConnectivity } from "../db/neo4j";
import { healthService } from "../services/graph.service";
import { sendSuccess } from "../utils/response";

export async function getHealth(_req: Request, res: Response): Promise<void> {
  const data = await healthService.getHealth(verifyConnectivity);
  const statusCode = data.status === "ok" ? 200 : 503;
  sendSuccess(res, data, statusCode);
}
