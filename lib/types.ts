import { LucideIcon } from 'lucide-react';

export interface Feature {
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface StoryForm {
  title: string;
  ageRange: number[];
  theme: string;
  characters: string;
  additionalNotes: string;
  childGender: 'boy' | 'girl';
  academicApproaches: string[];
  topic: string;
  livingArea: string;
}

export interface StoryImages {
  '3d_rendered': string;
  cartoon: string;
  chibi: string;
  flat_design: string;
  hand_drawn: string;
  real: string;
  storybook_illustration: string;
  vector_art: string;
  watercolor: string;
}

export interface APIStory {
  name: string;
  topic: string;
  images: StoryImages;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  ageRange: number;
  theme: string;
  topic: string;
  coverImage: string;
  images?: StoryImages;
  content?: string;
  childGender?: 'boy' | 'girl';
  academicApproaches?: string[];
  livingArea?: string;
}

export const ACADEMIC_APPROACHES = [
  { id: 'stem', label: 'STEM Education' },
  { id: 'language', label: 'Language Development' },
  { id: 'social', label: 'Social Skills' },
  { id: 'emotional', label: 'Emotional Intelligence' },
  { id: 'creativity', label: 'Creative Thinking' },
  { id: 'problem-solving', label: 'Problem Solving' },
];

export const STORY_TOPICS = [
  { id: 'adventure', label: 'Adventure' },
  { id: 'fantasy', label: 'Fantasy' },
  { id: 'science', label: 'Science' },
  { id: 'nature', label: 'Nature' },
  { id: 'daily-life', label: 'Daily Life' },
];

export const LIVING_AREAS = [
  { id: 'urban', label: 'City' },
  { id: 'suburban', label: 'Suburb' },
  { id: 'rural', label: 'Countryside' },
  { id: 'coastal', label: 'Coastal Area' },
  { id: 'mountain', label: 'Mountain Region' },
];