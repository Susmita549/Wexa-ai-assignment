import fs from "fs";
import path from "path";

const QUERIES_DIR = path.join(__dirname);

const queryCache = new Map<string, string>();

/**
 * Loads a .cypher file from the queries directory.
 * Strips block comments used for documentation before execution.
 */
export function loadQuery(fileName: string): string {
  if (
    !fileName.endsWith(".cypher") ||
    fileName.includes("..") ||
    fileName.includes("/") ||
    fileName.includes("\\")
  ) {
    throw new Error("Invalid query file name");
  }

  const cached = queryCache.get(fileName);
  if (cached) return cached;

  const filePath = path.join(QUERIES_DIR, fileName);
  const raw = fs.readFileSync(filePath, "utf-8");
  const cypher = raw.replace(/\/\*\*[\s\S]*?\*\//g, "").trim();

  queryCache.set(fileName, cypher);
  return cypher;
}

export const QueryFiles = {
  getAllJobs: "get-all-jobs.cypher",
  getJobById: "get-job-by-id.cypher",
  getAllSkills: "get-all-skills.cypher",
  getAllCompanies: "get-all-companies.cypher",
  getAllTechnologies: "get-all-technologies.cypher",
  getJobSkills: "get-job-skills.cypher",
  getJobsBySkill: "get-jobs-by-skill.cypher",
  getJobsByMultipleSkills: "get-jobs-by-multiple-skills.cypher",
  developerSkillsToJobs: "developer-skills-to-jobs.cypher",
  jobSkillsToTechnologies: "job-skills-to-technologies.cypher",
  developerProjectToSkills: "developer-project-to-skills.cypher",
  exploreNodeNeighborhood: "explore-node-neighborhood.cypher",
  recommendJobsBySkills: "recommend-jobs-by-skills.cypher",
  getSkillRelated: "get-skill-related.cypher",
} as const;

export type QueryFileName = (typeof QueryFiles)[keyof typeof QueryFiles];
