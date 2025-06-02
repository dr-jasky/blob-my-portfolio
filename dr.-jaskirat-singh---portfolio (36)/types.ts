
export interface KeyStat {
  id: string;
  label: string;
  value: string | number;
  icon?: string; 
  suffix?: string; 
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  tagline?: string; 
  professionalSummary?: string; 
  consultancyOfferSummary?: string; 
  email: string;
  phone?: string; // Added
  linkedIn: string;
  googleScholar: string;
  orcid: string;
  profileImageUrl: string;
  ssrnProfileUrl?: string;
  researchGate?: string;
  academiaUrl?: string; 
  cvUrl?: string; 
  keyStats?: KeyStat[];
  currentFocusKeywords?: string[]; // Added
}

export enum PublicationType {
  Journal = "Peer-Reviewed Journal Articles",
  BookChapter = "Book Chapters",
  Conference = "Conference Papers",
  InProgress = "Communicated Research & Work in Progress",
  BookProposal = "Book Proposals (As Editor)",
  WorkingPaper = "Working Papers & Preprints", 
  Report = "Technical Reports & Monographs" 
}

export interface ImpactMetric {
  name: string; 
  value: string | number;
  icon?: string; 
}

export interface Publication {
  id: string;
  type: PublicationType;
  authors: string;
  title: string;
  source: string; 
  year: number | string;
  details?: string; 
  doiLink?: string;
  link?: string; 
  status?: string; 
  summary?: string; 
  insightSnippet?: string;
  featuredImageUrl?: string;
  tags?: string[]; 
  impactMetrics?: ImpactMetric[]; 
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  descriptionPoints: string[];
  icon?: string; 
}

export interface EducationItem {
  id: string;
  degree: string;
  specialization?: string;
  institution: string;
  location: string;
  period: string;
  thesisOrDissertation?: string;
  achievement?: string;
  verification?: string;
}

export interface Certification {
  id: string;
  name: string;
  institution: string;
  year: number | string;
  link?: string;
}

// Skill with percentage for skill bars
export interface SkillValueItem {
  name: string;
  percentage: number;
}

// For listed academic skills (no percentage)
export interface AcademicSkillListItem {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  // Can be array of strings, SkillValueItem, or AcademicSkillListItem based on context
  skills: (string | SkillValueItem | AcademicSkillListItem)[]; 
  icon?: string; 
  description?: string;
}

// For "Areas of Expertise" cards on Skills page (target design)
export interface ExpertiseAreaItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
  iconBgColor: string;
  tagBgColor: string;
  tagTextColor: string;
}


export interface ContactLink {
  id: string;
  name: string;
  url: string;
  iconClass: string; 
}

export interface NavLink {
  id: string;
  name: string;
  path: string;
}

export interface ConsultancyService {
  id: string;
  title: string;
  description: string;
  targetAudience: string;
  iconClass: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  authorTitle: string;
  avatarUrl?: string; 
}

export type CitationStyle = 'APA' | 'Chicago' | 'Harvard' | 'Vancouver' | 'MLA';
