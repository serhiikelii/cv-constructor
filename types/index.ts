// Personal information interface
export interface PersonalDetails {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  photo?: string;
  summary?: string;
}

// Work experience interface
export interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null; // null for current position
  current: boolean;
  description: string[];
}

// Education interface
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location?: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  achievements?: string[];
}

// Skills interface
export interface Skills {
  technical: string[];
  languages: Array<{
    language: string;
    proficiency: "Native" | "Fluent" | "Professional" | "Intermediate" | "Basic";
  }>;
  soft?: string[];
}

// Certifications interface
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

// Projects interface
export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
}

// Complete resume interface
export interface Resume {
  id: string;
  personalDetails: PersonalDetails;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  certifications?: Certification[];
  projects?: Project[];
  template: "classic" | "modern" | "minimal";
  createdAt: string;
  updatedAt: string;
}

// Resume metadata for storage
export interface ResumeMetadata {
  id: string;
  name: string;
  template: "classic" | "modern" | "minimal";
  lastModified: string;
}
