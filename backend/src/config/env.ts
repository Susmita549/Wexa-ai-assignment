import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
dotenv.config();

export interface CognodbConfig {
  uri: string;
  username: string;
  password: string;
}

export interface EnvConfig {
  port: number;
  nodeEnv: string;
  corsOrigin: string;
  cognodb: CognodbConfig;
}

function trim(value: string | undefined): string {
  return value?.trim() ?? "";
}

function validateCognodbConfig(cognodb: CognodbConfig): void {
  const anySet = cognodb.uri || cognodb.username || cognodb.password;
  if (!anySet) {
    return;
  }

  const missing: string[] = [];
  if (!cognodb.uri) missing.push("COGNODB_URI");
  if (!cognodb.username) missing.push("COGNODB_USERNAME");
  if (!cognodb.password) missing.push("COGNODB_PASSWORD");

  if (missing.length > 0) {
    throw new Error(
      `Incomplete CognoDB configuration. Missing: ${missing.join(", ")}`
    );
  }

  if (!cognodb.uri.startsWith("bolt+s://")) {
    throw new Error(
      "COGNODB_URI must use the bolt+s:// scheme (required for CognoDB Cloud)"
    );
  }
}

export function loadEnv(): EnvConfig {
  const cognodb: CognodbConfig = {
    uri: trim(process.env.COGNODB_URI),
    username: trim(process.env.COGNODB_USERNAME),
    password: process.env.COGNODB_PASSWORD ?? "",
  };

  validateCognodbConfig(cognodb);

  const port = parseInt(process.env.PORT ?? "3001", 10);
  if (Number.isNaN(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be a valid number between 1 and 65535");
  }

  return {
    port,
    nodeEnv: process.env.NODE_ENV ?? "development",
    corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
    cognodb,
  };
}

export function isCognodbConfigured(config: EnvConfig): boolean {
  return Boolean(
    config.cognodb.uri &&
      config.cognodb.username &&
      config.cognodb.password
  );
}
