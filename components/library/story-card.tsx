import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Story } from '@/lib/types';

interface StoryCardProps {
  story: Story;
  imageType: string;
}

export function StoryCard({ story, imageType }: StoryCardProps) {
  const [loading, setLoading] = useState(true);
  const imageId = story.id.replace('.md', '');

  useEffect(() => {
    setLoading(true);
  }, [imageType]);

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/3]">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
        <Image
          src={`https://github.com/AINovelist/stories/blob/main/kids/${story.topic}/images/${imageId}-${imageType}.png?raw=true`}
          alt={story.title}
          fill
          className="object-cover"
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <CardHeader>
        <h3 className="text-lg font-semibold">{story.title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{story.description}</p>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <span>سن: {story.ageRange}+</span>
          <span>•</span>
          <span>{story.topic}</span>
        </div>
      </CardContent>
    </Card>
  );
}