import { APIStory, Story, StoryDetail, StoryForm, topicTranslations } from './types';
import { translate } from './utils';

const API_URL         = 'https://api.ainovelist.ir/';
const IMAGE_BASE_URL  = 'https://storage.ainovelist.ir/g/AINovelist/stories/refs/heads/main/kids';
const AUDIO_BASE_URL  = 'https://storage.ainovelist.ir/g/AINovelist/stories/main/kids';
const BUILD_URL       = 'https://aibots.kharcoin.info/ai-story/build';

export async function fetchStories(): Promise<Story[]> {
  const response = await fetch(API_URL);
  const data: APIStory[] = await response.json();
  // const description = `قصه‌ای درباره‌ی ${translate(item.topic, topicTranslations)}`;
  return data.map((item) => ({
    id: item.name.replace('.md', ''),
    title: formatTitle(item.name),
    description: `قصه‌ای درباره‌ی ${item.topic}`,
    ageRange: extractAgeFromFilename(item.name),
    theme: item.topic,
    topic: item.topic,
    topicSlug: item.topicSlug,
    coverImage: getImageUrl(item.topic, item.name, '3d_rendered'),
    audio: item.topic === 'Air Pollution Reduction' 
    ? {
        en: getAudioUrl(item.topic, item.name.replace('.md', ''), 'en'),
        fa: getAudioUrl(item.topic, item.name.replace('.md', ''), 'fa'),
      }
    : { en: null, fa: null },
    images: {
      ...item.images,
      cartoon: getImageUrl(item.topic, item.name, 'cartoon'),
      storybook_illustration: getImageUrl(item.topic, item.name, 'storybook_illustration'),
      watercolor: getImageUrl(item.topic, item.name, 'watercolor'),
      '3d_rendered': getImageUrl(item.topic, item.name, '3d_rendered'),
      vector_art: getImageUrl(item.topic, item.name, 'vector_art'),
      chibi: getImageUrl(item.topic, item.name, 'chibi'),
      flat_design: getImageUrl(item.topic, item.name, 'flat_design'),
      hand_drawn: getImageUrl(item.topic, item.name, 'hand_drawn'),
      real: getImageUrl(item.topic, item.name, 'real'),
    }
  }));
}

function getImageUrl(topic: string, name: string, style: string): string {
  return `${IMAGE_BASE_URL}/${encodeURIComponent(topic)}/images/${encodeURIComponent(name.replace('.md', ''))}-${style}.png`;
}

function formatTitle(filename: string): string {
  // Remove file extension
  const nameWithoutExt = filename.replace('.md', '');
  
  // Split by hyphens and remove the random number at the end
  const parts = nameWithoutExt.split('-');
  parts.pop(); // Remove the last part (random number)
  
  // Convert to title case and join with spaces
  return parts
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function extractAgeFromFilename(filename: string): number {
  const match = filename.match(/^(\d+)-/);
  return match ? parseInt(match[1], 10) : 6;
}

export async function createStory(formData: StoryForm): Promise<any> {
  try {
    const response = await fetch(BUILD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response) {
      throw new Error(`HTTP error! status: ${response}`);
    }

    const data = await response.json();
    return data.aiResponse;
  } catch (error) {
    console.error('Error creating story:', error);
    throw error;
  }
}

export async function fetchStoryDetail(topicSlug: string, storyId: string): Promise<StoryDetail> {
  try {
    const response = await fetch(`${API_URL}topic/${topicSlug}/${storyId}`);
    return response.json();
  } catch (error) {
    console.error('Error fetching story detail:', error);
    throw error;
  }
}

function getAudioUrl(topic: string, storyName: string, language: 'en' | 'fa'): string {
  return `${AUDIO_BASE_URL}/${encodeURIComponent(topic)}/sounds/${language}/${storyName}.mp3`;
}