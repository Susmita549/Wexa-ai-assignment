import { QueryResult, Record as Neo4jRecord } from "neo4j-driver";
import { withSession } from "../db/neo4j";
import { loadQuery } from "./loader";

type QueryParams = Record<string, unknown>;

function toPlainValue(value: unknown): unknown {
  if (value === null || value === undefined) return value;

  if (typeof value === "object" && value !== null) {
    if (typeof (value as { toNumber?: () => number }).toNumber === "function") {
      return (value as { toNumber: () => number }).toNumber();
    }
    if (Array.isArray(value)) {
      return value.map(toPlainValue);
    }
    if ("properties" in (value as object)) {
      return toPlainValue((value as { properties: unknown }).properties);
    }
    const obj = value as Record<string, unknown>;
    const result: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(obj)) {
      result[key] = toPlainValue(val);
    }
    return result;
  }

  return value;
}

function recordToObject(record: Neo4jRecord): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key of record.keys) {
    result[String(key)] = toPlainValue(record.get(key));
  }
  return result;
}

export async function runQuery<T extends Record<string, unknown> = Record<string, unknown>>(
  fileName: string,
  params: QueryParams = {}
): Promise<T[]> {
  return withSession(async (session) => {
    const result: QueryResult = await session.run(loadQuery(fileName), params);
    return result.records.map((record) => recordToObject(record) as T);
  });
}
