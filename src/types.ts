export interface Project {
  id: string;
  title: string;
  subhead?: string;
  tagline: string;
  description: string;
  longDescription?: string;
  category: string;
  tags: string[];
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  image?: string;
  modelType: 'cube' | 'torus' | 'sphere' | 'icosahedron' | 'knot' | 'octahedron' | 'cyberCube';
  color: string;
  metrics?: { label: string; value: string }[];
  keyFeatures?: string[];
  highlights?: string[];
  statusBadge?: string;
}

export interface Skill {
  name: string;
  levelBadge: 'Expert' | 'Advanced' | 'Medium' | 'Learning';
  category: string;
  level: number; // 0 - 100 for visual bar
  icon: string;
  description: string;
  experienceYears?: number;
}

export interface SkillCategoryBreakdown {
  title: string;
  icon: string;
  items: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'Work' | 'Education' | 'Contract';
  description: string[];
  skills: string[];
}

export interface GraphicSettings {
  quality: 'high' | 'medium' | 'low';
  enableParticles: boolean;
  enableWireframe: boolean;
  autoRotate: boolean;
  activeGeometry: 'torusKnot' | 'icosahedron' | 'dodecahedron' | 'cyberCube' | 'sphere';
  primaryColor: string;
  secondaryColor: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

