import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  Resume,
  PersonalDetails,
  Experience,
  Education,
  Skills,
  Certification,
  Project,
} from "@/types";
import { mockResume } from "./mockData";

// Initial empty resume state
const initialResume: Resume = {
  id: crypto.randomUUID(),
  personalDetails: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
  },
  experience: [],
  education: [],
  skills: {
    technical: [],
    languages: [],
  },
  certifications: [],
  projects: [],
  template: "classic",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

interface ResumeStore {
  resume: Resume;

  // Personal Details actions
  updatePersonalDetails: (details: Partial<PersonalDetails>) => void;

  // Experience actions
  addExperience: (experience: Omit<Experience, "id">) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  reorderExperience: (startIndex: number, endIndex: number) => void;

  // Education actions
  addEducation: (education: Omit<Education, "id">) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  reorderEducation: (startIndex: number, endIndex: number) => void;

  // Skills actions
  updateSkills: (skills: Partial<Skills>) => void;
  addTechnicalSkill: (skill: string) => void;
  removeTechnicalSkill: (skill: string) => void;
  addLanguage: (language: Skills["languages"][0]) => void;
  removeLanguage: (language: string) => void;

  // Certification actions
  addCertification: (certification: Omit<Certification, "id">) => void;
  updateCertification: (
    id: string,
    certification: Partial<Certification>
  ) => void;
  deleteCertification: (id: string) => void;

  // Project actions
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Template actions
  setTemplate: (template: Resume["template"]) => void;

  // Utility actions
  resetResume: () => void;
  loadResume: (resume: Resume) => void;
  loadDemoData: () => void;
  clearStorage: () => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resume: initialResume,

      // Personal Details
      updatePersonalDetails: (details) =>
        set((state) => ({
          resume: {
            ...state.resume,
            personalDetails: {
              ...state.resume.personalDetails,
              ...details,
            },
            updatedAt: new Date().toISOString(),
          },
        })),

      // Experience
      addExperience: (experience) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: [
              ...state.resume.experience,
              { ...experience, id: crypto.randomUUID() },
            ],
            updatedAt: new Date().toISOString(),
          },
        })),

      updateExperience: (id, experience) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.map((exp) =>
              exp.id === id ? { ...exp, ...experience } : exp
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      deleteExperience: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.filter((exp) => exp.id !== id),
            updatedAt: new Date().toISOString(),
          },
        })),

      reorderExperience: (startIndex, endIndex) =>
        set((state) => {
          const result = Array.from(state.resume.experience);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);

          return {
            resume: {
              ...state.resume,
              experience: result,
              updatedAt: new Date().toISOString(),
            },
          };
        }),

      // Education
      addEducation: (education) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: [
              ...state.resume.education,
              { ...education, id: crypto.randomUUID() },
            ],
            updatedAt: new Date().toISOString(),
          },
        })),

      updateEducation: (id, education) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.map((edu) =>
              edu.id === id ? { ...edu, ...education } : edu
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      deleteEducation: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.filter((edu) => edu.id !== id),
            updatedAt: new Date().toISOString(),
          },
        })),

      reorderEducation: (startIndex, endIndex) =>
        set((state) => {
          const result = Array.from(state.resume.education);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);

          return {
            resume: {
              ...state.resume,
              education: result,
              updatedAt: new Date().toISOString(),
            },
          };
        }),

      // Skills
      updateSkills: (skills) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: {
              ...state.resume.skills,
              ...skills,
            },
            updatedAt: new Date().toISOString(),
          },
        })),

      addTechnicalSkill: (skill) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: {
              ...state.resume.skills,
              technical: [...state.resume.skills.technical, skill],
            },
            updatedAt: new Date().toISOString(),
          },
        })),

      removeTechnicalSkill: (skill) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: {
              ...state.resume.skills,
              technical: state.resume.skills.technical.filter(
                (s) => s !== skill
              ),
            },
            updatedAt: new Date().toISOString(),
          },
        })),

      addLanguage: (language) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: {
              ...state.resume.skills,
              languages: [...state.resume.skills.languages, language],
            },
            updatedAt: new Date().toISOString(),
          },
        })),

      removeLanguage: (languageName) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: {
              ...state.resume.skills,
              languages: state.resume.skills.languages.filter(
                (lang) => lang.language !== languageName
              ),
            },
            updatedAt: new Date().toISOString(),
          },
        })),

      // Certifications
      addCertification: (certification) =>
        set((state) => ({
          resume: {
            ...state.resume,
            certifications: [
              ...(state.resume.certifications || []),
              { ...certification, id: crypto.randomUUID() },
            ],
            updatedAt: new Date().toISOString(),
          },
        })),

      updateCertification: (id, certification) =>
        set((state) => ({
          resume: {
            ...state.resume,
            certifications: (state.resume.certifications || []).map((cert) =>
              cert.id === id ? { ...cert, ...certification } : cert
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      deleteCertification: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            certifications: (state.resume.certifications || []).filter(
              (cert) => cert.id !== id
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      // Projects
      addProject: (project) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: [
              ...(state.resume.projects || []),
              { ...project, id: crypto.randomUUID() },
            ],
            updatedAt: new Date().toISOString(),
          },
        })),

      updateProject: (id, project) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: (state.resume.projects || []).map((proj) =>
              proj.id === id ? { ...proj, ...project } : proj
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      deleteProject: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: (state.resume.projects || []).filter(
              (proj) => proj.id !== id
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      // Template
      setTemplate: (template) =>
        set((state) => ({
          resume: {
            ...state.resume,
            template,
            updatedAt: new Date().toISOString(),
          },
        })),

      // Utility
      resetResume: () =>
        set({
          resume: {
            ...initialResume,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        }),

      loadResume: (resume) =>
        set({
          resume: {
            ...resume,
            updatedAt: new Date().toISOString(),
          },
        }),

      loadDemoData: () =>
        set({
          resume: {
            ...mockResume,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        }),

      clearStorage: () => {
        useResumeStore.persist.clearStorage();
      },
    }),
    {
      name: "cv-constructor-resume",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
