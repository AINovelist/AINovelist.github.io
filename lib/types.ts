import { LucideIcon } from 'lucide-react';

export interface Feature {
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface StoryForm {
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
  type: string;
  download_url: string;
  topic: string;
  topicSlug: string;
  images: StoryImages;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  ageRange: number;
  theme: string;
  topic: string;
  topicSlug: string;
  coverImage: string;
  images?: StoryImages;
  content?: string;
  childGender?: 'boy' | 'girl';
  academicApproaches?: string[];
  livingArea?: string;
}

export const ACADEMIC_APPROACHES = [
  { id: 'piaget', label: 'نظریه رشد شناختی پیاژه' },
  { id: 'activeLearning', label: 'نظریه یادگیری فعال' },
  { id: 'roleModeling', label: 'نقش‌پذیری' },
  { id: 'multipleIntelligences', label: 'هوش‌های چندگانه گاردنر' },
  { id: 'vygotsky', label: 'نظریه منطقه تقریبی رشد ویگوتسکی' },
  { id: 'personalMotivation', label: 'تقویت انگیزه شخصی' },
];

export const STORY_TOPICS = [
  { id: "Water Conservation", label: "مصرف آب" },
  { id: "Waste Reduction", label: "کاهش زباله" },
  { id: "Tree Preservation", label: "مراقبت از درختان" },
  { id: "Animal Protection", label: "حفاظت از حیوانات" },
  { id: "Air Pollution Reduction", label: "آلودگی هوا" },
];

export const LIVING_AREAS = [
  { label: 'شهر', id: 'City' },
  { label: 'حومه', id: 'Suburb' },
  { label: 'روستا', id: 'Countryside' },
  { label: 'ساحل', id: 'Coastal Area' },
  { label: 'کوهستان', id: 'Mountain Region' },
];

export interface StoryDetail {
  content: string;
  images: StoryImages;
}