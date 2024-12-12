"use client";

import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  currentTime: string;
  duration: string;
}

export function PlayerControls({
  isPlaying,
  onPlayPause,
  currentTime,
  duration,
}: PlayerControlsProps) {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10"
        onClick={onPlayPause}
      >
        {isPlaying ? (
          <Pause className="h-6 w-6" />
        ) : (
          <Play className="h-6 w-6" />
        )}
      </Button>
      <div className="text-sm font-medium">
        <span>{currentTime}</span>
        <span className="mx-2">/</span>
        <span>{duration}</span>
      </div>
    </div>
  );
}