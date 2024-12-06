"use client";

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { StoryGrid } from '@/components/library/story-grid';
import { StoryFilters } from '@/components/library/story-filters';
import { ImageTypeButtons } from '@/components/library/image-type-buttons';
import { Story } from '@/lib/types';

export function StoryLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [imageType, setImageType] = useState('3d_rendered');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('https://github-worker.javidmomeni.workers.dev/');
        const data = await response.json();
        const stories: Story[] = data.map((item: any) => ({
          id: item.name,
          title: item.title,
          description: item.description,
          ageRange: item.ageRange,
          theme: item.theme,
          topic: item.topic,
        }));
        setStories(stories);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, []);

  const handleImageTypeChange = (type: string) => {
    setImageType(type);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">کتابخانه</h1>
        <Input
          type="search"
          placeholder="جستجوی قصه‌ها..."
          className="max-w-xs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ImageTypeButtons onImageTypeChange={handleImageTypeChange} />

      <div className="grid gap-8 md:grid-cols-4">
        <StoryFilters className="md:col-span-1" />
        <StoryGrid className="md:col-span-3" stories={stories} imageType={imageType} />
      </div>
    </div>
  );
}