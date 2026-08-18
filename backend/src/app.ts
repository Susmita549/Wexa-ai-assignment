import cors from "cors";
import express from "express";
import { loadEnv } from "./config/env";
import { initNeo4j } from "./db/neo4j";
import { errorHandler } from "./middleware/errorHandler";
import { createApiRouter } from "./routes";

export function createApp() {
  const config = loadEnv();
  initNeo4j(config);

  const app = express();

  app.use(cors({ origin: config.corsOrigin }));
  app.use(express.json());

  app.get("/", (_req, res) => {
    res.json({
      name: "JobGraph API",
      version: "0.1.0",
      docs: "/api/health",
    });
  });

  app.use("/api", createApiRouter());
  app.use(errorHandler);

  return { app, config };
}
