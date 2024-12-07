import { APIStory, Story } from './types';

const API_URL = 'https://github-worker.javidmomeni.workers.dev/';
const IMAGE_BASE_URL = 'https://raw.githubusercontent.com/AINovelist/stories/refs/heads/main/kids';

export async function fetchStories(): Promise<Story[]> {
  const response = await fetch(API_URL);
  const data: APIStory[] = await response.json();
  
  return data.map((item) => ({
    id: item.name.replace('.md', ''),
    title: formatTitle(item.name),
    description: `قصه‌ای درباره‌ی ${item.topic}`,
    ageRange: extractAgeFromFilename(item.name),
    theme: item.topic,
    topic: item.topic,
    coverImage: getImageUrl(item.topic, item.name, '3d_rendered'),
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