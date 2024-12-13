"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
// Inline SVG icons to replace Lucide icons
const StorytellingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    <path d="M11 7h3"/>
    <path d="M11 10h3"/>
    <path d="M11 13h3"/>
  </svg>
);

const LibraryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 6 4 14"/>
    <path d="M12 6v14"/>
    <path d="M8 8v12"/>
    <path d="M4 4v16"/>
  </svg>
);

const HeroSection = () => {
  return (
  <section className="relative overflow-hidden w-full left-section  min-h-screen flex items-center">
      {/* Playful background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-purple-200 rounded-full opacity-30 blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-[-10%] left-[-10%] w-96 h-96  rounded-full opacity-20 blur-2xl"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, -10, 10, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div 
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Title with child-friendly typography */}
          <h1 className="text-4xl font-extrabold tracking-tight text-[#1A365D] sm:text-6xl leading-tight mb-6 drop-shadow-sm">
            قصه‌پرداز: سفر به دنیای داستان‌های جادویی برای کودکان
          </h1>

          {/* Subtitle with softer, inviting tone */}
          <p className="text-lg leading-relaxed text-[#2C5282] mb-10 max-w-xl mx-auto">
            جرقه‌ای برای تخیل کودک شما، با هر داستانی که هوش مصنوعی خلق می‌کند
          </p>

          {/* Action Buttons with playful design */}
          <div className="flex items-center justify-center gap-x-6">
            <Link href="/create" className="group">
              <Button 
                size="lg" 
                className="text-lg bg-[#4FD1C5] hover:bg-transparent hover:border-[#4FD1C5] hover:border-1 hover:text-[#2C5282] transition-colors duration-300 group-hover:scale-105 flex items-center gap-3 shadow-lg"
              >
              <StorytellingIcon />
                قصه گو
              </Button>
            </Link>
            <Link href="/library" className="group">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg border-[#4FD1C5] text-[#2C5282] hover:bg-[#4FD1C5] hover:text-white transition-colors duration-300 group-hover:scale-105 flex items-center gap-3 shadow-md"
              >
                <LibraryIcon  />
                کتابخانه
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;