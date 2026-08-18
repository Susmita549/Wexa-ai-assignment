import { Request, Response } from "express";
import { verifyConnectivity } from "../db/neo4j";
import { healthService } from "../services/graph.service";
import { sendSuccess } from "../utils/response";

export async function getHealth(_req: Request, res: Response): Promise<void> {
  const data = await healthService.getHealth(verifyConnectivity);
  const statusCode = data.status === "ok" ? 200 : 503;
  // 503 when CognoDB is unreachable so monitors detect DB outages; body still describes the state.
  sendSuccess(res, data, statusCode);
}
