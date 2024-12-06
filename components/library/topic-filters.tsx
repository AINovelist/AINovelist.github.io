"use client";

import { Button } from "@/components/ui/button";

interface TopicFiltersProps {
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
}

const topics = [
  { id: "all", label: "همه" },
  { id: "Air Pollution Reduction", label: "آلودگی هوا" },
  { id: "Animal Protection", label: "حفاظت از حیوانات" },
  { id: "Tree Preservation", label: "حفاظت از درختان" },
  { id: "Waste Reduction", label: "کاهش زباله" },
  { id: "Water Conservation", label: "کاهش مصرف آب" },
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