// =============================================================================
// JobGraph — Realistic seed data
// All entities use stable string IDs for idempotent MERGE operations.
// =============================================================================

export interface DeveloperSeed {
  id: string;
  name: string;
  title: string;
  experienceYears: number;
  location: string;
}

export interface SkillSeed {
  id: string;
  name: string;
  category: string;
}

export interface CompanySeed {
  id: string;
  name: string;
  industry: string;
  location: string;
}

export interface ProjectSeed {
  id: string;
  name: string;
  description: string;
  domain: string;
}

export interface TechnologySeed {
  id: string;
  name: string;
  category: string;
}

export interface JobSeed {
  id: string;
  title: string;
  description: string;
  location: string;
  experienceLevel: string;
  employmentType: string;
  companyId: string;
  postedDate: string;
}

export interface HasSkillRel {
  developerId: string;
  skillId: string;
  level: number;
}

export interface WorkedOnRel {
  developerId: string;
  projectId: string;
  role: string;
}

export interface BuiltWithRel {
  projectId: string;
  technologyId: string;
}

export interface UsesRel {
  projectId: string;
  technologyId: string;
}

export interface RelatedToRel {
  technologyId: string;
  skillId: string;
  strength: number;
}

export interface RequiresRel {
  jobId: string;
  skillId: string;
  importance: "required" | "preferred";
  minLevel: number;
}

// ---------------------------------------------------------------------------
// Developers (10)
// ---------------------------------------------------------------------------

export const developers: DeveloperSeed[] = [
  {
    id: "dev-alice-chen",
    name: "Alice Chen",
    title: "Senior Full-Stack Engineer",
    experienceYears: 8,
    location: "Bangalore, India",
  },
  {
    id: "dev-bob-martinez",
    name: "Bob Martinez",
    title: "Backend Engineer",
    experienceYears: 5,
    location: "Austin, TX",
  },
  {
    id: "dev-carol-okonkwo",
    name: "Carol Okonkwo",
    title: "Frontend Lead",
    experienceYears: 9,
    location: "London, UK",
  },
  {
    id: "dev-david-kim",
    name: "David Kim",
    title: "DevOps Engineer",
    experienceYears: 6,
    location: "Seoul, South Korea",
  },
  {
    id: "dev-eva-johansson",
    name: "Eva Johansson",
    title: "Graph Database Specialist",
    experienceYears: 7,
    location: "Stockholm, Sweden",
  },
  {
    id: "dev-frank-obrien",
    name: "Frank O'Brien",
    title: "Python Backend Developer",
    experienceYears: 4,
    location: "Dublin, Ireland",
  },
  {
    id: "dev-grace-liu",
    name: "Grace Liu",
    title: "Full-Stack Developer",
    experienceYears: 3,
    location: "Singapore",
  },
  {
    id: "dev-henry-walsh",
    name: "Henry Walsh",
    title: "Staff Engineer",
    experienceYears: 12,
    location: "San Francisco, CA",
  },
  {
    id: "dev-isabel-torres",
    name: "Isabel Torres",
    title: "Junior Frontend Developer",
    experienceYears: 2,
    location: "Mexico City, Mexico",
  },
  {
    id: "dev-james-patel",
    name: "James Patel",
    title: "Platform Engineer",
    experienceYears: 6,
    location: "Mumbai, India",
  },
];

// ---------------------------------------------------------------------------
// Skills (25)
// ---------------------------------------------------------------------------

export const skills: SkillSeed[] = [
  { id: "skill-typescript", name: "TypeScript", category: "Language" },
  { id: "skill-javascript", name: "JavaScript", category: "Language" },
  { id: "skill-python", name: "Python", category: "Language" },
  { id: "skill-react-dev", name: "React Development", category: "Framework" },
  { id: "skill-nextjs-dev", name: "Next.js Development", category: "Framework" },
  { id: "skill-node-backend", name: "Node.js Backend", category: "Domain" },
  { id: "skill-express", name: "Express.js", category: "Framework" },
  { id: "skill-rest-api", name: "REST API Design", category: "Domain" },
  { id: "skill-graphql-api", name: "GraphQL API Design", category: "Domain" },
  { id: "skill-postgresql", name: "PostgreSQL", category: "Domain" },
  { id: "skill-mongodb", name: "MongoDB", category: "Domain" },
  { id: "skill-docker", name: "Docker", category: "Tool" },
  { id: "skill-aws", name: "AWS Cloud", category: "Cloud" },
  { id: "skill-system-design", name: "System Design", category: "Domain" },
  { id: "skill-graph-db", name: "Graph Databases", category: "Domain" },
  { id: "skill-cypher", name: "Cypher Querying", category: "Domain" },
  { id: "skill-fastapi", name: "FastAPI", category: "Framework" },
  { id: "skill-fullstack", name: "Full-Stack Development", category: "Domain" },
  { id: "skill-frontend-arch", name: "Frontend Architecture", category: "Domain" },
  { id: "skill-backend-arch", name: "Backend Architecture", category: "Domain" },
  { id: "skill-devops", name: "DevOps", category: "Domain" },
  { id: "skill-cicd", name: "CI/CD", category: "Domain" },
  { id: "skill-agile", name: "Agile", category: "Soft" },
  { id: "skill-tech-leadership", name: "Technical Leadership", category: "Soft" },
  { id: "skill-data-modeling", name: "Data Modeling", category: "Domain" },
];

// ---------------------------------------------------------------------------
// Companies (6)
// ---------------------------------------------------------------------------

export const companies: CompanySeed[] = [
  {
    id: "co-wexa-ai",
    name: "Wexa AI",
    industry: "AI Infrastructure",
    location: "San Francisco, CA",
  },
  {
    id: "co-cloudscale",
    name: "CloudScale Systems",
    industry: "Cloud Computing",
    location: "Seattle, WA",
  },
  {
    id: "co-finedge",
    name: "FinEdge Labs",
    industry: "FinTech",
    location: "New York, NY",
  },
  {
    id: "co-healthbridge",
    name: "HealthBridge Tech",
    industry: "Healthcare",
    location: "Boston, MA",
  },
  {
    id: "co-devtools-inc",
    name: "DevTools Inc",
    industry: "Developer Tools",
    location: "Berlin, Germany",
  },
  {
    id: "co-datastream",
    name: "DataStream Analytics",
    industry: "Data Analytics",
    location: "Toronto, Canada",
  },
];

// ---------------------------------------------------------------------------
// Projects (10) — shared across developers for collaboration paths
// ---------------------------------------------------------------------------

export const projects: ProjectSeed[] = [
  {
    id: "proj-jobgraph",
    name: "JobGraph Explorer",
    description: "Graph-powered job discovery platform with multi-hop recommendations",
    domain: "DevTools",
  },
  {
    id: "proj-payment-gateway",
    name: "Payment Gateway API",
    description: "High-throughput payment processing service for FinTech clients",
    domain: "FinTech",
  },
  {
    id: "proj-analytics-dashboard",
    name: "Customer Analytics Dashboard",
    description: "Real-time analytics dashboard for product and sales teams",
    domain: "Data Analytics",
  },
  {
    id: "proj-health-portal",
    name: "Health Records Portal",
    description: "HIPAA-compliant patient records management portal",
    domain: "Healthcare",
  },
  {
    id: "proj-chat-platform",
    name: "Real-time Chat Platform",
    description: "Scalable messaging platform with presence and notifications",
    domain: "Social",
  },
  {
    id: "proj-ml-pipeline",
    name: "ML Pipeline Orchestrator",
    description: "Automated machine learning training and deployment pipeline",
    domain: "Data Analytics",
  },
  {
    id: "proj-api-gateway",
    name: "API Gateway Service",
    description: "Centralized API gateway with rate limiting and authentication",
    domain: "Infrastructure",
  },
  {
    id: "proj-ecommerce",
    name: "E-commerce Storefront",
    description: "Modern headless e-commerce storefront with GraphQL API",
    domain: "Retail",
  },
  {
    id: "proj-inventory",
    name: "Inventory Management System",
    description: "Warehouse inventory tracking and fulfillment system",
    domain: "Logistics",
  },
  {
    id: "proj-developer-portal",
    name: "Developer Portal",
    description: "Self-service developer portal with API docs and key management",
    domain: "DevTools",
  },
];

// ---------------------------------------------------------------------------
// Technologies (18)
// ---------------------------------------------------------------------------

export const technologies: TechnologySeed[] = [
  { id: "tech-react", name: "React", category: "Framework" },
  { id: "tech-nextjs", name: "Next.js", category: "Framework" },
  { id: "tech-nodejs", name: "Node.js", category: "Language" },
  { id: "tech-express", name: "Express", category: "Framework" },
  { id: "tech-typescript", name: "TypeScript", category: "Language" },
  { id: "tech-python", name: "Python", category: "Language" },
  { id: "tech-fastapi", name: "FastAPI", category: "Framework" },
  { id: "tech-postgresql", name: "PostgreSQL", category: "Database" },
  { id: "tech-mongodb", name: "MongoDB", category: "Database" },
  { id: "tech-docker", name: "Docker", category: "Tool" },
  { id: "tech-aws", name: "AWS", category: "Platform" },
  { id: "tech-graphql", name: "GraphQL", category: "Tool" },
  { id: "tech-neo4j", name: "Neo4j", category: "Database" },
  { id: "tech-cypher", name: "Cypher", category: "Language" },
  { id: "tech-redis", name: "Redis", category: "Database" },
  { id: "tech-kubernetes", name: "Kubernetes", category: "Platform" },
  { id: "tech-tailwind", name: "Tailwind CSS", category: "Framework" },
  { id: "tech-jest", name: "Jest", category: "Tool" },
];

// ---------------------------------------------------------------------------
// Jobs (12)
// ---------------------------------------------------------------------------

export const jobs: JobSeed[] = [
  {
    id: "job-senior-fullstack-wexa",
    title: "Senior Full-Stack Engineer",
    description: "Build graph-powered applications using React, Node.js, and CognoDB",
    location: "Remote",
    experienceLevel: "Senior",
    employmentType: "Full-time",
    companyId: "co-wexa-ai",
    postedDate: "2026-01-15",
  },
  {
    id: "job-backend-engineer-wexa",
    title: "Backend Engineer",
    description: "Design and implement scalable REST APIs and data services",
    location: "San Francisco, CA",
    experienceLevel: "Mid",
    employmentType: "Full-time",
    companyId: "co-wexa-ai",
    postedDate: "2026-01-20",
  },
  {
    id: "job-graph-engineer-wexa",
    title: "Graph Database Engineer",
    description: "Model and optimize graph schemas; write complex Cypher traversals",
    location: "Remote",
    experienceLevel: "Senior",
    employmentType: "Full-time",
    companyId: "co-wexa-ai",
    postedDate: "2026-02-01",
  },
  {
    id: "job-frontend-cloudscale",
    title: "Frontend Engineer",
    description: "Build responsive cloud management dashboards with React and Next.js",
    location: "Seattle, WA",
    experienceLevel: "Mid",
    employmentType: "Full-time",
    companyId: "co-cloudscale",
    postedDate: "2026-01-10",
  },
  {
    id: "job-devops-cloudscale",
    title: "DevOps Engineer",
    description: "Manage CI/CD pipelines and cloud infrastructure on AWS",
    location: "Remote",
    experienceLevel: "Mid",
    employmentType: "Full-time",
    companyId: "co-cloudscale",
    postedDate: "2026-01-25",
  },
  {
    id: "job-python-backend-finedge",
    title: "Python Backend Developer",
    description: "Develop FastAPI microservices for financial transaction processing",
    location: "New York, NY",
    experienceLevel: "Mid",
    employmentType: "Full-time",
    companyId: "co-finedge",
    postedDate: "2026-02-05",
  },
  {
    id: "job-fullstack-finedge",
    title: "Full-Stack Developer",
    description: "Build customer-facing FinTech applications with React and Node.js",
    location: "Hybrid — New York, NY",
    experienceLevel: "Mid",
    employmentType: "Full-time",
    companyId: "co-finedge",
    postedDate: "2026-02-10",
  },
  {
    id: "job-api-engineer-healthbridge",
    title: "API Engineer",
    description: "Design GraphQL and REST APIs for healthcare data exchange",
    location: "Boston, MA",
    experienceLevel: "Senior",
    employmentType: "Full-time",
    companyId: "co-healthbridge",
    postedDate: "2026-01-18",
  },
  {
    id: "job-platform-devtools",
    title: "Platform Engineer",
    description: "Build and maintain developer platform infrastructure with Kubernetes",
    location: "Berlin, Germany",
    experienceLevel: "Senior",
    employmentType: "Full-time",
    companyId: "co-devtools-inc",
    postedDate: "2026-02-08",
  },
  {
    id: "job-junior-frontend-devtools",
    title: "Junior Frontend Developer",
    description: "Implement UI components and pages using React and TypeScript",
    location: "Remote",
    experienceLevel: "Junior",
    employmentType: "Full-time",
    companyId: "co-devtools-inc",
    postedDate: "2026-02-12",
  },
  {
    id: "job-data-engineer-datastream",
    title: "Data Engineer",
    description: "Build data pipelines and warehousing solutions on AWS",
    location: "Toronto, Canada",
    experienceLevel: "Mid",
    employmentType: "Full-time",
    companyId: "co-datastream",
    postedDate: "2026-01-22",
  },
  {
    id: "job-staff-engineer-datastream",
    title: "Staff Engineer",
    description: "Lead architecture decisions for large-scale data platform systems",
    location: "Remote",
    experienceLevel: "Lead",
    employmentType: "Full-time",
    companyId: "co-datastream",
    postedDate: "2026-02-15",
  },
];

// ---------------------------------------------------------------------------
// Relationships
// ---------------------------------------------------------------------------

export const hasSkillRels: HasSkillRel[] = [
  // Alice — strong full-stack + graph
  { developerId: "dev-alice-chen", skillId: "skill-typescript", level: 5 },
  { developerId: "dev-alice-chen", skillId: "skill-react-dev", level: 4 },
  { developerId: "dev-alice-chen", skillId: "skill-node-backend", level: 4 },
  { developerId: "dev-alice-chen", skillId: "skill-fullstack", level: 5 },
  { developerId: "dev-alice-chen", skillId: "skill-graph-db", level: 3 },
  { developerId: "dev-alice-chen", skillId: "skill-system-design", level: 4 },
  // Bob — backend focus
  { developerId: "dev-bob-martinez", skillId: "skill-node-backend", level: 4 },
  { developerId: "dev-bob-martinez", skillId: "skill-express", level: 5 },
  { developerId: "dev-bob-martinez", skillId: "skill-postgresql", level: 4 },
  { developerId: "dev-bob-martinez", skillId: "skill-rest-api", level: 4 },
  { developerId: "dev-bob-martinez", skillId: "skill-docker", level: 3 },
  // Carol — frontend lead
  { developerId: "dev-carol-okonkwo", skillId: "skill-react-dev", level: 5 },
  { developerId: "dev-carol-okonkwo", skillId: "skill-typescript", level: 5 },
  { developerId: "dev-carol-okonkwo", skillId: "skill-nextjs-dev", level: 4 },
  { developerId: "dev-carol-okonkwo", skillId: "skill-frontend-arch", level: 5 },
  { developerId: "dev-carol-okonkwo", skillId: "skill-tech-leadership", level: 4 },
  // David — DevOps
  { developerId: "dev-david-kim", skillId: "skill-docker", level: 5 },
  { developerId: "dev-david-kim", skillId: "skill-aws", level: 5 },
  { developerId: "dev-david-kim", skillId: "skill-devops", level: 5 },
  { developerId: "dev-david-kim", skillId: "skill-cicd", level: 4 },
  { developerId: "dev-david-kim", skillId: "skill-backend-arch", level: 3 },
  // Eva — graph specialist (direct graph skills)
  { developerId: "dev-eva-johansson", skillId: "skill-graph-db", level: 5 },
  { developerId: "dev-eva-johansson", skillId: "skill-cypher", level: 5 },
  { developerId: "dev-eva-johansson", skillId: "skill-data-modeling", level: 5 },
  { developerId: "dev-eva-johansson", skillId: "skill-python", level: 4 },
  { developerId: "dev-eva-johansson", skillId: "skill-system-design", level: 4 },
  // Frank — Python backend
  { developerId: "dev-frank-obrien", skillId: "skill-python", level: 5 },
  { developerId: "dev-frank-obrien", skillId: "skill-fastapi", level: 5 },
  { developerId: "dev-frank-obrien", skillId: "skill-postgresql", level: 4 },
  { developerId: "dev-frank-obrien", skillId: "skill-rest-api", level: 4 },
  { developerId: "dev-frank-obrien", skillId: "skill-docker", level: 3 },
  // Grace — mid full-stack
  { developerId: "dev-grace-liu", skillId: "skill-typescript", level: 3 },
  { developerId: "dev-grace-liu", skillId: "skill-react-dev", level: 3 },
  { developerId: "dev-grace-liu", skillId: "skill-node-backend", level: 3 },
  { developerId: "dev-grace-liu", skillId: "skill-mongodb", level: 3 },
  { developerId: "dev-grace-liu", skillId: "skill-fullstack", level: 3 },
  // Henry — staff engineer (broad)
  { developerId: "dev-henry-walsh", skillId: "skill-system-design", level: 5 },
  { developerId: "dev-henry-walsh", skillId: "skill-backend-arch", level: 5 },
  { developerId: "dev-henry-walsh", skillId: "skill-tech-leadership", level: 5 },
  { developerId: "dev-henry-walsh", skillId: "skill-typescript", level: 4 },
  { developerId: "dev-henry-walsh", skillId: "skill-aws", level: 4 },
  { developerId: "dev-henry-walsh", skillId: "skill-graphql-api", level: 4 },
  // Isabel — junior frontend (NO graph db skill — enables indirect path demo)
  { developerId: "dev-isabel-torres", skillId: "skill-javascript", level: 3 },
  { developerId: "dev-isabel-torres", skillId: "skill-react-dev", level: 3 },
  { developerId: "dev-isabel-torres", skillId: "skill-typescript", level: 2 },
  { developerId: "dev-isabel-torres", skillId: "skill-agile", level: 3 },
  // James — platform
  { developerId: "dev-james-patel", skillId: "skill-docker", level: 5 },
  { developerId: "dev-james-patel", skillId: "skill-aws", level: 4 },
  { developerId: "dev-james-patel", skillId: "skill-devops", level: 5 },
  { developerId: "dev-james-patel", skillId: "skill-node-backend", level: 4 },
  { developerId: "dev-james-patel", skillId: "skill-backend-arch", level: 4 },
];

export const workedOnRels: WorkedOnRel[] = [
  // JobGraph — shared by Alice, Eva, Carol, Grace (collaboration hub)
  { developerId: "dev-alice-chen", projectId: "proj-jobgraph", role: "Tech Lead" },
  { developerId: "dev-eva-johansson", projectId: "proj-jobgraph", role: "Graph Architect" },
  { developerId: "dev-carol-okonkwo", projectId: "proj-jobgraph", role: "Frontend Lead" },
  { developerId: "dev-grace-liu", projectId: "proj-jobgraph", role: "Full-Stack Developer" },
  { developerId: "dev-isabel-torres", projectId: "proj-jobgraph", role: "Frontend Developer" },
  // Payment Gateway — Bob, Henry, Frank
  { developerId: "dev-bob-martinez", projectId: "proj-payment-gateway", role: "Backend Developer" },
  { developerId: "dev-henry-walsh", projectId: "proj-payment-gateway", role: "Architect" },
  { developerId: "dev-frank-obrien", projectId: "proj-payment-gateway", role: "API Developer" },
  // Analytics Dashboard — Carol, Alice
  { developerId: "dev-carol-okonkwo", projectId: "proj-analytics-dashboard", role: "Lead Frontend" },
  { developerId: "dev-alice-chen", projectId: "proj-analytics-dashboard", role: "Full-Stack Developer" },
  // Health Portal — Grace, Bob
  { developerId: "dev-grace-liu", projectId: "proj-health-portal", role: "Full-Stack Developer" },
  { developerId: "dev-bob-martinez", projectId: "proj-health-portal", role: "Backend Developer" },
  // Chat Platform — Bob, James
  { developerId: "dev-bob-martinez", projectId: "proj-chat-platform", role: "Backend Lead" },
  { developerId: "dev-james-patel", projectId: "proj-chat-platform", role: "Platform Engineer" },
  // ML Pipeline — Frank, Henry, David
  { developerId: "dev-frank-obrien", projectId: "proj-ml-pipeline", role: "Backend Developer" },
  { developerId: "dev-henry-walsh", projectId: "proj-ml-pipeline", role: "Staff Engineer" },
  { developerId: "dev-david-kim", projectId: "proj-ml-pipeline", role: "DevOps Engineer" },
  // API Gateway — James, Bob, Henry
  { developerId: "dev-james-patel", projectId: "proj-api-gateway", role: "Platform Lead" },
  { developerId: "dev-bob-martinez", projectId: "proj-api-gateway", role: "Backend Developer" },
  { developerId: "dev-henry-walsh", projectId: "proj-api-gateway", role: "Architect" },
  // E-commerce — Carol, Grace, Isabel
  { developerId: "dev-carol-okonkwo", projectId: "proj-ecommerce", role: "Frontend Lead" },
  { developerId: "dev-grace-liu", projectId: "proj-ecommerce", role: "Full-Stack Developer" },
  { developerId: "dev-isabel-torres", projectId: "proj-ecommerce", role: "Frontend Developer" },
  // Inventory — Frank, Bob
  { developerId: "dev-frank-obrien", projectId: "proj-inventory", role: "Backend Lead" },
  { developerId: "dev-bob-martinez", projectId: "proj-inventory", role: "Backend Developer" },
  // Developer Portal — Alice, Carol, James
  { developerId: "dev-alice-chen", projectId: "proj-developer-portal", role: "Tech Lead" },
  { developerId: "dev-carol-okonkwo", projectId: "proj-developer-portal", role: "Frontend Developer" },
  { developerId: "dev-james-patel", projectId: "proj-developer-portal", role: "DevOps" },
];

export const builtWithRels: BuiltWithRel[] = [
  { projectId: "proj-jobgraph", technologyId: "tech-neo4j" },
  { projectId: "proj-jobgraph", technologyId: "tech-react" },
  { projectId: "proj-jobgraph", technologyId: "tech-nextjs" },
  { projectId: "proj-jobgraph", technologyId: "tech-nodejs" },
  { projectId: "proj-jobgraph", technologyId: "tech-typescript" },
  { projectId: "proj-payment-gateway", technologyId: "tech-nodejs" },
  { projectId: "proj-payment-gateway", technologyId: "tech-express" },
  { projectId: "proj-payment-gateway", technologyId: "tech-postgresql" },
  { projectId: "proj-analytics-dashboard", technologyId: "tech-react" },
  { projectId: "proj-analytics-dashboard", technologyId: "tech-typescript" },
  { projectId: "proj-analytics-dashboard", technologyId: "tech-graphql" },
  { projectId: "proj-health-portal", technologyId: "tech-nextjs" },
  { projectId: "proj-health-portal", technologyId: "tech-typescript" },
  { projectId: "proj-health-portal", technologyId: "tech-mongodb" },
  { projectId: "proj-chat-platform", technologyId: "tech-nodejs" },
  { projectId: "proj-chat-platform", technologyId: "tech-mongodb" },
  { projectId: "proj-ml-pipeline", technologyId: "tech-python" },
  { projectId: "proj-ml-pipeline", technologyId: "tech-fastapi" },
  { projectId: "proj-ml-pipeline", technologyId: "tech-postgresql" },
  { projectId: "proj-api-gateway", technologyId: "tech-nodejs" },
  { projectId: "proj-api-gateway", technologyId: "tech-express" },
  { projectId: "proj-ecommerce", technologyId: "tech-nextjs" },
  { projectId: "proj-ecommerce", technologyId: "tech-react" },
  { projectId: "proj-ecommerce", technologyId: "tech-graphql" },
  { projectId: "proj-inventory", technologyId: "tech-python" },
  { projectId: "proj-inventory", technologyId: "tech-fastapi" },
  { projectId: "proj-developer-portal", technologyId: "tech-react" },
  { projectId: "proj-developer-portal", technologyId: "tech-nodejs" },
  { projectId: "proj-developer-portal", technologyId: "tech-graphql" },
];

export const usesRels: UsesRel[] = [
  { projectId: "proj-jobgraph", technologyId: "tech-express" },
  { projectId: "proj-jobgraph", technologyId: "tech-docker" },
  { projectId: "proj-jobgraph", technologyId: "tech-cypher" },
  { projectId: "proj-jobgraph", technologyId: "tech-tailwind" },
  { projectId: "proj-payment-gateway", technologyId: "tech-docker" },
  { projectId: "proj-payment-gateway", technologyId: "tech-aws" },
  { projectId: "proj-analytics-dashboard", technologyId: "tech-postgresql" },
  { projectId: "proj-analytics-dashboard", technologyId: "tech-aws" },
  { projectId: "proj-health-portal", technologyId: "tech-aws" },
  { projectId: "proj-health-portal", technologyId: "tech-docker" },
  { projectId: "proj-chat-platform", technologyId: "tech-redis" },
  { projectId: "proj-chat-platform", technologyId: "tech-docker" },
  { projectId: "proj-ml-pipeline", technologyId: "tech-docker" },
  { projectId: "proj-ml-pipeline", technologyId: "tech-aws" },
  { projectId: "proj-api-gateway", technologyId: "tech-docker" },
  { projectId: "proj-api-gateway", technologyId: "tech-kubernetes" },
  { projectId: "proj-api-gateway", technologyId: "tech-aws" },
  { projectId: "proj-ecommerce", technologyId: "tech-typescript" },
  { projectId: "proj-ecommerce", technologyId: "tech-tailwind" },
  { projectId: "proj-inventory", technologyId: "tech-postgresql" },
  { projectId: "proj-inventory", technologyId: "tech-mongodb" },
  { projectId: "proj-developer-portal", technologyId: "tech-typescript" },
  { projectId: "proj-developer-portal", technologyId: "tech-docker" },
  { projectId: "proj-developer-portal", technologyId: "tech-jest" },
];

export const relatedToRels: RelatedToRel[] = [
  { technologyId: "tech-react", skillId: "skill-react-dev", strength: 0.95 },
  { technologyId: "tech-react", skillId: "skill-frontend-arch", strength: 0.8 },
  { technologyId: "tech-nextjs", skillId: "skill-nextjs-dev", strength: 0.95 },
  { technologyId: "tech-nextjs", skillId: "skill-fullstack", strength: 0.85 },
  { technologyId: "tech-nextjs", skillId: "skill-react-dev", strength: 0.7 },
  { technologyId: "tech-nodejs", skillId: "skill-node-backend", strength: 0.95 },
  { technologyId: "tech-nodejs", skillId: "skill-backend-arch", strength: 0.8 },
  { technologyId: "tech-express", skillId: "skill-express", strength: 0.95 },
  { technologyId: "tech-express", skillId: "skill-rest-api", strength: 0.85 },
  { technologyId: "tech-typescript", skillId: "skill-typescript", strength: 0.95 },
  { technologyId: "tech-typescript", skillId: "skill-fullstack", strength: 0.75 },
  { technologyId: "tech-python", skillId: "skill-python", strength: 0.95 },
  { technologyId: "tech-python", skillId: "skill-backend-arch", strength: 0.7 },
  { technologyId: "tech-fastapi", skillId: "skill-fastapi", strength: 0.95 },
  { technologyId: "tech-fastapi", skillId: "skill-rest-api", strength: 0.8 },
  { technologyId: "tech-postgresql", skillId: "skill-postgresql", strength: 0.95 },
  { technologyId: "tech-postgresql", skillId: "skill-data-modeling", strength: 0.85 },
  { technologyId: "tech-mongodb", skillId: "skill-mongodb", strength: 0.95 },
  { technologyId: "tech-mongodb", skillId: "skill-data-modeling", strength: 0.75 },
  { technologyId: "tech-docker", skillId: "skill-docker", strength: 0.95 },
  { technologyId: "tech-docker", skillId: "skill-devops", strength: 0.8 },
  { technologyId: "tech-docker", skillId: "skill-cicd", strength: 0.7 },
  { technologyId: "tech-aws", skillId: "skill-aws", strength: 0.95 },
  { technologyId: "tech-aws", skillId: "skill-devops", strength: 0.85 },
  { technologyId: "tech-graphql", skillId: "skill-graphql-api", strength: 0.95 },
  { technologyId: "tech-graphql", skillId: "skill-rest-api", strength: 0.6 },
  { technologyId: "tech-neo4j", skillId: "skill-graph-db", strength: 0.95 },
  { technologyId: "tech-neo4j", skillId: "skill-data-modeling", strength: 0.8 },
  { technologyId: "tech-cypher", skillId: "skill-cypher", strength: 0.95 },
  { technologyId: "tech-cypher", skillId: "skill-graph-db", strength: 0.9 },
  { technologyId: "tech-redis", skillId: "skill-backend-arch", strength: 0.6 },
  { technologyId: "tech-kubernetes", skillId: "skill-devops", strength: 0.9 },
  { technologyId: "tech-kubernetes", skillId: "skill-docker", strength: 0.7 },
  { technologyId: "tech-tailwind", skillId: "skill-frontend-arch", strength: 0.7 },
  { technologyId: "tech-jest", skillId: "skill-agile", strength: 0.5 },
];

export const requiresRels: RequiresRel[] = [
  // Senior Full-Stack @ Wexa
  { jobId: "job-senior-fullstack-wexa", skillId: "skill-typescript", importance: "required", minLevel: 4 },
  { jobId: "job-senior-fullstack-wexa", skillId: "skill-react-dev", importance: "required", minLevel: 4 },
  { jobId: "job-senior-fullstack-wexa", skillId: "skill-node-backend", importance: "required", minLevel: 3 },
  { jobId: "job-senior-fullstack-wexa", skillId: "skill-graph-db", importance: "preferred", minLevel: 2 },
  { jobId: "job-senior-fullstack-wexa", skillId: "skill-fullstack", importance: "required", minLevel: 4 },
  // Backend Engineer @ Wexa
  { jobId: "job-backend-engineer-wexa", skillId: "skill-node-backend", importance: "required", minLevel: 3 },
  { jobId: "job-backend-engineer-wexa", skillId: "skill-express", importance: "required", minLevel: 3 },
  { jobId: "job-backend-engineer-wexa", skillId: "skill-postgresql", importance: "required", minLevel: 3 },
  { jobId: "job-backend-engineer-wexa", skillId: "skill-rest-api", importance: "required", minLevel: 3 },
  { jobId: "job-backend-engineer-wexa", skillId: "skill-system-design", importance: "preferred", minLevel: 3 },
  // Graph Database Engineer @ Wexa
  { jobId: "job-graph-engineer-wexa", skillId: "skill-graph-db", importance: "required", minLevel: 4 },
  { jobId: "job-graph-engineer-wexa", skillId: "skill-cypher", importance: "required", minLevel: 4 },
  { jobId: "job-graph-engineer-wexa", skillId: "skill-data-modeling", importance: "required", minLevel: 3 },
  { jobId: "job-graph-engineer-wexa", skillId: "skill-python", importance: "preferred", minLevel: 3 },
  // Frontend @ CloudScale
  { jobId: "job-frontend-cloudscale", skillId: "skill-react-dev", importance: "required", minLevel: 3 },
  { jobId: "job-frontend-cloudscale", skillId: "skill-typescript", importance: "required", minLevel: 3 },
  { jobId: "job-frontend-cloudscale", skillId: "skill-nextjs-dev", importance: "preferred", minLevel: 2 },
  { jobId: "job-frontend-cloudscale", skillId: "skill-frontend-arch", importance: "preferred", minLevel: 3 },
  // DevOps @ CloudScale
  { jobId: "job-devops-cloudscale", skillId: "skill-docker", importance: "required", minLevel: 4 },
  { jobId: "job-devops-cloudscale", skillId: "skill-aws", importance: "required", minLevel: 4 },
  { jobId: "job-devops-cloudscale", skillId: "skill-devops", importance: "required", minLevel: 4 },
  { jobId: "job-devops-cloudscale", skillId: "skill-cicd", importance: "required", minLevel: 3 },
  // Python Backend @ FinEdge
  { jobId: "job-python-backend-finedge", skillId: "skill-python", importance: "required", minLevel: 4 },
  { jobId: "job-python-backend-finedge", skillId: "skill-fastapi", importance: "required", minLevel: 3 },
  { jobId: "job-python-backend-finedge", skillId: "skill-postgresql", importance: "required", minLevel: 3 },
  { jobId: "job-python-backend-finedge", skillId: "skill-rest-api", importance: "required", minLevel: 3 },
  // Full-Stack @ FinEdge
  { jobId: "job-fullstack-finedge", skillId: "skill-typescript", importance: "required", minLevel: 3 },
  { jobId: "job-fullstack-finedge", skillId: "skill-react-dev", importance: "required", minLevel: 3 },
  { jobId: "job-fullstack-finedge", skillId: "skill-node-backend", importance: "required", minLevel: 3 },
  { jobId: "job-fullstack-finedge", skillId: "skill-mongodb", importance: "preferred", minLevel: 2 },
  // API Engineer @ HealthBridge
  { jobId: "job-api-engineer-healthbridge", skillId: "skill-graphql-api", importance: "required", minLevel: 4 },
  { jobId: "job-api-engineer-healthbridge", skillId: "skill-node-backend", importance: "required", minLevel: 3 },
  { jobId: "job-api-engineer-healthbridge", skillId: "skill-express", importance: "required", minLevel: 3 },
  { jobId: "job-api-engineer-healthbridge", skillId: "skill-rest-api", importance: "preferred", minLevel: 3 },
  // Platform @ DevTools
  { jobId: "job-platform-devtools", skillId: "skill-docker", importance: "required", minLevel: 4 },
  { jobId: "job-platform-devtools", skillId: "skill-devops", importance: "required", minLevel: 4 },
  { jobId: "job-platform-devtools", skillId: "skill-aws", importance: "required", minLevel: 3 },
  { jobId: "job-platform-devtools", skillId: "skill-backend-arch", importance: "preferred", minLevel: 3 },
  // Junior Frontend @ DevTools
  { jobId: "job-junior-frontend-devtools", skillId: "skill-react-dev", importance: "required", minLevel: 2 },
  { jobId: "job-junior-frontend-devtools", skillId: "skill-javascript", importance: "required", minLevel: 3 },
  { jobId: "job-junior-frontend-devtools", skillId: "skill-typescript", importance: "preferred", minLevel: 2 },
  // Data Engineer @ DataStream
  { jobId: "job-data-engineer-datastream", skillId: "skill-python", importance: "required", minLevel: 3 },
  { jobId: "job-data-engineer-datastream", skillId: "skill-postgresql", importance: "required", minLevel: 4 },
  { jobId: "job-data-engineer-datastream", skillId: "skill-aws", importance: "required", minLevel: 3 },
  { jobId: "job-data-engineer-datastream", skillId: "skill-data-modeling", importance: "required", minLevel: 3 },
  // Staff Engineer @ DataStream
  { jobId: "job-staff-engineer-datastream", skillId: "skill-system-design", importance: "required", minLevel: 5 },
  { jobId: "job-staff-engineer-datastream", skillId: "skill-backend-arch", importance: "required", minLevel: 4 },
  { jobId: "job-staff-engineer-datastream", skillId: "skill-tech-leadership", importance: "required", minLevel: 4 },
  { jobId: "job-staff-engineer-datastream", skillId: "skill-aws", importance: "preferred", minLevel: 3 },
];
