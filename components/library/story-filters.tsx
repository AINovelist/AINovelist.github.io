"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { TopicFilters } from './topic-filters';

interface StoryFiltersProps {
  className?: string;
}
export function StoryFilters({ className }: StoryFiltersProps) {
  const [selectedTopic, setSelectedTopic] = useState('all');
  return (
    <Card className={cn("p-6", className)}>
      <h2 className="mb-4 text-lg font-semibold">فیلتر</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>گروه سنی</Label>
          <Slider defaultValue={[6]} min={3} max={12} step={1} />
        </div>
        {/* Add more filters as needed */}

        <TopicFilters selectedTopic={selectedTopic} onTopicChange={setSelectedTopic} />
      </div>
    </Card>
  );
}