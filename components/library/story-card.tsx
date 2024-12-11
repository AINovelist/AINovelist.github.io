import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Story, topicTranslations } from '@/lib/types';
import { translate } from '@/lib/utils';

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const rgbDataURL = (r: number, g: number, b: number) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${
      triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;
    const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);
  return (
    <Link href={`/library/${story.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-[4/3]">
          <Image
            src={story.coverImage}
            alt={story.title}
            fill
            quality={50}
            placeholder="blur"
            blurDataURL={rgbDataURL(246, 206, 167)} 
            className="object-cover"
          />
        </div>
        <CardHeader>
          <h3 className="text-lg font-semibold">{story.title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{story.description}</p>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span>سن: {story.ageRange}+</span>
            
            <span className="bg-primary text-secondary rounded-lg px-1 py-1 text-xs">{translate(story.theme, topicTranslations)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}