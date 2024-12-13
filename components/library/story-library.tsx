"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { StoryGrid } from '@/components/library/story-grid';
import { StoryFilters } from '@/components/library/story-filters';
import { TopicFilters } from '@/components/library/topic-filters';
import { Pagination } from '@/components/ui/pagination';
import { Story } from '@/lib/types';

interface StoryLibraryProps {
  initialStories: Story[];
}

const ITEMS_PER_PAGE = 9;

export function StoryLibrary({ initialStories }: StoryLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [stories] = useState<Story[]>(initialStories);

  const filteredStories = stories.filter((story) => {
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic === 'all' || story.topic === selectedTopic;
    return matchesSearch && matchesTopic;
  });
  const totalPages = Math.ceil(filteredStories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedStories = filteredStories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when filters change
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleTopicChange = (topic: string) => {
    setSelectedTopic(topic);
    console.log(topic);
    setCurrentPage(1);
  };
  console.log(paginatedStories);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">کتابخانه</h1>
        <Input
          type="search"
          placeholder="جستجوی قصه‌ها..."
          className="max-w-xs"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <TopicFilters
        selectedTopic={selectedTopic}
        onTopicChange={handleTopicChange}
      />

      <div className="grid gap-8 md:grid-cols-4">
        <StoryFilters className="md:col-span-1" />
        <div className="md:col-span-3 space-y-8">
          <StoryGrid stories={paginatedStories} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}