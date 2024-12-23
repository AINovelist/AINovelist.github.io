import { Story } from '@/lib/types';
import { StoryCard } from '@/components/library/story-card';
import { cn } from '@/lib/utils';

interface StoryGridProps {
  stories: Story[];
  className?: string;
}

export function StoryGrid({ stories, className }: StoryGridProps) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
}