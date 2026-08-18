import { ApiError } from "./apiError";
import { NodeLabel } from "../types/api";

const NODE_LABELS: NodeLabel[] = [
  "Developer",
  "Skill",
  "Job",
  "Company",
  "Project",
  "Technology",
];

export function requireNonEmptyString(
  value: unknown,
  fieldName: string
): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new ApiError(400, `${fieldName} is required`);
  }
  return value.trim();
}

export function parseSkillIds(value: unknown): string[] {
  if (value === undefined || value === null || value === "") {
    throw new ApiError(400, "Query parameter 'skills' is required (comma-separated skill IDs)");
  }

  const raw = Array.isArray(value) ? value.join(",") : String(value);
  const ids = raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  if (ids.length === 0) {
    throw new ApiError(400, "At least one skill ID is required in 'skills' parameter");
  }

  const MAX_SKILL_IDS = 50;
  if (ids.length > MAX_SKILL_IDS) {
    throw new ApiError(400, `At most ${MAX_SKILL_IDS} skill IDs are allowed`);
  }

  return ids;
}

export function parseNodeLabel(value: unknown): NodeLabel {
  const label = requireNonEmptyString(value, "label");
  if (!NODE_LABELS.includes(label as NodeLabel)) {
    throw new ApiError(400, `Invalid label. Must be one of: ${NODE_LABELS.join(", ")}`, {
      allowed: NODE_LABELS,
    });
  }
  return label as NodeLabel;
}

export function assertFound<T>(
  value: T | null | undefined,
  resourceName: string,
  id?: string
): T {
  if (value === null || value === undefined) {
    const suffix = id ? ` with id '${id}'` : "";
    throw new ApiError(404, `${resourceName} not found${suffix}`);
  }
  return value;
}
