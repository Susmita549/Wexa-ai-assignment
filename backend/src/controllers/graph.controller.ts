import { Request, Response } from "express";
import { graphExploreService } from "../services/graph.service";
import { sendSuccess } from "../utils/response";
import { parseNodeLabel, requireNonEmptyString } from "../utils/validate";

export async function exploreGraph(req: Request, res: Response): Promise<void> {
  const nodeId = requireNonEmptyString(req.query.nodeId, "nodeId");
  const label = parseNodeLabel(req.query.label);
  const result = await graphExploreService.explore(nodeId, label);
  sendSuccess(res, result, 200, {
    connectionCount: result.connections.length,
  });
}
