import { fetchStories, fetchStoryDetail } from '@/lib/api';
import { StoryDetail } from '@/components/library/story-detail';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const stories = await fetchStories();
  return stories.map((story) => ({
    id: story.id,
  }));
}

export default async function StoryPage({ params }: { params: { id: string } }) {
  const stories = await fetchStories();
  const story = stories.find((s) => s.id === params.id);
  
  if (!story) {
    notFound();
  }
  const storyDetail = await fetchStoryDetail(story.topicSlug, story.id);
  const fullStory = {
    ...story,
    content: storyDetail.content,
    // images: storyDetail.images,
  };
  // return <StoryDetail story={story} />;
  return <StoryDetail story={fullStory} />;
}