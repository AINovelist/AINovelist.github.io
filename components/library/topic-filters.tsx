"use client";

import { Button } from "@/components/ui/button";

interface TopicFiltersProps {
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
}

const topics = [
  { id: "all", label: "همه‌ی قصه‌ها" },
  { id: "Water Conservation", label: "مصرف آب" },
  { id: "Waste Reduction", label: "کاهش زباله" },
  { id: "Tree Preservation", label: "مراقبت از درختان" },
  { id: "Animal Protection", label: "حفاظت از حیوانات" },
  { id: "Air Pollution Reduction", label: "آلودگی هوا" },
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