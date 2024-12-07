import { fetchStories } from '@/lib/api';
import { StoryLibrary } from '@/components/library/story-library';

export default async function LibraryPage() {
  const stories = await fetchStories();
  
  return <StoryLibrary initialStories={stories} />;
}