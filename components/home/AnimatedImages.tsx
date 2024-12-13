"use client";

import { Story } from "@/lib/types";
import AnimatedMasonryGrid from "./AnimatedMasonryGrid";
import { generateSampleImages } from "@/lib/constans";

interface StoryLibraryProps {
  stories: Story[];
}

const AnimatedImages = ({ stories }: StoryLibraryProps) => {
  const images = stories
    .slice(0, 5)
    .flatMap((item, index) => {
      return item?.images
        ? Object.values(item.images).map((imageUrl, imageIndex) => ({
            id: `${index}-${imageIndex}`,
            src: imageUrl as string, // Ensure the type is string
            width: 400,
            height: Math.floor(Math.random() * 400 + 200),
          }))
        : [];
    })
    .filter((image) => image.src); // Filter out invalid or undefined images

  return (
    <div className="right-section relative rotate-[-15deg] top-0 right-[-100px]">
      <AnimatedMasonryGrid
        images={images.length ? images : generateSampleImages}
        columns={5}
        initialLoadCount={10}
      />
    </div>
  );
};

export default AnimatedImages;
