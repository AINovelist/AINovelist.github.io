"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Image {
  id: any;
  src: string;
  width: number;
  height: number;
}

interface AnimatedMasonryGridProps {
  images: Image[];
  columns?: number;
  initialLoadCount?: number;
}

const AnimatedMasonryGrid: React.FC<AnimatedMasonryGridProps> = ({
  images,
  columns = 5,
  initialLoadCount = 10, // Number of images to load initially
}) => {
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1024); // Default for SSR
  const [visibleImages, setVisibleImages] = useState<Image[]>([]);
  const [loadedImageCount, setLoadedImageCount] = useState<number>(0);
  const loadIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Adjust columns based on window width
  const responsiveColumns = windowWidth < 640 ? 2 : windowWidth < 1024 ? 3 : columns;

  // Progressive image loading
  useEffect(() => {
    // Stop any existing interval
    if (loadIntervalRef.current) {
      clearInterval(loadIntervalRef.current);
    }

    // Reset state
    setVisibleImages([]);
    setLoadedImageCount(0);

    // Start progressive loading
    loadIntervalRef.current = setInterval(() => {
      setLoadedImageCount((prev) => {
        const nextCount = prev + 2; // Load 2 images at a time

        // Stop interval if all images are loaded
        if (nextCount >= images.length) {
          if (loadIntervalRef.current) clearInterval(loadIntervalRef.current);
        }

        return Math.min(nextCount, images.length);
      });
    }, 500); // Interval between image group loads

    // Cleanup on unmount
    return () => {
      if (loadIntervalRef.current) clearInterval(loadIntervalRef.current);
    };
  }, [images]);

  // Update visible images when loaded count changes
  useEffect(() => {
    setVisibleImages(images.slice(0, loadedImageCount));
  }, [loadedImageCount, images]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Distribute images into columns
  const distributeImages = () => {
    const columnArrays:Image[][] = Array.from({ length: responsiveColumns }, () => []);
    visibleImages.forEach((image, index) => {
      const columnIndex = index % responsiveColumns;
      columnArrays[columnIndex].push(image);
    });
    return columnArrays;
  };

  // Animation variants
  const containerVariants = {
    hidden: { y: -200, opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${responsiveColumns}, minmax(0, 1fr))`,
        }}
      >
        {distributeImages().map((column, colIndex) => (
          <div key={colIndex}>
            <AnimatePresence>
              {column.map((image:Image) => (
                <motion.div
                  key={image.id}
                  initial={{ y: -100, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      damping: 12,
                      stiffness: 100,
                    },
                  }}
                  exit={{ y: 100, opacity: 0 }}
                  className="w-full h-auto mt-2"
                >
                  <motion.img
                    src={image.src}
                    alt={`Image ${image.id}`}
                    className="w-full h-auto object-cover rounded-lg shadow-md"
                    style={{
                      aspectRatio: `${image.width} / ${image.height}`,
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AnimatedMasonryGrid;
