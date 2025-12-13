// Skills database for Smart Skills Selector
// Classified into: Hard Skills, Tools, and Soft Skills

export type SkillCategory =
  | 'Development'
  | 'Design'
  | 'Marketing'
  | 'Management'
  | 'Soft Skills';

export type SkillSubcategory = 'hard' | 'tool' | 'soft';

export interface SkillSuggestion {
  id: string;
  name: string;
  category: SkillCategory;
  subcategory?: SkillSubcategory; // Determines display section: hard skill, tool, or soft skill
  popular: boolean;
}

// IT & Development - Core Technologies (HARD SKILLS)
const coreTechSkills: SkillSuggestion[] = [
  { id: 'js', name: 'JavaScript', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'ts', name: 'TypeScript', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'python', name: 'Python', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'java', name: 'Java', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'csharp', name: 'C#', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'cpp', name: 'C++', category: 'Development', subcategory: 'hard', popular: false },
  { id: 'go', name: 'Go (Golang)', category: 'Development', subcategory: 'hard', popular: false },
  { id: 'php', name: 'PHP', category: 'Development', subcategory: 'hard', popular: false },
  { id: 'ruby', name: 'Ruby', category: 'Development', subcategory: 'hard', popular: false },
  { id: 'swift', name: 'Swift', category: 'Development', subcategory: 'hard', popular: false },
  { id: 'kotlin', name: 'Kotlin', category: 'Development', subcategory: 'hard', popular: false },
  { id: 'rust', name: 'Rust', category: 'Development', subcategory: 'hard', popular: false },
  { id: 'sql', name: 'SQL', category: 'Development', subcategory: 'hard', popular: true },
];

// Frontend Development (HARD SKILLS)
const frontendSkills: SkillSuggestion[] = [
  { id: 'react', name: 'React', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'nextjs', name: 'Next.js', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'vue', name: 'Vue.js', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'angular', name: 'Angular', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'html5', name: 'HTML5', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'css3', name: 'CSS3', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'sass', name: 'SASS/SCSS', category: 'Development', subcategory: 'hard', popular: false },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'redux', name: 'Redux', category: 'Development', subcategory: 'hard', popular: false },
  { id: 'zustand', name: 'Zustand', category: 'Development', subcategory: 'hard', popular: false },
  { id: 'webpack', name: 'Webpack', category: 'Development', subcategory: 'tool', popular: false },
  { id: 'vite', name: 'Vite', category: 'Development', subcategory: 'tool', popular: true },
];

// Backend & Database (HARD SKILLS)
const backendSkills: SkillSuggestion[] = [
  { id: 'nodejs', name: 'Node.js', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'express', name: 'Express', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'nestjs', name: 'NestJS', category: 'Development', subcategory: 'hard', popular: false },
  { id: 'django', name: 'Django', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'springboot', name: 'Spring Boot', category: 'Development', subcategory: 'hard', popular: false },
  { id: 'dotnet', name: '.NET Core', category: 'Development', subcategory: 'hard', popular: false },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'mongodb', name: 'MongoDB', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'mysql', name: 'MySQL', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'redis', name: 'Redis', category: 'Development', subcategory: 'hard', popular: false },
  { id: 'graphql', name: 'GraphQL', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'restapi', name: 'REST API', category: 'Development', subcategory: 'hard', popular: true },
];

// DevOps & Tools
const devopsSkills: SkillSuggestion[] = [
  { id: 'git', name: 'Git', category: 'Development', subcategory: 'tool', popular: true },
  { id: 'github', name: 'GitHub/GitLab', category: 'Development', subcategory: 'tool', popular: true },
  { id: 'docker', name: 'Docker', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'kubernetes', name: 'Kubernetes', category: 'Development', subcategory: 'hard', popular: false },
  { id: 'aws', name: 'AWS', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'azure', name: 'Azure', category: 'Development', subcategory: 'hard', popular: false },
  { id: 'gcp', name: 'Google Cloud', category: 'Development', subcategory: 'hard', popular: false },
  { id: 'cicd', name: 'CI/CD', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'linux', name: 'Linux', category: 'Development', subcategory: 'hard', popular: true },
  { id: 'nginx', name: 'Nginx', category: 'Development', subcategory: 'hard', popular: false },
  { id: 'terraform', name: 'Terraform', category: 'Development', subcategory: 'hard', popular: false },
  { id: 'jenkins', name: 'Jenkins', category: 'Development', subcategory: 'tool', popular: false },
];

// Design & Creative - Tools
const designToolsSkills: SkillSuggestion[] = [
  { id: 'figma', name: 'Figma', category: 'Design', subcategory: 'tool', popular: true },
  { id: 'photoshop', name: 'Adobe Photoshop', category: 'Design', subcategory: 'tool', popular: true },
  { id: 'illustrator', name: 'Adobe Illustrator', category: 'Design', subcategory: 'tool', popular: true },
  { id: 'aftereffects', name: 'Adobe After Effects', category: 'Design', subcategory: 'tool', popular: false },
  { id: 'indesign', name: 'Adobe InDesign', category: 'Design', subcategory: 'tool', popular: false },
  { id: 'sketch', name: 'Sketch', category: 'Design', subcategory: 'tool', popular: false },
  { id: 'cinema4d', name: 'Cinema 4D', category: 'Design', subcategory: 'tool', popular: false },
  { id: 'blender', name: 'Blender', category: 'Design', subcategory: 'tool', popular: false },
  { id: 'miro', name: 'Miro', category: 'Design', subcategory: 'tool', popular: false },
  { id: 'protopie', name: 'ProtoPie', category: 'Design', subcategory: 'tool', popular: false },
];

// Design & Creative - Disciplines (HARD SKILLS)
const designDisciplineSkills: SkillSuggestion[] = [
  { id: 'uidesign', name: 'UI Design', category: 'Design', subcategory: 'hard', popular: true },
  { id: 'uxresearch', name: 'UX Research', category: 'Design', subcategory: 'hard', popular: true },
  { id: 'prototyping', name: 'Prototyping', category: 'Design', subcategory: 'hard', popular: true },
  { id: 'wireframing', name: 'Wireframing', category: 'Design', subcategory: 'hard', popular: true },
  { id: 'usertesting', name: 'User Testing', category: 'Design', subcategory: 'hard', popular: false },
  { id: 'designsystems', name: 'Design Systems', category: 'Design', subcategory: 'hard', popular: true },
  { id: 'typography', name: 'Typography', category: 'Design', subcategory: 'hard', popular: false },
  { id: 'colortheory', name: 'Color Theory', category: 'Design', subcategory: 'hard', popular: false },
  { id: 'motiondesign', name: 'Motion Design', category: 'Design', subcategory: 'hard', popular: false },
  { id: '3dmodeling', name: '3D Modeling', category: 'Design', subcategory: 'hard', popular: false },
  { id: 'branding', name: 'Branding', category: 'Design', subcategory: 'hard', popular: false },
];

// Product & Project Management - Methodologies (HARD SKILLS)
const managementMethodSkills: SkillSuggestion[] = [
  { id: 'agile', name: 'Agile', category: 'Management', subcategory: 'hard', popular: true },
  { id: 'scrum', name: 'Scrum', category: 'Management', subcategory: 'hard', popular: true },
  { id: 'kanban', name: 'Kanban', category: 'Management', subcategory: 'hard', popular: true },
  { id: 'waterfall', name: 'Waterfall', category: 'Management', subcategory: 'hard', popular: false },
  { id: 'lean', name: 'Lean', category: 'Management', subcategory: 'hard', popular: false },
  { id: 'sixsigma', name: 'Six Sigma', category: 'Management', subcategory: 'hard', popular: false },
];

// Product & Project Management - Skills & Processes (HARD SKILLS)
const managementProcessSkills: SkillSuggestion[] = [
  { id: 'roadmap', name: 'Roadmap Planning', category: 'Management', subcategory: 'hard', popular: true },
  { id: 'backlog', name: 'Backlog Grooming', category: 'Management', subcategory: 'hard', popular: false },
  { id: 'sprint', name: 'Sprint Planning', category: 'Management', subcategory: 'hard', popular: true },
  { id: 'stakeholder', name: 'Stakeholder Management', category: 'Management', subcategory: 'hard', popular: true },
  { id: 'risk', name: 'Risk Management', category: 'Management', subcategory: 'hard', popular: false },
  { id: 'resource', name: 'Resource Planning', category: 'Management', subcategory: 'hard', popular: false },
  { id: 'userstories', name: 'User Stories', category: 'Management', subcategory: 'hard', popular: true },
  { id: 'abtesting', name: 'A/B Testing', category: 'Management', subcategory: 'hard', popular: false },
  { id: 'productstrategy', name: 'Product Strategy', category: 'Management', subcategory: 'hard', popular: true },
  { id: 'okrs', name: 'OKRs', category: 'Management', subcategory: 'hard', popular: false },
  { id: 'kpi', name: 'KPI Tracking', category: 'Management', subcategory: 'hard', popular: true },
];

// Product & Project Management - Tools
const managementToolsSkills: SkillSuggestion[] = [
  { id: 'jira', name: 'Jira', category: 'Management', subcategory: 'tool', popular: true },
  { id: 'confluence', name: 'Confluence', category: 'Management', subcategory: 'tool', popular: false },
  { id: 'trello', name: 'Trello', category: 'Management', subcategory: 'tool', popular: false },
  { id: 'asana', name: 'Asana', category: 'Management', subcategory: 'tool', popular: false },
  { id: 'notion', name: 'Notion', category: 'Management', subcategory: 'tool', popular: true },
  { id: 'monday', name: 'Monday.com', category: 'Management', subcategory: 'tool', popular: false },
  { id: 'linear', name: 'Linear', category: 'Management', subcategory: 'tool', popular: false },
  { id: 'msproject', name: 'Microsoft Project', category: 'Management', subcategory: 'tool', popular: false },
];

// Marketing & Analytics - Digital Marketing (HARD SKILLS)
const marketingDigitalSkills: SkillSuggestion[] = [
  { id: 'seo', name: 'SEO', category: 'Marketing', subcategory: 'hard', popular: true },
  { id: 'sem', name: 'SEM', category: 'Marketing', subcategory: 'hard', popular: false },
  { id: 'googleads', name: 'Google Ads', category: 'Marketing', subcategory: 'hard', popular: true },
  { id: 'facebookads', name: 'Facebook Ads', category: 'Marketing', subcategory: 'hard', popular: true },
  { id: 'contentmarketing', name: 'Content Marketing', category: 'Marketing', subcategory: 'hard', popular: true },
  { id: 'emailmarketing', name: 'Email Marketing', category: 'Marketing', subcategory: 'hard', popular: true },
  { id: 'smm', name: 'SMM', category: 'Marketing', subcategory: 'hard', popular: true },
  { id: 'copywriting', name: 'Copywriting', category: 'Marketing', subcategory: 'hard', popular: true },
  { id: 'affiliate', name: 'Affiliate Marketing', category: 'Marketing', subcategory: 'hard', popular: false },
  { id: 'growthhacking', name: 'Growth Hacking', category: 'Marketing', subcategory: 'hard', popular: false },
];

// Marketing & Analytics - Analytics & Data (HARD SKILLS)
const marketingAnalyticsSkills: SkillSuggestion[] = [
  { id: 'ga4', name: 'Google Analytics 4', category: 'Marketing', subcategory: 'tool', popular: true },
  { id: 'gtm', name: 'Google Tag Manager', category: 'Marketing', subcategory: 'tool', popular: true },
  { id: 'yandexmetrica', name: 'Yandex Metrica', category: 'Marketing', subcategory: 'tool', popular: false },
  { id: 'excel', name: 'Excel (Advanced)', category: 'Marketing', subcategory: 'tool', popular: true },
  { id: 'tableau', name: 'Tableau', category: 'Marketing', subcategory: 'tool', popular: false },
  { id: 'powerbi', name: 'Power BI', category: 'Marketing', subcategory: 'tool', popular: true },
  { id: 'sqlanalytics', name: 'SQL for Analytics', category: 'Marketing', subcategory: 'hard', popular: true },
  { id: 'pandas', name: 'Python (Pandas)', category: 'Marketing', subcategory: 'hard', popular: false },
  { id: 'dataviz', name: 'Data Visualization', category: 'Marketing', subcategory: 'hard', popular: false },
];

// Marketing & Analytics - CRM & Tools
const marketingToolsSkills: SkillSuggestion[] = [
  { id: 'salesforce', name: 'Salesforce', category: 'Marketing', subcategory: 'tool', popular: true },
  { id: 'hubspot', name: 'HubSpot', category: 'Marketing', subcategory: 'tool', popular: true },
  { id: 'mailchimp', name: 'Mailchimp', category: 'Marketing', subcategory: 'tool', popular: false },
  { id: 'wordpress', name: 'WordPress', category: 'Marketing', subcategory: 'tool', popular: true },
  { id: 'shopify', name: 'Shopify', category: 'Marketing', subcategory: 'tool', popular: false },
  { id: 'zapier', name: 'Zapier', category: 'Marketing', subcategory: 'tool', popular: false },
];

// Professional Soft Skills
const softSkills: SkillSuggestion[] = [
  { id: 'crossfunctional', name: 'Cross-functional Collaboration', category: 'Soft Skills', subcategory: 'soft', popular: true },
  { id: 'mentoring', name: 'Mentoring', category: 'Soft Skills', subcategory: 'soft', popular: true },
  { id: 'teamleadership', name: 'Team Leadership', category: 'Soft Skills', subcategory: 'soft', popular: true },
  { id: 'conflictresolution', name: 'Conflict Resolution', category: 'Soft Skills', subcategory: 'soft', popular: false },
  { id: 'criticalthinking', name: 'Critical Thinking', category: 'Soft Skills', subcategory: 'soft', popular: true },
  { id: 'strategicplanning', name: 'Strategic Planning', category: 'Soft Skills', subcategory: 'soft', popular: true },
  { id: 'adaptability', name: 'Adaptability', category: 'Soft Skills', subcategory: 'soft', popular: false },
  { id: 'timemanagement', name: 'Time Management', category: 'Soft Skills', subcategory: 'soft', popular: true },
  { id: 'remotework', name: 'Remote Work', category: 'Soft Skills', subcategory: 'soft', popular: true },
  { id: 'presentation', name: 'Presentation Skills', category: 'Soft Skills', subcategory: 'soft', popular: true },
  { id: 'codereview', name: 'Code Review', category: 'Soft Skills', subcategory: 'soft', popular: true },
];

// Combine all skills into one database
export const SKILLS_DATABASE: SkillSuggestion[] = [
  ...coreTechSkills,
  ...frontendSkills,
  ...backendSkills,
  ...devopsSkills,
  ...designToolsSkills,
  ...designDisciplineSkills,
  ...managementMethodSkills,
  ...managementProcessSkills,
  ...managementToolsSkills,
  ...marketingDigitalSkills,
  ...marketingAnalyticsSkills,
  ...marketingToolsSkills,
  ...softSkills,
];

// Helper functions for filtering and searching
export const getSkillsByCategory = (category: SkillCategory): SkillSuggestion[] => {
  return SKILLS_DATABASE.filter(skill => skill.category === category);
};

export const getPopularSkills = (): SkillSuggestion[] => {
  return SKILLS_DATABASE.filter(skill => skill.popular);
};

export const searchSkills = (query: string): SkillSuggestion[] => {
  const lowerQuery = query.toLowerCase();
  return SKILLS_DATABASE.filter(skill =>
    skill.name.toLowerCase().includes(lowerQuery)
  );
};

export const getSkillsByRole = (role: string): SkillSuggestion[] => {
  const roleMapping: Record<string, SkillCategory[]> = {
    'frontend': ['Development'],
    'backend': ['Development'],
    'fullstack': ['Development'],
    'designer': ['Design'],
    'ux': ['Design'],
    'pm': ['Management'],
    'marketing': ['Marketing'],
  };

  const categories = roleMapping[role.toLowerCase()] || [];
  return SKILLS_DATABASE.filter(skill => categories.includes(skill.category));
};
