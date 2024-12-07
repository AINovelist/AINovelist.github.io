import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Story } from '@/lib/types';

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  return (
    <Link href={`/library/${story.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-[4/3]">
          <Image
            src={story.coverImage}
            alt={story.title}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader>
          <h3 className="text-lg font-semibold">{story.title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{story.description}</p>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span>Age: {story.ageRange}+</span>
            <span>•</span>
            <span>{story.theme}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}