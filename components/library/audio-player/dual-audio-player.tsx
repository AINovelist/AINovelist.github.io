"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StoryAudio } from "@/lib/types";
import { AudioPlayer } from "./index";

interface DualAudioPlayerProps {
  audio: StoryAudio;
}

export function DualAudioPlayer({ audio }: DualAudioPlayerProps) {
  if (!audio.en && !audio.fa) return null;

  return (
    <Card className="p-6">
      <Tabs defaultValue="fa" dir="rtl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">پخش صوتی داستان</h3>
          <TabsList>
            <TabsTrigger value="fa">فارسی</TabsTrigger>
            <TabsTrigger value="en">English</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="fa" className="mt-0">
          {audio.fa ? (
            <AudioPlayer 
              audioUrl={audio.fa}
              title="نسخه فارسی"
            />
          ) : (
            <p className="text-muted-foreground text-center py-4">
              نسخه فارسی در دسترس نیست
            </p>
          )}
        </TabsContent>

        <TabsContent value="en" className="mt-0">
          {audio.en ? (
            <AudioPlayer 
              audioUrl={audio.en}
              title="English Version"
            />
          ) : (
            <p className="text-muted-foreground text-center py-4">
              English version is not available
            </p>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
}