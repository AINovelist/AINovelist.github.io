import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Story, topicTranslations } from '@/lib/types';
import { translate } from '@/lib/utils';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
// Import required modules
import { EffectCards } from 'swiper/modules';
import { motion } from 'framer-motion';
import { useState } from 'react';

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

  console.log('Story data:', story);
const slideVariants = {
  hidden: (custom: number) => ({
    opacity: 0,
    y: -200, // Start above the viewport
    rotate: -25 + custom * 5, // Slight random rotation
  }),
  visible: (custom: number) => ({
    opacity: 1,
    y: 0, // End at the original position
    rotate: 0, // Settle into a flat position
    transition: {
      delay: custom * 0.3, // Staggered delay for each slide
      type: "spring", // Add bounce effect
      stiffness: 50,
      damping: 5,
    },
  }),
};
  return (
  
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-[4/3] p-4">
        <Swiper
       effect="cards"
  grabCursor={true}
  modules={[EffectCards]}
  className="h-full w-full p-4"
  cardsEffect={{
    slideShadows: true,
    perSlideRotate: 10,
    perSlideOffset: 10,
  }}
    >
      {story.images && Object.keys(story.images).length > 0
        ? Object.values(story.images).map((imageUrl, imageIndex) => (
            <SwiperSlide key={`${story.id}-${imageIndex}`} >
              <motion.div
                className="h-full w-full"
                custom={imageIndex} // Pass the index for staggered animation
                initial="hidden"
                animate="visible"
                variants={slideVariants}
              >
                <Image
                  src={imageUrl}
                  alt={story.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={50}
                  placeholder="blur"
                  blurDataURL={rgbDataURL(246, 206, 167)}
                  className="object-cover rounded-lg"
                />
              </motion.div>
            </SwiperSlide>
          ))
        : (
          <SwiperSlide>
            <motion.div
              className="h-full w-full"
              custom={0}
              initial="hidden"
              animate="visible"
              variants={slideVariants}
            >
              <Image
                src={story.coverImage}
                alt={story.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={50}
                placeholder="blur"
                blurDataURL={rgbDataURL(246, 206, 167)}
                className="object-cover rounded-lg"
              />
            </motion.div>
          </SwiperSlide>
        )}
    </Swiper>

      </div>
        <Link href={`/library/${story.id}`}>
        <CardHeader>
          <h3 className="text-lg font-semibold">{story.title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{story.description}</p>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span>سن: {story.ageRange}+</span>
            <span className="bg-primary text-secondary rounded-lg px-1 py-1 text-xs">
              {translate(story.theme, topicTranslations)}
            </span>
          </div>
        </CardContent>
           </Link >
      </Card>

  );
}
