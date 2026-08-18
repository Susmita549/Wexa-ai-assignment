import { loadQuery, QueryFiles } from "./loader";
import { runQuery } from "./runner";

export { QueryFiles, loadQuery, runQuery };

export const graphQueries = {
  getAllJobs: () => runQuery(QueryFiles.getAllJobs),

  getJobById: (jobId: string) => runQuery(QueryFiles.getJobById, { jobId }),

  getAllSkills: () => runQuery(QueryFiles.getAllSkills),

  getAllCompanies: () => runQuery(QueryFiles.getAllCompanies),

  getAllTechnologies: () => runQuery(QueryFiles.getAllTechnologies),

  getJobSkills: (jobId: string) => runQuery(QueryFiles.getJobSkills, { jobId }),

  getJobsBySkill: (skillId: string) => runQuery(QueryFiles.getJobsBySkill, { skillId }),

  getJobsByMultipleSkills: (skillIds: string[]) =>
    runQuery(QueryFiles.getJobsByMultipleSkills, { skillIds }),

  getSkillRelated: (skillId: string) =>
    runQuery(QueryFiles.getSkillRelated, { skillId }),

  getJobTechnologies: (jobId: string) =>
    runQuery(QueryFiles.jobSkillsToTechnologies, { jobId }),

  jobSkillsToTechnologies: (jobId: string) =>
    runQuery(QueryFiles.jobSkillsToTechnologies, { jobId }),

  developerSkillsToJobs: (developerId: string) =>
    runQuery(QueryFiles.developerSkillsToJobs, { developerId }),

  developerProjectToSkills: (developerId: string) =>
    runQuery(QueryFiles.developerProjectToSkills, { developerId }),

  exploreNodeNeighborhood: (nodeId: string, nodeLabel: string) =>
    runQuery(QueryFiles.exploreNodeNeighborhood, { nodeId, nodeLabel }),

  recommendJobsBySkills: (skillIds: string[]) =>
    runQuery(QueryFiles.recommendJobsBySkills, { skillIds }),
};
