export interface AdityaProfile {
  name: string;
  username: string;
  tagline: string;
  bio: string;
  emails: string[];
  location: string;
  status: string;
  interests: string[];
}

export interface AdityaProject {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'wip' | 'concept';
  vibeCoded: boolean;
  hardcoded?: boolean;
  githubUrl?: string;
  demoUrl?: string;
  stars?: number;
  forks?: number;
}

export interface BlogPost {
  id: string; // e.g. 'first-entry'
  title: string;
  date: string; // e.g. 'July 7, 2026'
  excerpt: string;
  content: string; // HTML/markdown string for the post body
}

export interface SiteStyleConfig {
  accentColor: string; // e.g. '#38bdf8'
  accentStrong: string; // e.g. '#0ea5e9'
  bgDark: string; // e.g. '#09090b'
  bgLight: string; // e.g. '#fafafa'
  gridSpacing: string; // e.g. '24px'
}

export interface SiteBuilderData {
  profile: AdityaProfile;
  projects: AdityaProject[];
  blogs: BlogPost[];
  style: SiteStyleConfig;
}
