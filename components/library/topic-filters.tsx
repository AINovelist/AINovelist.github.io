"use client";

import { Button } from "@/components/ui/button";

interface TopicFiltersProps {
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
}

const topics = [
  { id: "all", label: "All Stories" },
  { id: "adventure", label: "Adventure" },
  { id: "fantasy", label: "Fantasy" },
  { id: "educational", label: "Educational" },
  { id: "bedtime", label: "Bedtime" },
];

export function TopicFilters({ selectedTopic, onTopicChange }: TopicFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {topics.map((topic) => (
        <Button
          key={topic.id}
          variant={selectedTopic === topic.id ? "default" : "outline"}
          onClick={() => onTopicChange(topic.id)}
          className="rounded-full"
        >
          {topic.label}
        </Button>
      ))}
    </div>
  );
}