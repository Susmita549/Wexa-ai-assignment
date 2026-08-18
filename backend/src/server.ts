import { createApp } from "./app";
import { closeDriver } from "./db/neo4j";

const { app, config } = createApp();

const server = app.listen(config.port, () => {
  console.log(`JobGraph API running on http://localhost:${config.port}`);
});

server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `Port ${config.port} is already in use. Stop the other process or set PORT to a different value.`
    );
    console.error(`  lsof -i :${config.port}`);
    process.exit(1);
  }
  console.error("Server failed to start:", error.message);
  process.exit(1);
});

async function shutdown(): Promise<void> {
  console.log("Shutting down...");
  server.close();
  await closeDriver();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
