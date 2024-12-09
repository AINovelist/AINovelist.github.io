"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Story, StoryImages } from "@/lib/types";
import { useState } from "react";
import Markdown from "react-markdown";
import { format, parseISO } from "date-fns";

interface StoryDetailProps {
  story: Story;
}

const IMAGE_STYLES = [
  { id: "storybook_illustration", label: "کتاب قصه" },
  { id: "cartoon", label: "کارتونی" },
  { id: "watercolor", label: "آبرنگ" },
  { id: "3d_rendered", label: "سه‌بعدی" },
  { id: "vector_art", label: "وکتور" },
  { id: "chibi", label: "فانتزی" },
  { id: "flat_design", label: "تخت" },
  { id: "hand_drawn", label: "دستی" },
  { id: "real", label: "رئال" },
] as const;

function extractDateFromContent(content: string | undefined): string | null {
  if (!content) {
    return null;
  }
  const dateRegex = /Created on: (\d{4}-\d{2}-\d{2})/;
  const match = content.match(dateRegex);
  return match ? match[1] : null;
}

export function StoryDetail({ story }: StoryDetailProps) {
  const initialStyle = story.images ? "3d_rendered" : "3d_rendered"; // Default style
  const [selectedStyle, setSelectedStyle] =
    useState<keyof StoryImages>(initialStyle);
  const createdAt = extractDateFromContent(story.content);
  const formattedCreatedAt = createdAt
    ? format(parseISO(createdAt), "MMMM d, yyyy")
    : null;
  const contentWithoutDate =
    createdAt && story.content
      ? story.content.replace(`Created on: ${createdAt}`, "").trim()
      : story.content || "";

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/library">
        <Button variant="ghost" className="mb-6">
          <ArrowRight className="mr-2 h-4 w-4" />
          بازگشت به کتابخانه
        </Button>
      </Link>

      <Card className="overflow-hidden">
        <div className="relative aspect-[16/9] w-full">
          {story.images && (
            <Image
              src={story.images[selectedStyle]}
              alt={`${story.title} - ${selectedStyle} style`}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{story.title}</h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {IMAGE_STYLES.map((style) => (
              <Button
                key={style.id}
                variant={selectedStyle === style.id ? "default" : "outline"}
                onClick={() =>
                  setSelectedStyle(style.id as keyof typeof story.images)
                }
                className="rounded-full"
              >
                {style.label}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {formattedCreatedAt && (
              <span className="bg-primary text-secondary px-3 py-1 rounded-full text-sm">
                {formattedCreatedAt}
              </span>
            )}
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              سن: {story.ageRange}+
            </span>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              {story.theme}
            </span>
            {story.topic && (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {story.topic}
              </span>
            )}
          </div>

          <p className="text-lg text-muted-foreground mb-6">
            {story.description}
          </p>
          {contentWithoutDate && (
            <div className="prose max-w-none">
              {contentWithoutDate ? (
                <Markdown>{contentWithoutDate}</Markdown>
              ) : null}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
