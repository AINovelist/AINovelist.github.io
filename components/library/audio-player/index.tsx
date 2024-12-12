"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useAudioPlayer } from "./use-audio-player";
import { PlayerControls } from "./player-controls";

interface AudioPlayerProps {
  audioUrl: string;
}

export function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const {
    waveformRef,
    isPlaying,
    duration,
    currentTime,
    togglePlayPause,
    formatTime,
  } = useAudioPlayer(audioUrl);

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>نسخه صوتی انگلیسی</CardTitle>
      </CardHeader>
      <div className="space-y-4">
        <div ref={waveformRef} className="w-full" />
        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={togglePlayPause}
          currentTime={formatTime(currentTime)}
          duration={formatTime(duration)}
        />
      </div>
    </Card>
  );
}