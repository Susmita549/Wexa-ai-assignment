import neo4j, { Driver, Session } from "neo4j-driver";
import type { EnvConfig } from "../config/env";
import { isCognodbConfigured } from "../config/env";

let driver: Driver | null = null;
let envConfig: EnvConfig | null = null;

export class Neo4jConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Neo4jConfigError";
  }
}

export function initNeo4j(config: EnvConfig): void {
  envConfig = config;
}

function assertConfigured(): EnvConfig {
  if (!envConfig) {
    throw new Neo4jConfigError("Neo4j driver has not been initialized");
  }
  if (!isCognodbConfigured(envConfig)) {
    throw new Neo4jConfigError(
      "CognoDB is not configured. Set COGNODB_URI, COGNODB_USERNAME, and COGNODB_PASSWORD"
    );
  }
  return envConfig;
}

export function getDriver(): Driver {
  const config = assertConfigured();

  if (!driver) {
    driver = neo4j.driver(
      config.cognodb.uri,
      neo4j.auth.basic(config.cognodb.username, config.cognodb.password)
    );
  }

  return driver;
}

export function getSession(): Session {
  return getDriver().session();
}

export async function withSession<T>(
  work: (session: Session) => Promise<T>
): Promise<T> {
  const session = getSession();
  try {
    return await work(session);
  } finally {
    await session.close();
  }
}

export interface ConnectivityResult {
  connected: boolean;
  message?: string;
}

function sanitizeErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return "Unknown database error";
  }

  // Avoid leaking URI or credentials that might appear in driver error messages
  return error.message
    .replace(/bolt\+s?:\/\/[^\s]+/gi, "[redacted-uri]")
    .replace(/(password|credential)[^\s]*/gi, "[redacted]");
}

export async function verifyConnectivity(): Promise<ConnectivityResult> {
  if (!envConfig || !isCognodbConfigured(envConfig)) {
    return {
      connected: false,
      message: "CognoDB credentials are not configured",
    };
  }

  try {
    const db = getDriver();
    await db.verifyConnectivity();
    return { connected: true };
  } catch (error) {
    console.error(
      "CognoDB connectivity check failed:",
      sanitizeErrorMessage(error)
    );
    return {
      connected: false,
      message: "Unable to connect to CognoDB",
    };
  }
}

export async function closeDriver(): Promise<void> {
  if (driver) {
    await driver.close();
    driver = null;
  }
}
