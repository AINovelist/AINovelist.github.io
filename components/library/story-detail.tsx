"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Story, StoryImages, topicTranslations } from "@/lib/types";
import { useState } from "react";
import Markdown from "react-markdown";
import { format, parseISO } from "date-fns";
import { extractDateFromContent, extractDetails, translate } from "@/lib/utils";
import { AudioPlayer } from "./audio-player";
import { DualAudioPlayer } from "./audio-player/dual-audio-player";

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

export function StoryDetail({ story }: StoryDetailProps) {
  const details = extractDetails(story.content);
  const nonamestory = details.map(({ story }) => story);
  const initialStyle = story.images ? "3d_rendered" : "3d_rendered"; // Default style
  const [selectedStyle, setSelectedStyle] =
    useState<keyof StoryImages>(initialStyle);
  const createdAt = extractDateFromContent(nonamestory[0]);
  const formattedCreatedAt = createdAt
    ? format(parseISO(createdAt), "MMMM d, yyyy")
    : null;
  const contentWithoutDate =
    createdAt && nonamestory[0]
      ? nonamestory[0].replace(`Created on: ${createdAt}`, "").trim()
      : nonamestory[0] || "";
  const hasAudio = story.audio.en || story.audio.fa;


  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/library">
        <Button variant="ghost" className="mb-6">
          <ArrowRight className="mr-2 h-4 w-4" />
          بازگشت به کتابخانه
        </Button>
      </Link>

      <Card className="overflow-hidden">
        <CardHeader className="text-center z-10 -mb-20">
          <CardTitle className="text-center z-10">
            {details.map((detail, index) => (
              <div key={index}>                
                  قصه‌ی {detail.name} :{" "}
                  {typeof detail.age === "number"
                    ? detail.age.toString()
                    : "Unknown"}{" "}
                  ساله در {detail.livingPlace} برای{" "}
                  {translate(story.theme, topicTranslations)}                
              </div>
            ))}
          </CardTitle>
        </CardHeader>
        <div className="relative aspect-[16/9] w-full">
          {story.images && (
            <Image
              src={story.images[selectedStyle]}
              alt={`${story.title} - ${selectedStyle} style`}
              fill
              className="object-cover"
              // priority
              loading="lazy"
            />
          )}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 mt-10">
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
          <div className="">
          {formattedCreatedAt && (
              <span className="absolute bottom-4 left-4 z-10 bg-primary text-secondary rounded-lg px-3 py-3 text-sm">
                {formattedCreatedAt}
              </span>
            )}
          </div>
        </div>
        <div className="p-6">
         {hasAudio && (
          <div className="mt-8">
            <DualAudioPlayer audio={story.audio} />
          </div>
        )}
          <div className="flex flex-wrap gap-2 mb-6">          
          </div>
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
