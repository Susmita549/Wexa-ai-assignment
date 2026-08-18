import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";

function sanitizeMessage(message: string): string {
  return message
    .replace(/bolt\+s?:\/\/[^\s]+/gi, "[redacted-uri]")
    .replace(/(password|credential)[^\s]*/gi, "[redacted]");
}

function isNeo4jError(err: Error): boolean {
  return err.name === "Neo4jError" || err.message.includes("Neo4j");
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ApiError) {
    // Expected API errors (404, 400, etc.) — pass through the message and status code.
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
      ...(err.details !== undefined ? { details: err.details } : {}),
    });
    return;
  }

  if (isNeo4jError(err)) {
    console.error("Database error:", sanitizeMessage(err.message));
    // Driver failures may include URIs or credentials — return a generic 503 to the client.
    res.status(503).json({
      success: false,
      error: "Database service unavailable",
    });
    return;
  }

  console.error("Unhandled error:", sanitizeMessage(err.message));
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
}
