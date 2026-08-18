// Shared graph model types — aligned with database/schema/README.md

export interface Developer {
  id: string;
  name: string;
  title: string;
  experienceYears: number;
  location: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  experienceLevel: string;
  employmentType: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  domain: string;
}

export interface Technology {
  id: string;
  name: string;
  category: string;
}

// Relationship property types

export interface HasSkillRel {
  level: number;
}

export interface WorkedOnRel {
  role: string;
}

export interface RelatedToRel {
  strength: number;
}

export interface RequiresRel {
  importance: "required" | "preferred";
  minLevel?: number;
}

export interface PostedByRel {
  postedDate?: string;
}
