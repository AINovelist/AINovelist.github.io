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
}

export interface Story {
  id: string;
  title: string;
  description: string;
  ageRange: number;
  theme: string;
  coverImage: string;
  topic: string;
}